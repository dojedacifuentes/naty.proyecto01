#!/usr/bin/env node
/**
 * Arma el sitio estático del módulo 2 en public/. Vercel lo construye y lo publica en cada push
 * (vercel.json: buildCommand "npm run sitio", outputDirectory "public").
 *
 *   npm run sitio
 *
 * Publica modulo-2/, los contenidos del módulo 2 de PF1821 y PF1822 y los PDF del hito del
 * 24-sep que la sección enlaza. Cada .md pasa a .html (README.md → index.html), cada carpeta sin
 * README tiene un índice, y los enlaces a archivos que no se publican apuntan a GitHub. Además
 * arma los paquetes descargables en public/descargas/ (PPT para HeyGen, prompts de infografía).
 *
 * Sin dependencias (AGENTS.md §8). public/ está en .gitignore: se regenera, no se versiona.
 */
import fs from 'node:fs';
import path from 'node:path';
import { ruta, listar, rel, leer, git } from './lib/repo.mjs';
import { markdown, esc } from './lib/html.mjs';
import { crearZip } from './lib/zip.mjs';

const REPO = 'https://github.com/dojedacifuentes/naty.proyecto01';
const SALIDA = 'public';
const CURSOS = [
  { pf: 'PF1821', carpeta: 'PF1821-agentes-low-code', nombre: 'Construcción de Agentes y Automatización con Herramientas Low Code' },
  { pf: 'PF1822', carpeta: 'PF1822-desarrollo-con-ia', nombre: 'Especialización en Desarrollo con IA' },
];

// Qué se publica. Del hito del 24-sep solo lo que la sección del módulo 2 enlaza.
const RAICES = ['modulo-2', 'contenidos/PF1821/modulo-2', 'contenidos/PF1822/modulo-2', 'entregables/2026-09-24-modulo2'];
const DEL_HITO = /^entregables\/2026-09-24-modulo2\/(README\.md|kit-recursos-modulo2-PF18\d\d\.pdf|manual-entregables-modulo2-PF1821-PF1822\.pdf|modulo2-PF1821-PF1822-completo\.pdf)$/;
const publicados = new Set(
  RAICES.flatMap((r) => listar(ruta(r)).map(rel))
    .filter((f) => !f.startsWith('entregables/') || DEL_HITO.test(f)),
);

const salidaDe = (f) => (f.endsWith('.md') ? f.replace(/(^|\/)README\.md$/, '$1index.html').replace(/\.md$/, '.html') : f);
const esCarpetaPublicada = (d) => [...publicados].some((f) => f.startsWith(d.replace(/\/?$/, '/')));

// Enlace de una página: relativo si el destino se publica; si no, a GitHub.
function reescribirEnlaces(html, dirFuente, dirSalida) {
  return html.replace(/href="([^"]+)"/g, (m, href) => {
    if (/^([a-z]+:|#|\/)/i.test(href)) return m;
    const [camino, ancla = ''] = href.split('#');
    const esDir = camino.endsWith('/') || (fs.existsSync(ruta(path.posix.join(dirFuente, camino))) &&
      fs.statSync(ruta(path.posix.join(dirFuente, camino))).isDirectory());
    const destino = path.posix.normalize(path.posix.join(dirFuente, camino)).replace(/\/$/, '');
    const frag = ancla ? `#${ancla}` : '';
    if (esDir) {
      if (!esCarpetaPublicada(destino)) return `href="${REPO}/tree/main/${destino}${frag}"`;
      return `href="${path.posix.relative(dirSalida, destino) || '.'}/${frag}"`;
    }
    if (!publicados.has(destino)) return `href="${REPO}/blob/main/${destino}${frag}"`;
    return `href="${path.posix.relative(dirSalida, salidaDe(destino))}${frag}"`;
  });
}

const commit = (git(['rev-parse', '--short', 'HEAD'], { opcional: true }) || '').trim();
const fecha = new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });

function pagina(titulo, cuerpo, dirSalida) {
  const a = (p) => path.posix.relative(dirSalida, p) || '.';
  const nav = [
    ['Inicio', a('index.html')],
    ['PF1821 · Agentes', `${a('modulo-2/PF1821-agentes-low-code')}/`],
    ['PF1822 · IA', `${a('modulo-2/PF1822-desarrollo-con-ia')}/`],
    ['Revisión contra bases', a('modulo-2/REVISION-BASES.html')],
    ['Flujo de producción', a('modulo-2/FLUJO-PRODUCCION.html')],
  ].map(([t, h]) => `<a href="${h}">${t}</a>`).join('');
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}${/Módulo 2/.test(titulo) ? '' : ' · Módulo 2'}</title>
<style>
:root { --fondo:#f7f8fa; --papel:#ffffff; --tinta:#1f2937; --tenue:#5b6675; --linea:#dde3ea; --acento:#0e7490; --oscuro:#0f3d5e; --zebra:#f2f5f8; --cita:#e8f2f6; }
@media (prefers-color-scheme: dark) { :root { --fondo:#0f141a; --papel:#161d25; --tinta:#e4e9ef; --tenue:#9aa6b4; --linea:#2a3440; --acento:#38b2cc; --oscuro:#9fd3e6; --zebra:#1b242e; --cita:#15303b; } }
* { box-sizing: border-box; }
body { margin: 0; background: var(--fondo); color: var(--tinta); font: 16px/1.6 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
header { background: var(--oscuro); color: #fff; }
@media (prefers-color-scheme: dark) { header { background: #0b2a3f; } }
header .in { max-width: 1100px; margin: 0 auto; padding: 14px 16px; display: flex; flex-wrap: wrap; gap: 6px 18px; align-items: baseline; }
header b { font-size: 15px; margin-right: 8px; }
header a { color: #cfe6f1; text-decoration: none; font-size: 14px; } header a:hover { color: #fff; text-decoration: underline; }
main { max-width: 1100px; margin: 0 auto; padding: 24px 16px 48px; }
article { background: var(--papel); border: 1px solid var(--linea); border-radius: 10px; padding: 24px 28px; overflow-wrap: anywhere; }
@media (max-width: 640px) { article { padding: 16px; } }
h2 { font-size: 1.7rem; line-height: 1.25; color: var(--oscuro); margin: 0 0 12px; }
h3 { font-size: 1.3rem; color: var(--oscuro); margin: 28px 0 8px; } h4 { font-size: 1.1rem; margin: 20px 0 6px; } h5 { font-size: 1rem; margin: 16px 0 4px; }
a { color: var(--acento); }
.tabla { overflow-x: auto; margin: 10px 0 16px; }
table { border-collapse: collapse; width: 100%; font-size: 14px; }
th { text-align: left; background: var(--oscuro); color: #fff; padding: 8px 10px; vertical-align: bottom; }
@media (prefers-color-scheme: dark) { th { background: #1f4e6b; } }
td { padding: 8px 10px; border-bottom: 1px solid var(--linea); vertical-align: top; }
tbody tr:nth-child(even) td { background: var(--zebra); }
.c { text-align: center; } .r { text-align: right; }
code { font: 0.9em ui-monospace, Consolas, monospace; background: var(--zebra); padding: 1px 4px; border-radius: 4px; }
pre { background: var(--zebra); border: 1px solid var(--linea); border-left: 3px solid var(--acento); padding: 10px 12px; overflow-x: auto; border-radius: 6px; }
pre code { background: none; padding: 0; }
blockquote { margin: 12px 0; padding: 8px 14px; background: var(--cita); border-left: 3px solid var(--acento); border-radius: 4px; }
hr { border: 0; border-top: 1px solid var(--linea); margin: 20px 0; }
.box { display: inline-block; width: 12px; height: 12px; border: 1.5px solid var(--tenue); border-radius: 2px; margin-right: 6px; vertical-align: -1px; }
.box.on { background: var(--acento); border-color: var(--acento); }
.lbl { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--acento); font-weight: 700; }
.migas { font-size: 13px; color: var(--tenue); margin: 0 0 12px; }
.lista li { margin: 4px 0; } .peso { color: var(--tenue); font-size: 13px; }
footer { max-width: 1100px; margin: 0 auto; padding: 0 16px 32px; color: var(--tenue); font-size: 13px; }
</style></head>
<body><header><div class="in"><b>Módulo 2 · Becas Laborales Talento Digital 2026</b>${nav}</div></header>
<main><article>${cuerpo}</article></main>
<footer>Generado desde <a href="${REPO}">el repositorio</a>${commit ? ` (commit ${commit})` : ''} el ${fecha}. Borrador de trabajo: nada de esto está revisado por una persona salvo que se indique.</footer>
</body></html>`;
}

// Las tablas anchas se desplazan dentro de su caja en pantallas angostas.
const envolverTablas = (html) => html.replace(/<table>/g, '<div class="tabla"><table>').replace(/<\/table>/g, '</table></div>');

function escribirSalida(destino, contenido) {
  const abs = ruta(SALIDA, destino);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, contenido);
}

// ------------------------------------------------------------------ paquetes

// El mismo zip que se entrega a quien produce: PPT numerados en orden, guiones y un LEEME.
function paqueteVideos() {
  const ORDEN = [['AE3-capsula', 'AE3-guion.md', 'M2-AE3-Videocapsula.mp4'], ['H2-video-interactivo', 'H2-video-interactivo-guion.md', 'M2-Herramienta-2-Video.mp4'],
    ['AE1-capsula', 'AE1-guion.md', 'M2-AE1-Videocapsula.mp4'], ['AE2-capsula', 'AE2-guion.md', 'M2-AE2-Videocapsula.mp4'],
    ['AE4-capsula', 'AE4-guion.md', 'M2-AE4-Videocapsula.mp4'], ['00-bienvenida', '00-bienvenida-guion.md', 'M2-Bienvenida.mp4']];
  const leeme = ['VIDEOS DEL MÓDULO 2 PARA HEYGEN — PF1821 y PF1822', '',
    'Cada carpeta de curso trae 6 PPT numerados en el orden de producción (primero el AE3, el aprendizaje seleccionado).',
    'Las 4 videocápsulas (AE1 a AE4) traen en la lámina 2 el aprendizaje esperado y sus criterios, textuales del plan,',
    'y cada lámina rotulada con el contenido del plan que cubre, también textual, para facilitar el trabajo del revisor.',
    'La narración está en las notas del orador. Si HeyGen no la toma al importar, cópiala del archivo de guiones/.', '',
    'Pasos: 1) plantilla única en HeyGen: avatar, voz en español latinoamericano, subtítulos activados.',
    '2) Importar el PPT (presentación a video) y revisar que cada escena tenga su guion. 3) Avatar en el tercio derecho.',
    '4) Corregir la pronunciación de n8n, JSON, API, Supabase, ROUGE y BLEU. 5) En la bienvenida y en la herramienta 2, reemplazar',
    '"Imagen sugerida" o "Pantalla sugerida" por la captura, o borrarlo. 6) Exportar en MP4 1080p con el nombre indicado abajo,',
    'subir a Drive y pegar el enlace en modulo-2/<curso>/produccion/ESTADO.md del repositorio.', ''];
  const entradas = [];
  for (const c of CURSOS) {
    const dir = `modulo-2/${c.carpeta}/produccion/videos/`;
    leeme.push(`${c.carpeta}:`);
    ORDEN.forEach(([base, guion, mp4], i) => {
      entradas.push({ nombre: `${c.carpeta}/${i + 1}-${base}.pptx`, contenido: fs.readFileSync(ruta(dir + base + '.pptx')) });
      entradas.push({ nombre: `${c.carpeta}/guiones/${i + 1}-${guion}`, contenido: fs.readFileSync(ruta(dir + guion)) });
      leeme.push(`  ${i + 1}-${base}.pptx  ->  ${mp4}`);
    });
    leeme.push('');
  }
  return crearZip([{ nombre: 'LEEME.txt', contenido: leeme.join('\r\n') }, ...entradas]);
}

function paqueteInfografias() {
  const ORDEN = [['AE3', 'M2-AE3-Infografia.png'], ['AE1', 'M2-AE1-Infografia.png'], ['AE2', 'M2-AE2-Infografia.png'],
    ['AE4', 'M2-AE4-Infografia.png'], ['ruta', 'M2-Ruta-Infografia.png']];
  const leeme = ['INFOGRAFÍAS DEL MÓDULO 2 — PF1821 y PF1822', '',
    'Cada archivo .txt de las carpetas de curso es un prompt completo: se copia entero en la herramienta.',
    'Van numerados en orden de producción (primero el AE3, el aprendizaje seleccionado).',
    'Cada prompt trae: encargo y propósito, formato y medidas, tipografía con tamaños en px, color y contraste,',
    'íconos, diagramación, reglas de texto, el CONTENIDO exacto y un control antes de entregar.', '',
    'QUÉ PIDEN LAS BASES Y QUÉ NO (para que no haya dudas)',
    '- Las bases no fijan formato, medidas ni cantidad de infografías.',
    '- Sí piden medios que apoyen el aprendizaje (Anexo N°7, num. 7 d, pág. 110) y un ambiente intuitivo, lineal y',
    '  amigable, con íconos, multimedia e imágenes (num. 7 c, pág. 110), que se evalúa en el LMS (7.4, págs. 30-31).',
    '- Las medidas, tipografías y colores de los prompts son el estándar de este proyecto: aseguran que se lea bien y',
    '  que todas las infografías se vean iguales.',
    '- El aprendizaje esperado, la competencia y los contenidos del plan van textuales, en mayúsculas como en el plan,',
    '  para que el revisor compare sin interpretar.', '',
    'MEDIDAS: ancho fijo de 1080 px. El alto de cada infografía está calculado para que su contenido quepa sin achicar la',
    'letra (formato de infografía vertical larga, como el estándar de Canva de 800 x 2000). Cada prompt dice su medida.', '',
    'HERRAMIENTAS: Genially o Canva (el equipo ya usa Genially), Gamma o Napkin. Si la herramienta no acepta un prompt',
    'tan largo, pega solo el bloque CONTENIDO y aplica a mano ESPECIFICACIONES-VISUALES.txt. Si usas un generador de',
    'imágenes, pídele el diseño con los espacios de texto vacíos y escribe el texto encima: suelen deformar las letras.', '',
    'AL SUBIR AL LMS: usa el texto de textos-alternativos.txt de cada curso en el campo "texto alternativo" de la imagen.', ''];
  const entradas = [];
  for (const c of CURSOS) {
    const dir = `modulo-2/${c.carpeta}/produccion/infografias/`;
    const md = leer(`${dir}prompts.md`);
    const secciones = md.split(/\n(?=## )/).filter((s) => s.startsWith('## '));
    leeme.push(`${c.carpeta}:`);
    ORDEN.forEach(([clave, png], i) => {
      const s = secciones.find((x) => (clave === 'ruta' ? /^## Infografía de la ruta/.test(x) : new RegExp(`^## Infografía ${clave} `).test(x)));
      const prompt = /```text\n([\s\S]*?)\n```/.exec(s ?? '')?.[1];
      if (!prompt) throw new Error(`${c.pf}: no encuentro el prompt de la infografía ${clave}`);
      const medida = /Lienzo de (1080 × \d+ px)/.exec(prompt)?.[1] ?? '';
      const nombre = `${i + 1}-infografia-${clave === 'ruta' ? 'ruta-del-modulo' : clave}.txt`;
      entradas.push({ nombre: `${c.carpeta}/${nombre}`, contenido: prompt.trim().replace(/\n/g, '\r\n') + '\r\n' });
      leeme.push(`  ${nombre}  ->  ${png}  (${medida})`);
    });
    entradas.push({ nombre: `${c.carpeta}/textos-alternativos.txt`, contenido: fs.readFileSync(ruta(`${dir}textos-alternativos.txt`)) });
    leeme.push('');
  }
  const espec = fs.readFileSync(ruta(`modulo-2/${CURSOS[0].carpeta}/produccion/infografias/especificaciones-visuales.txt`));
  return crearZip([{ nombre: 'LEEME.txt', contenido: leeme.join('\r\n') }, { nombre: 'ESPECIFICACIONES-VISUALES.txt', contenido: espec }, ...entradas]);
}

// Los 8 PDF de lectura (carril automático) con un LEEME que dice qué son y cómo se diseñaron.
function paqueteLecturas() {
  const leeme = ['LECTURAS DEL MÓDULO 2 — PF1821 y PF1822', '',
    'Ocho PDF listos para subir, uno por aprendizaje esperado: M2-AEn-Lectura.pdf. Sin logos ni nombres de instituciones.', '',
    'QUÉ TRAE CADA LECTURA',
    '- Portada con el aprendizaje esperado textual del plan formativo, el plan, el módulo, el caso y el tiempo de lectura.',
    '- Guía: los criterios de evaluación textuales, el índice y la tabla "Contenidos del plan y dónde se tratan".',
    '- Secciones numeradas, cada una rotulada con su contenido del plan (textual), con un ejemplo del caso ficticio',
    '  (Mercado Austral o Nube Sur) y recuadros de "Error frecuente" e "Idea clave".',
    '- Cierre: en síntesis, para practicar (actividades y herramientas del módulo), autocomprobación con 3 preguntas',
    '  y sus respuestas, y un glosario de 8 términos.', '',
    'QUÉ PIDEN LAS BASES Y EL PLAN, Y QUÉ NO',
    '- El plan formativo de cada curso exige, en sus materiales e insumos, "MANUAL DIDÁCTICO CON TODOS LOS CONTENIDOS',
    '  DEL MÓDULO" y "PLATAFORMA LMS IMPLEMENTADA CON MATERIAL DIDÁCTICO". Las 4 lecturas de cada curso cubren el 100 %',
    '  de los contenidos del módulo 2, textuales.',
    '- Las bases valoran los medios de apoyo al aprendizaje (Anexo N°7, num. 7 d, pág. 110). No fijan formato ni diseño.',
    '- Una lectura por aprendizaje esperado es el estándar del equipo (videocápsula, flipbook de lectura, quiz e infografía).', '',
    'DISEÑO GRÁFICO (estándar de este proyecto)',
    '- Formato A4 vertical. Márgenes de 22 mm arriba, 24 mm abajo y 26 mm a los lados. Unos 75 caracteres por línea.',
    '- Dos familias tipográficas, incrustadas en el PDF: IBM Plex Sans para el texto y los títulos, e IBM Plex Mono para',
    '  el código. Las dos tienen licencia SIL Open Font License.',
    '- Tamaños: texto 11 pt con interlineado 1,55; títulos de sección 17 pt; título de portada 34 pt; código 8,4 pt;',
    '  rótulos y pies de 7,5 pt como mínimo.',
    '- Color: azul #0F3D5E (títulos y tablas), turquesa #0E7490 (rótulos y ejemplos), tinta #1F2937 (texto), gris',
    '  #475569 (texto secundario) y ámbar #F59E0B solo decorativo. Todo texto cumple el contraste WCAG 2.1 AA (4,5:1).',
    '- Recuadros con código de color: ejemplo del caso (turquesa), error frecuente (ámbar) e idea clave (azul).',
    '  Diagramas de flujo dibujados en el documento, sin imágenes externas.',
    '- Pie en cada página con el plan, el módulo, el aprendizaje y la página ("3 / 14"). Marcadores por título.', '',
    'VERIFICACIÓN AUTOMÁTICA (no se imprime una lectura que falle)',
    '- Cada contenido del plan del aprendizaje aparece, textual, en una sección, y ningún rótulo es ajeno al plan.',
    '- El aprendizaje esperado y los criterios salen de la ficha SIPFOR, no se escriben a mano.',
    '- Cada sección tiene un ejemplo; hay al menos 3 errores frecuentes, 3 preguntas con respuesta y 8 términos.',
    '- Sin nombres de instituciones ni marcas de trabajo, y sin caracteres que obliguen a usar una tercera tipografía.', '',
    'AL SUBIR AL LMS: como recurso "Archivo" o convertido en flipbook (Heyzine o FlipHTML5 importan el PDF), con el',
    'nombre "Lectura AE1" a "Lectura AE4". La fuente editable está en contenidos/<curso>/modulo-2/lecturas/AEn.md del',
    'repositorio; "npm run produccion -- PF1821 PF1822 --solo-lecturas" revisa y vuelve a generar los PDF.', ''];
  const entradas = [];
  for (const c of CURSOS) {
    leeme.push(`${c.carpeta}:`);
    for (const n of [1, 2, 3, 4]) {
      const pdf = `modulo-2/${c.carpeta}/entrega/AE${n}/M2-AE${n}-Lectura.pdf`;
      const datos = fs.readFileSync(ruta(pdf));
      const paginasPdf = (datos.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
      const titulo = /^# Lectura AE\d · (.+)$/m.exec(leer(`contenidos/${c.pf}/modulo-2/lecturas/AE${n}.md`))?.[1] ?? '';
      entradas.push({ nombre: `${c.carpeta}/M2-AE${n}-Lectura.pdf`, contenido: datos });
      leeme.push(`  M2-AE${n}-Lectura.pdf  ${titulo} (${paginasPdf} páginas)`);
    }
    leeme.push('');
  }
  return crearZip([{ nombre: 'LEEME.txt', contenido: leeme.join('\r\n') }, ...entradas]);
}

// ------------------------------------------------------------------ armado

fs.rmSync(ruta(SALIDA), { recursive: true, force: true });
let paginas = 0; let copiados = 0;

for (const f of publicados) {
  const dir = path.posix.dirname(f);
  if (f.endsWith('.md')) {
    const md = leer(f);
    const titulo = /^# (.+)$/m.exec(md)?.[1] ?? path.posix.basename(f, '.md');
    const migas = `<p class="migas">${esc(dir)}/${esc(path.posix.basename(f))} · <a href="${REPO}/blob/main/${f}">ver en GitHub</a></p>`;
    const cuerpo = migas + envolverTablas(reescribirEnlaces(markdown(md), dir, dir));
    escribirSalida(salidaDe(f), pagina(titulo, cuerpo, dir));
    paginas++;
  } else {
    fs.mkdirSync(path.dirname(ruta(SALIDA, f)), { recursive: true });
    fs.copyFileSync(ruta(f), ruta(SALIDA, f));
    copiados++;
  }
}

// Índice para cada carpeta publicada que no tiene README.
const carpetas = new Set([...publicados].flatMap((f) => {
  const partes = f.split('/'); return partes.slice(1, -1).map((_, i) => partes.slice(0, i + 2).join('/'));
}));
for (const d of [...carpetas].filter((d) => RAICES.some((r) => d === r || d.startsWith(r + '/')))) {
  if (publicados.has(`${d}/README.md`)) continue;
  const hijos = [...publicados].filter((f) => f.startsWith(d + '/')).map((f) => f.slice(d.length + 1));
  const subdirs = [...new Set(hijos.filter((h) => h.includes('/')).map((h) => h.split('/')[0]))].sort();
  const archivos = hijos.filter((h) => !h.includes('/')).sort();
  const kb = (h) => Math.max(1, Math.round(fs.statSync(ruta(d, h)).size / 1024));
  const items = [
    ...subdirs.map((s) => `<li>📁 <a href="${esc(s)}/">${esc(s)}/</a></li>`),
    ...archivos.map((h) => `<li><a href="${esc(salidaDe(h))}">${esc(h)}</a> <span class="peso">${kb(h)} KB</span></li>`),
  ].join('');
  const cuerpo = `<p class="migas">${esc(d)}/ · <a href="${REPO}/tree/main/${d}">ver en GitHub</a></p><h2>${esc(d.split('/').at(-1))}</h2><ul class="lista">${items}</ul>`;
  escribirSalida(`${d}/index.html`, pagina(d.split('/').at(-1), cuerpo, d));
  paginas++;
}

// Las actividades prácticas de un curso (npm run produccion): participante (enunciados, Moodle,
// insumos) y tutor (respuesta modelada y código o workflow), con un LEEME ceñido a las bases.
function paqueteActividades(c) {
  const base = `modulo-2/${c.carpeta}/entrega/actividades`;
  const c2 = leer(`contenidos/${c.pf}/modulo-2/C2-actividades.md`);
  const filas = c2.split('\n').filter((l) => l.startsWith('| ')).map((l) => l.split('|').slice(1, -1).map((x) => x.trim()));
  const dato = (rotulo, n) => filas.find((f) => f[0] === rotulo)?.[n] ?? '';
  const aes = [1, 2].map((n) => dato('AE que cubre', n));
  if (!aes.every((a) => /\bAE3\b/.test(a))) throw new Error(`${c.pf}: las dos actividades deben cubrir el AE3 (7.4, pág. 31)`);
  const entradas = [];
  const agregar = (origen, destino) => entradas.push({ nombre: destino, contenido: fs.readFileSync(ruta(`${base}/${origen}`)) });
  const archivos = (dir) => (fs.existsSync(ruta(`${base}/${dir}`)) ? listar(ruta(`${base}/${dir}`)).map((a) => path.relative(ruta(`${base}/${dir}`), a).replace(/\\/g, '/')) : []);
  agregar('M2-Actividades-Enunciados-respaldo.pdf', 'M2-Actividades-Enunciados-respaldo.pdf');
  for (const n of [1, 2]) {
    agregar(`M2-Actividad-${n}-Enunciado.pdf`, `participante/M2-Actividad-${n}-Enunciado.pdf`);
    agregar(`moodle/M2-Actividad-${n}-Moodle.html`, `participante/moodle/M2-Actividad-${n}-Moodle.html`);
    agregar(`M2-Actividad-${n}-Respuesta-modelada.pdf`, `tutor/M2-Actividad-${n}-Respuesta-modelada.pdf`);
  }
  const insumos = archivos('insumos');
  const tutor = archivos('respuesta-modelada');
  insumos.forEach((a) => agregar(`insumos/${a}`, `participante/insumos/${a}`));
  tutor.forEach((a) => agregar(`respuesta-modelada/${a}`, `tutor/${a}`));
  const esN8n = c.pf === 'PF1821';
  const leeme = [`ACTIVIDADES PRÁCTICAS DEL MÓDULO 2 — ${c.pf} · ${c.nombre}`, '',
    'Recursos neutros, sin logos ni nombres de instituciones, listos para montar en el LMS. Casos y datos ficticios.', '',
    'QUÉ PIDEN LAS BASES (Resolución Exenta 2320, bases 2026) Y CÓMO SE CUMPLE',
    '- Proceso de aprendizaje, 30 % del criterio Metodología (7.4, pág. 31). Para el 7,0: "al menos, 2 actividades',
    '  prácticas distintas para el aprendizaje esperado y módulo desarrollado" que "permiten que el participante adquiera',
    '  la(s) habilidad(es) del aprendizaje esperado seleccionado".',
    '  -> Son 2 actividades de técnicas distintas y las dos trabajan el AE3, el aprendizaje seleccionado:',
    ...[1, 2].map((n) => `     Actividad ${n} · ${dato('Nombre', n)} · ${dato('Técnica', n)} · ${aes[n - 1]} · ${dato('Tiempo estimado', n)}`),
    '- Guía de elaboración (Anexo N°7, num. 7 b), págs. 109-110): el proceso de aprendizaje incluye "una retroalimentación',
    '  efectiva y significativa". Su ejemplo propone una actividad de resolución de problemas con tutoriales y videos, y',
    '  otra de análisis de caso con gamificación y simulación, las dos con "Respuesta modelada".',
    `  -> La actividad 1 es de resolución de problemas, apoyada en ${esN8n ? 'el tutorial guiado' : 'el notebook guiado'} y las cápsulas; la 2 es análisis`,
    `     de caso con ${esN8n ? 'misiones con puntaje e insignias (gamificación)' : 'simulación y tablero de puntajes (gamificación)'}. Cada una trae su respuesta modelada`,
    '     (carpeta tutor/) y se evalúa con una rúbrica por criterio, que devuelve un nivel y no solo una nota.',
    '- Anexo N°2, VI (pág. 90): a) las actividades del módulo con sus horas y si son sincrónicas o asincrónicas;',
    '  b) "¿Cómo lo hará?", las actividades didácticas (simulación, análisis de caso...); c) "¿Con qué lo van a hacer?",',
    '  los medios en el LMS, "adjuntando el enlace en LMS para poder revisar el desarrollo de las actividades descritas".',
    '  -> Las horas y la modalidad de cada actividad están arriba y en la ficha de cada PDF. Los PDF y el HTML para Moodle',
    '     son el contenido de VI b); el enlace de VI c) se agrega cuando cada institución monte la actividad en su LMS.',
    '- La metodología "será evaluada de acuerdo a la experiencia que obtendrá el usuario en el LMS" (7.4, pág. 30).',
    '  -> Por eso cada actividad trae su descripción de Tarea lista para pegar en Moodle, con enunciado, insumos',
    '     adjuntos, entrega y cómo se evalúa.', '',
    'QUÉ HAY EN ESTE ZIP',
    '- M2-Actividades-Enunciados-respaldo.pdf: los enunciados de las dos actividades en un solo documento.',
    '- participante/: lo que ve el participante.',
    '    M2-Actividad-n-Enunciado.pdf   enunciado con ficha (técnica, horas, aprendizajes, indicadores, producto y evaluación).',
    '    moodle/M2-Actividad-n-Moodle.html   descripción de la Tarea de Moodle, con estilos en línea.',
    ...insumos.map((a) => `    insumos/${a}`),
    '- tutor/: NO se publica para el participante.',
    '    M2-Actividad-n-Respuesta-modelada.pdf',
    ...tutor.map((a) => `    ${a}`), '',
    'CÓMO SE MONTA EN MOODLE (una Tarea por actividad)',
    '1) Agregar actividad > Tarea. Nombre: "Actividad n · <nombre>".',
    '2) Descripción: abrir moodle/M2-Actividad-n-Moodle.html en el navegador, copiar desde el recuadro azul hasta el final y',
    '   pegar. O, en el editor, usar el botón de código HTML y pegar el contenido de <div id="moodle">.',
    '3) Archivos adicionales: los de insumos/ que nombra la descripción y el PDF del enunciado.',
    '4) Tipo de entrega: archivos. Calificación: rúbrica, con los criterios del instrumento que nombra la ficha de la actividad.',
    '5) Sugerencia (decisión de cada institución): compartir la respuesta modelada después del plazo de entrega.', '',
    'ANTES DE PUBLICAR (pendiente, no se pudo hacer en la máquina donde se generó)',
    ...(esN8n
      ? ['- Importar insumos/pedidos_enrutados_v0.json y tutor/pedidos_enrutados_corregido.json en n8n, correr',
        '  insumos/actividad-2-tablas.sql en Supabase, conectar la credencial de Supabase y ejecutar los 6 pedidos de prueba:',
        '  el roto debe mostrar las 5 fallas y el corregido debe guardar cada pedido en su ruta.']
      : ['- Ejecutar el código de tutor/codigo/ con pytest y una clave de prueba (no se ejecutó: no había Python).']),
    '- Revisión de contenido por una persona (las casillas del README del curso se marcan solo después de esa revisión).', ''];
  return crearZip([{ nombre: 'LEEME.txt', contenido: leeme.join('\r\n') }, ...entradas]);
}

// Paquetes descargables.
for (const c of CURSOS) escribirSalida(`descargas/actividades-modulo2-${c.pf}.zip`, paqueteActividades(c));
escribirSalida('descargas/videos-heygen-modulo2.zip', paqueteVideos());
escribirSalida('descargas/infografias-modulo2.zip', paqueteInfografias());
escribirSalida('descargas/lecturas-modulo2.zip', paqueteLecturas());

// Portada: la del módulo 2, con los enlaces resueltos desde la raíz, y las descargas.
{
  const md = leer('modulo-2/README.md');
  const descargas = `<h3>Descargas para producción</h3><ul class="lista">
<li><a href="descargas/videos-heygen-modulo2.zip">videos-heygen-modulo2.zip</a>: los 12 PPT para HeyGen (bienvenida, 4 videocápsulas y video de la herramienta 2, por curso), con guiones y pasos.</li>
<li><a href="descargas/infografias-modulo2.zip">infografias-modulo2.zip</a>: los 10 prompts de infografía, uno por archivo.</li>
<li><a href="descargas/lecturas-modulo2.zip">lecturas-modulo2.zip</a>: las 8 lecturas en PDF (una por aprendizaje esperado), listas para subir.</li>
${CURSOS.map((c) => `<li><a href="descargas/actividades-modulo2-${c.pf}.zip">actividades-modulo2-${c.pf}.zip</a>: las 2 actividades prácticas de ${c.pf} (enunciados, PDF de respaldo, HTML para Moodle, insumos y respuesta modelada), con un LEEME ceñido a las bases.</li>`).join('\n')}
${CURSOS.map((c) => `<li>${c.pf} · <a href="modulo-2/${c.carpeta}/entrega/">recursos listos para subir</a> · <a href="modulo-2/${c.carpeta}/produccion/ESTADO.html">estado de producción</a></li>`).join('\n')}
</ul>`;
  const cuerpo = envolverTablas(reescribirEnlaces(markdown(md), 'modulo-2', '.')) + descargas;
  escribirSalida('index.html', pagina('Módulo 2 · PF1821 y PF1822', cuerpo, '.'));
  paginas++;
}

console.log(`${SALIDA}/ → ${paginas} páginas, ${copiados} archivos copiados, ${3 + CURSOS.length} paquetes en descargas/`);
