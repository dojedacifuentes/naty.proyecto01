/** Lector/escritor CSV mínimo: soporta comillas dobles, comas dentro de comillas y saltos de línea escapados. */

export function parseCSV(texto) {
  const filas = [];
  let campo = '';
  let fila = [];
  let enComillas = false;
  const t = texto.replace(/\r\n/g, '\n').replace(/\n+$/, '');

  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (enComillas) {
      if (ch === '"') {
        if (t[i + 1] === '"') { campo += '"'; i++; } else enComillas = false;
      } else campo += ch;
    } else if (ch === '"') enComillas = true;
    else if (ch === ',') { fila.push(campo); campo = ''; }
    else if (ch === '\n') { fila.push(campo); filas.push(fila); fila = []; campo = ''; }
    else campo += ch;
  }
  fila.push(campo);
  filas.push(fila);

  if (!filas.length) return [];
  const cab = filas[0].map((h) => h.trim());
  return filas.slice(1)
    .filter((f) => f.some((v) => v.trim() !== ''))
    .map((f) => Object.fromEntries(cab.map((h, i) => [h, (f[i] ?? '').trim()])));
}

export function aCSV(filas, columnas = null) {
  if (!filas.length) return (columnas || []).join(',') + '\n';
  const cols = columnas || Object.keys(filas[0]);
  const esc = (v) => {
    const s = v === undefined || v === null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(','), ...filas.map((f) => cols.map((k) => esc(f[k])).join(','))].join('\n') + '\n';
}
