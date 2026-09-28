#!/usr/bin/env node
/**
 * Los 3 quiz formativos del módulo 2 como juego: una misión de 5 niveles con puntos, estrellas,
 * dos intentos por nivel e insignia de oro, plata o bronce al final.
 *
 *   npm run quiz-juego
 *
 * Lee, por curso y quiz:
 *   - las preguntas del GIFT que genera `npm run produccion` (entrega/quiz/M2-Quiz-n-Moodle.gift), que
 *     sale de contenidos/<PF>/modulo-2/R-quiz-canva.md: el texto es el mismo de Canva y de Moodle;
 *   - de ese mismo R-quiz-canva.md, la misión del curso y, de cada quiz, el "Cuándo", la insignia y la
 *     siguiente parada.
 * Escribe en modulo-2/<curso>/entrega/quiz/:
 *   M2-Quiz-n-Juego.html        un solo archivo que funciona sin internet (fuentes incrustadas): se sube
 *                               como Archivo o Página en el LMS, o se incrusta desde el sitio
 *   M2-Quiz-n-Juego-SCORM.zip   el mismo juego como paquete SCORM 1.2 (Moodle: Agregar actividad →
 *                               Paquete SCORM): registra el mejor puntaje (0-100) y la finalización
 *
 * Si cambian los quiz: `npm run produccion -- PF1821 PF1822` y después `npm run quiz-juego`.
 * Si falta la misión, la insignia o la siguiente parada, o si un quiz no trae 5 preguntas de
 * alternativas con una correcta, se detiene y dice dónde. Sin dependencias (AGENTS.md §8).
 */
import fs from 'node:fs';
import { leer, escribir, ruta } from './lib/repo.mjs';
import { leerGift } from './lib/quiz-gift.mjs';
import { crearZip } from './lib/zip.mjs';

const CURSOS = [
  { pf: 'PF1821', carpeta: 'PF1821-agentes-low-code', nombre: 'Construcción de Agentes y Automatización con Herramientas Low Code' },
  { pf: 'PF1822', carpeta: 'PF1822-desarrollo-con-ia', nombre: 'Especialización en Desarrollo con IA' },
];
// Fecha fija dentro del zip: regenerar sin cambios no debe cambiar el archivo.
const FECHA_ZIP = new Date(2026, 8, 28, 12, 0, 0);
const FUENTES = [[400, 'ibm-plex-sans-latin-400-normal.woff2'], [600, 'ibm-plex-sans-latin-600-normal.woff2'], [700, 'ibm-plex-sans-latin-700-normal.woff2']];

const plano = (t) => t.replace(/\*\*|\*|`/g, '').trim();
const sinPunto = (t) => plano(t).replace(/\.$/, '');

function metadatos(c) {
  const archivo = `contenidos/${c.pf}/modulo-2/R-quiz-canva.md`;
  const md = leer(archivo);
  const mision = /^\*\*Misión:\*\*\s*(.+)$/m.exec(md)?.[1];
  if (!mision) throw new Error(`${archivo}: falta la línea "**Misión:** …" (va antes del primer quiz)`);
  const quizzes = [1, 2, 3].map((n) => {
    const inicio = md.search(new RegExp(`^## Quiz ${n}\\b`, 'm'));
    if (inicio < 0) throw new Error(`${archivo}: falta "## Quiz ${n}"`);
    const resto = md.slice(inicio + 3);
    const fin = resto.search(/^## /m);
    const sec = md.slice(inicio, fin < 0 ? undefined : inicio + 3 + fin);
    const cab = /^## Quiz \d+ · (.+?) \((.+?)\)\s*$/m.exec(sec);
    const cuando = /^\*\*Cuándo:\*\*\s*(.+)$/m.exec(sec)?.[1];
    const juego = /^\*\*Insignia:\*\*\s*(.+?)\s*·\s*\*\*Siguiente parada:\*\*\s*(.+)$/m.exec(sec);
    if (!cab) throw new Error(`${archivo}, Quiz ${n}: el título no dice "Quiz ${n} · tema (aprendizajes)"`);
    if (!cuando) throw new Error(`${archivo}, Quiz ${n}: falta "**Cuándo:** …"`);
    if (!juego) throw new Error(`${archivo}, Quiz ${n}: falta "**Insignia:** … · **Siguiente parada:** …"`);
    return { tema: plano(cab[1]), aes: plano(cab[2]), cuando: plano(cuando), insignia: sinPunto(juego[1]), siguiente: sinPunto(juego[2]) };
  });
  return { mision: sinPunto(mision), quizzes };
}

function preguntas(c, n) {
  const archivo = `modulo-2/${c.carpeta}/entrega/quiz/M2-Quiz-${n}-Moodle.gift`;
  const g = leerGift(archivo);
  if (g.preguntas.length !== 5) throw new Error(`${archivo}: trae ${g.preguntas.length} preguntas y deben ser 5`);
  return g.preguntas.map((p) => {
    if (p.tipo !== 'multiple') throw new Error(`${archivo}: ${p.id} no es de alternativas`);
    if (p.opciones.length > 4) throw new Error(`${archivo}: ${p.id} tiene más de 4 alternativas (el juego usa A a D)`);
    const ae = /\((AE\d)\)/.exec(p.id)?.[1];
    if (!ae) throw new Error(`${archivo}: ${p.id} no dice su aprendizaje esperado`);
    return { ae, enunciado: p.enunciado, opciones: p.opciones, correcta: p.correcta, retro: p.retro };
  });
}

const plantilla = leer('scripts/lib/quiz-juego.html');
const fuentes = FUENTES.map(([peso, f]) => `@font-face{font-family:"Plex Sans";font-style:normal;font-weight:${peso};font-display:swap;src:url(data:font/woff2;base64,${fs.readFileSync(ruta('scripts/fuentes', f)).toString('base64')}) format("woff2")}`).join('\n');

function html(datos, titulo) {
  const json = JSON.stringify(datos).replace(/</g, '\\u003c');
  return plantilla
    .replace('__TITULO__', () => titulo.replace(/&/g, '&amp;').replace(/</g, '&lt;'))
    .replace('/*FUENTES*/', () => fuentes)
    .replace('/*DATA*/', () => json);
}

const xml = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function manifiesto(id, titulo) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${id}" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-${id}">
    <organization identifier="ORG-${id}">
      <title>${xml(titulo)}</title>
      <item identifier="ITEM-${id}" identifierref="RES-${id}" isvisible="true">
        <title>${xml(titulo)}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-${id}" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>
</manifest>
`;
}

let hechos = 0;
for (const c of CURSOS) {
  const meta = metadatos(c);
  for (const n of [1, 2, 3]) {
    const q = meta.quizzes[n - 1];
    const datos = { curso: c.pf, cursoNombre: c.nombre, quiz: n, ...q, mision: meta.mision, preguntas: preguntas(c, n) };
    const titulo = `${c.pf} · M2 · Quiz ${n} · ${q.tema} · Misión`;
    const pagina = html(datos, titulo);
    const base = `modulo-2/${c.carpeta}/entrega/quiz/M2-Quiz-${n}-Juego`;
    escribir(`${base}.html`, pagina);
    const zip = crearZip([
      { nombre: 'imsmanifest.xml', contenido: manifiesto(`${c.pf}-M2-QUIZ-${n}-JUEGO`, titulo) },
      { nombre: 'index.html', contenido: pagina },
    ], { fecha: FECHA_ZIP });
    fs.writeFileSync(ruta(`${base}-SCORM.zip`), zip);
    console.log(`${base}.html  (${Math.round(Buffer.byteLength(pagina) / 1024)} KB) · SCORM ${Math.round(zip.length / 1024)} KB · insignia «${q.insignia}»`);
    hechos++;
  }
}
console.log(`${hechos} quiz gamificados.`);
