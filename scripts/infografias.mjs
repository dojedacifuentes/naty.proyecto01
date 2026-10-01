/**
 * Infografías del módulo 2, una por aprendizaje esperado (AE), para los cursos sin kit.
 *
 *   npm run infografias -- PF1481 PF1483 PF1474     (sin argumentos: todos los que tengan R-infografias.json)
 *   npm run infografias -- PF1481 --solo-validar    (revisa el texto contra el plan, sin abrir el navegador)
 *   npm run infografias -- PF1481 --sin-png         (escribe HTML, README y textos alternativos, sin volver a sacar los PNG)
 *
 * Fuente: contenidos/<PF>/modulo-2/R-infografias.json (título, bajada y secciones con ícono, encabezado, contenido y texto).
 * El texto del AE y de sus criterios de evaluación lo pone este script desde data/planes/<PF>.json, así va exacto.
 * Cada «contenido» de una sección tiene que estar en los contenidos del AE en el plan 2026, y todos los contenidos del AE
 * tienen que quedar cubiertos por alguna sección: si no, el script se detiene.
 *
 * Estilo: el de las infografías de PF1821 y PF1822 (produccion/infografias/especificaciones-visuales.txt), 1080 px de ancho,
 * sin decir «plan formativo», «oficial» ni «textual» (regla del usuario del 30-09). Íconos de Lucide (ISC) en
 * scripts/lib/iconos-lucide/.
 *
 * Salida en modulo-2/<carpeta>/: produccion/infografias/M2-Infografia-AEn.html y entrega/infografias/M2-Infografia-AEn.png,
 * más entrega/infografias/textos-alternativos.md (versión en texto para lectores de pantalla). El PNG se saca con Edge o
 * Chrome en modo headless, por el protocolo de DevTools (sin dependencias): alto exacto del contenido, a 1x.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { ruta, leer, escribir, existe } from './lib/repo.mjs';
import { navegador } from './lib/pdf.mjs';

const args = process.argv.slice(2);
const soloValidar = args.includes('--solo-validar');
const sinPng = args.includes('--sin-png');
const pedidos = args.filter((a) => /^PF\d{4}$/.test(a));
const cursos = pedidos.length ? pedidos : fs.readdirSync(ruta('contenidos')).filter((c) => existe(`contenidos/${c}/modulo-2/R-infografias.json`));

// ——— Texto ———
const sinTildes = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const norm = (s) => sinTildes(String(s)).toUpperCase().replace(/[¿?¡!]/g, '').replace(/\s+/g, ' ').replace(/[.\s]+$/, '').trim();
// Erratas del plan que se muestran corregidas (decisión del usuario del 30-09: en los materiales da igual corregida o tal cual).
const ERRATAS = [[/ENTONRNO/g, 'ENTORNO'], [/VISUAL ESTUDIO CODE/g, 'VISUAL STUDIO CODE'], [/GOOGLE COLLAB/g, 'GOOGLE COLAB'],
  [/DEL ANALISIS DE DATOS/g, 'DEL ANÁLISIS DE DATOS'], [/HISTOGRAMA, LINEA,/g, 'HISTOGRAMA, LÍNEA,'], [/\.\./g, '.'],
  // PF1487, PF1485 y PF1493 (2026-10-01): palabras cortadas por un punto, espacios y paréntesis que faltan, y COLLAB solo.
  [/UN DI\. CIONARIO/g, 'UN DICCIONARIO'], [/QUÉ ES PO\. IMORFISMO/g, 'QUÉ ES POLIMORFISMO'], [/Y CA\. TURA/g, 'Y CAPTURA'],
  [/PYTHON\.CONCEPTO/g, 'PYTHON. CONCEPTO'], [/(?<!GOOGLE )\bCOLLAB\b/g, 'GOOGLE COLAB'], [/DESIPLIEGUE/g, 'DESPLIEGUE'], [/(?<!D)IFERENCIAS/g, 'DIFERENCIAS'],
  [/EN LA NUBE\. PÚBLICA, PRIVADA, HÍBRIDA\)/g, 'EN LA NUBE (PÚBLICA, PRIVADA, HÍBRIDA)'], [/PROTECCIÓN DE DATOS: INTRODUCCIÓN/g, 'PROTECCIÓN DE DATOS): INTRODUCCIÓN'],
  [/PORTABILITY ACCOUNTABILITY/g, 'PORTABILITY AND ACCOUNTABILITY'], [/CIA\(/g, 'CIA (']];
const corregir = (s) => ERRATAS.reduce((t, [a, b]) => t.replace(a, b), s);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// `código` → <code>: se escapa primero y luego se marcan los tramos entre acentos graves.
const conCodigo = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
const sinCodigo = (s) => String(s).replace(/`([^`]+)`/g, '$1');

function piezasDelPlan(tema) {
  // «2. TÍTULO: A. B. C?» → [A, B, C]: cada oración es un contenido; se quita lo que va antes del último «:». Va tema por tema
  // (ver validar()): si se juntaran, un título suelto como «1. EL LENGUAJE PYTHON» se pegaría con la oración siguiente.
  return tema.replace(/^\s*\d+\.\s*/, '').split(/(?<=[.?])\s+/).map((p) => p.replace(/[.\s]+$/, '').trim()).filter(Boolean)
    .map((p) => (p.includes(':') ? p.slice(p.lastIndexOf(':') + 1).trim() : p)).filter((p) => norm(p));
}

function validar(pf, fuente, m2) {
  const errores = [];
  for (const ae of fuente.aes) {
    const plan = m2.aprendizajes_esperados.find((a) => a.n === ae.n);
    if (!plan) { errores.push(`AE${ae.n}: no existe en el módulo 2 del plan`); continue; }
    const tema = norm(plan.contenidos.map((c) => [c.tema, ...(c.items || [])].join(' ')).join(' '));
    const usados = [];
    for (const [i, s] of ae.secciones.entries()) {
      if (!existe(`scripts/lib/iconos-lucide/${s.icono}.svg`)) errores.push(`AE${ae.n} sección ${i + 1}: falta el ícono «${s.icono}»`);
      if (!s.contenido?.length) errores.push(`AE${ae.n} sección ${i + 1}: sin contenido`);
      for (const c of s.contenido || []) {
        if (!tema.includes(norm(c))) errores.push(`AE${ae.n} sección ${i + 1}: «${c}» no está en los contenidos del AE`);
        usados.push(norm(c));
      }
      if (/plan formativo|oficial|textual|literal/i.test(`${s.encabezado} ${s.texto}`)) errores.push(`AE${ae.n} sección ${i + 1}: nombra el plan, lo oficial o lo textual`);
    }
    for (const p of plan.contenidos.flatMap((c) => piezasDelPlan(c.tema))) {
      const np = norm(p);
      // Una pieza larga se puede repartir entre secciones: cada parte (separada por comas, «Y» o paréntesis) tiene que estar en alguna.
      const partes = np.split(/,\s*|\s+Y\s+|\s*[()]\s*/).filter((x) => norm(x));
      const cubierta = usados.some((u) => u.includes(np)) || partes.every((x) => usados.some((u) => u.includes(norm(x))));
      if (!cubierta) errores.push(`AE${ae.n}: el contenido «${p}» no quedó en ninguna sección`);
    }
  }
  if (errores.length) throw new Error(`${pf}:\n  ${errores.join('\n  ')}`);
}

// ——— HTML ———
const icono = (n) => leer(`scripts/lib/iconos-lucide/${n}.svg`).replace(/<!--[\s\S]*?-->/, '').replace(/\s*class="[^"]*"/, '')
  .replace(/width="24"/, 'width="80"').replace(/height="24"/, 'height="80"').replace(/stroke-width="2"/, 'stroke-width="1.15"').trim();

const CSS = `
:root { --fondo:#F8FAFC; --titulo:#0F3D5E; --petroleo:#0E7490; --texto:#1F2937; --gris:#475569; --naranjo:#F59E0B; --claro:#E6F3F7; --alterno:#F1F5F9; }
* { box-sizing: border-box; }
html, body { margin: 0; background: var(--fondo); }
body { width: 1080px; font-family: Inter, 'Segoe UI', Arial, sans-serif; color: var(--texto); -webkit-font-smoothing: antialiased; }
.pagina { padding: 96px 72px; }
.etiqueta { font-size: 22px; letter-spacing: .05em; text-transform: uppercase; color: var(--gris); line-height: 1.35; }
h1 { font-size: 60px; line-height: 1.12; color: var(--titulo); margin: 22px 0 14px; font-weight: 700; letter-spacing: -.01em; }
.bajada { font-size: 30px; color: #334155; margin: 0 0 40px; line-height: 1.3; }
.ae { background: var(--claro); border-left: 8px solid var(--petroleo); border-radius: 14px; padding: 30px 34px; margin-bottom: 44px; }
.rotulo { font-size: 20px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--petroleo); }
.ae p { font-size: 24px; line-height: 1.4; margin: 12px 0 0; color: var(--texto); }
.seccion { display: grid; grid-template-columns: 132px 1fr; gap: 26px; padding: 34px 36px 34px 30px; border-radius: 18px; margin-bottom: 22px; background: #fff; }
.seccion.alt { background: var(--alterno); }
.lado { display: flex; flex-direction: column; align-items: center; gap: 18px; }
.num { width: 54px; height: 54px; border-radius: 50%; background: var(--naranjo); color: var(--titulo); font-weight: 700; font-size: 26px; display: flex; align-items: center; justify-content: center; }
.lado svg { color: var(--petroleo); }
h2 { font-size: 32px; line-height: 1.2; color: var(--titulo); margin: 4px 0 14px; font-weight: 700; }
.contenido-rotulo { font-size: 20px; font-weight: 700; letter-spacing: .06em; color: var(--gris); margin: 0 0 4px; }
.contenido { font-size: 21px; line-height: 1.38; color: #334155; margin: 0 0 14px; text-transform: none; }
.texto { font-size: 24px; line-height: 1.4; margin: 0; }
code { font-family: 'JetBrains Mono', Consolas, monospace; font-size: .9em; background: #E2E8F0; color: #0F172A; border-radius: 6px; padding: 1px 7px; overflow-wrap: anywhere; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
.nw { white-space: nowrap; }
.criterios { background: var(--titulo); color: #fff; border-radius: 18px; padding: 36px 40px; margin: 34px 0 0; }
.criterios .rotulo { color: #FDE68A; }
.criterios h2 { color: #fff; margin: 8px 0 18px; }
.criterios ol { margin: 0; padding: 0; list-style: none; }
.criterios li { display: grid; grid-template-columns: 66px 1fr; font-size: 21px; line-height: 1.4; margin-bottom: 14px; }
.criterios li b { color: #FDE68A; }
.pie { font-size: 20px; color: var(--gris); border-top: 2px solid #CBD5E1; margin-top: 40px; padding-top: 20px; line-height: 1.4; }
`;

function html(pf, fuente, m2, ae) {
  const plan = m2.aprendizajes_esperados.find((a) => a.n === ae.n);
  const modulo = m2.nombre;
  const secciones = ae.secciones.map((s, i) => `
  <section class="seccion${i % 2 ? ' alt' : ''}">
    <div class="lado"><div class="num">${i + 1}</div>${icono(s.icono)}</div>
    <div>
      <h2>${conCodigo(s.encabezado)}</h2>
      <p class="contenido-rotulo">CONTENIDO</p>
      <p class="contenido">${esc(s.contenido.map(corregir).join(' · '))}</p>
      <p class="texto">${conCodigo(s.texto)}</p>
    </div>
  </section>`).join('');
  const criterios = plan.criterios_evaluacion.map((c) => `<li><b>${esc(c.n)}</b><span>${esc(corregir(c.texto))}</span></li>`).join('');
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<title>${esc(fuente.curso)} · Módulo 2 · Aprendizaje esperado ${ae.n}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono&display=block" rel="stylesheet">
<style>${CSS}</style></head>
<body><main class="pagina">
  <div class="etiqueta">Módulo 2 · ${esc(modulo)} · <span class="nw">Aprendizaje esperado ${ae.n}</span></div>
  <h1>${esc(ae.titulo)}</h1>
  <p class="bajada">${esc(ae.bajada)}</p>
  <div class="ae"><div class="rotulo">Aprendizaje esperado ${ae.n}</div><p>${esc(corregir(plan.texto))}</p></div>
  ${secciones}
  <div class="criterios"><div class="rotulo">Al terminar</div><h2>Lo que demostrarás</h2><ol>${criterios}</ol></div>
  <div class="pie">${esc(fuente.pie)}</div>
</main></body></html>
`;
}

function textoAlternativo(fuente, m2, ae) {
  const plan = m2.aprendizajes_esperados.find((a) => a.n === ae.n);
  return [`## Aprendizaje esperado ${ae.n} · ${ae.titulo}`, '', `Módulo 2 · ${m2.nombre}. ${ae.bajada}.`, '',
    `**Aprendizaje esperado ${ae.n}:** ${corregir(plan.texto)}`, '',
    ...ae.secciones.map((s, i) => `${i + 1}. **${sinCodigo(s.encabezado)}.** Contenido: ${s.contenido.map(corregir).join(' · ')}. ${sinCodigo(s.texto)}`), '',
    '**Lo que demostrarás:**', ...plan.criterios_evaluacion.map((c) => `- ${c.n} ${corregir(c.texto)}`), ''].join('\n');
}

// ——— Navegador por el protocolo de DevTools ———
async function abrirNavegador() {
  const nav = navegador();
  if (!nav) throw new Error('No encontré Edge ni Chrome. Define NAVEGADOR_PDF con la ruta al ejecutable.');
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'infografias-'));
  const proc = spawn(nav, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0', `--user-data-dir=${perfil}`, 'about:blank'], { stdio: 'ignore' });
  const archivo = path.join(perfil, 'DevToolsActivePort');
  for (let i = 0; i < 100 && !fs.existsSync(archivo); i++) await new Promise((r) => setTimeout(r, 200));
  if (!fs.existsSync(archivo)) { proc.kill(); throw new Error('El navegador no abrió el puerto de DevTools.'); }
  const [puerto, ws] = fs.readFileSync(archivo, 'utf8').trim().split('\n');
  const sock = new WebSocket(`ws://127.0.0.1:${puerto}${ws}`);
  await new Promise((res, rej) => { sock.onopen = res; sock.onerror = rej; });
  let id = 0;
  const pendientes = new Map(), eventos = [];
  sock.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pendientes.has(d.id)) { const { res, rej } = pendientes.get(d.id); pendientes.delete(d.id); d.error ? rej(new Error(d.error.message)) : res(d.result); }
    else if (d.method) eventos.push(d);
  };
  const enviar = (method, params = {}, sessionId) => new Promise((res, rej) => { const i = ++id; pendientes.set(i, { res, rej }); sock.send(JSON.stringify({ id: i, method, params, sessionId })); });
  const { targetId } = await enviar('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await enviar('Target.attachToTarget', { targetId, flatten: true });
  const s = (m, p) => enviar(m, p, sessionId);
  await s('Page.enable');
  const cerrar = async () => { try { await enviar('Browser.close'); } catch { /* ya cerrado */ } sock.close(); setTimeout(() => fs.rmSync(perfil, { recursive: true, force: true }), 1500); };
  return { s, eventos, cerrar };
}

async function capturar({ s, eventos }, htmlAbs, pngAbs) {
  eventos.length = 0;
  await s('Emulation.setDeviceMetricsOverride', { width: 1080, height: 1200, deviceScaleFactor: 1, mobile: false });
  await s('Page.navigate', { url: pathToFileURL(htmlAbs).href });
  for (let i = 0; i < 150 && !eventos.some((e) => e.method === 'Page.loadEventFired'); i++) await new Promise((r) => setTimeout(r, 100));
  const evalua = async (expression) => (await s('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;
  const medida = await evalua(`document.fonts.ready.then(() => ({ alto: Math.ceil(document.documentElement.scrollHeight), ancho: document.documentElement.scrollWidth,
    inter: document.fonts.check('700 60px Inter') && document.fonts.check('400 24px Inter') }))`);
  if (medida.ancho > 1080) throw new Error(`${path.basename(htmlAbs)}: el contenido mide ${medida.ancho} px de ancho (máximo 1080)`);
  if (!medida.inter) throw new Error(`${path.basename(htmlAbs)}: no cargó la fuente Inter (¿sin conexión?)`);
  await s('Emulation.setDeviceMetricsOverride', { width: 1080, height: medida.alto, deviceScaleFactor: 1, mobile: false });
  await new Promise((r) => setTimeout(r, 300));
  const { data } = await s('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1080, height: medida.alto, scale: 1 }, captureBeyondViewport: true });
  fs.mkdirSync(path.dirname(pngAbs), { recursive: true });
  fs.writeFileSync(pngAbs, Buffer.from(data, 'base64'));
  return medida.alto;
}

// ——— Principal ———
const trabajos = [];
for (const pf of cursos) {
  const fuente = JSON.parse(leer(`contenidos/${pf}/modulo-2/R-infografias.json`));
  const m2 = JSON.parse(leer(`data/planes/${pf}.json`)).modulos.find((m) => m.n === 2);
  validar(pf, fuente, m2);
  console.log(`${pf}: ${fuente.aes.length} infografías, texto validado contra el plan 2026.`);
  if (soloValidar) continue;
  const base = `modulo-2/${fuente.carpeta}`;
  const alternativos = [`# ${fuente.curso} · Módulo 2 · Infografías en texto`, '',
    'Versión en texto de cada infografía, para lectores de pantalla y para el texto alternativo del LMS. Generado por `npm run infografias`.', ''];
  for (const ae of fuente.aes) {
    const h = escribir(`${base}/produccion/infografias/M2-Infografia-AE${ae.n}.html`, html(pf, fuente, m2, ae));
    trabajos.push({ pf, ae: ae.n, html: ruta(h), png: ruta(`${base}/entrega/infografias/M2-Infografia-AE${ae.n}.png`) });
    alternativos.push(textoAlternativo(fuente, m2, ae));
  }
  escribir(`${base}/entrega/infografias/textos-alternativos.md`, alternativos.join('\n'));
  escribir(`${base}/entrega/infografias/README.md`, [`# ${fuente.curso} · Módulo 2 · Infografías`, '',
    `Generadas por \`npm run infografias -- ${pf}\` desde [\`contenidos/${pf}/modulo-2/R-infografias.json\`](../../../../contenidos/${pf}/modulo-2/R-infografias.json). No se editan a mano: se cambia ese archivo y se vuelven a generar.`, '',
    'Una por aprendizaje esperado, con sus contenidos y criterios de evaluación 2026 exactos: el script los toma del plan y se detiene si un contenido no está en el plan o si alguno del plan queda fuera. PNG de 1080 px de ancho, con el estilo de las infografías de PF1821 y PF1822 y sin decir «plan formativo» ni «textual».', '',
    '| AE | Título | Secciones | Archivo |', '| --- | --- | --- | --- |',
    ...fuente.aes.map((ae) => `| AE${ae.n} | ${ae.titulo} | ${ae.secciones.length} | [M2-Infografia-AE${ae.n}.png](M2-Infografia-AE${ae.n}.png) |`), '',
    'Versión en texto, para lectores de pantalla y el texto alternativo del LMS: [textos-alternativos.md](textos-alternativos.md).', ''].join('\n'));
}
if (trabajos.length && !sinPng) {
  const b = await abrirNavegador();
  try {
    for (const t of trabajos) {
      const alto = await capturar(b, t.html, t.png);
      const kb = Math.round(fs.statSync(t.png).size / 1024);
      console.log(`  ${t.pf} AE${t.ae}: 1080 × ${alto} px, ${kb} KB${kb > 2048 ? '  ← pasa de 2 MB' : ''}`);
    }
  } finally { await b.cerrar(); }
}
