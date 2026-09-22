#!/usr/bin/env node
/**
 * Activa los hooks versionados del repo (.githooks/) para esta copia local.
 *
 * Git no versiona .git/hooks, así que cada clon nuevo —cada máquina, cada herramienta—
 * arranca sin hooks. Esto lo resuelve apuntando core.hooksPath al directorio versionado,
 * de modo que el hook sea el mismo para todos y se revise en los diffs como cualquier
 * otro archivo.
 *
 *   npm run hooks
 */
import fs from 'node:fs';
import { git, ruta, verde, gris, rojo } from './lib/repo.mjs';

const DIR = '.githooks';

try {
  git(['config', 'core.hooksPath', DIR]);
} catch (e) {
  console.error(rojo(`No pude configurar core.hooksPath: ${e.message}`));
  process.exit(1);
}

// En Windows el bit de ejecución no aplica; en Linux y macOS sí hace falta.
if (process.platform !== 'win32') {
  for (const f of fs.readdirSync(ruta(DIR))) {
    fs.chmodSync(ruta(DIR, f), 0o755);
  }
}

console.log(verde(`\nHooks activados: core.hooksPath → ${DIR}`));
console.log('  pre-commit: corre "node scripts/verificar.mjs" antes de cada commit.\n');
console.log(gris('  Saltarlo en un caso puntual: git commit --no-verify'));
console.log(gris('  Desactivarlos del todo:      git config --unset core.hooksPath\n'));
