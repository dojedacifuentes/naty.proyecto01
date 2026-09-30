/**
 * Lee un aprendizaje esperado o un criterio del plan como lo pide el Anexo 7 (pág. 99): verbo + objeto + condición.
 *
 *   analizar(texto) → { verbo, forma, nivel, categoria, objeto, condicion, secundarios, trozos }
 *
 * El nivel sale de data/verbos-bloom.csv (taxonomía de Bloom revisada, lectura nuestra: las bases no clasifican
 * verbos). La condición empieza en la primera marca de "cómo o para qué" después del objeto: un gerundio
 * (UTILIZANDO, DISTINGUIENDO), PARA, MEDIANTE, A TRAVÉS DE, ACORDE, DE ACUERDO, SEGÚN, EN EL CONTEXTO…; si no
 * hay ninguna, el plan no indica condición. `trozos` sirve para destacar: verbo principal, verbos secundarios
 * (gerundios y el infinitivo que sigue a PARA) y "AL MENOS …".
 */
import { leer } from './repo.mjs';
import { parseCSV } from './csv.mjs';

const plano = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
const VERBOS = parseCSV(leer('data/verbos-bloom.csv')).map((v) => ({ ...v, nivel: Number(v.nivel) }));
const FORMA = new Map(VERBOS.flatMap((v) => v.formas.split('|').map((f) => [plano(f), v])));

export const NIVELES = {
  1: { categoria: 'Recordar', color: '334155', fondo: 'E2E8F0' },
  2: { categoria: 'Comprender', color: '1E40AF', fondo: 'DBEAFE' },
  3: { categoria: 'Aplicar', color: '166534', fondo: 'DCFCE7' },
  4: { categoria: 'Analizar', color: '92400E', fondo: 'FEF3C7' },
  5: { categoria: 'Evaluar', color: 'BE123C', fondo: 'FFE4E6' },
  6: { categoria: 'Crear', color: '6B21A8', fondo: 'F3E8FF' },
};

/** Verbo (infinitivo, nivel) de una palabra conjugada o en gerundio, si está en la tabla. */
export function verboDe(palabra) {
  const w = plano(palabra);
  if (FORMA.has(w)) return FORMA.get(w);
  for (const [fin, inf] of [['ANDOSE', 'AR'], ['IENDOSE', 'IR'], ['IENDOSE', 'ER'], ['ANDO', 'AR'], ['IENDO', 'IR'], ['IENDO', 'ER']]) {
    if (w.endsWith(fin) && FORMA.has(w.slice(0, -fin.length) + inf)) return FORMA.get(w.slice(0, -fin.length) + inf);
  }
  return null;
}

const NO_GERUNDIO = new Set(['CUANDO', 'COMANDO', 'MANDO', 'BANDO', 'GRANDO']);
const esGerundio = (w) => /(ANDO|IENDO|ANDOSE|IENDOSE)$/.test(plano(w)) && !NO_GERUNDIO.has(plano(w)) && plano(w).length >= 5;
// Marcas de condición (en el texto plano, sin tildes).
const MARCAS = [' TANTO PARA ', ' PARA ', ' MEDIANTE ', ' A TRAVES D', ' ACORDE ', ' DE ACUERDO ', ' SEGUN ', ' CON BASE EN ', ' EN FUNCION DE ',
  ' EN EL CONTEXTO ', ' EN UN CONTEXTO ', ' EN UN ENTORNO ', ' EN EL ENTORNO ', ' EN CONTEXTOS '];

export function analizar(texto) {
  const t = String(texto).replace(/\s+/g, ' ').trim();
  const p = plano(t);
  const primera = t.match(/^[A-ZÁÉÍÓÚÑ]+/)?.[0] ?? '';
  const v = verboDe(primera);
  if (!v) throw new Error(`Verbo sin nivel en data/verbos-bloom.csv: «${primera}» (${t.slice(0, 70)}…)`);
  // Primera marca después de, al menos, una palabra de objeto. Si lo que sigue al verbo es un gerundio
  // (CODIFICA UTILIZANDO…), el plan no nombra objeto: todo es condición.
  const inicioObjeto = primera.length + 1;
  const segunda = t.slice(inicioObjeto).match(/^[A-ZÁÉÍÓÚÑ]+/)?.[0] ?? '';
  const minimo = esGerundio(segunda) ? inicioObjeto - 1 : inicioObjeto + segunda.length;
  let corte = esGerundio(segunda) ? inicioObjeto - 1 : -1;
  for (const m of MARCAS) {
    let k = p.indexOf(m, minimo);
    while (k > 0 && m === ' PARA ' && p.startsWith(' PARA DESARROLLADORES', k)) k = p.indexOf(m, k + 1);
    if (k > 0 && (corte < 0 || k < corte)) corte = k;
  }
  for (const m of t.matchAll(/[ ,]([A-ZÁÉÍÓÚÑ]+)/g)) {
    if (m.index >= minimo && esGerundio(m[1]) && (corte < 0 || m.index < corte)) { corte = m.index; break; }
  }
  const objeto = (corte >= 0 ? t.slice(inicioObjeto, Math.max(inicioObjeto, corte)) : t.slice(inicioObjeto)).replace(/[ ,.]+$/, '').trim();
  const condicion = corte > 0 ? t.slice(corte).replace(/^[ ,]+/, '').replace(/\.$/, '').trim() : '';

  // Trozos para destacar: el verbo principal, los secundarios y "AL MENOS …".
  const marcas = [{ a: 0, b: primera.length, tipo: 'verbo' }];
  const secundarios = [];
  for (const m of t.matchAll(/[A-ZÁÉÍÓÚÑ]+/g)) {
    if (m.index === 0) continue;
    const antes = plano(t.slice(Math.max(0, m.index - 5), m.index));
    const inf = / PARA $|^PARA $/.test(antes) && /(AR|ER|IR)$/.test(plano(m[0]));
    if (esGerundio(m[0]) || inf) {
      marcas.push({ a: m.index, b: m.index + m[0].length, tipo: 'secundario' });
      secundarios.push(m[0]);
    }
  }
  for (const m of t.matchAll(/AL MENOS (?:UN|UNA|DOS|TRES|CUATRO|CINCO|\d+)\b[^,.;]*?(?=[,.;]| Y |$)/g)) {
    marcas.push({ a: m.index, b: m.index + m[0].length, tipo: 'cantidad' });
  }
  marcas.sort((x, y) => x.a - y.a);
  const trozos = [];
  let k = 0;
  for (const m of marcas) {
    if (m.a < k) continue;
    if (m.a > k) trozos.push({ t: t.slice(k, m.a) });
    trozos.push({ t: t.slice(m.a, m.b), tipo: m.tipo });
    k = m.b;
  }
  if (k < t.length) trozos.push({ t: t.slice(k) });
  return { verbo: v.verbo, forma: primera, nivel: v.nivel, categoria: v.categoria, objeto, condicion, secundarios, trozos, texto: t };
}
