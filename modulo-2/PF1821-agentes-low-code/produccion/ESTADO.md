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
| B1 ★ | B | Videocápsula AE3 | `M2-AE3-Videocapsula.mp4` | `videos/AE3-capsula.pptx` | pendiente | | |
| B2 ★ | B | Video base de la herramienta 2 ("Expresiones y depuración") | `M2-Herramienta-2-Video.mp4` | `videos/H2-video-interactivo.pptx` | pendiente | | |
| B3 | B | Videocápsulas AE1, AE2 y AE4 | `M2-AEn-Videocapsula.mp4` | `videos/AEn-capsula.pptx` | pendiente | | |
| B4 | B | Video de bienvenida | `M2-Bienvenida.mp4` | `videos/00-bienvenida.pptx` | pendiente | | |
| C1 ★ | C | Infografía AE3 | `entrega/AE3/M2-AE3-Infografia.png` | `infografias/prompts.md` | pendiente | | |
| C2 | C | Infografías AE1, AE2 y AE4 | `entrega/AEn/M2-AEn-Infografia.png` | `infografias/prompts.md` | pendiente | | |
| C3 | C | Infografía de la ruta del módulo | `entrega/00-bienvenida/M2-Ruta-Infografia.png` | `infografias/prompts.md` | pendiente | | |
| D1 ★ | D | Lectura AE3 (con glosario) | `entrega/AE3/M2-AE3-Lectura.pdf` | `lecturas/prompts.md` | pendiente | | |
| D2 | D | Lecturas AE1, AE2 y AE4 | `entrega/AEn/M2-AEn-Lectura.pdf` | `lecturas/prompts.md` | pendiente | | |
| E1 ★ | E | Herramienta 1: tutorial "Tu primer workflow" con capturas | `entrega/herramientas/M2-Herramienta-1-Tutorial.pdf` | `C4` herramienta 1 | pendiente | | |
| E2 ★ | E | Workflow roto de la actividad 2 + 6 pedidos de prueba + tabla `comunas` | `entrega/actividades/M2-Actividad-2-workflow-roto.json` e `insumos/` | `C2` actividad 2 | pendiente | | |
| F1 ★ | F | Herramienta 2: video interactivo con 5 preguntas (espera a B2) | `M2-Herramienta-2-Interactivo.h5p` | MP4 de B2 + `videos/H2-video-interactivo-guion.md` | pendiente | | |
| R1 | — | Revisión de Natalia contra el checklist de `../README.md` | — | todo lo anterior | pendiente | | |

Pendiente que no es una pieza: quién paga las cuentas de n8n y Supabase en cada institución
(`state/OPEN-QUESTIONS.md` #5 y #6). No bloquea esta etapa.

## Registro

Una línea por pieza terminada o cambio de estado: fecha, pieza, quién (persona o IA) y qué quedó.

- 2026-09-25 · bases de B, C y D · claude-code · generadas con `npm run produccion`: PPTX con narración, prompts de infografía y de lectura.
- 2026-09-25 · A1–A6 · claude-code · carril automático generado: 4 quizzes, 9 PDF de evaluación, 4 PDF de actividades, insumos, cuadro comparativo e insumos para el Anexo.
- 2026-09-25 · B2 · claude-code · agregada la base del video de la herramienta 2 (PPTX + guion con las 5 pausas para H5P).
