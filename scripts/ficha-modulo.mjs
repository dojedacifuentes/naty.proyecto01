#!/usr/bin/env node
/**
 * Genera, desde data/planes/<codigo>.json, la ficha del módulo evaluado y su lista de
 * entregables:
 *
 *   npm run ficha -- PF1821 PF1822          módulo 2 (el que pide el punto 7.4)
 *   npm run ficha -- PF1821 --modulo 3      otro módulo, si la consulta a SENCE lo exige
 *
 * Escribe en contenidos/<codigo>/modulo-<n>/:
 *   00-ficha-sipfor.md   lo que dice el plan, TEXTUAL: competencia, aprendizajes, criterios,
 *                        contenidos, recursos y perfil del facilitador. No se edita a mano:
 *                        se regenera con `npm run sipfor` + este script.
 *   01-entregables.md    qué hay que producir para ese módulo, con las cantidades del 7.0
 *                        calculadas para ESTE plan (data/rubrica-subcriterios.csv y
 *                        data/umbrales-por-plan.csv). Sí se edita: marca el avance.
 *
 * 01-entregables.md no se sobrescribe si ya existe (se perdería el avance marcado), salvo
 * con --forzar.
 */
import { leer, escribir, existe } from './lib/repo.mjs';
import { parseCSV } from './lib/csv.mjs';

const args = process.argv.slice(2);
const codigos = args.filter((a) => /^PF\d{4}$/i.test(a)).map((a) => a.toUpperCase());
const iMod = args.indexOf('--modulo');
const nMod = iMod >= 0 ? Number(args[iMod + 1]) : 2;
const forzar = args.includes('--forzar');
if (!codigos.length || !Number.isInteger(nMod) || nMod < 1) {
  console.error('Uso: npm run ficha -- PF1821 [PF1822 ...] [--modulo 2] [--forzar]');
  process.exit(1);
}

const umbrales = Object.fromEntries(parseCSV(leer('data/umbrales-por-plan.csv')).map((u) => [u.codigo_plan, u]));
const rubrica = Object.fromEntries(parseCSV(leer('data/rubrica-subcriterios.csv')).map((r) => [r.id, r]));
const pct = (id) => `${(Number(rubrica[id].peso_en_tecnica) * 100).toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

function ficha(p, m) {
  const L = [];
  L.push(`# ${p.codigo_plan} · Módulo ${m.n}: ${m.nombre}`, '');
  L.push('> Generado por `npm run ficha` desde `data/planes/' + p.codigo_plan + '.json`. **No editar a mano.**');
  L.push('> Todo lo que sigue es TEXTUAL de SIPFOR: la rúbrica exige los aprendizajes esperados sin reformular.', '');
  L.push('| Campo | Valor |', '| --- | --- |');
  L.push(`| Plan | ${p.codigo_plan} · ${p.nombre} · ${p.horas_totales} h · ${p.modalidad ?? '—'} |`);
  L.push(`| Módulo | ${m.n} de ${p.modulos.length} · \`${m.codigo}\` · ${m.tipo} · **${m.horas} h** |`);
  L.push(`| Fuente | SIPFOR, plan id ${p.fuente.sipfor_plan_id} · ${p.fuente.resolucion ?? '—'} del ${p.fuente.fecha_resolucion ?? '—'} · versión ${p.fuente.version ?? '—'} |`);
  L.push(`| PDF oficial del plan | ${p.fuente.pdf_plan} |`);
  L.push(`| Extraído | ${p.fuente.extraido_utc} |`, '');
  L.push('## Competencia del módulo', '', m.competencia, '');
  L.push('## Aprendizajes esperados, criterios y contenidos', '');
  for (const a of m.aprendizajes_esperados) {
    L.push(`### AE${a.n}. ${a.texto}`, '');
    L.push('**Criterios de evaluación del plan**', '');
    for (const c of a.criterios_evaluacion) L.push(`- ${c.n ? c.n + ' ' : ''}${c.texto}`);
    L.push('', '**Contenidos**', '');
    for (const t of a.contenidos) {
      L.push(`- ${t.tema}`);
      for (const it of t.items) L.push(`  - ${it}`);
    }
    L.push('');
  }
  const rm = m.recursos_materiales;
  L.push('## Recursos materiales (alimentan las secciones VIII y X del Anexo 2)', '');
  L.push('**Infraestructura**', '', ...rm.infraestructura.map((x) => `- ${x}`), '');
  L.push('**Equipos y herramientas**', '', ...rm.equipos_y_herramientas.map((x) => `- ${x}`), '');
  L.push('**Materiales e insumos**', '', ...rm.materiales_e_insumos.map((x) => `- ${x}`), '');
  L.push('## Perfil del facilitador (sección III del Anexo 2)', '');
  m.perfil_facilitador.forEach((x, i) => L.push(`${i + 1}. ${x}`));
  L.push('', '## Todos los módulos del plan (secciones III y IV del Anexo 2)', '');
  L.push('| N° | Código | Módulo | Horas | Tipo |', '| --- | --- | --- | --- | --- |');
  for (const x of p.modulos) L.push(`| ${x.n} | \`${x.codigo}\` | ${x.nombre}${x.n === m.n ? ' **← evaluado**' : ''} | ${x.horas} | ${x.tipo} |`);
  L.push(`| | | **Total** | **${p.suma_horas_modulos}** | |`, '');
  L.push(`Orden de los módulos: ${p.fuente.orden_modulos}. Confirmar contra el PDF oficial del plan.`, '');
  return L.join('\n');
}

function entregables(p, m) {
  const u = umbrales[p.codigo_plan];
  const nAE = m.aprendizajes_esperados.length;
  const nCE = m.aprendizajes_esperados.reduce((s, a) => s + a.criterios_evaluacion.length, 0);
  const aes = m.aprendizajes_esperados.map((a) => `AE${a.n}`).join(', ');
  const ext = u ? u.extension_nota7 : '?';
  const L = [];
  L.push(`# ${p.codigo_plan} · Módulo ${m.n}: entregables`, '');
  L.push(`**Módulo:** \`${m.codigo}\` ${m.nombre} · ${m.horas} h · ${nAE} aprendizajes esperados · ${nCE} criterios en el plan`);
  L.push('**Estado:** borrador', '');
  L.push('> Qué hay que producir para que este módulo alcance el 7,0. Las cantidades salen de');
  L.push('> `data/rubrica-subcriterios.csv` y `data/umbrales-por-plan.csv` aplicadas a este plan.');
  L.push('> Cada entregable va en su propio archivo en esta carpeta. Marca `[x]` solo cuando');
  L.push('> esté revisado por una persona, no cuando el borrador exista.', '');

  L.push('## A. Contenido canónico del módulo (una vez por curso, sirve a todas las instituciones)', '');
  L.push('| ✓ | Id | Entregable | Cantidad para 7,0 en este módulo | % técnica | Archivo |', '| --- | --- | --- | --- | --- | --- |');
  const fila = (id, txt, cant, archivo) => L.push(`| [ ] | ${id} | ${txt} | ${cant} | ${rubrica[id] ? pct(id) : '—'} | \`${archivo}\` |`);
  fila('B1', 'Indicadores de logro (verbo + contenido + condición), con los AE textuales', `**${nAE * 3} indicadores** (3 × ${nAE} AE)`, 'B1-indicadores.md');
  fila('B2', 'Instrumentos de evaluación de familias distintas, desarrollados', `**3 instrumentos** (observación, desempeño, objetiva), cada uno con ${aes}`, 'B2-instrumentos.md');
  fila('B3', 'Portafolio con sus elementos desarrollados + rúbrica adjunta', `**6 de 6 elementos**; el elemento 3 lleva evidencias de ${aes}`, 'B3-portafolio.md');
  fila('B4', 'Retroalimentación y aprendizaje colaborativo', '**4 productos**: feedback, autoevaluación, coevaluación y bitácora de registro', 'B4-retroalimentacion.md');
  fila('C1', 'Estrategia metodológica anclada a la competencia del módulo', '**1**, que no sirva para otro plan (binario)', 'C-metodologia.md');
  fila('C2', 'Actividades prácticas distintas, con respuesta modelada', `**2 actividades**, que juntas cubran ${aes}`, 'C2-actividades.md');
  fila('C3', 'Aspectos motivacionales vía interacción con la plataforma', '**1** estrategia visible en el LMS (binario)', 'C-metodologia.md');
  fila('C4', 'Herramientas didácticas, ambas efectivas', '**2 herramientas** (p. ej. tutorial y video interactivo)', 'C4-herramientas-didacticas.md');
  fila('C5', 'Estrategias para habilidades del siglo XXI', '**3 estrategias** para 3 habilidades', 'C-metodologia.md');
  L.push(`| [ ] | IV | Actividades de todos los módulos: horas y sincrónica/asincrónica | **${p.modulos.length} módulos** · ${p.suma_horas_modulos} h | — | \`IV-actividades.md\` |`);
  L.push('');

  L.push('## B. Por institución × curso (se instancia en `propuestas/<cliente>/' + p.codigo_plan + '/`)', '');
  L.push('| Id | Entregable | Cantidad para 7,0 | % técnica |', '| --- | --- | --- | --- |');
  L.push(`| D1 | Herramientas de industria **adicionales a las del plan**, con 3 explicaciones cada una | **5** | ${pct('D1')} |`);
  L.push(`| D2 | Estrategias de vinculación temprana, con 4 explicaciones cada una | **4** | ${pct('D2')} |`);
  L.push(`| D3 | Actividades de extensión (1 cada 50 h de ${p.horas_totales} h) | **${ext}** | ${pct('D3')} |`);
  L.push(`| A | Infraestructura con equipos: mínimo según los recursos del módulo (ver ficha) | infraestructura **con** equipos | ${pct('A1')} |`);
  L.push('| VIII | Módulo montado en el LMS + evidencia idéntica + correo y nube ≥ 12 GB | 1 LMS navegable | habilita el ítem C |');
  L.push('| V | Portafolio publicado en URL visitable | 1 enlace | ver B3 |');
  L.push('');

  L.push('## Insumos del plan que hay que respetar', '');
  L.push(`- **Competencia del módulo** (C1 se evalúa contra esto): ${m.competencia}`);
  L.push('- **Aprendizajes esperados** (B1, B2, B3 y C2 deben nombrarlos textuales):');
  for (const a of m.aprendizajes_esperados) L.push(`  - AE${a.n}: ${a.texto} *(${a.criterios_evaluacion.length} criterios en el plan)*`);
  L.push('- **Herramientas que ya nombra el plan**: están en los recursos de cada módulo de `data/planes/' + p.codigo_plan + '.json`. D1 exige herramientas **distintas** de esas.');
  L.push('', '## Lo que este archivo no decide', '');
  L.push('- Si se desarrolla solo este módulo o todos (`state/OPEN-QUESTIONS.md` #1).');
  L.push('- Qué instituciones presentan este curso (#3) y en qué LMS (#5, #6).', '');
  return L.join('\n');
}

let fallos = 0;
for (const c of codigos) {
  const f = `data/planes/${c}.json`;
  if (!existe(f)) { console.error(`${c}: falta ${f}. Córrelo antes: npm run sipfor -- ${c}`); fallos++; continue; }
  const p = JSON.parse(leer(f));
  const m = p.modulos.find((x) => x.n === nMod);
  if (!m) { console.error(`${c}: el plan tiene ${p.modulos.length} módulos, no hay módulo ${nMod}`); fallos++; continue; }
  const dir = `contenidos/${c}/modulo-${nMod}`;
  console.log(`${c}  módulo ${nMod}: ${m.codigo} ${m.nombre}`);
  console.log(`         → ${escribir(`${dir}/00-ficha-sipfor.md`, ficha(p, m))}`);
  const e = `${dir}/01-entregables.md`;
  if (existe(e) && !forzar) console.log(`         = ${e} ya existe, no se toca (usa --forzar)`);
  else console.log(`         → ${escribir(e, entregables(p, m))}`);
}
process.exit(fallos ? 1 : 0);
