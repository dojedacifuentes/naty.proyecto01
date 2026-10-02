# PF1822 · Módulo 2 · Evaluación y cierre del módulo

**Estado:** borrador · **Va en:** LMS · **Pedido:** usuario, 2026-09-30
Fuente de los seis documentos de evaluación y cierre del módulo 2 de PF1822 (el glosario integrador tiene su propio archivo).
Cada sección "## NN · Título" es un PDF; el plan se cita con marcas entre llaves dobles que el generador reemplaza por el texto de la ficha.
`npm run evaluacion` revisa esta fuente y genera los PDF; esta cabecera no sale en ellos.

---

## Ítems de la evaluación diagnóstica

Doce ítems, tres por contenido del plan y uno por criterio de evaluación. Las respuestas correctas quedan repartidas: tres en a), tres en b), tres en c) y tres en d).

### D1
- **Contenido:** {{c:TIPOS DE MODELOS}}
- **Criterio:** 1.1
- **Pregunta:** Nube Sur usa dos modelos: uno escribe el resumen de cada ticket y otro convierte cada ticket en un vector para encontrar tickets parecidos. ¿Cómo se clasifican?
- [ ] Los dos son modelos de difusión, porque transforman el texto de entrada en una salida nueva
- [ ] El primero es de difusión, porque mejora el resumen en varios pasos; el segundo es autorregresivo, porque arma el vector un número a la vez
- [ ] Los dos son autorregresivos: todo modelo basado en transformers genera texto token a token
- [x] El primero, un transformer autorregresivo; el segundo, un transformer codificador que produce embeddings
- **Por qué:** "Autorregresivo" describe cómo se genera (un token a la vez) y "transformer", la arquitectura: el modelo que resume es un transformer autorregresivo y el de embeddings, en general un transformer codificador, que no genera texto libre. La a) y la b) confunden la difusión (refinar ruido en muchos pasos, propia de imagen y audio) con "transformar" o "mejorar" un texto; la c) supone que todo transformer genera texto.

### D2
- **Contenido:** {{c:COMPONENTES}}
- **Criterio:** 1.2
- **Pregunta:** Una agente de Nube Sur abre un ticket y quiere ver los tickets de la semana sobre el mismo problema, aunque estén escritos con otras palabras. ¿Qué componente de la arquitectura hace posible esa búsqueda?
- [ ] El modelo de IA, que recuerda los tickets que resumió antes
- [ ] El cliente, que guarda en el navegador los tickets abiertos en el día
- [x] El vector store, que guarda los embeddings de los tickets y devuelve los más cercanos
- [ ] El módulo de preprocesamiento, que compara las palabras del ticket nuevo con las de los anteriores
- **Por qué:** El vector store guarda un embedding por ticket y permite buscar los más cercanos por significado. La a) revela la idea de que el modelo tiene memoria entre solicitudes (cada llamada por API es independiente); la b) confunde mostrar con almacenar; la d) confunde limpiar con buscar, y comparar palabras no encuentra tickets redactados de otra forma.

### D3
- **Contenido:** {{c:ARQUITECTURAS}}
- **Criterio:** 1.3
- **Pregunta:** Tras una caída del servicio llegan cientos de tickets casi al mismo tiempo. El servidor llama al modelo en el momento en que llega cada uno (solicitud–respuesta) y el proveedor empieza a responder con el código 429. ¿Qué cambio resuelve mejor este problema de escalabilidad?
- [ ] Que cada agente llame al modelo desde su navegador con su propia clave, para repartir el límite
- [x] Encolar los tickets en el servidor y procesarlos por lotes, al ritmo que permite el proveedor
- [ ] Reintentar de inmediato cada solicitud rechazada hasta que el proveedor la acepte, para no perder ningún ticket
- [ ] Cambiar a un modelo más grande del mismo proveedor, porque procesa más texto en cada llamada
- **Por qué:** Una cola con un pipeline por lotes absorbe el pico y controla el ritmo y el gasto sin cambiar la aplicación de la mesa de ayuda. La a) ni siquiera resuelve el 429 (los límites se aplican a la cuenta, la organización o el proyecto, no a cada clave) y además deja las claves en los navegadores, donde cualquiera puede leerlas; la c) agrava el 429 (hay que esperar cada vez más entre intentos); la d) no cambia el límite de solicitudes, que en los modelos más grandes suele ser igual o menor.

### D4
- **Contenido:** {{c:ENDPOINTS}}
- **Criterio:** 2.1
- **Pregunta:** Enviaste tres textos en el campo `input` del endpoint de embeddings de OpenAI. Según la documentación oficial, ¿dónde viene el vector del segundo texto?
- [x] En el elemento de `data` cuyo `index` es 1, en su campo `embedding`
- [ ] En `choices[1].message.content`, igual que en el endpoint de chat
- [ ] En `usage.total_tokens`, que resume el vector en un solo número
- [ ] En `data[0].embedding[1]`: `data` trae un solo objeto y su `embedding` guarda los tres vectores
- **Por qué:** La respuesta de embeddings trae en `data` un objeto por texto, con su `index` (que parte en 0) y su `embedding`; conviene ordenar por `index` en vez de suponer el orden. La b) confunde la respuesta de embeddings con la de generación; la c) confunde el consumo (`usage`) con el resultado; la d) supone un solo objeto con todos los vectores, cuando la respuesta trae un objeto por texto.

### D5
- **Contenido:** {{c:GESTIÓN DE AUTENTICACIÓN}}
- **Criterio:** 2.2
- **Pregunta:** Al arrancar, el servidor de Nube Sur comprueba que su clave funciona pidiendo la lista de modelos disponibles. ¿Qué solicitud es la adecuada?
- [ ] Un POST a `/v1/models` con la clave en el cuerpo JSON, porque toda llamada a un modelo es POST
- [ ] Un GET a `/v1/models` con la clave como parámetro de la URL (`?api_key`), para no tener que armar encabezados
- [ ] Un GET a `/v1/models` con la clave escrita en una constante del código, porque el repositorio es privado
- [x] Un GET a `/v1/models` con la clave leída de una variable de entorno, en el encabezado `Authorization: Bearer`
- **Por qué:** Listar modelos es leer un recurso (GET); la clave va en el encabezado `Authorization`, precedida de `Bearer`, y se lee de una variable de entorno. La a) confunde los métodos (POST envía datos para obtener un resultado); la b) deja la clave en la URL, que queda en registros e historiales; la c) versiona la clave, y un repositorio privado se comparte, se clona o se publica, y la clave sigue en el historial.

### D6
- **Contenido:** {{c:MODULARIZACIÓN}}
- **Criterio:** 2.3
- **Pregunta:** Nube Sur llama al mismo modelo para resumir tickets (`temperature` 0,2 y 60 tokens) y para redactar borradores de respuesta (`temperature` 0,7 y 300 tokens). ¿Qué diseño es más fácil de mantener y de probar?
- [ ] Copiar la función en dos archivos, uno por tarea, cada uno con su URL, su clave y su manejo de errores
- [ ] Una sola función con `temperature` y `max_tokens` fijos, que se editan a mano antes de cada uso
- [x] Una clase con un método `generar(mensajes, temperature, max_tokens)` que concentra URL, clave y errores
- [ ] Escribir la solicitud HTTP completa en cada lugar del código donde haga falta, para que cada tarea se lea sola, sin saltar a otro archivo
- **Por qué:** Encapsular la API en una clase con parámetros permite reutilizarla con distintos valores, documentarla con docstrings y probarla una sola vez con la API simulada; si cambia el proveedor, se cambia un archivo. La a) y la d) duplican la autenticación y los errores, y cualquier cambio obliga a tocar varios lugares; la b) confunde reutilizar con editar el código.

### D7
- **Contenido:** {{c:TIPOS DE PROMPTING}}
- **Criterio:** 3.1
- **Pregunta:** El resumidor de Nube Sur funciona bien con los tickets que reportan fallas, pero los mensajes que solo agradecen ("¡Gracias, ya funciona!") los resume como si fueran fallas nuevas. ¿Qué cambio ayuda más?
- [ ] Subir `temperature`, para que el modelo se adapte mejor a cada tipo de ticket y no repita siempre el mismo resumen
- [x] Agregar dos ejemplos resueltos (few-shot), uno de ellos un agradecimiento con su resumen esperado
- [ ] Quitar el mensaje de sistema, para que el modelo no se confunda con tantas instrucciones
- [ ] Agregar al final del prompt "esfuérzate y piensa bien antes de resumir", para que ponga más atención
- **Por qué:** Few-shot muestra con ejemplos lo que cuesta describir, como el trato de un caso especial; su costo son más tokens en cada llamada y el riesgo de que el modelo imite los ejemplos de más. La a) aumenta la variedad, no la comprensión; la c) cree que menos instrucciones es mejor; la d) es una instrucción vaga que no dice qué hacer con el caso.

### D8
- **Contenido:** {{c:FORMATEO DE SALIDAS}}
- **Criterio:** 3.2
- **Pregunta:** Un programa lee la salida del resumidor para mostrarla en el tablero de la mesa de ayuda. ¿Qué mensaje de sistema es el más adecuado?
- [x] "Eres analista de soporte. Devuelve solo JSON con `resumen` (máximo 25 palabras) y `prioridad` (alta, media o baja)."
- [ ] "Resume el ticket de forma breve y clara para el tablero, y di al final qué tan urgente te parece."
- [ ] "Eres el mejor analista del mundo. Resume el ticket con todo el detalle posible, explica tu razonamiento paso a paso y ordénalo en párrafos."
- [ ] "Resume el ticket en formato JSON para que el tablero pueda leerlo, con los campos que te parezcan útiles."
- **Por qué:** Si otro programa lee la respuesta, el prompt fija el formato, los campos y los valores permitidos, además del rol y las restricciones. La b) es ambigua ("breve", "urgente") y deja el formato libre; la c) pide texto largo con razonamiento, que un programa no puede leer; la d) pide JSON sin decir con qué campos ni con qué valores, así que cada respuesta puede traer una estructura distinta.

### D9
- **Contenido:** {{c:PROMPT Y PARÁMETROS}}
- **Criterio:** 3.3
- **Pregunta:** Algunos resúmenes salen cortados a la mitad y la respuesta de la API trae `"finish_reason": "length"`. ¿Qué ajuste corresponde en la siguiente iteración?
- [ ] Bajar `temperature` a 0, para que el modelo elija palabras más cortas y termine antes
- [ ] Bajar todavía más `max_tokens` y agregar "sé breve", para forzar un resumen corto
- [ ] Ajustar `top_p` y `temperature` a la vez, para controlar mejor el largo
- [x] Subir `max_tokens` con margen y pedir el largo en el prompt: "máximo 25 palabras"
- **Por qué:** `finish_reason` igual a `length` indica que la respuesta llegó al tope de `max_tokens` y se cortó; el largo se controla en el prompt y `max_tokens` es un tope de seguridad con margen. La a) confunde variedad con largo; la b) repite la causa del problema; la c) mueve dos parámetros de variedad que no controlan el largo y que conviene no ajustar juntos.

### D10
- **Contenido:** {{c:CONCEPTOS BÁSICOS DE NLP}}
- **Criterio:** 4.1
- **Pregunta:** En el ticket "No puedo descargar las facturas", ¿cuál de estas afirmaciones es correcta?
- [x] El lema de "facturas" es "factura", y "descargar las" es un bigrama
- [ ] El lema de "puedo" es "pued", y "no puedo descargar" es un bigrama
- [ ] "facturas" es una stopword, porque aparece en muchos tickets de Nube Sur
- [ ] La frase tiene cuatro tokens, porque las stopwords no se cuentan como tokens
- **Por qué:** El lema es la forma de diccionario y un bigrama son dos tokens seguidos. La b) confunde el lema ("poder") con la raíz del stemming y cuenta mal el n-grama (tres tokens forman un trigrama); la c) confunde las stopwords, palabras funcionales como "las", con una palabra frecuente del tema; la d) confunde tokenizar con quitar stopwords: la frase tiene cinco tokens. Conviene comentar que "no" está en las listas de stopwords en español de spaCy y NLTK: quitar esa palabra invierte el sentido de este ticket.

### D11
- **Contenido:** {{c:TÉCNICAS DE LIMPIEZA}}
- **Criterio:** 4.2
- **Pregunta:** Un ticket llega así: `<p>Hola!!! Desde ayer el módulo de inventario da "error 500" al guardar un producto.</p><p>Saludos, Rosa Díaz · rosa.diaz@ferreteria.test</p>`. ¿Qué limpieza conviene antes de enviarlo al modelo?
- [ ] Ninguna: el modelo ignora el HTML y el correo le da contexto útil para responder
- [x] Quitar etiquetas y firma con nombre y correo, dejar "!!!" en "!" y conservar "error 500"
- [ ] Borrar todo lo que no sea letra, incluidos números y comillas, para dejar solo palabras
- [ ] Pasar todo a minúsculas y quitar las tildes, porque así el modelo lo entiende mejor y gasta menos tokens
- **Por qué:** Limpiar es quitar lo que no es el mensaje (etiquetas, firma, signos repetidos) y proteger los datos personales antes de que salgan hacia un servicio externo, sin borrar el problema. La a) gasta tokens y envía datos personales a un tercero; la c) borra "500", el dato clave del ticket; la d) confunde la normalización para comparar y medir con la preparación del texto para el modelo, que entiende mejor el texto natural.

### D12
- **Contenido:** {{c:REGISTRO DE RESULTADOS}}
- **Criterio:** 4.3
- **Pregunta:** Vas a comparar dos versiones del prompt del resumidor con ROUGE, BLEU, coherencia y relevancia. ¿Qué forma de registrar los resultados te permite decidir con evidencia?
- [ ] Anotar solo el mejor resultado de cada versión, para que la tabla quede corta
- [ ] Probar cada versión con tickets distintos, para cubrir más casos con el mismo esfuerzo
- [x] Los mismos tickets, referencias y tokenizador en las dos versiones, con una fila por prueba en un CSV
- [ ] Leer las salidas y anotar la impresión general de cada versión, porque las métricas no captan el sentido del resumen
- **Por qué:** Un protocolo fija qué se mide y cómo, para que las diferencias se deban al prompt y no al procedimiento; registrar todas las pruebas, también las que fallan, permite encontrar los ajustes. La a) oculta los casos que más enseñan; la b) cambia dos cosas a la vez y las cifras dejan de ser comparables; la d) tiene algo de razón (coherencia y relevancia se valoran con una pauta humana), pero sin pauta ni registro no hay evidencia.

## 01 · Evaluación diagnóstica del módulo 2
- **Archivo:** M2-01-Evaluacion-diagnostica
- **Rótulo:** Evaluación del módulo · inicio
- **Momento:** Al comenzar el módulo, antes de la primera lectura
- **Modalidad:** Individual: cuestionario del LMS o este documento
- **Calificación:** No lleva nota: muestra tu punto de partida
- **Vínculo con el plan:** La competencia del módulo, sus cuatro aprendizajes esperados y sus contenidos

### Para qué sirve

Esta evaluación abre el módulo «{{modulo}}». No lleva nota: te muestra qué sabes hoy y qué te conviene repasar, y le muestra a tu tutor/a cómo acompañarte desde el primer día.

Las preguntas usan el caso que recorre todo el módulo: **Nube Sur**, una empresa ficticia de software que vende sistemas de gestión a pymes y cuya mesa de ayuda atiende a sus clientes por correo, formulario web y chat. Nube Sur quiere apoyarse en modelos de IA generativa para resumir tickets, clasificarlos y responder preguntas frecuentes.

Al terminar el módulo vas a ser capaz de:

> {{competencia}}.

El módulo se organiza en cuatro contenidos del plan, y esta evaluación tiene preguntas de cada uno:

1. {{unidad 1}}
2. {{unidad 2}}
3. {{unidad 3}}
4. {{unidad 4}}

### Instrucciones

- Responde sin buscar en internet ni en los materiales del curso: lo que importa es tu punto de partida real.
- En la Parte A, marca una sola opción por pregunta.
- Si no sabes una respuesta, déjala en blanco. No adivines: una pregunta en blanco también es información para ti y para tu tutor/a.
- En la Parte B, marca con honestidad cómo te ves hoy. Nadie espera que sepas lo que el módulo va a enseñarte.
- En la Parte C, responde con tus palabras, en pocas líneas.
- Si usas este documento en vez del cuestionario del LMS, guarda una copia con tus respuestas y súbela donde indique tu tutor/a.

### Parte A · Lo que ya sabes

Doce preguntas, tres por cada contenido del plan. Todas parten de situaciones de Nube Sur.

{{items-diagnostica}}

### Parte B · Cómo te ves hoy frente a los aprendizajes del módulo

Para cada criterio de evaluación del plan, marca el nivel que mejor te describe hoy:

| Nivel | Significa | Por ejemplo, frente a "llamar a una API desde Python" |
| :-: | --- | --- |
| 1 | Aún no lo sé hacer | No sabría por dónde empezar. |
| 2 | Lo hago con ayuda | Lo hago siguiendo un tutorial o con alguien al lado. |
| 3 | Lo hago solo/a, con dudas | Lo hago, pero cuando falla no sé bien por qué. |
| 4 | Lo hago solo/a y puedo explicarlo | Lo hago y podría explicárselo a un compañero/a, incluido qué hacer cuando falla. |

{{tabla-autopercepcion}}

**Guarda tus respuestas de esta parte.** Al cierre del módulo las vas a copiar en la columna «Al inicio» de la autoevaluación, y las vas a usar en la introducción y en el cierre de tu portafolio para mostrar cuánto avanzaste. Si respondes en el LMS, anota también tus niveles en tu bitácora o en un archivo propio.

### Parte C · Tu experiencia

1. ¿Has usado alguna herramienta de IA generativa (para texto, código o imágenes) en tu trabajo o en tus estudios? Cuenta para qué la usaste y qué te costó controlar de sus respuestas.
2. ¿Has llamado a una API desde código o con un cliente HTTP como Postman? Describe qué hiciste y dónde guardabas la clave o el token.
3. ¿Has escrito pruebas unitarias, usado entornos virtuales de Python o trabajado con Git y GitHub? Indica qué has hecho y con qué frecuencia.
4. Piensa en una mesa de ayuda o un servicio de atención que conozcas. ¿Qué preguntas repetidas le dejarías responder a un asistente con IA, cuáles no, y por qué?

### Qué pasa después

- Tu tutor/a revisa tus respuestas y te devuelve tus aciertos de la Parte A por contenido (de 0 a 3) y un comentario breve: en qué contenido conviene reforzar, repasar o avanzar, y con qué recurso del módulo. Guárdalos junto con tu Parte B: los vas a usar en la introducción de tu portafolio.
- Con tus respuestas de la Parte C, tu tutor/a arma los equipos de los ABPRO para que cada uno reúna experiencias distintas.
- Empiezas por la lectura del primer contenido, «Modelos generativos y su ecosistema».
- Al cierre del módulo vuelves a esta evaluación: tu Parte B es el punto de comparación de la autoevaluación y de tu portafolio.

## 01 · Pauta del tutor: evaluación diagnóstica
- **Archivo:** M2-01-Evaluacion-diagnostica-Pauta-tutor
- **Rótulo:** Evaluación del módulo · inicio · uso del tutor/a
- **Momento:** Al comenzar el módulo, al recibir las respuestas
- **Uso:** Solo tutor/a: no se publica a los participantes
- **Calificación:** No lleva nota; orienta el acompañamiento
- **Vínculo con el plan:** Los cuatro aprendizajes esperados, sus doce criterios de evaluación y sus contenidos

Esta pauta acompaña a la evaluación diagnóstica del módulo 2. Contiene la clave de la Parte A, **no se publica a los participantes** y no debe quedar visible en el LMS.

### Cómo está construida

| Parte | Qué mide | Relación con el plan |
| --- | --- | --- |
| A · Lo que ya sabes | Conocimientos previos: 12 preguntas de selección múltiple sobre situaciones de Nube Sur, con distractores que revelan errores típicos | Tres ítems por contenido del plan; cada ítem responde a un contenido y a un criterio de evaluación, y entre los doce cubren los doce criterios del módulo |
| B · Cómo te ves hoy | Autopercepción de 1 a 4 en cada criterio | Los doce criterios de evaluación de los cuatro aprendizajes esperados, con las mismas palabras del plan |
| C · Tu experiencia | Experiencia previa con IA generativa, APIs, pruebas, Git y atención de clientes | Contexto para acompañar y formar equipos; anticipa la actividad final, que es un asistente de preguntas frecuentes |

**Si la aplicas como cuestionario del LMS:** un solo intento; las preguntas en el orden de este documento, agrupadas por contenido; la revisión configurada para mostrar la respuesta correcta y la retroalimentación solo después de cerrar el cuestionario, y la Parte C como preguntas de ensayo con puntaje 0. La Parte B va aparte, en una actividad Retroalimentación (Feedback) de Moodle con una pregunta de opción múltiple de 1 a 4 por criterio: en el cuestionario, una pregunta de opción múltiple exige una opción correcta, y el participante vería una «respuesta correcta» en su autopercepción. El cuestionario no suma a la calificación del curso.

### Clave y correspondencia con el plan

Clave rápida: 1 d · 2 c · 3 b · 4 a · 5 d · 6 c · 7 b · 8 a · 9 d · 10 a · 11 b · 12 c.

{{clave-diagnostica}}

### Cómo leer los resultados

**Por contenido.** Cada contenido del plan tiene tres ítems. Cuenta los aciertos de cada participante en cada uno:

| Aciertos en el contenido | Lectura | Qué significa |
| :-: | --- | --- |
| 3 de 3 | Avanza | Tiene la base del contenido; puede ir directo al ABP y asumir un rol exigente en el ABPRO. |
| 2 de 3 | Repasa | Tiene la base con una idea equivocada o un vacío; conviene revisar el distractor que marcó. |
| 0 o 1 de 3 | Refuerza | Parte de cero en el contenido; necesita la lectura completa y sus apoyos antes del ABP. |

Una pregunta en blanco cuenta como no acertada, pero no se lee igual que un error: "no lo sé" es un vacío que la lectura resuelve; un distractor marcado es una idea equivocada que hay que conversar. Revisa siempre qué opción marcó.

**Parte A frente a Parte B.** Para cada contenido, compara los aciertos con el promedio de la Parte B en los tres criterios del aprendizaje esperado correspondiente (por ejemplo, 3, 3 y 2 dan 2,7):

| Aciertos (Parte A) | Promedio (Parte B) | Lectura | Qué hacer |
| :-: | :-: | --- | --- |
| 0 o 1 | 3 o más | Sobreestimación: cree saber más de lo que muestra | Conversación breve al comenzar ese contenido; pedirle la autocomprobación de la lectura antes del ABP, para que contraste su impresión con un resultado. |
| 3 | 2 o menos | Subestimación: sabe más de lo que cree | Confirmarle lo que ya sabe y ofrecerle un rol de revisión en el ABPRO de ese contenido: responsable de seguridad y datos en el 1, responsable de pruebas en el 2, evaluador/a en el 3, responsable de métricas en el 4. |
| Otros casos | — | Coherente | Seguir la ruta según los aciertos. |

La sobreestimación es la que más conviene atender: quien se cree seguro/a tiende a saltarse la lectura y llega al ABPRO con la idea equivocada.

### Acciones según el resultado

Recursos del curso para cada contenido, según la lectura de los aciertos:

| Contenido del plan | Refuerza (0 o 1) | Repasa (2) | Avanza (3) |
| --- | --- | --- | --- |
| 1 · {{unidad 1}} | Lectura «Modelos generativos y su ecosistema» completa, con su autocomprobación; cápsula 1 (presentación narrada) y cuadro comparativo de familias de modelos generativos, antes del ABP «{{abp AE1}}» | Cápsula 1 y quiz 1 «Modelos generativos y su arquitectura»; volver a la sección de la lectura del ítem fallado | ABP «{{abp AE1}}»; en el ABPRO «{{abpro AE1}}», rol de arquitecto/a o de analista de tecnologías |
| 2 · {{unidad 2}} | Lectura «Consumir modelos por API» completa; cápsula 2 y sección 0 del notebook guiado «Laboratorio de prompts: del prompt que no sirve al que funciona» (primera llamada con la clave fuera del código), antes del ABP «{{abp AE2}}» | Cápsula 2 y quiz 2 «Consumir modelos por API» | ABP «{{abp AE2}}»; en el ABPRO «{{abpro AE2}}», responsable de un proveedor o de pruebas |
| 3 · {{unidad 3}} | Lectura «Diseño de prompts» completa; cápsula 3 y secciones 1 a 5 del notebook guiado, antes del ABP «{{abp AE3}}» | Cápsula 3, video interactivo «Del prompt a la respuesta» y quiz 3 «Diseño de prompts» | ABP «{{abp AE3}}»; en el ABPRO «{{abpro AE3}}», diseñador/a de prompts |
| 4 · {{unidad 4}} | Lectura «Preparar y medir texto» completa, con el cálculo de comprobación de ROUGE; cápsula 4, antes del ABP «{{abp AE4}}» | Cápsula 4 y quiz 4 «Preparar y medir texto» | ABP «{{abp AE4}}»; en el ABPRO «{{abpro AE4}}», responsable de métricas |

**Errores que conviene atender primero.** Algunos distractores anticipan fallas graves en la actividad final. Si aparecen, no esperes al contenido correspondiente:

| Ítem y opción | Qué revela | Qué hacer |
| --- | --- | --- |
| 5 b) o c) | Pondría la clave en la URL o en el código | Antes de la primera llamada real: sección de autenticación de la lectura «Consumir modelos por API» y sección 0 del notebook guiado. Una clave publicada es la falta más grave del módulo. |
| 3 a) | Llevaría la clave al navegador para resolver la escala, lo que además no evita el 429 | Conversar el criterio de seguridad con la sección «Elegir una arquitectura» de la lectura 1. |
| 2 a) | Cree que el modelo recuerda las solicitudes anteriores | Aclararlo al comenzar el contenido 2: cada solicitud REST es independiente. |
| 3 c) | Reintentaría sin esperar ante un 429 | Sección de errores del servicio de la lectura 2 (esperas crecientes). |
| 9 b) | Cree que `max_tokens` controla el largo del resumen | Sección 7 del notebook guiado (parámetros). |
| 11 a), c) o d) | Enviaría datos personales al modelo, borraría el problema del ticket o normalizaría el texto que va al modelo | Secciones de limpieza y normalización de la lectura 4. |
| 12 b) o d) | Compararía versiones con casos distintos o sin registro | Sección «Iterar» de la lectura 3 y sección «Registrar y ajustar» de la lectura 4. |

### Planilla de registro del curso

Registra los resultados en una planilla del curso que solo vea el tutor/a (por ejemplo, el informe del cuestionario exportado desde el LMS, con estas columnas agregadas). Identifica a cada participante con el código que use el curso, no con su correo.

| Participante | Contenido 1 (0 a 3) | Contenido 2 (0 a 3) | Contenido 3 (0 a 3) | Contenido 4 (0 a 3) | Total (0 a 12) | Parte B: promedio por aprendizaje (1 a 4) | Contraste A y B | Acción acordada |
| --- | :-: | :-: | :-: | :-: | :-: | --- | --- | --- |
| *P07* | *3* | *1* | *2* | *1* | *7* | *2,7 · 3,3 · 2,0 · 1,7* | *Sobreestima el contenido 2; coherente en 1, 3 y 4* | *Contenido 2: lectura 2 completa con su autocomprobación, cápsula 2 y sección 0 del notebook antes del ABP 2; conversar el ítem 5 (marcó la clave en la URL). Contenido 3: cápsula 3, video interactivo y quiz 3. Contenido 4: lectura 4 completa con el cálculo de comprobación de ROUGE y cápsula 4 antes del ABP 4* |
| | | | | | | | | |
| | | | | | | | | |

Con la planilla completa, mira también el curso completo: si un contenido queda en "refuerza" para la mitad del grupo o más, dedícale más espacio al inicio de su aprendizaje esperado.

### Cómo se vuelve a usar al cierre

- **Autoevaluación del módulo 2.** Cada participante copia su Parte B en la columna «Al inicio» y marca su nivel «Hoy» en los mismos criterios. Contrasta esos niveles con tu planilla: si alguien marcó 4 «Hoy» en un criterio donde su actividad final muestra lo contrario, conversa con él o ella la evidencia.
- **Portafolio.** La introducción del portafolio parte de la diagnóstica y el cierre compara «Al inicio» con «Hoy». La rúbrica del portafolio evalúa esa comparación en el criterio de reflexión y uso de la retroalimentación.
- **Grupo.** Compara la distribución de aciertos por contenido al inicio con los resultados de la actividad final, para ajustar la próxima versión del módulo.

## 03 · Actividad final integradora: El asistente de preguntas frecuentes de Nube Sur
- **Archivo:** M2-03-Actividad-final-integradora
- **Rótulo:** Evaluación y cierre del módulo · cierre
- **Momento:** Al cierre del módulo
- **Modalidad:** Individual, con entrega en el LMS
- **Calificación:** Pauta de 40 puntos, exigencia 60 %
- **Competencia del módulo:** {{competencia}}
- **Contenidos del plan:** Los cuatro contenidos del módulo, todos integrados: {{unidad 1}} · {{unidad 2}} · {{unidad 3}} · {{unidad 4}}

### Contexto

Nube Sur (empresa ficticia) vende software de gestión a pymes. Su mesa de ayuda atiende a los clientes por correo, formulario web y chat. Durante el módulo construiste piezas para ella: la arquitectura de su plataforma de soporte, un cliente que conversa con los modelos, prompts que clasifican tickets y un pipeline que limpia textos y mide la calidad de lo que el modelo genera.

Ahora el jefe de soporte trae un problema nuevo. En una semana de muestra contó que 4 de cada 10 consultas del chat preguntaban algo que ya está respondido en la lista de preguntas frecuentes de la empresa. Los agentes copian y pegan la misma respuesta varias veces al día, y a veces la adaptan de memoria, con datos que ya no están vigentes: un plazo antiguo o un menú que cambió de nombre.

Quiere un asistente que conteste esas consultas con la respuesta publicada y que derive a un ejecutivo todo lo demás. Pone tres condiciones: que **nunca invente** (un precio, un plazo o una función que no existe), que **no envíe datos personales** de los clientes a un servicio externo y que **el gasto en la API se pueda medir y controlar**.

### El desafío

Construye y evalúa, de forma individual, la primera versión del asistente de preguntas frecuentes de Nube Sur. Dada la pregunta de un cliente, el asistente:

1. la limpia y la normaliza;
2. busca la pregunta frecuente más parecida comparando embeddings;
3. si la similitud no alcanza un umbral que tú defines, responde "Te derivo con un ejecutivo." sin llamar al modelo de generación;
4. si lo alcanza, le pide al modelo una respuesta breve basada **solo** en la respuesta publicada de esa pregunta frecuente, en formato JSON;
5. registra la calidad de sus respuestas y los tokens que gasta.

Al final, le recomiendas al jefe de soporte, con números, si el asistente pasa a un piloto en el chat, pasa con ajustes o no pasa.

### Lo que vas a construir

El trabajo tiene cinco partes. Cada una deja archivos en tu repositorio; la sección Entrega los resume.

#### Parte 1 · Arquitectura y decisiones

En el `README.md`, sección «Arquitectura»:

1. **¿Por qué IA generativa?** Explica en 5 a 8 líneas para qué sirve aquí la IA generativa y por qué no basta una solución basada en reglas con palabras clave (por ejemplo, "si la pregunta contiene «contraseña», responde F1"). Demuéstralo con Q1 y Q2 de los insumos. Indica también una tarea del asistente que sí conviene resolver con una regla, como rechazar un mensaje vacío o demasiado largo antes de gastar tokens.
2. **Tipos de IA y de modelos.** En una tabla, clasifica los modelos que usa el asistente: el tipo de IA generativa (texto) y la familia de cada modelo (un modelo autorregresivo basado en transformers para redactar; un modelo de embeddings para buscar, típicamente un transformer codificador: verifícalo en la ficha del modelo que uses). Agrega los que descartas, imagen, audio, video y modelos de difusión, con una línea de por qué.
3. **Casos de uso.** Indica qué casos de uso de la IA generativa cubre el asistente (preguntas y respuestas o QA, y reformulación de la respuesta publicada) y uno que podrías agregar después, como la generación de tests para tus funciones o el resumen de la conversación cuando el asistente deriva. Di cómo validarías esa salida.
4. **Diagrama funcional.** Dibuja el diagrama (Mermaid o imagen) con los cinco componentes: cliente (el chat de Nube Sur), servidor API (en tu versión, el módulo `asistente.py`), módulo de preprocesamiento, modelo de IA (generación y embeddings, por API) y vector store (los embeddings de las preguntas frecuentes guardados en un archivo). Numera el flujo de datos de extremo a extremo con una pregunta de ejemplo, explica en una línea la función de cada componente y marca dónde vive la clave. No necesitas publicar un servidor web.
5. **Solicitud–respuesta y pipeline.** Señala qué parte del asistente funciona como solicitud–respuesta (la consulta en vivo) y qué parte como pipeline (preparar e indexar una sola vez las preguntas frecuentes; evaluar por lotes las preguntas de prueba).
6. **Tecnologías.** En una tabla, las tecnologías y librerías que eliges para cada componente y las que descartas en esta versión, con una línea de por qué: API de OpenAI o de Hugging Face, Hugging Face Transformers, PyTorch, TensorFlow, LangChain y Diffusers. Por ejemplo: no necesitas PyTorch ni TensorFlow porque no entrenas ni ejecutas modelos en tu equipo, y LangChain no se justifica para un flujo de cinco pasos (la orquestación la trata el módulo 3 del plan, «Orquestación de flujos y agentes mediante frameworks»).
7. **Justificación.** Justifica la arquitectura con tres criterios: escalabilidad (qué pasa si el chat recibe diez veces más consultas), seguridad (la clave vive solo en el servidor, en una variable de entorno, y los datos personales se quitan antes de salir) y mantenimiento (cambiar de proveedor o de modelo con una variable de entorno).

#### Parte 2 · El cliente de la API

1. **Reutiliza o amplía** el cliente que construiste en el módulo: `ClienteIA` o el paquete `nubesur_ia` del ABPRO «{{abpro AE2}}». Indica en el README qué reutilizaste y qué agregaste.
2. **Tres operaciones**, con httpx o requests: `listar_modelos()`, una solicitud GET que al arrancar comprueba que la clave y los modelos configurados existen; `embeddings(textos)`, un POST que devuelve un vector por texto en el mismo orden de entrada; y `generar(mensajes, temperature, max_tokens)`, un POST al endpoint de chat que devuelve el texto y el campo `usage`. Cada operación arma su cuerpo JSON y lee la respuesta solo después de revisar el código de estado.
3. **Configuración.** Todo sale de variables de entorno: `PROVEEDOR_IA` (`openai` o `huggingface`), `OPENAI_API_KEY` o `HF_TOKEN`, `MODELO_CHAT` y `MODELO_EMBEDDINGS`. El archivo `.env` va en `.gitignore`; el `.env.example` lleva los nombres, sin valores.
4. **Tiempo de espera** explícito en cada solicitud (con requests no hay uno por defecto).
5. **Errores.** Un 401 produce un mensaje claro que apunta a la clave, sin reintentar. Un 429 o un 5xx se reintenta hasta tres veces con esperas crecientes, respetando el encabezado `Retry-After` si viene; pero un 429 con el código `insufficient_quota` (cuota o crédito agotado) no se reintenta, porque esperar no lo resuelve. Un tiempo agotado o un error de conexión produce un mensaje claro. En todos los casos, el asistente responde "Te derivo con un ejecutivo." y registra el error, sin mostrarle al cliente el detalle técnico.
6. **Docstrings** en cada clase y método público: qué hace, Args, Returns y Raises.
7. **Pruebas unitarias.** Al menos cinco, que pasen sin conexión y sin clave real, con la API simulada (`httpx.MockTransport` o `unittest.mock`). Como mínimo: `generar()` hace un POST al endpoint de chat con `Authorization: Bearer` y devuelve el texto y `usage`; `embeddings()` respeta el orden por `index`; `listar_modelos()` usa GET; un 401 produce un error claro con su código; y un 429 seguido de un 200 termina bien tras reintentar (inyecta la función de espera para que la prueba no espere de verdad).
8. **Tabla de endpoints** en el README: proveedor, operación (listar modelos, generación, embeddings), modelo que usaste, método, URL, autenticación, campos obligatorios del cuerpo, dónde viene el resultado y el enlace a la página de la documentación oficial que consultaste, con su fecha. Las URL y los nombres de modelos cambian: escribe lo que dice la documentación vigente, no lo que recuerdas.

#### Parte 3 · Preprocesamiento y búsqueda

1. **Funciones reutilizables** en `preprocesar.py` (amplía la del módulo si la tienes), una por etapa:
  - `limpiar(texto)`: decodifica las entidades HTML (`html.unescape`: `&aacute;` pasa a á), quita las etiquetas y el ruido (firmas, "Enviado desde mi…", signos repetidos) y reemplaza los datos personales por marcas (`[correo]`, `[enlace]`), sin borrar el contenido de la pregunta;
  - `normalizar(texto, sin_tildes=False)`: unifica espacios, comillas y mayúsculas y, solo si se pide, quita las tildes;
  - `tokenizar(texto, lematizar=False, sin_stopwords=False)`: tokeniza con spaCy (`es_core_news_sm`) o NLTK y, si se pide, lematiza y quita stopwords;
  - `preprocesar(texto, destino="modelo")`: encadena las etapas según el destino. Con `destino="modelo"` (embeddings y generación) devuelve `limpiar(texto)`; con `destino="comparar"` (TF-IDF, CountVectorizer y métricas) devuelve los tokens de `normalizar(limpiar(texto), sin_tildes=True)`. La búsqueda y la evaluación llaman solo a esta función, con el destino que corresponde.
2. **Estructura modular.** Explica en el README el orden de las etapas y qué versión del texto usa cada componente: los embeddings y el modelo de generación reciben el texto limpio y natural, con mayúsculas y tildes; TF-IDF, CountVectorizer y las métricas, el texto normalizado y tokenizado.
3. **Conceptos, con Q6.** Muestra los tokens de Q6 limpia, sus lemas, cómo queda sin stopwords y sus bigramas. Revisa si tu lista de stopwords incluye "no" y decide si conviene quitarla en la búsqueda. Compara, para cinco palabras de las preguntas frecuentes, el lema de spaCy con la raíz del `SnowballStemmer("spanish")` de NLTK.
4. **Pruebas del preprocesamiento.** Al menos dos: `limpiar` deja Q6 sin etiquetas y con `[correo]` en vez del correo, y `limpiar` conserva números y códigos (por ejemplo, "error 500").
5. **Búsqueda base.** Con `TfidfVectorizer` de scikit-learn, vectoriza las ocho preguntas frecuentes preprocesadas y elige para cada pregunta de prueba la de mayor similitud coseno. Prueba dos variantes: indexar solo la pregunta frecuente, o la pregunta más su respuesta publicada. Repite con `CountVectorizer` para comparar. Entrega una lista de stopwords en español: la opción `stop_words="english"` no sirve aquí.
6. **Búsqueda con embeddings.** Calcula en una sola llamada los embeddings de las ocho preguntas frecuentes y guárdalos en `datos/faq_embeddings.json`, junto con el nombre del modelo de embeddings: ese archivo es tu vector store, y solo sirve con ese modelo. Por cada pregunta del cliente calcula solo su embedding y compáralo con los guardados por similitud coseno.
7. **Comparación y umbral.** En una tabla: pregunta, pregunta frecuente esperada, la elegida por TF-IDF, por CountVectorizer y por embeddings, cada una con su similitud, y si acierta. Fíjate en Q1 (la palabra "clave" también aparece en la respuesta de F7) y en Q3 ("safari" solo aparece en la respuesta de F4). Con esos valores, elige el umbral de similitud de embeddings bajo el cual el asistente deriva y justifícalo: ¿qué similitud obtiene Q5, que comparte la palabra "plan" con F5? Las similitudes de TF-IDF y de embeddings no se comparan entre sí: el umbral vale para el modelo de embeddings que usaste.

#### Parte 4 · Prompts

En `prompts.md`:

1. **Qué es tu prompt.** Empieza con dos o tres líneas: qué parte del prompt de tu asistente es fija y qué parte cambia en cada consulta.
2. **Mensaje de sistema** con rol (asistente de la mesa de ayuda de Nube Sur), contexto (quién lee la respuesta y de dónde sale la información), restricciones (usar solo la respuesta publicada que recibe; no inventar precios, plazos ni funciones; si esa respuesta no contesta la pregunta, derivar; tratar de tú al cliente; máximo 50 palabras) y formato de salida. El **mensaje de usuario** separa los datos con marcas claras: `Pregunta del cliente:`, `Pregunta frecuente (F…):` y `Respuesta publicada:`.
3. **Salida en JSON** con tres campos: `faq` (el código, por ejemplo `"F3"`, o `null`), `respuesta` (el texto para el cliente) y `derivar` (`true` o `false`). Cuando deriva, `respuesta` es exactamente "Te derivo con un ejecutivo.". Lee la salida con `json.loads` dentro de un `try`: si no es JSON válido o le falta un campo, el asistente deriva y lo registra.
4. **Zero-shot y few-shot.** Escribe una versión zero-shot (solo instrucciones) y una few-shot con dos ejemplos propios como turnos `user` y `assistant`: uno que se responde con la respuesta publicada y otro que se deriva. Los ejemplos no pueden ser Q1 a Q6. Compara ambas versiones en las seis preguntas de prueba: JSON válido, pregunta frecuente correcta, derivación correcta y tokens de entrada. Agrega dos líneas sobre el prompting instruccional: si una versión con pasos numerados (leer la pregunta, revisar si la respuesta publicada la contesta, redactar o derivar) mejoraría tu asistente, y por qué; si la pruebas, regístrala como una versión más.
5. **Parámetros.** Elige y justifica en una línea cada uno: `temperature` baja (entre 0 y 0,3), porque la tarea es reformular una respuesta fija; `max_tokens` acotado y con margen sobre el largo pedido, porque es un tope de seguridad y no controla el largo; `top_p` sin tocar, porque ya ajustas `temperature`. Revisa en la documentación oficial si tu modelo acepta `temperature` y si usa `max_tokens` o `max_completion_tokens`.
6. **Iteraciones.** Al menos tres, cambiando una cosa a la vez y probando siempre con las mismas preguntas. En una tabla: versión, cambio, por qué, efecto (en claridad, estructura o control del comportamiento del modelo) y evidencia (la fila de `resultados.csv`).
7. **Limitaciones.** Prueba y registra tres: la **alucinación**, enviando Q5 al modelo junto con la respuesta publicada de F5 aunque tu umbral la derive (¿el prompt, por sí solo, evita que invente un precio?); la **sensibilidad al wording**, con tres paráfrasis de Q3 (¿cambian la pregunta frecuente elegida o la respuesta?); y la **falta de control**, con la misma pregunta cinco veces con `temperature` 0,2 y cinco veces con 1,0 (¿cuántas salidas distintas y cuántos JSON inválidos?).
8. **Un prompt adicional**, de validación o de reformulación. Por ejemplo, uno que reciba la respuesta publicada y la respuesta generada y conteste solo "SI" o "NO" a "¿la respuesta generada agrega información que no está en la publicada?", o uno que reescriba la respuesta publicada en un tono más cordial sin cambiar ningún dato. Aplícalo a las seis respuestas y registra qué detectó o qué cambió.

#### Parte 5 · Evaluación y consumo eficiente

1. **Protocolo.** Escríbelo antes de medir, en el README o en `protocolo.md`: qué preguntas se evalúan (Q1 a Q6), contra qué referencias, con qué tokenizador (uno que no parta ni descarte las palabras con tilde o ñ, por ejemplo quitando las tildes igual en la referencia y en la respuesta; el mismo para ambas), qué métricas se calculan, qué significa cada una y qué valor marca una respuesta como "revisar".
2. **Métricas automáticas.** Para cada respuesta, ROUGE-L (F1) y BLEU con suavizado (las respuestas son cortas) contra la respuesta de referencia. Si usas `rouge-score`, pásale tu tokenizador. En Q5, lo que cuenta es que el asistente derive y no invente.
3. **Métricas con pauta.** Valora de 1 a 3 la **coherencia** (3: texto gramatical, sin contradicciones y en el tono pedido) y la **relevancia** (3: responde lo que se preguntó con los datos de la respuesta publicada, sin agregar nada).
4. **`resultados.csv`**, una fila por pregunta, estrategia de prompting, versión del prompt y temperature, con las columnas `fecha`, `pregunta`, `faq_esperada`, `faq_elegida`, `similitud`, `derivo`, `estrategia_prompt` (`zero-shot`, `few-shot` o `instruccional`), `version_prompt`, `temperature`, `rougeL_f`, `bleu`, `coherencia_1a3`, `relevancia_1a3`, `tokens_total` y `comentario`.
5. **`consumo.csv`**, una fila por llamada a la API, con los datos del campo `usage` de cada respuesta: `fecha`, `pregunta`, `operacion` (`embeddings`, `generar` o `validar`), `modelo`, `prompt_tokens`, `completion_tokens` (0 en los embeddings) y `total_tokens`.
6. **Consumo eficiente.** Con `consumo.csv`, calcula tres cifras: las llamadas de generación que ahorró el umbral de derivación; los tokens de embeddings que ahorras al guardar los de las preguntas frecuentes en vez de recalcularlos en cada consulta; y cuántos tokens de entrada agrega el few-shot frente al zero-shot. Proyecta las tres a 1.000 consultas; para el umbral, usa el dato del jefe de soporte: 4 de cada 10 consultas tienen respuesta en las preguntas frecuentes y las otras 6 deberían derivarse. Indica también cuántas preguntas derivó tu umbral en Q1 a Q6. Si lo expresas en dinero, usa los precios vigentes que publica el proveedor e indica la fecha en que los consultaste; no los inventes.
7. **Ajustes.** Identifica en tus números al menos dos ajustes (en la limpieza, el umbral, el prompt o los parámetros), aplícalos uno a la vez y registra el antes y el después.
8. **Recomendación.** En el informe PDF para el jefe de soporte (ver Entrega), en 5 a 8 líneas: ¿el asistente pasa a un piloto en el chat, pasa con ajustes o no pasa? Apóyala en tus tablas.

### Insumos

Todos los datos son ficticios. Los correos usan el dominio `.test`, reservado para pruebas.

#### Preguntas frecuentes de Nube Sur

| # | Pregunta frecuente | Respuesta publicada |
| --- | --- | --- |
| F1 | ¿Cómo recupero mi contraseña? | En la pantalla de ingreso, elige "Olvidé mi contraseña"; te llegará un enlace válido por 30 minutos. |
| F2 | ¿Cómo agrego un usuario a mi cuenta? | Un administrador entra a Configuración → Usuarios → Invitar y escribe el correo de la persona. |
| F3 | ¿Puedo exportar mis clientes a Excel? | Sí: en Clientes, usa el botón Exportar y elige formato XLSX. |
| F4 | ¿Qué navegadores son compatibles? | Las dos últimas versiones de Chrome, Firefox, Edge y Safari. |
| F5 | ¿Cómo cambio el plan contratado? | En Facturación → Plan puedes subir de plan en el momento; para bajar, el cambio aplica al mes siguiente. |
| F6 | ¿Dónde descargo mis facturas? | En Facturación → Documentos están todas las facturas en PDF. |
| F7 | ¿La plataforma tiene API? | Sí, con clave por cuenta; la documentación está en el menú Desarrolladores. |
| F8 | ¿Cómo elimino mi cuenta? | Escribe a soporte desde el correo del administrador; la eliminación se confirma en 5 días hábiles. |

#### Preguntas de prueba

| # | Pregunta del cliente, tal como llega | Pregunta frecuente esperada | Respuesta de referencia |
| --- | --- | :-: | --- |
| Q1 | olvidé la clave y no puedo entrar!! | F1 | Elige "Olvidé mi contraseña" en la pantalla de ingreso y recibirás un enlace válido por 30 minutos. |
| Q2 | Necesito pasar la lista de clientes a una planilla | F3 | En Clientes, usa Exportar y elige el formato XLSX. |
| Q3 | ¿funciona en safari? | F4 | Sí, funciona en las dos últimas versiones de Safari, además de Chrome, Firefox y Edge. |
| Q4 | quiero sumar a mi colega como usuario | F2 | Un administrador puede invitarlo desde Configuración → Usuarios → Invitar con su correo. |
| Q5 | ¿cuánto cuesta el plan anual? | ninguna | Te derivo con un ejecutivo. |
| Q6 | `<p>Hola!!! necesito la factura de septiembre y no la encuentro en ningún lado. ¿Me la pueden mandar a contabilidad@losaromos.test?</p><br/>Enviado desde mi iPhone` | F6 | Puedes descargar tus facturas en PDF desde Facturación → Documentos. |

Q5 no tiene respuesta en las preguntas frecuentes: el asistente debe derivar y no inventar un precio. Q6 trae HTML, ruido y un correo: pone a prueba tu limpieza, y el asistente no debe prometer que enviará nada por correo.

#### Los mismos datos, listos para copiar

`datos/faq.json`:

```json
[
  {"id": "F1", "pregunta": "¿Cómo recupero mi contraseña?", "respuesta": "En la pantalla de ingreso, elige \"Olvidé mi contraseña\"; te llegará un enlace válido por 30 minutos."},
  {"id": "F2", "pregunta": "¿Cómo agrego un usuario a mi cuenta?", "respuesta": "Un administrador entra a Configuración → Usuarios → Invitar y escribe el correo de la persona."},
  {"id": "F3", "pregunta": "¿Puedo exportar mis clientes a Excel?", "respuesta": "Sí: en Clientes, usa el botón Exportar y elige formato XLSX."},
  {"id": "F4", "pregunta": "¿Qué navegadores son compatibles?", "respuesta": "Las dos últimas versiones de Chrome, Firefox, Edge y Safari."},
  {"id": "F5", "pregunta": "¿Cómo cambio el plan contratado?", "respuesta": "En Facturación → Plan puedes subir de plan en el momento; para bajar, el cambio aplica al mes siguiente."},
  {"id": "F6", "pregunta": "¿Dónde descargo mis facturas?", "respuesta": "En Facturación → Documentos están todas las facturas en PDF."},
  {"id": "F7", "pregunta": "¿La plataforma tiene API?", "respuesta": "Sí, con clave por cuenta; la documentación está en el menú Desarrolladores."},
  {"id": "F8", "pregunta": "¿Cómo elimino mi cuenta?", "respuesta": "Escribe a soporte desde el correo del administrador; la eliminación se confirma en 5 días hábiles."}
]
```

`datos/preguntas_prueba.csv`:

```csv
id,pregunta,faq_esperada,referencia
Q1,olvidé la clave y no puedo entrar!!,F1,"Elige ""Olvidé mi contraseña"" en la pantalla de ingreso y recibirás un enlace válido por 30 minutos."
Q2,Necesito pasar la lista de clientes a una planilla,F3,"En Clientes, usa Exportar y elige el formato XLSX."
Q3,¿funciona en safari?,F4,"Sí, funciona en las dos últimas versiones de Safari, además de Chrome, Firefox y Edge."
Q4,quiero sumar a mi colega como usuario,F2,"Un administrador puede invitarlo desde Configuración → Usuarios → Invitar con su correo."
Q5,¿cuánto cuesta el plan anual?,,Te derivo con un ejecutivo.
Q6,"<p>Hola!!! necesito la factura de septiembre y no la encuentro en ningún lado. ¿Me la pueden mandar a contabilidad@losaromos.test?</p><br/>Enviado desde mi iPhone",F6,"Puedes descargar tus facturas en PDF desde Facturación → Documentos."
```

`.env.example` (solo los nombres; los valores van en tu `.env`, que nunca se sube):

```text
# openai o huggingface
PROVEEDOR_IA=
OPENAI_API_KEY=
HF_TOKEN=
MODELO_CHAT=
MODELO_EMBEDDINGS=
```

#### Forma de las respuestas, para simular la API en tus pruebas

Respuesta abreviada del endpoint de chat de OpenAI (`POST /v1/chat/completions`). El texto que pediste en JSON llega como una cadena dentro de `content`:

```json
{
  "object": "chat.completion",
  "model": "<modelo de chat>",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\"faq\": \"F4\", \"respuesta\": \"Sí, funciona en las dos últimas versiones de Safari.\", \"derivar\": false}"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {"prompt_tokens": 412, "completion_tokens": 31, "total_tokens": 443}
}
```

Respuesta abreviada del endpoint de embeddings de OpenAI (`POST /v1/embeddings`); los vectores reales tienen cientos o miles de números:

```json
{
  "object": "list",
  "data": [
    {"object": "embedding", "index": 0, "embedding": [0.0123, -0.0456, 0.0789]},
    {"object": "embedding", "index": 1, "embedding": [0.0231, 0.0114, -0.0672]}
  ],
  "model": "<modelo de embeddings>",
  "usage": {"prompt_tokens": 14, "total_tokens": 14}
}
```

Si usas Hugging Face, su endpoint de chat compatible con el formato de OpenAI responde con la misma forma; la respuesta de embeddings cambia según la tarea y el proveedor, así que revísala en la documentación oficial antes de escribir tu simulación.

### Condiciones

- **Individual.** Puedes conversar ideas con tus compañeros/as, pero el código, los prompts y el informe son tuyos.
- **Datos ficticios.** Nube Sur, sus clientes y sus correos son inventados. Trabaja solo con los insumos de esta actividad y con datos ficticios.
- **Ninguna credencial ni clave** en la entrega: ni en el código, los notebooks, el historial de commits, las capturas ni el informe. Si una clave llega a publicarse, revócala en el panel del proveedor, crea una nueva y anota en el README que lo hiciste, sin la clave.
- **Puedes reutilizar lo que construiste en el módulo** (el cliente de la API, el preprocesamiento, la evaluación y tus prompts), indicando en el README de qué trabajo viene cada pieza y qué cambiaste.
- **Si usas un asistente de IA** para escribir código o texto, decláralo en el README e indica qué revisaste y qué corregiste.
- **Acceso a la API.** Usa el acceso y los modelos que indique tu tutor/a. Las pruebas unitarias deben pasar sin conexión; las métricas y el consumo se calculan con llamadas reales.

### Entrega

En la Tarea del LMS entrega tres cosas:

1. **El enlace a tu repositorio** en GitHub, público porque lo enlazarás desde tu portafolio (revisa antes que no tenga claves), con esta estructura mínima:

```text
asistente-faq-nube-sur/
├── README.md              instalación, ejecución, arquitectura, endpoints y qué falta
├── requirements.txt
├── .env.example           nombres de las variables, sin valores
├── .gitignore             incluye .env
├── datos/
│   ├── faq.json
│   ├── preguntas_prueba.csv
│   └── faq_embeddings.json
├── nubesur_ia/            o cliente_ia.py: el cliente de la API
├── preprocesar.py
├── buscar.py              TF-IDF, CountVectorizer y embeddings
├── asistente.py           el flujo completo: python asistente.py "¿funciona en safari?"
├── evaluar.py             métricas y registro
├── prompts.md
├── resultados.csv
├── consumo.csv
└── tests/
```

2. **Un informe breve en PDF** (2 a 4 páginas) para el jefe de soporte: el diagrama y las decisiones de arquitectura, la tabla de búsqueda, el resumen de resultados y de consumo, los ajustes y tu recomendación.
3. **Una captura de la salida de `pytest`**, sin claves ni datos personales visibles.

### Cómo se evalúa

La pauta tiene 40 puntos, organizados por los componentes de la competencia del módulo. Cada fila indica qué se revisa y en qué parte de la actividad, y se puntúa así: en las filas de 2 puntos, 2 si cumple todo lo que indica, 1 si cumple al menos la mitad y 0 si cumple menos de la mitad; en las de 3 puntos, 3 si cumple todo, 2 si falta un elemento, 1 si cumple al menos uno y 0 si no cumple ninguno.

| Componente de la competencia | Qué se revisa | Puntos |
| --- | --- | :-: |
| **{{competencia: implementar la arquitectura básica de una aplicación que integre modelos de IA}}** | | **8** |
| | IA generativa frente a reglas, con Q1 y Q2 y una tarea que conviene resolver con una regla; tipos de IA generativa y familias de modelos usados y descartados; casos de uso cubiertos y uno por agregar (Parte 1, pasos 1 a 3) | 3 |
| | Diagrama con los cinco componentes, la función de cada uno y el flujo de extremo a extremo numerado; qué parte es solicitud–respuesta y cuál pipeline (Parte 1, pasos 4 y 5) | 3 |
| | Tecnologías elegidas y descartadas con su motivo; justificación con escalabilidad, seguridad y mantenimiento; la clave vive solo en el servidor (Parte 1, pasos 6 y 7) | 2 |
| **{{competencia: mediante APIs}}** | | **8** |
| | GET para verificar y POST para embeddings y generación, con cuerpo JSON y lectura de la respuesta después de revisar el código de estado; clave y modelos por variables de entorno; tiempo de espera explícito (Parte 2, pasos 1 a 4) | 2 |
| | Manejo distinto de 401, 429, 5xx y tiempo agotado; docstrings; cinco o más pruebas que pasan sin conexión ni clave; tabla de endpoints con enlaces a la documentación oficial (Parte 2, pasos 5 a 8) | 3 |
| | Los mensajes que el cliente envía al endpoint de chat: mensaje de sistema con rol, contexto y restricciones; mensaje de usuario con los datos delimitados; salida JSON de la respuesta validada con `json.loads`; comparación de zero-shot y few-shot con dos ejemplos propios (Parte 4, pasos 1 a 4) | 3 |
| **{{competencia: preprocesamiento de texto para consumo por modelos de lenguaje}}** | | **8** |
| | Funciones reutilizables por etapa, con sus pruebas; Q6 queda sin HTML, sin ruido y con `[correo]`; el texto que va al modelo conserva su forma natural (Parte 3, pasos 1, 2 y 4) | 3 |
| | Tokens, lemas, stopwords (con la decisión sobre "no") y bigramas de Q6; lema frente a raíz (Parte 3, paso 3) | 2 |
| | Búsqueda con TF-IDF, CountVectorizer y embeddings comparada en una tabla; umbral de derivación justificado con las similitudes (Parte 3, pasos 5 a 7) | 3 |
| **{{competencia: garantizando el consumo eficiente}}** | | **6** |
| | `consumo.csv` con los tokens de cada llamada tomados de `usage` (Parte 5, paso 5) | 2 |
| | Parámetros justificados y verificados para el modelo usado; embeddings de las preguntas frecuentes calculados en una llamada y guardados; reintentos limitados (Parte 4, paso 5; Parte 3, paso 6; Parte 2, paso 5) | 2 |
| | Ahorro del umbral y del almacenamiento de embeddings, y costo del few-shot, proyectados a 1.000 consultas (Parte 5, paso 6) | 2 |
| **{{competencia: la evaluación de resultados}}** | | **6** |
| | Protocolo escrito antes de medir; ROUGE-L y BLEU bien calculados con un tokenizador que no parte las palabras con tilde o ñ; coherencia y relevancia con pauta; `resultados.csv` completo (Parte 5, pasos 1 a 4) | 2 |
| | Tres o más iteraciones registradas con su efecto; pruebas de alucinación, wording y falta de control; prompt de validación o de reformulación aplicado (Parte 4, pasos 6 a 8) | 2 |
| | Dos o más ajustes identificados en los números, con su antes y después; recomendación apoyada en las tablas, en el informe PDF que resume diagrama, búsqueda, resultados y consumo (Parte 5, pasos 7 y 8; Entrega) | 2 |
| **{{competencia: en un entorno de desarrollo de software}}** | | **4** |
| | Repositorio ordenado: README que permite instalar y ejecutar, `requirements.txt`, estructura de carpetas y `pytest` que pasa en un entorno limpio (Entrega y Condiciones) | 2 |
| | `.gitignore` con `.env`, `.env.example` sin valores y ninguna clave en el código, las capturas ni el historial; commits que muestran el avance (Entrega y Condiciones) | 2 |
| | **Total** | **40** |

Una clave publicada en el repositorio o en su historial deja en 0 la fila «`.gitignore` con `.env`, `.env.example` sin valores y ninguna clave…» (2 puntos del componente «{{competencia: en un entorno de desarrollo de software}}»), y tu tutor/a te pedirá revocarla antes de la coevaluación.

**Nota** (exigencia 60 %): si tu puntaje *p* es 24 o más, nota = 4,0 + 3 × (*p* − 24) / 16; si es menor, nota = 1,0 + 3 × *p* / 24. Se redondea a un decimal. Por ejemplo, 40 puntos dan un 7,0; 32 puntos, un 5,5; 24 puntos, un 4,0, y 20 puntos, un 3,5.

### Contenidos del plan que integra esta actividad

La actividad integra los 39 temas de los cuatro contenidos del plan del módulo. La tabla muestra en qué parte se trabaja cada uno.

| Parte de la actividad | Contenidos del plan |
| --- | --- |
| Parte 1, pasos 1 y 3: por qué IA generativa y qué casos de uso | {{c:CONCEPTOS GENERALES}}<br>{{c:DIFERENCIAS}}<br>{{c:CASOS DE USO}} |
| Parte 1, paso 2: tipos de IA y de modelos | {{c:TIPOS DE IA GENERATIVA}}<br>{{c:TIPOS DE MODELOS}} |
| Parte 1, pasos 4 y 5: diagrama funcional y arquitectura | {{c:COMPONENTES}}<br>{{c:ARQUITECTURAS}} |
| Parte 1, pasos 4, 6 y 7: flujo de datos, tecnologías y justificación | {{c:ECOSISTEMA}}<br>{{c:FLUJO DE DATOS}} |
| Parte 2, pasos 1 y 2: el cliente y sus tres operaciones | {{c:PRINCIPIOS REST}}<br>{{c:ENDPOINTS}}<br>{{c:EJEMPLOS DE USO}}<br>{{c:MODULARIZACIÓN}} |
| Parte 2, pasos 2 a 4: librería, configuración, clave y tiempo de espera | {{c:GESTIÓN DE AUTENTICACIÓN}}<br>{{c:LIBRERÍAS}} |
| Parte 2, paso 5: errores del servicio | {{c:MANEJO BÁSICO}} |
| Parte 2, pasos 6 y 7: docstrings y pruebas | {{c:DOCUMENTACIÓN CON DOCSTRINGS}}<br>{{c:PRUEBAS UNITARIAS}} |
| Parte 2, paso 8: tabla de endpoints | {{c:DOCUMENTACIÓN OFICIAL}} |
| Parte 3, pasos 1, 2 y 4: funciones del pipeline y sus pruebas | {{c:TÉCNICAS DE LIMPIEZA}}<br>{{c:NORMALIZACIÓN DE MAYÚSCULAS}}<br>{{c:TOKENIZACIÓN}}<br>{{c:ESTRUCTURA MODULAR}}<br>{{c:FUNCIONES REUTILIZABLES}} |
| Parte 3, paso 3: tokens, lemas, stopwords y n-gramas de Q6 | {{c:CONCEPTOS BÁSICOS DE NLP}}<br>{{c:LEMATIZACIÓN}} |
| Parte 3, pasos 5 a 7: búsqueda y umbral | {{c:VECTORIZACIÓN}} |
| Parte 4, pasos 1 a 3: el prompt, sus mensajes y la salida en JSON | {{c:QUÉ ES UN PROMPT}}<br>{{c:ESTRUCTURA BÁSICA}}<br>{{c:PRÁCTICAS RECOMENDADAS}}<br>{{c:FORMATEO DE SALIDAS}} |
| Parte 4, paso 4: zero-shot y few-shot | {{c:TIPOS DE PROMPTING}} |
| Parte 4, paso 5: parámetros | {{c:PROMPT Y PARÁMETROS}} |
| Parte 4, pasos 6 y 7: iteraciones y limitaciones | {{c:ITERACIÓN}}<br>{{c:LIMITACIONES}} |
| Parte 4, paso 8: prompt de validación o de reformulación | {{c:EJEMPLOS PRÁCTICOS}} |
| Parte 5, pasos 1 a 4: protocolo, métricas y `resultados.csv` | {{c:MÉTRICAS}}<br>{{c:REGISTRO DE RESULTADOS}} |
| Parte 5, pasos 5 a 8: consumo, ajustes y recomendación | {{c:IDENTIFICACIÓN DE AJUSTES}} |

### Después de entregar

- **Coevaluación por pares.** Tu tutor/a te asigna un compañero/a: clonas su repositorio, ejecutas sus pruebas y revisas su trabajo con la tabla de la Parte A de la coevaluación. Él o ella hace lo mismo con el tuyo.
- **Autoevaluación del módulo 2.** Se completa en dos momentos. Al entregar, en su Parte 2 revisas tu actividad frente a los mismos componentes de la competencia de esta pauta y estimas tu puntaje (también completas las Partes 1, 3 y 4). Al recibir la devolución, anotas su puntaje en la Parte 2 y completas la Parte 5, antes de publicar el portafolio.
- **Portafolio.** El asistente va en el elemento de integración de tu portafolio, con el enlace al repositorio, el diagrama, la tabla de resultados y tu recomendación.
- **Devolución del tutor/a.** Recibes la pauta con el puntaje de cada fila y un comentario con una fortaleza, una mejora y un siguiente paso.

## 04 · Autoevaluación del módulo 2
- **Archivo:** M2-04-Autoevaluacion
- **Rótulo:** Evaluación y cierre del módulo · cierre
- **Momento:** Partes 1, 2 (tu estimación), 3 y 4: al entregar la actividad final. Parte 2 (puntaje de la devolución) y Parte 5: al recibir la devolución del tutor/a, antes de publicar el portafolio
- **Modalidad:** Individual
- **Calificación:** No lleva nota; va en tu portafolio
- **Vínculo con el plan:** Los cuatro aprendizajes esperados con sus criterios de evaluación, y la competencia del módulo

### Para qué sirve

Esta autoevaluación cierra el módulo. Comparas cómo te veías al comenzar (la Parte B de la evaluación diagnóstica) con cómo te ves hoy, criterio por criterio; revisas tu actividad final frente a la competencia del módulo y tu trabajo en los ABPRO, y armas un plan de mejora.

No lleva nota. Su valor está en que sea honesta y en que cada nivel se apoye en un trabajo tuyo. Va en el cierre de tu portafolio.

### La escala

Es la misma de la evaluación diagnóstica:

| Nivel | Significa |
| :-: | --- |
| 1 | Aún no lo sé hacer |
| 2 | Lo hago con ayuda |
| 3 | Lo hago solo/a, con dudas |
| 4 | Lo hago solo/a y puedo explicarlo |

Para marcar 3 o 4 tienes que poder señalar el trabajo que lo demuestra: un archivo, un commit, una fila de tu CSV o una sección de una entrega. Si no encuentras la evidencia, baja un nivel.

### Parte 1 · Tus aprendizajes, criterio por criterio

En la columna «Al inicio», copia los niveles que marcaste en la Parte B de la evaluación diagnóstica. Si no la respondiste, deja esa columna en blanco y explícalo en tu portafolio. En «Hoy», marca tu nivel actual. En la última columna, nombra el trabajo concreto: por ejemplo, `test_embeddings_cliente.py` del ABP «{{abp AE2}}», con tres pruebas que pasan sin conexión.

{{tabla-autoevaluacion}}

Si en algún criterio «Hoy» es igual o menor que «Al inicio», no lo corrijas: puede ser que al comenzar no supieras lo que no sabías. Llévalo a la Parte 5.

### Parte 2 · Tu actividad final frente a la competencia del módulo

La competencia del módulo es: {{competencia}}.

Revisa tu asistente de preguntas frecuentes con los mismos componentes de la pauta de la actividad final. Marca una opción por fila y anota la evidencia.

| Componente de la competencia | Puntos en la pauta | Lo logré | En parte | Aún no | Qué lo demuestra |
| --- | :-: | :-: | :-: | :-: | --- |
| {{competencia: implementar la arquitectura básica de una aplicación que integre modelos de IA}} | 8 | | | | |
| {{competencia: mediante APIs}} | 8 | | | | |
| {{competencia: preprocesamiento de texto para consumo por modelos de lenguaje}} | 8 | | | | |
| {{competencia: garantizando el consumo eficiente}} | 6 | | | | |
| {{competencia: la evaluación de resultados}} | 6 | | | | |
| {{competencia: en un entorno de desarrollo de software}} | 4 | | | | |

Estima tu puntaje al entregar. Cuando recibas la devolución, anota su puntaje y compáralo con tu estimación, antes de completar la Parte 5.

**Mi puntaje estimado:** ___ de 40. **Puntaje de la devolución del tutor/a:** ___ de 40. **¿En qué fila está la mayor diferencia y por qué?** ___

### Parte 3 · Tu trabajo en los ABPRO

Para cada ABPRO, anota el rol que asumiste y valora tu aporte al equipo: 1 = aporté poco; 2 = cumplí lo mínimo de mi rol; 3 = cumplí mi rol y ayudé en otra tarea; 4 = cumplí mi rol, ayudé a otros y propuse mejoras que el equipo adoptó.

| ABPRO | Rol que asumiste | Tu aporte (1 a 4) | Comentario: qué aportaste y qué harías distinto |
| --- | --- | :-: | --- |
| «{{abpro AE1}}»<br>*Roles:* coordinador/a · arquitecto/a · responsable de seguridad y datos · analista de tecnologías · documentador/a y portavoz | | | |
| «{{abpro AE2}}»<br>*Roles:* coordinador/a · responsable de OpenAI · responsable de Hugging Face · responsable de pruebas · documentador/a y portavoz | | | |
| «{{abpro AE3}}»<br>*Roles:* coordinador/a · diseñador/a de prompts · operador/a de la API · evaluador/a · registrador/a y portavoz | | | |
| «{{abpro AE4}}»<br>*Roles:* coordinador/a · responsable de preprocesamiento · responsable de métricas · evaluadores/as humanos · portavoz | | | |

### Parte 4 · Reflexión

Responde cada pregunta en 4 a 8 líneas, con ejemplos de tu trabajo:

1. ¿Qué decisión de arquitectura de tu asistente defenderías ante el jefe de soporte de Nube Sur, y cuál cambiarías si el chat recibiera diez veces más consultas?
2. ¿Qué error te costó más encontrar en el módulo (un 401, un JSON que no llegaba bien, una métrica que salía baja por el tokenizador, una pregunta mal emparejada)? Descríbelo como síntoma, causa, corrección y cómo comprobaste que quedó resuelto.
3. Compara tu primer prompt del asistente con el último. ¿Qué cambio tuvo más efecto y cómo lo sabes?
4. ¿Qué te mostraron tus métricas que tu impresión no te había mostrado? Da un ejemplo con números de `resultados.csv` o de `consumo.csv`.
5. En un proyecto real, con clientes reales, ¿qué harías distinto para cuidar las claves y los datos personales?

### Parte 5 · Tu plan de mejora

Elige los criterios (1.1 a 4.3) con menor nivel «Hoy» en la Parte 1. Si la mayor diferencia de la Parte 2 está en un componente de la competencia, anota también el criterio más relacionado con él: arquitectura → 1.2 o 1.3; mediante APIs → 2.2, 2.3 o 3.2; preprocesamiento de texto → 4.2; consumo eficiente → 3.3; evaluación de resultados → 4.3; entorno de desarrollo de software → 2.3. Para cada criterio, una acción concreta y un recurso del módulo.

| Criterio por mejorar (número) | Acción concreta | Recurso del módulo | Cuándo |
| --- | --- | --- | --- |
| *4.3* | *Recalcular ROUGE-L y BLEU de las seis preguntas con un tokenizador que no parta las palabras con tilde o ñ, el mismo para la referencia y la respuesta, y rehacer la recomendación* | *Lectura «Preparar y medir texto», sección de métricas; cápsula 4* | *Antes de publicar el portafolio* |
| | | | |
| | | | |
| | | | |

## 05 · Coevaluación por pares
- **Archivo:** M2-05-Coevaluacion-por-pares
- **Rótulo:** Evaluación y cierre del módulo · cierre
- **Momento:** Parte A: después de entregar la actividad final. Parte B: al cerrar cada ABPRO
- **Modalidad:** Parte A en parejas que asigna el tutor/a; Parte B dentro de cada equipo de ABPRO
- **Calificación:** No pones nota a tu compañero/a: el tutor/a valora la calidad de tu retroalimentación
- **Vínculo con el plan:** La competencia del módulo y los ABPRO de los cuatro aprendizajes esperados

### Para qué sirve

Revisar el trabajo de otra persona es parte del oficio de quien desarrolla software: en un equipo real, el código pasa por revisiones antes de llegar a producción. En esta coevaluación revisas la actividad final de un compañero/a (Parte A) y valoras el trabajo en equipo de tus compañeros/as en cada ABPRO (Parte B). Tus comentarios le sirven a quien los recibe para mejorar su portafolio, y revisar te ayuda a ver tu propio trabajo con otros ojos.

### Normas

- **Respeto.** Comentas el trabajo, no a la persona. Escribe como te gustaría que te escribieran.
- **Evidencia concreta.** Cada comentario apunta a algo que se puede revisar: un archivo, una línea, un commit, una fila de un CSV o una salida de `pytest`.
- **No copies soluciones.** No subas código de tu compañero/a a tu repositorio ni reescribas su trabajo: sugiere qué cambiar y por qué.
- **Claves y credenciales.** Nunca pidas, compartas ni uses claves ajenas. Para probar con la API usa tu propia clave, en tu propio `.env`. Si encuentras una clave en el repositorio de tu compañero/a, no la uses ni la copies: avísale en privado y avisa a tu tutor/a, para que tu compañero/a la revoque y cree una nueva.
- **Datos ficticios.** Trabaja solo con los insumos del curso; no agregues datos de personas o empresas reales en tus comentarios ni en tus pruebas.
- **Acuerdos.** Entrega tu revisión en la fecha que fije tu tutor/a: tu compañero/a la necesita para su portafolio.

### Parte A · Revisión cruzada de la actividad final

#### Pasos

1. Clona el repositorio de tu compañero/a en una carpeta nueva, crea un entorno virtual e instala sus dependencias (y el modelo de spaCy, si lo usa).
2. Antes de ejecutar nada, busca claves en el código y en todo el historial. Revisa cada coincidencia: puede haber falsos positivos. Confirma también que `.gitignore` incluye `.env` y que `.env.example` no tiene valores.
3. En una terminal donde no hayas definido `OPENAI_API_KEY` ni `HF_TOKEN`, ejecuta `pytest`: todas las pruebas deben pasar sin clave y sin conexión. Anota cuántas pasan.
4. Sigue las instrucciones del README tal como están escritas. ¿Te bastaron para instalar y ejecutar el asistente?
5. Lee `prompts.md`: el mensaje de sistema, los ejemplos del few-shot, la salida en JSON, la tabla de iteraciones y las pruebas de limitaciones.
6. Abre `resultados.csv` y `consumo.csv`. Comprueba que estén las seis preguntas y recalcula una fila (por ejemplo, el ROUGE-L de Q2) con tu propio `evaluar.py`. Compara tu valor con el suyo.
7. Si quieres probar el asistente con llamadas reales, hazlo con **tu** clave y ejecútalo con Q5 y con una paráfrasis de Q3. Usa el mismo proveedor y el mismo `MODELO_EMBEDDINGS` que indica su README, porque su `faq_embeddings.json` solo sirve con ese modelo. Si el README no lo dice, anótalo como mejora.
8. Completa la tabla y el cierre, y publícalos donde indique tu tutor/a.

Comandos de referencia, para Git Bash en Windows o la terminal en macOS o Linux (en PowerShell, `grep` no existe y el entorno se activa con `.venv\Scripts\activate`):

```text
git clone <enlace del repositorio de tu compañero/a> revision-par
cd revision-par
python -m venv .venv
# activa el entorno: source .venv/Scripts/activate en Git Bash (Windows), source .venv/bin/activate en macOS o Linux
pip install -r requirements.txt
python -m spacy download es_core_news_sm
git log -p --all | grep -n -i -E "sk-|hf_|api_key|bearer "
pytest
```

#### Tabla de revisión

| Componente de la competencia | Comprobación | Sí | En parte | No | Evidencia o comentario |
| --- | --- | :-: | :-: | :-: | --- |
| **{{competencia: implementar la arquitectura básica de una aplicación que integre modelos de IA}}** | | | | | |
| | El diagrama tiene los cinco componentes y su flujo numerado coincide con lo que hace el código | | | | |
| | La justificación usa escalabilidad, seguridad y mantenimiento con datos del caso, no en general | | | | |
| | La clave solo se lee en el servidor (`asistente.py` o el cliente), desde una variable de entorno | | | | |
| **{{competencia: mediante APIs}}** | | | | | |
| | Hay un GET y dos POST, con tiempo de espera, y la respuesta se lee después de revisar el código de estado; 401, 429, 5xx y tiempo agotado tienen un manejo distinto y un mensaje claro | | | | |
| | En `prompts.md`, el mensaje de sistema tiene rol, contexto y restricciones; los datos van delimitados; la salida JSON se valida con `json.loads`, y hay una versión zero-shot y una few-shot con dos ejemplos propios | | | | |
| | `pytest` pasa sin clave ni conexión, con cinco pruebas o más del cliente | | | | |
| **{{competencia: preprocesamiento de texto para consumo por modelos de lenguaje}}** | | | | | |
| | Q6 queda sin HTML ni ruido y con `[correo]`; "error 500" o datos parecidos se conservan | | | | |
| | Las etapas son funciones separadas y la búsqueda y la evaluación usan las mismas | | | | |
| | La tabla compara TF-IDF, CountVectorizer y embeddings, y el umbral se justifica con las similitudes | | | | |
| **{{competencia: garantizando el consumo eficiente}}** | | | | | |
| | `consumo.csv` registra los tokens de cada llamada, tomados de `usage` | | | | |
| | Los embeddings de las preguntas frecuentes se guardan y no se recalculan en cada consulta | | | | |
| | Las preguntas bajo el umbral no llaman al modelo de generación | | | | |
| **{{competencia: la evaluación de resultados}}** | | | | | |
| | `resultados.csv` tiene las seis preguntas con ROUGE-L, BLEU, coherencia y relevancia | | | | |
| | Al recalcular una fila obtuve un valor igual o muy parecido | | | | |
| | `prompts.md` registra tres o más iteraciones con su efecto y las pruebas de alucinación, wording y falta de control; los ajustes y la recomendación se apoyan en los números | | | | |
| **{{competencia: en un entorno de desarrollo de software}}** | | | | | |
| | El README me bastó para instalar y ejecutar | | | | |
| | No encontré claves en el código ni en el historial; `.env.example` no tiene valores | | | | |
| | Los commits muestran el avance del trabajo, con mensajes que se entienden | | | | |

#### Cierre de la revisión

Escribe tres líneas, cada una con evidencia:

- **Una fortaleza:** qué hizo bien y dónde se ve.
- **Una mejora:** qué cambiarías, en qué componente y por qué.
- **Un siguiente paso:** una acción concreta que tu compañero/a puede hacer antes de publicar su portafolio.

> *Ejemplo.* **Fortaleza:** tu `limpiar` reemplaza el correo de Q6 por `[correo]` y tiene una prueba que lo comprueba (`tests/test_preprocesar.py`). **Mejora:** en la evaluación de resultados, tu ROUGE-L de Q2 da 0,31 y a mí me da 0,62 con los mismos textos: parece que tokenizas la referencia con `split()` y la respuesta con spaCy, así que "XLSX." y "XLSX" o "Clientes," y "clientes" no cuentan como la misma palabra. **Siguiente paso:** usa la misma función de tokenización para las dos, recalcula la tabla y revisa si tu recomendación cambia.

### Parte B · Trabajo en equipo en los ABPRO

Al cerrar cada ABPRO, valoras el trabajo de cada compañero/a de tu equipo. Los cuatro ABPRO del módulo son:

1. {{abpro AE1}}
2. {{abpro AE2}}
3. {{abpro AE3}}
4. {{abpro AE4}}

Completa una tabla como esta por cada ABPRO. Escala: 1 = no se observa; 2 = se observa a veces; 3 = se observa casi siempre; 4 = se observa siempre y el equipo se beneficia de ello.

| Criterio | Compañero/a 1 | Compañero/a 2 | Compañero/a 3 | Compañero/a 4 |
| --- | :-: | :-: | :-: | :-: |
| Nombre y rol en este ABPRO | | | | |
| Cumple su rol (por ejemplo, el responsable de pruebas deja las pruebas funcionando sin conexión) | | | | |
| Aporta ideas y soluciones | | | | |
| Respeta los acuerdos y los plazos del equipo | | | | |
| Se comunica con respeto, también cuando no está de acuerdo | | | | |
| Ayuda a encontrar y corregir errores (por ejemplo, revisa un pull request o detecta un JSON inválido) | | | | |
| Comentario (obligatorio si pusiste 1 o 2 en algún criterio) | | | | |

### Qué hace el tutor/a con la coevaluación

- **Modera.** Revisa que cada comentario sea respetuoso y se apoye en evidencia; devuelve para corregir los que no cumplan, antes de que lleguen a su destinatario/a.
- **Valora tu retroalimentación, no el trabajo de tu compañero/a.** Tu revisión no cambia la nota de nadie. El tutor/a mira si tus comentarios son específicos (apuntan a un archivo, una línea o una fila), si se apoyan en lo que ejecutaste o recalculaste, si son accionables (dicen qué hacer) y si son respetuosos.
- **Consolida la Parte B.** Promedia los niveles que recibió cada integrante en cada criterio y le devuelve un resumen sin los nombres de quienes evaluaron. Si en un equipo aparecen diferencias fuertes, conversa con el equipo.
- **Cierra el ciclo.** Tú usas la coevaluación que recibiste en el cierre de tu portafolio: qué comentario recibiste y qué cambiaste por él.

## 06 · Evaluación final del portafolio
- **Archivo:** M2-06-Evaluacion-final-portafolio
- **Rótulo:** Evaluación y cierre del módulo · cierre
- **Momento:** Al cierre, después de la actividad final, la autoevaluación y la coevaluación
- **Modalidad:** Individual, publicado en la web con un enlace que se abre sin iniciar sesión: un repositorio de GitHub con su página en GitHub Pages
- **Calificación:** Rúbrica de 32 puntos, exigencia 60 %
- **Vínculo con el plan:** Los cuatro aprendizajes esperados y la competencia del módulo

### Qué es tu portafolio del módulo 2

Tu portafolio del módulo 2 se llama **«Aplicaciones con IA para Nube Sur»**. Reúne, en un solo sitio publicado, las evidencias de lo que aprendiste: el ABP y el ABPRO de cada aprendizaje esperado y la actividad final integradora, el asistente de preguntas frecuentes de Nube Sur, con tu reflexión sobre cada uno.

Está pensado para dos lectores: tu tutor/a, que lo evalúa con la rúbrica de este documento, y una persona que podría contratarte, que debe poder ver de un vistazo qué sabes hacer con modelos de IA, APIs, prompts y texto. Por eso cada evidencia enlaza al trabajo real (el repositorio, el PDF, el notebook, el CSV) y no solo lo describe.

### Cómo se organiza

El portafolio tiene seis elementos.

#### 1 · Índice o guía

Una tabla al comienzo que diga, para cada sección, qué tipo de trabajo es, qué evidencia la sostiene y con qué estrategia didáctica se hizo. Puedes partir de esta:

| Sección | Tipo de trabajo | Evidencia | Estrategia didáctica |
| --- | --- | --- | --- |
| Introducción | Reflexión inicial | Punto de partida de la evaluación diagnóstica | Metacognición |
| Aprendizaje esperado 1 | Análisis y diseño | ABP «{{abp AE1}}» y ABPRO «{{abpro AE1}}» | Aprendizaje basado en problemas (individual) y en proyectos (en equipo) |
| Aprendizaje esperado 2 | Producto técnico: código y pruebas | ABP «{{abp AE2}}» y ABPRO «{{abpro AE2}}» | Aprendizaje basado en problemas y en proyectos |
| Aprendizaje esperado 3 | Experimentación con prompts | ABP «{{abp AE3}}» y ABPRO «{{abpro AE3}}» | Aprendizaje basado en problemas y en proyectos, con torneo |
| Aprendizaje esperado 4 | Producto técnico y análisis de métricas | ABP «{{abp AE4}}» y ABPRO «{{abpro AE4}}» | Aprendizaje basado en problemas y en proyectos |
| Integración | Proyecto individual | Actividad final: el asistente de preguntas frecuentes de Nube Sur | Proyecto integrador |
| Cierre | Síntesis | Autoevaluación, coevaluación recibida y próximo paso | Metacognición y retroalimentación entre pares |

#### 2 · Introducción

En media página: tu **intención** (qué querías lograr en el módulo y para qué te sirve en tu trabajo como desarrollador o desarrolladora), tus **objetivos** (los cuatro aprendizajes en tus palabras y uno que te propusiste profundizar) y tu **punto de partida**: tus aciertos por contenido en la Parte A de la evaluación diagnóstica y tus niveles de la Parte B.

#### 3 · Evidencias por aprendizaje esperado

Una subsección por aprendizaje esperado. Cada una lleva el aprendizaje con las palabras del plan, sus criterios de evaluación por número, la evidencia mínima enlazada (su ABP y su ABPRO) y una explicación tuya de 5 a 10 líneas: qué hiciste, qué decidiste y por qué, qué criterio demuestra cada evidencia y, en el ABPRO, cuál fue tu rol.

##### Aprendizaje esperado 1

> {{AE1}}

**Criterios de evaluación:** 1.1, 1.2 y 1.3.
**Evidencia mínima:** el ABP «{{abp AE1}}» (la tabla de clasificación de las necesidades de Rumbo Norte, el diagrama y la elección de arquitectura) y el ABPRO «{{abpro AE1}}» (el diagrama numerado de la plataforma de soporte, la tabla comparativa y el registro de decisión del equipo).
**En tu explicación:** qué criterio pesó más en la arquitectura que eligieron y qué riesgo aceptaron.

##### Aprendizaje esperado 2

> {{AE2}}

**Criterios de evaluación:** 2.1, 2.2 y 2.3.
**Evidencia mínima:** el ABP «{{abp AE2}}» (la tabla de endpoints con la documentación oficial, el diagnóstico de la función de Letras Claras, `embeddings_cliente.py` y sus pruebas) y el ABPRO «{{abpro AE2}}» (el paquete `nubesur_ia`, la salida de `pytest`, la demostración con los dos proveedores y la revisión de código).
**En tu explicación:** qué problema de la función original era el más grave y qué cambia al pasar de un proveedor a otro.

##### Aprendizaje esperado 3

> {{AE3}}

**Criterios de evaluación:** 3.1, 3.2 y 3.3.
**Evidencia mínima:** el ABP «{{abp AE3}}» (los tres prompts para Equipo Uno con su estrategia, las salidas con dos temperaturas y la tabla de iteraciones) y el ABPRO «{{abpro AE3}}» (los prompts zero-shot, few-shot y final, la planilla de aciertos y la bitácora de iteraciones del torneo).
**En tu explicación:** qué estrategia elegiste para cada tarea y qué iteración ganó más aciertos.

##### Aprendizaje esperado 4

> {{AE4}}

**Criterios de evaluación:** 4.1, 4.2 y 4.3.
**Evidencia mínima:** el ABP «{{abp AE4}}» (`preprocesamiento.py`, las métricas de los resúmenes de Casa Verde y `evaluacion.csv`) y el ABPRO «{{abpro AE4}}» (el protocolo, el pipeline, `evaluacion_piloto.csv`, el análisis de fallas y la recomendación del equipo).
**En tu explicación:** qué falla no detectaron las métricas automáticas y qué ajuste propusieron con números.

#### 4 · Integración

La actividad final es la evidencia de la competencia del módulo:

> {{competencia}}.

Presenta el asistente de preguntas frecuentes de Nube Sur: el enlace a su repositorio, el diagrama, la tabla de resultados y tu recomendación. Luego muestra cómo se conectan las partes del módulo con una tabla como esta:

| Pieza del asistente | Dónde la aprendiste | Qué cambiaste al integrarla |
| --- | --- | --- |
| Arquitectura y vector store | ABP y ABPRO del aprendizaje esperado 1 | |
| Cliente de la API | ABP y ABPRO del aprendizaje esperado 2 | |
| Prompt con salida en JSON | ABP y ABPRO del aprendizaje esperado 3 | |
| Limpieza, búsqueda y métricas | ABP y ABPRO del aprendizaje esperado 4 | |

#### 5 · Cierre

- **Tu avance:** tu autoevaluación comparada con la diagnóstica, por aprendizaje esperado (promedio «Al inicio» y promedio «Hoy»), con el cambio más grande y el que menos avanzó.
- **La retroalimentación que recibiste:** qué te dijeron tu compañero/a en la coevaluación y tu tutor/a en la devolución de la actividad final, y qué cambiaste por eso (con el enlace al commit o a la versión nueva).
- **Tu próximo paso:** qué le agregarías al asistente en los módulos siguientes del plan, por ejemplo lo que verás en «Orquestación de flujos y agentes mediante frameworks» o en «Recuperación aumentada por generación y almacenamiento vectorial», y por qué.

#### 6 · Publicación y cuidado de datos

1. Crea un repositorio público, por ejemplo `portafolio-m2`, con una portada `index.md` que contenga los seis elementos.
2. En GitHub, en **Settings → Pages**, elige como fuente *Deploy from a branch*, la rama `main` y la carpeta raíz. La dirección queda como `https://<tu-usuario>.github.io/portafolio-m2/`.
3. Casi todos los ABP y ABPRO se entregaron como PDF o archivos en una Tarea del LMS, que solo se abre iniciando sesión. Sube esos PDF y archivos a una carpeta `evidencias/` del repositorio del portafolio, sin claves y quitando los nombres de tus compañeros/as (o dejándolos solo con su acuerdo), y enlázalos desde la portada. Enlaza como repositorio el del equipo en el ABPRO «{{abpro AE2}}», indicando tu rol, y el de la actividad final; si alguno es privado, hazlo público antes de publicar el portafolio, después de revisar que no tenga claves.
4. Abre la dirección en una ventana privada del navegador para comprobar que se ve sin iniciar sesión.

Cuidado de datos: ninguna clave, token ni archivo `.env` en el sitio, en los repositorios enlazados, en su historial ni en las capturas; solo datos ficticios; nombra a tus compañeros/as solo con su acuerdo o por su rol; y si alguna clave se publicó en algún momento, revócala antes de entregar el enlace.

### Rúbrica de evaluación final

| Criterio | 4 · Logrado | 3 · Mayormente logrado | 2 · Parcialmente logrado | 1 · No logrado |
| --- | --- | --- | --- | --- |
| **1. Organización y completitud** | Los seis elementos están presentes y desarrollados; el índice indica tipo de trabajo, evidencia y estrategia didáctica de cada sección, y todos los enlaces funcionan | Los seis elementos están, pero uno está poco desarrollado o hay un enlace roto | Falta un elemento o dos están poco desarrollados; el índice no orienta | Faltan dos o más elementos, o el portafolio no se abre sin iniciar sesión |
| **2. Evidencias del aprendizaje esperado 1** (criterios 1.1, 1.2 y 1.3) | ABP y ABPRO enlazados; la clasificación acierta tipo de IA, familia de modelo y caso de uso; el diagrama tiene los cinco componentes, el flujo numerado y dónde vive la clave; la arquitectura se justifica con dos criterios | Ambas evidencias, con un error menor en la clasificación o una justificación con un solo criterio | Falta una evidencia, o el diagrama omite componentes o no dice dónde vive la clave | Sin evidencias, o no corresponden a una aplicación con IA generativa |
| **3. Evidencias del aprendizaje esperado 2** (criterios 2.1, 2.2 y 2.3) | La tabla de endpoints cita la documentación oficial; hay GET y POST autenticados con variables de entorno y con manejo de errores; clase o paquete con docstrings y pruebas que pasan sin conexión, con su captura | Código y pruebas correctos, con la tabla de endpoints incompleta o sin enlaces a la documentación | El código solo funciona con la clave escrita en un archivo, o no tiene pruebas ni docstrings | Sin código que funcione |
| **4. Evidencias del aprendizaje esperado 3** (criterios 3.1, 3.2 y 3.3) | Explica zero-shot y few-shot con una ventaja y una limitación de cada uno; los prompts tienen rol, contexto, formato y restricciones; tres o más iteraciones registradas con cambio, motivo y efecto medido; compara temperature y analiza la sensibilidad | Prompts bien construidos, con menos de tres iteraciones o sin comparar temperature | Una sola estrategia, o prompts sin formato ni restricciones | Sin prompts ni registro |
| **5. Evidencias del aprendizaje esperado 4** (criterios 4.1, 4.2 y 4.3) | Define token, lema, stopword y n-grama con ejemplos propios; el pipeline tiene funciones reutilizables por etapa aplicadas al corpus; ROUGE, BLEU, coherencia y relevancia bien calculados y registrados según un protocolo; ajustes apoyados en los números | Pipeline y métricas correctos, con registro incompleto o sin ajustes justificados | Limpieza parcial (queda HTML, ruido o datos personales) o métricas mal calculadas | Sin pipeline ni métricas |
| **6. Integración** (competencia del módulo) | Presenta el asistente completo (repositorio, diagrama, resultados y recomendación) y explica con ejemplos qué aportó a él cada parte del módulo y qué cambió al integrarla | Presenta el asistente completo, pero la conexión con el resto del módulo es general | El asistente está incompleto o sin relación con las demás evidencias | No incluye la actividad final |
| **7. Reflexión y uso de la retroalimentación** | La introducción parte de la diagnóstica; el cierre compara «Al inicio» y «Hoy», cita la coevaluación y la devolución recibidas, muestra qué cambió por ellas (commit o versión) y propone un próximo paso concreto | Compara con la diagnóstica y menciona la retroalimentación, sin mostrar qué cambió | Reflexión general, sin comparación ni retroalimentación | Sin introducción ni cierre |
| **8. Comunicación profesional y cuidado de datos** | Redacción clara y sin errores, pensada para un empleador; los README permiten ejecutar cada proyecto; solo datos ficticios; ninguna clave en el sitio, los repositorios, el historial ni las capturas | Redacción clara con errores menores o un README incompleto; sin claves ni datos personales | Textos desordenados, o capturas con correos o datos de compañeros/as | Una clave o un token visible en cualquier parte del portafolio o de su historial |

### Puntaje y nota

Cada criterio se puntúa de 1 a 4; el puntaje máximo es 32. Con exigencia de 60 %: si tu puntaje *p* es 19,2 o más, nota = 4,0 + 3 × (*p* − 19,2) / 12,8; si es menor, nota = 1,0 + 3 × *p* / 19,2. Se redondea a un decimal. Por ejemplo, 32 puntos dan un 7,0; 26 puntos, un 5,6; 20 puntos, un 4,2, y 16 puntos, un 3,5.

### Antes de publicar

- [ ] El enlace se abre en una ventana privada, sin iniciar sesión.
- [ ] Están los seis elementos, y el índice dice tipo de trabajo, evidencia y estrategia de cada sección.
- [ ] La introducción parte de tus resultados de la evaluación diagnóstica.
- [ ] Cada aprendizaje esperado tiene su texto del plan, sus números de criterio, su ABP y su ABPRO enlazados y tu explicación de 5 a 10 líneas.
- [ ] La actividad final enlaza a su repositorio y muestra el diagrama, la tabla de resultados y tu recomendación.
- [ ] El cierre compara tu autoevaluación con la diagnóstica y dice qué cambiaste por la coevaluación y la devolución.
- [ ] Revisaste el código y el historial de cada repositorio enlazado: ninguna clave ni token, `.env` en `.gitignore` y `.env.example` sin valores.
- [ ] Solo hay datos ficticios; tus compañeros/as aparecen solo con su acuerdo o por su rol.
- [ ] Todos los enlaces funcionan y la redacción está revisada.
- [ ] Entregaste el enlace en la Tarea del LMS.
