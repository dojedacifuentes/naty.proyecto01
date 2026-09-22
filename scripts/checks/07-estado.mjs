/**
 * Control 07 — el handoff es verificable.
 *
 * Esto es lo que permite que una sesión audite a otra sin leer su chat: el registro
 * (state/LEDGER.csv) dice quién trabajó, desde qué commit y con qué huella dejó el
 * estado; este control confirma que el relato calza con los archivos.
 *
 * Detecta, entre otras cosas, que alguien editó state/ por fuera del protocolo:
 * la huella guardada al cerrar deja de coincidir con la que se recalcula ahora.
 */
import { existe, leer, listar, ruta, rel } from '../lib/repo.mjs';
import { secciones, mismoTitulo } from '../lib/md.mjs';
import { hashEstado, leerLedger, sesionesAbiertas, ultimaCerrada, COLUMNAS_LEDGER, rutaLog } from '../lib/estado.mjs';

const RE_FECHA = /(\d{4}-\d{2}-\d{2})/;

export default {
  id: '07',
  nombre: 'Estado y handoff',
  descripcion: 'CHECKPOINT, HANDOFF, DECISIONS, OPEN-QUESTIONS y el registro de sesiones, coherentes entre sí.',

  run(ctx, r) {
    const ledger = leerLedger();
    const abiertas = sesionesAbiertas(ledger);
    const ultima = ultimaCerrada(ledger);

    // --- CHECKPOINT -------------------------------------------------------
    if (existe('state/CHECKPOINT.md')) {
      const t = leer('state/CHECKPOINT.md');
      const m = /\*\*Última actualización:\*\*\s*(\S+)/.exec(t);
      if (!m || !RE_FECHA.test(m[1])) {
        r.error('no declara "**Última actualización:** AAAA-MM-DD"', 'state/CHECKPOINT.md');
      } else if (ultima && ultima.cerrada_utc && m[1] < ultima.cerrada_utc.slice(0, 10)) {
        r.error(`dice ${m[1]} pero la última sesión cerró el ${ultima.cerrada_utc.slice(0, 10)}: quedó sin actualizar`, 'state/CHECKPOINT.md');
      }
      if (!/\*\*Fase actual:\*\*/.test(t)) r.aviso('no declara fase actual', 'state/CHECKPOINT.md');
    }

    // --- HANDOFF ----------------------------------------------------------
    if (existe('state/HANDOFF.md') && existe('templates/handoff.md')) {
      const handoff = leer('state/HANDOFF.md');
      const plantilla = leer('templates/handoff.md');
      const requeridas = secciones(plantilla).filter((s) => s.nivel === 2).map((s) => s.titulo);
      const presentes = secciones(handoff).filter((s) => s.nivel === 2);
      const titulos = presentes.map((s) => s.titulo);

      for (const req of requeridas) {
        if (!titulos.some((t) => mismoTitulo(t, req))) {
          r.error(`le falta la sección "${req}" de templates/handoff.md`, 'state/HANDOFF.md');
        }
      }
      const tarea = presentes.find((s) => /primera tarea/i.test(s.titulo));
      if (!tarea || tarea.cuerpo.replace(/[\s<>]/g, '').length < 40) {
        r.error('"Tu primera tarea" está vacía: la siguiente sesión no sabrá por dónde entrar', 'state/HANDOFF.md');
      }
      if (!/\*\*De:\*\*/.test(handoff) || !/\*\*Para:\*\*/.test(handoff)) {
        r.error('no declara De: y Para:', 'state/HANDOFF.md');
      }
      if (handoff.includes('<herramienta>') || handoff.includes('Dos o tres frases')) {
        r.error('quedó con texto de la plantilla sin rellenar', 'state/HANDOFF.md');
      }
    }

    // --- DECISIONS / OPEN-QUESTIONS --------------------------------------
    if (existe('state/DECISIONS.md')) {
      const bloques = leer('state/DECISIONS.md').split(/\n(?=\*\*\d{4}-\d{2}-\d{2})/).slice(1);
      bloques.forEach((b) => {
        const titulo = b.split('\n')[0].slice(0, 60);
        if (!/Por qué:/i.test(b)) r.error(`decisión sin "Por qué:" → ${titulo}`, 'state/DECISIONS.md');
        if (!/Quién:/i.test(b)) r.error(`decisión sin "Quién:" → ${titulo}`, 'state/DECISIONS.md');
      });
      r.nota(`${bloques.length} decisiones registradas`);
    }
    if (existe('state/OPEN-QUESTIONS.md')) {
      const t = leer('state/OPEN-QUESTIONS.md');
      // El estado va después del título, pero la entrada se reconoce por la numeración:
      // así una pregunta que olvidó declarar si está abierta también se detecta.
      const entradas = [...t.matchAll(/^\*\*(\d+)\.\s*([\s\S]+?)\*\*\s*(.*)$/gm)];
      let abiertasQ = 0;
      for (const e of entradas) {
        const estado = e[3].toUpperCase();
        if (!/ABIERTA|RESUELTA|CERRADA|DESCARTADA/.test(estado)) {
          r.error(`la pregunta ${e[1]} no dice si está ABIERTA o RESUELTA`, 'state/OPEN-QUESTIONS.md');
        }
        if (/ABIERTA/.test(estado)) abiertasQ++;
        if (/RESUELTA/.test(estado) && !/respondi|resuelt[ao] por|seg[uú]n/i.test(t.slice(e.index, e.index + 600))) {
          r.aviso(`la pregunta ${e[1]} dice RESUELTA pero no registra quién respondió`, 'state/OPEN-QUESTIONS.md');
        }
      }
      r.nota(`${abiertasQ} preguntas abiertas de ${entradas.length}`);
    }

    // --- registro de sesiones --------------------------------------------
    if (!ledger.length) { r.aviso('el registro de sesiones está vacío: abre una con "npm run sesion -- abrir"', 'state/LEDGER.csv'); return; }

    const faltan = COLUMNAS_LEDGER.filter((c) => !(c in ledger[0]));
    if (faltan.length) r.error(`al registro le faltan columnas: ${faltan.join(', ')}`, 'state/LEDGER.csv');

    const hoy = new Date().toISOString().slice(0, 10);
    for (const s of abiertas) {
      const dia = (s.abierta_utc || '').slice(0, 10);
      if (dia && dia < hoy) {
        r.error(`la sesión ${s.sesion_id} (${s.herramienta}) quedó abierta desde el ${dia}: ciérrala o anótala como abandonada`, 'state/LEDGER.csv');
      }
    }
    if (abiertas.length > 1) {
      r.aviso(`hay ${abiertas.length} sesiones abiertas a la vez: al fusionar, lee el CHECKPOINT del otro (AGENTS.md §8)`, 'state/LEDGER.csv');
    }

    const logs = new Set(listar(ruta('state/sessions'), { ext: ['.md'] }).map((a) => rel(a)));
    for (const s of ledger) {
      if (!logs.has(rutaLog(s.sesion_id))) {
        r.error(`la sesión ${s.sesion_id} está en el registro pero no tiene log`, rutaLog(s.sesion_id));
      }
      if (s.estado === 'cerrada') {
        if (!s.commit_cierre) r.error(`${s.sesion_id} cerrada sin commit de cierre`, 'state/LEDGER.csv');
        if (!s.hash_estado) r.error(`${s.sesion_id} cerrada sin huella de estado`, 'state/LEDGER.csv');
      }
    }
    const enLedger = new Set(ledger.map((s) => rutaLog(s.sesion_id)));
    for (const log of logs) {
      if (!enLedger.has(log)) r.error('hay un log de sesión que no está en el registro', log);
    }

    // --- huella: ¿tocaron state/ fuera del protocolo? ---------------------
    const huella = hashEstado();
    if (ultima && ultima.hash_estado) {
      if (huella !== ultima.hash_estado && !abiertas.length) {
        r.error(`state/ cambió desde el cierre de ${ultima.sesion_id} sin que se abriera una sesión (huella ${ultima.hash_estado} → ${huella}). Abre sesión y deja constancia de quién lo cambió`, 'state/LEDGER.csv');
      } else if (huella !== ultima.hash_estado) {
        r.nota(`state/ modificado en la sesión abierta (huella ${ultima.hash_estado} → ${huella})`);
      } else {
        r.nota(`huella de estado intacta: ${huella}`);
      }
    }

    // --- auditoría cruzada pendiente -------------------------------------
    const sinAuditar = ledger.filter((s) => s.estado === 'cerrada' && !s.veredicto);
    if (sinAuditar.length) {
      r.aviso(`${sinAuditar.length} sesión(es) cerradas sin auditar: ${sinAuditar.map((s) => s.sesion_id).join(', ')} (ver AUDITORIA.md)`, 'state/LEDGER.csv');
    }
    for (const s of ledger) {
      if (s.veredicto && s.auditada_por === s.herramienta) {
        r.error(`${s.sesion_id} fue auditada por la misma herramienta que la produjo (${s.herramienta}): la auditoría cruzada pierde sentido`, 'state/LEDGER.csv');
      }
      if (s.veredicto === 'rechazada') {
        r.error(`${s.sesion_id} está rechazada por la auditoría de ${s.auditada_por} y sigue sin corregirse (${s.informe})`, 'state/LEDGER.csv');
      }
    }
  },
};
