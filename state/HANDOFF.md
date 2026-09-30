# HANDOFF

**De:** claude-code (opus-5.5) · sesiones `2026-09-24-claude-code-01` a `-06`, `2026-09-25-claude-code-01` a `-13` y
`2026-09-27-claude-code-01` a `-18`, `2026-09-28-claude-code-01` a `-04` y `2026-09-29-claude-code-01` a `-04` — 2026-09-24/29
(sobre el handoff de las sesiones `2026-09-22-claude-code-01` y `-02`, que sigue vigente abajo)
**Para:** la siguiente sesión, sea cual sea, **incluida otra IA sin terminal**

> **Ojo (sesión -04):** las sesiones -02 y -03 del 27-sep, que armaron los quiz en Canva, reemplazaron este archivo
> por uno corto y se perdió lo acumulado. Se reconstruyó desde el commit `65c51c8`. **Al cerrar, edita este archivo:
> no lo reemplaces entero.**

## HECHO (sesión 2026-09-30-06): texto canónico del módulo 2 de PF1821 y PF1822, para cotejar Rise

- **`npm run canonico`** → `entregables/2026-09-30-texto-canonico-modulo2/` (Excel y HTML). El usuario generó en Rise 360 un curso por
  aprendizaje esperado y Rise cambió palabras y títulos; la planilla tiene una pestaña por aprendizaje: pega el texto de Rise en D y la
  columna E dice si coincide. **Si SIPFOR cambia**, regenerar: el script se detiene si algún texto no está en el PDF oficial.
- **Fuente del texto:** los campos crudos de SIPFOR (`data/sipfor/<plan>/modulo-<código>.json`), no `data/planes/`, que parte los
  contenidos por viñeta y pierde detalles visibles en el PDF (dos viñetas en una línea en PF1822 AE1, "EXPRESIONES N8N: SINTAXIS Y
  FUNCIONES." sin asterisco en PF1821 AE3, los dos puntos del título de cada unidad).
- **El PDF oficial se descarga sin sesión:** `curl -L "https://sipfor.sence.cl/Planes/PDFPlan.aspx?id=<plan id>"` (3934 = PF1821,
  3935 = PF1822; el id está en `data/sipfor/<plan>/plan.json`, `PK_RUP_PLA_ID`). El texto se saca con `pdftotext -enc UTF-8 -raw`
  (viene con Git for Windows); sin `-raw`, pdftotext borra el guion de "ZERO-" al final de una línea. Sirve también para la #24.
- **Rarezas que están así en el plan** (no "corregirlas" en Rise): "REQUEST–RESPONSE" con guion largo y la competencia del módulo de
  PF1822 sin punto final; el criterio 3.1 de PF1821 repite el AE3. La planilla las marca en "Ojo con esto".
- **Siguiente paso natural:** que el usuario coteje los 8 cursos de Rise. Si comparte el contenido de Rise (exportado o en Review 360),
  se puede cotejar automáticamente contra `data/sipfor/`.

## HECHO (sesión 2026-09-30-05): exigencias 2026 del módulo 2 en Excel, PDF y la planilla de seguimiento

- **`npm run exigencias`** reemplaza a `npm run requisitos` (sesión -04; el script se renombró). Salidas: `entregables/2026-09-30-exigencias-modulo2/`
  (Excel y PDF públicos, sin enlaces privados) y `privado/drive/` (con enlaces a Drive 2024, y la hoja única para importar).
- **Planilla de seguimiento:** pestaña "Exigencias 2026 M2" (gid 1792720012, en `privado/drive/enlaces.json` → `planillaSeguimiento`).
  **Si cambia el generador:** borrar esa pestaña e importar de nuevo `privado/drive/Hoja-Exigencias-2026-M2.xlsx` (Archivo → Importar →
  Subir → "Insertar nuevas hojas", sin "Importar tema"). Después de importar se ensancharon a mano las columnas B (95 px) y D (120 px);
  el generador ya trae esos anchos. Google deja una copia del xlsx en Mi unidad en cada importación.
- **Cómo se subió el archivo al selector de Google** (Claude in Chrome): el selector está en un iframe del mismo origen
  (`docs.google.com/picker`) y su `input[type=file]` no aparece en `find`. Se creó un `input[type=file]` visible en la página
  principal, se llenó con `file_upload` y, con `javascript_tool`, se copió su archivo al input del iframe (`DataTransfer` del iframe)
  y se despachó `change`.
- **Verbo, objeto y condición:** `scripts/lib/verbos.mjs`. El corte es automático (primera marca de "cómo o para qué"); se revisó a mano
  sobre los 278 textos (`.scratch/probar-verbos.mjs` lo lista).
- **Para ver un PDF como imagen** sin poppler: la API de Windows `Windows.Data.Pdf` desde PowerShell 5.1 (AsTask por reflexión); así
  se revisaron las 49 páginas.
- **Siguiente paso natural:** abrir cada "Contenido M2" de 2024 y llenar las 3 columnas de revisión (en la pestaña de Google o en el Excel).

## HECHO (sesión 2026-09-30-04): qué exige 2026 del módulo 2, contrastado con 2024

- **`npm run requisitos`** → `privado/drive/Requisitos-Modulo2-TD2026.xlsx` (se entregó como archivo; **no está en Drive**). Pestañas:
  Resumen, Qué exigen las bases (con numeral y página), Verbos, Cambios 2024-2026, una por módulo 2 (12) y Fuentes. En cada pestaña de
  curso, una fila por criterio: verbo y nivel (Bloom revisada, `data/verbos-bloom.csv`), qué tiene que demostrar el participante, qué
  necesita un recurso para servir, herramientas que nombra el plan, cambio respecto de 2024 y **3 columnas vacías** (recurso 2024 que
  lo cubre, ¿sirve?, observaciones) para el paso siguiente.
- **Hallazgo:** los 13 planes que existían en 2024 tienen el mismo módulo 2 que el plan usado en la licitación 2024. Lo que cambió está
  en `data/modulo2-cambios-2024-2026.csv` (verbos y redacción; nada de contenido). Plan 2026 = Res. 3615 del 05-12-2024: se aprobó
  después de la licitación 2024, por eso los .docx de 2024 traen borradores con dos verbos (PF1483).
- **Dónde están los recursos 2024:** Drive "Talento Digital 2024 Licitación" (de ruben@hackea.pro) → "Contenidos Finales" → una carpeta
  "Contenido M2 …" por curso (ids en `privado/drive/recursos-2024.json`), y el inventario "Copia de Recursos educativos" (flipbook,
  video de bienvenida, video resumen, quiz, infografía). Algunas carpetas tienen además ABP y ABPRO. **No hay carpeta de DevOps
  (PF1485) ni de Seguridad Cloud (PF1493)** (#25). Hay más en "Contenidos Antiguos" (2023).
- **Siguiente paso natural:** abrir cada "Contenido M2", listar sus recursos por AE y llenar las 3 columnas de la pestaña del curso.
  Criterio de la planilla: los recursos expositivos alcanzan los criterios de nivel 1-2; desde el 3 hace falta práctica, caso o
  proyecto; y todo recurso tiene que funcionar solo en el LMS (2026 es solo e-learning) y con enlaces vigentes (13.3.3 h, pág. 53).
- **Cómo se leyó el Drive 2024:** conector de Drive (`search_files` por `parentId`, que pagina de a 5; `read_file_content` de los .docx,
  que se guarda en `tool-results` y se procesa con Node). No hace falta el navegador para leer.

## HECHO (sesión 2026-09-30-03): evaluación y cierre del módulo 2

- Fuentes: `contenidos/<PF>/modulo-2/R-evaluacion-modulo.md` (un "## NN · Título" por documento y los ítems de la diagnóstica) y
  `R-glosario-integrador.md`. `npm run evaluacion` genera `entrega/evaluacion-modulo/` (`--sin-pdf` solo revisa; `--solo=glosario`
  o `--solo=evaluacion` revisa una fuente). El plan se cita con marcas ({{AE1}}, {{2.3}}, {{c:INICIO DEL CONTENIDO}},
  {{competencia: trozo}}…) que el generador reemplaza desde la ficha: no copiar el plan a mano.
- Drive: carpeta "6 Evaluación y cierre" de cada curso. Hoja: pestaña "Evaluación y cierre", Resumen S, Pendientes 7 y 8.
- **Si cambia una fuente:** `npm run evaluacion` y reemplazar el PDF en Drive (nueva versión, para no cambiar el enlace).
- **Navegador:** esta vez el panel de la app no tenía sesión de Google; se usó Chrome (la ventana del grupo "Claude" estaba minimizada
  y el usuario la restauró). El conector de Drive (create_file) sirve para carpetas, no conviene para subir PDF (base64).

## HECHO (sesión 2026-09-30-01): ABP y ABPRO por aprendizaje esperado

- 16 actividades en `contenidos/<PF>/modulo-2/R-abp-abpro.md`; `npm run abp` genera HTML y PDF en `entrega/abp-abpro/`.
- Drive: carpeta "5 ABP y ABPRO" de cada curso (8 Google Docs y 8 PDF). Hoja de Google: pestaña "ABP y ABPRO", Resumen R y Pendientes 6.
- **Si cambia un enunciado:** `npm run abp`, reemplazar el PDF en Drive como nueva versión y, en el Google Doc, borrar todo y pegar el
  HTML (en esta sesión se hizo con un selector de archivo temporal en la página de Docs y un evento "paste"; el teclado de Chrome falla
  a ratos, así que el nombre del Doc se cambió también desde la página).
- **Reglas del usuario para estos recursos:** sin duración de la actividad y sin rótulos internos ("textual", "oficial").
- `npm run planilla -- --hoja "ABP y ABPRO"` exporta solo esa pestaña para importarla en Google Sheets (Archivo → Importar → Insertar
  hojas nuevas).

## HECHO (sesión 2026-09-29-04): planilla sin Canva ni GIFT formativos

- La hoja de Google y `npm run planilla` ya no tienen columnas de Canva ni de GIFT formativo: Resumen M–P = Quiz AE1–AE4 gamificado,
  Q = carpeta. Entregables sin las filas "Quiz formativos (Moodle)". Pendientes sin la fila de Canva.

## HECHO (sesión 2026-09-29-03): Drive y planilla con un quiz por aprendizaje; Canva descartado

- Drive al día: "4 Quiz" de cada curso tiene los 4 juegos con su SCORM y los 4 GIFT; "Quiz (texto)", los 4 textos. Lo antiguo, en la papelera.
- Planilla de Google: Resumen R–U = Quiz AE1–AE4 gamificado; V = carpeta. Entregables con las filas del Quiz 4.
- **Canva no se usa más** (lo pidió el usuario). No retomar el borrado de los diseños de Canva salvo que lo pida: se detuvo a propósito.
- Si cambian los juegos: regenerar (`npm run quiz-juego`) y subirlos como **nueva versión** en las mismas carpetas (procedimiento de más
  abajo); así la planilla no necesita cambios.

## HECHO (sesión 2026-09-29-02): un quiz formativo por aprendizaje esperado

- **4 quiz por curso, Quiz n = AEn**, 5 preguntas cada uno, en `contenidos/<PF>/modulo-2/R-quiz-canva.md`. De ahí salen los GIFT
  (`npm run produccion -- PF1821 PF1822`) y los juegos con su SCORM (`npm run quiz-juego`). **Ojo:** `npm run produccion` reescribe
  también todos los PDF y PPTX aunque no cambien (solo su fecha interna); si solo cambiaste quiz, restaura con git lo que no sea
  `entrega/quiz/` ni `produccion/quiz-canva/`.
- Probados los 8 juegos en Edge headless con un LMS SCORM falso (desde PowerShell): completos, puntaje 100 y "completed".
- **Pendiente, en este orden:** (1) reemplazar en Drive los 6 archivos de "4 Quiz → Quiz gamificados (juego y SCORM)" como nueva
  versión y subir los 2 del Quiz 4 por curso, con el procedimiento de más abajo (Claude in Chrome); agregar sus ids a
  `privado/drive/enlaces.json` (`quizJuego`); (2) actualizar la hoja de Google del usuario: una columna más de juegos (Quiz AE4);
  (3) rehacer los quiz de Canva (G3): 4 diseños por curso con `produccion/quiz-canva/Quiz-1.txt` a `Quiz-4.txt`; (4) push, para que
  el sitio publique la versión nueva.

## HECHO (sesión 2026-09-29-01): planes formativos oficiales de los 15 cursos, en una planilla

- **`npm run planes`** → `privado/drive/Planes-Formativos-SENCE-TD2026.xlsx` (se entregó al usuario como archivo; no está en Drive).
  Por curso: el **módulo 2**, que es el que se desarrolla y se evalúa, con aprendizajes, criterios y contenidos **textuales**, y
  **todos los módulos**, que se muestran en el LMS. Trae también qué evalúan las bases (igual para los 15) y las fuentes.
- Datos: `npm run sipfor -- --todos` (los 15 en `data/planes/`). Cotejo automático con los PDF oficiales de
  "Licitaciones TD 2026 / PF SENCE a licitar": **12 de 15 iguales**. **Faltan los PDF de PF1487, PF1485 y PF1493**; si se bajan de
  SIPFOR a esa carpeta, `npm run planes` los coteja solo.
- Útil para repartir el trabajo: **PF1474, PF1477, PF1478 y PF1479 comparten el mismo módulo 2** (`MB00162` Fundamentos de desarrollo
  front-end, 72 h, 7 aprendizajes): un solo desarrollo sirve para los cuatro.
- Anexos 2 referenciales de años anteriores: hay para 11 de los 15 (no para PF1487, PF1485, PF1493, PF1821 ni PF1822). **Falta ver qué
  módulo desarrolló cada uno** y si coincide con el módulo 2 de 2026; es el siguiente paso natural si el usuario quiere decidir qué se
  reutiliza, qué se adapta y qué se rehace.
- Horas que no cuadran en SIPFOR: pregunta abierta #24.
- Los guiones de video de PF1821 y PF1822 coinciden con el plan oficial; el usuario dio por buenas las diferencias leves de la voz.

## HECHO (sesión 2026-09-28-01): quiz de Canva interactivos y quiz gamificados en HTML y SCORM

La sesión corrió en dos chats seguidos, desde dos cuentas del usuario. El primero se cortó por límite de uso sin cerrar.

- **Canva (G3):** los 6 quiz tienen un **Formulario** nativo (Elementos → Formularios) en cada página de pregunta (2, 4, 6, 8 y
  10), con la respuesta correcta marcada, colores del diseño y Montserrat. No hace falta cuenta de Canva para responder; las
  respuestas se ven en "Respuestas" de cada formulario. Siguen por defecto "Evita respuestas duplicadas" y el correo por respuesta
  (#23). **Nadie probó todavía un envío real en modo Presentar.**
- **Gamificación en Canva: a medias solo en PF1821 Quiz 1** (rótulos MISIÓN, NIVEL y "+1 ★"). Si se retoma, en cada quiz:
  Archivo → **Encuentra y reemplaza texto** (Ctrl+F), "Reemplazar todo", en este orden: `RETROALIMENTACIÓN · PREGUNTA ` →
  `+1 ★ · COMPLETASTE EL NIVEL `; `PREGUNTA ` → `NIVEL `; `QUIZ FORMATIVO · SIN NOTA` → `MISIÓN · 5 NIVELES · QUIZ FORMATIVO SIN NOTA`;
  `Cuándo:` → `Tu misión: supera los 5 niveles, suma 1 ★ por nivel y gana la insignia «…». Cuándo:`. Página final: duplicar la
  página 11 y cambiar sus textos con "Reemplazar" (de a uno) sobre la última coincidencia. **No edites texto con doble clic en el
  lienzo: congeló Canva dos veces.** Insignias y siguiente parada: `R-quiz-canva.md`.
- **Quiz gamificados (G9):** `npm run quiz-juego` escribe en `modulo-2/<curso>/entrega/quiz/` `M2-Quiz-n-Juego.html` (un archivo,
  fuentes incrustadas, sin internet) y `M2-Quiz-n-Juego-SCORM.zip` (SCORM 1.2: guarda en Moodle el mejor puntaje, 0-100, y
  "completed"). Preguntas desde los GIFT de G8; la misión del curso y, por quiz, la insignia y la siguiente parada, desde
  `R-quiz-canva.md` (el generador se detiene si faltan). **Si cambian los quiz:** `npm run produccion -- PF1821 PF1822` y después
  `npm run quiz-juego`. El sitio los publica solo (se copian desde `modulo-2/`) y la portada los enlaza. Diseño en
  `scripts/lib/quiz-juego.html`: los datos entran en el marcador DATA y las fuentes en FUENTES.
- **Cómo se montan:** Moodle → Agregar actividad → **Paquete SCORM** (el zip). Rise → bloque **Embed** con la URL del juego en el
  sitio (existe solo después del push). También sirve subir el HTML como archivo.
- **Cómo se probó** (script fuera del repo): una copia del HTML con un objeto `window.API` falso que anota las llamadas SCORM y un
  guion que juega solo; Edge `--headless=new --virtual-time-budget=15000 --dump-dom` devuelve el resultado, y `--screenshot` las
  capturas. **Edge headless no baja de ~500 px de ancho:** para ver un celular, mete el juego en un `<iframe>` de 375 px.
- **Pendiente:** #22 (¿la contraparte lo acepta, además de Canva o en su lugar? y los nombres de insignia), #23, importarlo en un
  Moodle real, push, Rise (G5, sin empezar).

Trampas de esta sesión:
- **Claude in Chrome:** su herramienta `find` usa la cuota de la cuenta de la extensión y respondió 429 (límite de 5 horas); poco
  después la extensión se desconectó y no volvió aunque el usuario abrió el panel. El navegador integrado de la app no tiene sesión
  de Canva, y el usuario no pudo iniciarla ahí.
- **Canva:** en el editor, un clic en el formulario lo "responde" en vez de seleccionarlo (usa el panel de capas); pegar entre
  páginas con el portapapeles pegó capturas del usuario (no uses el portapapeles).

## HECHO (sesiones -17 y -18): logo de marca sin solapar el título, y PDF reemplazados en Drive

**El logo ya no toca ningún texto** (diseño en DECISIONS, 2026-09-27, sesión -17). Los 140 PDF con marca (UNAB PF1821 y
PF1822, Skillnest PF1821 y PF1822, U. Autónoma PF1822) y los 5 zips se regeneraron en `privado/marcas/<cliente>/<PF>/`, y
`npm run drive` rehízo `privado/drive/Subir a NATY 2.0/`. **En Drive ya están los 140 nuevos** (sesión -18): cada PDF se subió
como nueva versión del mismo archivo en NATY 2.0 → curso → cliente → "1 Cuadernillos" y "2 Documentos"/<subcarpeta>, así que los
enlaces y los permisos no cambiaron. La planilla (`1yjgTnjm…`) enlaza las **carpetas** de cada cliente, no los PDF: no se tocó.
El usuario pidió el reemplazo tras ver la hoja de contacto de la sesión -17.

**Si vuelves a regenerar las marcas, hay que volver a reemplazar en Drive.** El conector no sirve (`update_file` solo cambia nombre
y carpeta; `create_file` crearía copias a nombre de la otra cuenta, #21). Cómo se hizo en la sesión -18, con Claude in Chrome en el
Chrome del usuario (sesión de Google propia, verifícala en el botón de la cuenta antes de subir nada):
1. Navegar a la carpeta por su id (los de cada cliente están en `privado/drive/enlaces.json`; los de las subcarpetas de "2 Documentos",
   en el DOM: `[data-id]`, con el nombre en el `aria-label` de sus hijos). Esperar ~7 s: si el título aún dice "Carpeta", reintentar.
2. Con `javascript_tool`, parchar `HTMLInputElement.prototype.click` (y `showPicker`) para que, si el input es `type=file`, lo guarde,
   le ponga un `aria-label` y lo agregue al DOM **sin abrir el cuadro "Abrir" de Windows**.
3. Abrir "Nuevo → Subir archivo" **por código** (eventos `pointerdown/mousedown/mouseup/click` sobre el botón y el `menuitem`): los
   clics reales tras navegar a veces se pierden, y el atajo Alt+C, U falla igual.
4. `find` del input y `file_upload` con las rutas locales (máximo 10 MB por llamada).
5. En el diálogo "Opciones de subida", comprobar que está marcada "Reemplazar…" y pulsar "Subir"; esperar "N subidas completadas" y
   que cada archivo diga "Versión N". No navegar antes: una subida en curso se corta.
Los scripts de `javascript_tool` que devuelven una promesa sin `await` arriba no esperan; y un `await` largo justo después de navegar
puede colgar la pestaña 45 s: primero una espera, luego la revisión síncrona.

Qué cambió, por si hay que tocarlo:
- **Cabecera** (`conMarca()` en `scripts/marca.mjs`): `<header class="cabecera con-logo"><div class="cabecera-texto">…</div>
  <span class="marca-logo">…</span></header>`, en flex con 8 mm de separación. Sin `position: absolute` ni tope de 128 mm.
- **Portada de las lecturas**: `.banda.con-logo` en grilla (logo, kicker y curso a la izquierda; AE arriba a la derecha; título,
  regla y bajada abajo). Con el logo de la Autónoma caben título de 3 líneas + bajada de 2, o 2 + 3; más, y la revisión se detiene.
- **Tamaño del logo**: `LUGARES` y `cajaLogo()` en `scripts/marca.mjs` (igual área, tope y ancho máximo por lugar).
- **Revisión automática**: `scripts/lib/revision-marca.mjs`, llamada por `npm run marca` antes de imprimir. Si falla, no se imprime
  nada y los PDF anteriores quedan intactos. `npm run marca -- <cliente> --solo-revisar` arma los HTML y solo revisa (1 min).
- **Si el cliente entrega el logo en blanco**, déjalo junto a `logo.png` y agrega `"logo_negativo": "<archivo>"` en su `marca.json`:
  va sin placa. Hoy nadie lo tiene (el usuario puede pedírselo a UNAB y a la Autónoma).

## Quiz gamificados en Drive y en la planilla (sesión 2026-09-28-04)

El usuario pidió que Natalia vea cada quiz como **archivo** desde la planilla, no en el sitio de Vercel. Quedó así:
- **Drive:** NATY 2.0 → curso → "4 Quiz" → **"Quiz gamificados (juego y SCORM)"** (PF1821 `1R8PAnCH…`, PF1822 `1xF1Oalp…`), con
  `M2-Quiz-n-Juego.html` y `M2-Quiz-n-Juego-SCORM.zip`. Ids de carpeta y archivos en `privado/drive/enlaces.json` → `<PF>.quizJuego`.
  Son del usuario y se abren con el enlace sin sesión (heredan el acceso de NATY 2.0, #20).
- **Planilla** (`1yjgTnjm…`): Resumen R, S y T "Quiz n gamificado (archivo)" y U "Quiz gamificados: juegos y SCORM (carpeta)";
  Entregables F84 a F95 "Abrir en Drive". `npm run planilla` genera lo mismo desde `enlaces.json` (si falta un id, vuelve al sitio).
- **Drive no ejecuta el HTML:** su vista previa muestra el código. Se descarga y se abre con doble clic (lo dice A2 de Resumen).
- **Si regeneras los juegos** (`npm run quiz-juego`), hay que subirlos otra vez como nueva versión del mismo archivo, para no
  cambiar los enlaces: "Administrar versiones" en Drive, o el diálogo "Reemplazar" al subir con el mismo nombre en esa carpeta.

Cómo se subió **sin Claude in Chrome** (seguía sin conectar): el usuario inició sesión de Google en el **navegador integrado** de
la app (Google lo permitió; el agente de usuario es Chromium 152 con "Claude/…", `navigator.webdriver` falso). Con esa sesión:
1. Comprobar la cuenta: el `aria-label` del botón "Cuenta de Google" incluye el correo del dueño de NATY 2.0.
2. El sitio sirve los archivos con `Access-Control-Allow-Origin: *`: `fetch` desde la página de Drive, SHA-256 contra el repo y
   `new File([buf], nombre, { type })`.
3. Parchar `HTMLInputElement.prototype.click` y `showPicker` para guardar el input `type=file` sin abrir el cuadro de Windows;
   "Nuevo" (clic en el botón visible) → `find` "Subir archivo" → clic por `ref`; luego `input.files = dataTransfer.files` y
   despachar `change`. Drive muestra "6 subidas completadas".
4. La lista de Drive es virtual: para leer los 6 `data-id`, emular una ventana alta (`resize_window` 1200×1800) y volver a
   "desktop" antes de hacer clics (con la emulación, los clics por coordenada caen mal).
**Trampa:** con el panel angosto, un clic que no alcanzó el menú cayó en el logo de Drive, y lo que se escribió después fue a la
página principal (Drive tiene atajos de una tecla). No pasó nada (se revisó "Reciente": solo los 6 archivos nuevos, ningún
archivo sin título), pero **antes de escribir, confirma con `document.activeElement` que el foco está en el campo del diálogo**.
Navegar con `navigate` recarga la página y borra lo que el script dejó en `window`.

## Quiz gamificados, versión videojuego (sesión 2026-09-28-03)

Los 6 juegos (`npm run quiz-juego`) tienen ahora diseño de videojuego tecnológico, a pedido de la contraparte: fondo animado por
curso, color e ilustración por quiz, XP, combos, energía, comodín 50:50, nivel final, logros y medalla. Lo que conviene saber:
- **Estilos:** `ESTILOS` en `scripts/quiz-juego.mjs` (fondo, colores, lema e ilustración con sus etiquetas). **Si cambias una
  pregunta, revisa que las etiquetas de su ilustración no adelanten la respuesta.** La mecánica y los números están arriba del
  script de `scripts/lib/quiz-juego.html` (BASE, COMBO, ENERGIA, POR_ENERGIA, CON_COMODIN; el máximo se calcula: 900).
- **Cómo se prueba:** una copia del HTML con un `window.API` falso (SCORM) y un guion que juega solo; Edge `--headless=new
  --virtual-time-budget=15000 --dump-dom` y `--screenshot`, cada corrida con su propio `--user-data-dir`. **Desde el 28-sep, el
  Bash de la sesión no deja arrancar navegadores (salen sin error y sin salida): córrelos desde PowerShell.** En la captura, las
  animaciones quedan a medio camino; con `--force-prefers-reduced-motion` salen los valores finales. El XP visible se comprueba
  leyendo el texto 2,5 s después (el contador tiene respaldo por temporizador).
- Mismos nombres de archivo: el sitio y la planilla ya enlazan la versión nueva después del push.

## Planilla de revisión del usuario: cómo editarla (sesión 2026-09-28-02)

Natalia revisa en **la planilla del usuario**, `01 Planilla de seguimiento` (id `1yjgTnjmrIxpQ3a1JBF3ZpSWC0rrKlG6-8qQvFI2Ypn4`; ella
tiene permiso de edición). Estado al 28-sep (sesión -04): Resumen con los quiz gamificados en R a U (archivos y carpeta en Drive,
ver arriba) y la Q "Quiz GIFT (vista web)" completa y corregida; Infografías en V y Observaciones en Z; Entregables hasta la fila 95
(84-95: quiz gamificados, a Drive); Pendientes hasta la fila 11. **Lo de la sesión -16 (abajo) quedó resuelto en Q; Aprendizajes F y
las filas .gift de Entregables siguen sin la vista web.**

Cómo se editó sin Claude in Chrome (en la sesión -02 sin sesión de Google, porque la hoja deja editar a cualquiera con el enlace,
#20; en la -04, con la sesión que el usuario abrió en el navegador integrado; la técnica es la misma):
1. Abrirla en el navegador integrado. Si la ventana de Claude queda detrás de otra, no hay capturas y la barra de fórmulas no se
   refresca: **no leas la hoja en pantalla, descárgala**: `curl -L ".../export?format=xlsx"` y lee celdas y fórmulas del xlsx.
2. Ir a una celda: `javascript_tool` enfoca `#t-name-box` y le hace `select()`; luego `type` "Hoja!A84" y `key` Return.
3. Escribir: `type` sobre la celda **no** hace nada; sirve F2, ctrl+a, `type` y Return. Mejor aún, para un bloque: un
   `ClipboardEvent('paste')` con un `DataTransfer` en text/plain (columnas con tabulador, filas con salto de línea) despachado al
   `document.activeElement` (`waffle-rich-text-editor`); las fórmulas `=HIPERVINCULO("url";"texto")` se evalúan.
4. Insertar filas o columnas que hereden el formato: menú Insertar por código (`#docs-insert-menu`, eventos mouseover, mousedown,
   mouseup y click; hover sobre "Filas" o "Columnas" y clic en "Insertar N filas debajo" o "Insertar 1 columna a la izquierda").
5. Comprobar siempre con la descarga. Las fórmulas iguales y seguidas quedan como fórmula compartida (`<f t="shared">`).
El generador (`npm run planilla`) produce lo mismo en `privado/drive/Planilla-Modulo2-TD2026.xlsx`.

## Planilla del usuario a medio editar (sesión -16)

El usuario quiere los cambios de la sesión -14 en **su** planilla, `01 Planilla de seguimiento`
(id `1yjgTnjmrIxpQ3a1JBF3ZpSWC0rrKlG6-8qQvFI2Ypn4`), no en la copia nueva. El conector no edita celdas; se editó en el navegador
integrado, **sin sesión de Google** (la carpeta deja editar a cualquiera). La hoja se redibuja con retraso y varias escrituras se
perdieron. Estado al cortar:
- Resumen: columna Q "Quiz GIFT (vista web)" insertada con su encabezado. Q5 y Q6 (PF1821) muestran "Ver quiz GIFT": **revisa que
  Q5 apunte a `#PF1821`** (una escritura pudo caer ahí con `#PF1822`). Faltan Q7, Q8 y Q9 (PF1822, `#PF1822`).
- Aprendizajes (columna F, 8 filas: `#PF1821-ae1` … `#PF1822-ae4`) y Entregables (14 filas .gift: `#<PF>-q<n>` y `#<PF>-ae<n>`):
  sin tocar.
- Propuesta al usuario, sin respuesta: que inicie sesión con su cuenta y usar Archivo → Importar → Reemplazar hoja de cálculo con
  la copia nueva (`1WupQSaktADlUaurlkssVvXdFuDcCs8y_n0mwr0MDKGk`): mismo enlace, todo de una vez. Después, la copia sobra.
- Las fórmulas van en español o inglés con `;` como separador (la hoja usa `=HIPERVINCULO(...;...)`).

## ESTADO AL 27-SEP: estándar de la contraparte, marca por cliente y cuadernillos

La contraparte revisó los entregables y pidió su estándar (DECISIONS, 2026-09-27). Hecho:
- **Videos nuevos** (guion y PPT para HeyGen): bienvenida al curso y resumen del módulo, por curso
  (`contenidos/<PF>/modulo-2/R-videos-curso.md` → `produccion/videos/00-bienvenida-curso` y `90-resumen-modulo`). Falta grabarlos (G1, G2).
- **Quiz en Canva** (G3, sesiones -02 y -03): 3 por curso, formativos, desde `R-quiz-canva.md`. Enlaces en los ESTADO;
  PDF exportados en `entregables/quiz-modulo-2-canva-PF1821-PF1822.zip`. El conector no crea el elemento Quiz
  interactivo: la conversión es manual en Canva (o con Claude in Chrome y una sesión de Canva iniciada; se intentó en la
  sesión -05 y la extensión no estaba conectada). Los mismos quiz están en GIFT para Moodle (`entrega/quiz/`, G8). Falta revisión humana. No reescribas las preguntas en Canva: la fuente es `R-quiz-canva.md`.
- **Glosario** del módulo (G4) e **indicadores de logro en PDF** (G7): `entrega/glosario/` y `entrega/evaluacion/M2-Indicadores.pdf`.
- **Organización de las actividades**: fila "Organización" en la tabla resumen de C2 (sale en la ficha y en Moodle).
- **Marca por cliente y cuadernillos** (G6, sesión -04): `npm run marca -- CLIENTE [PF]` imprime los 22 PDF con los
  colores, el logo y el nombre del cliente, y 6 cuadernillos con portada del cliente (lecturas, actividades, evaluación,
  metodología y medios, tutor y glosario aparte). Clientes: UNAB (PF1821 y PF1822), Skillnest (PF1821 y PF1822) y
  U. Autónoma (PF1822). Todo vive en `privado/marcas/`, que git ignora (repo público, clientes que compiten).
  **Antes corre `npm run produccion -- PF1821 PF1822`**: deja el manifiesto con los datos del curso. Cada combinación
  tarda unos 3 minutos: no edites `scripts/marca.mjs` mientras corre (el lote lo relee en cada cliente).
  Antes de imprimir, revisa en Edge que el logo no toque ningún texto y se detiene si lo toca (sesión -17, arriba).
  Si cambias un recurso, regenera producción y marcas y reenvía los 5 zips al usuario.
- **Abierto:** #18 (mismos recursos con distinta marca para clientes que compiten) y #19 (colores de Skillnest sin
  manual; la Autónoma pide Montserrat y se usa IBM Plex).

**Sin pruebas técnicas** (n8n, pytest, Colab), **sin videos interactivos H5P y sin capturas del tutorial de PF1821**,
por decisión del usuario (DECISIONS, 2026-09-27): no los propongas de nuevo. Guía de Rise para el usuario en `modulo-2/GUIA-RISE.md`.
**Drive para revisión (sesión -11):** carpeta NATY 2.0 del usuario (id `1fGgwXUyr2wUyyxEn8J36vdmy62Ul2lsv`) ordenada por
curso → cliente → cuadernillos/documentos, más videos, infografías y quiz por curso, y Archivo. Planilla vigente:
`01 Planilla de seguimiento` (id `1yjgTnjmrIxpQ3a1JBF3ZpSWC0rrKlG6-8qQvFI2Ypn4`); enlaces en `privado/drive/enlaces.json`.
**Compartir con Natalia (sesión -12):** se propuso natalia@hackea.pro (el de OPEN-QUESTIONS #4) y el usuario dijo
"todavía no": no compartas hasta que confirme el correo; entonces `share_file` con rol `reader`. **Antes, ojo:** la carpeta
tiene acceso "cualquier persona con el enlace" como **editor** (#20). El conector no quita permisos; si el usuario quiere
cerrarlo, lo hace en Drive → Compartir → Acceso general. El usuario pidió subir esta nota al repo público igual (sesión -13).
**Quiz GIFT en la web (sesión -13):** https://naty-proyecto01.vercel.app/quiz-modulo2.html muestra los 6 quiz GIFT como en Moodle.
Sale sola de los `.gift` en cada build (`scripts/lib/quiz-gift.mjs`): si cambian los quiz, basta `npm run produccion` y push.
Si el GIFT trae otra sintaxis (preguntas abiertas, emparejamiento), la vista se detiene y el build de Vercel falla: amplía el lector.
**Planilla con la vista GIFT (sesión -14):** hay DOS "01 Planilla de seguimiento" en NATY 2.0. La nueva (id
`1WupQSaktADlUaurlkssVvXdFuDcCs8y_n0mwr0MDKGk`) enlaza la vista de los quiz; la anterior (`1yjgTnjmrIxpQ3a1JBF3ZpSWC0rrKlG6-8qQvFI2Ypn4`)
no. **El conector de Drive está conectado como otra cuenta de Google (no la del usuario), no como el usuario**: todo lo que crea queda a nombre de esa
cuenta, y escribe en NATY 2.0 solo porque la carpeta está abierta como editor a cualquiera (#20). Pregunta #21 antes de mover o
reemplazar la anterior. El usuario eligió dejar vigente la nueva (sesión -15), pero mover la anterior con el conector fue bloqueado por el control
de permisos: lo hace el usuario a mano. No lo reintentes. La búsqueda del conector solo ve archivos de esa otra cuenta (usa ids de `privado/drive/enlaces.json`),
y esa cuenta tiene archivos personales ajenos al proyecto: no los abras. Si se cierra el acceso de la carpeta, el conector deja de poder escribir en ella salvo que se comparta con esa cuenta.
**Drive y planilla (sesión -07, antecedente):** `npm run drive` arma la carpeta para subir a Drive; el usuario la sube a mano. Después:
buscar la carpeta con el conector de Drive, escribir `privado/drive/enlaces.json` (ruta relativa → URL), `npm run planilla` y
subir el .xlsx con `create_file` (se convierte en Sheets). La versión 1 (sin enlaces de Drive) está en Drive con id
`1COAVLdVPOgVyWpCfO_mds9ZSXr0_KLrdWd_pEDw6NSs`: al subir la nueva, manda esa a la papelera (pregunta antes).
Pendientes del usuario: subir la carpeta a Drive (con los videos G1 y G2, ya grabados el 27-sep), editar los 2 H5P (F1), Rise con los PDF de lectura (G5, ver la guía), enlaces de Drive de
los videos y PNG de infografías, convertir los quiz a interactivos. Después: herramientas de la industria, vinculación temprana y
actividades de extensión (35 % de la técnica, por institución), LMS y Anexo 2.

Trampas nuevas:
- **Varias sesiones en paralelo** sobre la misma carpeta: antes de hacer commit, mira `state/LEDGER.csv` y `git status`;
  no mezcles cambios de otra sesión abierta ni cierres la suya.
- **No hay pdftoppm ni otra herramienta de PDF**: para ver páginas de un PDF, pdf.js servido por HTTP local y Edge por
  DevTools (script en el scratchpad de la sesión -04, no en el repo). Para capturar un HTML basta
  `msedge --headless --screenshot=archivo.png --window-size=900,1200 file:///...`.
- **La ventana de Edge headless en Windows pierde 26 px de marco** (sesión -17): `--window-size=597,…` deja 571 px de página.
  Para capturar al ancho útil de A4 (158 mm) usa 623 px, y para la hoja completa (210 mm), 820. La revisión del logo no depende
  de eso: fija el ancho del `<body>` en mm. Las capturas de la sesión -16 se tomaron a 571 px.
- **Edge headless falla a veces al arrancar varios a la vez** (`FATAL:ui\gfx\win\hwnd_util.cc:65] 87`): la revisión del logo
  reintenta hasta 4 veces con 3 en paralelo. `imprimirPdf` corre de a uno y no lo ha mostrado.
- Los heredocs de Bash con `node -` se comen `\n` y `\.` dentro de plantillas: usa la herramienta de edición.
- PowerShell bloquea `npm.ps1`: usa `npm.cmd` o el Bash.
- Canva puede responder 503 al abrir varios diseños seguidos; reintentar funciona.

## HECHO: actividades del módulo 2 (pedido del usuario del 25-sep, sesiones -12 y -13)

El plan de 6 casillas está terminado (commits `4787142` y `6c19766`). Qué quedó y dónde:
- **Corrección técnica de PF1821** regenerada: el Switch compara `total` (Number) y la cantidad "3 unidades" se
  lee con `parseInt`. La pregunta 5 del guion H2 de PF1821 cambió (se avisó al usuario). `R-capsulas.md` no se tocó.
- **Diseño unificado:** los PDF de actividades, evaluación y cuadro comparativo salen de `documentoPdfHtml`
  (`scripts/lib/documento.mjs`), con cabecera, ficha y 2 familias. La ficha de una actividad sale de la tabla
  resumen de C2: si cambias esa tabla, se refleja sola; si falta una fila, `npm run produccion` se detiene.
- **Moodle:** `entrega/actividades/moodle/M2-Actividad-n-Moodle.html`. **Respaldo:**
  `entrega/actividades/M2-Actividades-Enunciados-respaldo.pdf`.
- **Workflow roto de PF1821** (`scripts/lib/workflow-roto.mjs`): `insumos/pedidos_enrutados_v0.json`,
  `pedidos_prueba.json`, `comunas.csv`, `actividad-2-tablas.sql` y `respuesta-modelada/pedidos_enrutados_corregido.json`.
  Isla de Pascua **no** está en `comunas` a propósito (misión 3). **Falta importarlo y ejecutarlo en n8n** (fila E2).
- **Zips por curso:** `npm run sitio` → `public/descargas/actividades-modulo2-PF182n.zip` (participante/ y tutor/,
  LEEME con citas verificadas a las bases). El usuario ya los recibió.

Lo que sigue en este frente: probar el workflow en n8n y el código de PF1822 con pytest (ninguno se puede aquí),
y la revisión humana de los recursos antes de marcar casillas en los README.

## PRIMERO: recursos base del módulo 2 de PF1821 y PF1822 (meta del usuario: 25-sep temprano)

La prioridad del proyecto ahora es esta, por encima de "Tu primera tarea" más abajo.
**El alcance es solo de recursos base, neutros y listos para subir.** Nada de LMS, nada de
redactar el Anexo 2 y nada por institución: eso viene después (DECISIONS, 2026-09-25).

1. **Abre `modulo-2/FLUJO-PRODUCCION.md`.** Reparte el trabajo en seis carriles paralelos por
   herramienta: A automático, B video (HeyGen), C diseño, D texto IA, E técnico e F interactivo H5P.
2. **El carril A ya está hecho** y su resultado está en `modulo-2/<curso>/entrega/`: quizzes
   GIFT, **las 8 lecturas en PDF**, 9 PDF de evaluación, actividades, insumos, código `.py`,
   cuadro comparativo y textos para el Anexo. Se rehace con `npm run produccion -- PF1821 PF1822`.
3. **Toma una fila `pendiente` de tu carril** en `modulo-2/<curso>/produccion/ESTADO.md`.
   Primero las ★ (AE3, el aprendizaje seleccionado). Déjala `listo para revisión` con su
   archivo o enlace y agrega una línea al registro. Los videos y los `.h5p` van a Drive: git
   los ignora.
4. **Qué cumple cada curso y por qué el AE3:** `modulo-2/REVISION-BASES.md`.
5. **La carpeta local "Licitaciones TD 2026"**, junto al repo y no dentro, tiene el molde del
   Anexo 2: `Anexos 2 V0 y revisión/`. No la copies al repo: es público y trae propuestas de
   otras instituciones.

Trampas de estas sesiones:
- **Sitio en Vercel:** https://naty-proyecto01.vercel.app se reconstruye en cada push con `npm run sitio`
  (`vercel.json`). Si agregas páginas a `modulo-2/` o a los contenidos del módulo 2, salen solas;
  para publicar otra carpeta, agrégala a `RAICES` en `scripts/sitio.mjs`. Antes de subir, prueba con
  `npm run sitio` y revisa que no queden enlaces rotos.
- **Hay dos proyectos de Vercel conectados al mismo repo** (`naty-proyecto01` y `naty.proyecto01`):
  cada push despliega dos veces. El usuario debería borrar uno en el panel de Vercel; desde el repo no
  se puede.
- **Las URL de cada despliegue piden iniciar sesión en Vercel** (protección de despliegues). La URL
  pública es la de producción, la que termina en `.vercel.app` sin el hash.
- **Las videocápsulas se generan textuales y se validan solas.** Si editas `R-capsulas.md`, la columna
  "Contenido del plan (textual)" tiene que ser copia exacta de la ficha y cubrir todos los contenidos
  del AE, o `npm run produccion` se detiene y dice qué falta. El usuario ya tiene las cápsulas nuevas
  en zip (`videocapsulas-revisadas-modulo2.zip`).
- **Infografías:** el usuario tiene los prompts nuevos (zip `infografias-modulo2.zip`, el mismo del sitio).
  Traen el alto calculado para cada contenido. Si cambias el texto de una cápsula, regenera y reenvía:
  el alto y las secciones cambian. Ninguna infografía debe volver a 1080 × 1920 si no cabe.
- **Lecturas:** la fuente es `contenidos/<PF>/modulo-2/lecturas/AEn.md` (formato en la cabecera de
  `scripts/lib/lectura.mjs`). Para rehacer solo los PDF, sin tocar los PPTX:
  `npm run produccion -- PF1821 PF1822 --solo-lecturas`. Si falta un contenido del plan, un ejemplo
  por sección, las 3 preguntas o los 8 términos, o si una línea de código pasa de 78 caracteres, no se
  imprime y el mensaje dice qué corregir. Las 2 fuentes (IBM Plex Sans y Mono, OFL) están en
  `scripts/fuentes/` y van incrustadas: no uses caracteres fuera del latín básico (≥, ≈, ✔), porque
  obligarían a usar una tercera fuente; la revisión los rechaza. La flecha → sí se puede usar: se dibuja.
  El control 05 toma por credencial la palabra clave seguida de dos puntos o de un signo igual, incluso en un ejemplo: en el código usa `clave_api`.
  El usuario ya tiene el zip `lecturas-modulo2.zip`, el mismo del sitio.
- **Videos e infografías (sesión -09):** el usuario ya hizo los 12 videos base (bienvenida, 4 videocápsulas
  y video de la herramienta 2, por curso) y las 10 infografías: están `listo para revisión` en los ESTADO, a
  nombre del usuario. No los regeneres ni reenvíes prompts o PPT: el trabajo está hecho con los que tiene. Faltan
  los enlaces de Drive de los videos, los PNG en `entrega/AEn/` y `entrega/00-bienvenida/`, y editar el
  interactivo (F1). Lo que sigue del lado de la IA: notebook de PF1822 (D3★), workflow roto (E2★) y tutorial
  (E1★) de PF1821.
- **Herramientas didácticas (sesión -10):** las dos de cada curso son del AE3, y cada C4 trae la tabla de
  cobertura. No vuelvas a poner en la ruta una herramienta fuera del tramo 3: la pauta pide herramientas
  "para trabajar los diferentes contenidos del aprendizaje esperado seleccionado" (7.4, pág. 31).
  - El notebook de PF1822 sale de `contenidos/PF1822/modulo-2/notebook/M2-Herramienta-1-Notebook.md`
    (`scripts/lib/notebook.mjs`). No se ha ejecutado: falta probarlo en Colab (E1 del ESTADO).
  - Las escenas del guion de la herramienta 2 (tabla "Tiempo | Pantalla | Locución") son las del video que el
    usuario ya grabó: **no las cambies**. Solo cambiaron las preguntas, que se agregan en H5P.
  - El tutorial de PF1821 (E1) está diseñado en C4 (17 pasos); falta tomar las capturas en n8n.
- **Horas de las lecturas en la metodología:** el usuario pidió dejarlo pendiente (sesión -09). No lo cambies
  sin su decisión.
- **Pendientes que dejó la sesión -08 (sin pedido del usuario, no los hice):** 1) la tabla de actividades
  de `C-metodologia.md` no nombra las lecturas; si el Anexo 2 las declara como actividad asincrónica
  "Lectura", hay que darles horas dentro de las 18 y 21 h. 2) El cuadro R04 de PF1822 dice "búsqueda
  semántica del módulo 3 del plan", pero según la ficha, la recuperación con almacenamiento vectorial es
  `MA04578`, que la ficha lista 4.° (orden por confirmar). Las lecturas nombran los módulos, no su número.
- **`npm run produccion` reescribe los PPTX aunque no cambien:** la fecha va dentro del zip.
  Si solo cambiaste prompts o PDF, restaura los PPTX con `git checkout HEAD -- modulo-2/*/produccion/videos/`
  antes del commit, para no subir binarios idénticos.
- **El usuario ya tiene los 12 PPT (carril B) y los 10 prompts de infografía (carril C) en zip.**
  Si los regeneras con cambios, avísale: los que tiene quedan desactualizados.
- **El `hoy()` de `npm run sesion` es UTC.** A las 22:00 en Chile ya es el día siguiente, y
  el checkpoint tiene que decir esa fecha.
- **Rutas en `node -e` desde Git Bash:** pasa `cygpath -m <ruta>`. Node recibe la ruta estilo
  `/c/Users/...` tal cual y la resuelve mal, con una carpeta `c` de más.
- **Moodle lee el GIFT como HTML:** por eso `produccion.mjs` escapa `<` y `>`. Si editas un
  `.gift` a mano, `<clave>` desaparece.

## Lo nuevo del 25-sep (UTC), sesión -01

- **Sección `modulo-2/` en el repo**, pedida por el usuario: una portada y una carpeta por
  curso (`PF1821-agentes-low-code/`, `PF1822-desarrollo-con-ia/`). Cada una tiene un README
  con el checklist de lo que piden las bases para el módulo 2, citado a numeral y página
  (7.4 págs. 27–31, Anexo N°2 pág. 90, Anexo N°7 págs. 99–111), y el zip de sus recursos.
  **Las casillas se marcan solo cuando una persona revisó el recurso.** Hoy están todas vacías.
- **`npm run zip -- PF1821 --salida modulo-2/PF1821-agentes-low-code`** regenera el zip: un
  Markdown por recurso, R01 a R13. Regéneralo cada vez que cambie `contenidos/<PF>/modulo-2/`.
- **Si cambias un recurso, revisa también el README de su curso en `modulo-2/`.** Repite a
  mano datos de `01-entregables.md` y `02-recursos.md` (nombres, cantidades, pendientes).
- **Todo está en el remoto público** desde el commit `1eaf1b8`. Trabaja con `git pull`
  antes de abrir sesión y `git push` después de cerrarla.

## Lo nuevo del 24-sep

- **Hito del día: contenido del módulo 2 de PF1821 (Agentes low code) y PF1822 (Desarrollo
  con IA).** Extraídos de SIPFOR con `npm run sipfor`; ficha y entregables en
  `contenidos/<PF>/modulo-2/`. Módulo 2 = `MA04560` (18 h) y `MA04576` (21 h), con 4
  aprendizajes esperados cada uno. Ojo con `OPEN-QUESTIONS.md` #16: así se cuenta si el
  módulo transversal de orientación es el primero.
- **PDF único para Natalia:** `entregables/2026-09-24-modulo2/modulo2-PF1821-PF1822-completo.pdf`
  (ficha SIPFOR + entregables + kit, por curso). Se regenera con `npm run kit ... --unico`.
- **Kit de recursos educativos en borrador para PF1821 y PF1822** (`contenidos/<PF>/modulo-2/`,
  PDF en `entregables/2026-09-24-modulo2/kit-recursos-modulo2-PF18xx.pdf`). Casos ficticios:
  *Mercado Austral* (PF1821, n8n) y *Nube Sur* (PF1822, Python). Siguiente paso: revisión de
  Natalia (etapa 3 de `docs/05`); después `IV-actividades.md` y ejecutar el código de PF1822
  con `pytest` en una máquina con Python.
- **Manual PDF para Natalia** con todo lo que hay que entregar en el módulo 2 de los dos cursos:
  `entregables/2026-09-24-modulo2/manual-entregables-modulo2-PF1821-PF1822.pdf`. Sus
  "sugerencias para este módulo" son propuestas a validar, no contenido aprobado.
- ~~Todo queda en local por ahora.~~ Superado el 25-sep: el usuario pidió subir todo.

- **Todo el proyecto vive ahora en el repo.** Los entregables del 24-sep están en
  `entregables/2026-09-24-modulo2/` y los PDF de las bases en `bases/`. La carpeta de
  arriba del repo ya no tiene nada del proyecto, salvo `licitacion-td-2026.zip`, que es
  idéntico al commit `init` (se comprobó con diff) y por eso no se versionó.
- **El remoto es https://github.com/dojedacifuentes/naty.proyecto01 y es público** por
  decisión del usuario (`DECISIONS.md`, 2026-09-24). Todo lo que empujes lo ve cualquiera:
  antes de versionar algo de un cliente, pregúntate si aguanta ser público. Trabaja con
  `git pull` antes de abrir sesión y `git push` después de cerrarla.
- **El panel del módulo 2 de ML y Agentes** es un artifact con estado compartido
  (https://claude.ai/artifact/BpgYipB5aa4YY8c4LGiDuP). Su código está en el repo; su
  estado no, vive en la base del artifact.

## Contexto mínimo

El repositorio ya existe como repo git y el trabajo de la sesión inicial está intacto en
el commit `init`. Lo que agregué es la maquinaria: ocho controles automáticos
(`npm run verificar`), un sistema de handoff que registra y verifica cada sesión
(`npm run sesion`), y el protocolo para que una herramienta audite a otra (`AUDITORIA.md`).

Auditar la sesión inicial fue el estreno del sistema: veredicto **observaciones**, con
cinco hallazgos en `state/auditorias/2026-09-22-cowork-01--por-claude-code.md`. Tres de
ellos son trabajo concreto y corto que conviene hacer antes de escribir propuestas.

No escribí ninguna propuesta ni toqué SIPFOR. La tarea que dejó la sesión inicial sigue
pendiente y es la que más mueve el proyecto.

## Lo que dejé listo

- `npm run verificar` → ocho controles, sin dependencias. Corre también en cada commit
  (hook) y en cada push (GitHub Actions). Hoy: 0 errores, 4 avisos.
- `scripts/checks/` → un archivo por control. Agregar uno es agregar un archivo; el
  orquestador los descubre solo.
- `templates/anexo2-esqueleto.md` → ahora lleva marcadores `<!-- verificable: -->`. Por
  eso el control 03 puede decir "D3: 4 de 10 para 7.0" en vez de "revisa la sección VII.c".
  **No los borres al copiar la plantilla.**
- `npm run sesion -- abrir|cerrar|estado|auditar|veredicto` → el protocolo de `AGENTS.md` §5
  hecho comando. El cierre se niega si falta el checkpoint, el handoff o tu log.
- `state/LEDGER.csv` → quién trabajó, desde qué commit, con qué resultado, quién lo auditó
  y la huella `sha256` de `state/`. Ahí se ve si alguien editó el estado fuera del protocolo.
- `AUDITORIA.md` → cómo se audita entre herramientas y qué significa cada veredicto.
- Los scripts de Python están portados a Node y verificados contra la salida del original.

## Lo que NO alcancé y dónde quedó exactamente

- **Extracción de SIPFOR**: nadie ha bajado los 15 planes formativos. Es el insumo
  principal del motor y no depende de nadie externo. Sigue siendo la tarea más productiva.
- **Mis dos sesiones no están auditadas.** Escribí el sistema de verificación y lo probé
  yo mismo, que es exactamente lo que `AUDITORIA.md` §1 advierte que no sirve. Falta que
  lo revise Codex, Cursor o una persona.
- **Los tres hallazgos de la auditoría que son trabajo corto** (informe completo en
  `state/auditorias/`):
  1. `data/clientes.csv` afirma un `eje_diferenciador` para los seis clientes sin declarar
     fuente, teniendo `ficha_completa=no`. Falta una columna `fuente`, o marcarlo
     `PENDIENTE:`. Importa porque de ahí sale la narrativa del ítem D, que pesa 35%.
  2. y 3. Citas sin numeral ni página en `docs/03-anexo2-estructura.md:41` y `:43`, y en
     `docs/04-verificadores-protocolo.md:17` — las tres afirman una causal de rechazo.
     El texto citado es real; falta abrir el PDF de las bases y poner la referencia.
     Son diez minutos y dejan el repositorio en verde del todo.
- **Pasos 5 y 6 del prompt A sin hacer:** etiquetas, un issue por pregunta abierta e hito
  "Fase 0" en GitHub. Con el repo público, los issues también lo son: confírmalo con el
  usuario antes de crearlos.

## Tu primera tarea

Depende de qué herramienta seas. Una sola, no elijas ambas:

**Si eres Codex, Cursor o una persona** → audita las dos sesiones de Claude Code:

```bash
npm run sesion -- auditar 2026-09-22-claude-code-01 --herramienta codex
npm run sesion -- auditar 2026-09-22-claude-code-02 --herramienta codex
```

El informe sale con la evidencia ya recopilada; tú respondes las cinco preguntas con
archivo y línea. Mira con especial desconfianza `scripts/checks/03-rubrica.mjs` (¿cuenta
bien lo que dice contar?) y `scripts/lib/texto.mjs` (¿el umbral de similitud discrimina
de verdad, o pasa cualquier cosa?). Un buen ataque: escribe dos propuestas parecidas a
propósito y mira si el control las caza. Después registra el veredicto.

**Si eres Claude Code otra vez** → no puedes auditarte. El hito del 24-sep es el
contenido del módulo 2 de **PF1821** y **PF1822**. La extracción ya está hecha
(`data/planes/`) y cada curso tiene su ficha y su lista de entregables en
`contenidos/<PF>/modulo-2/`. Sigue el flujo de `docs/05-flujo-contenidos-modulo.md`,
etapa 2, un archivo por entregable y en el orden de esa tabla, empezando por
`B1-indicadores.md`. Encarga cada archivo con `templates/encargo-entregable.md`.

Para los otros 13 planes basta `npm run sipfor -- --todos` y `npm run ficha -- <PF>`:
el extractor ya no necesita scraping (ver `DECISIONS.md`, 2026-09-24).

Los tres hallazgos cortos de la auditoría (columna `fuente` en `clientes.csv` y las tres
citas) siguen pendientes y siguen siendo diez minutos.

## Trampas que me encontré

- **El Bash de esta máquina interpreta las barras invertidas de los comandos.** Un `"\|"` o
  `'\u0001'` dentro de `node -e` o de un heredoc puede llegar al archivo ya convertido (o no
  llegar). Para texto con barras invertidas usa la herramienta de edición, no `sed` ni `node -e`.
- **El control 05 lee "Clave:" y `api_key =` como credenciales.** En pautas de respuesta usa <!-- verificacion:ignorar-secretos -->
  "Respuesta:"; en código de ejemplo, nombres como `clave_api` y lecturas desde `os.environ`.

- **SIPFOR repite a veces el aprendizaje como criterio.** En PF1821, el criterio 3.1 es
  idéntico al AE3. Es así en la fuente: no lo "corrijas", pero no lo uses como indicador.
- **Los contenidos de PF1822 traen asteriscos a mitad de línea** ("… SIRVE. *DIFERENCIAS").
  El extractor solo separa ítems al inicio de línea; el texto queda completo y textual.

- **`gh` no está en el PATH.** Se instaló como release oficial en la carpeta de programas
  del usuario (`%LOCALAPPDATA%/Programs/gh/bin/gh.exe`) sin tocar variables de entorno.
  Llámalo por esa ruta o pide permiso para agregarlo al PATH.
- **`OPEN-QUESTIONS.md` solo acepta ABIERTA, RESUELTA, CERRADA o DESCARTADA** como estado
  (control 07). Una respuesta parcial se escribe "ABIERTA · respuesta parcial".

- **No hay Python en esta máquina** (ni `python`, ni `python3`, ni `py`). Por eso las
  herramientas son Node. Si escribes un script, que sea `.mjs` sin dependencias.
- **El sitio de SIPFOR es ASP.NET con postbacks**: el scraping directo puede requerir
  mantener ViewState. Si se complica, descargar los PDF de cada plan y parsearlos es una
  ruta válida — anótala en `DECISIONS.md` si la tomas.
- Hay **15 planes pero solo 14 códigos distintos de línea**: PF1483 y PF1487 tienen las
  mismas horas (210) pero son planes distintos. No los deduplique nada.
- **`git checkout -- <archivo>` restaura desde el índice, no desde HEAD.** Si algo ya
  está staged, te devuelve la versión mala. Usa `git checkout HEAD -- <archivo>`. Me costó
  un commit rechazado por el hook.
- **El hook de pre-commit no se instala solo** en un clon nuevo: `npm run hooks`.
- Los informes generados (`state/verificacion.json`, `state/diferenciacion.csv`) están en
  `.gitignore` a propósito: cambian en cada corrida y ensucian los diffs.

## Lo que NO debes tocar

- **La contradicción "segundo módulo" vs. "todos los módulos"** (`OPEN-QUESTIONS.md` #1).
  Sigue abierta. Trabaja asumiendo el segundo módulo, pero no borres la alternativa ni
  reescribas `docs/` como si estuviera resuelta.
- **`data/rubrica-subcriterios.csv`**: solo se cambia con cita a numeral y página, y
  dejando registro en `DECISIONS.md`. El control 02 verifica que los pesos sigan cuadrando.
- **Los marcadores `<!-- verificable: -->`** de la plantilla del Anexo 2. Si los borras, el
  control de cobertura deja de contar y nadie se entera hasta que sea tarde.
- **`state/LEDGER.csv` a mano.** Lo escriben los comandos de `npm run sesion`. Si lo editas
  a mano, la huella deja de cuadrar y la próxima sesión va a pensar que alguien manipuló el
  estado — que es exactamente para lo que sirve.
