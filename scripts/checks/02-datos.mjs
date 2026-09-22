/** Control 02 — integridad de data/: la rúbrica es la especificación ejecutable y tiene que cuadrar. */
import { leer, existe } from '../lib/repo.mjs';

const cerca = (a, b, tol = 0.0015) => Math.abs(a - b) <= tol;
const num = (v) => Number(String(v).replace(',', '.'));
const PESO_TECNICA_EN_NOTA_FINAL = 0.4; // la técnica pesa 40% de la nota final (bases 2026, 7.3)

export default {
  id: '02',
  nombre: 'Integridad de los datos',
  descripcion: 'Suma de pesos de la rúbrica, claves únicas y umbrales-por-plan al día respecto de planes-formativos.',

  run(ctx, r) {
    // --- clientes ---------------------------------------------------------
    const vistos = new Set();
    for (const c of ctx.clientes) {
      if (vistos.has(c.slug)) r.error(`slug duplicado "${c.slug}"`, 'data/clientes.csv');
      vistos.add(c.slug);
      if (!/^[a-z0-9-]+$/.test(c.slug)) r.error(`slug "${c.slug}" debe ser minúsculas y guiones`, 'data/clientes.csv');
      if (!['si', 'sí', 'no'].includes(String(c.ficha_completa).toLowerCase())) {
        r.aviso(`ficha_completa de "${c.slug}" debería ser si/no`, 'data/clientes.csv');
      }
    }
    // Los slugs son nomenclatura de directorios: AGENTS.md y el CSV no pueden divergir.
    const enAgents = new Set([...leer('AGENTS.md').matchAll(/`([a-z0-9-]+)`/g)].map((m) => m[1]));
    for (const s of vistos) {
      if (!enAgents.has(s)) r.error(`el slug "${s}" no está declarado en AGENTS.md §4`, 'AGENTS.md');
    }

    // --- planes formativos ------------------------------------------------
    const codigos = new Set();
    for (const p of ctx.planes) {
      if (codigos.has(p.codigo_plan)) r.error(`código duplicado ${p.codigo_plan}`, 'data/planes-formativos.csv');
      codigos.add(p.codigo_plan);
      if (!/^PF\d{4}$/.test(p.codigo_plan)) r.error(`código inválido "${p.codigo_plan}"`, 'data/planes-formativos.csv');
      if (!(num(p.horas) > 0)) r.error(`horas inválidas en ${p.codigo_plan}`, 'data/planes-formativos.csv');
      if (!(num(p.cupos) > 0)) r.error(`cupos inválidos en ${p.codigo_plan}`, 'data/planes-formativos.csv');
    }
    const cupos = ctx.planes.reduce((s, p) => s + num(p.cupos), 0);
    r.nota(`${ctx.planes.length} planes formativos · ${cupos.toLocaleString('es-CL')} cupos`);

    // --- rúbrica ----------------------------------------------------------
    const porItem = new Map();
    for (const s of ctx.rubrica) {
      if (!porItem.has(s.item)) porItem.set(s.item, { peso: num(s.item_peso), subs: [] });
      porItem.get(s.item).subs.push(s);
    }
    const sumaItems = [...porItem.values()].reduce((a, i) => a + i.peso, 0);
    if (!cerca(sumaItems, 1)) {
      r.error(`los pesos de los ítems suman ${sumaItems.toFixed(3)} y deben sumar 1.000`, 'data/rubrica-subcriterios.csv');
    }
    for (const [item, { peso, subs }] of porItem) {
      const interno = subs.reduce((a, s) => a + num(s.peso_interno), 0);
      if (!cerca(interno, 1)) {
        r.error(`"${item}": los pesos internos suman ${interno.toFixed(3)} y deben sumar 1.000`, 'data/rubrica-subcriterios.csv');
      }
      for (const s of subs) {
        const esperado = peso * num(s.peso_interno);
        if (!cerca(num(s.peso_en_tecnica), esperado)) {
          r.error(`${s.id}: peso_en_tecnica ${s.peso_en_tecnica} no es item_peso x peso_interno (${esperado.toFixed(3)})`, 'data/rubrica-subcriterios.csv');
        }
        const enFinal = num(s.peso_en_tecnica) * PESO_TECNICA_EN_NOTA_FINAL;
        if (!cerca(num(s.peso_nota_final), enFinal)) {
          r.error(`${s.id}: peso_nota_final ${s.peso_nota_final} no es peso_en_tecnica x 0,4 (${enFinal.toFixed(3)})`, 'data/rubrica-subcriterios.csv');
        }
        if (!s.umbral_7) r.error(`${s.id} no declara umbral_7`, 'data/rubrica-subcriterios.csv');
      }
    }
    r.nota(`${ctx.rubrica.length} subcriterios · pesos cuadrados`);

    // --- umbrales por plan: es un dato generado, tiene que estar al día ----
    if (existe('data/umbrales-por-plan.csv')) {
      const esperados = new Map(ctx.planes.map((p) => [p.codigo_plan, {
        e7: Math.ceil(num(p.horas) / 50), e5: Math.ceil(num(p.horas) / 80), e3: Math.ceil(num(p.horas) / 100),
      }]));
      if (ctx.umbrales.length !== ctx.planes.length) {
        r.error(`tiene ${ctx.umbrales.length} filas y hay ${ctx.planes.length} planes: regenera con "npm run umbrales -- --csv"`, 'data/umbrales-por-plan.csv');
      }
      for (const u of ctx.umbrales) {
        const e = esperados.get(u.codigo_plan);
        if (!e) { r.error(`${u.codigo_plan} no está en planes-formativos.csv`, 'data/umbrales-por-plan.csv'); continue; }
        if (num(u.extension_nota7) !== e.e7 || num(u.extension_nota5) !== e.e5 || num(u.extension_nota3) !== e.e3) {
          r.error(`${u.codigo_plan}: umbrales desactualizados (esperado ${e.e7}/${e.e5}/${e.e3}). Regenera con "npm run umbrales -- --csv"`, 'data/umbrales-por-plan.csv');
        }
      }
      const total7 = [...esperados.values()].reduce((a, e) => a + e.e7, 0);
      r.nota(`${total7} actividades de extensión distintas por cliente para nota 7`);
    }
  },
};
