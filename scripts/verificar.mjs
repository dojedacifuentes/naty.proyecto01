#!/usr/bin/env node
/**
 * Verificación automatizada del repositorio.
 *
 * Corre todos los controles de scripts/checks/ y devuelve un informe legible y un JSON
 * para que otra sesión (Claude, Codex, humano) pueda auditar sin repetir el trabajo.
 *
 *   node scripts/verificar.mjs                  todos los controles, sin red
 *   node scripts/verificar.mjs --red            además golpea los enlaces verificadores
 *   node scripts/verificar.mjs --solo 03,04     solo esos controles
 *   node scripts/verificar.mjs --estricto       los avisos también fallan
 *   node scripts/verificar.mjs --breve          una línea por control
 *
 * Código de salida: 0 todo en orden · 1 hay errores (o avisos con --estricto).
 */
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import {
  RAIZ, ruta, leer, existe, escribir, propuestas, Resultado,
  rojo, verde, amarillo, azul, gris, negrita, ramaActual, commitActual, ahora,
} from './lib/repo.mjs';
import { parseCSV } from './lib/csv.mjs';

const INFORME = 'state/verificacion.json';

function opciones(argv) {
  const o = { red: false, estricto: false, breve: false, solo: null, informe: INFORME };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--red') o.red = true;
    else if (a === '--estricto') o.estricto = true;
    else if (a === '--breve') o.breve = true;
    else if (a === '--sin-informe') o.informe = null;
    else if (a === '--solo') o.solo = new Set(String(argv[++i]).split(',').map((s) => s.trim().padStart(2, '0')));
    else if (a === '--json') o.informe = argv[++i];
  }
  return o;
}

const csv = (p) => (existe(p) ? parseCSV(leer(p)) : []);

export async function verificar(opts = {}) {
  const o = { red: false, estricto: false, solo: null, ...opts };
  const ctx = {
    opciones: o,
    clientes: csv('data/clientes.csv'),
    planes: csv('data/planes-formativos.csv'),
    rubrica: csv('data/rubrica-subcriterios.csv'),
    umbrales: csv('data/umbrales-por-plan.csv'),
    propuestas: propuestas(),
  };

  const dir = ruta('scripts/checks');
  const archivos = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.mjs')).sort() : [];
  const resultados = [];

  for (const f of archivos) {
    const mod = (await import(pathToFileURL(path.join(dir, f)).href)).default;
    if (o.solo && !o.solo.has(mod.id)) continue;
    const r = new Resultado(mod.id, mod.nombre);
    try {
      await mod.run(ctx, r);
    } catch (e) {
      r.error(`el control reventó: ${e.message}`, `scripts/checks/${f}`);
    }
    resultados.push(r);
  }
  return { ctx, resultados };
}

function imprimir(resultados, o) {
  const linea = (r) => {
    const e = r.errores.length;
    const a = r.avisos.length;
    const icono = e ? rojo('x') : a ? amarillo('!') : verde('ok');
    const detalle = [e ? rojo(`${e} error${e > 1 ? 'es' : ''}`) : null, a ? amarillo(`${a} aviso${a > 1 ? 's' : ''}`) : null]
      .filter(Boolean).join(' · ');
    console.log(`  ${icono.padEnd(12)} ${r.id} ${r.nombre.padEnd(34)} ${detalle}`);
  };

  console.log(negrita('\nVerificación del repositorio') + gris(`  ·  ${ramaActual()} · ${commitActual().slice(0, 7)} · ${ahora()}`));
  console.log('');
  resultados.forEach(linea);

  const errores = resultados.flatMap((r) => r.errores.map((x) => ({ ...x, id: r.id })));
  const avisos = resultados.flatMap((r) => r.avisos.map((x) => ({ ...x, id: r.id })));

  if (!o.breve) {
    if (errores.length) {
      console.log(negrita(rojo('\nERRORES')) + gris('  (hay que corregirlos antes de cerrar la sesión)'));
      for (const e of errores) console.log(`  ${rojo('x')} ${gris(e.id)} ${azul(e.donde || '')}\n      ${e.mensaje}`);
    }
    if (avisos.length) {
      console.log(negrita(amarillo('\nAVISOS')) + gris('  (revisar a mano; no bloquean)'));
      for (const a of avisos.slice(0, 40)) console.log(`  ${amarillo('!')} ${gris(a.id)} ${azul(a.donde || '')}\n      ${a.mensaje}`);
      if (avisos.length > 40) console.log(gris(`  … y ${avisos.length - 40} más (ver ${INFORME})`));
    }
    const notas = resultados.flatMap((r) => r.notas);
    if (notas.length) {
      console.log(negrita('\nDATOS'));
      for (const n of notas.slice(0, 25)) console.log(gris(`  · ${n}`));
      if (notas.length > 25) console.log(gris(`  … y ${notas.length - 25} más`));
    }
  }

  const veredicto = errores.length ? rojo('CON ERRORES') : avisos.length ? amarillo('CON AVISOS') : verde('LIMPIO');
  console.log(`\n${negrita('Resumen:')} ${resultados.length} controles · ${errores.length} errores · ${avisos.length} avisos → ${veredicto}\n`);
  return { errores, avisos };
}

export function aInforme(resultados, o) {
  return {
    generado_utc: ahora(),
    rama: ramaActual(),
    commit: commitActual(),
    opciones: { red: o.red, estricto: o.estricto },
    resumen: {
      controles: resultados.length,
      errores: resultados.reduce((s, r) => s + r.errores.length, 0),
      avisos: resultados.reduce((s, r) => s + r.avisos.length, 0),
      ok: resultados.every((r) => r.ok),
    },
    controles: resultados.map((r) => ({
      id: r.id, nombre: r.nombre, ok: r.ok,
      errores: r.errores, avisos: r.avisos, notas: r.notas,
    })),
  };
}

/** Línea corta para el registro de sesiones: "8/8 ok" o "6/8 (fallan 02,04)". */
export function resumenCorto(resultados) {
  const malos = resultados.filter((r) => !r.ok);
  const total = resultados.length;
  return malos.length ? `${total - malos.length}/${total} (fallan ${malos.map((r) => r.id).join(',')})` : `${total}/${total} ok`;
}

async function main() {
  const o = opciones(process.argv.slice(2));
  const { resultados } = await verificar(o);
  const { errores, avisos } = imprimir(resultados, o);
  if (o.informe) {
    escribir(o.informe, JSON.stringify(aInforme(resultados, o), null, 2) + '\n');
    if (!o.breve) console.log(gris(`Informe para auditoría: ${o.informe}\n`));
  }
  process.exitCode = errores.length || (o.estricto && avisos.length) ? 1 : 0;
}

if (process.argv[1] && process.argv[1].endsWith('verificar.mjs')) main();
