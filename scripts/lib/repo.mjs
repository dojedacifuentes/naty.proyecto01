/**
 * Utilidades compartidas por todas las herramientas del repo.
 * Node >= 18, sin dependencias externas (AGENTS.md §8).
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

// Directorios que nunca se recorren y salidas generadas por las propias herramientas:
// escanearlas haría que un control se encuentre a sí mismo en su informe anterior.
const IGNORAR = new Set([
  '.git', 'node_modules', '.venv', 'venv', '__pycache__', '.scratch', 'build',
  'verificacion.json', 'diferenciacion.csv',
]);

// ---------------------------------------------------------------- archivos

export const ruta = (...p) => path.join(RAIZ, ...p);
export const rel = (abs) => path.relative(RAIZ, abs).split(path.sep).join('/');
export const existe = (p) => fs.existsSync(path.isAbsolute(p) ? p : ruta(p));

export function leer(p) {
  return fs.readFileSync(path.isAbsolute(p) ? p : ruta(p), 'utf8').replace(/\r\n/g, '\n');
}

export function leerSiExiste(p) {
  return existe(p) ? leer(p) : null;
}

export function escribir(p, contenido) {
  const abs = path.isAbsolute(p) ? p : ruta(p);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, contenido.replace(/\r\n/g, '\n'), 'utf8');
  return rel(abs);
}

/** Recorre el repo devolviendo rutas absolutas de archivos. */
export function listar(dir = RAIZ, { ext = null } = {}) {
  const salida = [];
  const anda = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (IGNORAR.has(e.name)) continue;
      const abs = path.join(d, e.name);
      if (e.isDirectory()) anda(abs);
      else if (!ext || ext.some((x) => e.name.endsWith(x))) salida.push(abs);
    }
  };
  anda(path.isAbsolute(dir) ? dir : ruta(dir));
  return salida.sort();
}

/** Devuelve las propuestas presentes: propuestas/<cliente>/<plan>/ */
export function propuestas() {
  const base = ruta('propuestas');
  if (!fs.existsSync(base)) return [];
  const out = [];
  for (const c of fs.readdirSync(base, { withFileTypes: true })) {
    if (!c.isDirectory()) continue;
    for (const p of fs.readdirSync(path.join(base, c.name), { withFileTypes: true })) {
      if (!p.isDirectory()) continue;
      out.push({
        cliente: c.name,
        plan: p.name,
        id: `${c.name}/${p.name}`,
        dir: path.join(base, c.name, p.name),
      });
    }
  }
  return out.sort((a, b) => a.id.localeCompare(b.id));
}

// --------------------------------------------------------------------- git

export function git(args, { opcional = false } = {}) {
  try {
    return execFileSync('git', args, { cwd: RAIZ, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (e) {
    if (opcional) return null;
    throw new Error(`git ${args.join(' ')} falló: ${e.stderr || e.message}`);
  }
}

export const hayGit = () => git(['rev-parse', '--is-inside-work-tree'], { opcional: true }) === 'true';
export const commitActual = () => git(['rev-parse', 'HEAD'], { opcional: true }) || '(sin commits)';
export const ramaActual = () => git(['rev-parse', '--abbrev-ref', 'HEAD'], { opcional: true }) || '(sin rama)';
export const arbolLimpio = () => (git(['status', '--porcelain'], { opcional: true }) || '') === '';

/** Archivos cambiados entre dos referencias (o desde una ref hasta el árbol de trabajo). */
export function cambiosDesde(ref) {
  const versionados = git(['diff', '--name-only', ref], { opcional: true }) || '';
  const nuevos = git(['ls-files', '--others', '--exclude-standard'], { opcional: true }) || '';
  return [...new Set([...versionados.split('\n'), ...nuevos.split('\n')].filter(Boolean))].sort();
}

// ------------------------------------------------------------------ salida

const color = process.env.NO_COLOR ? false : process.stdout.isTTY !== false;
const c = (cod) => (s) => (color ? `\u001b[${cod}m${s}\u001b[0m` : s);
export const rojo = c('31');
export const verde = c('32');
export const amarillo = c('33');
export const azul = c('36');
export const gris = c('90');
export const negrita = c('1');

export const hoy = () => new Date().toISOString().slice(0, 10);
export const ahora = () => new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

/** Resultado acumulado de un control. */
export class Resultado {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
    this.errores = [];
    this.avisos = [];
    this.notas = [];
  }
  error(mensaje, donde) { this.errores.push({ mensaje, donde }); }
  aviso(mensaje, donde) { this.avisos.push({ mensaje, donde }); }
  nota(mensaje) { this.notas.push(mensaje); }
  get ok() { return this.errores.length === 0; }
}
