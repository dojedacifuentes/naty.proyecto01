# PF1821 · Cápsula 3 (AE3) · Datos en movimiento — guion

Base para HeyGen: `AE3-capsula.pptx` (una escena por lámina; la narración está en las notas).
Esta tabla es la misma narración, para otras herramientas o para pulirla antes de grabar.

| Lámina | En pantalla | Narración |
| --- | --- | --- |
| 1 | Cápsula 3: Datos en movimiento | Te doy la bienvenida a la cápsula 3 del módulo 2: Datos en movimiento. "Datos limpios, workflows confiables". |
| 2 | Cómo viajan los datos | Cómo viajan los datos. Cada ítem es un objeto JSON con campos; un nodo puede recibir muchos ítems y procesa cada uno. Arrays y objetos anidados. |
| 3 | Nodos core de transformación | Nodos core de transformación. Edit Fields (Set): crear, cambiar o quitar campos, Filter: dejar pasar solo lo que cumple, Summarize: agrupar y sumar, contar, promediar, Split Out: separar una lista en ítems, Merge: unir dos flujos (por campo o por posición), If / Switch: se ven en el tramo 4. |
| 4 | Expresiones | Expresiones. Entre {{ }}. $json.campo (datos del nodo), $('Nombre del nodo').item.json.campo (datos de otro nodo), $now (fecha y hora), métodos de texto y número: trim(), toLowerCase(), Number(), toFixed(). La vista previa muestra el resultado antes de ejecutar. |
| 5 | Tipos de datos | Tipos de datos. Texto, número, booleano, fecha. Un número guardado como texto suma mal y la base de datos lo rechaza. Declarar el tipo en Edit Fields. |
| 6 | Formatos | Formatos. JSON (nativo de n8n), CSV (Extract from File para leerlo, Convert to File para generarlo), XML (nodo XML, de JSON a XML y de vuelta). |
| 7 | Variables y configuración | Variables y configuración. Valores que no se escriben a mano en cada nodo: credenciales guardadas y variables del entorno de la instancia, cuando el administrador lo habilita. |
| 8 | Supabase en 5 minutos | Supabase en 5 minutos. Base de datos PostgreSQL en la nube: proyecto, luego tabla con columnas y tipos, luego credencial en n8n (URL del proyecto y clave de servicio, que nunca se pega en un nodo ni en una captura). |
| 9 | CRUD con el nodo Supabase | CRUD con el nodo Supabase. Create a row, Get a row / Get many rows, Update a row, Delete a row. Datos relacionales: una devolución guarda el id de su pedido. |
| 10 | Tu tarea | Tu tarea. Actividad 1, parte C: resumen por comuna en XML, y la tabla pedidos con tus filas. |
