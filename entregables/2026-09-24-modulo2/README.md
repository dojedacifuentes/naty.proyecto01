# Hito 2026-09-24 — Módulo 2

Tres piezas producidas el 24 de septiembre de 2026 para Natalia (hackea.pro). Antes de
esta fecha vivían sueltas en la carpeta del proyecto, fuera del repo; se trajeron acá sin
modificar su contenido, solo con nombres de archivo normalizados.

| Archivo | Qué es | Nombre original |
| --- | --- | --- |
| `construir-el-modulo-2.pdf` | Documento de trabajo de Diego: qué exigen los Anexos N°2 y N°7 traducido a artefactos, estimación de horas a mano vs. con motor, herramientas propuestas y decisiones pendientes. 11 págs. | `Construir-el-modulo-2-TD2026.pdf` |
| `brainstorm-modulo-2.pdf` | Brainstorm ejecutivo "Fábrica de planes formativos Módulo 2": diagnóstico, producto mínimo exigible, arquitectura, prototipos, laboratorios, ruta crítica. 8 págs. | `Brainstorm_Modulo_2_para_Natalia.pdf` |
| `brainstorm-modulo-2.html` | Versión HTML del brainstorm, con el mismo contenido que el PDF. | `informe-brainstorm-modulo2-natalia.html` |
| `brainstorm-vista-previa/page-1…8.png` | Vista previa por página del brainstorm. | `pdf-preview/page-1…8.png` |
| `panel-modulo2-ml-agentes.html` | Fuente del panel de entregables del módulo 2 de PF1462 y PF1821. | — (nuevo) |
| `manual-entregables-modulo2-PF1821-PF1822.pdf` | **Manual de entregables del módulo 2** de PF1821 (Agentes low code) y PF1822 (Desarrollo con IA): qué producir, cantidad para el 7,0, qué debe traer, dónde va en el Anexo 2, aprendizajes textuales de SIPFOR y checklist. 18 págs. | — (nuevo) |
| `manual-entregables-modulo2-PF1821-PF1822.html` | Fuente del manual. Se regenera con `npm run manual -- PF1821 PF1822 --salida entregables/2026-09-24-modulo2 --pdf`. | — (nuevo) |

## El panel de ML y Agentes

**Versión viva:** https://claude.ai/artifact/BpgYipB5aa4YY8c4LGiDuP (privada; se comparte
desde su menú Compartir y solo la abren personas de la misma organización).

Lista los 80 entregables del módulo 2 para los dos cursos: 10 de contenido por curso y
10 por cada institución × curso, suponiendo los tres clientes confirmados. Cada uno tiene
un estado compartido (pendiente, en curso, en revisión, listo, bloqueado) y una nota.

Dos cosas que conviene saber:

- **El estado del panel no vive en este repo.** Vive en la base de datos del artifact. El
  archivo de acá es su código, no su contenido. Si hace falta dejar constancia en git del
  avance, se exporta el estado a `state/` en el cierre de sesión.
- **El 24-sep se marcaron 48 entregables como bloqueados** a partir de lo que dice el
  repo en ese momento: LMS de cada cliente sin definir (`OPEN-QUESTIONS.md` #5 y #6),
  evidencia que depende del LMS, y fichas de cliente sin levantar (#7).

## Lo que estos documentos no resuelven

Ninguno de los tres trae el contenido SIPFOR del módulo 2 (nombre, competencia,
aprendizajes esperados) de ningún plan: esa extracción sigue siendo la primera tarea del
motor. Ver `state/HANDOFF.md`.
