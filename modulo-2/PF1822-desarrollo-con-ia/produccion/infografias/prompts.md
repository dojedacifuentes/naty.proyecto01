# PF1822 · Infografías del módulo 2 — prompts

> Herramientas sugeridas: Genially o Canva (el equipo ya usa Genially), Napkin o Gamma. Si usas un
> generador de imágenes (ChatGPT, Gemini, Ideogram), pídele solo el diseño con espacios para
> el texto y escribe el texto encima: estos generadores suelen deformar las letras.
> Formato: vertical 1080 × 1920 px, exportada en PNG y, si la herramienta lo permite, interactiva.

## Infografía de la ruta del módulo (C3 · motivación)

```text
Diseña una infografía vertical titulada "Ruta del módulo 2: INTRODUCCIÓN A MODELOS GENERATIVOS Y CONSUMO POR API". Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.
Contenido (textual, en este orden):
**Formato:** imagen vertical (1080 × 1920 px), descargable en PDF, con esta versión en texto
para lectores de pantalla. Un ícono por estación, repetido en los títulos del LMS.

**Encabezado**
> MÓDULO 2 · INTRODUCCIÓN A MODELOS GENERATIVOS Y CONSUMO POR API · 21 h
> *Tu misión: construir el resumidor de tickets de Nube Sur.*

**Bloque "Al terminar serás capaz de"** (competencia del módulo, textual):
> IMPLEMENTAR LA ARQUITECTURA BÁSICA DE UNA APLICACIÓN QUE INTEGRE MODELOS DE IA MEDIANTE
> APIS Y PREPROCESAMIENTO DE TEXTO PARA CONSUMO POR MODELOS DE LENGUAJE, GARANTIZANDO EL
> CONSUMO EFICIENTE Y LA EVALUACIÓN DE RESULTADOS EN UN ENTORNO DE DESARROLLO DE SOFTWARE

**Bloque "Tu ruta"**

| Estación | Ícono | Título | Qué haces | Qué te llevas | Horas |
| --- | --- | --- | --- | --- | --- |
| 1 | Plano con cajas conectadas | Entender y diseñar | Conoces los tipos de modelos y dibujas la arquitectura del resumidor | Cuadro de modelos + diagrama | 4 h |
| 2 | Llave y flecha hacia una nube | Conectar | Programas `ClienteIA`: GET, POST, embeddings, pruebas | Módulo Python con pruebas en verde | 6 h |
| 3 | Globo de diálogo con ejemplos | Pedir bien | Prompts zero-shot y few-shot, y el efecto de temperature | Registro de iteraciones | 5 h |
| 4 | Embudo y gráfico de barras | Limpiar y medir | Pipeline de limpieza y métricas ROUGE y BLEU | Tabla de resultados + recomendación | 6 h |

**Bloque "Cómo te acompañamos"**
- 4 sesiones en vivo de 1,5 h, una por estación. `PENDIENTE:` días y horarios por institución.
- Revisión de tu código en máximo 2 días hábiles.
- Foro de dudas por estación, respondido por el tutor.

**Bloque "Cómo te evaluamos"**
- Rúbrica de tu solución en las actividades 1 y 2 (35 %).
- Proyecto "Asistente de preguntas frecuentes" al cierre (45 %).
- Prueba de conceptos y lectura de código (20 %).
- Tu portafolio y tu repositorio quedan publicados para mostrar a un empleador.

**Pie**
> Herramientas del módulo: Python · httpx · pytest · spaCy · NLTK · rouge-score · Git y GitHub · API de OpenAI y Hugging Face.
> Regla de oro: tu clave nunca va en el código.
> Empieza aquí → autodiagnóstico + notebook guiado.
```

## Infografía AE1 · Modelos generativos y su ecosistema (herramienta didáctica · C4)

```text
Diseña una infografía vertical titulada "Modelos generativos y su ecosistema". Subtítulo: "Aprendizaje esperado 1 del módulo 2". Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.
Caso que ilustra los ejemplos: Nube Sur, una empresa ficticia.
Secciones (un ícono por sección, texto breve):
1. IA generativa frente a IA tradicional: La IA tradicional basada en reglas decide con condiciones escritas por personas; la generativa produce contenido nuevo (texto, código, imágenes) aprendido de datos.
2. Tipos por lo que generan: Texto, imagen, audio y video.
3. Familias técnicas: Autorregresivos: generan token a token (texto y código). De difusión: parten de ruido y lo refinan (imágenes, audio).
4. Casos de uso: Generación de texto y de código, síntesis de imágenes, preguntas y respuestas, resúmenes, generación de pruebas.
5. Arquitecturas: Solicitud–respuesta (una llamada, una respuesta) y pipelines (varias etapas encadenadas: limpiar, luego generar, luego evaluar, luego guardar).
6. Componentes: Cliente, servidor API, módulo de preprocesamiento, modelo de IA, base de datos o vector store. Flujo de datos de extremo a extremo con el ticket de ejemplo.
7. Tecnologías y bibliotecas: API de OpenAI, Hugging Face Transformers, TensorFlow, PyTorch, LangChain, Diffusers: qué resuelve cada una y en qué módulo del plan se vuelve a ver.
8. Elegir una arquitectura: Criterios: escalabilidad (¿aguanta 10 veces más tickets?), seguridad (¿dónde están la clave y los datos personales?), costo (tokens por ticket) y mantenimiento (¿se puede cambiar de modelo sin reescribir todo?).
```

Aprendizaje esperado (textual del plan, para la ficha del recurso en el LMS): ANALIZAR EL ROL DE LOS MODELOS GENERATIVOS EN EL DESARROLLO DE APLICACIONES, DESCRIBIENDO SUS TIPOS, CASOS DE USO, TECNOLOGÍAS ASOCIADAS Y REPRESENTANDO ARQUITECTURAS FUNCIONALES QUE INTEGREN ESTOS MODELOS MEDIANTE APIS.

## Infografía AE2 · Consumir modelos por API (herramienta didáctica · C4)

```text
Diseña una infografía vertical titulada "Consumir modelos por API". Subtítulo: "Aprendizaje esperado 2 del módulo 2". Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.
Caso que ilustra los ejemplos: Nube Sur, una empresa ficticia.
Secciones (un ícono por sección, texto breve):
1. REST en dos métodos: GET para leer (listar modelos); POST para enviar datos y pedir un resultado (generar, obtener embeddings).
2. Leer la documentación oficial: Cómo están organizados los manuales de OpenAI y de Hugging Face: referencia de la API, guías, ejemplos. En cada endpoint buscar URL, autenticación, cuerpo y respuesta.
3. Endpoints de generación y de embeddings: Generación: messages con roles, luego texto en choices y consumo en usage. Embeddings: input, luego un vector por texto en data.
4. Autenticación y variables de entorno: Encabezado Authorization: Bearer <clave>; la clave vive en una variable de entorno o en los Secrets del entorno, nunca en el código ni en el repositorio.
5. requests y httpx: Las dos bibliotecas hacen lo mismo en lo básico; httpx suma tiempos de espera claros y una forma sencilla de simular la API en pruebas.
6. Cuerpos JSON y lectura de la respuesta: Armar el diccionario, enviarlo con json=, leer respuesta.json(). Siempre mirar primero status_code.
7. Errores del servicio: 401 clave inválida, 429 demasiadas solicitudes (esperar y reintentar), 5xx falla del proveedor. Un mensaje claro vale más que un programa que se cae.
8. Modularizar, documentar y probar: Una clase que encapsula las llamadas, con docstrings, y pruebas unitarias que simulan la API para correr sin conexión ni costo.
```

Aprendizaje esperado (textual del plan, para la ficha del recurso en el LMS): UTILIZAR UN MODELO DE IA A TRAVÉS DE API REST UTILIZANDO SOLICITUDES HTTP Y AUTENTICACIÓN, BASÁNDOSE EN LA DOCUMENTACIÓN OFICIAL DE OPENAI Y HUGGING FACE.

## Infografía AE3 · Diseño de prompts (herramienta didáctica · C4)

```text
Diseña una infografía vertical titulada "Diseño de prompts". Subtítulo: "Aprendizaje esperado 3 del módulo 2". Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.
Caso que ilustra los ejemplos: Nube Sur, una empresa ficticia.
Secciones (un ícono por sección, texto breve):
1. Qué es un prompt: La entrada que le dice al modelo qué hacer. Estructura: mensaje de sistema (rol y reglas) y mensaje de usuario (la tarea y los datos).
2. Tipos de prompting: Zero-shot: solo instrucciones. Few-shot: instrucciones más ejemplos de entrada y salida. Instruccional: pasos explícitos a seguir.
3. Buenas prácticas: Claridad, rol definido, contexto suficiente, restricciones explícitas, evitar ambigüedad.
4. Formato de salida: Pedir listas, JSON o tablas cuando otro programa va a leer la respuesta.
5. Ejemplos prácticos: Un prompt para generar código, uno para resumir, uno para validar y uno para reformular, con su salida.
6. Parámetros: temperature (variedad), max_tokens (largo máximo), top_p (acota las opciones). Para resúmenes, temperature baja.
7. Limitaciones: Alucinaciones, falta de control, sensibilidad a la redacción: un cambio pequeño de palabras cambia la respuesta.
8. Iterar: Cambiar una cosa a la vez, anotar qué cambió y qué efecto tuvo, y decidir con los resultados.
```

Aprendizaje esperado (textual del plan, para la ficha del recurso en el LMS): FORMULAR PROMPTS EFECTIVOS PARA MODELOS GENERATIVOS EN ESCENARIOS ZERO-SHOT O FEW-SHOT, CONSIDERANDO LA TAREA SOLICITADA Y LOS PARÁMETROS DE GENERACIÓN DISPONIBLES.

## Infografía AE4 · Preparar y medir texto (herramienta didáctica · C4)

```text
Diseña una infografía vertical titulada "Preparar y medir texto". Subtítulo: "Aprendizaje esperado 4 del módulo 2". Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.
Caso que ilustra los ejemplos: Nube Sur, una empresa ficticia.
Secciones (un ícono por sección, texto breve):
1. Conceptos básicos de NLP: Token (unidad que procesa el modelo), palabra, lema (forma de diccionario), stopwords (palabras frecuentes con poco contenido), n-gramas (secuencias de n tokens).
2. Limpieza: Quitar HTML, caracteres especiales, firmas y ruido; reemplazar correos y enlaces por marcas. Cuidado con no borrar el problema que reporta el ticket.
3. Normalización: Mayúsculas y minúsculas, espacios, estandarización de texto; tildes solo para comparar al medir.
4. Tokenizar, lematizar, stemming: spaCy (es_core_news_sm) y NLTK. Lematizar: "corriendo", luego "correr"; stemming: recorta la raíz.
5. Vectorización básica: CountVectorizer y TF-IDF de scikit-learn: representar textos como números para compararlos.
6. Un pipeline modular: Funciones reutilizables por etapa (limpiar, tokenizar, ngramas, medir) que se encadenan y se prueban por separado.
7. Métricas de calidad: ROUGE (cuánto de la referencia aparece en el resumen), BLEU (cuánto del resumen aparece en la referencia, con penalización por largo), coherencia y relevancia con pauta humana.
8. Registrar y ajustar: Una fila por prueba en un CSV; identificar ajustes a partir de los números.
```

Aprendizaje esperado (textual del plan, para la ficha del recurso en el LMS): IMPLEMENTAR UN PIPELINE DE PREPROCESAMIENTO Y EVALUACIÓN BÁSICA DE TEXTO EN PYTHON, APLICANDO TÉCNICAS DE LIMPIEZA, NORMALIZACIÓN Y MÉTRICAS INICIALES DE CALIDAD, DE ACUERDO CON LOS REQUISITOS DE ENTRADA Y SALIDA DEL MODELO.
