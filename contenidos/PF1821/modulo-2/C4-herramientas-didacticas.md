# PF1821 · Módulo 2 · C4 — Herramientas didácticas

**Estado:** borrador · **Va en:** Anexo N°2, sección VI c), **con el enlace al LMS**
**Guía:** Anexo N°7, num. 7 · **Para el 7,0** (7.4, pág. 31): *"Se observan 2 herramientas
didácticas distintas que serán utilizadas para trabajar los diferentes contenidos del
aprendizaje esperado seleccionado. Las 2 herramientas didácticas desarrolladas permiten que el
participante adquiera la(s) habilidad(es) del aprendizaje esperado seleccionado."* Si solo una
lo permite, la nota baja a 5,0.

**Aprendizaje esperado seleccionado: AE3** (textual): MANIPULAR DATOS UTILIZANDO NODOS
FUNDAMENTALES DE N8N, PARA TRANSFORMAR INFORMACIÓN SEGÚN REQUERIMIENTOS ESPECÍFICOS DEL WORKFLOW.
Las dos herramientas son del AE3, cubren entre las dos todos sus contenidos (tabla al final) y
se usan en el tramo 3 de la ruta.

<!-- verificable: ID=C4 tipo=lista min=2 -->
1. **Tutorial guiado "Tu primer workflow con datos limpios"**: página paso a paso con capturas, que el participante sigue con n8n abierto al lado. Construye un workflow que recibe pedidos, los transforma con nodos fundamentales y expresiones, los guarda y consulta en Supabase, los filtra y resume, los convierte a CSV y XML, y divide un pedido con varios productos. Es efectivo porque la habilidad del AE3 es manipular datos con nodos fundamentales para transformarlos según un requerimiento: en cada paso el participante obtiene un dato transformado y lo compara con el valor esperado que el tutorial le muestra (criterios 3.1, 3.2, 3.3 y 3.4). Termina con la base del workflow de la actividad 1.
2. **Video interactivo "Expresiones y depuración"**: video de 6 minutos con 5 preguntas incrustadas que detienen la reproducción. Es efectivo porque cada pregunta obliga a predecir, antes de verlo, el resultado de una transformación del AE3: una expresión, una condición del If, un Switch sin salida de respaldo, un Merge que multiplica ítems y un tipo de dato que Supabase rechaza (criterios 3.1, 3.3 y 3.4). Es además la base de la depuración del AE4 en la actividad 2.

---

## Herramienta 1 · Tutorial guiado "Tu primer workflow con datos limpios"

**AE:** AE3 (la parte 1 repasa la creación del workflow del AE2) · **Indicadores:** 3.1, 3.2, 3.3, 3.4
**Duración:** 75 a 90 minutos · **Formato:** página del LMS (o H5P *Course Presentation*), o PDF
`M2-Herramienta-1-Tutorial.pdf`, con una captura por paso y una casilla "Listo" que el
participante marca al avanzar.
**Resultado:** el workflow "Pedido a registro", base de la actividad 1, parte B, y el workflow
"Consultar y exportar pedidos". La parte C de la actividad 1 (CSV histórico, resumen por comuna
y XML para facturación) sigue siendo un problema por resolver: el tutorial usa otros datos y
otra agrupación.

| Paso | Qué hace el participante | Qué debe ver para seguir | Si no lo ve |
| --- | --- | --- | --- |
| | **Parte 1 · Recibir el pedido** | | |
| 1 | Entra a n8n y crea un workflow nuevo llamado "Pedido a registro – [su nombre]". | El canvas vacío con el botón para agregar el primer paso. | Revisar que la cuenta o instancia del curso esté activa (instructivo de acceso). |
| 2 | Agrega el trigger **n8n Form Trigger**. Título: "Nuevo pedido". | El panel de configuración del formulario. | Buscar "Form" en el panel de nodos. |
| 3 | Crea los 7 campos con estas etiquetas exactas: `nombre`, `email`, `comuna`, `tipo_cliente`, `producto`, `cantidad`, `precio_unitario`. Tipos: Email para `email`, Dropdown (minorista, mayorista) para `tipo_cliente`, Number para cantidad y precio. | La vista previa del formulario con los 7 campos. | Las etiquetas son los nombres de los campos en los datos: una mayúscula de más rompe los pasos siguientes. |
| 4 | Con el botón de prueba del workflow activo, abre la URL de prueba y envía un pedido con la comuna "  Ñuñoa " (con espacios), el correo "Ana.Rojas@Correo.test", cantidad 2 y precio 12500. Fija esos datos (*Pin data*). | En la salida del trigger, un ítem con los 7 campos y el ícono de datos fijados. | La URL de prueba solo funciona mientras el editor escucha. |
| | **Parte 2 · Transformar los datos** | | |
| 5 | Agrega **Edit Fields (Set)** en modo *Manual Mapping*: `email` = `{{ $json.email.trim().toLowerCase() }}` y `comuna` = `{{ $json.comuna.trim() }}`. | En la salida: "ana.rojas@correo.test" y "Ñuñoa" sin espacios. | Revisar que el campo esté en modo *Expression* y no *Fixed*. |
| 6 | En el mismo nodo agrega `cantidad` y `precio_unitario` como **Number** y `total` (Number) = `{{ Number($json.cantidad) * Number($json.precio_unitario) }}`. | En la vista JSON, `"total": 25000` sin comillas. | Si aparece entre comillas, el tipo quedó como String. |
| 7 | Activa *Include Other Input Fields* para conservar `nombre`, `tipo_cliente` y `producto`. | Los 8 campos en la salida. | — |
| | **Parte 3 · Guardar y consultar en Supabase** | | |
| 8 | Crea la credencial de **Supabase** con la URL del proyecto y la clave de servicio que entrega el tutor. Lee la nota del paso: la clave va solo en la credencial, nunca en un nodo, un mensaje o una captura; los valores que cambian entre prueba y producción van en variables de la instancia, si el administrador las habilita. | La credencial guardada con conexión exitosa. | Revisar que la URL sea la del proyecto y que no tenga espacios. |
| 9 | Agrega el nodo **Supabase**: *Create a row*, tabla `pedidos`, *Auto-map input data to columns*. Ejecuta el nodo. | Una fila nueva en la tabla `pedidos`, con su `id`. | Si Supabase rechaza la fila, leer el mensaje: casi siempre es un campo con el tipo equivocado (volver al paso 6). |
| 10 | Guarda y activa el workflow. Envía un pedido real desde la **URL de producción** del formulario. | La fila en la tabla y la ejecución en el historial. | En producción se usa la URL de producción, con el workflow activo. |
| 11 | Crea un segundo workflow, "Consultar y exportar pedidos": **Manual Trigger** y **Supabase** *Get many rows* de la tabla `pedidos`, con el filtro `comuna` igual a "Ñuñoa". | Solo los pedidos de Ñuñoa, uno por ítem. | Revisar el nombre exacto de la columna y que el filtro no tenga espacios. |
| | **Parte 4 · Filtrar, resumir y cambiar de formato** | | |
| 12 | Agrega **Filter** con la condición `{{ $json.total }}` (Number) *is greater than or equal to* 20000. | Menos ítems en la salida que en la entrada: solo los pedidos de $20.000 o más. | Si no filtra nada, revisar que el tipo de la condición sea Number. |
| 13 | Agrega **Summarize**: *Fields to Split By* `tipo_cliente`; *Sum* de `total` y *Count* de `id`. | Un ítem por tipo de cliente, con su suma y su conteo. | Si la suma concatena, `total` llegó como texto: volver al paso 6. |
| 14 | Desde la salida del Summarize, agrega **Convert to File** con la operación *Convert to CSV*. | Un archivo binario `data` que se puede descargar y abrir en una planilla. | Revisar la pestaña de datos binarios del panel de salida. |
| 15 | En paralelo, desde la misma salida, agrega el nodo **XML** en modo *JSON to XML*. | El resumen como texto XML. | — |
| 16 | Agrega un **Manual Trigger** aparte, fija como datos el pedido de ejemplo con dos productos que entrega el tutorial y conecta **Split Out** sobre el campo `productos`, incluyendo los demás campos. Antes, en un Edit Fields, calcula `n_productos` = `{{ $json.productos.length }}`. | `n_productos` = 2, y a la salida del Split Out, 2 ítems con el cliente repetido en cada uno. | Si sale 1 ítem, el campo indicado no es el array. |
| 17 | Borra la fila del pedido de prueba con **Supabase** *Delete a row*, filtrando por su `id`. | La fila de prueba ya no está en la tabla; el pedido real del paso 10 sigue. | Filtrar siempre por `id`: un filtro amplio borra más de una fila. |

**Pedido de ejemplo con dos productos** (paso 16, para fijar como datos):

```json
{ "cliente": { "nombre": "Almacén El Sol", "email": "compras@elsol.test" },
  "comuna": "Temuco", "tipo_cliente": "mayorista",
  "productos": [ { "nombre": "Azúcar 25 kg", "cantidad": 10 },
                 { "nombre": "Aceite 5 L", "cantidad": 6 } ] }
```

**Autocomprobación al final del tutorial** (sí o no en el LMS): ¿`total` aparece como número?
¿La fila quedó en Supabase y la de prueba se borró? ¿Descargaste el CSV y ves el XML del
resumen? ¿El Split Out entregó dos ítems? Con los cuatro "sí", el LMS habilita la actividad 1.

---

## Herramienta 2 · Video interactivo "Expresiones y depuración"

**AE:** AE3 (con apoyo al AE4 en la depuración) · **Indicadores:** 3.1, 3.3, 3.4 · **Duración:** 6 min de video + preguntas
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

Cada pregunta evalúa un contenido del AE3 y va en la pausa de la escena que la prepara.

1. **(1:30 · selección · 3.3, expresiones)** Si `$json.comuna` vale `" Temuco "`, ¿qué devuelve `{{ $json.comuna.trim() }}`?
   a) `" Temuco "` · **b) `"Temuco"`** · c) `"temuco"`
   *Correcta:* "Exacto: `trim()` quita los espacios de los extremos, no cambia mayúsculas." ·
   *Incorrecta:* "Revisa: `trim()` solo quita espacios al inicio y al final. Para minúsculas se usa `toLowerCase()`."
2. **(2:40 · verdadero o falso · 3.3, If y expresiones para filtrar)** "Con la condición *tipo_cliente es mayorista* **AND** *total mayor o igual que 150000*, un minorista que compra $219.000 va por la rama verdadera."
   **Falso.** *Retroalimentación:* "Con AND deben cumplirse las dos. Para que baste una, la condición debe ir con OR."
3. **(3:50 · selección · 3.1, Switch)** Un pedido con `tipo_cliente` "distribuidor" no calza en ninguna regla del Switch y no hay salida de respaldo. ¿Qué pasa?
   a) El workflow se detiene con error · **b) El pedido se descarta sin aviso** · c) Va a la primera regla
   *Retroalimentación:* "Por eso la ejecución puede salir en verde y aun así perder datos."
4. **(5:00 · selección · 3.1, Merge y datos relacionales)** Entran 6 pedidos al Merge que agrega la zona de despacho desde la tabla `comunas`, y salen 240 ítems. ¿Qué corriges?
   **a) El modo del Merge: Combine por *Matching Fields*, con el campo `comuna` en las dos entradas** · b) Borrar la tabla `comunas` y escribir la zona a mano · c) Agregar un Filter después del Merge
   *Retroalimentación:* "Con todas las combinaciones posibles, cada pedido se une con cada comuna. Al combinar por el campo en común, cada pedido recibe solo su zona."
5. **(5:40 · completar · 3.3 y 3.4, tipos de datos y Supabase)** Supabase rechaza un pedido con el mensaje `invalid input syntax for type integer`, porque `cantidad` llegó como "3 ". Completa la expresión del Edit Fields, con el campo de tipo Number: `{{ Number(String($json.cantidad).____()) }}`.
   **Respuesta: `trim`.** *Retroalimentación:* "Primero se quita el espacio y después se convierte a número; así la base de datos recibe un entero."

**Registro:** el LMS guarda las respuestas; el tutor revisa quién falló las preguntas 3 y 4
antes de la sesión sincrónica del tramo 3.

---

## Cobertura del aprendizaje seleccionado por las dos herramientas

| Contenido del plan del AE3 (textual) | Tutorial | Video interactivo |
| --- | --- | --- |
| 3. NODOS CORE DE N8N Y MANIPULACIÓN DE DATOS | Pasos 5 a 17 | Todo el video |
| SET: MODIFICACIÓN DE DATOS. | Pasos 5 a 7 | Pregunta 1 |
| IF/SWITCH: LÓGICA CONDICIONAL. | — | Preguntas 2 y 3 |
| MERGE: COMBINACIÓN DE DATOS. | — | Pregunta 4 |
| FILTER: FILTRADO DE DATOS. | Paso 12 | — |
| SUMMARIZE: AGREGACIÓN DE DATOS. | Paso 13 | — |
| SPLIT: DIVISIÓN DE DATOS. | Paso 16 | — |
| MANIPULACIÓN DE DATOS. | Pasos 5 a 7 | Pregunta 5 |
| EXPRESIONES N8N: SINTAXIS Y FUNCIONES. | Pasos 5, 6, 12 y 16 | Preguntas 1 y 2 |
| TRANSFORMACIÓN DE FORMATOS. | Pasos 14 y 15 | — |
| MANEJO DE ARRAYS Y OBJETOS. | Paso 16 | — |
| VARIABLES DE ENTORNO. | Paso 8 | — |
| INTEGRACIÓN CON BASES DE DATOS. | Pasos 8 a 11 | — |
| SUPABASE: CONFIGURACIÓN BÁSICA. | Paso 8 | — |
| OPERACIONES CRUD BÁSICAS. | Pasos 9, 11 y 17 | Pregunta 5 |
| MANEJO DE DATOS RELACIONALES | — | Pregunta 4 |
