/**
 * Similitud textual para el control de diferenciación (AGENTS.md §6).
 *
 * TF-IDF + coseno, implementado a mano para no depender de nada externo.
 * El umbral operativo (0,75 entre clientes distintos) está en DECISIONS.md y
 * es calibrable: se pasa por parámetro, no se codifica aquí.
 */

const STOPWORDS = new Set(`a al algo algunas algunos ante antes como con contra cual cuando de del desde donde dos el ella
ellas ellos en entre era erais eran eres es esa esas ese eso esos esta estaba estado estados estamos estan estar estas este
esto estos fin fue fueron ha hace hacen hacer hacia han hasta hay la las le les lo los mas me mi mientras muy nada ni no nos
nosotros o otra otras otro otros para pero poco por porque que quien se sea segun ser si sin sobre son su sus tal tambien
tanto te tiene tienen toda todas todo todos tras un una uno unos ya y e u del al es son ese esta estas estos cada puede
pueden debe deben mismo misma cuales sera seran mas menos donde cuyo cuya`.split(/\s+/).filter(Boolean));

export function limpiar(md) {
  return md
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\s*>/gm, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[|#*_`\-]+/g, ' ')
    .replace(/<[^>]*>/g, ' ');
}

export function tokenizar(texto) {
  return limpiar(texto)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9ñ]+/)
    .filter((t) => t.length >= 4 && !STOPWORDS.has(t) && !/^\d+$/.test(t));
}

/** Vectores TF-IDF normalizados (L2) para un conjunto de documentos. */
export function vectores(documentos) {
  const tokens = documentos.map(tokenizar);
  const N = tokens.length || 1;
  const df = new Map();
  tokens.forEach((ts) => new Set(ts).forEach((t) => df.set(t, (df.get(t) || 0) + 1)));

  return tokens.map((ts) => {
    const tf = new Map();
    ts.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
    const v = new Map();
    let norma = 0;
    for (const [t, f] of tf) {
      // idf suavizado con piso en 1 (la forma de scikit-learn). Sin ese "+1", con pocos
      // documentos el idf de los términos compartidos cae a cero y dos propuestas gemelas
      // dan similitud ~0: exactamente lo contrario de lo que este control busca.
      const peso = (1 + Math.log(f)) * (Math.log((1 + N) / (1 + df.get(t))) + 1);
      v.set(t, peso);
      norma += peso * peso;
    }
    norma = Math.sqrt(norma) || 1;
    for (const [t, p] of v) v.set(t, p / norma);
    return v;
  });
}

export function coseno(a, b) {
  const [chico, grande] = a.size < b.size ? [a, b] : [b, a];
  let s = 0;
  for (const [t, p] of chico) { const q = grande.get(t); if (q) s += p * q; }
  return s;
}

/** Todos contra todos. Devuelve pares ordenados de mayor a menor similitud. */
export function paresSimilitud(documentos, etiquetas) {
  const vs = vectores(documentos);
  const pares = [];
  for (let i = 0; i < vs.length; i++) {
    for (let j = i + 1; j < vs.length; j++) {
      pares.push({ a: etiquetas[i], b: etiquetas[j], similitud: Number(coseno(vs[i], vs[j]).toFixed(4)) });
    }
  }
  return pares.sort((x, y) => y.similitud - x.similitud);
}
