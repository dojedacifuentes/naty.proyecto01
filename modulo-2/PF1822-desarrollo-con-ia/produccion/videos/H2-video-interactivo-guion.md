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

1. **(1:30 · selección)** ¿Dónde va la clave en la solicitud?
   a) En el cuerpo JSON, campo `key` · **b) En el encabezado `Authorization: Bearer <clave>`** · c) Al final de la URL
   *Correcta:* "Así la clave no queda en registros de URL ni en el cuerpo." · *Incorrecta:* "Revisa la sección de autenticación de la documentación: va en un encabezado."
2. **(2:30 · verdadero o falso)** "Si la API responde 429, el texto igual está en `choices`."
   **Falso.** *Retroalimentación:* "429 es demasiadas solicitudes: la respuesta trae un error, no `choices`. Espera y reintenta."
3. **(3:40 · selección)** Quieres que todos los resúmenes empiecen con "El usuario…". ¿Qué es lo más efectivo?
   a) Subir temperature · **b) Agregar dos ejemplos (few-shot) que empiecen así** · c) Aumentar max_tokens
4. **(4:50 · selección)** Necesitas el mismo resumen cada vez que corres el proceso. ¿Qué haces?
   **a) Bajar temperature a 0–0,2** · b) Subir top_p a 1 · c) Quitar el mensaje de sistema
5. **(5:40 · respuesta corta)** Escribe una restricción que agregarías al prompt para evitar que el modelo invente datos.
   *Retroalimentación modelo:* "Por ejemplo: 'Usa solo información que esté en el ticket; si falta, escribe «sin datos»'."

**Registro:** el LMS guarda las respuestas; el tutor revisa quién falló las preguntas 3 y 4
antes de la sesión en vivo del tramo 3.

