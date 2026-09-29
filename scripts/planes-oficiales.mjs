#!/usr/bin/env node
/**
 * Planilla con lo que pide el plan formativo oficial de SENCE para cada uno de los 15 cursos de la
 * licitación, en .xlsx para subirla a Drive convertida en Google Sheets:
 *
 *   npm run sipfor -- --todos     (antes, si los planes cambiaron en SIPFOR)
 *   npm run planes
 *
 * Hojas: Resumen (una fila por curso, con el módulo 2, que es el que se desarrolla), Módulo 2 (una
 * fila por aprendizaje esperado, con criterios y contenidos TEXTUALES), Todos los módulos (los que se
 * muestran en el LMS), Qué evalúan las bases (igual para los 15) y Fuentes.
 *
 * Datos: data/planes/<PF>.json (npm run sipfor) y data/planes-formativos.csv. Si existe la carpeta
 * local "Licitaciones TD 2026" (fuera del repo) y hay pdftotext, coteja el módulo 2 contra el PDF
 * oficial de cada plan y lista los Anexos 2 referenciales de años anteriores. Esa carpeta trae
 * propuestas de otras instituciones, por eso la salida va a privado/ (fuera de git).
 * Salida: privado/drive/Planes-Formativos-SENCE-TD2026.xlsx
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { ruta, leer, RAIZ } from './lib/repo.mjs';
import { parseCSV } from './lib/csv.mjs';
import { crearXlsx } from './lib/xlsx.mjs';

const oferta = parseCSV(leer('data/planes-formativos.csv'));
const planes = oferta.map((o) => ({ o, j: JSON.parse(leer(`data/planes/${o.codigo_plan}.json`)) }));

// ------------------------------------------------------------ cotejo con los PDF oficiales

const sq = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '');
const carpetaLicitacion = (() => {
  const padre = path.dirname(RAIZ);
  for (const d of fs.readdirSync(padre)) {
    const c = path.join(padre, d, 'Licitaciones TD 2026');
    if (d.startsWith('Licitaciones TD 2026') && fs.existsSync(c)) return c;
  }
  return null;
})();
const pdfs = {};
if (carpetaLicitacion && spawnSync('pdftotext', ['-v']).status !== null) {
  const dir = path.join(carpetaLicitacion, 'PF SENCE a licitar');
  for (const f of fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.pdf')) : []) {
    const r = spawnSync('pdftotext', ['-enc', 'UTF-8', path.join(dir, f), '-'], { encoding: 'utf8', maxBuffer: 64 << 20 });
    if (r.status === 0) pdfs[f] = r.stdout;
  }
}
const referenciales = carpetaLicitacion && fs.existsSync(path.join(carpetaLicitacion, 'Anexos 2 Referenciales'))
  ? fs.readdirSync(path.join(carpetaLicitacion, 'Anexos 2 Referenciales')) : [];

/** Compara el módulo 2 del plan (SIPFOR) con el del PDF oficial: nombre, código, horas y cada texto. */
function cotejar(j) {
  const m2 = j.modulos[1];
  const f = Object.keys(pdfs).find((k) => j.modulos.every((m) => pdfs[k].includes(m.codigo))
    && sq(pdfs[k].slice(0, 4000)).includes(sq(j.nombre)));
  if (!f) return { estado: 'pend', texto: 'Sin PDF local: dato de SIPFOR sin cotejar' };
  const t = pdfs[f].replace(/Versión N° \d+ - N° de Resolución: \d+ - Fecha de Resolución: [\d-]+\s*\n+Página \d+ de \d+/g, ' ');
  const bloque = t.slice(t.search(/MÓDULO FORMATIVO N° 2\s*\n/), t.search(/MÓDULO FORMATIVO N° 3\s*\n/));
  const lineas = bloque.split('\n').map((l) => l.trim()).filter(Boolean);
  const tras = (e) => lineas[lineas.indexOf(e) + 1] ?? '';
  const cabecera = sq(tras('Nombre')) === sq(m2.nombre) && tras('Código Módulo') === m2.codigo
    && parseFloat(tras('N° de horas asociadas al módulo').replace(',', '.')) === m2.horas;
  // Las celdas que cruzan un salto de página salen intercaladas: se exige cada palabra, en orden.
  const plano = sq(bloque);
  const enOrden = (s) => { let p = 0; return s.split(/\s+/).map(sq).filter(Boolean).every((w) => (p = plano.indexOf(w, p)) >= 0 && (p += w.length)); };
  const textos = [m2.competencia, ...m2.aprendizajes_esperados.flatMap((ae) => [ae.texto,
    ...ae.criterios_evaluacion.map((c) => c.texto), ...ae.contenidos.flatMap((c) => [c.tema, ...c.items])])];
  const distintos = textos.filter((s) => !enOrden(s)).length;
  const ok = cabecera && !distintos;
  return { estado: ok ? 'ok' : 'pend', texto: ok ? `Igual al PDF oficial (${textos.length} textos)`
    : `Revisar: ${cabecera ? '' : 'nombre, código u horas distintos; '}${distintos} de ${textos.length} textos distintos`, pdf: f };
}

// ------------------------------------------------------------ hojas

const S = (texto, estado) => ({ texto, estado });
const compartido = {};
for (const { j } of planes) (compartido[j.modulos[1].codigo] ??= []).push(j.codigo_plan);
const contenidos = (ae) => ae.contenidos.map((c) => [c.tema, ...c.items.map((i) => `  • ${i}`)].join('\n')).join('\n');

const resumen = [], modulo2 = [], modulos = [];
let cotejados = 0;
for (const { o, j } of planes) {
  const m2 = j.modulos[1];
  const aes = m2.aprendizajes_esperados;
  const nCrit = aes.reduce((n, ae) => n + ae.criterios_evaluacion.length, 0);
  const cot = cotejar(j);
  if (cot.pdf) cotejados++;
  const horas = j.horas_totales === j.suma_horas_modulos && j.horas_totales === Number(o.horas)
    ? S(`${j.horas_totales} h`, 'ok')
    : S(`Plan ${j.horas_totales} h · módulos suman ${j.suma_horas_modulos} h · oferta ${o.horas} h`, 'pend');
  const otros = compartido[m2.codigo].filter((c) => c !== j.codigo_plan);
  const refs = referenciales.filter((f) => f.startsWith(j.codigo_plan));
  resumen.push([S(j.codigo_plan, 'curso'), o.linea, j.nombre, horas, String(j.modulos.length), o.cupos,
    `${j.fuente.resolucion} del ${j.fuente.fecha_resolucion.split('-').reverse().join('-')} · versión ${j.fuente.version}`,
    j.competencia_plan, m2.codigo, m2.nombre, m2.tipo, `${m2.horas} h`, m2.competencia,
    String(aes.length), String(nCrit), String(3 * aes.length),
    otros.length ? S(`Mismo módulo que ${otros.join(', ')}`, 'ok') : '—',
    S(cot.texto, cot.estado), { url: j.fuente.pdf_plan, texto: 'PDF en SIPFOR' },
    refs.length ? refs.join('\n') : S('No hay', 'subir')]);
  for (const ae of aes) {
    modulo2.push([S(j.codigo_plan, 'curso'), `${m2.codigo} · ${m2.nombre}`, `AE${ae.n}`, ae.texto,
      ae.criterios_evaluacion.map((c) => `${c.n} ${c.texto}`).join('\n'), contenidos(ae)]);
  }
  for (const m of j.modulos) {
    modulos.push([S(j.codigo_plan, 'curso'), String(m.n), m.codigo, m.nombre, m.tipo, `${m.horas} h`, m.competencia,
      m.n === 2 ? S('Se desarrolla y se evalúa', 'ok') : 'Se muestra en el LMS']);
  }
}

// Qué evalúan las bases: la tabla maestra de docs/01-guia-propuesta-tecnica.md, sin copiarla a mano.
const guia = leer('docs/01-guia-propuesta-tecnica.md');
const tabla = guia.split('## 8. Tabla maestra')[1].split('\n\n')[1];
const rubrica = tabla.split('\n').slice(2).map((l) => l.split('|').slice(1, -1).map((c) => c.trim().replace(/\*\*/g, '')));

const fuentes = [
  ['Planes formativos', 'SIPFOR (sipfor.sence.cl), la misma API pública del catálogo, extraída con npm run sipfor', 'Texto textual: aprendizajes, criterios y contenidos sin reformular (Anexo N°7, num. 2)'],
  ['Cotejo', `PDF oficiales de "Licitaciones TD 2026 / PF SENCE a licitar": ${cotejados} de ${planes.length} planes`,
    'Módulo 2 de cada PDF comparado con SIPFOR: nombre, código, horas, competencia, aprendizajes, criterios y contenidos'],
  ['Qué se evalúa', 'Bases 2026, Res. Ex. N°2320 (punto 7.4) y Anexo N°7, resumidas en docs/01-guia-propuesta-tecnica.md', 'La misma pauta para los 15 cursos, aplicada al módulo 2'],
  ['Módulo que se desarrolla', 'Bases 2026, punto 7.4', 'El segundo módulo de cada plan. En el LMS se muestran todos'],
  ['Mínimo de indicadores', 'Bases 2026, punto 7.4 B', '3 por aprendizaje esperado, aunque el plan traiga menos criterios'],
  ['Anexos 2 referenciales', 'Carpeta "Licitaciones TD 2026 / Anexos 2 Referenciales"', 'De años anteriores: sirven de base, pero sus bases y a veces su módulo desarrollado eran otros'],
];

const fecha = new Date().toLocaleDateString('es-CL');
const HOJAS = [
  { nombre: 'Resumen', titulo: 'Planes formativos oficiales SENCE · Talento Digital 2026',
    subtitulo: `Una fila por curso · se desarrolla el módulo 2 y se muestran todos en el LMS · textos de SIPFOR · actualizado ${fecha}`,
    encabezados: ['Código', 'Línea', 'Plan', 'Horas del plan', 'N° módulos', 'Cupos', 'Resolución', 'Competencia del plan',
      'Módulo 2: código', 'Módulo 2: nombre', 'Tipo', 'Horas M2', 'Competencia del módulo 2', 'Aprendizajes esperados', 'Criterios del plan',
      'Indicadores mínimos (3 por AE)', 'Módulo 2 compartido', 'Cotejo con PDF oficial', 'Plan oficial', 'Anexo 2 referencial (años anteriores)'],
    filas: resumen, alto: 'auto',
    anchos: { fijas: 1, cols: [9, 14, 30, 16, 9, 8, 18, 50, 11, 30, 11, 9, 50, 12, 10, 13, 18, 22, 12, 34] } },
  { nombre: 'Módulo 2', titulo: 'Módulo 2 de cada plan: aprendizajes, criterios y contenidos',
    subtitulo: 'Textuales del plan oficial: así deben ir en el Anexo 2 y en los recursos · una fila por aprendizaje esperado',
    encabezados: ['Código', 'Módulo 2', 'AE', 'Aprendizaje esperado (textual)', 'Criterios de evaluación (textuales)', 'Contenidos (textuales)'],
    filas: modulo2, alto: 'auto', anchos: { fijas: 1, cols: [9, 26, 6, 44, 56, 70] } },
  { nombre: 'Todos los módulos', titulo: 'Todos los módulos de cada plan', subtitulo: 'Se muestran todos en el LMS; solo el módulo 2 se desarrolla y se evalúa',
    encabezados: ['Código', 'N°', 'Código módulo', 'Módulo', 'Tipo', 'Horas', 'Competencia del módulo', 'En la propuesta'],
    filas: modulos, alto: 'auto', anchos: { fijas: 1, cols: [9, 5, 12, 40, 11, 8, 70, 22] } },
  { nombre: 'Qué evalúan las bases', titulo: 'Qué evalúan las bases 2026 en la propuesta técnica',
    subtitulo: 'La misma pauta para los 15 cursos, aplicada al módulo 2 · ordenada por peso en la nota final',
    encabezados: ['#', 'Subcriterio', 'Ítem', '% de la técnica', '% nota final', 'Qué se necesita para el 7,0'],
    filas: rubrica, alto: 'auto', anchos: { fijas: 0, cols: [5, 34, 7, 14, 13, 60] } },
  { nombre: 'Fuentes', titulo: 'De dónde sale cada dato', subtitulo: 'Para volver a generarla: npm run sipfor -- --todos y luego npm run planes',
    encabezados: ['Qué', 'Fuente', 'Nota'], filas: fuentes, alto: 'auto', anchos: { fijas: 0, cols: [24, 60, 70] } },
];
const salida = 'privado/drive/Planes-Formativos-SENCE-TD2026.xlsx';
fs.mkdirSync(ruta('privado/drive'), { recursive: true });
fs.writeFileSync(ruta(salida), crearXlsx(HOJAS));
console.log(`${salida} → ${resumen.length} planes, ${modulo2.length} aprendizajes del módulo 2, ${modulos.length} módulos · cotejados con PDF oficial: ${cotejados} de ${planes.length}`);
