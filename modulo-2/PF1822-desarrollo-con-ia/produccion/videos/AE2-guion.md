# PF1822 · Cápsula 2 (AE2) · Consumir modelos por API — guion

Base para HeyGen: `AE2-capsula.pptx`, una escena por lámina, con la narración en las notas.
Esta tabla trae la misma narración, para otras herramientas o para pulirla antes de grabar.

**Aprendizaje esperado 2 (textual del plan):** UTILIZAR UN MODELO DE IA A TRAVÉS DE API REST UTILIZANDO SOLICITUDES HTTP Y AUTENTICACIÓN, BASÁNDOSE EN LA DOCUMENTACIÓN OFICIAL DE OPENAI Y HUGGING FACE.

**Criterios de evaluación (textuales del plan):**

- 2.1 EXPLICA LA ESTRUCTURA Y PRINCIPALES SECCIONES DE LOS ENDPOINTS DE GENERACIÓN Y EMBEDDINGS DE ACUERDO CON LA DOCUMENTACIÓN OFICIAL DE OPENAI Y HUGGING FACE.
- 2.2 IMPLEMENTA LLAMADAS HTTP GET Y POST A ENDPOINTS DE COMPLETIONS Y EMBEDDINGS PARA EL CONSUMO DE SERVICIOS, DE ACUERDO CON LA DOCUMENTACIÓN OFICIAL.
- 2.3 IMPLEMENTA UNA FUNCIÓN O CLASE MODULAR EN PYTHON QUE ENCAPSULA LA LLAMADA AL API Y PERMITE REUTILIZARLA CON DISTINTOS PARÁMETROS, DOCUMENTADA CON DOCSTRINGS Y PRUEBAS UNITARIAS SIMPLES.

| Lámina | Contenido del plan (textual) | En pantalla | Narración |
| --- | --- | --- | --- |
| 1 | 2. INTEGRACIÓN Y CONSUMO DE APIS | Cápsula 2: Consumir modelos por API | Te doy la bienvenida a la cápsula 2 del módulo 2, Introducción a modelos generativos y consumo por API: Consumir modelos por API. "Hablar con un modelo es hacer una solicitud HTTP bien hecha". |
| 2 | Aprendizaje esperado y criterios de evaluación | Aprendizaje esperado 2 | Esta cápsula corresponde al aprendizaje esperado 2 del plan formativo: Utilizar un modelo de IA a través de API REST utilizando solicitudes HTTP y autenticación, basándose en la documentación oficial de OpenAI y Hugging Face. Sus criterios de evaluación son: Explica la estructura y principales secciones de los endpoints de generación y embeddings de acuerdo con la documentación oficial de OpenAI y Hugging Face. Implementa llamadas HTTP GET y POST a endpoints de completions y embeddings para el consumo de servicios, de acuerdo con la documentación oficial. Implementa una función o clase modular en Python que encapsula la llamada al API y permite reutilizarla con distintos parámetros, documentada con docstrings y pruebas unitarias simples. |
| 3 | PRINCIPIOS REST Y MÉTODOS HTTP: GET Y POST. | REST en dos métodos | REST en dos métodos. GET para leer (listar modelos); POST para enviar datos y pedir un resultado (generar, obtener embeddings). |
| 4 | DOCUMENTACIÓN OFICIAL: ENLACES Y ORGANIZACIÓN DE LOS MANUALES DE OPENAI Y HUGGING FACE INFERENCE API. | Leer la documentación oficial | Leer la documentación oficial. Cómo están organizados los manuales de OpenAI y de Hugging Face: referencia de la API, guías, ejemplos. En cada endpoint buscar URL, autenticación, cuerpo y respuesta. |
| 5 | ENDPOINTS DE GENERACIÓN Y EMBEDDINGS. | Endpoints de generación y de embeddings | Endpoints de generación y de embeddings. Generación: messages con roles, luego texto en choices y consumo en usage. Embeddings: input, luego un vector por texto en data. |
| 6 | GESTIÓN DE AUTENTICACIÓN Y VARIABLES DE ENTORNO. | Autenticación y variables de entorno | Autenticación y variables de entorno. Encabezado Authorization, con la palabra Bearer y la clave; la clave vive en una variable de entorno o en los Secrets del entorno, nunca en el código ni en el repositorio. |
| 7 | LIBRERÍAS: REQUESTS Y HTTPX. | requests y httpx | requests y httpx. Las dos bibliotecas hacen lo mismo en lo básico; httpx suma tiempos de espera claros y una forma sencilla de simular la API en pruebas. |
| 8 | EJEMPLOS DE USO: PARÁMETROS, CUERPOS JSON Y PARSING DE RESPUESTA. | Cuerpos JSON y lectura de la respuesta | Cuerpos JSON y lectura de la respuesta. Armar el diccionario, enviarlo con el parámetro json, leer respuesta punto json. Siempre mirar primero status code. |
| 9 | MANEJO BÁSICO DE ERRORES Y RESPUESTAS DEL SERVICIO. | Errores del servicio | Errores del servicio. 401 clave inválida, 429 demasiadas solicitudes (esperar y reintentar), 5xx falla del proveedor. Un mensaje claro vale más que un programa que se cae. |
| 10 | MODULARIZACIÓN DE FUNCIONES O CLASES PARA CONSUMO DE APIS. / DOCUMENTACIÓN CON DOCSTRINGS. / PRUEBAS UNITARIAS SIMPLES PARA FUNCIONES DE CONSUMO DE APIS. | Modularizar, documentar y probar | Modularizar, documentar y probar. Una clase que encapsula las llamadas, con docstrings, y pruebas unitarias que simulan la API para correr sin conexión ni costo. |
| 11 | — | Tu tarea | Tu tarea. Notebook guiado y actividad 1, parte B: ClienteIA. |

## Cobertura de los contenidos del plan

Cada contenido del aprendizaje esperado 2, tal como está en el plan, y la lámina donde aparece rotulado.

| Contenido del plan (textual) | Lámina |
| --- | --- |
| 2. INTEGRACIÓN Y CONSUMO DE APIS | 1 |
| PRINCIPIOS REST Y MÉTODOS HTTP: GET Y POST. | 3 |
| DOCUMENTACIÓN OFICIAL: ENLACES Y ORGANIZACIÓN DE LOS MANUALES DE OPENAI Y HUGGING FACE INFERENCE API. | 4 |
| ENDPOINTS DE GENERACIÓN Y EMBEDDINGS. | 5 |
| GESTIÓN DE AUTENTICACIÓN Y VARIABLES DE ENTORNO. | 6 |
| LIBRERÍAS: REQUESTS Y HTTPX. | 7 |
| EJEMPLOS DE USO: PARÁMETROS, CUERPOS JSON Y PARSING DE RESPUESTA. | 8 |
| MANEJO BÁSICO DE ERRORES Y RESPUESTAS DEL SERVICIO. | 9 |
| MODULARIZACIÓN DE FUNCIONES O CLASES PARA CONSUMO DE APIS. | 10 |
| DOCUMENTACIÓN CON DOCSTRINGS. | 10 |
| PRUEBAS UNITARIAS SIMPLES PARA FUNCIONES DE CONSUMO DE APIS. | 10 |
