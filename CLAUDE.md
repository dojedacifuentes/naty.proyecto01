# Instrucciones para Claude Code

Este proyecto usa **`AGENTS.md`** como contrato operativo único, para que funcione
igual con Claude Code, Codex, Cursor u otra herramienta.

**Lee `AGENTS.md` completo antes de hacer cualquier cosa.** No dupliques reglas aquí:
si algo hay que cambiar, se cambia en `AGENTS.md`.

Después de `AGENTS.md`, lee en este orden:
1. `state/CHECKPOINT.md`
2. `state/HANDOFF.md`
3. `state/OPEN-QUESTIONS.md`

## Lo mínimo operativo

```bash
npm run sesion -- abrir --herramienta claude-code --tema "<tema>"   # antes de tocar nada
npm run verificar                                                   # mientras trabajas
npm run sesion -- cerrar --tema "<tema>"                            # al terminar
```

Te identificas como `claude-code`. Eso importa: la auditoría cruzada (`AUDITORIA.md`)
exige que quien revise una sesión sea una herramienta distinta de la que la produjo, así
que lo que tú cierres lo auditará Codex o una persona, no otra sesión tuya.
