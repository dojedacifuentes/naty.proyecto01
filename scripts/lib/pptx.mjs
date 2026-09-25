/**
 * Escribe un .pptx 16:9 mínimo: por lámina, un título, viñetas y notas del orador. Sin
 * dependencias (AGENTS.md §8): arma el OOXML a mano y lo empaqueta con lib/zip.mjs.
 *
 * Pensado como base para herramientas que convierten presentaciones en video con avatar
 * (HeyGen, Synthesia): la lámina es el fondo y las notas son el guion de cada escena. Por
 * eso el texto ocupa los dos tercios izquierdos y deja libre el derecho para el avatar.
 *
 *   crearPptx({ titulo, pie, laminas: [{ titulo, vinetas: ['texto con **negrita**'], notas }] })
 *     → Buffer
 */
import { crearZip } from './zip.mjs';

const NS = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" ' +
  'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ' +
  'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"';
const REL = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const CT = 'application/vnd.openxmlformats-officedocument';
const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';

const COLOR = { oscuro: '0F3D5E', acento: '0E7490', texto: '1F2937', gris: '6B7280', naranjo: 'F59E0B' };
const ANCHO = 12192000;
const ALTO = 6858000;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const rels = (lista) => XML + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
  lista.map(([id, tipo, destino]) => `<Relationship Id="${id}" Type="${tipo.startsWith('http') ? tipo : `${REL}/${tipo}`}" Target="${destino}"/>`).join('') +
  `</Relationships>`;

const grupoVacio = '<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>' +
  '<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>';

// "texto con **negrita**" → runs de DrawingML.
function runs(texto, { sz, color, negrita = false }) {
  return texto.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((trozo) => {
    const b = negrita || /^\*\*.*\*\*$/.test(trozo);
    const t = trozo.replace(/^\*\*|\*\*$/g, '').replace(/\*([^*]+)\*/g, '$1').replace(/`/g, '');
    return `<a:r><a:rPr lang="es-CL" sz="${sz}"${b ? ' b="1"' : ''} dirty="0"><a:solidFill><a:srgbClr val="${color}"/></a:solidFill></a:rPr><a:t>${esc(t)}</a:t></a:r>`;
  }).join('');
}

function cuadro(id, nombre, [x, y, cx, cy], parrafos, anclaje = 't') {
  return `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="${esc(nombre)}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>` +
    `<p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>` +
    `<p:txBody><a:bodyPr wrap="square" lIns="0" rIns="0" anchor="${anclaje}"><a:normAutofit/></a:bodyPr><a:lstStyle/>${parrafos}</p:txBody></p:sp>`;
}

function rectangulo(id, [x, y, cx, cy], color) {
  return `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="Franja ${id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>` +
    `<p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom>` +
    `<a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:ln><a:noFill/></a:ln></p:spPr></p:sp>`;
}

// El tamaño de letra baja con el largo del texto: la lámina se ve igual en PowerPoint y en
// herramientas que no aplican el autoajuste.
function tamano(vinetas) {
  const largo = vinetas.join(' ').length;
  if (largo > 650) return 1300;
  if (largo > 520) return 1400;
  if (largo > 420) return 1600;
  if (largo > 300) return 1800;
  if (largo > 200) return 2000;
  return 2400;
}

// `etiqueta` es una línea breve sobre el título (por ejemplo, el contenido del plan que cubre la
// lámina, textual). Una viñeta que empieza con "## " se muestra como subtítulo, sin viñeta.
function lamina({ titulo, vinetas = [], portada = false, etiqueta = '' }, pie) {
  const sz = tamano(vinetas);
  const vin = vinetas.map((v) => (v.startsWith('## ')
    ? `<a:p><a:pPr marL="0" indent="0"><a:spcBef><a:spcPts val="1400"/></a:spcBef><a:buNone/></a:pPr>${runs(v.slice(3), { sz: Math.max(1100, sz - 200), color: COLOR.acento, negrita: true })}</a:p>`
    : `<a:p><a:pPr marL="342900" indent="-342900"><a:spcBef><a:spcPts val="900"/></a:spcBef><a:buClr><a:srgbClr val="${COLOR.acento}"/></a:buClr><a:buFont typeface="Arial"/><a:buChar char="•"/></a:pPr>${runs(v, { sz, color: COLOR.texto })}</a:p>`)).join('');
  const conEtiqueta = Boolean(etiqueta);
  const formas = portada
    ? [
        rectangulo(2, [0, 0, ANCHO, ALTO], COLOR.oscuro),
        rectangulo(3, [609600, 3276600, 1524000, 76200], COLOR.naranjo),
        ...(conEtiqueta ? [cuadro(7, 'Etiqueta', [609600, 609600, 7315200, 533400], `<a:p>${runs(etiqueta, { sz: 1200, color: '9FC3E6', negrita: true })}</a:p>`, 'b')] : []),
        cuadro(4, 'Título', [609600, 1219200, 7315200, 1981200], `<a:p>${runs(titulo, { sz: 4000, color: 'FFFFFF', negrita: true })}</a:p>`, 'b'),
        cuadro(5, 'Subtítulo', [609600, 3505200, 7315200, 1828800], vinetas.map((v) => `<a:p>${runs(v, { sz: 2200, color: 'E5E7EB' })}</a:p>`).join('')),
        cuadro(6, 'Pie', [609600, 6248400, 7315200, 381000], `<a:p>${runs(pie, { sz: 1200, color: 'CBD5E1' })}</a:p>`),
      ]
    : conEtiqueta
      ? [
          rectangulo(2, [0, 0, ANCHO, 152400], COLOR.acento),
          // Una línea por elemento: con varios contenidos del plan, cada uno se lee entero.
          cuadro(7, 'Etiqueta', [609600, 228600, 7315200, 914400], [].concat(etiqueta).map((e, k) =>
            `<a:p>${runs(e, { sz: [].concat(etiqueta).length > 3 ? 1100 : 1200, color: k ? COLOR.oscuro : COLOR.acento, negrita: true })}</a:p>`).join(''), 'b'),
          cuadro(3, 'Título', [609600, 1181100, 7315200, 685800], `<a:p>${runs(titulo, { sz: 2800, color: COLOR.oscuro, negrita: true })}</a:p>`, 'b'),
          rectangulo(4, [609600, 1943100, 1066800, 50800], COLOR.naranjo),
          cuadro(5, 'Contenido', [609600, 2095500, 7315200, 4000500], vin || '<a:p><a:endParaRPr lang="es-CL"/></a:p>'),
          cuadro(6, 'Pie', [609600, 6248400, 7315200, 381000], `<a:p>${runs(pie, { sz: 1200, color: COLOR.gris })}</a:p>`),
        ]
      : [
          rectangulo(2, [0, 0, ANCHO, 152400], COLOR.acento),
          cuadro(3, 'Título', [609600, 381000, 7315200, 990600], `<a:p>${runs(titulo, { sz: 3200, color: COLOR.oscuro, negrita: true })}</a:p>`, 'b'),
          rectangulo(4, [609600, 1447800, 1066800, 50800], COLOR.naranjo),
          cuadro(5, 'Contenido', [609600, 1676400, 7315200, 4419600], vin || '<a:p><a:endParaRPr lang="es-CL"/></a:p>'),
          cuadro(6, 'Pie', [609600, 6248400, 7315200, 381000], `<a:p>${runs(pie, { sz: 1200, color: COLOR.gris })}</a:p>`),
        ];
  return XML + `<p:sld ${NS}><p:cSld><p:spTree>${grupoVacio}${formas.join('')}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;
}

function notas(texto) {
  const parrafos = String(texto || '').split(/\n+/).filter(Boolean)
    .map((p) => `<a:p><a:r><a:rPr lang="es-CL" dirty="0"/><a:t>${esc(p)}</a:t></a:r></a:p>`).join('') || '<a:p><a:endParaRPr lang="es-CL"/></a:p>';
  return XML + `<p:notes ${NS}><p:cSld><p:spTree>${grupoVacio}` +
    `<p:sp><p:nvSpPr><p:cNvPr id="2" name="Imagen de diapositiva"/><p:cNvSpPr><a:spLocks noGrp="1" noRot="1" noChangeAspect="1"/></p:cNvSpPr><p:nvPr><p:ph type="sldImg"/></p:nvPr></p:nvSpPr><p:spPr/></p:sp>` +
    `<p:sp><p:nvSpPr><p:cNvPr id="3" name="Notas"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr><p:spPr/><p:txBody><a:bodyPr/><a:lstStyle/>${parrafos}</p:txBody></p:sp>` +
    `</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:notes>`;
}

const TEMA = XML + `<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Modulo 2"><a:themeElements>` +
  `<a:clrScheme name="Modulo 2"><a:dk1><a:srgbClr val="${COLOR.texto}"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>` +
  `<a:dk2><a:srgbClr val="${COLOR.oscuro}"/></a:dk2><a:lt2><a:srgbClr val="F3F4F6"/></a:lt2>` +
  `<a:accent1><a:srgbClr val="${COLOR.acento}"/></a:accent1><a:accent2><a:srgbClr val="${COLOR.naranjo}"/></a:accent2>` +
  `<a:accent3><a:srgbClr val="10B981"/></a:accent3><a:accent4><a:srgbClr val="6366F1"/></a:accent4>` +
  `<a:accent5><a:srgbClr val="EF4444"/></a:accent5><a:accent6><a:srgbClr val="64748B"/></a:accent6>` +
  `<a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme>` +
  `<a:fontScheme name="Modulo 2"><a:majorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>` +
  `<a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme>` +
  `<a:fmtScheme name="Modulo 2"><a:fillStyleLst>${'<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>'.repeat(3)}</a:fillStyleLst>` +
  `<a:lnStyleLst>${'<a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln>'.repeat(3)}</a:lnStyleLst>` +
  `<a:effectStyleLst>${'<a:effectStyle><a:effectLst/></a:effectStyle>'.repeat(3)}</a:effectStyleLst>` +
  `<a:bgFillStyleLst>${'<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>'.repeat(3)}</a:bgFillStyleLst></a:fmtScheme>` +
  `</a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>`;

const MAPA = '<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>';

export function crearPptx({ titulo = 'Presentación', pie = '', laminas }, { fecha = new Date() } = {}) {
  const n = laminas.length;
  const archivos = {};
  archivos['[Content_Types].xml'] = XML + `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>` +
    `<Override PartName="/ppt/presentation.xml" ContentType="${CT}.presentationml.presentation.main+xml"/>` +
    `<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="${CT}.presentationml.slideMaster+xml"/>` +
    `<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="${CT}.presentationml.slideLayout+xml"/>` +
    `<Override PartName="/ppt/notesMasters/notesMaster1.xml" ContentType="${CT}.presentationml.notesMaster+xml"/>` +
    `<Override PartName="/ppt/theme/theme1.xml" ContentType="${CT}.theme+xml"/><Override PartName="/ppt/theme/theme2.xml" ContentType="${CT}.theme+xml"/>` +
    `<Override PartName="/ppt/presProps.xml" ContentType="${CT}.presentationml.presProps+xml"/>` +
    `<Override PartName="/ppt/viewProps.xml" ContentType="${CT}.presentationml.viewProps+xml"/>` +
    `<Override PartName="/ppt/tableStyles.xml" ContentType="${CT}.presentationml.tableStyles+xml"/>` +
    `<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>` +
    `<Override PartName="/docProps/app.xml" ContentType="${CT}.extended-properties+xml"/>` +
    laminas.map((_, i) => `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="${CT}.presentationml.slide+xml"/>` +
      `<Override PartName="/ppt/notesSlides/notesSlide${i + 1}.xml" ContentType="${CT}.presentationml.notesSlide+xml"/>`).join('') +
    `</Types>`;
  archivos['_rels/.rels'] = rels([
    ['rId1', 'officeDocument', 'ppt/presentation.xml'],
    ['rId2', 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties', 'docProps/core.xml'],
    ['rId3', 'extended-properties', 'docProps/app.xml'],
  ]);
  archivos['docProps/core.xml'] = XML + `<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">` +
    `<dc:title>${esc(titulo)}</dc:title><dc:creator>licitacion-td-2026</dc:creator>` +
    `<dcterms:created xsi:type="dcterms:W3CDTF">${fecha.toISOString().replace(/\.\d{3}Z$/, 'Z')}</dcterms:created></cp:coreProperties>`;
  archivos['docProps/app.xml'] = XML + `<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>licitacion-td-2026</Application><Slides>${n}</Slides><Notes>${n}</Notes></Properties>`;

  archivos['ppt/presentation.xml'] = XML + `<p:presentation ${NS} saveSubsetFonts="1">` +
    `<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>` +
    `<p:notesMasterIdLst><p:notesMasterId r:id="rId2"/></p:notesMasterIdLst>` +
    `<p:sldIdLst>${laminas.map((_, i) => `<p:sldId id="${256 + i}" r:id="rId${10 + i}"/>`).join('')}</p:sldIdLst>` +
    `<p:sldSz cx="${ANCHO}" cy="${ALTO}"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`;
  archivos['ppt/_rels/presentation.xml.rels'] = rels([
    ['rId1', 'slideMaster', 'slideMasters/slideMaster1.xml'],
    ['rId2', 'notesMaster', 'notesMasters/notesMaster1.xml'],
    ['rId3', 'theme', 'theme/theme1.xml'],
    ['rId4', 'presProps', 'presProps.xml'],
    ['rId5', 'viewProps', 'viewProps.xml'],
    ['rId6', 'tableStyles', 'tableStyles.xml'],
    ...laminas.map((_, i) => [`rId${10 + i}`, 'slide', `slides/slide${i + 1}.xml`]),
  ]);
  archivos['ppt/presProps.xml'] = XML + `<p:presentationPr ${NS}/>`;
  archivos['ppt/viewProps.xml'] = XML + `<p:viewPr ${NS}><p:normalViewPr><p:restoredLeft sz="15620"/><p:restoredTop sz="94660"/></p:normalViewPr><p:gridSpacing cx="76200" cy="76200"/></p:viewPr>`;
  archivos['ppt/tableStyles.xml'] = XML + `<a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>`;
  archivos['ppt/theme/theme1.xml'] = TEMA;
  archivos['ppt/theme/theme2.xml'] = TEMA;

  archivos['ppt/slideMasters/slideMaster1.xml'] = XML + `<p:sldMaster ${NS}><p:cSld><p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg><p:spTree>${grupoVacio}</p:spTree></p:cSld>${MAPA}` +
    `<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>` +
    `<p:txStyles><p:titleStyle><a:lvl1pPr><a:defRPr sz="3200"/></a:lvl1pPr></p:titleStyle><p:bodyStyle><a:lvl1pPr><a:defRPr sz="2400"/></a:lvl1pPr></p:bodyStyle><p:otherStyle><a:lvl1pPr><a:defRPr sz="1800"/></a:lvl1pPr></p:otherStyle></p:txStyles></p:sldMaster>`;
  archivos['ppt/slideMasters/_rels/slideMaster1.xml.rels'] = rels([['rId1', 'slideLayout', '../slideLayouts/slideLayout1.xml'], ['rId2', 'theme', '../theme/theme1.xml']]);
  archivos['ppt/slideLayouts/slideLayout1.xml'] = XML + `<p:sldLayout ${NS} type="blank" preserve="1"><p:cSld name="En blanco"><p:spTree>${grupoVacio}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;
  archivos['ppt/slideLayouts/_rels/slideLayout1.xml.rels'] = rels([['rId1', 'slideMaster', '../slideMasters/slideMaster1.xml']]);

  archivos['ppt/notesMasters/notesMaster1.xml'] = XML + `<p:notesMaster ${NS}><p:cSld><p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg><p:spTree>${grupoVacio}` +
    `<p:sp><p:nvSpPr><p:cNvPr id="2" name="Imagen de diapositiva"/><p:cNvSpPr><a:spLocks noGrp="1" noRot="1" noChangeAspect="1"/></p:cNvSpPr><p:nvPr><p:ph type="sldImg" idx="2"/></p:nvPr></p:nvSpPr>` +
    `<p:spPr><a:xfrm><a:off x="381000" y="685800"/><a:ext cx="6096000" cy="3429000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln w="12700"><a:solidFill><a:prstClr val="black"/></a:solidFill></a:ln></p:spPr></p:sp>` +
    `<p:sp><p:nvSpPr><p:cNvPr id="3" name="Notas"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="body" sz="quarter" idx="3"/></p:nvPr></p:nvSpPr>` +
    `<p:spPr><a:xfrm><a:off x="685800" y="4343400"/><a:ext cx="5486400" cy="4114800"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>` +
    `<p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="es-CL"/></a:p></p:txBody></p:sp></p:spTree></p:cSld>${MAPA}` +
    `<p:notesStyle><a:lvl1pPr marL="0" algn="l"><a:defRPr sz="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/></a:defRPr></a:lvl1pPr></p:notesStyle></p:notesMaster>`;
  archivos['ppt/notesMasters/_rels/notesMaster1.xml.rels'] = rels([['rId1', 'theme', '../theme/theme2.xml']]);

  laminas.forEach((l, i) => {
    const k = i + 1;
    archivos[`ppt/slides/slide${k}.xml`] = lamina(l, pie);
    archivos[`ppt/slides/_rels/slide${k}.xml.rels`] = rels([['rId1', 'slideLayout', '../slideLayouts/slideLayout1.xml'], ['rId2', 'notesSlide', `../notesSlides/notesSlide${k}.xml`]]);
    archivos[`ppt/notesSlides/notesSlide${k}.xml`] = notas(l.notas);
    archivos[`ppt/notesSlides/_rels/notesSlide${k}.xml.rels`] = rels([['rId1', 'notesMaster', '../notesMasters/notesMaster1.xml'], ['rId2', 'slide', `../slides/slide${k}.xml`]]);
  });

  return crearZip(Object.entries(archivos).map(([nombre, contenido]) => ({ nombre, contenido })), { fecha });
}
