---
name: evidencia-video
description: Graba el video de evidencia del recorrido del participante en un aula LMS de la licitación Talento Digital 2026 (Anexo 2, VIII d) con FFmpeg y grabar.sh, en rol o vista de estudiante, lo recorta y lo deja listo para Drive. Úsala cuando el usuario pida grabar, regrabar o actualizar un video de evidencia, una grabación del aula, un recorrido como estudiante, o cuando cambien enlaces de un aula ya grabada (ABP/ABPRO, quiz, evaluación) y el video quede desactualizado.
---

# Video de evidencia del recorrido del participante

Un video por aula (~1 minuto), 26 en total, ya grabados el 04-10. Muestra el aula como la ve un estudiante:
el curso completo bajando y volviendo arriba, y la apertura de cada tipo de recurso con el clic marcado.

## Archivos

- Grabador: `privado/evidencia-lms/videos/grabar.sh` (bash, FFmpeg gdigrab).
- Ayudas de la página: `privado/evidencia-lms/videos/ayudas-v3.js` (cursor y clic visibles, desplazamiento suave, búsqueda de recursos).
- Salida: `privado/evidencia-lms/videos/<CLI>-<PF>.mp4` con `CLI` = CHC, UNAB, CD o UA. Crudos en `crudo/<nombre>.mkv`.
  Copias para Drive (crf 27, menos de 8 MB) en `videos/subir/`. Los `.mp4` no van a git.
- FFmpeg: `%LOCALAPPDATA%\ffmpeg\ffmpeg-9.0.2-essentials_build\bin\ffmpeg.exe` (no hay winget en este Windows).
- Drive: carpeta «Videos evidencia LMS · Licitación TD 2026» (`1Pf_tWKON4dw2JupGA0FVzEaldvVqMl-A`), privada.

## Preparar

1. Revisa que el aula esté terminada (armar-aula-* y reglas-aula sin NO CUMPLE). Si cambian enlaces después, hay que regrabar.
2. Chrome del usuario **maximizado y al frente**, pantalla 1920×1080. Si no está al frente, se puede forzar con `ShowWindow` de user32 desde PowerShell.
   El recorte de `grabar.sh` asume ese diseño (barra de dirección en y=54, página desde y=222): si cambia la pantalla o las barras, ajusta los `crop`.
3. Entra al curso en rol de estudiante:
   - Moodle: menú del usuario → «Cambiar rol a…» → Estudiante. Anota el rol previo.
   - Canvas: «Vista de estudiante». Canvas mantiene una sola: sal (`POST /courses/<id>/student_view` con `_method=delete`) antes de otro curso.
4. Carga las ayudas: guarda el texto de `ayudas-v3.js` en `localStorage.h` (una vez por sitio) y tras cada navegación ejecuta `eval(localStorage.h)`.

## Grabar

1. Inicia en segundo plano (bloquea hasta 15 min):
   `bash privado/evidencia-lms/videos/grabar.sh inicio UNAB-PF1481` (Bash con `run_in_background`).
2. Recorrido, con las funciones de `ayudas-v3.js`:
   - **Portada**: `T()` baja por todo el curso y vuelve arriba.
   - **Lectura AE1**: `SEC(1)`, luego `G('lect', 1)`; en Rise, `RISE()` pulsa «Comenzar curso»; volver con `R()`.
   - **Quiz**: `G('quiz', 1)`; dentro del SCORM, `Q(selector)` para «Iniciar misión» y una respuesta; `R()`.
   - **Infografía**: `G('info', 1)`; `R()`.
   - **ABP**: `G('abp', 1)` y abrir el enunciado (`K(/…/)` sobre el enlace); `R()`.
   - **Evaluación del módulo**: `G('ev', 1)` y abrir su enunciado.
   `RX` ya conoce los nombres de cada cliente. Deja 1-2 s quieto entre pasos: los tramos quietos se recortan solos.
3. Cierra: `bash privado/evidencia-lms/videos/grabar.sh fin UNAB-PF1481`. Detiene FFmpeg, recorta barra de dirección + página,
   quita los tramos quietos (`mpdecimate`) e imprime la duración.
4. Vuelve al rol normal (Moodle) o sal de la vista de estudiante (Canvas). Si el aula estaba en rol estudiante antes, déjala así.

## Trampas

- No llames ni pises `window.M` (global de Moodle). Las ayudas usan nombres cortos que no chocan; no agregues una `M`.
- En Moodle 4 el scroll puede ser `#page` o la ventana: `E()` lo resuelve mirando `overflowY`.
- Al buscar enlaces, excluir el índice lateral (`#courseindex`, drawers): `FIND` ya lo hace.
- Los enlaces que abren ventana nueva se pasan a la misma pestaña con `P()` (los Docs se abren en `/preview`).
- El botón SCORM «Entrar» tiene `value="normal"`. El «atrás» del flipbook queda dentro de heyzine: vuelve con `R()`.
- El cursor del sistema no se graba (`-draw_mouse 0`): el que se ve es el de `CU()`.

## Subir a Drive

1. Comprime: `ffmpeg -i <CLI>-<PF>.mp4 -c:v libx264 -crf 27 -pix_fmt yuv420p -movflags +faststart subir/<CLI>-<PF>.mp4`.
2. En una pestaña de Drive con la carpeta abierta: input file propio + file_upload (máx. 10 MB por lote) y un `DragEvent` drop sobre la lista.
3. Si ya existía un video con ese nombre, no lo borres: pregunta qué hacer. Compartir la carpeta lo decide el usuario.
4. Avisa al PC 2 por el Tablero de «Coordinación Claude» si regrabaste videos.

## Límites

- Claude no escribe contraseñas: el usuario inicia sesión si hace falta.
- Publicar, borrar, matricular, cambiar permisos o compartir en Drive: solo con OK explícito del usuario en el chat.
- No tocar cursos ajenos. El recorrido no envía tareas ni respuestas que queden como entrega real, salvo el intento del quiz.
- Nunca credenciales en el repo ni en el video (revisa que no se vea una clave ni el gestor de contraseñas).
- Solo el PC 1 graba y sube.

## Verificación

- El `.mp4` dura alrededor de 1 minuto y muestra barra de dirección + página, sin pestañas, marcadores ni barra de tareas.
- Extrae 3-4 cuadros con FFmpeg y míralos: portada, lectura, quiz, ABP y evaluación aparecen; cursor y clic visibles.
- No se ve modo edición, menú de profesor ni datos personales.
- El rol o la vista del curso quedó como estaba antes.
- La copia en `subir/` pesa menos de 8 MB y está en la carpeta de Drive con el nombre `<CLI>-<PF>.mp4`.
