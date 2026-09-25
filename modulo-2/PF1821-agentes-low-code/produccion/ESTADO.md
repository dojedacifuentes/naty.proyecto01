# PF1821 · Módulo 2 · Estado de producción

Tablero del flujo de `../../FLUJO-PRODUCCION.md`, con una fila por pieza. El alcance son los
recursos base neutros y listos para subir: no incluye LMS, Anexo 2 ni instituciones.

**Estados:** `pendiente` → `en curso (quién)` → `listo para revisión` → `revisado (quién)`.
**★ = aprendizaje seleccionado (AE3): va primero en cada carril.**
Los videos y los `.h5p` van a Drive; su enlace va en la columna "Archivo o enlace".

| # | Carril | Pieza | Archivo final | Base | Estado | Archivo o enlace | Quién |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A1 | A | Quizzes AE1 a AE4 (3 preguntas c/u) | `entrega/AEn/M2-AEn-Quiz.gift` | `B2` instrumento 3 | listo para revisión | `entrega/AE1…AE4/` | claude-code |
| A2 | A | 9 documentos de evaluación | `entrega/evaluacion/*.pdf` | `B2`, `B3` y `B4` | listo para revisión | `entrega/evaluacion/` | claude-code |
| A3 ★ | A | Actividades 1 y 2: enunciado y respuesta modelada | `entrega/actividades/*.pdf` | `C2` | listo para revisión | `entrega/actividades/` | claude-code |
| A4 | A | Insumos de la actividad 1: tabla `pedidos` (SQL) y pedidos históricos (CSV) | `entrega/actividades/insumos/` | `C2` | listo para revisión | `entrega/actividades/insumos/` | claude-code |
| A5 | A | Cuadro comparativo n8n · Make · Zapier | `entrega/medios/M2-Cuadro-comparativo.pdf` | `R-capsulas` R04 | listo para revisión | `entrega/medios/` | claude-code |
| A6 | A | Insumos para el Anexo 2 (secciones V y VI) | `entrega/insumos-anexo/*.html` | `B1` a `B4`, `C`, `C2`, `C4` | listo para revisión | `entrega/insumos-anexo/` | claude-code |
| B1 ★ | B | Videocápsula AE3 | `M2-AE3-Videocapsula.mp4` | `videos/AE3-capsula.pptx` | listo para revisión | `PENDIENTE:` enlace de Drive | usuario |
| B2 ★ | B | Video base de la herramienta 2 ("Expresiones y depuración") | `M2-Herramienta-2-Video.mp4` | `videos/H2-video-interactivo.pptx` | listo para revisión | `PENDIENTE:` enlace de Drive | usuario |
| B3 | B | Videocápsulas AE1, AE2 y AE4 | `M2-AEn-Videocapsula.mp4` | `videos/AEn-capsula.pptx` | listo para revisión | `PENDIENTE:` enlace de Drive | usuario |
| B4 | B | Video de bienvenida | `M2-Bienvenida.mp4` | `videos/00-bienvenida.pptx` | listo para revisión | `PENDIENTE:` enlace de Drive | usuario |
| C1 ★ | C | Infografía AE3 | `entrega/AE3/M2-AE3-Infografia.png` | `infografias/prompts.md` | listo para revisión | `PENDIENTE:` copiar los PNG a `entrega/` | usuario |
| C2 | C | Infografías AE1, AE2 y AE4 | `entrega/AEn/M2-AEn-Infografia.png` | `infografias/prompts.md` | listo para revisión | `PENDIENTE:` copiar los PNG a `entrega/` | usuario |
| C3 | C | Infografía de la ruta del módulo | `entrega/00-bienvenida/M2-Ruta-Infografia.png` | `infografias/prompts.md` | listo para revisión | `PENDIENTE:` copiar los PNG a `entrega/` | usuario |
| D1 ★ | A | Lectura AE3 (con glosario) | `entrega/AE3/M2-AE3-Lectura.pdf` | `contenidos/PF1821/modulo-2/lecturas/AE3.md` | listo para revisión | `entrega/AE3/` | claude-code |
| D2 | A | Lecturas AE1, AE2 y AE4 | `entrega/AEn/M2-AEn-Lectura.pdf` | `contenidos/PF1821/modulo-2/lecturas/AEn.md` | listo para revisión | `entrega/AE1/`, `AE2/`, `AE4/` | claude-code |
| E1 ★ | E | Herramienta 1 (AE3): tutorial "Tu primer workflow con datos limpios", 17 pasos con capturas | `entrega/herramientas/M2-Herramienta-1-Tutorial.pdf` | `C4` herramienta 1 | pendiente | | |
| E2 ★ | E | Workflow roto de la actividad 2 + 6 pedidos de prueba + tabla `comunas` | `entrega/actividades/insumos/pedidos_enrutados_v0.json` (+ `pedidos_prueba.json`, `comunas.csv`, `actividad-2-tablas.sql`) y `respuesta-modelada/pedidos_enrutados_corregido.json` | `C2` actividad 2 · `scripts/lib/workflow-roto.mjs` | listo para revisión | `PENDIENTE:` importarlo en n8n y ejecutar los 6 pedidos (no hay n8n en la máquina donde se generó) | claude-code |
| F1 ★ | F | Herramienta 2: video interactivo con 5 preguntas (espera a B2) | `M2-Herramienta-2-Interactivo.h5p` | MP4 de B2 + `videos/H2-video-interactivo-guion.md` | en curso (usuario): falta editar el interactivo sobre el video base | `PENDIENTE:` enlace de Drive | usuario |
| R1 | — | Revisión de Natalia contra el checklist de `../README.md` | — | todo lo anterior | pendiente | | |

Pendiente que no es una pieza: quién paga las cuentas de n8n y Supabase en cada institución
(`state/OPEN-QUESTIONS.md` #5 y #6). No bloquea esta etapa.

## Registro

Una línea por pieza terminada o cambio de estado: fecha, pieza, quién (persona o IA) y qué quedó.

- 2026-09-25 · bases de B, C y D · claude-code · generadas con `npm run produccion`: PPTX con narración, prompts de infografía y de lectura.
- 2026-09-25 · A1–A6 · claude-code · carril automático generado: 4 quizzes, 9 PDF de evaluación, 4 PDF de actividades, insumos, cuadro comparativo e insumos para el Anexo.
- 2026-09-25 · B2 · claude-code · agregada la base del video de la herramienta 2 (PPTX + guion con las 5 pausas para H5P).
- 2026-09-25 · B1 y B3 · claude-code · videocápsulas revisadas (zip `videocapsulas-revisadas-modulo2.zip`): lámina 2 con el aprendizaje esperado y los criterios textuales, y cada lámina rotulada con el contenido del plan textual. **Reemplazan a los PPT de cápsula anteriores.**
- 2026-09-25 · C1–C3 · claude-code · prompts de infografía reescritos (zip `infografias-modulo2.zip` del sitio): aprendizaje, competencia y contenidos del plan textuales; medidas calculadas para cada contenido; tipografía, color, contraste, íconos, diagramación y control final. Incluye textos alternativos. **Reemplazan a los prompts anteriores.**
- 2026-09-25 · D1 y D2 · claude-code · las 4 lecturas escritas en el repo y generadas en PDF por el carril automático (zip `lecturas-modulo2.zip` del sitio): portada con el aprendizaje textual, criterios textuales, tabla de cobertura del plan (100 %), ejemplo del caso por sección, errores frecuentes, autocomprobación y glosario. Diseño A4 con 2 familias tipográficas. **Reemplazan a los prompts de lectura, que se eliminaron.**
- 2026-09-25 · B1 a B4, C1 a C3 y F1 · usuario (registrado por claude-code) · el usuario informa que están listos los videos (bienvenida, videocápsulas AE1 a AE4 y video base de la herramienta 2) y las 5 infografías. El interactivo (F1) tiene la base y falta editarlo. Faltan los enlaces de Drive de los videos y copiar los PNG a `entrega/`.
- 2026-09-25 · C4, E1 y F1 · claude-code · herramientas didácticas rediseñadas para el AE3 (pauta 7.4, pág. 31): el tutorial pasa a 17 pasos, con los pasos 5 a 17 del AE3, y las preguntas del video interactivo se reorientan al AE3 sin cambiar el video base. Para F1, usar las preguntas nuevas del guion.
- 2026-09-25 · E2 · claude-code · workflow roto de la actividad 2 generado desde una sola definición con su versión corregida para el tutor: las 5 fallas de las misiones y el bonus, los 6 pedidos fijados en el Webhook, 40 comunas (Isla de Pascua fuera a propósito: es la misión 3) y el SQL. El JSON se valida al generar; falta importarlo y ejecutarlo en n8n.
