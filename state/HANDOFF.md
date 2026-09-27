# HANDOFF

**De:** claude-code — 2026-09-27
**Para:** la siguiente sesión, sea cual sea

## Contexto mínimo

Se completó G3 del estándar de la contraparte: seis quiz formativos del módulo 2 en Canva,
tres para PF1821 y tres para PF1822. El usuario aprobó primero PF1821 Quiz 2 y esa línea
visual neutra se aplicó al resto. El conector no expone elementos Quiz ni formularios, por
lo que quedaron como presentaciones editables y la interactividad es un paso manual.

## Lo que dejé listo

- `modulo-2/PF1821-agentes-low-code/produccion/ESTADO.md` → fila G3 en `listo para revisión`, con:
  - Quiz 1: https://www.canva.com/d/QKuGCgn_8Y2xSgR
  - Quiz 2: https://www.canva.com/d/-8-n1a6UsY9wOKn
  - Quiz 3: https://www.canva.com/d/hw_CLwkpwHKwzby
- `modulo-2/PF1822-desarrollo-con-ia/produccion/ESTADO.md` → fila G3 en `listo para revisión`, con:
  - Quiz 1: https://www.canva.com/d/MZd1u3ZMa9Y3upm
  - Quiz 2: https://www.canva.com/d/6lppz9fjI2awQl1
  - Quiz 3: https://www.canva.com/d/c_aXfKVPGet6EgP
- Cada diseño tiene 11 páginas: portada, 5 preguntas y 5 retroalimentaciones. Los seis
  nombres, el número de páginas y la presencia de la quinta pregunta y retroalimentación se
  verificaron con Canva después de guardar.
- `state/DECISIONS.md` → registrada la decisión de usar presentaciones editables y dejar
  manual la conversión interactiva.
- Las fuentes `contenidos/<PF>/modulo-2/R-quiz-canva.md` y `produccion/quiz-canva/Quiz-n.txt`
  no cambiaron.

## Lo que NO alcancé y dónde quedó exactamente

- Canva → convertir cada diseño a Quiz interactivo, si la cuenta del usuario ofrece esa
  función. No es posible mediante el conector actual.
- Ambos `produccion/ESTADO.md`, fila G3 → falta revisión humana del texto, legibilidad y
  navegación antes de cambiar el estado desde `listo para revisión`.
- G1, G2, G5, G6 y los pendientes anteriores del módulo siguen como estaban; no formaban
  parte de esta tarea.

## Tu primera tarea

Abrir los seis enlaces de G3 y hacer la revisión humana. Si se decide usar Quiz interactivo,
en cada diseño seleccionar la pregunta, crear el elemento Quiz nativo, copiar las alternativas
y marcar la respuesta que aparece en la página de retroalimentación; mantenerlo sin nota.

## Trampas que me encontré

- La generación inicial de Canva reescribió alternativas y retroalimentaciones incluso con
  una instrucción literal. Se corrigió elemento por elemento; no regenerar sin comparar contra
  `Quiz-n.txt`.
- PowerShell bloquea `npm.ps1`; usar `npm.cmd` para los scripts del repo.
- La lectura de kits de marca requiere `brandkit:read`, pero esta tarea es deliberadamente
  neutra y no lo necesita.
- Hay cambios ajenos a esta sesión en `scripts/marca.mjs` y `templates/marca.json`; se
  preservaron y no deben mezclarse con el commit de los quiz.

## Lo que NO debes tocar

- No reescribir las preguntas en Canva ni en las fuentes: la correcta está marcada en los
  `.txt` y en negrita en `R-quiz-canva.md`.
- No tocar PDF, lecturas, `privado/`, `scripts/marca.mjs`, `templates/marca.json` ni los PPTX
  de video por esta tarea.
- No marcar G3 como terminado: permanece `listo para revisión` hasta la revisión humana.
