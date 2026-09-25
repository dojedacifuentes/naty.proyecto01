# CHECKPOINT

> Se reescribe al cerrar cada sesión. Es la respuesta a "¿dónde quedó todo?".

**Última actualización:** 2026-09-25
**Por:** 2026-09-25-claude-code-04 (Claude Code · opus-5.5)
**Fase actual:** 0 — Reconocimiento

---

## Estado por fase

| Fase | Estado | Nota |
| --- | --- | --- |
| 0. Reconocimiento | **en curso** | Bases leídas y sintetizadas. El repo ya se verifica solo. Faltan accesos. |
| 1. Motor | no iniciada | Bloqueada por extracción SIPFOR |
| 2. Producción | no iniciada | Bloqueada por fase 1 y por fechas de licitación |
| 3. Sistematización | no iniciada | — |

## Hecho

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

## A medias

- **Los entregables del módulo 2 de PF1821 y PF1822 están en borrador, sin revisión humana.**
  Falta la etapa 3 del flujo (revisión de Natalia) y `IV-actividades.md` (todos los módulos).
  El código Python de PF1822 no se ejecutó: en esta máquina no hay Python.
  Todas las casillas de `modulo-2/PF18xx-*/README.md` están sin marcar por eso: se marcan
  cuando una persona revisa el recurso.
- **Recursos base del módulo 2.** El carril A (automático) está `listo para revisión`. Faltan
  los carriles B a F: 12 videos HeyGen, 10 infografías, 8 lecturas, el notebook de PF1822, el
  tutorial y el workflow roto de PF1821, correr `pytest` en PF1822 y 2 videos interactivos H5P.
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
| Fechas formales de la licitación | Llamado aún no publicado | SENCE / Natalia |
| Fichas de cliente (LMS, infraestructura, docentes) | No levantadas | Natalia + cada cliente |
| Acceso de escritura al repo | Solo el dueño de la cuenta; falta decidir quién más (#14) | Usuario / Diego |

## Números que ordenan el trabajo

- 15 planes formativos, 2.670 cupos
- 45 Anexos 2 con 3 clientes confirmados; 90 con los 6
- 89 actividades de extensión distintas por cliente para sacar 7.0 en D3
- El plan más exigente es PF1477 (483 h): 10 actividades de extensión solo para él
- Cierre de ofertas: 18:00 del décimo día hábil tras la publicación del llamado
- Periodo de consultas: 5 días hábiles tras la publicación

## Estado de la verificación

`npm run verificar` → 8 controles, 0 errores, 4 avisos (los mismos del 22-sep):

- 3 avisos del control 06: afirmaciones sobre las bases sin numeral ni página en
  `docs/03-anexo2-estructura.md:41`, `:43` y `docs/04-verificadores-protocolo.md:17`.
  Son citas reales de las bases a las que les falta la referencia exacta.
- 1 aviso del control 07: las sesiones de `claude-code` siguen sin auditar (ocho al abrir
  esta). No pueden auditarse solas: le tocan a Codex, a Cursor o a una persona.

La sesión inicial ya está auditada (veredicto **observaciones**). Sus tres hallazgos
accionables están en el handoff como trabajo corto: la columna `fuente` en
`data/clientes.csv` y las tres citas de las bases sin numeral.

## Siguiente paso concreto

Ver `state/HANDOFF.md`.
