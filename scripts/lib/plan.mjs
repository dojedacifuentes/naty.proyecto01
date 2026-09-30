/**
 * El plan formativo del módulo, leído de la ficha de SIPFOR (contenidos/<PF>/modulo-2/00-ficha-sipfor.md):
 * competencia, aprendizajes esperados, criterios de evaluación y contenidos, con las mismas palabras.
 * Lo usa evaluacion-modulo.mjs para citar el plan sin copiarlo a mano: en las fuentes se escriben
 * marcas como {{AE2}}, {{3.4}} o {{c:SUPABASE}} y aquí se reemplazan por el texto de la ficha.
 */
import { oracion } from './oracion.mjs';

// Para comparar sin mayúsculas ni tildes: "Manipulación" = "MANIPULACION".
export const normal = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/\s+/g, ' ').trim();

// Contenidos del plan en unidades, como en las cápsulas (produccion.mjs, unidades()): cada ítem de la
// ficha partido por " *" (así los junta SIPFOR) y por oración, sin cambiar una palabra.
const partir = (it) => it.split(/\s\*/).flatMap((p) => p.split(/(?<=\D\.)\s+(?=[A-ZÁÉÍÓÚÑ])/)).map((s) => s.trim()).filter(Boolean);

export function leerPlan(md) {
  const modulo = /^# .*?: (.+)$/m.exec(md)?.[1] ?? '';
  const fila = /^\| Módulo \|(.+)$/m.exec(md)?.[1] ?? '';
  const codigo = /`(\w+)`/.exec(fila)?.[1] ?? '';
  const horas = /\*\*(\d+) h\*\*/.exec(fila)?.[1] ?? '';
  const competencia = (md.split('## Competencia del módulo')[1] ?? '').split(/\n## /)[0].trim();
  if (!competencia) throw new Error('La ficha no tiene la competencia del módulo');
  const aes = {};
  for (const bloque of md.split(/\n### /).slice(1)) {
    const m = /^(AE(\d))\. (.+)$/m.exec(bloque);
    if (!m) continue;
    const cuerpo = bloque.split(/\n## /)[0];
    const criterios = {};
    for (const c of cuerpo.matchAll(/^- (\d\.\d) (.+)$/gm)) criterios[c[1]] = c[2].trim();
    const lineas = (cuerpo.split('**Contenidos**')[1] ?? '').split('\n').filter((l) => /^\s*- /.test(l)).map((l) => l.trim().slice(2));
    const titulo = lineas.find((l) => /^\d+\. /.test(l));
    if (!titulo) throw new Error(`${m[1]}: la ficha no tiene el título de sus contenidos`);
    const items = lineas.filter((l) => l !== titulo).flatMap(partir);
    aes[m[1]] = { n: +m[2], texto: m[3].trim(), criterios, unidad: { n: +/^(\d+)\./.exec(titulo)[1], titulo: titulo.replace(/^\d+\.\s*/, ''), items } };
  }
  if (!Object.keys(aes).length) throw new Error('La ficha no tiene aprendizajes esperados');
  return { modulo, codigo, horas, competencia, aes };
}

/** Todos los contenidos del plan: [{ unidad, texto }], en el orden de la ficha. */
export const contenidos = (plan) => Object.values(plan.aes).flatMap((a) => a.unidad.items.map((texto) => ({ unidad: a.unidad.n, texto })));

/** El contenido que empieza con `prefijo` (sin mayúsculas ni tildes); tiene que ser uno solo. */
export function contenido(plan, prefijo) {
  const p = normal(prefijo);
  const hay = contenidos(plan).filter((c) => normal(c.texto).startsWith(p));
  if (hay.length !== 1) throw new Error(`"${prefijo}" coincide con ${hay.length} contenidos del plan${hay.length ? `: ${hay.map((c) => c.texto).join(' | ')}` : ''}`);
  return hay[0];
}

/** Un trozo de la competencia, copiado de la ficha (no del texto de quien lo pide); falla si no está en ella. */
export function trozoCompetencia(plan, trozo) {
  // Letra por letra, para que las posiciones coincidan con el texto de la ficha.
  const base = [...plan.competencia].map((ch) => ch.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase()).join('');
  const buscado = normal(trozo);
  const i = base.indexOf(buscado);
  if (i < 0) throw new Error(`"${trozo}" no está en la competencia del módulo`);
  return oracion([...plan.competencia].slice(i, i + buscado.length).join(''));
}
