# PF1821 · Cápsula 4 (AE4) · Decidir y depurar — guion

Base para HeyGen: `AE4-capsula.pptx`, una escena por lámina, con la narración en las notas.
Esta tabla trae la misma narración, para otras herramientas o para pulirla antes de grabar.

**Aprendizaje esperado 4 (textual del plan):** IMPLEMENTAR LÓGICA CONDICIONAL Y ESTRUCTURAS DE CONTROL EN WORKFLOWS, APLICANDO BUENAS PRÁCTICAS DE DEBUGGING Y TRAZABILIDAD.

**Criterios de evaluación (textuales del plan):**

- 4.1 CONFIGURA WORKFLOWS CON MÚLTIPLES RUTAS CONDICIONALES.
- 4.2 UTILIZA OPERADORES LÓGICOS Y COMPARACIONES EN EXPRESIONES N8N.
- 4.3 APLICA HERRAMIENTAS DE DEBUGGING PARA IDENTIFICAR ERRORES BÁSICOS EN WORKFLOWS.

| Lámina | Contenido del plan (textual) | En pantalla | Narración |
| --- | --- | --- | --- |
| 1 | 4. LÓGICA CONDICIONAL Y DEBUGGING EN N8N | Cápsula 4: Decidir y depurar | Te doy la bienvenida a la cápsula 4 del módulo 2, Fundamentos de n8n y manipulación de datos: Decidir y depurar. "Que el workflow decida, y que se deje revisar". |
| 2 | Aprendizaje esperado y criterios de evaluación | Aprendizaje esperado 4 | Esta cápsula corresponde al aprendizaje esperado 4 del plan formativo: Implementar lógica condicional y estructuras de control en workflows, aplicando buenas prácticas de debugging y trazabilidad. Sus criterios de evaluación son: Configura workflows con múltiples rutas condicionales. Utiliza operadores lógicos y comparaciones en expresiones n8n. Aplica herramientas de debugging para identificar errores básicos en workflows. |
| 3 | ROUTING DE DATOS. | If o Switch | If o Switch. If: dos caminos (verdadero y falso). Switch: varias rutas por reglas o por una expresión. |
| 4 | OPERADORES Y EXPRESIONES COMPLEJAS. | Operadores | Operadores. Es igual, contiene, mayor o igual, está vacío, existe; se combinan con AND (todas) y OR (al menos una). En expresiones: triple igual, mayor o igual, doble ampersand (y), doble barra (o), signo de exclamación (no). |
| 5 | ROUTING DE DATOS. | Enrutar datos | Enrutar datos. Ejemplo de Mercado Austral: mayorista (por tipo o por monto), luego ventas; regiones, luego despacho regional; resto, luego bodega RM. El orden de las reglas importa: gana la primera que se cumple. |
| 6 | MANEJO DE CASOS EDGE. | Casos borde | Casos borde. Campos vacíos, tipos equivocados, valores que nadie previó ("distribuidor"), duplicados. La salida de respaldo evita que se pierdan en silencio. |
| 7 | HERRAMIENTAS DE DEBUG EN N8N. | Herramientas de depuración | Herramientas de depuración. Historial de ejecuciones (cada corrida con sus datos), ejecutar un solo nodo, datos fijados, mensajes de error completos. |
| 8 | HERRAMIENTAS DE DEBUG EN N8N. | Contar ítems | Contar ítems. La prueba más útil: ¿cuántos ítems entran y cuántos salen de cada nodo? Si no cuadra, ahí está el problema. |
| 9 | LOGS Y TRAZABILIDAD. | Trazabilidad | Trazabilidad. Guardar en cada registro la ruta tomada y el id de la ejecución (el identificador de la ejecución); manejo de errores del nodo (On Error, luego Continue (using error output)) y un workflow de errores con Error Trigger. |
| 10 | MEJORES PRÁCTICAS DE TESTING. | Buenas prácticas de prueba | Buenas prácticas de prueba. Datos de prueba que incluyan casos sucios, probar cada ruta, nombrar los nodos por lo que hacen, anotar cada falla en la bitácora. |
| 11 | — | Tu tarea | Tu tarea. Video interactivo y actividad 2: "Rescate del workflow roto". |

## Cobertura de los contenidos del plan

Cada contenido del aprendizaje esperado 4, tal como está en el plan, y la lámina donde aparece rotulado.

| Contenido del plan (textual) | Lámina |
| --- | --- |
| 4. LÓGICA CONDICIONAL Y DEBUGGING EN N8N | 1 |
| OPERADORES Y EXPRESIONES COMPLEJAS. | 4 |
| ROUTING DE DATOS. | 3, 5 |
| MANEJO DE CASOS EDGE. | 6 |
| HERRAMIENTAS DE DEBUG EN N8N. | 7, 8 |
| LOGS Y TRAZABILIDAD. | 9 |
| MEJORES PRÁCTICAS DE TESTING. | 10 |
