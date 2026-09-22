#!/usr/bin/env node
/**
 * Audita los enlaces verificadores declarados en las propuestas.
 *
 * Recorre propuestas/<cliente>/<plan>/verificadores.md, extrae las URLs, comprueba el
 * estado HTTP de cada una y escribe state/auditoria-verificadores.csv.
 *
 * LO QUE ESTE SCRIPT NO PUEDE HACER (docs/04-verificadores-protocolo.md):
 *   · No sabe si el LMS muestra el plan formativo correcto.
 *   · No sabe si el módulo visible es el segundo.
 *   · No sabe si las credenciales sirven: no autentica.
 * Esas tres verificaciones son humanas y son las que más propuestas salvan. Por eso las
 * columnas que las registran se conservan entre corridas en vez de sobrescribirse.
 *
 * Uso:
 *   node scripts/auditar-verificadores.mjs
 *   node scripts/auditar-verificadores.mjs --timeout 20
 */
import { propuestas, leer, existe, escribir, rel, verde, rojo, amarillo, gris } from './lib/repo.mjs';
import { parseCSV, aCSV } from './lib/csv.mjs';

const SALIDA = 'state/auditoria-verificadores.csv';
const RE_URL = /https?:\/\/[^\s)\]<>"']+/g;
const UA = 'Mozilla/5.0 (auditoria-verificadores; licitacion-td-2026)';
const COLUMNAS = ['cliente', 'plan', 'archivo', 'linea', 'url', 'contexto',
  'estado_http', 'revisado_utc', 'muestra_lo_que_dice', 'riesgo', 'accion', 'responsable'];

export function recolectar() {
  const filas = [];
  for (const p of propuestas()) {
    const archivo = `propuestas/${p.id}/verificadores.md`;
    if (!existe(archivo)) continue;
    leer(archivo).split('\n').forEach((linea, i) => {
      for (const url of linea.match(RE_URL) || []) {
        filas.push({
          cliente: p.cliente, plan: p.plan, archivo, linea: i + 1, url,
          contexto: linea.trim().replace(/\|/g, ' ').replace(/\s+/g, ' ').slice(0, 120),
        });
      }
    });
  }
  return filas;
}

export async function estadoHttp(url, timeout = 15000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: ctrl.signal });
    if (res.ok) return `${res.status} abre`;
    if (res.status === 401 || res.status === 403) return `${res.status} pide permiso`;
    return `${res.status} error`;
  } catch (e) {
    return e.name === 'AbortError' ? 'sin respuesta (timeout)' : `sin respuesta (${e.cause?.code || e.name})`;
  } finally {
    clearTimeout(t);
  }
}

/** Conserva las columnas que llena una persona; solo refresca el estado HTTP. */
function fusionarConPrevio(filas) {
  if (!existe(SALIDA)) return filas;
  const previo = new Map(parseCSV(leer(SALIDA)).map((f) => [`${f.archivo}|${f.url}`, f]));
  return filas.map((f) => {
    const p = previo.get(`${f.archivo}|${f.url}`) || {};
    return {
      ...f,
      muestra_lo_que_dice: p.muestra_lo_que_dice || 'REVISAR A MANO',
      riesgo: p.riesgo || '',
      accion: p.accion || '',
      responsable: p.responsable || '',
    };
  });
}

export async function auditar({ timeout = 15000, red = true } = {}) {
  const filas = fusionarConPrevio(recolectar());
  for (const f of filas) {
    f.estado_http = red ? await estadoHttp(f.url, timeout) : 'no revisado (sin red)';
    f.revisado_utc = red ? new Date().toISOString().slice(0, 19) + 'Z' : '';
  }
  if (filas.length) escribir(SALIDA, aCSV(filas, COLUMNAS));
  return filas;
}

async function main() {
  const args = process.argv.slice(2);
  const timeout = Number(args[args.indexOf('--timeout') + 1]) * 1000 || 15000;

  const pendientes = recolectar();
  if (!pendientes.length) {
    console.log('No hay propuestas/*/*/verificadores.md todavía. Nada que auditar.');
    console.log('Crea propuestas con templates/anexo2-esqueleto.md y vuelve a correr.');
    return;
  }

  const filas = await auditar({ timeout, red: true });
  for (const f of filas) {
    const c = f.estado_http.startsWith('2') ? verde : f.estado_http.includes('permiso') ? amarillo : rojo;
    console.log(`${c(f.estado_http.padEnd(24))} ${f.cliente}/${f.plan}  ${f.url.slice(0, 70)}`);
  }
  const malos = filas.filter((f) => !f.estado_http.startsWith('2'));
  console.log(`\n${filas.length} enlaces revisados, ${malos.length} con problema.`);
  console.log(`Informe: ${SALIDA}`);
  console.log(gris('La columna "muestra_lo_que_dice" se llena a mano: un 200 no significa que el LMS muestre el módulo correcto.'));
  process.exitCode = malos.length ? 1 : 0;
}

if (import.meta.url === `file://${process.argv[1].split('\\').join('/')}` || process.argv[1]?.endsWith('auditar-verificadores.mjs')) {
  main();
}
