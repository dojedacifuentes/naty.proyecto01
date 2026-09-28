# PF1822 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** el de la contraparte: 3 quiz por curso, hechos en Canva.
**Reparto:** por estación de la ruta. Quiz 1: AE1 y AE2 · Quiz 2: AE3 (el aprendizaje
seleccionado) · Quiz 3: AE4. Cinco preguntas cada uno, con una sola respuesta correcta y
retroalimentación.
**Son formativos:** no llevan nota y **no repiten** las preguntas de la prueba objetiva
(instrumento 3) ni las del video interactivo, para no adelantar la evaluación.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.
**Versión juego** (HTML y SCORM para el LMS, `npm run quiz-juego`): las mismas preguntas como una
misión de 5 niveles con XP, combos, energía, comodín 50:50, estrellas, logros e insignia. Usa la misión del curso y, de cada quiz, su
insignia y su siguiente parada en la ruta.
**Misión:** construir el resumidor de tickets de Nube Sur.

---

## Quiz 1 · Modelos y consumo por API (AE1 y AE2)

**Cuándo:** al cerrar la estación 2, después de la parte B de la actividad 1.
**Insignia:** Conector/a de APIs · **Siguiente parada:** estación 3, Pedir bien.

1. *(AE1)* ¿Qué diferencia a la IA generativa de un sistema basado en reglas?
   - a) Solo responde con reglas escritas a mano por un programador
   - b) No necesita datos para funcionar
   - **c) Produce contenido nuevo a partir de patrones aprendidos de datos**
   - d) Siempre da exactamente la misma respuesta
   *Retroalimentación:* "Un sistema de reglas hace solo lo que alguien programó. Un modelo generativo aprendió patrones de muchos datos y con ellos produce texto, imágenes o código nuevos."
2. *(AE1)* ¿Cuál de estas tareas de la mesa de ayuda de Nube Sur es un caso de uso de la IA generativa de texto?
   - a) Calcular el IVA de una factura
   - **b) Resumir un ticket largo en una oración**
   - c) Ordenar los tickets por fecha
   - d) Respaldar la base de datos
   *Retroalimentación:* "Resumir es uno de los casos de uso típicos, como generar texto o código y responder preguntas. Las otras tareas se resuelven mejor con reglas o consultas fijas."
3. *(AE1)* En la arquitectura del resumidor, ¿qué componente limpia y prepara el texto antes de enviarlo al modelo?
   - a) El vector store
   - b) El cliente
   - c) El modelo de IA
   - **d) El módulo de preprocesamiento**
   *Retroalimentación:* "El preprocesamiento quita HTML, firmas y datos personales antes de llamar al modelo: la entrada queda más limpia y más segura."
4. *(AE2)* ¿Qué método HTTP se usa normalmente para enviar un prompt a la API de un modelo y recibir la respuesta?
   - **a) POST**
   - b) GET
   - c) DELETE
   - d) HEAD
   *Retroalimentación:* "El prompt y los parámetros van en el cuerpo de la solicitud, y eso se hace con POST. GET se usa para consultar recursos, como la lista de modelos."
5. *(AE2)* La API responde con el código de estado 401. ¿Qué es lo más probable?
   - a) Se superó el límite de solicitudes
   - b) El servidor tuvo un error interno
   - **c) La clave de la API falta o no es válida**
   - d) La solicitud salió bien
   *Retroalimentación:* "401 significa que no hay autenticación válida. Si fuera un exceso de solicitudes sería 429, y un error del servidor, 500. Éxito es 200."

---

## Quiz 2 · Diseño de prompts (AE3)

**Cuándo:** al cerrar la estación 3, después del notebook guiado y del video interactivo.
**Insignia:** Diseñador/a de prompts · **Siguiente parada:** estación 4, Limpiar y medir.

1. *(AE3)* Un prompt zero-shot es:
   - a) Un prompt que siempre usa temperatura 0
   - **b) Una instrucción sin ejemplos resueltos**
   - c) Un prompt vacío
   - d) Un prompt que el modelo no puede responder
   *Retroalimentación:* "Zero-shot: le das la tarea sin ejemplos. Si agregas ejemplos resueltos de entrada y salida, pasa a ser few-shot."
2. *(AE3)* En un prompt para el resumidor, ¿cuál de estas frases es una **restricción**?
   - a) "Eres un analista de soporte."
   - b) "Este ticket viene de la app de facturación."
   - c) "Hola, ¿cómo estás?"
   - **d) "Responde en una sola oración de máximo 25 palabras."**
   *Retroalimentación:* "'Eres un analista de soporte' es el rol y 'Este ticket viene de la app de facturación' es el contexto. La restricción limita la respuesta: largo, formato o lo que no debe hacer."
3. *(AE3)* ¿Qué efecto tiene subir la temperatura de 0,2 a 0,9?
   - **a) Respuestas más variadas y menos predecibles**
   - b) Respuestas siempre más cortas
   - c) Respuestas más exactas
   - d) El modelo deja de responder
   *Retroalimentación:* "Con más temperatura, el modelo elige palabras menos probables: gana variedad y pierde consistencia. Para resúmenes técnicos conviene una temperatura baja."
4. *(AE3)* Además del rol, el contexto y las restricciones, un buen prompt para el resumidor incluye:
   - a) Emojis para que suene amable
   - b) La clave de la API
   - **c) El formato de salida esperado**
   - d) El historial del navegador
   *Retroalimentación:* "Decir el formato, como una oración que empiece con 'El usuario…', hace que las respuestas sean comparables y fáciles de usar."
5. *(AE3)* Al iterar un prompt, la buena práctica es:
   - a) Cambiar todo en cada versión
   - **b) Cambiar una cosa a la vez y anotar qué efecto tuvo**
   - c) Borrar las versiones anteriores
   - d) Probar solo con un ticket
   *Retroalimentación:* "Si cambias varias cosas juntas no sabes cuál produjo la mejora. El registro de iteraciones es la evidencia para decidir."

---

## Quiz 3 · Preparar y medir texto (AE4)

**Cuándo:** al cerrar la estación 4, antes de publicar tu resultado en el tablero del laboratorio.
**Insignia:** Evaluador/a de resúmenes · **Siguiente parada:** publicar tu resultado en el tablero del laboratorio.

1. *(AE4)* ¿Qué hace esta línea de Python? `re.sub(r"<[^>]+>", " ", texto)`
   - a) Borra los correos electrónicos
   - b) Pasa el texto a minúsculas
   - c) Cuenta las palabras del texto
   - **d) Reemplaza las etiquetas HTML por espacios**
   *Retroalimentación:* "La expresión regular busca todo lo que va entre < y >, es decir, las etiquetas HTML, y lo reemplaza por un espacio."
2. *(AE4)* Tokenizar un texto es:
   - **a) Dividirlo en unidades, como palabras, partes de palabras o signos**
   - b) Traducirlo a otro idioma
   - c) Cifrarlo para protegerlo
   - d) Resumirlo en una oración
   *Retroalimentación:* "Los tokens son las unidades con que se procesa y se mide un texto. También con ellos se cuenta el costo de usar un modelo."
3. *(AE4)* BLEU compara un texto generado con uno de referencia según:
   - a) La corrección gramatical del texto
   - b) El tiempo que tardó el modelo en responder
   - **c) Cuántos n-gramas del texto generado aparecen también en la referencia**
   - d) La cantidad de oraciones
   *Retroalimentación:* "BLEU mide coincidencia de n-gramas, con énfasis en la precisión, y penaliza los textos demasiado cortos."
4. *(AE4)* ROUGE-L se basa en:
   - a) El largo total del resumen
   - **b) La subsecuencia común más larga entre el resumen y la referencia**
   - c) La cantidad de tokens del prompt
   - d) El número de párrafos
   *Retroalimentación:* "ROUGE-L busca la secuencia de palabras en común más larga, aunque no estén seguidas: premia que el resumen conserve el orden de las ideas."
5. *(AE4)* ¿Por qué no basta con ROUGE y BLEU para elegir la mejor configuración del resumidor?
   - a) Porque son muy lentas de calcular
   - b) Porque solo funcionan en inglés
   - c) Porque siempre dan el mismo valor
   - **d) Porque miden coincidencia de palabras, no si el resumen es coherente y relevante**
   *Retroalimentación:* "Un resumen puede usar otras palabras y ser muy bueno. Por eso en el laboratorio también valoras coherencia y relevancia de 1 a 3."
