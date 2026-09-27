/**
 * Revisión del logo de marca, antes de imprimir (npm run marca).
 *
 * Abre cada HTML con marca en Edge o Chrome headless, con un script inyectado que mide las cajas del
 * logo (con su placa) y de cada texto de la cabecera de los documentos y de la portada de las lecturas
 * y de los cuadernillos: kicker, título, curso, regla, bajada y número del AE. El script deja el
 * resultado en un atributo del <html>, que se lee con --dump-dom. Sin dependencias.
 *
 * Es un error, con archivo, qué choca y cuántos mm:
 *   - que el logo o el número del AE se cruce con un texto, o que dos textos se crucen;
 *   - que entre el logo o el número del AE y un texto queden menos de RESGUARDO_MM;
 *   - que algo quede fuera de su banda o cabecera (la banda corta lo que se sale: overflow hidden), o
 *     que se meta más de 1 mm en su margen interior.
 *
 * Las cajas de texto son las de cada línea (Range.getClientRects), no las del bloque: un título corto
 * no ocupa todo el ancho de su columna.
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ruta, leer, escribir } from './repo.mjs';
import { navegador } from './pdf.mjs';

export const RESGUARDO_MM = 4;

// Ancho por pasada: el ancho útil de la página A4 con márgenes de 26 mm (158 mm = 597 px) para las
// cabeceras, y la hoja completa (210 mm = 794 px) para las portadas, que van sin margen. En Windows la
// ventana headless pierde 26 px de marco (una ventana de 597 px deja 571 px de página), así que la
// ventana va con holgura y el script fija el ancho del <body> en mm, igual que la caja de impresión.
const PASADAS = { cabecera: { px: 597, mm: 158 }, portada: { px: 794, mm: 210 } };

// Qué se mide en cada zona. "aislados" son los elementos gráficos que piden resguardo frente a los textos.
const ZONAS = {
  cabecera: [{ zona: '.cabecera', nombre: 'cabecera', borde: 'la cabecera', logo: '.marca-logo', titulo: 'h1',
    textos: [['kicker', '.kicker'], ['título', 'h1'], ['curso', '.curso'], ['regla', '.regla']] }],
  portada: [
    { zona: '.banda', nombre: 'portada de la lectura', borde: 'la banda', logo: '.marca-logo', titulo: 'h1', ae: '.ae',
      textos: [['kicker', '.kicker'], ['curso', '.curso'], ['número del AE', '.ae'], ['título', 'h1'], ['regla', '.regla'], ['bajada', '.bajada']] },
    { zona: '.pc-banda', nombre: 'portada del cuadernillo', borde: 'la banda', logo: '.pc-logo', titulo: '.pc-titulo',
      textos: [['kicker', '.pc-kicker'], ['título', '.pc-titulo'], ['regla', '.pc-regla'], ['curso', '.pc-curso']] },
  ],
};

function script(pasada) {
  return `<script>
(() => {
  const ZONAS = ${JSON.stringify(ZONAS[pasada])};
  const MM = 96 / 25.4, RESGUARDO = ${RESGUARDO_MM};
  const mm = (px) => Math.round((px / MM) * 10) / 10;
  // Cajas de las líneas de texto de un elemento; si no tiene texto (la regla), la del elemento. El número
  // del AE (88 pt con interlínea 1) se mide por sus bloques, rótulo y número: la caja de texto de un dígito
  // tan grande sobresale 4,7 mm de su línea por arriba y por abajo, y el trazo queda dentro de la línea.
  const cajas = (el, sel) => {
    if (sel === '.ae') return [...el.children].map((c) => c.getBoundingClientRect()).filter((x) => x.width > 0 && x.height > 0);
    const out = [];
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) {
      if (!n.textContent.trim()) continue;
      const r = document.createRange(); r.selectNodeContents(n);
      for (const x of r.getClientRects()) if (x.width > 0.5 && x.height > 0.5) out.push(x);
    }
    if (!out.length) { const x = el.getBoundingClientRect(); if (x.width > 0 && x.height > 0) out.push(x); }
    return out;
  };
  // Separación entre dos cajas: si se cruzan, cuánto se montan (lo que habría que mover una para
  // separarlas); si no, la distancia libre (el resguardo se mide en horizontal o en vertical).
  const relacion = (a, b) => {
    const dx = Math.max(a.left - b.right, b.left - a.right), dy = Math.max(a.top - b.bottom, b.top - a.bottom);
    if (dx < 0 && dy < 0) return { cruce: Math.min(-dx, -dy) };
    return { libre: Math.max(dx, dy) };
  };
  const medir = () => {
    const problemas = [];
    let zonas = 0;
    for (const z of ZONAS) {
      document.querySelectorAll(z.zona).forEach((zona, i) => {
        zonas++;
        const titulo = (zona.querySelector(z.titulo)?.textContent ?? '').replace(/\\s+/g, ' ').trim();
        const donde = { zona: z.nombre, n: i + 1, titulo };
        const mal = (que, detalle) => problemas.push({ ...donde, que, detalle });
        const logo = zona.querySelector(z.logo);
        const elementos = [];
        if (!logo) mal('logo', 'no está');
        else {
          const img = logo.querySelector('img');
          if (!img || !img.complete || !img.naturalWidth) mal('logo', 'la imagen no cargó');
          elementos.push({ nombre: 'logo', cajas: [logo.getBoundingClientRect()], aislado: true });
        }
        for (const [nombre, sel] of z.textos) {
          const el = zona.querySelector(sel);
          if (!el) { if (nombre !== 'bajada') mal(nombre, 'no está'); continue; }
          elementos.push({ nombre, cajas: cajas(el, sel), aislado: sel === z.ae });
        }
        // Cruces y resguardo, par por par.
        for (let a = 0; a < elementos.length; a++) for (let b = a + 1; b < elementos.length; b++) {
          const A = elementos[a], B = elementos[b];
          const aislado = A.aislado || B.aislado;
          let peor = null;
          for (const ca of A.cajas) for (const cb of B.cajas) {
            const r = relacion(ca, cb);
            if (r.cruce !== undefined && (!peor || peor.cruce === undefined || r.cruce > peor.cruce)) peor = r;
            else if (r.libre !== undefined && (!peor || (peor.cruce === undefined && r.libre < peor.libre))) peor = r;
          }
          if (!peor) continue;
          if (peor.cruce !== undefined) mal(A.nombre + ' y ' + B.nombre, 'se cruzan: se montan ' + mm(peor.cruce) + ' mm');
          else if (aislado && peor.libre < RESGUARDO * MM - 0.5) mal(A.nombre + ' y ' + B.nombre, 'quedan ' + mm(peor.libre) + ' mm libres; el resguardo mínimo es ' + RESGUARDO + ' mm');
        }
        // Nada fuera de la zona (la banda de las portadas corta lo que se sale) ni metido en su margen
        // interior más de 1 mm (un texto pegado al borde de la banda parece cortado aunque se lea).
        const Z = zona.getBoundingClientRect();
        const est = getComputedStyle(zona);
        const pad = (l) => parseFloat(est['padding' + l]) || 0;
        const I = { top: Z.top + pad('Top'), bottom: Z.bottom - pad('Bottom'), left: Z.left + pad('Left'), right: Z.right - pad('Right') };
        for (const e of elementos) {
          let fuera = 0, dentro = 0;
          for (const c of e.cajas) {
            fuera = Math.max(fuera, Z.top - c.top, c.bottom - Z.bottom, Z.left - c.left, c.right - Z.right);
            dentro = Math.max(dentro, I.top - c.top, c.bottom - I.bottom, I.left - c.left, c.right - I.right);
          }
          if (fuera > 0.5) mal(e.nombre, (est.overflow === 'hidden' ? 'queda cortado: ' : '') + 'se sale ' + mm(fuera) + ' mm de ' + z.borde);
          else if (dentro > MM) mal(e.nombre, 'invade ' + mm(dentro) + ' mm el margen interior de ' + z.borde);
        }
      });
    }
    return { ancho: mm(document.body.getBoundingClientRect().width), zonas, problemas };
  };
  const fin = (r) => {
    document.documentElement.setAttribute('data-revision-marca', encodeURIComponent(JSON.stringify(r)));
    document.head.textContent = ''; document.body.textContent = '';
  };
  document.body.style.width = '${PASADAS[pasada].mm}mm';
  window.addEventListener('load', () => document.fonts.ready.then(() => {
    try { fin(medir()); } catch (e) { fin({ error: String(e) }); }
  }));
})();
</script>`;
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
function correrUnaVez(nav, url, ancho) {
  return new Promise((resolve, reject) => {
    execFile(nav, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=15000',
      `--window-size=${ancho},1400`, '--dump-dom', url], { timeout: 120000, maxBuffer: 16 * 1024 * 1024 },
    (err, stdout) => (err ? reject(err) : resolve(stdout)));
  });
}
// Edge headless en Windows a veces no logra crear su ventana oculta (FATAL hwnd_util.cc, error 87) cuando
// arrancan varios a la vez: se reintenta hasta 4 veces antes de darlo por fallido.
async function correr(nav, url, ancho) {
  for (let intento = 1; ; intento++) {
    try { return await correrUnaVez(nav, url, ancho); } catch (e) {
      if (intento >= 4) throw new Error(`el navegador falló 4 veces: ${String(e.message).split('\n').filter((l) => /FATAL|ERROR/.test(l))[0] ?? e.code}`);
      await esperar(500 * intento);
    }
  }
}

/**
 * Revisa los HTML indicados (rutas relativas al repo). Devuelve [{ archivo, zona, n, titulo, que, detalle }].
 * Cada archivo se abre una vez por pasada: con cabecera a 597 px, con portada a 794 px.
 */
export async function revisarMarca(archivos, { paralelo = 3 } = {}) {
  const nav = navegador();
  if (!nav) throw new Error('No encontré Edge ni Chrome para revisar el logo.');
  const tareas = [];
  for (const archivo of archivos) {
    const html = leer(archivo);
    const pasadas = [];
    if (/class="cabecera[" ]/.test(html)) pasadas.push('cabecera');
    if (/class="(banda|pc-banda)[" ]/.test(html)) pasadas.push('portada');
    for (const pasada of pasadas) {
      const copia = path.join(path.dirname(archivo), 'revision', `${path.basename(archivo, '.html')}.${pasada}.html`);
      escribir(copia, html.replace('</body>', `${script(pasada)}</body>`));
      tareas.push({ archivo, pasada, copia });
    }
  }
  const problemas = [];
  let siguiente = 0;
  const trabajador = async () => {
    while (siguiente < tareas.length) {
      const t = tareas[siguiente++];
      let dom;
      try { dom = await correr(nav, `${pathToFileURL(ruta(t.copia)).href}#${t.pasada}`, PASADAS[t.pasada].px + 60); } catch (e) {
        problemas.push({ archivo: t.archivo, zona: t.pasada, que: 'revisión', detalle: e.message }); continue;
      }
      const m = /data-revision-marca="([^"]*)"/.exec(dom);
      if (!m) { problemas.push({ archivo: t.archivo, zona: t.pasada, que: 'revisión', detalle: 'el navegador no devolvió la medición' }); continue; }
      const r = JSON.parse(decodeURIComponent(m[1]));
      if (r.error) { problemas.push({ archivo: t.archivo, zona: t.pasada, que: 'revisión', detalle: r.error }); continue; }
      if (Math.abs(r.ancho - PASADAS[t.pasada].mm) > 0.5) problemas.push({ archivo: t.archivo, zona: t.pasada, que: 'revisión', detalle: `la página midió ${r.ancho} mm y no ${PASADAS[t.pasada].mm}` });
      if (!r.zonas) problemas.push({ archivo: t.archivo, zona: t.pasada, que: 'revisión', detalle: 'no encontró qué medir' });
      for (const p of r.problemas) problemas.push({ archivo: t.archivo, ...p });
    }
  };
  await Promise.all(Array.from({ length: Math.min(paralelo, tareas.length) }, trabajador));
  for (const t of tareas) fs.rmSync(ruta(t.copia), { force: true });
  return problemas.sort((a, b) => a.archivo.localeCompare(b.archivo) || (a.n ?? 0) - (b.n ?? 0));
}

/** Texto para la consola, agrupado por archivo. */
export function informeRevision(problemas, cliente) {
  const porArchivo = new Map();
  for (const p of problemas) {
    if (!porArchivo.has(p.archivo)) porArchivo.set(p.archivo, []);
    porArchivo.get(p.archivo).push(p);
  }
  const lineas = [];
  for (const [archivo, ps] of porArchivo) {
    lineas.push(`  ${cliente} · ${archivo}`);
    for (const p of ps) lineas.push(`    - ${p.zona}${p.n ? ` ${p.n}` : ''}${p.titulo ? ` («${p.titulo.slice(0, 60)}»)` : ''}: ${p.que}: ${p.detalle}`);
  }
  return lineas.join('\n');
}
