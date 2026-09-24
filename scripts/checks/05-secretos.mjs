/**
 * Control 05 — nada de credenciales en el repo (AGENTS.md §2.4).
 *
 * Busca asignaciones con valor real, no la palabra suelta: una contraseña escrita con su
 * valor falla, "las credenciales no van en el repo" no. También revisa qué archivos están
 * versionados, porque .gitignore protege lo que todavía no entró, no lo que ya entró.
 *
 * Es el único control que también corre como hook de pre-commit.
 */
import { listar, leer, rel, git } from '../lib/repo.mjs';

const EXENTA = 'verificacion:ignorar-secretos';

// `soloTexto` deja los patrones débiles fuera del código: en un .mjs, "const clave ="
// es una variable, no una credencial. Los patrones fuertes se buscan en todas partes.
const PATRONES = [
  { re: /\b(contrase[nñ]a|password|passwd|pwd|api[_-]?key|secret[_-]?key|access[_-]?token|auth[_-]?token|bearer)\b\s*[:=]\s*(.+)$/i, valor: 2, soloTexto: true },
  { re: /\b(clave|token|secret)\b\s*[:=]\s*(.+)$/i, valor: 2, soloTexto: true },
  { re: /(-----BEGIN [A-Z ]*PRIVATE KEY-----)/, valor: 1 },
  { re: /\b(AKIA[0-9A-Z]{16})\b/, valor: 1 },
  { re: /https?:\/\/[^/\s:@]+:([^/\s:@]{3,})@/, valor: 1 },
];

const EXTENSIONES_TEXTO = ['.md', '.csv', '.txt', '.env', '.json'];
const esTexto = (archivo) => EXTENSIONES_TEXTO.some((e) => archivo.endsWith(e));

// Un valor que no compromete a nadie: plantilla, pendiente, tachado o pregunta.
const ES_PLACEHOLDER = /^(<[^>]*>|`?pendiente:?.*|s[ií]\s*\/\s*no|no\b.*|\*{2,}|x{3,}|\.{3,}|-+|—|\(.*\)|\s*)$/i;

export default {
  id: '05',
  nombre: 'Secretos y archivos sensibles',
  descripcion: 'Credenciales con valor real en el texto y archivos sensibles versionados.',

  run(ctx, r) {
    for (const abs of listar(undefined, { ext: ['.md', '.csv', '.mjs', '.json', '.yml', '.txt', '.env'] })) {
      const archivo = rel(abs);
      leer(abs).split('\n').forEach((linea, i) => {
        if (linea.includes(EXENTA)) return;
        for (const p of PATRONES) {
          if (p.soloTexto && !esTexto(archivo)) continue;
          const m = p.re.exec(linea);
          if (!m) continue;
          const valor = (m[p.valor] || '').trim().replace(/[.,;)]+$/, '');
          if (ES_PLACEHOLDER.test(valor)) continue;
          r.error(`posible credencial en el texto: "${linea.trim().slice(0, 70)}"`, `${archivo}:${i + 1}`);
          break;
        }
      });
    }

    const versionados = (git(['ls-files'], { opcional: true }) || '').split('\n').filter(Boolean);
    const EXTENSION_SENSIBLE = /\.(pdf|env|key|pem|pfx|p12)$/i;
    // Los PDF de las bases (públicos) y los entregables del proyecto se versionan a
    // propósito (DECISIONS.md, 2026-09-24). Un PDF en cualquier otra ruta sigue siendo error.
    const PDF_PERMITIDO = /^(bases\/[^/]+|entregables\/.+)\.pdf$/i;
    // El nombre se juzga por el principio del archivo, no por cualquier coincidencia:
    // "credenciales-lms.csv" es sospechoso, "05-secretos.mjs" es este mismo control.
    const NOMBRE_SENSIBLE = /^(credencial|contrase|password|secreto|secrets?|token)/i;
    const ES_CODIGO = /\.(mjs|js|yml|yaml)$/i;

    for (const f of versionados) {
      const base = f.split('/').pop();
      if (PDF_PERMITIDO.test(f)) continue;
      if (EXTENSION_SENSIBLE.test(f) ||(NOMBRE_SENSIBLE.test(base) && !ES_CODIGO.test(base))) {
        r.error('archivo sensible versionado: sácalo con "git rm --cached" y revisa .gitignore', f);
      }
    }
    r.nota(`${versionados.length} archivos versionados revisados`);
  },
};
