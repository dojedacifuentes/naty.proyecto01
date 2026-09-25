# PF1821 · Herramienta didáctica 2 · Video interactivo Expresiones y depuración — guion y preguntas

1. **Video base en HeyGen:** `H2-video-interactivo.pptx` (narración en las notas). Reemplaza el texto
   "Pantalla sugerida" de cada lámina por la captura que indica, o graba esa pantalla aparte.
2. **Preguntas en H5P** (Interactive Video, por ejemplo en Lumi): agrega cada pregunta en su pausa. Si el
   video final dura distinto, ajusta los tiempos a los cortes entre escenas.

| Tiempo | Pantalla | Narración |
| --- | --- | --- |
| 0:00–0:20 | Canvas del workflow "Pedido a registro" | Tu workflow ya guarda pedidos. Ahora vamos a hacer que decida por sí solo y a aprender qué hacer cuando algo sale mal. |
| 0:20–1:30 | Nodo Edit Fields con el editor de expresiones abierto | Una expresión va entre dobles llaves. $json son los datos que llegan al nodo. Mira la vista previa a la derecha: te dice el resultado antes de ejecutar. trim() quita espacios, toLowerCase() pasa a minúsculas, y Number() convierte texto en número. |
| 1:30–2:40 | Nodo If con una condición de monto | Para decidir, usamos If cuando hay dos caminos y Switch cuando hay más. Las condiciones se combinan: con AND se tienen que cumplir todas; con OR basta una. |
| 2:40–3:50 | Switch con tres reglas y la opción *Fallback Output* | Ojo con lo que no calza en ninguna regla. Si el Switch no tiene salida de respaldo, ese pedido se pierde sin que nada se ponga rojo. Actívala siempre. |
| 3:50–5:00 | Historial de ejecuciones, una ejecución abierta, ítems por nodo | Cuando algo falla, no adivines. Abre la ejecución, recorre los nodos y compara cuántos ítems entran y cuántos salen. Ahí está la pista. |
| 5:00–5:40 | Nodo con error y su mensaje | Lee el mensaje de error completo: casi siempre dice qué campo y qué tipo esperaba. |
| 5:40–6:00 | Canvas | Anota cada falla en tu bitácora: síntoma, causa, corrección y prueba. En la actividad 2 la vas a necesitar. |

**Pausas:** Pregunta 1 en 1:30 · Pregunta 2 en 2:40 · Pregunta 3 en 3:50 · Pregunta 4 en 5:00 · Pregunta 5 en 5:40

## Preguntas incrustadas

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

