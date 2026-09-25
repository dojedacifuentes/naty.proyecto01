#!/usr/bin/env node
/**
 * Arma, para el módulo 2 de un curso, las bases de producción y el carril automático de
 * entregables (el flujo está en modulo-2/FLUJO-PRODUCCION.md).
 *
 *   npm run produccion -- PF1821 PF1822 [--sin-pdf] [--solo-lecturas]
 *
 * modulo-2/<carpeta del curso>/produccion/  lo que se carga en otras herramientas:
 *   videos/      PPTX con narración en las notas (HeyGen: una escena por lámina) + guion.md
 *   infografias/ prompts.md, uno por aprendizaje esperado y uno para la ruta del módulo
 *
 * modulo-2/<carpeta del curso>/entrega/  recursos finales, neutros y listos para subir:
 *   AE1..AE4/        M2-AEn-Quiz.gift (Moodle: Banco de preguntas → Importar → GIFT) y
 *                    M2-AEn-Lectura.pdf (fuente: contenidos/<PF>/modulo-2/lecturas/AEn.md)
 *   evaluacion/      9 PDF: 3 instrumentos, guía e instrumento del portafolio, retroalimentación,
 *                    autoevaluación, coevaluación y bitácora
 *   actividades/     enunciado (participante) y respuesta modelada (tutor) de cada actividad,
 *                    insumos/ (SQL, CSV) y respuesta-modelada/codigo/ (.py para pytest)
 *   medios/          cuadro comparativo en PDF
 *   insumos-anexo/   textos de las secciones V y VI del Anexo 2 en HTML, para copiar a Word
 * Las demás piezas de entrega/ (videos e infografías) las agrega quien las produce.
 *
 * La fuente es contenidos/<PF>/modulo-2/. Lo que genera este script no se edita a mano.
 */
import { leer, escribir, ruta, rel } from './lib/repo.mjs';
import { crearPptx } from './lib/pptx.mjs';
import { markdown, estilos, esc } from './lib/html.mjs';
import { imprimirPdf, navegador } from './lib/pdf.mjs';
import { leerLectura, verificarLectura, lecturaHtml, palabras } from './lib/lectura.mjs';
import fs from 'node:fs';

const CURSOS = {
  PF1821: { carpeta: 'modulo-2/PF1821-agentes-low-code', curso: 'Construcción de Agentes y Automatización con Herramientas Low Code', caso: 'Mercado Austral' },
  PF1822: { carpeta: 'modulo-2/PF1822-desarrollo-con-ia', curso: 'Especialización en Desarrollo con IA', caso: 'Nube Sur' },
};

const args = process.argv.slice(2);
const codigos = args.filter((a) => /^PF\d{4}$/i.test(a)).map((a) => a.toUpperCase());
if (!codigos.length || codigos.some((c) => !CURSOS[c])) {
  console.error(`Uso: npm run produccion -- ${Object.keys(CURSOS).join(' ')} [--sin-pdf]`);
  process.exit(1);
}
const conPdf = !args.includes('--sin-pdf');
const soloLecturas = args.includes('--solo-lecturas');
if (conPdf && !navegador()) {
  console.error('No encontré Edge ni Chrome para imprimir los PDF. Usa --sin-pdf o define NAVEGADOR_PDF.');
  process.exit(1);
}

// ------------------------------------------------------------------ lectura

function celdas(linea) {
  const out = []; let actual = ''; let enCodigo = false;
  const l = linea.trim().replace(/^\|/, '').replace(/\|$/, '');
  for (const ch of l) {
    if (ch === '`') enCodigo = !enCodigo;
    if (ch === '|' && !enCodigo) { out.push(actual.trim()); actual = ''; continue; }
    actual += ch;
  }
  out.push(actual.trim());
  return out;
}

function seccion(md, desde, hasta = /^## /) {
  const L = md.split('\n');
  const i = L.findIndex((l) => desde.test(l));
  if (i < 0) throw new Error(`no encuentro la sección ${desde}`);
  const j = L.findIndex((l, k) => k > i && hasta.test(l));
  return L.slice(i, j < 0 ? L.length : j);
}

function capsulas(md) {
  const out = [];
  let actual = null;
  for (const l of md.split('\n')) {
    const m = /^## Cápsula (\d+) · (.+?) \((AE\d)\b/.exec(l);
    if (m) { actual = { n: +m[1], titulo: m[2], ae: m[3], laminas: [] }; out.push(actual); continue; }
    if (/^## /.test(l)) { actual = null; continue; }
    if (actual && /^\| *\d+ *\|/.test(l)) {
      // | # | Lámina | Contenido del plan (textual) | Contenido |
      const c = celdas(l);
      const plan = c.length >= 4 && c[2] !== '—' ? c[2].split(' / ').map((s) => s.trim()) : [];
      actual.laminas.push({ titulo: c[1], plan, contenido: c.length >= 4 ? c[3] : c[2] });
    }
  }
  if (out.length !== 4) throw new Error(`esperaba 4 cápsulas y encontré ${out.length}`);
  return out;
}

// Aprendizajes, criterios y contenidos por AE, desde la ficha textual de SIPFOR.
function ficha(md) {
  const aes = {};
  let actual = null; let bloque = null;
  for (const l of md.split('\n')) {
    const m = /^### (AE\d)\. (.+)$/.exec(l);
    if (m) { actual = aes[m[1]] = { texto: m[2], criterios: [], contenidos: [] }; continue; }
    if (/^## /.test(l)) { actual = null; continue; }
    if (!actual) continue;
    if (/^\*\*Criterios/.test(l)) bloque = 'criterios';
    else if (/^\*\*Contenidos/.test(l)) bloque = 'contenidos';
    else if (/^\s*- /.test(l) && bloque) actual[bloque].push(l.replace(/^\s*- /, (x) => (x.startsWith('  ') ? '  - ' : '- ')));
  }
  const competencia = seccion(md, /^## Competencia del módulo/).slice(1).join(' ').trim();
  const modulo = /^# .*?: (.+)$/m.exec(md)?.[1] ?? '';
  return { aes, competencia, modulo };
}

// Texto de lámina → narración: sin marcas de Markdown ni símbolos que un avatar lee mal.
const hablar = (t) => t
  .replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/`([^`]+)`/g, '$1')
  .replace(/\s*\bR\d\d\b/g, '')
  .replace(/\s*→\s*/g, ', luego ')
  .replace(/\s*·\s*/g, ', ')
  .replace(/\s*×\s*/g, ' por ')
  .replace(/\s*≈\s*/g, ', aproximadamente ')
  .replace(/\s+=\s+/g, ' es ')
  .replace(/\s+/g, ' ')
  .trim();

// ------------------------------------------------ textual del plan (videocápsulas)

// Contenidos del plan por AE, en unidades: cada ítem de la ficha partido por " *" (así los
// junta SIPFOR) y por oración, sin cambiar una palabra. Son los rótulos de las láminas.
function unidades(fichaMd, n) {
  const bloque = fichaMd.split(`### AE${n}.`)[1].split(/\n### |\n## /)[0];
  const items = bloque.split('**Contenidos**')[1].split('\n').filter((l) => /^\s*- /.test(l)).map((l) => l.trim().slice(2));
  return items.flatMap((it) => it.split(/\s\*/).flatMap((p) => p.split(/(?<=\D\.)\s+(?=[A-ZÁÉÍÓÚÑ])/))).map((s) => s.trim()).filter(Boolean);
}

// Cada rótulo de lámina tiene que ser textual del plan, y cada contenido del plan tiene que
// estar en alguna lámina. Si no, no se genera: el revisor compara lámina contra plan.
function verificarTextual(pf, cap, fichaMd) {
  const u = unidades(fichaMd, +cap.ae.slice(2));
  const usadas = cap.laminas.flatMap((l) => l.plan);
  const ajenas = usadas.filter((x) => !u.includes(x));
  const faltan = u.filter((x) => !usadas.includes(x));
  if (ajenas.length) throw new Error(`${pf} cápsula ${cap.n}: rótulos que no son textuales del plan: ${ajenas.join(' | ')}`);
  if (faltan.length) throw new Error(`${pf} cápsula ${cap.n}: contenidos del plan sin lámina: ${faltan.join(' | ')}`);
}

// Texto del plan (en mayúsculas en SIPFOR) → oración para la voz, con las mismas palabras.
// Algunas voces deletrean las palabras en mayúsculas; las siglas y nombres propios se restauran.
const PROPIOS = [
  ['apis', 'APIs'], ['api', 'API'], ['http', 'HTTP'], ['json', 'JSON'], ['csv', 'CSV'], ['xml', 'XML'],
  ['roi', 'ROI'], ['crud', 'CRUD'], ['ia', 'IA'], ['nlp', 'NLP'], ['bleu', 'BLEU'], ['rouge', 'ROUGE'],
  ['tf-idf', 'TF-IDF'], ['qa', 'QA'], ['rest', 'REST'], ['get', 'GET'], ['post', 'POST'], ['nltk', 'NLTK'],
  ['spacy', 'spaCy'], ['openai', 'OpenAI'], ['hugging face', 'Hugging Face'], ['supabase', 'Supabase'],
  ['python', 'Python'], ['if/switch', 'If/Switch'], ['merge', 'Merge'], ['filter', 'Filter'],
  ['summarize', 'Summarize'], ['split', 'Split'], ['set', 'Set'], ['tensorflow', 'TensorFlow'],
  ['pytorch', 'PyTorch'], ['langchain', 'LangChain'], ['diffusers', 'Diffusers'], ['transformers', 'Transformers'],
  ['countvectorizer', 'CountVectorizer'],
];
function oracion(t) {
  let s = t.toLowerCase();
  for (const [a, b] of PROPIOS) {
    const patron = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // en modo u, "-" y "/" no se escapan
    s = s.replace(new RegExp(`(?<![\\p{L}\\d])${patron}(?![\\p{L}\\d])`, 'gu'), b);
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Código dentro de la narración: lo corto se dice ("json punto campo"); lo largo o con
// símbolos se nombra ("la expresión que ves en pantalla"), porque leído en voz no se entiende.
const DICHOS = {
  "$('Nombre del nodo').item.json.campo": 'la referencia a otro nodo por su nombre',
  '===': 'triple igual',
  '>=': 'mayor o igual',
  '&&': 'doble ampersand (y)',
  '\\|\\|': 'doble barra',
  '!': 'signo de exclamación (no)',
  '{{ $execution.id }}': 'el identificador de la ejecución',
  'Authorization: Bearer <clave>': 'Authorization, con la palabra Bearer y la clave',
  'json=': 'el parámetro json',
};
function hablarCodigo(c) {
  const t = c.trim();
  if (DICHOS[t]) return DICHOS[t];
  if (/^\{\{\s*\}\}$/.test(t)) return 'dobles llaves';
  if (t.length > 24 || /["'[\]{}<>=/\\]/.test(t)) return 'la expresión que ves en pantalla';
  return t.replace(/^\$/, '').replace(/\(\)/g, '').replace(/\./g, ' punto ').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
}

// Narración de videocápsula: como hablar(), pero además dice el código y las barras.
const narrar = (t) => t
  .replace(/`([^`]+)`/g, (_, c) => hablarCodigo(c))
  .replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1')
  .replace(/\s*\bR\d\d\b/g, '')
  .replace(/(\p{L})_(\p{L})/gu, '$1 $2')
  .replace(/(\p{L})\s*\/\s*(\p{L})/gu, '$1 o $2')
  .replace(/\s*→\s*/g, ', luego ')
  .replace(/\s*·\s*/g, ', ')
  .replace(/\s*×\s*/g, ' por ')
  .replace(/\s*≈\s*/g, ', aproximadamente ')
  .replace(/\s+=\s+/g, ' es ')
  .replace(/\s+/g, ' ')
  .trim();

// Contenido de lámina → viñetas: una por oración, cuatro como máximo.
function vinetas(contenido) {
  const oraciones = contenido.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡"*`])/).map((s) => s.trim()).filter(Boolean);
  if (oraciones.length <= 4) return oraciones;
  return [...oraciones.slice(0, 3), oraciones.slice(3).join(' ')];
}

// Texto breve para una sección de infografía: oraciones completas hasta unos 170 caracteres,
// pero nunca menos de una idea completa ("Entre {{ }}." sola no dice nada).
function breve(t) {
  const oraciones = hablar(t).split(/(?<=[.!?])\s/);
  let out = oraciones[0];
  for (const o of oraciones.slice(1)) {
    if (out.length >= 60 && (out + ' ' + o).length > 170) break;
    out += ' ' + o;
  }
  return out;
}

// ------------------------------------------------------------------ piezas

// Videocápsula: portada, lámina del aprendizaje esperado con sus criterios (textuales del plan)
// y una lámina por tema, rotulada con el contenido del plan que cubre, también textual.
function videoCapsula(pf, c, cap, f, fichaMd) {
  verificarTextual(pf, cap, fichaMd);
  const n = cap.ae.slice(2);
  const ae = f.aes[cap.ae];
  const criterios = ae.criterios.map((x) => x.replace(/^\s*-\s*/, ''));
  const pie = `${pf} · Módulo 2 · Cápsula ${cap.n} · Aprendizaje esperado ${n}`;
  const [portada, ...resto] = cap.laminas;
  const laminas = [
    {
      portada: true,
      etiqueta: `MÓDULO 2 · ${f.modulo}`,
      titulo: `Cápsula ${cap.n}: ${cap.titulo}`,
      vinetas: [portada.contenido, `Contenido del plan: ${portada.plan.join(' / ')}`],
      plan: portada.plan,
      notas: `Te doy la bienvenida a la cápsula ${cap.n} del módulo 2, ${narrar(oracion(f.modulo))}: ${narrar(cap.titulo)}. ${narrar(portada.contenido)}`,
    },
    {
      etiqueta: 'APRENDIZAJE Y CRITERIOS TEXTUALES DEL PLAN FORMATIVO',
      titulo: `Aprendizaje esperado ${n}`,
      vinetas: [`**${ae.texto}**`, '## CRITERIOS DE EVALUACIÓN', ...criterios],
      plan: [],
      notas: `Esta cápsula corresponde al aprendizaje esperado ${n} del plan formativo: ${narrar(oracion(ae.texto))} ` +
        `Sus criterios de evaluación son: ${criterios.map((x) => narrar(oracion(x.replace(/^\d+\.\d+\s*/, '')))).join(' ')}`,
    },
    ...resto.map((l) => ({
      etiqueta: l.plan.length ? ['CONTENIDO DEL PLAN (TEXTUAL)', ...l.plan] : `PRÁCTICA DEL APRENDIZAJE ESPERADO ${n}`,
      titulo: l.titulo,
      vinetas: vinetas(l.contenido),
      plan: l.plan,
      notas: `${narrar(l.titulo)}. ${narrar(l.contenido)}`,
    })),
  ];
  const celda = (s) => s.replace(/\|/g, '/');
  const cobertura = unidades(fichaMd, +n).map((u) =>
    `| ${celda(u)} | ${laminas.map((l, i) => (l.plan.includes(u) ? i + 1 : null)).filter(Boolean).join(', ')} |`);
  const guion = [
    `# ${pf} · Cápsula ${cap.n} (${cap.ae}) · ${cap.titulo} — guion`,
    '',
    `Base para HeyGen: \`${cap.ae}-capsula.pptx\`, una escena por lámina, con la narración en las notas.`,
    'Esta tabla trae la misma narración, para otras herramientas o para pulirla antes de grabar.',
    '',
    `**Aprendizaje esperado ${n} (textual del plan):** ${ae.texto}`,
    '',
    '**Criterios de evaluación (textuales del plan):**',
    '',
    ...criterios.map((x) => `- ${x}`),
    '',
    '| Lámina | Contenido del plan (textual) | En pantalla | Narración |',
    '| --- | --- | --- | --- |',
    ...laminas.map((l, i) => `| ${i + 1} | ${i === 1 ? 'Aprendizaje esperado y criterios de evaluación' : celda(l.plan.join(' / ')) || '—'} | ${celda(l.titulo)} | ${celda(l.notas)} |`),
    '',
    '## Cobertura de los contenidos del plan',
    '',
    `Cada contenido del aprendizaje esperado ${n}, tal como está en el plan, y la lámina donde aparece rotulado.`,
    '',
    '| Contenido del plan (textual) | Lámina |',
    '| --- | --- |',
    ...cobertura,
    '',
  ].join('\n');
  return { pptx: crearPptx({ titulo: `${pf} · Cápsula ${cap.n} · ${cap.titulo}`, pie, laminas }), guion };
}

function videoBienvenida(pf, c, md, modulo) {
  const filas = seccion(md, /^## R01\b/).filter((l) => /^\| *\d+:\d\d/.test(l)).map(celdas);
  const laminas = filas.map(([tiempo, imagen, locucion], i) => ({
    portada: i === 0,
    titulo: i === 0 ? `Módulo 2: ${modulo}` : `Escena ${i + 1}`,
    vinetas: i === 0 ? [c.curso] : [`Imagen sugerida (reemplazar antes de grabar): ${imagen.replace(/\*/g, '')}`],
    notas: hablar(locucion.replace(/^"|"$/g, '')),
  }));
  const guion = [
    `# ${pf} · Video de bienvenida — guion`,
    '',
    'Base para HeyGen: `00-bienvenida.pptx`. Antes de grabar, reemplaza el texto "Imagen sugerida"',
    'de cada lámina por la imagen o captura que indica (o déjala solo con el avatar).',
    '',
    '| Tiempo | Imagen | Narración |',
    '| --- | --- | --- |',
    ...filas.map(([t, img, loc]) => `| ${t} | ${img} | ${hablar(loc.replace(/^"|"$/g, ''))} |`),
    '',
    'Placa final (la completa cada institución): nombre del tutor y horario de las sesiones sincrónicas.',
    '',
  ].join('\n');
  return { pptx: crearPptx({ titulo: `${pf} · Video de bienvenida`, pie: `${pf} · Módulo 2 · Bienvenida`, laminas }), guion };
}

// Herramienta didáctica 2: el video base va a HeyGen y las preguntas se agregan después en H5P.
function videoInteractivo(pf, c, md) {
  const H = seccion(md, /^## Herramienta 2\b/);
  const nombre = H[0].replace(/^## Herramienta 2 · /, '').replace(/"/g, '');
  const filas = H.filter((l) => /^\| *\d+:\d\d–/.test(l)).map(celdas);
  const pausas = H.filter((l) => /^\| *\*\*\d+:\d\d\*\*/.test(l)).map((l) => celdas(l).map((x) => x.replace(/\*/g, '')));
  const preguntas = subseccion(H, /^### Preguntas/);
  if (!filas.length || !preguntas) throw new Error(`${pf}: la herramienta 2 no tiene guion o preguntas`);
  const laminas = filas.map(([, pantalla, locucion], i) => ({
    portada: i === 0,
    titulo: i === 0 ? nombre : `Escena ${i + 1}`,
    vinetas: i === 0 ? [`Video interactivo · ${c.curso}`] : [`Pantalla sugerida (reemplazar antes de grabar): ${pantalla.replace(/\*/g, '')}`],
    notas: hablar(locucion.replace(/^"|"$/g, '')),
  }));
  const guion = [
    `# ${pf} · Herramienta didáctica 2 · ${nombre} — guion y preguntas`,
    '',
    '1. **Video base en HeyGen:** `H2-video-interactivo.pptx` (narración en las notas). Reemplaza el texto',
    '   "Pantalla sugerida" de cada lámina por la captura que indica, o graba esa pantalla aparte.',
    '2. **Preguntas en H5P** (Interactive Video, por ejemplo en Lumi): agrega cada pregunta en su pausa. Si el',
    '   video final dura distinto, ajusta los tiempos a los cortes entre escenas.',
    '',
    '| Tiempo | Pantalla | Narración |',
    '| --- | --- | --- |',
    ...filas.map(([t, p, l]) => `| ${t} | ${p} | ${hablar(l.replace(/^"|"$/g, ''))} |`),
    '',
    `**Pausas:** ${pausas.map(([t, q]) => `${q} en ${t}`).join(' · ')}`,
    '',
    ...preguntas.map((l) => l.replace(/^###/, '##')),
    '',
  ].join('\n');
  return { pptx: crearPptx({ titulo: `${pf} · ${nombre}`, pie: `${pf} · Módulo 2 · Herramienta didáctica 2`, laminas }), guion };
}

// ------------------------------------------------------------------ infografías

// Especificaciones visuales: son el estándar de este proyecto, no de las bases (las bases no
// fijan medidas ni formato; piden medios que apoyen el aprendizaje y un ambiente con íconos,
// multimedia e imágenes). Van completas en cada prompt para que cada uno funcione solo.
// Tamaños de letra (px sobre un lienzo de 1080 de ancho). El alto del lienzo se calcula con
// ellos: así el contenido cabe completo sin achicar la letra.
const TAM = { etiqueta: 22, titulo: 60, bajada: 30, recuadro: 24, encabezado: 32, rotulo: 20, texto: 24, pie: 20 };
const ANCHO_UTIL = 1080 - 2 * 72;
// Líneas que ocupa un texto: ancho promedio de carácter ≈ 0,52 em en minúsculas, 0,68 en mayúsculas.
const lineas = (t, px, ancho, mayus = false) => Math.max(1, Math.ceil(t.length / Math.floor(ancho / (px * (mayus ? 0.68 : 0.52)))));
const alto = (t, px, ancho, mayus, interlineado = 1.35) => lineas(t, px, ancho, mayus) * px * interlineado;
const redondear = (h) => Math.max(1920, Math.ceil(h / 60) * 60);

function especificaciones(diagramacion, altoPx) {
  return [
    '1. FORMATO Y MEDIDAS',
    altoPx
      ? `- Lienzo de 1080 × ${altoPx} px, vertical, color RGB (sRGB). El ancho es fijo para todas las infografías del módulo; el alto está calculado para que este contenido quepa completo con los tamaños de letra indicados. No lo reduzcas ni achiques la letra para que quepa.`
      : '- Lienzo de 1080 px de ancho (fijo) y el alto que indica cada prompt, vertical, color RGB (sRGB). El alto está calculado para que el contenido quepa con los tamaños de letra indicados.',
    '- Márgenes de seguridad: 72 px a los lados y 96 px arriba y abajo. Ningún texto ni ícono fuera de esa área.',
    `- Exportación: PNG del tamaño del lienzo, de 2 MB como máximo. Si la herramienta lo permite, también un PDF de una página, para ampliar sin perder nitidez.`,
    '',
    '2. TIPOGRAFÍA',
    '- Una sola familia sans serif de alta legibilidad (Inter, Montserrat, Open Sans o Roboto), con dos pesos como máximo: regular y negrita.',
    '- El código va en fuente monoespaciada (JetBrains Mono o Consolas), sobre un fondo gris muy claro.',
    '- Tamaños:',
    `  - etiqueta superior: ${TAM.etiqueta} px, en mayúsculas;`,
    `  - título: ${TAM.titulo} px, en negrita, 2 líneas como máximo;`,
    `  - bajada: ${TAM.bajada} px;`,
    `  - texto del recuadro (aprendizaje esperado o competencia): ${TAM.recuadro} px, en mayúsculas como en el plan;`,
    `  - encabezado de sección: ${TAM.encabezado} px, en negrita;`,
    `  - rótulo "Contenido del plan": ${TAM.rotulo} px, en mayúsculas;`,
    `  - texto de sección: ${TAM.texto} px;`,
    `  - pie: ${TAM.pie} px.`,
    `- Ningún texto por debajo de ${TAM.rotulo} px.`,
    '- Interlineado de 1,3 a 1,4. Texto alineado a la izquierda, sin justificar y sin cortar palabras con guion.',
    '',
    '3. COLOR Y CONTRASTE',
    '- Fondo #F8FAFC. Títulos en azul oscuro #0F3D5E.',
    '- Íconos, líneas y rótulos en azul petróleo #0E7490. Texto en #1F2937. Rótulo "Contenido del plan" en #475569.',
    '- Naranjo #F59E0B solo para los números de sección y detalles gráficos, nunca para texto sobre fondo claro: no alcanza el contraste.',
    '- Contraste mínimo de 4,5:1 para texto normal y de 3:1 para texto grande (WCAG 2.1 AA). El color nunca es la única forma de distinguir información.',
    '',
    '4. ÍCONOS E IMÁGENES',
    '- Un ícono lineal por sección, de 72 a 80 px, con trazo uniforme de 3 px y todos del mismo estilo. Cada ícono representa el concepto de su sección; no es decoración.',
    '- Sin fotografías de stock, personas genéricas, texturas, degradados fuertes, sombras pesadas ni efectos 3D.',
    '- Diagramas simples (flechas, cajas conectadas) solo si aclaran una idea.',
    '',
    '5. DIAGRAMACIÓN Y LECTURA',
    ...diagramacion,
    '- Separación mínima de 32 px entre bloques, con espacio en blanco generoso. Todo alineado a una misma retícula.',
    '',
    '6. REGLAS DE TEXTO',
    '- Usa exactamente los textos del bloque CONTENIDO: no resumas, no reescribas, no traduzcas, no agregues datos, cifras ni ejemplos.',
    '- Los textos marcados "textual del plan formativo" van tal cual, en mayúsculas, como están en el plan.',
    '- Lo que va entre acentos graves (`así`) es código: escríbelo en la fuente monoespaciada, sin los acentos graves.',
    '- Revisa ortografía y tildes letra por letra: ninguna palabra puede salir deformada.',
    '- Sin logos, nombres ni colores de instituciones: es un recurso base común a todos los oferentes.',
    '- Si tu herramienta no puede escribir el texto con exactitud (generadores de imágenes), entrega el diseño con los espacios de texto vacíos, en la jerarquía indicada y numerados como el bloque CONTENIDO.',
  ];
}

const DIAGRAMA_AE = [
  '- Orden de lectura de arriba hacia abajo: etiqueta superior, título, bajada, recuadro del aprendizaje esperado, secciones y pie.',
  '- El recuadro del aprendizaje esperado va destacado bajo el título, con fondo #E6F3F7 y borde izquierdo de 8 px en #0E7490.',
  '- Cada sección es una tarjeta de ancho completo, en una sola columna: a la izquierda, el número en un círculo naranjo y el ícono; a la derecha, el encabezado, el rótulo "Contenido del plan" y el texto.',
  '- Las tarjetas alternan un fondo blanco y uno #F1F5F9 para separar las secciones sin líneas extra.',
];
const DIAGRAMA_RUTA = [
  '- Orden de lectura de arriba hacia abajo: etiqueta superior, título, bajada, recuadro de la competencia, la ruta, los dos bloques finales y el pie.',
  '- El recuadro de la competencia va destacado bajo el título, con fondo #E6F3F7 y borde izquierdo de 8 px en #0E7490.',
  '- La ruta es una línea de tiempo vertical: 4 estaciones unidas por una línea continua de 6 px en #0E7490. Cada estación lleva su número en un círculo naranjo, su ícono, el título con las horas, "Qué haces" y "Qué te llevas".',
  '- Bajo la ruta van dos bloques, "Cómo te acompañamos" y "Cómo te evaluamos", lado a lado en dos columnas iguales, con viñetas.',
];

const conComillas = (s) => `«${s}»`;
const limpiarInfo = (t) => t.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/(^|[^*])\*([^*]+)\*/g, '$1$2')
  .replace(/\s*\bR\d\d\b/g, '').replace(/\s+/g, ' ').trim();
// Texto de sección: oraciones completas hasta unos 140 caracteres (unas 25 palabras), nunca
// menos de una idea completa. El código queda entre acentos graves para la monoespaciada.
function breveInfo(t) {
  const oraciones = limpiarInfo(t).split(/(?<=[.!?])\s(?=[A-ZÁÉÍÓÚÑ¿¡"`(])/);
  let out = oraciones[0];
  for (const o of oraciones.slice(1)) {
    if (out.length >= 60 && (out + ' ' + o).length > 140) break;
    out += ' ' + o;
  }
  return out;
}

function datosModulo(fichaMd) {
  const m = /^\| Módulo \|[^|]*`(M[AB]\d{5})`[^|]*\*\*(\d+) h\*\*/m.exec(fichaMd);
  if (!m) throw new Error('la ficha no trae el código y las horas del módulo');
  return { codigo: m[1], horas: m[2] };
}

function promptAE(pf, c, cap, f, mod) {
  const n = cap.ae.slice(2);
  const ae = f.aes[cap.ae];
  const [portada, ...resto] = cap.laminas;
  const secciones = resto.slice(0, -1); // la última lámina es la tarea, no va en la infografía
  const titulo = portada.plan[0].replace(/^\d+\.\s*/, '');
  const bajada = limpiarInfo(portada.contenido).replace(/"/g, '').split(/(?<=\.)\s/)[0].replace(/\.$/, '');
  const etiqueta = `MÓDULO 2 · ${f.modulo} · APRENDIZAJE ESPERADO ${n}`;
  const pie = `Plan formativo SENCE ${pf} · Módulo ${mod.codigo} · Recurso base del módulo 2 · Ejemplos con ${c.caso}, empresa ficticia`;
  const tarjetas = secciones.map((l) => ({ titulo: l.titulo, plan: l.plan.join(' · '), texto: breveInfo(l.contenido) }));
  // Alto: cabecera + recuadro del AE + tarjetas + pie, con los tamaños de TAM.
  const anchoTarjeta = ANCHO_UTIL - 2 * 28 - 110;
  const altoTarjeta = (t) => 2 * 28 + 24 + Math.max(110, alto(t.titulo, TAM.encabezado, anchoTarjeta, false, 1.25) +
    alto(t.plan, TAM.rotulo, anchoTarjeta, true) + alto(t.texto, TAM.texto, anchoTarjeta, false, 1.4));
  const altoPx = redondear(2 * 96 + alto(etiqueta, TAM.etiqueta, ANCHO_UTIL, true) + alto(titulo, TAM.titulo, ANCHO_UTIL, true, 1.15) +
    alto(bajada, TAM.bajada, ANCHO_UTIL) + 2 * 32 + 30 + alto(ae.texto, TAM.recuadro, ANCHO_UTIL - 80, true, 1.4) +
    tarjetas.reduce((s, t) => s + altoTarjeta(t), 0) + (4 + tarjetas.length) * 32 + alto(pie, TAM.pie, ANCHO_UTIL));
  const texto = [
    'ENCARGO',
    `Diseña una infografía educativa vertical para el curso e-learning "${c.curso}" (${pf}), del programa Talento Digital para Chile (SENCE).`,
    `Propósito: sintetizar, para consulta rápida del participante, los contenidos del aprendizaje esperado ${n} del módulo 2. Es un medio de apoyo al aprendizaje (bases 2026, Anexo N°7, numeral 7 d, pág. 110) y aporta al ambiente con íconos, multimedia e imágenes que piden las bases (numeral 7 c, pág. 110).`,
    '',
    ...especificaciones(DIAGRAMA_AE, altoPx),
    '',
    'CONTENIDO (texto exacto, en este orden)',
    `Etiqueta superior: ${conComillas(etiqueta)}`,
    `Título (textual del plan formativo): ${conComillas(titulo)}`,
    `Bajada: ${conComillas(bajada)}`,
    `Recuadro. Rótulo: ${conComillas(`APRENDIZAJE ESPERADO ${n} · TEXTUAL DEL PLAN FORMATIVO`)}. Texto (textual del plan formativo): ${conComillas(ae.texto)}`,
    `Secciones (${tarjetas.length}):`,
    ...tarjetas.map((t, i) => `${i + 1}. Encabezado: ${conComillas(t.titulo)} | Contenido del plan (textual del plan formativo): ${conComillas(t.plan)} | Texto: ${conComillas(t.texto)}`),
    `Pie: ${conComillas(pie)}`,
    '',
    'CONTROL ANTES DE ENTREGAR',
    `- Están las ${tarjetas.length} secciones, en el orden indicado, y ningún texto quedó cortado.`,
    '- El aprendizaje esperado y los rótulos "Contenido del plan" son idénticos a los del bloque CONTENIDO.',
    `- El lienzo mide 1080 × ${altoPx} px y los tamaños de letra son los indicados. Ninguno se redujo para que el texto cupiera.`,
    '- Todo el texto se lee con la imagen al ancho de un computador (unos 800 px). En celular se lee ampliando o con el PDF.',
    '- Se cumple el contraste mínimo y no hay logos, nombres ni colores de instituciones.',
  ].join('\n');
  const alt = `Infografía del aprendizaje esperado ${n} del módulo 2 (${pf}): ${titulo}. ` +
    `Secciones: ${tarjetas.map((t, i) => `${i + 1}. ${t.titulo}`).join('; ')}.`;
  return { texto, alt, nombre: `M2-AE${n}-Infografia.png`, altoPx };
}

// La ruta sale de R02, con la competencia textual de la ficha. Lo que es por institución
// (PENDIENTE: días, horarios) no va en el recurso base.
function promptRuta(pf, c, f, md, mod) {
  const L = seccion(md, /^## R02\b/);
  const bloques = {}; let actual = null;
  for (const l of L) {
    const b = /^\*\*(?:Bloque )?"?([^"*]+?)"?\*\*/.exec(l);
    if (b) { actual = b[1].trim(); bloques[actual] = []; continue; }
    if (actual && l.trim()) bloques[actual].push(l.trim());
  }
  const citas = (k) => (bloques[k] || []).filter((l) => l.startsWith('>')).map((l) => limpiarInfo(l.replace(/^>\s*/, '')));
  const vinetas = (k) => (bloques[k] || []).filter((l) => l.startsWith('- '))
    .map((l) => limpiarInfo(l.slice(2).replace(/\s*`?PENDIENTE:`?.*$/, '')).replace(/\.?$/, '.'));
  const estaciones = (bloques['Tu ruta'] || []).filter((l) => /^\| \d \|/.test(l)).map(celdas);
  const [encabezado, mision] = citas('Encabezado');
  if (estaciones.length !== 4 || !mision) throw new Error(`${pf}: no pude leer la ruta del módulo en R02`);
  const etiqueta = `RUTA DEL MÓDULO 2 · ${mod.horas} H`;
  const bajada = mision.replace(/\.$/, '');
  const competencia = f.competencia.replace(/\.?$/, '.');
  const est = estaciones.map(([num, icono, tit, haces, llevas, horas]) => ({
    num, icono: limpiarInfo(icono).toLowerCase(), titulo: `${limpiarInfo(tit)} · Aprendizaje esperado ${num} · ${horas}`,
    haces: limpiarInfo(haces), llevas: limpiarInfo(llevas), corto: `${num}. ${limpiarInfo(tit)} (${horas})`,
  }));
  const acomp = vinetas('Cómo te acompañamos');
  const evalua = vinetas('Cómo te evaluamos');
  const pie = [...citas('Pie'), `Plan formativo SENCE ${pf} · Módulo ${mod.codigo} · Recurso base del módulo 2`].join(' · ');
  const anchoEst = ANCHO_UTIL - 140; // la columna izquierda lleva la línea de tiempo
  const altoEst = (e) => 2 * 20 + 12 + alto(e.titulo, TAM.encabezado, anchoEst, false, 1.25) +
    alto(`Qué haces: ${e.haces}`, TAM.texto, anchoEst, false, 1.4) + alto(`Qué te llevas: ${e.llevas}`, TAM.texto, anchoEst, false, 1.4);
  const anchoCol = (ANCHO_UTIL - 40) / 2 - 30;
  const altoBloque = (arr) => 56 + arr.reduce((s, v) => s + alto(v, TAM.texto, anchoCol, false, 1.35) + 10, 0);
  const altoPx = redondear(2 * 96 + alto(etiqueta, TAM.etiqueta, ANCHO_UTIL, true) + alto(f.modulo, TAM.titulo, ANCHO_UTIL, true, 1.15) +
    alto(bajada, TAM.bajada, ANCHO_UTIL) + 2 * 32 + 30 + alto(competencia, TAM.recuadro, ANCHO_UTIL - 80, true, 1.4) +
    est.reduce((s, e) => s + altoEst(e), 0) + Math.max(altoBloque(acomp), altoBloque(evalua)) + 9 * 32 + alto(pie, TAM.pie, ANCHO_UTIL));
  const texto = [
    'ENCARGO',
    `Diseña una infografía educativa vertical para el curso e-learning "${c.curso}" (${pf}), del programa Talento Digital para Chile (SENCE).`,
    'Propósito: orientar al participante al comenzar el módulo 2 con la ruta completa (qué logrará, en qué orden, con qué apoyo y cómo se le evalúa). Aporta al diseño intuitivo, lineal y amigable, con íconos e imágenes, que piden las bases (bases 2026, Anexo N°7, numeral 7 c, pág. 110).',
    '',
    ...especificaciones(DIAGRAMA_RUTA, altoPx),
    '',
    'CONTENIDO (texto exacto, en este orden)',
    `Etiqueta superior: ${conComillas(etiqueta)}`,
    `Título (textual del plan formativo): ${conComillas(f.modulo)}`,
    `Bajada: ${conComillas(bajada)}`,
    `Recuadro. Rótulo: ${conComillas('AL TERMINAR SERÁS CAPAZ DE · COMPETENCIA DEL MÓDULO, TEXTUAL DEL PLAN FORMATIVO')}. Texto (textual del plan formativo): ${conComillas(competencia)}`,
    'Ruta (4 estaciones):',
    ...est.map((e) => `${e.num}. Título: ${conComillas(e.titulo)} | Qué haces: ${conComillas(e.haces)} | Qué te llevas: ${conComillas(e.llevas)} | Ícono: ${e.icono}`),
    `Bloque «Cómo te acompañamos»: ${acomp.map(conComillas).join(' / ')}`,
    `Bloque «Cómo te evaluamos»: ${evalua.map(conComillas).join(' / ')}`,
    `Pie: ${conComillas(pie)}`,
    '',
    'CONTROL ANTES DE ENTREGAR',
    '- Están las 4 estaciones en orden, unidas por la línea de tiempo, con sus horas.',
    '- La competencia es idéntica a la del bloque CONTENIDO.',
    `- El lienzo mide 1080 × ${altoPx} px y los tamaños de letra son los indicados. Ninguno se redujo para que el texto cupiera.`,
    '- Todo el texto se lee con la imagen al ancho de un computador (unos 800 px). En celular se lee ampliando o con el PDF.',
    '- Se cumple el contraste mínimo y no hay logos, nombres, colores ni horarios de instituciones.',
  ].join('\n');
  const alt = `Infografía de la ruta del módulo 2 (${pf}): ${f.modulo}, ${mod.horas} horas. ` +
    `Estaciones: ${est.map((e) => e.corto).join('; ')}.`;
  return { texto, alt, nombre: 'M2-Ruta-Infografia.png', altoPx };
}

function infografias(pf, c, caps, f, md, fichaMd) {
  const mod = datosModulo(fichaMd);
  const ruta = promptRuta(pf, c, f, md, mod);
  const porAE = caps.map((cap) => ({ cap, ...promptAE(pf, c, cap, f, mod) }));
  const md2 = [
    `# ${pf} · Infografías del módulo 2 — prompts`,
    '',
    '> Cada bloque de texto es un prompt completo: se copia entero en la herramienta de diseño (Genially,',
    '> Canva, Gamma o Napkin) o en un generador de imágenes. Trae el propósito según las bases, las',
    '> medidas, la tipografía, el color, los íconos, la diagramación, las reglas de texto, el contenido',
    '> exacto y un control final. Las medidas y los estilos son el estándar de este proyecto: las bases',
    '> no fijan formato para las infografías. Los textos del plan van textuales, para el revisor.',
    '',
    '## Infografía de la ruta del módulo (motivación · Anexo N°7, num. 7 c)',
    '',
    `Archivo final: \`${ruta.nombre}\``,
    '',
    '```text', ruta.texto, '```',
    ...porAE.flatMap((p) => ['',
      `## Infografía ${p.cap.ae} · ${p.cap.titulo} (medio de apoyo · Anexo N°7, num. 7 d)`,
      '',
      `Archivo final: \`${p.nombre}\``,
      '',
      '```text', p.texto, '```']),
    '',
  ].join('\n');
  const alt = [
    `TEXTOS ALTERNATIVOS · ${pf} · infografías del módulo 2`,
    'Pégalos en el campo "texto alternativo" de cada imagen al subirla al LMS (accesibilidad para lectores de pantalla).',
    '',
    `${ruta.nombre}: ${ruta.alt}`,
    ...porAE.map((p) => `${p.nombre}: ${p.alt}`),
    '',
  ].join('\r\n');
  const espec = [
    'ESPECIFICACIONES VISUALES COMUNES · infografías del módulo 2',
    'Úsalas si tu herramienta no acepta el prompt completo: pega solo el bloque CONTENIDO y aplica esto a mano.',
    '',
    ...especificaciones([...DIAGRAMA_AE, '', 'Para la ruta del módulo:', ...DIAGRAMA_RUTA]),
    '',
  ].join('\r\n');
  return { md: md2, alt, espec };
}

// Prueba objetiva (B2, instrumento 3) → un cuestionario GIFT por aprendizaje esperado.
const gift = (s) => s.replace(/([~=#{}:\\])/g, '\\$1');
// Moodle interpreta el texto GIFT como HTML: "<clave>" desaparecería si no se escapa.
const limpio = (s) => s.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/`/g, '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();

function preguntas(md) {
  const L = seccion(md, /^## Instrumento 3\b/);
  const items = [];
  let ae = null; let item = null;
  for (const l of L) {
    const mAE = /^\*\*(AE\d)\*\*\s*$/.exec(l.trim());
    if (mAE) { ae = mAE[1]; item = null; continue; }
    const mIt = /^(\d+)\. (.+)$/.exec(l);
    if (mIt && ae) { item = { ae, n: +mIt[1], enunciado: mIt[2], opciones: null, respuesta: '' }; items.push(item); continue; }
    if (!item) continue;
    const t = l.trim();
    if (/^\*Respuesta:/.test(t)) item.respuesta = t.replace(/^\*Respuesta:\s*/, '').replace(/\*$/, '');
    else if (!item.opciones && / · /.test(t) && /^\**[a-d]\)/.test(t)) {
      item.opciones = t.split(' · ').map((o) => ({ correcta: /^\*\*.+\*\*$/.test(o.trim()), texto: limpio(o).replace(/^[a-d]\)\s*/, '') }));
    }
  }
  return items;
}

function quizGift(pf, ae, items) {
  const out = [`// ${pf} · Módulo 2 · Quiz ${ae}. Generado desde B2-instrumentos.md (instrumento 3).`,
    '// Moodle: Banco de preguntas → Importar → formato GIFT.', `$CATEGORY: ${pf}-M2/${ae}`, ''];
  for (const it of items) {
    const breve = /Respuesta breve/i.test(it.enunciado);
    const enunciado = gift(limpio(it.enunciado.replace(/^\*\(Respuesta breve[^)]*\)\*\s*/, '')));
    const retro = gift(limpio(it.respuesta).replace(/^[a-d]\.\s*/, ''));
    if (breve || !it.opciones) {
      out.push(`::${ae}-P${it.n}:: ${enunciado} {`, `####Respuesta esperada: ${retro}`, '}', '');
    } else {
      out.push(`::${ae}-P${it.n}:: ${enunciado} {`,
        ...it.opciones.map((o) => `${o.correcta ? '=' : '~'}${gift(o.texto)}`),
        ...(retro ? [`####${retro}`] : []), '}', '');
    }
  }
  return out.join('\n');
}

// ------------------------------------------------------- carril automático

// Subsección "### …" de un bloque de líneas, hasta el siguiente "##" o "###".
function subseccion(lineas, desde) {
  const i = lineas.findIndex((l) => desde.test(l));
  if (i < 0) return null;
  const j = lineas.findIndex((l, k) => k > i && /^#{2,3} /.test(l));
  return lineas.slice(i, j < 0 ? lineas.length : j);
}

const cuerpo = (lineas) => lineas.slice(1).join('\n').trim();
const titulo = (lineas) => lineas[0].replace(/^#+\s*/, '').trim();

// En los documentos para subir, las menciones a archivos del repo pasan a ser el PDF que
// corresponde o una descripción: quien los lea no tiene el repo.
const PDF_B4 = { a: 'M2-Retroalimentacion.pdf', b: 'M2-Autoevaluacion.pdf', c: 'M2-Coevaluacion.pdf', d: 'M2-Bitacora.pdf' };
const REFS = {
  'B2-instrumentos.md': 'los instrumentos de evaluación del módulo',
  'B4-retroalimentacion.md': 'los documentos de retroalimentación del módulo',
  'C2-actividades.md': 'las actividades prácticas del módulo',
  '01-entregables.md': 'la lista de entregables',
  '00-ficha-sipfor.md': 'la ficha del plan formativo',
};
const sinRefs = (md) => md
  .replace(/`B4-retroalimentacion\.md`,?\s*producto ([a-d])/g, (_, l) => `\`${PDF_B4[l]}\``)
  .replace(/`B2-instrumentos\.md`,?\s*instrumento (\d)/g, (_, n) => `\`M2-Instrumento-${n}.pdf\``)
  .replace(/`([\w.-]+\.md)`/g, (m, f) => REFS[f] ?? m);

// Un documento A4 con encabezado del curso; lo imprime a PDF el mismo Edge que usa el kit.
function documentoHtml(pf, c, f, tit, mdOriginal) {
  const md = sinRefs(mdOriginal);
  const pie = `${pf} · Módulo 2 · ${tit}`;
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>${esc(tit)}</title>${estilos(pie)}</head><body>
<section class="parte" style="break-before:auto"><p class="kicker">${pf} · ${esc(c.curso)} · Módulo 2: ${esc(f.modulo)}</p>
<h2>${esc(tit)}</h2>
${markdown(md)}
</section></body></html>`;
}

// Los 9 documentos evaluativos, según la práctica del equipo (revisión del V0 de PF1474).
function documentosEvaluacion(dir) {
  const b2 = leer(`${dir}/B2-instrumentos.md`);
  const b3 = leer(`${dir}/B3-portafolio.md`);
  const b4 = leer(`${dir}/B4-retroalimentacion.md`);
  const docs = [1, 2, 3].map((n) => {
    const L = seccion(b2, new RegExp(`^## Instrumento ${n}\\b`));
    return { archivo: `M2-Instrumento-${n}.pdf`, titulo: titulo(L), md: cuerpo(L) };
  });
  const L3 = b3.split('\n');
  const i1 = L3.findIndex((l) => /^## Elemento 1\b/.test(l));
  const i6 = L3.findIndex((l) => /^## Elemento 6\b/.test(l));
  if (i1 < 0 || i6 < 0) throw new Error(`${dir}/B3-portafolio.md: no encuentro los elementos 1 y 6`);
  docs.push({ archivo: 'M2-Portafolio-Guia.pdf', titulo: 'Guía del portafolio de proyectos', md: L3.slice(i1, i6).join('\n') });
  const L6 = seccion(b3, /^## Elemento 6\b/);
  docs.push({ archivo: 'M2-Portafolio-Instrumento.pdf', titulo: 'Instrumento de evaluación del portafolio', md: cuerpo(L6) });
  for (const [letra, archivo] of [['a', 'M2-Retroalimentacion.pdf'], ['b', 'M2-Autoevaluacion.pdf'], ['c', 'M2-Coevaluacion.pdf'], ['d', 'M2-Bitacora.pdf']]) {
    const L = seccion(b4, new RegExp(`^## ${letra}\\) `));
    docs.push({ archivo, titulo: titulo(L).replace(/^[a-d]\)\s*/, ''), md: cuerpo(L) });
  }
  return docs;
}

// Bloques de código de una sección → archivos. El nombre sale del texto que los presenta.
function archivosDeCodigo(lineas, lenguajes) {
  const out = [];
  let previo = [];
  for (let i = 0; i < lineas.length; i++) {
    const m = /^```(\w+)/.exec(lineas[i]);
    if (m) {
      const j = lineas.findIndex((l, k) => k > i && l.startsWith('```'));
      if (lenguajes.includes(m[1])) {
        const contexto = previo.slice(-3).join(' ');
        const conExt = [...contexto.matchAll(/`([\w.-]+\.(?:sql|csv|json|py))`/g)].map((x) => x[1]).pop();
        const base = /`(\w+)`/.exec(contexto)?.[1];
        let nombre = conExt ?? (base ? `${base}.${m[1]}` : `fragmento-${out.length + 1}.${m[1]}`);
        if (out.some((o) => o.nombre === nombre)) nombre = nombre.replace(/(\.\w+)$/, `-${out.length + 1}$1`);
        out.push({ nombre, contenido: lineas.slice(i + 1, j).join('\n') + '\n' });
      }
      i = j; previo = [];
      continue;
    }
    if (lineas[i].trim()) previo.push(lineas[i]);
  }
  return out;
}

// Tabla Markdown → CSV (celdas entre comillas; los tickets traen comas y HTML).
function tablaCsv(lineas) {
  const filas = lineas.filter((l) => l.startsWith('|')).map(celdas).filter((f) => !f.every((x) => /^:?-+:?$/.test(x)));
  if (filas.length < 2) return null;
  const limpia = (x) => x.replace(/`\s*\+\s*firma\s*`/g, '\n').replace(/`/g, '').trim();
  const cab = filas[0].map((h) => h.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\(.*?\)/g, '').trim().replace(/\s+/g, '_'));
  return [cab, ...filas.slice(1).map((f) => f.map(limpia))]
    .map((f) => f.map((x) => `"${x.replace(/"/g, '""')}"`).join(',')).join('\n') + '\n';
}

function actividades(dir) {
  const md = leer(`${dir}/C2-actividades.md`);
  const resumen = md.split('\n').slice(0, md.split('\n').findIndex((l) => /^## Actividad 1\b/.test(l))).filter((l) => l.startsWith('|'));
  const docs = [];
  const archivos = [];
  for (const n of [1, 2]) {
    const A = seccion(md, new RegExp(`^## Actividad ${n}\\b`));
    const tit = titulo(A);
    const enun = subseccion(A, /^### Enunciado/);
    const ins = subseccion(A, /^### Insumos/);
    const resp = subseccion(A, /^### Respuesta modelada/);
    if (!enun || !resp) throw new Error(`${dir}/C2-actividades.md: la actividad ${n} no tiene enunciado o respuesta modelada`);
    docs.push({ archivo: `M2-Actividad-${n}-Enunciado.pdf`, titulo: tit,
      md: [cuerpo(enun), ...(ins ? ['', '### Insumos', '', cuerpo(ins)] : [])].join('\n') });
    docs.push({ archivo: `M2-Actividad-${n}-Respuesta-modelada.pdf`, titulo: `${tit} · respuesta modelada (tutor)`,
      md: ['### Resumen de las actividades', '', ...resumen, '', cuerpo(resp)].join('\n') });
    if (ins) {
      for (const a of archivosDeCodigo(ins, ['sql', 'csv', 'json'])) archivos.push({ nombre: `insumos/${a.nombre}`, contenido: a.contenido });
      const csv = tablaCsv(ins);
      if (csv) archivos.push({ nombre: `insumos/actividad-${n}-tickets.csv`, contenido: csv });
    }
    for (const a of archivosDeCodigo(resp, ['python'])) archivos.push({ nombre: `respuesta-modelada/codigo/${a.nombre}`, contenido: a.contenido });
  }
  return { docs, archivos };
}

// Textos para rellenar el Anexo 2: HTML con tablas, que se copia a Word sin perder formato.
function insumosAnexo(pf, c, f, dir) {
  const partes = (lista) => lista.map((a) => markdown(leer(`${dir}/${a}`))).join('\n<hr>\n');
  const doc = (tit, lista) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(tit)}</title>${estilos(tit)}</head><body>
<section class="parte" style="break-before:auto"><p class="kicker">${pf} · ${esc(c.curso)} · Módulo 2: ${esc(f.modulo)}</p><h2>${esc(tit)}</h2>
<p><em>Insumo para el Anexo 2, no el Anexo. Copia a Word lo que corresponda y reemplaza los enlaces cuando existan.</em></p>
${partes(lista)}</section></body></html>`;
  return [
    { nombre: 'Anexo2-V-Estrategia-evaluativa.html', html: doc('Sección V · Estrategia evaluativa', ['B1-indicadores.md', 'B2-instrumentos.md', 'B3-portafolio.md', 'B4-retroalimentacion.md']) },
    { nombre: 'Anexo2-VI-Metodologia.html', html: doc('Sección VI · Metodología (incluye actividades y horas del módulo)', ['C-metodologia.md', 'C2-actividades.md', 'C4-herramientas-didacticas.md']) },
  ];
}

// ------------------------------------------------------------------ principal

for (const pf of codigos) {
  const c = CURSOS[pf];
  const dir = `contenidos/${pf}/modulo-2`;
  const out = `${c.carpeta}/produccion`;
  const ent = `${c.carpeta}/entrega`;
  const fichaMd = leer(`${dir}/00-ficha-sipfor.md`);
  const f = ficha(fichaMd);
  const mdCaps = leer(`${dir}/R-capsulas.md`);
  const mdBienv = leer(`${dir}/R-bienvenida-e-infografia.md`);
  const caps = capsulas(mdCaps);
  const hechos = [];
  const guardar = (destinoRel, contenido) => {
    const destino = ruta(destinoRel);
    fs.mkdirSync(ruta(destinoRel.split('/').slice(0, -1).join('/')), { recursive: true });
    if (Buffer.isBuffer(contenido)) fs.writeFileSync(destino, contenido); else escribir(destino, contenido);
    hechos.push(rel(destino));
  };
  // HTML intermedio en .scratch/ (ignorado por git); el PDF queda en entrega/.
  const pdf = (destinoRel, html) => {
    if (!conPdf) return;
    const tmp = `.scratch/produccion/${pf}/${destinoRel.split('/').pop().replace(/\.pdf$/, '.html')}`;
    escribir(tmp, html);
    fs.mkdirSync(ruta(destinoRel.split('/').slice(0, -1).join('/')), { recursive: true });
    imprimirPdf(tmp, destinoRel);
    hechos.push(destinoRel);
  };

  // Material de lectura de cada AE: se revisa contra el plan antes de imprimirlo.
  const mod = datosModulo(fichaMd);
  for (const cap of caps) {
    const fuente = `${dir}/lecturas/${cap.ae}.md`;
    if (!fs.existsSync(ruta(fuente))) { console.warn(`  AVISO: falta ${fuente}; no se genera su lectura`); continue; }
    const lectura = leerLectura(leer(fuente));
    const u = unidades(fichaMd, +cap.ae.slice(2));
    const errores = verificarLectura(lectura, u);
    if (errores.length) throw new Error(`${fuente}:\n  - ${errores.join('\n  - ')}`);
    const ae = f.aes[cap.ae];
    pdf(`${ent}/${cap.ae}/M2-${cap.ae}-Lectura.pdf`, lecturaHtml({
      pf, curso: c.curso, caso: c.caso, modulo: f.modulo, codigo: mod.codigo, horas: mod.horas,
      ae: cap.ae, titulo: cap.titulo, aprendizaje: ae.texto, criterios: ae.criterios, unidadesAE: u, lectura }));
    console.log(`  lectura ${cap.ae}: ${palabras(lectura)} palabras, ${lectura.secciones.filter((x) => x.tipo === 'tema').length} secciones, cobertura del plan ${u.length}/${u.length}`);
  }
  if (soloLecturas) { hechos.forEach((h) => console.log(`  ${h.slice(c.carpeta.length + 1)}`)); continue; }

  // Bases para otras herramientas
  const b = videoBienvenida(pf, c, mdBienv, f.modulo);
  guardar(`${out}/videos/00-bienvenida.pptx`, b.pptx);
  guardar(`${out}/videos/00-bienvenida-guion.md`, b.guion);
  for (const cap of caps) {
    const v = videoCapsula(pf, c, cap, f, fichaMd);
    guardar(`${out}/videos/${cap.ae}-capsula.pptx`, v.pptx);
    guardar(`${out}/videos/${cap.ae}-guion.md`, v.guion);
  }
  const vi = videoInteractivo(pf, c, leer(`${dir}/C4-herramientas-didacticas.md`));
  guardar(`${out}/videos/H2-video-interactivo.pptx`, vi.pptx);
  guardar(`${out}/videos/H2-video-interactivo-guion.md`, vi.guion);
  const info = infografias(pf, c, caps, f, mdBienv, fichaMd);
  guardar(`${out}/infografias/prompts.md`, info.md);
  guardar(`${out}/infografias/textos-alternativos.txt`, info.alt);
  guardar(`${out}/infografias/especificaciones-visuales.txt`, info.espec);

  // Carril automático: recursos finales
  const items = preguntas(leer(`${dir}/B2-instrumentos.md`));
  for (const ae of ['AE1', 'AE2', 'AE3', 'AE4']) {
    const suyas = items.filter((it) => it.ae === ae);
    if (!suyas.length) throw new Error(`${pf}: la prueba objetiva no tiene preguntas de ${ae}`);
    guardar(`${ent}/${ae}/M2-${ae}-Quiz.gift`, quizGift(pf, ae, suyas));
  }
  for (const d of documentosEvaluacion(dir)) pdf(`${ent}/evaluacion/${d.archivo}`, documentoHtml(pf, c, f, d.titulo, d.md));
  const act = actividades(dir);
  for (const d of act.docs) pdf(`${ent}/actividades/${d.archivo}`, documentoHtml(pf, c, f, d.titulo, d.md));
  for (const a of act.archivos) guardar(`${ent}/actividades/${a.nombre}`, a.contenido);
  const r04 = seccion(mdCaps, /^## R04\b/);
  pdf(`${ent}/medios/M2-Cuadro-comparativo.pdf`, documentoHtml(pf, c, f, titulo(r04).replace(/^R04 · /, ''), cuerpo(r04)));
  for (const a of insumosAnexo(pf, c, f, dir)) guardar(`${ent}/insumos-anexo/${a.nombre}`, a.html);

  console.log(`${pf} → ${c.carpeta}/  (${hechos.length} archivos, ${items.length} preguntas de quiz)`);
  hechos.forEach((h) => console.log(`  ${h.slice(c.carpeta.length + 1)}`));
}
