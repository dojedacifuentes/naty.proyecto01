---
name: subir-scorm
description: Genera y sube paquetes SCORM (lecturas Rise y el quiz gamificado del módulo 2) a las aulas Moodle (Skillnest, UNAB, Chile Capacitación) y Canvas U. Autónoma (herramienta SCORM scone) de la licitación Talento Digital 2026. Úsala cuando el usuario pida regenerar o cambiar un quiz, subir o reemplazar un SCORM o un Rise, arreglar un quiz que «no se ve» o «hay que desplegar», o reemplazar un Genially por el juego, en cualquier aula.
---

# Subir paquetes SCORM (Rise y quiz gamificado)

Dos tipos de paquete:
- **Lectura Rise** por aprendizaje esperado, con la marca del cliente: `privado/rise-scorm/<Skillnest|UNAB|U-Autonoma>/`.
- **Quiz gamificado** por aprendizaje esperado (5 preguntas, misión con niveles), generado en el repo.

Nombre en el aula, siempre: **«Quiz gamificado del aprendizaje esperado n»** (Quiz n = AE n).

## Generar el quiz

```bash
npm run quiz-juego                    # todos los cursos
npm run quiz-juego -- PF1481 PF1483   # solo esos
```

- Fuente: `contenidos/<PF>/modulo-2/R-quiz-canva.md` (preguntas, misión, insignias). En cursos con kit, el GIFT sale de
  `npm run produccion -- <PF>`; córrelo antes si cambiaron las preguntas. Los Entry PF1477/78/79 usan la fuente de PF1474.
- Salida: `modulo-2/<carpeta>/entrega/quiz/M2-Quiz-n-Juego.html` y `M2-Quiz-n-Juego-SCORM.zip` (SCORM 1.2, nota 0-100).
- Plantilla: `scripts/lib/quiz-juego.html` (modo compacto para marcos bajos). Lector GIFT: `scripts/lib/quiz-gift.mjs`.
- El script se detiene si falta misión, insignia o si un quiz no trae 5 preguntas con una correcta: corrige la fuente, no el script.
- Para subir varias aulas, copia los zips con prefijo `<PF>-Quiz-n.zip` a `privado/quiz-subida-v2/` (ahí están los vigentes).

## Moodle (Skillnest 4.5, UNAB 4.x, Chile Capacitación 3.8)

Carga el script en una pestaña del Moodle con sesión (input file + `eval`; ver armar-aula-moodle) y entrega los zips
por input file (máx. 10 MB por llamada).

- **Quiz nuevo en el lugar del Genially**: `privado/quiz-scorm-moodle.js`.
  `window.__zips = {1: File, 2: File, …}` y luego `quizScormMoodle(cid)` (4.x) o `quizScormMoodle3(cid)` (3.8).
  Varias aulas: `quizScormVarios(archivos, {cid: 'PF…'}, moodle3)`. No repite un AE que ya tiene su SCORM; borra la URL vieja.
- **Cambiar paquete y visualización de un quiz ya subido**: `privado/quiz-scorm-actualizar.js`.
  `quizScormActualizar(cid)`, `quizScormActualizarVarios(archivos, {cid: 'PF…'})` o `quizScormActualizarCm(cm, archivo)`.
  Ajustes que deja: `popup 0`, `skipview 2`, `hidebrowse 1`, `hidetoc 3`, `nav 0`, `displayattemptstatus 0`,
  `displaycoursestructure 0`, ancho 100 %, alto 680. No toca nombre, descripción, completitud ni nota.
- **Rise**: lo suben los armadores (`archivos.rise1..`) como Paquete SCORM, con `scormtype local`.
- Trampas: `skipview` solo se nota con rol de estudiante. Si dice «sin permiso (Gestionar actividades)», la sesión está en
  «Cambiar rol»: vuelve al rol normal. En UNAB no existe `cm_delete`: el borrado va por `/course/mod.php?delete=…&confirm=1&sesskey=…`
  y solo con OK. El curso 125 de CHC no se toca.

## Canvas U. Autónoma (herramienta SCORM «scone», tool id 262)

1. Desde una pestaña de canvas.uautonoma.cl con sesión:
   `GET /api/v1/courses/<cid>/external_tools/sessionless_launch?id=262&launch_type=course_navigation`.
2. Navega la `url` resultante en una **pestaña nueva** (la URL trae `?code=`). Scone carga con un `input[type=file]` múltiple:
   súbele los zips con file_upload (menos de 10 MB por llamada).
3. Importa **de a uno**: en el `<select>` del paquete elige «Importar como página» (Rise) o «tarea no calificada» (quiz)
   y pulsa «Ir». El select solo responde a form_input, no a JS. En lote falla.
4. No recargues la pestaña de scone: pierde la autorización. Si pasa, vuelve al paso 1.
5. Scone no reemplaza paquetes: un quiz nuevo se importa como tarea nueva. Después, en la pestaña de Canvas:
   - primera vez (reemplazar Genially): `privado/canvas-uautonoma/quiz-scorm-canvas.js` → `quizScormCanvas(cid)`;
   - cambio de paquete: `privado/canvas-uautonoma/quiz-scorm-canvas-v2.js` → `quizScormCanvasCambiar(cid)` y luego
     `quizScormCanvasEnlacesItems(cid)` para reparar enlaces `/modules/items/<id>` del inicio.
   El clasificador bloqueó antes `quiz-scorm-canvas-v2.js`: si vuelve a pasar, el usuario lo autoriza o lo ejecuta.
6. Los scripts renombran y **publican** la tarea nueva y cambian módulo e inicio. El curso está publicado: pide OK antes.

## Límites

- Claude no escribe contraseñas.
- Publicar, borrar, matricular y cambiar permisos: solo con OK explícito del usuario en el chat.
- No tocar cursos ajenos (curso 125 de CHC, los otros 7 cursos de la subcuenta Canvas 1078).
- Nunca credenciales en el repo. Solo el PC 1 sube a las aulas.

## Verificación

- `npm run quiz-juego` terminó sin errores y los zips tienen la fecha de hoy; cada zip pesa menos de 10 MB.
- En cada aula hay un «Quiz gamificado del aprendizaje esperado n» por AE, en el lugar del
  enlace anterior, sin el Genially viejo.
- Moodle: abre un quiz con «Cambiar rol a… Estudiante»: entra directo al juego, sin índice lateral ni barra SCORM, y cabe sin desplegar. Vuelve al rol normal.
- Canvas: la tarea abre el juego completo en el marco de 450 px; módulo e inicio apuntan a la tarea nueva; sin enlaces rotos.
- reglas-aula sobre los nombres y descripciones.
