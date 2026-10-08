// Verificador de Anexos 2 contra la tabla de verdad.
//
// Principio: el texto de cada anexo se compara con la tabla de verdad (SIPFOR, planilla 02 y aulas medidas).
// Nadie "opina" anexo por anexo: cada chequeo es una función determinista que devuelve un estado y su evidencia
// (cita textual + sección del anexo). Lo que no se puede decidir comparando textos queda «REQUIERE JUICIO».
//
// Fórmula (ver README de esta carpeta):
//   Índice de Alineación  IA = Σ peso·[CUMPLE] / Σ peso·[CUMPLE o NO CUMPLE]     peso: crítica 3 · mayor 2 · menor 1
//   Completitud           K  = casillas evaluadas / casillas esperadas (anexos esperados × chequeos)
//   Estado del anexo      BLOQUEADO si no se pudo leer o falla un chequeo crítico;
//                         OBSERVADO si IA < 100 % o queda juicio pendiente; LISTO si IA = 100 % y sin juicio.
//   Sensibilidad          S  = errores sembrados detectados / errores sembrados (prueba con --sembrar)
//
// Uso: node scripts/anexos/verificar-anexos.mjs [--dir privado/verificador-anexos] [--sembrar]
//   lee   <dir>/tabla-de-verdad.json y <dir>/anexos/<PF>-<cliente>.json  ({titulo, url, leido, texto})
//   deja  <dir>/salida/resultados.json, resultados.csv y panel.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const DIR = path.resolve(raiz, arg('--dir', 'privado/verificador-anexos'));
const SEMBRAR = process.argv.includes('--sembrar');

const REGLAS = JSON.parse(fs.readFileSync(path.join(raiz, 'data/reglas/reglas.json'), 'utf8'));
const TABLA = JSON.parse(fs.readFileSync(path.join(DIR, 'tabla-de-verdad.json'), 'utf8'));
// Opcional: actividades leídas en vivo en el aula (resuelve enlaces que no estaban en la tabla).
const VIVO = fs.existsSync(path.join(DIR, 'aula-en-vivo.json')) ? JSON.parse(fs.readFileSync(path.join(DIR, 'aula-en-vivo.json'), 'utf8')) : { sitios: {} };
const enVivo = (host, id) => VIVO.sitios?.[host]?.[id] || null;
const aeDe = (titulo) => Number((titulo.match(/aprendizaje esperado (\d+)/i) || [])[1]) || null;
const PLANES = fs.readdirSync(path.join(raiz, 'data/planes')).map((f) => f.replace('.json', ''));
const PESO = { critica: 3, mayor: 2, menor: 1 };
const HOSTS = ['otec-unab.cl', 'learning-pro.skillnest.com', 'learning.skillnest.com', 'canvas.uautonoma.cl', 'aulavirtual.chilecapacitacion.cl'];

// ---------- texto ----------
const desescapar = (s) => s.replace(/&#10;/g, ' ').replace(/\\(.)/g, '$1');
const sinTildes = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const legible = (s) => sinTildes(desescapar(s).replace(/\*+/g, '')).toLowerCase().replace(/\s+/g, ' ');
const plano = (s) => sinTildes(desescapar(s)).toLowerCase().replace(/[^a-z0-9ñ]+/g, ' ').trim();
const SECCION = /(?:^|[|\s*])((?:XI|X|IX|VIII|VII|VI|V|IV|III|II|I))\.-\s/g;

function preparar(doc) {
  const crudo = doc.texto;
  const txt = legible(crudo);
  const secciones = [];
  for (const m of txt.toUpperCase().matchAll(SECCION)) secciones.push([m.index, m[1]]);
  return { ...doc, crudo, txt, pl: plano(crudo), secciones };
}
const seccion = (d, i) => { let s = 'inicio'; for (const [p, n] of d.secciones) { if (p <= i) s = n; else break; } return s; };
const cita = (d, i, largo = 60) => `«…${d.txt.slice(Math.max(0, i - largo), i + largo).trim()}…» (sección ${seccion(d, i)})`;
function todas(d, re) { const r = []; for (const m of d.txt.matchAll(re)) r.push(m.index); return r; }
function urls(d) {
  const r = [];
  for (const m of desescapar(d.crudo).matchAll(/https?:\/\/[^\s<>()|"'\]]+/g)) r.push(m[0].replace(/[.,;:»]+$/, ''));
  return [...new Set(r)];
}

// ---------- chequeos ----------
const C = (estado, evidencia) => ({ estado, evidencia });
const OK = (e) => C('CUMPLE', e);
const NO = (e) => C('NO CUMPLE', e);
const JU = (e) => C('REQUIERE JUICIO', e);
const NA = (e) => C('NO APLICA', e);

const CHEQUEOS = [
  { id: 'A01', regla: 'R35', titulo: 'Código del plan correcto y sin códigos de otros planes', f(d, t) {
    const propio = todas(d, new RegExp(t.pf.toLowerCase(), 'g')).length;
    const otros = PLANES.filter((p) => p !== t.pf && d.txt.includes(p.toLowerCase()));
    if (!propio) return NO(`No aparece ${t.pf} en el anexo.`);
    if (otros.length) return NO(`Aparece ${t.pf} (${propio} veces), pero también ${otros.join(', ')}: ${cita(d, d.txt.indexOf(otros[0].toLowerCase()))}`);
    return OK(`${t.pf} aparece ${propio} veces y ningún otro código de plan.`);
  } },
  { id: 'A02', regla: 'R35', titulo: 'Nombre del curso igual al plan', f(d, t) {
    const cand = [t.curso.nombrePlan, t.curso.nombreCsv].filter(Boolean);
    const hit = cand.find((n) => d.pl.includes(plano(n)));
    if (hit) return OK(`Dice «${hit}».`);
    const junto = (x) => x.replace(/ /g, '');
    const casi = cand.find((n) => junto(d.pl).includes(junto(plano(n))));
    if (casi) return OK(`Dice «${casi}» con otra separación de palabras (por ejemplo «Full Stack» y «Fullstack»).`);
    const i = d.txt.indexOf('nombre curso');
    return JU(`El plan se llama «${t.curso.nombrePlan}». ${i >= 0 ? 'El anexo dice ' + cita(d, i + 30, 50) : 'No se encontró la fila «Nombre Curso».'}`);
  } },
  { id: 'A03', regla: 'R38', titulo: 'Aprendizajes esperados del módulo 2 textuales (SIPFOR)', f(d, t) {
    const faltan = [];
    for (const ae of t.modulo2.aes) {
      const p = plano(ae.texto);
      if (d.pl.includes(p)) continue;
      const w = p.split(' '); let k = w.length;
      while (k > 3 && !d.pl.includes(w.slice(0, k).join(' '))) k--;
      faltan.push(`AE${ae.n} ${k > 3 ? `cambia desde «${w.slice(k, k + 6).join(' ')}…»` : 'no aparece'} (SIPFOR: «${ae.texto.slice(0, 90)}…»)`);
    }
    return faltan.length ? NO(`${t.modulo2.aes.length - faltan.length} de ${t.modulo2.aes.length} AE textuales. ${faltan.join(' · ')}`) : OK(`Los ${t.modulo2.aes.length} AE del módulo 2 aparecen con las palabras de SIPFOR.`);
  } },
  { id: 'A04', regla: 'R18', titulo: 'Criterios de evaluación textuales (SIPFOR + planilla 02)', f(d, t) {
    const cr = t.modulo2.aes.flatMap((ae) => ae.criterios.map((c) => ({ ...c, ae: ae.n })));
    const faltan = cr.filter((c) => !d.pl.includes(plano(c.texto)));
    if (!faltan.length) return OK(`Los ${cr.length} criterios aparecen textuales.`);
    return NO(`${cr.length - faltan.length} de ${cr.length} criterios textuales. Faltan o cambian: ${faltan.slice(0, 6).map((c) => `${c.n} (${c.fuente}) «${c.texto.slice(0, 70)}…»`).join(' · ')}${faltan.length > 6 ? ` y ${faltan.length - 6} más` : ''}`);
  } },
  { id: 'A05', regla: 'R36', titulo: 'Horas totales del plan', f(d, t) {
    const tiene = (n) => new RegExp(`(^|[^0-9])${n}([^0-9]|$)`).test(d.txt);
    if (tiene(t.horas.total)) return OK(`Aparece el total del plan: ${t.horas.total} horas.`);
    if (t.horas.sumaModulos !== t.horas.total && tiene(t.horas.sumaModulos)) return JU(`El anexo usa ${t.horas.sumaModulos} (suma de módulos); SIPFOR dice ${t.horas.total} horas totales. Diferencia abierta en OPEN-QUESTIONS #24.`);
    return JU(`No se encontró ${t.horas.total} en el texto.`);
  } },
  { id: 'A06', regla: 'R09', titulo: 'Nombra la plataforma real', f(d, t) {
    const ajena = t.plataforma === 'canvas' ? /\bmoodle\b/g : /\bcanvas\b/g;
    // «canvas» también es el lienzo de n8n: en aulas Moodle solo cuenta si habla de la plataforma.
    const ix = todas(d, ajena).filter((i) => t.plataforma === 'canvas' || /\blms\b|plataforma|aula virtual|uautonoma|instructure/.test(d.txt.slice(Math.max(0, i - 60), i + 60)));
    const real = t.plataforma === 'canvas' ? 'Canvas' : 'Moodle';
    return ix.length ? NO(`El aula es ${real}, pero dice «${t.plataforma === 'canvas' ? 'Moodle' : 'Canvas'}» ${ix.length} veces. Primera: ${cita(d, ix[0])}`) : OK(`No nombra otra plataforma que ${real}.`);
  } },
  { id: 'A07', regla: 'R40', titulo: 'Enlace directo al curso correcto', f(d, t) {
    const u = urls(d).filter((x) => t.plataforma === 'canvas' ? new RegExp(`canvas\\.uautonoma\\.cl/courses/${t.aula.id}/?$`).test(x) : x.includes(`course/view.php?id=${t.aula.id}`) && x.includes(new URL(t.base).host));
    if (u.length) return OK(`Enlaza ${u[0]}`);
    const login = urls(d).find((x) => /login/.test(x) && x.includes(new URL(t.base).host));
    const alCurso = urls(d).some((x) => x.includes(`/courses/${t.aula.id}/`) || x.includes(`course/view.php?id=${t.aula.id}`));
    if (login && alCurso) return JU(`El «Link LMS» es la página de ingreso (${login}), no el curso; sí hay enlaces a actividades del curso ${t.aula.id}. Considerar agregar el enlace directo ${t.aula.url}`);
    return NO(`No aparece el enlace al curso: ${t.aula.url}`);
  } },
  { id: 'A08', regla: 'R39', titulo: 'Todos los enlaces al LMS apuntan al aula correcta', f(d, t) {
    const host = new URL(t.base).host;
    const lms = urls(d).filter((x) => HOSTS.some((h) => x.includes(h)));
    if (!lms.length) return NO('El anexo no tiene enlaces al LMS.');
    const malos = []; const raros = []; const vivos = [];
    const conocidos = new Set(Object.values(t.aula.ids).flat().map(String));
    // Un id que no está en la tabla se busca en la lectura en vivo del aula: si existe en este curso, vale.
    const revisar = (x, id) => {
      if (conocidos.has(id)) return;
      const v = enVivo(host, id);
      if (!v) return raros.push(x);
      if (String(v.curso) !== String(t.aula.id)) return malos.push(`${x} (es del curso ${v.curso}; el aula es ${t.aula.id})`);
      if (v.publicado === false) return malos.push(`${x} («${v.titulo}» está sin publicar)`);
      vivos.push(`«${v.titulo}»`);
    };
    for (const x of lms) {
      const h = new URL(x).host;
      if (h !== host) { malos.push(`${x} (otro sitio: el aula está en ${host})`); continue; }
      if (t.plataforma === 'canvas') {
        const m = x.match(/\/courses\/(\d+)/);
        if (m && m[1] !== String(t.aula.id)) malos.push(`${x} (curso ${m[1]}; el aula es ${t.aula.id})`);
        const it = x.match(/(?:modules\/items|assignments)\/(\d+)/);
        if (it) revisar(x, it[1]);
      } else {
        const c = x.match(/course\/view\.php\?id=(\d+)/);
        if (c && c[1] !== String(t.aula.id)) malos.push(`${x} (curso ${c[1]}; el aula es ${t.aula.id})`);
        const cm = x.match(/mod\/\w+\/view\.php\?id=(\d+)/);
        if (cm) revisar(x, cm[1]);
      }
    }
    if (malos.length) return NO(`${malos.length} de ${lms.length} enlaces apuntan a otro lugar: ${malos.slice(0, 3).join(' · ')}`);
    if (raros.length) return JU(`${lms.length} enlaces al aula correcta; ${raros.length} apuntan a actividades que no están en la tabla del 04-10 y no se pudieron leer en vivo (sin sesión en el LMS): ${raros.slice(0, 3).join(' · ')}`);
    return OK(`${lms.length} enlaces, todos al aula ${t.aula.id}${vivos.length ? `; ${vivos.length} comprobados en vivo: ${vivos.join(', ')}` : ''}.`);
  } },
  { id: 'A09', regla: 'R39', titulo: 'Enlaces a lectura, quiz e infografía del AE seleccionado', f(d, t) {
    const todo = urls(d).join(' ');
    const esta = (tipo) => t.aula.ids[tipo].some((id) => new RegExp(`(view\\.php\\?id=|modules/items/)${id}(\\D|$)`).test(todo));
    const nom = { lect: 'lectura', quiz: 'quiz', info: 'infografía' };
    const faltan = ['lect', 'quiz', 'info'].filter((k) => !esta(k));
    if (!faltan.length) return OK(`AE${t.aula.aeSeleccionado}: enlaza lectura, quiz e infografía del aula.`);
    // Si la lectura en vivo dice a qué AE pertenecen los enlaces, se compara con el AE seleccionado de la tabla.
    const host = new URL(t.base).host;
    const aes = [...new Set(urls(d).map((x) => (x.match(/(?:modules\/items|assignments|view\.php\?id=)\/?(\d+)/) || [])[1]).filter(Boolean)
      .map((id) => enVivo(host, id)).filter((v) => v && String(v.curso) === String(t.aula.id)).map((v) => aeDe(v.titulo)).filter(Boolean))];
    if (aes.length && !aes.includes(t.aula.aeSeleccionado)) return JU(`Los enlaces del anexo llevan al AE${aes.join(', AE')} del aula (comprobado en vivo), pero la tabla tiene AE${t.aula.aeSeleccionado} como seleccionado. Confirmar cuál AE desarrolla el anexo (OPEN-QUESTIONS #17) y actualizar la tabla.`);
    const alAula = urls(d).some((x) => x.includes(new URL(t.base).host) && (x.includes(`/courses/${t.aula.id}/`) || /mod\//.test(x)));
    return (alAula ? JU : NO)(`AE${t.aula.aeSeleccionado}: no se encontró el enlace a ${faltan.map((k) => nom[k]).join(', ')} con los ids de la tabla (${faltan.map((k) => t.aula.urls[k]).join(' · ')}).${alAula ? ' Hay otros enlaces al aula: revisar si apuntan a la versión actual.' : ''}`);
  } },
  { id: 'A10', regla: 'R41', titulo: 'Sin corchetes por completar', f(d) {
    // Solo corchetes de relleno «[ … ]» (con espacios); los nombres de archivo enlazados «[archivo.pdf]» no cuentan.
    const m = [...d.crudo.matchAll(/\\\[([^\n]{1,160}?)\\\]/g)].filter((x) => x[1].trim() && /^\s/.test(x[1]) && /\s$/.test(x[1]) && d.crudo[x.index + x[0].length] !== '(' && !/\.(pdf|docx?|xlsx|pptx|zip)\**\s*$/i.test(x[1]));
    return m.length ? NO(`${m.length} corchete(s): ${m.slice(0, 3).map((x) => `«[${desescapar(x[1]).trim()}]» (sección ${seccion(d, d.txt.indexOf(legible(x[1]).trim().slice(0, 25)))})`).join(' · ')}`) : OK('No quedan corchetes.');
  } },
  { id: 'A11', regla: 'R41', sev: 'mayor', titulo: 'Sin notas de borrador', f(d) {
    const re = /▸|eliminar leyenda|por que cambio|alerta de tiempo|\bpendiente:/g;
    const ix = todas(d, re);
    return ix.length ? NO(`${ix.length} marca(s) de borrador. Primera: ${cita(d, ix[0])}`) : OK('Sin notas de borrador.');
  } },
  { id: 'A12', regla: 'R41', sev: 'menor', titulo: 'Nombre del archivo sin «V0»', f(d) {
    return /(^|_)V0(_|$)/.test(d.titulo) ? NO(`El archivo se llama ${d.titulo}`) : OK(`El archivo se llama ${d.titulo}`);
  } },
  { id: 'A13', regla: 'R41', sev: 'mayor', titulo: 'Sin «Genially» (el quiz del aula es SCORM)', f(d) {
    const ix = todas(d, /genially/g);
    return ix.length ? NO(`${ix.length} mención(es). Primera: ${cita(d, ix[0])}`) : OK('No menciona Genially.');
  } },
  { id: 'A14', regla: 'R21', titulo: 'Sin «tramo»', f(d) {
    // «tramo» como nombre de un AE («tramo 2», «segundo tramo»); el uso común («un tramo de diez minutos») no cuenta.
    const ix = todas(d, /\btramos?\s+(n[°o]\s*)?\d|\b(primer|segundo|tercer|cuarto|quinto|sexto|septimo|ultimo)\s+tramo\b/g);
    return ix.length ? NO(`${ix.length} mención(es). Primera: ${cita(d, ix[0])}`) : OK('Usa «aprendizaje esperado».');
  } },
  { id: 'A15', regla: 'R40', titulo: 'Sin el dominio antiguo de Skillnest', f(d, t) {
    if (t.cli !== 'cd') return NA('Solo aplica a Coding Dojo.');
    const ix = todas(d, /(?<!-)\blearning\.skillnest\.com/g).filter((i) => d.txt.slice(i - 4, i) !== 'pro.' && d.txt.slice(i - 13, i) !== 'learning-pro.');
    return ix.length ? NO(`Cita learning.skillnest.com ${ix.length} vez/veces; el aula está en learning-pro.skillnest.com. ${cita(d, ix[0])}`) : OK('Solo usa learning-pro.skillnest.com.');
  } },
  { id: 'A16', regla: 'R34', titulo: 'Nube de al menos 12 GB por participante', f(d) {
    const gb = [...d.txt.matchAll(/(\d+(?:[.,]\d+)?)\s*gb\b/g)].map((m) => [parseFloat(m[1].replace(',', '.')), m.index]);
    if (!gb.length) return NO('No indica capacidad en GB.');
    const ok = gb.find(([n]) => n >= 12);
    return ok ? OK(`Indica ${ok[0]} GB: ${cita(d, ok[1], 50)}`) : NO(`Indica menos de 12 GB: ${cita(d, gb[0][1], 50)}`);
  } },
  { id: 'A17', regla: 'R31', titulo: 'Datos de acceso para evaluadores', f(d) {
    const u = d.txt.search(/usuario\s*:?\s*[a-z0-9._@-]{3,}/);
    const c = d.txt.search(/(contrasena|clave)\s*:?\s*\S{4,}/);
    if (u >= 0 && c >= 0) return OK(`Trae los datos de acceso del evaluador en la sección ${seccion(d, u)}. No se copian al panel.`);
    return NO(`Falta ${u < 0 ? 'el usuario' : ''}${u < 0 && c < 0 ? ' y ' : ''}${c < 0 ? 'la clave' : ''} del evaluador.`);
  } },
  { id: 'A18', regla: 'R33', titulo: 'Enlace al video o capturas de evidencia', f(d) {
    const u = urls(d).filter((x) => /drive\.google|youtu|vimeo|loom/.test(x));
    const hit = u.find((x) => { const i = desescapar(d.crudo).indexOf(x); const ctx = sinTildes(desescapar(d.crudo).slice(Math.max(0, i - 300), i + 50)).toLowerCase(); return ctx.includes('video') && ctx.includes('evidencia'); });
    return hit ? OK(`Enlace de evidencia: ${hit}`) : JU('No se encontró un enlace junto a «video» y «evidencia». Revisar la sección VIII a mano.');
  } },
  { id: 'J01', regla: 'R25', juicio: true, titulo: 'Portafolio como actividad del aula', f(d) {
    const ix = todas(d, /(actividad|tarea)\s+(de\s+)?[«"“]?portafolio|portafolio[»"”]?\s+(en|del)\s+(el\s+)?(moodle|canvas|lms|aula)/g);
    return ix.length ? JU(`El anexo presenta el portafolio como actividad del aula; la regla es no crearla como tarea: ${cita(d, ix[0])}`) : OK('No promete una tarea «Portafolio» en el aula.');
  } },
  { id: 'J02', regla: 'R14', juicio: true, titulo: 'Promete videos por AE que el aula no tiene', f(d) {
    const ix = todas(d, /demostracion en video|capsulas? de video|video ?capsula|video herramienta/g);
    return ix.length ? JU(`${ix.length} mención(es): ${cita(d, ix[0])}`) : OK('No promete cápsulas ni demostraciones en video por AE.');
  } },
  { id: 'J03', regla: 'R29', juicio: true, titulo: 'Nombres de recursos distintos a los del aula', f(d, t) {
    const v = [];
    if (t.cli === 'chc' && /cuestionario/.test(d.txt)) v.push('«Cuestionario» (el aula dice «Quiz gamificado del aprendizaje esperado n»)');
    if (t.cli !== 'chc' && /flipbook/.test(d.txt)) v.push('«flipbook» (en esta aula la lectura no es flipbook)');
    if (/infografia del modulo/.test(d.txt)) v.push('«Infografía del módulo» (el aula tiene una por AE)');
    return v.length ? JU(v.join(' · ')) : OK('Los nombres calzan con el aula.');
  } },
];
const reglaDe = Object.fromEntries(REGLAS.reglas.map((r) => [r.id, r]));
// La severidad sale de la regla, salvo que el chequeo revise una parte menor de ella (sev).
for (const c of CHEQUEOS) { c.severidad = c.sev || reglaDe[c.regla].severidad; c.peso = c.juicio ? 0 : PESO[c.severidad]; }

// ---------- motor ----------
function evaluar(t, doc) {
  if (!doc) return CHEQUEOS.map((c) => ({ id: c.id, estado: 'SIN LEER', evidencia: 'No se pudo leer el anexo desde Drive.' }));
  const d = preparar(doc);
  // Las claves de evaluador nunca salen del anexo: se tapan en toda evidencia.
  const tapar = (s) => s.replace(/(contrase[nñ]a|clave|usuario)(\s*(?:de acceso)?\s*:\s*)(\S+)/gi, '$1$2••••').replace(/(contrase[nñ]a|clave)(\s+)(?!de\b|y\b|del\b)(\S{6,})/gi, '$1$2••••');
  return CHEQUEOS.map((c) => { try { const r = c.f(d, t); return { id: c.id, ...r, evidencia: tapar(r.evidencia) }; } catch (e) { return { id: c.id, estado: 'REQUIERE JUICIO', evidencia: `Error del chequeo: ${e.message}` }; } });
}
function resumir(res) {
  let num = 0, den = 0, juicio = 0, critico = false, sinLeer = false;
  for (const r of res) {
    const c = CHEQUEOS.find((x) => x.id === r.id);
    if (r.estado === 'SIN LEER') sinLeer = true;
    if (r.estado === 'REQUIERE JUICIO') juicio++;
    if (r.estado === 'CUMPLE' || r.estado === 'NO CUMPLE') { den += c.peso; if (r.estado === 'CUMPLE') num += c.peso; }
    if (r.estado === 'NO CUMPLE' && c.severidad === 'critica' && !c.juicio) critico = true;
  }
  const ia = den ? num / den : 0;
  const estado = sinLeer || critico ? 'BLOQUEADO' : ia < 1 || juicio ? 'OBSERVADO' : 'LISTO';
  return { ia, num, den, juicio, estado };
}
const leer = (k) => { const f = path.join(DIR, 'anexos', `${k}.json`); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null; };

const filas = TABLA.anexos.map((t) => {
  const doc = leer(t.k);
  const res = evaluar(t, doc);
  return { k: t.k, cliente: t.cliente, cli: t.cli, pf: t.pf, curso: t.curso.nombrePlan, titulo: doc?.titulo || t.anexo.tituloAl0410, leido: doc?.leido || null, doc: `https://drive.google.com/open?id=${t.anexo.driveId}`, aula: t.aula.url, resultados: res, ...resumir(res) };
});
const casillas = filas.flatMap((f) => f.resultados);
const global = {
  anexos: filas.length, chequeos: CHEQUEOS.length, esperadas: filas.length * CHEQUEOS.length,
  evaluadas: casillas.filter((r) => r.estado !== 'SIN LEER').length,
  ia: (() => { const n = filas.reduce((s, f) => s + f.num, 0); const d = filas.reduce((s, f) => s + f.den, 0); return d ? n / d : 0; })(),
  estados: Object.fromEntries(['LISTO', 'OBSERVADO', 'BLOQUEADO'].map((e) => [e, filas.filter((f) => f.estado === e).length])),
  porEstadoCasilla: Object.fromEntries(['CUMPLE', 'NO CUMPLE', 'REQUIERE JUICIO', 'NO APLICA', 'SIN LEER'].map((e) => [e, casillas.filter((r) => r.estado === e).length])),
};
global.completitud = global.evaluadas / global.esperadas;
if (global.porEstadoCasilla && Object.values(global.porEstadoCasilla).reduce((a, b) => a + b, 0) !== global.esperadas) throw new Error('Los conteos no cuadran: hay casillas sin estado.');

// ---------- errores sembrados ----------
let sembrado = null;
if (SEMBRAR) {
  const base = (cli) => TABLA.anexos.find((t) => t.cli === cli && leer(t.k));
  const SEMILLAS = [
    { cli: 'unab', chequeo: 'A01', que: 'Se cambia el código del plan por PF9999', m: (s, t) => s.split(t.pf).join('PF9999') },
    { cli: 'unab', chequeo: 'A10', que: 'Se agrega un corchete por completar', m: (s) => s + '\n\\[ cupo según parrilla \\]' },
    { cli: 'ua', chequeo: 'A06', que: 'Se nombra Moodle en un anexo de Canvas', m: (s) => s + '\nEl participante entra al Moodle del curso.' },
    { cli: 'chc', chequeo: 'A07', que: 'Se cambia el enlace directo al curso', m: (s, t) => s.split(`course/view.php?id=${t.aula.id}`).join('course/view.php?id=9999') },
    { cli: 'chc', chequeo: 'A03', que: 'Se cambia una palabra de un aprendizaje esperado', m: (s, t) => { const w = plano(t.modulo2.aes[0].texto).split(' ').find((x) => x.length > 6); return s.replace(new RegExp(w.slice(0, 5), 'gi'), 'zzzzz'); } },
    { cli: 'cd', chequeo: 'A15', que: 'Se agrega el dominio antiguo de Skillnest', m: (s) => s + '\nLink LMS: https://learning.skillnest.com/' },
    { cli: 'ua', chequeo: 'A14', que: 'Se escribe «tramo» en vez de aprendizaje esperado', m: (s) => s + '\nEn el tramo 2 el participante…' },
    { cli: 'unab', chequeo: 'A13', que: 'Se menciona Genially', m: (s) => s + '\nQuiz en Genially.' },
    { cli: 'cd', chequeo: 'A16', que: 'Se baja la nube a 5 GB', m: (s) => s.replace(/(\d+)(\s*GB)/gi, '5$2') },
    { cli: 'chc', chequeo: 'A11', que: 'Se deja una nota de borrador', m: (s) => s + '\n▸ Pendiente: revisar con el cliente.' },
  ];
  const det = SEMILLAS.map((sm) => {
    const t = base(sm.cli); const doc = leer(t.k);
    const antes = evaluar(t, doc).find((r) => r.id === sm.chequeo).estado;
    const despues = evaluar(t, { ...doc, texto: sm.m(doc.texto, t) }).find((r) => r.id === sm.chequeo).estado;
    return { ...sm, m: undefined, anexo: t.k, antes, despues, valida: antes === 'CUMPLE', detectado: antes === 'CUMPLE' && despues !== 'CUMPLE' };
  });
  const validas = det.filter((x) => x.valida);
  sembrado = { semillas: det, sembrados: validas.length, detectados: validas.filter((x) => x.detectado).length };
  sembrado.sensibilidad = sembrado.sembrados ? sembrado.detectados / sembrado.sembrados : null;
}

// ---------- salidas ----------
const out = path.join(DIR, 'salida');
fs.mkdirSync(out, { recursive: true });
const meta = { generado: new Date().toISOString(), responsable: REGLAS.responsable, version_reglas: REGLAS.version, formula: {
  ia: 'IA = Σ peso·[CUMPLE] / Σ peso·[CUMPLE o NO CUMPLE]; peso crítica 3, mayor 2, menor 1; los chequeos de juicio no pesan',
  completitud: 'K = casillas evaluadas / (anexos esperados × chequeos)',
  estado: 'BLOQUEADO si no se leyó o falla un crítico; OBSERVADO si IA < 100 % o hay juicio pendiente; LISTO si IA = 100 % y sin juicio',
  sensibilidad: 'S = errores sembrados detectados / errores sembrados' } };
const chequeos = CHEQUEOS.map(({ id, regla, titulo, severidad, peso, juicio }) => ({ id, regla, titulo, severidad, peso, tipo: juicio ? 'juicio' : 'auto', reglaTexto: reglaDe[regla].texto }));
const RES = { meta, global, sembrado, chequeos, anexos: filas };
fs.writeFileSync(path.join(out, 'resultados.json'), JSON.stringify(RES, null, 1));
const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const lin = [['Anexo', 'Cliente', 'PF', 'Estado anexo', 'IA anexo', 'Chequeo', 'Regla', 'Severidad', 'Qué revisa', 'Resultado', 'Evidencia'].map(q).join(',')];
for (const f of filas) for (const r of f.resultados) { const c = chequeos.find((x) => x.id === r.id); lin.push([f.k, f.cliente, f.pf, f.estado, (f.ia * 100).toFixed(1), r.id, c.regla, c.severidad, c.titulo, r.estado, r.evidencia].map(q).join(',')); }
fs.writeFileSync(path.join(out, 'resultados.csv'), '﻿' + lin.join('\r\n'), 'utf8');
const plantilla = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'panel.html'), 'utf8');
fs.writeFileSync(path.join(out, 'panel.html'), plantilla.replace('/*DATOS*/null', JSON.stringify(RES).replace(/</g, '\\u003c')), 'utf8');

const pct = (x) => `${(x * 100).toFixed(1)} %`;
console.log(`Anexos: ${global.anexos} · chequeos: ${global.chequeos} · casillas: ${global.evaluadas}/${global.esperadas} (completitud ${pct(global.completitud)})`);
console.log(`Índice de Alineación global: ${pct(global.ia)} · LISTO ${global.estados.LISTO} · OBSERVADO ${global.estados.OBSERVADO} · BLOQUEADO ${global.estados.BLOQUEADO}`);
console.log(Object.entries(global.porEstadoCasilla).map(([k, v]) => `${k}: ${v}`).join(' · '));
if (sembrado) console.log(`Errores sembrados: ${sembrado.detectados}/${sembrado.sembrados} detectados (sensibilidad ${pct(sembrado.sensibilidad)})${sembrado.semillas.filter((s) => !s.valida).length ? ` · ${sembrado.semillas.filter((s) => !s.valida).length} semilla(s) no válidas porque el anexo ya fallaba ese chequeo` : ''}`);
console.log(`Salida: ${path.relative(raiz, out)}`);
