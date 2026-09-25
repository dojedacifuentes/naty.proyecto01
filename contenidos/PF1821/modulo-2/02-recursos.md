# PF1821 · Módulo 2: kit de recursos educativos

**Módulo:** `MA04560` FUNDAMENTOS DE N8N Y MANIPULACIÓN DE DATOS · 18 h · e-learning
**Estado:** borrador · **Producido:** 2026-09-24 (sesión `2026-09-24-claude-code-05`)

> Qué recursos lleva el módulo 2 montado en el LMS, a qué exigencia responde cada uno y
> dónde está su contenido desarrollado. Las exigencias salen del Anexo N°7, numeral 7
> (págs. 109–111): dos actividades prácticas con respuesta modelada; dos herramientas
> didácticas efectivas (tutoriales, videos interactivos, audios, multimedia); medios como
> presentaciones, instructivos y cuadros comparativos; un ambiente con íconos, multimedia e
> imágenes que motive; y tres estrategias de habilidades del siglo XXI de la lista oficial.

## Hilo conductor del módulo

Todo el módulo trabaja sobre **un solo caso**: *Mercado Austral*, una distribuidora
**ficticia** de abarrotes que recibe pedidos por un formulario web. Hoy alguien los copia a
mano a una planilla, avisa a bodega por correo y separa "a ojo" los pedidos mayoristas y
los de regiones. Se pierden pedidos, se duplican otros y nadie sabe cuánto se vendió por
comuna. Cada aprendizaje esperado agrega una pieza al mismo workflow, y al final del
módulo el participante tiene un automatismo completo que puede mostrar en su portafolio.

> Mercado Austral es inventada. No corresponde a ninguna institución ni empresa real, y
> este contenido es común a todas las instituciones que presenten el curso.

## Ruta del módulo (propuesta de distribución de las 18 h)

| Tramo | Aprendizaje esperado | Horas | Sincrónico | Producto del tramo |
| --- | --- | --- | --- | --- |
| 1 | AE1 · conceptos y características de n8n | 3 h | 1,5 h | Mapa de procesos automatizables + cuadro comparativo |
| 2 | AE2 · primeros workflows en la interfaz visual | 4 h | 1,5 h | Workflow "pedido a registro" de 3+ nodos |
| 3 | AE3 · manipulación de datos y Supabase | 6 h | 1,5 h | Pedidos normalizados en Supabase + resumen por comuna |
| 4 | AE4 · lógica condicional y depuración | 5 h | 1,5 h | Workflow con rutas y bitácora de depuración |
| | **Total** | **18 h** | **6 h** | |

`PENDIENTE:` la distribución de horas por aprendizaje la propone este kit; SIPFOR solo
fija las 18 h del módulo. La valida Natalia.

## Los recursos

| Id | Recurso | Formato en el LMS | Exigencia | Archivo |
| --- | --- | --- | --- | --- |
| R01 | Video de bienvenida | Video 1:40 con avatar o docente | C3 motivación | `R-bienvenida-e-infografia.md` |
| R02 | Infografía "Ruta del módulo" | Imagen descargable + versión accesible en texto | C3 · medio | `R-bienvenida-e-infografia.md` |
| R03 | Cuatro cápsulas de contenido, una por AE | Presentaciones narradas (11 o 12 láminas, con el aprendizaje esperado y los contenidos del plan textuales) | C4 d) presentaciones | `R-capsulas.md` |
| R04 | Cuadro comparativo n8n · Make · Zapier | Tabla interactiva o PDF | C4 d) cuadro comparativo · AE1 | `R-capsulas.md` |
| R05 | **Herramienta didáctica 1 (AE3):** tutorial guiado "Tu primer workflow con datos limpios" | Página paso a paso con capturas (17 pasos) | **C4** | `C4-herramientas-didacticas.md` |
| R06 | **Herramienta didáctica 2 (AE3):** video interactivo "Expresiones y depuración" | Video con preguntas incrustadas (H5P) | **C4** | `C4-herramientas-didacticas.md` |
| R07 | **Actividad práctica 1:** "Del formulario a la base de datos" | Tarea con entrega de workflow | **C2** · resolución de problemas | `C2-actividades.md` |
| R08 | **Actividad práctica 2:** "Rescate del workflow roto" | Misiones con puntaje (gamificación) | **C2** · análisis de caso | `C2-actividades.md` |
| R09 | Indicadores de logro | Tabla en la guía del participante | B1 | `B1-indicadores.md` |
| R10 | Tres instrumentos de evaluación | Rúbrica, caso de desempeño, prueba objetiva | B2 | `B2-instrumentos.md` |
| R11 | Portafolio con sus 6 elementos + rúbrica | Sitio publicado por participante | B3 | `B3-portafolio.md` |
| R12 | Feedback, autoevaluación, coevaluación y bitácora | Formularios y plantilla en el LMS | B4 | `B4-retroalimentacion.md` |
| R13 | Estrategia metodológica, motivación y siglo XXI | Texto del Anexo 2, sección VI | C1 · C3 · C5 | `C-metodologia.md` |

## Qué recurso cubre qué aprendizaje

| Recurso | AE1 | AE2 | AE3 | AE4 |
| --- | :-: | :-: | :-: | :-: |
| R01 Bienvenida | ● | | | |
| R02 Infografía | ● | ● | ● | ● |
| R03 Cápsulas | ● | ● | ● | ● |
| R04 Cuadro comparativo | ● | | | |
| R05 Tutorial | | ● | ● | |
| R06 Video interactivo | | | ● | ● |
| R07 Actividad 1 | ● | ● | ● | |
| R08 Actividad 2 | ● | | ● | ● |
| R10 Instrumentos (los tres) | ● | ● | ● | ● |
| R11 Portafolio | ● | ● | ● | ● |

## Lo que necesita cada participante para usar el kit

Según los recursos del módulo en SIPFOR: equipo con al menos Core i3, 8 GB de RAM y 128 GB;
navegador actualizado; **cuenta de n8n Cloud o acceso a una instancia de n8n habilitada**;
**acceso a Supabase** o base de datos equivalente.

`PENDIENTE:` quién provee las cuentas de n8n y Supabase a cada participante y con qué
costo. Lo decide cada institución; va en la sección VIII e) del Anexo 2.
