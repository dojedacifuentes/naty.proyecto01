#!/usr/bin/env node
/**
 * Arma la carpeta que se sube a Google Drive de un solo arrastre, ordenada por curso, cliente y tipo:
 *
 *   npm run drive
 *
 * Salida: privado/drive/Modulo 2 - Recursos TD 2026/ (fuera de git: lleva las marcas de los clientes).
 * Toma los recursos con marca de privado/marcas/<cliente>/<PF>/ (npm run marca) y los de producción del
 * repo. Las carpetas que se llenan a mano (videos, infografías, Rise) llevan un LEEME con qué subir.
 */
import fs from 'node:fs';
import path from 'node:path';
import { ruta, listar, escribir } from './lib/repo.mjs';

const RAIZ = 'privado/drive/Modulo 2 - Recursos TD 2026';
const CURSOS = [
  { pf: 'PF1821', carpeta: 'PF1821-agentes-low-code', nombre: 'PF1821 - Agentes y Automatizacion Low Code', clientes: [['unab', 'UNAB'], ['skillnest', 'Skillnest']] },
  { pf: 'PF1822', carpeta: 'PF1822-desarrollo-con-ia', nombre: 'PF1822 - Especializacion en Desarrollo con IA', clientes: [['unab', 'UNAB'], ['skillnest', 'Skillnest'], ['u-autonoma', 'U. Autonoma']] },
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
    const dir = `${base}/${nombre}`;
    total += copiarArbol(`${origen}/cuadernillos`, `${dir}/1 Cuadernillos`);
    total += copiarArbol(`${origen}/documentos`, `${dir}/2 Documentos`);
    leeme(`${dir}/3 Videos`, [`Videos de ${nombre} para ${c.pf}: sube aquí los MP4 exportados de HeyGen.`,
      'Bienvenida al curso, resumen del módulo, videocápsulas AE1 a AE4 y video interactivo (H5P).']);
    leeme(`${dir}/4 Infografias`, [`Infografías de ${c.pf}: sube aquí los PNG (ruta del módulo y AE1 a AE4).`]);
    leeme(`${dir}/5 Rise`, [`Curso de Rise de ${nombre} para ${c.pf}: exporta aquí el SCORM 1.2 y deja el enlace de revisión en la planilla.`,
      'Pasos: modulo-2/GUIA-RISE.md del repositorio.']);
  }
  // Material de producción, sin marca: bases para HeyGen, quiz (Canva y Moodle) y prompts de infografía.
  const prod = `${base}/0 Produccion (sin marca)`;
  const p = `modulo-2/${c.carpeta}`;
  total += copiarArbol(`${p}/produccion/videos`, `${prod}/Videos HeyGen (PPT y guiones)`);
  total += copiarArbol(`${p}/produccion/infografias`, `${prod}/Infografias (prompts)`);
  total += copiarArbol(`entregables/quiz-modulo-2-canva/${c.pf}`, `${prod}/Quiz Canva (PDF)`);
  total += copiarArbol(`${p}/entrega/quiz`, `${prod}/Quiz Moodle (GIFT)`);
  total += copiarArbol(`${p}/produccion/quiz-canva`, `${prod}/Quiz (texto)`);
}
console.log(`${RAIZ}/ → ${total} archivos. Arrastra esa carpeta completa a Google Drive.`);
