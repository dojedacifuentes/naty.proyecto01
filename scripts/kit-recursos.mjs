#!/usr/bin/env node
/**
 * Arma el kit de recursos educativos del módulo evaluado de un curso, para leer e imprimir.
 *
 *   npm run kit -- PF1821 PF1822 --salida entregables/2026-09-24-modulo2 [--pdf]
 *   npm run kit -- PF1821 PF1822 --salida <dir> --pdf --unico   todo en un solo documento
 *
 * Junta, en un solo HTML (y PDF con --pdf), los archivos de contenidos/<PF>/modulo-2/ en el
 * orden en que se usan en el LMS. La fuente sigue siendo el Markdown del repo: el PDF se
 * regenera, no se edita. Incluye un conversor de Markdown mínimo (títulos, párrafos, listas,
 * tablas, citas, código), suficiente para estos archivos y sin dependencias.
 */
import { leer, escribir, existe } from './lib/repo.mjs';
import { imprimirPdf } from './lib/pdf.mjs';
import { esc, markdown, estilos } from './lib/html.mjs';

const ORDEN = [
  ['02-recursos.md', 'Índice del kit'],
  ['R-bienvenida-e-infografia.md', 'Bienvenida e infografía'],
  ['R-capsulas.md', 'Cápsulas y cuadro comparativo'],
  ['C4-herramientas-didacticas.md', 'Herramientas didácticas'],
  ['C2-actividades.md', 'Actividades prácticas'],
  ['B1-indicadores.md', 'Indicadores de logro'],
  ['B2-instrumentos.md', 'Instrumentos de evaluación'],
  ['B3-portafolio.md', 'Portafolio'],
  ['B4-retroalimentacion.md', 'Retroalimentación'],
  ['C-metodologia.md', 'Metodología, motivación y siglo XXI'],
];

const args = process.argv.slice(2);
const codigos = args.filter((a) => /^PF\d{4}$/i.test(a)).map((a) => a.toUpperCase());
const iSal = args.indexOf('--salida');
const salida = (iSal >= 0 ? args[iSal + 1] : 'entregables').replace(/\/+$/, '');
const conPdf = args.includes('--pdf');
const unico = args.includes('--unico');
if (!codigos.length) {
  console.error('Uso: npm run kit -- PF1821 [PF1822 ...] [--salida <dir>] [--pdf] [--unico]');
  process.exit(1);
}

// ----------------------------------------------------------------- documento

const hoy = () => new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });

// Con --unico, cada curso lleva además su ficha SIPFOR y su lista de entregables.
const PREVIAS = [
  ['00-ficha-sipfor.md', 'Ficha del plan (SIPFOR, textual)'],
  ['01-entregables.md', 'Entregables y cantidades para el 7,0'],
];

function curso(codigo, conPrevias) {
  const p = JSON.parse(leer(`data/planes/${codigo}.json`));
  const dir = `contenidos/${codigo}/modulo-2`;
  const lista = [...(conPrevias ? PREVIAS : []), ...ORDEN];
  return {
    codigo, p, m: p.modulos[1], dir,
    partes: lista.filter(([f]) => existe(`${dir}/${f}`)),
    faltan: lista.filter(([f]) => !existe(`${dir}/${f}`)).map(([f]) => f),
  };
}


const meta = () => `<div class="meta"><b>Para:</b> Natalia — hackea.pro<br><b>Fecha:</b> ${hoy()}<br><b>Estado:</b> borrador para revisión</div>`;
const pie = (c) => `Aprendizajes y competencias textuales de SIPFOR (${esc(c.p.fuente.resolucion ?? '')}, ${esc(c.p.fuente.fecha_resolucion ?? '')}). Lo marcado PENDIENTE lo decide cada institución.`;
const toc = (c) => `<div class="toc">${c.partes.map(([, t], k) => `<div><b>${k + 1}</b>${t}</div>`).join('')}</div>`;
const partesHtml = (c, prefijo) => c.partes.map(([f, t], k) =>
  `<section class="parte"><p class="kicker">${prefijo}${k + 1} · ${t}</p>${markdown(leer(`${c.dir}/${f}`))}</section>`).join('\n');

/** Un kit por curso: portada + sus recursos. */
function documentoCurso(c) {
  const titulo = `Kit de recursos del módulo 2 · ${c.codigo}`;
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>${titulo}</title>${estilos(titulo)}</head><body>
<section class="cover">
  <p class="eb">Becas Laborales · Talento Digital 2026 · ${c.codigo}</p>
  <h1>Kit de recursos educativos<br>del módulo 2</h1>
  <div class="rule"></div>
  <p class="sub">${c.codigo} · ${esc(c.p.nombre)}<br>Módulo 2: ${c.m.codigo} ${esc(c.m.nombre)} · ${c.m.horas} h</p>
  ${toc(c)}
  ${meta()}
  <p class="foot">Generado desde el repositorio del proyecto (npm run kit) a partir de contenidos/${c.codigo}/modulo-2/. ${pie(c)}</p>
</section>
${partesHtml(c, '')}
</body></html>`;
}

/** Todos los cursos en un solo documento: portada general, y por curso su separador, ficha, entregables y kit. */
function documentoUnico(cs) {
  const titulo = `Módulo 2 · ${cs.map((c) => c.codigo).join(' y ')} · entregables y recursos`;
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>${titulo}</title>${estilos(titulo)}</head><body>
<section class="cover">
  <p class="eb">Becas Laborales · Talento Digital 2026</p>
  <h1>Módulo 2: entregables<br>y recursos educativos</h1>
  <div class="rule"></div>
  <p class="sub">Todo lo que hay que entregar y el contenido desarrollado de cada recurso, curso por curso.</p>
  <div class="cursos">${cs.map((c, i) => `<div><b>Parte ${i + 1} · ${c.codigo} · ${esc(c.p.nombre)}</b>Módulo 2: ${c.m.codigo} ${esc(c.m.nombre)} · ${c.m.horas} h · ${c.partes.length} secciones</div>`).join('')}</div>
  ${meta()}
  <p class="foot">Generado desde el repositorio del proyecto (npm run kit con la opción --unico) a partir de contenidos/&lt;PF&gt;/modulo-2/. ${pie(cs[0])}</p>
</section>
${cs.map((c, i) => `<section class="cover divisor">
  <p class="eb">Parte ${i + 1} de ${cs.length} · ${c.codigo}</p>
  <h1>${esc(c.p.nombre)}</h1>
  <div class="rule"></div>
  <p class="sub">Módulo 2: ${c.m.codigo} ${esc(c.m.nombre)}<br>${c.m.horas} h de ${c.p.horas_totales} h del plan · ${c.m.aprendizajes_esperados.length} aprendizajes esperados</p>
  ${toc(c)}
</section>
${partesHtml(c, `${c.codigo} · `)}`).join('\n')}
</body></html>`;
}

let fallos = 0;
const cursos = [];
for (const c of codigos) {
  if (!existe(`data/planes/${c}.json`)) { console.error(`${c}: falta data/planes/${c}.json (npm run sipfor -- ${c})`); fallos++; continue; }
  cursos.push(curso(c, unico));
}
const salidas = unico
  ? [[`${salida}/modulo2-${cursos.map((c) => c.codigo).join('-')}-completo`, documentoUnico(cursos), cursos.flatMap((c) => c.faltan.map((f) => `${c.codigo}/${f}`))]]
  : cursos.map((c) => [`${salida}/kit-recursos-modulo2-${c.codigo}`, documentoCurso(c), c.faltan]);
for (const [base, html, faltan] of salidas) {
  console.log(`HTML → ${escribir(`${base}.html`, html)}${faltan.length ? `  (faltan: ${faltan.join(', ')})` : ''}`);
  if (conPdf) {
    try { console.log(`PDF  → ${base}.pdf (${imprimirPdf(`${base}.html`, `${base}.pdf`)} KB)`); }
    catch (e) { console.error(e.message); fallos++; }
  }
}
process.exit(fallos ? 1 : 0);
