/**
 * ABP individual y ABPRO grupal por aprendizaje esperado del módulo 2 (pedido del usuario, 2026-09-29).
 *
 * Fuente: contenidos/<PF>/modulo-2/R-abp-abpro.md, una sección "## AEn · ABP|ABPRO · Título" por actividad.
 * Salida, en modulo-2/<curso>/entrega/abp-abpro/, por actividad (M2-AEn-ABP-individual y M2-AEn-ABPRO-grupal):
 * - .html con estilos en línea, para pegar en la descripción de una Tarea de Moodle o en un Google Doc;
 * - .pdf con el diseño de los documentos del módulo, para adjuntar a la Tarea (--sin-pdf lo omite).
 * Sin duración de la actividad: el usuario pidió quitarla (2026-09-29). El aprendizaje esperado y los criterios
 * van textuales de la ficha de SIPFOR.
 *
 *   npm run abp                  # los dos cursos
 *   npm run abp -- PF1821        # uno
 *   npm run abp -- --sin-pdf     # solo los HTML
 */
import { leer, escribir } from './lib/repo.mjs';
import { moodleHtml, documentoPdfHtml } from './lib/documento.mjs';
import { imprimirPdf, navegador } from './lib/pdf.mjs';
import { esc, inline } from './lib/html.mjs';
import { oracion } from './lib/oracion.mjs';

const CURSOS = {
  PF1821: { carpeta: 'modulo-2/PF1821-agentes-low-code', curso: 'Construcción de Agentes y Automatización con Herramientas Low Code' },
  PF1822: { carpeta: 'modulo-2/PF1822-desarrollo-con-ia', curso: 'Especialización en Desarrollo con IA' },
};
const TIPOS = {
  ABP: { nombre: 'ABP individual', archivo: 'ABP-individual', partes: ['Contexto', 'Qué tienes que hacer', 'Entrega'] },
  ABPRO: { nombre: 'ABPRO grupal', archivo: 'ABPRO-grupal', partes: ['Contexto', 'Problema', 'Solución', 'Desarrollo', 'Roles del equipo', 'Entrega'] },
};

const args = process.argv.slice(2);
const conPdf = !args.includes('--sin-pdf');
const pedidos = args.filter((a) => !a.startsWith('--')).map((a) => a.toUpperCase());
const codigos = pedidos.length ? pedidos : Object.keys(CURSOS);
if (codigos.some((c) => !CURSOS[c])) {
  console.error(`Uso: npm run abp -- [${Object.keys(CURSOS).join(' ')}]`);
  process.exit(1);
}
if (conPdf && !navegador()) {
  console.error('No encontré Edge ni Chrome para imprimir los PDF. Usa --sin-pdf o define NAVEGADOR_PDF.');
  process.exit(1);
}

// Aprendizajes y criterios, textuales de la ficha de SIPFOR.
function ficha(md) {
  const aes = {};
  let actual = null; let enCriterios = false;
  for (const l of md.split('\n')) {
    const m = /^### (AE\d)\. (.+)$/.exec(l);
    if (m) { actual = aes[m[1]] = { texto: m[2], criterios: {} }; enCriterios = false; continue; }
    if (/^## /.test(l)) { actual = null; continue; }
    if (!actual) continue;
    if (/^\*\*/.test(l)) enCriterios = /^\*\*Criterios/.test(l);
    const c = enCriterios && /^- (\d\.\d) (.+)$/.exec(l);
    if (c) actual.criterios[c[1]] = c[2];
  }
  return { aes, modulo: /^# .*?: (.+)$/m.exec(md)?.[1] ?? '', codigo: /^\| Módulo \|.*?`(\w+)`/m.exec(md)?.[1] ?? '' };
}

function actividades(pf, md) {
  const out = [];
  const bloques = md.split(/^(?=## AE\d )/m).slice(1);
  for (const b of bloques) {
    const L = b.trimEnd().split('\n');
    const m = /^## (AE\d) · (ABPRO|ABP) · (.+)$/.exec(L[0]);
    if (!m) throw new Error(`${pf}: título de actividad mal formado: "${L[0]}"`);
    const dato = (r) => {
      const l = L.find((x) => x.startsWith(`- **${r}:**`));
      if (!l) throw new Error(`${pf} ${m[1]} ${m[2]}: falta "${r}"`);
      return l.replace(`- **${r}:**`, '').trim();
    };
    const iCuerpo = L.findIndex((l) => /^### /.test(l));
    const partes = L.slice(iCuerpo).filter((l) => /^### /.test(l)).map((l) => l.slice(4).trim());
    const faltan = TIPOS[m[2]].partes.filter((p) => !partes.includes(p));
    if (faltan.length) throw new Error(`${pf} ${m[1]} ${m[2]}: faltan las secciones ${faltan.join(', ')}`);
    out.push({
      ae: m[1], tipo: m[2], titulo: m[3], modalidad: dato('Modalidad'),
      criterios: dato('Criterios de evaluación').split(/,\s*/),
      md: L.slice(iCuerpo).join('\n').replace(/^### /gm, '## ').trim(),
    });
  }
  return out;
}

let total = 0;
for (const pf of codigos) {
  const c = CURSOS[pf];
  const f = ficha(leer(`contenidos/${pf}/modulo-2/00-ficha-sipfor.md`));
  const lista = actividades(pf, leer(`contenidos/${pf}/modulo-2/R-abp-abpro.md`));
  // Un ABP y un ABPRO por aprendizaje, y cada uno cubre todos los criterios de su aprendizaje.
  for (const ae of Object.keys(f.aes)) {
    for (const tipo of Object.keys(TIPOS)) {
      const a = lista.filter((x) => x.ae === ae && x.tipo === tipo);
      if (a.length !== 1) throw new Error(`${pf} ${ae}: esperaba 1 ${tipo} y encontré ${a.length}`);
      const plan = Object.keys(f.aes[ae].criterios);
      const ajenos = a[0].criterios.filter((x) => !plan.includes(x));
      const sinCubrir = plan.filter((x) => !a[0].criterios.includes(x));
      if (ajenos.length || sinCubrir.length) throw new Error(`${pf} ${ae} ${tipo}: criterios ajenos [${ajenos}] o sin cubrir [${sinCubrir}]`);
    }
  }
  for (const a of lista) {
    const ae = f.aes[a.ae];
    const t = TIPOS[a.tipo];
    const intro = `<p style="margin:0 0 .2em;font-size:.85em;color:#0E7490;letter-spacing:.06em;text-transform:uppercase"><strong>${pf} · Módulo 2 · ${a.ae} · ${t.nombre}</strong></p>
<p style="margin:0 0 .5em;font-size:1.45em;color:#0F3D5E"><strong>${esc(a.titulo)}</strong></p>
<p style="margin:0 0 .5em">${esc(c.curso)}<br>Módulo 2: ${esc(oracion(f.modulo))}</p>
<p style="margin:0 0 .3em"><strong>Aprendizaje esperado ${a.ae.slice(2)}:</strong> ${esc(oracion(ae.texto))}</p>
<p style="margin:0 0 .2em"><strong>Criterios de evaluación:</strong></p>
<ul style="margin:0 0 .5em">${a.criterios.map((n) => `<li>${n} ${esc(oracion(ae.criterios[n]))}</li>`).join('')}</ul>
<p style="margin:0"><strong>Modalidad:</strong> ${inline(a.modalidad)}</p>`;
    const archivo = `${c.carpeta}/entrega/abp-abpro/M2-${a.ae}-${t.archivo}.html`;
    escribir(archivo, moodleHtml({ titulo: `${pf} · M2 · ${a.ae} · ${t.nombre} · ${a.titulo}`, intro, md: a.md }));
    total++;
    if (!conPdf) continue;
    // HTML intermedio en .scratch/ (ignorado por git); el PDF queda junto al HTML.
    const tmp = `.scratch/abp-abpro/${pf}/M2-${a.ae}-${t.archivo}.html`;
    escribir(tmp, documentoPdfHtml({
      pf, curso: c.curso, modulo: oracion(f.modulo), codigo: f.codigo, pie: `${pf} · Módulo 2 · ${a.ae} · ${t.nombre}`,
      kicker: `${a.ae} · ${t.nombre}`, titulo: a.titulo,
      ficha: [
        ['Modalidad', a.modalidad, true],
        [`Aprendizaje esperado ${a.ae.slice(2)}`, oracion(ae.texto), true],
        ['Criterios de evaluación', a.criterios.map((n) => `${n} ${oracion(ae.criterios[n])}`), true],
      ],
      md: a.md,
    }));
    imprimirPdf(tmp, archivo.replace(/\.html$/, '.pdf'));
  }
  console.log(`${pf}: ${lista.length} actividades → ${c.carpeta}/entrega/abp-abpro/`);
}
console.log(`Listo: ${total} archivos.`);
