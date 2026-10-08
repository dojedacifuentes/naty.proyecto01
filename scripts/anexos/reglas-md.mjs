// Genera sistema/REGLAS.md desde data/reglas/reglas.json (la fuente única de las reglas).
// Uso: npm run reglas
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const R = JSON.parse(fs.readFileSync(path.join(raiz, 'data/reglas/reglas.json'), 'utf8'));
const SEV = { critica: 'Crítica', mayor: 'Mayor', menor: 'Menor' };
const VER = { auto: 'Automática', parcial: 'Parcial', manual: 'Manual', proceso: 'Proceso' };
const AMB = { anexo: 'Anexo', aula: 'Aula', ambos: 'Anexo y aula' };
const celda = (s) => String(s).replace(/\|/g, '\\|').replace(/</g, '&lt;');
const cuenta = (k) => Object.entries(R.reglas.reduce((m, r) => ({ ...m, [r[k]]: (m[r[k]] || 0) + 1 }), {}));

const md = [
  `# Reglas del sistema Aulas y Anexos`, '',
  `Versión ${R.version} · ${R.fecha} · responsable: ${R.responsable} · generado desde [\`data/reglas/reglas.json\`](../data/reglas/reglas.json) con \`npm run reglas\`.`, '',
  `**${R.reglas.length} reglas.** Por verificación: ${cuenta('verificacion').map(([k, n]) => `${VER[k]} ${n}`).join(' · ')}. Por severidad: ${cuenta('severidad').map(([k, n]) => `${SEV[k]} ${n}`).join(' · ')}.`, '',
  `- **Severidad**: ${R.como_leer.severidad}.`,
  `- **Verificación**: ${R.como_leer.verificacion}.`,
  `- **Chequeos**: IDs de [\`scripts/anexos/verificar-anexos.mjs\`](../scripts/anexos/verificar-anexos.mjs) que revisan la regla en los anexos.`, '',
];
for (const g of [...new Set(R.reglas.map((r) => r.grupo))]) {
  md.push(`## ${g}`, '', '| ID | Regla | Severidad | Ámbito | Verificación | Chequeos | Origen |', '|---|---|---|---|---|---|---|');
  for (const r of R.reglas.filter((x) => x.grupo === g)) {
    md.push(`| ${r.id} | ${celda(r.texto)} | ${SEV[r.severidad]} | ${AMB[r.ambito]} | ${VER[r.verificacion]} | ${r.comprobadores.join(', ') || '—'} | ${celda(r.origen)} |`);
  }
  md.push('');
}
fs.writeFileSync(path.join(raiz, 'sistema/REGLAS.md'), md.join('\n'));
console.log(`sistema/REGLAS.md · ${R.reglas.length} reglas`);
