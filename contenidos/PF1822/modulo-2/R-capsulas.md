# PF1822 · Módulo 2 · R03 y R04 — Cápsulas de contenido y cuadro comparativo

**Estado:** borrador · **Exigencia:** C4 d) uso de los medios (Anexo N°7, num. 7):
presentaciones y cuadro comparativo como medios para transferir el aprendizaje.
**Formato de cada cápsula:** presentación narrada de 8 a 12 minutos (11 o 12 láminas: portada, aprendizaje esperado y criterios textuales, una por tema rotulada con el contenido del plan textual, y la tarea), con
transcripción. Una por aprendizaje esperado. Contenidos tomados de la ficha SIPFOR del
módulo (`00-ficha-sipfor.md`).

---

## Cápsula 1 · Modelos generativos y su ecosistema (AE1 · 1.1, 1.2, 1.3)

| # | Lámina | Contenido del plan (textual) | Contenido |
| --- | --- | --- | --- |
| 1 | Portada | 1. MODELOS GENERATIVOS Y ECOSISTEMA TECNOLÓGICO | "Qué hace un modelo generativo y dónde encaja en una aplicación". El caso: el resumidor de tickets de Nube Sur. |
| 2 | IA generativa frente a IA tradicional | CONCEPTOS GENERALES DE IA GENERATIVA: QUÉ ES LA IA GENERATIVA Y PARA QUÉ SIRVE. / DIFERENCIAS ENTRE IA GENERATIVA Y IA TRADICIONAL BASADA EN REGLAS. | La IA tradicional basada en reglas decide con condiciones escritas por personas; la generativa **produce contenido nuevo** (texto, código, imágenes) aprendido de datos. |
| 3 | Tipos por lo que generan | TIPOS DE IA GENERATIVA: TEXTO, IMAGEN, AUDIO Y VIDEO. | Texto, imagen, audio y video. |
| 4 | Familias técnicas | TIPOS DE MODELOS: AUTORREGRESIVOS, DE DIFUSIÓN Y BASADOS EN TRANSFORMERS. | **Autorregresivos**: generan token a token (texto y código). **De difusión**: parten de ruido y lo refinan (imágenes, audio). **Transformers**: la arquitectura detrás de la mayoría de los modelos de lenguaje actuales. Ver el cuadro R04. |
| 5 | Casos de uso | CASOS DE USO: GENERACIÓN DE TEXTO, GENERACIÓN DE CÓDIGO, SÍNTESIS DE IMÁGENES, QA, SUMMARIZATION Y GENERACIÓN DE TESTS. | Generación de texto y de código, síntesis de imágenes, preguntas y respuestas, resúmenes, generación de pruebas. |
| 6 | Arquitecturas | ARQUITECTURAS: REQUEST–RESPONSE Y PIPELINES. | **Solicitud–respuesta** (una llamada, una respuesta) y **pipelines** (varias etapas encadenadas: limpiar → generar → evaluar → guardar). |
| 7 | Componentes | COMPONENTES: CLIENTE, SERVIDOR API, MODELO DE IA, MÓDULO DE PREPROCESAMIENTO Y BASE DE DATOS/VECTOR STORE. / FLUJO DE DATOS END-TO-END: TECNOLOGÍAS Y LIBRERÍAS: OPENAI API, HUGGING FACE TRANSFORMERS, TENSORFLOW, PYTORCH, LANGCHAIN Y DIFFUSERS. | Cliente · servidor API · módulo de preprocesamiento · modelo de IA · base de datos o *vector store*. Flujo de datos de extremo a extremo con el ticket de ejemplo. |
| 8 | Tecnologías y bibliotecas | ECOSISTEMA TECNOLÓGICO DE LA IA. / FLUJO DE DATOS END-TO-END: TECNOLOGÍAS Y LIBRERÍAS: OPENAI API, HUGGING FACE TRANSFORMERS, TENSORFLOW, PYTORCH, LANGCHAIN Y DIFFUSERS. | API de OpenAI · Hugging Face Transformers · TensorFlow · PyTorch · LangChain · Diffusers: qué resuelve cada una y en qué módulo del plan se vuelve a ver. |
| 9 | Elegir una arquitectura | ARQUITECTURAS: REQUEST–RESPONSE Y PIPELINES. | Criterios: **escalabilidad** (¿aguanta 10 veces más tickets?), **seguridad** (¿dónde están la clave y los datos personales?), **costo** (tokens por ticket) y **mantenimiento** (¿se puede cambiar de modelo sin reescribir todo?). |
| 10 | Tu tarea | — | Diagrama del resumidor y su justificación: actividad 1, parte A. |

---

## Cápsula 2 · Consumir modelos por API (AE2 · 2.1, 2.2, 2.3)

| # | Lámina | Contenido del plan (textual) | Contenido |
| --- | --- | --- | --- |
| 1 | Portada | 2. INTEGRACIÓN Y CONSUMO DE APIS | "Hablar con un modelo es hacer una solicitud HTTP bien hecha". |
| 2 | REST en dos métodos | PRINCIPIOS REST Y MÉTODOS HTTP: GET Y POST. | **GET** para leer (listar modelos); **POST** para enviar datos y pedir un resultado (generar, obtener embeddings). |
| 3 | Leer la documentación oficial | DOCUMENTACIÓN OFICIAL: ENLACES Y ORGANIZACIÓN DE LOS MANUALES DE OPENAI Y HUGGING FACE INFERENCE API. | Cómo están organizados los manuales de OpenAI y de Hugging Face: referencia de la API, guías, ejemplos. En cada endpoint buscar URL, autenticación, cuerpo y respuesta. |
| 4 | Endpoints de generación y de embeddings | ENDPOINTS DE GENERACIÓN Y EMBEDDINGS. | Generación: `messages` con roles → texto en `choices` y consumo en `usage`. Embeddings: `input` → un vector por texto en `data`. |
| 5 | Autenticación y variables de entorno | GESTIÓN DE AUTENTICACIÓN Y VARIABLES DE ENTORNO. | Encabezado `Authorization: Bearer <clave>`; la clave vive en una variable de entorno o en los *Secrets* del entorno, nunca en el código ni en el repositorio. |
| 6 | requests y httpx | LIBRERÍAS: REQUESTS Y HTTPX. | Las dos bibliotecas hacen lo mismo en lo básico; `httpx` suma tiempos de espera claros y una forma sencilla de simular la API en pruebas. |
| 7 | Cuerpos JSON y lectura de la respuesta | EJEMPLOS DE USO: PARÁMETROS, CUERPOS JSON Y PARSING DE RESPUESTA. | Armar el diccionario, enviarlo con `json=`, leer `respuesta.json()`. Siempre mirar primero `status_code`. |
| 8 | Errores del servicio | MANEJO BÁSICO DE ERRORES Y RESPUESTAS DEL SERVICIO. | 401 clave inválida · 429 demasiadas solicitudes (esperar y reintentar) · 5xx falla del proveedor. Un mensaje claro vale más que un programa que se cae. |
| 9 | Modularizar, documentar y probar | MODULARIZACIÓN DE FUNCIONES O CLASES PARA CONSUMO DE APIS. / DOCUMENTACIÓN CON DOCSTRINGS. / PRUEBAS UNITARIAS SIMPLES PARA FUNCIONES DE CONSUMO DE APIS. | Una clase que encapsula las llamadas, con docstrings, y pruebas unitarias que simulan la API para correr sin conexión ni costo. |
| 10 | Tu tarea | — | Notebook guiado R05 y actividad 1, parte B: `ClienteIA`. |

**OpenAI y Hugging Face en una tabla** (para la lámina 3):

| | API de OpenAI | Hugging Face |
| --- | --- | --- | --- |
| Qué ofrece | Modelos propios de la empresa por API | Un repositorio de miles de modelos abiertos y servicios para ejecutarlos (por API o en la propia máquina) |
| Autenticación | Clave de API en el encabezado | Token de acceso en el encabezado |
| Cuándo conviene | Calidad alta con poca configuración | Elegir o cambiar de modelo, usar modelos abiertos, ejecutar localmente |

`PENDIENTE:` el tutor revisa, antes de publicar, las URL y los nombres de modelos vigentes en
ambas documentaciones; cambian con frecuencia.

---

## Cápsula 3 · Diseño de prompts (AE3 · 3.1, 3.2, 3.3)

| # | Lámina | Contenido del plan (textual) | Contenido |
| --- | --- | --- | --- |
| 1 | Portada | 3. DISEÑO DE PROMPTS PARA APIS GENERATIVAS | "El prompt es la especificación". |
| 2 | Qué es un prompt | QUÉ ES UN PROMPT. / ESTRUCTURA BÁSICA DE ENTRADA PARA MODELOS DE LENGUAJE. | La entrada que le dice al modelo qué hacer. Estructura: mensaje de **sistema** (rol y reglas) y mensaje de **usuario** (la tarea y los datos). |
| 3 | Tipos de prompting | TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING. | **Zero-shot**: solo instrucciones. **Few-shot**: instrucciones más ejemplos de entrada y salida. **Instruccional**: pasos explícitos a seguir. |
| 4 | Buenas prácticas | PRÁCTICAS RECOMENDADAS: CLARIDAD, DELIMITACIÓN DEL ROL, CONTEXTO, RESTRICCIONES Y EVITAR AMBIGÜEDAD. | Claridad, rol definido, contexto suficiente, restricciones explícitas, evitar ambigüedad. |
| 5 | Formato de salida | FORMATEO DE SALIDAS: LISTAS, JSON Y ESTRUCTURA TABULAR. | Pedir listas, JSON o tablas cuando otro programa va a leer la respuesta. |
| 6 | Ejemplos prácticos | EJEMPLOS PRÁCTICOS: PROMPT PARA GENERAR CÓDIGO, RESUMEN, VALIDACIÓN Y REFORMULACIÓN. | Un prompt para generar código, uno para resumir, uno para validar y uno para reformular, con su salida. |
| 7 | Parámetros | PROMPT Y PARÁMETROS: CÓMO INFLUYEN TEMPERATURE, MAX_TOKENS Y TOP_P. | **temperature** (variedad), **max_tokens** (largo máximo), **top_p** (acota las opciones). Para resúmenes, temperature baja. |
| 8 | Limitaciones | LIMITACIONES: ALUCINACIONES, FALTA DE CONTROL Y SENSIBILIDAD AL WORDING. | Alucinaciones, falta de control, sensibilidad a la redacción: un cambio pequeño de palabras cambia la respuesta. |
| 9 | Iterar | ITERACIÓN Y AJUSTE DE PROMPTS SEGÚN RESULTADOS OBTENIDOS. | Cambiar una cosa a la vez, anotar qué cambió y qué efecto tuvo, y decidir con los resultados. |
| 10 | Tu tarea | — | Video interactivo R06 y actividad 2, pasos 2 y 3. |

---

## Cápsula 4 · Preparar y medir texto (AE4 · 4.1, 4.2, 4.3)

| # | Lámina | Contenido del plan (textual) | Contenido |
| --- | --- | --- | --- |
| 1 | Portada | 4. PIPELINE DE PREPROCESAMIENTO Y EVALUACIÓN BÁSICA DE TEXTO | "Basura entra, basura sale: limpiar antes, medir después". |
| 2 | Conceptos básicos de NLP | CONCEPTOS BÁSICOS DE NLP: TOKEN, PALABRA, LEMA, STOPWORDS Y N-GRAMAS. | **Token** (unidad que procesa el modelo), palabra, **lema** (forma de diccionario), **stopwords** (palabras frecuentes con poco contenido), **n-gramas** (secuencias de n tokens). |
| 3 | Limpieza | TÉCNICAS DE LIMPIEZA: ELIMINACIÓN DE CARACTERES ESPECIALES, HTML Y RUIDO. | Quitar HTML, caracteres especiales, firmas y ruido; reemplazar correos y enlaces por marcas. Cuidado con no borrar el problema que reporta el ticket. |
| 4 | Normalización | NORMALIZACIÓN DE MAYÚSCULAS, MINÚSCULAS Y ESTANDARIZACIÓN DE TEXTO. | Mayúsculas y minúsculas, espacios, estandarización de texto; tildes solo para comparar al medir. |
| 5 | Tokenizar, lematizar, stemming | TOKENIZACIÓN Y NORMALIZACIÓN CON LIBRERÍAS COMO SPACY O NLTK. / LEMATIZACIÓN Y STEMMING. | spaCy (`es_core_news_sm`) y NLTK. Lematizar: "corriendo" → "correr"; stemming: recorta la raíz. |
| 6 | Vectorización básica | VECTORIZACIÓN BÁSICA: COUNTVECTORIZER Y TF-IDF. | `CountVectorizer` y TF-IDF de scikit-learn: representar textos como números para compararlos. |
| 7 | Un pipeline modular | ESTRUCTURA MODULAR DE UN PIPELINE DE PREPROCESAMIENTO. / FUNCIONES REUTILIZABLES PARA CADA ETAPA. | Funciones reutilizables por etapa (`limpiar`, `tokenizar`, `ngramas`, `medir`) que se encadenan y se prueban por separado. |
| 8 | Métricas de calidad | MÉTRICAS BÁSICAS DE CALIDAD DE RESPUESTAS: COHERENCIA, RELEVANCIA, BLEU Y ROUGE. | **ROUGE** (cuánto de la referencia aparece en el resumen), **BLEU** (cuánto del resumen aparece en la referencia, con penalización por largo), **coherencia** y **relevancia** con pauta humana. En español, usar un tokenizador que respete las tildes. |
| 9 | Registrar y ajustar | REGISTRO DE RESULTADOS DE EVALUACIÓN. / IDENTIFICACIÓN DE AJUSTES INICIALES A PARTIR DE MÉTRICAS OBTENIDAS. | Una fila por prueba en un CSV; identificar ajustes a partir de los números. |
| 10 | Tu tarea | — | Actividad 2, pasos 1, 4 y 5. |

---

## R04 · Cuadro comparativo: familias de modelos generativos

**AE1 · indicador 1.1.** En la actividad 1 el participante agrega una columna con un caso de
uso para Nube Sur en cada fila.

| Familia | Cómo genera | Salida típica | Casos de uso en una organización | Ejemplos de tecnologías | A considerar |
| --- | --- | --- | --- | --- | --- |
| **Autorregresivos** | Predicen el siguiente token a partir de los anteriores, uno a la vez | Texto, código | Resúmenes, respuestas a clientes, generación de código y de pruebas | Modelos de lenguaje tipo GPT, Llama o Mistral | Pueden inventar datos; el costo depende de los tokens |
| **De difusión** | Parten de ruido y lo refinan en muchos pasos hasta llegar a la salida | Imágenes, audio | Imágenes para marketing, prototipos visuales | Stable Diffusion, biblioteca Diffusers | Más cómputo por resultado; derechos de uso de las imágenes |
| **Transformers codificadores** | Convierten un texto en una representación numérica; no generan texto libre | Embeddings, clasificación | Buscar tickets parecidos, clasificar por tema | Familia BERT, modelos de embeddings | Base de la búsqueda semántica del módulo 3 del plan |
| **Transformers codificador–decodificador** | Leen una entrada completa y generan una salida transformada | Texto a texto, audio a texto | Traducción, resumen, transcripción | Familias T5 y BART, Whisper | Buenos para tareas acotadas de transformación |

**Nota para el tutor:** "autorregresivo" y "de difusión" describen **cómo se genera**; 
"transformer" describe **la arquitectura**. La mayoría de los modelos de lenguaje actuales son
transformers autorregresivos. El plan los nombra como tres tipos: conviene explicar esta
superposición en la lámina 4 para que la clasificación no confunda.
