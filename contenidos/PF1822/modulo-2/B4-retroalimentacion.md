# PF1822 · Módulo 2 · B4 — Retroalimentación y aprendizaje colaborativo

**Estado:** borrador · **Va en:** Anexo N°2, sección V · **Guía:** Anexo N°7, num. 5.4
**Para el 7,0:** feedback + autoevaluación + coevaluación. La guía pide además la bitácora
de registro de resultados y plan de trabajo.

<!-- verificable: ID=B4 tipo=checklist min=3 -->
- [x] Instrumento evaluativo coherente seleccionado
- [x] Instrumento de autoevaluación diseñado
- [x] Instrumento de coevaluación diseñado
- [x] Bitácora de registro de resultados y plan de trabajo diseñada

---

## a) Mecanismo de retroalimentación

| Qué | Cómo |
| --- | --- |
| **Instrumento base** | La rúbrica de revisión de la solución (`B2-instrumentos.md`, instrumento 1): nivel por criterio, no solo nota. |
| **Plazo** | Máximo 2 días hábiles desde cada entrega. |
| **Formato** | Comentarios en el código (revisión del *pull request* o comentarios en el notebook) + un párrafo de síntesis en el LMS. |
| **Estructura** | *Una fortaleza* (con la línea o la decisión concreta), *una mejora* (con el indicador) y *un siguiente paso*. |
| **Reentrega** | La actividad 1 admite una reentrega en la semana; se registra en la bitácora. |
| **Feedback automático** | `pytest` da retroalimentación inmediata al participante; el notebook guiado (R05) tiene celdas que se autocomprueban; la prueba objetiva y el video interactivo explican cada respuesta. |

**Ejemplo de comentario de nivel esperado (actividad 2):**
> *Fortaleza:* tu `limpiar` quita bien la firma y reemplaza el correo por `[correo]`, así que
> no envías datos personales al modelo. *Mejora:* tu ROUGE-L de T1 da 0,40 y el cálculo de
> comprobación da 0,733 (indicador 4.3): estás usando el tokenizador por defecto de
> rouge-score, que corta las palabras con tilde. *Siguiente paso:* usa `TokenizadorES` y
> vuelve a calcular la tabla antes de escribir tu recomendación.

## b) Pauta de autoevaluación

La completa el participante antes de cada entrega. Escala: 1 = no lo logré, 2 = con ayuda,
3 = solo, pero con dudas, 4 = solo y lo puedo explicar.

| # | Afirmación | AE | 1 | 2 | 3 | 4 |
| --- | --- | --- | :-: | :-: | :-: | :-: |
| 1 | Puedo explicar qué componente de mi arquitectura guarda la clave y por qué | AE1 | | | | |
| 2 | Clasifiqué los tipos de modelos con un caso de uso para cada uno | AE1 | | | | |
| 3 | Mis solicitudes se autentican con variables de entorno, nunca con la clave en el código | AE2 | | | | |
| 4 | Mis pruebas pasan sin conexión a internet | AE2 | | | | |
| 5 | Mis prompts tienen rol, restricciones y formato de salida | AE3 | | | | |
| 6 | Registré cada cambio de prompt con su efecto | AE3 | | | | |
| 7 | Mi limpieza quita ruido y datos personales sin borrar el problema del ticket | AE4 | | | | |
| 8 | Comprobé mi métrica con el cálculo de referencia antes de usarla | AE4 | | | | |

**Pregunta abierta:** ¿qué decisión de diseño cambiarías si el resumidor tuviera que
procesar 10 veces más tickets?

## c) Pauta de coevaluación

En parejas asignadas por el tutor: cada participante clona el repositorio de su compañero,
ejecuta las pruebas y el notebook con los mismos tickets, y responde en el foro. Se valora
la calidad del aporte, no la nota del compañero.

| # | Criterio | Sí | En parte | No | Evidencia o comentario |
| --- | --- | :-: | :-: | :-: | --- |
| 1 | Las instrucciones del README bastan para ejecutar el proyecto | | | | |
| 2 | Las pruebas pasan sin conexión y sin clave real | | | | |
| 3 | No hay ninguna clave en el código, el notebook ni el historial | | | | |
| 4 | Con los mismos tickets obtengo métricas parecidas a las que reporta | | | | |
| 5 | La recomendación final se sostiene con su tabla | | | | |

**Cierre de la coevaluación:** una práctica que voy a adoptar de tu proyecto y una
sugerencia concreta para mejorarlo.

## d) Bitácora de registro de resultados y plan de trabajo

Plantilla única para todo el módulo (archivo `BITACORA.md` en el repositorio o página del
portafolio), actualizada al cerrar cada actividad y revisada por el tutor en cada devolución.

**Parte 1 · Registro de resultados**

| Fecha | Actividad | Indicadores | Resultado | Problema encontrado (síntoma → causa → solución) | Evidencia |
| --- | --- | --- | --- | --- | --- |
| *2026-10-15* | *Actividad 2, paso 4* | *4.3* | *Rúbrica: criterio 6 = nivel 2* | *ROUGE-L de T1 = 0,40 → el tokenizador por defecto cortaba "sesión" y "facturación" → `TokenizadorES`; ahora da 0,733* | *Commit con la corrección* |

**Parte 2 · Plan de trabajo**

| Indicador por mejorar | Acción concreta | Recurso de apoyo | Plazo | ¿Logrado? |
| --- | --- | --- | --- | --- |
| *4.3* | *Recalcular la tabla completa y rehacer la recomendación* | *Cápsula 4, lámina 8* | *Antes del proyecto final* | |

La bitácora es evidencia del criterio 6 de la rúbrica en la actividad 2.
