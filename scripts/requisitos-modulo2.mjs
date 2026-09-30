#!/usr/bin/env node
/**
 * Planilla con lo que exige 2026 del módulo 2 de cada curso, para decidir qué recursos de años anteriores
 * sirven. Por curso: cada aprendizaje esperado y criterio con su verbo, el nivel que pide (taxonomía de Bloom
 * revisada), qué tiene que demostrar el participante, qué necesita un recurso para servir, las herramientas que
 * nombra el plan y qué cambió respecto del plan usado en 2024. Deja columnas vacías para anotar la revisión.
 *
 *   npm run requisitos
 *
 * Datos: data/planes/<PF>.json (npm run sipfor), data/planes-formativos.csv, data/verbos-bloom.csv y
 * data/modulo2-cambios-2024-2026.csv. Si existen, privado/drive/recursos-2024.json (carpetas de Drive de 2024)
 * y la carpeta local "Licitaciones TD 2026" (Anexos 2 de referencia). Salida, fuera de git porque enlaza
 * carpetas privadas: privado/drive/Requisitos-Modulo2-TD2026.xlsx
 */
import fs from 'node:fs';
import path from 'node:path';
import { ruta, leer, RAIZ } from './lib/repo.mjs';
import { parseCSV } from './lib/csv.mjs';
import { crearXlsx } from './lib/xlsx.mjs';

const oferta = parseCSV(leer('data/planes-formativos.csv'));
const planes = oferta.map((o) => ({ o, j: JSON.parse(leer(`data/planes/${o.codigo_plan}.json`)) }));
const verbos = parseCSV(leer('data/verbos-bloom.csv'));
const cambios = parseCSV(leer('data/modulo2-cambios-2024-2026.csv'));
const recursos = fs.existsSync(ruta('privado/drive/recursos-2024.json'))
  ? JSON.parse(leer('privado/drive/recursos-2024.json')) : null;
const referenciales = (() => {
  const padre = path.dirname(RAIZ);
  for (const d of fs.readdirSync(padre)) {
    const c = path.join(padre, d, 'Licitaciones TD 2026', 'Anexos 2 Referenciales');
    if (d.startsWith('Licitaciones TD 2026') && fs.existsSync(c)) return fs.readdirSync(c);
  }
  return [];
})();

const S = (texto, estado) => ({ texto, estado });
const carpeta = (id) => `https://drive.google.com/drive/folders/${id}`;
const plano = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();

// ------------------------------------------------------------ verbos y niveles

const FORMA = new Map(verbos.flatMap((v) => v.formas.split('|').map((f) => [plano(f), v])));
function verbo(texto) {
  const w = plano(texto).match(/[A-ZÑ]+/)?.[0] ?? '';
  const v = FORMA.get(w);
  if (!v) throw new Error(`Verbo sin nivel en data/verbos-bloom.csv: «${w}» (${texto.slice(0, 60)}…)`);
  return { ...v, nivel: Number(v.nivel), forma: texto.trim().split(/\s+/)[0] };
}
const etiqueta = (v) => `${v.forma} · ${v.nivel} ${v.categoria}`;

// Lectura propia de cada nivel (no está en las bases): qué evidencia pide y qué recurso la produce.
const NIVEL = {
  1: { demuestra: 'Reconoce o nombra conceptos, elementos o herramientas.',
    recurso: 'Lectura, infografía o cápsula con los conceptos, y preguntas de reconocimiento.',
    instrumento: 'Prueba objetiva: selección múltiple (Anexo 7, 3.3).', basta: S('Sí, si cubre el contenido', 'ok') },
  2: { demuestra: 'Explica con sus palabras, describe, compara o da ejemplos.',
    recurso: 'Explicación con ejemplos del trabajo real, cuadro comparativo o video explicativo, y preguntas abiertas.',
    instrumento: 'Respuesta breve o ejercicio interpretativo (3.3); lista de cotejo (3.1).', basta: S('Sí, si cubre el contenido', 'ok') },
  3: { demuestra: 'Usa la herramienta, la técnica o el lenguaje en un ejercicio y llega a un resultado que funciona.',
    recurso: 'Demostración o tutorial paso a paso en la herramienta, y un ejercicio con archivo de partida y solución.',
    instrumento: 'Resolución de problemas (3.2) con lista de cotejo o rúbrica.', basta: S('Solo de apoyo: falta la práctica', 'pend') },
  4: { demuestra: 'Descompone un caso o un conjunto de datos, compara alternativas y justifica.',
    recurso: 'Caso o datos realistas con una guía de análisis.',
    instrumento: 'Análisis de casos (3.2) con rúbrica.', basta: S('No: necesita un caso o datos', 'subir') },
  5: { demuestra: 'Juzga con criterios explícitos y fundamenta una decisión o recomendación.',
    recurso: 'Caso con alternativas, criterios para evaluarlas y un ejemplo de informe.',
    instrumento: 'Análisis de casos o proyecto (3.2) con rúbrica.', basta: S('No: necesita un caso con criterios', 'subir') },
  6: { demuestra: 'Produce algo propio (código, diseño, prompt, propuesta, tablero) que responde a un requerimiento.',
    recurso: 'Enunciado del requerimiento, un ejemplo resuelto y la rúbrica del producto.',
    instrumento: 'Proyecto individual o grupal (3.2) con rúbrica; va al portafolio.', basta: S('No: necesita un proyecto', 'subir') },
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

// ------------------------------------------------------------ cambios respecto de 2024

const cambiosDe = (pf) => cambios.filter((c) => c.planes.split(/\s+/).includes(pf) || c.planes.startsWith('Los 13') && !['PF1821', 'PF1822'].includes(pf));
function cambio(pf, elemento) {
  const nuevo = ['PF1821', 'PF1822'].includes(pf);
  if (nuevo) return S('Plan nuevo 2026: no existía en 2024', 'subir');
  const c = cambiosDe(pf).find((c) => elemento(c.elemento));
  return c ? S(`${c.tipo}. ${c.efecto_en_recursos}`, 'pend') : S('Igual que en 2024', 'ok');
}
const esAE = (n) => (e) => e === `AE${n}`;
const esCriterio = (n) => (e) => /^Criterios? /.test(e) && e.match(/\d+\.\d+/g)?.includes(n);
const esContenido = (n) => (e) => e === `Contenidos del AE${n}`;

// ------------------------------------------------------------ hojas por curso

const NOMBRE_HOJA = {
  PF1481: 'PF1481 Análisis de Datos', PF1483: 'PF1483 Ciencia de Datos', PF1462: 'PF1462 Machine Learning',
  PF1487: 'PF1487 Ingeniería de Datos', PF1486: 'PF1486 Product Owner', PF1485: 'PF1485 DevOps',
  PF1493: 'PF1493 Seguridad Cloud', PF1495: 'PF1495 Hacking Ético', PF1482: 'PF1482 Arquitectura Cloud',
  PF1822: 'PF1822 Desarrollo con IA', PF1821: 'PF1821 Agentes Low Code',
};
const compartido = {};
for (const { j } of planes) (compartido[j.modulos[1].codigo] ??= []).push(j.codigo_plan);
const hojaDe = (j) => {
  const cods = [...compartido[j.modulos[1].codigo]].sort();
  return cods.length > 1 ? `${cods[0]}-${cods.slice(1).map((c) => c.slice(4)).join('-')} Front-End` : NOMBRE_HOJA[j.codigo_plan];
};
const contenidosTexto = (ae) => ae.contenidos.map((c) => [c.tema, ...c.items.map((i) => `  • ${i}`)].join('\n')).join('\n');

const hojasCurso = [], resumen = [], usoVerbos = new Map();
const vistos = new Set();
for (const { o, j } of planes) {
  const pf = j.codigo_plan, m2 = j.modulos[1], aes = m2.aprendizajes_esperados;
  const vc = verbo(m2.competencia);
  const criterios = aes.flatMap((ae) => ae.criterios_evaluacion.map((c) => ({ ae, c, v: verbo(c.texto) })));
  const nivelesAE = aes.map((ae) => ({ ae, v: verbo(ae.texto) }));
  const todas = herramientas(m2.competencia, ...aes.flatMap((ae) => [ae.texto, ...ae.criterios_evaluacion.map((c) => c.texto), contenidosTexto(ae)]));
  const hoja = hojaDe(j);

  // Resumen: una fila por curso.
  const max = Math.max(...[vc, ...nivelesAE.map((x) => x.v), ...criterios.map((x) => x.v)].map((v) => v.nivel));
  const catMax = verbos.find((v) => Number(v.nivel) === max).categoria;
  const hacer = criterios.filter((x) => x.v.nivel >= 3).length;
  const conPractica = nivelesAE.filter((x) => x.v.nivel >= 3 || x.ae.criterios_evaluacion.some((c) => verbo(c.texto).nivel >= 3)).map((x) => `AE${x.ae.n}`);
  const pocos = aes.filter((ae) => ae.criterios_evaluacion.length < 3).map((ae) => `AE${ae.n} (${ae.criterios_evaluacion.length})`);
  const nuevo = ['PF1821', 'PF1822'].includes(pf);
  const cs = cambiosDe(pf).filter((c) => c.elemento !== 'Modalidad');
  const estado2024 = nuevo ? S('Plan nuevo 2026: sin versión 2024', 'subir')
    : cs.some((c) => !/^(Errata|Forma verbal)/.test(c.tipo)) ? S(`Mismo módulo; ${cs.length} cambio(s) de redacción (ver «Cambios 2024-2026»)`, 'pend')
      : S(cs.length ? 'Mismo módulo (solo erratas)' : 'Mismo módulo, sin cambios', 'ok');
  const rec = recursos?.carpetas?.[pf];
  const recCelda = rec ? { url: carpeta(rec.id), texto: rec.nombre } : recursos?.sinCarpeta?.[pf] ? S(recursos.sinCarpeta[pf], nuevo ? 'ok' : 'subir') : '—';
  const refs = referenciales.filter((f) => f.startsWith(pf)).map((f) => f.replace(/\.docx$/, '').replace(/\(1\)$/, ''));
  const mirar = [
    nuevo ? 'Plan nuevo: no hay recursos de años anteriores.'
      : 'El módulo 2 es el mismo que en 2024: los recursos 2024 de este módulo cubren los mismos aprendizajes y contenidos.',
    nuevo ? '' : 'El plan 2026 es solo e-learning (en 2024 el módulo era e-learning y presencial): cada recurso tiene que funcionar solo en el LMS.',
    `${hacer} de ${criterios.length} criterios piden hacer algo (nivel 3 o más); nivel más alto: ${max} ${catMax}.`,
    conPractica.length ? `Piden más que leer o ver (práctica, caso o proyecto): ${conPractica.join(', ')}.` : '',
    todas.length ? `Los recursos tienen que trabajar con: ${todas.join(', ')}.` : '',
    pocos.length ? `Menos de 3 criterios en el plan: ${pocos.join(', ')}; las bases piden 3 indicadores por AE.` : '',
  ].filter(Boolean).join('\n');
  resumen.push([S(pf, 'curso'), o.linea, j.nombre, `${m2.codigo} · ${m2.nombre}`, `${m2.horas} h`, m2.competencia, etiqueta(vc),
    String(aes.length), String(criterios.length), nivelesAE.map((x) => `AE${x.ae.n} ${x.v.forma} (${x.v.nivel})`).join('\n'),
    `${max} ${catMax}`, `${hacer} de ${criterios.length}`, todas.join(', ') || '—', pocos.join(', ') || '—', estado2024, recCelda,
    refs.length ? refs.join('\n') : S('No hay', 'pend'), mirar, hoja]);

  // Hoja del curso (una sola para los planes que comparten el módulo 2).
  if (vistos.has(m2.codigo)) continue;
  vistos.add(m2.codigo);
  // Los verbos se cuentan una vez por módulo: los 4 Entry level comparten el mismo.
  for (const { ae, v } of nivelesAE) (usoVerbos.get(v.verbo) ?? usoVerbos.set(v.verbo, { v, ae: 0, cr: 0, ej: '' }).get(v.verbo)).ae++;
  for (const { c, v } of criterios) {
    const u = usoVerbos.get(v.verbo) ?? usoVerbos.set(v.verbo, { v, ae: 0, cr: 0, ej: '' }).get(v.verbo);
    u.cr++; u.ej ||= `${pf} ${c.n}: ${c.texto}`;
  }
  const filas = [[S('Competencia', 'curso'), m2.competencia, etiqueta(vc), '', '', '', NIVEL[vc.nivel].demuestra, NIVEL[vc.nivel].recurso,
    NIVEL[vc.nivel].basta, todas.join(', '), '', cambio(pf, (e) => e === 'Competencia del módulo'), '', '', '']];
  for (const { ae, v } of nivelesAE) {
    const cambioContenido = cambiosDe(pf).find((c) => esContenido(ae.n)(c.elemento));
    ae.criterios_evaluacion.forEach((c, i) => {
      const vcr = verbo(c.texto), h = herramientas(c.texto);
      const primera = i === 0;
      const cambioAE = cambio(pf, esAE(ae.n)), cambioCr = cambio(pf, esCriterio(c.n));
      const cambioFila = [primera && cambioAE.estado === 'pend' ? `AE${ae.n}: ${cambioAE.texto}` : '',
        cambioCr.estado === 'pend' ? `${c.n}: ${cambioCr.texto}` : '',
        primera && cambioContenido ? `Contenidos: ${cambioContenido.tipo}. ${cambioContenido.efecto_en_recursos}` : ''].filter(Boolean).join('\n');
      filas.push([primera ? S(`AE${ae.n}`, 'curso') : `AE${ae.n}`, primera ? ae.texto : '', primera ? etiqueta(v) : '', c.n, c.texto, etiqueta(vcr),
        NIVEL[vcr.nivel].demuestra, NIVEL[vcr.nivel].recurso + (h.length ? ` Con: ${h.join(', ')}.` : ''), NIVEL[vcr.nivel].basta,
        primera ? herramientas(ae.texto, ...ae.criterios_evaluacion.map((x) => x.texto), contenidosTexto(ae)).join(', ') : '',
        primera ? contenidosTexto(ae) : '', cambioFila ? S(cambioFila, 'pend') : cambioAE.estado === 'subir' ? cambioAE : S('Igual que en 2024', 'ok'),
        '', '', '']);
    });
  }
  const planesHoja = [...compartido[m2.codigo]].sort();
  hojasCurso.push({ nombre: hoja, titulo: `${planesHoja.join(' · ')} · ${planesHoja.length > 1 ? 'Desarrollo de aplicaciones (Entry level)' : j.nombre}`,
    subtitulo: `Módulo 2: ${m2.codigo} · ${m2.nombre} · ${m2.horas} h · una fila por criterio · las 3 últimas columnas son para anotar la revisión de recursos`,
    encabezados: ['AE', 'Aprendizaje esperado (textual)', 'Verbo del AE · nivel', 'Criterio', 'Criterio de evaluación (textual)', 'Verbo · nivel',
      'Qué tiene que demostrar el participante', 'Qué necesita un recurso para servir', '¿Basta un recurso expositivo? (flipbook, infografía, video, quiz)',
      'Herramientas y tecnologías del AE', 'Contenidos del AE (textuales)', 'Cambio respecto de 2024',
      'Recurso 2024 que lo cubre (completar)', '¿Sirve? Sí / Adaptar / Rehacer (completar)', 'Observaciones (completar)'],
    filas, alto: 'auto', anchos: { fijas: 1, cols: [11, 40, 16, 8, 44, 16, 30, 36, 18, 22, 60, 30, 26, 16, 26] } });
}

// ------------------------------------------------------------ qué exigen las bases (igual para los 15)

const bases = [
  ['1', 'Se desarrolla y se evalúa el segundo módulo del plan formativo', 'Bases 2026, 7.4, pág. 27; 7.4 B, pág. 27; 7.4 C, pág. 30',
    '—', 'El módulo 2 completo en el LMS. La supervisión previa revisa que estén todos los módulos del plan (Anexo 16, 1.1, pág. 128).',
    'Las carpetas «Contenido M2» de 2024 (mismo módulo 2 en los 13 cursos que existían).', 'En 2024 era el 1° en emprendedor digital y el 2° en línea regular; en 2026, siempre el 2°.'],
  ['2', 'Cumplir a cabalidad lo que dice el plan formativo: habilidades, competencias, conocimientos y destrezas', 'Anexo 7, num. 1, pág. 96',
    '—', 'Aprendizajes esperados, criterios y contenidos del plan, sin reformular (pestañas de cada curso).', 'Recursos 2024 del mismo módulo.', 'Igual.'],
  ['3', 'Aprendizajes esperados con verbo + objeto + condición, que avanzan en complejidad (ascenso taxonómico)', 'Anexo 7, pág. 99',
    '—', 'Recursos y actividades del nivel que pide cada verbo (pestaña «Verbos»).', 'Flipbook, infografía, video y quiz alcanzan los niveles 1 y 2; desde el 3 hace falta práctica (ABP, ABPRO, ejercicios).', 'Igual.'],
  ['4', 'Al menos 3 indicadores de evaluación por aprendizaje esperado: acción (verbo en presente) + contenido + condición', 'Bases 2026, 7.4 B.1, pág. 28; nota de la pág. 30; Anexo 7, 2.1, pág. 99',
    '3 por AE (aunque el plan traiga menos criterios)', 'Indicadores propios para cada AE; ver en «Resumen» los AE con menos de 3 criterios.', 'Los indicadores del Anexo 2 de 2024 del curso.', 'En 2024 el subcriterio se llamaba «Indicadores de logro».'],
  ['5', 'Tres instrumentos de evaluación distintos, cada uno con todos los aprendizajes esperados del módulo', 'Bases 2026, 7.4 B.2, pág. 28; Anexo 7, num. 3, págs. 100-102',
    '3 distintos', 'Uno de observación (lista de cotejo, escala o rúbrica), uno de desempeño (resolución de problemas, casos, proyecto) y uno objetivo (selección múltiple, respuesta breve).', 'Quiz 2024 (objetivo); carpeta «Rúbricas genéricas» de 2024.', 'Igual.'],
  ['6', 'Portafolio progresivo o acumulativo con el 100% de los elementos del numeral 4.3', 'Bases 2026, 7.4 B.3, pág. 28; Anexo 7, 4.3, pág. 104',
    '6 de 6', 'Guía o índice, introducción, temas por AE con evidencias, cierre, plataforma de publicación e instrumento evaluativo desarrollado.', 'Revisar si el Anexo 2 de 2024 lo trae desarrollado.', 'Igual.'],
  ['7', 'Mecanismo de retroalimentación, pauta de autoevaluación y pauta de coevaluación', 'Bases 2026, 7.4 B.4, pág. 29; Anexo 7, num. 5, págs. 104-106',
    'Las tres', 'Feedback al participante, autoevaluación, coevaluación y bitácora de resultados y plan de trabajo (5.4).', 'Revisar si el Anexo 2 de 2024 las trae.', 'Igual.'],
  ['8', 'Metodología enfocada en la competencia del módulo y no genérica; se evalúa por la experiencia del usuario en el LMS', 'Bases 2026, 7.4 C, pág. 30',
    'Binario: 7,0 o 1,0', 'Recursos y actividades que nombran la competencia y situaciones reales del trabajo.', 'Los recursos 2024 de cada curso son específicos del módulo.', 'Igual.'],
  ['9', 'Dos actividades prácticas distintas que permitan adquirir la habilidad del aprendizaje esperado', 'Bases 2026, 7.4 C, pág. 31; Anexo 7, 7 b, pág. 110, y definición en pág. 111',
    '2 distintas', 'Por ejemplo análisis de casos, aprendizaje basado en problemas, resolución de problemas, juego de roles, simulación o gamificación.', 'ABP y ABPRO de 2024 (hay carpetas en «Contenido M2 Arquitectura Cloud»; revisar en los demás cursos).', 'Igual.'],
  ['10', 'Aspectos motivacionales: el módulo aporta al aprendizaje por la interacción con la plataforma (diseño intuitivo, lineal y amigable)', 'Bases 2026, 7.4 C, pág. 31; Anexo 7, 7 c, pág. 110',
    'Binario: 7,0 o 1,0', 'Navegación clara, con íconos, multimedia e imágenes que el participante usa.', 'Video de bienvenida, infografías y quiz interactivos de 2024.', 'Igual.'],
  ['11', 'Dos herramientas didácticas distintas, y las dos deben permitir adquirir la habilidad del aprendizaje esperado', 'Bases 2026, 7.4 C, pág. 31; Anexo 7, 7 d, pág. 110, y definición en pág. 111',
    '2, ambas efectivas', 'Presentaciones, tutoriales, videos interactivos, instructivo, cuadro comparativo o multimedia.', 'Flipbook y video resumen de 2024, si enseñan a hacer lo que pide el verbo del AE.', 'Igual.'],
  ['12', 'Tres estrategias de aprendizaje para al menos tres habilidades del siglo XXI', 'Bases 2026, 7.4 C, pág. 31; Anexo 7, págs. 108-111',
    '3 estrategias, 3 habilidades', 'Por ejemplo colaboración, pensamiento crítico y alfabetización digital, trabajadas en las actividades.', '—', 'Igual.'],
  ['13', 'Los recursos de aprendizaje apuntan a las capacidades de los aprendizajes esperados, con enfoque práctico y anclado a la realidad laboral', 'Anexo 7, num. 1 b y c, pág. 96',
    '—', 'Cada recurso ligado a un AE, con ejemplos del trabajo real.', 'Revisar que cada recurso 2024 diga a qué AE responde.', 'Igual.'],
  ['14', 'Herramientas educativas, vinculación temprana y extensión se desarrollan para todo el plan, no solo para el módulo 2', 'Bases 2026, 7.4 D, págs. 32-33',
    '5 herramientas, 4 estrategias, 1 extensión cada 50 h', 'Listas para todo el plan formativo (no son recursos del módulo 2).', '—', 'En 2024 el ítem D tenía además intermediación laboral (30%), que ya no existe.'],
  ['15', 'En la ejecución: inducción metodológica en el módulo de bienvenida, instrumento de evaluación en cada módulo, contenido obligatorio y complementario, y todos los formatos funcionando', 'Anexo 16, 1.2-1.4 y 3.1, pág. 128',
    '—', 'Enlaces y archivos que abren y se ven bien en el LMS.', 'Recursos 2024 en Genially, Drive u otras plataformas: comprobar que siguen abiertos.', '—'],
  ['16', 'En la ejecución: enlaces o multimedia con errores es infracción leve; usar recursos distintos a los revisados en la supervisión previa, o no mantener la accesibilidad comprometida, es infracción menos grave', 'Bases 2026, 13.3.3 h), pág. 53; 13.3.2 o) y r), pág. 52',
    '—', 'Recursos revisados, con enlaces vigentes y accesibles antes de subirlos.', 'Todo recurso 2024 que se reutilice.', '—'],
];

// ------------------------------------------------------------ verbos, cambios y fuentes

const filasVerbos = [...usoVerbos.values()].sort((a, b) => a.v.nivel - b.v.nivel || (b.ae + b.cr) - (a.ae + a.cr)).map(({ v, ae, cr, ej }) => [
  S(v.verbo, 'curso'), `${v.nivel} ${v.categoria}`, String(ae), String(cr), NIVEL[v.nivel].demuestra, NIVEL[v.nivel].recurso, NIVEL[v.nivel].basta,
  NIVEL[v.nivel].instrumento, ej]);
const filasCambios = cambios.map((c) => [S(c.planes, 'curso'), c.elemento, c.texto_2024, c.texto_2026, c.tipo, c.efecto_en_recursos]);
const fuentes = [
  ['Planes 2026', 'SIPFOR (npm run sipfor): Res. 3615 del 05-12-2024, versión 1, para 13 planes; Res. 1868 del 05-08-2026, versión 1, para PF1821 y PF1822',
    'Textos del módulo 2 sin reformular. 12 de 15 cotejados con los PDF de «PF SENCE a licitar» (npm run planes).'],
  ['Planes 2024', 'Drive «Talento Digital 2024 Licitación» → «PF Sofofa 2024» (los .docx usados en la licitación 2024)',
    'Comparados con 2026 aprendizaje por aprendizaje, criterio por criterio y contenido por contenido el 2026-09-30. Resultado en data/modulo2-cambios-2024-2026.csv.'],
  ['Recursos 2024', 'Drive «Talento Digital 2024 Licitación» → «Contenidos Finales» → «Contenido M2 …», y la hoja «Copia de Recursos educativos»',
    'Inventario 2024: flipbook, video de bienvenida, video resumen, quiz, infografía; en algunas carpetas, también ABP y ABPRO.'],
  ['Anexos 2 de referencia', 'Carpeta «Licitaciones TD 2026 / Anexos 2 Referenciales» (de otras instituciones, 2024)', 'Sus aprendizajes y criterios del módulo 2 coinciden con los de 2026.'],
  ['Qué exigen las bases', 'Bases 2026, Res. Ex. N°2320: punto 7.4 (págs. 27-33), Anexo 7 (págs. 96-115), Anexo 16 (pág. 128) y 13.3 (págs. 50-53)', 'Cada fila de «Qué exigen las bases» cita numeral y página.'],
  ['Niveles de los verbos', 'Taxonomía de Bloom revisada (Anderson y Krathwohl, 2001), en data/verbos-bloom.csv',
    'Lectura nuestra para revisar recursos: las bases solo piden verbo + objeto + condición y ascenso taxonómico (Anexo 7, pág. 99).'],
  ['Para regenerarla', 'npm run requisitos', 'Salida: privado/drive/Requisitos-Modulo2-TD2026.xlsx (fuera de git porque enlaza carpetas privadas de Drive).'],
];

const fecha = new Date().toLocaleDateString('es-CL');
const HOJAS = [
  { nombre: 'Resumen', titulo: 'Qué exige 2026 del módulo 2 · Talento Digital 2026',
    subtitulo: `Una fila por curso · qué pide el plan, a qué nivel, con qué herramientas, qué cambió desde 2024 y dónde están los recursos 2024 · ${fecha}`,
    encabezados: ['Código', 'Línea', 'Plan', 'Módulo 2', 'Horas M2', 'Competencia del módulo (textual)', 'Verbo de la competencia · nivel',
      'AE', 'Criterios', 'Verbos de los AE (nivel)', 'Nivel más alto que pide', 'Criterios de «hacer» (nivel 3 o más)', 'Herramientas y tecnologías que nombra',
      'AE con menos de 3 criterios', '¿Cambió respecto de 2024?', 'Recursos 2024 (carpeta en Drive)', 'Anexo 2 de referencia 2024',
      'Qué mirar al revisar los recursos 2024', 'Pestaña'],
    filas: resumen, alto: 'auto', anchos: { fijas: 1, cols: [9, 14, 28, 30, 8, 44, 16, 5, 8, 22, 12, 12, 30, 14, 24, 24, 26, 60, 20] } },
  { nombre: 'Qué exigen las bases', titulo: 'Qué exigen las bases 2026 para el módulo 2 (igual para los 15 cursos)',
    subtitulo: 'Con numeral y página de la Res. Ex. N°2320 · la columna de recursos 2024 es una lectura nuestra, para orientar la revisión',
    encabezados: ['#', 'Qué exige', 'Dónde lo dice', 'Para el 7,0', 'Qué tiene que existir en el módulo 2', 'Qué recurso 2024 podría cubrirlo', 'Cambio respecto de las bases 2024'],
    filas: bases, alto: 'auto', anchos: { fijas: 0, cols: [5, 44, 30, 16, 44, 40, 32] } },
  { nombre: 'Verbos', titulo: 'Verbos del módulo 2 de los 15 cursos, por nivel',
    subtitulo: 'Taxonomía de Bloom revisada · se cuentan los 12 módulos distintos (los 4 Entry level comparten el suyo) · qué tiene que demostrar el participante y qué necesita un recurso',
    encabezados: ['Verbo', 'Nivel', 'En AE', 'En criterios', 'Qué tiene que demostrar el participante', 'Qué necesita un recurso para servir',
      '¿Basta un recurso expositivo?', 'Instrumento que lo mide (Anexo 7)', 'Ejemplo del plan'],
    filas: filasVerbos, alto: 'auto', anchos: { fijas: 1, cols: [15, 13, 7, 9, 34, 40, 18, 32, 60] } },
  { nombre: 'Cambios 2024-2026', titulo: 'Qué cambió en el módulo 2 entre el plan usado en 2024 y el plan 2026',
    subtitulo: 'Todo lo que no aparece aquí es igual: mismos aprendizajes, criterios y contenidos (comparados uno por uno)',
    encabezados: ['Planes', 'Elemento', 'Texto 2024', 'Texto 2026', 'Tipo de cambio', 'Efecto en los recursos'],
    filas: filasCambios, alto: 'auto', anchos: { fijas: 1, cols: [14, 16, 50, 50, 22, 44] } },
  ...hojasCurso,
  { nombre: 'Fuentes', titulo: 'De dónde sale cada dato', subtitulo: 'Para volver a generarla: npm run requisitos',
    encabezados: ['Qué', 'Fuente', 'Nota'], filas: fuentes, alto: 'auto', anchos: { fijas: 0, cols: [22, 60, 70] } },
];
const salida = 'privado/drive/Requisitos-Modulo2-TD2026.xlsx';
fs.mkdirSync(ruta('privado/drive'), { recursive: true });
fs.writeFileSync(ruta(salida), crearXlsx(HOJAS));
console.log(`${salida} → ${resumen.length} cursos, ${hojasCurso.length} pestañas de curso, ${filasVerbos.length} verbos, ${filasCambios.length} cambios 2024-2026`
  + (recursos ? '' : ' · sin privado/drive/recursos-2024.json: la columna de carpetas 2024 queda vacía'));
