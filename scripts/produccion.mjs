#!/usr/bin/env node
/**
 * Arma las bases de producción del módulo 2 de un curso: los archivos que se cargan en otras
 * herramientas para obtener cada recurso final (el flujo está en modulo-2/FLUJO-PRODUCCION.md).
 *
 *   npm run produccion -- PF1821 PF1822
 *
 * Salida en modulo-2/<carpeta del curso>/produccion/:
 *   videos/      PPTX con narración en las notas (HeyGen: una escena por lámina) + guion.md
 *   infografias/ prompts.md, uno por aprendizaje esperado y uno para la ruta del módulo
 *   quiz/        un .gift por aprendizaje esperado (Moodle: Banco de preguntas → Importar → GIFT)
 *   lecturas/    prompts.md para redactar el material de lectura (flipbook) de cada AE
 *
 * La fuente es contenidos/<PF>/modulo-2/. Estos archivos se regeneran; no se editan a mano.
 */
import { leer, escribir, ruta, rel } from './lib/repo.mjs';
import { crearPptx } from './lib/pptx.mjs';
import fs from 'node:fs';

const CURSOS = {
  PF1821: { carpeta: 'modulo-2/PF1821-agentes-low-code', curso: 'Construcción de Agentes y Automatización con Herramientas Low Code', caso: 'Mercado Austral' },
  PF1822: { carpeta: 'modulo-2/PF1822-desarrollo-con-ia', curso: 'Especialización en Desarrollo con IA', caso: 'Nube Sur' },
};

const args = process.argv.slice(2);
const codigos = args.filter((a) => /^PF\d{4}$/i.test(a)).map((a) => a.toUpperCase());
if (!codigos.length || codigos.some((c) => !CURSOS[c])) {
  console.error(`Uso: npm run produccion -- ${Object.keys(CURSOS).join(' ')}`);
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

// ------------------------------------------------------------------ principal

for (const pf of codigos) {
  const c = CURSOS[pf];
  const dir = `contenidos/${pf}/modulo-2`;
  const out = `${c.carpeta}/produccion`;
  const f = ficha(leer(`${dir}/00-ficha-sipfor.md`));
  const mdCaps = leer(`${dir}/R-capsulas.md`);
  const mdBienv = leer(`${dir}/R-bienvenida-e-infografia.md`);
  const caps = capsulas(mdCaps);
  const hechos = [];
  const guardar = (nombre, contenido) => {
    const destino = ruta(out, nombre);
    fs.mkdirSync(ruta(out, nombre.split('/').slice(0, -1).join('/')), { recursive: true });
    if (Buffer.isBuffer(contenido)) fs.writeFileSync(destino, contenido); else escribir(destino, contenido);
    hechos.push(rel(destino));
  };

  const b = videoBienvenida(pf, c, mdBienv, f.modulo);
  guardar('videos/00-bienvenida.pptx', b.pptx);
  guardar('videos/00-bienvenida-guion.md', b.guion);
  for (const cap of caps) {
    const v = videoCapsula(pf, c, cap);
    guardar(`videos/${cap.ae}-capsula.pptx`, v.pptx);
    guardar(`videos/${cap.ae}-guion.md`, v.guion);
  }
  guardar('infografias/prompts.md', infografias(pf, c, caps, f, mdBienv));
  const items = preguntas(leer(`${dir}/B2-instrumentos.md`));
  for (const ae of ['AE1', 'AE2', 'AE3', 'AE4']) {
    const suyas = items.filter((it) => it.ae === ae);
    if (!suyas.length) throw new Error(`${pf}: la prueba objetiva no tiene preguntas de ${ae}`);
    guardar(`quiz/${ae}.gift`, quizGift(pf, ae, suyas));
  }
  guardar('lecturas/prompts.md', lecturas(pf, c, caps, f));

  console.log(`${pf} → ${out}/  (${hechos.length} archivos, ${items.length} preguntas de quiz)`);
  hechos.forEach((h) => console.log(`  ${h.slice(out.length + 1)}`));
}
