/**
 * Vista web de los quiz GIFT del módulo 2. Lee, por curso:
 *   - los 3 quiz formativos: `modulo-2/<curso>/entrega/quiz/M2-Quiz-n-Moodle.gift`
 *   - el quiz de cada aprendizaje (prueba objetiva): `modulo-2/<curso>/entrega/AEn/M2-AEn-Quiz.gift`
 * y arma una página que los muestra como quedan en Moodle (modo revisión, con la respuesta correcta y la
 * retroalimentación) o para contestarlos (modo responder). La publica `npm run sitio` en quiz-modulo2.html.
 * Cada quiz tiene un ancla: quiz-modulo2.html#PF1821-q1 (formativo 1), #PF1821-ae3 (quiz del AE3).
 *
 * El diseño está en quiz-gift.html, junto a este archivo: los datos entran en el marcador DATA.
 * Solo entiende el GIFT que genera `npm run produccion`: opción múltiple con una correcta, retroalimentación
 * general con #### y preguntas abiertas (sin alternativas, con "Respuesta esperada"). Si aparece otra
 * sintaxis, se detiene y dice dónde.
 */
import { leer, existe } from './repo.mjs';

const desescapar = (s) => s.replace(/\\([:=~#{}])/g, '$1').trim();

export function leerGift(archivo) {
  const txt = leer(archivo);
  const categoria = (txt.match(/^\$CATEGORY: (.+)$/m) || [])[1] || '';
  const preguntas = [...txt.matchAll(/^::(.+?)::\s*(.+?)\s*\{\n([\s\S]*?)\n?\}/gm)].map(([, id, enunciado, cuerpo]) => {
    const opciones = [];
    let correcta = -1;
    let retro = '';
    for (const l of cuerpo.split('\n')) {
      if (l.startsWith('####')) retro = desescapar(l.slice(4));
      else if (l.startsWith('=')) { correcta = opciones.length; opciones.push(desescapar(l.slice(1))); }
      else if (l.startsWith('~')) opciones.push(desescapar(l.slice(1)));
      else if (l.trim()) throw new Error(`${archivo}: línea que la vista no entiende en ${id}: ${l}`);
    }
    const base = { id: id.replace(/^Q\d+-/, ''), enunciado: desescapar(enunciado) };
    if (!opciones.length) return { ...base, tipo: 'abierta', retro: retro.replace(/^Respuesta esperada:\s*/, '') };
    if (correcta < 0) throw new Error(`${archivo}: ${id} no tiene alternativa correcta`);
    return { ...base, tipo: 'multiple', opciones, correcta, retro };
  });
  if (!preguntas.length) throw new Error(`${archivo}: no se encontraron preguntas`);
  return { cabecera: txt.split('\n')[0], categoria, preguntas };
}

function formativo(c, n) {
  const g = leerGift(`modulo-2/${c.carpeta}/entrega/quiz/M2-Quiz-${n}-Moodle.gift`);
  const m = g.cabecera.match(/Quiz \d+ · (.+?) \((.+?)\)\./);
  if (!m) throw new Error(`Quiz ${n} de ${c.pf}: la primera línea no trae "Quiz n · tema (AE)."`);
  return { clave: `${c.pf}-q${n}`, titulo: `Quiz ${n}`, tema: m[1], ae: m[2], categoria: g.categoria, preguntas: g.preguntas };
}

function porAprendizaje(c) {
  const quizzes = [];
  for (let n = 1; existe(`modulo-2/${c.carpeta}/entrega/AE${n}/M2-AE${n}-Quiz.gift`); n++) {
    const g = leerGift(`modulo-2/${c.carpeta}/entrega/AE${n}/M2-AE${n}-Quiz.gift`);
    quizzes.push({ clave: `${c.pf}-ae${n}`, titulo: `Quiz AE${n}`, tema: '', ae: '', categoria: g.categoria, preguntas: g.preguntas });
  }
  return quizzes;
}

/** cursos: [{ pf, carpeta, nombre }]. Devuelve el HTML completo de la página. */
export function quizGiftHtml(cursos) {
  const data = cursos.map((c) => ({
    codigo: c.pf,
    nombre: c.nombre,
    grupos: [
      { titulo: 'Quiz formativos (Canva y Moodle)', quizzes: [1, 2, 3].map((n) => formativo(c, n)) },
      { titulo: 'Quiz por aprendizaje esperado (prueba objetiva)', quizzes: porAprendizaje(c) },
    ],
  }));
  const plantilla = leer('scripts/lib/quiz-gift.html');
  const corte = plantilla.indexOf('</style>') + '</style>'.length;
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
${plantilla.slice(0, corte)}
</head><body>
${plantilla.slice(corte).replace('/*DATA*/', () => json)}
</body></html>
`;
}
