# PF1822 · Cápsula 3 (AE3) · Diseño de prompts — guion

Base para HeyGen: `AE3-capsula.pptx`, una escena por lámina, con la narración en las notas.
Esta tabla trae la misma narración, para otras herramientas o para pulirla antes de grabar.

**Aprendizaje esperado 3 (textual del plan):** FORMULAR PROMPTS EFECTIVOS PARA MODELOS GENERATIVOS EN ESCENARIOS ZERO-SHOT O FEW-SHOT, CONSIDERANDO LA TAREA SOLICITADA Y LOS PARÁMETROS DE GENERACIÓN DISPONIBLES.

**Criterios de evaluación (textuales del plan):**

- 3.1 EXPLICA LA FUNCIÓN DE UN PROMPT EN LA INTERACCIÓN CON MODELOS GENERATIVOS, DISTINGUIENDO ENTRE ESTRATEGIAS ZERO-SHOT Y FEW-SHOT, E IDENTIFICANDO SUS VENTAJAS Y LIMITACIONES BÁSICAS.
- 3.2 ELABORA PROMPTS ADECUADOS PARA TAREAS ESPECÍFICAS, COMO RESUMEN, GENERACIÓN DE CÓDIGO O REFORMULACIÓN DE TEXTO, SELECCIONANDO LA ESTRATEGIA DE PROMPTING MÁS APROPIADA SEGÚN EL OBJETIVO.
- 3.3 AJUSTA UN PROMPT DE FORMA ITERATIVA CON BASE EN LOS OUTPUTS OBTENIDOS, DESCRIBIENDO LOS CAMBIOS REALIZADOS EN TÉRMINOS DE CLARIDAD, ESTRUCTURA O CONTROL DEL COMPORTAMIENTO DEL MODELO.

| Lámina | Contenido del plan (textual) | En pantalla | Narración |
| --- | --- | --- | --- |
| 1 | 3. DISEÑO DE PROMPTS PARA APIS GENERATIVAS | Cápsula 3: Diseño de prompts | Te doy la bienvenida a la cápsula 3 del módulo 2, Introducción a modelos generativos y consumo por API: Diseño de prompts. "El prompt es la especificación". |
| 2 | Aprendizaje esperado y criterios de evaluación | Aprendizaje esperado 3 | Esta cápsula corresponde al aprendizaje esperado 3 del plan formativo: Formular prompts efectivos para modelos generativos en escenarios zero-shot o few-shot, considerando la tarea solicitada y los parámetros de generación disponibles. Sus criterios de evaluación son: Explica la función de un prompt en la interacción con modelos generativos, distinguiendo entre estrategias zero-shot y few-shot, e identificando sus ventajas y limitaciones básicas. Elabora prompts adecuados para tareas específicas, como resumen, generación de código o reformulación de texto, seleccionando la estrategia de prompting más apropiada según el objetivo. Ajusta un prompt de forma iterativa con base en los outputs obtenidos, describiendo los cambios realizados en términos de claridad, estructura o control del comportamiento del modelo. |
| 3 | QUÉ ES UN PROMPT. / ESTRUCTURA BÁSICA DE ENTRADA PARA MODELOS DE LENGUAJE. | Qué es un prompt | Qué es un prompt. La entrada que le dice al modelo qué hacer. Estructura: mensaje de sistema (rol y reglas) y mensaje de usuario (la tarea y los datos). |
| 4 | TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING. | Tipos de prompting | Tipos de prompting. Zero-shot: solo instrucciones. Few-shot: instrucciones más ejemplos de entrada y salida. Instruccional: pasos explícitos a seguir. |
| 5 | PRÁCTICAS RECOMENDADAS: CLARIDAD, DELIMITACIÓN DEL ROL, CONTEXTO, RESTRICCIONES Y EVITAR AMBIGÜEDAD. | Buenas prácticas | Buenas prácticas. Claridad, rol definido, contexto suficiente, restricciones explícitas, evitar ambigüedad. |
| 6 | FORMATEO DE SALIDAS: LISTAS, JSON Y ESTRUCTURA TABULAR. | Formato de salida | Formato de salida. Pedir listas, JSON o tablas cuando otro programa va a leer la respuesta. |
| 7 | EJEMPLOS PRÁCTICOS: PROMPT PARA GENERAR CÓDIGO, RESUMEN, VALIDACIÓN Y REFORMULACIÓN. | Ejemplos prácticos | Ejemplos prácticos. Un prompt para generar código, uno para resumir, uno para validar y uno para reformular, con su salida. |
| 8 | PROMPT Y PARÁMETROS: CÓMO INFLUYEN TEMPERATURE, MAX_TOKENS Y TOP_P. | Parámetros | Parámetros. temperature (variedad), max tokens (largo máximo), top p (acota las opciones). Para resúmenes, temperature baja. |
| 9 | LIMITACIONES: ALUCINACIONES, FALTA DE CONTROL Y SENSIBILIDAD AL WORDING. | Limitaciones | Limitaciones. Alucinaciones, falta de control, sensibilidad a la redacción: un cambio pequeño de palabras cambia la respuesta. |
| 10 | ITERACIÓN Y AJUSTE DE PROMPTS SEGÚN RESULTADOS OBTENIDOS. | Iterar | Iterar. Cambiar una cosa a la vez, anotar qué cambió y qué efecto tuvo, y decidir con los resultados. |
| 11 | — | Tu tarea | Tu tarea. Video interactivo y actividad 2, pasos 2 y 3. |

## Cobertura de los contenidos del plan

Cada contenido del aprendizaje esperado 3, tal como está en el plan, y la lámina donde aparece rotulado.

| Contenido del plan (textual) | Lámina |
| --- | --- |
| 3. DISEÑO DE PROMPTS PARA APIS GENERATIVAS | 1 |
| QUÉ ES UN PROMPT. | 3 |
| ESTRUCTURA BÁSICA DE ENTRADA PARA MODELOS DE LENGUAJE. | 3 |
| TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING. | 4 |
| PRÁCTICAS RECOMENDADAS: CLARIDAD, DELIMITACIÓN DEL ROL, CONTEXTO, RESTRICCIONES Y EVITAR AMBIGÜEDAD. | 5 |
| FORMATEO DE SALIDAS: LISTAS, JSON Y ESTRUCTURA TABULAR. | 6 |
| EJEMPLOS PRÁCTICOS: PROMPT PARA GENERAR CÓDIGO, RESUMEN, VALIDACIÓN Y REFORMULACIÓN. | 7 |
| PROMPT Y PARÁMETROS: CÓMO INFLUYEN TEMPERATURE, MAX_TOKENS Y TOP_P. | 8 |
| LIMITACIONES: ALUCINACIONES, FALTA DE CONTROL Y SENSIBILIDAD AL WORDING. | 9 |
| ITERACIÓN Y AJUSTE DE PROMPTS SEGÚN RESULTADOS OBTENIDOS. | 10 |
