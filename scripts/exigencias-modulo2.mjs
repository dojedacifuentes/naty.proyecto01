#!/usr/bin/env node
/**
 * Qué exige 2026 del módulo 2 de cada curso, sistematizado: cada aprendizaje esperado y criterio leído como verbo +
 * objeto + condición (Anexo 7, pág. 99), con el verbo destacado y su nivel, qué tiene que demostrar el participante,
 * qué necesita un recurso para servir, las herramientas y el material que exige el plan, las cantidades que exigen las
 * bases para el 7,0 y qué cambió desde 2024. Deja columnas para anotar qué recurso de años anteriores sirve.
 *
 *   npm run exigencias              planillas y PDF
 *   npm run exigencias -- --sin-pdf solo las planillas
 *
 * Salidas:
 *   entregables/2026-09-30-exigencias-modulo2/Exigencias-Modulo2-2026.xlsx y .pdf (+ .html)   versión pública (repo)
 *   privado/drive/Exigencias-Modulo2-2026-con-enlaces.xlsx     con las carpetas de Drive de 2024 y los Anexos 2 de referencia
 *   privado/drive/Hoja-Exigencias-2026-M2.xlsx                 una sola hoja, para importarla en la planilla de seguimiento
 *
 * Datos: data/planes/<PF>.json (npm run sipfor), data/planes-formativos.csv, data/umbrales-por-plan.csv,
 * data/rubrica-subcriterios.csv, data/verbos-bloom.csv, data/modulo2-cambios-2024-2026.csv y, si existe,
 * privado/drive/recursos-2024.json.
 */
import fs from 'node:fs';
import path from 'node:path';
import { ruta, leer, RAIZ } from './lib/repo.mjs';
import { parseCSV } from './lib/csv.mjs';
import { crearXlsx } from './lib/xlsx.mjs';
import { analizar, NIVELES } from './lib/verbos.mjs';
import { estilos } from './lib/lectura.mjs';
import { imprimirPdf } from './lib/pdf.mjs';

const SIN_PDF = process.argv.includes('--sin-pdf');
const DIR = 'entregables/2026-09-30-exigencias-modulo2';
const oferta = parseCSV(leer('data/planes-formativos.csv'));
const umbrales = Object.fromEntries(parseCSV(leer('data/umbrales-por-plan.csv')).map((u) => [u.codigo_plan, u]));
const rubrica = Object.fromEntries(parseCSV(leer('data/rubrica-subcriterios.csv')).map((r) => [r.id, r]));
const cambios = parseCSV(leer('data/modulo2-cambios-2024-2026.csv'));
const recursos = fs.existsSync(ruta('privado/drive/recursos-2024.json')) ? JSON.parse(leer('privado/drive/recursos-2024.json')) : null;
const referenciales = (() => {
  const padre = path.dirname(RAIZ);
  for (const d of fs.readdirSync(padre)) {
    const c = path.join(padre, d, 'Licitaciones TD 2026', 'Anexos 2 Referenciales');
    if (d.startsWith('Licitaciones TD 2026') && fs.existsSync(c)) return fs.readdirSync(c);
  }
  return [];
})();
const plano = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
const NUEVOS = ['PF1821', 'PF1822'];

// ------------------------------------------------------------ qué pide cada nivel (lectura nuestra, no de las bases)

const GUIA = {
  1: { demuestra: 'Reconoce, nombra o define lo que pide el criterio.',
    recurso: 'Lectura, infografía o cápsula con los conceptos, y preguntas de reconocimiento (quiz).',
    instrumento: 'Prueba objetiva: selección múltiple (Anexo 7, 3.3).', basta: 'Sí, si cubre el contenido', estado: 'ok' },
  2: { demuestra: 'Lo explica con sus palabras, lo describe, lo compara o da ejemplos.',
    recurso: 'Explicación con ejemplos del trabajo real, cuadro comparativo o video, y preguntas abiertas.',
    instrumento: 'Respuesta breve o ejercicio interpretativo (3.3); lista de cotejo (3.1).', basta: 'Sí, si cubre el contenido', estado: 'ok' },
  3: { demuestra: 'Lo usa o lo ejecuta en un ejercicio y llega a un resultado que funciona.',
    recurso: 'Tutorial o demostración paso a paso en la herramienta, y un ejercicio con archivo de partida y solución.',
    instrumento: 'Resolución de problemas (3.2) con lista de cotejo o rúbrica.', basta: 'Solo de apoyo: falta la práctica', estado: 'pend' },
  4: { demuestra: 'Descompone un caso o un conjunto de datos, compara alternativas y justifica.',
    recurso: 'Caso o datos realistas con una guía de análisis.',
    instrumento: 'Análisis de casos (3.2) con rúbrica.', basta: 'No: necesita un caso o datos', estado: 'subir' },
  5: { demuestra: 'Juzga con criterios explícitos y fundamenta una decisión o recomendación.',
    recurso: 'Caso con alternativas, criterios para evaluarlas y un ejemplo de informe.',
    instrumento: 'Análisis de casos o proyecto (3.2) con rúbrica.', basta: 'No: necesita un caso con criterios', estado: 'subir' },
  6: { demuestra: 'Produce algo propio (código, workflow, prompt, propuesta, tablero) que responde a un requerimiento.',
    recurso: 'Enunciado del requerimiento, un ejemplo resuelto y la rúbrica del producto.',
    instrumento: 'Proyecto individual o grupal (3.2) con rúbrica; va al portafolio.', basta: 'No: necesita un proyecto', estado: 'subir' },
};

// ------------------------------------------------------------ herramientas y tecnologías que nombra el plan

const HERRAMIENTAS = [
  ['Python', /\bPYTHON\b/], ['HTML', /\bHTML5?\b/], ['CSS', /\bCSS\b/], ['JavaScript', /\bJAVASCRIPT\b/],
  ['Bootstrap', /\bBOOTSTRAP\b/], ['jQuery', /\bJQUERY\b/], ['Git', /\bGIT\b/], ['GitHub', /\bGITHUB\b/],
  ['Markdown', /\bMARKDOWN\b/], ['Visual Studio Code', /VISUAL (STUDIO|ESTUDIO) CODE/],
  ['herramientas del navegador (inspector, consola)', /INSPECTOR DE ELEMENTOS|HERRAMIENTAS PARA DESARROLLADORES|CONSOLA JAVASCRIPT/],
  ['Excel', /\bEXCEL\b/], ['Power Pivot', /POWER PIVOT/], ['Power View', /POWER VIEW/],
  ['NumPy', /\bNUMPY\b/], ['pandas', /\bPANDAS\b/], ['Dask', /\bDASK\b/], ['Numba', /\bNUMBA\b/],
  ['Anaconda', /\bANACONDA\b/], ['Spyder', /\bSPYDER\b/], ['Jupyter', /\bJUPYTER/], ['Google Colab', /\bCOLL?AB\b/],
  ['profiling', /PROFILING/], ['logging', /\bLOGGING\b/], ['notación Big O', /BIG O\b/],
  ['UML', /\bUML\b|UNIFIED MODELING LANGUAGE/], ['modelo C4', /\bC4\b/], ['AWS Well-Architected', /WELL ARCHITECTED/],
  ['Google SRE', /SITE RELIABILITY|GOOGLE SER\b/], ['Scrum', /\bSCRUM\b/], ['Manifiesto Ágil', /MANIFIESTO AGIL/],
  ['CALMS', /\bCALMS\b/], ['DASA', /\bDASA\b|DEVOPS AGILE SKILL/], ['DevSecOps', /DEVSECOPS/],
  ['IaaS, PaaS, SaaS, FaaS', /\bIAAS\b|\bPAAS\b|\bFAAS\b/], ['GDPR', /\bGDPR\b/], ['HIPAA', /\bHIPAA\b/],
  ['PCI-DSS', /PCI.DSS/], ['ISO/IEC 27001', /27001/], ['NIST SP 800-53', /\bNIST\b/], ['OWASP', /\bOWASP\b/],
  ['PTES', /PENETRATION TESTING EXECUTION STANDARD/], ['EC-Council', /EC.COUNCIL/], ['SANS', /\bSANS\b/],
  ['n8n', /\bN8N\b/], ['Supabase', /SUPABASE/], ['JSON', /\bJSON\b/], ['CSV', /\bCSV\b/], ['XML', /\bXML\b/],
  ['OpenAI API', /\bOPENAI\b/], ['Hugging Face', /HUGGING FACE/], ['TensorFlow', /TENSORFLOW/], ['PyTorch', /PYTORCH/],
  ['LangChain', /LANGCHAIN/], ['Diffusers', /DIFFUSERS/], ['requests', /(?<!PULL )\bREQUESTS\b/], ['httpx', /\bHTTPX\b/],
  ['spaCy', /\bSPACY\b/], ['NLTK', /\bNLTK\b/], ['CountVectorizer y TF-IDF', /COUNTVECTORIZER|TF.IDF/],
  ['BLEU y ROUGE', /\bBLEU\b|\bROUGE\b/], ['docstrings', /DOCSTRING/], ['PEP 8', /\bPEP ?8\b/],
  ['pruebas unitarias', /PRUEBAS UNITARIAS/],
];
const herramientas = (...textos) => { const t = plano(textos.join(' ')); return HERRAMIENTAS.filter(([, re]) => re.test(t)).map(([n]) => n); };

// ------------------------------------------------------------ recursos materiales del plan (lo que corre en e-learning)

function secciones(lista = []) {
  const items = [];
  let sec = 'general';
  for (let raw of lista) {
    raw = raw.replace(/\s+/g, ' ').trim();
    if (!raw) continue;
    const m = raw.match(/^MODALIDAD ([^:]+?)\s*:\s*(.*)$/);
    if (m) { sec = /E-LEARNING/.test(m[1]) ? 'elearning' : 'presencial'; if (m[2]) items.push([sec, m[2]]); continue; }
    const prev = items[items.length - 1];
    if (prev && prev[0] === sec && !/[.:)]$/.test(prev[1])) prev[1] += ` ${raw}`; else items.push([sec, raw]);
  }
  return items;
}
function recursosPlan(m) {
  const rm = m.recursos_materiales ?? {};
  const eq = secciones(rm.equipos_y_herramientas), mat = secciones(rm.materiales_e_insumos);
  const equipo = [...eq, ...secciones(rm.infraestructura)].map(([, t]) => t).find((t) => /UNO (PARA CADA|POR) PARTICIPANTE/.test(t)) ?? '';
  const software = eq.filter(([s, t]) => s !== 'presencial' && !/UNO (PARA CADA|POR) PARTICIPANTE/.test(t)).map(([, t]) => t.replace(/\.$/, ''));
  const material = mat.filter(([s, t]) => s !== 'presencial' && /DIGITAL|ELECTR[OÓ]NICO|AUDIOVISUAL|MANUAL|CASOS PR[AÁ]CTICOS|DOCUMENTACI[OÓ]N|PAUTAS/.test(t))
    .map(([, t]) => t.replace(/\.$/, ''));
  return { equipo: equipo.replace(/\.$/, ''), software, material };
}

// ------------------------------------------------------------ cambios respecto de 2024

const cambiosDe = (pf) => cambios.filter((c) => c.planes.split(/\s+/).includes(pf) || (c.planes.startsWith('Los 13') && !NUEVOS.includes(pf)));
function cambio(pf, elemento) {
  if (NUEVOS.includes(pf)) return { texto: 'Plan nuevo 2026', estado: 'subir' };
  const c = cambiosDe(pf).find((x) => elemento(x.elemento));
  return c ? { texto: `${c.tipo}. ${c.efecto_en_recursos}`, estado: 'pend' } : { texto: 'Igual que en 2024', estado: 'ok' };
}
const esAE = (n) => (e) => e === `AE${n}`;
const esCriterio = (n) => (e) => /^Criterios? /.test(e) && e.match(/\d+\.\d+/g)?.includes(n);
const esContenido = (n) => (e) => e === `Contenidos del AE${n}`;

// ------------------------------------------------------------ modelo: un curso por módulo 2 distinto

const NOMBRE_HOJA = {
  PF1481: 'PF1481 Análisis de Datos', PF1483: 'PF1483 Ciencia de Datos', PF1462: 'PF1462 Machine Learning',
  PF1487: 'PF1487 Ingeniería de Datos', PF1486: 'PF1486 Product Owner', PF1485: 'PF1485 DevOps',
  PF1493: 'PF1493 Seguridad Cloud', PF1495: 'PF1495 Hacking Ético', PF1482: 'PF1482 Arquitectura Cloud',
  PF1822: 'PF1822 Desarrollo con IA', PF1821: 'PF1821 Agentes Low Code',
};
const planes = oferta.map((o) => ({ o, j: JSON.parse(leer(`data/planes/${o.codigo_plan}.json`)) }));
const porModulo = new Map();
for (const p of planes) (porModulo.get(p.j.modulos[1].codigo) ?? porModulo.set(p.j.modulos[1].codigo, []).get(p.j.modulos[1].codigo)).push(p);
const contenidosTexto = (ae) => ae.contenidos.map((c) => [c.tema, ...c.items.map((i) => `  • ${i}`)].join('\n')).join('\n');

const cursos = [...porModulo.values()].map((ps) => {
  const { j } = ps[0];
  const pf = j.codigo_plan, m2 = j.modulos[1];
  const codigos = ps.map((p) => p.j.codigo_plan).sort();
  const comp = analizar(m2.competencia);
  const aes = m2.aprendizajes_esperados.map((ae) => {
    const cc = cambiosDe(pf).find((c) => esContenido(ae.n)(c.elemento));
    return {
      n: ae.n, a: analizar(ae.texto), contenidos: contenidosTexto(ae),
      herramientas: herramientas(ae.texto, ...ae.criterios_evaluacion.map((c) => c.texto), contenidosTexto(ae)),
      cambio: cambio(pf, esAE(ae.n)), cambioContenidos: cc ? `${cc.tipo}. ${cc.efecto_en_recursos}` : '',
      criterios: ae.criterios_evaluacion.map((c) => ({ n: c.n, a: analizar(c.texto), herramientas: herramientas(c.texto), cambio: cambio(pf, esCriterio(c.n)) })),
    };
  });
  const criterios = aes.flatMap((ae) => ae.criterios);
  const niveles = [comp, ...aes.map((x) => x.a), ...criterios.map((c) => c.a)].map((a) => a.nivel);
  const cs = cambiosDe(pf).filter((c) => c.elemento !== 'Modalidad');
  return {
    pf, codigos, planes: ps, j, m2, comp, aes, criterios,
    hoja: codigos.length > 1 ? `${codigos[0]}-${codigos.slice(1).map((c) => c.slice(4)).join('-')} Front-End` : NOMBRE_HOJA[pf],
    nombre: codigos.length > 1 ? 'Desarrollo de Aplicaciones (Front-End, Full Stack Java, JavaScript y Python) · Entry level' : j.nombre,
    max: Math.max(...niveles),
    hacer: criterios.filter((c) => c.a.nivel >= 3).length,
    sinCondicion: criterios.filter((c) => !c.a.condicion).length,
    pocos: aes.filter((ae) => ae.criterios.length < 3),
    herramientas: herramientas(m2.competencia, ...m2.aprendizajes_esperados.flatMap((ae) => [ae.texto, ...ae.criterios_evaluacion.map((c) => c.texto), contenidosTexto(ae)])),
    recursos: recursosPlan(m2),
    nuevo: NUEVOS.includes(pf),
    estado2024: NUEVOS.includes(pf) ? { texto: 'Plan nuevo 2026: no existía en 2024', estado: 'subir' }
      : cs.some((c) => !/^(Errata|Forma verbal)/.test(c.tipo)) ? { texto: `Mismo módulo; ${cs.length} cambios de redacción`, estado: 'pend' }
        : { texto: cs.length ? 'Mismo módulo (solo erratas)' : 'Mismo módulo, sin cambios', estado: 'ok' },
  };
});
const hojaDePlan = (pf) => cursos.find((c) => c.codigos.includes(pf)).hoja;

// ------------------------------------------------------------ qué exigen las bases (igual para los 15)

const pct = (id) => `${(Number(rubrica[id].peso_en_tecnica) * 100).toLocaleString('es-CL', { maximumFractionDigits: 1 })}% de la técnica · ${
  (Number(rubrica[id].peso_nota_final) * 100).toLocaleString('es-CL', { maximumFractionDigits: 1 })}% de la nota final`;
const BASES = [
  { item: 'General', peso: '—', exige: 'Se desarrolla y se evalúa el segundo módulo del plan formativo', siete: '—', donde: 'Bases 2026, 7.4, pág. 27; 7.4 B, pág. 27; 7.4 C, pág. 30',
    existir: 'El módulo 2 completo, en el LMS. La supervisión previa revisa que estén todos los módulos del plan (Anexo 16, 1.1, pág. 128).', aplica: 'Módulo 2', antes: 'En 2024: 1° en emprendedor digital y 2° en línea regular. En 2026: siempre el 2°.' },
  { item: 'General', peso: '—', exige: 'Cumplir a cabalidad el plan formativo: habilidades, competencias, conocimientos y destrezas', siete: '—', donde: 'Anexo 7, num. 1, pág. 96',
    existir: 'Aprendizajes esperados, criterios y contenidos del plan, sin reformular (pestañas de cada curso).', aplica: 'Módulo 2', antes: 'Igual.' },
  { item: 'General', peso: '—', exige: 'Aprendizajes esperados con verbo + objeto + condición, en ascenso taxonómico', siete: '—', donde: 'Anexo 7, pág. 99',
    existir: 'Actividades y recursos al nivel que pide cada verbo (pestaña «Verbos»).', aplica: 'Módulo 2', antes: 'Igual.' },
  { item: 'General', peso: '—', exige: 'Recursos de aprendizaje que apunten a las capacidades de los aprendizajes esperados; enfoque práctico, anclado a la realidad laboral', siete: '—',
    donde: 'Anexo 7, num. 1 b y c, pág. 96', existir: 'Cada recurso ligado a un AE, con situaciones reales del trabajo.', aplica: 'Módulo 2', antes: 'Igual.' },
  { item: 'A · Equipamiento', peso: pct('A1'), exige: 'Infraestructura con equipos computacionales, o equipos en comodato, para quien no tenga equipo', siete: 'Infraestructura con equipos',
    donde: 'Bases 2026, 7.4 A, pág. 27', existir: 'Equipos con, al menos, lo que pide el plan en «recursos materiales» (pestaña «Qué exige cada curso»).', aplica: 'Todo el curso', antes: 'Igual.' },
  { item: 'B · Estrategia evaluativa', peso: pct('B1'), exige: 'Indicadores de evaluación por aprendizaje esperado: acción (verbo en presente) + contenido + condición', siete: '3 por AE, aunque el plan traiga menos criterios',
    donde: 'Bases 2026, 7.4 B.1, pág. 28; nota de la pág. 30; Anexo 7, 2.1, pág. 99', existir: 'Indicadores propios para cada AE (cantidad por curso en «Qué exige cada curso»).', aplica: 'Módulo 2', antes: 'En 2024 se llamaba «Indicadores de logro».' },
  { item: 'B · Estrategia evaluativa', peso: pct('B2'), exige: 'Instrumentos de evaluación distintos, cada uno con todos los aprendizajes esperados del módulo', siete: '3 distintos',
    donde: 'Bases 2026, 7.4 B.2, pág. 28; Anexo 7, num. 3, págs. 100-102', existir: 'Uno de observación (lista de cotejo, escala o rúbrica), uno de desempeño (problemas, casos, proyecto) y uno objetivo (selección múltiple, respuesta breve).', aplica: 'Módulo 2', antes: 'Igual.' },
  { item: 'B · Estrategia evaluativa', peso: pct('B3'), exige: 'Portafolio de proyectos progresivo o acumulativo', siete: '100% de los 6 elementos del 4.3',
    donde: 'Bases 2026, 7.4 B.3, pág. 28; Anexo 7, 4.3, pág. 104', existir: 'Guía o índice, introducción, temas por AE con evidencias, cierre, plataforma de publicación e instrumento evaluativo desarrollado.', aplica: 'Módulo 2', antes: 'Igual.' },
  { item: 'B · Estrategia evaluativa', peso: pct('B4'), exige: 'Retroalimentación al participante, pauta de autoevaluación y pauta de coevaluación', siete: 'Las tres',
    donde: 'Bases 2026, 7.4 B.4, pág. 29; Anexo 7, num. 5, págs. 104-106', existir: 'Mecanismo de feedback, autoevaluación, coevaluación y bitácora de resultados y plan de trabajo (5.4).', aplica: 'Módulo 2', antes: 'Igual.' },
  { item: 'C · Metodología', peso: pct('C1'), exige: 'Metodología enfocada en la competencia del módulo, no genérica; se evalúa por la experiencia del participante en el LMS', siete: 'Binario: 7,0 o 1,0',
    donde: 'Bases 2026, 7.4 C, pág. 30', existir: 'Actividades y recursos que nombran la competencia del módulo y situaciones del trabajo.', aplica: 'Módulo 2 (en el LMS)', antes: 'En 2024 había 4 preguntas; en 2026, 3 (qué, cómo, con qué).' },
  { item: 'C · Metodología', peso: pct('C2'), exige: 'Actividades prácticas distintas que permitan adquirir la habilidad del aprendizaje esperado', siete: '2 distintas y efectivas',
    donde: 'Bases 2026, 7.4 C, pág. 31; Anexo 7, 7 b, pág. 110, y pág. 111', existir: 'Análisis de casos, aprendizaje basado en problemas, resolución de problemas, juego de roles, simulación o gamificación.', aplica: 'Módulo 2 (en el LMS)', antes: 'Igual.' },
  { item: 'C · Metodología', peso: pct('C3'), exige: 'El módulo aporta al aprendizaje por la interacción con la plataforma: diseño intuitivo, lineal y amigable', siete: 'Binario: 7,0 o 1,0',
    donde: 'Bases 2026, 7.4 C, pág. 31; Anexo 7, 7 c, pág. 110', existir: 'Navegación clara, con íconos, multimedia e imágenes que el participante usa.', aplica: 'Módulo 2 (en el LMS)', antes: 'Igual.' },
  { item: 'C · Metodología', peso: pct('C4'), exige: 'Herramientas didácticas distintas; las dos deben permitir adquirir la habilidad', siete: '2 distintas, ambas efectivas',
    donde: 'Bases 2026, 7.4 C, pág. 31; Anexo 7, 7 d, pág. 110, y pág. 111', existir: 'Presentaciones, tutoriales, videos interactivos, instructivo, cuadro comparativo o multimedia.', aplica: 'Módulo 2 (en el LMS)', antes: 'Igual.' },
  { item: 'C · Metodología', peso: pct('C5'), exige: 'Estrategias de aprendizaje para habilidades del siglo XXI', siete: '3 estrategias para 3 habilidades',
    donde: 'Bases 2026, 7.4 C, pág. 31; Anexo 7, págs. 108-111', existir: 'Por ejemplo colaboración, pensamiento crítico y alfabetización digital, trabajadas en las actividades.', aplica: 'Módulo 2', antes: 'Igual.' },
  { item: 'D · Herramientas y valor agregado', peso: pct('D1'), exige: 'Herramientas de la industria digital, adicionales a las del plan, con 3 explicaciones cada una', siete: '5 o más',
    donde: 'Bases 2026, 7.4 D.1, pág. 32; Anexo 7, 8 y 8.1, pág. 112', existir: 'Por qué se eligió, cómo se usa en la industria y cómo se usará en clases.', aplica: 'Todo el plan (una propuesta por código de curso, pág. 32)', antes: 'Pesaba 30%; ahora 40% del ítem D.' },
  { item: 'D · Herramientas y valor agregado', peso: pct('D2'), exige: 'Estrategias de vinculación temprana con la industria, con 4 explicaciones cada una', siete: '4',
    donde: 'Bases 2026, 7.4 D.2, pág. 33; Anexo 7, 9 y 9.1, pág. 114', existir: 'Por qué, en qué consiste, cuándo se desarrolla y cómo permite el aprendizaje; mediadas por la institución.', aplica: 'Todo el plan', antes: 'Pesaba 20%; ahora 30% del ítem D.' },
  { item: 'D · Herramientas y valor agregado', peso: pct('D3'), exige: 'Actividades de extensión opcionales, con objetivo y vínculo con el plan', siete: '1 cada 50 horas del plan',
    donde: 'Bases 2026, 7.4 D.3, pág. 33; Anexo 7, num. 10, pág. 115', existir: 'Tema, tipo, objetivo, cantidad y momento (cantidad por curso en «Qué exige cada curso»).', aplica: 'Todo el plan', antes: 'Pesaba 20%; ahora 30%. En 2024 había además intermediación laboral (30%), que ya no existe.' },
  { item: 'Ejecución', peso: '—', exige: 'Inducción metodológica en el módulo de bienvenida, instrumento de evaluación en cada módulo, contenido obligatorio y complementario, y formatos que funcionan', siete: '—',
    donde: 'Anexo 16, 1.2-1.4 y 3.1, pág. 128', existir: 'Enlaces, videos y archivos que abren y se ven bien en el LMS.', aplica: 'Todo el curso', antes: '—' },
  { item: 'Ejecución', peso: '—', exige: 'Enlaces o multimedia con errores: infracción leve. Recursos distintos a los revisados en la supervisión previa, o no mantener la accesibilidad comprometida: infracción menos grave', siete: '—',
    donde: 'Bases 2026, 13.3.3 h), pág. 53; 13.3.2 o) y r), pág. 52', existir: 'Recursos revisados, con enlaces vigentes y accesibles, antes de subirlos.', aplica: 'Todo el curso', antes: '—' },
];

// ------------------------------------------------------------ celdas de la planilla

const S = (texto, estado) => ({ texto, estado });
const COLOR_SEC = '0F3D5E', COLOR_CANT = '0E7490';
const rico = (a) => ({ texto: a.texto, runs: a.trozos.map((z) => ({ t: z.t, b: !!z.tipo,
  color: z.tipo === 'verbo' ? NIVELES[a.nivel].color : z.tipo === 'secundario' ? COLOR_SEC : z.tipo === 'cantidad' ? COLOR_CANT : undefined })) });
const chip = (n) => ({ texto: `${n} · ${NIVELES[n].categoria}`, nivel: n });
const verboCelda = (a) => ({ texto: a.verbo, runs: [{ t: a.verbo, b: true, color: NIVELES[a.nivel].color }] });
const condicion = (a) => (a.condicion ? a.condicion : { texto: 'El plan no la indica: agrégala al redactar el indicador (Anexo 7, 2.1)', nota: true });
const objeto = (a) => a.objeto || { texto: 'El plan no lo nombra aparte (va en la condición)', nota: true };
const guia = (a) => [GUIA[a.nivel].demuestra, GUIA[a.nivel].recurso, S(GUIA[a.nivel].basta, GUIA[a.nivel].estado)];
const listaVerbos = (aes) => ({ texto: aes.map((ae) => `AE${ae.n} ${ae.a.verbo}`).join('\n'),
  runs: aes.flatMap((ae, i) => [{ t: `${i ? '\n' : ''}AE${ae.n} ` }, { t: ae.a.verbo, b: true, color: NIVELES[ae.a.nivel].color }, { t: ` (${ae.a.nivel})` }]) });
const carpeta2024 = (pf) => {
  const r = recursos?.carpetas?.[pf];
  return r ? { url: `https://drive.google.com/drive/folders/${r.id}`, texto: r.nombre } : recursos?.sinCarpeta?.[pf] ? S(recursos.sinCarpeta[pf], NUEVOS.includes(pf) ? 'ok' : 'subir') : '—';
};

/** Filas jerárquicas de un curso: (fila del curso), competencia, cada AE (fila de sección) y sus criterios. */
function filasCurso(c, { conCurso }) {
  const pre = conCurso ? [c.codigos.join(' · ')] : [];
  const filas = [];
  if (conCurso) {
    const f = [S(c.codigos.join(' · '), 'curso'), `MÓDULO 2 · ${c.m2.codigo} · ${c.m2.nombre} · ${c.m2.horas} h · ${c.nombre}`];
    f.tipo = 'curso';
    f.combinar = [1, 12];
    f.enlace = carpeta2024(c.pf);
    filas.push(f);
  }
  const cc = cambio(c.pf, (x) => x === 'Competencia del módulo');
  const comp = [...pre, S('Competencia', 'curso'), rico(c.comp), verboCelda(c.comp), chip(c.comp.nivel), objeto(c.comp), condicion(c.comp),
    ...guia(c.comp), c.herramientas.join(', '), '', S(cc.texto, cc.estado)];
  comp.tipo = 'ae';
  filas.push(comp);
  for (const ae of c.aes) {
    const cambioAE = [ae.cambio.estado === 'pend' ? ae.cambio.texto : '', ae.cambioContenidos ? `Contenidos: ${ae.cambioContenidos}` : ''].filter(Boolean).join('\n');
    const f = [...pre, S(`AE${ae.n}`, 'curso'), rico(ae.a), verboCelda(ae.a), chip(ae.a.nivel), objeto(ae.a), condicion(ae.a),
      ...guia(ae.a), ae.herramientas.join(', '), ae.contenidos, cambioAE ? S(cambioAE, 'pend') : S(ae.cambio.texto, ae.cambio.estado)];
    f.tipo = 'ae';
    filas.push(f);
    for (const cr of ae.criterios) {
      filas.push([...pre, cr.n, rico(cr.a), verboCelda(cr.a), chip(cr.a.nivel), objeto(cr.a), condicion(cr.a),
        ...guia(cr.a), cr.herramientas.join(', '), '', S(cr.cambio.texto, cr.cambio.estado)]);
    }
  }
  return filas;
}
/** Completa cada fila hasta n columnas de datos, agrega (si es la versión privada) el enlace a Drive 2024 y las 3 columnas de revisión. */
const conRevision = (filas, n, enlace) => filas.map((f) => {
  const g = [...f];
  while (g.length < n) g.push('');
  if (enlace) g.push(f.enlace ?? '');
  g.push('', '', '');
  return Object.assign(g, { tipo: f.tipo, combinar: f.combinar });
});
const ENC_CURSO = ['Nº', 'Texto del plan (verbo destacado)', 'Verbo', 'Nivel', 'Qué (objeto)', 'Cómo o para qué (condición)',
  'Qué tiene que demostrar el participante', 'Qué necesita un recurso para servir', '¿Basta un recurso expositivo? (flipbook, infografía, video, quiz)',
  'Herramientas y tecnologías', 'Contenidos del AE', 'Cambio respecto de 2024', 'Recurso que lo cubre (completar)', '¿Sirve? Sí / Adaptar / Rehacer (completar)', 'Observaciones (completar)'];
const ANCHO_CURSO = [12, 46, 16, 13, 30, 34, 28, 34, 17, 20, 50, 26, 26, 15, 26];

// ------------------------------------------------------------ hojas

function hojas({ privado }) {
  const fecha = new Date().toLocaleDateString('es-CL');
  const nivelesFila = Object.entries(NIVELES).map(([n, v]) => [chip(Number(n)), GUIA[n].demuestra, GUIA[n].recurso, S(GUIA[n].basta, GUIA[n].estado)]);
  const leer_ = [
    [S('Para qué sirve', 'curso'), 'Sistematiza lo que exige 2026 del módulo 2 de los 15 cursos: qué pide el plan, a qué nivel, con qué herramientas, cuánto piden las bases para el 7,0 y qué cambió desde 2024. Sirve para decidir qué recursos de años anteriores sirven.', ''],
    [S('Qué se desarrolla', 'curso'), 'El segundo módulo de cada plan formativo (bases 2026, 7.4, pág. 27). Los 4 Entry level comparten el mismo módulo 2: tienen una sola pestaña.', ''],
    [S('Cómo se lee un aprendizaje', 'curso'), 'Verbo + objeto + condición (Anexo 7, pág. 99). El verbo va en negrita y con el color de su nivel; los verbos secundarios (gerundios y el infinitivo después de PARA), en negrita azul; las cantidades («al menos tres…»), en turquesa.', 'Ejemplo: APLICAR (verbo) · ESTRUCTURAS DE DATOS AVANZADAS (objeto) · PARA LA RESOLUCIÓN DE PROBLEMAS… (condición)'],
    [S('Niveles', 'curso'), 'Taxonomía de Bloom revisada. Es una lectura nuestra para revisar recursos: las bases no clasifican verbos. Sale del primer verbo del texto.', 'Ver abajo los 6 niveles'],
    ...nivelesFila.map(([c, d, r, b]) => [c, `${d} Recurso: ${r}`, b]),
    [S('Pestañas', 'curso'), '«Qué exige cada curso»: las cantidades para el 7,0. «Exigencias de las bases»: las 19 exigencias con numeral y página. «Verbos»: todos los verbos por nivel. «Todos los criterios»: los 12 módulos en una sola tabla (la misma hoja está en la planilla de seguimiento). Una pestaña por curso. «Cambios 2024-2026» y «Fuentes».', ''],
    [S('Columnas para completar', 'curso'), 'Las 3 últimas de cada pestaña de curso: qué recurso de años anteriores cubre cada fila, si sirve (sí, adaptar o rehacer) y observaciones.', ''],
    [S('Regenerar', 'curso'), 'npm run exigencias (en el repo licitacion-td-2026).', ''],
  ];
  const resumen = [], cantidades = [];
  for (const p of planes) {
    const c = cursos.find((x) => x.codigos.includes(p.j.codigo_plan));
    const pf = p.j.codigo_plan, u = umbrales[pf];
    const refs = referenciales.filter((f) => f.startsWith(pf)).map((f) => f.replace(/\.docx$/, '').replace(/\(1\)$/, ''));
    resumen.push([S(pf, 'curso'), p.o.linea, p.j.nombre, `${p.j.horas_totales} h`, `${c.m2.codigo} · ${c.m2.nombre}`, `${c.m2.horas} h`,
      rico(c.comp), chip(c.comp.nivel), String(c.aes.length), String(c.criterios.length), listaVerbos(c.aes), chip(c.max),
      `${c.hacer} de ${c.criterios.length}`, c.herramientas.join(', ') || '—', c.recursos.software.join('\n') || '—', c.recursos.material.join('\n') || '—',
      S(c.estado2024.texto, c.estado2024.estado),
      ...(privado ? [carpeta2024(pf), refs.length ? refs.join('\n') : S('No hay', 'pend')] : []), c.hoja]);
    cantidades.push([S(pf, 'curso'), p.j.nombre, `${c.aes.length} AE × 3 = ${3 * c.aes.length}`,
      c.pocos.length ? S(c.pocos.map((ae) => `AE${ae.n} (${ae.criterios.length} en el plan)`).join('\n'), 'pend') : S('Ninguno', 'ok'),
      c.sinCondicion ? `${c.sinCondicion} de ${c.criterios.length}` : 'Ninguno',
      '3 distintos, cada uno con los ' + c.aes.length + ' AE', '6 de 6 elementos', 'Feedback + autoevaluación + coevaluación + bitácora',
      '2 distintas', '2 distintas, ambas efectivas', '3 estrategias, 3 habilidades', '5 o más, adicionales al plan', '4 estrategias',
      S(`${u?.extension_nota7 ?? '?'} (plan de ${u?.horas ?? p.j.horas_totales} h)`, 'curso'), c.recursos.equipo || '—']);
  }
  const verbos = new Map();
  for (const c of cursos) for (const [a, en] of [...c.aes.map((ae) => [ae.a, 'ae']), ...c.criterios.map((cr) => [cr.a, 'cr'])]) {
    const v = verbos.get(a.verbo) ?? verbos.set(a.verbo, { a, ae: 0, cr: 0, ej: null }).get(a.verbo);
    v[en]++;
    if (en === 'cr' && !v.ej) v.ej = { pf: c.codigos[0], a };
  }
  const filasVerbos = [...verbos.values()].sort((x, y) => x.a.nivel - y.a.nivel || (y.ae + y.cr) - (x.ae + x.cr)).map(({ a, ae, cr, ej }) => [
    verboCelda(a), chip(a.nivel), String(ae), String(cr), GUIA[a.nivel].demuestra, GUIA[a.nivel].recurso, S(GUIA[a.nivel].basta, GUIA[a.nivel].estado),
    GUIA[a.nivel].instrumento, ej ? { ...rico(ej.a), texto: `${ej.pf}: ${ej.a.texto}`, runs: [{ t: `${ej.pf}: `, b: true }, ...rico(ej.a).runs] } : '—']);
  const filasBases = BASES.map((b, i) => [String(i + 1), S(b.item, 'curso'), b.peso, b.exige, S(b.siete, b.siete === '—' ? undefined : 'curso'), b.donde, b.existir, b.aplica, b.antes]);
  const filasCambios = cambios.map((c) => [S(c.planes, 'curso'), c.elemento, c.texto_2024, c.texto_2026, c.tipo, c.efecto_en_recursos]);
  const todos = conRevision(cursos.flatMap((c) => filasCurso(c, { conCurso: true })), 13, privado);
  const fuentes = [
    ['Planes 2026', 'SIPFOR (npm run sipfor): Res. 3615 del 05-12-2024, versión 1, para 13 planes; Res. 1868 del 05-08-2026, versión 1, para PF1821 y PF1822.',
      'Textos del módulo 2 sin reformular. 12 de 15 cotejados con los PDF oficiales de «PF SENCE a licitar» (npm run planes).'],
    ['Exigencias de las bases', 'Bases 2026, Res. Ex. N°2320: 7.4 (págs. 27-33), Anexo 7 (págs. 96-115), Anexo 16 (pág. 128), 13.3 (págs. 50-53).', 'Cada fila cita numeral y página. Pesos: data/rubrica-subcriterios.csv.'],
    ['Cantidades por curso', 'data/umbrales-por-plan.csv (actividades de extensión: 1 cada 50 h, redondeado hacia arriba) y el número de AE de cada plan.',
      'Las horas de algunos planes no cuadran en SIPFOR (pregunta abierta #24).'],
    ['Plan 2024', 'Drive «Talento Digital 2024 Licitación» → «PF Sofofa 2024» (los .docx usados en 2024).', 'Comparado con 2026 texto por texto (data/modulo2-cambios-2024-2026.csv).'],
    ['Verbo, objeto y condición', 'scripts/lib/verbos.mjs y data/verbos-bloom.csv (taxonomía de Bloom revisada, Anderson y Krathwohl, 2001).',
      'Lectura nuestra: el corte entre objeto y condición es automático (primera marca de «cómo o para qué»).'],
    ['Regenerar', 'npm run exigencias', `Versión pública: ${DIR}/. Con enlaces a Drive: privado/drive/ (fuera de git).`],
  ];

  const AZUL = '0F3D5E', TURQ = '0E7490', AMBAR = 'F59E0B', GRIS = '94A3B8';
  return [
    { nombre: 'Cómo leer', color: AZUL, titulo: 'Exigencias 2026 del módulo 2 · Talento Digital · cómo leer esta planilla',
      subtitulo: `Lo que exige este 2026 para el módulo 2 de los 15 cursos, sistematizado · ${fecha}`,
      encabezados: ['Tema', 'Qué significa', 'Nota'], filas: leer_, alto: 'auto', anchos: { fijas: 0, cols: [26, 110, 40] } },
    { nombre: 'Resumen 2026', color: AZUL, titulo: 'Resumen: qué exige 2026 del módulo 2, curso por curso',
      subtitulo: 'Una fila por plan · verbos en el color de su nivel · el software y el material son los que el plan exige para e-learning',
      encabezados: ['Código', 'Línea', 'Plan', 'Horas del plan', 'Módulo 2', 'Horas M2', 'Competencia del módulo (verbo destacado)', 'Nivel de la competencia',
        'AE', 'Criterios', 'Verbos de los AE (nivel)', 'Nivel más alto', 'Criterios de «hacer» (nivel 3 o más)', 'Herramientas y tecnologías del módulo',
        'Software y entorno que exige el plan', 'Material digital que exige el plan', '¿Cambió desde 2024?',
        ...(privado ? ['Recursos 2024 (Drive)', 'Anexo 2 de referencia 2024'] : []), 'Pestaña'],
      filas: resumen, alto: 'auto', anchos: { fijas: 1, cols: [9, 14, 26, 9, 30, 8, 44, 13, 5, 8, 22, 13, 12, 28, 32, 34, 22, ...(privado ? [24, 26] : []), 20] } },
    { nombre: 'Qué exige cada curso', color: AZUL, titulo: 'Qué exige 2026 de cada curso para el 7,0',
      subtitulo: 'Cantidades de las bases (7.4) aplicadas a cada plan · una fila por plan · sirve como lista de control',
      encabezados: ['Código', 'Plan', 'Indicadores de evaluación (mínimo)', 'AE con menos de 3 criterios en el plan', 'Criterios sin condición explícita',
        'Instrumentos de evaluación', 'Portafolio', 'Retroalimentación', 'Actividades prácticas', 'Herramientas didácticas', 'Habilidades del siglo XXI',
        'Herramientas de la industria (ítem D)', 'Vinculación temprana', 'Actividades de extensión', 'Equipo por participante (mínimo del plan)'],
      filas: cantidades, alto: 'auto', anchos: { fijas: 1, cols: [9, 28, 14, 20, 12, 18, 11, 22, 11, 14, 14, 16, 12, 14, 34] } },
    { nombre: 'Exigencias de las bases', color: AZUL, titulo: 'Qué exigen las bases 2026 (igual para los 15 cursos)',
      subtitulo: 'Con numeral y página de la Res. Ex. N°2320 · ordenadas por ítem de la pauta técnica',
      encabezados: ['#', 'Ítem', 'Peso', 'Qué exige', 'Para el 7,0', 'Dónde lo dice', 'Qué tiene que existir', 'Aplica a', 'Cambio respecto de 2024'],
      filas: filasBases, alto: 'auto', anchos: { fijas: 0, cols: [4, 18, 20, 44, 18, 30, 44, 18, 30] } },
    { nombre: 'Verbos', color: AZUL, titulo: 'Verbos del módulo 2, por nivel',
      subtitulo: 'Se cuentan los 12 módulos distintos · qué tiene que demostrar el participante, qué recurso sirve y con qué instrumento se mide',
      encabezados: ['Verbo', 'Nivel', 'En AE', 'En criterios', 'Qué tiene que demostrar', 'Qué necesita un recurso', '¿Basta un recurso expositivo?', 'Instrumento (Anexo 7)', 'Ejemplo del plan'],
      filas: filasVerbos, alto: 'auto', anchos: { fijas: 1, cols: [15, 13, 7, 9, 32, 38, 18, 30, 60] } },
    { nombre: 'Todos los criterios', color: AMBAR, titulo: 'Todos los criterios del módulo 2 de los 15 cursos',
      subtitulo: 'Filtra por «Curso» · fila azul = curso, fila celeste = competencia y AE, fila blanca = criterio',
      encabezados: ['Curso', ...ENC_CURSO.slice(0, 12), ...(privado ? ['Recursos 2024 (Drive)'] : []), ...ENC_CURSO.slice(12)],
      filas: todos,
      alto: 'auto', anchos: { fijas: 2, cols: [12, ...ANCHO_CURSO.slice(0, 12), ...(privado ? [24] : []), ...ANCHO_CURSO.slice(12)] } },
    ...cursos.map((c) => ({ nombre: c.hoja, color: TURQ, titulo: `${c.codigos.join(' · ')} · ${c.nombre}`,
      subtitulo: `Módulo 2: ${c.m2.codigo} · ${c.m2.nombre} · ${c.m2.horas} h · ${c.aes.length} AE, ${c.criterios.length} criterios · las 3 últimas columnas son para anotar la revisión`,
      encabezados: ENC_CURSO, filas: conRevision(filasCurso(c, { conCurso: false }), 12, false), alto: 'auto', anchos: { fijas: 1, cols: ANCHO_CURSO } })),
    { nombre: 'Cambios 2024-2026', color: GRIS, titulo: 'Qué cambió en el módulo 2 entre el plan usado en 2024 y el plan 2026',
      subtitulo: 'Todo lo que no aparece aquí es igual: mismos aprendizajes, criterios y contenidos (comparados uno por uno)',
      encabezados: ['Planes', 'Elemento', 'Texto 2024', 'Texto 2026', 'Tipo de cambio', 'Efecto en los recursos'],
      filas: filasCambios, alto: 'auto', anchos: { fijas: 1, cols: [14, 16, 50, 50, 22, 44] } },
    { nombre: 'Fuentes', color: GRIS, titulo: 'De dónde sale cada dato', subtitulo: 'Para regenerarla: npm run exigencias',
      encabezados: ['Qué', 'Fuente', 'Nota'], filas: fuentes, alto: 'auto', anchos: { fijas: 0, cols: [24, 70, 70] } },
  ];
}

// ------------------------------------------------------------ PDF

const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const hRico = (a) => a.trozos.map((z) => (z.tipo === 'verbo' ? `<b class="v${a.nivel}">${e(z.t)}</b>` : z.tipo === 'secundario' ? `<b class="sec">${e(z.t)}</b>`
  : z.tipo === 'cantidad' ? `<b class="cant">${e(z.t)}</b>` : e(z.t))).join('');
const hChip = (n) => `<span class="nv nv${n}">${n} · ${NIVELES[n].categoria}</span>`;
const hEstado = (x) => `<span class="est ${x.estado}">${e(x.texto)}</span>`;

function html() {
  const nAE = cursos.reduce((n, c) => n + c.aes.length, 0), nCr = cursos.reduce((n, c) => n + c.criterios.length, 0);
  const iguales = cursos.filter((c) => !c.nuevo).reduce((n, c) => n + c.codigos.length, 0);
  const css = `<style>
.frente h2 { font: 700 13pt 'IBM Plex Sans'; color: var(--azul); margin: 0 0 3mm; }
.cifras { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 0 0 6mm; }
.cifras div { border-top: 2pt solid var(--turquesa); padding-top: 2mm; }
.cifras b { display: block; font: 700 20pt/1 'IBM Plex Sans'; color: var(--azul); }
.cifras span { display: block; font: 400 8pt/1.35 'IBM Plex Sans'; color: var(--gris); margin-top: 1.5mm; }
.clave li { font-size: 9.5pt; margin: 0 0 1.6mm; }
h2.sec-t { font: 700 16pt/1.2 'IBM Plex Sans'; color: var(--azul); margin: 0 0 2mm; }
.bajada { font-size: 9.5pt; color: var(--gris); margin: 0 0 5mm; }
table.t { width: 100%; border-collapse: collapse; font-size: 7.9pt; line-height: 1.35; margin: 0 0 5mm; }
table.t th { font-size: 7.4pt; padding: 3.5pt 4.5pt; }
table.t td { padding: 3.5pt 4.5pt; }
table.t tr { break-inside: avoid; }
.nv { display: inline-block; padding: .6pt 4pt; border-radius: 2.5pt; font: 700 7pt 'IBM Plex Sans'; white-space: nowrap; }
${Object.entries(NIVELES).map(([n, v]) => `.nv${n} { background: #${v.fondo}; color: #${v.color}; } .v${n} { color: #${v.color}; }`).join('\n')}
b.sec { color: #0F3D5E; font-weight: 600; text-decoration: underline; text-decoration-color: #94A3B8; text-underline-offset: 1.5pt; }
b.cant { color: #0E7490; }
.est { display: inline-block; font: 600 7pt/1.3 'IBM Plex Sans'; padding: .6pt 4pt; border-radius: 2.5pt; }
.est.ok { background: #DCFCE7; color: #166534; } .est.pend { background: #FEF3C7; color: #92400E; } .est.subir { background: #E2E8F0; color: #334155; }
.curso { break-before: page; }
.cab { background: var(--azul); color: #fff; border-radius: 4pt; padding: 5mm 6mm 4.5mm; margin: 0 0 4mm; }
.cab .k { font: 600 7.5pt 'IBM Plex Sans'; letter-spacing: .14em; text-transform: uppercase; color: #A5F3FC; margin: 0 0 1.5mm; }
.curso .cab h2 { font: 700 15pt/1.2 'IBM Plex Sans'; color: #fff; margin: 0; padding: 0; border: 0; }
.cab p { font: 400 8.5pt/1.4 'IBM Plex Sans'; color: #CFE3F1; margin: 1.5mm 0 0; }
.comp { border-left: 3pt solid var(--turquesa); background: var(--fondo); padding: 3mm 4mm; margin: 0 0 4mm; font-size: 8.8pt; line-height: 1.45; }
.comp .rot { margin-bottom: 1.2mm; }
.exige { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2mm; margin: 0 0 4mm; }
.exige div { background: var(--fondo2); border-radius: 3pt; padding: 2mm 2.5mm; }
.exige b { display: block; font: 700 12pt/1.1 'IBM Plex Sans'; color: var(--azul); }
.exige span { display: block; font: 400 7pt/1.3 'IBM Plex Sans'; color: var(--gris); margin-top: 1mm; }
.meta { font-size: 8pt; line-height: 1.4; margin: 0 0 4mm; color: var(--tinta); }
.meta b { color: var(--azul); }
.ae { border: .75pt solid var(--linea); border-radius: 3pt; margin: 0 0 4mm; break-inside: auto; }
.ae-cab { background: #E8EFF6; padding: 2.5mm 3.5mm; border-radius: 3pt 3pt 0 0; font-size: 8.6pt; line-height: 1.42; break-after: avoid; }
.ae-cab .n { font: 700 9pt 'IBM Plex Sans'; color: var(--azul); margin-right: 2mm; }
.oc { display: grid; grid-template-columns: 1fr 1fr; gap: 2mm 5mm; padding: 2mm 3.5mm 0; font-size: 7.8pt; line-height: 1.35; }
.oc dt { font: 600 6.5pt 'IBM Plex Sans'; letter-spacing: .12em; text-transform: uppercase; color: var(--gris); }
.oc dd { margin: 0; }
.ae table.t { margin: 2mm 0 0; }
.ae table.t td:first-child { width: 8mm; font-weight: 600; color: var(--azul); }
.cont { font-size: 7pt; line-height: 1.35; color: var(--gris); padding: 1.5mm 3.5mm 2.5mm; white-space: pre-line; }
.cont b { color: var(--tinta); }
.nota { font-size: 7.6pt; color: #92400E; background: #FFFBEB; padding: 1.5mm 3.5mm; }
.leyenda td { vertical-align: middle; }
</style>`;
  const portada = `<section class="portada"><div class="banda"><p class="kicker">Talento Digital 2026 · licitación SENCE</p>
<p class="curso">Bases: Res. Ex. N°2320 · planes formativos SIPFOR · 15 cursos</p>
<h1>Qué exige 2026 del módulo 2</h1><div class="regla"></div>
<p class="bajada">Cada aprendizaje esperado y criterio, leído como verbo + objeto + condición, con lo que exigen las bases para el 7,0 y lo que cambió desde 2024.</p></div>
<div class="frente"><div class="cifras"><div><b>15</b><span>cursos, con ${cursos.length} módulos 2 distintos (los 4 Entry level comparten uno)</span></div>
<div><b>${nAE}</b><span>aprendizajes esperados</span></div><div><b>${nCr}</b><span>criterios de evaluación del plan</span></div>
<div><b>${iguales} de 15</b><span>cursos con el mismo módulo 2 que en 2024</span></div></div>
<h2>Lo esencial</h2><ul class="clave">
<li>Se desarrolla y se evalúa <b>el segundo módulo</b> de cada plan (7.4, pág. 27), y la metodología se evalúa <b>en el LMS</b> (pág. 30).</li>
<li>Los aprendizajes y criterios van <b>textuales</b>; los indicadores son propios: <b>3 por aprendizaje</b>, con verbo en presente + contenido + condición (págs. 28 y 99).</li>
<li>Para el aprendizaje esperado que se desarrolle en el LMS: <b>2 actividades prácticas</b> y <b>2 herramientas didácticas</b> que den la habilidad (pág. 31). Para el módulo: <b>3 instrumentos</b>, portafolio <b>6 de 6</b>, feedback + auto + coevaluación (págs. 28-29).</li>
<li>Para todo el plan: <b>5 herramientas</b> de la industria, <b>4 estrategias</b> de vinculación y <b>1 actividad de extensión cada 50 h</b> (págs. 32-33).</li>
<li>El verbo manda: desde el nivel <b>3 · Aplicar</b>, un flipbook, una infografía o un video no bastan; hace falta práctica, caso o proyecto.</li>
<li>Los 15 planes 2026 son <b>solo e-learning</b>: cada recurso tiene que funcionar solo en el LMS.</li></ul></div></section>`;
  const leyenda = `<section><h2 class="sec-t">Cómo leer este documento</h2>
<p class="bajada">Verbo en negrita y en el color de su nivel (taxonomía de Bloom revisada, lectura nuestra: las bases solo piden verbo + objeto + condición y ascenso taxonómico, Anexo 7, pág. 99). Verbos secundarios <b class="sec">subrayados</b>; cantidades <b class="cant">en turquesa</b>.</p>
<table class="t leyenda"><thead><tr><th>Nivel</th><th>Qué tiene que demostrar el participante</th><th>Qué necesita un recurso para servir</th><th>¿Basta un recurso expositivo?</th></tr></thead><tbody>
${Object.keys(NIVELES).map((n) => `<tr><td>${hChip(n)}</td><td>${e(GUIA[n].demuestra)}</td><td>${e(GUIA[n].recurso)}</td><td>${hEstado({ texto: GUIA[n].basta, estado: GUIA[n].estado })}</td></tr>`).join('')}
</tbody></table>
<h2 class="sec-t">Qué exigen las bases 2026 (igual para los 15 cursos)</h2>
<table class="t"><thead><tr><th>Ítem</th><th>Qué exige</th><th>Para el 7,0</th><th>Dónde lo dice</th></tr></thead><tbody>
${BASES.map((b) => `<tr><td><b>${e(b.item)}</b><br><span style="color:#475569">${e(b.peso)}</span></td><td>${e(b.exige)}<br><span style="color:#475569">${e(b.existir)}</span></td><td><b>${e(b.siete)}</b></td><td>${e(b.donde)}</td></tr>`).join('')}
</tbody></table></section>`;
  const resumen = `<section class="curso"><h2 class="sec-t">Resumen por curso</h2>
<p class="bajada">Nivel más alto que pide cada módulo, cuántos criterios piden «hacer» (nivel 3 o más), indicadores mínimos y actividades de extensión para el 7,0.</p>
<table class="t"><thead><tr><th>Curso</th><th>Módulo 2</th><th>Verbos de los AE</th><th>Nivel más alto</th><th>Hacer</th><th>Indicadores</th><th>Extensión</th><th>Desde 2024</th></tr></thead><tbody>
${cursos.map((c) => `<tr><td><b>${c.codigos.join('<br>')}</b></td><td>${e(c.m2.codigo)} · ${e(c.m2.nombre)} · ${c.m2.horas} h</td>
<td style="white-space:nowrap">${c.aes.map((ae) => `AE${ae.n} <b class="v${ae.a.nivel}">${e(ae.a.verbo)}</b>`).join('<br>')}</td><td>${hChip(c.max)}</td><td>${c.hacer} de ${c.criterios.length}</td>
<td>${3 * c.aes.length}</td><td>${c.codigos.map((pf) => `${umbrales[pf]?.extension_nota7 ?? '?'}`).join(' · ')}</td><td>${hEstado(c.estado2024)}</td></tr>`).join('')}
</tbody></table></section>`;
  const porCurso = cursos.map((c) => {
    const ext = c.codigos.map((pf) => `${pf}: ${umbrales[pf]?.extension_nota7 ?? '?'}`).join(' · ');
    const cambiosC = cambiosDe(c.pf).filter((x) => x.elemento !== 'Modalidad');
    return `<section class="curso"><div class="cab"><p class="k">${e(c.codigos.join(' · '))} · módulo 2 · ${c.m2.horas} h</p>
<h2>${e(c.m2.nombre)}</h2><p>${e(c.nombre)} · ${e(c.m2.codigo)} · ${c.aes.length} aprendizajes, ${c.criterios.length} criterios · ${c.nuevo ? 'plan nuevo 2026' : 'mismo módulo que en 2024'}</p></div>
<div class="comp"><p class="rot">Competencia del módulo · ${hChip(c.comp.nivel)}</p>${hRico(c.comp)}</div>
<div class="exige"><div><b>${3 * c.aes.length}</b><span>indicadores mínimos (3 por AE)</span></div><div><b>3</b><span>instrumentos distintos con los ${c.aes.length} AE</span></div>
<div><b>2 + 2</b><span>actividades prácticas y herramientas didácticas</span></div><div><b>6/6</b><span>elementos del portafolio</span></div>
<div><b>${c.codigos.length > 1 ? c.codigos.map((pf) => umbrales[pf]?.extension_nota7 ?? '?').join('·') : umbrales[c.pf]?.extension_nota7 ?? '?'}</b><span>actividades de extensión (1 cada 50 h)</span></div></div>
<p class="meta"><b>Herramientas del módulo:</b> ${e(c.herramientas.join(', ') || '—')}<br><b>Software que exige el plan (e-learning):</b> ${e(c.recursos.software.join(' · ') || '—')}<br>
<b>Material digital que exige el plan:</b> ${e(c.recursos.material.join(' · ') || '—')}<br><b>Equipo por participante:</b> ${e(c.recursos.equipo || '—')}
${c.pocos.length ? `<br><b>Ojo:</b> ${c.pocos.map((ae) => `AE${ae.n} trae ${ae.criterios.length} criterios`).join(', ')}: hay que redactar 3 indicadores igual.` : ''}
${c.codigos.length > 1 ? `<br><b>Extensión por plan:</b> ${e(ext)}` : ''}</p>
${c.aes.map((ae) => `<div class="ae"><div class="ae-cab"><span class="n">AE${ae.n}</span>${hChip(ae.a.nivel)} ${hRico(ae.a)}</div>
<dl class="oc"><div><dt>Qué (objeto)</dt><dd>${e(ae.a.objeto || '—')}</dd></div><div><dt>Cómo o para qué (condición)</dt><dd>${e(ae.a.condicion || 'El plan no la indica')}</dd></div></dl>
<table class="t"><thead><tr><th>Nº</th><th>Criterio de evaluación (verbo destacado)</th><th>Nivel</th><th>Qué tiene que demostrar</th></tr></thead><tbody>
${ae.criterios.map((cr) => `<tr><td>${cr.n}</td><td>${hRico(cr.a)}${cr.a.condicion ? '' : ' <span class="est subir">sin condición</span>'}</td><td>${hChip(cr.a.nivel)}</td><td>${e(GUIA[cr.a.nivel].demuestra)}</td></tr>`).join('')}
</tbody></table>
<div class="cont"><b>Contenidos:</b> ${e(ae.contenidos.replace(/\n\s*•\s*/g, ' · '))}${ae.herramientas.length ? `<br><b>Herramientas:</b> ${e(ae.herramientas.join(', '))}` : ''}</div>
${[ae.cambio.estado === 'pend' ? ae.cambio.texto : '', ...ae.criterios.filter((cr) => cr.cambio.estado === 'pend').map((cr) => `${cr.n}: ${cr.cambio.texto}`)].filter(Boolean).map((t) => `<div class="nota">Cambio desde 2024 · ${e(t)}</div>`).join('')}
</div>`).join('')}
${cambiosC.some((x) => x.elemento === 'Competencia del módulo') ? `<div class="nota">Competencia, cambio desde 2024 · ${e(cambiosC.find((x) => x.elemento === 'Competencia del módulo').tipo)}</div>` : ''}
</section>`;
  }).join('\n');
  const tablaCambios = `<section class="curso"><h2 class="sec-t">Qué cambió desde 2024</h2>
<p class="bajada">Comparado texto por texto con los planes usados en la licitación 2024 (Drive «PF Sofofa 2024»). Lo que no está aquí es igual.</p>
<table class="t"><thead><tr><th>Planes</th><th>Elemento</th><th>2024</th><th>2026</th><th>Efecto en los recursos</th></tr></thead><tbody>
${cambios.map((c) => `<tr><td><b>${e(c.planes)}</b></td><td>${e(c.elemento)}</td><td>${e(c.texto_2024)}</td><td>${e(c.texto_2026)}</td><td>${e(c.efecto_en_recursos)}</td></tr>`).join('')}
</tbody></table>
<p class="bajada">Fuentes: bases 2026 (Res. Ex. N°2320), SIPFOR (Res. 3615 del 05-12-2024 y Res. 1868 del 05-08-2026). Generado con <code>npm run exigencias</code>.</p></section>`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Exigencias 2026 del módulo 2</title>
${estilos('Exigencias 2026 del módulo 2 · Talento Digital')}${css}</head><body>${portada}${leyenda}${resumen}${porCurso}${tablaCambios}</body></html>`;
}

// ------------------------------------------------------------ salida

fs.mkdirSync(ruta(DIR), { recursive: true });
fs.mkdirSync(ruta('privado/drive'), { recursive: true });
fs.writeFileSync(ruta(DIR, 'Exigencias-Modulo2-2026.xlsx'), crearXlsx(hojas({ privado: false })));
const conEnlaces = hojas({ privado: true });
fs.writeFileSync(ruta('privado/drive/Exigencias-Modulo2-2026-con-enlaces.xlsx'), crearXlsx(conEnlaces));
const unaHoja = conEnlaces.find((h) => h.nombre === 'Todos los criterios');
fs.writeFileSync(ruta('privado/drive/Hoja-Exigencias-2026-M2.xlsx'), crearXlsx([{ ...unaHoja, nombre: 'Exigencias 2026 M2',
  titulo: 'Exigencias 2026 del módulo 2 · los 15 cursos', subtitulo: `${unaHoja.subtitulo} · verbos en el color de su nivel (1 Recordar → 6 Crear) · planilla completa y PDF en el repo (${DIR})` }]));
let pdf = '';
if (!SIN_PDF) {
  fs.writeFileSync(ruta(DIR, 'Exigencias-Modulo2-2026.html'), html());
  pdf = ` · PDF ${imprimirPdf(`${DIR}/Exigencias-Modulo2-2026.html`, `${DIR}/Exigencias-Modulo2-2026.pdf`)} KB`;
}
console.log(`${DIR}/Exigencias-Modulo2-2026.xlsx (${conEnlaces.length} pestañas, ${cursos.length} módulos, ${cursos.reduce((n, c) => n + c.criterios.length, 0)} criterios)${pdf}`);
console.log('privado/drive/Exigencias-Modulo2-2026-con-enlaces.xlsx y privado/drive/Hoja-Exigencias-2026-M2.xlsx'
  + (recursos ? '' : ' · sin privado/drive/recursos-2024.json: sin enlaces a Drive 2024'));
for (const p of planes) if (!hojaDePlan(p.j.codigo_plan)) throw new Error(`Sin pestaña para ${p.j.codigo_plan}`);
