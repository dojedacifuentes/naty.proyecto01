# HANDOFF

**De:** claude-code — 2026-09-27
**Para:** la siguiente sesión, sea cual sea

## Contexto mínimo

Los seis quiz formativos del módulo 2 ya existen en Canva y también quedaron exportados como PDF en un ZIP local ordenado. Cada archivo tiene 11 páginas: portada, cinco preguntas y cinco retroalimentaciones. Las fuentes textuales y los diseños de Canva no se modificaron en esta sesión.

## Lo que dejé listo

- `entregables/quiz-modulo-2-canva-PF1821-PF1822.zip` — paquete final con 6 PDF y `LEEME.md`.
- `entregables/quiz-modulo-2-canva/PF1821/` — Quiz 1, 2 y 3, numerados 01–03.
- `entregables/quiz-modulo-2-canva/PF1822/` — Quiz 1, 2 y 3, numerados 01–03.
- `entregables/quiz-modulo-2-canva/LEEME.md` — índice y enlaces editables de Canva.
- Verificación local: los seis PDF tienen 11 páginas; el ZIP contiene exactamente 7 entradas.

## Lo que NO alcancé y dónde quedó exactamente

- La conversión a elemento Quiz interactivo sigue siendo manual en Canva: el conector no expone esa función.
- G3 permanece `listo para revisión` en ambos `produccion/ESTADO.md`; falta la revisión humana antes de marcarlo terminado.
- Los demás pendientes del módulo 2 no formaron parte de esta solicitud.

## Tu primera tarea

Abrir `entregables/quiz-modulo-2-canva-PF1821-PF1822.zip` y hacer la revisión humana de los seis PDF. Si se requiere interactividad, usar los enlaces de `LEEME.md` para convertir cada pregunta en el elemento Quiz nativo de Canva.

## Trampas que me encontré

- Canva puede responder 503 al abrir varios diseños seguidos; reintentar después de unos segundos funciona.
- En el navegador integrado, usar el enlace `aquí` de la pantalla «Completado» es más confiable que esperar la descarga automática.
- PowerShell bloquea `npm.ps1`; usar `npm.cmd`.
- Hay cambios ajenos en `scripts/marca.mjs`, `scripts/produccion.mjs` y `templates/marca.json`; no mezclarlos con este commit.

## Lo que NO debes tocar

- No reescribir preguntas ni respuestas en Canva o en las fuentes.
- No tocar lecturas, branding, `privado/`, PPTX de video ni otros recursos por esta tarea.
- No marcar G3 como terminado hasta completar la revisión humana.
