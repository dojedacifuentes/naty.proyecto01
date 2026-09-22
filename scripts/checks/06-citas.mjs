/**
 * Control 06 — toda afirmación sobre las bases va citada (AGENTS.md §2.1).
 *
 * Es heurístico a propósito: detecta la frase que afirma algo de las bases y busca una
 * cita (numeral o página) en la misma línea o en las de al lado. Por eso avisa y no
 * bloquea: un falso positivo no puede frenar un commit. Un falso negativo tampoco salva,
 * pero la lista corta que deja es exactamente lo que un auditor tiene que mirar a mano.
 *
 * Alcance: docs/ y propuestas/. AGENTS.md y README.md hablan *del* protocolo, no de las bases.
 */
import { listar, leer, rel, ruta } from '../lib/repo.mjs';

const AFIRMA = /\b(las bases (dicen|exigen|piden|establecen|señalan|obligan)|seg[uú]n las bases|la r[uú]brica exige|el numeral|el punto \d|causal de rechazo|ser[aá] rechazad|es obligatorio|se eval[uú]a con|otorga (el )?puntaje)/i;
const CITA = /\(bases\s*20\d\d[^)]*\)|numeral\s*\d+(\.\d+)*|n[uú]m\.?\s*\d+(\.\d+)*|p[aá]g\.?\s*\d+|punto\s*\d+\.\d+|anexo\s*n?°?\s*\d+/i;

export default {
  id: '06',
  nombre: 'Citas de las bases',
  descripcion: 'Afirmaciones sobre la licitación sin numeral ni página cerca. Avisa, no bloquea.',

  run(ctx, r) {
    const archivos = [
      ...listar(ruta('docs'), { ext: ['.md'] }),
      ...listar(ruta('propuestas'), { ext: ['.md'] }),
    ];
    let revisadas = 0;

    for (const abs of archivos) {
      const archivo = rel(abs);
      const lineas = leer(abs).split('\n');
      lineas.forEach((linea, i) => {
        if (!AFIRMA.test(linea)) return;
        revisadas++;
        const contexto = [lineas[i - 1], linea, lineas[i + 1]].filter(Boolean).join(' ');
        if (!CITA.test(contexto)) {
          r.aviso(`afirma sobre las bases sin cita: "${linea.trim().slice(0, 80)}"`, `${archivo}:${i + 1}`);
        }
      });
    }
    r.nota(`${revisadas} afirmaciones sobre las bases revisadas en ${archivos.length} archivos`);
  },
};
