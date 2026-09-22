#!/usr/bin/env node
/**
 * Sistema de handoff entre sesiones.
 *
 * El estado del proyecto vive en archivos, no en el chat de nadie. Estas órdenes hacen
 * que abrir, cerrar y auditar una sesión deje rastro comprobable en state/LEDGER.csv,
 * para que la sesión siguiente —de Claude Code, de Codex o de una persona— pueda
 * verificar lo que dijo la anterior sin creerle.
 *
 *   npm run sesion -- abrir --herramienta claude-code [--modelo opus-5] [--tema "..."]
 *   npm run sesion -- cerrar [--tema "..."] [--commit] [--forzar]
 *   npm run sesion -- estado
 *   npm run sesion -- auditar <sesion-id> --herramienta codex
 *   npm run sesion -- veredicto <sesion-id> --veredicto aprobada --herramienta codex
 *
 * Código de salida: 0 bien · 1 el cierre no cumple AGENTS.md §5 o el uso es inválido.
 */
import {
  leer, leerSiExiste, escribir, existe, git, hayGit, commitActual, ramaActual,
  cambiosDesde, hoy, ahora, rojo, verde, amarillo, azul, gris, negrita,
} from './lib/repo.mjs';
import {
  hashEstado, leerLedger, escribirLedger, sesionesAbiertas, siguienteId,
  rutaLog, HERRAMIENTAS, COLUMNAS_LEDGER,
} from './lib/estado.mjs';
import { secciones } from './lib/md.mjs';
import { verificar, resumenCorto, aInforme } from './verificar.mjs';

// ------------------------------------------------------------------ helpers

function args(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      o[k] = v;
    } else o._.push(a);
  }
  return o;
}

const plantilla = (texto, datos) =>
  texto.replace(/\{\{(\w+)\}\}/g, (_, k) => (datos[k] === undefined ? `{{${k}}}` : String(datos[k])));

function exigirHerramienta(v, quien = '--herramienta') {
  if (!v || v === true) {
    console.error(rojo(`Falta ${quien}. Opciones: ${HERRAMIENTAS.join(', ')}`));
    process.exit(1);
  }
  if (!HERRAMIENTAS.includes(v)) {
    console.error(rojo(`Herramienta "${v}" desconocida. Opciones: ${HERRAMIENTAS.join(', ')}`));
    console.error(gris('Si es una herramienta nueva, agrégala en scripts/lib/estado.mjs y déjalo en DECISIONS.md.'));
    process.exit(1);
  }
  return v;
}

/**
 * Rango de commits atribuible a una sesión.
 *
 * Termina donde arrancó la sesión siguiente. Si esa sesión arrancó en el mismo commit
 * (pasa cuando se abre con --desde, o cuando dos trabajaron en paralelo), el corte es el
 * commit de cierre de la sesión auditada: de lo contrario el informe le atribuiría
 * trabajo ajeno, que es exactamente el error que esto existe para detectar.
 *
 * Si el rango queda vacío, la sesión cabe en un solo commit y se revisa ese.
 */
function rango(sesion, ledger) {
  const i = ledger.findIndex((s) => s.sesion_id === sesion.sesion_id);
  const siguiente = ledger.slice(i + 1).find((s) => s.commit_inicio);
  const distinta = siguiente && siguiente.commit_inicio !== sesion.commit_inicio;

  const hasta = distinta ? siguiente.commit_inicio : (sesion.commit_cierre || 'HEAD');
  const desde = sesion.commit_inicio;

  const vacio = !desde || desde === hasta;
  return {
    desde, hasta, vacio,
    rev: vacio ? hasta : `${desde}..${hasta}`,
    texto: vacio ? `solo ${String(hasta).slice(0, 7)}` : `${String(desde).slice(0, 7)}..${String(hasta).slice(0, 7)}`,
  };
}

/** "Tu primera tarea" del HANDOFF, que es lo único que una sesión nueva necesita para arrancar. */
function primeraTarea() {
  const h = leerSiExiste('state/HANDOFF.md');
  if (!h) return null;
  const s = secciones(h).find((x) => /primera tarea/i.test(x.titulo));
  return s ? s.cuerpo.trim() : null;
}

async function correrVerificacion() {
  const { resultados } = await verificar({ red: false });
  const errores = resultados.reduce((s, r) => s + r.errores.length, 0);
  const avisos = resultados.reduce((s, r) => s + r.avisos.length, 0);
  escribir('state/verificacion.json', JSON.stringify(aInforme(resultados, { red: false }), null, 2) + '\n');
  return { resultados, errores, avisos, resumen: resumenCorto(resultados) };
}

// -------------------------------------------------------------------- abrir

function abrir(o) {
  const herramienta = exigirHerramienta(o.herramienta);
  const ledger = leerLedger();
  const abiertas = sesionesAbiertas(ledger);

  for (const a of abiertas) {
    if (a.herramienta === herramienta) {
      console.error(rojo(`Ya hay una sesión abierta de ${herramienta}: ${a.sesion_id}`));
      console.error(gris('Ciérrala con "npm run sesion -- cerrar" o revisa por qué quedó abierta.'));
      process.exit(1);
    }
    console.log(amarillo(`Aviso: ${a.sesion_id} (${a.herramienta}) está abierta en paralelo.`));
    console.log(gris('Al fusionar, lee su CHECKPOINT antes de resolver conflictos en state/ (AGENTS.md §8).\n'));
  }

  const id = siguienteId(hoy(), herramienta, ledger);

  // --desde: para abrir una sesión que ya empezó. Es mejor registrar el commit real de
  // partida que fingir que el trabajo arranca cuando uno se acordó de abrirla.
  let inicio = commitActual();
  if (o.desde && o.desde !== true) {
    const resuelto = git(['rev-parse', '--verify', `${o.desde}^{commit}`], { opcional: true });
    if (!resuelto) { console.error(rojo(`No existe el commit "${o.desde}"`)); process.exit(1); }
    inicio = resuelto;
  }

  const datos = {
    sesion_id: id,
    herramienta,
    modelo: o.modelo && o.modelo !== true ? o.modelo : '(no declarado)',
    rama: ramaActual(),
    commit_inicio: inicio.slice(0, 12),
    abierta_utc: ahora(),
    tema: o.tema && o.tema !== true ? o.tema : '(sin declarar)',
  };

  const log = rutaLog(id);
  if (existe(log)) { console.error(rojo(`Ya existe ${log}`)); process.exit(1); }
  escribir(log, plantilla(leer('templates/sesion.md'), datos));

  ledger.push({
    ...Object.fromEntries(COLUMNAS_LEDGER.map((c) => [c, ''])),
    sesion_id: id, herramienta, modelo: datos.modelo, rama: datos.rama,
    commit_inicio: datos.commit_inicio, abierta_utc: datos.abierta_utc, estado: 'abierta',
  });
  escribirLedger(ledger);

  console.log(negrita(`\nSesión abierta: ${id}`) + gris(`  ·  ${datos.rama} · ${datos.commit_inicio}`));
  console.log(`Log de la sesión: ${azul(log)}\n`);
  console.log(negrita('Lee en este orden antes de tocar nada:'));
  console.log('  1. AGENTS.md            el contrato operativo, te aplica entero');
  console.log('  2. state/CHECKPOINT.md  dónde quedó todo');
  console.log('  3. state/HANDOFF.md     qué te toca a ti');
  console.log('  4. state/OPEN-QUESTIONS.md  sobre qué NO puedes decidir\n');

  const tarea = primeraTarea();
  if (tarea) {
    console.log(negrita('Tu primera tarea, según el handoff que te dejaron:'));
    console.log(tarea.split('\n').slice(0, 12).map((l) => '  ' + l).join('\n') + '\n');
  } else {
    console.log(amarillo('El HANDOFF no declara primera tarea. Pregunta antes de improvisar una.\n'));
  }

  const sinAuditar = ledger.filter((s) => s.estado === 'cerrada' && !s.veredicto && s.herramienta !== herramienta);
  if (sinAuditar.length) {
    console.log(gris(`Hay ${sinAuditar.length} sesión(es) cerradas sin auditar, producidas por otra herramienta:`));
    console.log(gris(`  ${sinAuditar.map((s) => s.sesion_id).join(', ')}`));
    console.log(gris('  Auditarlas es trabajo productivo: npm run sesion -- auditar <id> --herramienta ' + herramienta + '\n'));
  }
}

// ------------------------------------------------------------------- cerrar

async function cerrar(o) {
  const ledger = leerLedger();
  let abiertas = sesionesAbiertas(ledger);
  if (o.id && o.id !== true) abiertas = abiertas.filter((s) => s.sesion_id === o.id);

  if (!abiertas.length) {
    console.error(rojo('No hay ninguna sesión abierta que cerrar.'));
    console.error(gris('Ábrela antes de trabajar: npm run sesion -- abrir --herramienta <la tuya>'));
    process.exit(1);
  }
  if (abiertas.length > 1) {
    console.error(rojo(`Hay ${abiertas.length} sesiones abiertas. Indica cuál: --id ${abiertas[0].sesion_id}`));
    process.exit(1);
  }
  const s = abiertas[0];
  const log = rutaLog(s.sesion_id);

  console.log(negrita(`\nCerrando ${s.sesion_id}`) + gris(`  ·  ${s.herramienta}\n`));
  console.log('Corriendo la verificación...');
  const v = await correrVerificacion();
  console.log(v.errores ? rojo(`  ${v.resumen} · ${v.errores} errores · ${v.avisos} avisos`)
    : verde(`  ${v.resumen} · ${v.avisos} avisos`));

  // --- protocolo de cierre, AGENTS.md §5 -------------------------------
  const faltas = [];
  const tocados = cambiosDesde(s.commit_inicio);
  const toco = (f) => tocados.includes(f);

  if (!toco('state/CHECKPOINT.md')) faltas.push('state/CHECKPOINT.md sigue igual que al abrir la sesión (§5.1)');
  if (!toco('state/HANDOFF.md')) faltas.push('state/HANDOFF.md no se reescribió para quien venga después (§5.2)');
  if (!toco(log)) faltas.push(`${log} está vacío: nadie sabrá qué hiciste (§5.5)`);

  const textoLog = leerSiExiste(log) || '';
  if (/<[a-záéíóúñ][^>]*>/i.test(textoLog.replace(/<!--[\s\S]*?-->/g, ''))) {
    faltas.push(`${log} conserva texto de la plantilla sin rellenar`);
  }
  const checkpoint = leerSiExiste('state/CHECKPOINT.md') || '';
  if (!checkpoint.includes(hoy())) faltas.push(`state/CHECKPOINT.md no dice "Última actualización: ${hoy()}"`);

  // Nadie borra preguntas abiertas de tapadillo: se marcan resueltas, no se eliminan.
  const antes = git(['show', `${s.commit_inicio}:state/OPEN-QUESTIONS.md`], { opcional: true });
  if (antes) {
    const cuenta = (t) => (t.match(/^\*\*\d+\./gm) || []).length;
    const ahoraQ = cuenta(leerSiExiste('state/OPEN-QUESTIONS.md') || '');
    if (ahoraQ < cuenta(antes)) faltas.push('desaparecieron preguntas de state/OPEN-QUESTIONS.md: se marcan resueltas, no se borran (§5.4)');
  }

  if (v.errores) faltas.push(`la verificación deja ${v.errores} errores sin corregir`);

  if (faltas.length && !o.forzar) {
    console.log(rojo('\nEl cierre no cumple AGENTS.md §5:\n'));
    faltas.forEach((f) => console.log(`  ${rojo('x')} ${f}`));
    console.log(gris('\nCorrige y vuelve a cerrar. Si de verdad tienes que cerrar así, usa --forzar'));
    console.log(gris('y quedará registrado como cierre forzado para quien audite.\n'));
    process.exit(1);
  }

  // --- evidencia ---------------------------------------------------------
  const diff = git(['diff', '--shortstat', s.commit_inicio], { opcional: true }) || 'sin cambios versionados';
  const huella = hashEstado();
  const evidencia = [
    `**Commit de inicio:** \`${s.commit_inicio}\` · **Cierre:** \`${commitActual().slice(0, 12)}\``,
    `**Archivos tocados (${tocados.length}):**`,
    '',
    ...tocados.map((f) => `- \`${f}\``),
    '',
    `**Diff:** ${diff.trim()}`,
    `**Verificación:** ${v.resumen} · ${v.errores} errores · ${v.avisos} avisos`,
    `**Huella de state/:** \`${huella}\``,
    faltas.length ? `**Cierre forzado:** ${faltas.length} incumplimiento(s) de §5: ${faltas.join(' · ')}` : '',
    '',
    `_Generado por \`npm run sesion -- cerrar\` el ${ahora()}._`,
  ].filter((l) => l !== '').join('\n');

  escribir(log, textoLog.replace(
    /<!-- evidencia:inicio -->[\s\S]*?<!-- evidencia:fin -->/,
    `<!-- evidencia:inicio -->\n${evidencia}\n<!-- evidencia:fin -->`
  ));

  Object.assign(s, {
    commit_cierre: commitActual().slice(0, 12),
    cerrada_utc: ahora(),
    estado: 'cerrada',
    archivos_tocados: String(tocados.length),
    diff: diff.replace(/\s+/g, ' ').trim(),
    checks: faltas.length ? `FORZADO · ${v.resumen}` : v.resumen,
    hash_estado: huella,
  });
  escribirLedger(ledger);

  const tema = o.tema && o.tema !== true ? o.tema : (s.tema || 'cierre de sesión');
  console.log(verde(`\nSesión ${s.sesion_id} cerrada.`));
  console.log(`  evidencia en ${azul(log)}`);
  console.log(`  registro   en ${azul('state/LEDGER.csv')}`);
  console.log(`  huella de state/: ${huella}\n`);

  const mensaje = `checkpoint: ${hoy()} ${tema}`;
  if (o.commit) {
    git(['add', '-A']);
    git(['commit', '-m', mensaje]);
    console.log(verde(`Commit hecho: ${mensaje}`));
  } else {
    console.log(negrita('Falta el commit de cierre:'));
    console.log(`  git add -A && git commit -m "${mensaje}"\n`);
  }
  console.log(gris('Para que otra herramienta audite esta sesión:'));
  console.log(gris(`  npm run sesion -- auditar ${s.sesion_id} --herramienta <otra herramienta>\n`));
}

// ------------------------------------------------------------------- estado

function estado() {
  const ledger = leerLedger();
  console.log(negrita('\nRegistro de sesiones') + gris(`  ·  ${ramaActual()} · ${commitActual().slice(0, 7)}\n`));

  if (!ledger.length) {
    console.log(gris('  (vacío — abre la primera con: npm run sesion -- abrir --herramienta claude-code)\n'));
    return;
  }
  console.log(gris('  SESIÓN                        ESTADO    CHECKS            AUDITORÍA'));
  for (const s of ledger) {
    const est = s.estado === 'abierta' ? amarillo('abierta ') : verde('cerrada ');
    const aud = s.veredicto
      ? (s.veredicto === 'aprobada' ? verde(s.veredicto) : s.veredicto === 'rechazada' ? rojo(s.veredicto) : amarillo(s.veredicto)) + gris(` por ${s.auditada_por}`)
      : gris('sin auditar');
    console.log(`  ${s.sesion_id.padEnd(30)}${est}  ${(s.checks || '-').padEnd(18)}${aud}`);
  }

  const abiertas = sesionesAbiertas(ledger);
  const cerradas = ledger.filter((s) => s.estado === 'cerrada');
  const ultima = cerradas.at(-1);
  const huella = hashEstado();

  console.log('');
  if (ultima) {
    if (huella === ultima.hash_estado) console.log(verde(`  Huella de state/ intacta desde ${ultima.sesion_id}: ${huella}`));
    else if (abiertas.length) console.log(amarillo(`  state/ modificado en la sesión abierta (${ultima.hash_estado} → ${huella})`));
    else console.log(rojo(`  state/ cambió fuera de sesión: ${ultima.hash_estado} → ${huella}. Abre una sesión y deja constancia.`));
  }
  const sinAuditar = cerradas.filter((s) => !s.veredicto);
  if (sinAuditar.length) console.log(amarillo(`  ${sinAuditar.length} sesión(es) sin auditar: ${sinAuditar.map((s) => s.sesion_id).join(', ')}`));

  const tarea = primeraTarea();
  if (tarea) {
    console.log(negrita('\n  Primera tarea pendiente según el handoff:'));
    console.log(tarea.split('\n').slice(0, 8).map((l) => '    ' + l).join('\n'));
  }
  console.log('');
}

// ------------------------------------------------------------------ auditar

async function auditar(o) {
  const id = o._[1];
  if (!id) { console.error(rojo('Falta el id de la sesión. Míralos con: npm run sesion -- estado')); process.exit(1); }
  const herramienta = exigirHerramienta(o.herramienta, '--herramienta (la TUYA, la del auditor)');

  const ledger = leerLedger();
  const s = ledger.find((x) => x.sesion_id === id);
  if (!s) { console.error(rojo(`No existe la sesión ${id} en state/LEDGER.csv`)); process.exit(1); }

  if (s.herramienta === herramienta && !o['igual-herramienta']) {
    console.error(rojo(`${id} la produjo ${s.herramienta} y tú eres ${herramienta}.`));
    console.error(gris('Quien escribió algo es mal auditor de lo que escribió (AUDITORIA.md §1).'));
    console.error(gris('Audita desde otra herramienta, o repite con --igual-herramienta y quedará registrado.'));
    process.exit(1);
  }

  const rg = rango(s, ledger);
  const log = (rg.vacio
    ? git(['log', '--oneline', '--no-decorate', '-1', rg.rev], { opcional: true })
    : git(['log', '--oneline', '--no-decorate', rg.rev], { opcional: true })) || '(sin commits en el rango)';
  const stat = (rg.vacio
    ? git(['show', '--stat', '--oneline', rg.rev], { opcional: true })
    : git(['diff', '--stat', rg.rev], { opcional: true })) || '(sin diff)';
  const archivos = ((rg.vacio
    ? git(['show', '--name-only', '--format=', rg.rev], { opcional: true })
    : git(['diff', '--name-only', rg.rev], { opcional: true })) || '').split('\n').filter(Boolean);

  console.log('Corriendo la verificación sobre el estado actual...');
  const v = await correrVerificacion();

  const huella = hashEstado();
  const drift = s.hash_estado && huella !== s.hash_estado
    ? `**state/ cambió desde el cierre de esta sesión** (\`${s.hash_estado}\` → \`${huella}\`). Normal si hubo sesiones posteriores; si no las hubo, alguien editó el estado fuera del protocolo.`
    : `Huella de state/ sin cambios desde el cierre (\`${huella}\`).`;

  const declarados = (leerSiExiste(rutaLog(id)) || '').match(/`([^`]+\.(md|csv|mjs|json|yml))`/g) || [];
  const declaradosSet = new Set(declarados.map((x) => x.replace(/`/g, '')));
  const noDeclarados = archivos.filter((a) => !declaradosSet.has(a));

  const errores = v.resultados.flatMap((r) => r.errores.map((e) => `- \`${e.donde || ''}\` — ${e.mensaje} _(control ${r.id})_`));

  const evidencia = [
    `### Lo que dice el registro`, '',
    `| Campo | Valor |`, `| --- | --- |`,
    `| Herramienta | ${s.herramienta} · ${s.modelo || 'modelo no declarado'} |`,
    `| Abierta | ${s.abierta_utc} |`,
    `| Cerrada | ${s.cerrada_utc || '(sigue abierta)'} |`,
    `| Checks al cerrar | ${s.checks || '—'} |`,
    `| Archivos que declaró tocar | ${s.archivos_tocados || '—'} |`,
    `| Diff declarado | ${s.diff || '—'} |`,
    '',
    `### Lo que dice git (${rg.texto})`, '',
    '```', log, '```', '',
    '```', stat.split('\n').slice(-12).join('\n'), '```', '',
    `Archivos tocados en el rango: **${archivos.length}**.`,
    noDeclarados.length
      ? `Archivos que el log de la sesión no menciona: ${noDeclarados.slice(0, 15).map((a) => `\`${a}\``).join(', ')}${noDeclarados.length > 15 ? ' …' : ''}`
      : 'El log menciona todos los archivos del diff.',
    '',
    `### Verificación automática ahora (${ahora()})`, '',
    `Resultado: **${v.resumen}** · ${v.errores} errores · ${v.avisos} avisos.`,
    '',
    errores.length ? errores.join('\n') : '_Sin errores automáticos: lo que quede por encontrar es de los que no detecta un script._',
    '',
    `### Huella de estado`, '', drift,
  ].join('\n');

  const destino = `state/auditorias/${id}--por-${herramienta}.md`;
  escribir(destino, plantilla(leer('templates/auditoria.md'), {
    sesion_id: id,
    herramienta_auditada: s.herramienta,
    herramienta_auditor: herramienta,
    fecha: hoy(),
    rango: rg.texto,
    evidencia,
  }));

  console.log(negrita(`\nInforme de auditoría preparado: ${azul(destino)}\n`));
  console.log('La evidencia ya está adentro. Lo que falta es tuyo:');
  console.log('  1. Responde las cinco preguntas con archivo y línea.');
  console.log('  2. Llena la tabla de hallazgos.');
  console.log('  3. Marca el veredicto y regístralo:\n');
  console.log(gris(`     npm run sesion -- veredicto ${id} --veredicto <aprobada|observaciones|rechazada> --herramienta ${herramienta}\n`));
  if (noDeclarados.length) {
    console.log(amarillo(`Pista: ${noDeclarados.length} archivo(s) del diff no aparecen en el log de la sesión.\n`));
  }
}

// ---------------------------------------------------------------- veredicto

function veredicto(o) {
  const id = o._[1];
  const val = o.veredicto;
  const herramienta = exigirHerramienta(o.herramienta, '--herramienta (la del auditor)');
  const validos = ['aprobada', 'observaciones', 'rechazada'];

  if (!id || !validos.includes(val)) {
    console.error(rojo(`Uso: npm run sesion -- veredicto <sesion-id> --veredicto <${validos.join('|')}> --herramienta <la tuya>`));
    process.exit(1);
  }
  const ledger = leerLedger();
  const s = ledger.find((x) => x.sesion_id === id);
  if (!s) { console.error(rojo(`No existe la sesión ${id}`)); process.exit(1); }

  const informe = o.informe && o.informe !== true ? o.informe : `state/auditorias/${id}--por-${herramienta}.md`;
  if (!existe(informe)) {
    console.error(rojo(`No existe el informe ${informe}.`));
    console.error(gris(`Genéralo antes: npm run sesion -- auditar ${id} --herramienta ${herramienta}`));
    process.exit(1);
  }
  s.auditada_por = herramienta;
  s.veredicto = val;
  s.informe = informe;
  escribirLedger(ledger);

  const c = val === 'aprobada' ? verde : val === 'rechazada' ? rojo : amarillo;
  console.log(`\n${id}: ${c(val)} por ${herramienta} · informe en ${azul(informe)}\n`);
  if (val !== 'aprobada') {
    console.log(gris('Deja lo que haya que corregir en state/HANDOFF.md para la sesión siguiente.\n'));
  }
}

// --------------------------------------------------------------------- main

const ORDENES = { abrir, cerrar, estado, auditar, veredicto };

async function main() {
  const o = args(process.argv.slice(2));
  const orden = o._[0];

  if (!hayGit()) { console.error(rojo('Esto no es un repositorio git. Corre "git init -b main" primero.')); process.exit(1); }
  if (!orden || !ORDENES[orden]) {
    console.log(negrita('\nSistema de handoff entre sesiones\n'));
    console.log('  npm run sesion -- abrir --herramienta <' + HERRAMIENTAS.join('|') + '> [--modelo X] [--tema "..."]');
    console.log('  npm run sesion -- cerrar [--tema "..."] [--commit] [--forzar]');
    console.log('  npm run sesion -- estado');
    console.log('  npm run sesion -- auditar <sesion-id> --herramienta <la tuya>');
    console.log('  npm run sesion -- veredicto <sesion-id> --veredicto <aprobada|observaciones|rechazada> --herramienta <la tuya>\n');
    console.log(gris('  Protocolo completo: AGENTS.md §5 y AUDITORIA.md\n'));
    process.exit(orden ? 1 : 0);
  }
  await ORDENES[orden](o);
}

main();
