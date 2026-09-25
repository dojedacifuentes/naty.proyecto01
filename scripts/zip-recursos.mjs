#!/usr/bin/env node
/**
 * Empaqueta los recursos educativos del módulo evaluado de un curso en un zip: un archivo
 * Markdown por recurso, en el orden de la tabla del kit (R01 a R13).
 *
 *   npm run zip -- PF1821 PF1822 --salida entregables/2026-09-24-modulo2
 *
 * En el repo varios recursos comparten archivo (R01 y R02 viven en
 * R-bienvenida-e-infografia.md, por ejemplo). Aquí se separan por su título de sección, y
 * cada pieza lleva la introducción común de su archivo de origen para que se entienda sola.
 * La fuente sigue siendo contenidos/<PF>/modulo-2/: el zip se regenera, no se edita.
 */
import fs from 'node:fs';
import { leer, ruta, rel, git } from './lib/repo.mjs';
import { crearZip } from './lib/zip.mjs';

// Con `desde`, el recurso es la sección que empieza en ese título y termina donde empieza
// la pieza siguiente del mismo archivo (o al final). Sin `desde`, es el archivo entero.
const RECURSOS = [
  { id: 'R01', archivo: 'R01-video-bienvenida.md', nombre: 'Video de bienvenida', criterio: 'C3', fuente: 'R-bienvenida-e-infografia.md', desde: /^## R01\b/ },
  { id: 'R02', archivo: 'R02-infografia-ruta.md', nombre: 'Infografía "Ruta del módulo"', criterio: 'C3', fuente: 'R-bienvenida-e-infografia.md', desde: /^## R02\b/ },
  { id: 'R03', archivo: 'R03-capsulas.md', nombre: 'Cápsulas de contenido', criterio: 'C4 d)', fuente: 'R-capsulas.md', desde: /^## Cápsula 1\b/ },
  { id: 'R04', archivo: 'R04-cuadro-comparativo.md', nombre: 'Cuadro comparativo', criterio: 'C4 d)', fuente: 'R-capsulas.md', desde: /^## R04\b/ },
  { id: 'R05', archivo: 'R05-herramienta-didactica-1.md', nombre: 'Herramienta didáctica 1', criterio: 'C4', fuente: 'C4-herramientas-didacticas.md', desde: /^## Herramienta 1\b/ },
  { id: 'R06', archivo: 'R06-herramienta-didactica-2.md', nombre: 'Herramienta didáctica 2', criterio: 'C4', fuente: 'C4-herramientas-didacticas.md', desde: /^## Herramienta 2\b/ },
  { id: 'R07', archivo: 'R07-actividad-practica-1.md', nombre: 'Actividad práctica 1', criterio: 'C2', fuente: 'C2-actividades.md', desde: /^## Actividad 1\b/ },
  { id: 'R08', archivo: 'R08-actividad-practica-2.md', nombre: 'Actividad práctica 2', criterio: 'C2', fuente: 'C2-actividades.md', desde: /^## Actividad 2\b/ },
  { id: 'R09', archivo: 'R09-indicadores.md', nombre: 'Indicadores de logro', criterio: 'B1', fuente: 'B1-indicadores.md' },
  { id: 'R10', archivo: 'R10-instrumentos-evaluacion.md', nombre: 'Instrumentos de evaluación', criterio: 'B2', fuente: 'B2-instrumentos.md' },
  { id: 'R11', archivo: 'R11-portafolio.md', nombre: 'Portafolio', criterio: 'B3', fuente: 'B3-portafolio.md' },
  { id: 'R12', archivo: 'R12-retroalimentacion.md', nombre: 'Retroalimentación y aprendizaje colaborativo', criterio: 'B4', fuente: 'B4-retroalimentacion.md' },
  { id: 'R13', archivo: 'R13-metodologia.md', nombre: 'Metodología, motivación y habilidades del siglo XXI', criterio: 'C1 · C3 · C5', fuente: 'C-metodologia.md' },
];
const INDICE = { archivo: '00-indice.md', fuente: '02-recursos.md' };
const FICHA = { archivo: '01-ficha-sipfor.md', fuente: '00-ficha-sipfor.md' };

// Menciones a archivos del repo que, dentro del zip, apuntan a otro nombre.
const REFERENCIAS = new Map([
  [FICHA.fuente, `\`${FICHA.archivo}\``],
  ['01-entregables.md', 'la lista de entregables del repositorio'],
]);
for (const fuente of new Set(RECURSOS.map((r) => r.fuente))) {
  const nuevos = RECURSOS.filter((r) => r.fuente === fuente).map((r) => `\`${r.archivo}\``);
  REFERENCIAS.set(fuente, nuevos.join(' y '));
}

const args = process.argv.slice(2);
const codigos = args.filter((a) => /^PF\d{4}$/i.test(a)).map((a) => a.toUpperCase());
const iSal = args.indexOf('--salida');
const salida = (iSal >= 0 ? args[iSal + 1] : 'entregables').replace(/\/+$/, '');
if (!codigos.length) {
  console.error('Uso: npm run zip -- PF1821 [PF1822 ...] [--salida <dir>]');
  process.exit(1);
}

// Los marcadores <!-- verificable: --> sirven a los controles del repo, no a quien lee.
const limpiar = (md) =>
  md
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/`([\w.-]+\.md)`/g, (m, f) => REFERENCIAS.get(f) ?? m)
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';

// Quita líneas en blanco y separadores "---" sobrantes en los bordes de una pieza.
function recortar(lineas) {
  const L = [...lineas];
  while (L.length && /^\s*(---)?\s*$/.test(L[0])) L.shift();
  while (L.length && /^\s*(---)?\s*$/.test(L[L.length - 1])) L.pop();
  return L;
}

const titulo = (pf, r) => `# ${pf} · Módulo 2 · ${r.id} — ${r.nombre} (${r.criterio})`;

function recursosDe(pf, dir) {
  const piezas = [];
  for (const fuente of new Set(RECURSOS.map((r) => r.fuente))) {
    const L = leer(`${dir}/${fuente}`).split('\n');
    if (!L[0].startsWith('# ')) throw new Error(`${dir}/${fuente} no empieza con un título "# "`);
    const suyos = RECURSOS.filter((r) => r.fuente === fuente);

    if (!suyos[0].desde) {
      const r = suyos[0];
      piezas.push({ r, md: [titulo(pf, r), ...L.slice(1)].join('\n') });
      continue;
    }
    const inicios = suyos.map((r) => {
      const i = L.findIndex((l) => r.desde.test(l));
      if (i < 0) throw new Error(`${dir}/${fuente}: no encuentro la sección de ${r.id} (${r.desde})`);
      return i;
    });
    if (inicios.some((i, k) => k && i <= inicios[k - 1])) {
      throw new Error(`${dir}/${fuente}: las secciones no están en el orden R01…R13`);
    }
    const intro = recortar(L.slice(1, inicios[0]));
    suyos.forEach((r, k) => {
      const cuerpo = recortar(L.slice(inicios[k], inicios[k + 1] ?? L.length));
      piezas.push({ r, md: [titulo(pf, r), '', ...intro, '', '---', '', ...cuerpo].join('\n') });
    });
  }
  return piezas.sort((a, b) => a.r.id.localeCompare(b.r.id));
}

// El índice del kit, con la columna "Archivo" apuntando a los nombres del zip y una nota de
// procedencia para quien lo reciba sin acceso al repo.
function indice(pf, dir, fecha) {
  const cambios = git(['status', '--porcelain', '--', dir], { opcional: true });
  const commit = (git(['rev-parse', '--short', 'HEAD'], { opcional: true }) || '(sin commit)') +
    (cambios ? ' con cambios sin commit' : '');
  const nota = [
    `> **Sobre este zip.** Generado el ${fecha} desde el commit \`${commit}\` con`,
    `> \`npm run zip\`. Trae un archivo por recurso, en el orden de la tabla "Los recursos", y`,
    `> la ficha SIPFOR del módulo en \`${FICHA.archivo}\`. Todo es borrador: nada lo ha`,
    `> revisado una persona. Las correcciones se hacen en el repositorio`,
    `> (\`${dir}/\`) y después se vuelve a generar el zip; lo que se edite`,
    `> aquí no vuelve solo.`,
  ];
  const L = leer(`${dir}/${INDICE.fuente}`).split('\n').map((l) => {
    const m = /^\| (R\d\d) \|/.exec(l);
    const r = m && RECURSOS.find((x) => x.id === m[1]);
    return r ? l.replace(/\|\s*`[^`]+`\s*\|\s*$/, `| \`${r.archivo}\` |`) : l;
  });
  L[0] = `# ${pf} · Módulo 2 · Recursos educativos: índice`;
  const iEstado = L.findIndex((l) => l.startsWith('**Estado:**'));
  L.splice(iEstado + 1, 0, '', ...nota);
  return L.join('\n');
}

const fecha = new Date();
const dia = fecha.toLocaleDateString('sv-SE'); // AAAA-MM-DD en hora local
for (const pf of codigos) {
  const dir = `contenidos/${pf}/modulo-2`;
  const carpeta = `${pf}-modulo2-recursos`;
  const entradas = [
    { nombre: `${carpeta}/${INDICE.archivo}`, contenido: limpiar(indice(pf, dir, dia)) },
    { nombre: `${carpeta}/${FICHA.archivo}`, contenido: limpiar(leer(`${dir}/${FICHA.fuente}`)) },
    ...recursosDe(pf, dir).map(({ r, md }) => ({ nombre: `${carpeta}/${r.archivo}`, contenido: limpiar(md) })),
  ];
  const destino = ruta(salida, `recursos-modulo2-${pf}.zip`);
  fs.mkdirSync(ruta(salida), { recursive: true });
  fs.writeFileSync(destino, crearZip(entradas, { fecha }));
  console.log(`${rel(destino)}  ·  ${entradas.length} archivos`);
  for (const e of entradas) console.log(`  ${e.nombre.slice(carpeta.length + 1).padEnd(34)} ${e.contenido.split('\n').length} líneas`);
}
