# PF1822 · Módulo 2 · Estado de producción

Tablero de avance del flujo de `../../FLUJO-PRODUCCION.md`. Una fila por pieza.

**Estados posibles:** `pendiente` → `en curso (quién)` → `listo para revisión` → `revisado (quién)`.
Una pieza está terminada cuando tiene enlace y está `revisado`.

**Aprendizaje esperado seleccionado: AE3.** Las piezas marcadas con ★ son las suyas y van primero.

| # | Pieza | AE | Criterio | Base | Herramienta | Estado | Enlace o archivo final | Quién |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P01 | Video de bienvenida | — | C3 | `videos/00-bienvenida.pptx` | HeyGen | pendiente | | |
| P02 | Videocápsula AE1 | AE1 | C4 | `videos/AE1-capsula.pptx` | HeyGen | pendiente | | |
| P03 | Videocápsula AE2 | AE2 | C4 | `videos/AE2-capsula.pptx` | HeyGen | pendiente | | |
| P04 ★ | Videocápsula AE3 | AE3 | C4 | `videos/AE3-capsula.pptx` | HeyGen | pendiente | | |
| P05 | Videocápsula AE4 | AE4 | C4 | `videos/AE4-capsula.pptx` | HeyGen | pendiente | | |
| P06 | Infografía de la ruta | todos | C3 | `infografias/prompts.md` | Genially o Canva | pendiente | | |
| P07 | Infografías AE1, AE2 y AE4 | cada uno | C4 | `infografias/prompts.md` | Genially o Canva | pendiente | | |
| P08 ★ | Infografía AE3 | AE3 | C4 | `infografias/prompts.md` | Genially o Canva | pendiente | | |
| P09 | Quiz AE1 a AE4 | cada uno | C4 | `quiz/AEn.gift` | Moodle (importar GIFT) | pendiente | | |
| P10 | Lecturas AE1 a AE4 (flipbook, con glosario) | cada uno | C4 d) | `lecturas/prompts.md` | IA de texto + Heyzine o PDF | pendiente | | |
| P11 | Cuadro comparativo de familias de modelos generativos | AE1 | C4 d) | `contenidos/PF1822/modulo-2/R-capsulas.md` (R04) | PDF o tabla en el LMS | pendiente | | |
| P12 ★ | Herramienta didáctica 1: notebook "Tu primera llamada a un modelo" (.ipynb) | AE2–AE4 | C4 | `C4-herramientas-didacticas.md` + prompt del flujo | IA de texto + Colab | pendiente | | |
| P13 ★ | Herramienta didáctica 2: video interactivo "Del prompt a la respuesta" | AE2, AE3 | C4 | `C4-herramientas-didacticas.md` | HeyGen + H5P Interactive Video | pendiente | | |
| P14 ★ | Actividad 1 (ABP): "Un cliente de API para el resumidor", partes A, B y C | AE1–AE3 | C2 | `C2-actividades.md` | Página del LMS | pendiente | | |
| P15 ★ | Actividad 2 (ABPRO, gamificada): "Laboratorio de prompts y métricas" + tickets en CSV | AE3, AE4 | C2 | `C2-actividades.md` | Página del LMS + tablero de puntajes | pendiente | | |
| P16 | Ejecutar con `pytest` el código de las respuestas modeladas | AE2, AE4 | C2 | `C2-actividades.md` | Máquina con Python 3.10+ | pendiente | | |
| P17 | Documentos evaluativos (9 PDF sin logo para el curso base) | todos | B2 a B4 | `B2`, `B3` y `B4` | IA de texto o procesador de texto | pendiente | | |
| P18 | Curso base del módulo 2 en Moodle | todos | C (todo el ítem) | Etapa 2 del flujo | Moodle | pendiente | | |
| P19 | Anexo 2: secciones IV (módulo 2), V y VI | todos | B y C | Etapa 3 del flujo | Formato oficial + molde V0 | pendiente | | |
| P20 | Revisión de Natalia contra el checklist | todos | — | `../README.md` | — | pendiente | | |

Pendientes que no son piezas: quién provee las claves de práctica de OpenAI y Hugging Face en
cada institución, y el LMS de cada una (`state/OPEN-QUESTIONS.md` #5 y #6).

## Registro

Una línea por pieza terminada o cambio de estado: fecha, pieza, quién (persona o IA) y qué quedó.

- 2026-09-25 · P01–P10 · claude-code · bases generadas con `npm run produccion` (PPTX con narración, prompts de infografía y de lectura, quizzes GIFT).
- 2026-09-25 · P14 · claude-code · agregada la parte C (AE3) a la actividad 1 para que el AE3 tenga dos actividades.
