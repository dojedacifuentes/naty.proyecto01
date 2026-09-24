# PF1822 · Módulo 2 · B1 — Indicadores de logro

**Estado:** borrador · **Va en:** Anexo N°2, sección V.1 · **Guía:** Anexo N°7, num. 2
**Para el 7,0:** 3 indicadores por aprendizaje esperado → 12.

> Fórmula de cada indicador: **verbo en presente + contenido + condición**.
> Los aprendizajes esperados van TEXTUALES de SIPFOR. No se reformulan.

<!-- verificable: ID=B1 tipo=tabla-indicadores min=3 -->
| Aprendizaje esperado (textual del plan) | Indicadores de logro |
| --- | --- |
| **AE1.** ANALIZAR EL ROL DE LOS MODELOS GENERATIVOS EN EL DESARROLLO DE APLICACIONES, DESCRIBIENDO SUS TIPOS, CASOS DE USO, TECNOLOGÍAS ASOCIADAS Y REPRESENTANDO ARQUITECTURAS FUNCIONALES QUE INTEGREN ESTOS MODELOS MEDIANTE APIS. | **1.1** Clasifica modelos generativos por tipo de salida y por familia técnica (autorregresivos, de difusión, basados en transformers) en un cuadro que asocia a cada uno un caso de uso organizacional. <br> **1.2** Representa la arquitectura funcional de una aplicación con IA generativa en un diagrama con cliente, servidor API, preprocesamiento, modelo y almacenamiento, explicando la función de cada componente. <br> **1.3** Justifica la elección de una arquitectura para un caso dado con al menos dos criterios entre escalabilidad, seguridad, costo y mantenimiento. |
| **AE2.** UTILIZAR UN MODELO DE IA A TRAVÉS DE API REST UTILIZANDO SOLICITUDES HTTP Y AUTENTICACIÓN, BASÁNDOSE EN LA DOCUMENTACIÓN OFICIAL DE OPENAI Y HUGGING FACE. | **2.1** Explica la estructura de una solicitud y una respuesta de los endpoints de generación y de embeddings, citando la sección de la documentación oficial donde está cada campo. <br> **2.2** Implementa solicitudes HTTP GET y POST autenticadas con variables de entorno, obteniendo respuestas válidas de los endpoints de generación y de embeddings. <br> **2.3** Encapsula el consumo de la API en una clase de Python reutilizable, documentada con docstrings y verificada con al menos tres pruebas unitarias que se ejecutan sin conexión. |
| **AE3.** FORMULAR PROMPTS EFECTIVOS PARA MODELOS GENERATIVOS EN ESCENARIOS ZERO-SHOT O FEW-SHOT, CONSIDERANDO LA TAREA SOLICITADA Y LOS PARÁMETROS DE GENERACIÓN DISPONIBLES. | **3.1** Explica la diferencia entre prompting zero-shot y few-shot con un ejemplo propio de cada uno, indicando una ventaja y una limitación de cada estrategia. <br> **3.2** Elabora prompts con rol, contexto, instrucciones, restricciones y formato de salida para tareas de resumen, generación de código y reformulación, eligiendo la estrategia según el objetivo. <br> **3.3** Ajusta un prompt en al menos tres iteraciones registradas, describiendo cada cambio y su efecto en la claridad, la estructura o el control de la respuesta, incluido el efecto de temperature. |
| **AE4.** IMPLEMENTAR UN PIPELINE DE PREPROCESAMIENTO Y EVALUACIÓN BÁSICA DE TEXTO EN PYTHON, APLICANDO TÉCNICAS DE LIMPIEZA, NORMALIZACIÓN Y MÉTRICAS INICIALES DE CALIDAD, DE ACUERDO CON LOS REQUISITOS DE ENTRADA Y SALIDA DEL MODELO. | **4.1** Explica los conceptos de token, lema, stopword y n-grama, y los criterios de coherencia y relevancia, aplicándolos a un texto del caso. <br> **4.2** Codifica en Python funciones reutilizables de limpieza, normalización y tokenización que procesan un corpus de documentos sin errores y devuelven textos listos para el modelo. <br> **4.3** Calcula ROUGE y BLEU de respuestas generadas frente a resúmenes de referencia y registra los resultados, junto con la valoración de coherencia y relevancia, en una tabla con protocolo definido. |

## Trazabilidad con los criterios del plan

| Criterio del plan (SIPFOR) | Indicador |
| --- | --- |
| 1.1 clasifica tipos de modelos generativos | 1.1 |
| 1.2 representa un diagrama funcional | 1.2 |
| 1.3 analiza la elección de arquitectura | 1.3 |
| 2.1 explica la estructura de los endpoints de generación y embeddings | 2.1 |
| 2.2 implementa llamadas GET y POST | 2.2 |
| 2.3 función o clase modular con docstrings y pruebas | 2.3 |
| 3.1 explica la función del prompt y zero/few-shot | 3.1 |
| 3.2 elabora prompts para tareas específicas | 3.2 |
| 3.3 ajusta un prompt de forma iterativa | 3.3 |
| 4.1 explica conceptos de NLP y evaluación | 4.1 |
| 4.2 codifica limpieza, tokenización y normalización | 4.2 |
| 4.3 calcula métricas y registra resultados | 4.3 |
