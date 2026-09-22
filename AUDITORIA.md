# AUDITORIA.md — cómo una sesión verifica a otra

Este repositorio lo trabajan sesiones que no comparten memoria: Claude Code hoy, Codex
mañana, una persona el viernes. Ninguna puede ver el chat de la anterior. Lo único que
las conecta son los archivos, y los archivos pueden mentir por omisión.

Este documento define el mecanismo que hace que no importe: **toda sesión deja rastro
comprobable y otra sesión, con otra herramienta, lo revisa contra la realidad del repo.**

Protocolo de trabajo: `AGENTS.md`. Protocolo de revisión: este archivo.

---

## 1. La regla

> **Audita una herramienta distinta de la que produjo el trabajo.**

Quien escribió algo es mal auditor de lo que escribió: repite sus propios supuestos y no
ve sus propios puntos ciegos. Un modelo tiende a validar lo que otro modelo hizo si le
parece razonable; el valor aparece cuando el auditor llega sin el contexto del autor y
solo tiene los archivos.

Alternar funciona así: si produjo Claude Code, audita Codex. Si produjo Codex, audita
Claude Code. `npm run sesion -- auditar` rechaza la auditoría si el auditor declara la
misma herramienta que el autor; se puede forzar con `--igual-herramienta`, y queda escrito
en el registro que se forzó.

## 2. Qué hace el sistema por ti

Al cerrar una sesión, `npm run sesion -- cerrar` guarda en `state/LEDGER.csv`:

| Columna | Para qué sirve al auditar |
| --- | --- |
| `commit_inicio` | delimita el rango de commits atribuibles a esa sesión |
| `commit_cierre` | HEAD al momento de cerrar (el commit de checkpoint viene justo después y es el que contiene esta fila) |
| `archivos_tocados`, `diff` | lo que la sesión **dice** que cambió |
| `checks` | resultado de la verificación automática en ese momento |
| `hash_estado` | huella sha256 de los cuatro archivos de `state/` |
| `auditada_por`, `veredicto`, `informe` | resultado de la revisión |

La huella es la pieza importante. Si alguien edita `state/` sin abrir sesión, la huella
deja de coincidir y tanto `npm run sesion -- estado` como el control 07 lo dicen en voz
alta. No impide el cambio: impide que pase inadvertido.

## 3. Cómo se audita

```bash
npm run sesion -- estado                                   # qué hay sin auditar
npm run sesion -- auditar 2026-09-22-claude-code-01 --herramienta codex
```

Eso genera `state/auditorias/<sesion-id>--por-<herramienta>.md` con la evidencia ya
recopilada: el registro, el `git log` y el `git diff --stat` del rango, los archivos que
el log de la sesión **no** menciona, el resultado de correr la verificación ahora, y si la
huella de `state/` cambió.

Lo que el sistema no puede hacer por ti son las cinco preguntas. Cada una se responde con
archivo y línea:

1. ¿Hay alguna afirmación sobre las bases que **no** esté citada con numeral y página?
2. ¿Hay algún dato de cliente que parezca inventado, es decir, que no salga de `ficha.md`
   ni de `data/clientes.csv`?
3. ¿Alguna propuesta incumple un umbral de `data/rubrica-subcriterios.csv`?
4. ¿Alguna sesión decidió por su cuenta algo que está abierto en `state/OPEN-QUESTIONS.md`?
5. ¿El cierre cumple `AGENTS.md` §5? ¿Podrías retomar el trabajo leyendo solo `state/`,
   sin ver el chat anterior?

Cuando termines:

```bash
npm run sesion -- veredicto 2026-09-22-claude-code-01 --veredicto observaciones --herramienta codex
```

## 4. Los tres veredictos

| Veredicto | Qué significa | Qué pasa después |
| --- | --- | --- |
| `aprobada` | el trabajo se sostiene y el estado permite continuar | nada, sigue el flujo |
| `observaciones` | se puede continuar, pero hay correcciones pendientes | van a `state/HANDOFF.md` como tarea de la sesión siguiente |
| `rechazada` | no se puede construir encima sin corregir antes | el control 07 falla hasta que se corrija y se vuelva a auditar |

Una auditoría **no corrige**. Entrega el informe y espera instrucciones: si el auditor
arregla lo que audita, vuelve a ser juez y parte.

## 5. Cuándo auditar

- Siempre que una sesión cierre trabajo que otra va a usar como base.
- Obligatorio antes de dar por terminado un lote de propuestas (§7 de `AGENTS.md`).
- Obligatorio si el cierre fue forzado (`checks` empieza con `FORZADO`).
- Cada vez que `npm run sesion -- estado` muestre sesiones sin auditar y haya rato libre:
  auditar es trabajo productivo, no burocracia.

## 6. Lo que ningún script detecta

La verificación automática cubre pesos de la rúbrica, conteos, similitud entre propuestas,
credenciales, estructura y coherencia del estado. No cubre:

- Que el LMS muestre **el módulo correcto** del plan formativo correcto.
- Que un dato de cliente sea **verdadero** (solo detecta que falte, no que sea falso).
- Que una narrativa sea **buena**, solo que no sea un duplicado de otra.
- Que una decisión registrada en `DECISIONS.md` haya sido **acertada**.

Esas cuatro son exactamente lo que tiene que mirar una persona o una sesión auditora.
Un repositorio con todos los checks en verde y un LMS mostrando el módulo equivocado es
una propuesta rechazada (`docs/04-verificadores-protocolo.md`).
