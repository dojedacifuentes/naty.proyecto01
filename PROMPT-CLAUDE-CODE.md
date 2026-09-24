# Prompts de arranque

Tres prompts. El **A** publica el repositorio en GitHub, una sola vez. El **B** se pega al
empezar **cada** sesión, en la herramienta que sea. El **C** sirve para auditar, desde una
herramienta, lo que produjo otra.

El repositorio local ya existe y ya tiene su historia de commits: estos prompts asumen que
estás dentro de él.

---

## PROMPT A — publicar en GitHub (una sola vez)

> Requiere `gh` (GitHub CLI) instalado y autenticado.

```
Este repositorio ya está inicializado localmente y tiene commits. Necesito publicarlo en
GitHub como repositorio PRIVADO y dejarlo listo para que varias sesiones y herramientas
distintas trabajen sobre él sin pisarse.

Haz esto en orden, y no avances a un paso si el anterior falló:

1. Lee AGENTS.md completo. Es el contrato operativo del repo y también te aplica a ti.

2. Verifica el entorno:
   - `git --version`, `node --version` (>= 18) y `gh --version`
   - `gh auth status`. Si no estoy autenticado, dímelo y detente: no intentes
     autenticarme tú ni me pidas un token por chat.

3. Comprueba que no haya nada sensible versionado:
   - `npm run verificar` debe terminar sin errores (el control 05 revisa esto).
   - `git ls-files` no debe listar ningún PDF fuera de `bases/` y `entregables/`, ni
     archivos de credenciales.
   Si algo falla, detente y avísame.

4. Publícalo en el remoto ya definido (DECISIONS.md, 2026-09-24):
   `git remote add origin https://github.com/dojedacifuentes/naty.proyecto01.git`
   El repo es público por decisión del usuario (DECISIONS.md, 2026-09-24): antes de
   empujar, confirma que nada de lo versionado deba quedar privado. Luego `git push -u origin main`.

5. Protege el trabajo colaborativo:
   - Etiquetas: `fase-0`, `fase-1-motor`, `fase-2-produccion`, `bloqueado`,
     `pregunta-abierta`, `verificadores`.
   - Un issue por cada entrada ABIERTA de state/OPEN-QUESTIONS.md, con el mismo título y
     el mismo texto, etiquetado `pregunta-abierta`. Las CRÍTICA además con `bloqueado`.
   - Hito "Fase 0 — Reconocimiento", asignado a los issues que correspondan.
   - Verifica que el workflow .github/workflows/verificar.yml aparezca en Actions.

6. Repórtame: URL del repo, issues creados, estado del primer run de Actions, y
   confirmación de que ningún archivo sensible quedó versionado.

7. Cierra la sesión según AGENTS.md §5 (`npm run sesion -- cerrar`).

Reglas: no inventes datos sobre las bases ni sobre los clientes. Lo que no esté en el
repo va a state/OPEN-QUESTIONS.md, no a una suposición. No resuelvas por tu cuenta
ninguna pregunta que ya esté ahí abierta.
```

---

## PROMPT B — empezar cualquier sesión (el que vas a usar siempre)

> Sirve igual en Claude Code, Codex o Cursor. Cambia solo el nombre de la herramienta.

```
Trabajo en el repositorio licitacion-td-2026 (licitación SENCE Talento Digital 2026).
Varias sesiones y herramientas distintas trabajan sobre él, así que el estado vive en
archivos, no en tu memoria ni en este chat.

Empieza así:

  npm run hooks        (si es la primera vez en esta copia)
  npm run sesion -- abrir --herramienta <claude-code|codex|cursor|chat> --tema "<tema>"

Ese comando te dirá cuál es tu primera tarea. Antes de ejecutarla, lee en este orden y
dime en 5 líneas qué entendiste:
  1. AGENTS.md                — el contrato operativo, te aplica entero
  2. state/CHECKPOINT.md      — dónde quedó todo
  3. state/HANDOFF.md         — qué tengo que hacer yo
  4. state/OPEN-QUESTIONS.md  — sobre qué NO puedo decidir

Si el HANDOFF está vacío o desactualizado, dímelo en vez de improvisar una tarea.

Mientras trabajas:
  - Toda afirmación sobre las bases se cita con numeral y página.
  - Ningún dato de cliente se inventa: lo que falta se marca PENDIENTE:.
  - Ninguna credencial entra al repo.
  - Si descubres que un umbral de data/rubrica-subcriterios.csv está mal, corrígelo ahí
    y deja la cita en state/DECISIONS.md.
  - `npm run verificar` cuando quieras saber si rompiste algo. Es rápido.

Al terminar:
  npm run verificar
  npm run sesion -- cerrar --tema "<tema>"
  git add -A && git commit -m "checkpoint: <fecha> <tema>"

El cierre se niega si no actualizaste CHECKPOINT, HANDOFF y tu log, o si quedan errores.
No lo saltes con --forzar salvo que tengas una razón que puedas defender por escrito.
```

---

## PROMPT C — auditar desde otra herramienta

> Alterna: si produjo Claude Code, audita Codex, y al revés. El sistema rechaza que una
> herramienta se audite a sí misma.

```
Vas a auditar trabajo hecho por otra sesión en el repositorio licitacion-td-2026.
No lo continúes: audítalo.

  npm run sesion -- estado                                  (qué hay sin auditar)
  npm run sesion -- auditar <sesion-id> --herramienta <la tuya>

Eso te deja en state/auditorias/ un informe con la evidencia ya recopilada: el registro
de la sesión, el git log y el diff del rango, los archivos del diff que el log NO
menciona, el resultado de correr la verificación ahora, y si la huella de state/ cambió.

Lee AGENTS.md, AUDITORIA.md, state/DECISIONS.md y el log de la sesión auditada. Después
responde en el informe las cinco preguntas, cada una con evidencia concreta (archivo y
línea):

1. ¿Hay alguna afirmación sobre las bases que NO esté citada con numeral y página?
2. ¿Hay algún dato de cliente que parezca inventado, es decir, que no salga de ficha.md
   ni de data/clientes.csv?
3. ¿Alguna propuesta incumple un umbral de data/rubrica-subcriterios.csv?
4. ¿Alguna sesión decidió por su cuenta algo que está abierto en
   state/OPEN-QUESTIONS.md?
5. ¿El cierre cumple AGENTS.md §5? ¿Podrías retomar el trabajo leyendo solo state/, sin
   ver el chat anterior?

No corrijas nada. Entrega el informe, registra el veredicto:

  npm run sesion -- veredicto <sesion-id> --veredicto <aprobada|observaciones|rechazada> --herramienta <la tuya>

y espera instrucciones. Si encuentras algo grave, dímelo primero y en una línea.
```

---

## Por qué está partido en tres prompts

El A crea infraestructura una vez. El B es el que hace que el trabajo sea continuable:
obliga a cada sesión a leer el estado antes de tocar nada y a dejarlo escrito al salir.
El C existe porque **quien escribió algo es mal auditor de lo que escribió**: alternar
herramientas para auditar detecta errores que una sola herramienta repite
sistemáticamente.

La diferencia con la primera versión de este archivo es que ahora los tres apoyan en
comandos que verifican, en vez de confiar en que el agente se acuerde. Un prompt se puede
ignorar; `npm run sesion -- cerrar` no cierra si falta el handoff.

## Si prefieres no usar `gh`

Crea el repositorio vacío y privado a mano en github.com, y reemplaza el paso 4 del
prompt A por:

```
git remote add origin git@github.com:<usuario>/licitacion-td-2026.git
git push -u origin main
```
