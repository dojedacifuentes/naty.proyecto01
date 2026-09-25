/**
 * Markdown mínimo a HTML y hoja de estilos de impresión A4, compartidos por los generadores
 * de documentos (kit-recursos.mjs, produccion.mjs). Sin dependencias: cubre títulos, párrafos,
 * listas, tablas, citas y código, que es lo que usan los archivos de contenidos/.
 */

export const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function inline(texto) {
  const codigos = [];
  let t = texto.replace(/\\\|/g, '\u0000P').replace(/`([^`]+)`/g, (_, c) => { codigos.push(c); return `\u0000C${codigos.length - 1}\u0000`; });
  t = esc(t)
    .replace(/&lt;br\s*\/?&gt;/g, '<br>')
    .replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return t.replace(/\u0000C(\d+)\u0000/g, (_, i) => `<code>${esc(codigos[i]).replace(/\u0000P/g, '|')}</code>`).replace(/\u0000P/g, '|');
}

export function celdas(linea) {
  const out = []; let actual = ''; let enCodigo = false;
  const l = linea.trim().replace(/^\|/, '').replace(/\|$/, '');
  for (let i = 0; i < l.length; i++) {
    const ch = l[i];
    if (ch === '\\' && l[i + 1] === '|') { actual += '\\|'; i++; continue; }
    if (ch === '`') enCodigo = !enCodigo;
    if (ch === '|' && !enCodigo) { out.push(actual.trim()); actual = ''; continue; }
    actual += ch;
  }
  out.push(actual.trim());
  return out;
}

export function markdown(md) {
  const L = md.replace(/\r\n/g, '\n').replace(/<!--[\s\S]*?-->/g, '').split('\n');
  const html = [];
  let i = 0;
  const esLista = (l) => /^\s*([-*]|\d+\.)\s+/.test(l);
  while (i < L.length) {
    const l = L[i];
    if (!l.trim()) { i++; continue; }
    const fence = /^```(\w*)/.exec(l);
    if (fence) {
      const buf = []; i++;
      while (i < L.length && !L[i].startsWith('```')) buf.push(L[i++]);
      i++;
      const cls = fence[1] ? ` class="lang-${fence[1]}"` : '';
      html.push(`${fence[1] === 'mermaid' ? '<p class="lbl">Diagrama (Mermaid)</p>' : ''}<pre${cls}><code>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(l);
    if (h) { const n = h[1].length + 1; html.push(`<h${n}>${inline(h[2])}</h${n}>`); i++; continue; }
    if (/^-{3,}\s*$/.test(l)) { html.push('<hr>'); i++; continue; }
    if (l.startsWith('|')) {
      const filas = [];
      while (i < L.length && L[i].startsWith('|')) filas.push(L[i++]);
      const cab = celdas(filas[0]);
      const alin = (filas[1] && /^\|?\s*:?-+/.test(filas[1])) ? celdas(filas[1]).map((c) => (/^:-+:$/.test(c) ? 'c' : /-+:$/.test(c) ? 'r' : '')) : [];
      const cuerpo = filas.slice(alin.length ? 2 : 1);
      const td = (c, j, tag) => `<${tag}${alin[j] ? ` class="${alin[j]}"` : ''}>${inline(c)}</${tag}>`;
      html.push(`<table><thead><tr>${cab.map((c, j) => td(c, j, 'th')).join('')}</tr></thead><tbody>${
        cuerpo.map((f) => `<tr>${celdas(f).map((c, j) => td(c, j, 'td')).join('')}</tr>`).join('')}</tbody></table>`);
      continue;
    }
    if (l.startsWith('>')) {
      const buf = [];
      while (i < L.length && L[i].startsWith('>')) buf.push(L[i++].replace(/^>\s?/, ''));
      const parrafos = buf.join('\n').split(/\n\s*\n/).map((p) => `<p>${inline(p.replace(/\n/g, ' '))}</p>`);
      html.push(`<blockquote>${parrafos.join('')}</blockquote>`);
      continue;
    }
    if (esLista(l)) {
      const ordenada = /^\s*\d+\./.test(l);
      const items = [];
      while (i < L.length && (esLista(L[i]) || (/^\s{2,}\S/.test(L[i]) && items.length))) {
        const m = /^(\s*)([-*]|\d+\.)\s+(.*)$/.exec(L[i]);
        if (m && m[1].length < 2) items.push({ texto: m[3], sub: [] });
        else if (m) items[items.length - 1].sub.push(m[3]);
        else items[items.length - 1].texto += ' ' + L[i].trim();
        i++;
      }
      const li = (t) => {
        const tarea = /^\[([ xX])\]\s+(.*)$/.exec(t);
        return tarea ? `<span class="box${tarea[1] === ' ' ? '' : ' on'}"></span>${inline(tarea[2])}` : inline(t).replace(/&lt;br&gt;/g, '<br>');
      };
      const tag = ordenada ? 'ol' : 'ul';
      html.push(`<${tag}>${items.map((it) => `<li>${li(it.texto)}${it.sub.length ? `<ul>${it.sub.map((s) => `<li>${li(s)}</li>`).join('')}</ul>` : ''}</li>`).join('')}</${tag}>`);
      continue;
    }
    const buf = [];
    while (i < L.length && L[i].trim() && !/^(#{1,4}\s|```|\||>|-{3,}\s*$)/.test(L[i]) && !esLista(L[i])) buf.push(L[i++]);
    // Una línea que empieza con un rótulo en negrita ("**Estado:**", "**Para el 7,0:**") abre renglón
    // nuevo; otra negrita a inicio de línea ("**detectarla** (qué síntoma…") sigue la oración.
    const unido = buf.map((x, k) => (k && /^\*\*[^*]*[:.]\*\*|^\*\*[^*]+\*\*\s*[:—]/.test(x) ? '\u0001' : k ? ' ' : '') + x).join('');
    html.push(`<p>${inline(unido).replace(/\u0001/g, '<br>')}</p>`);
  }
  return html.join('\n');
}

export function estilos(titulo) {
  return `<style>
  @page { size: A4; margin: 17mm 16mm 19mm; @bottom-left { content: "${titulo}"; font: 8pt 'Segoe UI', Arial, sans-serif; color: #6b7a8c; } @bottom-right { content: counter(page) " / " counter(pages); font: 8pt 'Segoe UI', Arial, sans-serif; color: #6b7a8c; } }
  @page portada { margin: 0; @bottom-left { content: none } @bottom-right { content: none } }
  :root { --navy:#13233a; --blue:#1f4e79; --ink:#1b2430; --ink2:#4a5868; --line:#d4dbe3; --zebra:#f4f6f9; --hl:#e8f0f8; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; color: var(--ink); font: 9.4pt/1.48 Georgia, 'Times New Roman', serif; }
  h2,h3,h4,h5,table,.lbl,.cover,.toc { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; }
  .parte { break-before: page; }
  .parte > h2 { font-size: 17pt; color: var(--navy); border-bottom: 2pt solid var(--blue); padding-bottom: 5pt; margin: 0 0 8pt; line-height: 1.15; }
  .parte .kicker { font-family: 'Segoe UI', Arial, sans-serif; text-transform: uppercase; letter-spacing: .12em; font-size: 7.6pt; color: var(--blue); font-weight: 600; margin: 0 0 3pt; }
  h3 { font-size: 12.5pt; color: var(--navy); margin: 14pt 0 5pt; break-after: avoid; }
  h4 { font-size: 10.5pt; color: var(--blue); margin: 10pt 0 4pt; break-after: avoid; }
  h5 { font-size: 9.8pt; margin: 8pt 0 3pt; }
  p { margin: 0 0 6pt; orphans: 3; widows: 3; } hr { border: 0; border-top: .6pt solid var(--line); margin: 10pt 0; }
  table { width: 100%; border-collapse: collapse; font-size: 8.2pt; line-height: 1.35; margin: 5pt 0 9pt; }
  th { background: var(--navy); color: #fff; text-align: left; font-weight: 600; padding: 4pt 5pt; vertical-align: bottom; }
  td { padding: 4pt 5pt; border-bottom: .6pt solid var(--line); vertical-align: top; }
  tbody tr:nth-child(even) td { background: var(--zebra); }
  tr { break-inside: avoid; } .c { text-align: center; } .r { text-align: right; }
  code { font-family: Consolas, 'Courier New', monospace; font-size: .9em; background: var(--zebra); padding: 0 2pt; border-radius: 2pt; }
  pre { font: 7.6pt/1.4 Consolas, 'Courier New', monospace; background: #f7f8fa; border: .6pt solid var(--line); border-left: 3pt solid var(--blue); padding: 6pt 8pt; white-space: pre-wrap; word-break: break-word; margin: 4pt 0 9pt; }
  pre code { background: none; padding: 0; font-size: 1em; }
  blockquote { margin: 5pt 0 9pt; padding: 5pt 9pt; border-left: 3pt solid var(--navy); background: var(--hl); }
  blockquote p:last-child { margin: 0; }
  ul, ol { margin: 0 0 7pt; padding-left: 15pt; } li { margin-bottom: 2pt; }
  .box { display: inline-block; width: 8pt; height: 8pt; border: 1pt solid var(--navy); margin-right: 5pt; vertical-align: -1pt; }
  .box.on { background: var(--navy); }
  .lbl { font-size: 7.6pt; text-transform: uppercase; letter-spacing: .08em; color: var(--blue); font-weight: 700; margin: 6pt 0 2pt; }
  .cover { page: portada; height: 296mm; overflow: hidden; padding: 30mm 24mm 22mm; background: linear-gradient(160deg, #13233a 0%, #1c3d63 70%, #1f4e79 100%); color: #fff; display: flex; flex-direction: column; }
  .cover.divisor { break-before: page; background: linear-gradient(160deg, #1f4e79 0%, #1c3d63 55%, #13233a 100%); }
  .cover .eb { text-transform: uppercase; letter-spacing: .14em; font-size: 8.5pt; color: #9fc3e6; font-weight: 600; }
  .cover h1 { font-size: 31pt; line-height: 1.08; margin: 16mm 0 5mm; font-weight: 600; }
  .cover .rule { width: 34mm; height: 2pt; background: #6fa8dc; margin-bottom: 7mm; }
  .cover .sub { font: italic 12.5pt/1.45 Georgia, serif; color: #dce8f4; max-width: 145mm; }
  .cover .toc { margin-top: 12mm; columns: 2; column-gap: 10mm; font-size: 9.5pt; color: #dce8f4; }
  .cover .toc div { break-inside: avoid; padding: 2pt 0; border-bottom: .5pt solid #3d5f86; }
  .cover .toc b { color: #fff; font-weight: 600; margin-right: 4pt; }
  .cover .cursos { margin-top: 12mm; display: grid; gap: 5mm; }
  .cover .cursos div { border-left: 2pt solid #6fa8dc; padding: 1mm 0 1mm 5mm; font-size: 9.5pt; color: #cfe0f1; }
  .cover .cursos b { display: block; font-size: 12pt; color: #fff; }
  .cover .meta { margin-top: auto; font-size: 9.5pt; line-height: 1.8; color: #dce8f4; } .cover .meta b { color: #fff; }
  .cover .foot { border-top: .6pt solid #5d7fa3; margin-top: 7mm; padding-top: 4mm; font-size: 8.4pt; color: #b9cde2; }
</style>`;
}
