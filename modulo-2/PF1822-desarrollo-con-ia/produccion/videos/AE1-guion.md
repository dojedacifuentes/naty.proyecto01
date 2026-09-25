# PF1822 · Cápsula 1 (AE1) · Modelos generativos y su ecosistema — guion

Base para HeyGen: `AE1-capsula.pptx`, una escena por lámina, con la narración en las notas.
Esta tabla trae la misma narración, para otras herramientas o para pulirla antes de grabar.

**Aprendizaje esperado 1 (textual del plan):** ANALIZAR EL ROL DE LOS MODELOS GENERATIVOS EN EL DESARROLLO DE APLICACIONES, DESCRIBIENDO SUS TIPOS, CASOS DE USO, TECNOLOGÍAS ASOCIADAS Y REPRESENTANDO ARQUITECTURAS FUNCIONALES QUE INTEGREN ESTOS MODELOS MEDIANTE APIS.

**Criterios de evaluación (textuales del plan):**

- 1.1 CLASIFICA LOS TIPOS DE MODELOS GENERATIVOS IDENTIFICANDO SUS CARACTERÍSTICAS Y APLICACIONES MÁS FRECUENTES EN LA ORGANIZACIÓN.
- 1.2 REPRESENTA UN DIAGRAMA FUNCIONAL DE UNA APLICACIÓN CON IA GENERATIVA, EXPLICANDO LA FUNCIÓN DE CADA COMPONENTE DENTRO DE LA ARQUITECTURA.
- 1.3 ANALIZA LA ELECCIÓN DE LA ARQUITECTURA EN FUNCIÓN DE CRITERIOS COMO ESCALABILIDAD, SEGURIDAD O MANTENIMIENTO.

| Lámina | Contenido del plan (textual) | En pantalla | Narración |
| --- | --- | --- | --- |
| 1 | 1. MODELOS GENERATIVOS Y ECOSISTEMA TECNOLÓGICO | Cápsula 1: Modelos generativos y su ecosistema | Te doy la bienvenida a la cápsula 1 del módulo 2, Introducción a modelos generativos y consumo por API: Modelos generativos y su ecosistema. "Qué hace un modelo generativo y dónde encaja en una aplicación". El caso: el resumidor de tickets de Nube Sur. |
| 2 | Aprendizaje esperado y criterios de evaluación | Aprendizaje esperado 1 | Esta cápsula corresponde al aprendizaje esperado 1 del plan formativo: Analizar el rol de los modelos generativos en el desarrollo de aplicaciones, describiendo sus tipos, casos de uso, tecnologías asociadas y representando arquitecturas funcionales que integren estos modelos mediante APIs. Sus criterios de evaluación son: Clasifica los tipos de modelos generativos identificando sus características y aplicaciones más frecuentes en la organización. Representa un diagrama funcional de una aplicación con IA generativa, explicando la función de cada componente dentro de la arquitectura. Analiza la elección de la arquitectura en función de criterios como escalabilidad, seguridad o mantenimiento. |
| 3 | CONCEPTOS GENERALES DE IA GENERATIVA: QUÉ ES LA IA GENERATIVA Y PARA QUÉ SIRVE. / DIFERENCIAS ENTRE IA GENERATIVA Y IA TRADICIONAL BASADA EN REGLAS. | IA generativa frente a IA tradicional | IA generativa frente a IA tradicional. La IA tradicional basada en reglas decide con condiciones escritas por personas; la generativa produce contenido nuevo (texto, código, imágenes) aprendido de datos. |
| 4 | TIPOS DE IA GENERATIVA: TEXTO, IMAGEN, AUDIO Y VIDEO. | Tipos por lo que generan | Tipos por lo que generan. Texto, imagen, audio y video. |
| 5 | TIPOS DE MODELOS: AUTORREGRESIVOS, DE DIFUSIÓN Y BASADOS EN TRANSFORMERS. | Familias técnicas | Familias técnicas. Autorregresivos: generan token a token (texto y código). De difusión: parten de ruido y lo refinan (imágenes, audio). Transformers: la arquitectura detrás de la mayoría de los modelos de lenguaje actuales. Ver el cuadro. |
| 6 | CASOS DE USO: GENERACIÓN DE TEXTO, GENERACIÓN DE CÓDIGO, SÍNTESIS DE IMÁGENES, QA, SUMMARIZATION Y GENERACIÓN DE TESTS. | Casos de uso | Casos de uso. Generación de texto y de código, síntesis de imágenes, preguntas y respuestas, resúmenes, generación de pruebas. |
| 7 | ARQUITECTURAS: REQUEST–RESPONSE Y PIPELINES. | Arquitecturas | Arquitecturas. Solicitud–respuesta (una llamada, una respuesta) y pipelines (varias etapas encadenadas: limpiar, luego generar, luego evaluar, luego guardar). |
| 8 | COMPONENTES: CLIENTE, SERVIDOR API, MODELO DE IA, MÓDULO DE PREPROCESAMIENTO Y BASE DE DATOS/VECTOR STORE. / FLUJO DE DATOS END-TO-END: TECNOLOGÍAS Y LIBRERÍAS: OPENAI API, HUGGING FACE TRANSFORMERS, TENSORFLOW, PYTORCH, LANGCHAIN Y DIFFUSERS. | Componentes | Componentes. Cliente, servidor API, módulo de preprocesamiento, modelo de IA, base de datos o vector store. Flujo de datos de extremo a extremo con el ticket de ejemplo. |
| 9 | ECOSISTEMA TECNOLÓGICO DE LA IA. / FLUJO DE DATOS END-TO-END: TECNOLOGÍAS Y LIBRERÍAS: OPENAI API, HUGGING FACE TRANSFORMERS, TENSORFLOW, PYTORCH, LANGCHAIN Y DIFFUSERS. | Tecnologías y bibliotecas | Tecnologías y bibliotecas. API de OpenAI, Hugging Face Transformers, TensorFlow, PyTorch, LangChain, Diffusers: qué resuelve cada una y en qué módulo del plan se vuelve a ver. |
| 10 | ARQUITECTURAS: REQUEST–RESPONSE Y PIPELINES. | Elegir una arquitectura | Elegir una arquitectura. Criterios: escalabilidad (¿aguanta 10 veces más tickets?), seguridad (¿dónde están la clave y los datos personales?), costo (tokens por ticket) y mantenimiento (¿se puede cambiar de modelo sin reescribir todo?). |
| 11 | — | Tu tarea | Tu tarea. Diagrama del resumidor y su justificación: actividad 1, parte A. |

## Cobertura de los contenidos del plan

Cada contenido del aprendizaje esperado 1, tal como está en el plan, y la lámina donde aparece rotulado.

| Contenido del plan (textual) | Lámina |
| --- | --- |
| 1. MODELOS GENERATIVOS Y ECOSISTEMA TECNOLÓGICO | 1 |
| CONCEPTOS GENERALES DE IA GENERATIVA: QUÉ ES LA IA GENERATIVA Y PARA QUÉ SIRVE. | 3 |
| DIFERENCIAS ENTRE IA GENERATIVA Y IA TRADICIONAL BASADA EN REGLAS. | 3 |
| TIPOS DE IA GENERATIVA: TEXTO, IMAGEN, AUDIO Y VIDEO. | 4 |
| TIPOS DE MODELOS: AUTORREGRESIVOS, DE DIFUSIÓN Y BASADOS EN TRANSFORMERS. | 5 |
| CASOS DE USO: GENERACIÓN DE TEXTO, GENERACIÓN DE CÓDIGO, SÍNTESIS DE IMÁGENES, QA, SUMMARIZATION Y GENERACIÓN DE TESTS. | 6 |
| ECOSISTEMA TECNOLÓGICO DE LA IA. | 9 |
| ARQUITECTURAS: REQUEST–RESPONSE Y PIPELINES. | 7, 10 |
| COMPONENTES: CLIENTE, SERVIDOR API, MODELO DE IA, MÓDULO DE PREPROCESAMIENTO Y BASE DE DATOS/VECTOR STORE. | 8 |
| FLUJO DE DATOS END-TO-END: TECNOLOGÍAS Y LIBRERÍAS: OPENAI API, HUGGING FACE TRANSFORMERS, TENSORFLOW, PYTORCH, LANGCHAIN Y DIFFUSERS. | 8, 9 |
