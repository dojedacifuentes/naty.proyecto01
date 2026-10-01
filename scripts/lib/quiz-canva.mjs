/**
 * Quiz formativos en el formato de `contenidos/<PF>/modulo-2/R-quiz-canva.md`, para los cursos que en el repo
 * solo tienen el quiz y no el kit completo de `npm run produccion` (PF1481, PF1483, PF1486 y PF1495: reemplazan
 * los quiz de Genially de 2024 que no funcionan, pedido del usuario del 2026-09-30). Lee y valida el archivo y
 * arma el GIFT de cada quiz con el mismo formato que quizCanva() de scripts/produccion.mjs, para que
 * `npm run quiz-juego` lo lea igual que el de PF1821 y PF1822.
 *
 *   node scripts/lib/quiz-canva.mjs PF1481 [PF1483 …]   valida y dice qué falta, sin escribir nada
 *
 * Reglas (las mismas del kit): un quiz por aprendizaje esperado del módulo 2 (Quiz n = AEn); cada uno con
 * "**Cuándo:**", "**Insignia:** … · **Siguiente parada:** …" y 5 preguntas; cada pregunta dice su AE, trae de 2 a 4
 * alternativas distintas con una sola correcta en negrita y su retroalimentación. Además, nada de instituciones
 * (recursos neutros, DECISIONS.md) ni marcas de trabajo sin cerrar. Sin dependencias (AGENTS.md §8).
 */
import { leer } from './repo.mjs';

const AJENOS = /\b(skillnest|unab|andr[eé]s bello|mindhub|chc|hackea)\b/i;
const MARCAS = /PENDIENTE|TODO|XXX/;
const plano = (t) => t.replace(/\*\*|\*|`/g, '').trim();
// Igual que limpio() y gift() de scripts/produccion.mjs: el GIFT de los dos caminos tiene que ser el mismo.
const limpio = (s) => s.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/`/g, '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
const gift = (s) => s.replace(/([~=#{}:\\])/g, '\\$1');

/** Lee R-quiz-canva.md. nAes: cuántos aprendizajes tiene el módulo 2 del plan. Lanza un error con la lista de problemas. */
export function leerQuizCanva(pf, md, nAes) {
  const archivo = `contenidos/${pf}/modulo-2/R-quiz-canva.md`;
  const errores = [];
  const mision = /^\*\*Misión:\*\*\s*(.+)$/m.exec(md)?.[1];
  if (!mision) errores.push('falta la línea "**Misión:** …" antes del primer quiz');
  const quizzes = [];
  for (let n = 1; n <= nAes; n++) {
    const inicio = md.search(new RegExp(`^## Quiz ${n}\\b`, 'm'));
    if (inicio < 0) { errores.push(`falta "## Quiz ${n}" (uno por aprendizaje: el plan tiene ${nAes})`); continue; }
    const resto = md.slice(inicio + 3);
    const fin = resto.search(/^## /m);
    const L = md.slice(inicio, fin < 0 ? undefined : inicio + 3 + fin).split('\n');
    const cab = /^## Quiz \d+ · (.+?) \((AE\d+)\)\s*$/.exec(L[0]);
    if (!cab) errores.push(`Quiz ${n}: el título debe ser "## Quiz ${n} · tema (AE${n})"`);
    else if (cab[2] !== `AE${n}`) errores.push(`Quiz ${n}: el título dice ${cab[2]} y debe ser AE${n}`);
    const sec = L.join('\n');
    const cuando = /^\*\*Cuándo:\*\*\s*(.+)$/m.exec(sec)?.[1];
    const juego = /^\*\*Insignia:\*\*\s*(.+?)\s*·\s*\*\*Siguiente parada:\*\*\s*(.+)$/m.exec(sec);
    if (!cuando) errores.push(`Quiz ${n}: falta "**Cuándo:** …"`);
    if (!juego) errores.push(`Quiz ${n}: falta "**Insignia:** … · **Siguiente parada:** …"`);
    const preguntas = [];
    for (const l of L) {
      const p = /^(\d+)\. \*\((AE\d+)\)\*\s*(.+)$/.exec(l);
      if (p) { preguntas.push({ n: +p[1], ae: p[2], texto: p[3], opciones: [], retro: '' }); continue; }
      const o = /^\s+- (\*\*)?([a-d])\) (.+?)(\*\*)?$/.exec(l);
      if (o && preguntas.length) { preguntas.at(-1).opciones.push({ letra: o[2], texto: o[3], correcta: Boolean(o[1]) }); continue; }
      const r = /^\s+\*Retroalimentación:\*\s*"?(.+?)"?$/.exec(l);
      if (r && preguntas.length) preguntas.at(-1).retro = r[1];
    }
    if (preguntas.length !== 5) errores.push(`Quiz ${n}: tiene ${preguntas.length} preguntas y deben ser 5`);
    for (const p of preguntas) {
      const donde = `Quiz ${n}, pregunta ${p.n}`;
      if (p.ae !== `AE${n}`) errores.push(`${donde}: dice ${p.ae} y es del quiz del AE${n}`);
      if (p.opciones.length < 2 || p.opciones.length > 4) errores.push(`${donde}: tiene ${p.opciones.length} alternativas (de 2 a 4, letras a-d)`);
      if (p.opciones.filter((o) => o.correcta).length !== 1) errores.push(`${donde}: debe tener una sola respuesta correcta en negrita`);
      if (new Set(p.opciones.map((o) => plano(o.texto).toLowerCase())).size !== p.opciones.length) errores.push(`${donde}: hay dos alternativas iguales`);
      if (p.opciones.some((o, i) => o.letra !== 'abcd'[i])) errores.push(`${donde}: las letras deben ir en orden a), b), c), d)`);
      if (!p.retro) errores.push(`${donde}: falta la retroalimentación`);
    }
    if (AJENOS.test(sec)) errores.push(`Quiz ${n}: nombra una institución («${sec.match(AJENOS)[0]}»): los recursos son neutros`);
    if (MARCAS.test(sec)) errores.push(`Quiz ${n}: tiene una marca de trabajo sin cerrar («${sec.match(MARCAS)[0]}»)`);
    quizzes.push({ n, ae: `AE${n}`, tema: cab ? plano(cab[1]) : '', cuando: plano(cuando || ''),
      insignia: plano(juego?.[1] || '').replace(/\.$/, ''), siguiente: plano(juego?.[2] || '').replace(/\.$/, ''), preguntas });
  }
  if (errores.length) throw new Error(`${archivo}:\n  - ${errores.join('\n  - ')}`);
  return { mision: plano(mision).replace(/\.$/, ''), quizzes };
}

/** El GIFT de un quiz (Moodle: Banco de preguntas → Importar → GIFT), igual al que genera `npm run produccion`. */
export function giftQuiz(pf, q) {
  return [`// ${pf} · Módulo 2 · Quiz ${q.n} · ${q.tema} (${q.ae}). Formativo, sin nota. Generado desde R-quiz-canva.md.`,
    '// Moodle: Banco de preguntas → Importar → formato GIFT. Luego, un Cuestionario con estas 5 preguntas.',
    `$CATEGORY: ${pf}-M2/Quiz-${q.n}`, '',
    ...q.preguntas.flatMap((p) => [`::Q${q.n}-P${p.n} (${p.ae}):: ${gift(limpio(p.texto))} {`,
      ...p.opciones.map((o) => `${o.correcta ? '=' : '~'}${gift(limpio(o.texto))}`),
      `####${gift(limpio(p.retro))}`, '}', '']),
  ].join('\n');
}

// Uso directo: validar sin escribir.
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('scripts/lib/quiz-canva.mjs')) {
  let mal = 0;
  for (const pf of process.argv.slice(2)) {
    try {
      const plan = JSON.parse(leer(`data/planes/${pf}.json`)).modulos.find((m) => m.n === 2);
      const r = leerQuizCanva(pf, leer(`contenidos/${pf}/modulo-2/R-quiz-canva.md`), plan.aprendizajes_esperados.length);
      const letras = r.quizzes.map((q) => q.preguntas.map((p) => p.opciones.find((o) => o.correcta).letra).join('')).join(' ');
      console.log(`${pf}: ${r.quizzes.length} quiz, ${r.quizzes.reduce((s, q) => s + q.preguntas.length, 0)} preguntas. Respuestas correctas por quiz: ${letras}`);
    } catch (e) { mal++; console.error(e.message); }
  }
  process.exitCode = mal ? 1 : 0;
}
