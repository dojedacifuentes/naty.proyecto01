/**
 * Escribe un .xlsx con formato, sin dependencias (AGENTS.md §8): XML de SpreadsheetML empaquetado con
 * lib/zip.mjs. Lo usan las planillas que se suben a Drive convertidas en Google Sheets.
 *
 *   crearXlsx([{ nombre, titulo, subtitulo, encabezados, filas, anchos: { fijas, cols }, alto }])
 *     → Buffer listo para escribir a disco
 *
 * Cada celda es un texto (los números se escriben como texto), { url, texto } (enlace) o { texto, estado } con estado
 * 'ok' | 'pend' | 'subir' (color) o 'curso' (negrita). El título ocupa la fila 1, el subtítulo la 2
 * y los encabezados la 4, con filtro y paneles fijos. 'alto' es el alto de cada fila de datos
 * (36 por omisión); con 'auto' se estima según el largo del texto y el ancho de la columna.
 *
 * Además (planilla de exigencias del módulo 2):
 *   { texto, runs: [{ t, b, i, color }] }  texto con partes destacadas (negrita, cursiva, color 'RRGGBB')
 *   { texto, nivel: 1..6 }                  etiqueta de color por nivel de la taxonomía de Bloom
 *   { texto, nota: true }                   texto secundario, en cursiva gris
 *   fila.tipo = 'ae' | 'curso'              fila de sección (fondo claro o fondo azul)
 *   fila.combinar = true | [desde, hasta]   une todas sus celdas, o las columnas desde-hasta (índices desde 0)
 *   hoja.color = 'RRGGBB'                   color de la pestaña
 */
import { crearZip } from './zip.mjs';

const x = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const col = (n) => { let s = ''; for (n++; n; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + ((n - 1) % 26)) + s; return s; };
// Estilos (índices de cellXfs): 1 encabezado · 2 título · 3 subtítulo · 4/5 texto (normal/cebra) · 6/7 enlace ·
// 8 listo · 9 pendiente · 10 por subir · 11/12 negrita (normal/cebra) · 13-18 niveles 1-6 · 19/20 fila de AE (texto/negrita) ·
// 21 fila de curso · 22/23 nota (normal/fila de AE) · 24 enlace en fila de AE · 25 nota en fila cebra
const ESTILO = { ok: 8, pend: 9, subir: 10 };
function celda(ref, v, fila, tipo) {
  const z = fila % 2 === 1;
  const base = tipo === 'ae' ? 19 : tipo === 'curso' ? 21 : z ? 5 : 4;
  if (v == null || v === '') return `<c r="${ref}" s="${base}"/>`;
  if (typeof v === 'object' && v.url) {
    const f = `HYPERLINK("${v.url.replace(/"/g, '""')}","${v.texto.replace(/"/g, '""')}")`;
    return `<c r="${ref}" s="${tipo === 'ae' ? 24 : z ? 7 : 6}" t="str"><f>${x(f)}</f><v>${x(v.texto)}</v></c>`;
  }
  if (typeof v === 'object') {
    const s = v.nivel ? 12 + v.nivel : v.nota ? (tipo === 'ae' ? 23 : z ? 25 : 22) : v.estado === 'curso' ? (tipo === 'ae' ? 20 : tipo === 'curso' ? 21 : z ? 12 : 11)
      : ESTILO[v.estado] ?? base;
    return `<c r="${ref}" s="${s}" t="inlineStr"><is>${v.runs ? runs(v.runs, tipo) : t(v.texto)}</is></c>`;
  }
  return `<c r="${ref}" s="${base}" t="inlineStr"><is>${t(v)}</is></c>`;
}
// Con saltos de línea, el texto necesita xml:space="preserve" para que no se pierdan.
const t = (v) => (/\n/.test(v) ? `<t xml:space="preserve">${x(v)}</t>` : `<t>${x(v)}</t>`);
// Texto enriquecido: el orden de los hijos de rPr lo fija el esquema (rFont, b, i, color, sz).
const runs = (rs, tipo) => rs.filter((r) => r.t).map((r) => `<r><rPr><rFont val="Arial"/>${r.b ? '<b/>' : ''}${r.i ? '<i/>' : ''}<color rgb="FF${
  r.color ?? (tipo === 'curso' ? 'FFFFFF' : '1F2937')}"/><sz val="10"/></rPr><t xml:space="preserve">${x(r.t)}</t></r>`).join('');
// Alto estimado de una fila: líneas que ocupa la celda más larga (≈1,15 caracteres por unidad de ancho a 10 pt;
// ≈0,75 si el texto va casi todo en mayúsculas, como los aprendizajes de SIPFOR).
function altoAuto(f, cols) {
  const lineas = Math.max(1, ...f.map((v, i) => {
    const texto = String(v?.texto ?? v ?? '');
    const letras = texto.replace(/[^\p{L}]/gu, '');
    const mayus = letras.length && letras.replace(/[^\p{Lu}]/gu, '').length / letras.length > 0.6;
    const porLinea = Math.max(1, Math.floor((cols[i] ?? 10) * (mayus ? 0.75 : 1.15)));
    return texto.split('\n').reduce((n, l) => n + Math.max(1, Math.ceil(l.length / porLinea)), 0);
  }));
  return Math.min(409, Math.max(30, 15 * lineas + 8));
}
function hoja({ titulo, subtitulo, encabezados, filas, anchos, alto = 36, color }) {
  const n = encabezados.length;
  const r = [];
  const unir = [`A1:${col(n - 1)}1`, `A2:${col(n - 1)}2`];
  r.push(`<row r="1" ht="30" customHeight="1"><c r="A1" s="2" t="inlineStr"><is><t>${x(titulo)}</t></is></c></row>`);
  r.push(`<row r="2" ht="18" customHeight="1"><c r="A2" s="3" t="inlineStr"><is><t>${x(subtitulo)}</t></is></c></row>`);
  r.push(`<row r="4" ht="34" customHeight="1">${encabezados.map((h, i) => `<c r="${col(i)}4" s="1" t="inlineStr"><is><t>${x(h)}</t></is></c>`).join('')}</row>`);
  filas.forEach((f, k) => {
    const fila = 5 + k;
    // En una fila combinada, el alto se estima con el ancho sumado de las columnas unidas.
    const [a, b] = f.combinar === true ? [0, n - 1] : f.combinar ?? [];
    const cols = f.combinar ? anchos.cols.map((w, i) => (i === a ? anchos.cols.slice(a, b + 1).reduce((s1, s2) => s1 + s2, 0) : i > a && i <= b ? 0 : w)) : anchos.cols;
    const ht = f.alto ?? (alto === 'auto' ? altoAuto(f, cols) : alto);
    const celdas = f.combinar ? [...f, ...Array(Math.max(0, n - f.length)).fill('')] : f;
    if (f.combinar) unir.push(`${col(a)}${fila}:${col(b)}${fila}`);
    r.push(`<row r="${fila}" ht="${ht}" customHeight="1">${celdas.map((v, i) => celda(`${col(i)}${fila}`, v, k, f.tipo)).join('')}</row>`);
  });
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
${color ? `<sheetPr><tabColor rgb="FF${color}"/></sheetPr>\n` : ''}<sheetViews><sheetView workbookViewId="0" showGridLines="0"><pane xSplit="${anchos.fijas ?? 0}" ySplit="4" topLeftCell="${col(anchos.fijas ?? 0)}5" activePane="bottomRight" state="frozen"/></sheetView></sheetViews>
<cols>${anchos.cols.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>
<sheetData>${r.join('')}</sheetData>
<autoFilter ref="A4:${col(n - 1)}${4 + filas.length}"/>
<mergeCells count="${unir.length}">${unir.map((u) => `<mergeCell ref="${u}"/>`).join('')}</mergeCells>
</worksheet>`;
}
const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="15">
<font><sz val="10"/><color rgb="FF1F2937"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Arial"/></font>
<font><b/><sz val="16"/><color rgb="FF0F3D5E"/><name val="Arial"/></font>
<font><i/><sz val="10"/><color rgb="FF475569"/><name val="Arial"/></font>
<font><u/><sz val="10"/><color rgb="FF0E7490"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FF0F3D5E"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FF166534"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FF92400E"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FF475569"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FF334155"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FF1E40AF"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FF166534"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FF92400E"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FFBE123C"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FF6B21A8"/><name val="Arial"/></font>
</fonts>
<fills count="15">
<fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF0F3D5E"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFF1F5F9"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFDCFCE7"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFFEF3C7"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFE2E8F0"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFE2E8F0"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFDBEAFE"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFDCFCE7"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFFEF3C7"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFFFE4E6"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFF3E8FF"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFE8EFF6"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF0F3D5E"/></patternFill></fill>
</fills>
<borders count="2"><border/><border><bottom style="thin"><color rgb="FFCBD5E1"/></bottom></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="26">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="center"/></xf>
<xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="4" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="4" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="6" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="7" fillId="5" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="8" fillId="6" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="5" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="9" fillId="7" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="10" fillId="8" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="11" fillId="9" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="12" fillId="10" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="13" fillId="11" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="14" fillId="12" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="0" fillId="13" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="5" fillId="13" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="1" fillId="14" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="3" fillId="0" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="3" fillId="13" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="4" fillId="13" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="3" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
</cellXfs>
</styleSheet>`;

export function crearXlsx(hojas) {
  const archivos = [
    { nombre: '[Content_Types].xml', contenido: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${hojas.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>` },
    { nombre: '_rels/.rels', contenido: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' },
    { nombre: 'xl/workbook.xml', contenido: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${hojas.map((h, i) => `<sheet name="${x(h.nombre)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets><definedNames>${hojas.map((h, i) => `<definedName name="_xlnm._FilterDatabase" localSheetId="${i}" hidden="1">'${h.nombre}'!$A$4:$${col(h.encabezados.length - 1)}$${4 + h.filas.length}</definedName>`).join('')}</definedNames></workbook>` },
    { nombre: 'xl/_rels/workbook.xml.rels', contenido: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${hojas.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${hojas.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
    { nombre: 'xl/styles.xml', contenido: STYLES },
    ...hojas.map((h, i) => ({ nombre: `xl/worksheets/sheet${i + 1}.xml`, contenido: hoja(h) })),
  ];
  return crearZip(archivos);
}
