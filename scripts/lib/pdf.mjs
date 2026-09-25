/**
 * Imprime un HTML del repo a PDF con Edge o Chrome en modo headless.
 * Sin dependencias de Node: usa el navegador que ya está instalado.
 * NAVEGADOR_PDF permite indicar la ruta al ejecutable si no está en los lugares habituales.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { ruta } from './repo.mjs';

const CANDIDATOS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', // verificacion:ignorar-rutas-absolutas
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe', // verificacion:ignorar-rutas-absolutas
  'C:/Program Files/Google/Chrome/Application/chrome.exe', // verificacion:ignorar-rutas-absolutas
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

export function navegador() {
  return [process.env.NAVEGADOR_PDF, ...CANDIDATOS].filter(Boolean).find((c) => fs.existsSync(c)) || null;
}

/** Imprime `htmlRel` (ruta relativa al repo) en `pdfRel`. Devuelve el tamaño en KB. */
export function imprimirPdf(htmlRel, pdfRel) {
  const nav = navegador();
  if (!nav) throw new Error('No encontré Edge ni Chrome. Define NAVEGADOR_PDF con la ruta al ejecutable.');
  const pdfAbs = ruta(pdfRel);
  execFileSync(nav, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--run-all-compositor-stages-before-draw',
    '--generate-pdf-document-outline',
    `--print-to-pdf=${pdfAbs}`, pathToFileURL(ruta(htmlRel)).href], { stdio: 'ignore', timeout: 120000 });
  return Math.round(fs.statSync(pdfAbs).size / 1024);
}
