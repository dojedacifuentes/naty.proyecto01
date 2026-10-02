/**
 * Evaluación y cierre del módulo 2 (pedido del usuario, 2026-09-30): los insumos de todo el módulo, no de
 * una actividad, iguales para todos los clientes y en PDF.
 *
 *   M2-01-Evaluacion-diagnostica            (participante) y M2-01-Evaluacion-diagnostica-Pauta-tutor
 *   M2-02-Glosario-integrador               (.pdf, y .csv y -Moodle.xml para la actividad Glosario de Moodle)
 *   M2-03-Actividad-final-integradora       (integra todos los contenidos del plan; no nombra aprendizajes)
 *   M2-04-Autoevaluacion
 *   M2-05-Coevaluacion-por-pares
 *   M2-06-Evaluacion-final-portafolio
 *
 * Fuentes: contenidos/<PF>/modulo-2/R-evaluacion-modulo.md (una sección "## NN · Título" por documento) y
 * R-glosario-integrador.md. El plan se cita con marcas que este script reemplaza por el texto de la ficha
 * de SIPFOR, para que nadie lo copie a mano: {{competencia}}, {{competencia: trozo}}, {{AE1}}, {{2.3}},
 * {{c:INICIO DE UN CONTENIDO}}, {{unidad 3}}, {{modulo}}, {{abp AE1}} y {{abpro AE1}} (títulos de R-abp-abpro.md).
 * Bloques generados: {{items-diagnostica}}, {{clave-diagnostica}}, {{tabla-autopercepcion}} y
 * {{tabla-autoevaluacion}}.
 *
 * No genera nada si: una marca no calza con la ficha; la actividad final no cubre todos los contenidos del
 * plan o nombra un aprendizaje esperado o un criterio; el glosario deja un contenido del plan sin término;
 * un ítem de la diagnóstica no tiene una sola respuesta correcta o su criterio no es del aprendizaje de su
 * contenido; o aparece la duración de una actividad o un rótulo interno ("textual", "oficial").
 *
 *   npm run evaluacion                 # los dos cursos
 *   npm run evaluacion -- PF1821       # uno
 *   npm run evaluacion -- --sin-pdf    # solo revisa las fuentes (y escribe el CSV y el XML del glosario)
 *   npm run evaluacion -- PF1821 --sin-pdf --solo=glosario   # una sola fuente
 */
import fs from 'node:fs';
import { leer, escribir, existe, ruta } from './lib/repo.mjs';
import { documentoPdfHtml } from './lib/documento.mjs';
import { imprimirPdf, navegador } from './lib/pdf.mjs';
import { oracion } from './lib/oracion.mjs';
import { leerPlan, contenidos, contenido, trozoCompetencia, normal } from './lib/plan.mjs';

const CURSOS = {
  PF1821: { carpeta: 'modulo-2/PF1821-agentes-low-code', curso: 'Construcción de Agentes y Automatización con Herramientas Low Code' },
  PF1822: { carpeta: 'modulo-2/PF1822-desarrollo-con-ia', curso: 'Especialización en Desarrollo con IA' },
  // Chile Conductores (2026-10-02): solo la actividad final integradora; el resto de la evaluación es la del cliente.
  PF1486: { carpeta: 'modulo-2/PF1486-product-owner', curso: 'Fundamentos Product Owner', docs: ['M2-03-Actividad-final-integradora'] },
  PF1495: { carpeta: 'modulo-2/PF1495-hacking-etico', curso: 'Hacking Ético en Aplicativos Web', docs: ['M2-03-Actividad-final-integradora'] },
  PF1462: { carpeta: 'modulo-2/PF1462-machine-learning', curso: 'Especialización en Machine Learning', docs: ['M2-03-Actividad-final-integradora'], sinAbp: true },
  PF1482: { carpeta: 'modulo-2/PF1482-arquitectura-cloud', curso: 'Fundamentos de Arquitectura Cloud', docs: ['M2-03-Actividad-final-integradora'], sinAbp: true },
  // Entry level (2026-10-02): no tenía actividad final. El módulo 2 es el mismo en los cuatro planes; misma fuente, un PDF por curso.
  PF1474: { carpeta: 'modulo-2/PF1474-entry-level-front-end/cursos/PF1474', curso: 'Desarrollo de Aplicaciones Front-End Trainee', docs: ['M2-03-Actividad-final-integradora'], sinAbp: true },
  PF1477: { carpeta: 'modulo-2/PF1474-entry-level-front-end/cursos/PF1477', curso: 'Desarrollo de Aplicaciones Full Stack Java Trainee', docs: ['M2-03-Actividad-final-integradora'], sinAbp: true },
  PF1478: { carpeta: 'modulo-2/PF1474-entry-level-front-end/cursos/PF1478', curso: 'Desarrollo de Aplicaciones Fullstack Python Trainee', docs: ['M2-03-Actividad-final-integradora'], sinAbp: true },
  PF1479: { carpeta: 'modulo-2/PF1474-entry-level-front-end/cursos/PF1479', curso: 'Desarrollo de Aplicaciones Full Stack JavaScript Trainee', docs: ['M2-03-Actividad-final-integradora'], sinAbp: true },
};

const args = process.argv.slice(2);
const conPdf = !args.includes('--sin-pdf');
// --solo=evaluacion o --solo=glosario: revisa una sola fuente (sirve mientras la otra se está escribiendo).
const solo = (args.find((a) => a.startsWith('--solo=')) ?? '').slice(7);
const pedidos = args.filter((a) => !a.startsWith('--')).map((a) => a.toUpperCase());
const codigos = pedidos.length ? pedidos : Object.keys(CURSOS);
if (codigos.some((c) => !CURSOS[c])) {
  console.error(`Uso: npm run evaluacion -- [${Object.keys(CURSOS).join(' ')}] [--sin-pdf]`);
  process.exit(1);
}
if (conPdf && !navegador()) {
  console.error('No encontré Edge ni Chrome para imprimir los PDF. Usa --sin-pdf o define NAVEGADOR_PDF.');
  process.exit(1);
}

// ------------------------------------------------------------------ fuentes

// "## Título" → [{ titulo, lineas }]; lo anterior a la primera sección es la cabecera de trabajo.
const secciones = (md) => md.replace(/\r\n/g, '\n').split(/^(?=## )/m).slice(1)
  .map((b) => { const L = b.trimEnd().split('\n'); return { titulo: L[0].slice(3).trim(), lineas: L.slice(1) }; });

// Datos del documento: las líneas "- **Rótulo:** valor" que abren la sección.
function metas(lineas) {
  const datos = [];
  let i = 0;
  while (i < lineas.length && (/^- \*\*[^*]+:\*\*/.test(lineas[i]) || !lineas[i].trim())) {
    const m = /^- \*\*([^*]+):\*\*\s*(.*)$/.exec(lineas[i]);
    if (m) datos.push([m[1], m[2].trim()]);
    i++;
  }
  return { datos, cuerpo: lineas.slice(i).join('\n').trim() };
}

// Títulos de los ABP y ABPRO de cada aprendizaje (R-abp-abpro.md).
function titulosAbp(md) {
  const t = {};
  for (const m of md.matchAll(/^## (AE\d) · (ABPRO|ABP) · (.+)$/gm)) (t[m[1]] ??= {})[m[2]] = m[3].trim();
  return t;
}

// ------------------------------------------------------------------ marcas del plan

// Solo son marcas las de la lista; lo demás entre llaves dobles (las expresiones de n8n, como
// {{ $json.email }}) queda tal cual. Una marca mal escrita ({{AE 1}}, {{c SUPABASE}}) detiene todo.
const MARCA = /^(competencia(:.+)?|modulo|AE\d|\d\.\d|c:.+|unidad \d|abpr?o AE\d)$/;
const CASI_MARCA = /^(competencia|modulo|AE\s*\d|c\s*:|unidad|abpr?o\s)/i;

function resolver(texto, ctx, usados) {
  const { plan } = ctx;
  return texto.replace(/\{\{([^}]+)\}\}/g, (todo, marca) => {
    const m = marca.trim();
    if (!MARCA.test(m)) {
      if (CASI_MARCA.test(m)) throw new Error(`Marca mal escrita: ${todo}`);
      return todo;
    }
    let r;
    if (m === 'competencia') return oracion(plan.competencia);
    if ((r = /^competencia:\s*(.+)$/.exec(m))) return trozoCompetencia(plan, r[1]);
    if (m === 'modulo') return oracion(plan.modulo);
    if ((r = /^AE(\d)$/.exec(m))) {
      const ae = plan.aes[`AE${r[1]}`];
      if (!ae) throw new Error(`{{${m}}}: el módulo no tiene ese aprendizaje`);
      return oracion(ae.texto);
    }
    if ((r = /^(\d)\.(\d)$/.exec(m))) {
      const t = plan.aes[`AE${r[1]}`]?.criterios[m];
      if (!t) throw new Error(`{{${m}}}: el plan no tiene ese criterio`);
      return oracion(t);
    }
    if ((r = /^c:\s*(.+)$/.exec(m))) {
      const c = contenido(plan, r[1]);
      usados?.add(c.texto);
      return oracion(c.texto);
    }
    if ((r = /^unidad (\d)$/.exec(m))) {
      const a = Object.values(plan.aes).find((x) => x.unidad.n === +r[1]);
      if (!a) throw new Error(`{{${m}}}: el plan no tiene ese contenido`);
      return oracion(a.unidad.titulo);
    }
    if ((r = /^(abp|abpro) (AE\d)$/.exec(m))) {
      const t = ctx.abp[r[2]]?.[r[1].toUpperCase()];
      if (!t) throw new Error(`{{${m}}}: no está en R-abp-abpro.md`);
      return t;
    }
    throw new Error(`Marca desconocida: {{${m}}}`);
  });
}

// ------------------------------------------------------------------ evaluación diagnóstica

// ### D1 / - **Contenido:** {{c:…}} / - **Criterio:** 1.1 / - **Pregunta:** … / - [ ] … / - [x] … / - **Por qué:** …
function itemsDiagnostica(seccion, ctx) {
  const bloques = seccion.lineas.join('\n').split(/^(?=### )/m).filter((b) => b.startsWith('### '));
  return bloques.map((b) => {
    const L = b.trimEnd().split('\n');
    const id = L[0].slice(4).trim();
    const dato = (r) => {
      const l = L.find((x) => x.startsWith(`- **${r}:**`));
      if (!l) throw new Error(`Diagnóstica ${id}: falta "${r}"`);
      return l.replace(`- **${r}:**`, '').trim();
    };
    const pc = /\{\{c:\s*(.+?)\}\}/.exec(dato('Contenido'));
    if (!pc) throw new Error(`Diagnóstica ${id}: el contenido va con la marca {{c:…}}`);
    const c = contenido(ctx.plan, pc[1]);
    const criterio = dato('Criterio');
    if (!ctx.plan.aes[`AE${c.unidad}`].criterios[criterio]) {
      throw new Error(`Diagnóstica ${id}: el criterio ${criterio} no es del aprendizaje del contenido "${c.texto}"`);
    }
    const opciones = L.filter((l) => /^- \[[ x]\] /.test(l)).map((l) => ({ ok: l[3] === 'x', texto: l.slice(6).trim() }));
    if (opciones.length < 3 || opciones.filter((o) => o.ok).length !== 1) throw new Error(`Diagnóstica ${id}: necesita 3 o 4 opciones y una sola correcta`);
    return { id, contenido: c, criterio, pregunta: dato('Pregunta'), opciones, porque: dato('Por qué') };
  });
}

const LETRAS = 'abcd';

function mdItems(items, ctx) {
  const out = [];
  let unidad = 0;
  items.forEach((it, i) => {
    if (it.contenido.unidad !== unidad) {
      unidad = it.contenido.unidad;
      out.push(`#### Contenido ${unidad} · ${resolver(`{{unidad ${unidad}}}`, ctx)}`, '');
    }
    out.push(`**${i + 1}.** ${it.pregunta}`, '', it.opciones.map((o, k) => `☐ ${LETRAS[k]}) ${o.texto}`).join('<br>'), '');
  });
  return out.join('\n');
}

function mdClave(items, ctx) {
  const out = [];
  let unidad = 0;
  items.forEach((it, i) => {
    if (it.contenido.unidad !== unidad) {
      unidad = it.contenido.unidad;
      out.push(`#### Contenido ${unidad} · ${resolver(`{{unidad ${unidad}}}`, ctx)}`, '');
    }
    const k = it.opciones.findIndex((o) => o.ok);
    out.push(`**Ítem ${i + 1} · respuesta ${LETRAS[k]})** ${it.opciones[k].texto}`, '',
      `- **Contenido del plan:** ${oracion(it.contenido.texto)}`,
      `- **Criterio de evaluación ${it.criterio}:** ${oracion(ctx.plan.aes[`AE${it.contenido.unidad}`].criterios[it.criterio])}`,
      `- **Por qué:** ${it.porque}`, '');
  });
  return out.join('\n');
}

// ------------------------------------------------------------------ tablas por aprendizaje esperado

function mdAutopercepcion(ctx) {
  return Object.entries(ctx.plan.aes).map(([k, a]) => [
    `**Aprendizaje esperado ${a.n}:** ${oracion(a.texto)}`, '',
    '| Criterio de evaluación | 1 | 2 | 3 | 4 |', '| --- | :-: | :-: | :-: | :-: |',
    ...Object.entries(a.criterios).map(([n, t]) => `| ${n} ${oracion(t)} | | | | |`), '',
  ].join('\n')).join('\n');
}

function mdAutoevaluacion(ctx) {
  return Object.entries(ctx.plan.aes).map(([k, a]) => [
    `**Aprendizaje esperado ${a.n}:** ${oracion(a.texto)}`, '',
    `*Trabajos donde lo practicaste:* ABP «${ctx.abp[k].ABP}» y ABPRO «${ctx.abp[k].ABPRO}».`, '',
    '| Criterio de evaluación | Al inicio (1 a 4) | Hoy (1 a 4) | ¿Qué trabajo tuyo lo demuestra? |', '| --- | :-: | :-: | --- |',
    ...Object.entries(a.criterios).map(([n, t]) => `| ${n} ${oracion(t)} | | | |`), '',
  ].join('\n')).join('\n');
}

// ------------------------------------------------------------------ controles de vocabulario

// Los recursos no dicen cuánto dura una actividad ni muestran rótulos internos (pedidos del usuario,
// 2026-09-29). "Documentación oficial" es texto del plan y se permite.
function controlar(nombre, md) {
  const plano = md.replace(/documentaci[oó]n oficial/gi, '');
  const rotulo = /\b(textual(es)?|oficial(es)?)\b/i.exec(plano);
  if (rotulo) throw new Error(`${nombre}: dice "${rotulo[0]}", que es un rótulo interno`);
  const duracion = /tiempo estimado|duraci[oó]n (de la|del|estimada)|de trabajo estimado|\d+\s*(minutos|min\.?|horas|h)\s+(de trabajo|para (responder|completar|desarrollar|resolver))/i.exec(md);
  if (duracion) throw new Error(`${nombre}: indica una duración ("${duracion[0]}")`);
}

// ------------------------------------------------------------------ glosario integrador

// ## Contenido N / ### Término / - **Plan:** {{c:…}} / - **Definición:** … / - **Ejemplo:** … / - **Relacionados:** a, b
function leerGlosario(md, ctx) {
  const terminos = [];
  for (const s of secciones(md)) {
    const u = /^Contenido (\d)$/.exec(s.titulo);
    if (!u) continue;
    const bloques = s.lineas.join('\n').split(/^(?=### )/m).filter((b) => b.startsWith('### '));
    for (const b of bloques) {
      const L = b.trimEnd().split('\n');
      const termino = L[0].slice(4).trim();
      const dato = (r, opcional) => {
        const l = L.find((x) => x.startsWith(`- **${r}:**`));
        if (!l && !opcional) throw new Error(`Glosario, "${termino}": falta "${r}"`);
        return l ? l.replace(`- **${r}:**`, '').trim() : '';
      };
      const planes = [...dato('Plan').matchAll(/\{\{c:\s*(.+?)\}\}/g)].map((m) => contenido(ctx.plan, m[1]));
      if (!planes.length) throw new Error(`Glosario, "${termino}": el plan va con la marca {{c:…}}`);
      const ajenos = planes.filter((p) => p.unidad !== +u[1]);
      if (ajenos.length) throw new Error(`Glosario, "${termino}": "${ajenos[0].texto}" no es del contenido ${u[1]}`);
      terminos.push({ termino, unidad: +u[1], planes, definicion: resolver(dato('Definición'), ctx),
        ejemplo: resolver(dato('Ejemplo', true), ctx),
        relacionados: dato('Relacionados', true).split(/,\s*/).filter(Boolean) });
    }
  }
  const nombres = terminos.map((t) => normal(t.termino));
  const repetidos = nombres.filter((n, i) => nombres.indexOf(n) !== i);
  if (repetidos.length) throw new Error(`Glosario: términos repetidos: ${[...new Set(repetidos)].join(', ')}`);
  for (const t of terminos) {
    const rotos = t.relacionados.filter((r) => !nombres.includes(normal(r)));
    if (rotos.length) throw new Error(`Glosario, "${t.termino}": relacionados que no están en el glosario: ${rotos.join(', ')}`);
  }
  const cubiertos = new Set(terminos.flatMap((t) => t.planes.map((p) => p.texto)));
  const faltan = contenidos(ctx.plan).filter((c) => !cubiertos.has(c.texto));
  if (faltan.length) throw new Error(`Glosario: contenidos del plan sin término: ${faltan.map((c) => c.texto).join(' | ')}`);
  return terminos;
}

const plano = (t) => t.replace(/\*\*|`/g, '').replace(/\*([^*]+)\*/g, '$1');

function glosarioMd(terminos, ctx, intro) {
  const orden = (a, b) => a.termino.localeCompare(b.termino, 'es', { sensitivity: 'base' });
  const partes = [intro, ''];
  for (const a of Object.values(ctx.plan.aes)) {
    const suyos = terminos.filter((t) => t.unidad === a.unidad.n).sort(orden);
    partes.push(`## Contenido ${a.unidad.n} · ${oracion(a.unidad.titulo)}`, '',
      '| Término | Definición | Contenido del plan |', '| --- | --- | --- |',
      ...suyos.map((t) => `| **${t.termino}** | ${t.definicion}${t.ejemplo ? `<br>*Ejemplo:* ${t.ejemplo}` : ''}${t.relacionados.length ? `<br>*Relacionados:* ${t.relacionados.join(', ')}` : ''} | ${t.planes.map((p) => oracion(p.texto)).join('<br>')} |`), '');
  }
  const todos = [...terminos].sort(orden);
  const mitad = Math.ceil(todos.length / 2);
  partes.push('## Índice alfabético', '', '| Término | Contenido | Término | Contenido |', '| --- | :-: | --- | :-: |');
  for (let i = 0; i < mitad; i++) {
    const b = todos[i + mitad];
    partes.push(`| ${todos[i].termino} | ${todos[i].unidad} | ${b ? b.termino : ''} | ${b ? b.unidad : ''} |`);
  }
  return partes.join('\n');
}

function glosarioXml(terminos, ctx, pf) {
  const x = (t) => plano(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cat = (n) => `Contenido ${n}: ${oracion(Object.values(ctx.plan.aes).find((a) => a.unidad.n === n).unidad.titulo)}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<GLOSSARY>
  <INFO>
    <NAME>Glosario integrador del módulo 2</NAME>
    <INTRO>${x(`${pf} · Módulo 2: ${oracion(ctx.plan.modulo)}`)}</INTRO>
    <INTROFORMAT>1</INTROFORMAT>
    <ALLOWDUPLICATEDENTRIES>0</ALLOWDUPLICATEDENTRIES>
    <DISPLAYFORMAT>dictionary</DISPLAYFORMAT>
    <SHOWSPECIAL>1</SHOWSPECIAL>
    <SHOWALPHABET>1</SHOWALPHABET>
    <SHOWALL>1</SHOWALL>
    <ALLOWCOMMENTS>0</ALLOWCOMMENTS>
    <USEDYNALINK>0</USEDYNALINK>
    <DEFAULTAPPROVAL>1</DEFAULTAPPROVAL>
    <GLOBALGLOSSARY>0</GLOBALGLOSSARY>
    <ENTBYPAGE>40</ENTBYPAGE>
    <ENTRIES>
${terminos.map((t) => `      <ENTRY>
        <CONCEPT>${x(t.termino)}</CONCEPT>
        <DEFINITION>${x(`${t.definicion}${t.ejemplo ? ` Ejemplo: ${t.ejemplo}` : ''} (Contenido del plan: ${t.planes.map((p) => oracion(p.texto)).join(' / ')})`)}</DEFINITION>
        <FORMAT>1</FORMAT>
        <USEDYNALINK>0</USEDYNALINK>
        <CASESENSITIVE>0</CASESENSITIVE>
        <FULLMATCH>0</FULLMATCH>
        <TEACHERENTRY>1</TEACHERENTRY>
        <CATEGORIES>
          <CATEGORY>
            <NAME>${x(cat(t.unidad))}</NAME>
            <USEDYNALINK>0</USEDYNALINK>
          </CATEGORY>
        </CATEGORIES>
      </ENTRY>`).join('\n')}
    </ENTRIES>
  </INFO>
</GLOSSARY>
`;
}

// ------------------------------------------------------------------ principal

let total = 0;
for (const pf of codigos) {
  const c = CURSOS[pf];
  const dir = `contenidos/${pf}/modulo-2`;
  const plan = leerPlan(leer(`${dir}/00-ficha-sipfor.md`));
  // PF1462 y PF1482 usan los ABP y ABPRO de 2024: no tienen R-abp-abpro.md ni pueden citarlos con {{abp AEn}}.
  const ctx = { plan, abp: c.sinAbp ? {} : titulosAbp(leer(`${dir}/R-abp-abpro.md`)) };
  if (!c.sinAbp) for (const k of Object.keys(plan.aes)) if (!ctx.abp[k]?.ABP || !ctx.abp[k]?.ABPRO) throw new Error(`${pf}: R-abp-abpro.md no tiene el ABP y el ABPRO de ${k}`);
  const ent = `${c.carpeta}/entrega/evaluacion-modulo`;
  const docs = [];
  // Cada fuente se revisa aunque la otra todavía no exista (se escriben por separado).
  const fEval = `${dir}/R-evaluacion-modulo.md`;
  const fGlos = `${dir}/R-glosario-integrador.md`;
  if (!existe(fEval)) console.warn(`  AVISO: falta ${fEval}`);
  if (!existe(fGlos) && !c.docs) console.warn(`  AVISO: falta ${fGlos}`);
  const fuente = existe(fEval) && solo !== 'glosario' ? secciones(leer(fEval)) : [];
  const conDiagnostica = !c.docs || c.docs.includes('M2-01-Evaluacion-diagnostica');
  const sItems = fuente.find((s) => /^Ítems de la evaluación diagnóstica/.test(s.titulo));
  if (fuente.length && conDiagnostica && !sItems) throw new Error(`${pf}: falta la sección "Ítems de la evaluación diagnóstica"`);
  const items = sItems ? itemsDiagnostica(sItems, ctx).sort((a, b) => a.contenido.unidad - b.contenido.unidad) : [];
  for (const a of Object.values(plan.aes)) {
    if (sItems && items.filter((it) => it.contenido.unidad === a.unidad.n).length < 2) throw new Error(`${pf}: la diagnóstica tiene menos de 2 ítems del contenido ${a.unidad.n}`);
  }
  const esperados = c.docs ?? ['M2-01-Evaluacion-diagnostica', 'M2-01-Evaluacion-diagnostica-Pauta-tutor', 'M2-03-Actividad-final-integradora',
    'M2-04-Autoevaluacion', 'M2-05-Coevaluacion-por-pares', 'M2-06-Evaluacion-final-portafolio'];

  for (const s of fuente.filter((x) => /^\d\d · /.test(x.titulo))) {
    const { datos, cuerpo } = metas(s.lineas);
    const dato = (r) => datos.find(([k]) => k === r)?.[1];
    const archivo = dato('Archivo');
    const rotulo = dato('Rótulo');
    if (!archivo || !rotulo) throw new Error(`${pf} "${s.titulo}": faltan Archivo o Rótulo`);
    const usados = new Set();
    const md = resolver(cuerpo
      .replace('{{items-diagnostica}}', () => mdItems(items, ctx))
      .replace('{{clave-diagnostica}}', () => mdClave(items, ctx))
      .replace('{{tabla-autopercepcion}}', () => mdAutopercepcion(ctx))
      .replace('{{tabla-autoevaluacion}}', () => mdAutoevaluacion(ctx)), ctx, usados)
      // En la fuente "##" separa documentos; dentro del documento, "###" es el título de sección.
      .replace(/^(#{3,6}) /gm, (_, h) => `${h.slice(1)} `);
    const ficha = datos.filter(([k]) => !['Archivo', 'Rótulo'].includes(k)).map(([k, v]) => { const t = resolver(v, ctx, usados); return [k, t, t.length > 70]; });
    const titulo = s.titulo.replace(/^\d\d · /, '');
    const todo = [titulo, ...ficha.map((f) => f[1]), md].join('\n');
    controlar(`${pf} ${archivo}`, todo);
    // La actividad final integra el módulo completo: cubre todos los contenidos y no nombra aprendizajes.
    if (/Actividad-final/.test(archivo)) {
      const faltan = contenidos(plan).filter((x) => !usados.has(x.texto));
      if (faltan.length) throw new Error(`${pf} ${archivo}: contenidos del plan que no integra: ${faltan.map((x) => x.texto).join(' | ')}`);
      const ae = /\bAE\s?\d\b|aprendizajes? esperados?|criterios? (de evaluación )?\d\.\d/i.exec(todo);
      if (ae) throw new Error(`${pf} ${archivo}: nombra "${ae[0]}"; la actividad final es de todo el módulo`);
    }
    docs.push({ archivo, rotulo, titulo, ficha, md });
  }

  const faltanDocs = fuente.length ? esperados.filter((a) => !docs.some((d) => d.archivo === a)) : [];
  if (faltanDocs.length) throw new Error(`${pf}: faltan en R-evaluacion-modulo.md los documentos ${faltanDocs.join(', ')}`);

  let terminos = [];
  if (existe(fGlos) && solo !== 'evaluacion') {
    const sGlos = secciones(leer(fGlos));
    const introGlos = resolver(metas((sGlos.find((s) => s.titulo === 'Presentación') ?? { lineas: [] }).lineas).cuerpo, ctx);
    terminos = leerGlosario(leer(fGlos), ctx);
    const mdGlos = glosarioMd(terminos, ctx, introGlos);
    controlar(`${pf} glosario`, mdGlos);
    docs.push({ archivo: 'M2-02-Glosario-integrador', rotulo: 'Evaluación y cierre del módulo · todo el módulo', titulo: 'Glosario integrador del módulo 2', md: mdGlos,
      ficha: [['Términos', String(terminos.length)], ['Se usa', 'Durante todo el módulo, y en Moodle como actividad Glosario'], ['Organización', 'Por contenido del plan, con índice alfabético'],
        ['Contenidos del plan', `Los ${contenidos(plan).length} temas de los ${Object.keys(plan.aes).length} contenidos del módulo tienen al menos un término`, true]] });
    const csv = (t) => `"${plano(t).replace(/"/g, '""')}"`;
    escribir(`${ent}/M2-02-Glosario-integrador.csv`, ['termino,definicion,ejemplo,contenido,contenido_del_plan',
      ...[...terminos].sort((a, b) => a.termino.localeCompare(b.termino, 'es', { sensitivity: 'base' }))
        .map((t) => [t.termino, t.definicion, t.ejemplo, String(t.unidad), t.planes.map((p) => oracion(p.texto)).join(' / ')].map(csv).join(','))].join('\n') + '\n');
    escribir(`${ent}/M2-02-Glosario-integrador-Moodle.xml`, glosarioXml(terminos, ctx, pf));
  }

  docs.sort((a, b) => a.archivo.localeCompare(b.archivo));
  fs.mkdirSync(ruta(ent), { recursive: true });
  for (const d of docs) {
    total++;
    if (!conPdf) continue;
    const tmp = `.scratch/evaluacion-modulo/${pf}/${d.archivo}.html`;
    escribir(tmp, documentoPdfHtml({
      pf, curso: c.curso, modulo: oracion(plan.modulo), codigo: plan.codigo, pie: `${pf} · Módulo 2 · ${d.titulo}`,
      kicker: d.rotulo, titulo: d.titulo, ficha: d.ficha, md: d.md,
    }));
    imprimirPdf(tmp, `${ent}/${d.archivo}.pdf`);
  }
  console.log(`${pf}: ${docs.length} documentos (diagnóstica de ${items.length} ítems, glosario de ${terminos.length} términos) → ${ent}/`);
}
console.log(`Listo: ${total} documentos${conPdf ? ' en PDF' : ' revisados (sin PDF)'}.`);
