#!/usr/bin/env node
/**
 * Manual de entregables del módulo evaluado, para leer e imprimir (HTML + PDF).
 *
 *   npm run manual -- PF1821 PF1822 --salida entregables/2026-09-24-modulo2 [--pdf]
 *
 * Todo lo que es del plan (competencia, aprendizajes, criterios, recursos, módulos) sale
 * de data/planes/<PF>.json, textual. Las cantidades del 7,0 salen de la rúbrica y de los
 * umbrales. Las "sugerencias para este módulo" son propuestas de trabajo derivadas de los
 * contenidos del plan: se marcan como tales y se validan en la etapa 3 del flujo
 * (docs/05-flujo-contenidos-modulo.md).
 *
 * --pdf imprime el HTML con Edge o Chrome en modo headless (scripts/lib/pdf.mjs).
 */
import { leer, escribir, existe } from './lib/repo.mjs';
import { parseCSV } from './lib/csv.mjs';
import { imprimirPdf } from './lib/pdf.mjs';

const args = process.argv.slice(2);
const codigos = args.filter((a) => /^PF\d{4}$/i.test(a)).map((a) => a.toUpperCase());
const iSal = args.indexOf('--salida');
const salida = iSal >= 0 ? args[iSal + 1] : 'entregables';
const conPdf = args.includes('--pdf');
if (!codigos.length) {
  console.error('Uso: npm run manual -- PF1821 [PF1822 ...] [--salida <dir>] [--pdf]');
  process.exit(1);
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const umbrales = Object.fromEntries(parseCSV(leer('data/umbrales-por-plan.csv')).map((u) => [u.codigo_plan, u]));
const rubrica = Object.fromEntries(parseCSV(leer('data/rubrica-subcriterios.csv')).map((r) => [r.id, r]));
const pct = (id) => (Number(rubrica[id].peso_en_tecnica) * 100).toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' %';
const planes = codigos.map((c) => {
  if (!existe(`data/planes/${c}.json`)) { console.error(`Falta data/planes/${c}.json: npm run sipfor -- ${c}`); process.exit(1); }
  return JSON.parse(leer(`data/planes/${c}.json`));
});

// Herramientas que se buscan en el texto completo del plan. Si el plan ya las nombra, no
// cuentan como "adicionales" para D1. La detección es por nombre: se revisa a mano.
const HERRAMIENTAS = ['n8n', 'Make', 'Zapier', 'Supabase', 'Docker', 'Docker Compose', 'PostgreSQL', 'MySQL', 'Redis',
  'Pinecone', 'OpenAI', 'Claude', 'Gemini', 'Hugging Face', 'LangChain', 'LlamaIndex', 'TensorFlow', 'PyTorch',
  'Diffusers', 'Python', 'JavaScript', 'Visual Studio Code', 'JupyterLab', 'Google Colab', 'Colab', 'Git', 'GitHub',
  'Postman', 'Sublime Text', 'Spring STS', 'spaCy', 'NLTK', 'Streamlit', 'FastAPI', 'Flask', 'Chroma', 'FAISS',
  'Weaviate', 'Qdrant', 'MLflow', 'Ollama', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Telegram', 'WhatsApp',
  'Slack', 'Google Sheets', 'Airtable', 'Notion', 'Trello', 'Jira', 'Asana', 'Basecamp', 'Zoom', 'Loom', 'Miro',
  'Word', 'Excel', 'Power Point', 'requests', 'httpx', 'scikit-learn', 'Pandas', 'Vercel', 'Render', 'Railway'];
// Categorías y ejemplos que da la guía de las bases para D1 (Anexo N°7, num. 8.1).
const CATEGORIAS_D1 = [
  ['Almacenamiento y datos', ['AWS', 'Google Cloud', 'Azure']],
  ['Gestión de proyectos', ['Jira', 'Asana', 'Trello', 'Basecamp']],
  ['Gestión de clientes', ['CRM']],
  ['Comunicación', ['Slack', 'Zoom', 'Loom']],
];
function herramientasDelPlan(p) {
  const texto = JSON.stringify({ c: p.competencia_plan, d: p.descripcion, m: p.modulos }).toUpperCase();
  const escRe = (s) => s.toUpperCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return HERRAMIENTAS
    .filter((h) => new RegExp(`(^|[^A-ZÁÉÍÓÚÑ0-9])${escRe(h)}([^A-ZÁÉÍÓÚÑ0-9]|$)`).test(texto))
    .filter((h, _, arr) => !(h === 'Colab' && arr.includes('Google Colab')));
}

// Sugerencias por plan: derivadas de los contenidos del módulo 2 en SIPFOR. A validar.
const SUGERENCIAS = {
  PF1821: {
    B1: 'Parte de los 13 criterios del plan, pero ojo: el criterio 3.1 repite textual el AE3 y no sirve como indicador. Los indicadores deben poder observarse en un workflow que funciona.',
    B2: [
      ['Observación · rúbrica', 'Revisión de un workflow: estructura trigger → proceso → salida, al menos tres nodos conectados, rutas condicionales, expresiones y trazabilidad de errores.'],
      ['Desempeño · resolución de problemas', 'Automatizar un caso empresarial que transforme datos entre JSON, CSV o XML y los registre en Supabase.'],
      ['Objetiva · selección múltiple y respuesta breve', 'Arquitectura de n8n, nodos core (Set, IF/Switch, Merge, Filter, Summarize, Split), expresiones y lectura de un workflow dado.'],
    ],
    B3: 'Export JSON de cada workflow, capturas de ejecuciones exitosas y con error, la tabla resultante en Supabase y la bitácora de depuración.',
    C1: 'La competencia habla de «resolver problemáticas empresariales»: la estrategia parte de un caso de negocio real (por ejemplo, solicitudes de clientes) y cada sesión agrega nodos a ese mismo workflow.',
    C2: [
      ['Actividad 1 · Automatizar un proceso simple', 'Formulario o webhook → Set e IF → registro en Supabase, con al menos tres nodos conectados. Respuesta modelada: el workflow de referencia exportado en JSON. Cubre AE1, AE2 y AE3.'],
      ['Actividad 2 · Diagnosticar y reparar', 'Un workflow entregado con fallas deliberadas (rutas condicionales mal definidas, expresiones erróneas, casos borde). El participante lo depura con las herramientas de debug y logs y documenta cada corrección. Cubre AE3 y AE4.'],
    ],
    C3: 'Retos encadenados con avance visible en el LMS: cada workflow que funciona desbloquea el siguiente caso del mismo negocio.',
    C4: 'Tutorial guiado paso a paso en el editor visual de n8n (primer workflow) y video interactivo sobre expresiones y depuración, con preguntas incrustadas.',
    C5: 'Pensamiento crítico (depurar casos borde), colaboración (coevaluación cruzada de workflows) y comunicación (documentar el workflow para un usuario de negocio).',
    lab: 'Laboratorio sugerido en el brainstorm del 24-sep: flujo n8n con fallas que el participante diagnostica y mejora.',
    pendiente: 'Cuentas de n8n Cloud o instancia habilitada y acceso a Supabase para cada participante: quién las provee y con qué costo.',
  },
  PF1822: {
    B1: 'Los 12 criterios del plan (3 por AE) sirven de base. Los indicadores deben poder observarse en un producto concreto: código, diagrama, registro de prompts o informe de métricas.',
    B2: [
      ['Observación · rúbrica', 'Revisión de código: cliente de API modular, autenticación por variables de entorno, docstrings, pruebas unitarias y manejo de errores.'],
      ['Desempeño · proyecto individual', 'Aplicación mínima que consume un modelo por API, con su diagrama de arquitectura, prompts iterados y métricas de evaluación registradas.'],
      ['Objetiva · selección múltiple y ejercicios interpretativos', 'Tipos de modelos generativos, endpoints de generación y embeddings, zero-shot frente a few-shot, efecto de temperature y top_p, lectura de métricas BLEU y ROUGE.'],
    ],
    B3: 'Diagrama de arquitectura, repositorio con el cliente de API y sus pruebas, registro de iteraciones de prompts e informe de métricas de calidad.',
    C1: 'La competencia pide «implementar la arquitectura básica de una aplicación» y «la evaluación de resultados»: la estrategia termina en una aplicación mínima evaluada con métricas, no en ejercicios sueltos.',
    C2: [
      ['Actividad 1 · Cliente de API reutilizable', 'Clase en Python que encapsula llamadas de generación y embeddings, con autenticación por variables de entorno, docstrings y pruebas unitarias, más el diagrama de la arquitectura donde se usa. Respuesta modelada: el módulo de referencia con sus tests. Cubre AE1 y AE2.'],
      ['Actividad 2 · Prompting y evaluación', 'Diseñar prompts zero-shot y few-shot para una tarea (resumen o reformulación), preprocesar un corpus y medir las salidas con BLEU y ROUGE, registrando cada ajuste. Cubre AE3 y AE4.'],
    ],
    C3: 'Un tablero con las métricas del propio participante: ve cómo mejora su prompt iteración a iteración.',
    C4: 'Notebook guiado (Colab o JupyterLab) con celdas de autocomprobación y video interactivo que recorre la documentación oficial de OpenAI y Hugging Face.',
    C5: 'Pensamiento crítico (evaluar alucinaciones con métricas), comunicación (documentar con docstrings y README) y colaboración (revisión de código entre pares).',
    lab: 'Laboratorio sugerido en el brainstorm del 24-sep: notebook con dataset, autocomprobación, interpretación y reflexión final.',
    pendiente: 'Acceso a las API de OpenAI y Hugging Face (el AE2 las nombra): quién provee las credenciales de práctica y con qué presupuesto.',
  },
};

const CATALOGO = [
  { id: 'B1', sec: 'V.1', ref: 'Anexo N°7, num. 2', nombre: 'Indicadores de logro',
    cant: (m) => `${m.aprendizajes_esperados.length * 3} indicadores · 3 por cada uno de los ${m.aprendizajes_esperados.length} AE`,
    trae: 'Tabla con cada aprendizaje esperado TEXTUAL del plan y sus 3 indicadores. Fórmula de cada indicador: verbo en presente + contenido + condición.',
    error: 'Reformular o resumir el aprendizaje esperado. Tiene que ir textual.' },
  { id: 'B2', sec: 'V.2', ref: 'Anexo N°7, num. 3, 3.1–3.3', nombre: 'Instrumentos de evaluación',
    cant: () => '3 instrumentos de familias distintas, cada uno con todos los AE',
    trae: 'Cada instrumento desarrollado: ítems o tareas completas, pauta o clave de corrección, puntajes y escala. Una tabla de especificaciones AE × instrumento que muestre la cobertura.',
    error: 'Tres instrumentos de la misma familia, o uno que no cubre todos los AE: baja a 5,0.' },
  { id: 'B3', sec: 'V', ref: 'Anexo N°7, num. 4.3, pág. 103', nombre: 'Portafolio de proyectos',
    cant: () => '6 de 6 elementos, desarrollados',
    trae: '1) Guía o índice con tipo de trabajo y estrategia didáctica · 2) Introducción: intenciones, objetivos, punto de partida · 3) Temas centrales con evidencias por AE · 4) Cierre como síntesis · 5) Plataforma de publicación definida · 6) Instrumento evaluativo asociado, desarrollado. Más la rúbrica adjunta.',
    error: 'Omitir el índice o dejar el instrumento solo enunciado: cada elemento faltante baja la nota (4 de 6 = 5,0).' },
  { id: 'B4', sec: 'V', ref: 'Anexo N°7, num. 5.4', nombre: 'Retroalimentación y aprendizaje colaborativo',
    cant: () => '4 productos',
    trae: 'a) Mecanismo de feedback: qué se devuelve, cuándo y por qué medio · b) Pauta de autoevaluación · c) Pauta de coevaluación · d) Bitácora de registro de resultados y plan de trabajo.',
    error: 'Olvidar la bitácora. Es la pieza que más se omite.' },
  { id: 'C1', sec: 'VI a)', ref: 'Anexo N°7, num. 7', nombre: 'Relación metodología–competencia',
    cant: () => '1 estrategia, anclada a la competencia del módulo · binario',
    trae: 'Respuesta a «¿qué hará?»: la estrategia metodológica del módulo asociada a su competencia textual, con todas sus actividades, horas y si son sincrónicas o asincrónicas.',
    error: 'Un texto genérico que serviría para otro plan formativo: nota 1,0.' },
  { id: 'C2', sec: 'VI b)', ref: 'Anexo N°7, num. 7, pág. 109', nombre: 'Proceso de aprendizaje: actividades prácticas',
    cant: (m) => `2 actividades distintas que juntas cubran los ${m.aprendizajes_esperados.length} AE`,
    trae: 'Por actividad: enunciado, datos o insumos de entrada, producto esperado, respuesta modelada, AE que cubre y tiempo estimado.',
    error: 'Dos variantes de la misma actividad, o actividades que no dan la habilidad.' },
  { id: 'C3', sec: 'VI d)', ref: 'Anexo N°7, num. 7', nombre: 'Aspectos motivacionales',
    cant: () => '1 estrategia visible en el LMS · binario',
    trae: 'Cómo la interacción con la plataforma sostiene la motivación en un curso no presencial.',
    error: 'Describir la motivación sin que se vea en el LMS.' },
  { id: 'C4', sec: 'VI c)', ref: 'Anexo N°7, num. 7', nombre: 'Uso de los medios: herramientas didácticas',
    cant: () => '2 herramientas distintas, ambas efectivas',
    trae: 'Las dos herramientas montadas y visibles en el LMS, cada una con por qué permite adquirir la habilidad. El enlace al LMS va dentro de esta respuesta.',
    error: 'Que solo una sea efectiva: baja a 5,0 aunque haya dos.' },
  { id: 'C5', sec: 'VI e)', ref: 'Anexo N°7, num. 7', nombre: 'Habilidades del siglo XXI',
    cant: () => '3 estrategias para 3 habilidades',
    trae: 'Tabla: habilidad transversal · estrategia para desarrollarla · cómo se evidencia.',
    error: 'Nombrar habilidades sin estrategia ni evidencia.' },
];

function tablaAE(m) {
  return `<table class="t ae"><thead><tr><th style="width:9%">AE</th><th style="width:44%">Aprendizaje esperado (textual)</th><th>Criterios de evaluación del plan</th></tr></thead><tbody>${
    m.aprendizajes_esperados.map((a) => `<tr><td class="k">AE${a.n}</td><td class="up">${esc(a.texto)}</td><td class="up small">${
      a.criterios_evaluacion.map((c) => `<div><b>${esc(c.n ?? '')}</b> ${esc(c.texto)}</div>`).join('')}</td></tr>`).join('')
  }</tbody></table>`;
}

function bloqueEntregable(e, p, m) {
  const s = SUGERENCIAS[p.codigo_plan]?.[e.id];
  let sug = '';
  if (Array.isArray(s)) sug = `<ul class="sug">${s.map(([t, d]) => `<li><b>${esc(t)}.</b> ${esc(d)}</li>`).join('')}</ul>`;
  else if (s) sug = `<p class="sugp">${esc(s)}</p>`;
  return `<section class="ent">
    <header><span class="id">${e.id}</span><h4>${esc(e.nombre)}</h4><span class="peso">${pct(e.id)} de la técnica</span></header>
    <p class="cant"><b>Para el 7,0:</b> ${esc(e.cant(m))}</p>
    <dl>
      <dt>Qué debe traer</dt><dd>${esc(e.trae)}</dd>
      <dt>Dónde va</dt><dd>Anexo N°2, sección ${esc(e.sec)} · ${esc(e.ref)}</dd>
      <dt>Error típico</dt><dd>${esc(e.error)}</dd>
      ${sug ? `<dt>Para este módulo <span class="tag">sugerencia a validar</span></dt><dd>${sug}</dd>` : ''}
    </dl>
  </section>`;
}

function seccionPlan(p) {
  const m = p.modulos[1];
  const u = umbrales[p.codigo_plan];
  const s = SUGERENCIAS[p.codigo_plan] || {};
  const enPlan = herramientasDelPlan(p);
  const nCE = m.aprendizajes_esperados.reduce((t, a) => t + a.criterios_evaluacion.length, 0);
  const cand = CATEGORIAS_D1.map(([cat, xs]) => {
    const libres = xs.filter((x) => !enPlan.includes(x));
    return `<li><b>${cat}:</b> ${libres.length ? libres.join(', ') : '<i>todas ya nombradas en el plan</i>'}</li>`;
  }).join('');
  const rm = m.recursos_materiales;
  return `
  <section class="plan" id="${p.codigo_plan}">
    <p class="eyebrow">${p.codigo_plan} · ${esc(p.nivel ?? '')} · ${esc(p.modalidad ?? '')}</p>
    <h2>${esc(p.nombre)}</h2>
    <div class="kpis">
      <div><b>${p.horas_totales} h</b><span>plan completo</span></div>
      <div><b>${p.modulos.length}</b><span>módulos</span></div>
      <div><b>${m.horas} h</b><span>módulo 2</span></div>
      <div><b>${m.aprendizajes_esperados.length} AE</b><span>${nCE} criterios en el plan</span></div>
      <div><b>${u?.extension_nota7 ?? '?'}</b><span>actividades de extensión</span></div>
    </div>

    <h3>Módulo 2 · <span class="mono">${m.codigo}</span> ${esc(m.nombre)}</h3>
    <p class="label">Competencia del módulo (textual; C1 se evalúa contra esto)</p>
    <blockquote class="up">${esc(m.competencia)}</blockquote>
    ${tablaAE(m)}
    <p class="fuente">Fuente: SIPFOR, plan id ${p.fuente.sipfor_plan_id}, ${esc(p.fuente.resolucion ?? '')} del ${esc(p.fuente.fecha_resolucion ?? '')}, versión ${esc(String(p.fuente.version ?? ''))}. Extraído el ${esc(p.fuente.extraido_utc.slice(0, 10))}.</p>

    <h3 class="brk">A. Contenido del módulo · una vez por curso</h3>
    <p>Lo fija el plan formativo, no el oferente: se produce una vez y sirve a todas las instituciones que presenten el curso.</p>
    ${CATALOGO.map((e) => bloqueEntregable(e, p, m)).join('')}
    ${s.lab ? `<p class="nota"><b>Laboratorio.</b> ${esc(s.lab)} Puede alimentar a la vez C2, C4, los instrumentos y las evidencias del portafolio.</p>` : ''}

    <section class="ent">
      <header><span class="id">III · IV</span><h4>Tutores y actividades de todos los módulos</h4><span class="peso">admisibilidad · insumo de C</span></header>
      <p class="cant"><b>Para el 7,0:</b> los ${p.modulos.length} módulos del plan, no solo el segundo.</p>
      <dl><dt>Qué debe traer</dt><dd>Sección III: un tutor por módulo con su opción de perfil. Sección IV: por módulo, nombre, horas, sincrónica o asincrónica y descripción.</dd></dl>
      <table class="t mods"><thead><tr><th>N°</th><th>Código</th><th>Módulo</th><th class="r">Horas</th><th>Tipo</th></tr></thead><tbody>
        ${p.modulos.map((x) => `<tr class="${x.n === 2 ? 'hl' : ''}"><td>${x.n}</td><td class="mono">${x.codigo}</td><td class="up">${esc(x.nombre)}${x.n === 2 ? ' <b class="ev">← evaluado</b>' : ''}</td><td class="r">${x.horas}</td><td>${x.tipo}</td></tr>`).join('')}
        <tr class="tot"><td></td><td></td><td>Total</td><td class="r">${p.suma_horas_modulos}</td><td></td></tr>
      </tbody></table>
    </section>

    <h3 class="brk">B. Por institución · una vez por cada institución que presente el curso</h3>
    <p>Cambia por institución: plataforma, activos reales y narrativa. El ítem D se desarrolla a lo largo de todo el plan formativo, no solo del módulo 2.</p>

    <section class="ent">
      <header><span class="id">D1</span><h4>Herramientas educativas de la industria</h4><span class="peso">${pct('D1')} de la técnica</span></header>
      <p class="cant"><b>Para el 7,0:</b> 5 o más, <b>adicionales a las que ya nombra el plan</b>, cada una con 3 explicaciones.</p>
      <dl>
        <dt>Qué debe traer</dt><dd>Por herramienta: por qué se seleccionó, cómo se usa en la industria y cómo se usará en clases.</dd>
        <dt>Ya nombradas en el plan</dt><dd>${enPlan.length ? enPlan.map((h) => `<span class="chip">${esc(h)}</span>`).join(' ') : '—'}<br><span class="small muted">Detectadas por nombre en los ${p.modulos.length} módulos. No cuentan para D1: revisar a mano antes de elegir.</span></dd>
        <dt>Categorías de la guía (num. 8.1)</dt><dd><ul class="sug">${cand}</ul></dd>
        <dt>Dónde va</dt><dd>Anexo N°2, sección VII a) · Anexo N°7, num. 8 y 8.1</dd>
      </dl>
    </section>

    <section class="ent">
      <header><span class="id">D2</span><h4>Vinculación temprana con la industria</h4><span class="peso">${pct('D2')} de la técnica</span></header>
      <p class="cant"><b>Para el 7,0:</b> 4 estrategias, cada una con 4 explicaciones.</p>
      <dl>
        <dt>Qué debe traer</dt><dd>Por estrategia: por qué, en qué consiste, cuándo se desarrolla y cómo permite el aprendizaje. Deben estar mediadas por la institución: si hay mentor, se le entrena y se le hace seguimiento.</dd>
        <dt>Ejemplos de la guía</dt><dd>Casos reales, prototipos evaluados por gente de la industria, conversatorios con expertos, visitas guiadas, simulación de entrevistas, proyectos freelance, coach o mentor laboral.</dd>
        <dt>Dónde va</dt><dd>Anexo N°2, sección VII a) · Anexo N°7, num. 9 y 9.1</dd>
      </dl>
    </section>

    <section class="ent">
      <header><span class="id">D3</span><h4>Actividades de extensión</h4><span class="peso">${pct('D3')} de la técnica</span></header>
      <p class="cant"><b>Para el 7,0:</b> ${u?.extension_nota7 ?? '?'} actividades (1 cada 50 h de ${p.horas_totales} h). Con ${u?.extension_nota5 ?? '?'} se obtiene 5,0.</p>
      <dl>
        <dt>Qué debe traer</dt><dd>Por actividad: temática, tipo, objetivo, cantidad y momento de ejecución. Siempre opcionales. Distintas entre instituciones que compiten.</dd>
        <dt>Tipos que da la guía</dt><dd>Charla o webinar, exposición técnica demostrativa, laboratorio, hackatón, visita guiada, taller con especialistas, muestra de proyectos.</dd>
        <dt>Dónde va</dt><dd>Anexo N°2, sección VII b) · Anexo N°7, num. 10</dd>
      </dl>
    </section>

    <section class="ent">
      <header><span class="id">A</span><h4>Infraestructura y equipos</h4><span class="peso">${pct('A1')} de la técnica</span></header>
      <p class="cant"><b>Para el 7,0:</b> infraestructura <b>con</b> equipos computacionales. Solo equipos = 5,0.</p>
      <dl>
        <dt>Mínimo que fija el módulo 2</dt><dd class="up small">${rm.equipos_y_herramientas.map(esc).join('<br>')}</dd>
        <dt>Condiciones</dt><dd>Equipos en comodato gratuito durante el curso, con carta o correo de compromiso de devolución.</dd>
        <dt>Dónde va</dt><dd>Anexo N°2, sección X</dd>
      </dl>
    </section>

    <section class="ent crit">
      <header><span class="id">VIII</span><h4>LMS, evidencia y materiales virtuales</h4><span class="peso">habilita el ítem C (35 %)</span></header>
      <p class="cant"><b>Obligatorio:</b> el módulo 2 montado y navegable desde el perfil de participante.</p>
      <dl>
        <dt>Qué debe traer</dt><dd>a) enlace al LMS · b) datos de acceso para evaluadores (nunca en el repo) · c) paso a paso de acceso y navegación · d) imágenes o video del LMS · e) softwares entregados · f) correo y almacenamiento en nube de al menos 12 GB por participante.</dd>
        <dt>Causal de rechazo</dt><dd>Si la revisión del LMS difiere de la evidencia adjunta, el curso se rechaza por requisitos de curso (Anexo N°2, sección VIII, pág. 91). La evidencia se graba navegando el LMS real.</dd>
        ${s.pendiente ? `<dt>Pendiente de decidir</dt><dd>${esc(s.pendiente)}</dd>` : ''}
      </dl>
    </section>

    <section class="ent">
      <header><span class="id">V</span><h4>Portafolio publicado y narrativa propia</h4><span class="peso">ver B3 · C y D</span></header>
      <dl>
        <dt>Portafolio</dt><dd>La sección V pide el <b>enlace</b> al portafolio y la rúbrica adjunta: tiene que existir y ser visitable antes del cierre.</dd>
        <dt>Narrativa</dt><dd>Los ítems C y D se redactan con los activos reales de la institución (su ficha de cliente). Dos propuestas gemelas perjudican a las dos.</dd>
      </dl>
    </section>
  </section>`;
}

function checklist() {
  const filas = [
    ['B1', 'Indicadores de logro, 3 por AE'], ['B2', '3 instrumentos de familias distintas'], ['B3', 'Portafolio, 6 de 6 elementos'],
    ['B4', 'Feedback, auto, coevaluación y bitácora'], ['C1', 'Metodología anclada a la competencia'], ['C2', '2 actividades con respuesta modelada'],
    ['C3', 'Motivación vía plataforma'], ['C4', '2 herramientas didácticas efectivas'], ['C5', '3 estrategias siglo XXI'],
    ['III·IV', 'Tutores y actividades de todos los módulos'], ['D1', '5 herramientas de industria adicionales'], ['D2', '4 estrategias de vinculación'],
    ['D3', 'Actividades de extensión'], ['A', 'Infraestructura con equipos'], ['VIII', 'LMS navegable + evidencia idéntica + correo y nube'],
    ['V', 'Portafolio publicado en URL'], ['QA', 'Tres controles: rúbrica, diferenciación, verificadores vivos'],
  ];
  const cant = (id, p) => {
    const m = p.modulos[1];
    if (id === 'B1') return `${m.aprendizajes_esperados.length * 3}`;
    if (id === 'D3') return umbrales[p.codigo_plan]?.extension_nota7 ?? '?';
    if (id === 'III·IV') return `${p.modulos.length} mód.`;
    return '';
  };
  return `<section class="check brk">
    <p class="eyebrow">Para imprimir y marcar</p>
    <h2>Checklist del módulo 2</h2>
    <p>Se marca cuando el entregable está <b>revisado</b>, no cuando existe el borrador. Las columnas por institución se repiten para cada una que presente el curso.</p>
    <table class="t ck"><thead><tr><th>Id</th><th>Entregable</th>${planes.map((p) => `<th class="c">${p.codigo_plan}</th>`).join('')}</tr></thead><tbody>
      ${filas.map(([id, t], i) => `${i === 10 ? `<tr class="sep"><td colspan="${2 + planes.length}">Por institución</td></tr>` : i === 0 ? `<tr class="sep"><td colspan="${2 + planes.length}">Contenido del módulo · una vez por curso</td></tr>` : ''}<tr><td class="k">${id}</td><td>${t}</td>${planes.map((p) => `<td class="c"><span class="box"></span>${cant(id, p) ? ` <span class="small muted">${cant(id, p)}</span>` : ''}</td>`).join('')}</tr>`).join('')}
    </tbody></table>
  </section>`;
}

function html() {
  const hoy = new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
  const resumen = `<table class="t res"><thead><tr><th></th>${planes.map((p) => `<th>${p.codigo_plan}<br><span class="thin">${esc(p.nombre)}</span></th>`).join('')}</tr></thead><tbody>
    <tr><td>Módulo 2</td>${planes.map((p) => `<td><span class="mono">${p.modulos[1].codigo}</span> ${esc(p.modulos[1].nombre)} · <b>${p.modulos[1].horas} h</b></td>`).join('')}</tr>
    <tr><td>Aprendizajes esperados</td>${planes.map((p) => `<td>${p.modulos[1].aprendizajes_esperados.length} AE · ${p.modulos[1].aprendizajes_esperados.reduce((t, a) => t + a.criterios_evaluacion.length, 0)} criterios en el plan</td>`).join('')}</tr>
    <tr><td>B1 · indicadores</td>${planes.map((p) => `<td><b>${p.modulos[1].aprendizajes_esperados.length * 3}</b></td>`).join('')}</tr>
    <tr><td>B2 · instrumentos</td>${planes.map(() => '<td><b>3</b> de familias distintas</td>').join('')}</tr>
    <tr><td>B3 · portafolio</td>${planes.map(() => '<td><b>6 de 6</b> elementos + URL + rúbrica</td>').join('')}</tr>
    <tr><td>B4 · retroalimentación</td>${planes.map(() => '<td><b>4</b> productos, bitácora incluida</td>').join('')}</tr>
    <tr><td>C2 · actividades prácticas</td>${planes.map(() => '<td><b>2</b> con respuesta modelada</td>').join('')}</tr>
    <tr><td>C4 · herramientas didácticas</td>${planes.map(() => '<td><b>2</b>, ambas efectivas</td>').join('')}</tr>
    <tr><td>C5 · siglo XXI</td>${planes.map(() => '<td><b>3</b> estrategias</td>').join('')}</tr>
    <tr><td>III · IV · módulos a listar</td>${planes.map((p) => `<td><b>${p.modulos.length}</b> módulos · ${p.horas_totales} h</td>`).join('')}</tr>
    <tr><td>D1 · D2 (por institución)</td>${planes.map(() => '<td><b>5</b> herramientas · <b>4</b> estrategias</td>').join('')}</tr>
    <tr><td>D3 · extensión (por institución)</td>${planes.map((p) => `<td><b>${umbrales[p.codigo_plan]?.extension_nota7 ?? '?'}</b> actividades</td>`).join('')}</tr>
  </tbody></table>`;

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<title>Manual de entregables del módulo 2 · ${codigos.join(' y ')}</title>
<style>
  @page { size: A4; margin: 18mm 17mm 20mm; @bottom-left { content: "Manual de entregables del módulo 2 · ${codigos.join(' · ')}"; font: 8pt 'Segoe UI', Arial, sans-serif; color: #6b7a8c; } @bottom-right { content: counter(page) " / " counter(pages); font: 8pt 'Segoe UI', Arial, sans-serif; color: #6b7a8c; } }
  @page :first { margin: 0; @bottom-left { content: none } @bottom-right { content: none } }
  :root { --navy:#13233a; --blue:#1f4e79; --ink:#1b2430; --ink2:#4a5868; --line:#d4dbe3; --zebra:#f4f6f9; --crit:#8f1d1d; --critbg:#fbefee; --hl:#e8f0f8; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; color: var(--ink); font: 10pt/1.5 Georgia, 'Times New Roman', serif; }
  h1,h2,h3,h4,.eyebrow,.kpis,.t,.ent header,.label,.chip,.tag,.cant,dt { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; }
  h2 { font-size: 19pt; color: var(--navy); margin: 0 0 10pt; line-height: 1.15; border-bottom: 2pt solid var(--blue); padding-bottom: 6pt; }
  h3 { font-size: 13pt; color: var(--navy); margin: 18pt 0 6pt; }
  h4 { margin: 0; font-size: 11pt; color: var(--navy); }
  p { margin: 0 0 7pt; }
  .brk { break-before: page; }
  .eyebrow { text-transform: uppercase; letter-spacing: .12em; font-size: 8pt; color: var(--blue); margin: 0 0 4pt; font-weight: 600; }
  .mono { font-family: Consolas, 'Courier New', monospace; font-size: .92em; }
  .up { text-transform: none; }
  .small { font-size: 8.6pt; } .muted { color: var(--ink2); }
  .cover { height: 296mm; overflow: hidden; padding: 30mm 24mm 22mm; background: linear-gradient(160deg, #13233a 0%, #1c3d63 70%, #1f4e79 100%); color: #fff; display: flex; flex-direction: column; }
  .cover .eyebrow { color: #9fc3e6; }
  .cover h1 { font-size: 34pt; line-height: 1.08; margin: 18mm 0 6mm; font-weight: 600; }
  .cover .rule { width: 34mm; height: 2pt; background: #6fa8dc; margin-bottom: 8mm; }
  .cover .sub { font-style: italic; font-size: 13pt; color: #dce8f4; max-width: 140mm; }
  .cover .cursos { margin-top: 14mm; display: grid; gap: 5mm; }
  .cover .cursos div { border-left: 2pt solid #6fa8dc; padding: 1mm 0 1mm 5mm; font-family: 'Segoe UI', Arial, sans-serif; }
  .cover .cursos b { display: block; font-size: 12pt; } .cover .cursos span { font-size: 9.5pt; color: #cfe0f1; }
  .cover .meta { margin-top: auto; font-family: 'Segoe UI', Arial, sans-serif; font-size: 9.5pt; color: #dce8f4; line-height: 1.8; }
  .cover .meta b { color: #fff; }
  .cover .foot { border-top: .6pt solid #5d7fa3; margin-top: 8mm; padding-top: 4mm; font-family: 'Segoe UI', Arial, sans-serif; font-size: 8.5pt; color: #b9cde2; }
  .callout { border-left: 3pt solid var(--blue); background: var(--zebra); padding: 6pt 10pt; margin: 7pt 0; break-inside: avoid; }
  .callout p:last-child { margin-bottom: 0; }
  .callout.crit { border-color: var(--crit); background: var(--critbg); }
  .callout .label { color: var(--blue); } .callout.crit .label { color: var(--crit); }
  .label { text-transform: uppercase; letter-spacing: .08em; font-size: 7.8pt; font-weight: 700; color: var(--blue); margin: 0 0 3pt; }
  .t { width: 100%; border-collapse: collapse; font-size: 8.8pt; margin: 6pt 0 10pt; line-height: 1.35; }
  .t th { background: var(--navy); color: #fff; text-align: left; font-weight: 600; padding: 5pt 6pt; vertical-align: bottom; }
  .t td { padding: 5pt 6pt; border-bottom: .6pt solid var(--line); vertical-align: top; }
  .t tbody tr:nth-child(even) td { background: var(--zebra); }
  .t .k { font-weight: 700; color: var(--navy); white-space: nowrap; }
  .t .r { text-align: right; } .t .c { text-align: center; white-space: nowrap; }
  .t .thin { font-weight: 400; font-size: 8pt; color: #cbd8e6; }
  .t tr.hl td { background: var(--hl) !important; } .t tr.tot td { font-weight: 700; border-top: 1pt solid var(--navy); }
  .t .ev { color: var(--blue); font-family: 'Segoe UI', Arial, sans-serif; font-size: 8pt; }
  .t.res td:first-child { font-weight: 600; color: var(--navy); width: 26%; }
  .t.ae td div { margin-bottom: 2pt; }
  .t tr { break-inside: avoid; }
  .kpis { display: grid; grid-template-columns: repeat(5, 1fr); border-top: .6pt solid var(--line); border-bottom: .6pt solid var(--line); margin: 4pt 0 10pt; }
  .kpis div { padding: 7pt 8pt; border-left: .6pt solid var(--line); } .kpis div:first-child { border-left: 0; padding-left: 0; }
  .kpis b { display: block; font-size: 15pt; color: var(--navy); } .kpis span { font-size: 8pt; color: var(--ink2); }
  blockquote { margin: 3pt 0 8pt; padding: 6pt 10pt; border-left: 3pt solid var(--navy); background: var(--hl); font-size: 9.4pt; }
  .fuente { font-size: 8pt; color: var(--ink2); }
  .ent { border: .6pt solid var(--line); border-radius: 3pt; padding: 8pt 10pt 4pt; margin: 0 0 8pt; break-inside: avoid; }
  .ent.crit { border-color: #e2b4b0; background: var(--critbg); }
  .ent header { display: flex; align-items: baseline; gap: 8pt; margin-bottom: 4pt; }
  .ent .id { background: var(--navy); color: #fff; font-weight: 700; font-size: 8.5pt; padding: 1pt 6pt; border-radius: 2pt; white-space: nowrap; }
  .ent.crit .id { background: var(--crit); }
  .ent .peso { margin-left: auto; font-size: 8pt; color: var(--ink2); white-space: nowrap; }
  .ent .cant { font-size: 9.2pt; margin: 0 0 4pt; }
  .ent dl { display: grid; grid-template-columns: 30mm 1fr; gap: 3pt 10pt; margin: 0 0 4pt; }
  .ent dt { font-size: 8pt; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: .04em; padding-top: 1.5pt; }
  .ent dd { margin: 0; font-size: 9.2pt; }
  .tag { display: inline-block; font-size: 6.8pt; font-weight: 600; letter-spacing: .03em; text-transform: uppercase; color: #7a5a00; background: #fff4d6; border-radius: 2pt; padding: 0 3pt; }
  .sug { margin: 0; padding-left: 12pt; } .sug li { margin-bottom: 2pt; } .sugp { margin: 0; }
  .chip { display: inline-block; font-size: 7.8pt; background: var(--zebra); border: .5pt solid var(--line); border-radius: 2pt; padding: 0 4pt; margin: 0 1pt 2pt 0; }
  .nota { font-size: 9pt; background: var(--zebra); padding: 6pt 9pt; border-radius: 3pt; }
  .t.ck td { padding: 6pt; } .t.ck tr.sep td { background: var(--hl) !important; font-family: 'Segoe UI', Arial, sans-serif; font-weight: 700; color: var(--navy); font-size: 8.4pt; text-transform: uppercase; letter-spacing: .05em; }
  .box { display: inline-block; width: 9pt; height: 9pt; border: 1pt solid var(--navy); vertical-align: -1pt; }
  .t.mods td { font-size: 8.4pt; }
  ol.flujo { padding-left: 14pt; } ol.flujo li { margin-bottom: 4pt; }
</style></head><body>

<section class="cover">
  <p class="eyebrow">Becas Laborales · Talento Digital 2026</p>
  <h1>Manual de entregables<br>del módulo 2</h1>
  <div class="rule"></div>
  <p class="sub">Qué hay que producir, en qué cantidad, qué debe traer cada pieza y dónde va en el Anexo N°2, curso por curso.</p>
  <div class="cursos">${planes.map((p) => `<div><b>${p.codigo_plan} · ${esc(p.nombre)}</b><span>Módulo 2: ${p.modulos[1].codigo} ${esc(p.modulos[1].nombre)} · ${p.modulos[1].horas} h · ${p.horas_totales} h el plan</span></div>`).join('')}</div>
  <div class="meta">
    <b>Para:</b> Natalia — hackea.pro<br>
    <b>Fecha:</b> ${hoy}<br>
    <b>Fuentes:</b> planes formativos en SIPFOR (Res. ${esc(planes[0].fuente.resolucion?.replace('Res. ', '') ?? '')}, ${esc(planes[0].fuente.fecha_resolucion ?? '')}) · Res. Ex. N°2320, punto 7.4 y Anexos N°2 y N°7
  </div>
  <p class="foot">Documento de trabajo generado desde el repositorio del proyecto (npm run manual). Los aprendizajes, criterios, competencias y recursos son textuales de SIPFOR; las sugerencias por módulo están marcadas y se validan antes de producir.</p>
</section>

<section>
  <p class="eyebrow">Resumen</p>
  <h2>Lo que hay que entregar, de un vistazo</h2>
  ${resumen}
  <div class="callout"><p class="label">Qué se evalúa</p><p>La propuesta técnica se desarrolla sobre el <b>segundo módulo</b> del plan formativo (bases 2026, punto 7.4). Pesa 10 % infraestructura, 20 % estrategia evaluativa (B), 35 % metodología (C) y 35 % herramientas y valor agregado (D). El ítem D se desarrolla a lo largo de todo el plan.</p></div>
  <div class="callout"><p class="label">Desarrollado, no descrito · y textual</p><p>El portafolio y el instrumento evaluativo deben estar desarrollados, no solo enunciados (Anexo N°7, num. 4.3, pág. 103). La metodología se evalúa por la experiencia del usuario en el LMS (punto 7.4): se construye, no se describe. Los aprendizajes esperados van tal como están en SIPFOR, sin reformular; este manual los reproduce así.</p></div>
  <div class="callout crit"><p class="label">El único rechazo automático</p><p>Si la revisión del LMS difiere de la evidencia adjunta, el curso se rechaza por requisitos de curso (Anexo N°2, sección VIII, pág. 91). No hay rectificación.</p></div>
</section>

<section class="brk">
  <p class="eyebrow">Cómo se produce</p>
  <h2>El flujo para cada curso</h2>
  <ol class="flujo">
    <li><b>Extraer el plan de SIPFOR.</b> <span class="mono">npm run sipfor -- PF1821 PF1822</span>. Hecho el 24-sep para estos dos cursos.</li>
    <li><b>Generar la ficha y la lista de entregables.</b> <span class="mono">npm run ficha -- PF1821 PF1822</span> deja en <span class="mono">contenidos/&lt;PF&gt;/modulo-2/</span> la ficha textual y las cantidades del 7,0. Hecho.</li>
    <li><b>Producir el contenido del módulo</b>, un archivo por entregable, en este orden: B1 → C2 → B2 → B3 → B4 → C4 → C1, C3 y C5 → III y IV. Cada pieza se apoya en la anterior: los indicadores miden, las actividades producen evidencia, los instrumentos la evalúan y el portafolio la recoge.</li>
    <li><b>Revisión de Natalia</b> y marca en la checklist.</li>
    <li><b>Instanciar por institución</b>: D1, D2, D3, infraestructura, narrativa, LMS, portafolio publicado y evidencia; luego los tres controles de calidad.</li>
  </ol>
  <h3>Qué es de cada nivel</h3>
  <table class="t"><thead><tr><th>Nivel</th><th>Se produce</th><th>Entregables</th></tr></thead><tbody>
    <tr><td class="k">Curso</td><td>Una vez por plan formativo</td><td>B1, B2, B3 (base), B4, C1–C5, III y IV</td></tr>
    <tr><td class="k">Institución × curso</td><td>Una vez por cada institución que lo presente</td><td>D1, D2, D3, A, VIII (LMS y evidencia), V (portafolio publicado), narrativa</td></tr>
  </tbody></table>
  <h3>Supuestos y preguntas abiertas que afectan este manual</h3>
  <ul>
    <li><b>¿Solo el segundo módulo o todos?</b> El punto 7.4 pide el segundo y el numeral 4.3.1.1 dice que se evalúan todos. Se trabaja con el segundo; la consulta formal a SENCE está pendiente.</li>
    <li><b>¿Cómo se cuenta el segundo módulo?</b> Los dos planes empiezan con un módulo transversal de orientación (MB00171, 12 h). Aquí se cuenta sobre todos los módulos, en el orden de SIPFOR: el segundo es el primer módulo técnico. Falta confirmarlo con el PDF oficial de cada plan.</li>
    <li><b>¿Qué instituciones presentan cada curso y en qué LMS?</b> Define cuántas veces se repite la parte B.</li>
    <li><b>Fichas de cliente sin levantar.</b> Sin activos reales, la parte B no se puede diferenciar.</li>
  </ul>
</section>

${planes.map((p) => `<div class="brk"></div>${seccionPlan(p)}`).join('')}

${checklist()}

</body></html>`;
}

const dir = salida.replace(/\/+$/, '');
const base = `manual-entregables-modulo2-${codigos.join('-')}`;
const htmlRel = escribir(`${dir}/${base}.html`, html());
console.log(`HTML → ${htmlRel}`);

if (conPdf) {
  try {
    const kb = imprimirPdf(htmlRel, `${dir}/${base}.pdf`);
    console.log(`PDF  → ${dir}/${base}.pdf (${kb} KB)`);
  } catch (e) { console.error(e.message); process.exit(1); }
}
