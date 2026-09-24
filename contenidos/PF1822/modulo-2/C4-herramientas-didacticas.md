# PF1822 · Módulo 2 · C4 — Herramientas didácticas

**Estado:** borrador · **Va en:** Anexo N°2, sección VI c), **con el enlace al LMS**
**Guía:** Anexo N°7, num. 7 · **Para el 7,0:** 2 herramientas distintas y **ambas** efectivas
para adquirir la habilidad. Si solo una lo es, la nota baja a 5,0.

<!-- verificable: ID=C4 tipo=lista min=2 -->
1. **Notebook guiado "Tu primera llamada a un modelo"** (Colab o JupyterLab): celdas que el participante ejecuta y completa, con celdas de autocomprobación que le dicen si lo logró. Es efectivo porque la habilidad de AE2 y AE4 es escribir y ejecutar código que consume una API y procesa texto: el notebook la ejercita directamente y termina en el código base de las actividades 1 y 2.
2. **Video interactivo "Del prompt a la respuesta"**: 6 minutos con 5 preguntas incrustadas. Es efectivo porque obliga a leer una solicitud y una respuesta reales de la documentación y a predecir el efecto de un prompt y de `temperature` antes de verlo, que son las habilidades de AE2 (2.1) y AE3.

---

## Herramienta 1 · Notebook guiado "Tu primera llamada a un modelo"

**AE:** AE2 y AE4 · **Indicadores:** 2.1, 2.2, 4.1, 4.2 · **Duración:** 60 a 90 minutos
**Formato:** notebook publicado en el LMS con enlace para abrirlo en Colab o descargarlo para
JupyterLab. Cada sección termina con una celda de autocomprobación con `assert` y un mensaje
que explica qué revisar si falla.

| Sección | Qué hace el participante | Celda de autocomprobación |
| --- | --- | --- |
| 0 · Preparar | Instala `httpx`, carga la clave desde el entorno (en Colab, desde *Secrets* con `userdata.get("OPENAI_API_KEY")`; en local, con una variable de entorno) y define `MODELO_CHAT` y `MODELO_EMBEDDINGS`. | `assert os.environ.get("OPENAI_API_KEY"), "La clave no está en el entorno: revisa Secrets o tu .env"` y una comprobación de que la clave **no** aparece escrita en ninguna celda. |
| 1 · GET | Lista los modelos con `httpx.get(".../models", headers=...)` y muestra los 5 primeros identificadores. | `assert r.status_code == 200, f"Estado {r.status_code}: revisa la clave o la URL"` |
| 2 · POST de generación | Arma a mano el JSON de una solicitud a `/chat/completions` con un mensaje de sistema y uno de usuario; imprime la respuesta completa y marca en ella `choices`, `message`, `content` y `usage`. | `assert "choices" in datos and datos["choices"][0]["message"]["content"]` |
| 3 · Tokens y costo | Lee `usage` y calcula cuántos tokens de entrada y de salida consumió; repite con un mensaje el doble de largo. | El participante escribe la relación que observó; la celda verifica que `total_tokens` aumentó. |
| 4 · Temperature | Ejecuta el mismo prompt 3 veces con `temperature` 0,2 y 3 veces con 0,9; compara las respuestas. | Pregunta en el notebook: "¿con cuál variaron más?" y verifica que haya 6 respuestas guardadas. |
| 5 · Embeddings | Obtiene embeddings de tres frases (dos parecidas y una distinta) y calcula la similitud de coseno entre ellas. | `assert sim(parecidas) > sim(distintas), "Las frases parecidas deberían estar más cerca"` |
| 6 · Errores | Hace una solicitud con una clave inválida a propósito y lee el código y el mensaje de error. | `assert r.status_code == 401` y el participante anota qué significa 401, 429 y 500. |
| 7 · Limpiar texto | Aplica `limpiar()` (entregada) al ticket T1 con HTML y firma; compara antes y después. | `assert "<p>" not in limpio and "@" not in limpio` |
| 8 · Tokenizar | Tokeniza con spaCy, quita stopwords, obtiene lemas y bigramas del ticket limpio. | `assert "iniciar" in tokens` y verificación de que ninguna stopword quedó en la lista. |
| 9 · Hacia la actividad 1 | Copia lo que funcionó a un archivo `cliente_ia.py` con una primera versión de `ClienteIA`. | Mensaje final con el enlace a la actividad 1. |

**Seguridad (se explica en la sección 0):** la clave nunca se escribe en una celda; un
notebook compartido con una clave escrita la expone a cualquiera que lo abra.

---

## Herramienta 2 · Video interactivo "Del prompt a la respuesta"

**AE:** AE2 y AE3 · **Indicadores:** 2.1, 3.1, 3.2, 3.3 · **Duración:** 6 min de video + preguntas
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
