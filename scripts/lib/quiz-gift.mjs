/**
 * Vista web de los quiz GIFT del módulo 2: lee `modulo-2/<curso>/entrega/quiz/M2-Quiz-n-Moodle.gift`
 * y arma una página que los muestra como quedan en Moodle (modo revisión, con la respuesta correcta y la
 * retroalimentación) o para contestarlos (modo responder). La publica `npm run sitio` en quiz-modulo2.html.
 *
 * El diseño está en quiz-gift.html, junto a este archivo: los datos entran en el marcador DATA.
 * Solo entiende el GIFT que genera `npm run produccion` (opción múltiple, una correcta, #### como
 * retroalimentación general); si aparece otra sintaxis, se detiene y dice dónde.
 */
import { ruta, leer } from './repo.mjs';

const desescapar = (s) => s.replace(/\\([:=~#{}])/g, '$1').trim();

function leerQuiz(carpeta, n) {
  const archivo = `modulo-2/${carpeta}/entrega/quiz/M2-Quiz-${n}-Moodle.gift`;
  const txt = leer(archivo);
  const cabecera = txt.split('\n')[0].match(/Quiz \d+ · (.+?) \((.+?)\)\./);
  if (!cabecera) throw new Error(`${archivo}: la primera línea no trae "Quiz n · tema (AE)."`);
  const categoria = (txt.match(/^\$CATEGORY: (.+)$/m) || [])[1] || '';
  const preguntas = [...txt.matchAll(/^::(.+?)::\s*(.+?)\s*\{\n([\s\S]*?)\n\}/gm)].map(([, id, enunciado, cuerpo]) => {
    const opciones = [];
    let correcta = -1;
    let retro = '';
    for (const l of cuerpo.split('\n')) {
      if (l.startsWith('####')) retro = desescapar(l.slice(4));
      else if (l.startsWith('=')) { correcta = opciones.length; opciones.push(desescapar(l.slice(1))); }
      else if (l.startsWith('~')) opciones.push(desescapar(l.slice(1)));
      else if (l.trim()) throw new Error(`${archivo}: línea que la vista no entiende en ${id}: ${l}`);
    }
    if (correcta < 0 || !retro) throw new Error(`${archivo}: ${id} no tiene respuesta correcta o retroalimentación`);
    return { id: id.replace(/^Q\d+-/, ''), enunciado: desescapar(enunciado), opciones, correcta, retro };
  });
  if (!preguntas.length) throw new Error(`${archivo}: no se encontraron preguntas`);
  return { n, tema: cabecera[1], ae: cabecera[2], categoria, preguntas };
}

/** cursos: [{ pf, carpeta, nombre }]. Devuelve el HTML completo de la página. */
export function quizGiftHtml(cursos) {
  const data = cursos.map((c) => ({
    codigo: c.pf,
    nombre: c.nombre,
    quizzes: [1, 2, 3].map((n) => leerQuiz(c.carpeta, n)),
  }));
  const plantilla = leer(ruta('scripts', 'lib', 'quiz-gift.html'));
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
