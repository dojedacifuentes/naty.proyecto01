# Módulo 2 · Recursos educativos de PF1821 y PF1822

Esta sección reúne los recursos educativos del módulo 2 de los dos cursos desarrollados en
este repositorio, con el checklist de lo que piden las bases para ese módulo. Cada curso tiene
su carpeta, con el checklist citado y un zip con un archivo por recurso.

| Curso | Módulo 2 | Caso | Checklist | Recursos |
| --- | --- | --- | --- | --- |
| **PF1821** · Construcción de Agentes y Automatización con Herramientas Low Code · 220 h | `MA04560` Fundamentos de n8n y manipulación de datos · 18 h | *Mercado Austral* (n8n y Supabase) | [PF1821-agentes-low-code](PF1821-agentes-low-code/) | [zip](PF1821-agentes-low-code/recursos-modulo2-PF1821.zip) |
| **PF1822** · Especialización en Desarrollo con IA · 190 h | `MA04576` Introducción a modelos generativos y consumo por API · 21 h | *Nube Sur* (Python) | [PF1822-desarrollo-con-ia](PF1822-desarrollo-con-ia/) | [zip](PF1822-desarrollo-con-ia/recursos-modulo2-PF1822.zip) |

**Estado de los dos:** borrador. Los 13 recursos de cada curso están escritos y ninguno está
revisado por una persona. Falta convertir el texto en archivos finales (video, infografía,
presentaciones, H5P, workflows y notebook) y montarlos en el LMS de cada institución.

## Para terminar el módulo

| Documento | Para qué |
| --- | --- |
| [`REVISION-BASES.md`](REVISION-BASES.md) | Qué cumple cada curso frente a las bases y qué se ajustó con las referencias del equipo |
| [`FLUJO-PRODUCCION.md`](FLUJO-PRODUCCION.md) | Cómo pasar del texto al recurso final (HeyGen, Genially, Moodle) y cómo trabajar desde otra IA |
| [Estado de PF1821](PF1821-agentes-low-code/produccion/ESTADO.md) · [Estado de PF1822](PF1822-desarrollo-con-ia/produccion/ESTADO.md) | Tablero de avance: una fila por pieza |

**Aprendizaje esperado seleccionado: AE3 en los dos cursos.** Tiene dos actividades prácticas
y dos herramientas didácticas, que es lo que la pauta mira para el 7,0 (bases 2026, 7.4, pág. 31).

**Etapa actual:** producir los recursos base, neutros y listos para subir. Subir al LMS, redactar
el Anexo 2 y el trabajo por institución vienen después. En cada curso:
- `produccion/` tiene las bases que se cargan en otras herramientas: PPTX para HeyGen y prompts.
- `entrega/` tiene los recursos finales. Los quizzes, los 9 PDF de evaluación, las actividades,
  los insumos, el cuadro comparativo y los textos para el Anexo **ya están listos**.

Todo se regenera con `npm run produccion -- PF1821 PF1822`.

## Qué se evalúa en el módulo 2

La propuesta técnica se evalúa sobre el segundo módulo del plan (bases 2026, 7.4, pág. 27).
Esta es la pauta de los dos ítems que dependen de los recursos educativos. Los ítems A
(equipamiento) y D (herramientas y valor agregado) dependen de cada institución y de todo el
plan, y no están en esta sección.

| Ítem | Subcriterio | Peso en el ítem | Para el 7,0 | Cita |
| --- | --- | --- | --- | --- |
| B · 20 % | Indicadores de logro | 10 % | 3 indicadores por aprendizaje esperado | 7.4, pág. 28 · Anexo N°7, num. 2 |
| | Instrumentos de evaluación | 35 % | 3 instrumentos distintos, cada uno con todos los aprendizajes | 7.4, pág. 28 · Anexo N°7, num. 3 |
| | Portafolio de proyectos | 35 % | 6 de 6 elementos, desarrollados | 7.4, pág. 28 · Anexo N°7, num. 4.3, pág. 104 |
| | Retroalimentación y aprendizaje colaborativo | 20 % | Retroalimentación + autoevaluación + coevaluación | 7.4, pág. 29 · Anexo N°7, num. 5.4, pág. 106 |
| C · 35 % | Relación metodología-competencia | 30 % | Enfocada en la competencia del módulo (binario) | 7.4, pág. 30 |
| | Proceso de aprendizaje | 30 % | 2 actividades prácticas distintas y efectivas | 7.4, pág. 31 · Anexo N°7, num. 7, págs. 109–110 |
| | Aspectos motivacionales | 10 % | Aporta por la interacción con la plataforma (binario) | 7.4, pág. 31 · Anexo N°7, num. 7 c) |
| | Uso de los medios | 20 % | 2 herramientas didácticas, las dos efectivas | 7.4, pág. 31 · Anexo N°7, num. 7 d) |
| | Habilidades del siglo XXI | 10 % | 3 estrategias para 3 habilidades | 7.4, pág. 31 · Anexo N°7, num. 7, pág. 111 |

La metodología se evalúa con la experiencia del participante en el LMS (bases 2026, 7.4,
pág. 30). Por eso el checklist de cada curso separa lo que ya está escrito de lo que el
evaluador va a abrir.

## Cómo se mantiene

- **La fuente es `contenidos/<PF>/modulo-2/`.** El zip y los PDF se generan desde ahí; no se
  editan a mano.
- **Una casilla se marca cuando una persona revisó el recurso**, no cuando existe el borrador.
- Para regenerar los zips después de corregir algo:

```bash
npm run zip -- PF1821 --salida modulo-2/PF1821-agentes-low-code
npm run zip -- PF1822 --salida modulo-2/PF1822-desarrollo-con-ia
```

Los PDF del kit, el documento completo de los dos cursos y el manual de entregables están
en [`entregables/2026-09-24-modulo2/`](../entregables/2026-09-24-modulo2/).
