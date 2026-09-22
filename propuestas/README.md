# propuestas/

Un directorio por combinación **cliente × plan formativo**.

```
propuestas/<cliente-slug>/<codigo-plan>/
  ├── anexo2.md          ← copia de templates/anexo2-esqueleto.md
  ├── ficha.md           ← copia de templates/ficha-cliente.md (una por cliente, symlink o copia)
  ├── verificadores.md   ← copia de templates/verificadores.md
  └── qa.md              ← copia de templates/qa.md
```

Slugs fijos: `skillnest`, `u-autonoma`, `unab`, `chile-conductores`, `cft-cenco`, `cft-pucv`.
Códigos de plan: ver `data/planes-formativos.csv`.

Ejemplo: `propuestas/skillnest/PF1481/anexo2.md`

## Antes de crear el primer directorio

Espera a que se resuelva `state/OPEN-QUESTIONS.md` #3 (matriz real cliente × plan). No
tiene sentido crear 90 carpetas si el reparto real son 45.

## Producción por lotes

Se genera **por cliente completo**, no por plan, para que cada cliente mantenga una voz
consistente a lo largo de sus 15 propuestas. Ver `AGENTS.md` §6.
