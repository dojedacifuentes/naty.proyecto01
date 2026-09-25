# PF1822 · Material de lectura (flipbook) por aprendizaje esperado — prompts

> Pega cada bloque en la IA de texto que uses. Revisa el resultado contra la ficha antes de
> maquetarlo (Heyzine, FlipHTML5 o PDF del LMS). Largo sugerido: 6 a 8 páginas por AE.

## Lectura AE1 · Modelos generativos y su ecosistema

```text
Escribe el material de lectura del aprendizaje esperado 1 del módulo "INTRODUCCIÓN A MODELOS GENERATIVOS Y CONSUMO POR API" del curso "Especialización en Desarrollo con IA" (e-learning, nivel 4).
Aprendizaje esperado (textual): ANALIZAR EL ROL DE LOS MODELOS GENERATIVOS EN EL DESARROLLO DE APLICACIONES, DESCRIBIENDO SUS TIPOS, CASOS DE USO, TECNOLOGÍAS ASOCIADAS Y REPRESENTANDO ARQUITECTURAS FUNCIONALES QUE INTEGREN ESTOS MODELOS MEDIANTE APIS.
Criterios de evaluación (textuales):
- 1.1 CLASIFICA LOS TIPOS DE MODELOS GENERATIVOS IDENTIFICANDO SUS CARACTERÍSTICAS Y APLICACIONES MÁS FRECUENTES EN LA ORGANIZACIÓN.
- 1.2 REPRESENTA UN DIAGRAMA FUNCIONAL DE UNA APLICACIÓN CON IA GENERATIVA, EXPLICANDO LA FUNCIÓN DE CADA COMPONENTE DENTRO DE LA ARQUITECTURA.
- 1.3 ANALIZA LA ELECCIÓN DE LA ARQUITECTURA EN FUNCIÓN DE CRITERIOS COMO ESCALABILIDAD, SEGURIDAD O MANTENIMIENTO.
Contenidos que debes cubrir, todos y en este orden (textuales del plan):
- 1. MODELOS GENERATIVOS Y ECOSISTEMA TECNOLÓGICO
  - CONCEPTOS GENERALES DE IA GENERATIVA: QUÉ ES LA IA GENERATIVA Y PARA QUÉ SIRVE. *DIFERENCIAS ENTRE IA GENERATIVA Y IA TRADICIONAL BASADA EN REGLAS.
  - TIPOS DE IA GENERATIVA: TEXTO, IMAGEN, AUDIO Y VIDEO. TIPOS DE MODELOS: AUTORREGRESIVOS, DE DIFUSIÓN Y BASADOS EN TRANSFORMERS.
  - CASOS DE USO: GENERACIÓN DE TEXTO, GENERACIÓN DE CÓDIGO, SÍNTESIS DE IMÁGENES, QA, SUMMARIZATION Y GENERACIÓN DE TESTS.
  - ECOSISTEMA TECNOLÓGICO DE LA IA. ARQUITECTURAS: REQUEST–RESPONSE Y PIPELINES. *COMPONENTES: CLIENTE, SERVIDOR API, MODELO DE IA, MÓDULO DE PREPROCESAMIENTO Y BASE DE DATOS/VECTOR STORE. *FLUJO DE DATOS END-TO-END: TECNOLOGÍAS Y LIBRERÍAS: OPENAI API, HUGGING FACE TRANSFORMERS, TENSORFLOW, PYTORCH, LANGCHAIN Y DIFFUSERS.
Sigue la misma secuencia de la videocápsula: IA generativa frente a IA tradicional / Tipos por lo que generan / Familias técnicas / Casos de uso / Arquitecturas / Componentes / Tecnologías y bibliotecas / Elegir una arquitectura.
Usa como ejemplo continuo el caso de Nube Sur, una empresa ficticia; no nombres instituciones reales.
Formato: títulos cortos, párrafos de 3 a 5 líneas, un ejemplo por sección, un recuadro "Error frecuente" y al final:
3 preguntas de autocomprobación con su respuesta y un glosario de 8 términos del AE.
Español de Chile, tono de colega; no inventes datos, cifras ni funciones que no existan en las herramientas.
```

## Lectura AE2 · Consumir modelos por API

```text
Escribe el material de lectura del aprendizaje esperado 2 del módulo "INTRODUCCIÓN A MODELOS GENERATIVOS Y CONSUMO POR API" del curso "Especialización en Desarrollo con IA" (e-learning, nivel 4).
Aprendizaje esperado (textual): UTILIZAR UN MODELO DE IA A TRAVÉS DE API REST UTILIZANDO SOLICITUDES HTTP Y AUTENTICACIÓN, BASÁNDOSE EN LA DOCUMENTACIÓN OFICIAL DE OPENAI Y HUGGING FACE.
Criterios de evaluación (textuales):
- 2.1 EXPLICA LA ESTRUCTURA Y PRINCIPALES SECCIONES DE LOS ENDPOINTS DE GENERACIÓN Y EMBEDDINGS DE ACUERDO CON LA DOCUMENTACIÓN OFICIAL DE OPENAI Y HUGGING FACE.
- 2.2 IMPLEMENTA LLAMADAS HTTP GET Y POST A ENDPOINTS DE COMPLETIONS Y EMBEDDINGS PARA EL CONSUMO DE SERVICIOS, DE ACUERDO CON LA DOCUMENTACIÓN OFICIAL.
- 2.3 IMPLEMENTA UNA FUNCIÓN O CLASE MODULAR EN PYTHON QUE ENCAPSULA LA LLAMADA AL API Y PERMITE REUTILIZARLA CON DISTINTOS PARÁMETROS, DOCUMENTADA CON DOCSTRINGS Y PRUEBAS UNITARIAS SIMPLES.
Contenidos que debes cubrir, todos y en este orden (textuales del plan):
- 2. INTEGRACIÓN Y CONSUMO DE APIS
  - PRINCIPIOS REST Y MÉTODOS HTTP: GET Y POST.
  - DOCUMENTACIÓN OFICIAL: ENLACES Y ORGANIZACIÓN DE LOS MANUALES DE OPENAI Y HUGGING FACE INFERENCE API.
  - ENDPOINTS DE GENERACIÓN Y EMBEDDINGS.
  - GESTIÓN DE AUTENTICACIÓN Y VARIABLES DE ENTORNO.
  - LIBRERÍAS: REQUESTS Y HTTPX.
  - EJEMPLOS DE USO: PARÁMETROS, CUERPOS JSON Y PARSING DE RESPUESTA.
  - MANEJO BÁSICO DE ERRORES Y RESPUESTAS DEL SERVICIO.
  - MODULARIZACIÓN DE FUNCIONES O CLASES PARA CONSUMO DE APIS.
  - DOCUMENTACIÓN CON DOCSTRINGS.
  - PRUEBAS UNITARIAS SIMPLES PARA FUNCIONES DE CONSUMO DE APIS.
Sigue la misma secuencia de la videocápsula: REST en dos métodos / Leer la documentación oficial / Endpoints de generación y de embeddings / Autenticación y variables de entorno / requests y httpx / Cuerpos JSON y lectura de la respuesta / Errores del servicio / Modularizar, documentar y probar.
Usa como ejemplo continuo el caso de Nube Sur, una empresa ficticia; no nombres instituciones reales.
Formato: títulos cortos, párrafos de 3 a 5 líneas, un ejemplo por sección, un recuadro "Error frecuente" y al final:
3 preguntas de autocomprobación con su respuesta y un glosario de 8 términos del AE.
Español de Chile, tono de colega; no inventes datos, cifras ni funciones que no existan en las herramientas.
```

## Lectura AE3 · Diseño de prompts

```text
Escribe el material de lectura del aprendizaje esperado 3 del módulo "INTRODUCCIÓN A MODELOS GENERATIVOS Y CONSUMO POR API" del curso "Especialización en Desarrollo con IA" (e-learning, nivel 4).
Aprendizaje esperado (textual): FORMULAR PROMPTS EFECTIVOS PARA MODELOS GENERATIVOS EN ESCENARIOS ZERO-SHOT O FEW-SHOT, CONSIDERANDO LA TAREA SOLICITADA Y LOS PARÁMETROS DE GENERACIÓN DISPONIBLES.
Criterios de evaluación (textuales):
- 3.1 EXPLICA LA FUNCIÓN DE UN PROMPT EN LA INTERACCIÓN CON MODELOS GENERATIVOS, DISTINGUIENDO ENTRE ESTRATEGIAS ZERO-SHOT Y FEW-SHOT, E IDENTIFICANDO SUS VENTAJAS Y LIMITACIONES BÁSICAS.
- 3.2 ELABORA PROMPTS ADECUADOS PARA TAREAS ESPECÍFICAS, COMO RESUMEN, GENERACIÓN DE CÓDIGO O REFORMULACIÓN DE TEXTO, SELECCIONANDO LA ESTRATEGIA DE PROMPTING MÁS APROPIADA SEGÚN EL OBJETIVO.
- 3.3 AJUSTA UN PROMPT DE FORMA ITERATIVA CON BASE EN LOS OUTPUTS OBTENIDOS, DESCRIBIENDO LOS CAMBIOS REALIZADOS EN TÉRMINOS DE CLARIDAD, ESTRUCTURA O CONTROL DEL COMPORTAMIENTO DEL MODELO.
Contenidos que debes cubrir, todos y en este orden (textuales del plan):
- 3. DISEÑO DE PROMPTS PARA APIS GENERATIVAS
  - QUÉ ES UN PROMPT.
  - ESTRUCTURA BÁSICA DE ENTRADA PARA MODELOS DE LENGUAJE.
  - TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING.
  - PRÁCTICAS RECOMENDADAS: CLARIDAD, DELIMITACIÓN DEL ROL, CONTEXTO, RESTRICCIONES Y EVITAR AMBIGÜEDAD.
  - FORMATEO DE SALIDAS: LISTAS, JSON Y ESTRUCTURA TABULAR.
  - EJEMPLOS PRÁCTICOS: PROMPT PARA GENERAR CÓDIGO, RESUMEN, VALIDACIÓN Y REFORMULACIÓN.
  - PROMPT Y PARÁMETROS: CÓMO INFLUYEN TEMPERATURE, MAX_TOKENS Y TOP_P.
  - LIMITACIONES: ALUCINACIONES, FALTA DE CONTROL Y SENSIBILIDAD AL WORDING.
  - ITERACIÓN Y AJUSTE DE PROMPTS SEGÚN RESULTADOS OBTENIDOS.
Sigue la misma secuencia de la videocápsula: Qué es un prompt / Tipos de prompting / Buenas prácticas / Formato de salida / Ejemplos prácticos / Parámetros / Limitaciones / Iterar.
Usa como ejemplo continuo el caso de Nube Sur, una empresa ficticia; no nombres instituciones reales.
Formato: títulos cortos, párrafos de 3 a 5 líneas, un ejemplo por sección, un recuadro "Error frecuente" y al final:
3 preguntas de autocomprobación con su respuesta y un glosario de 8 términos del AE.
Español de Chile, tono de colega; no inventes datos, cifras ni funciones que no existan en las herramientas.
```

## Lectura AE4 · Preparar y medir texto

```text
Escribe el material de lectura del aprendizaje esperado 4 del módulo "INTRODUCCIÓN A MODELOS GENERATIVOS Y CONSUMO POR API" del curso "Especialización en Desarrollo con IA" (e-learning, nivel 4).
Aprendizaje esperado (textual): IMPLEMENTAR UN PIPELINE DE PREPROCESAMIENTO Y EVALUACIÓN BÁSICA DE TEXTO EN PYTHON, APLICANDO TÉCNICAS DE LIMPIEZA, NORMALIZACIÓN Y MÉTRICAS INICIALES DE CALIDAD, DE ACUERDO CON LOS REQUISITOS DE ENTRADA Y SALIDA DEL MODELO.
Criterios de evaluación (textuales):
- 4.1 EXPLICA LOS CONCEPTOS FUNDAMENTALES DE NLP Y EVALUACIÓN BÁSICA DE RESPUESTAS, CONSIDERANDO TOKEN, LEMA, STOPWORDS, N-GRAMAS, COHERENCIA Y RELEVANCIA.
- 4.2 CODIFICA UNA RUTINA EN PYTHON PARA LA LIMPIEZA DE TEXTO, TOKENIZACIÓN Y NORMALIZACIÓN SOBRE UN CORPUS DE DOCUMENTOS, DE ACUERDO CON BUENAS PRÁCTICAS.
- 4.3 CALCULA MÉTRICAS BÁSICAS DE CALIDAD DE RESPUESTAS GENERADAS, CONSIDERANDO COHERENCIA, RELEVANCIA, BLEU Y ROUGE, REGISTRANDO LOS RESULTADOS OBTENIDOS DE ACUERDO CON UN PROTOCOLO DEFINIDO.
Contenidos que debes cubrir, todos y en este orden (textuales del plan):
- 4. PIPELINE DE PREPROCESAMIENTO Y EVALUACIÓN BÁSICA DE TEXTO
  - CONCEPTOS BÁSICOS DE NLP: TOKEN, PALABRA, LEMA, STOPWORDS Y N-GRAMAS.
  - TÉCNICAS DE LIMPIEZA: ELIMINACIÓN DE CARACTERES ESPECIALES, HTML Y RUIDO.
  - NORMALIZACIÓN DE MAYÚSCULAS, MINÚSCULAS Y ESTANDARIZACIÓN DE TEXTO.
  - TOKENIZACIÓN Y NORMALIZACIÓN CON LIBRERÍAS COMO SPACY O NLTK.
  - LEMATIZACIÓN Y STEMMING.
  - VECTORIZACIÓN BÁSICA: COUNTVECTORIZER Y TF-IDF.
  - ESTRUCTURA MODULAR DE UN PIPELINE DE PREPROCESAMIENTO.
  - FUNCIONES REUTILIZABLES PARA CADA ETAPA.
  - MÉTRICAS BÁSICAS DE CALIDAD DE RESPUESTAS: COHERENCIA, RELEVANCIA, BLEU Y ROUGE.
  - REGISTRO DE RESULTADOS DE EVALUACIÓN.
  - IDENTIFICACIÓN DE AJUSTES INICIALES A PARTIR DE MÉTRICAS OBTENIDAS.
Sigue la misma secuencia de la videocápsula: Conceptos básicos de NLP / Limpieza / Normalización / Tokenizar, lematizar, stemming / Vectorización básica / Un pipeline modular / Métricas de calidad / Registrar y ajustar.
Usa como ejemplo continuo el caso de Nube Sur, una empresa ficticia; no nombres instituciones reales.
Formato: títulos cortos, párrafos de 3 a 5 líneas, un ejemplo por sección, un recuadro "Error frecuente" y al final:
3 preguntas de autocomprobación con su respuesta y un glosario de 8 términos del AE.
Español de Chile, tono de colega; no inventes datos, cifras ni funciones que no existan en las herramientas.
```
