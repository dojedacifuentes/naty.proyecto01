# PF1821 · Cápsula 4 (AE4) · Decidir y depurar — guion

Base para HeyGen: `AE4-capsula.pptx` (una escena por lámina; la narración está en las notas).
Esta tabla es la misma narración, para otras herramientas o para pulirla antes de grabar.

| Lámina | En pantalla | Narración |
| --- | --- | --- |
| 1 | Cápsula 4: Decidir y depurar | Te doy la bienvenida a la cápsula 4 del módulo 2: Decidir y depurar. "Que el workflow decida, y que se deje revisar". |
| 2 | If o Switch | If o Switch. If: dos caminos (verdadero y falso). Switch: varias rutas por reglas o por una expresión. |
| 3 | Operadores | Operadores. Es igual, contiene, mayor o igual, está vacío, existe; se combinan con AND (todas) y OR (al menos una). En expresiones: ===, >=, &&, \/\/ (o), !. |
| 4 | Enrutar datos | Enrutar datos. Ejemplo de Mercado Austral: mayorista (por tipo o por monto), luego ventas; regiones, luego despacho regional; resto, luego bodega RM. El orden de las reglas importa: gana la primera que se cumple. |
| 5 | Casos borde | Casos borde. Campos vacíos, tipos equivocados, valores que nadie previó ("distribuidor"), duplicados. La salida de respaldo evita que se pierdan en silencio. |
| 6 | Herramientas de depuración | Herramientas de depuración. Historial de ejecuciones (cada corrida con sus datos), ejecutar un solo nodo, datos fijados, mensajes de error completos. |
| 7 | Contar ítems | Contar ítems. La prueba más útil: ¿cuántos ítems entran y cuántos salen de cada nodo? Si no cuadra, ahí está el problema. |
| 8 | Trazabilidad | Trazabilidad. Guardar en cada registro la ruta tomada y el id de la ejecución ({{ $execution.id }}); manejo de errores del nodo (On Error, luego Continue (using error output)) y un workflow de errores con Error Trigger. |
| 9 | Buenas prácticas de prueba | Buenas prácticas de prueba. Datos de prueba que incluyan casos sucios, probar cada ruta, nombrar los nodos por lo que hacen, anotar cada falla en la bitácora. |
| 10 | Tu tarea | Tu tarea. Video interactivo y actividad 2: "Rescate del workflow roto". |
