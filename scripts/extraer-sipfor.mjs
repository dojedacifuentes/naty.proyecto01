#!/usr/bin/env node
/**
 * Extrae planes formativos desde SIPFOR (sipfor.sence.cl) y los deja como dato del repo.
 *
 *   npm run sipfor -- PF1821 PF1822     uno o más planes
 *   npm run sipfor -- --todos           los 15 de data/planes-formativos.csv
 *
 * Usa la misma API pública que el catálogo web (Catalogo.aspx): PlanSearch resuelve el
 * código a su id interno, PlanGetById trae el plan con sus módulos y ModuloGetById trae
 * cada módulo con competencia, aprendizajes esperados, criterios, contenidos y recursos.
 * Solo lee: no se autentica ni escribe nada en SIPFOR.
 *
 * Escribe, por plan:
 *   data/sipfor/<codigo>/plan.json y modulo-<codigo_modulo>.json   respuesta tal cual (fuente)
 *   data/planes/<codigo>.json                                       forma normalizada
 *
 * Los textos se conservan TEXTUALES (mayúsculas incluidas): la rúbrica exige los
 * aprendizajes esperados del plan sin reformular (docs/01-guia-propuesta-tecnica.md §5).
 * Solo se quitan etiquetas HTML y se separan los ítems que SIPFOR junta con <br />.
 */
import { leer, escribir, existe } from './lib/repo.mjs';
import { parseCSV } from './lib/csv.mjs';

const BASE = 'https://sipfor.sence.cl';
const PAUSA_MS = 350; // no martillar un servicio público

const args = process.argv.slice(2);
const todos = args.includes('--todos');
let codigos = args.filter((a) => /^PF\d{4}$/i.test(a)).map((a) => a.toUpperCase());
if (todos) codigos = parseCSV(leer('data/planes-formativos.csv')).map((p) => p.codigo_plan);
if (!codigos.length) {
  console.error('Uso: npm run sipfor -- PF1821 [PF1822 ...]   o   npm run sipfor -- --todos');
  process.exit(1);
}

const pausa = (ms) => new Promise((r) => setTimeout(r, ms));

async function llamar(metodo, cuerpo) {
  const url = `${BASE}/ProxySS.asmx/${metodo}`;
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(cuerpo),
        signal: AbortSignal.timeout(60000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return JSON.parse(json.d);
    } catch (e) {
      if (intento === 3) throw new Error(`${metodo} falló: ${e.message}`);
      await pausa(1000 * intento);
    }
  }
}

const ENTIDADES = { '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };
const limpiar = (s) => String(s ?? '')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<\/p>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&[a-z#0-9]+;/gi, (e) => ENTIDADES[e.toLowerCase()] ?? e)
  .split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean)
  .join('\n');
const lineas = (s) => limpiar(s).split('\n').filter(Boolean);

/** "1.1 IDENTIFICA ..." → { n: "1.1", texto: "IDENTIFICA ..." } */
function criterios(s) {
  return lineas(s).map((l) => {
    const m = /^(\d+(?:\.\d+)+)\.?\s+(.*)$/.exec(l);
    return m ? { n: m[1], texto: m[2] } : { n: null, texto: l };
  });
}

/** Encabezado "1. TEMA:" seguido de ítems "*SUBTEMA." → { tema, items } */
function contenidos(s) {
  const out = [];
  for (const l of lineas(s)) {
    const item = /^[*•\-]\s*(.*)$/.exec(l);
    if (item && out.length) out[out.length - 1].items.push(item[1]);
    else out.push({ tema: l.replace(/:\s*$/, ''), items: [] });
  }
  return out;
}

function normalizarModulo(n, m) {
  const aes = [...(m.TB_RUP_APRENDESPE || [])].sort((a, b) => a.PK_RUP_APE_ID - b.PK_RUP_APE_ID);
  return {
    n,
    codigo: m.PK_RUP_MOD_CODIGO,
    tipo: /^MB/.test(m.PK_RUP_MOD_CODIGO) ? 'transversal' : 'técnico',
    nombre: limpiar(m.FL_RUP_MOD_NOMBRE),
    horas: m.FL_RUP_MOD_HORAS,
    competencia: limpiar(m.FL_RUP_MOD_COMPMOD),
    aprendizajes_esperados: aes.map((a, i) => {
      const texto = limpiar(a.FL_RUP_APE_APRENDESP);
      const num = /^(\d+)\.\s+/.exec(texto);
      return {
        n: num ? Number(num[1]) : i + 1,
        texto: texto.replace(/^\d+\.\s+/, ''),
        criterios_evaluacion: criterios(a.FL_RUP_APE_CRITEVAL),
        contenidos: contenidos(a.FL_RUP_APE_CONTENIDOS),
      };
    }),
    recursos_materiales: {
      infraestructura: lineas(m.FL_RUP_MOD_RECMATINF),
      equipos_y_herramientas: lineas(m.FL_RUP_MOD_RECMATEQ),
      materiales_e_insumos: lineas(m.FL_RUP_MOD_RECMATINS),
    },
    perfil_facilitador: [m.FL_RUP_MOD_PERFFAC1, m.FL_RUP_MOD_PERFFAC2, m.FL_RUP_MOD_PERFFAC3].map(limpiar).filter(Boolean),
    estrategia_metodologica: limpiar(m.FL_RUP_MOD_ESTMETOD) || null,
    estrategia_evaluativa: limpiar(m.FL_RUP_MOD_ESTEVAL) || null,
    sipfor_modulo_id: m.PK_RUP_MOD_ID,
    sipfor_actualizado: m.FECHA_ACTUALIZACION || null,
  };
}

async function extraer(codigo) {
  const encontrados = await llamar('PlanSearch', {
    idPLan: codigo, plan: '', codmodulo: '', modulo: '', plantilla: '0', sector: '', subsector: '',
    seccion: '', division: '', estado: '3', perfilocup: '', codigoperfilocup: '', area: '', subarea: '', especialidad: '',
  });
  const hit = encontrados.find((p) => p.PK_RUP_PLA_CODIGO === codigo) || (encontrados.length === 1 ? encontrados[0] : null);
  if (!hit) throw new Error(`${codigo}: SIPFOR devolvió ${encontrados.length} resultados y ninguno con ese código`);

  const plan = await llamar('PlanGetById', { id: hit.PK_RUP_PLA_ID });
  escribir(`data/sipfor/${codigo}/plan.json`, JSON.stringify(plan, null, 2) + '\n');

  // FL_RUP_MOD_ORDEN viene en 0 para todos: el orden es el de TB_RUP_PLANMOD, que es el
  // mismo que muestra el catálogo (por PK_RUP_PLM_ID). Se deja escrito en `fuente`.
  const planmod = [...plan.TB_RUP_PLANMOD].sort((a, b) => a.PK_RUP_PLM_ID - b.PK_RUP_PLM_ID);
  const modulos = [];
  for (const [i, pm] of planmod.entries()) {
    await pausa(PAUSA_MS);
    const m = await llamar('ModuloGetById', { id: pm.FK_RUP_MOD_ID });
    escribir(`data/sipfor/${codigo}/modulo-${m.PK_RUP_MOD_CODIGO}.json`, JSON.stringify(m, null, 2) + '\n');
    modulos.push(normalizarModulo(i + 1, m));
  }

  const salida = {
    codigo_plan: plan.PK_RUP_PLA_CODIGO,
    nombre: limpiar(plan.PK_RUP_PLA_NOMBRE),
    horas_totales: plan.FL_RUP_PLA_DURACION,
    modalidad: plan.TB_RUP_MODALIDAD?.FL_RUP_MODALIDAD_NOMBRE ?? null,
    nivel: plan.FL_RUP_NVC_NOMBRE ?? null,
    competencia_plan: limpiar(plan.FL_RUP_PLA_COMPPLAN),
    descripcion: limpiar(plan.FL_RUP_PLA_DESCOPYC),
    requisitos_ingreso: limpiar(plan.FL_RUP_PLA_REQINGRE),
    suma_horas_modulos: modulos.reduce((s, m) => s + (m.horas || 0), 0),
    modulos,
    fuente: {
      sistema: 'SIPFOR',
      catalogo: `${BASE}/Planes/Catalogo.aspx`,
      pdf_plan: `${BASE}/Planes/PDFPlan.aspx?id=${plan.PK_RUP_PLA_ID}`,
      sipfor_plan_id: plan.PK_RUP_PLA_ID,
      resolucion: plan.FL_RUP_PLA_RESOLUCION ? `Res. ${plan.FL_RUP_PLA_RESOLUCION}` : null,
      fecha_resolucion: plan.FL_RUP_PLA_FECRESOLUCION?.slice(0, 10) ?? null,
      version: plan.FL_RUP_PLA_VERSION ?? null,
      orden_modulos: 'TB_RUP_PLANMOD ordenado por PK_RUP_PLM_ID (FL_RUP_MOD_ORDEN viene en 0)',
      extraido_utc: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
    },
  };
  const destino = escribir(`data/planes/${codigo}.json`, JSON.stringify(salida, null, 2) + '\n');

  const m2 = modulos[1];
  const cuadra = salida.suma_horas_modulos === salida.horas_totales ? 'cuadran' : `NO cuadran (${salida.suma_horas_modulos} h en módulos)`;
  console.log(`${codigo}  ${salida.nombre} · ${salida.horas_totales} h · ${modulos.length} módulos · horas ${cuadra}`);
  if (m2) console.log(`         módulo 2: ${m2.codigo} ${m2.nombre} · ${m2.horas} h · ${m2.aprendizajes_esperados.length} aprendizajes esperados`);
  console.log(`         → ${destino}`);
}

let fallos = 0;
for (const c of codigos) {
  try { await extraer(c); } catch (e) { fallos++; console.error(`${c}  ERROR: ${e.message}`); }
  await pausa(PAUSA_MS);
}
if (!existe('data/planes')) process.exit(1);
process.exit(fallos ? 1 : 0);
