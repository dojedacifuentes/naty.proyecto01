# PF1822 · Módulo 2 · ABP y ABPRO por aprendizaje esperado

**Estado:** borrador · **Va en:** LMS, una Tarea por actividad · **Pedido:** usuario, 2026-09-29
Por cada aprendizaje esperado del módulo 2 hay dos actividades, según el molde del V0 de PF1474:
un **ABP** (aprendizaje basado en problemas), individual, y un **ABPRO**
(aprendizaje basado en proyectos), grupal, con roles
rotativos. Los ABPRO siguen un caso único que crece de un aprendizaje al siguiente: la mesa de
ayuda de Nube Sur, la misma del resto del módulo. Los ABP usan problemas breves de otras
empresas ficticias para que el participante transfiera lo aprendido a un contexto nuevo.

Solo va el enunciado para el participante (decisión del usuario). No repite el proyecto
"Asistente de preguntas frecuentes" (instrumento 2) ni las actividades 1 y 2 del Anexo (C2).

`npm run abp` genera un HTML por actividad en `modulo-2/PF1822-desarrollo-con-ia/entrega/abp-abpro/`,
listo para convertir en Google Docs o pegar en la descripción de una Tarea de Moodle.

---

## AE1 · ABP · ¿Qué modelo para qué necesidad?

- **Modalidad:** Individual.
- **Criterios de evaluación:** 1.1, 1.2, 1.3

### Contexto

La agencia de viajes Rumbo Norte (empresa ficticia) quiere usar inteligencia artificial y su
gerenta hizo esta lista de necesidades:

| # | Necesidad |
| --: | --- |
| 1 | Redactar la descripción de cada paquete turístico a partir de su ficha técnica. |
| 2 | Crear imágenes para la publicidad de cada destino. |
| 3 | Generar la locución de los videos promocionales a partir de un guion escrito. |
| 4 | Responder en el chat de la web preguntas sobre las condiciones de cada paquete, usando los documentos oficiales de la agencia. |
| 5 | Calcular el precio final de un paquete con impuestos y descuentos. |
| 6 | Resumir las reseñas que dejan los clientes de cada destino. |

### Qué tienes que hacer

1. **Clasifica (criterio 1.1).** Completa esta tabla para cada necesidad:

| # | Tipo de IA generativa (texto, imagen, audio o video) | Tipo de modelo (autorregresivo, de difusión o basado en transformers) | Caso de uso | Tecnología o librería que usarías |
| --: | --- | --- | --- | --- |

2. **¿IA generativa o reglas?** Una de las seis necesidades se resuelve mejor con un programa
   basado en reglas que con IA generativa. Indica cuál y explica en 3 a 5 líneas la diferencia
   entre ambos enfoques con este ejemplo.
3. **Diagrama (criterio 1.2).** Dibuja el diagrama funcional de la necesidad 4 con estos
   componentes: cliente, servidor API, modelo de IA, módulo de preprocesamiento y base de datos
   o *vector store*. Numera el flujo de datos de principio a fin y explica en una línea la
   función de cada componente. Indica dónde se guarda la clave de la API.
4. **Elige la arquitectura (criterio 1.3).** La necesidad 1 se ejecuta una vez al mes sobre 300
   paquetes nuevos; la necesidad 4 responde en vivo a cientos de clientes al día. Para cada
   una, elige entre una arquitectura *request–response* y un *pipeline*, y justifica tu
   elección con dos criterios: escalabilidad, seguridad o mantenimiento.

### Entrega

Sube a esta Tarea un documento PDF con la tabla, tu respuesta al punto 2, el diagrama (imagen o
Mermaid) con su explicación y tu elección de arquitectura justificada.

## AE1 · ABPRO · La arquitectura de la plataforma de soporte

- **Modalidad:** Grupal, de 4 a 5 personas.
- **Criterios de evaluación:** 1.1, 1.2, 1.3

### Contexto

Nube Sur (empresa ficticia) vende software de gestión a pymes y tiene una mesa de ayuda que
atiende a sus clientes por correo, formulario web y chat.

### Problema

La mesa de ayuda recibe unos 5.000 tickets al día. Los agentes pierden tiempo leyendo tickets
largos, la prioridad se asigna a ojo y, cuando hay una caída del servicio, llegan cientos de
tickets sobre el mismo problema que se atienden uno por uno.

### Solución

Una plataforma que use modelos generativos para tres funciones: **resumir** cada ticket,
**clasificarlo** por categoría y prioridad, y **agrupar los tickets duplicados** comparando sus
embeddings en un *vector store*. En este aprendizaje esperado el equipo diseña su
arquitectura; en los siguientes la irá construyendo por partes.

### Desarrollo

1. **Modelos y casos de uso (criterio 1.1).** Para cada una de las tres funciones, indiquen el
   tipo de modelo generativo que usarían, el caso de uso al que corresponde (por ejemplo,
   *summarization*) y por qué.
2. **Diagrama funcional (criterio 1.2).** Dibujen la arquitectura completa con cliente,
   servidor API, modelo de IA, módulo de preprocesamiento y base de datos o *vector store*.
   Numeren el flujo de datos de un ticket, desde que llega hasta que el agente ve su resumen,
   su prioridad y sus duplicados. Marquen dónde se guardan las claves de las APIs.
3. **Dos alternativas (criterio 1.3).** Comparen en una tabla dos arquitecturas:
   - **A:** el servidor llama al modelo en el momento en que llega cada ticket
     (*request–response*);
   - **B:** los tickets entran a una cola y un *pipeline* los procesa por lotes cada pocos
     minutos.

   Evalúen cada una en escalabilidad, seguridad (los tickets traen datos personales de
   clientes), mantenimiento y costo.
4. **Registro de decisión.** Escriban en media página la decisión del equipo: qué arquitectura
   eligen, por qué, qué riesgo aceptan y cómo lo mitigarían.
5. **Tecnologías.** Asignen a cada componente una tecnología o librería concreta (por ejemplo,
   OpenAI API, Hugging Face Transformers o LangChain) y justifiquen dos de ellas.
6. **Comité de seguridad.** Otro equipo actúa como comité de
   seguridad y les hace dos preguntas sobre el manejo de datos personales y claves. El
   portavoz responde.

### Roles del equipo

Cada integrante asume un rol, que rota en el ABPRO de cada aprendizaje esperado:

- **Coordinador/a:** cuida el tiempo y que todos participen.
- **Arquitecto/a:** conduce el diagrama funcional.
- **Responsable de seguridad y datos:** revisa el manejo de claves y datos personales.
- **Analista de tecnologías:** conduce la elección de modelos y librerías.
- **Documentador/a y portavoz:** redacta la entrega y responde al comité.

### Entrega

Una entrega por equipo en esta Tarea: un PDF con la tabla de modelos y casos de uso, el
diagrama numerado, la tabla comparativa, el registro de decisión, las tecnologías elegidas y
los nombres de los integrantes con su rol.

## AE2 · ABP · La función que nadie quiere tocar

- **Modalidad:** Individual.
- **Criterios de evaluación:** 2.1, 2.2, 2.3

### Contexto

En la startup Letras Claras (empresa ficticia), un desarrollador que ya no trabaja ahí dejó
esta función para obtener embeddings de textos. Funciona a veces, nadie entiende bien por qué
falla y nadie quiere tocarla:

```python
import requests

def emb(t):
    r = requests.post("https://api.openai.com/v1/embeddings",
        headers={"Authorization": "pega-aqui-tu-clave"},
        json={"model": "text-embedding-3-small", "input": t})
    return r.json()["data"][0]["embedding"]
```

### Qué tienes que hacer

1. **Lee la documentación (criterio 2.1).** Con la documentación oficial de OpenAI y de
   Hugging Face, completa esta tabla y cita la página de cada dato:

| | OpenAI · generación | OpenAI · embeddings | Hugging Face · generación | Hugging Face · embeddings |
| --- | --- | --- | --- | --- |
| URL del endpoint | | | | |
| Método HTTP | | | | |
| Cómo se autentica | | | | |
| Campos obligatorios del cuerpo | | | | |
| Dónde viene el resultado en la respuesta | | | | |

2. **Diagnostica.** Encuentra al menos **cinco** problemas de la función. Para cada uno, explica
   qué puede salir mal. Considera la seguridad, la autenticación, los errores, los tiempos de
   espera y qué pasa si recibe una lista de textos.
3. **Reescribe (criterio 2.2).** Crea el módulo `embeddings_cliente.py` con:
   - `listar_modelos()`, que haga una solicitud **GET** y devuelva los identificadores de los
     modelos disponibles;
   - `obtener_embeddings(textos, modelo=None, timeout=30)`, que haga una solicitud **POST** y
     devuelva un vector por texto, en el mismo orden.

   Ambas leen la clave desde la variable de entorno `OPENAI_API_KEY` y el modelo desde
   `MODELO_EMBEDDINGS`, e informan los errores HTTP con un mensaje claro que incluya el código
   de estado.
4. **Documenta y prueba (criterio 2.3).** Escribe docstrings para ambas funciones y el archivo
   `test_embeddings_cliente.py` con al menos **tres pruebas unitarias** que se ejecuten sin
   conexión, simulando la API con `unittest.mock`:
   - devuelve tantos vectores como textos recibe;
   - un error 401 produce un mensaje claro;
   - la solicitud lleva la clave de la variable de entorno en el encabezado correcto.

### Entrega

Sube a esta Tarea la tabla del punto 1, tu diagnóstico, los dos archivos `.py` y una captura de
la salida de `pytest`. Tu clave **no** puede aparecer en ningún archivo ni captura.

## AE2 · ABPRO · Un cliente, dos proveedores

- **Modalidad:** Grupal, de 4 a 5 personas.
- **Criterios de evaluación:** 2.1, 2.2, 2.3

### Contexto

El equipo ya diseñó la arquitectura de la plataforma de soporte de Nube Sur. Ahora toca
programar la pieza que conversa con los modelos.

### Problema

Nube Sur no quiere depender de un solo proveedor de modelos: el mes pasado otra empresa del
rubro quedó sin servicio un día entero por una caída de su proveedor. Además, cada
desarrollador escribe sus propias llamadas a la API, con claves copiadas en el código y sin
manejo de errores.

### Solución

Un paquete de Python, `nubesur_ia`, con una misma interfaz para generar texto y obtener
embeddings con OpenAI o con Hugging Face. Para cambiar de proveedor basta con cambiar una
variable de entorno.

### Desarrollo

1. **Documentación (criterio 2.1).** Revisen la documentación oficial de ambos proveedores y
   escriban en el `README.md` una tabla con los endpoints de generación y de embeddings de
   cada uno: URL, método, autenticación, cuerpo de la solicitud y ubicación del resultado.
2. **Interfaz común.** Definan una clase base `Proveedor` con dos métodos:
   `generar(mensajes, temperature=0.2, max_tokens=200)`, que devuelve el texto y los tokens
   usados, y `embeddings(textos)`, que devuelve una lista de vectores.
3. **Implementación (criterio 2.2).** Programen `ProveedorOpenAI` y `ProveedorHuggingFace` con
   `requests` o `httpx`. Cada uno lee su clave desde una variable de entorno (`OPENAI_API_KEY`
   y `HF_TOKEN`), usa un tiempo de espera y maneja con un mensaje claro los errores 401 y 429
   y los tiempos de espera agotados.
4. **Selección del proveedor.** Una función `crear_cliente()` devuelve el proveedor indicado en
   la variable de entorno `PROVEEDOR_IA` (`openai` o `huggingface`).
5. **Pruebas y docstrings (criterio 2.3).** Documenten cada clase y método con docstrings y
   escriban al menos **cuatro pruebas unitarias** que se ejecuten sin conexión, con la API
   simulada: una respuesta correcta de cada proveedor, un error 401 y un error 429.
6. **Revisión de código.** Cada integrante revisa el código de otro (por *pull request* o con
   comentarios) y deja al menos una sugerencia. Registren qué cambios se aceptaron.
7. **Demostración.** Envíen el mismo mensaje con los dos proveedores y comparen la respuesta y
   los tokens usados.

### Roles del equipo

Roten los roles respecto del ABPRO anterior:

- **Coordinador/a:** integra el código en el repositorio y cuida el tiempo.
- **Responsable de OpenAI:** programa `ProveedorOpenAI`.
- **Responsable de Hugging Face:** programa `ProveedorHuggingFace`.
- **Responsable de pruebas:** escribe las pruebas unitarias y las simulaciones.
- **Documentador/a y portavoz:** escribe el `README.md` y presenta la demostración.

### Entrega

Una entrega por equipo en esta Tarea:
- el enlace al repositorio (GitHub o equivalente) con el paquete, las pruebas y el `README.md`;
- una captura de la salida de `pytest`;
- la comparación de la demostración;
- el registro de la revisión de código;
- los nombres de los integrantes con su rol.

Ninguna clave puede aparecer en el repositorio: usen un archivo `.env` fuera del control de
versiones y un `.env.example` sin valores.

## AE3 · ABP · Tres tareas, tres prompts

- **Modalidad:** Individual.
- **Criterios de evaluación:** 3.1, 3.2, 3.3

### Contexto

La consultora de personas Equipo Uno (empresa ficticia) quiere usar un modelo de lenguaje para
tres tareas que hoy le toman horas. Te pide los prompts.

**Tarea A · Resumen.** Resumir esta política para el diario mural:

> A partir del 1 de noviembre, las personas que trabajan en la oficina central podrán trabajar
> a distancia hasta dos días por semana, previo acuerdo con su jefatura. Los días a distancia
> deben registrarse en el sistema de asistencia antes de las 9:00. No aplica a los equipos de
> recepción y de soporte en terreno. La empresa entregará un bono único de $40.000 para
> implementar el puesto de trabajo en casa. La jefatura podrá suspender el beneficio si no se
> cumplen los compromisos acordados.

**Tarea B · Código.** Generar en Python la función `validar_rut(rut: str) -> bool`, que valida
un RUT chileno con su dígito verificador (módulo 11). Debe aceptar el RUT con o sin puntos y
con guion.

**Tarea C · Reformulación.** Reescribir en un tono cordial y profesional, sin perder ningún
dato, correos como este:

> Te dije que mandaras los contratos el lunes. Estamos a jueves y no ha llegado nada. Los
> necesito mañana a las 12 sin falta.

### Qué tienes que hacer

1. **Qué es un prompt (criterio 3.1).** Explica en 5 a 8 líneas la función de un prompt, la
   diferencia entre *zero-shot* y *few-shot*, y una ventaja y una limitación de cada estrategia.
2. **Escribe los prompts (criterio 3.2).** Para cada tarea, elige la estrategia más adecuada y
   justifícala en una línea. Cada prompt debe tener rol, contexto, tarea, formato de salida y
   restricciones. Formatos pedidos:
   - A: tres viñetas de máximo 20 palabras cada una;
   - B: solo un bloque de código con la función, su docstring y tres `assert`;
   - C: solo el correo reescrito.
3. **Prueba con parámetros.** Ejecuta cada prompt con `temperature` 0,2 y 0,9, con el mismo
   `max_tokens`. Registra las salidas y describe en 2 líneas qué cambió.
4. **Comprueba el código.** Ejecuta la función de la tarea B con estos casos: `11.111.111-1` y
   `12345678-5` son válidos; `15.000.005-K` es válido; `12.345.678-K` no es válido. Anota si
   pasó cada caso.
5. **Itera (criterio 3.3).** Toma la salida más débil de las tres tareas y mejora su prompt al
   menos dos veces. Registra en una tabla cada versión: qué cambiaste, por qué, y qué efecto
   tuvo en claridad, estructura o control del comportamiento del modelo.

### Entrega

Sube a esta Tarea un documento con tu explicación, los tres prompts con su justificación, las
salidas con ambas temperaturas, el resultado de las pruebas de `validar_rut` y la tabla de
iteraciones.

## AE3 · ABPRO · Torneo de clasificación de tickets

- **Modalidad:** Grupal, de 4 a 5 personas.
- **Criterios de evaluación:** 3.1, 3.2, 3.3

### Contexto

La plataforma de soporte de Nube Sur ya tiene un cliente que conversa con los modelos. Ahora
necesita el prompt que clasifica cada ticket.

### Problema

Hoy cada agente clasifica los tickets a su criterio: el mismo problema queda como "acceso" para
uno y como "consulta" para otro, y los urgentes se pierden entre los demás. El sistema de
tickets solo acepta la clasificación en JSON.

### Solución

Un prompt que clasifique cada ticket por **categoría** (acceso, facturación, rendimiento,
consulta o interfaz) y **prioridad** (alta, media o baja), y responda solo en JSON:
`{"categoria": "...", "prioridad": "..."}`. Criterio de prioridad: **alta** si afecta a muchos
usuarios o detiene la operación; **media** si bloquea a una persona; **baja** si es una
consulta o una molestia que no impide trabajar.

### Desarrollo

**Insumos:** estos diez tickets, con la clasificación correcta según el jefe de soporte. El
prompt no debe incluirlos como ejemplos.

| # | Ticket | Categoría | Prioridad |
| --: | --- | --- | --- |
| 1 | No me llega el correo para restablecer mi contraseña y no puedo entrar al portal. | acceso | media |
| 2 | Desde las 10:00 ninguna sucursal puede emitir boletas; el sistema dice "servicio no disponible". | facturación | alta |
| 3 | El panel de reportes tarda más de un minuto en cargar desde la actualización del martes. | rendimiento | media |
| 4 | ¿Cómo agrego a un usuario nuevo con permisos de solo lectura? | consulta | baja |
| 5 | En la pantalla de clientes, el botón Exportar queda tapado por el menú en pantallas pequeñas. | interfaz | baja |
| 6 | Me cobraron dos veces la suscripción de septiembre. | facturación | media |
| 7 | Todos los usuarios de la empresa quedaron bloqueados después de activar la verificación en dos pasos. | acceso | alta |
| 8 | La búsqueda de productos demora 20 segundos en horario punta para todos los vendedores. | rendimiento | alta |
| 9 | ¿Me pueden enviar la factura de agosto con la razón social actualizada? | facturación | baja |
| 10 | El calendario muestra los meses en inglés aunque elegí español. | interfaz | baja |

1. **Prompt zero-shot (criterios 3.1 y 3.2).** Escriban un prompt con rol, definición de cada
   categoría y prioridad, formato JSON y restricciones.
2. **Prompt few-shot.** Escriban una segunda versión con tres ejemplos propios, que no estén en
   la tabla.
3. **Medición.** Ejecuten ambos prompts sobre los diez tickets con `temperature` 0 y registren
   en una planilla: aciertos de categoría, aciertos de prioridad y cuántas respuestas son JSON
   válido (compruébenlo con `json.loads`).
4. **Iteración (criterio 3.3).** Hagan al menos tres rondas de mejora sobre el mejor prompt.
   Registren en cada ronda qué cambiaron, por qué, y cuántos aciertos ganaron o perdieron.
5. **Sensibilidad.** Con el mejor prompt, prueben `temperature` 1,0 y cambien una palabra de un
   ticket (por ejemplo, "todos" por "algunos" en el ticket 7). Describan qué cambió y qué
   limitación del modelo muestra.
6. **Tablero del torneo.** Cada equipo publica en el foro del LMS sus aciertos totales (de 20)
   y la cantidad de tokens de su prompt. Gana el equipo con más aciertos; en caso de empate,
   el prompt más corto. El tutor entrega la insignia **Mejor bitácora de iteraciones** al
   equipo que mejor explique sus cambios.

### Roles del equipo

Roten los roles respecto del ABPRO anterior:

- **Coordinador/a:** cuida el tiempo y publica en el tablero.
- **Diseñador/a de prompts:** redacta las versiones del prompt.
- **Operador/a de la API:** ejecuta los prompts con el cliente `nubesur_ia`.
- **Evaluador/a:** compara las respuestas con la clasificación correcta.
- **Registrador/a y portavoz:** lleva la bitácora de iteraciones y presenta los resultados.

### Entrega

Una entrega por equipo en esta Tarea:
- el prompt zero-shot, el few-shot y la versión final;
- la planilla con los resultados de cada versión;
- la bitácora de iteraciones y el análisis de sensibilidad;
- los nombres de los integrantes con su rol.

## AE4 · ABP · Limpia antes de medir

- **Modalidad:** Individual.
- **Criterios de evaluación:** 4.1, 4.2, 4.3

### Contexto

La tienda de decoración Casa Verde (empresa ficticia) usa un modelo de lenguaje para resumir
las reseñas de sus clientes. Antes de confiar en los resúmenes quiere dos cosas: que las
reseñas lleguen limpias al modelo y una forma de medir si un resumen es bueno.

### Insumos

Las cinco reseñas, tal como llegan desde la web:

```text
R1: <p>¡¡Me ENCANTÓ la lámpara!! Llegó en 2 días 😍</p><br>Muy buena calidad
R2: El envío se demoró 10 días y la caja llegó rota. Pésima experiencia 😡 https://casaverde.test/pedido/123
R3: <b>Precio justo</b>, pero el color no es igual a la foto...
R4: buenooo, cumple. nada especial. el cojín es más chico de lo que pensé
R5: Excelente atención!!! me cambiaron el producto sin problema. VOLVERÉ A COMPRAR
```

Resumen de referencia, escrito por una persona:

> Los clientes valoran la calidad, el precio y la atención, pero reclaman demoras en el envío,
> productos dañados y diferencias con las fotos.

Dos resúmenes generados por el modelo:

> **A:** Los clientes destacan la calidad, el precio y la buena atención, aunque reportan envíos
> lentos, cajas dañadas y colores distintos a la foto.
>
> **B:** Casa Verde es la mejor tienda de decoración de Chile y todos sus clientes están felices
> con sus compras.

### Qué tienes que hacer

1. **Conceptos (criterio 4.1).** Define token, lema, stopword y n-grama, con un ejemplo tomado
   de la reseña R1 para cada uno. Explica qué significan coherencia y relevancia al evaluar una
   respuesta generada.
2. **Pipeline (criterio 4.2).** En `preprocesamiento.py`, programa funciones reutilizables para
   cada etapa: quitar HTML, quitar ruido (enlaces, emojis y signos repetidos), normalizar
   mayúsculas y espacios, tokenizar, quitar stopwords y lematizar, con spaCy o NLTK. Una
   función `preprocesar(texto)` las encadena. Decide si conservas las tildes y justifícalo.
3. **Muestra el efecto.** En una tabla, para cada reseña: el texto original, el resultado y la
   cantidad de tokens antes y después. Lista los cinco bigramas más frecuentes del corpus
   limpio.
4. **Mide (criterio 4.3).** Calcula ROUGE-1, ROUGE-L y BLEU de los resúmenes A y B contra la
   referencia. Si usas la librería `rouge-score`, pásale tu propio tokenizador: el que trae por
   defecto elimina las letras con tilde y la ñ. Valora además la coherencia y la relevancia de
   cada resumen de 1 a 3.
5. **Registra.** Guarda los resultados en `evaluacion.csv` con las columnas `fecha`,
   `resumen`, `metrica`, `valor`, `herramienta` y `observacion`.
6. **Interpreta.** En 5 a 8 líneas: ¿qué resumen es mejor? ¿Las métricas automáticas bastan
   para detectar el problema del resumen B? ¿Qué ajuste le propondrías a Casa Verde?

### Entrega

Sube a esta Tarea `preprocesamiento.py`, el notebook o script con las métricas,
`evaluacion.csv` y un documento con tus respuestas a los puntos 1, 3 y 6.

## AE4 · ABPRO · El control de calidad del resumidor

- **Modalidad:** Grupal, de 4 a 5 personas.
- **Criterios de evaluación:** 4.1, 4.2, 4.3

### Contexto

La plataforma de soporte de Nube Sur ya resume y clasifica tickets. Durante una semana de
piloto, el resumidor procesó tickets reales y el jefe de soporte escribió a mano un resumen de
referencia para algunos de ellos.

### Problema

Algunos agentes dicen que los resúmenes "a veces inventan cosas" y otros que "a veces no dicen
nada". Nadie tiene datos: la decisión de pasar a producción se está tomando por opiniones.

### Solución

Un pipeline de evaluación que limpie los tickets, mida la calidad de cada resumen con métricas
automáticas y con una pauta humana, registre los resultados según un protocolo y proponga
ajustes.

### Desarrollo

**Insumos:** seis tickets del piloto, con el resumen generado y el de referencia.

| # | Ticket | Resumen generado | Resumen de referencia |
| --: | --- | --- | --- |
| P1 | `<p>Hola, la app de inventario se cierra cuando escaneo un código de barras con la cámara. Pasa en Android 13. Gracias, Rodrigo</p>` | La app de inventario se cierra al escanear códigos de barras en Android 13. | La app de inventario se cierra al escanear un código de barras en Android 13. |
| P2 | `No puedo descargar las facturas en PDF desde el portal; el botón muestra "error 500". Urgente, cierre contable hoy.` | El usuario tiene un problema con el portal. | El portal devuelve error 500 al descargar facturas en PDF y el usuario las necesita hoy para el cierre contable. |
| P3 | `¿Es posible cambiar el correo de notificaciones de la cuenta? El actual es de una persona que ya no trabaja aquí. Enviado desde mi iPhone` | El cliente pide cambiar el correo de notificaciones porque el actual es de un ex trabajador. | El cliente quiere cambiar el correo de notificaciones de la cuenta, que pertenece a un ex trabajador. |
| P4 | `La sincronización con el ERP falla todas las noches desde el viernes; el log dice "timeout" a las 02:00.` | La sincronización con el ERP falla desde el viernes por un corte de luz en el centro de datos. | La sincronización nocturna con el ERP falla por timeout desde el viernes. |
| P5 | `Hola!!! el reporte de ventas por región muestra montos duplicados para la región de Valparaíso en septiembre. Adjunto captura.` | El reporte de ventas por región duplica los montos de Valparaíso en septiembre. | El reporte de ventas por región muestra montos duplicados de Valparaíso en septiembre. |
| P6 | `Buenas tardes. Quisiera saber si el plan Pyme incluye acceso a la API y cuántas llamadas por minuto permite. También si hay descuento anual.` | El cliente consulta si el plan Pyme incluye la API, su límite de llamadas por minuto, si hay descuento anual y si incluye soporte telefónico. | El cliente pregunta si el plan Pyme incluye la API, cuántas llamadas por minuto permite y si tiene descuento anual. |

1. **Protocolo (criterio 4.1).** Antes de medir, escriban el protocolo de evaluación: qué
   miden, con qué métrica o pauta, qué significa cada una (coherencia, relevancia, BLEU y
   ROUGE) y qué umbral hace que un resumen se marque "revisar".
2. **Pipeline modular (criterio 4.2).** Programen funciones reutilizables para limpiar,
   normalizar y tokenizar los tickets, y para vectorizarlos con `CountVectorizer` y
   `TfidfVectorizer` de scikit-learn. Comparen los cinco términos con más peso de cada
   vectorización.
3. **Métricas automáticas (criterio 4.3).** Para cada ticket calculen ROUGE-1, ROUGE-L y BLEU
   del resumen generado contra la referencia, y la relevancia como similitud coseno entre el
   ticket y el resumen con TF-IDF.
4. **Evaluación humana.** Dos integrantes valoran por separado la coherencia y la relevancia de
   cada resumen de 1 a 3. Después comparan y acuerdan una nota final. Registren en cuántos
   casos no coincidieron.
5. **Registro.** Guarden todo en `evaluacion_piloto.csv` según su protocolo.
6. **Ajustes.** Identifiquen los resúmenes que fallan y el tipo de falla (inventa datos, omite
   información clave, agrega información que no está en el ticket). Propongan al menos **dos
   ajustes** al resumidor (en el prompt, en la limpieza o en los parámetros), justificados con
   sus números.
7. **Presentación.** El portavoz presenta la recomendación del equipo: ¿el
   resumidor pasa a producción, pasa con ajustes o no pasa?

### Roles del equipo

Roten los roles respecto del ABPRO anterior:

- **Coordinador/a:** cuida el tiempo y redacta el protocolo con el equipo.
- **Responsable de preprocesamiento:** programa la limpieza y la vectorización.
- **Responsable de métricas:** calcula ROUGE, BLEU y la similitud coseno.
- **Evaluadores/as humanos (2):** aplican la pauta por separado y acuerdan la nota. En equipos
  de 4, uno de ellos es también el portavoz.
- **Portavoz:** presenta la recomendación.

### Entrega

Una entrega por equipo en esta Tarea:
- el notebook o los scripts del pipeline;
- `evaluacion_piloto.csv`;
- un documento con el protocolo, el análisis de fallas, los ajustes propuestos y la
  recomendación;
- los nombres de los integrantes con su rol.
