/**
 * Texto canónico del módulo 2 de PF1821 y PF1822, para cotejar lo que produjo Rise 360 (un curso de Rise por aprendizaje
 * esperado). Pedido del usuario (2026-09-30): "la info canónica sin interpretarla, sino como aparece en las bases y en el
 * plan formativo… para copiar y pegar".
 *
 * Sale de los campos crudos de SIPFOR (data/sipfor/<plan>/), no de data/planes/: ahí los contenidos ya vienen partidos por
 * viñeta y se pierden detalles que el evaluador sí ve (dos viñetas en una misma línea, los dos puntos del título, una línea
 * sin asterisco). La única normalización es la que hace el PDF oficial al mostrar el texto: <br /> pasa a salto de línea,
 * se quitan los espacios al borde de cada línea y los espacios dobles quedan en uno. Después, cada texto se busca en el
 * texto del PDF oficial de SIPFOR (data/sipfor/<plan>/plan-oficial.txt, sacado con `pdftotext -enc UTF-8 -raw` del PDF
 * que está en privado/sipfor/; -raw conserva el guion de "ZERO-" al final de una línea). Si alguno no aparece, el script
 * se detiene.
 *
 *   npm run canonico
 */
import fs from 'node:fs';
import { crearXlsx } from './lib/xlsx.mjs';
import { ruta, escribir } from './lib/repo.mjs';
import { esc } from './lib/html.mjs';

const DIR = 'entregables/2026-09-30-texto-canonico-modulo2';
const NOMBRE = 'Texto-canonico-M2-PF1821-PF1822';
const PLANES = [
  { codigo: 'PF1821', modulo: 'MA04560', pdf: 'https://sipfor.sence.cl/Planes/PDFPlan.aspx?id=3934', paginas: '8 y 9' },
  { codigo: 'PF1822', modulo: 'MA04576', pdf: 'https://sipfor.sence.cl/Planes/PDFPlan.aspx?id=3935', paginas: '8 a 10' },
];
// Las bases no traen los nombres de los cursos: el nombre del curso es el del plan formativo en SIPFOR.
const BASES = [
  ['Implementar lo del plan', 'El oferente tiene la responsabilidad de "dar cumplimiento e implementar los aprendizajes esperados, criterios de evaluación, contenidos" del plan formativo', 'bases 2026, 4, pág. 18'],
  ['Infracción menos grave (16 a 30 UTM)', '"No impartir o impartir parcialmente los aprendizajes, contenidos y objetivos de los módulos"', 'bases 2026, 13.3.2 f), pág. 51'],
  ['Infracción menos grave (16 a 30 UTM)', '"Modificar la configuración, competencias, contenidos, aprendizajes esperados y/o criterios de evaluación de los módulos del plan formativo… sin autorización del SENCE o del OTIC"', 'bases 2026, 13.3.2 h), pág. 51'],
  ['Qué no dicen', 'No encontré una regla sobre mayúsculas ni sobre transcribir con las mismas palabras. La decisión del repo es copiar tal cual, en mayúsculas (modulo-2/GUIA-RISE.md)', '—'],
];

// ── Texto crudo de SIPFOR → líneas como las muestra el PDF ───────────────────────────────────────────────────────────
const lineas = (s) => String(s ?? '').replace(/<p[^>]*>|<\/p>/g, '').split(/<br\s*\/?>/).map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
const texto = (s) => lineas(s).join('\n');
const dobleEspacio = (s) => /\S {2,}\S/.test(String(s ?? '').replace(/<br\s*\/?>/g, '\n'));
const horas = (h) => `${h},00`;

// Observaciones que se detectan solas: lo que Rise (o una persona) tendería a "corregir" y en el plan está así.
function observaciones(l, { tipo, repite }) {
  const o = [];
  if (/–/.test(l)) o.push('Lleva guion largo (–), no guion corto (-).');
  if (tipo === 'contenido' && /\S \*/.test(l)) o.push('En el plan esta línea trae más de una viñeta (*) seguidas.');
  if (tipo === 'contenido' && !l.startsWith('*')) o.push('En el plan esta línea no lleva asterisco: funciona como subtítulo.');
  if (['ae', 'criterio', 'contenido', 'competencia'].includes(tipo) && !/[.:]$/.test(l)) o.push('En el plan no termina en punto.');
  if (/[,;][A-ZÁÉÍÓÚÑ]|\)[A-ZÁÉÍÓÚÑ]/.test(l)) o.push('Falta un espacio después de la coma o el paréntesis; así está en el plan.');
  if (repite) o.push('Repite textual el aprendizaje esperado; así está en el plan.');
  return o.join(' ');
}

// ── Modelo: una ficha por aprendizaje esperado ───────────────────────────────────────────────────────────────────────
const fichas = [];
const cursos = PLANES.map((p) => {
  const plan = JSON.parse(fs.readFileSync(ruta(`data/sipfor/${p.codigo}/plan.json`), 'utf8'));
  const mod = JSON.parse(fs.readFileSync(ruta(`data/sipfor/${p.codigo}/modulo-${p.modulo}.json`), 'utf8'));
  const limpio = JSON.parse(fs.readFileSync(ruta(`data/planes/${p.codigo}.json`), 'utf8'));
  const n = limpio.modulos.find((m) => m.codigo === p.modulo).n;
  const curso = {
    ...p, n, plan, mod, limpio,
    nombre: texto(plan.PK_RUP_PLA_NOMBRE),
    competenciaPlan: texto(plan.FL_RUP_PLA_COMPPLAN),
    nombreModulo: texto(mod.FL_RUP_MOD_NOMBRE),
    competenciaModulo: texto(mod.FL_RUP_MOD_COMPMOD),
    horasModulo: mod.FL_RUP_MOD_HORAS,
  };
  const cabecera = [
    { seccion: 'Curso (plan formativo)' },
    { campo: 'Código del plan formativo', plan: p.codigo },
    { campo: 'Nombre del plan formativo (es el nombre del curso)', plan: curso.nombre },
    { campo: 'Competencia del plan formativo', plan: curso.competenciaPlan, tipo: 'competencia' },
    { seccion: `Módulo ${n}` },
    { campo: 'Número del módulo', plan: `MÓDULO FORMATIVO N° ${n}`, variante: `Módulo N°${n}`, etiqueta: 'Como en la tabla', nota: 'Así lo rotula el PDF: "MÓDULO FORMATIVO N° 2" en la ficha del módulo y "Módulo N°2" en la tabla de módulos.' },
    { campo: 'Código del módulo', plan: p.modulo },
    { campo: 'Nombre del módulo', plan: curso.nombreModulo },
    { campo: 'Horas del módulo', plan: horas(curso.horasModulo), variante: String(curso.horasModulo), etiqueta: 'Sin decimales' },
    { campo: 'Competencia del módulo', plan: curso.competenciaModulo, tipo: 'competencia' },
  ];
  for (const a of mod.TB_RUP_APRENDESPE) {
    const ae = texto(a.FL_RUP_APE_APRENDESP);
    const num = ae.match(/^(\d+)\./)[1];
    const aeSin = ae.replace(/^\d+\.\s*/, '');
    const criterios = lineas(a.FL_RUP_APE_CRITEVAL);
    const contenidos = lineas(a.FL_RUP_APE_CONTENIDOS);
    const [titulo, ...items] = contenidos;
    const filas = [
      ...cabecera.map((r) => ({ ...r })),
      { seccion: `Aprendizaje esperado ${num}` },
      { campo: `Aprendizaje esperado ${num}`, plan: ae, variante: aeSin, tipo: 'ae', nota: 'En el plan el aprendizaje esperado no tiene nombre ni título: es un número y este enunciado.' },
      { seccion: `Criterios de evaluación del aprendizaje esperado ${num}` },
      ...criterios.map((c) => {
        const sin = c.replace(/^\d+\.\d+\s*/, '');
        return { campo: `Criterio ${c.match(/^(\d+\.\d+)/)[1]}`, plan: c, variante: sin, tipo: 'criterio', repite: sin === aeSin };
      }),
      { seccion: `Contenidos del aprendizaje esperado ${num}` },
      { campo: 'Título de los contenidos', plan: titulo, variante: titulo.replace(/^\d+\.\s*/, '').replace(/:$/, ''), tipo: 'titulo',
        nota: [dobleEspacio(a.FL_RUP_APE_CONTENIDOS.split(/<br/)[0]) ? 'En SIPFOR hay dos espacios después del número; el PDF muestra uno.' : '',
          'Es lo más parecido a un nombre del aprendizaje: el rótulo de su unidad de contenidos.'].filter(Boolean).join(' ') },
      ...items.map((l, i) => ({ campo: `Contenido ${i + 1}`, plan: l, variante: l.replace(/^\*\s*/, ''), etiqueta: 'Sin viñeta', tipo: 'contenido' })),
      { seccion: 'Para copiar de una vez (con saltos de línea)' },
      { campo: 'Criterios, todos', plan: criterios.join('\n'), bloque: true },
      { campo: 'Contenidos, todos', plan: contenidos.join('\n'), bloque: true },
    ];
    for (const f of filas) if (f.plan && !f.bloque) {
      const auto = observaciones(f.plan, f);
      f.nota = [f.nota, auto].filter(Boolean).join(' ');
      if (f.variante === f.plan) f.variante = '';
    }
    fichas.push({ curso, num, ae, aeSin, titulo, criterios, contenidos, filas, hoja: `${p.codigo} AE${num}` });
  }
  return curso;
});

// ── Verificación contra el PDF oficial ───────────────────────────────────────────────────────────────────────────────
// Se compara sin espacios: el PDF parte las líneas donde quiere y dibuja algunas con las letras separadas ("I M P L E…").
// Cuando un texto cruza de una página a otra, pdftotext intercala entre sus dos mitades el comienzo de las otras columnas
// de la tabla. Por eso un texto puede aparecer en hasta 3 trozos, en orden, pero solo si entre un trozo y el siguiente hay
// un salto de página (§, donde estaba el pie de página): así no pasa un texto al que le falta o le sobra una palabra, un
// guion o una tilde. Tampoco pasa si en el PDF el texto sigue con un signo (le faltaría el punto final) o va precedido de
// un asterisco (le faltaría la viñeta).
const sinEspacios = (s) => s.replace(/\s+/g, '');
function cubrir(t, pdf) {
  let pos = 0, desde = 0, inicio = -1, trozos = 0;
  while (pos < t.length) {
    // El prefijo más largo de lo que falta que aparece en el PDF después del trozo anterior (búsqueda binaria: si aparece
    // un prefijo, aparecen todos los más cortos).
    let lo = 0, hi = t.length - pos, idx = -1;
    while (lo < hi) {
      const m = Math.ceil((lo + hi) / 2);
      const i = pdf.indexOf(t.slice(pos, pos + m), desde);
      if (i >= 0 && (trozos === 0 || i - desde <= 1500)) { lo = m; idx = i; } else hi = m - 1;
    }
    if (lo === 0 || ++trozos > 3) return null;
    if (trozos > 1 && !pdf.slice(desde, idx).includes('§')) return null;
    if (inicio < 0) inicio = idx;
    pos += lo;
    desde = idx + lo;
  }
  if (/[.,;:]/.test(pdf[desde] ?? '') || pdf[inicio - 1] === '*') return null;
  return trozos;
}
const faltan = [];
for (const c of cursos) {
  const pdf = sinEspacios(fs.readFileSync(ruta(`data/sipfor/${c.codigo}/plan-oficial.txt`), 'utf8')
    .replace(/Versión N° \d+ - N° de Resolución: \d+ - Fecha de Resolución: [\d-]+/g, ' § ')
    .replace(/Página \d+ de \d+/g, ' § '));
  const textos = new Set(fichas.filter((f) => f.curso === c).flatMap((f) => f.filas.filter((r) => r.plan && !r.bloque).map((r) => r.plan)));
  c.cortados = [];
  for (const t of textos) {
    const trozos = cubrir(sinEspacios(t), pdf);
    if (!trozos) faltan.push(`${c.codigo}: «${t.slice(0, 90)}»`);
    else if (trozos > 1) c.cortados.push(t);
  }
  c.verificados = textos.size;
}
if (faltan.length) {
  console.error(`No aparecen tal cual en el PDF oficial (${faltan.length}):\n  ${faltan.join('\n  ')}`);
  process.exit(1);
}

// ── Planilla ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// La columna E compara lo pegado en D con B (tal como aparece) o con C (la variante sin numeración). CHAR(160) es el
// espacio duro que suele venir al copiar desde una página web, como Rise.
const D = 'TRIM(SUBSTITUTE(D{fila},CHAR(160)," "))';
const COMPARA = `IF(${D}="","",IF(OR(EXACT(${D},B{fila}),AND(C{fila}<>"",EXACT(${D},C{fila}))),"IDÉNTICO",`
  + `IF(OR(${D}=B{fila},AND(C{fila}<>"",${D}=C{fila})),"SOLO CAMBIAN MAYÚSCULAS","DISTINTO")))`;
const REGLAS = [{ contiene: 'IDÉNTICO', color: 'ok' }, { contiene: 'MAYÚSCULAS', color: 'aviso' }, { contiene: 'DISTINTO', color: 'mal' }];

const hojaFicha = (f) => ({
  nombre: f.hoja,
  titulo: `${f.curso.codigo} · Módulo ${f.curso.n} · Aprendizaje esperado ${f.num}`,
  subtitulo: 'Texto canónico de SIPFOR, verificado contra el PDF oficial. Copia B o C; pega lo que dice Rise en D y la columna E te dice si coincide.',
  encabezados: ['Campo', 'Tal como aparece en el plan', 'Sin numeración ni viñeta', 'Pega aquí lo que dice Rise', '¿Coincide?', 'Ojo con esto'],
  anchos: { fijas: 1, cols: [24, 62, 52, 52, 16, 48] },
  alto: 'auto',
  color: f.curso.codigo === 'PF1821' ? '0E7490' : '6B21A8',
  filas: f.filas.map((r) => {
    if (r.seccion) return Object.assign([{ texto: r.seccion.toUpperCase(), estado: 'curso' }], { tipo: 'ae', combinar: true, alto: 22 });
    if (r.bloque) return Object.assign([r.campo, r.plan, '', '', '', 'Para copiar el bloque sin comillas, entra a la celda (doble clic o F2), selecciona el texto y cópialo.'], {});
    return [{ texto: r.campo, estado: 'curso' }, r.plan, r.variante ?? '', { texto: '', entrada: true }, { formula: COMPARA }, r.nota ? { texto: r.nota, nota: true } : ''];
  }),
  condicional: [{ rango: `E5:E${4 + f.filas.length}`, reglas: REGLAS }],
});

const COMO = [
  ['Qué es', 'El texto oficial del módulo 2 de PF1821 y PF1822, tal como aparece en el plan formativo de SIPFOR, para cotejar los cursos de Rise 360 (uno por aprendizaje esperado) y corregir lo que Rise cambió.'],
  ['¿El aprendizaje esperado tiene nombre?', 'No. En el plan cada aprendizaje esperado es un número ("1.", "2.") seguido de su enunciado; no tiene título. Lo más parecido a un nombre es el rótulo de su unidad de contenidos (fila "Título de los contenidos", por ejemplo "1. CONCEPTOS FUNDAMENTALES DE AUTOMATIZACIÓN DE WORKFLOWS Y LAS CARACTERÍSTICAS DE N8N:"). Para titular un curso de Rise sin inventar, arma el título con piezas del plan: la pestaña "Resumen" trae una propuesta hecha solo con esas piezas.'],
  ['Nombre del curso', 'Las bases 2026 no nombran los cursos (son las bases generales del programa). El nombre del curso es el nombre del plan formativo en SIPFOR: CONSTRUCCIÓN DE AGENTES Y AUTOMATIZACIÓN CON HERRAMIENTAS LOW CODE (PF1821) y ESPECIALIZACIÓN EN DESARROLLO CON IA (PF1822).'],
  ['Cómo se usa', '1. Abre la pestaña del curso y aprendizaje (por ejemplo "PF1821 AE3"). 2. En Rise, copia el texto de cada elemento y pégalo en la columna D, en la fila que corresponde. 3. La columna E dice IDÉNTICO (verde), SOLO CAMBIAN MAYÚSCULAS (amarillo) o DISTINTO (rojo). 4. Corrige en Rise copiando desde la columna B (tal como aparece) o C (sin el número o la viñeta), hasta que todo quede en verde.'],
  ['Columna B o C', 'B es el texto exacto, con su número ("1.1 IDENTIFICA…") o su viñeta ("*CASOS DE USO…"). C es el mismo texto sin ese número o viñeta, por si en Rise el número ya lo pone la lista o el título. Las palabras, tildes y puntuación de B y C son las mismas.'],
  ['Mayúsculas', 'El plan escribe todo en mayúsculas. Si Rise lo pasó a minúsculas, la columna E lo marca en amarillo: las palabras son las mismas pero no la forma. La decisión del repo es dejar en Rise el aprendizaje esperado, los criterios y los rótulos de contenidos tal cual, en mayúsculas (modulo-2/GUIA-RISE.md).'],
  ['Columna "Ojo con esto"', 'Marca lo que parece un error y es así en el plan, para no "corregirlo": un guion largo (–), una línea que no termina en punto, dos viñetas en una misma línea, una línea sin asterisco que funciona como subtítulo, un criterio que repite el aprendizaje esperado.'],
  ['Qué se normalizó', 'Solo lo que hace el propio PDF al mostrar el texto: los saltos de línea de SIPFOR (<br />) son saltos de línea, sin espacios al inicio o al final de cada línea, y los espacios dobles quedan en uno. Nada más: ni ortografía, ni puntuación, ni mayúsculas.'],
  ['Cómo se verificó', `Cada texto de las pestañas por aprendizaje se buscó, letra por letra, en el texto del PDF oficial que genera SIPFOR (${cursos.map((c) => `${c.codigo}: ${c.verificados} textos, todos presentes${c.cortados.length ? `; ${c.cortados.length} cruzan de una página a otra y están en dos partes seguidas` : ''}`).join('. ')}). Sin contar los espacios, porque el PDF parte las líneas donde le acomoda.`],
  ...BASES.map(([que, dice, cita]) => [`Bases: ${que}`, `${dice} (${cita}).`]),
];

const resumen = {
  nombre: 'Resumen',
  titulo: 'Módulo 2 de PF1821 y PF1822 · los 8 aprendizajes esperados',
  subtitulo: 'Una fila por curso de Rise. Texto de SIPFOR, verificado contra el PDF oficial.',
  encabezados: ['Pestaña', 'Código', 'Nombre del plan formativo (curso)', 'Módulo', 'Código del módulo', 'Nombre del módulo', 'Horas',
    'Competencia del módulo', 'AE', 'Aprendizaje esperado', 'Título de los contenidos', 'Título para Rise armado solo con piezas del plan'],
  anchos: { fijas: 1, cols: [13, 10, 34, 9, 12, 30, 8, 50, 5, 60, 44, 50] },
  alto: 'auto',
  filas: fichas.map((f) => [{ texto: f.hoja, estado: 'curso' }, f.curso.codigo, f.curso.nombre, `MÓDULO FORMATIVO N° ${f.curso.n}`, f.curso.modulo,
    f.curso.nombreModulo, horas(f.curso.horasModulo), f.curso.competenciaModulo, f.num, f.ae, f.titulo,
    `${f.curso.codigo} · MÓDULO ${f.curso.n}: ${f.curso.nombreModulo} · APRENDIZAJE ESPERADO ${f.num}`]),
};

// Ficha del curso: los demás campos del plan y del módulo 2, por si alguno aparece en Rise.
function hojaCurso(c) {
  const m = c.limpio.modulos;
  const rm = (k) => texto(c.mod[k]);
  const filas = [
    ['PLAN FORMATIVO'],
    ['Código', c.codigo],
    ['Nombre', c.nombre],
    ['Horas totales', horas(c.plan.FL_RUP_PLA_DURACION)],
    ['Modalidad', c.limpio.modalidad],
    ['Nivel de cualificación', c.limpio.nivel.toUpperCase()],
    ['Resolución', `${c.plan.FL_RUP_PLA_RESOLUCION} del ${c.plan.FL_RUP_PLA_FECRESOLUCION.slice(0, 10).split('-').reverse().join('-')}, versión ${c.plan.FL_RUP_PLA_VERSION}`],
    ['Descripción de la ocupación y campo laboral', texto(c.plan.FL_RUP_PLA_DESCOPYC)],
    ['Requisitos de ingreso al plan formativo', texto(c.plan.FL_RUP_PLA_REQINGRE)],
    ['Competencia del plan formativo', c.competenciaPlan],
    ['MÓDULOS DEL PLAN'],
    ...m.map((x) => [`Módulo N°${x.n} · ${x.codigo}`, `${x.nombre} · ${horas(x.horas)} h`]),
    [`MÓDULO ${c.n}: OTROS CAMPOS`],
    ['Requisitos de ingreso del módulo', rm('FL_RUP_MOD_REQINGRE')],
    ['Perfil del facilitador · opción 1', rm('FL_RUP_MOD_PERFFAC1')],
    ['Perfil del facilitador · opción 2', rm('FL_RUP_MOD_PERFFAC2')],
    ['Perfil del facilitador · opción 3', rm('FL_RUP_MOD_PERFFAC3')],
    ['Recursos · infraestructura', rm('FL_RUP_MOD_RECMATINF')],
    ['Recursos · equipos y herramientas', rm('FL_RUP_MOD_RECMATEQ')],
    ['Recursos · materiales e insumos', rm('FL_RUP_MOD_RECMATINS')],
  ];
  return {
    nombre: `Ficha ${c.codigo}`,
    titulo: `${c.codigo} · ${c.nombre}`,
    subtitulo: `Los demás campos del plan y del módulo ${c.n}, tal como están en SIPFOR (plan id ${c.plan.PK_RUP_PLA_ID}). Los del aprendizaje esperado están en las pestañas ${c.codigo} AE1 a AE4.`,
    encabezados: ['Campo', 'Texto del plan'],
    anchos: { fijas: 1, cols: [34, 110] },
    alto: 'auto',
    color: c.codigo === 'PF1821' ? '0E7490' : '6B21A8',
    filas: filas.map((f) => (f.length === 1 ? Object.assign([{ texto: f[0], estado: 'curso' }], { tipo: 'ae', combinar: true, alto: 22 }) : [{ texto: f[0], estado: 'curso' }, f[1]])),
  };
}

const fuentes = {
  nombre: 'Fuentes',
  titulo: 'De dónde sale cada texto',
  subtitulo: 'Regenerar: npm run canonico (scripts/texto-canonico.mjs).',
  encabezados: ['Fuente', 'Detalle'],
  anchos: { fijas: 1, cols: [34, 110] },
  alto: 'auto',
  filas: [
    ...cursos.flatMap((c) => [
      [{ texto: `${c.codigo} · PDF oficial del plan`, estado: 'curso' }, { url: c.pdf, texto: c.pdf }],
      [{ texto: `${c.codigo} · datos de SIPFOR`, estado: 'curso' }, `Plan id ${c.plan.PK_RUP_PLA_ID}, módulo ${c.modulo} (id ${c.mod.PK_RUP_MOD_ID}), actualizado en SIPFOR el ${c.mod.FECHA_ACTUALIZACION.slice(0, 10)}. Resolución ${c.plan.FL_RUP_PLA_RESOLUCION}, versión ${c.plan.FL_RUP_PLA_VERSION}. En el repo: data/sipfor/${c.codigo}/. El módulo ${c.n} está en las páginas ${c.paginas} del PDF.`],
    ]),
    [{ texto: 'Bases 2026', estado: 'curso' }, 'Res. Ex. N°2320 de SENCE (bases/bases-2026-sence-res-ex-2320.pdf en el repo). Numerales citados: 4 (pág. 18) y 13.3.2 f) y h) (pág. 51).'],
  ],
};

fs.mkdirSync(ruta(DIR), { recursive: true });
fs.writeFileSync(ruta(DIR, `${NOMBRE}.xlsx`), crearXlsx([
  { nombre: 'Cómo usar', titulo: 'Texto canónico del módulo 2 · PF1821 y PF1822', subtitulo: 'Para cotejar y corregir lo que generó Rise 360.',
    encabezados: ['Tema', 'Detalle'], anchos: { fijas: 1, cols: [30, 120] }, alto: 'auto',
    filas: COMO.map(([a, b]) => [{ texto: a, estado: 'curso' }, b]) },
  resumen,
  ...fichas.map(hojaFicha),
  ...cursos.map(hojaCurso),
  fuentes,
]));

// ── HTML con botones de copiar (se abre en el navegador; copia el texto exacto, sin comillas) ───────────────────────
const boton = (t, etiqueta) => `<button type="button" data-copiar="${esc(t).replace(/"/g, '&quot;')}">${etiqueta}</button>`;
const filaHtml = (r) => {
  if (r.seccion) return `<h3>${esc(r.seccion)}</h3>`;
  return `<div class="campo${r.bloque ? ' bloque' : ''}"><div class="rotulo">${esc(r.campo)}</div><div class="texto">${esc(r.plan)}</div>`
    + `<div class="botones">${boton(r.plan, 'Copiar')}${r.variante ? boton(r.variante, r.etiqueta ?? 'Sin número') : ''}</div>`
    + `${r.nota ? `<div class="ojo">${esc(r.nota)}</div>` : ''}</div>`;
};
const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Texto canónico M2</title>
<style>
:root { --tinta:#1f2937; --suave:#475569; --linea:#e2e8f0; --fondo:#ffffff; --panel:#f8fafc; --acento:#0f3d5e; --ok:#166534; --ojo:#92400e; --ojo-fondo:#fef3c7; }
* { box-sizing: border-box; }
body { margin: 0; font: 15px/1.5 system-ui, "Segoe UI", Arial, sans-serif; color: var(--tinta); background: var(--fondo); }
header, main { max-width: 1000px; margin: 0 auto; padding: 0 16px; }
header { padding-top: 24px; }
h1 { font-size: 24px; margin: 0 0 4px; color: var(--acento); }
h2 { font-size: 19px; margin: 32px 0 4px; padding: 10px 12px; background: var(--acento); color: #fff; border-radius: 6px; }
h3 { font-size: 13px; letter-spacing: .04em; text-transform: uppercase; color: var(--suave); margin: 20px 0 6px; }
nav { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0; }
nav a { font-size: 13px; padding: 4px 10px; border: 1px solid var(--linea); border-radius: 999px; color: var(--acento); text-decoration: none; }
.nota { color: var(--suave); font-size: 14px; }
.campo { display: grid; grid-template-columns: 190px 1fr auto; gap: 4px 12px; padding: 8px 0; border-top: 1px solid var(--linea); align-items: start; }
.rotulo { font-weight: 600; font-size: 13px; color: var(--suave); }
.texto { white-space: pre-wrap; font-family: ui-monospace, Consolas, monospace; font-size: 13.5px; }
.bloque .texto { background: var(--panel); padding: 8px; border-radius: 4px; }
.botones { display: flex; gap: 6px; }
button { font: inherit; font-size: 12px; padding: 4px 10px; border: 1px solid var(--acento); background: #fff; color: var(--acento); border-radius: 4px; cursor: pointer; white-space: nowrap; }
button.hecho { background: var(--ok); border-color: var(--ok); color: #fff; }
.ojo { grid-column: 2 / 4; font-size: 12.5px; color: var(--ojo); background: var(--ojo-fondo); padding: 3px 8px; border-radius: 4px; }
@media (max-width: 700px) { .campo { grid-template-columns: 1fr; } .ojo { grid-column: 1; } }
</style></head><body>
<header>
<h1>Texto canónico · módulo 2 · PF1821 y PF1822</h1>
<p class="nota">Tal como aparece en el plan formativo de SIPFOR, verificado contra el PDF oficial. "Copiar" copia el texto exacto; "Sin número" lo copia sin el número del aprendizaje, del criterio o del título, y "Sin viñeta", sin el asterisco (*) de la línea. El aprendizaje esperado no tiene nombre en el plan: es un número y su enunciado.</p>
<nav>${fichas.map((f) => `<a href="#${f.hoja.replace(' ', '-')}">${f.hoja}</a>`).join('')}</nav>
</header>
<main>
${fichas.map((f) => `<h2 id="${f.hoja.replace(' ', '-')}">${esc(f.hoja)} · ${esc(f.curso.nombre)}</h2>\n${f.filas.map(filaHtml).join('\n')}`).join('\n')}
<p class="nota" style="margin:32px 0">Fuente: SIPFOR, ${cursos.map((c) => `${c.codigo} plan id ${c.plan.PK_RUP_PLA_ID}`).join(' y ')} (Res. 1868 del 05-08-2026, versión 1). Regenerar: npm run canonico.</p>
</main>
<script>
document.addEventListener('click', async (e) => {
  const b = e.target.closest('button[data-copiar]');
  if (!b) return;
  const t = b.dataset.copiar;
  try { await navigator.clipboard.writeText(t); } catch {
    const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove();
  }
  const antes = b.textContent; b.textContent = 'Copiado'; b.classList.add('hecho');
  setTimeout(() => { b.textContent = antes; b.classList.remove('hecho'); }, 1200);
});
</script>
</body></html>
`;
escribir(`${DIR}/${NOMBRE}.html`, html);

console.log(`${DIR}/${NOMBRE}.xlsx · ${fichas.length} fichas · ${cursos.map((c) => `${c.codigo}: ${c.verificados} textos verificados contra el PDF`).join(' · ')}`);
console.log(`${DIR}/${NOMBRE}.html`);
