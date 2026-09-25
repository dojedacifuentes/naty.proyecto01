/**
 * Material de lectura por aprendizaje esperado: de contenidos/<PF>/modulo-2/lecturas/AEn.md a un
 * documento A4 diagramado para imprimir en PDF (y hojear como flipbook en el LMS).
 *
 * Formato de la fuente:
 *   ---
 *   bajada: una oración que dice de qué trata la lectura
 *   minutos: (opcional) tiempo de lectura; si falta, se calcula a 150 palabras por minuto (texto técnico)
 *   ---
 *   ## Antes de empezar          introducción, sin número
 *   ## Título de sección         con número; la primera línea es obligatoria:
 *   plan: CONTENIDO TEXTUAL DEL PLAN. / OTRO CONTENIDO TEXTUAL.
 *   :::ejemplo … :::  :::error … :::  :::clave … :::  :::flujo (líneas "Paso | detalle") :::
 *   ## En síntesis · ## Para practicar · ## Autocomprobación (3 preguntas con "Respuesta:") · ## Glosario (8 términos)
 *
 * Diseño: dos familias tipográficas (IBM Plex Sans y IBM Plex Mono, licencia OFL, en scripts/fuentes/),
 * paleta con contraste WCAG 2.1 AA y sin imágenes externas. verificarLectura() impide imprimir una
 * lectura que no cubra, textual, todos los contenidos del plan de su aprendizaje esperado.
 */
import fs from 'node:fs';
import { esc, inline, markdown } from './html.mjs';
import { ruta } from './repo.mjs';

const ESPECIALES = {
  'Antes de empezar': 'intro',
  'En síntesis': 'sintesis',
  'Para practicar': 'practica',
  'Autocomprobación': 'autocomprobacion',
  'Glosario': 'glosario',
};

// Instituciones que no pueden aparecer en un recurso base (DECISIONS.md: recursos neutros).
const AJENOS = /\b(skillnest|unab|andr[eé]s bello|mindhub|chc|hackea)\b/i;
const MARCAS = /PENDIENTE|TODO|<[^>]*>/; // marcas de trabajo sin cerrar

// Caracteres que cubren los archivos latin de las dos fuentes. Cualquier otro obligaría al
// navegador a usar una tercera fuente de respaldo. La flecha → se dibuja aparte (SVG).
const CUBIERTO = /[\u0000-ÿıŒœʻʼˆ˚˜̩̄̈ -⁯€™↑↓−∕→]/u;

export function leerLectura(md) {
  const L = md.replace(/\r\n/g, '\n').split('\n');
  const meta = {};
  let i = 0;
  if (L[0] === '---') {
    for (i = 1; i < L.length && L[i] !== '---'; i++) {
      const m = /^(\w+):\s*(.*)$/.exec(L[i]);
      if (m) meta[m[1]] = m[2].trim();
    }
    i++;
  }
  const secciones = [];
  let actual = null;
  for (; i < L.length; i++) {
    const h = /^## (.+)$/.exec(L[i]);
    if (h) {
      const titulo = h[1].trim();
      actual = { titulo, tipo: ESPECIALES[titulo] ?? 'tema', plan: [], lineas: [] };
      secciones.push(actual);
      continue;
    }
    if (!actual) continue;
    const p = /^plan:\s*(.+)$/.exec(L[i]);
    if (p && !actual.lineas.some((x) => x.trim())) { actual.plan.push(...p[1].split(' / ').map((s) => s.trim())); continue; }
    actual.lineas.push(L[i]);
  }
  let n = 0;
  for (const s of secciones) if (s.tipo === 'tema') s.n = ++n;
  return { meta, secciones };
}

// Bloques ":::tipo" y Markdown corriente, en orden.
function bloques(lineas) {
  const out = [];
  let buf = [];
  for (let i = 0; i < lineas.length; i++) {
    const m = /^:::(\w+)\s*(.*)$/.exec(lineas[i]);
    if (m) {
      if (buf.length) { out.push({ tipo: 'md', texto: buf.join('\n') }); buf = []; }
      const j = lineas.findIndex((l, k) => k > i && /^:::\s*$/.test(l));
      if (j < 0) throw new Error(`bloque :::${m[1]} sin cierre`);
      out.push({ tipo: m[1], titulo: m[2], texto: lineas.slice(i + 1, j).join('\n') });
      i = j;
      continue;
    }
    buf.push(lineas[i]);
  }
  if (buf.join('').trim()) out.push({ tipo: 'md', texto: buf.join('\n') });
  return out;
}

function preguntas(lineas) {
  const out = [];
  for (const l of lineas) {
    const q = /^\d+\.\s+(.+)$/.exec(l);
    const r = /^\s+Respuesta:\s*(.+)$/.exec(l);
    if (q) out.push({ pregunta: q[1], respuesta: '' });
    else if (r && out.length) out[out.length - 1].respuesta = r[1];
    else if (l.trim() && out.length) {
      const ult = out[out.length - 1];
      if (ult.respuesta) ult.respuesta += ' ' + l.trim(); else ult.pregunta += ' ' + l.trim();
    }
  }
  return out;
}

function terminos(lineas) {
  return lineas.map((l) => /^- \*\*(.+?)\*\*:?\s*(.+)$/.exec(l)).filter(Boolean)
    .map((m) => ({ termino: m[1].replace(/:$/, ''), definicion: m[2] }))
    .sort((a, b) => a.termino.localeCompare(b.termino, 'es', { sensitivity: 'base' }));
}

const texto = (lectura) => lectura.secciones.flatMap((s) => [s.titulo, ...s.lineas]).join('\n');
export const palabras = (lectura) => texto(lectura).replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;

/**
 * Revisa la lectura contra el plan. Devuelve una lista de problemas (vacía si está en orden).
 * unidadesAE: contenidos del plan del AE, textuales, en el orden de la ficha.
 */
export function verificarLectura(lectura, unidadesAE) {
  const errores = [];
  const temas = lectura.secciones.filter((s) => s.tipo === 'tema');
  const usadas = lectura.secciones.flatMap((s) => s.plan);
  for (const x of usadas.filter((u) => !unidadesAE.includes(u))) errores.push(`rótulo que no es textual del plan: "${x}"`);
  for (const x of unidadesAE.filter((u) => !usadas.includes(u))) errores.push(`contenido del plan sin sección: "${x}"`);
  for (const s of temas) {
    if (!s.plan.length) errores.push(`la sección "${s.titulo}" no declara su contenido del plan (línea plan:)`);
    if (!bloques(s.lineas).some((b) => b.tipo === 'ejemplo')) errores.push(`la sección "${s.titulo}" no tiene ejemplo`);
  }
  const todos = lectura.secciones.flatMap((s) => bloques(s.lineas));
  if (todos.filter((b) => b.tipo === 'error').length < 3) errores.push('menos de 3 recuadros "Error frecuente"');
  for (const tipo of ['intro', 'sintesis', 'practica', 'autocomprobacion', 'glosario']) {
    if (!lectura.secciones.some((s) => s.tipo === tipo)) errores.push(`falta la sección ${Object.keys(ESPECIALES).find((k) => ESPECIALES[k] === tipo)}`);
  }
  const auto = lectura.secciones.find((s) => s.tipo === 'autocomprobacion');
  if (auto) {
    const q = preguntas(auto.lineas);
    if (q.length !== 3 || q.some((x) => !x.respuesta)) errores.push(`la autocomprobación debe tener 3 preguntas con respuesta (tiene ${q.length})`);
  }
  const glos = lectura.secciones.find((s) => s.tipo === 'glosario');
  if (glos && terminos(glos.lineas).length !== 8) errores.push(`el glosario debe tener 8 términos (tiene ${terminos(glos.lineas).length})`);
  const t = texto(lectura);
  const ajeno = AJENOS.exec(t);
  if (ajeno) errores.push(`menciona "${ajeno[0]}": un recurso base no nombra instituciones`);
  const marca = MARCAS.exec(t.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, ''));
  if (marca) errores.push(`marca de trabajo sin cerrar: "${marca[0]}"`);
  const raros = [...new Set([...t].filter((ch) => !CUBIERTO.test(ch)))];
  if (raros.length) errores.push(`caracteres fuera de las fuentes (usarían una tercera tipografía): ${raros.join(' ')}`);
  // A 8,4 pt, una línea de código de más de 78 caracteres se corta dentro de un recuadro.
  const largas = [...t.matchAll(/```\w*\n([\s\S]*?)```/g)].flatMap((m) => m[1].split('\n')).filter((l) => l.length > 78);
  for (const l of largas) errores.push(`línea de código de ${l.length} caracteres (máximo 78): ${l.trim().slice(0, 50)}…`);
  if (palabras(lectura) < 1500) errores.push(`solo ${palabras(lectura)} palabras: una lectura de 6 páginas o más pide 1500 como mínimo`);
  return errores;
}

// ------------------------------------------------------------------ HTML

const FLECHA = '<svg class="fl" viewBox="0 0 16 10" aria-label="luego" role="img"><path d="M1 5h12M9 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// La flecha va como dibujo fuera del código; dentro de <pre> no se usa.
const flechas = (html) => html.split(/(<pre[\s\S]*?<\/pre>)/).map((p, k) => (k % 2 ? p : p.replace(/\s*→\s*/g, ` ${FLECHA} `))).join('');

function caja(b, caso) {
  const rotulos = { ejemplo: `Ejemplo · ${caso}`, error: 'Error frecuente', clave: 'Idea clave' };
  if (b.tipo === 'flujo') {
    const pasos = b.texto.split('\n').filter((l) => l.trim()).map((l) => l.split(' | '));
    return `<figure class="flujo">${b.titulo ? `<figcaption>${inline(b.titulo)}</figcaption>` : ''}<div class="pasos">${
      pasos.map(([t, d], k) => `${k ? `<span class="entre">${FLECHA}</span>` : ''}<div class="paso"><span class="n">${k + 1}</span><b>${inline(t)}</b>${d ? `<span>${inline(d)}</span>` : ''}</div>`).join('')}</div></figure>`;
  }
  if (!rotulos[b.tipo]) throw new Error(`bloque desconocido :::${b.tipo}`);
  return `<aside class="caja ${b.tipo}"><p class="rotulo">${rotulos[b.tipo]}${b.titulo ? ` · <span>${inline(b.titulo)}</span>` : ''}</p>${markdown(b.texto)}</aside>`;
}

const cuerpo = (lineas, caso) => bloques(lineas).map((b) => (b.tipo === 'md' ? markdown(b.texto) : caja(b, caso))).join('\n');

function fuentes() {
  const f = (archivo, familia, peso, estilo = 'normal') => {
    const b64 = fs.readFileSync(ruta('scripts/fuentes', archivo)).toString('base64');
    return `@font-face{font-family:'${familia}';font-weight:${peso};font-style:${estilo};src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
  };
  return [
    f('ibm-plex-sans-latin-400-normal.woff2', 'IBM Plex Sans', 400),
    f('ibm-plex-sans-latin-400-italic.woff2', 'IBM Plex Sans', 400, 'italic'),
    f('ibm-plex-sans-latin-600-normal.woff2', 'IBM Plex Sans', 600),
    f('ibm-plex-sans-latin-700-normal.woff2', 'IBM Plex Sans', 700),
    f('ibm-plex-mono-latin-400-normal.woff2', 'IBM Plex Mono', 400),
    f('ibm-plex-mono-latin-600-normal.woff2', 'IBM Plex Mono', 600),
  ].join('\n');
}

// Especificación gráfica (la misma que resume el LEEME del zip):
// A4 · márgenes 22/26/24/26 mm · texto 11 pt/1,55 (unos 75 caracteres por línea) · escala 7,5 · 9 · 11 · 12,5 · 17 · 34 pt
// Código en IBM Plex Mono 8,4 pt, líneas de 78 caracteres como máximo (las controla verificarLectura).
// Colores: tinta #1F2937 (14,7:1), azul #0F3D5E (11,6:1), turquesa #0E7490 (5,4:1), gris #475569 (7,6:1), ámbar solo decorativo.
function estilos(pie) {
  return `<style>
${fuentes()}
@page { size: A4; margin: 22mm 26mm 24mm;
  @bottom-left { content: "${pie}"; font: 400 7.5pt 'IBM Plex Sans'; color: #475569; vertical-align: top; padding-top: 8mm; }
  @bottom-right { content: counter(page) " / " counter(pages); font: 600 7.5pt 'IBM Plex Sans'; color: #0F3D5E; vertical-align: top; padding-top: 8mm; } }
@page portada { margin: 0; @bottom-left { content: none } @bottom-right { content: none } }
:root { --tinta:#1F2937; --azul:#0F3D5E; --turquesa:#0E7490; --gris:#475569; --linea:#CBD5E1; --fondo:#F8FAFC; --fondo2:#F1F5F9; --ambar:#F59E0B; }
* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
html { font-kerning: normal; font-variant-ligatures: common-ligatures; text-rendering: optimizeLegibility; }
body { margin: 0; font: 400 11pt/1.55 'IBM Plex Sans', sans-serif; color: var(--tinta); }
p { margin: 0 0 7pt; orphans: 3; widows: 3; }
strong, b { font-weight: 600; } em { font-style: italic; }
a { color: var(--turquesa); text-decoration: none; }
code { font: 400 .88em 'IBM Plex Mono', monospace; background: var(--fondo2); color: var(--azul); padding: .4pt 1.2pt; border-radius: 2pt; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
pre { font: 400 8.4pt/1.5 'IBM Plex Mono', monospace; background: var(--fondo2); border-left: 3pt solid var(--azul); border-radius: 0 3pt 3pt 0; padding: 8pt 10pt; margin: 8pt 0 11pt; white-space: pre-wrap; word-break: break-word; break-inside: avoid; }
pre code { background: none; padding: 0; color: var(--tinta); font-size: 1em; }
ul, ol { margin: 0 0 8pt; padding-left: 15pt; } li { margin: 0 0 3pt; padding-left: 2pt; } li::marker { color: var(--turquesa); font-weight: 600; }
table { width: 100%; border-collapse: collapse; margin: 8pt 0 12pt; font-size: 9pt; line-height: 1.4; }
thead { display: table-header-group; }
th { background: var(--azul); color: #fff; font-weight: 600; text-align: left; padding: 5pt 7pt; vertical-align: bottom; }
td { padding: 5pt 7pt; border-bottom: .5pt solid var(--linea); vertical-align: top; }
tbody tr:nth-child(even) td { background: var(--fondo); }
tr { break-inside: avoid; } .c { text-align: center; } .r { text-align: right; }
h3 { font-size: 12.5pt; line-height: 1.3; font-weight: 600; color: var(--azul); margin: 14pt 0 5pt; break-after: avoid; }
h4 { font-size: 11pt; font-weight: 600; color: var(--turquesa); margin: 10pt 0 4pt; break-after: avoid; }
.fl { display: inline-block; width: 1.05em; height: .66em; vertical-align: .05em; color: var(--turquesa); }

/* Portada */
.portada { page: portada; height: 297mm; display: flex; flex-direction: column; break-after: page; }
.banda { background: var(--azul); color: #fff; padding: 22mm 26mm 15mm; height: 152mm; display: flex; flex-direction: column; position: relative; overflow: hidden; }
.banda::after { content: ""; position: absolute; right: -28mm; top: -28mm; width: 110mm; height: 110mm; border-radius: 50%; border: 18mm solid rgba(255,255,255,.05); }
.banda .kicker { font: 600 8.5pt/1.4 'IBM Plex Sans'; letter-spacing: .16em; text-transform: uppercase; color: #A5F3FC; margin: 0; }
.banda .curso { font: 400 9.5pt/1.45 'IBM Plex Sans'; color: #CFE3F1; margin: 3mm 0 0; max-width: 120mm; }
.banda .ae { position: absolute; right: 26mm; top: 44mm; text-align: right; }
.banda .ae span { display: block; font: 600 8pt 'IBM Plex Sans'; letter-spacing: .16em; text-transform: uppercase; color: #CFE3F1; }
.banda .ae b { display: block; font: 700 88pt/1 'IBM Plex Sans'; color: var(--ambar); letter-spacing: -.02em; }
.banda h1 { font: 700 34pt/1.08 'IBM Plex Sans'; letter-spacing: -.01em; margin: auto 0 0; max-width: 125mm; }
.banda .regla { width: 36mm; height: 3pt; background: var(--ambar); margin: 6mm 0 5mm; }
.banda .bajada { font: 400 12.5pt/1.5 'IBM Plex Sans'; color: #E2EEF6; margin: 0; max-width: 140mm; }
.frente { padding: 12mm 26mm 0; flex: 1; }
.rot { font: 600 7.5pt/1.3 'IBM Plex Sans'; letter-spacing: .14em; text-transform: uppercase; color: var(--turquesa); margin: 0 0 2.5mm; }
.aprendizaje { border-left: 3pt solid var(--turquesa); background: var(--fondo); padding: 4mm 5mm; margin: 0 0 9mm; }
.aprendizaje p { font: 600 11pt/1.5 'IBM Plex Sans'; color: var(--azul); margin: 0; }
.ficha { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm 10mm; margin: 0; }
.ficha div { border-top: .75pt solid var(--linea); padding-top: 2.5mm; }
.ficha dt { font: 600 7.5pt 'IBM Plex Sans'; letter-spacing: .12em; text-transform: uppercase; color: var(--gris); margin: 0 0 1mm; }
.ficha dd { margin: 0; font: 400 10pt/1.4 'IBM Plex Sans'; color: var(--tinta); }
.pie-portada { padding: 0 26mm 13mm; font: 400 8pt/1.5 'IBM Plex Sans'; color: var(--gris); }
.pie-portada p { border-top: .75pt solid var(--linea); padding-top: 3mm; margin: 0; }

/* Páginas interiores */
.pagina-nueva { break-before: page; }
.cabeza { margin: 0 0 9pt; }
.cabeza .kicker { font: 600 8pt/1.3 'IBM Plex Sans'; letter-spacing: .14em; text-transform: uppercase; color: var(--turquesa); margin: 0 0 3pt; }
h2 { font: 700 17pt/1.2 'IBM Plex Sans'; color: var(--azul); margin: 0; letter-spacing: -.005em; }
.tema { margin-top: 20pt; }
.tema > .cabeza { display: grid; grid-template-columns: 13mm 1fr; column-gap: 3mm; align-items: start; break-after: avoid; break-inside: avoid; }
.tema .num { font: 700 20pt/1 'IBM Plex Sans'; color: var(--turquesa); border-top: 3pt solid var(--ambar); padding-top: 4pt; }
.tema .titulos { border-top: .75pt solid var(--linea); padding-top: 5pt; }
.plan { margin: 5pt 0 0; font: 400 8pt/1.45 'IBM Plex Sans'; color: var(--gris); }
.plan b { font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--turquesa); margin-right: 4pt; }
.plan span + span::before { content: " · "; color: var(--linea); }
.criterios { list-style: none; padding: 0; margin: 0 0 12pt; }
.criterios li { display: grid; grid-template-columns: 11mm 1fr; padding: 5pt 0; border-bottom: .5pt solid var(--linea); margin: 0; font-size: 9.5pt; line-height: 1.45; }
.criterios li b { color: var(--turquesa); }
.indice { columns: 2; column-gap: 8mm; list-style: none; padding: 0; margin: 0 0 12pt; font-size: 9.5pt; }
.indice li { break-inside: avoid; padding: 3pt 0; border-bottom: .5pt solid var(--linea); margin: 0; }
.indice li b { color: var(--turquesa); margin-right: 4pt; }
.cobertura td:first-child { font-size: 8.5pt; text-transform: none; }
.cobertura td:last-child { white-space: nowrap; color: var(--azul); font-weight: 600; }
.caja { margin: 10pt 0 12pt; padding: 8pt 12pt 8pt 13pt; border-left: 3pt solid; border-radius: 0 4pt 4pt 0; font-size: 10pt; line-height: 1.5; break-inside: avoid; }
.caja p:last-child, .caja ul:last-child, .caja pre:last-child { margin-bottom: 0; }
.caja .rotulo { font: 700 7.5pt/1.3 'IBM Plex Sans'; letter-spacing: .14em; text-transform: uppercase; margin: 0 0 4pt; }
.caja .rotulo span { letter-spacing: .02em; text-transform: none; font-weight: 600; font-size: 8.5pt; }
.caja pre { background: #fff; }
.ejemplo { background: #F0F9FB; border-color: var(--turquesa); } .ejemplo .rotulo { color: var(--turquesa); }
.error { background: #FFFBEB; border-color: #D97706; } .error .rotulo { color: #92400E; }
.clave { background: #EFF6FF; border-color: var(--azul); } .clave .rotulo { color: var(--azul); }
.flujo { margin: 10pt 0 13pt; break-inside: avoid; }
.flujo figcaption { font: 600 7.5pt 'IBM Plex Sans'; letter-spacing: .14em; text-transform: uppercase; color: var(--gris); margin: 0 0 5pt; }
.pasos { display: flex; align-items: stretch; }
.paso { flex: 1 1 0; border: .75pt solid var(--linea); border-top: 3pt solid var(--turquesa); border-radius: 3pt; padding: 6pt 7pt 7pt; background: #fff; }
.paso .n { display: block; font: 700 7.5pt 'IBM Plex Sans'; color: var(--gris); letter-spacing: .1em; margin-bottom: 2pt; }
.paso b { display: block; font-size: 9.5pt; line-height: 1.3; color: var(--azul); }
.paso > span:last-child:not(.n) { display: block; margin-top: 3pt; font-size: 8.3pt; line-height: 1.4; color: var(--gris); }
.entre { display: flex; align-items: center; padding: 0 3pt; }
.entre .fl { width: 12pt; height: 8pt; }
.sintesis ul { padding-left: 0; list-style: none; }
.sintesis li { padding: 5pt 0 5pt 16pt; border-bottom: .5pt solid var(--linea); position: relative; margin: 0; }
.sintesis li::before { content: ""; position: absolute; left: 0; top: 10.5pt; width: 7pt; height: 7pt; background: var(--turquesa); border-radius: 50%; }
.preguntas { list-style: none; padding: 0; counter-reset: q; }
.preguntas li { counter-increment: q; position: relative; padding: 0 0 0 22pt; margin: 0 0 11pt; }
.preguntas li::before { content: counter(q); position: absolute; left: 0; top: 0; width: 15pt; height: 15pt; border-radius: 50%; background: var(--azul); color: #fff; font: 700 8.5pt/15pt 'IBM Plex Sans'; text-align: center; }
.preguntas .linea { display: block; height: 30pt; border-bottom: .5pt dashed var(--linea); }
.respuestas { margin-top: 14pt; border-top: 2pt solid var(--azul); padding-top: 8pt; break-inside: avoid; }
.respuestas ol { font-size: 9.5pt; line-height: 1.5; }
.glosario { display: grid; grid-template-columns: 38mm 1fr; margin: 4pt 0 0; }
.glosario dt, .glosario dd { padding: 6pt 0; border-bottom: .5pt solid var(--linea); margin: 0; break-inside: avoid; }
.glosario dt { font-weight: 600; color: var(--azul); padding-right: 6mm; }
.glosario dd { font-size: 10pt; line-height: 1.5; }
</style>`;
}

/**
 * Documento completo. d = { pf, curso, caso, modulo, codigo, horas, ae, titulo, aprendizaje, criterios, unidadesAE, lectura }
 */
export function lecturaHtml(d) {
  const { lectura } = d;
  const n = d.ae.slice(2);
  const minutos = +(lectura.meta.minutos || Math.max(10, Math.round(palabras(lectura) / 150 / 5) * 5));
  const temas = lectura.secciones.filter((s) => s.tipo === 'tema');
  const pie = `${d.pf} · Módulo 2 · Lectura AE${n} · ${d.titulo}`.replace(/"/g, '\\"');
  const sec = (s) => lectura.secciones.find((x) => x.tipo === s);
  const dondeSe = (u) => {
    const en = lectura.secciones.filter((t) => t.plan.includes(u));
    const nums = en.filter((t) => t.n).map((t) => t.n);
    const partes = en.filter((t) => !t.n).map((t) => t.titulo);
    if (nums.length === 1) partes.push(`Sección ${nums[0]}`);
    if (nums.length > 1) partes.push(`Secciones ${nums.slice(0, -1).join(', ')} y ${nums[nums.length - 1]}`);
    return partes.join(' · ');
  };
  const rotuloPlan = (s) => (s.plan.length ? `<p class="plan"><b>Contenido del plan</b>${s.plan.map((p) => `<span>${esc(p)}</span>`).join('')}</p>` : '');

  const portada = `<section class="portada">
  <div class="banda">
    <p class="kicker">Material de lectura · Módulo 2</p>
    <p class="curso">${esc(d.curso)}<br>${esc(d.modulo)}</p>
    <div class="ae"><span>Aprendizaje esperado</span><b>${n}</b></div>
    <h1>${esc(d.titulo)}</h1>
    <div class="regla"></div>
    <p class="bajada">${inline(lectura.meta.bajada ?? '')}</p>
  </div>
  <div class="frente">
    <p class="rot">Aprendizaje esperado ${n} · textual del plan formativo</p>
    <div class="aprendizaje"><p>${esc(d.aprendizaje)}</p></div>
    <dl class="ficha">
      <div><dt>Plan formativo</dt><dd>${esc(d.pf)} · ${esc(d.curso)}</dd></div>
      <div><dt>Módulo</dt><dd>${esc(d.codigo)} · ${esc(d.modulo)} · ${esc(d.horas)} h</dd></div>
      <div><dt>Caso de estudio</dt><dd>${esc(d.caso)}, empresa ficticia</dd></div>
      <div><dt>Tiempo de lectura</dt><dd>${minutos} minutos, más la autocomprobación</dd></div>
    </dl>
  </div>
  <div class="pie-portada"><p>El caso, las personas y los datos de esta lectura son ficticios y tienen fines formativos.</p></div>
</section>`;

  const guia = `<section class="guia">
  <div class="cabeza"><p class="kicker">Guía de la lectura</p><h2>Qué vas a lograr</h2></div>
  <p>Al terminar esta lectura tendrás la base para demostrar los criterios de evaluación del aprendizaje esperado ${n}, textuales del plan formativo:</p>
  <ul class="criterios">${d.criterios.map((c) => { const m = /^(\d+\.\d+)\s+(.+)$/.exec(c.replace(/^- /, '')); return `<li><b>${m ? m[1] : ''}</b><span>${esc(m ? m[2] : c)}</span></li>`; }).join('')}</ul>
  <h3>Cómo está organizada</h3>
  <ol class="indice">${temas.map((t) => `<li><b>${t.n}</b>${inline(t.titulo)}</li>`).join('')}<li><b>+</b>En síntesis, práctica, autocomprobación y glosario</li></ol>
  <h3>Contenidos del plan y dónde se tratan</h3>
  <table class="cobertura"><thead><tr><th>Contenido del plan formativo (textual)</th><th>Dónde</th></tr></thead><tbody>${
    d.unidadesAE.map((u) => `<tr><td>${esc(u)}</td><td>${dondeSe(u)}</td></tr>`).join('')}</tbody></table>
</section>`;

  const intro = sec('intro');
  const introHtml = intro ? `<section class="intro" style="margin-top:24pt"><div class="cabeza"><p class="kicker">Para comenzar</p><h2>Antes de empezar</h2>${rotuloPlan(intro)}</div>${cuerpo(intro.lineas, d.caso)}</section>` : '';

  const temasHtml = temas.map((t) => `<section class="tema">
  <div class="cabeza"><div class="num">${t.n}</div><div class="titulos"><h2>${inline(t.titulo)}</h2>
  ${rotuloPlan(t)}</div></div>
  ${cuerpo(t.lineas, d.caso)}
</section>`).join('\n');

  const sint = sec('sintesis');
  const prac = sec('practica');
  const cierre = `<section class="sintesis pagina-nueva"><div class="cabeza"><p class="kicker">Cierre</p><h2>En síntesis</h2></div>${cuerpo(sint.lineas, d.caso)}</section>
<section class="practica" style="margin-top:18pt"><div class="cabeza"><p class="kicker">Siguiente paso</p><h2>Para practicar</h2></div>${cuerpo(prac.lineas, d.caso)}</section>`;

  const q = preguntas(sec('autocomprobacion').lineas);
  const auto = `<section class="autocomprobacion pagina-nueva"><div class="cabeza"><p class="kicker">Comprueba lo que aprendiste</p><h2>Autocomprobación</h2></div>
  <p>Responde con tus palabras antes de mirar las respuestas. Si dudas en alguna, vuelve a la sección que se indica.</p>
  <ol class="preguntas">${q.map((x) => `<li>${inline(x.pregunta)}<span class="linea"></span></li>`).join('')}</ol>
  <div class="respuestas"><p class="rot">Respuestas</p><ol>${q.map((x) => `<li>${inline(x.respuesta)}</li>`).join('')}</ol></div>
</section>`;

  const glos = `<section class="glosario-sec pagina-nueva"><div class="cabeza"><p class="kicker">Términos del aprendizaje esperado ${n}</p><h2>Glosario</h2></div>
  <dl class="glosario">${terminos(sec('glosario').lineas).map((t) => `<dt>${inline(t.termino)}</dt><dd>${inline(t.definicion.charAt(0).toUpperCase() + t.definicion.slice(1))}</dd>`).join('')}</dl></section>`;

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>M2 · Lectura AE${n} · ${esc(d.titulo)}</title>
<meta name="author" content="${esc(d.pf)} · Módulo 2"><meta name="description" content="${esc(lectura.meta.bajada ?? '')}">
${estilos(pie)}</head><body>
${flechas([portada, guia, introHtml, temasHtml, cierre, auto, glos].join('\n'))}
</body></html>`;
}
