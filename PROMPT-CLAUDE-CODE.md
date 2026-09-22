# Prompt de arranque

Dos prompts. El **A** crea el repositorio en GitHub una sola vez. El **B** es el que se
pega al empezar **cada** sesión nueva, en la herramienta que sea.

---

## PROMPT A — crear el repositorio (una sola vez)

> Pégalo en Claude Code o Codex, en el directorio donde descomprimiste el ZIP.

```
Este directorio contiene el esqueleto de un repositorio de trabajo para una licitación
pública chilena (SENCE Becas Laborales Talento Digital 2026). Necesito subirlo a GitHub
como repositorio PRIVADO y dejarlo listo para que varias sesiones y herramientas
distintas (tú, Codex, Cursor, o yo a mano) puedan trabajar sobre él sin pisarse.

Haz esto, en orden, y no avances a un paso si el anterior falló:

1. Lee AGENTS.md completo. Es el contrato operativo del repo y también te aplica a ti.

2. Verifica el entorno:
   - `git --version` y `gh --version`
   - `gh auth status`. Si no estoy autenticado, dímelo y detente: no intentes
     autenticarme tú ni pidas un token por chat.

3. Inicializa el repositorio:
   - `git init -b main`
   - Verifica que .gitignore existe y que `git status` NO lista ningún PDF, .env ni
     archivo con credenciales. Si lista alguno, detente y avísame.
   - `git add -A` y un primer commit: "init: esqueleto de trabajo licitación TD 2026"

4. Créalo en GitHub con `gh repo create licitacion-td-2026 --private --source=. --push`.
   Si el nombre ya existe, avísame en vez de inventar otro.

5. Protege el trabajo colaborativo:
   - Crea las etiquetas: `fase-0`, `fase-1-motor`, `fase-2-produccion`,
     `bloqueado`, `pregunta-abierta`, `verificadores`.
   - Abre un issue por cada entrada ABIERTA de state/OPEN-QUESTIONS.md, con el mismo
     título y el mismo texto, etiquetado `pregunta-abierta`. Las marcadas CRÍTICA
     además llevan `bloqueado`.
   - Crea el hito "Fase 0 — Reconocimiento" y asígnalo a los issues que correspondan.

6. Verifica y reporta:
   - `python3 scripts/calcular_umbrales.py` debe imprimir 15 planes.
   - `python3 scripts/auditar_verificadores.py` debe salir limpio diciendo que todavía
     no hay propuestas.
   - Dame la URL del repo, la lista de issues creados, y confirma que ningún archivo
     sensible quedó versionado.

7. Cierra según AGENTS.md §5: actualiza state/CHECKPOINT.md, reescribe
   state/HANDOFF.md, y deja tu log en state/sessions/.

Reglas: no inventes datos sobre las bases ni sobre los clientes. Si algo no está en el
repo, va a state/OPEN-QUESTIONS.md, no a una suposición. No resuelvas por tu cuenta
ninguna pregunta que ya esté ahí abierta.
```

---

## PROMPT B — empezar cualquier sesión (el que vas a usar siempre)

> Sirve igual en Claude Code, Codex o Cursor. Cambia solo el nombre de la herramienta.

```
Trabajo en el repositorio licitacion-td-2026 (licitación SENCE Talento Digital 2026).
Varias sesiones y herramientas distintas trabajan sobre él, así que el estado vive en
archivos, no en tu memoria ni en este chat.

Antes de hacer nada, lee en este orden y dime en 5 líneas qué entendiste:
  1. AGENTS.md            — el contrato operativo, te aplica entero
  2. state/CHECKPOINT.md  — dónde quedó todo
  3. state/HANDOFF.md     — qué tengo que hacer yo
  4. state/OPEN-QUESTIONS.md — sobre qué NO puedo decidir

Después ejecuta la "primera tarea" que indique el HANDOFF. Si el HANDOFF está vacío o
desactualizado, dímelo en vez de improvisar una tarea.

Mientras trabajas:
  - Toda afirmación sobre las bases se cita con numeral y página.
  - Ningún dato de cliente se inventa: lo que falta se marca PENDIENTE:.
  - Ninguna credencial entra al repo.
  - Si descubres que un umbral de data/rubrica-subcriterios.csv está mal, corrígelo ahí
    y deja la cita en state/DECISIONS.md.

Al terminar, cierra según AGENTS.md §5 en un commit `checkpoint: <fecha> <tema>`:
CHECKPOINT, HANDOFF, DECISIONS, OPEN-QUESTIONS y un log en state/sessions/ identificando
la herramienta que usaste.

Mi herramienta en esta sesión: <claude-code | codex | cursor | chat>
```

---

## PROMPT C — auditar desde otra herramienta

> Para revisar con ojos frescos lo que produjo otra sesión. Funciona bien alternando:
> si produjo Claude Code, audita Codex, y al revés.

```
Vas a auditar trabajo hecho por otra sesión en el repositorio licitacion-td-2026.
No lo continúes: audítalo.

Lee AGENTS.md, state/CHECKPOINT.md, state/DECISIONS.md y el último log de
state/sessions/. Luego revisa los últimos commits con `git log --oneline -20` y
`git diff`.

Responde estas cinco preguntas, cada una con evidencia concreta (archivo y línea):

1. ¿Hay alguna afirmación sobre las bases que NO esté citada con numeral y página?
2. ¿Hay algún dato de cliente que parezca inventado, es decir, que no salga de
   ficha.md ni de data/clientes.csv?
3. ¿Alguna propuesta incumple un umbral de data/rubrica-subcriterios.csv?
4. ¿Alguna sesión decidió por su cuenta algo que está abierto en
   state/OPEN-QUESTIONS.md?
5. ¿El cierre de la última sesión cumple AGENTS.md §5? ¿Podrías retomar el trabajo
   leyendo solo state/, sin ver el chat anterior?

No corrijas nada todavía. Entrega el informe y espera instrucciones. Si encuentras algo
grave, dímelo primero y en una línea.
```

---

## Por qué está partido en tres prompts

El A crea infraestructura una vez. El B es el que hace que el trabajo sea continuable:
obliga a cada sesión a leer el estado antes de tocar nada y a dejarlo escrito al salir.
El C existe porque **quien escribió algo es mal auditor de lo que escribió**: alternar
herramientas para auditar detecta errores que una sola herramienta repite
sistemáticamente.

## Si prefieres no usar `gh`

Crea el repositorio vacío y privado a mano en github.com, y reemplaza el paso 4 del
prompt A por:

```
git remote add origin git@github.com:<usuario>/licitacion-td-2026.git
git push -u origin main
```
