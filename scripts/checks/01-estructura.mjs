/** Control 01 — la forma del repositorio: archivos obligatorios, nomenclatura de propuestas, rutas relativas. */
import { existe, listar, leer, rel } from '../lib/repo.mjs';

const OBLIGATORIOS = [
  'AGENTS.md', 'CLAUDE.md', 'README.md', 'AUDITORIA.md', '.gitignore', '.gitattributes', 'package.json',
  'docs/00-brief-encargo.md', 'docs/01-guia-propuesta-tecnica.md', 'docs/02-diff-bases-2024-2026.md',
  'docs/03-anexo2-estructura.md', 'docs/04-verificadores-protocolo.md',
  'data/clientes.csv', 'data/planes-formativos.csv', 'data/rubrica-subcriterios.csv', 'data/umbrales-por-plan.csv',
  'state/CHECKPOINT.md', 'state/HANDOFF.md', 'state/DECISIONS.md', 'state/OPEN-QUESTIONS.md', 'state/LEDGER.csv',
  'templates/anexo2-esqueleto.md', 'templates/ficha-cliente.md', 'templates/handoff.md', 'templates/qa.md',
  'templates/verificadores.md', 'templates/sesion.md', 'templates/auditoria.md',
  'scripts/verificar.mjs', 'scripts/sesion.mjs',
];

const ARCHIVOS_PROPUESTA = ['anexo2.md', 'ficha.md', 'verificadores.md', 'qa.md'];

// Patrones de ruta absoluta. Las líneas con el marcador de abajo quedan exentas.
const RE_ABSOLUTA = /(^|[\s(`'"])([A-Z]:\\|\/Users\/|\/home\/|\/mnt\/c\/)/; // verificacion:ignorar-rutas-absolutas
const RE_CODIGO_PLAN = /^PF\d{4}$/;

export default {
  id: '01',
  nombre: 'Estructura del repositorio',
  descripcion: 'Archivos obligatorios, nomenclatura de propuestas/ y ausencia de rutas absolutas.',

  run(ctx, r) {
    for (const f of OBLIGATORIOS) {
      if (!existe(f)) r.error('falta un archivo obligatorio del repo', f);
    }

    const slugs = new Set(ctx.clientes.map((c) => c.slug));
    const planes = new Set(ctx.planes.map((p) => p.codigo_plan));

    for (const p of ctx.propuestas) {
      if (!slugs.has(p.cliente)) {
        r.error(`cliente "${p.cliente}" no existe en data/clientes.csv`, `propuestas/${p.id}`);
      }
      if (!RE_CODIGO_PLAN.test(p.plan)) {
        r.error('el directorio del plan debe llamarse PFxxxx', `propuestas/${p.id}`);
      } else if (!planes.has(p.plan)) {
        r.error(`el plan "${p.plan}" no existe en data/planes-formativos.csv`, `propuestas/${p.id}`);
      }
      for (const a of ARCHIVOS_PROPUESTA) {
        if (!existe(`${p.dir}/${a}`)) r.error(`falta ${a} (ver propuestas/README.md)`, `propuestas/${p.id}`);
      }
    }
    r.nota(`${ctx.propuestas.length} propuesta(s) en propuestas/`);

    for (const abs of listar(undefined, { ext: ['.md', '.mjs', '.csv', '.yml', '.json'] })) {
      const archivo = rel(abs);
      leer(abs).split('\n').forEach((linea, i) => {
        if (linea.includes('verificacion:ignorar-rutas-absolutas')) return;
        if (RE_ABSOLUTA.test(linea)) {
          r.error('ruta absoluta: el repo se abre desde otras máquinas (AGENTS.md §8)', `${archivo}:${i + 1}`);
        }
      });
    }
  },
};
