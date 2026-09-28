# PF1822 · Módulo 2 · Estado de producción

Tablero del flujo de `../../FLUJO-PRODUCCION.md`, con una fila por pieza. El alcance son los
recursos base neutros y listos para subir: no incluye LMS, Anexo 2 ni instituciones.

**Estados:** `pendiente` → `en curso (quién)` → `listo para revisión` → `revisado (quién)`.
**★ = aprendizaje seleccionado (AE3): va primero en cada carril.**
Los videos y los `.h5p` van a Drive; su enlace va en la columna "Archivo o enlace".

| # | Carril | Pieza | Archivo final | Base | Estado | Archivo o enlace | Quién |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | A | Quizzes AE1 a AE4 (3 preguntas c/u) | `entrega/AEn/M2-AEn-Quiz.gift` | `B2` instrumento 3 | listo para revisión | `entrega/AE1…AE4/` | claude-code |
| A2 | A | 9 documentos de evaluación | `entrega/evaluacion/*.pdf` | `B2`, `B3` y `B4` | listo para revisión | `entrega/evaluacion/` | claude-code |
| A3 ★ | A | Actividades 1 (partes A, B y C) y 2: enunciado y respuesta modelada | `entrega/actividades/*.pdf` | `C2` | listo para revisión | `entrega/actividades/` | claude-code |
| A4 | A | Tickets T1 a T5 de la actividad 2 (CSV) | `entrega/actividades/insumos/actividad-2-tickets.csv` | `C2` | listo para revisión | `entrega/actividades/insumos/` | claude-code |
| A5 | A | Código de las respuestas modeladas (`cliente_ia.py`, `test_cliente_ia.py`, `preprocesar.py`, `evaluar.py`) | `entrega/actividades/respuesta-modelada/codigo/` | `C2` | listo para revisión | `entrega/actividades/respuesta-modelada/codigo/` | claude-code |
| A6 | A | Cuadro comparativo de familias de modelos generativos | `entrega/medios/M2-Cuadro-comparativo.pdf` | `R-capsulas` R04 | listo para revisión | `entrega/medios/` | claude-code |
| A7 | A | Insumos para el Anexo 2 (secciones V y VI) | `entrega/insumos-anexo/*.html` | `B1` a `B4`, `C`, `C2`, `C4` | listo para revisión | `entrega/insumos-anexo/` | claude-code |
| B1 ★ | B | Videocápsula AE3 | `M2-AE3-Videocapsula.mp4` | `videos/AE3-capsula.pptx` | listo para revisión | `PENDIENTE:` enlace de Drive | usuario |
| B2 ★ | B | Video base de la herramienta 2 ("Del prompt a la respuesta") | `M2-Herramienta-2-Video.mp4` | `videos/H2-video-interactivo.pptx` | listo para revisión | `PENDIENTE:` enlace de Drive | usuario |
| B3 | B | Videocápsulas AE1, AE2 y AE4 | `M2-AEn-Videocapsula.mp4` | `videos/AEn-capsula.pptx` | listo para revisión | `PENDIENTE:` enlace de Drive | usuario |
| B4 | B | Video de bienvenida | `M2-Bienvenida.mp4` | `videos/00-bienvenida.pptx` | listo para revisión | `PENDIENTE:` enlace de Drive | usuario |
| C1 ★ | C | Infografía AE3 | `entrega/AE3/M2-AE3-Infografia.png` | `infografias/prompts.md` | listo para revisión | `PENDIENTE:` copiar los PNG a `entrega/` | usuario |
| C2 | C | Infografías AE1, AE2 y AE4 | `entrega/AEn/M2-AEn-Infografia.png` | `infografias/prompts.md` | listo para revisión | `PENDIENTE:` copiar los PNG a `entrega/` | usuario |
| C3 | C | Infografía de la ruta del módulo | `entrega/00-bienvenida/M2-Ruta-Infografia.png` | `infografias/prompts.md` | listo para revisión | `PENDIENTE:` copiar los PNG a `entrega/` | usuario |
| D1 ★ | A | Lectura AE3 (con glosario) | `entrega/AE3/M2-AE3-Lectura.pdf` | `contenidos/PF1822/modulo-2/lecturas/AE3.md` | listo para revisión | `entrega/AE3/` | claude-code |
| D2 | A | Lecturas AE1, AE2 y AE4 | `entrega/AEn/M2-AEn-Lectura.pdf` | `contenidos/PF1822/modulo-2/lecturas/AEn.md` | listo para revisión | `entrega/AE1/`, `AE2/`, `AE4/` | claude-code |
| D3 ★ | A | Herramienta 1 (AE3): notebook "Laboratorio de prompts" | `entrega/herramientas/M2-Herramienta-1-Notebook.ipynb` | `contenidos/PF1822/modulo-2/notebook/` | listo para revisión | `entrega/herramientas/` | claude-code |
| E1 ★ | E | Probar el notebook de D3 en Colab | (mismo archivo, corregido) | D3 | no aplica: sin pruebas técnicas por decisión del usuario (27-sep) | | usuario |
| E2 ★ | E | Correr `pytest` sobre el código de A5; si falla, corregir en `contenidos/` y regenerar | (A5 probado) | A5 | no aplica: sin pruebas técnicas por decisión del usuario (27-sep) | | usuario |
| F1 ★ | F | Herramienta 2: video interactivo con 5 preguntas (espera a B2) | `M2-Herramienta-2-Interactivo.h5p` | MP4 de B2 + `videos/H2-video-interactivo-guion.md` | no aplica: decisión del usuario (27-sep); queda el video base (B2) | | usuario |
| G1 | B | **Video de bienvenida al curso** (estándar de la contraparte: reemplaza como bienvenida al de B4, que era del módulo) | `M2-Bienvenida-Curso.mp4` | `videos/00-bienvenida-curso.pptx` + guion (`contenidos/…/R-videos-curso.md`, V1) | listo para revisión | `PENDIENTE:` enlace de Drive (carpeta "3 Videos") | usuario |
| G2 | B | **Video resumen del módulo 2** | `M2-Resumen-Modulo.mp4` | `videos/90-resumen-modulo.pptx` + guion (`R-videos-curso.md`, V2) | listo para revisión | `PENDIENTE:` enlace de Drive (carpeta "3 Videos") | usuario |
| G3 | F | **3 quiz en Canva** (Quiz 1: AE1 y AE2 · Quiz 2: AE3 · Quiz 3: AE4), formativos, 5 preguntas c/u | enlace de Canva | `quiz-canva/Quiz-n.txt` (`R-quiz-canva.md`) | listo para revisión | [Quiz 1](https://www.canva.com/d/MZd1u3ZMa9Y3upm) · [Quiz 2](https://www.canva.com/d/6lppz9fjI2awQl1) · [Quiz 3](https://www.canva.com/d/c_aXfKVPGet6EgP) | claude-code |
| G4 | A | **Glosario del módulo** (31 términos de las 4 lecturas) | `entrega/glosario/M2-Glosario.pdf`, `.csv` y `-Moodle.xml` | glosarios de `lecturas/AEn.md` | listo para revisión | `entrega/glosario/` | claude-code |
| G5 | C | **Lecturas en Rise** (en lugar de flipbook), una lección por lectura | enlace de Rise | `entrega/AEn/M2-AEn-Lectura.pdf` · pasos en `modulo-2/GUIA-RISE.md` | pendiente | | usuario |
| G6 | A | **Branding por cliente** de los PDF (UNAB, Skillnest y U. Autónoma) y **cuadernillos** con portada del cliente: lecturas, actividades, evaluación, metodología y medios, tutor, y glosario aparte (`npm run marca -- <cliente>`) | `privado/marcas/<cliente>/<PF>/cuadernillos/` y zip `<cliente>-<PF>-modulo2.zip` (fuera de git) | `privado/marcas/<cliente>/marca.json` + logo | listo para revisión | entregado al usuario por chat; no se versiona | claude-code |
| G7 | A | **Indicadores de logro** en PDF (faltaba como documento) | `entrega/evaluacion/M2-Indicadores.pdf` | `B1-indicadores.md` | listo para revisión | `entrega/evaluacion/` | claude-code |
| G8 | A | **Quiz 1 a 3 en GIFT para Moodle** (mismas preguntas que G3, con retroalimentación) | `entrega/quiz/M2-Quiz-n-Moodle.gift` | `R-quiz-canva.md` | listo para revisión | `entrega/quiz/` · sin importar en un Moodle real | claude-code |
| G9 | A | **Quiz 1 a 3 gamificados**: misión de 5 niveles con puntos, estrellas, 2 intentos por nivel e insignia de oro, plata o bronce (mismas preguntas que G3 y G8) | `entrega/quiz/M2-Quiz-n-Juego.html` y `M2-Quiz-n-Juego-SCORM.zip` | GIFT de G8 + misión, insignia y siguiente parada de `R-quiz-canva.md` · `npm run quiz-juego` | listo para revisión | `entrega/quiz/` · probado en Edge con un LMS SCORM simulado; sin importar en un Moodle real | claude-code |
| R1 | — | Revisión de Natalia contra el checklist de `../README.md` | — | todo lo anterior | pendiente | | |

Pendiente que no es una pieza: quién provee las claves de práctica de OpenAI y Hugging Face en
cada institución (`state/OPEN-QUESTIONS.md` #5 y #6). No bloquea esta etapa; para E1 y E2
basta una clave de prueba.

## Registro

Una línea por pieza terminada o cambio de estado: fecha, pieza, quién (persona o IA) y qué quedó.

- 2026-09-25 · bases de B, C y D · claude-code · generadas con `npm run produccion`: PPTX con narración, prompts de infografía y de lectura.
- 2026-09-25 · A3 · claude-code · agregada la parte C (AE3) a la actividad 1 para que el AE3 tenga dos actividades.
- 2026-09-25 · A1–A7 · claude-code · carril automático generado: 4 quizzes, 9 PDF de evaluación, 4 PDF de actividades, tickets en CSV, código de las respuestas, cuadro comparativo e insumos para el Anexo.
- 2026-09-25 · B2 · claude-code · agregada la base del video de la herramienta 2 (PPTX + guion con las 5 pausas para H5P).
- 2026-09-25 · B1 y B3 · claude-code · videocápsulas revisadas (zip `videocapsulas-revisadas-modulo2.zip`): lámina 2 con el aprendizaje esperado y los criterios textuales, y cada lámina rotulada con el contenido del plan textual. **Reemplazan a los PPT de cápsula anteriores.**
- 2026-09-25 · C1–C3 · claude-code · prompts de infografía reescritos (zip `infografias-modulo2.zip` del sitio): aprendizaje, competencia y contenidos del plan textuales; medidas calculadas para cada contenido; tipografía, color, contraste, íconos, diagramación y control final. Incluye textos alternativos. **Reemplazan a los prompts anteriores.**
- 2026-09-25 · D1 y D2 · claude-code · las 4 lecturas escritas en el repo y generadas en PDF por el carril automático (zip `lecturas-modulo2.zip` del sitio): portada con el aprendizaje textual, criterios textuales, tabla de cobertura del plan (100 %), ejemplo del caso por sección, errores frecuentes, autocomprobación y glosario. Diseño A4 con 2 familias tipográficas. **Reemplazan a los prompts de lectura, que se eliminaron.**
- 2026-09-25 · B1 a B4, C1 a C3 y F1 · usuario (registrado por claude-code) · el usuario informa que están listos los videos (bienvenida, videocápsulas AE1 a AE4 y video base de la herramienta 2) y las 5 infografías. El interactivo (F1) tiene la base y falta editarlo. Faltan los enlaces de Drive de los videos y copiar los PNG a `entrega/`.
- 2026-09-25 · C4, D3 y F1 · claude-code · herramientas didácticas rediseñadas para el AE3 (pauta 7.4, pág. 31): el notebook pasa a ser "Laboratorio de prompts" del AE3 y queda generado por el carril A (falta probarlo en Colab, E1); las preguntas 1 y 2 del video interactivo se reorientan al AE3 sin cambiar el video base. Para F1, usar las preguntas nuevas del guion.
- 2026-09-27 · G1 a G6 · claude-code · la contraparte revisó los entregables y pidió su estándar (planilla "Recursos a desarrollar"): bienvenida al curso (no al módulo), video resumen del módulo, 3 quiz en Canva, glosario, lecturas en Rise y marca de cada cliente en los PDF. Quedan hechos los guiones y PPT de G1 y G2, el contenido de G3, el glosario (G4) y el comando de marca (G6), sin logos todavía.
- 2026-09-27 · G3 · claude-code · creados en Canva los 3 quiz formativos del módulo 2 (11 páginas cada uno: portada, 5 preguntas y 5 retroalimentaciones), con el texto literal de `quiz-canva/Quiz-n.txt`; estado listo para revisión. El conector no permite crear el elemento Quiz interactivo: la conversión queda manual en Canva.
- 2026-09-27 · G6 y G7 · claude-code · marca de UNAB, Skillnest y U. Autónoma aplicada a los 22 PDF del módulo, con logo y colores tomados de sus manuales (Skillnest: del logo y del sitio, sin manual), y 6 cuadernillos por cliente con portada, presentación e índice (el glosario aparte). Nuevo PDF de indicadores de logro. Las actividades declaran su organización (individual, con momentos en grupo), tomada de la metodología.
- 2026-09-27 · G8 · claude-code · los 3 quiz de Canva también en GIFT para Moodle, para que el intento quede en el LMS. La conversión de G3 a quiz interactivo de Canva queda pendiente: el conector no lo permite y hace falta una sesión de Canva en el navegador (Claude in Chrome no estaba conectado).
- 2026-09-27 · carril E · usuario (registrado por claude-code) · no se harán pruebas técnicas (n8n, pytest, Colab): se da por hecho que el código y el workflow funcionan. Se quitaron los avisos de "sin ejecutar" de los entregables. Siguen pendientes las capturas del tutorial de PF1821 (E1), que son contenido.
- 2026-09-27 · G1 y G2 · usuario (registrado por claude-code) · el usuario informa que están listos los videos de bienvenida al curso y de resumen del módulo. Falta subirlos a la carpeta "3 Videos" de cada cliente en Drive.
- 2026-09-27 · F1 y E1 · usuario (registrado por claude-code) · fuera del plan: no se editan los videos interactivos H5P ni se toman las capturas del tutorial de PF1821.
- 2026-09-28 · G3 · claude-code (en el Chrome del usuario) · los 3 quiz de Canva son interactivos: un Formulario nativo en cada página de pregunta, con la respuesta correcta marcada (15 de 15). Sin gamificación en Canva: se hizo aparte (G9).
- 2026-09-28 · G9 · claude-code · los 3 quiz como juego en HTML y en paquete SCORM 1.2 (`npm run quiz-juego`), generados desde los GIFT de G8: insignias «Conector/a de APIs», «Diseñador/a de prompts» y «Evaluador/a de resúmenes». Probados en Edge: partida perfecta en los 3 (oro, SCORM 100) y vista en pantallas de 375 y 320 px.
- 2026-09-28 · G9 · claude-code · publicados en el sitio (https://naty-proyecto01.vercel.app, carpeta `entrega/quiz/` de cada curso) y enlazados en la planilla de revisión del usuario ("01 Planilla de seguimiento"): columna "Quiz gamificados (juego y SCORM)" en Resumen, 12 filas en Entregables ("Quiz formativos gamificados") y la revisión de la contraparte en Pendientes (#22).
- 2026-09-28 · G9 · claude-code · rediseño pedido por la contraparte ("full bonitos, llamativos, tecnológicos, no planos"): interfaz de videojuego con fondo animado por curso (circuito en PF1821, red neuronal en PF1822), color e ilustración propios por quiz, XP con combos, 3 de energía, comodín 50:50, nivel final, logros y medalla animada. Mismos nombres de archivo: los enlaces del sitio y de la planilla no cambian. Probado en Edge: partida perfecta en los 6 (900 XP, oro, SCORM 100), mixta con comodín (375, bronce, 42), movimiento reducido y pantallas de 375 y 320 px.
- 2026-09-28 · G9 · claude-code · los 6 archivos (3 juegos HTML y 3 SCORM) subidos a Drive, NATY 2.0 → PF1822 → "4 Quiz" → "Quiz gamificados (juego y SCORM)", y enlazados como archivo en la planilla de revisión: Resumen R, S y T (un quiz por casilla) y U (la carpeta), y Entregables F90 a F95 ("Abrir en Drive", ya no el sitio). Idénticos a los del repo (SHA-256).
