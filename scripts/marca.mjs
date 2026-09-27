#!/usr/bin/env node
/**
 * Aplica la marca de un cliente a los recursos del módulo 2 y arma un zip por curso.
 *
 *   npm run marca -- <cliente> [PF1821 PF1822]
 *
 * La marca vive en privado/marcas/<cliente>/marca.json (con su logo al lado), fuera de git: el repo
 * es público y los clientes compiten entre sí (OPEN-QUESTIONS #11). La plantilla está en
 * templates/marca.json. Si no se indican cursos, usa los de "cursos" en marca.json.
 *
 * Toma los HTML que dejó `npm run produccion` (su manifiesto en .scratch/produccion/<PF>/) y los
 * vuelve a imprimir con los colores del cliente, su logo en la portada o la cabecera y su nombre en
 * el pie. Los demás archivos de entrega/ (Moodle, insumos, GIFT, glosario) van tal cual.
 * Salida: privado/marcas/<cliente>/<PF>/ y privado/marcas/<cliente>/<cliente>-<PF>-modulo2.zip.
 */
import fs from 'node:fs';
import path from 'node:path';
import { ruta, leer, escribir, listar } from './lib/repo.mjs';
import { imprimirPdf, navegador } from './lib/pdf.mjs';
import { crearZip } from './lib/zip.mjs';

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

const ext = path.extname(logo).slice(1).toLowerCase();
const mime = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml', webp: 'image/webp' }[ext];
if (!mime) { console.error(`El logo debe ser PNG, JPG, SVG o WEBP (es .${ext})`); process.exit(1); }
const logoUri = `data:${mime};base64,${fs.readFileSync(ruta(logo)).toString('base64')}`;
const img = `<span class="marca-logo"><img src="${logoUri}" alt="${marca.nombre}"></span>`;
const CSS = `<style>
.marca-logo { display: inline-block; background: #fff; border-radius: 3pt; padding: 2.5mm 3.5mm; line-height: 0; }
.marca-logo img { height: 11mm; width: auto; max-width: 48mm; object-fit: contain; }
.cabecera { position: relative; } .cabecera .marca-logo { position: absolute; top: 6mm; right: 8mm; }
.cabecera h1, .cabecera .curso { max-width: 128mm; }
.banda .marca-logo { position: absolute; top: 18mm; right: 26mm; z-index: 2; }
.banda .ae { top: 50mm; }
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
  // Logo: en la cabecera de cada documento y en la banda de la portada de las lecturas.
  h = h.replace(/<header class="cabecera">/g, `<header class="cabecera">${img}`);
  h = h.replace(/(<div class="banda"[^>]*>)/, `$1${img}`);
  return h;
}

// ------------------------------------------------------------ principal

const cursos = args.filter((a) => /^PF\d{4}$/i.test(a)).map((a) => a.toUpperCase());
const lista = cursos.length ? cursos : marca.cursos ?? [];
if (!lista.length) { console.error('Indica los cursos (PF1821 PF1822) o complétalos en "cursos" de marca.json.'); process.exit(1); }
for (const pf of lista) {
  const carpeta = CARPETAS[pf];
  if (!carpeta) { console.error(`${pf}: curso desconocido`); process.exit(1); }
  const manifiesto = `.scratch/produccion/${pf}/manifiesto.json`;
  if (!fs.existsSync(ruta(manifiesto))) { console.error(`${pf}: falta ${manifiesto}. Corre antes: npm run produccion -- ${pf}`); process.exit(1); }
  const m = JSON.parse(leer(manifiesto));
  const salida = `${dirMarca}/${pf}`;
  fs.rmSync(ruta(salida), { recursive: true, force: true });
  const entradas = [];
  for (const [destino, htmlRel] of Object.entries(m)) {
    const tmp = `.scratch/marcas/${slug}/${pf}/${path.basename(htmlRel)}`;
    escribir(tmp, conMarca(leer(htmlRel)));
    const pdfRel = `${salida}/${destino}`;
    fs.mkdirSync(ruta(path.dirname(pdfRel)), { recursive: true });
    imprimirPdf(tmp, pdfRel);
    entradas.push({ nombre: destino, contenido: fs.readFileSync(ruta(pdfRel)) });
  }
  // Lo que no es PDF va tal cual (Moodle, insumos, GIFT, glosario en CSV y XML).
  const ent = `${carpeta}/entrega`;
  for (const a of listar(ruta(ent))) {
    const r = path.relative(ruta(ent), a).replace(/\\/g, '/');
    if (r.endsWith('.pdf') || r.startsWith('insumos-anexo/')) continue;
    entradas.push({ nombre: r, contenido: fs.readFileSync(a) });
    fs.mkdirSync(ruta(path.dirname(`${salida}/${r}`)), { recursive: true });
    fs.copyFileSync(a, ruta(`${salida}/${r}`));
  }
  const leeme = [`MÓDULO 2 — ${pf} · recursos con la marca de ${marca.nombre}`, '',
    'Mismo contenido que los recursos neutros; cambian los colores, el logo (portada o cabecera) y el nombre en el pie.',
    'Las respuestas modeladas (actividades/M2-Actividad-n-Respuesta-modelada.pdf y respuesta-modelada/) son solo para el tutor.', ''];
  const zip = `${dirMarca}/${slug}-${pf}-modulo2.zip`;
  fs.writeFileSync(ruta(zip), crearZip([{ nombre: 'LEEME.txt', contenido: leeme.join('\r\n') }, ...entradas]));
  console.log(`${pf} → ${salida}/ (${Object.keys(m).length} PDF con marca) · ${zip}`);
}
