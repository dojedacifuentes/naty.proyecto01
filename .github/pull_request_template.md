## Qué cambia

<una o dos frases>

## Verificación

```
npm run verificar
```

- [ ] Sin errores. Si quedan avisos, van explicados abajo.
- [ ] Si toqué `data/`, corrí `npm run umbrales -- --csv` y el CSV quedó al día.
- [ ] Si toqué propuestas, corrí `npm run verificar:red` y revisé **a mano** que cada
      enlace muestre lo que dice (eso no lo hace ningún script).

Avisos que quedan y por qué:

<ninguno / explicación>

## Checklist de cierre (`AGENTS.md` §5)

- [ ] Cerré la sesión con `npm run sesion -- cerrar` (sin `--forzar`)
- [ ] `state/CHECKPOINT.md` actualizado
- [ ] `state/HANDOFF.md` reescrito para quien venga después
- [ ] Decisiones nuevas en `state/DECISIONS.md` con su porqué
- [ ] `state/OPEN-QUESTIONS.md` al día (lo resuelto se marca, no se borra)
- [ ] Log en `state/sessions/AAAA-MM-DD-<herramienta>-NN.md`

## Checklist de contenido

- [ ] Toda afirmación sobre las bases va citada con numeral y página
- [ ] Ningún dato de cliente inventado (los que faltan están marcados `PENDIENTE:`)
- [ ] Ninguna credencial en el diff
- [ ] Si cambié `data/rubrica-subcriterios.csv`, dejé la cita en `DECISIONS.md`

**Herramienta usada:** claude-code / codex / cursor / cowork / chat / humano

**Sesión:** `<sesion-id de state/LEDGER.csv>`

> Quien revise este PR: si el cambio es sustantivo, conviene auditarlo desde otra
> herramienta antes de fusionar — `npm run sesion -- auditar <sesion-id> --herramienta <la tuya>`
