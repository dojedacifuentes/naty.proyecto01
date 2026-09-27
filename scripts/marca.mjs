#!/usr/bin/env node
/**
 * Aplica la marca de un cliente a los recursos del módulo 2 y arma un zip por curso.
 *
 *   npm run marca -- <cliente> [PF1821 PF1822] [--solo-revisar]
 *
 * La marca vive en privado/marcas/<cliente>/marca.json (con su logo al lado), fuera de git: el repo
 * es público y los clientes compiten entre sí (OPEN-QUESTIONS #11). La plantilla está en
 * templates/marca.json. Si no se indican cursos, usa los de "cursos" en marca.json.
 *
 * Toma los HTML que dejó `npm run produccion` (su manifiesto en .scratch/produccion/<PF>/) y los
 * vuelve a imprimir con los colores del cliente, su logo en la portada o la cabecera y su nombre en
 * el pie. Los demás archivos de entrega/ (Moodle, insumos, GIFT, glosario) van tal cual.
 * Antes de imprimir, mide en el navegador que el logo no toque ningún texto (scripts/lib/revision-marca.mjs)
 * y se detiene si lo toca; --solo-revisar arma los HTML y hace solo esa revisión.
 * Salida: privado/marcas/<cliente>/<PF>/ y privado/marcas/<cliente>/<cliente>-<PF>-modulo2.zip.
 */
import fs from 'node:fs';
import path from 'node:path';
import { ruta, leer, escribir, listar } from './lib/repo.mjs';
import { imprimirPdf, navegador } from './lib/pdf.mjs';
import { crearZip } from './lib/zip.mjs';
import { revisarMarca, informeRevision, RESGUARDO_MM } from './lib/revision-marca.mjs';

const CARPETAS = { PF1821: 'modulo-2/PF1821-agentes-low-code', PF1822: 'modulo-2/PF1822-desarrollo-con-ia' };
const args = process.argv.slice(2);
const slug = args.find((a) => !/^PF\d{4}$/i.test(a) && !a.startsWith('--'));
if (!slug) { console.error('Uso: npm run marca -- <cliente> [PF1821 PF1822]'); process.exit(1); }
const dirMarca = `privado/marcas/${slug}`;
if (!fs.existsSync(ruta(`${dirMarca}/marca.json`))) {
  console.error(`Falta ${dirMarca}/marca.json. Copia templates/marca.json ahí, complétalo y deja el logo en la misma carpeta.`);
  process.exit(1);
}
const marca = JSON.parse(leer(`${dirMarca}/marca.json`));

// ------------------------------------------------------------ revisión de la marca

const hex = (c) => /^#[0-9a-f]{6}$/i.test(c ?? '');
const luminancia = (c) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contraste = (a, b) => { const [x, y] = [luminancia(a), luminancia(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const errores = [];
for (const k of ['primario', 'secundario', 'acento']) if (!hex(marca.colores?.[k])) errores.push(`colores.${k} debe ser un color #RRGGBB (hoy: ${marca.colores?.[k] ?? 'vacío'})`);
if (!marca.nombre || /PENDIENTE/.test(marca.nombre)) errores.push('falta "nombre"');
const logo = marca.logo ? `${dirMarca}/${marca.logo}` : null;
if (!logo || !fs.existsSync(ruta(logo))) errores.push(`falta el logo (${logo ?? 'campo "logo" vacío'})`);
if (!errores.length) {
  // Texto blanco sobre el primario (cabeceras y tablas) y texto en secundario sobre blanco (subtítulos,
  // enlaces): los dos deben cumplir WCAG 2.1 AA, 4,5:1, como el diseño neutro.
  const c1 = contraste(marca.colores.primario, '#FFFFFF');
  const c2 = contraste(marca.colores.secundario, '#FFFFFF');
  if (c1 < 4.5) errores.push(`el primario ${marca.colores.primario} tiene contraste ${c1.toFixed(2)}:1 con el blanco; debe ser 4,5:1 o más (usa un tono más oscuro de la marca)`);
  if (c2 < 4.5) errores.push(`el secundario ${marca.colores.secundario} tiene contraste ${c2.toFixed(2)}:1 con el blanco; debe ser 4,5:1 o más`);
}
if (errores.length) { console.error(`${dirMarca}/marca.json:\n  - ${errores.join('\n  - ')}`); process.exit(1); }
if (!navegador()) { console.error('No encontré Edge ni Chrome para imprimir los PDF.'); process.exit(1); }

// ------------------------------------------------------------ transformación del HTML

// Todo va sobre el color primario. Si el cliente entrega la versión en blanco del logo ("logo_negativo"),
// va sin placa; si no, el logo va en una placa blanca, salvo que "logo_fondo" diga "ninguno" (logo ya blanco).
const archivoLogo = marca.logo_negativo ? `${dirMarca}/${marca.logo_negativo}` : logo;
if (!fs.existsSync(ruta(archivoLogo))) { console.error(`${dirMarca}/marca.json: falta ${archivoLogo}`); process.exit(1); }
const conPlaca = !marca.logo_negativo && marca.logo_fondo !== 'ninguno';
const bytesLogo = fs.readFileSync(ruta(archivoLogo));
const ext = path.extname(archivoLogo).slice(1).toLowerCase();
const mime = { png: 'image/png', svg: 'image/svg+xml' }[ext];
if (!mime) { console.error(`El logo debe ser PNG o SVG (es .${ext}): de ahí se leen sus proporciones.`); process.exit(1); }
const logoUri = `data:${mime};base64,${bytesLogo.toString('base64')}`;

// Proporción del logo, sin dependencias: en un PNG, el ancho y el alto van en los bytes 16-23 (cabecera
// IHDR); en un SVG, en el viewBox o en width y height.
function medidasLogo() {
  if (ext === 'png') {
    if (bytesLogo.readUInt32BE(0) !== 0x89504e47 || bytesLogo.toString('ascii', 12, 16) !== 'IHDR') throw new Error(`${archivoLogo} no es un PNG válido`);
    return { ancho: bytesLogo.readUInt32BE(16), alto: bytesLogo.readUInt32BE(20) };
  }
  const svg = bytesLogo.toString('utf8');
  const vb = /viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(svg);
  if (vb) return { ancho: +vb[1], alto: +vb[2] };
  const w = /<svg[^>]*\swidth="([\d.]+)/.exec(svg), h = /<svg[^>]*\sheight="([\d.]+)/.exec(svg);
  if (w && h) return { ancho: +w[1], alto: +h[1] };
  throw new Error(`${archivoLogo}: el SVG no trae viewBox ni width y height`);
}
const medidas = medidasLogo();
const proporcion = medidas.ancho / medidas.alto;

// Tamaño del logo según su forma: a igual área, un logo ancho va más bajo y uno compacto más alto, con el
// mismo peso visual. El alto tiene tope (logo_alto_mm, escalado en las portadas) y el ancho, un máximo por
// lugar. El relleno de la placa es el mismo en los cuatro lados. (DECISIONS, 2026-09-27.)
const TOPE_MM = Math.min(24, Number.parseFloat(marca.logo_alto_mm) || 14);
const LUGARES = {
  cabecera: { area: 380, tope: TOPE_MM, anchoMax: 44, relleno: 2.5 },
  lectura: { area: 600, tope: TOPE_MM * 1.25, anchoMax: 60, relleno: 3 },
  cuadernillo: { area: 900, tope: Math.min(30, TOPE_MM * 1.5), anchoMax: 80, relleno: 4 },
};
function cajaLogo({ area, tope, anchoMax }) {
  let alto = Math.min(tope, Math.sqrt(area / proporcion));
  let ancho = alto * proporcion;
  if (ancho > anchoMax) { ancho = anchoMax; alto = ancho / proporcion; }
  return { ancho: ancho.toFixed(2), alto: alto.toFixed(2) };
}
const CAJA = Object.fromEntries(Object.entries(LUGARES).map(([k, v]) => [k, cajaLogo(v)]));
const placa = (lugar, sel) => (conPlaca
  ? `${sel} { background: #fff; border-radius: ${lugar === 'cuadernillo' ? 4 : 3}pt; padding: ${LUGARES[lugar].relleno}mm; }`
  : `${sel} { background: none; padding: 0; }`);
const tamano = (lugar, sel) => `${sel} img { display: block; width: ${CAJA[lugar].ancho}mm; height: ${CAJA[lugar].alto}mm; }`;

const img = `<span class="marca-logo"><img src="${logoUri}" alt="${marca.nombre}"></span>`;
// El logo nunca va en posición absoluta: tiene su propio espacio en el diseño y un resguardo de 4 mm o más
// con cualquier texto, que controla la revisión (scripts/lib/revision-marca.mjs) antes de imprimir.
const CSS = `<style>
.marca-logo { display: block; line-height: 0; }
/* Cabecera de cada documento: el texto en su columna y el logo en la suya, alineado arriba con el kicker
   y a la derecha con el relleno de la cabecera. */
.cabecera.con-logo { display: flex; align-items: flex-start; gap: 8mm; }
.cabecera-texto { flex: 1 1 auto; min-width: 0; }
.cabecera .marca-logo { flex: none; }
${placa('cabecera', '.cabecera .marca-logo')}
${tamano('cabecera', '.cabecera .marca-logo')}
/* Portada de las lecturas: logo arriba a la izquierda (como en la portada de los cuadernillos), el número
   del AE en su columna a la derecha y el título, la regla y la bajada abajo, en filas que no se cruzan. */
.banda.con-logo { display: grid; grid-template-columns: minmax(0, 1fr) auto; grid-template-rows: auto auto auto minmax(5mm, 1fr) auto auto auto; column-gap: 12mm; }
.banda.con-logo > .marca-logo { grid-area: 1 / 1; justify-self: start; margin: 0 0 5mm; }
.banda.con-logo > .kicker { grid-area: 2 / 1; }
.banda.con-logo > .curso { grid-area: 3 / 1; max-width: none; }
.banda.con-logo > .ae { position: static; grid-area: 1 / 2 / 4 / 3; align-self: start; }
.banda.con-logo > h1 { grid-area: 5 / 1 / 6 / 3; margin: 0; }
.banda.con-logo > .regla { grid-area: 6 / 1; }
.banda.con-logo > .bajada { grid-area: 7 / 1 / 8 / 3; }
${placa('lectura', '.banda .marca-logo')}
${tamano('lectura', '.banda .marca-logo')}
</style>`;

function conMarca(html) {
  const { primario, secundario, acento } = marca.colores;
  let h = html
    .replace(/#0F3D5E/gi, primario).replace(/#0E7490/gi, secundario).replace(/#F59E0B/gi, acento)
    // Tintes claros del diseño neutro sobre el primario: pasan a blanco translúcido, que sirve con cualquier color.
    .replace(/#A5F3FC/gi, 'rgba(255,255,255,.82)').replace(/#CFE3F1|#E2EEF6/gi, 'rgba(255,255,255,.88)')
    // El pie de cada página lleva el nombre de la institución.
    .replace(/(@bottom-left \{ content: ")/, `$1${marca.corto && !/PENDIENTE/.test(marca.corto) ? marca.corto : marca.nombre} · `);
  h = h.replace('</head>', `${CSS}</head>`);
  // Logo: en la cabecera de cada documento (el texto pasa a su propia columna) y en la banda de la
  // portada de las lecturas.
  h = h.replace(/<header class="cabecera">([\s\S]*?)<\/header>/g, `<header class="cabecera con-logo"><div class="cabecera-texto">$1</div>${img}</header>`);
  h = h.replace(/<div class="banda">/, `<div class="banda con-logo">${img}`);
  return h;
}

// ------------------------------------------------------------ cuadernillos

// Qué PDF se unen en cada cuadernillo (rutas de entrega/) y su presentación. El glosario va aparte.
const EVALUACION = ['M2-Indicadores', 'M2-Instrumento-1', 'M2-Instrumento-2', 'M2-Instrumento-3', 'M2-Portafolio-Guia', 'M2-Portafolio-Instrumento',
  'M2-Retroalimentacion', 'M2-Autoevaluacion', 'M2-Coevaluacion', 'M2-Bitacora'].map((a) => `evaluacion/${a}.pdf`);
const CUADERNILLOS = [
  { archivo: 'M2-Lecturas.pdf', kicker: 'Cuadernillo de lecturas', titulo: 'Material de lectura del módulo 2',
    partes: [1, 2, 3, 4].map((n) => `AE${n}/M2-AE${n}-Lectura.pdf`),
    presentacion: (m) => `Este cuadernillo reúne las cuatro lecturas del módulo, una por aprendizaje esperado. Cada lectura trae el aprendizaje y sus criterios de evaluación tal como están en el plan formativo, desarrolla todos los contenidos del plan con ejemplos del caso ${m.caso}, una empresa ficticia, y cierra con una síntesis, actividades para practicar, una autocomprobación con sus respuestas y un glosario. Los términos de las cuatro lecturas están reunidos en el glosario del módulo, que se entrega aparte.` },
  { archivo: 'M2-Actividades.pdf', kicker: 'Cuadernillo de actividades', titulo: 'Actividades prácticas del módulo 2',
    partes: [1, 2].map((n) => `actividades/M2-Actividad-${n}-Enunciado.pdf`),
    presentacion: () => 'Las dos actividades prácticas del módulo, con su enunciado, los insumos que se adjuntan, el producto que se entrega y la forma en que se evalúa. La primera es de resolución de problemas y la segunda, de análisis de caso con gamificación; las dos trabajan el aprendizaje esperado 3, el seleccionado para el módulo.' },
  { archivo: 'M2-Evaluacion.pdf', kicker: 'Cuadernillo de evaluación', titulo: 'Evaluación y retroalimentación del módulo 2',
    partes: EVALUACION,
    presentacion: () => 'Reúne los indicadores de logro y los instrumentos con que se evalúa y retroalimenta el módulo: tres instrumentos de familias distintas que cubren los cuatro aprendizajes esperados, la guía y el instrumento del portafolio de proyectos, el mecanismo de retroalimentación, las pautas de autoevaluación y coevaluación, y la bitácora de resultados y plan de trabajo.' },
  { archivo: 'M2-Metodologia-y-medios.pdf', kicker: 'Cuadernillo de metodología', titulo: 'Metodología y medios del módulo 2',
    partes: ['metodologia/M2-Metodologia.pdf', 'medios/M2-Cuadro-comparativo.pdf'],
    presentacion: () => 'Describe qué hará el participante, cómo lo hará y con qué medios, con las horas de cada tramo; los aspectos motivacionales y las estrategias para las habilidades del siglo XXI. Cierra con el cuadro comparativo, uno de los medios de apoyo del módulo.' },
  { archivo: 'M2-Actividades-Tutor.pdf', kicker: 'Cuadernillo del tutor · no se publica para los participantes', titulo: 'Respuestas modeladas de las actividades',
    partes: [1, 2].map((n) => `actividades/M2-Actividad-${n}-Respuesta-modelada.pdf`), tutor: true,
    presentacion: () => 'Las respuestas modeladas de las dos actividades prácticas, con los errores típicos que se observan en las entregas. Es un documento para el tutor: no se publica para los participantes antes del plazo de entrega.' },
  { archivo: 'M2-Glosario.pdf', kicker: 'Glosario del módulo', titulo: 'Glosario del módulo 2',
    partes: ['glosario/M2-Glosario.pdf'],
    presentacion: () => 'Los términos clave del módulo, reunidos desde las cuatro lecturas, en orden alfabético y con el aprendizaje esperado en que se trabaja cada uno. Se entrega aparte para tenerlo a mano mientras se lee y se practica.' },
];

const texto = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const escHtml = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Une HTML ya marcados: estilos sin repetir (el pie pasa a ser el del cuadernillo) y cada documento en página nueva.
function cuadernillo(cu, htmls, m) {
  const pie = `${marca.corto && !/PENDIENTE/.test(marca.corto) ? marca.corto : marca.nombre} · ${m.pf} · Módulo 2 · ${cu.titulo}`.replace(/"/g, '\\"');
  const estilos = [...new Set(htmls.flatMap((h) => h.match(/<style>[\s\S]*?<\/style>/g) ?? []))]
    .map((s) => s.replace(/(@bottom-left \{ content: ")[^"]*(")/g, `$1${pie}$2`));
  const cuerpos = htmls.map((h) => /<body[^>]*>([\s\S]*)<\/body>/.exec(h)?.[1] ?? '');
  const titulos = htmls.map((h) => texto(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(h)?.[1] ?? ''));
  const indice = cu.partes.map((d, i) => {
    const ae = /^(AE\d)\//.exec(d)?.[1];
    return `<li>${escHtml(ae ? `Lectura ${ae} · ${m.lecturas?.[ae] ?? titulos[i]}` : titulos[i])}</li>`;
  }).join('');
  const portada = `<section class="pc">
  <div class="pc-banda">
    <div class="pc-logo"><img src="${logoUri}" alt="${escHtml(marca.nombre)}"></div>
    <p class="pc-kicker">${escHtml(cu.kicker)}</p>
    <h1 class="pc-titulo">${escHtml(cu.titulo)}</h1>
    <div class="pc-regla"></div>
    <p class="pc-curso">${escHtml(m.pf)} · ${escHtml(m.curso)}<br>Módulo 2 · ${escHtml(m.codigo)} · ${escHtml(m.modulo)} · ${escHtml(m.horas)} h</p>
  </div>
  <div class="pc-cuerpo">
    <p class="pc-rot">Presentación</p>
    <p class="pc-texto">${escHtml(cu.presentacion(m))}</p>
    ${cu.partes.length > 1 ? `<p class="pc-rot">Contenido</p><ol class="pc-indice">${indice}</ol>` : ''}
    <div class="pc-pie"><b>${escHtml(marca.nombre)}</b><span>Casos, personas y datos ficticios, con fines formativos.</span></div>
  </div>
</section>`;
  const CSS_PORTADA = `<style>
.pc { page: portada; height: 297mm; display: flex; flex-direction: column; break-after: page; }
.pc-banda { background: var(--azul); color: #fff; padding: 22mm 26mm 16mm; height: 165mm; display: flex; flex-direction: column; position: relative; overflow: hidden; }
.pc-banda::after { content: ""; position: absolute; right: -30mm; bottom: -40mm; width: 120mm; height: 120mm; border-radius: 50%; border: 18mm solid rgba(255,255,255,.05); }
.pc-logo { align-self: flex-start; line-height: 0; }
${placa('cuadernillo', '.pc-logo')}
${tamano('cuadernillo', '.pc-logo')}
.pc-kicker { font: 600 9pt/1.4 'IBM Plex Sans'; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.82); margin: auto 0 4mm; }
.pc-titulo { font: 700 32pt/1.1 'IBM Plex Sans'; letter-spacing: -.01em; margin: 0; max-width: 150mm; color: #fff; }
.pc-regla { width: 36mm; height: 3pt; background: var(--ambar); margin: 6mm 0 5mm; }
.pc-curso { font: 400 10.5pt/1.5 'IBM Plex Sans'; color: rgba(255,255,255,.88); margin: 0; max-width: 150mm; }
.pc-cuerpo { padding: 14mm 26mm 16mm; flex: 1; display: flex; flex-direction: column; }
.pc-rot { font: 600 7.5pt 'IBM Plex Sans'; letter-spacing: .14em; text-transform: uppercase; color: var(--turquesa); margin: 0 0 2mm; }
.pc-texto { font: 400 10.5pt/1.55 'IBM Plex Sans'; color: var(--tinta); margin: 0 0 7mm; }
.pc-indice { margin: 0; padding-left: 6mm; } .pc-indice li { font: 400 10pt/1.45 'IBM Plex Sans'; margin: 0 0 1.5mm; }
.pc-pie { margin-top: auto; border-top: .75pt solid var(--linea); padding-top: 4mm; display: flex; justify-content: space-between; gap: 8mm; font: 400 8pt 'IBM Plex Sans'; color: var(--gris); }
.pc-pie b { font-weight: 600; color: var(--azul); }
.parte-cuadernillo { break-before: page; }
</style>`;
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>${escHtml(`${m.pf} · ${cu.titulo}`)}</title>
${estilos.join('\n')}${CSS_PORTADA}</head><body>
${portada}
${cuerpos.map((c, i) => `<div class="${i ? 'parte-cuadernillo' : ''}">${c}</div>`).join('\n')}
</body></html>`;
}

// ------------------------------------------------------------ principal

const cursos = args.filter((a) => /^PF\d{4}$/i.test(a)).map((a) => a.toUpperCase());
const lista = cursos.length ? cursos : marca.cursos ?? [];
if (!lista.length) { console.error('Indica los cursos (PF1821 PF1822) o complétalos en "cursos" de marca.json.'); process.exit(1); }

// 1. Los HTML con marca de todos los cursos: documentos sueltos y cuadernillos.
const armados = [];
for (const pf of lista) {
  const carpeta = CARPETAS[pf];
  if (!carpeta) { console.error(`${pf}: curso desconocido`); process.exit(1); }
  const manifiesto = `.scratch/produccion/${pf}/manifiesto.json`;
  if (!fs.existsSync(ruta(manifiesto))) { console.error(`${pf}: falta ${manifiesto}. Corre antes: npm run produccion -- ${pf}`); process.exit(1); }
  const man = JSON.parse(leer(manifiesto));
  if (!man.pdfs || !man.meta) { console.error(`${pf}: el manifiesto es de una versión anterior. Corre antes: npm run produccion -- ${pf}`); process.exit(1); }
  const documentos = [];
  const conMarcaHtml = {};
  for (const [destino, htmlRel] of Object.entries(man.pdfs)) {
    const tmp = `.scratch/marcas/${slug}/${pf}/${path.basename(htmlRel)}`;
    escribir(tmp, conMarca(leer(htmlRel)));
    conMarcaHtml[destino] = tmp;
    documentos.push({ destino, tmp });
  }
  // Cuadernillos: los PDF del mismo tipo unidos en uno, con portada del cliente. El glosario va aparte.
  const cuadernillos = [];
  for (const cu of CUADERNILLOS) {
    const partes = cu.partes.filter((d) => conMarcaHtml[d]);
    if (partes.length !== cu.partes.length) { console.warn(`  AVISO: ${cu.archivo}: faltan ${cu.partes.filter((d) => !conMarcaHtml[d]).join(', ')}`); continue; }
    const tmp = `.scratch/marcas/${slug}/${pf}/cuadernillo-${cu.archivo.replace(/\.pdf$/, '.html')}`;
    escribir(tmp, cuadernillo(cu, partes.map((d) => leer(conMarcaHtml[d])), man.meta));
    cuadernillos.push({ cu, tmp });
  }
  armados.push({ pf, carpeta, man, documentos, cuadernillos });
}

// 2. Revisión del logo, antes de imprimir nada: se detiene si el logo o el número del AE tocan un texto,
// si queda menos resguardo del mínimo o si algo queda cortado por la banda.
const aRevisar = armados.flatMap((a) => [...a.documentos, ...a.cuadernillos].map((d) => d.tmp));
console.log(`Revisando el logo en ${aRevisar.length} HTML de ${marca.nombre} (${lista.join(', ')})…`);
const problemas = await revisarMarca(aRevisar);
if (problemas.length) {
  console.error(`\nEl logo choca con el texto en ${new Set(problemas.map((p) => p.archivo)).size} HTML de ${slug}. No se imprimió nada.\n${informeRevision(problemas, slug)}`);
  process.exit(1);
}
console.log(`  sin choques: logo y número del AE a ${RESGUARDO_MM} mm o más de todo texto, y nada cortado.`);
if (args.includes('--solo-revisar')) process.exit(0);

// 3. Impresión y zip por curso.
for (const { pf, carpeta, man, documentos, cuadernillos } of armados) {
  const salida = `${dirMarca}/${pf}`;
  fs.rmSync(ruta(salida), { recursive: true, force: true });
  const entradas = [];
  for (const { destino, tmp } of documentos) {
    const pdfRel = `${salida}/documentos/${destino}`;
    fs.mkdirSync(ruta(path.dirname(pdfRel)), { recursive: true });
    imprimirPdf(tmp, pdfRel);
    entradas.push({ nombre: `documentos/${destino}`, contenido: fs.readFileSync(ruta(pdfRel)) });
  }
  const hechos = [];
  for (const { cu, tmp } of cuadernillos) {
    const nombre = `${pf}-${cu.archivo}`;
    const pdfRel = `${salida}/cuadernillos/${nombre}`;
    fs.mkdirSync(ruta(path.dirname(pdfRel)), { recursive: true });
    imprimirPdf(tmp, pdfRel);
    entradas.unshift({ nombre: `cuadernillos/${nombre}`, contenido: fs.readFileSync(ruta(pdfRel)) });
    hechos.push(`${nombre}  ${cu.titulo}${cu.tutor ? ' (solo tutor)' : ''}`);
  }
  // Lo que no es PDF va tal cual (Moodle, insumos, GIFT, glosario en CSV y XML).
  const ent = `${carpeta}/entrega`;
  for (const a of listar(ruta(ent))) {
    const r = path.relative(ruta(ent), a).replace(/\\/g, '/');
    if (r.endsWith('.pdf') || r.startsWith('insumos-anexo/')) continue;
    entradas.push({ nombre: `documentos/${r}`, contenido: fs.readFileSync(a) });
    fs.mkdirSync(ruta(path.dirname(`${salida}/documentos/${r}`)), { recursive: true });
    fs.copyFileSync(a, ruta(`${salida}/documentos/${r}`));
  }
  const leeme = [`MÓDULO 2 — ${pf} · ${man.meta.curso} · recursos con la marca de ${marca.nombre}`, '',
    'cuadernillos/  los documentos unidos por tipo, cada uno con portada, presentación e índice:',
    ...hechos.map((h) => `  ${h}`), '',
    'documentos/    los mismos documentos sueltos, con la marca, más los archivos para Moodle, los insumos,',
    '               los quiz GIFT y el glosario en CSV y XML.', '',
    'Mismo contenido que los recursos neutros: cambian los colores, el logo y el nombre en el pie.',
    'Lo marcado "solo tutor" y las respuestas modeladas no se publican para los participantes.', ''];
  const zip = `${dirMarca}/${slug}-${pf}-modulo2.zip`;
  fs.writeFileSync(ruta(zip), crearZip([{ nombre: 'LEEME.txt', contenido: leeme.join('\r\n') }, ...entradas]));
  console.log(`${pf} → ${salida}/ (${Object.keys(man.pdfs).length} PDF con marca, ${hechos.length} cuadernillos) · ${zip}`);
}
