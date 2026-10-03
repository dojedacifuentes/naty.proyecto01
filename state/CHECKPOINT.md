# CHECKPOINT

> Se reescribe al cerrar cada sesión. Es la respuesta a "¿dónde quedó todo?".

**Última actualización:** 2026-10-03 (UTC)
**Por:** 2026-10-01-claude-code-01 a -07, 2026-10-02-claude-code-01 a -06 y 2026-10-03-claude-code-01 (Claude Code · opus-5.5)
**Fase actual:** 0 — Reconocimiento

---

## Estado por fase

| Fase | Estado | Nota |
| --- | --- | --- |
| 0. Reconocimiento | **en curso** | Bases leídas y sintetizadas. El repo ya se verifica solo. Faltan accesos. |
| 1. Motor | no iniciada | Bloqueada por extracción SIPFOR |
| 2. Producción | no iniciada | Bloqueada por fase 1. Cierre de la licitación: 5-oct-2026 (#13) |
| 3. Sistematización | no iniciada | — |

## Hecho

Sesión 2026-10-03-claude-code-01 (corrección de los LMS para que coincidan con los anexos):

- [x] 18 aulas sin «Especial» en el título (Canvas UA 113062-67, Skillnest 100-107, Chile Capacitación 126-129).
- [x] Vocabulario por cliente de la planilla 02 Recursos M2 (pestaña vocabulario) en nombres de recursos, tareas, rúbricas y etiquetas:
      `privado/vocabulario-clientes.json`; datos con `node privado/aplicar-anexos-datos.mjs`.
- [x] 7 criterios faltantes (PF1481 AE4, PF1483 AE1, PF1486 AE1-4, PF1495 AE3) en datos y aulas.
- [x] Documentos nuevos con marca del cliente (34 Google Docs, Drive naty 2.0 › «Corrección LMS según anexos (2026-10-03)»):
      generador `privado/docs-anexos/generar.mjs`, ids en `privado/docs-anexos/salida/subidos.json`; enlaces en datos con
      `node privado/aplicar-anexos-enlaces.mjs` y en las tareas (enlazarTareasChc / enlazarTareasCd / disenoV3).

Sesión inicial (cowork, 2026-09-22):

- [x] Lectura completa del punto 7.4 (pág. 26-34) de las bases 2026 → `docs/01-guia-propuesta-tecnica.md`
- [x] Lectura del Anexo N°7 (pág. 96-115) → mismo documento, secciones 5 a 7
- [x] Diff bases 2024 (OTIC SOFOFA) vs. 2026 (SENCE) → `docs/02-diff-bases-2024-2026.md`
- [x] Estructura del Anexo N°2 y mapeo criterio ↔ sección → `docs/03-anexo2-estructura.md`
- [x] Protocolo de verificadores → `docs/04-verificadores-protocolo.md`
- [x] Rúbrica convertida a dato ejecutable → `data/rubrica-subcriterios.csv` (13 subcriterios)
- [x] Umbrales por plan calculados → `data/umbrales-por-plan.csv`
- [x] Catálogo de 15 planes formativos y 6 clientes → `data/`

Esta sesión (claude-code, 2026-09-22):

- [x] Repositorio git creado, con el trabajo anterior intacto en el commit `init`
- [x] Verificación automatizada: 8 controles en `scripts/checks/`, `npm run verificar`
- [x] Marcadores `<!-- verificable: -->` en la plantilla del Anexo 2: la cobertura se cuenta, no se supone
- [x] Sistema de handoff con registro y huella de estado → `state/LEDGER.csv`, `npm run sesion`
- [x] Protocolo de auditoría cruzada entre herramientas → `AUDITORIA.md`
- [x] Hook de pre-commit y workflow de GitHub Actions
- [x] Scripts de Python portados a Node y verificados contra su salida original
- [x] Primera auditoría cruzada ejecutada: la sesión inicial revisada desde `claude-code`,
      veredicto **observaciones**, cinco hallazgos en `state/auditorias/`

Sesión claude-code, 2026-09-24:

- [x] Entregables del 24-sep traídos al repo → `entregables/2026-09-24-modulo2/`: análisis
      "Construir el módulo 2" (Diego), brainstorm ejecutivo (PDF, HTML y vista previa) y el
      panel de entregables del módulo 2 de PF1462 (ML) y PF1821 (Agentes)
- [x] PDF de las bases 2026 y 2024 versionados en `bases/` (cambio de política, `DECISIONS.md`)
- [x] `.gitignore` y control 05 ajustados: PDF solo en `bases/` y `entregables/`
- [x] Remoto definido: https://github.com/dojedacifuentes/naty.proyecto01 · `gh` 2.101.0 instalado
- [x] Panel publicado como artifact con estado compartido:
      https://claude.ai/artifact/BpgYipB5aa4YY8c4LGiDuP (48 de 80 entregables marcados bloqueados)

Sesión claude-code-03, 2026-09-24 (hito del día: módulo 2 de PF1821 y PF1822):

- [x] Extractor de SIPFOR por la API pública del catálogo → `npm run sipfor`, `data/sipfor/`, `data/planes/`
- [x] PF1821 y PF1822 extraídos: 11 y 9 módulos, horas cuadradas con el total del plan
- [x] Ficha textual y lista de entregables del módulo 2 → `npm run ficha`, `contenidos/<PF>/modulo-2/`
- [x] Flujo documentado → `docs/05-flujo-contenidos-modulo.md` + `templates/encargo-entregable.md`
- [x] Pregunta abierta #16: cómo se cuenta el "segundo módulo" con un transversal al inicio

- [x] Manual PDF de entregables del módulo 2 de PF1821 y PF1822 → `entregables/2026-09-24-modulo2/manual-entregables-modulo2-PF1821-PF1822.pdf` (`npm run manual`)

Sesión claude-code-05, 2026-09-24 (recursos educativos del módulo 2):

- [x] Kit completo en borrador para PF1821 y PF1822: 10 archivos por curso en `contenidos/<PF>/modulo-2/` (índice, bienvenida e infografía, cápsulas y cuadro comparativo, 2 herramientas didácticas, 2 actividades con respuesta modelada, indicadores, 3 instrumentos, portafolio, retroalimentación, metodología)
- [x] Kits en PDF → `entregables/2026-09-24-modulo2/kit-recursos-modulo2-PF18xx.pdf` (`npm run kit`)

- [x] PDF único con todo el módulo 2 de PF1821 y PF1822 → `entregables/2026-09-24-modulo2/modulo2-PF1821-PF1822-completo.pdf` (75 págs.)

Sesión claude-code, 2026-09-25 (UTC; en Chile seguía siendo el 24):

- [x] Zip por curso con un archivo por recurso, R01 a R13 → `npm run zip`, `scripts/zip-recursos.mjs`
- [x] Sección `modulo-2/`: portada y una carpeta por curso con el checklist de lo que piden
      las bases para el módulo 2 (citado a numeral y página), el estado de cada ítem, los
      enlaces a cada recurso y el zip del curso. Enlazada desde el `README.md` de la raíz
- [x] Primer push a https://github.com/dojedacifuentes/naty.proyecto01 (commit `1eaf1b8`);
      el workflow `verificar` de GitHub Actions pasó

Sesión claude-code-02, 2026-09-25 (meta del usuario: terminar el módulo 2 de los dos cursos
la mañana del 25, apuntando a 7,0):

- [x] Revisión contra las bases con la carpeta local de referencias → `modulo-2/REVISION-BASES.md`.
      El PDF oficial de cada plan confirma que el módulo 2 es `MA04560` y `MA04576` (#16)
- [x] AE3 declarado como aprendizaje seleccionado en los dos cursos; parte C (AE3) agregada a
      la actividad 1 de PF1822 para que tenga dos actividades
- [x] Flujo de producción → `modulo-2/FLUJO-PRODUCCION.md`, con un tablero por curso en
      `modulo-2/PF18xx-*/produccion/ESTADO.md` (19 y 20 piezas)
- [x] Bases de producción → `npm run produccion`: PPTX para HeyGen con la narración en las
      notas (bienvenida y 4 cápsulas por curso), prompts de infografía y de lectura, quiz GIFT
      por aprendizaje. Los 10 PPTX abren en PowerPoint 2007
- [x] Zip y PDF de PF1822 regenerados con la parte C

Sesión claude-code-03, 2026-09-25 (el usuario acota el alcance: recursos base neutros, sin LMS,
sin redactar el Anexo y sin instituciones):

- [x] Flujo reescrito en seis carriles paralelos → `modulo-2/FLUJO-PRODUCCION.md`; tableros
      nuevos en `modulo-2/PF18xx-*/produccion/ESTADO.md` (19 y 22 filas)
- [x] Carril automático en `npm run produccion` → `modulo-2/<curso>/entrega/`, por curso:
      4 quizzes GIFT, 9 PDF de evaluación, 4 PDF de actividades, insumos (SQL y CSV de
      PF1821; tickets en CSV de PF1822), código de las respuestas de PF1822, cuadro
      comparativo en PDF y 2 HTML de insumos para el Anexo
- [x] Base del video interactivo (herramienta 2): PPTX para HeyGen + guion con las 5 pausas para H5P
- [x] `scripts/lib/html.mjs` compartido entre el kit y la producción (el HTML del kit sale idéntico)
- [x] PDF permitidos en `modulo-2/*/entrega/`; videos y `.h5p` fuera de git (a Drive)

Sesión claude-code-04, 2026-09-25: el usuario empezó por los carriles B (videos) y C
(infografías). Se le entregaron los 12 PPT y los 10 prompts de infografía en zip, fuera del
repo. En los prompts, ninguna sección de infografía queda con menos de una idea completa.

Sesión claude-code-05, 2026-09-25: revisión textual de las 8 videocápsulas, solo de ellas, a
pedido del usuario. Cada una tiene ahora una lámina con el aprendizaje esperado y los criterios
textuales, y cada lámina lleva el contenido del plan textual. La auditoría da 8/8: AE,
criterios y todos los contenidos del plan en el PPT, y narración sin símbolos. En PF1821
se cerraron dos brechas con el plan: espacio de trabajo y navegación (AE2) e If/Switch (AE3).
El usuario recibió las cápsulas nuevas en zip.

Sesión claude-code-06, 2026-09-25: sitio en Vercel. Vercel compilaba pero servía 404 porque el
repo no tenía página ni salida. Ahora `npm run sitio` arma `public/` (85 páginas, 0 enlaces
rotos) y `vercel.json` lo publica en cada push; la portada ofrece los zips de producción. El
usuario recibió el zip completo de videos actualizado (12 PPT, con las videocápsulas textuales).

Sesión claude-code-07, 2026-09-25: prompts de infografía reescritos. Son textuales del plan y traen
medidas calculadas para cada contenido, tipografía, color, contraste, íconos, diagramación y
control final; además, especificaciones comunes y textos alternativos. La revisión da 10/10. El
usuario recibió el zip nuevo; el sitio publica el mismo.

Sesión claude-code-08, 2026-09-25: las 8 lecturas (una por aprendizaje esperado) escritas en el
repo, en `contenidos/<PF>/modulo-2/lecturas/AEn.md`, y generadas en PDF por el carril automático
(`scripts/lib/lectura.mjs`, `npm run produccion -- PF1821 PF1822 --solo-lecturas`). Cada una trae
portada con el aprendizaje textual, criterios textuales, tabla de cobertura del plan, un ejemplo del
caso por sección, errores frecuentes, síntesis, práctica, autocomprobación y glosario. Tienen de 11 a
14 páginas A4, con 2 familias tipográficas incrustadas (IBM Plex Sans y Mono, OFL, en
`scripts/fuentes/`). La generación se detiene si falta un contenido del plan: cobertura 100 % en las
8. Se eliminaron los prompts de lectura. El sitio ofrece `lecturas-modulo2.zip`.

Sesión claude-code-09, 2026-09-25: el usuario informa que hizo en HeyGen la bienvenida, las 4
videocápsulas y el video base de la herramienta 2, y las 5 infografías, en los dos cursos. Quedaron
registrados como `listo para revisión` en los ESTADO. El video interactivo (F1) tiene la base y falta
editarlo. Faltan los enlaces de Drive de los videos y los PNG en `entrega/`.

Sesión claude-code-10, 2026-09-25: herramientas didácticas rediseñadas para el 7,0 en "Uso de los
medios" (7.4, pág. 31, que pide 2 herramientas para los contenidos del aprendizaje seleccionado). En
PF1822 el notebook era del AE2 y el AE4; ahora es el "Laboratorio de prompts" del AE3, generado por el
carril A (`scripts/lib/notebook.mjs`), con los 10 contenidos del AE3 revisados solos. En PF1821 el
tutorial pasa a 17 pasos, 13 de ellos del AE3. En los dos cursos, las preguntas del video interactivo
se reorientaron al AE3 sin tocar el video base que el usuario ya grabó. Las dos herramientas quedan
en el tramo 3 de la ruta, y cada C4 trae una tabla de cobertura del AE3.

Sesión claude-code-11, 2026-09-25: solo el plan. El usuario pidió:
- las actividades con el diseño de las lecturas, un HTML para Moodle y el workflow roto;
- un PDF de respaldo y un zip por curso.

El plan, con casillas, está al comienzo de `state/HANDOFF.md` ("EN CURSO"). Incluye una corrección
técnica de PF1821: un número escrito como texto no hace fallar a Supabase ni al Switch con conversión de
tipos, como dicen hoy la misión 1 y la 5 de la actividad 2.

Sesiones claude-code-12 y -13, 2026-09-25: el plan de actividades, hecho (casillas 1 a 6 del HANDOFF).
- [x] Corrección técnica de PF1821 regenerada (el Switch compara `total`; la cantidad "3 unidades" se lee
      con `parseInt`). Cambió la pregunta 5 del guion H2 de PF1821.
- [x] Los PDF de actividades (4), evaluación (9) y cuadro comparativo de cada curso tienen el diseño de las
      lecturas (`scripts/lib/documento.mjs`): cabecera con plan, módulo y horas, ficha y 2 familias tipográficas.
- [x] Un HTML por actividad para la Tarea de Moodle (`entrega/actividades/moodle/`) y un PDF de respaldo
      con los dos enunciados por curso.
- [x] Workflow roto y corregido de PF1821, pedidos de prueba, comunas y SQL (`scripts/lib/workflow-roto.mjs`).
      **No se importó en n8n.**
- [x] Zip de actividades por curso con LEEME citado a las bases, publicado en `descargas/` del sitio.

Sesión claude-code-01, 2026-09-27: estándar de recursos de la contraparte.
- [x] Guion y PPT de bienvenida al curso y de resumen del módulo, por curso; el usuario los grabó (27-sep), falta el enlace de Drive.
- [x] 3 quiz para Canva por curso, con preguntas nuevas y validadas (falta armarlos en Canva).
- [x] Glosario del módulo en PDF, CSV y XML de Moodle; metodología en PDF; zips de Drive con glosario.
- [x] Marca por cliente (sesión -04): UNAB, Skillnest y Autónoma, con 6 cuadernillos con portada por cliente y curso; zips entregados.
- [x] PDF de indicadores de logro y organización de las actividades en la ficha y en Moodle (sesión -04).
- [x] Los 3 quiz por curso también en GIFT para Moodle (sesión -05). Pendiente: convertirlos a quiz interactivo en Canva.
- [x] Carpeta para Drive (`npm run drive`) y planilla de seguimiento en Google Sheets (`npm run planilla`), versión 1 sin enlaces de Drive (sesión -07); versión final con los enlaces de la carpeta NATY 2.0 del usuario (sesión -10); Drive ordenado para la revisión, sin zips (sesión -11).
- [x] Pruebas técnicas fuera del plan por decisión del usuario y guía de Rise (`modulo-2/GUIA-RISE.md`) (sesión -06).

Sesión claude-code-02, 2026-09-27: quizzes del módulo 2 en Canva.

- [x] Creados los 6 quizzes formativos de G3: tres para PF1821 y tres para PF1822.
- [x] Cada diseño tiene 11 páginas: portada, 5 preguntas y 5 retroalimentaciones; nombres, AE, momento de aplicación y casos ficticios verificados.
- [x] Las preguntas, alternativas, respuestas correctas y retroalimentaciones se mantuvieron literales desde `produccion/quiz-canva/Quiz-n.txt`; no se modificaron las fuentes.
- [x] Los seis enlaces quedaron registrados como `listo para revisión` en la fila G3 y en el registro de ambos `ESTADO.md`.
- [ ] Conversión a elemento Quiz interactivo: manual en Canva, porque el conector disponible solo crea y edita diseños y no expone elementos de quiz o formularios con respuestas.

Sesión claude-code-03, 2026-09-27: ZIP ordenado de los quizzes de Canva.

- [x] Exportados desde Canva los seis diseños como PDF digital, con 11 páginas verificadas por archivo.
- [x] Ordenados por curso y número en `entregables/quiz-modulo-2-canva/`, con un `LEEME.md` que conserva los seis enlaces editables.
- [x] Generado y revisado `entregables/quiz-modulo-2-canva-PF1821-PF1822.zip` (6 PDF + LEEME).

Sesión claude-code-12, 2026-09-27: compartir NATY 2.0 con Natalia.

- [ ] No se compartió: el usuario respondió "todavía no" al correo propuesto (natalia@hackea.pro).
- [x] Hallazgo: NATY 2.0 está abierta a cualquiera con el enlace **como editor**. Sin tocar; decide el usuario (#20).

Sesión claude-code-13, 2026-09-27: vista web de los quiz GIFT.

- [x] Página `quiz-modulo2.html` en el sitio de Vercel (enlace en la portada y en el menú): los 6 quiz GIFT en modo revisión
      (respuesta correcta y retroalimentación) o para contestarlos. La arma `npm run sitio` con `scripts/lib/quiz-gift.mjs`,
      que lee los `.gift` de `entrega/quiz/` en cada build; el diseño está en `scripts/lib/quiz-gift.html`.

Sesión claude-code-14, 2026-09-27: quiz GIFT enlazados en la planilla de Drive.

- [x] La vista web suma el quiz de cada AE (preguntas abiertas con respuesta esperada) y abre un quiz por ancla (`#PF1822-ae1`).
- [x] `npm run planilla` enlaza la vista: columna "Quiz GIFT (vista web)" en Resumen, columna Quiz de Aprendizajes y los `.gift` de Entregables.
- [x] Corregido el GIFT del AE1 de PF1822: la respuesta esperada de la pregunta 3 salía vacía (la fuente usa "*Respuesta, 1 punto…").
- [x] Planilla nueva en NATY 2.0, id `1WupQSaktADlUaurlkssVvXdFuDcCs8y_n0mwr0MDKGk`. **Su dueña es otra cuenta de Google (no la del usuario)**, la cuenta del
      conector de Drive, no la del usuario. La anterior (`1yjgTnjm…`) sigue en NATY 2.0 con el mismo nombre: falta decidir (#21).

Sesión claude-code-15, 2026-09-27: ordenar NATY 2.0.

- [ ] (Sesión -16) El usuario pidió los cambios en SU planilla (`1yjgTnjm…`), no en la nueva. Se editó a mano en el navegador
      integrado, sin sesión de Google: ver HANDOFF, "Planilla del usuario a medio editar".
- [x] (Sesión -16) **Logo de marca solapado con el título** en la mayoría de los PDF con marca: corregido en la sesión -17.
- [ ] Mover la planilla anterior a "Archivo (versiones anteriores)": el control de permisos de Claude Code bloqueó el movimiento (archivo del usuario, cuenta del conector ajena). Queda para el usuario.

Sesión claude-code-17, 2026-09-27: logo de marca sin solapar el título.

- [x] Cabecera de los documentos con el logo en su propia columna; portada de las lecturas en grilla (logo arriba a la izquierda, AE
      a la derecha, título abajo); tamaño del logo según su forma, leído del PNG. Todo en `scripts/marca.mjs`; el diseño neutro no cambió.
- [x] Revisión automática en `npm run marca` (`scripts/lib/revision-marca.mjs`): mide en Edge el logo y cada texto y se detiene antes de
      imprimir si se cruzan, si quedan menos de 4 mm o si algo se corta. Sobre los HTML anteriores detectó el problema en los 3 clientes.
- [x] Regenerados los 140 PDF con marca (110 documentos y 30 cuadernillos) y los 5 zips en `privado/marcas/`, y `privado/drive/Subir a NATY 2.0/`.
- [x] **Reemplazar esos PDF en Drive**: hecho en la sesión -18 (abajo). La planilla enlaza las carpetas y no cambió.

Sesión claude-code-18, 2026-09-27: reemplazar en Drive los PDF con marca corregidos (pedido del usuario tras ver la hoja de contacto).

- [x] Los 140 PDF reemplazados en NATY 2.0 (5 clientes-curso × "1 Cuadernillos" y las 9 subcarpetas con PDF de "2 Documentos"),
      desde el Chrome del usuario con su propia sesión de Google (la cuenta dueña de NATY 2.0, verificada), no con el conector (#21).
      Cada archivo quedó como **Versión 2** del mismo archivo: mismo id, mismo enlace y mismos permisos. 50 de 50 carpetas confirmadas.
- [x] Comprobado en Drive: la vista previa del Instrumento 2 de UNAB PF1822 ya muestra la cabecera nueva (logo en su columna).

Sesión claude-code-01, 2026-09-28: quiz de Canva interactivos (desde el Chrome del usuario, con su sesión de Canva).

- [x] Los 6 quiz (PF1821 y PF1822) tienen en cada página de pregunta (2, 4, 6, 8, 10) un elemento **Formulario** nativo de Canva
      con la respuesta correcta marcada, etiqueta "Elige tu respuesta", botón "Responder", colores del diseño y Montserrat 22.
      Se borraron los recuadros estáticos A-D y el texto "Selecciona una alternativa.". 30 de 30 verificadas por DOM (aria-pressed).
- [x] Revisados los duplicados del Quiz 1 y el Quiz 2 de PF1821 (se borraron dos formularios pegados de más).
- [x] (Segundo chat) Revisado en Canva, sin tocar: los 6 diseños siguen con 11 páginas y los 30 formularios están guardados.
- [ ] Gamificación en Canva: **a medias solo en PF1821 Quiz 1**, hecha con **Archivo → Encuentra y reemplaza texto** (Ctrl+F): portada
      "MISIÓN · 5 NIVELES · QUIZ FORMATIVO SIN NOTA", preguntas "NIVEL n DE 5 · AEx" y retroalimentaciones "+1 ★ · COMPLETASTE EL NIVEL n".
      La barra de progreso 1/5 a 5/5 ya venía en el diseño. No se siguió: el doble clic en un texto del lienzo congeló Canva y Claude in
      Chrome se desconectó (límite de uso). Los otros 5 Canva no tienen gamificación.
- [x] **Quiz gamificados (G9)**, a pedido del usuario: `npm run quiz-juego` (`scripts/quiz-juego.mjs` + `scripts/lib/quiz-juego.html`)
      genera en `modulo-2/<curso>/entrega/quiz/` los 6 quiz como misión de 5 niveles (puntos, estrellas, 2 intentos, insignia de oro,
      plata o bronce, siguiente parada y revisión de respuestas), en HTML de un archivo y en paquete SCORM 1.2 que registra el puntaje
      en Moodle. Preguntas desde los GIFT de G8; misión, insignias y siguiente parada en `R-quiz-canva.md`. El sitio los publica
      (portada, "Quiz del módulo 2").
- [x] Probado en Edge headless con un LMS SCORM simulado: partida mixta en PF1821 Quiz 1 (250 puntos, bronce, SCORM 50, "completed")
      y partida perfecta en los 6 (oro, SCORM 100); capturas de portada, nivel, final y pantallas de 375 y 320 px.
      `npm run produccion -- PF1821 PF1822 --sin-pdf` sigue leyendo `R-quiz-canva.md` (GIFT y txt idénticos; PPTX restaurados).
      `npm run sitio`: 0 enlaces rotos. `npm run verificar`: 0 errores, los 4 avisos de siempre.
- [ ] Sin importar en un Moodle real ni en Rise. Sin push: el sitio no los muestra hasta que se suba.
- [ ] Nota: dos capturas de pantalla del portapapeles del usuario se pegaron por error en Canva y se borraron del diseño, pero pueden quedar en "Subidos" de Canva.
- [ ] Rise (lecturas por cliente, G5): sin empezar.

Sesión claude-code-02, 2026-09-28: quiz del módulo 2 en la planilla de revisión (pedido del usuario: "sube a git… necesito todos los
quizzes para subirlos a la planilla donde Natalia revisa").

- [x] Push de `38a5832`: los 6 juegos y sus SCORM responden en el sitio (200), igual que la página de cada carpeta `entrega/quiz/`.
- [x] Planilla del usuario (`1yjgTnjm…`), editada en el navegador integrado sin sesión de Google y comprobada con la descarga en xlsx:
      Resumen con la columna R "Quiz gamificados (juego y SCORM)" ("Jugar los 3 quiz" por curso) y el subtítulo al 28-09-2026;
      columna Q "Quiz GIFT (vista web)" corregida (Q6 a PF1821) y completada (Q7 a Q9, PF1822); Entregables filas 84 a 95 (grupo
      "Quiz formativos gamificados"); Pendientes: Canva "Hecho" y fila 11 con la revisión de la contraparte (#22).
- [x] `npm run planilla` genera lo mismo (`scripts/planilla.mjs`): 91 entregables, 7 pendientes.
- [ ] En la planilla siguen como estaban: Aprendizajes F y las filas .gift de Entregables (descargan el GIFT; la vista web está en Q).

Sesión claude-code-03, 2026-09-28: quiz gamificados con diseño de videojuego tecnológico (pedido: "full bonitos, llamativos,
tecnológicos, no planos").

- [x] `scripts/lib/quiz-juego.html` rehecho: fondo animado por curso (circuito en PF1821, red neuronal en PF1822), paneles de vidrio
      con neón, HUD con ruta de niveles, XP, estrellas, energía y sonido; portada con ilustración animada propia de cada quiz; XP con
      combos, 3 de energía, comodín 50:50, nivel final, logros y medalla animada. Estilos por curso y quiz en `ESTILOS`
      (`scripts/quiz-juego.mjs`), con etiquetas revisadas contra las respuestas. Mismos archivos y enlaces.
- [x] Probado en Edge headless (desde PowerShell): partida perfecta en los 6 (900 XP visibles, oro, SCORM 100), mixta con comodín
      en PF1821 Quiz 1 (375, bronce, 42), plata en PF1822 Quiz 3, movimiento reducido (625, plata, 69) y pantallas de 375 y 320 px.
      Corregidos en la prueba: contador de XP negativo o detenido, cartel de nivel sobre la pantalla final, encabezado encimado en
      celular. `npm run sitio`: 0 enlaces rotos. `npm run verificar`: 0 errores.
- [ ] Sin probar en un Moodle real ni en un celular físico; el sonido no se escuchó (se probó que no rompe nada).

Sesión claude-code-04, 2026-09-28: quiz gamificados como archivos en Drive y en la planilla (pedido: "que cada archivo esté dentro
del google sheet y que Natalia pueda verlo… no desde el vercel sino como archivo independiente… crea la casilla").

- [x] En Drive del usuario, NATY 2.0 → cada curso → "4 Quiz" → nueva carpeta **"Quiz gamificados (juego y SCORM)"** con sus 6
      archivos (3 HTML y 3 SCORM). Subidos desde el navegador integrado con la sesión de Google que abrió el usuario; idénticos a los
      del repo (SHA-256 antes de subir y en la descarga anónima), tipos `text/html` y `application/zip`, dueño el usuario, y se abren
      con el enlace sin sesión (heredan "cualquiera con el enlace" de NATY 2.0, #20). Ids en `privado/drive/enlaces.json` (`quizJuego`).
- [x] Planilla del usuario (`1yjgTnjm…`), comprobada con la descarga en xlsx: en Resumen, la columna del juego pasó a 4 casillas,
      **R, S y T "Quiz 1/2/3 gamificado (archivo)"** (cada una abre su HTML en Drive) y **U "Quiz gamificados: juegos y SCORM (carpeta)"**;
      el resto se corrió 3 columnas (Infografías en V, Observaciones en Z). Subtítulo A2: cómo se abren. En Entregables, F84 a F95
      "Abrir en Drive" (ya no Vercel) y A2 lo explica. Aprendizajes y Pendientes sin cambios.
- [x] `npm run planilla` genera las mismas casillas y enlaces (mismo archivo de Drive para los 12 entregables; en el generador las
      filas del juego van dentro de cada curso, en la planilla al final, como antes). `npm run drive` separa ahora "Quiz Moodle (GIFT)"
      de "Quiz gamificados (juego y SCORM)". `npm run verificar`: 0 errores.
- [ ] Drive muestra el HTML como código en su vista previa: Natalia tiene que descargarlo y abrirlo (lo dice la planilla).

Sesión claude-code-01, 2026-09-29: planes formativos oficiales de los 15 cursos (pedido: "necesito un archivo que señale lo que
pide el plan formativo oficial del sence para cada curso"; antes, revisar que los guiones de video usen los términos del plan).

- [x] Guiones de video de PF1821 y PF1822 cotejados con la ficha SIPFOR y con los PDF oficiales de `PF SENCE a licitar`: los 115 textos
      del plan que citan (aprendizajes, criterios, contenidos) son idénticos, y las notas de los .pptx y las copias de Drive coinciden
      con los guiones. La voz traduce algunos términos ("casos borde" por "casos edge", "depuración" por "debugging", etc.) y hay
      detalles en las preguntas de los videos interactivos: el usuario dijo que **así está bien, son detalles leves**. No se tocó nada.
- [x] `npm run sipfor -- --todos`: los 13 planes que faltaban quedan en `data/planes/` y `data/sipfor/` (PF1821 y PF1822 sin cambios).
- [x] Nueva `npm run planes` (`scripts/planes-oficiales.mjs`) → `privado/drive/Planes-Formativos-SENCE-TD2026.xlsx`, enviado al usuario:
      Resumen (15 cursos, módulo 2), Módulo 2 (84 aprendizajes con criterios y contenidos textuales), Todos los módulos (151, se
      muestran en el LMS), Qué evalúan las bases (tabla maestra de docs/01) y Fuentes. Coteja el módulo 2 contra el PDF oficial:
      **12 de 15 iguales**; PF1487, PF1485 y PF1493 no tienen PDF en la carpeta (quedan con el dato de SIPFOR, sin cotejar).
- [x] El escritor de .xlsx pasó de `scripts/planilla.mjs` a `scripts/lib/xlsx.mjs` (compartido); `npm run planilla` genera el
      mismo archivo byte a byte. Se agregó alto de fila automático y saltos de línea en celdas.
- [x] Control 05: los patrones débiles (la palabra clave seguida de dos puntos) ya no se aplican a `data/planes/` ni `data/sipfor/` (un contenido de PF1485 que lista
      "componentes clave" daba falso positivo). `npm run verificar`: 0 errores.
- [ ] Horas que no cuadran en SIPFOR (#24): el total del plan difiere de la suma de módulos en PF1462, PF1487, PF1485, PF1493 y PF1495,
      y de la planilla de oferta en PF1482 y PF1493. La planilla lo marca en amarillo.
- [ ] La planilla no está en Drive: se entregó el archivo. Subirla (convertida en Google Sheets) si el usuario lo pide.

Sesión claude-code-02, 2026-09-29: un quiz formativo por aprendizaje esperado (pedido del usuario: "debe ser un quizz por
aprendizaje esperado del modulo 2 de cada curso… tomando la misma dinámica de gamificación… el formato scorm está bien").

- [x] `R-quiz-canva.md` de PF1821 y PF1822: 4 quiz por curso, **Quiz n = AEn**, 5 preguntas cada uno. El Quiz 1 anterior (AE1 y AE2) se
      separó: 5 preguntas nuevas por curso (2 del AE1 y 3 del AE2), revisadas contra la prueba objetiva (`entrega/AEn/M2-AEn-Quiz.gift`)
      y el video interactivo para no repetir. Las del AE3 y el AE4 no cambiaron (antes Quiz 2 y 3). Insignias nuevas: «Analista de
      procesos» (PF1821 AE1) y «Arquitecto/a de IA» (PF1822 AE1); el resto se mantiene, en su nuevo número.
- [x] Generadores sin el "3" fijo: `produccion.mjs` (tantos quiz como aprendizajes de la ficha; cada pregunta, del AE de su quiz),
      `quiz-juego.mjs` (tantos como "## Quiz n"; estilo nuevo para el Quiz 1 de cada curso), `planilla.mjs` (4 columnas de juegos),
      `sitio.mjs` y `lib/quiz-gift.*`.
- [x] Regenerados los 4 GIFT, los 4 textos para Canva y los 8 juegos con su SCORM. Probados en Edge headless con un `window.API`
      falso: los 8 se juegan completos (5 niveles, oro, 900 XP) y registran `score.raw=100` y `completed`. `npm run verificar`: 0 errores.
- [ ] **Canva (G3) desactualizado:** los 6 diseños tienen el reparto anterior; hay que rehacerlos con 4 quiz por curso (y sus formularios).
- [ ] **Drive y planilla del usuario desactualizados:** los 6 archivos de "Quiz gamificados (juego y SCORM)" son la versión de 3 quiz y
      faltan los del Quiz 4; la hoja de Google tiene 3 columnas de juegos. `npm run planilla` ya genera 4.
- [ ] Sin push: el sitio publicado sigue con la versión anterior.

Sesión claude-code-03, 2026-09-29: quiz por aprendizaje esperado en Drive y en la planilla de Google (pedido: "deja subido el quizz x
aprendizaje esperado en casillas diferentes por cursos… los juegos en casillas diferentes bien ordenado"; "los de Canva elimínalos, no los
usaremos"; "los demás juegos antiguos sácalos de ese drive").

- [x] Drive (Claude in Chrome, sesión del usuario): en "4 Quiz" de cada curso, los 8 juegos/SCORM, los 4 GIFT y en "9 Producción → Quiz
      (texto)" los 4 textos; 3 de cada grupo como **nueva versión** (mismo id y enlace) y los del Quiz 4 nuevos. Tamaños iguales a los del
      repo (32 de 32). Ids del Quiz 4 en `privado/drive/enlaces.json`.
- [x] A la papelera de Drive (recuperables 30 días): las 2 carpetas "Quiz Canva (PDF)" y las 5 subcarpetas "quiz" de "2 Documentos" de
      cada cliente, que solo tenían los 3 GIFT del reparto anterior. No quedaron juegos antiguos en otras carpetas (búsqueda en todo el Drive).
- [x] Planilla "01 Planilla de seguimiento" (`1yjgTnjm…`): en Resumen, R a U = "Quiz AE1 … AE4 gamificado (archivo)" con su enlace por
      curso (U insertada; la carpeta pasó a V). En Entregables, filas 90–91 (PF1821) y 98–99 (PF1822) con el Quiz 4 (HTML y SCORM).
      Comprobado leyendo la hoja.
- [x] Canva: el usuario pidió no seguir. Alcanzó a quedar en la papelera de Canva 1 diseño ("PF1821 · M2 · Quiz 2 · Transformar datos");
      los otros 5 siguen. Las columnas "Quiz 1/2/3" (Canva) de la planilla no se tocaron: la de PF1821 Quiz 2 apunta a ese diseño.

Sesión claude-code-04, 2026-09-29: planilla sin las casillas que ya no se usan (pedido: "hay que eliminar las casillas y links que no
usaremos, como los quizzes antiguos"; el usuario eligió eliminar también los GIFT formativos).

- [x] Hoja de Google "01 Planilla de seguimiento": en Resumen se borraron las columnas "Quiz 1/2/3" (Canva), "Quiz (PDF y Moodle)" y
      "Quiz GIFT (vista web)"; los juegos quedaron en M–P (Quiz AE1 a AE4) y su carpeta en Q. En Entregables se borraron las 6 filas
      "Quiz formativos (Moodle)" (GIFT). En Pendientes se borró la fila de Canva y la #22 dice "Revisar los 4 quiz gamificados…".
      Comprobado leyendo la hoja. Se mantiene el GIFT de la prueba objetiva por aprendizaje (hoja Aprendizajes y filas "M2-AEn-Quiz.gift").
- [x] `scripts/planilla.mjs` genera lo mismo (sin Canva ni GIFT formativos): 22 columnas en Resumen, 89 entregables, 6 pendientes.
- Los archivos GIFT siguen en Drive ("4 Quiz → Quiz Moodle (GIFT)") y en el repo; solo salieron de la planilla.

Sesión claude-code-01, 2026-09-30: ABP individual y ABPRO grupal por aprendizaje esperado (pedido: "crear una abp individual y abpro
grupal de cada aprendizaje esperado del modulo 2… deben poder formularse en texto para subirlas fácil… luego subirlos al google sheets
lo más ordenado posible"). El usuario eligió: ABP y ABPRO (16 en total), un Google Doc por actividad, solo el enunciado; y luego pidió
también PDF, quitar la duración de las actividades y no mostrar rótulos internos ("textual", "oficial").

- [x] `contenidos/<PF>/modulo-2/R-abp-abpro.md` (fuente) y `npm run abp` → `modulo-2/<curso>/entrega/abp-abpro/`: 8 HTML (para pegar en
      una Tarea de Moodle o en un Doc) y 8 PDF por curso. Valida un ABP y un ABPRO por AE, que cubran todos los criterios del AE y las
      secciones de cada tipo. Aprendizajes y criterios: mismas palabras de la ficha (66 de 66), en minúsculas.
- [x] Drive (Chrome del usuario): carpeta "5 ABP y ABPRO" en cada curso con 8 Google Docs (M2-AEn-ABP-individual / -ABPRO-grupal) y
      8 PDF. Ids en `privado/drive/enlaces.json` (`abpAbpro`). Texto de cada Doc comprobado con su exportación a .txt.
- [x] Hoja de Google: pestaña nueva "ABP y ABPRO" (una fila por AE, con título, Google Doc y PDF de cada actividad); Resumen R = "ABP y
      ABPRO (carpeta)" (las columnas siguientes se corrieron: Infografías pasó a S); Pendientes, fila 6 (crear las Tareas en el LMS).
- [ ] Sin push. Las actividades nuevas no están en el Anexo 2 (VI b sigue con las actividades 1 y 2 de C2) ni en la ruta de horas.

Sesión claude-code-03, 2026-09-30: evaluación y cierre del módulo 2 (pedido: "actividad final del modulo 2, integradora (sin
referenciar los aprendizajes esperados…), una evaluacion diagnostica, autoevaluacion, una co-evaluacion por pares, y una evaluacion
final de portafolio… Y finalmente, un glosario del modulo 2"; en PDF, sin duración, con el texto del plan sin decir "textual" ni
"oficial"). El usuario pidió hacerlos desde cero porque los de B3/B4 solo se referían a las actividades 1 y 2.

- [x] `contenidos/<PF>/modulo-2/R-evaluacion-modulo.md` y `R-glosario-integrador.md` (fuentes) y `npm run evaluacion`
      (`scripts/evaluacion-modulo.mjs`, `scripts/lib/plan.mjs`) → `modulo-2/<curso>/entrega/evaluacion-modulo/`: 7 PDF por curso y el
      glosario en CSV y XML de Moodle. El generador pone el texto del plan desde la ficha y no genera si falta un contenido del plan
      en la actividad final o en el glosario, si la actividad final nombra un aprendizaje o un criterio, o si aparece una duración o
      "textual"/"oficial".
- [x] Drive: carpeta "6 Evaluación y cierre" en cada curso (7 PDF y el XML). Ids en `privado/drive/enlaces.json` (`evaluacionModulo`).
- [x] Hoja de Google: pestaña "Evaluación y cierre" (14 filas), Resumen S = "Evaluación y cierre (carpeta)" (Infografías pasó a T),
      Pendientes filas 7 y 8.
- [ ] Sin push. La sección V del Anexo 2 (B2 instrumento 2, B3, B4) no está alineada con estos insumos (fila 8 de Pendientes).

Sesión claude-code-04, 2026-09-30: qué exige 2026 del módulo 2 de cada curso, contrastado con 2024 (pedido: "hagas una planilla
de cada curso del modulo 2 lo que exigen las bases respecto a esos cursos. verbos importantes etc… contrasta etc para luego ir a ver que
recursos aun nos sirven").

- [x] `npm run requisitos` (`scripts/requisitos-modulo2.mjs`) → `privado/drive/Requisitos-Modulo2-TD2026.xlsx`: Resumen (15 cursos),
      Qué exigen las bases (16 exigencias con numeral y página), Verbos (42, por nivel de Bloom), Cambios 2024-2026 (14) y una pestaña
      por módulo 2 (12: los 4 Entry level comparten una), con una fila por criterio y 3 columnas vacías para anotar la revisión.
- [x] Datos nuevos: `data/verbos-bloom.csv` (verbo → nivel) y `data/modulo2-cambios-2024-2026.csv`; `privado/drive/recursos-2024.json`
      (carpetas "Contenido M2" del Drive 2024, fuera de git).
- [x] Contraste hecho: los 13 planes que existían en 2024 tienen **el mismo módulo 2** (nombre, horas, aprendizajes, criterios y
      contenidos) que el plan usado en la licitación 2024 (Drive "Talento Digital 2024 Licitación → PF Sofofa 2024"). Solo cambian
      verbos y redacción (competencia de MB00162, 8 textos de PF1483, 3 criterios de PF1487, 2 erratas) y la modalidad (2026: solo
      e-learning). PF1821 y PF1822 son nuevos. Los Anexos 2 de referencia de otras instituciones confirman lo mismo.
- [ ] La planilla no está en Drive: se entregó como archivo. El paso siguiente (revisar recurso por recurso) no empezó.

Sesión claude-code-05, 2026-09-30: exigencias 2026 del módulo 2, sistematizadas (pedido: "revisa nuevamente, haz una planilla de
excel clara que sea util tambien un pdf y sube los cambios al repo de github y tambien a una hoja distinta dentro de la planilla que
estamos trabajando… destaca los verbos… prioriza sistematizar lo que se exige este 2026").

- [x] `npm run exigencias` (`scripts/exigencias-modulo2.mjs`, antes `requisitos-modulo2.mjs`) → `entregables/2026-09-30-exigencias-modulo2/`:
      Excel de 20 pestañas y PDF de 49 páginas (versión pública), más `privado/drive/Exigencias-Modulo2-2026-con-enlaces.xlsx` y
      `privado/drive/Hoja-Exigencias-2026-M2.xlsx` (una hoja, para la planilla de seguimiento).
- [x] Cada aprendizaje y criterio leído como verbo + objeto + condición (`scripts/lib/verbos.mjs`), con el verbo en negrita y en el
      color de su nivel; los que no traen condición quedan marcados. Pestaña "Qué exige cada curso": cantidades para el 7,0 por plan.
- [x] `scripts/lib/xlsx.mjs`: texto enriquecido, etiquetas por nivel, filas de sección, celdas combinadas por rango y color de pestaña;
      y `autoFilter` antes de `mergeCells`, como pide el esquema (Excel es estricto; Google Sheets no).
- [x] Planilla de seguimiento: pestaña nueva **"Exigencias 2026 M2"** (gid 1792720012), importada desde Chrome; revisada con su CSV:
      12 cursos, 12 competencias, 63 AE, 203 criterios, enlaces a Drive 2024.
- [x] Push a GitHub (incluye los commits sin subir de sesiones anteriores).

Sesión claude-code-06, 2026-09-30: texto canónico del módulo 2 de PF1821 y PF1822 para cotejar Rise (pedido: "necesito un documento
que me diga… la info canonica sin interpretarla, sino como aparece en las bases y en el plan formativo… para copiar y pegar").

- [x] `npm run canonico` (`scripts/texto-canonico.mjs`) → `entregables/2026-09-30-texto-canonico-modulo2/`: Excel de 13 pestañas (una por
      aprendizaje esperado, con columna para pegar lo de Rise y fórmula que dice IDÉNTICO / SOLO CAMBIAN MAYÚSCULAS / DISTINTO) y HTML
      con botones de copiar.
- [x] El texto sale de los campos crudos de SIPFOR (`data/sipfor/`), no de `data/planes/`. Los 126 textos se verificaron contra el PDF
      oficial de SIPFOR (`data/sipfor/<plan>/plan-oficial.txt`; los PDF en `privado/sipfor/`). La fórmula se probó en Excel.
- [x] `scripts/lib/xlsx.mjs`: fórmulas, celda de entrada y formato condicional (compatible con lo anterior).
- [ ] No se abrió Rise: el cotejo lo hace el usuario con la planilla. No se subió a Drive ni a la planilla de seguimiento.

Sesión claude-code-07, 2026-09-30: respuestas del usuario a las preguntas abiertas (tras una revisión del repo que pidió el usuario).

- [x] **#1 resuelta:** solo se desarrolla el módulo 2, en los 15 cursos; los demás módulos se muestran nombrados en el LMS de cada
      cliente, sin desarrollo.
- [x] **#5 resuelta (quién):** los LMS los arma el usuario.
- [x] **#13 resuelta (cierre):** la licitación cierra el **lunes 5 de octubre de 2026**; desde el 30-sep quedan 3 días hábiles. Hora sin
      confirmar.
- [ ] #3: el usuario dijo adjuntar la matriz cliente × curso (Excel y captura), pero no llegó. Pedida de nuevo.
- [x] #20, #6 y #16: explicados o preguntados aquí y respondidos en la sesión -08 (abajo).

Sesión claude-code-08, 2026-09-30: más respuestas del usuario.

- [x] **#6 resuelta:** LMS propio de cada institución (no el de SENCE).
- [x] **#16 resuelta:** el módulo 2 es el "Módulo N°2" del PDF oficial de cada plan (se cuenta el transversal).
- [x] **#20 resuelta:** NATY 2.0 se queda "cualquiera con el enlace, editor" ("trabajamos juntos, no hay problema"), con el riesgo
      explicado. No se tocó el permiso.
- [ ] #3: el usuario preguntó "¿tablas de qué?"; se le aclaró que es la lista de qué cliente postula a qué curso.

Sesión claude-code-09, 2026-09-30: corregir los 8 cursos base de Rise del módulo 2 contra el plan (encargo del usuario transmitido
por la sesión "Branding de Skillnest para Rise" y confirmado aquí).

- [x] Revisión de los 8 cursos de Rise, lección por lección, contra el texto de SIPFOR → `modulo-2/REVISION-RISE.md` (qué estaba mal).
- [x] Corregidos y verificados recargando: título (`<NOMBRE DEL PLAN> · MÓDULO 2 · AE<n>`), descripción de portada, lección
      "Ficha del módulo" primera y textual, y el aprendizaje y los criterios de las lecciones de introducción de PF1821 AE1 y AE2 y
      PF1822 AE3 y AE4.
- [x] Fichas por curso en `modulo-2/<curso>/rise/ficha-AE<n>.md` (las genera `npm run canonico`).
- [x] `modulo-2/GUIA-RISE.md`: estructura con título y ficha, y "Marca del cliente" pasa a "Apply a brand" con las marcas de Articulate.
- [x] Paso 2 y paso 3: hechos en la sesión -10 (abajo).

Sesión claude-code-10, 2026-09-30: el usuario revisó los 8 base, pidió quitar un encabezado y dio el OK para duplicar y marcar.

- [x] La "Ficha del módulo" de los 8 base ya no empieza con "Texto oficial del plan formativo" (pedido del usuario): el bloque pasó
      de "Paragraph with heading" a "Paragraph". El resto de la ficha, comparado con la ficha del repo después de recargar: igual en los 8.
- [x] 20 copias en Rise, con el mismo título que el base (sin "Copy of"), en tres carpetas privadas nuevas: UNAB (8), Skillnest (8) y
      U Autónoma (4). Ids en `modulo-2/REVISION-RISE.md`.
- [x] Cada copia con la marca de su cliente (Theme → Apply a brand). Revisado recargando: marca, color del tema (UNAB #A6192E,
      Skillnest #0C8DC9, U Autónoma #DA291C) y AE del título, 20 de 20 correctos. Los 8 base siguen sin marca.
- [ ] No se publicó, compartió, exportó ni envió a Review 360.

Sesión claude-code-11, 2026-09-30: etiquetas de Rise en español en las 20 copias (pedido del usuario, con captura de Settings → Labels).

- [x] Las 20 copias con el juego de etiquetas "Spanish". Antes había 4 en English (PF1821 AE1 UNAB y PF1822 AE1 × 3) y 2 en "Copy of
      Spanish", que tiene los mismos textos. Revisado recargando: 20 de 20 en "Spanish", con los 224 textos iguales.
- [ ] Los 8 cursos base no se revisaron: el pedido fue solo para las copias.

Sesión claude-code-12, 2026-09-30: las 20 copias de Rise, sin alusiones al plan formativo ni a lo "oficial" (pedido del usuario, con 8
capturas).

- [x] Se leyó el contenido completo de las 20 copias y se corrigió:
      - Ficha: sin línea de fuente, con los rótulos "Curso" y "Competencia del curso";
      - "criterios/textos/contenidos/lectura oficiales" y frases "alineado con el plan formativo", "de manera literal",
        "tal como exige el plan";
      - encabezados "Alineación con el plan formativo" y títulos "criterios oficiales";
      - 2 bloques borrados ("Este recurso se basa/se centra exclusivamente…").
- [x] Verificado releyendo cada curso: 0 cambios pendientes y solo quedan usos legítimos ("documentación oficial" de OpenAI y
      Hugging Face). La ficha es idéntica a la del repo en 20 de 20 y sigue siendo la primera lección. Sin bloqueos de edición.
- [x] `npm run canonico` genera las fichas nuevas: sus huellas coinciden con Rise.
- [ ] Los 8 cursos base siguen con esos textos: corregirlos antes de volver a duplicar.

Sesión claude-code-13, 2026-09-30: SCORM de las 20 copias (pedido del usuario, con captura de la planilla).

- [x] Las 20 copias exportadas a SCORM 1.2 desde Rise, en `privado/rise-scorm/`. En cada zip se comprobaron el id de la copia, el
      color de la marca, las etiquetas en español y que no haya alusiones al plan formativo.
- [x] En Drive, dentro de cada cliente, la carpeta "3 Lecturas Rise (SCORM)" con sus 4 zip. Los 20 enlaces descargan el zip exacto
      sin iniciar sesión.
- [x] En la planilla, Resumen G a J ("Lectura AE1 a AE4 Rise (SCORM)") con un enlace por cliente y curso. En Pendientes, la fila 5
      pasó a "Hecho" y la fila 23 nueva es "subir al LMS".
- [ ] Subirlos al LMS de cada cliente: lo hace el usuario.

Trabajo del 30-09 en `privado/` (chat de cotejo de recursos 2023 y 2024, antes de abrir la sesión -01 del 1-oct UTC; fuera de git
porque trae enlaces a Drive):

- [x] Planilla de seguimiento, pestañas nuevas o reemplazadas (gid en `privado/drive/enlaces.json`): «Recursos M2 - qué sirve»,
      «Plan chequeo M2», «Enunciados AE vs 2026» (cotejo palabra por palabra del enunciado de cada AE en los materiales
      anteriores), «Plan 2026 M2 textual» (competencia, AE, criterios y contenidos por curso, con columnas para cotejar) y
      «Quiz M2 por AE» (un quiz por AE y si funciona; ver la sesión de abajo).
- [x] PDF `privado/drive/Cambios-Recursos-M2-vs-2026.pdf` (qué cambia en flipbooks, quiz e infografías frente al plan 2026) y
      `privado/drive/Plan2026-Modulo2-Textual.pdf` (49 págs.: el módulo 2 de los 12 planes de «PF SENCE a licitar», textual).
- [x] Los 12 PDF oficiales de la carpeta de Drive «PF SENCE a licitar» (14, 17 y 24-sep) en `privado/drive/planes-2026-pdf/`.
      `verificar-m2.mjs` comprueba que el módulo 2 de `data/planes/*.json` dice lo mismo, palabra por palabra (única diferencia:
      «NAVBARS Y FORMS» con mayúscula en Entry level). PF1487, PF1485 y PF1493 no están en esa carpeta.

Sesión claude-code-01, 2026-10-01 UTC (30-sep en Chile): quiz gamificados para los cursos con quiz de Genially que no funcionan
(pedido: "haz en lugar de quizz gamificacion de cada uno de esos recursos donde haya que corregir uno o mas aprendizajes esperados
… para cada curso con todos los elementos de gamificacion. exportables mismo formato scorm para lms y html" y "recuerda aplicar los
criterios del nuevo plan formativo 2026 para cada curso de cada ae").

- [x] 22 quiz gamificados, uno por AE de los cuatro cursos con algún quiz roto: PF1481 (5), PF1483 (7), PF1486 (6) y PF1495 (4).
      Fuente: `contenidos/<PF>/modulo-2/R-quiz-canva.md` (5 preguntas por quiz, escritas sobre los criterios de evaluación 2026, con
      la cobertura de cada criterio al final). Salida: `modulo-2/<PF>-<curso>/` con juego HTML, SCORM 1.2 y GIFT por quiz, README y
      un zip del curso. Casos ficticios: Distribuidora Pehuén, Observatorio Cordillera, Textiles del Maule y Librería Fiordo.
- [x] `scripts/lib/quiz-canva.mjs` (nuevo): valida R-quiz-canva.md y arma el GIFT para cursos sin kit. `scripts/quiz-juego.mjs`:
      cursos con `kit: false`, filtro por curso (`npm run quiz-juego -- PF1481`), zip y README por curso, y arreglo de `<`, `>` y `&`
      (el juego mostraba "&lt;": afectaba el Quiz 4 de PF1822, regenerado). PF1821 y PF1822 salen idénticos salvo ese quiz.
- [x] Control 05: no revisa `privado/` si el archivo no está en git (falsos positivos en textos extraídos de flipbooks; las sesiones
      -09 a -13 del 30-sep cerraron forzadas por eso). `npm run verificar`: 0 errores.
- [x] Probado en Chrome con un servidor local: los 22 abren sin errores de JavaScript; 4 se jugaron completos y, con una API SCORM
      1.2 simulada, registran inicio, incompleto, puntaje 0-100 y completado.
- [x] Planilla, pestaña «Quiz M2 por AE» reemplazada: cada AE de esos cuatro cursos muestra su quiz gamificado 2026 (funciona).
- [ ] Revisión humana del contenido de las 110 preguntas (las escribieron cuatro subagentes; las revisé una por una contra el plan).
- [x] Subidos a Drive en la sesión -03 (ver abajo). Al LMS, no.

Sesión claude-code-03, 2026-10-01: planilla nueva de recursos del módulo 2 para los 15 cursos de la postulación 2026 (pedido: "hagamos
un excel nuevo… Todos deben tener: video presentacion, video resumen, quizz por cada aprendizaje esperado (usar los nuevos…),
infografía por cada aprendizaje esperado, flipbook por cada aprendizaje esperado, salvo los 2 cursos… donde usamos Rise" y "señala
cuando haya recurso inexistente, o cuando haya discrepancia grave").

- [x] Google Sheet nueva «02 Recursos M2 · Licitación 2026 (15 cursos)» en NATY 2.0 (id en `privado/drive/enlaces.json` →
      `recursosM2_2026`). Pestañas: Resumen por curso, Recursos por AE (un renglón por AE con el texto 2026 y el enlace a lectura,
      infografía y quiz), Alertas (por gravedad), Descartados y otros, y Leyenda. La genera
      `privado/drive/recursos-2026/planilla-recursos-2026.mjs` → `privado/drive/Recursos-M2-Licitacion-2026.xlsx`.
- [x] Resultado: 282 recursos exigidos; 162 listos, 26 por ajustar, 21 por revisar (videos sin ver), 72 no existen y 1 no cuadra con su
      AE (flipbook 2024 del AE6 de PF1483: portada de otro plan). PF1821 y PF1822 están completos; PF1487, PF1485 y PF1493 no tienen nada.
- [x] Los 22 quiz gamificados de PF1481, PF1483, PF1486 y PF1495 en Drive: NATY 2.0 → carpeta nueva del curso → «4 Quiz gamificados»
      (70 archivos: HTML, SCORM y GIFT por quiz, y el zip del curso). Comprobados byte a byte contra el repo; se descargan sin sesión.
- [x] Enlaces comprobados: 173 de 182 responden sin sesión; 9 solo con acceso (4 infografías 2024 de PF1482 de otra cuenta y 5 videos
      2023 de Entry level del usuario). La planilla los marca.

Sesión claude-code-04, 2026-10-01: revisión del usuario sobre la planilla de recursos, más 14 infografías 2026.

- [x] Estados que el usuario aprobó como Listo ("aprueba, no requiere ajuste"): PF1481 lectura AE2; PF1483 lectura AE4; PF1462 lectura
      AE3 y quiz AE4 y AE5; todos los recursos por AE de PF1486; Entry level (los 4 cursos) lectura AE2 y todo el AE7.
- [x] 14 infografías 2026, una por AE, con los contenidos y criterios 2026: PF1481 (5, reemplazan a las de 2024), PF1483 (7, no tenía) y
      Entry level AE3 y AE4 (las de 2023 estaban borradas). `npm run infografias` (nuevo, `scripts/infografias.mjs`): fuente
      `contenidos/<PF>/modulo-2/R-infografias.json`, valida cada contenido contra el plan y que no quede ninguno fuera, y saca el PNG
      con Edge headless por DevTools. Salida en `modulo-2/<carpeta>/entrega/infografias/` (PNG, README y textos alternativos).
- [x] Subidas a NATY 2.0 → carpeta del curso → «3 Infografías» (Entry level: carpeta nueva «PF1474 PF1477 PF1478 PF1479 - Entry level,
      Fundamentos de Desarrollo Front-End»). Ids en `privado/drive/recursos-2026/infografias-drive.json`; 17 de 17 idénticas al repo.
- [x] Planilla «02 Recursos M2» reimportada (mismo archivo; cambian los gid de las pestañas): 197 listos, 7 por ajustar, 20 por revisar
      (videos), 57 no existen (PF1487, PF1485 y PF1493) y 1 no cuadra (flipbook AE6 de PF1483).

Sesión claude-code-05, 2026-10-01: quiz e infografías de los 3 cursos que no tenían recursos (pedido: "desarrolla los elementos del
modulo 2 por aprendizaje esperado de cada curso … quizz en formato html y scorm por aprendizaje esperado, infografia por aprendizaje
esperado … y luego subelo a la planilla").

- [x] 17 quiz gamificados (HTML, SCORM 1.2 y GIFT), uno por AE y con 5 preguntas sobre los criterios 2026:
      - PF1487: 6 quiz, caso Lácteos Calafate;
      - PF1485: 5 quiz, caso Buses Quillay;
      - PF1493: 6 quiz, caso Clínica Quintral.
      Fuente: `contenidos/<PF>/modulo-2/R-quiz-canva.md`; se generan con `npm run quiz-juego -- PF1487 PF1485 PF1493`.
- [x] 17 infografías 2026, una por AE: `contenidos/<PF>/modulo-2/R-infografias.json` y `npm run infografias -- PF1487 PF1485 PF1493`.
      El validador ahora revisa tema por tema y acepta repartir una lista entre paréntesis en varias secciones. Las erratas de este plan
      se muestran corregidas.
- [x] En NATY 2.0, carpetas nuevas «PF1487 - Fundamentos de Ingeniería de Datos», «PF1485 - Fundamentos DevOps» y «PF1493 - Seguridad
      Cloud», cada una con «3 Infografías» y «4 Quiz gamificados». Tienen 74 archivos, 74 de 74 idénticos al repo y descargables sin
      sesión. Los ids están en `privado/drive/recursos-2026/`.
- [x] Planilla «02 Recursos M2» reimportada: 231 listos, 7 por ajustar, 20 por revisar (videos), 23 no existen y 1 no cuadra. Los 23 son
      los 2 videos y los flipbooks por AE de PF1487, PF1485 y PF1493.

Sesión 2026-10-02-06 (aulas de Chile Conductores):

- [x] Moodle de Chile Capacitación, cursos ocultos 126 PF1486 · 127 PF1495 · 128 PF1462 · 129 PF1482, armados con `privado/chc-moodle/builder-chc.js`.
- [x] ABP y ABPRO 2026 por aprendizaje esperado de PF1486 (12) y PF1495 (8), y actividad final de los 4 (`contenidos/<PF>/modulo-2/`),
      en PDF, en Drive (NATY 2.0) y como Tareas con el PDF adjunto en cada aula.

## A medias

- **Los entregables del módulo 2 de PF1821 y PF1822 están en borrador, sin revisión humana.**
  Falta la etapa 3 del flujo (revisión de Natalia) y `IV-actividades.md` (todos los módulos).
  El código Python de PF1822 no se ejecutó: en esta máquina no hay Python.
  Todas las casillas de `modulo-2/PF18xx-*/README.md` están sin marcar por eso: se marcan
  cuando una persona revisa el recurso.
- **Recursos base del módulo 2.** El carril A (automático, que ahora incluye las 8 lecturas) está `listo para revisión`. Faltan
  los carriles B y C, que hizo el usuario, sin los enlaces de Drive ni los PNG en el repo. Faltan el notebook
  tutorial de PF1821 con capturas (17 pasos), ya no hay pruebas técnicas, H5P ni capturas del tutorial (decisión del usuario, 27-sep); falta
  notebook en Colab en PF1822, y editar los 2 videos interactivos H5P con las preguntas nuevas.
  El avance real está en los `ESTADO.md` de cada curso.

Lo que existe pero **nunca se ha ejercido de verdad**: el sistema de verificación no ha
visto una propuesta real, solo dos de prueba que se borraron. Los umbrales de conteo y el
0,75 de similitud son razonables sobre el papel y están sujetos a calibración.

## Bloqueado

| Qué | Bloqueado por | Quién destraba |
| --- | --- | --- |
| Revisión de los Anexos 2 de referencia | Hay una descarga local desde el 25-sep (#4); falta confirmar que es la carpeta completa | Natalia |
| Auditoría de verificadores | Depende de lo anterior | Natalia |
| Matriz real cliente × plan | No definida | Natalia |
| Hora exacta del cierre (5-oct) | El usuario dio solo la fecha (#13) | Usuario |
| Fichas de cliente (LMS, infraestructura, docentes) | No levantadas | Natalia + cada cliente |
| Acceso de escritura al repo | Solo el dueño de la cuenta; falta decidir quién más (#14) | Usuario / Diego |

## Números que ordenan el trabajo

- 15 planes formativos, 2.670 cupos
- 45 Anexos 2 con 3 clientes confirmados; 90 con los 6
- 89 actividades de extensión distintas por cliente para sacar 7.0 en D3
- El plan más exigente es PF1477 (483 h): 10 actividades de extensión solo para él
- **Cierre de ofertas: lunes 5 de octubre de 2026** (usuario, 30-sep, #13). Según las bases, a las 18:00 del décimo día hábil tras la
  publicación del llamado; la hora está por confirmar
- Alcance (#1): solo el módulo 2 de cada curso; los demás módulos, solo nombrados en el LMS de cada cliente
- LMS (#5, #6): los arma el usuario, en el LMS propio de cada institución
- Módulo 2 (#16): el "Módulo N°2" del PDF oficial de cada plan
- Periodo de consultas: 5 días hábiles tras la publicación

## Estado de la verificación

`npm run verificar` → 8 controles, 0 errores, 4 avisos (los mismos del 22-sep). Desde la sesión 2026-10-01-claude-code-01 el
control 05 ya no falla: las sesiones -09 a -13 del 30-sep cerraron forzadas por falsos positivos en `privado/`, que no se versiona.

- 3 avisos del control 06: afirmaciones sobre las bases sin numeral ni página en
  `docs/03-anexo2-estructura.md:41`, `:43` y `docs/04-verificadores-protocolo.md:17`.
  Son citas reales de las bases a las que les falta la referencia exacta.
- 1 aviso del control 07: las sesiones de `claude-code` siguen sin auditar (ocho al abrir
  esta). No pueden auditarse solas: le tocan a Codex, a Cursor o a una persona.

La sesión inicial ya está auditada (veredicto **observaciones**). Sus tres hallazgos
accionables están en el handoff como trabajo corto: la columna `fuente` en
`data/clientes.csv` y las tres citas de las bases sin numeral.

## Siguiente paso concreto

**Desde 2026-10-03:** la referencia de las aulas son los «Anexos 2 VF» (Drive 14243kbNjYSzIi681Q_RTUvWg_XS_kN8w, 18 anexos). La
comparación (`privado/docs-anexos/comparacion-anexos2.md`) dice que AE, criterios, ABP y ABPRO coinciden, pero la evaluación del módulo
no coincide en 9 anexos (OPEN-QUESTIONS #26): decidir con Natalia si se cambia el anexo o el aula.


Desde la sesión 2026-10-01-claude-code-03 el usuario se ordena con la planilla «02 Recursos M2 · Licitación 2026 (12 cursos)». PF1487, PF1485 y
PF1493 **ya no se postulan** (decisión del usuario, 01-10, sesión -07): se sacaron de la planilla y de data/planes-formativos.csv;
no trabajes en ellos. Quedan 12 cursos. Reglas del aula (02-10): sin horas, minutos ni modalidad y «Aprendizaje esperado N»; aplicadas en PF1821/PF1822, Drive y Moodle (sesión 2026-10-02-03). Hay hojas por cliente para cargar el LMS (sesión 2026-10-02-01); faltan ABP/ABPRO de PF1495 y el enunciado de la actividad final de PF1462, PF1486, PF1495 y Entry level. Sus videos quedaron listos (sesión -06, en «Resumen por curso» y en columnas E-H de «Recursos por AE»). Además falta:
- compartir con enlace los 6 videos que piden acceso (resumen 2026 de PF1486, de maibe@hackea.pro; los 5 de Entry level 2023);
- resolver lo que el usuario no aprobó: lecturas AE1, AE2, AE5 y AE7 de PF1483 (y su AE6, que no cuadra), lectura e infografía AE2 de
  PF1462 y lectura AE4 de PF1495;
- que una persona revise el contenido de las 31 infografías y los 17 quiz nuevos.

Ver `state/HANDOFF.md`.
