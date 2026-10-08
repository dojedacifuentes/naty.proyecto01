---
name: armar-aula-canvas
description: Arma o corrige las aulas 2026 de la U. Autónoma en Canvas (canvas.uautonoma.cl, cursos 113062-113067) con la API desde la pestaña del usuario y los scripts de privado/canvas-uautonoma (armarCanvas, diseño v3, corrección de anexos). Úsala cuando el usuario pida algo en un curso Canvas o de U. Autónoma / UA: armar, rehacer la página de inicio, renombrar con el vocabulario, cambiar enlaces de tareas, infografías, banner, publicar archivos con candado, ocultar pestañas o salir de la vista de estudiante.
---

# Armar o corregir un aula Canvas (U. Autónoma)

Canvas se maneja por su API REST desde una pestaña de canvas.uautonoma.cl con la sesión del usuario
(cookie del Chrome del PC 1, cuenta de Natalia). Los scripts viven en `privado/canvas-uautonoma/` (fuera de git).

## Datos

- Cursos: 113062 PF1822 · 113063 PF1481 · 113064 PF1477 · 113065 PF1479 · 113066 PF1478 · 113067 PF1474.
  Ya están publicados (`available`, no públicos); la cuenta de evaluador está matriculada como estudiante en los 6 (datos en la planilla 02).
- El usuario es AccountAdmin de la subcuenta «Campus Virtual» (1078). Ahí hay 7 cursos de otros programas: no tocarlos.
- Datos de los cursos: `privado/skillnest-moodle/cursos-ua.json` (objeto por PF, cliente `ua`). Banners: `privado/canvas-uautonoma/img/PF*.png`.
- Ingreso: `https://canvas.uautonoma.cl/login/canvas` (`/login` va al ingreso externo). La clave la escribe el usuario.

## Cómo llamar a la API

Todos los scripts usan el mismo encabezado:
`{'X-CSRF-Token': decodeURIComponent(document.cookie.match(/_csrf_token=([^;]+)/)[1]), 'Content-Type': 'application/json'}`
y `fetch('/api/v1/…')`. Pagina con `per_page=100`. Un 403 inesperado suele ser la vista de estudiante activa (ver Trampas).

## Scripts y funciones

- `canvas-builder.js`: `armarCanvas(cid, curso, {banner})` detecta los SCORM ya importados, crea los módulos del plan,
  arma el módulo 2, llama a `paginaUnica(cid, curso)` (página de inicio) y pone el banner.
- `canvas-diseno3.js`: `rasterizar(svgs)` (SVG de `assets/gen.mjs` → `assets/svgs.json`, a PNG en el navegador; Edge headless se cuelga),
  `subirRecursosGraficos(cid, files)` (carpeta «diseno-aula»; devuelve `{nombre: url}`), `disenoV3(cid, curso, img)`
  (inicio y páginas internas; llama a `infografias(cid, curso)`), `actividadFinal(cid, curso, pdf)`.
- `correccion-anexos.js`: `renombrarUA(cid)` (título sin «Especial» y vocabulario UA), `enlaceItemUA(cid, titulo, url)`,
  `imagenesUA(cid)`. Después de renombrar se vuelve a correr `disenoV3`.
- `foro-consultas-canvas.js`: `foroCanvas([cid, …])` (tema fijado + franja en el inicio; no duplica).
- Quiz SCORM: skill subir-scorm.

## Pasos

1. Lee reglas-aula y revisa `state/LEDGER.csv` (otro chat puede estar en el mismo curso).
2. Abre una pestaña propia de canvas.uautonoma.cl en el Chrome del usuario. Si muestra «Vista de estudiante», sal primero.
3. Carga los scripts con un `<input type="file">` creado en la página + file_upload + `eval(await f.text())`.
   Carga `cursos-ua.json` igual y toma `curso = datos['PF1822']`. Los PNG y PDF también por input file (máx. 10 MB por llamada).
4. Curso nuevo: créalo por API **sin** `default_view` (exige página de inicio; `armarCanvas` lo fija después).
   SCORM primero (subir-scorm), después `armarCanvas`.
5. Diseño v3: `rasterizar` → `subirRecursosGraficos` → `disenoV3(cid, curso, img)`.
   Para no volver a subir infografías al rehacer: `window.infografias = async () => []` antes de `disenoV3`.
6. Corre lo largo en segundo plano (`window.__fin`) y lee `window.__log` por trozos (la salida se corta a ~1000 caracteres).
7. Publica los archivos nuevos (ver abajo), verifica y corre reglas-aula.

## Publicar archivos subidos

Todo lo que suben los scripts queda sin publicar y el estudiante ve un candado. Canvas exige derechos de uso:
`PUT /api/v1/courses/<id>/usage_rights` con `file_ids[]`, `use_justification=own_copyright`, `publish=true`.
Como el curso ya está publicado, esto lo ve el estudiante: pide OK antes.

## Decisiones del usuario

- Todo va en **una sola página de inicio**: portada → módulo 1 → módulo 2 desarrollado (fichas por AE con texto,
  criterios y tarjetas a cada recurso) → módulos 3…N. La lista de «Módulos» le parece fea: pestaña oculta, solo soporte.
- Colores U. Autónoma: rojo #D12E2E, gris #3A4B57, letra Lato. Código del curso `TD2026-<PF>`.
- **Sin botón «Iniciar Sesión SENCE»**: lo pone la universidad con su código.
- Tareas ABP/ABPRO/final: visor bajo (450 px) del documento + «Tipo / Qué entregas / Dónde se sube»; sin «enunciado» ni botón suelto.
- Infografías completas sin deslizar (`max-height:78vh`, clic para tamaño completo).
- Pestaña Zoom (`context_external_tool_225`) oculta con `PUT /api/v1/courses/<id>/tabs/context_external_tool_225` `{hidden:true}`.
- Publicar el curso lo hace el usuario.

## Trampas

- **Vista de estudiante**: con ella activa la API da 403 y Canvas mantiene una sola a la vez. Salir con POST
  `/courses/<id>/student_view` con `_method=delete` y el `authenticity_token` de la página.
- Encabezados y enlaces de módulo nacen sin publicar: `armarCanvas` los publica con PUT. En un curso publicado eso es visible: OK antes.
- Enlaces a `/modules/items/<id>` se rompen si cambia el ítem: preferir enlaces a `/assignments/<id>` o `/pages/<url>`.
- Los permisos de Drive de los Docs enlazados no se cambian (43 privados, 57 «cualquiera puede editar»): se informa, no se toca.

## Límites

- Claude no escribe contraseñas.
- Publicar (curso, páginas, tareas, archivos), borrar, matricular y cambiar permisos: solo con OK explícito del usuario en el chat.
- No tocar los otros 7 cursos de la subcuenta 1078 ni la configuración de la cuenta.
- Nunca credenciales en el repo. Solo el PC 1 edita las aulas.

## Verificación

- `GET /api/v1/courses/<id>`: nombre sin «Especial», `default_view: wiki`, imagen del curso.
- `GET /api/v1/courses/<id>/front_page`: portada, módulos en orden, módulo 2 con los AE completos y sus tarjetas.
- Pestañas: «Módulos» y Zoom ocultas.
- Archivos del curso sin candado (ninguno con `locked: true` ni oculto).
- Cada tarea ABP/ABPRO/final enlaza el Doc correcto; quiz «Quiz gamificado del aprendizaje esperado n» publicados.
- Recorre el inicio en «Vista de estudiante» y sal de ella al terminar.
- reglas-aula sin NO CUMPLE.
