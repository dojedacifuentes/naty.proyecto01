# PF1822 · Módulo 2 · C4 — Herramientas didácticas

**Estado:** borrador · **Va en:** Anexo N°2, sección VI c), **con el enlace al LMS**
**Guía:** Anexo N°7, num. 7 · **Para el 7,0** (7.4, pág. 31): *"Se observan 2 herramientas
didácticas distintas que serán utilizadas para trabajar los diferentes contenidos del
aprendizaje esperado seleccionado. Las 2 herramientas didácticas desarrolladas permiten que el
participante adquiera la(s) habilidad(es) del aprendizaje esperado seleccionado."* Si solo una
lo permite, la nota baja a 5,0.

**Aprendizaje esperado seleccionado: AE3** (textual): FORMULAR PROMPTS EFECTIVOS PARA MODELOS
GENERATIVOS EN ESCENARIOS ZERO-SHOT O FEW-SHOT, CONSIDERANDO LA TAREA SOLICITADA Y LOS PARÁMETROS
DE GENERACIÓN DISPONIBLES. Las dos herramientas son del AE3, cubren entre las dos todos sus
contenidos (tabla al final) y se usan en el tramo 3 de la ruta.

<!-- verificable: ID=C4 tipo=lista min=2 -->
1. **Notebook guiado "Laboratorio de prompts: del prompt que no sirve al que funciona"** (Colab o JupyterLab): el participante envía prompts reales a un modelo, los diagnostica, los reescribe como zero-shot, few-shot e instruccionales, pide salidas en JSON, mide el efecto de `temperature` y `max_tokens`, y registra sus iteraciones con un puntaje. Cada sección termina en una celda de autocomprobación. Es efectivo porque la habilidad del AE3 es formular y ajustar prompts según la tarea y los parámetros, y el notebook la ejercita con resultados reales del modelo en cada uno de los 9 contenidos del AE3 (criterios 3.1, 3.2 y 3.3). Termina con el prompt y el registro que el participante lleva a la actividad 1, parte C, y a la actividad 2.
2. **Video interactivo "Del prompt a la respuesta"**: 6 minutos con 5 preguntas incrustadas que detienen el video y no dejan avanzar sin responder. Es efectivo porque cada pregunta obliga a predecir, antes de ver la respuesta, una decisión del AE3: dónde van las reglas del prompt, qué significa una respuesta cortada, cuándo usar few-shot, qué `temperature` elegir y qué restricción evita que el modelo invente (criterios 3.1, 3.2 y 3.3).

---

## Herramienta 1 · Notebook guiado "Laboratorio de prompts: del prompt que no sirve al que funciona"

**AE:** AE3 (la sección 0 repasa la llamada a la API del AE2) · **Indicadores:** 3.1, 3.2, 3.3
**Duración:** 90 minutos · **Formato:** notebook `M2-Herramienta-1-Notebook.ipynb`, publicado en el
LMS para abrirlo en Colab o descargarlo para JupyterLab. Cada sección trae una explicación
breve, una celda para completar y una celda de autocomprobación: `assert` con un mensaje que
dice qué revisar cuando la comprobación no depende del modelo, y un aviso ✅/❌ cuando depende de
su respuesta, porque esta varía entre corridas.
**Casos:** cuatro tickets de práctica de Nube Sur (N1 a N4), con su resumen de referencia,
distintos de los tickets de las actividades, para que las actividades sigan siendo un problema
por resolver.
**Resultado:** `prompts.md` con el prompt final y sus parámetros justificados, y
`registro_prompts.csv` con las iteraciones, que el participante usa en las actividades 1 y 2.

| Sección | Qué hace el participante | Contenido del plan (textual) | Autocomprobación |
| --- | --- | --- | --- |
| 0 · Preparar | Lee la clave desde *Secrets* de Colab o desde el entorno, escribe el modelo que indica el tutor y hace una primera llamada. | — (repaso del AE2) | La clave existe y no está escrita en ninguna celda; el modelo está definido; la llamada devuelve texto. |
| 1 · El prompt que no sirve | Envía dos veces `Resume esto:` más un ticket, con `temperature` 1,0, mira la lista de mensajes y anota tres fallas: qué falta y qué efecto tuvo. | QUÉ ES UN PROMPT. · ESTRUCTURA BÁSICA DE ENTRADA PARA MODELOS DE LENGUAJE. | Hay dos salidas guardadas y tres fallas con indicación y efecto. |
| 2 · Zero-shot con buenas prácticas | Completa el mensaje de sistema por partes: rol, tarea con medida, contexto y restricciones. | TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING. · PRÁCTICAS RECOMENDADAS: CLARIDAD, DELIMITACIÓN DEL ROL, CONTEXTO, RESTRICCIONES Y EVITAR AMBIGÜEDAD. | Las cuatro partes están escritas, la tarea trae una medida y hay una restricción; la salida tiene 25 palabras o menos y no propone soluciones. |
| 3 · Few-shot | Agrega dos ejemplos como turnos `user` y `assistant` y prueba con el ticket que es una pregunta. | TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING. | Los roles alternan, los ejemplos no son tickets de práctica y el resumen de la pregunta empieza como los ejemplos. |
| 4 · Prompting instruccional | Escribe los pasos que el modelo debe seguir: producto, falla, condición y, al final, la oración. | TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING. | El prompt trae al menos tres pasos numerados y la salida es una sola oración. |
| 5 · Formato de salida | Pide JSON con `resumen`, `producto` y `prioridad`, lo lee con `json.loads` y arma una tabla con los cuatro tickets. | FORMATEO DE SALIDAS: LISTAS, JSON Y ESTRUCTURA TABULAR. | El JSON se puede leer, trae los tres campos y la prioridad es alta, media o baja; la tabla tiene cuatro filas. |
| 6 · Cuatro tareas | Escribe un prompt para generar código, uno para resumir, uno para validar (SI o NO) y uno para reformular. | EJEMPLOS PRÁCTICOS: PROMPT PARA GENERAR CÓDIGO, RESUMEN, VALIDACIÓN Y REFORMULACIÓN. | Cada prompt trae rol y formato de salida; el código generado define la función pedida; la validación detecta el dato inventado. |
| 7 · Parámetros | Corre el mismo prompt tres veces con `temperature` 0,2 y tres con 0,9, y una vez con un `max_tokens` mínimo. | PROMPT Y PARÁMETROS: CÓMO INFLUYEN TEMPERATURE, MAX_TOKENS Y TOP_P. | Con `max_tokens` mínimo, `finish_reason` es `length`; se comparan las salidas distintas de cada temperature. |
| 8 · Limitaciones | Provoca una alucinación (pide la causa que el ticket no dice), la detecta con el prompt de validación y compara dos redacciones de la misma instrucción. | LIMITACIONES: ALUCINACIONES, FALTA DE CONTROL Y SENSIBILIDAD AL WORDING. | Hay una observación escrita de cada limitación y la validación marca el dato inventado. |
| 9 · Iterar y registrar | Mide tres versiones del prompt contra las referencias con un puntaje de coincidencia, anota qué cambió en cada una (claridad, estructura o control) y guarda el prompt final. | ITERACIÓN Y AJUSTE DE PROMPTS SEGÚN RESULTADOS OBTENIDOS. | El puntaje de prueba da 0,733; hay tres versiones o más, cada una con cambio, categoría y efecto; se crean `prompts.md` y `registro_prompts.csv`. |

**Seguridad (se explica en la sección 0):** la clave nunca se escribe en una celda. Un notebook
compartido con la clave escrita la expone a cualquiera que lo abra, y la clave permite gastar a
cuenta de quien la creó.

---

## Herramienta 2 · Video interactivo "Del prompt a la respuesta"

**AE:** AE3 (la escena de la documentación apoya el AE2) · **Indicadores:** 3.1, 3.2, 3.3
**Duración:** 6 min de video + preguntas
**Formato:** H5P *Interactive Video* (o equivalente). Las preguntas detienen el video; cada
respuesta muestra su retroalimentación.
**Producción:** grabación de pantalla con la documentación oficial y un editor de código,
con la voz del tutor.

### Guion

| Tiempo | Pantalla | Locución |
| --- | --- | --- |
| 0:00–0:20 | El ticket T1 desordenado y su resumen ideal | "Entre este ticket y este resumen hay tres cosas: una solicitud HTTP, un prompt y unos parámetros. Vamos a verlas en orden." |
| 0:20–1:30 | La documentación oficial del endpoint de chat, con la solicitud de ejemplo resaltada | "La documentación siempre te dice tres cosas: la URL, cómo te autenticas y qué campos lleva el cuerpo. Aquí: `model`, `messages` con sus roles y parámetros opcionales como `temperature`." |
| **1:30** | **Pregunta 1** | |
| 1:30–2:30 | La respuesta JSON de ejemplo | "La respuesta trae el texto dentro de `choices`, y el consumo en `usage`. Si la API responde con error, no hay `choices`: por eso primero se mira el código de estado." |
| **2:30** | **Pregunta 2** | |
| 2:30–3:40 | Dos prompts lado a lado: zero-shot y few-shot | "Zero-shot: solo la instrucción. Few-shot: la instrucción más ejemplos de lo que esperas. Los ejemplos enseñan el formato mejor que cualquier explicación, pero gastan tokens." |
| **3:40** | **Pregunta 3** | |
| 3:40–4:50 | La misma solicitud con temperature 0,2 y 0,9, tres veces cada una | "`temperature` controla cuánto se arriesga el modelo. Para resumir, bajo. Para lluvia de ideas, más alto. `max_tokens` corta la respuesta; `top_p` es otra forma de acotar la variedad: ajusta uno de los dos, no ambos a la vez." |
| **4:50** | **Pregunta 4** | |
| 4:50–5:40 | Un resumen que inventa un dato que no estaba en el ticket | "Los modelos pueden inventar con total seguridad. Por eso el prompt dice 'no agregues datos que no estén en el ticket', y por eso vas a medir." |
| **5:40** | **Pregunta 5** | |
| 5:40–6:00 | La tabla de iteraciones de la actividad 2 | "Cada cambio de prompt, a la tabla: qué cambiaste y qué pasó. Así se decide con evidencia." |

### Preguntas incrustadas

Cada pregunta evalúa un criterio del AE3 y va en la pausa de la escena que la prepara.

1. **(1:30 · selección · 3.1, estructura de entrada)** En la solicitud de la documentación, ¿dónde van las reglas que el modelo debe seguir siempre, como el rol, el formato y las restricciones?
   a) En el campo `model` · **b) En el mensaje con rol `system`** · c) En el parámetro `temperature`
   *Correcta:* "Eso es. El mensaje de sistema fija el comportamiento; el de usuario trae la tarea y los datos." · *Incorrecta:* "Revisa `messages`: cada mensaje tiene un rol, y el de sistema es el que fija las reglas."
2. **(2:30 · verdadero o falso · 3.3, parámetros)** "Si la respuesta trae `finish_reason` igual a `length`, el resumen salió completo."
   **Falso.** *Retroalimentación:* "`length` significa que la respuesta se cortó al llegar a `max_tokens`. El largo se pide en el prompt, por ejemplo 'máximo 25 palabras'; `max_tokens` es solo un tope de seguridad."
3. **(3:40 · selección · 3.2, few-shot)** Quieres que todos los resúmenes empiecen con "El usuario…". ¿Qué es lo más efectivo?
   a) Subir temperature · **b) Agregar dos ejemplos (few-shot) que empiecen así** · c) Aumentar max_tokens
   *Retroalimentación:* "Los ejemplos fijan el formato mejor que una instrucción larga."
4. **(4:50 · selección · 3.3, parámetros)** Necesitas el mismo resumen cada vez que corres el proceso. ¿Qué haces?
   **a) Bajar temperature a 0–0,2** · b) Subir top_p a 1 · c) Quitar el mensaje de sistema
   *Retroalimentación:* "Con temperature baja, el modelo elige casi siempre los tokens más probables."
5. **(5:40 · respuesta corta · 3.1 y 3.2, limitaciones)** Escribe una restricción que agregarías al prompt para evitar que el modelo invente datos.
   *Retroalimentación modelo:* "Por ejemplo: 'Usa solo información que esté en el ticket; si falta, escribe «sin datos»'."

**Registro:** el LMS guarda las respuestas; el tutor revisa quién falló las preguntas 2 y 4
antes de la sesión en vivo del tramo 3.

---

## Cobertura del aprendizaje seleccionado por las dos herramientas

| Contenido del plan del AE3 (textual) | Notebook | Video interactivo |
| --- | --- | --- |
| 3. DISEÑO DE PROMPTS PARA APIS GENERATIVAS | Secciones 1 a 9 | Todo el video |
| QUÉ ES UN PROMPT. | Sección 1 | Escena 1 |
| ESTRUCTURA BÁSICA DE ENTRADA PARA MODELOS DE LENGUAJE. | Sección 1 | Pregunta 1 |
| TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING. | Secciones 2, 3 y 4 | Pregunta 3 |
| PRÁCTICAS RECOMENDADAS: CLARIDAD, DELIMITACIÓN DEL ROL, CONTEXTO, RESTRICCIONES Y EVITAR AMBIGÜEDAD. | Sección 2 | Pregunta 5 |
| FORMATEO DE SALIDAS: LISTAS, JSON Y ESTRUCTURA TABULAR. | Sección 5 | — |
| EJEMPLOS PRÁCTICOS: PROMPT PARA GENERAR CÓDIGO, RESUMEN, VALIDACIÓN Y REFORMULACIÓN. | Sección 6 | — |
| PROMPT Y PARÁMETROS: CÓMO INFLUYEN TEMPERATURE, MAX_TOKENS Y TOP_P. | Sección 7 | Preguntas 2 y 4 |
| LIMITACIONES: ALUCINACIONES, FALTA DE CONTROL Y SENSIBILIDAD AL WORDING. | Sección 8 | Pregunta 5 |
| ITERACIÓN Y AJUSTE DE PROMPTS SEGÚN RESULTADOS OBTENIDOS. | Sección 9 | Escena final |
