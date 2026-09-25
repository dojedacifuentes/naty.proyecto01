# PF1822 · Cápsula 4 (AE4) · Preparar y medir texto — guion

Base para HeyGen: `AE4-capsula.pptx`, una escena por lámina, con la narración en las notas.
Esta tabla trae la misma narración, para otras herramientas o para pulirla antes de grabar.

**Aprendizaje esperado 4 (textual del plan):** IMPLEMENTAR UN PIPELINE DE PREPROCESAMIENTO Y EVALUACIÓN BÁSICA DE TEXTO EN PYTHON, APLICANDO TÉCNICAS DE LIMPIEZA, NORMALIZACIÓN Y MÉTRICAS INICIALES DE CALIDAD, DE ACUERDO CON LOS REQUISITOS DE ENTRADA Y SALIDA DEL MODELO.

**Criterios de evaluación (textuales del plan):**

- 4.1 EXPLICA LOS CONCEPTOS FUNDAMENTALES DE NLP Y EVALUACIÓN BÁSICA DE RESPUESTAS, CONSIDERANDO TOKEN, LEMA, STOPWORDS, N-GRAMAS, COHERENCIA Y RELEVANCIA.
- 4.2 CODIFICA UNA RUTINA EN PYTHON PARA LA LIMPIEZA DE TEXTO, TOKENIZACIÓN Y NORMALIZACIÓN SOBRE UN CORPUS DE DOCUMENTOS, DE ACUERDO CON BUENAS PRÁCTICAS.
- 4.3 CALCULA MÉTRICAS BÁSICAS DE CALIDAD DE RESPUESTAS GENERADAS, CONSIDERANDO COHERENCIA, RELEVANCIA, BLEU Y ROUGE, REGISTRANDO LOS RESULTADOS OBTENIDOS DE ACUERDO CON UN PROTOCOLO DEFINIDO.

| Lámina | Contenido del plan (textual) | En pantalla | Narración |
| --- | --- | --- | --- |
| 1 | 4. PIPELINE DE PREPROCESAMIENTO Y EVALUACIÓN BÁSICA DE TEXTO | Cápsula 4: Preparar y medir texto | Te doy la bienvenida a la cápsula 4 del módulo 2, Introducción a modelos generativos y consumo por API: Preparar y medir texto. "Basura entra, basura sale: limpiar antes, medir después". |
| 2 | Aprendizaje esperado y criterios de evaluación | Aprendizaje esperado 4 | Esta cápsula corresponde al aprendizaje esperado 4 del plan formativo: Implementar un pipeline de preprocesamiento y evaluación básica de texto en Python, aplicando técnicas de limpieza, normalización y métricas iniciales de calidad, de acuerdo con los requisitos de entrada y salida del modelo. Sus criterios de evaluación son: Explica los conceptos fundamentales de NLP y evaluación básica de respuestas, considerando token, lema, stopwords, n-gramas, coherencia y relevancia. Codifica una rutina en Python para la limpieza de texto, tokenización y normalización sobre un corpus de documentos, de acuerdo con buenas prácticas. Calcula métricas básicas de calidad de respuestas generadas, considerando coherencia, relevancia, BLEU y ROUGE, registrando los resultados obtenidos de acuerdo con un protocolo definido. |
| 3 | CONCEPTOS BÁSICOS DE NLP: TOKEN, PALABRA, LEMA, STOPWORDS Y N-GRAMAS. | Conceptos básicos de NLP | Conceptos básicos de NLP. Token (unidad que procesa el modelo), palabra, lema (forma de diccionario), stopwords (palabras frecuentes con poco contenido), n-gramas (secuencias de n tokens). |
| 4 | TÉCNICAS DE LIMPIEZA: ELIMINACIÓN DE CARACTERES ESPECIALES, HTML Y RUIDO. | Limpieza | Limpieza. Quitar HTML, caracteres especiales, firmas y ruido; reemplazar correos y enlaces por marcas. Cuidado con no borrar el problema que reporta el ticket. |
| 5 | NORMALIZACIÓN DE MAYÚSCULAS, MINÚSCULAS Y ESTANDARIZACIÓN DE TEXTO. | Normalización | Normalización. Mayúsculas y minúsculas, espacios, estandarización de texto; tildes solo para comparar al medir. |
| 6 | TOKENIZACIÓN Y NORMALIZACIÓN CON LIBRERÍAS COMO SPACY O NLTK. / LEMATIZACIÓN Y STEMMING. | Tokenizar, lematizar, stemming | Tokenizar, lematizar, stemming. spaCy (es core news sm) y NLTK. Lematizar: "corriendo", luego "correr"; stemming: recorta la raíz. |
| 7 | VECTORIZACIÓN BÁSICA: COUNTVECTORIZER Y TF-IDF. | Vectorización básica | Vectorización básica. CountVectorizer y TF-IDF de scikit-learn: representar textos como números para compararlos. |
| 8 | ESTRUCTURA MODULAR DE UN PIPELINE DE PREPROCESAMIENTO. / FUNCIONES REUTILIZABLES PARA CADA ETAPA. | Un pipeline modular | Un pipeline modular. Funciones reutilizables por etapa (limpiar, tokenizar, ngramas, medir) que se encadenan y se prueban por separado. |
| 9 | MÉTRICAS BÁSICAS DE CALIDAD DE RESPUESTAS: COHERENCIA, RELEVANCIA, BLEU Y ROUGE. | Métricas de calidad | Métricas de calidad. ROUGE (cuánto de la referencia aparece en el resumen), BLEU (cuánto del resumen aparece en la referencia, con penalización por largo), coherencia y relevancia con pauta humana. En español, usar un tokenizador que respete las tildes. |
| 10 | REGISTRO DE RESULTADOS DE EVALUACIÓN. / IDENTIFICACIÓN DE AJUSTES INICIALES A PARTIR DE MÉTRICAS OBTENIDAS. | Registrar y ajustar | Registrar y ajustar. Una fila por prueba en un CSV; identificar ajustes a partir de los números. |
| 11 | — | Tu tarea | Tu tarea. Actividad 2, pasos 1, 4 y 5. |

## Cobertura de los contenidos del plan

Cada contenido del aprendizaje esperado 4, tal como está en el plan, y la lámina donde aparece rotulado.

| Contenido del plan (textual) | Lámina |
| --- | --- |
| 4. PIPELINE DE PREPROCESAMIENTO Y EVALUACIÓN BÁSICA DE TEXTO | 1 |
| CONCEPTOS BÁSICOS DE NLP: TOKEN, PALABRA, LEMA, STOPWORDS Y N-GRAMAS. | 3 |
| TÉCNICAS DE LIMPIEZA: ELIMINACIÓN DE CARACTERES ESPECIALES, HTML Y RUIDO. | 4 |
| NORMALIZACIÓN DE MAYÚSCULAS, MINÚSCULAS Y ESTANDARIZACIÓN DE TEXTO. | 5 |
| TOKENIZACIÓN Y NORMALIZACIÓN CON LIBRERÍAS COMO SPACY O NLTK. | 6 |
| LEMATIZACIÓN Y STEMMING. | 6 |
| VECTORIZACIÓN BÁSICA: COUNTVECTORIZER Y TF-IDF. | 7 |
| ESTRUCTURA MODULAR DE UN PIPELINE DE PREPROCESAMIENTO. | 8 |
| FUNCIONES REUTILIZABLES PARA CADA ETAPA. | 8 |
| MÉTRICAS BÁSICAS DE CALIDAD DE RESPUESTAS: COHERENCIA, RELEVANCIA, BLEU Y ROUGE. | 9 |
| REGISTRO DE RESULTADOS DE EVALUACIÓN. | 10 |
| IDENTIFICACIÓN DE AJUSTES INICIALES A PARTIR DE MÉTRICAS OBTENIDAS. | 10 |
