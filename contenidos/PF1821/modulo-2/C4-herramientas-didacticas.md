# PF1821 · Módulo 2 · C4 — Herramientas didácticas

**Estado:** borrador · **Va en:** Anexo N°2, sección VI c), **con el enlace al LMS**
**Guía:** Anexo N°7, num. 7 · **Para el 7,0:** 2 herramientas distintas y **ambas** efectivas
para adquirir la habilidad. Si solo una lo es, la nota baja a 5,0.

<!-- verificable: ID=C4 tipo=lista min=2 -->
1. **Tutorial guiado "Tu primer workflow en n8n"**: página paso a paso con capturas, que el participante sigue con n8n abierto al lado. Es efectivo porque termina en un workflow funcionando, que es exactamente la habilidad de AE2, y deja lista la base de la actividad 1.
2. **Video interactivo "Expresiones y depuración"**: video de 6 minutos con 5 preguntas incrustadas que detienen la reproducción. Es efectivo porque obliga a predecir el resultado de una expresión y a elegir dónde mirar cuando algo falla antes de ver la respuesta, que son las habilidades de AE3 y AE4 que se ejercitan en la actividad 2.

---

## Herramienta 1 · Tutorial guiado "Tu primer workflow en n8n"

**AE:** AE2 (y AE3 en los pasos 7 a 9) · **Indicadores:** 2.1, 2.2, 2.3, 3.1, 3.4
**Duración:** 45 a 60 minutos · **Formato:** página del LMS (o H5P *Course Presentation*)
con una captura por paso y una casilla "Listo" que el participante marca al avanzar.
**Resultado:** el workflow "Pedido a registro" de la actividad 1, parte B.

| Paso | Qué hace el participante | Qué debe ver para seguir | Si no lo ve |
| --- | --- | --- | --- |
| 1 | Entra a n8n y crea un workflow nuevo llamado "Pedido a registro – [su nombre]". | El canvas vacío con el botón para agregar el primer paso. | Revisar que la cuenta o instancia del curso esté activa (instructivo de acceso). |
| 2 | Agrega el trigger **n8n Form Trigger**. Título: "Nuevo pedido". | El panel de configuración del formulario. | Buscar "Form" en el panel de nodos. |
| 3 | Crea los 7 campos con estas etiquetas exactas: `nombre`, `email`, `comuna`, `tipo_cliente`, `producto`, `cantidad`, `precio_unitario`. Tipos: Email para `email`, Dropdown (minorista, mayorista) para `tipo_cliente`, Number para cantidad y precio. | La vista previa del formulario con los 7 campos. | Las etiquetas son los nombres de los campos en los datos: una mayúscula de más rompe los pasos siguientes. |
| 4 | Abre la URL de prueba del formulario y envía un pedido con la comuna escrita "  Ñuñoa " (con espacios). | En el panel de salida del trigger, un ítem con los 7 campos. | Usar *Test workflow* antes de abrir la URL de prueba. |
| 5 | Fija esos datos (*Pin data*) para no llenar el formulario en cada prueba. | El ícono de datos fijados en el nodo. | — |
| 6 | Agrega **Edit Fields (Set)** en modo *Manual Mapping* y define `email` = `{{ $json.email.trim().toLowerCase() }}` y `comuna` = `{{ $json.comuna.trim() }}`. | En la salida: la comuna sin espacios y el email en minúsculas. | Revisar que la expresión esté en modo *Expression* y no *Fixed*. |
| 7 | En el mismo nodo agrega `cantidad` y `precio_unitario` como **Number** y `total` (Number) = `{{ Number($json.cantidad) * Number($json.precio_unitario) }}`. | `total` como número, sin comillas en la vista JSON. | Si aparece entre comillas, el tipo quedó como String. |
| 8 | Activa *Include Other Input Fields* para conservar `nombre`, `tipo_cliente` y `producto`. | Los 8 campos en la salida. | — |
| 9 | Agrega el nodo **Supabase**: credencial del curso, *Create a row*, tabla `pedidos`, *Auto-map input data to columns*. Ejecuta el nodo. | Una fila nueva en la tabla `pedidos` de Supabase con el `id` asignado. | Si Supabase rechaza la fila, leer el mensaje: casi siempre es un campo con tipo equivocado (vuelve al paso 7). |
| 10 | Guarda, activa el workflow y envía un pedido real desde la **URL de producción** del formulario. | El pedido en la tabla y la ejecución en el historial. | La URL de prueba solo funciona con *Test workflow*; en producción se usa la otra. |

**Autocomprobación al final del tutorial** (tres preguntas de sí o no en el LMS): ¿tu
workflow tiene entrada, procesamiento y salida? ¿El total aparece como número? ¿La fila
quedó en Supabase? Con los tres "sí", el LMS habilita la actividad 1.

---

## Herramienta 2 · Video interactivo "Expresiones y depuración"

**AE:** AE3 y AE4 · **Indicadores:** 3.3, 4.2, 4.3 · **Duración:** 6 min de video + preguntas
**Formato:** H5P *Interactive Video* (o equivalente del LMS). Las preguntas detienen el
video y no dejan avanzar hasta responder; cada respuesta muestra una retroalimentación.
**Producción:** grabación de pantalla de n8n con voz del tutor (o avatar para la
introducción de 20 segundos).

### Guion

| Tiempo | Pantalla | Locución |
| --- | --- | --- |
| 0:00–0:20 | Canvas del workflow "Pedido a registro" | "Tu workflow ya guarda pedidos. Ahora vamos a hacer que decida por sí solo y a aprender qué hacer cuando algo sale mal." |
| 0:20–1:30 | Nodo Edit Fields con el editor de expresiones abierto | "Una expresión va entre dobles llaves. `$json` son los datos que llegan al nodo. Mira la vista previa a la derecha: te dice el resultado antes de ejecutar. `trim()` quita espacios, `toLowerCase()` pasa a minúsculas, y `Number()` convierte texto en número." |
| **1:30** | **Pregunta 1** | |
| 1:30–2:40 | Nodo If con una condición de monto | "Para decidir, usamos If cuando hay dos caminos y Switch cuando hay más. Las condiciones se combinan: con AND se tienen que cumplir todas; con OR basta una." |
| **2:40** | **Pregunta 2** | |
| 2:40–3:50 | Switch con tres reglas y la opción *Fallback Output* | "Ojo con lo que no calza en ninguna regla. Si el Switch no tiene salida de respaldo, ese pedido se pierde sin que nada se ponga rojo. Actívala siempre." |
| **3:50** | **Pregunta 3** | |
| 3:50–5:00 | Historial de ejecuciones, una ejecución abierta, ítems por nodo | "Cuando algo falla, no adivines. Abre la ejecución, recorre los nodos y compara cuántos ítems entran y cuántos salen. Ahí está la pista." |
| **5:00** | **Pregunta 4** | |
| 5:00–5:40 | Nodo con error y su mensaje | "Lee el mensaje de error completo: casi siempre dice qué campo y qué tipo esperaba." |
| **5:40** | **Pregunta 5** | |
| 5:40–6:00 | Canvas | "Anota cada falla en tu bitácora: síntoma, causa, corrección y prueba. En la actividad 2 la vas a necesitar." |

### Preguntas incrustadas

1. **(1:30 · selección)** Si `$json.comuna` vale `" Temuco "`, ¿qué devuelve `{{ $json.comuna.trim() }}`?
   a) `" Temuco "` · **b) `"Temuco"`** · c) `"temuco"`
   *Correcta:* "Exacto: `trim()` quita los espacios de los extremos, no cambia mayúsculas." ·
   *Incorrecta:* "Revisa: `trim()` solo quita espacios al inicio y al final. Para minúsculas se usa `toLowerCase()`."
2. **(2:40 · verdadero o falso)** "Con la condición *tipo_cliente es mayorista* **AND** *total ≥ 150000*, un minorista que compra $219.000 va por la rama verdadera."
   **Falso.** *Retroalimentación:* "Con AND deben cumplirse las dos. Para que baste una, la condición debe ir con OR."
3. **(3:50 · selección)** Un pedido con `tipo_cliente` "distribuidor" no calza en ninguna regla del Switch y no hay salida de respaldo. ¿Qué pasa?
   a) El workflow se detiene con error · **b) El pedido se descarta sin aviso** · c) Va a la primera regla
   *Retroalimentación:* "Por eso la ejecución puede salir en verde y aun así perder datos."
4. **(5:00 · selección)** Entran 6 pedidos al Switch y salen 5 en total. ¿Qué haces primero?
   **a) Revisar cuál pedido no salió y con qué valores entró** · b) Borrar el Switch y crearlo de nuevo · c) Cambiar las credenciales
5. **(5:40 · arrastrar)** Ordena los pasos para depurar: *leer el síntoma* → *abrir la ejecución* → *comparar ítems por nodo* → *identificar la causa* → *corregir* → *volver a probar*.

**Registro:** el LMS guarda las respuestas; el tutor revisa quién falló las preguntas 3 y 4
antes de la sesión sincrónica del tramo 4.
