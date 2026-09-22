/**
 * Lectura estructurada de los Markdown del repo.
 *
 * El punto importante es `marcadores()`: los documentos evaluables llevan marcas
 * legibles por máquina que dicen qué subcriterio de la rúbrica alimenta cada bloque
 * y cuántos elementos exige el 7.0. Ejemplo, en templates/anexo2-esqueleto.md:
 *
 *     <!-- verificable: ID=D1 tipo=tabla min=5 -->
 *     <!-- verificable: ID=D3 tipo=tabla min=@umbral:extension_nota7 -->
 *
 * Así el control de cobertura cuenta de verdad en vez de suponer.
 */

export const RE_MARCADOR = /<!--\s*verificable:\s*([^>]*?)\s*-->/g;

/** Encabezados con su bloque de texto hasta el siguiente encabezado de igual o menor nivel. */
export function secciones(texto) {
  const lineas = texto.split('\n');
  const out = [];
  lineas.forEach((l, i) => {
    const m = /^(#{1,6})\s+(.*)$/.exec(l);
    if (m) out.push({ nivel: m[1].length, titulo: m[2].trim(), linea: i + 1, desde: i + 1, hasta: lineas.length });
  });
  out.forEach((s, i) => {
    const sig = out.slice(i + 1).find((o) => o.nivel <= s.nivel);
    s.hasta = sig ? sig.linea - 1 : lineas.length;
    s.cuerpo = lineas.slice(s.desde, s.hasta).join('\n');
  });
  return out;
}

export const titulos = (texto) => secciones(texto).map((s) => s.titulo);

/** Marcadores `<!-- verificable: ... -->` con el bloque de texto que les sigue. */
export function marcadores(texto) {
  const lineas = texto.split('\n');
  const marcas = [];
  lineas.forEach((l, i) => {
    if (/^\s*>/.test(l)) return; // dentro de una cita es documentación sobre marcadores, no un marcador
    RE_MARCADOR.lastIndex = 0;
    const m = RE_MARCADOR.exec(l);
    if (!m) return;
    const attrs = Object.fromEntries(
      m[1].split(/\s+/).filter(Boolean).map((p) => {
        const [k, ...v] = p.split('=');
        return [k.toLowerCase(), v.join('=')];
      })
    );
    if (!attrs.id) return; // marcador sin ID= : no dice qué subcriterio alimenta, no sirve
    marcas.push({ id: attrs.id, tipo: attrs.tipo || 'tabla', min: attrs.min, linea: i + 1, desde: i + 1 });
  });
  marcas.forEach((mk, i) => {
    // El bloque llega hasta el siguiente marcador o el siguiente encabezado.
    let fin = marcas[i + 1] ? marcas[i + 1].linea - 1 : lineas.length;
    for (let j = mk.desde; j < fin; j++) {
      if (/^#{1,6}\s/.test(lineas[j])) { fin = j; break; }
    }
    mk.bloque = lineas.slice(mk.desde, fin).join('\n');
  });
  return marcas;
}

const VACIOS = /^(|-|—|n\/a|na|tbd|pendiente:?.*|<[^>]*>)$/i;
export const esPlaceholder = (s) => VACIOS.test(String(s ?? '').trim());

/** Filas de datos de la primera tabla Markdown del bloque (sin cabecera ni separador). */
export function filasTabla(bloque) {
  const lineas = bloque.split('\n');
  const filas = [];
  let dentro = false;
  for (const l of lineas) {
    const esFila = /^\s*\|.*\|\s*$/.test(l);
    if (!esFila) { if (dentro && filas.length) break; continue; }
    const celdas = l.trim().slice(1, -1).split('|').map((c) => c.trim());
    if (celdas.every((c) => /^:?-{2,}:?$/.test(c))) { dentro = true; continue; }
    if (!dentro) continue; // cabecera
    filas.push(celdas);
  }
  return filas;
}

/** Filas con contenido real: al menos una celda distinta del índice está rellenada. */
export const filasConContenido = (bloque) =>
  filasTabla(bloque).filter((f) => f.slice(1).some((c) => !esPlaceholder(c)));

export function checklist(bloque) {
  const items = bloque.split('\n').filter((l) => /^\s*[-*]\s*\[[ xX]\]/.test(l));
  return { total: items.length, marcados: items.filter((l) => /\[[xX]\]/.test(l)).length };
}

/** Ítems de lista (numerada o con viñeta) que no son placeholders. */
export function itemsLista(bloque) {
  return bloque.split('\n')
    .map((l) => /^\s*(?:[-*]|\d+[.)])\s+(.*)$/.exec(l))
    .filter(Boolean)
    .map((m) => m[1].replace(/^\[[ xX]\]\s*/, '').trim())
    .filter((t) => t && !esPlaceholder(t));
}

/** Indicadores por fila para B1: cuenta los ítems de la última celda de cada fila. */
export function indicadoresPorFila(bloque) {
  return filasTabla(bloque).map((f) => {
    const celda = f[f.length - 1] || '';
    if (esPlaceholder(celda)) return { ae: f[0], n: 0 };
    const partes = celda.split(/<br\s*\/?>|;|\s\d+[.)]\s|·/).map((s) => s.trim()).filter((s) => s && !esPlaceholder(s));
    return { ae: f[0], n: partes.length };
  });
}

/** Compara títulos de sección tolerando acentos, puntuación y colas: "Trampas" ≡ "Trampas que me encontré". */
const normalizarTitulo = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

export function mismoTitulo(a, b, minimo = 7) {
  const x = normalizarTitulo(a);
  const y = normalizarTitulo(b);
  if (!x || !y) return false;
  return x === y || (x.length >= minimo && y.startsWith(x)) || (y.length >= minimo && x.startsWith(y));
}
