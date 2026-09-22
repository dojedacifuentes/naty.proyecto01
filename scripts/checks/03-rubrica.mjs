/**
 * Control 03 — cobertura de rúbrica.
 *
 * Cuenta de verdad: los bloques evaluables del Anexo 2 llevan marcadores
 * `<!-- verificable: ID=D1 tipo=tabla min=5 -->` y este control cuenta los elementos
 * reales del bloque y los compara con el umbral del 7.0 (data/rubrica-subcriterios.csv
 * y data/umbrales-por-plan.csv).
 *
 * Una propuesta en borrador recibe avisos. Una propuesta marcada "listo" que no
 * alcanza un umbral es un error: no se entrega.
 */
import { leer, existe } from '../lib/repo.mjs';
import { marcadores, secciones, filasConContenido, checklist, itemsLista, indicadoresPorFila, mismoTitulo } from '../lib/md.mjs';

const PLANTILLA = 'templates/anexo2-esqueleto.md';

function contar(marca) {
  switch (marca.tipo) {
    case 'tabla': return filasConContenido(marca.bloque).length;
    case 'checklist': return checklist(marca.bloque).marcados;
    case 'lista': return itemsLista(marca.bloque).length;
    case 'tabla-indicadores': {
      const filas = indicadoresPorFila(marca.bloque).filter((f) => f.ae && f.n > 0);
      return filas.length ? Math.min(...filas.map((f) => f.n)) : 0; // manda el peor aprendizaje esperado
    }
    default: return itemsLista(marca.bloque).length;
  }
}

function minimoExigido(marca, plan, umbrales) {
  if (!marca.min) return null;
  const ref = /^@umbral:(.+)$/.exec(marca.min);
  if (!ref) return Number(marca.min);
  const fila = umbrales.find((u) => u.codigo_plan === plan);
  return fila ? Number(fila[ref[1]]) : null;
}

export default {
  id: '03',
  nombre: 'Cobertura de rúbrica',
  descripcion: 'Cada Anexo 2 tiene las secciones de la plantilla y alcanza los umbrales contables del 7.0.',

  run(ctx, r) {
    if (!existe(PLANTILLA)) { r.error('no existe la plantilla del Anexo 2', PLANTILLA); return; }

    const plantilla = leer(PLANTILLA);
    const seccionesPlantilla = secciones(plantilla).filter((s) => s.nivel === 2).map((s) => s.titulo);
    const marcasPlantilla = marcadores(plantilla);

    if (!marcasPlantilla.length) {
      r.error('la plantilla no tiene marcadores <!-- verificable: ... -->: sin ellos no hay control de cobertura', PLANTILLA);
    }
    const idsRubrica = new Set(ctx.rubrica.map((s) => s.id));
    for (const m of marcasPlantilla) {
      if (!idsRubrica.has(m.id)) {
        r.error(`el marcador ${m.id} no corresponde a ningún subcriterio de la rúbrica`, `${PLANTILLA}:${m.linea}`);
      }
    }

    if (!ctx.propuestas.length) {
      r.nota('todavía no hay propuestas: solo se validó la plantilla');
      return;
    }

    for (const p of ctx.propuestas) {
      const archivo = `propuestas/${p.id}/anexo2.md`;
      if (!existe(archivo)) continue;
      const texto = leer(archivo);
      const lista = /\*\*Estado:\*\*\s*listo/i.test(texto);
      const falla = (msg, donde) => (lista ? r.error(msg, donde) : r.aviso(msg, donde));

      const titulosPropuesta = new Set(secciones(texto).filter((s) => s.nivel === 2).map((s) => s.titulo));
      for (const t of seccionesPlantilla) {
        const cabeza = t.split('·')[0].trim();
        if (![...titulosPropuesta].some((x) => mismoTitulo(x.split('·')[0], cabeza))) {
          falla(`falta la sección "${cabeza}" de la plantilla`, archivo);
        }
      }

      const marcas = marcadores(texto);
      const presentes = new Set(marcas.map((m) => m.id));
      for (const m of marcasPlantilla) {
        if (!presentes.has(m.id)) {
          falla(`falta el bloque verificable ${m.id}: cópialo de la plantilla`, archivo);
        }
      }

      for (const m of marcas) {
        const min = minimoExigido(m, p.plan, ctx.umbrales);
        if (min === null || Number.isNaN(min)) continue;
        const n = contar(m);
        const sub = ctx.rubrica.find((s) => s.id === m.id);
        const etiqueta = sub ? `${m.id} ${sub.subcriterio}` : m.id;
        if (n < min) {
          falla(`${etiqueta}: ${n} de ${min} para 7.0 (${sub ? sub.umbral_7 : ''})`, `${archivo}:${m.linea}`);
        } else {
          r.nota(`${p.id} · ${etiqueta}: ${n}/${min} ok`);
        }
      }

      // qa.md tiene que cubrir los 13 subcriterios, se use o no la plantilla.
      const qa = `propuestas/${p.id}/qa.md`;
      if (existe(qa)) {
        const t = leer(qa);
        const faltan = ctx.rubrica.map((s) => s.id).filter((id) => !new RegExp(`(^|[^A-Z])${id}([^0-9]|$)`, 'm').test(t));
        if (faltan.length) falla(`qa.md no evalúa: ${faltan.join(', ')}`, qa);
      }

      const pendientes = (texto.match(/PENDIENTE:/g) || []).length;
      if (pendientes && lista) r.error(`marcada "listo" con ${pendientes} PENDIENTE: sin resolver`, archivo);
      else if (pendientes) r.nota(`${p.id}: ${pendientes} PENDIENTE: por resolver`);
    }
  },
};
