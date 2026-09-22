/**
 * El estado compartido entre sesiones: registro (LEDGER.csv) y huella de state/.
 *
 * La huella es lo que hace auditable el handoff. Al cerrar una sesión se guarda el
 * sha256 de los cuatro archivos de estado. Cualquier sesión posterior puede recalcularlo
 * y saber si alguien tocó el estado por fuera del protocolo, sin leer ningún chat.
 */
import crypto from 'node:crypto';
import { leer, leerSiExiste, escribir, existe } from './repo.mjs';
import { parseCSV, aCSV } from './csv.mjs';

export const ARCHIVOS_ESTADO = [
  'state/CHECKPOINT.md',
  'state/HANDOFF.md',
  'state/DECISIONS.md',
  'state/OPEN-QUESTIONS.md',
];

export const LEDGER = 'state/LEDGER.csv';

export const COLUMNAS_LEDGER = [
  'sesion_id', 'herramienta', 'modelo', 'rama',
  'commit_inicio', 'commit_cierre', 'abierta_utc', 'cerrada_utc', 'estado',
  'archivos_tocados', 'diff', 'checks', 'hash_estado',
  'auditada_por', 'veredicto', 'informe',
];

export const HERRAMIENTAS = ['claude-code', 'codex', 'cursor', 'cowork', 'chat', 'humano'];

/** Huella de los archivos de estado. Ignora fines de línea y espacios al final. */
export function hashEstado() {
  const h = crypto.createHash('sha256');
  for (const f of ARCHIVOS_ESTADO) {
    const txt = (leerSiExiste(f) ?? '').replace(/[ \t]+$/gm, '').trim();
    h.update(f + '\n' + txt + '\n');
  }
  return h.digest('hex').slice(0, 16);
}

export function leerLedger() {
  if (!existe(LEDGER)) return [];
  return parseCSV(leer(LEDGER));
}

export function escribirLedger(filas) {
  return escribir(LEDGER, aCSV(filas, COLUMNAS_LEDGER));
}

export const sesionesAbiertas = (filas = leerLedger()) => filas.filter((f) => f.estado === 'abierta');
export const cerradas = (filas = leerLedger()) => filas.filter((f) => f.estado === 'cerrada');
export const ultimaCerrada = (filas = leerLedger()) => cerradas(filas).at(-1) || null;

/** Siguiente id correlativo: AAAA-MM-DD-<herramienta>-NN */
export function siguienteId(fecha, herramienta, filas = leerLedger()) {
  const prefijo = `${fecha}-${herramienta}-`;
  const usados = filas
    .filter((f) => f.sesion_id.startsWith(prefijo))
    .map((f) => Number(f.sesion_id.slice(prefijo.length)) || 0);
  const n = (usados.length ? Math.max(...usados) : 0) + 1;
  return prefijo + String(n).padStart(2, '0');
}

export const rutaLog = (sesionId) => `state/sessions/${sesionId}.md`;
