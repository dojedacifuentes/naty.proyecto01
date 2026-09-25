/**
 * Notebook de Jupyter (.ipynb, nbformat 4.4) desde un Markdown del repo.
 *
 * - Cada bloque ```python es una celda de código; el texto entre bloques, celdas de texto
 *   (una por título "## ").
 * - La línea "plan: A / B" se muestra como "Contenido del plan (textual): A · B" y sirve para
 *   revisar que el notebook cubra los contenidos del aprendizaje esperado.
 * - [[aprendizaje]] y [[criterios]] se reemplazan por el texto de la ficha SIPFOR, textual.
 */

export function leerNotebook(md, { aprendizaje = '', criterios = [] } = {}) {
  const texto = md.replace(/\r\n/g, '\n')
    .replace('[[aprendizaje]]', aprendizaje)
    .replace('[[criterios]]', criterios.join('\n'));
  const celdas = [];
  const plan = [];
  let buf = [];
  const cerrarTexto = () => {
    const t = buf.join('\n').trim();
    if (t) celdas.push({ tipo: 'markdown', fuente: t });
    buf = [];
  };
  const L = texto.split('\n');
  for (let i = 0; i < L.length; i++) {
    const l = L[i];
    if (/^```python\s*$/.test(l)) {
      cerrarTexto();
      const j = L.findIndex((x, k) => k > i && /^```\s*$/.test(x));
      if (j < 0) throw new Error('bloque de código sin cierre');
      celdas.push({ tipo: 'code', fuente: L.slice(i + 1, j).join('\n') });
      i = j;
      continue;
    }
    if (/^## /.test(l)) cerrarTexto();
    const p = /^plan:\s*(.+)$/.exec(l);
    if (p) {
      const items = p[1].split(' / ').map((s) => s.trim());
      plan.push(...items);
      buf.push(`**Contenido del plan (textual):** ${items.join(' · ')}`);
      continue;
    }
    buf.push(l);
  }
  cerrarTexto();
  return { celdas, plan };
}

const lineas = (t) => t.split('\n').map((l, i, a) => (i < a.length - 1 ? l + '\n' : l));

export function notebookJson({ celdas }) {
  return JSON.stringify({
    cells: celdas.map((c) => (c.tipo === 'code'
      ? { cell_type: 'code', execution_count: null, metadata: {}, outputs: [], source: lineas(c.fuente) }
      : { cell_type: 'markdown', metadata: {}, source: lineas(c.fuente) })),
    metadata: {
      kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' },
      language_info: { name: 'python' },
      colab: { provenance: [] },
    },
    nbformat: 4,
    nbformat_minor: 4,
  }, null, 1) + '\n';
}

// Claves con forma real (OpenAI, Hugging Face) o asignadas a mano dentro de una celda.
const CLAVE_ESCRITA = /\b(sk-[A-Za-z0-9_-]{16,}|hf_[A-Za-z0-9]{16,})\b|OPENAI_API_KEY"\]\s*=/;

/** Problemas del notebook frente al plan (lista vacía si está en orden). */
export function verificarNotebook(nb, unidadesAE) {
  const errores = [];
  for (const x of nb.plan.filter((u) => !unidadesAE.includes(u))) errores.push(`rótulo que no es textual del plan: "${x}"`);
  for (const x of unidadesAE.filter((u) => !nb.plan.includes(u))) errores.push(`contenido del plan sin sección en el notebook: "${x}"`);
  const codigo = nb.celdas.filter((c) => c.tipo === 'code').map((c) => c.fuente).join('\n');
  if (CLAVE_ESCRITA.test(codigo)) errores.push('hay una clave escrita en una celda');
  // Cada sección numerada ("## n ·") necesita al menos una comprobación: assert o comprobar().
  let seccion = null; let comprobada = true;
  for (const c of nb.celdas) {
    const m = c.tipo === 'markdown' && /^## (\d+) ·/m.exec(c.fuente);
    if (m) {
      if (seccion !== null && !comprobada) errores.push(`la sección ${seccion} no tiene autocomprobación`);
      seccion = m[1]; comprobada = false;
    }
    if (c.tipo === 'code' && /\bassert\b|\bcomprobar\(/.test(c.fuente)) comprobada = true;
  }
  if (seccion !== null && !comprobada) errores.push(`la sección ${seccion} no tiene autocomprobación`);
  return errores;
}
