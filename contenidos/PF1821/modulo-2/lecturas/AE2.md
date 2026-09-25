---
bajada: Cómo se usa la interfaz de n8n para crear, configurar, probar y activar un workflow de tres nodos que registra los pedidos de Mercado Austral.
---

# Lectura AE2 · Tu primer workflow

## Antes de empezar
plan: 2. CREACIÓN DE WORKFLOWS EN LA INTERFAZ DE USUARIO DE N8N

En el aprendizaje anterior decidiste **qué** automatizar en Mercado Austral. Ahora toca construirlo. Esta lectura recorre la interfaz de n8n con un objetivo concreto: que llegues a un workflow de tres nodos que recibe un pedido desde un formulario, prepara los datos y los guarda, y que quede funcionando solo.

Para eso necesitas manejar cuatro cosas: el editor donde se arma el workflow, la configuración de cada nodo, la forma de mirar los datos que pasan y las herramientas para probar sin perder tiempo. Todas aparecen en el tutorial guiado del curso; aquí se explica el porqué de cada paso.

:::flujo El workflow que vas a construir
Form Trigger | Recibe el pedido
Edit Fields | Prepara los datos
Supabase | Guarda la fila
:::

Lee con n8n abierto y reproduce cada ejemplo. Los nombres de algunos botones cambian entre versiones de n8n; cuando eso ocurre, la lectura indica las dos formas en que puedes encontrarlos.

## Editor visual y espacio de trabajo
plan: EDITOR VISUAL: NODOS Y CONEXIONES. / WORKSPACE Y NAVEGACIÓN.

El **editor visual** de n8n es un lienzo, el *canvas*, donde cada paso del workflow es un **nodo** y cada línea entre nodos es una **conexión**. Un nodo recibe ítems por su lado izquierdo, hace algo con ellos y los entrega por su lado derecho. Para conectar dos nodos se arrastra desde la salida de uno hasta la entrada del otro; para agregar un nodo a continuación de otro, se usa el botón **+** que aparece en su salida.

El **espacio de trabajo** (*workspace*) es todo lo que rodea al canvas. Desde la vista general navegas entre tus **workflows**, tus **credenciales** y el registro de **ejecuciones**, y según la versión y el plan, también entre proyectos. Cada workflow se abre en su propio canvas, con su nombre arriba, el botón para guardar y el interruptor para activarlo. Dentro del canvas te mueves arrastrando el fondo, acercas o alejas con los controles de zoom y usas el botón de ajustar a la pantalla cuando el workflow crece.

:::ejemplo Crear el workflow del curso
En la vista general, crea un workflow nuevo y ponle un nombre que diga qué hace y de quién es: "Pedido a registro – Camila". El canvas aparece vacío, con un botón para agregar el primer paso. Un buen nombre parece un detalle, pero cuando tengas diez workflows será la única forma de encontrar el correcto.
:::

:::error El workflow sin guardar
n8n no guarda cada cambio automáticamente en todas las versiones. Si cierras la pestaña después de configurar tres nodos sin guardar, se pierden. Guarda con el botón o con Ctrl + S cada vez que un nodo quede funcionando.
:::

## La estructura base
plan: PRIMEROS WORKFLOWS. / ESTRUCTURA TRIGGER, PROCESAR Y EJECUTAR.

Casi todos los workflows, desde los primeros hasta los más complejos, siguen la misma estructura: **trigger, procesar y ejecutar**. El **trigger** es el nodo que inicia el flujo cuando ocurre algo. **Procesar** es preparar los datos: limpiarlos, calcular valores, decidir. **Ejecutar** es la acción final que produce el resultado: guardar, enviar, avisar.

Con tres nodos, uno por parte, ya hay un workflow útil. Es también lo mínimo que pide este aprendizaje: un workflow funcional con al menos tres nodos conectados, con su trigger, su procesamiento y su acción de salida. A medida que el proceso crece, cada parte puede tener más nodos, pero la estructura se mantiene.

| Parte | Pregunta que responde | Nodo en "Pedido a registro" |
| --- | --- | --- |
| Trigger | ¿Cuándo empieza? | n8n Form Trigger: al enviarse el formulario |
| Procesar | ¿Qué hay que preparar? | Edit Fields: correo en minúsculas, comuna sin espacios, total calculado |
| Ejecutar | ¿Qué resultado se produce? | Supabase: una fila nueva en la tabla `pedidos` |

:::ejemplo El primer workflow de Mercado Austral
Una clienta completa el formulario "Nuevo pedido" con 2 kg de café para Ñuñoa. El **Form Trigger** recibe los siete campos. El **Edit Fields** deja el correo en minúsculas y calcula `total` = 25000. El nodo **Supabase** crea la fila. Todo ocurre en segundos, sin que nadie en Mercado Austral toque el pedido.
:::

## Tipos de trigger
plan: CONFIGURACIÓN DE NODOS BÁSICOS.

El trigger define **cuándo** corre el workflow, y elegir el correcto es la primera decisión de configuración. Los más usados son cinco:

- **Manual.** Se ejecuta al pulsar el botón de prueba del workflow. Sirve para construir y probar, no para producción.
- **Formulario de n8n** (*n8n Form Trigger*). n8n publica un formulario web con los campos que definas y el workflow corre con cada envío.
- **Webhook.** Otra aplicación avisa enviando una solicitud HTTP a una URL que n8n entrega. Es la forma estándar de conectar sistemas.
- **Programado** (*Schedule Trigger*). Corre cada cierto tiempo o en un momento fijo, como todos los viernes a las 18:00.
- **Eventos de aplicaciones.** Muchos nodos nativos tienen su propio trigger: un correo nuevo, una fila nueva en una planilla, un mensaje en un canal.

:::ejemplo Dos triggers para dos procesos
"Pedido a registro" usa el **formulario de n8n**, porque cada pedido debe registrarse apenas llega. El "Resumen semanal" que construirás más adelante se prueba con el trigger **manual** y en producción usa el **programado**, los viernes a las 18:00, porque facturación lo necesita una vez por semana.
:::

## Configurar un nodo
plan: PANEL DE CONFIGURACIÓN. / CONFIGURACIÓN DE NODOS BÁSICOS.

Al hacer doble clic en un nodo se abre su **panel de configuración**. Al centro están los **parámetros**: lo que el nodo necesita saber para hacer su trabajo, como la operación, la tabla o los campos. Los obligatorios se marcan, y el nodo muestra un aviso mientras falte alguno. Si el nodo se conecta con otro servicio, pide una **credencial**, que se elige de una lista o se crea en ese momento.

El panel tiene además una pestaña de **ajustes** (*Settings*) con opciones del comportamiento del nodo, como qué hacer si falla, y permite **renombrarlo**. Un nodo llamado "Normalizar pedido" se entiende; uno llamado "Edit Fields1", no. El botón para ejecutar solo ese paso (*Execute step* o *Test step*, según la versión) lo prueba con los datos que tiene a la entrada, sin correr todo el workflow.

:::ejemplo El formulario de pedidos
En el **n8n Form Trigger**, el título es "Nuevo pedido" y se crean siete campos con estas etiquetas exactas: `nombre`, `email`, `comuna`, `tipo_cliente`, `producto`, `cantidad` y `precio_unitario`. Los tipos ayudan a validar: Email para `email`, lista desplegable con "minorista" y "mayorista" para `tipo_cliente` y Number para cantidad y precio.
:::

:::error Una mayúscula de más
Las etiquetas del formulario se convierten en los nombres de los campos. Si escribes "Email" en vez de "email", los nodos siguientes que buscan `email` no lo encuentran y reciben un valor vacío. n8n distingue mayúsculas de minúsculas: decide una convención y úsala en todo el workflow.
:::

## Mirar los datos
plan: PANEL DE CONFIGURACIÓN.

La parte más útil del panel de configuración no son los parámetros: son los **paneles de entrada y de salida**, a cada lado. El de entrada muestra los ítems que llegan al nodo; el de salida, los que entrega después de ejecutarse. Comparar los dos es la forma más directa de saber si el nodo hizo lo que esperabas.

Cada panel ofrece tres vistas. **Table** muestra los ítems como filas y los campos como columnas: sirve para revisar muchos datos a la vez. **JSON** muestra la estructura exacta, con comillas, números y anidación: sirve para ver tipos y detalles. **Schema** muestra solo los campos y sus tipos. Desde la entrada puedes **arrastrar un campo** hasta un parámetro, y n8n escribe por ti la expresión que lo referencia.

:::ejemplo Comprobar la normalización
En el panel de entrada del Edit Fields, la comuna aparece como "  Ñuñoa " y el correo con mayúsculas. Después de ejecutar el paso, el panel de salida muestra "Ñuñoa" y el correo en minúsculas. En la vista JSON, `total` aparece como `25000`, sin comillas: es un número. Si tuviera comillas, sería texto, y habría que revisar el tipo del campo.
:::

:::clave
Si no lo viste en el panel de salida, no pasó. Antes de agregar el siguiente nodo, ejecuta el actual y revisa su salida.
:::

## Probar sin repetir
plan: TESTING Y DEBUGGING INICIAL.

Construir un workflow es probarlo muchas veces. Si cada prueba obliga a llenar el formulario de nuevo, se pierde tiempo y se cometen errores al tipear. Para eso existe **fijar los datos** (*pin data*): tomas la salida de una ejecución de un nodo y la dejas fija, de modo que las pruebas siguientes usan esos mismos datos sin volver a disparar el trigger.

Los datos fijados se marcan con un ícono en el nodo y se pueden editar para probar otros casos, por ejemplo una cantidad en cero o una comuna mal escrita. Solo se usan mientras construyes y pruebas desde el editor: las ejecuciones de producción siempre trabajan con los datos reales que llegan.

:::ejemplo Un pedido de prueba para todo el tutorial
Envías una vez el formulario de prueba con la comuna escrita "  Ñuñoa ", con espacios a propósito. En el panel de salida del Form Trigger fijas esos datos. Desde ahí configuras el Edit Fields y el nodo Supabase ejecutando paso a paso, siempre con el mismo pedido, sin volver a abrir el formulario.
:::

:::error Olvidar que hay datos fijados
Si cambias el formulario (por ejemplo, agregas un campo) pero el trigger sigue con datos fijados, las pruebas usan los datos antiguos y el campo nuevo "no llega". Cuando cambies la entrada, despeja los datos fijados y vuelve a enviar una prueba.
:::

## Prueba y producción
plan: TESTING Y DEBUGGING INICIAL.

Los triggers de formulario y de webhook tienen **dos URL**. La **URL de prueba** funciona mientras el editor está escuchando: después de pulsar el botón de prueba del workflow (*Test workflow* o *Execute workflow*, según la versión), recibe un envío y muestra los datos en el editor. La **URL de producción** funciona cuando el workflow está **activo**, y cada envío genera una ejecución que queda en el historial.

Activar el workflow es lo que lo deja corriendo solo. Mientras está inactivo, solo corre cuando tú lo pruebas. El interruptor de activación está en la parte superior del canvas; en las versiones más recientes puede aparecer como una acción para publicar el workflow. Antes de activarlo, asegúrate de haberlo probado con datos que representen los casos reales.

:::ejemplo Del tutorial a los pedidos reales
Terminado el workflow, lo guardas y lo activas. Envías un pedido desde la **URL de producción** del formulario, y la nueva fila aparece en la tabla `pedidos`, con su ejecución en el historial. Esa es la URL que Mercado Austral publica en su sitio. La URL de prueba queda solo para seguir desarrollando.
:::

:::error Publicar la URL de prueba
Si el sitio de la empresa enlaza la URL de prueba, los pedidos solo se registran mientras alguien tiene el editor abierto y escuchando. El resto se pierde. En producción siempre va la URL de producción, con el workflow activo.
:::

## Primeros errores
plan: TESTING Y DEBUGGING INICIAL.

Los errores son parte de construir. Lo importante es leerlos bien. Hay tres señales básicas. Un **nodo en rojo** falló: al abrirlo, el mensaje de error dice qué pasó, y muchas veces qué campo o qué valor lo causó. Un **nodo con aviso** tiene un problema de configuración, como un parámetro obligatorio vacío o una credencial que falta. Y un **nodo sin salida** se ejecutó pero no entregó ítems: el problema casi siempre está en su entrada.

La depuración inicial sigue siempre el mismo orden: leer el mensaje completo, mirar la entrada del nodo que falló, comparar con lo que esperabas y corregir una cosa a la vez. En el aprendizaje esperado 4 vas a sumar herramientas más potentes, como el historial de ejecuciones y el conteo de ítems por nodo.

| Señal | Qué suele significar | Qué revisar primero |
| --- | --- | --- |
| Nodo en rojo | Error al ejecutar | El mensaje de error completo y el panel de entrada |
| Nodo con aviso | Configuración incompleta | Parámetros obligatorios y credencial |
| Nodo sin salida | No recibió o no produjo ítems | La salida del nodo anterior |
| Campo vacío en la salida | La expresión no encontró el campo | El nombre exacto del campo, con mayúsculas |

:::ejemplo La fila que Supabase rechazó
Al ejecutar el nodo Supabase aparece en rojo con el mensaje `invalid input syntax for type integer`. En su panel de entrada, `cantidad` aparece como `"2"`, entre comillas. La causa está un paso antes: en el Edit Fields, `cantidad` quedó como texto. Se cambia el tipo a Number, se vuelve a ejecutar y la fila se crea.
:::

## En síntesis

- El canvas muestra el workflow como nodos y conexiones; la vista general lleva a workflows, credenciales y ejecuciones.
- Todo workflow sigue la estructura trigger, procesar y ejecutar; con tres nodos conectados ya hay uno funcional.
- El trigger define cuándo corre: manual, formulario, webhook, programado o evento de una aplicación.
- El panel de configuración tiene los parámetros, la credencial, los ajustes y el botón para ejecutar solo ese paso.
- Los paneles de entrada y de salida, en vista Table, JSON o Schema, muestran qué recibe y qué entrega cada nodo.
- Fijar datos evita repetir el trigger mientras construyes; en producción se usan los datos reales.
- La URL de prueba sirve para desarrollar; la de producción funciona con el workflow activo.
- Ante un error: leer el mensaje, mirar la entrada, comparar y corregir una cosa a la vez.

## Para practicar

- **Tutorial guiado "Tu primer workflow en n8n".** Diez pasos con capturas, desde el workflow vacío hasta el pedido real guardado en Supabase.
- **Actividad 1, "Del formulario a la base de datos", parte B.** Construyes el workflow "Pedido a registro" y lo entregas exportado, con una captura de la tabla con tres filas creadas por él.
- **Documentación oficial.** La de n8n (docs.n8n.io) describe el editor, cada trigger y el uso de datos fijados.

## Autocomprobación

1. ¿Cuáles son las tres partes de la estructura base de un workflow? Da el nodo que cumple cada una en "Pedido a registro".
   Respuesta: Trigger, procesar y ejecutar. En "Pedido a registro", el trigger es el n8n Form Trigger, el procesamiento es el Edit Fields que normaliza y calcula el total, y la ejecución es el nodo Supabase que crea la fila (sección 2).
2. El workflow funcionó en todas tus pruebas, pero los pedidos que llegaron hoy desde el sitio no quedaron registrados. ¿Qué dos cosas revisas primero?
   Respuesta: Que el workflow esté activo y que el sitio use la URL de producción del formulario, no la de prueba. La URL de prueba solo funciona mientras el editor está escuchando (sección 7).
3. ¿Para qué sirve fijar datos en un nodo y en qué ejecuciones no se usan?
   Respuesta: Para seguir construyendo y probar los nodos siguientes sin volver a disparar el trigger, siempre con los mismos datos. No se usan en las ejecuciones de producción, que trabajan con los datos reales (sección 6).

## Glosario

- **Canvas**: lienzo del editor de n8n donde se ven y se conectan los nodos de un workflow.
- **Panel de configuración**: vista que se abre al hacer doble clic en un nodo, con sus parámetros, su credencial, sus ajustes y los paneles de entrada y salida.
- **Parámetro**: dato que un nodo necesita para hacer su trabajo, como la operación, la tabla o un campo.
- **Datos fijados**: salida de un nodo que se deja fija (*pin data*) para probar los nodos siguientes sin repetir el trigger.
- **URL de prueba**: dirección de un formulario o webhook que solo recibe datos mientras el editor está escuchando.
- **URL de producción**: dirección de un formulario o webhook que recibe datos cuando el workflow está activo.
- **Webhook**: URL que entrega n8n para que otra aplicación inicie un workflow enviando una solicitud HTTP.
- **Schedule Trigger**: trigger que ejecuta un workflow cada cierto tiempo o en un momento fijo.
