/**
 * Escribe un archivo .zip con compresión deflate. Sin dependencias (AGENTS.md §8): usa zlib
 * de Node y el formato ZIP básico (sin ZIP64, así que cada archivo debe pesar menos de 4 GB,
 * de sobra para Markdown).
 *
 *   crearZip([{ nombre: 'carpeta/a.md', contenido: 'texto' }], { fecha: new Date() })
 *     → Buffer listo para escribir a disco
 */
import zlib from 'node:zlib';

// zlib.crc32 existe desde Node 20.15 / 22.2; el repo pide Node >= 18.
const TABLA = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  if (typeof zlib.crc32 === 'function') return zlib.crc32(buf) >>> 0;
  let c = 0xffffffff;
  for (const b of buf) c = TABLA[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// Fecha y hora en formato MS-DOS, que es lo que guarda ZIP (resolución de 2 segundos).
function fechaDos(d) {
  const hora = (d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2);
  const dia = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  return { hora, dia };
}

export function crearZip(entradas, { fecha = new Date() } = {}) {
  const { hora, dia } = fechaDos(fecha);
  const UTF8 = 0x0800; // bit 11: nombres de archivo en UTF-8
  const locales = [];
  const central = [];
  let offset = 0;

  for (const { nombre, contenido } of entradas) {
    const datos = Buffer.isBuffer(contenido) ? contenido : Buffer.from(contenido, 'utf8');
    const comprimido = zlib.deflateRawSync(datos, { level: 9 });
    const nom = Buffer.from(nombre, 'utf8');
    const crc = crc32(datos);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(UTF8, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(hora, 10);
    local.writeUInt16LE(dia, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(comprimido.length, 18);
    local.writeUInt32LE(datos.length, 22);
    local.writeUInt16LE(nom.length, 26);
    local.writeUInt16LE(0, 28);
    locales.push(local, nom, comprimido);

    const cab = Buffer.alloc(46);
    cab.writeUInt32LE(0x02014b50, 0);
    cab.writeUInt16LE(20, 4);
    cab.writeUInt16LE(20, 6);
    cab.writeUInt16LE(UTF8, 8);
    cab.writeUInt16LE(8, 10);
    cab.writeUInt16LE(hora, 12);
    cab.writeUInt16LE(dia, 14);
    cab.writeUInt32LE(crc, 16);
    cab.writeUInt32LE(comprimido.length, 20);
    cab.writeUInt32LE(datos.length, 24);
    cab.writeUInt16LE(nom.length, 28);
    cab.writeUInt32LE(offset, 42);
    central.push(cab, nom);

    offset += local.length + nom.length + comprimido.length;
  }

  const tamCentral = central.reduce((s, b) => s + b.length, 0);
  const fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0);
  fin.writeUInt16LE(entradas.length, 8);
  fin.writeUInt16LE(entradas.length, 10);
  fin.writeUInt32LE(tamCentral, 12);
  fin.writeUInt32LE(offset, 16);
  return Buffer.concat([...locales, ...central, fin]);
}
