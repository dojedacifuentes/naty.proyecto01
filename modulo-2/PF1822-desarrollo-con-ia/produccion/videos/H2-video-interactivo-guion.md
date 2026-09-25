# PF1822 · Herramienta didáctica 2 · Video interactivo Del prompt a la respuesta — guion y preguntas

1. **Video base en HeyGen:** `H2-video-interactivo.pptx` (narración en las notas). Reemplaza el texto
   "Pantalla sugerida" de cada lámina por la captura que indica, o graba esa pantalla aparte.
2. **Preguntas en H5P** (Interactive Video, por ejemplo en Lumi): agrega cada pregunta en su pausa. Si el
   video final dura distinto, ajusta los tiempos a los cortes entre escenas.

| Tiempo | Pantalla | Narración |
| --- | --- | --- |
| 0:00–0:20 | El ticket T1 desordenado y su resumen ideal | Entre este ticket y este resumen hay tres cosas: una solicitud HTTP, un prompt y unos parámetros. Vamos a verlas en orden. |
| 0:20–1:30 | La documentación oficial del endpoint de chat, con la solicitud de ejemplo resaltada | La documentación siempre te dice tres cosas: la URL, cómo te autenticas y qué campos lleva el cuerpo. Aquí: model, messages con sus roles y parámetros opcionales como temperature. |
| 1:30–2:30 | La respuesta JSON de ejemplo | La respuesta trae el texto dentro de choices, y el consumo en usage. Si la API responde con error, no hay choices: por eso primero se mira el código de estado. |
| 2:30–3:40 | Dos prompts lado a lado: zero-shot y few-shot | Zero-shot: solo la instrucción. Few-shot: la instrucción más ejemplos de lo que esperas. Los ejemplos enseñan el formato mejor que cualquier explicación, pero gastan tokens. |
| 3:40–4:50 | La misma solicitud con temperature 0,2 y 0,9, tres veces cada una | temperature controla cuánto se arriesga el modelo. Para resumir, bajo. Para lluvia de ideas, más alto. max_tokens corta la respuesta; top_p es otra forma de acotar la variedad: ajusta uno de los dos, no ambos a la vez. |
| 4:50–5:40 | Un resumen que inventa un dato que no estaba en el ticket | Los modelos pueden inventar con total seguridad. Por eso el prompt dice 'no agregues datos que no estén en el ticket', y por eso vas a medir. |
| 5:40–6:00 | La tabla de iteraciones de la actividad 2 | Cada cambio de prompt, a la tabla: qué cambiaste y qué pasó. Así se decide con evidencia. |

**Pausas:** Pregunta 1 en 1:30 · Pregunta 2 en 2:30 · Pregunta 3 en 3:40 · Pregunta 4 en 4:50 · Pregunta 5 en 5:40

## Preguntas incrustadas

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

