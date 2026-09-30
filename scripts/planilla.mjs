#!/usr/bin/env node
/**
 * Planilla de seguimiento del módulo 2 (a la manera de la planilla "Recursos a desarrollar" de la
 * contraparte), en .xlsx con formato, para subirla a Google Drive convertida en Google Sheets:
 *
 *   npm run planilla
 *   npm run planilla -- --hoja "ABP y ABPRO"   # solo esa hoja, para importarla como pestaña nueva en Google Sheets
 *   npm run planilla -- --hoja "Evaluación y cierre"
 *
 * Hojas: Resumen (una fila por cliente y curso), Aprendizajes, ABP y ABPRO (una fila por aprendizaje, con
 * sus dos actividades en Google Docs y PDF), Evaluación y cierre (los insumos de todo el módulo, npm run evaluacion), Entregables (recursos neutros con enlace público al sitio) y
 * Pendientes. Los enlaces de Drive salen de privado/drive/enlaces.json
 * ({ "ruta/relativa/en/la/carpeta": "https://drive…" }); si falta uno, la celda dice "Por subir".
 * Salida: privado/drive/Planilla-Modulo2-TD2026.xlsx (fuera de git: nombra a los clientes).
 */
import fs from 'node:fs';
import path from 'node:path';
import { ruta, leer, listar } from './lib/repo.mjs';
import { crearXlsx } from './lib/xlsx.mjs';

const SITIO = 'https://naty-proyecto01.vercel.app';
const QUIZ_WEB = `${SITIO}/quiz-modulo2.html`; // ancla del quiz de la prueba objetiva por aprendizaje: #PF1821-ae1
const CURSOS = [
  { pf: 'PF1821', nombre: 'Construcción de Agentes y Automatización con Herramientas Low Code', carpeta: 'PF1821-agentes-low-code', drive: 'PF1821 - Agentes y Automatizacion Low Code',
    clientes: [['UNAB', 'UNAB'], ['Skillnest', 'Skillnest']] },
  { pf: 'PF1822', nombre: 'Especialización en Desarrollo con IA', carpeta: 'PF1822-desarrollo-con-ia', drive: 'PF1822 - Especializacion en Desarrollo con IA',
    clientes: [['UNAB', 'UNAB'], ['Skillnest', 'Skillnest'], ['U. Autónoma', 'U. Autonoma']] },
];
const OBS = {
  Skillnest: 'Colores tomados del logo y del sitio (sin manual): confirmar con el cliente.',
  'U. Autónoma': 'El manual pide Montserrat; los PDF usan IBM Plex: confirmar.',
  UNAB: 'Colores y logo del manual de marca (nov. 2024).',
};
const enlaces = fs.existsSync(ruta('privado/drive/enlaces.json')) ? JSON.parse(leer('privado/drive/enlaces.json')) : {};

// ------------------------------------------------------------ datos

const plan = (pf) => JSON.parse(leer(`data/planes/${pf}.json`));
// Los quiz formativos van solo como juego (HTML y SCORM), uno por aprendizaje: sin Canva ni GIFT en la
// planilla (pedido del usuario, 2026-09-29). El GIFT de la prueba objetiva por aprendizaje sí se mantiene.
const meta = (pf) => JSON.parse(leer(`.scratch/produccion/${pf}/manifiesto.json`)).meta;

const E = { ok: 'ok', pend: 'pend', subir: 'subir' };
const L = (texto, url) => ({ texto, url });
const S = (texto, estado) => ({ texto, estado });
// "F:id" es una carpeta de Drive, "D:id" un documento de Google y "A:id", un archivo.
const u = (v) => (!v ? null : v.startsWith('F:') ? `https://drive.google.com/drive/folders/${v.slice(2)}`
  : v.startsWith('D:') ? `https://docs.google.com/document/d/${v.slice(2)}/edit` : `https://drive.google.com/file/d/${v.slice(2)}/view`);
const en = (v, texto) => (u(v) ? L(texto, u(v)) : S('Por subir a Drive', E.subir));

const resumen = [];
for (const c of CURSOS) {
  const d = enlaces[c.pf] ?? {};
  // Quiz gamificados, uno por aprendizaje esperado: cada juego como archivo en Drive (se descarga y se abre) y la
  // carpeta con los SCORM.
  const juegos = [1, 2, 3, 4].map((n) => en(d.quizJuego?.[`M2-Quiz-${n}-Juego.html`], `M2-Quiz-${n}-Juego.html`));
  for (const [cliente] of c.clientes) {
    const cl = d.clientes?.[cliente] ?? {};
    resumen.push([
      S(`${c.pf} · ${c.nombre}`, 'curso'), 'Especialidad', S(cliente, 'curso'),
      'AE1 a AE4 (hoja Aprendizajes)',
      en(cl.cuadernillos, 'Cuadernillos con marca'), en(cl.documentos, 'Documentos con marca'), S('Pendiente: armar en Rise', E.pend),
      en(d.bienvenidaCurso, 'Ver video'), en(d.resumen, 'Ver video'), en(d.bienvenidaModulo, 'Ver video'),
      en(d.videos, 'Carpeta de videos'), en(d.herramienta2, 'Ver video'),
      ...juegos, en(d.quizJuego?.carpeta, 'Juegos y SCORM (carpeta)'), en(d.abpAbpro?.carpeta, 'ABP y ABPRO (carpeta)'),
      en(d.evaluacionModulo?.carpeta, 'Evaluación y cierre (carpeta)'),
      en(d.infografias, 'Infografías (PNG)'),
      en(cl.carpeta, `Carpeta ${cliente}`), en(d.carpeta, 'Carpeta del curso'),
      S('Listo para revisión', E.ok), OBS[cliente],
    ]);
  }
}

const aprendizajes = [];
for (const c of CURSOS) {
  const m2 = plan(c.pf).modulos.find((m) => m.n === 2);
  const lecturas = meta(c.pf).lecturas;
  for (const ae of m2.aprendizajes_esperados) {
    const k = `AE${ae.n}`;
    aprendizajes.push([S(c.pf, 'curso'), `${m2.codigo} · ${m2.nombre} · ${m2.horas} h`, k, ae.texto,
      L(`Lectura ${k} · ${lecturas[k]}`, `${SITIO}/modulo-2/${c.carpeta}/entrega/${k}/M2-${k}-Lectura.pdf`),
      L(`Ver quiz ${k} (GIFT)`, `${QUIZ_WEB}#${c.pf}-ae${ae.n}`)]);
  }
}

// ABP individual y ABPRO grupal por aprendizaje (npm run abp): cada uno como Google Doc (para editar y pegar
// en la Tarea del LMS) y PDF (para adjuntar). Títulos desde contenidos/<PF>/modulo-2/R-abp-abpro.md.
const abp = [];
for (const c of CURSOS) {
  const m2 = plan(c.pf).modulos.find((m) => m.n === 2);
  const d = enlaces[c.pf]?.abpAbpro ?? {};
  const titulos = Object.fromEntries([...leer(`contenidos/${c.pf}/modulo-2/R-abp-abpro.md`).matchAll(/^## (AE\d) · (ABPRO|ABP) · (.+)$/gm)]
    .map((m) => [`${m[1]}-${m[2]}`, m[3]]));
  for (const ae of m2.aprendizajes_esperados) {
    const k = `AE${ae.n}`;
    const act = (tipo) => [titulos[`${k}-${tipo}`] ?? '—', en(d[`${k}-${tipo}`]?.doc, 'Google Doc'), en(d[`${k}-${tipo}`]?.pdf, 'PDF')];
    abp.push([S(c.pf, 'curso'), k, ae.texto, ...act('ABP'), ...act('ABPRO'), S('Listo para revisión', E.ok)]);
  }
}

// Evaluación y cierre del módulo (npm run evaluacion): los insumos de todo el módulo, en PDF, iguales para todos
// los clientes. Títulos desde contenidos/<PF>/modulo-2/R-evaluacion-modulo.md; el glosario también va en XML
// para importarlo en una actividad Glosario de Moodle.
const INSUMOS = [
  ['M2-01-Evaluacion-diagnostica', 'Inicio', 'Contenidos 1 a 4 del plan (Parte A) y criterios de evaluación de AE1 a AE4 (Parte B)', 'Participante'],
  ['M2-01-Evaluacion-diagnostica-Pauta-tutor', 'Inicio', 'Clave de cada ítem con su contenido y su criterio de evaluación', 'Solo tutor/a'],
  ['M2-02-Glosario-integrador', 'Todo el módulo', 'Todos los temas de los 4 contenidos del plan, por contenido', 'Participante'],
  ['M2-03-Actividad-final-integradora', 'Cierre', 'Competencia del módulo y todos sus contenidos (sin separar por aprendizaje)', 'Participante'],
  ['M2-04-Autoevaluacion', 'Cierre', 'Criterios de evaluación de AE1 a AE4 y componentes de la competencia', 'Participante'],
  ['M2-05-Coevaluacion-por-pares', 'Cierre', 'Componentes de la competencia (actividad final) y ABPRO de AE1 a AE4', 'Participante'],
  ['M2-06-Evaluacion-final-portafolio', 'Cierre', 'AE1 a AE4 (evidencias: su ABP y su ABPRO) y competencia del módulo', 'Participante'],
];
const evaluacion = [];
for (const c of CURSOS) {
  const d = enlaces[c.pf]?.evaluacionModulo ?? {};
  const f = `contenidos/${c.pf}/modulo-2/R-evaluacion-modulo.md`;
  const titulos = fs.existsSync(ruta(f)) ? Object.fromEntries([...leer(f).matchAll(/^## \d\d · (.+)\n- \*\*Archivo:\*\* (\S+)/gm)].map((m) => [m[2], m[1]])) : {};
  titulos['M2-02-Glosario-integrador'] = 'Glosario integrador del módulo 2';
  INSUMOS.forEach(([archivo, momento, vinculo, para], i) => {
    const otros = archivo === 'M2-02-Glosario-integrador' ? en(d[`${archivo}-Moodle.xml`], 'Moodle (XML)') : '—';
    evaluacion.push([S(c.pf, 'curso'), String(i + 1), titulos[archivo] ?? archivo, momento, vinculo, para, en(d[archivo], 'PDF'), otros, S('Listo para revisión', E.ok)]);
  });
}

// Recursos neutros publicados en el sitio, agrupados.
const JUEGO = /^quiz\/M2-Quiz-\d-Juego/; // quiz gamificados (npm run quiz-juego): HTML y SCORM
const GRUPOS = [
  ['AE', 'Lecturas y quiz por aprendizaje'], ['evaluacion', 'Evaluación'], ['actividades', 'Actividades'],
  ['metodologia', 'Metodología'], ['medios', 'Medios'], ['glosario', 'Glosario'],
  ['juego', 'Quiz formativos gamificados'], ['herramientas', 'Herramientas didácticas'],
];
const delGrupo = (clave, x) => (clave === 'AE' ? /^AE\d\//.test(x) : clave === 'juego' ? JUEGO.test(x)
  : x.startsWith(`${clave}/`) && !JUEGO.test(x));
const entregables = [];
for (const c of CURSOS) {
  const ent = `modulo-2/${c.carpeta}/entrega`;
  const archivos = listar(ruta(ent)).map((a) => path.relative(ruta(ent), a).replace(/\\/g, '/'))
    .filter((r) => !r.startsWith('insumos-anexo/') && !r.endsWith('.html') || r.startsWith('actividades/moodle/') || JUEGO.test(r));
  for (const [clave, grupo] of GRUPOS) {
    for (const r of archivos.filter((x) => delGrupo(clave, x)).sort()) {
      const nombre = path.basename(r);
      const tutor = /Respuesta-modelada|respuesta-modelada\//.test(r);
      // Un .gift se descarga: se enlaza a su quiz en la vista web (scripts/lib/quiz-gift.mjs).
      const quiz = /^AE(\d)\/M2-AE\d-Quiz\.gift$/.exec(r);
      const scorm = r.endsWith('-SCORM.zip');
      // Los quiz gamificados se revisan como archivo en Drive; el sitio queda solo si aún no se subieron.
      const drive = JUEGO.test(r) ? u(enlaces[c.pf]?.quizJuego?.[nombre]) : null;
      const enlace = quiz ? L('Ver en la web', `${QUIZ_WEB}#${c.pf}-ae${quiz[1]}`)
        : drive ? L('Abrir en Drive', drive)
        : L(JUEGO.test(r) ? (scorm ? 'Descargar' : 'Jugar') : 'Abrir', `${SITIO}/${ent}/${r}`);
      const formato = JUEGO.test(r) ? (scorm ? 'SCORM 1.2 (Moodle)' : 'HTML (juego)') : path.extname(nombre).slice(1).toUpperCase();
      entregables.push([S(c.pf, 'curso'), grupo, nombre, formato,
        tutor ? 'Solo tutor' : 'Participante', enlace, S('Listo para revisión', E.ok)]);
    }
  }
}

const pendientes = [
  ['Usuario', 'Armar las lecturas en Rise, un curso por cliente (guía: modulo-2/GUIA-RISE.md)', 'Drive (NATY 2.0)', S('Pendiente', E.pend)],
  ['Contraparte / Natalia', 'Revisar los 4 quiz gamificados de cada curso, uno por aprendizaje esperado (juego en HTML y paquete SCORM para Moodle) (#22)', 'Hoja Entregables · Quiz formativos gamificados', S('Por confirmar', E.pend)],
  ['Usuario', 'Crear en el LMS de cada cliente una Tarea por ABP y por ABPRO (16 por cliente y curso): el texto del Google Doc va en la descripción y el PDF, adjunto', 'Hoja ABP y ABPRO · Drive: 5 ABP y ABPRO', S('Pendiente', E.pend)],
  ['Usuario', 'Cargar en el LMS de cada cliente la evaluación y el cierre del módulo: diagnóstica (cuestionario o Tarea), actividad final, autoevaluación, coevaluación y portafolio (Tareas con su PDF), y el glosario (actividad Glosario, importando el XML)', 'Hoja Evaluación y cierre · Drive: 6 Evaluación y cierre', S('Pendiente', E.pend)],
  ['Equipo', 'Alinear la sección V del Anexo 2 (instrumento 2, portafolio, autoevaluación y coevaluación) con los insumos de evaluación y cierre', 'Anexo 2 de cada institución', S('Pendiente', E.pend)],
  ['Contraparte / Natalia', '¿El aprendizaje seleccionado es el AE3? (pregunta abierta #17)', '—', S('Por confirmar', E.pend)],
  ['Contraparte / Natalia', '¿Mismos recursos con distinta marca para clientes que compiten en el mismo plan? (#18)', '—', S('Por confirmar', E.pend)],
  ['Clientes', 'Colores oficiales de Skillnest y tipografía de la U. Autónoma (#19)', '—', S('Por confirmar', E.pend)],
  ['Equipo', 'Herramientas de la industria (5), vinculación temprana (4) y actividades de extensión', 'Anexo 2 de cada institución', S('Pendiente', E.pend)],
];

// ------------------------------------------------------------ xlsx

const fecha = new Date().toLocaleDateString('es-CL');
const HOJAS = [
  { nombre: 'Resumen', titulo: 'Módulo 2 · Recursos educativos · PF1821 y PF1822',
    subtitulo: `Una fila por cliente y curso · estándar de la contraparte · actualizado ${fecha} · los quiz gamificados se descargan de Drive y se abren con doble clic en el navegador; el .zip (SCORM) es para subir al LMS`,
    encabezados: ['Curso', 'Tipo', 'Cliente', 'Aprendizajes esperados (M2)', 'Cuadernillos (lecturas, actividades, evaluación, metodología, tutor, glosario)',
      'Documentos sueltos', 'Lecturas (Rise)', 'Video de bienvenida (curso)', 'Video resumen (módulo)', 'Video de bienvenida (módulo)', 'Videocápsulas AE1 a AE4',
      'Video herramienta 2 (AE3)',
      'Quiz AE1 gamificado (archivo)', 'Quiz AE2 gamificado (archivo)', 'Quiz AE3 gamificado (archivo)', 'Quiz AE4 gamificado (archivo)',
      'Quiz gamificados: juegos y SCORM (carpeta)', 'ABP y ABPRO (carpeta)', 'Evaluación y cierre (carpeta)',
      'Infografías', 'Carpeta del cliente', 'Carpeta del curso', 'Estado', 'Observaciones'],
    filas: resumen, anchos: { fijas: 3, cols: [34, 12, 13, 22, 26, 18, 20, 16, 16, 16, 18, 16, 20, 20, 20, 20, 22, 20, 22, 18, 18, 18, 18, 40] } },
  { nombre: 'Aprendizajes', titulo: 'Aprendizajes esperados del módulo 2', subtitulo: 'Textuales de la ficha SIPFOR · con su lectura y su quiz',
    encabezados: ['Curso', 'Módulo', 'AE', 'Aprendizaje esperado (textual del plan)', 'Lectura', 'Quiz'],
    filas: aprendizajes, anchos: { fijas: 1, cols: [10, 34, 6, 70, 34, 20] } },
  { nombre: 'ABP y ABPRO', titulo: 'ABP individual y ABPRO grupal por aprendizaje esperado del módulo 2',
    subtitulo: 'Una fila por aprendizaje · el Google Doc se copia en la descripción de la Tarea del LMS y el PDF se adjunta · los mismos para todos los clientes',
    encabezados: ['Curso', 'AE', 'Aprendizaje esperado', 'ABP individual', 'ABP (Google Doc)', 'ABP (PDF)', 'ABPRO grupal', 'ABPRO (Google Doc)', 'ABPRO (PDF)', 'Estado'],
    filas: abp, alto: 'auto', anchos: { fijas: 2, cols: [10, 7, 62, 30, 14, 11, 30, 14, 11, 20] } },
  { nombre: 'Evaluación y cierre', titulo: 'Evaluación y cierre del módulo 2 (todo el módulo)',
    subtitulo: 'Una fila por insumo · en el orden en que se usan · los mismos para todos los clientes · sin duración de las actividades',
    encabezados: ['Curso', 'N°', 'Insumo', 'Momento', 'Vínculo con el plan formativo', 'Para', 'PDF', 'Otros formatos', 'Estado'],
    filas: evaluacion, alto: 'auto', anchos: { fijas: 1, cols: [10, 5, 46, 14, 52, 13, 10, 14, 20] } },
  { nombre: 'Entregables', titulo: 'Entregables del módulo 2 (versión neutra, sin marca)', subtitulo: `Enlaces públicos al sitio ${SITIO}, salvo los quiz gamificados, que abren su archivo en Drive · las versiones con marca están en la carpeta de cada cliente en Drive`,
    encabezados: ['Curso', 'Grupo', 'Archivo', 'Formato', 'Para', 'Enlace', 'Estado'],
    filas: entregables, anchos: { fijas: 1, cols: [10, 28, 46, 9, 13, 10, 20] } },
  { nombre: 'Pendientes', titulo: 'Pendientes del módulo 2', subtitulo: 'Quién, qué y dónde se sube',
    encabezados: ['Quién', 'Qué', 'Dónde', 'Estado'], filas: pendientes, anchos: { fijas: 0, cols: [22, 80, 34, 16] } },
];
const iHoja = process.argv.indexOf('--hoja');
const soloHoja = iHoja > 0 ? process.argv[iHoja + 1] : null;
if (soloHoja && !HOJAS.some((h) => h.nombre === soloHoja)) throw new Error(`No hay una hoja "${soloHoja}". Hojas: ${HOJAS.map((h) => h.nombre).join(', ')}`);
const salida = soloHoja ? `privado/drive/Planilla-${soloHoja.replace(/\W+/g, '-')}.xlsx` : 'privado/drive/Planilla-Modulo2-TD2026.xlsx';
fs.mkdirSync(ruta('privado/drive'), { recursive: true });
fs.writeFileSync(ruta(salida), crearXlsx(soloHoja ? HOJAS.filter((h) => h.nombre === soloHoja) : HOJAS));
const conDrive = Object.keys(enlaces).length;
console.log(`${salida} → ${resumen.length} filas en Resumen, ${aprendizajes.length} aprendizajes, ${abp.length} filas de ABP y ABPRO, ${evaluacion.length} de evaluación y cierre, ${entregables.length} entregables, ${pendientes.length} pendientes · enlaces de Drive: ${conDrive}`);
