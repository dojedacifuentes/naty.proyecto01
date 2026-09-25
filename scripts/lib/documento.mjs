/**
 * Documentos del módulo (actividades, evaluación, cuadro comparativo) con el mismo diseño de las
 * lecturas: A4, IBM Plex Sans y Mono (2 familias), paleta con contraste WCAG 2.1 AA, encabezado con
 * el plan, el módulo y los aprendizajes, y pie con la página. Y la versión HTML con estilos en línea
 * para pegar un enunciado en la descripción de una Tarea de Moodle.
 */
import { esc, inline, markdown } from './html.mjs';
import { estilos, flechas } from './lectura.mjs';

const DOC = `<style>
.cabecera { background: var(--azul); color: #fff; border-radius: 4pt; padding: 7mm 8mm 6mm; margin: 0 0 5mm; break-inside: avoid; }
.cabecera .kicker { font: 600 8pt/1.4 'IBM Plex Sans'; letter-spacing: .16em; text-transform: uppercase; color: #A5F3FC; margin: 0 0 2mm; }
.cabecera h1 { font: 700 21pt/1.15 'IBM Plex Sans'; margin: 0; letter-spacing: -.005em; }
.cabecera .curso { font: 400 9pt/1.45 'IBM Plex Sans'; color: #CFE3F1; margin: 2.5mm 0 0; }
.cabecera .regla { width: 26mm; height: 2.5pt; background: var(--ambar); margin: 3.5mm 0 0; }
.ficha-doc { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3mm 7mm; margin: 0 0 6mm; }
.ficha-doc div { border-top: .75pt solid var(--linea); padding-top: 2mm; }
.ficha-doc div.ancha { grid-column: 1 / -1; }
.ficha-doc dt { font: 600 7pt 'IBM Plex Sans'; letter-spacing: .12em; text-transform: uppercase; color: var(--gris); margin: 0 0 1mm; }
.ficha-doc dd { margin: 0; font: 400 9pt/1.4 'IBM Plex Sans'; color: var(--tinta); }
.ficha-doc div.ancha dd { font-size: 8.5pt; color: var(--azul); }
.ficha-doc div.ancha dd span { display: block; margin: 0 0 1mm; }
.doc h2 { font: 700 15pt/1.25 'IBM Plex Sans'; color: var(--azul); margin: 16pt 0 6pt; padding-top: 7pt; border-top: .75pt solid var(--linea); break-after: avoid; }
.doc h3 { font-size: 12.5pt; margin: 14pt 0 5pt; }
.doc h4 { font-size: 11pt; margin: 11pt 0 4pt; }
.doc h5 { font: 600 10pt 'IBM Plex Sans'; color: var(--azul); margin: 9pt 0 3pt; break-after: avoid; }
.doc > :first-child { margin-top: 0; padding-top: 0; border-top: 0; }
.doc p, .doc li { font-size: 10.5pt; }
.doc table { font-size: 8.8pt; }
.doc blockquote { margin: 8pt 0 11pt; padding: 7pt 11pt 7pt 12pt; border-left: 3pt solid var(--turquesa); background: #F0F9FB; border-radius: 0 3pt 3pt 0; font-size: 10pt; break-inside: avoid; }
.doc blockquote p:last-child { margin: 0; }
.doc hr { border: 0; border-top: .75pt solid var(--linea); margin: 12pt 0; }
.doc .box { display: inline-block; width: 8pt; height: 8pt; border: 1pt solid var(--azul); border-radius: 1.5pt; margin-right: 5pt; vertical-align: -1pt; }
.doc .box.on { background: var(--azul); }
.doc .lbl { font: 700 7.5pt 'IBM Plex Sans'; letter-spacing: .12em; text-transform: uppercase; color: var(--turquesa); margin: 8pt 0 3pt; }
.parte-doc { break-before: page; }
</style>`;

/**
 * d = { pf, curso, modulo, codigo, horas, kicker, titulo, ficha: [[rótulo, valor o [valores], ancha?]], md, pie }
 * Varios documentos en uno: d.partes = [{ kicker, titulo, ficha, md }] (cada parte empieza en página nueva).
 */
export function documentoPdfHtml(d) {
  const partes = d.partes ?? [{ kicker: d.kicker, titulo: d.titulo, ficha: d.ficha, md: d.md }];
  const pie = String(d.pie).replace(/"/g, '\\"');
  const cuerpo = partes.map((p, i) => `<section class="${i ? 'parte-doc' : ''}">
  <header class="cabecera"><p class="kicker">${esc(p.kicker)}</p><h1>${inline(p.titulo)}</h1>
    <p class="curso">${esc(d.pf)} · ${esc(d.curso)}<br>Módulo 2 · ${esc(d.codigo)} · ${esc(d.modulo)} · ${esc(d.horas)} h</p><div class="regla"></div></header>
  ${p.ficha?.length ? `<dl class="ficha-doc">${p.ficha.map(([r, v, ancha]) => `<div${ancha ? ' class="ancha"' : ''}><dt>${esc(r)}</dt><dd>${Array.isArray(v) ? v.map((x) => `<span>${inline(x)}</span>`).join('') : inline(v)}</dd></div>`).join('')}</dl>` : ''}
  <div class="doc">${markdown(p.md)}</div>
</section>`).join('\n');
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>${esc(d.titulo ?? partes[0].titulo)}</title>
${estilos(pie)}${DOC}</head><body>
${flechas(cuerpo)}
</body></html>`;
}

// Estilos en línea: el editor de Moodle descarta las hojas de estilo, pero conserva el atributo style.
const EN_LINEA = [
  [/<h2>/g, '<h3 style="color:#0F3D5E;font-size:1.25em;margin:1.2em 0 .4em">'], [/<\/h2>/g, '</h3>'],
  [/<h3>/g, '<h4 style="color:#0F3D5E;font-size:1.1em;margin:1em 0 .3em">'], [/<\/h3>/g, '</h4>'],
  [/<h4>/g, '<h5 style="color:#0E7490;font-size:1em;margin:.9em 0 .3em">'], [/<\/h4>/g, '</h5>'],
  [/<table>/g, '<table style="border-collapse:collapse;width:100%;margin:.6em 0 1em;font-size:.95em">'],
  [/<th( class="\w")?>/g, '<th style="background:#0F3D5E;color:#ffffff;text-align:left;padding:6px 8px;border:1px solid #0F3D5E">'],
  [/<td( class="\w")?>/g, '<td style="padding:6px 8px;border:1px solid #CBD5E1;vertical-align:top">'],
  [/<pre( class="[^"]*")?>/g, '<pre style="background:#F1F5F9;border-left:4px solid #0F3D5E;padding:10px 12px;white-space:pre-wrap;font-size:.9em">'],
  [/<code>/g, '<code style="background:#F1F5F9;color:#0F3D5E;padding:0 3px;border-radius:3px">'],
  [/<blockquote>/g, '<blockquote style="margin:.8em 0;padding:8px 12px;border-left:4px solid #0E7490;background:#F0F9FB">'],
];

/** Página HTML con un enunciado para copiar y pegar en la descripción de una Tarea de Moodle. */
export function moodleHtml({ titulo, intro, md }) {
  let cuerpo = markdown(md).replace(/<pre[^>]*><code>/g, (m) => m.replace('<code>', '<code class="bloque">'));
  for (const [a, b] of EN_LINEA) cuerpo = cuerpo.replace(a, b);
  cuerpo = cuerpo.replace(/<code class="bloque" style="[^"]*">|<code class="bloque">/g, '<code>');
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>${esc(titulo)}</title></head>
<body style="font-family:Arial,Helvetica,sans-serif;color:#1F2937;line-height:1.5;max-width:880px;margin:24px auto;padding:0 16px">
<!-- Para Moodle: abre este archivo en el navegador, selecciona todo desde "Qué vas a lograr" hasta el final,
     cópialo y pégalo en la descripción de la Tarea. O bien, en el editor de Moodle, usa el botón de código
     HTML y pega el contenido de <div id="moodle">. El nombre de la Tarea va en el campo "Nombre". -->
<div id="moodle">
<div style="background:#EFF6FF;border-left:4px solid #0F3D5E;padding:10px 14px;margin:0 0 1em">${intro}</div>
${cuerpo}
</div>
</body></html>
`;
}
