#!/usr/bin/env node
/**
 * Arma, para el módulo 2 de un curso, las bases de producción y el carril automático de
 * entregables (el flujo está en modulo-2/FLUJO-PRODUCCION.md).
 *
 *   npm run produccion -- PF1821 PF1822 [--sin-pdf]
 *
 * modulo-2/<carpeta del curso>/produccion/  lo que se carga en otras herramientas:
 *   videos/      PPTX con narración en las notas (HeyGen: una escena por lámina) + guion.md
 *   infografias/ prompts.md, uno por aprendizaje esperado y uno para la ruta del módulo
 *   lecturas/    prompts.md para redactar el material de lectura (flipbook) de cada AE
 *
 * modulo-2/<carpeta del curso>/entrega/  recursos finales, neutros y listos para subir:
 *   AE1..AE4/        M2-AEn-Quiz.gift (Moodle: Banco de preguntas → Importar → GIFT)
 *   evaluacion/      9 PDF: 3 instrumentos, guía e instrumento del portafolio, retroalimentación,
 *                    autoevaluación, coevaluación y bitácora
 *   actividades/     enunciado (participante) y respuesta modelada (tutor) de cada actividad,
 *                    insumos/ (SQL, CSV) y respuesta-modelada/codigo/ (.py para pytest)
 *   medios/          cuadro comparativo en PDF
 *   insumos-anexo/   textos de las secciones V y VI del Anexo 2 en HTML, para copiar a Word
 * Las demás piezas de entrega/ (videos, infografías, lecturas) las agrega quien las produce.
 *
 * La fuente es contenidos/<PF>/modulo-2/. Lo que genera este script no se edita a mano.
 */
import { leer, escribir, ruta, rel } from './lib/repo.mjs';
import { crearPptx } from './lib/pptx.mjs';
import { markdown, estilos, esc } from './lib/html.mjs';
import { imprimirPdf, navegador } from './lib/pdf.mjs';
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
      const c = celdas(l);
      actual.laminas.push({ titulo: c[1], contenido: c[2] });
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

// Contenido de lámina → viñetas: una por oración, cuatro como máximo.
function vinetas(contenido) {
  const oraciones = contenido.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡"*`])/).map((s) => s.trim()).filter(Boolean);
  if (oraciones.length <= 4) return oraciones;
  return [...oraciones.slice(0, 3), oraciones.slice(3).join(' ')];
}

// Texto breve para una sección de infografía: oraciones completas hasta unos 170 caracteres.
function breve(t) {
  const oraciones = hablar(t).split(/(?<=[.!?])\s/);
  let out = oraciones[0];
  for (const o of oraciones.slice(1)) {
    if ((out + ' ' + o).length > 170) break;
    out += ' ' + o;
  }
  return out;
}

// ------------------------------------------------------------------ piezas

function videoCapsula(pf, c, cap) {
  const pie = `${pf} · Módulo 2 · Cápsula ${cap.n} · ${cap.ae}`;
  const laminas = cap.laminas.map((l, i) => {
    if (i === 0) {
      return {
        portada: true,
        titulo: `Cápsula ${cap.n}: ${cap.titulo}`,
        vinetas: [l.contenido],
        notas: `Te doy la bienvenida a la cápsula ${cap.n} del módulo 2: ${hablar(cap.titulo)}. ${hablar(l.contenido)}`,
      };
    }
    return { titulo: l.titulo, vinetas: vinetas(l.contenido), notas: `${hablar(l.titulo)}. ${hablar(l.contenido)}` };
  });
  const guion = [
    `# ${pf} · Cápsula ${cap.n} (${cap.ae}) · ${cap.titulo} — guion`,
    '',
    `Base para HeyGen: \`${cap.ae}-capsula.pptx\` (una escena por lámina; la narración está en las notas).`,
    'Esta tabla es la misma narración, para otras herramientas o para pulirla antes de grabar.',
    '',
    '| Lámina | En pantalla | Narración |',
    '| --- | --- | --- |',
    ...laminas.map((l, i) => `| ${i + 1} | ${l.titulo.replace(/\|/g, '/')} | ${l.notas.replace(/\|/g, '/')} |`),
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

const ESTILO = 'Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, ' +
  'azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: ' +
  'el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.';

function infografias(pf, c, caps, f, md) {
  const ruta = seccion(md, /^## R02\b/).slice(1).join('\n').trim();
  const partes = [
    `# ${pf} · Infografías del módulo 2 — prompts`,
    '',
    '> Herramientas sugeridas: Genially o Canva (el equipo ya usa Genially), Napkin o Gamma. Si usas un',
    '> generador de imágenes (ChatGPT, Gemini, Ideogram), pídele solo el diseño con espacios para',
    '> el texto y escribe el texto encima: estos generadores suelen deformar las letras.',
    '> Formato: vertical 1080 × 1920 px, exportada en PNG y, si la herramienta lo permite, interactiva.',
    '',
    '## Infografía de la ruta del módulo (C3 · motivación)',
    '',
    '```text',
    `Diseña una infografía vertical titulada "Ruta del módulo 2: ${f.modulo}". ${ESTILO}`,
    'Contenido (textual, en este orden):',
    ruta,
    '```',
  ];
  for (const cap of caps) {
    const ae = f.aes[cap.ae];
    const secciones = cap.laminas.slice(1, -1).map((l, i) => `${i + 1}. ${l.titulo}: ${breve(l.contenido)}`);
    partes.push(
      '',
      `## Infografía ${cap.ae} · ${cap.titulo} (herramienta didáctica · C4)`,
      '',
      '```text',
      `Diseña una infografía vertical titulada "${cap.titulo}". Subtítulo: "Aprendizaje esperado ${cap.ae.slice(2)} del módulo 2". ${ESTILO}`,
      `Caso que ilustra los ejemplos: ${c.caso}, una empresa ficticia.`,
      'Secciones (un ícono por sección, texto breve):',
      ...secciones,
      '```',
      '',
      `Aprendizaje esperado (textual del plan, para la ficha del recurso en el LMS): ${ae.texto}`,
    );
  }
  return partes.join('\n') + '\n';
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

function lecturas(pf, c, caps, f) {
  const partes = [
    `# ${pf} · Material de lectura (flipbook) por aprendizaje esperado — prompts`,
    '',
    '> Pega cada bloque en la IA de texto que uses. Revisa el resultado contra la ficha antes de',
    '> maquetarlo (Heyzine, FlipHTML5 o PDF del LMS). Largo sugerido: 6 a 8 páginas por AE.',
  ];
  for (const cap of caps) {
    const ae = f.aes[cap.ae];
    partes.push(
      '',
      `## Lectura ${cap.ae} · ${cap.titulo}`,
      '',
      '```text',
      `Escribe el material de lectura del aprendizaje esperado ${cap.ae.slice(2)} del módulo "${f.modulo}" del curso "${c.curso}" (e-learning, nivel 4).`,
      `Aprendizaje esperado (textual): ${ae.texto}`,
      'Criterios de evaluación (textuales):',
      ...ae.criterios,
      'Contenidos que debes cubrir, todos y en este orden (textuales del plan):',
      ...ae.contenidos,
      `Sigue la misma secuencia de la videocápsula: ${cap.laminas.slice(1, -1).map((l) => l.titulo).join(' / ')}.`,
      `Usa como ejemplo continuo el caso de ${c.caso}, una empresa ficticia; no nombres instituciones reales.`,
      'Formato: títulos cortos, párrafos de 3 a 5 líneas, un ejemplo por sección, un recuadro "Error frecuente" y al final:',
      '3 preguntas de autocomprobación con su respuesta y un glosario de 8 términos del AE.',
      'Español de Chile, tono de colega; no inventes datos, cifras ni funciones que no existan en las herramientas.',
      '```',
    );
  }
  return partes.join('\n') + '\n';
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
  const f = ficha(leer(`${dir}/00-ficha-sipfor.md`));
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

  // Bases para otras herramientas
  const b = videoBienvenida(pf, c, mdBienv, f.modulo);
  guardar(`${out}/videos/00-bienvenida.pptx`, b.pptx);
  guardar(`${out}/videos/00-bienvenida-guion.md`, b.guion);
  for (const cap of caps) {
    const v = videoCapsula(pf, c, cap);
    guardar(`${out}/videos/${cap.ae}-capsula.pptx`, v.pptx);
    guardar(`${out}/videos/${cap.ae}-guion.md`, v.guion);
  }
  const vi = videoInteractivo(pf, c, leer(`${dir}/C4-herramientas-didacticas.md`));
  guardar(`${out}/videos/H2-video-interactivo.pptx`, vi.pptx);
  guardar(`${out}/videos/H2-video-interactivo-guion.md`, vi.guion);
  guardar(`${out}/infografias/prompts.md`, infografias(pf, c, caps, f, mdBienv));
  guardar(`${out}/lecturas/prompts.md`, lecturas(pf, c, caps, f));

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
