# PF1821 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** el de la contraparte: 3 quiz por curso, hechos en Canva.
**Reparto:** por tramo de la ruta. Quiz 1: AE1 y AE2 · Quiz 2: AE3 (el aprendizaje seleccionado)
· Quiz 3: AE4. Cinco preguntas cada uno, con una sola respuesta correcta y retroalimentación.
**Son formativos:** no llevan nota y **no repiten** las preguntas de la prueba objetiva
(instrumento 3) ni las del video interactivo, para no adelantar la evaluación.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.

---

## Quiz 1 · Entender y construir (AE1 y AE2)

**Cuándo:** al cerrar el tramo 2, después del workflow "Pedido a registro".

1. *(AE1)* ¿Cuál de estas tareas de Mercado Austral conviene **menos** automatizar?
   - a) Enviar un correo de confirmación por cada pedido
   - b) Sumar las ventas por comuna cada viernes
   - **c) Decidir qué proveedor nuevo contratar**
   - d) Registrar en la base los pedidos del formulario
   *Retroalimentación:* "Conviene automatizar lo repetitivo, de alto volumen y con reglas claras. Elegir un proveedor es una decisión de criterio, distinta cada vez: sigue siendo de las personas."
2. *(AE1)* Mercado Austral recibe 40 pedidos al día y copiar cada uno a la planilla toma 3 minutos. ¿Cuánto tiempo diario libera automatizar ese registro?
   - a) 40 minutos
   - **b) 2 horas**
   - c) 3 horas
   - d) 12 horas
   *Retroalimentación:* "40 pedidos × 3 minutos = 120 minutos, o sea 2 horas al día. Es la base para calcular el retorno de una automatización."
3. *(AE1)* ¿Dónde guarda n8n, de forma segura, los datos de acceso a un servicio como Supabase?
   - a) En una expresión dentro del nodo
   - b) En el nombre del workflow
   - c) En el historial de ejecuciones
   - **d) En una credencial**
   *Retroalimentación:* "Las credenciales se guardan cifradas y fuera del workflow. Así no quedan escritas en un nodo ni aparecen en una captura."
4. *(AE2)* Verdadero o falso: "Un workflow sin trigger se ejecuta solo cada vez que llega un pedido nuevo."
   - a) Verdadero
   - **b) Falso**
   *Retroalimentación:* "Para ejecutarse solo ante un evento, el workflow necesita un trigger, como un Form Trigger o un Webhook. Sin trigger, solo se ejecuta cuando lo corres a mano."
5. *(AE2)* Tu workflow "Pedido a registro" falla en el nodo de Supabase. ¿Qué revisas primero?
   - a) El nombre del workflow
   - b) La lista de workflows de la cuenta
   - **c) El panel de entrada (Input) del nodo de Supabase, para ver qué datos le llegaron**
   - d) El idioma de la interfaz de n8n
   *Retroalimentación:* "Cada nodo muestra lo que recibe y lo que entrega. Si el nodo que guarda falla, casi siempre la pista está en los datos que le llegaron."

---

## Quiz 2 · Transformar datos (AE3)

**Cuándo:** al cerrar el tramo 3, después del tutorial y de la parte C de la actividad 1.

1. *(AE3)* En n8n, cada ítem que viaja de un nodo a otro es:
   - a) Una fila de Excel
   - **b) Un objeto JSON con campos y valores**
   - c) Un archivo XML
   - d) Un texto plano sin estructura
   *Retroalimentación:* "n8n trabaja con ítems en JSON: cada uno tiene campos con su valor, como nombre, comuna o total. Los nodos procesan los ítems uno por uno."
2. *(AE3)* Necesitas quedarte solo con los pedidos de la comuna de Temuco. ¿Qué nodo usas?
   - a) Summarize
   - b) Merge
   - c) Split Out
   - **d) Filter**
   *Retroalimentación:* "Filter deja pasar solo los ítems que cumplen una condición. Summarize agrupa y calcula, Merge une dos flujos y Split Out separa una lista en ítems."
3. *(AE3)* Un pedido trae una lista `productos` con tres elementos y necesitas un ítem por producto. ¿Qué nodo usas?
   - **a) Split Out**
   - b) Merge
   - c) Summarize
   - d) If
   *Retroalimentación:* "Split Out convierte los elementos de una lista en ítems separados, para procesar cada producto por su cuenta."
4. *(AE3)* ¿Qué nodo transforma los ítems en un archivo CSV para descargarlo o enviarlo?
   - a) Extract from File
   - b) Edit Fields (Set)
   - **c) Convert to File**
   - d) Summarize
   *Retroalimentación:* "Convert to File genera el archivo, en CSV u otros formatos. Extract from File hace lo contrario: lee un archivo y lo convierte en ítems."
5. *(AE3)* ¿Qué operación del nodo de Supabase usas para agregar un pedido nuevo a la tabla `pedidos`?
   - a) Get many rows
   - **b) Create a row**
   - c) Update a row
   - d) Delete a row
   *Retroalimentación:* "Crear, leer, actualizar y borrar son las cuatro operaciones CRUD. Un pedido nuevo es una fila nueva: Create a row."

---

## Quiz 3 · Decidir y depurar (AE4)

**Cuándo:** al cerrar el tramo 4, antes del rescate del workflow roto.

1. *(AE4)* En una condición, ¿qué hace el operador NOT?
   - a) Exige que se cumplan todas las condiciones
   - b) Basta con que se cumpla una
   - c) Detiene el workflow
   - **d) Invierte el resultado: lo verdadero pasa a falso y lo falso a verdadero**
   *Retroalimentación:* "AND exige todas las condiciones, OR al menos una y NOT invierte el resultado. Combinándolos se arman las reglas de enrutamiento."
2. *(AE4)* ¿Qué nodo inicia un workflow de errores cada vez que falla la ejecución de otro workflow?
   - **a) Error Trigger**
   - b) Schedule Trigger
   - c) Webhook
   - d) If
   *Retroalimentación:* "Con Error Trigger armas un workflow que avisa o registra cada falla, sin revisar el historial a mano."
3. *(AE4)* Guardar en cada fila la ruta que tomó el pedido y el número de ejecución sirve para:
   - a) Que el workflow corra más rápido
   - b) Ahorrar espacio en la base de datos
   - **c) La trazabilidad: reconstruir qué pasó con cada pedido**
   - d) No tener que usar credenciales
   *Retroalimentación:* "Con la ruta y el id de ejecución, cualquier fila de la tabla te lleva a la ejecución exacta que la creó."
4. *(AE4)* Un "caso borde" es:
   - a) El último nodo de un workflow
   - **b) Una entrada poco común o no prevista, como un campo vacío, que puede romper la lógica**
   - c) Un error de conexión a internet
   - d) Un workflow desactivado
   *Retroalimentación:* "Los casos borde se prueban a propósito: un correo vacío, una comuna que no está en la tabla o una cantidad escrita con texto."
5. *(AE4)* En los ajustes de un nodo, la opción *On Error: Continue (using error output)* hace que:
   - a) El workflow se detenga completo en el primer error
   - b) Los ítems con error se borren sin aviso
   - c) El nodo se reintente para siempre
   - **d) Los ítems que fallan salgan por una salida de error y el workflow siga con los demás**
   *Retroalimentación:* "Así un pedido con problemas no detiene a los demás: sale por la salida de error y lo puedes registrar para revisarlo."
