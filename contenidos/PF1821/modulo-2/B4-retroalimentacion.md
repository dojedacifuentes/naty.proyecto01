# PF1821 · Módulo 2 · B4 — Retroalimentación y aprendizaje colaborativo

**Estado:** borrador · **Va en:** Anexo N°2, sección V · **Guía:** Anexo N°7, num. 5.4
**Para el 7,0:** feedback + autoevaluación + coevaluación. La guía pide además la bitácora
de registro de resultados y plan de trabajo, que es la pieza que más se omite.

<!-- verificable: ID=B4 tipo=checklist min=3 -->
- [x] Instrumento evaluativo coherente seleccionado
- [x] Instrumento de autoevaluación diseñado
- [x] Instrumento de coevaluación diseñado
- [x] Bitácora de registro de resultados y plan de trabajo diseñada

---

## a) Mecanismo de retroalimentación

| Qué | Cómo |
| --- | --- |
| **Instrumento base** | La rúbrica de revisión de workflow (`B2-instrumentos.md`, instrumento 1): el participante recibe su nivel en cada criterio, no solo una nota. |
| **Plazo** | Máximo 2 días hábiles desde la entrega de cada actividad. |
| **Formato** | Comentario escrito en la entrega del LMS + un video corto de pantalla (hasta 3 minutos) cuando el workflow tiene errores, mostrando dónde mirar. |
| **Estructura del comentario** | *Una fortaleza* (con el nodo o la decisión concreta), *una mejora* (con el indicador que falta) y *un siguiente paso* (qué probar). |
| **Reentrega** | La actividad 1 admite una reentrega dentro de la semana; se registra en la bitácora. |
| **Feedback automático** | La prueba objetiva muestra la clave y la explicación de cada ítem al cerrarse. El video interactivo (R06) da retroalimentación inmediata en cada pregunta. |

**Ejemplo de comentario de nivel esperado (actividad 1):**
> *Fortaleza:* tu Edit Fields convierte bien cantidad y precio a número, por eso el total
> se calcula sin errores. *Mejora:* en el resumen aparecen "Ñuñoa" y "Ñuñoa " como dos
> comunas (indicador 3.1): falta `trim()` antes del Summarize. *Siguiente paso:* agrégalo,
> ejecuta de nuevo y verifica que Ñuñoa sume $38.800.

## b) Pauta de autoevaluación

La completa el participante antes de entregar cada actividad. Escala: 1 = no lo logré,
2 = con ayuda, 3 = solo, pero con dudas, 4 = solo y lo puedo explicar.

| # | Afirmación | AE | 1 | 2 | 3 | 4 |
| --- | --- | --- | :-: | :-: | :-: | :-: |
| 1 | Puedo explicar qué tarea del caso automaticé y qué gana la empresa | AE1 | | | | |
| 2 | Puedo nombrar las partes de n8n que usé (trigger, nodo, credencial, ejecución) | AE1 | | | | |
| 3 | Mi workflow tiene entrada, procesamiento y salida, y se ejecuta sin errores | AE2 | | | | |
| 4 | Revisé en el panel de salida lo que entrega cada nodo | AE2 | | | | |
| 5 | Los datos de salida tienen los tipos correctos (números como números) | AE3 | | | | |
| 6 | Mis expresiones funcionan con todos los datos de prueba, incluidos los "sucios" | AE3 | | | | |
| 7 | Mis rutas condicionales tienen una salida de respaldo | AE4 | | | | |
| 8 | Cuando algo falló, encontré la causa mirando la ejecución y no probando al azar | AE4 | | | | |

**Pregunta abierta:** ¿qué harías distinto si tuvieras que empezar de nuevo?

## c) Pauta de coevaluación

En parejas asignadas por el tutor: cada participante importa el workflow de su compañero
(actividad 2), lo ejecuta con los pedidos fijados y responde. Se entrega en el foro de la
actividad; se valora la calidad del aporte, no la nota del compañero.

| # | Criterio | Sí | En parte | No | Evidencia o comentario |
| --- | --- | :-: | :-: | :-: | --- |
| 1 | El workflow se importa y se ejecuta sin errores | | | | |
| 2 | Los 6 pedidos de prueba llegan a la ruta que corresponde | | | | |
| 3 | Existe ruta de respaldo y funciona con el pedido "distribuidor" | | | | |
| 4 | Cada fila guardada indica su ruta | | | | |
| 5 | La bitácora permite entender cada falla sin preguntarle al autor | | | | |

**Cierre de la coevaluación:** una cosa que voy a copiar de tu workflow y una sugerencia
concreta para mejorarlo.

## d) Bitácora de registro de resultados y plan de trabajo

Plantilla única para todo el módulo (hoja de cálculo o página del portafolio). El
participante la actualiza al cerrar cada actividad; el tutor la revisa en cada devolución.

**Parte 1 · Registro de resultados**

| Fecha | Actividad | Indicadores trabajados | Resultado (nivel o puntaje) | Fallas encontradas (síntoma → causa → corrección) | Evidencia |
| --- | --- | --- | --- | --- | --- |
| *2026-10-14* | *Actividad 1, parte C* | *3.1, 3.3* | *Rúbrica: criterio 3 = nivel 2* | *Ñuñoa duplicada en el resumen → espacio al final de la comuna → `trim()` en Edit Fields* | *Captura del resumen corregido* |

**Parte 2 · Plan de trabajo**

| Indicador por mejorar | Acción concreta | Recurso de apoyo | Plazo | ¿Logrado? |
| --- | --- | --- | --- | --- |
| *3.1* | *Repetir el resumen con un CSV nuevo y verificar los grupos* | *Tutorial R05, paso 8* | *Antes de la actividad 2* | |

**Uso de la bitácora en la evaluación:** en la actividad 2, la bitácora es la evidencia
del criterio 6 de la rúbrica (depuración y trazabilidad).
