# PF1822 · Módulo 2 · Glosario integrador

**Estado:** borrador · **Va en:** LMS (PDF y actividad Glosario de Moodle) · **Pedido:** usuario, 2026-09-30
Fuente de `M2-02-Glosario-integrador` (PDF, CSV y XML para importar en Moodle), que genera `npm run evaluacion`.
Integra y amplía los 32 términos de los glosarios de las cuatro lecturas; los ejemplos salen del caso Nube Sur.

## Presentación

Este glosario reúne en un solo lugar el vocabulario técnico del módulo «{{modulo}}». Integra y amplía los glosarios de las cuatro lecturas: cada término tiene una definición precisa, un ejemplo tomado de Nube Sur, la empresa ficticia de software cuya mesa de ayuda acompaña todo el módulo, y los términos relacionados con los que conviene leerlo.

Está organizado por los cuatro contenidos del plan formativo, en el mismo orden en que avanza el módulo:

1. **{{unidad 1}}:** qué es la IA generativa, qué tipos de modelos existen, para qué se usan y cómo se arma una aplicación que los integra.
2. **{{unidad 2}}:** cómo se consume un modelo por API REST desde Python, con autenticación segura, manejo de errores, docstrings y pruebas.
3. **{{unidad 3}}:** cómo se escribe, se parametriza y se mejora un prompt, y qué límites tiene el modelo.
4. **{{unidad 4}}:** cómo se limpia, normaliza y tokeniza un texto, y cómo se miden y registran los resultados para decidir ajustes.

Dentro de cada contenido, los términos van en orden alfabético, y la última columna indica el tema del plan formativo que cada término ayuda a comprender; todos los temas del módulo tienen al menos un término. Al final, un índice alfabético reúne todos los términos con el número de su contenido. Los términos que las herramientas y la documentación usan en inglés (embedding, endpoint, few-shot, temperature, top_p) se dejan en inglés, tal como los vas a encontrar al programar.

Cómo usarlo:

- **Durante las lecturas.** Cuando una lectura use un término de otro contenido, búscalo aquí. Los *Relacionados* te llevan de un contenido a otro: de Embedding a Similitud coseno, o de Token a Max_tokens.
- **En los ABP y ABPRO.** Úsalo para nombrar con precisión lo que haces: al justificar una arquitectura, al escribir las docstrings de tu cliente de API, al registrar una iteración de prompt o al definir un protocolo de evaluación.
- **En la actividad final integradora.** El asistente de preguntas frecuentes de Nube Sur usa términos de los cuatro contenidos a la vez, y muchos ejemplos de este glosario salen de ese caso. Revísalos antes de empezar y úsalos al escribir tu informe.
- **En Moodle.** El mismo glosario está en el curso como actividad Glosario: puedes buscar un término, recorrerlo por letra o por categoría (una por cada contenido del plan). El PDF y la actividad tienen los mismos términos, definiciones y ejemplos; los términos relacionados aparecen en el PDF.

## Contenido 1

### IA generativa
- **Plan:** {{c:CONCEPTOS GENERALES DE IA GENERATIVA}} {{c:TIPOS DE IA GENERATIVA}}
- **Definición:** Rama de la inteligencia artificial que produce contenido nuevo (texto, código, imágenes, audio o video) a partir de patrones aprendidos de grandes cantidades de datos; los modelos multimodales combinan más de uno de esos tipos. Sirve para redactar, resumir, responder preguntas, generar código y pruebas, pero su salida es probable, no verificada, y siempre hay que validarla.
- **Ejemplo:** Nube Sur usa IA generativa para escribir una oración por ticket y para redactar respuestas a partir de sus preguntas frecuentes, dos tareas que ninguna regla fija puede anticipar.
- **Relacionados:** IA basada en reglas, Modelo de lenguaje, Alucinación

### IA basada en reglas
- **Plan:** {{c:DIFERENCIAS ENTRE IA GENERATIVA Y IA TRADICIONAL}}
- **Definición:** Enfoque tradicional en que el sistema decide con condiciones escritas por personas («si el texto contiene X, hacer Y»). Es predecible, barato y fácil de auditar, pero solo resuelve los casos que alguien anticipó y no produce contenido nuevo.
- **Ejemplo:** Asignar a Facturación todo ticket que contenga «factura» es una buena regla, pero un buscador por palabras clave no reconoce que «olvidé la clave y no puedo entrar» pregunta lo mismo que F1, «¿Cómo recupero mi contraseña?».
- **Relacionados:** IA generativa, Embedding

### Modelo de lenguaje
- **Plan:** {{c:TIPOS DE IA GENERATIVA}} {{c:TIPOS DE MODELOS}}
- **Definición:** Modelo de IA generativa de texto que, entrenado con enormes corpus, predice el token siguiente de una secuencia; los modelos grandes (LLM) así redactan, resumen, responden preguntas, siguen instrucciones y escriben código. Es el tipo de modelo que este módulo consume por API.
- **Ejemplo:** El modelo que Nube Sur configura en la variable `MODELO_CHAT` es un modelo de lenguaje: recibe la consulta y la respuesta publicada elegida, y redacta la respuesta del asistente.
- **Relacionados:** Modelo autorregresivo, Transformer, Prompt, Token

### Modelo autorregresivo
- **Plan:** {{c:TIPOS DE MODELOS}}
- **Definición:** Modelo que genera la salida un token a la vez: predice el siguiente a partir de la entrada y de todo lo que ya generó, lo agrega y repite hasta terminar o llegar al límite de tokens. Así generan texto y código los modelos de lenguaje actuales.
- **Ejemplo:** La respuesta del asistente de Nube Sur se escribe token a token, y por eso un `max_tokens` demasiado bajo puede cortarla a mitad de una oración.
- **Relacionados:** Modelo de lenguaje, Transformer, Max_tokens

### Modelo de difusión
- **Plan:** {{c:TIPOS DE MODELOS}} {{c:TIPOS DE IA GENERATIVA}}
- **Definición:** Modelo que genera imágenes, audio o video partiendo de ruido aleatorio y refinándolo en muchos pasos hasta obtener un resultado que corresponde a la descripción pedida. Es el tipo de modelo más usado en la IA generativa de imagen y video, y también se aplica a audio; en Python se usan, entre otras, con la biblioteca Diffusers de Hugging Face.
- **Ejemplo:** Nube Sur lo descarta para el asistente de preguntas frecuentes, que solo produce texto, pero le serviría para ilustrar los artículos de su centro de ayuda.
- **Relacionados:** IA generativa, Modelo autorregresivo

### Transformer
- **Plan:** {{c:TIPOS DE MODELOS}}
- **Definición:** Arquitectura de red neuronal basada en el mecanismo de atención, que relaciona cada parte de la entrada con todas las demás; en ella se apoyan casi todos los modelos de lenguaje actuales. Tiene variantes codificadoras (convierten un texto en vectores), decodificadoras (generan texto de forma autorregresiva) y codificador–decodificador (transforman una entrada en otra salida, como en una traducción).
- **Ejemplo:** En el asistente de Nube Sur trabajan dos transformers: uno codificador calcula los embeddings de las preguntas y uno decodificador redacta la respuesta.
- **Relacionados:** Modelo autorregresivo, Embedding, Modelo de lenguaje

### Embedding
- **Plan:** {{c:COMPONENTES}}
- **Definición:** Representación de un texto como un vector de números de largo fijo, calculada por un modelo de embeddings (en general, un transformer codificador), en la que los textos de significado parecido quedan cerca. Se obtiene del endpoint de embeddings y se compara con la similitud coseno.
- **Ejemplo:** «olvidé la clave y no puedo entrar» y «¿Cómo recupero mi contraseña?» no comparten palabras clave, pero sus embeddings quedan cerca, y así el asistente elige la pregunta frecuente F1.
- **Relacionados:** Vector store, Similitud coseno, Endpoint, Transformer

### QA (preguntas y respuestas)
- **Plan:** {{c:CASOS DE USO}}
- **Definición:** Caso de uso en que el modelo responde preguntas formuladas en lenguaje natural. En una aplicación confiable se le entrega el texto de referencia (documentación, preguntas frecuentes) y se le exige responder solo con él, sin inventar.
- **Ejemplo:** El asistente de Nube Sur es un caso de QA: busca la pregunta frecuente más parecida a la consulta y responde solo con su respuesta publicada, o deriva con un ejecutivo.
- **Relacionados:** Summarization, Restricción, Alucinación, Embedding

### Summarization
- **Plan:** {{c:CASOS DE USO}}
- **Definición:** Caso de uso en que el modelo condensa un texto largo en uno más corto que conserva lo esencial, sin agregar datos que no estaban en el original. Es una tarea fiel a la fuente: el modelo reformula con sus palabras lo que ya está (resumen abstractivo), pero no crea información nueva; por eso se hace con temperature baja y se evalúa contra un resumen de referencia.
- **Ejemplo:** El resumidor de Nube Sur convierte el ticket T1, con HTML y firma, en «El usuario no puede iniciar sesión en la app de facturación tras cambiar su contraseña».
- **Relacionados:** QA (preguntas y respuestas), ROUGE, Temperature

### Solicitud–respuesta
- **Plan:** {{c:ARQUITECTURAS}}
- **Definición:** Arquitectura (*request–response*) en que la aplicación envía una solicitud al modelo, espera y muestra la respuesta; cada solicitud es independiente de las anteriores. Es simple y sirve para respuestas inmediatas, pero la persona espera mientras el modelo genera.
- **Ejemplo:** Cuando alguien escribe una pregunta en el centro de ayuda, el asistente de Nube Sur responde con una solicitud–respuesta: una consulta, una respuesta en pocos segundos.
- **Relacionados:** Pipeline, Servidor API, API REST

### Pipeline
- **Plan:** {{c:ARQUITECTURAS}}
- **Definición:** Arquitectura de etapas encadenadas en que la salida de cada etapa es la entrada de la siguiente. Cada etapa se prueba y se cambia por separado, y el conjunto puede procesar muchos elementos en lote, sin que nadie espere en pantalla.
- **Ejemplo:** Los embeddings de las preguntas frecuentes F1 a F8 se calculan una sola vez en un pipeline (limpiar, normalizar, obtener embeddings, guardar en el vector store) y no en cada consulta, lo que ahorra llamadas a la API.
- **Relacionados:** Solicitud–respuesta, Pipeline de preprocesamiento, Vector store

### Servidor API
- **Plan:** {{c:COMPONENTES}} {{c:FLUJO DE DATOS END-TO-END}}
- **Definición:** Componente intermedio que recibe las solicitudes del cliente (la aplicación que usa la persona), orquesta el flujo de datos de extremo a extremo por el preprocesamiento, el modelo de IA y la base de datos o vector store, y devuelve el resultado. Es el único componente que guarda la clave de la API.
- **Ejemplo:** El flujo end-to-end del asistente es: el centro de ayuda envía la pregunta al servidor, que la limpia, obtiene su embedding, la compara en el vector store, llama al modelo y devuelve la respuesta, sin que el navegador vea nunca la clave.
- **Relacionados:** Vector store, Variable de entorno, Solicitud–respuesta, Bearer

### Vector store
- **Plan:** {{c:COMPONENTES}}
- **Definición:** Base de datos que guarda embeddings junto al texto al que corresponden y permite buscar los más parecidos a un vector dado. En una versión mínima puede ser una lista en memoria o un archivo; a mayor escala, un servicio especializado.
- **Ejemplo:** El vector store del asistente guarda los embeddings de F1 a F8, y cada consulta se compara contra ellos sin volver a pedirlos a la API.
- **Relacionados:** Embedding, Similitud coseno, Servidor API

### Hugging Face Transformers
- **Plan:** {{c:ECOSISTEMA TECNOLÓGICO DE LA IA}} {{c:FLUJO DE DATOS END-TO-END}}
- **Definición:** Biblioteca de Python de Hugging Face para descargar y ejecutar modelos abiertos del Hub (generación, resumen, clasificación, embeddings) sobre PyTorch: desde la versión 5 funciona solo con PyTorch, y el soporte de TensorFlow y JAX quedó en la 4.x. PyTorch y TensorFlow son los dos frameworks de aprendizaje profundo más usados para entrenar y ejecutar modelos. Es parte del ecosistema tecnológico de la IA junto a las APIs de proveedores como OpenAI y a bibliotecas como LangChain y Diffusers.
- **Ejemplo:** Si Nube Sur quisiera que las preguntas de sus clientes no salieran de la empresa, podría calcular los embeddings con un modelo abierto ejecutado con Transformers en su servidor; en esta versión le basta la API.
- **Relacionados:** LangChain, Transformer, Referencia de la API

### LangChain
- **Plan:** {{c:ECOSISTEMA TECNOLÓGICO DE LA IA}} {{c:FLUJO DE DATOS END-TO-END}}
- **Definición:** Framework para orquestar aplicaciones con modelos de lenguaje: encadena prompts, llamadas a modelos, recuperación de documentos, herramientas y agentes, con una interfaz común para distintos proveedores.
- **Ejemplo:** El asistente de Nube Sur no lo necesita en esta versión, porque su flujo es corto y cabe en un cliente de API propio; se vuelve útil cuando el flujo suma pasos, fuentes de datos y herramientas.
- **Relacionados:** Hugging Face Transformers, Pipeline, Modularización

## Contenido 2

### API REST
- **Plan:** {{c:PRINCIPIOS REST Y MÉTODOS HTTP}}
- **Definición:** Interfaz que expone recursos en URL y se usa con métodos HTTP: cada solicitud es independiente, lleva su autenticación y recibe un código de estado y un cuerpo, casi siempre en JSON. GET lee un recurso sin enviar cuerpo; POST envía datos en el cuerpo y pide un resultado.
- **Ejemplo:** Al arrancar, el servidor de Nube Sur hace un GET a `/v1/models` para comprobar la clave y el modelo configurado, y después cada consulta del asistente es un POST con cuerpo JSON.
- **Relacionados:** Endpoint, Código de estado, Parsing de respuesta

### Endpoint
- **Plan:** {{c:ENDPOINTS DE GENERACIÓN Y EMBEDDINGS}}
- **Definición:** URL de una API que ofrece una operación concreta con un método definido. En este módulo importan dos: el de generación (`POST /v1/chat/completions`) y el de embeddings (`POST /v1/embeddings`), que recibe en `input` un texto o una lista de textos y devuelve en `data` un vector por texto, con su posición en `index`.
- **Ejemplo:** `ClienteIA`, la clase con que el servidor de Nube Sur llama a la API, envía las ocho preguntas frecuentes en una sola llamada al endpoint de embeddings y ordena los vectores por `index` antes de guardarlos.
- **Relacionados:** Chat completions, Embedding, API REST, Referencia de la API

### Chat completions
- **Plan:** {{c:ENDPOINTS DE GENERACIÓN Y EMBEDDINGS}} {{c:EJEMPLOS DE USO}}
- **Definición:** Endpoint de generación (`POST /v1/chat/completions`) que recibe un cuerpo JSON con `model`, la lista `messages` con sus roles (`system`, `user`, `assistant`) y parámetros como `temperature` y `max_tokens`, y devuelve el texto en `choices[0].message.content`. OpenAI ofrece además la API Responses; aquí se usa chat completions porque muchos proveedores, incluido Hugging Face, replican su formato.
- **Ejemplo:** El método `generar(mensajes, temperature, max_tokens)` de `ClienteIA`, en el servidor de Nube Sur, arma ese cuerpo con el mensaje de sistema, los ejemplos y la consulta recibida.
- **Relacionados:** Endpoint, Mensaje de sistema, Parsing de respuesta, Temperature

### Código de estado
- **Plan:** {{c:PRINCIPIOS REST Y MÉTODOS HTTP}} {{c:MANEJO BÁSICO DE ERRORES}}
- **Definición:** Número de tres cifras con que una respuesta HTTP informa el resultado: 2xx éxito; 4xx error de quien hace la solicitud (400 cuerpo inválido, 401 clave ausente o inválida, 404 recurso o modelo inexistente, 429 demasiadas solicitudes o cuota agotada); 5xx falla del servicio. Se reintenta, con esperas crecientes y respetando el encabezado `Retry-After` si viene, un 429 por límite de solicitudes, un 5xx o un tiempo de espera agotado, que es un error sin código; un 429 por cuota o saldo agotado (`insufficient_quota` en OpenAI), igual que un 400, 401 o 404, no se arregla reintentando.
- **Ejemplo:** Con una clave revocada, `ClienteIA` recibe 401 y lanza `ErrorAPI` con «HTTP 401», en vez de caerse con un `KeyError` al buscar `choices`.
- **Relacionados:** API REST, Parsing de respuesta, httpx, API simulada

### Referencia de la API
- **Plan:** {{c:DOCUMENTACIÓN OFICIAL}}
- **Definición:** Parte de la documentación oficial que describe cada endpoint: URL y método, autenticación, parámetros del cuerpo, forma de la respuesta y errores, con ejemplos. En OpenAI (platform.openai.com/docs) convive con las guías y las páginas de modelos y límites; en Hugging Face (huggingface.co/docs), la Inference API hoy se documenta como Inference Providers y se organiza por tarea, y cada modelo del Hub tiene su ficha (*model card*).
- **Ejemplo:** Antes de programar `embeddings()`, el README de Nube Sur anota, con el enlace a la página de cada proveedor, la URL, el método, la autenticación, los campos obligatorios y dónde viene el vector.
- **Relacionados:** Endpoint, Chat completions, Hugging Face Transformers

### Bearer
- **Plan:** {{c:GESTIÓN DE AUTENTICACIÓN Y VARIABLES DE ENTORNO}}
- **Definición:** Esquema de autenticación en que la clave se envía en el encabezado `Authorization` de cada solicitud, precedida de la palabra `Bearer` y un espacio. Lo usan la API de OpenAI, con la clave de API, y Hugging Face, con un token de acceso.
- **Ejemplo:** `ClienteIA`, que corre en el servidor de Nube Sur, agrega una sola vez el encabezado `Authorization: Bearer` con la clave leída de `OPENAI_API_KEY`, y una prueba unitaria verifica que viaje en cada solicitud.
- **Relacionados:** Variable de entorno, Código de estado, Prueba unitaria

### Variable de entorno
- **Plan:** {{c:GESTIÓN DE AUTENTICACIÓN Y VARIABLES DE ENTORNO}}
- **Definición:** Valor con nombre que el sistema operativo o la plataforma entrega al programa al ejecutarlo; se usa para mantener claves y configuración fuera del código. En desarrollo se define en la terminal o en un archivo `.env` listado en `.gitignore`; Python no lee ese archivo por sí solo, así que el programa lo carga al iniciar, por ejemplo con `load_dotenv()` de python-dotenv. Un `.env.example` sin valores sirve de guía.
- **Ejemplo:** El paquete `nubesur_ia`, en el servidor de Nube Sur, lee `OPENAI_API_KEY` o `HF_TOKEN` según el valor de `PROVEEDOR_IA`, y en el repositorio solo queda `.env.example` con los nombres, nunca con los valores.
- **Relacionados:** Bearer, Servidor API, Modularización

### httpx
- **Plan:** {{c:LIBRERÍAS: REQUESTS Y HTTPX}}
- **Definición:** Biblioteca de Python para solicitudes HTTP, con una interfaz casi igual a la de requests, la otra biblioteca del módulo. A diferencia de requests, que espera sin límite si no se le indica `timeout`, httpx aplica un tiempo de espera de 5 segundos por defecto, ofrece un cliente asíncrono y permite simular la API en pruebas con `httpx.MockTransport`. Con cualquiera de las dos, cada solicitud debe llevar un tiempo de espera definido.
- **Ejemplo:** `ClienteIA` crea una vez `httpx.Client(base_url=..., timeout=30.0)` y reutiliza la conexión, la URL base y el encabezado de autenticación en todas sus llamadas; con requests, el equivalente es una `requests.Session()` y `timeout=30` en cada llamada.
- **Relacionados:** API simulada, Código de estado, Modularización

### Parsing de respuesta
- **Plan:** {{c:EJEMPLOS DE USO}}
- **Definición:** Leer la respuesta de la API y extraer lo que se necesita: primero se revisa el código de estado, después se convierte el cuerpo con `respuesta.json()` y se navega hasta los campos, como `choices[0].message.content`, `choices[0].finish_reason` y, en el primer nivel, `usage`, que trae los tokens de entrada, de salida y el total.
- **Ejemplo:** Por cada consulta, el asistente de Nube Sur muestra el texto generado y guarda los valores de `usage` en una fila de `consumo.csv`, para saber cuántos tokens gasta.
- **Relacionados:** Chat completions, Código de estado, Token, Salida estructurada

### Modularización
- **Plan:** {{c:MODULARIZACIÓN DE FUNCIONES O CLASES}}
- **Definición:** Reunir en una pieza de código (una función, una clase o un paquete) todo lo relativo a la API: URL base, autenticación, tiempo de espera, revisión de errores y cada operación. El resto de la aplicación llama a métodos con nombres claros y no sabe nada de HTTP, así que un cambio de proveedor o de formato toca un solo lugar.
- **Ejemplo:** Con el paquete `nubesur_ia`, el resto del código llama a `generar()` o `embeddings()`, y pasar de OpenAI a Hugging Face es cambiar `PROVEEDOR_IA`, no reescribir llamadas.
- **Relacionados:** Docstring, Prueba unitaria, Variable de entorno

### Docstring
- **Plan:** {{c:DOCUMENTACIÓN CON DOCSTRINGS}}
- **Definición:** Texto de documentación entre comillas triples al comienzo de un módulo, clase o función de Python, que explica qué hace, qué recibe (Args), qué devuelve (Returns) y qué errores lanza (Raises). Python lo guarda con el código: `help()` y los editores lo muestran al usarlo.
- **Ejemplo:** La docstring de `embeddings()` avisa que devuelve un vector por texto en el mismo orden de entrada y que lanza `ErrorAPI` si el servicio responde con error.
- **Relacionados:** Modularización, Prueba unitaria

### Prueba unitaria
- **Plan:** {{c:PRUEBAS UNITARIAS SIMPLES}}
- **Definición:** Prueba automática que verifica una pieza de código de forma aislada y repetible; en un cliente de API comprueba que la solicitud va al endpoint y con el método correctos, que lleva la autenticación, que la respuesta se lee bien y que los errores se informan con su código. Se escribe con pytest y corre sin conexión, con la API simulada.
- **Ejemplo:** `test_embeddings_respeta_el_orden_de_entrada` entrega vectores desordenados por `index` y comprueba que `ClienteIA` los devuelve en el orden de los textos.
- **Relacionados:** API simulada, Docstring, Código de estado

### API simulada
- **Plan:** {{c:PRUEBAS UNITARIAS SIMPLES}}
- **Definición:** Sustituto de la API real que responde lo que la prueba define, sin internet, sin clave y sin costo, para que las pruebas den siempre el mismo resultado. Con httpx se arma con `httpx.MockTransport`; con requests, con `unittest.mock`.
- **Ejemplo:** Para probar la cuota agotada, la API simulada responde 429 y la prueba verifica que `ClienteIA` lanza `ErrorAPI` con ese código, sin reintentar.
- **Relacionados:** Prueba unitaria, httpx, Código de estado

## Contenido 3

### Prompt
- **Plan:** {{c:QUÉ ES UN PROMPT}}
- **Definición:** Entrada que recibe un modelo generativo para producir su respuesta; en un modelo de lenguaje es texto que dice qué tarea hacer y entrega los datos sobre los que hacerla. El modelo no lo ejecuta como un programa, sino que genera la continuación más probable: cada palabra influye y todo lo que debe saber tiene que estar escrito.
- **Ejemplo:** El prompt del asistente reúne las reglas, la pregunta frecuente elegida con su respuesta publicada y la consulta, porque el modelo no sabe nada más de Nube Sur.
- **Relacionados:** Mensaje de sistema, Zero-shot, Few-shot, Modelo de lenguaje

### Mensaje de sistema
- **Plan:** {{c:ESTRUCTURA BÁSICA DE ENTRADA}} {{c:PRÁCTICAS RECOMENDADAS}}
- **Definición:** Mensaje con rol `system` que abre la lista `messages` y fija el comportamiento general: el rol del asistente, sus reglas y el formato de salida. En la estructura básica de entrada le siguen los mensajes `user`, con la tarea y los datos de cada llamada, y los `assistant`, con respuestas previas o ejemplos.
- **Ejemplo:** «Eres el asistente de la mesa de ayuda de Nube Sur. Respondes en español, en tono cordial, solo con la respuesta publicada que se te entrega» es igual en todas las consultas; solo cambia el mensaje de usuario.
- **Relacionados:** Prompt, Restricción, Chat completions, Few-shot

### Zero-shot
- **Plan:** {{c:TIPOS DE PROMPTING}}
- **Definición:** Estrategia de prompting que pide la tarea solo con instrucciones, sin ejemplos resueltos. Es corta y barata en tokens, pero el modelo interpreta a su manera lo que no se dijo, como el largo, el tono o qué hacer en los casos especiales.
- **Ejemplo:** Con un prompt zero-shot, el asistente responde bien «¿funciona en safari?», pero ante una consulta que ninguna pregunta frecuente cubre a veces improvisa una respuesta en vez de derivar con «Te derivo con un ejecutivo».
- **Relacionados:** Few-shot, Instructional prompting, Iteración de prompts

### Few-shot
- **Plan:** {{c:TIPOS DE PROMPTING}}
- **Definición:** Estrategia de prompting que agrega a las instrucciones de dos a cinco ejemplos resueltos de entrada y salida, que en la API de chat se escriben como turnos previos `user` y `assistant`. Fija el formato y el trato de los casos difíciles, pero suma tokens en cada llamada, el modelo tiende a imitar los ejemplos y estos deben ser distintos de los casos con que se evalúa.
- **Ejemplo:** Los dos ejemplos del prompt del asistente muestran una consulta respondida con su pregunta frecuente y otra derivada con «Te derivo con un ejecutivo», y ninguno repite las preguntas de prueba.
- **Relacionados:** Zero-shot, Mensaje de sistema, Iteración de prompts

### Instructional prompting
- **Plan:** {{c:TIPOS DE PROMPTING}}
- **Definición:** Estrategia de prompting (prompting instruccional) que descompone la tarea en pasos numerados que el modelo debe seguir en orden. Sirve cuando la tarea tiene varias partes y se combina con zero-shot o few-shot.
- **Ejemplo:** Un prompt instruccional del asistente pide leer la consulta, decidir si la respuesta publicada la contesta, derivar si no la contesta y solo entonces devolver el JSON pedido.
- **Relacionados:** Zero-shot, Few-shot, Salida estructurada

### Restricción
- **Plan:** {{c:PRÁCTICAS RECOMENDADAS}}
- **Definición:** Instrucción del prompt que fija lo que el modelo no puede hacer o el límite que debe respetar: no inventar datos, no proponer soluciones, un largo máximo, un idioma o una única fuente de información. Es una de las prácticas recomendadas, junto con la claridad, la delimitación del rol, el contexto y evitar la ambigüedad (por ejemplo, pedir «una o dos oraciones» en vez de «breve»).
- **Ejemplo:** «Responde solo con la información de la respuesta publicada; si no alcanza, escribe exactamente: Te derivo con un ejecutivo.» es la restricción que reduce el riesgo de que el asistente invente el precio del plan anual; la prueba con esa consulta verifica que la cumpla.
- **Relacionados:** Mensaje de sistema, Alucinación, Prompt de validación

### Salida estructurada
- **Plan:** {{c:FORMATEO DE SALIDAS}}
- **Definición:** Respuesta del modelo con un formato definido de antemano (lista, JSON o tabla) para que la lea una persona o, sobre todo, otro programa; se pide indicando los campos, sus tipos y los valores permitidos. Se valida siempre, con `json.loads` dentro de un `try`, porque el modelo puede agregar texto o cortar la respuesta; algunos modelos aceptan además `response_format` para exigir JSON.
- **Ejemplo:** Para «Necesito pasar la lista de clientes a una planilla», el asistente devuelve `{"faq": "F3", "respuesta": "En Clientes, usa Exportar y elige el formato XLSX.", "derivar": false}`, y si el texto no es JSON válido el servidor lo registra y deriva.
- **Relacionados:** Parsing de respuesta, Instructional prompting, Max_tokens

### Prompt de validación
- **Plan:** {{c:EJEMPLOS PRÁCTICOS}}
- **Definición:** Prompt que revisa la salida de otro con una pregunta cerrada y fácil de procesar, por ejemplo si una respuesta contiene información que no está en su fuente. Es uno de los ejemplos prácticos de prompt, junto con los de generar código, resumen y reformulación.
- **Ejemplo:** Antes de mostrar una respuesta, el servidor de Nube Sur puede preguntar al modelo «¿Esta respuesta agrega algo que no esté en la respuesta publicada? Responde solo SI o NO».
- **Relacionados:** Alucinación, Restricción, Salida estructurada

### Temperature
- **Plan:** {{c:PROMPT Y PARÁMETROS}}
- **Definición:** Parámetro de generación que controla la variedad de la respuesta: con valores bajos (0 a 0,3) el modelo elige casi siempre los tokens más probables y la salida varía poco entre corridas (ni siquiera con 0 se garantiza que sea idéntica); con valores altos aumentan la variedad y el riesgo de inventar. En la API de OpenAI va de 0 a 2, y algunos modelos de razonamiento no permiten cambiarla.
- **Ejemplo:** El asistente usa temperature 0,2 porque debe repetir con fidelidad una respuesta publicada, no crear una nueva.
- **Relacionados:** Top_p, Max_tokens, Alucinación

### Max_tokens
- **Plan:** {{c:PROMPT Y PARÁMETROS}}
- **Definición:** Parámetro que fija el máximo de tokens de la respuesta: no hace que el modelo resuma, sino que corta la salida al llegar al límite, y entonces `choices[0].finish_reason` vale `length`. El largo se pide en el prompt y max_tokens queda como tope con margen que también acota el costo; algunos modelos recientes lo llaman `max_completion_tokens`.
- **Ejemplo:** Con un tope de 150 tokens, la respuesta del asistente, de una o dos oraciones en JSON, cabe con margen, y ninguna llamada puede gastar más de 150 tokens de salida.
- **Relacionados:** Token, Temperature, Salida estructurada

### Top_p
- **Plan:** {{c:PROMPT Y PARÁMETROS}}
- **Definición:** Parámetro que limita la elección de cada token a los más probables cuya probabilidad acumulada llega a ese valor (muestreo de núcleo): con 0,1 solo entran las opciones de arriba y con 1 entran todas. La documentación de OpenAI recomienda ajustar temperature o top_p, no los dos a la vez.
- **Ejemplo:** Como el asistente ya controla la variedad con temperature 0,2, deja top_p en 1, su valor por defecto.
- **Relacionados:** Temperature, Token

### Alucinación
- **Plan:** {{c:LIMITACIONES}}
- **Definición:** Respuesta que suena correcta pero contiene información falsa o que no estaba en la entrada; ocurre porque el modelo genera texto probable, no verificado. Se reduce con restricciones explícitas, temperature baja y validación posterior, pero no desaparece, así que lo generado se valida.
- **Ejemplo:** Si ante «¿cuánto cuesta el plan anual?» el asistente contesta con un precio, alucina: ninguna pregunta frecuente lo dice y debía derivar.
- **Relacionados:** Restricción, Prompt de validación, Temperature, Falta de control

### Falta de control
- **Plan:** {{c:LIMITACIONES}}
- **Definición:** Limitación por la que no hay garantía de que el modelo cumpla todas las instrucciones siempre: la misma entrada puede dar salidas distintas, un formato pedido puede no respetarse y una regla puede ignorarse en un caso raro. Por eso el código que usa la respuesta la valida y tiene un camino seguro si la validación falla.
- **Ejemplo:** Aunque el prompt pide solo JSON, a veces el asistente antepone una frase o no usa la frase exacta de derivación; por eso el servidor de Nube Sur valida la salida con `json.loads` y deriva si falla.
- **Relacionados:** Alucinación, Salida estructurada, Sensibilidad al wording

### Sensibilidad al wording
- **Plan:** {{c:LIMITACIONES}}
- **Definición:** Limitación por la que un cambio pequeño en la redacción del prompt o de la pregunta, aunque diga lo mismo, cambia la respuesta del modelo. Por eso un prompt se prueba con varios casos y con paráfrasis de ellos, y se congela cuando funciona.
- **Ejemplo:** «¿funciona en safari?» recibe la respuesta de F4, pero «¿puedo usarla desde Safari?» podría recibir una respuesta más larga o una derivación; por eso cada pregunta de prueba se repite con dos o tres paráfrasis.
- **Relacionados:** Alucinación, Falta de control, Iteración de prompts, Restricción

### Iteración de prompts
- **Plan:** {{c:ITERACIÓN Y AJUSTE DE PROMPTS}}
- **Definición:** Mejorar un prompt con evidencia: probar, observar, cambiar una sola cosa y volver a probar con los mismos casos. Cada versión se registra con qué se cambió, por qué y qué efecto tuvo en claridad, estructura o control del comportamiento del modelo.
- **Ejemplo:** En `prompts.md`, cada versión del prompt del asistente registra un solo cambio (por ejemplo, exigir la frase exacta de derivación), su motivo y el efecto observado en las mismas preguntas de prueba.
- **Relacionados:** Zero-shot, Few-shot, Ajuste inicial, Protocolo de evaluación

## Contenido 4

### Token
- **Plan:** {{c:CONCEPTOS BÁSICOS DE NLP}}
- **Definición:** Unidad en que se divide un texto para procesarlo: para spaCy o NLTK suele ser una palabra o un signo de puntuación, y para un modelo de lenguaje es una pieza de su vocabulario (una palabra, parte de una palabra o un signo), así que no siempre coincide con una palabra. En los modelos por API es también la unidad en que se miden los límites y se cobra el consumo.
- **Ejemplo:** Quitar el HTML y la firma del ticket T1 antes de enviarlo reduce los `prompt_tokens` que informa `usage` y, con ellos, el costo de la llamada.
- **Relacionados:** Tokenización, Max_tokens, N-grama, Parsing de respuesta

### Lema
- **Plan:** {{c:CONCEPTOS BÁSICOS DE NLP}} {{c:LEMATIZACIÓN Y STEMMING}}
- **Definición:** Forma de diccionario de una palabra, como «poder» para «pude» o «ticket» para «tickets». La lematización lleva cada palabra a su lema con el análisis gramatical de un modelo del idioma (`token.lemma_` en spaCy): da palabras reales, pero es más lenta que el stemming y el modelo pequeño a veces se equivoca.
- **Ejemplo:** Para contar los temas más frecuentes de las consultas del mes, Nube Sur lematiza, y así «facturas» y «factura» suman juntas y el informe muestra palabras reales.
- **Relacionados:** Stemming, Tokenización, Token

### Stopwords
- **Plan:** {{c:CONCEPTOS BÁSICOS DE NLP}}
- **Definición:** Palabras muy frecuentes y de poco contenido propio, como artículos, preposiciones y conjunciones («el», «de», «que», «y»), que se quitan cuando interesa el tema de un texto y no su redacción. Las listas en español, como la de NLTK, incluyen «no», que en un ticket puede ser justo el problema.
- **Ejemplo:** Sin stopwords, de «No puedo iniciar sesión en la app» quedan palabras con contenido como iniciar, sesión y app, pero se pierde la negación, que un resumen sí debe conservar.
- **Relacionados:** Token, CountVectorizer, Tokenización

### N-grama
- **Plan:** {{c:CONCEPTOS BÁSICOS DE NLP}}
- **Definición:** Secuencia de n tokens consecutivos: unigrama con uno, bigrama con dos, trigrama con tres. Captura expresiones que una palabra sola no dice, y lo usan tanto la vectorización (`ngram_range` en scikit-learn) como las métricas BLEU y ROUGE.
- **Ejemplo:** El bigrama «iniciar sesión» identifica el problema del ticket T1 mejor que «iniciar» o «sesión» por separado.
- **Relacionados:** Token, TF-IDF, BLEU

### Limpieza de texto
- **Plan:** {{c:TÉCNICAS DE LIMPIEZA}}
- **Definición:** Quitar del texto todo lo que no es el mensaje: etiquetas y entidades HTML, caracteres especiales repetidos y ruido como firmas, «Enviado desde mi teléfono» o enlaces, reemplazando los datos personales por marcas como `[correo]` o `[enlace]`. Se hace con `html.unescape` y expresiones regulares del módulo `re`, cuidando de no borrar lo que es parte del problema.
- **Ejemplo:** La función `limpiar` deja el ticket T1 sin etiquetas `<p>` ni la firma con el correo de Marta, pero conserva los caracteres rotos «CompaÃ±Ã­a» del ticket T2, porque son la falla que se reporta.
- **Relacionados:** Normalización de texto, Pipeline de preprocesamiento, Token

### Normalización de texto
- **Plan:** {{c:NORMALIZACIÓN DE MAYÚSCULAS}}
- **Definición:** Hacer que textos equivalentes se escriban igual: pasar a minúsculas, unificar espacios y saltos de línea y estandarizar caracteres, comillas, fechas o montos. Lo que va al modelo se deja natural, con mayúsculas y tildes; la normalización más agresiva, como quitar tildes, se aplica solo para comparar y medir.
- **Ejemplo:** Al medir, «Sesion» y «sesión» pasan a «sesion» con `lower()` y `quitar_tildes`, y cuentan como la misma palabra en ROUGE.
- **Relacionados:** Limpieza de texto, Tokenización, ROUGE

### Tokenización
- **Plan:** {{c:TOKENIZACIÓN Y NORMALIZACIÓN CON LIBRERÍAS}}
- **Definición:** Dividir un texto en tokens con las reglas del idioma, no solo por espacios, para separar bien signos como «¿» o una coma pegada a la palabra. spaCy lo hace con un modelo del español (`es_core_news_sm`) que además indica el lema de cada token y si es stopword o puntuación; NLTK ofrece `word_tokenize` y listas de stopwords, cuyos recursos se descargan la primera vez con `nltk.download`.
- **Ejemplo:** `tokenizar(limpio, sin_stopwords=True)`, de `preprocesar.py`, deja del ticket T1 limpio, entre otros, `iniciar`, `sesión`, `app`, `facturación` y `contraseña`, sin artículos ni puntuación; con `split()`, «contraseña» habría quedado con el punto pegado.
- **Relacionados:** Token, Lema, Stopwords, Normalización de texto

### Stemming
- **Plan:** {{c:LEMATIZACIÓN Y STEMMING}}
- **Definición:** Técnica que reduce una palabra a su raíz recortando sufijos con reglas fijas, sin analizarla, como hace `SnowballStemmer("spanish")` de NLTK. Es muy rápida y no necesita modelo, pero la raíz puede no ser una palabra.
- **Ejemplo:** «facturación» y «facturar» quedan en «factur», lo que sirve para buscar rápido en miles de tickets antiguos, pero no para mostrar en un informe.
- **Relacionados:** Lema, Tokenización

### CountVectorizer
- **Plan:** {{c:VECTORIZACIÓN BÁSICA}}
- **Definición:** Clase de scikit-learn que arma un vocabulario con las palabras de un conjunto de textos y representa cada texto como un vector con la cantidad de veces que aparece cada una (bolsa de palabras), sin distinguir una palabra rara de una que está en todos los textos. Su parámetro `stop_words` solo trae incorporada la lista en inglés, así que para español se le entrega una lista, por ejemplo la de NLTK.
- **Ejemplo:** Con CountVectorizer sobre las ocho preguntas frecuentes, «cómo», que aparece en la mitad de ellas, cuenta lo mismo que «contraseña», que solo está en F1 y es la palabra que la distingue.
- **Relacionados:** TF-IDF, Stopwords, Similitud coseno

### TF-IDF
- **Plan:** {{c:VECTORIZACIÓN BÁSICA}}
- **Definición:** Forma de vectorizar que pondera cada palabra por su frecuencia en el texto (TF) y por su rareza en el conjunto (IDF), de modo que pesan más las palabras que distinguen a un texto. En scikit-learn se usa `TfidfVectorizer`, que admite n-gramas con `ngram_range`.
- **Ejemplo:** La búsqueda base del asistente vectoriza con TF-IDF las ocho preguntas frecuentes y la consulta, y muestra su límite frente a los embeddings: «olvidé la clave y no puedo entrar» no comparte ninguna palabra con F1, así que su similitud con ella es 0.
- **Relacionados:** CountVectorizer, Similitud coseno, Embedding, N-grama

### Similitud coseno
- **Plan:** {{c:VECTORIZACIÓN BÁSICA}}
- **Definición:** Medida de cuánto se parecen dos vectores según el ángulo entre ellos: 1 es la misma dirección y 0, ninguna relación; con TF-IDF va de 0 a 1 y con embeddings puede ser negativa. Se calcula, por ejemplo, con `cosine_similarity` de scikit-learn, sobre vectores TF-IDF o embeddings.
- **Ejemplo:** El asistente elige la pregunta frecuente con mayor similitud coseno a la consulta y, si ese valor queda bajo su umbral de derivación, deriva sin llamar al modelo de generación, lo que ahorra tokens y evita inventar.
- **Relacionados:** Embedding, TF-IDF, Vector store, Ajuste inicial

### Pipeline de preprocesamiento
- **Plan:** {{c:ESTRUCTURA MODULAR DE UN PIPELINE}} {{c:FUNCIONES REUTILIZABLES}}
- **Definición:** Secuencia de etapas por la que pasa cada texto antes de llegar al modelo o a la medición (limpiar, normalizar, tokenizar, vectorizar), con estructura modular: cada etapa es una función reutilizable con una sola responsabilidad, que se prueba, se cambia y se reutiliza por separado.
- **Ejemplo:** `preprocesar.py` reúne `limpiar`, `quitar_tildes`, `tokenizar` y `ngramas`: `limpiar` se aplica a las preguntas frecuentes y a las consultas antes de pedir sus embeddings, y `quitar_tildes` y un mismo tokenizador se aplican a las respuestas generadas y a las de referencia antes de medir, para que se comparen igual.
- **Relacionados:** Pipeline, Limpieza de texto, Tokenización, Modularización

### ROUGE
- **Plan:** {{c:MÉTRICAS BÁSICAS DE CALIDAD}}
- **Definición:** Familia de métricas que mide cuánto de un texto de referencia aparece en el texto generado: ROUGE-1 compara palabras sueltas y ROUGE-L, la subsecuencia común más larga, que respeta el orden. Se suele reportar su F1, de 0 a 1, y mide coincidencia de palabras, no verdad.
- **Ejemplo:** Si ROUGE-L sale bajo en todas las respuestas en español, lo primero es revisar el tokenizador: el de `rouge-score` por defecto descarta las letras con tilde y la ñ, y por eso `evaluar.py` usa `TokenizadorES`.
- **Relacionados:** BLEU, Coherencia, Relevancia, Protocolo de evaluación

### BLEU
- **Plan:** {{c:MÉTRICAS BÁSICAS DE CALIDAD}}
- **Definición:** Métrica que mide cuánto del texto generado aparece en la referencia, contando coincidencias de n-gramas de hasta cuatro tokens, y penaliza los textos demasiado cortos; va de 0 a 1. En textos cortos se suaviza (en NLTK, con `SmoothingFunction`), porque sin suavizado da 0 con facilidad.
- **Ejemplo:** Si la respuesta a «Necesito pasar la lista de clientes a una planilla» no comparte ninguna secuencia de cuatro palabras con su referencia, BLEU sin suavizado da 0 aunque la respuesta sea correcta.
- **Relacionados:** ROUGE, N-grama, Protocolo de evaluación

### Coherencia
- **Plan:** {{c:MÉTRICAS BÁSICAS DE CALIDAD}}
- **Definición:** Métrica de calidad que valora una persona con una pauta (en este módulo, de 1 a 3) e indica si la respuesta se entiende por sí sola: vale 3 si es gramatical, ordenada y sin contradicciones.
- **Ejemplo:** Una respuesta que dice que el plan se cambia en Facturación → Plan y en la oración siguiente que no se puede cambiar recibe coherencia 1, aunque comparta muchas palabras con la respuesta publicada de F5.
- **Relacionados:** Relevancia, ROUGE, Protocolo de evaluación

### Relevancia
- **Plan:** {{c:MÉTRICAS BÁSICAS DE CALIDAD}}
- **Definición:** Métrica de calidad, valorada por una persona con una pauta de 1 a 3, que indica si la respuesta atiende exactamente lo pedido sin agregar nada que no esté en la fuente: en el resumidor vale 3 si nombra la falla y el producto del ticket, y en el asistente, si responde con la respuesta publicada que corresponde. Puede aproximarse con la similitud coseno entre la entrada y la respuesta, pero la valoración humana detecta lo que las métricas de coincidencia no ven.
- **Ejemplo:** Si a «quiero sumar a mi colega como usuario» el asistente responde cómo descargar facturas (F6), la respuesta puede ser clara y gramatical, pero su relevancia es 1.
- **Relacionados:** Coherencia, Similitud coseno, Alucinación

### Protocolo de evaluación
- **Plan:** {{c:REGISTRO DE RESULTADOS DE EVALUACIÓN}}
- **Definición:** Conjunto de reglas fijas con que se evalúa para que los resultados sean comparables: qué casos se usan, contra qué referencias, con qué tokenizador y métricas, qué pauta aplican las personas, qué umbral marca un caso para revisar y cómo se registra cada prueba. El registro lleva una fila por caso y configuración en un CSV, incluidas las pruebas que salen mal.
- **Ejemplo:** El `resultados.csv` del asistente tiene una fila por pregunta de prueba y versión de prompt, con la pregunta frecuente elegida, ROUGE-L, BLEU, coherencia, relevancia y un comentario, y los tokens de cada llamada van aparte en `consumo.csv`.
- **Relacionados:** ROUGE, BLEU, Ajuste inicial, Iteración de prompts

### Ajuste inicial
- **Plan:** {{c:IDENTIFICACIÓN DE AJUSTES INICIALES}}
- **Definición:** Primer cambio concreto al prompt, a la limpieza, a los parámetros o a un umbral, decidido a partir de las métricas registradas: se comparan los promedios por configuración, se revisan los peores casos y se cambia una cosa a la vez, midiendo de nuevo con el mismo protocolo.
- **Ejemplo:** Si el registro muestra que con temperature 0,9 baja la relevancia y que la consulta por el precio del plan anual recibe una cifra inventada, el primer ajuste es bajar a 0,2 y volver a medir con el mismo protocolo; si esa consulta sigue recibiendo una cifra, el siguiente es reforzar la restricción de derivar, y se mide otra vez.
- **Relacionados:** Protocolo de evaluación, Iteración de prompts, Similitud coseno
