/**
 * Control 04 — diferenciación (AGENTS.md §6).
 *
 * Los seis clientes compiten en la misma mesa de evaluación: dos propuestas gemelas
 * dañan a los dos. Se comparan los bloques narrativos (metodología, herramientas,
 * vinculación, extensión, infraestructura), no los contables, porque los contables
 * los determina el plan formativo y es legítimo que se parezcan.
 *
 * Umbral entre clientes distintos: DECISIONS.md, 2026-09-22 (0,75, calibrable).
 */
import { leer, existe, escribir } from '../lib/repo.mjs';
import { secciones } from '../lib/md.mjs';
import { paresSimilitud } from '../lib/texto.mjs';
import { aCSV } from '../lib/csv.mjs';

const UMBRAL_ENTRE_CLIENTES = 0.75;
const UMBRAL_MISMO_CLIENTE = 0.9;
const SECCIONES_NARRATIVAS = /^(VI|VII|X)\./; // metodología · valor agregado · infraestructura
const SALIDA = 'state/diferenciacion.csv';

const narrativa = (texto) =>
  secciones(texto)
    .filter((s) => s.nivel === 2 && SECCIONES_NARRATIVAS.test(s.titulo))
    .map((s) => s.cuerpo)
    .join('\n');

export default {
  id: '04',
  nombre: 'Diferenciación entre propuestas',
  descripcion: 'Similitud TF-IDF todos contra todos sobre los bloques narrativos del Anexo 2.',

  run(ctx, r) {
    const docs = [];
    for (const p of ctx.propuestas) {
      const archivo = `propuestas/${p.id}/anexo2.md`;
      if (!existe(archivo)) continue;
      const texto = leer(archivo);
      const n = narrativa(texto);
      if (n.trim().length < 400) { r.nota(`${p.id}: narrativa aún corta, no se compara`); continue; }
      docs.push({ id: p.id, cliente: p.cliente, plan: p.plan, texto: n });
    }

    if (docs.length < 2) {
      r.nota('hacen falta al menos dos propuestas con narrativa para comparar');
      return;
    }

    const pares = paresSimilitud(docs.map((d) => d.texto), docs.map((d) => d.id));
    const porId = new Map(docs.map((d) => [d.id, d]));
    const filas = [];

    for (const par of pares) {
      const a = porId.get(par.a);
      const b = porId.get(par.b);
      const mismoCliente = a.cliente === b.cliente;
      const umbral = mismoCliente ? UMBRAL_MISMO_CLIENTE : UMBRAL_ENTRE_CLIENTES;
      const supera = par.similitud >= umbral;
      filas.push({
        a: par.a, b: par.b, mismo_cliente: mismoCliente ? 'si' : 'no',
        similitud: par.similitud, umbral, supera: supera ? 'SI' : 'no',
      });
      if (supera && !mismoCliente) {
        r.error(`${par.a} y ${par.b} se parecen ${par.similitud} (umbral ${umbral} entre clientes distintos): regenera la narrativa`, SALIDA);
      } else if (supera) {
        r.aviso(`${par.a} y ${par.b} se parecen ${par.similitud} (mismo cliente, umbral ${umbral})`, SALIDA);
      }
    }

    escribir(SALIDA, aCSV(filas));
    const max = pares[0];
    r.nota(`${pares.length} pares comparados · máxima similitud ${max.similitud} (${max.a} vs ${max.b}) · detalle en ${SALIDA}`);
  },
};
