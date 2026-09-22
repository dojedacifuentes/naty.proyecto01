#!/usr/bin/env node
/**
 * Calcula, por plan formativo, los umbrales cuantitativos de la rúbrica 7.4.
 *
 *   node scripts/calcular-umbrales.mjs           imprime la tabla
 *   node scripts/calcular-umbrales.mjs --csv     escribe data/umbrales-por-plan.csv
 *
 * El único umbral que depende de las horas del plan es el de actividades de extensión
 * (ítem D3): 1 actividad por cada 50 / 80 / 100 horas para nota 7 / 5 / 3
 * (bases 2026, punto 7.4, Anexo N°7 num. 10). Los demás son constantes y se incluyen
 * para que cada plan tenga su checklist completo en un solo lugar.
 */
import { leer, escribir, negrita, gris } from './lib/repo.mjs';
import { parseCSV, aCSV } from './lib/csv.mjs';

const PLANES = 'data/planes-formativos.csv';
const SALIDA = 'data/umbrales-por-plan.csv';

// Umbrales constantes de la rúbrica (bases 2026, punto 7.4)
const CONSTANTES = {
  indicadores_por_ae: 3,       // B1
  instrumentos_distintos: 3,   // B2
  elementos_portafolio: 6,     // B3, num. 4.3
  actividades_practicas: 2,    // C2
  herramientas_didacticas: 2,  // C4
  habilidades_siglo_xxi: 3,    // C5
  herramientas_industria: 5,   // D1
  estrategias_vinculacion: 4,  // D2
};

/** Actividades de extensión exigidas: 1 por cada `cada` horas, redondeando hacia arriba. */
export const extension = (horas, cada) => Math.ceil(horas / cada);

export function filas() {
  return parseCSV(leer(PLANES)).map((p) => {
    const horas = Number(p.horas);
    return {
      codigo_plan: p.codigo_plan,
      nombre: p.nombre,
      linea: p.linea,
      horas,
      extension_nota7: extension(horas, 50),
      extension_nota5: extension(horas, 80),
      extension_nota3: extension(horas, 100),
      ...CONSTANTES,
    };
  });
}

function main() {
  const datos = filas();

  if (process.argv.includes('--csv')) {
    const ruta = escribir(SALIDA, aCSV(datos));
    console.log(`escrito: ${ruta}  (${datos.length} planes)`);
    return;
  }

  console.log(negrita('PLAN      HORAS  EXT-7  EXT-5  EXT-3  NOMBRE'));
  for (const d of [...datos].sort((a, b) => b.horas - a.horas)) {
    console.log(
      `${d.codigo_plan.padEnd(8)} ${String(d.horas).padStart(6)} ${String(d.extension_nota7).padStart(6)} ` +
      `${String(d.extension_nota5).padStart(6)} ${String(d.extension_nota3).padStart(6)}  ${d.nombre.slice(0, 50)}`
    );
  }
  const total = datos.reduce((s, d) => s + d.extension_nota7, 0);
  console.log(`\nActividades de extensión distintas a diseñar por cliente para nota 7: ${negrita(total)}`);
  console.log(gris(`(${datos.length} planes · escribe el CSV con --csv)`));
}

if (process.argv[1] && process.argv[1].endsWith('calcular-umbrales.mjs')) main();
