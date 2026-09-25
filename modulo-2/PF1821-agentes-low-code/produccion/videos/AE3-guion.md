# PF1821 · Cápsula 3 (AE3) · Datos en movimiento — guion

Base para HeyGen: `AE3-capsula.pptx`, una escena por lámina, con la narración en las notas.
Esta tabla trae la misma narración, para otras herramientas o para pulirla antes de grabar.

**Aprendizaje esperado 3 (textual del plan):** MANIPULAR DATOS UTILIZANDO NODOS FUNDAMENTALES DE N8N, PARA TRANSFORMAR INFORMACIÓN SEGÚN REQUERIMIENTOS ESPECÍFICOS DEL WORKFLOW.

**Criterios de evaluación (textuales del plan):**

- 3.1 MANIPULA DATOS UTILIZANDO NODOS FUNDAMENTALES DE N8N, PARA TRANSFORMAR INFORMACIÓN SEGÚN REQUERIMIENTOS ESPECÍFICOS DEL WORKFLOW.
- 3.2 IMPLEMENTA TRANSFORMACIONES DE DATOS ENTRE FORMATOS JSON, CSV Y XML.
- 3.3 APLICA EXPRESIONES N8N PARA PROCESAR Y FILTRAR INFORMACIÓN.
- 3.4 CONECTA BASES DE DATOS BÁSICAS USANDO SUPABASE, DE ACUERDO CON LOS REQUERIMIENTOS DEL WORKFLOW.

| Lámina | Contenido del plan (textual) | En pantalla | Narración |
| --- | --- | --- | --- |
| 1 | 3. NODOS CORE DE N8N Y MANIPULACIÓN DE DATOS | Cápsula 3: Datos en movimiento | Te doy la bienvenida a la cápsula 3 del módulo 2, Fundamentos de n8n y manipulación de datos: Datos en movimiento. "Datos limpios, workflows confiables". |
| 2 | Aprendizaje esperado y criterios de evaluación | Aprendizaje esperado 3 | Esta cápsula corresponde al aprendizaje esperado 3 del plan formativo: Manipular datos utilizando nodos fundamentales de n8n, para transformar información según requerimientos específicos del workflow. Sus criterios de evaluación son: Manipula datos utilizando nodos fundamentales de n8n, para transformar información según requerimientos específicos del workflow. Implementa transformaciones de datos entre formatos JSON, CSV y XML. Aplica expresiones n8n para procesar y filtrar información. Conecta bases de datos básicas usando Supabase, de acuerdo con los requerimientos del workflow. |
| 3 | MANIPULACIÓN DE DATOS. / MANEJO DE ARRAYS Y OBJETOS. | Cómo viajan los datos | Cómo viajan los datos. Cada ítem es un objeto JSON con campos; un nodo puede recibir muchos ítems y procesa cada uno. Arrays y objetos anidados. |
| 4 | SET: MODIFICACIÓN DE DATOS. / FILTER: FILTRADO DE DATOS. / SUMMARIZE: AGREGACIÓN DE DATOS. | Nodos core (1): modificar, filtrar y resumir | Nodos core (1): modificar, filtrar y resumir. Edit Fields (Set): crear, cambiar o quitar campos, Filter: dejar pasar solo lo que cumple, Summarize: agrupar y sumar, contar, promediar. |
| 5 | SPLIT: DIVISIÓN DE DATOS. / MERGE: COMBINACIÓN DE DATOS. / IF/SWITCH: LÓGICA CONDICIONAL. | Nodos core (2): dividir, combinar y decidir | Nodos core (2): dividir, combinar y decidir. Split Out: separar una lista en ítems, Merge: unir dos flujos (por campo o por posición), If o Switch: enviar cada ítem por un camino según una condición (If: dos caminos; Switch: varios). La lógica condicional se profundiza en la cápsula 4. |
| 6 | EXPRESIONES N8N: SINTAXIS Y FUNCIONES. | Expresiones | Expresiones. Entre dobles llaves. json punto campo (datos del nodo), la referencia a otro nodo por su nombre (datos de otro nodo), now (fecha y hora), métodos de texto y número: trim, toLowerCase, Number, toFixed. La vista previa muestra el resultado antes de ejecutar. |
| 7 | MANIPULACIÓN DE DATOS. | Tipos de datos | Tipos de datos. Texto, número, booleano, fecha. Un número guardado como texto suma mal y la base de datos lo rechaza. Declarar el tipo en Edit Fields. |
| 8 | TRANSFORMACIÓN DE FORMATOS. | Formatos | Formatos. JSON (nativo de n8n), CSV (Extract from File para leerlo, Convert to File para generarlo), XML (nodo XML, de JSON a XML y de vuelta). |
| 9 | VARIABLES DE ENTORNO. | Variables y configuración | Variables y configuración. Valores que no se escriben a mano en cada nodo: credenciales guardadas y variables del entorno de la instancia, cuando el administrador lo habilita. |
| 10 | INTEGRACIÓN CON BASES DE DATOS. / SUPABASE: CONFIGURACIÓN BÁSICA. | Supabase en 5 minutos | Supabase en 5 minutos. Base de datos PostgreSQL en la nube: proyecto, luego tabla con columnas y tipos, luego credencial en n8n (URL del proyecto y clave de servicio, que nunca se pega en un nodo ni en una captura). |
| 11 | OPERACIONES CRUD BÁSICAS. / MANEJO DE DATOS RELACIONALES | CRUD con el nodo Supabase | CRUD con el nodo Supabase. Create a row, Get a row o Get many rows, Update a row, Delete a row. Datos relacionales: una devolución guarda el id de su pedido. |
| 12 | — | Tu tarea | Tu tarea. Actividad 1, parte C: resumen por comuna en XML, y la tabla pedidos con tus filas. |

## Cobertura de los contenidos del plan

Cada contenido del aprendizaje esperado 3, tal como está en el plan, y la lámina donde aparece rotulado.

| Contenido del plan (textual) | Lámina |
| --- | --- |
| 3. NODOS CORE DE N8N Y MANIPULACIÓN DE DATOS | 1 |
| SET: MODIFICACIÓN DE DATOS. | 4 |
| IF/SWITCH: LÓGICA CONDICIONAL. | 5 |
| MERGE: COMBINACIÓN DE DATOS. | 5 |
| FILTER: FILTRADO DE DATOS. | 4 |
| SUMMARIZE: AGREGACIÓN DE DATOS. | 4 |
| SPLIT: DIVISIÓN DE DATOS. | 5 |
| MANIPULACIÓN DE DATOS. | 3, 7 |
| EXPRESIONES N8N: SINTAXIS Y FUNCIONES. | 6 |
| TRANSFORMACIÓN DE FORMATOS. | 8 |
| MANEJO DE ARRAYS Y OBJETOS. | 3 |
| VARIABLES DE ENTORNO. | 9 |
| INTEGRACIÓN CON BASES DE DATOS. | 10 |
| SUPABASE: CONFIGURACIÓN BÁSICA. | 10 |
| OPERACIONES CRUD BÁSICAS. | 11 |
| MANEJO DE DATOS RELACIONALES | 11 |
