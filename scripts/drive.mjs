#!/usr/bin/env node
/**
 * Arma la carpeta que se sube a Google Drive de un solo arrastre, ordenada por curso, cliente y tipo:
 *
 *   npm run drive
 *
 * Salida: privado/drive/Subir a NATY 2.0/ (fuera de git: lleva las marcas de los clientes).
 * Toma los recursos con marca de privado/marcas/<cliente>/<PF>/ (npm run marca) y los de producción del
 * repo. Los videos, las infografías y los quiz de Canva ya están en Drive: se mueven allá a "2 Videos",
 * "3 Infografías" y "4 Quiz" de cada curso con el conector (DECISIONS, 2026-09-27).
 */
import fs from 'node:fs';
import path from 'node:path';
import { ruta, listar, escribir } from './lib/repo.mjs';

const RAIZ = 'privado/drive/Subir a NATY 2.0';
const CURSOS = [
  { pf: 'PF1821', carpeta: 'PF1821-agentes-low-code', nombre: 'PF1821 - Agentes y Automatización Low Code', clientes: [['unab', 'UNAB'], ['skillnest', 'Skillnest']] },
  { pf: 'PF1822', carpeta: 'PF1822-desarrollo-con-ia', nombre: 'PF1822 - Especialización en Desarrollo con IA', clientes: [['unab', 'UNAB'], ['skillnest', 'Skillnest'], ['u-autonoma', 'U. Autónoma']] },
];
const copiar = (desde, hasta) => { fs.mkdirSync(ruta(path.dirname(hasta)), { recursive: true }); fs.copyFileSync(ruta(desde), ruta(hasta)); };
const copiarArbol = (desde, hasta) => {
  if (!fs.existsSync(ruta(desde))) return 0;
  const lista = listar(ruta(desde));
  for (const a of lista) copiar(path.relative(ruta(''), a), `${hasta}/${path.relative(ruta(desde), a)}`);
  return lista.length;
};
const leeme = (dir, texto) => escribir(`${dir}/LEEME.txt`, texto.join('\r\n') + '\r\n');

fs.rmSync(ruta(RAIZ), { recursive: true, force: true });
let total = 0;
for (const c of CURSOS) {
  const base = `${RAIZ}/${c.nombre}`;
  for (const [slug, nombre] of c.clientes) {
    const origen = `privado/marcas/${slug}/${c.pf}`;
    if (!fs.existsSync(ruta(origen))) { console.error(`Falta ${origen}: corre npm run marca -- ${slug}`); process.exit(1); }
    const dir = `${base}/1 ${nombre}`;
    total += copiarArbol(`${origen}/cuadernillos`, `${dir}/1 Cuadernillos`);
    total += copiarArbol(`${origen}/documentos`, `${dir}/2 Documentos`);
  }
  // Material de producción, sin marca: bases para HeyGen, quiz (Canva y Moodle) y prompts de infografía.
  // Videos, infografías y quiz de Canva ya están en Drive: se mueven allá a 2 Videos, 3 Infografías y 4 Quiz.
  const p = `modulo-2/${c.carpeta}`;
  total += copiarArbol(`${p}/entrega/quiz`, `${base}/4 Quiz/Quiz Moodle (GIFT)`);
  const prod = `${base}/9 Producción (equipo)`;
  total += copiarArbol(`${p}/produccion/videos`, `${prod}/Videos HeyGen (PPT y guiones)`);
  total += copiarArbol(`${p}/produccion/infografias`, `${prod}/Infografías (prompts)`);
  total += copiarArbol(`${p}/produccion/quiz-canva`, `${prod}/Quiz (texto)`);
}
console.log(`${RAIZ}/ → ${total} archivos. Arrastra a NATY 2.0 en Drive las carpetas que hay dentro (una por curso).`);
