/**
 * Control 08 — verificadores vivos (AGENTS.md §7, control 3).
 *
 * Sin --red solo revisa la forma: que cada propuesta declare sus tres enlaces obligatorios
 * y que la revisión humana esté hecha antes de marcar "listo".
 * Con --red además golpea cada URL y guarda el estado en state/auditoria-verificadores.csv.
 *
 * Un 200 no es una propuesta salvada: el script no sabe si el LMS muestra el módulo
 * correcto. Eso lo firma una persona en la columna "muestra_lo_que_dice".
 */
import { leer, existe } from '../lib/repo.mjs';
import { auditar, recolectar } from '../auditar-verificadores.mjs';

const OBLIGATORIOS = ['portafolio', 'lms'];

export default {
  id: '08',
  nombre: 'Verificadores',
  descripcion: 'Enlaces declarados, revisión humana registrada y (con --red) estado HTTP real.',

  async run(ctx, r) {
    if (!ctx.propuestas.length) { r.nota('sin propuestas: nada que verificar'); return; }

    const listas = new Set();
    for (const p of ctx.propuestas) {
      const anexo = `propuestas/${p.id}/anexo2.md`;
      if (existe(anexo) && /\*\*Estado:\*\*\s*listo/i.test(leer(anexo))) listas.add(p.id);

      const archivo = `propuestas/${p.id}/verificadores.md`;
      if (!existe(archivo)) continue;
      const texto = leer(archivo).toLowerCase();
      for (const o of OBLIGATORIOS) {
        if (!texto.includes(o)) r.aviso(`no menciona ${o}: faltan enlaces obligatorios (docs/04)`, archivo);
      }
      if (!/https?:\/\//.test(texto) && listas.has(p.id)) {
        r.error('propuesta marcada "listo" sin ningún enlace verificador', archivo);
      }
    }

    const filas = ctx.opciones.red ? await auditar({ red: true }) : recolectar();
    if (!filas.length) { r.nota('ninguna propuesta declara URLs todavía'); return; }

    if (!ctx.opciones.red) {
      r.nota(`${filas.length} enlaces declarados · estado HTTP no revisado (corre con --red)`);
    }

    for (const f of filas) {
      const id = `${f.cliente}/${f.plan}`;
      const grave = listas.has(id);
      const donde = `${f.archivo}:${f.linea}`;
      if (ctx.opciones.red && f.estado_http && !f.estado_http.startsWith('2')) {
        const msg = `${f.estado_http} → ${f.url.slice(0, 60)}`;
        grave ? r.error(msg, donde) : r.aviso(msg, donde);
      }
      if (grave && (!f.muestra_lo_que_dice || f.muestra_lo_que_dice === 'REVISAR A MANO')) {
        r.error(`marcada "listo" pero nadie confirmó que el enlace muestre lo que dice: ${f.url.slice(0, 50)}`, donde);
      }
    }
    if (ctx.opciones.red) {
      const malos = filas.filter((f) => !String(f.estado_http).startsWith('2')).length;
      r.nota(`${filas.length} enlaces golpeados · ${malos} con problema`);
    }
  },
};
