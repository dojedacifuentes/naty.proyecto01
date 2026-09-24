# PF1821 · Módulo 2 · B1 — Indicadores de logro

**Estado:** borrador · **Va en:** Anexo N°2, sección V.1 · **Guía:** Anexo N°7, num. 2
**Para el 7,0:** 3 indicadores por aprendizaje esperado → mínimo 12. Este archivo trae 13
(el AE3 lleva 4 porque el plan le asigna 4 criterios).

> Fórmula de cada indicador: **verbo en presente + contenido + condición**.
> Los aprendizajes esperados van TEXTUALES de SIPFOR. No se reformulan.
> Nota sobre la fuente: en SIPFOR, el criterio 3.1 del plan repite textual el AE3. Aquí no
> se usa como indicador; se reemplaza por uno observable.

<!-- verificable: ID=B1 tipo=tabla-indicadores min=3 -->
| Aprendizaje esperado (textual del plan) | Indicadores de logro |
| --- | --- |
| **AE1.** DISTINGUIR LOS CONCEPTOS FUNDAMENTALES DE AUTOMATIZACIÓN DE WORKFLOWS Y LAS CARACTERÍSTICAS DE N8N, DE ACUERDO CON CASOS DE USO EMPRESARIALES REALES. | **1.1** Identifica al menos tres procesos de un caso empresarial que conviene automatizar, justificando para cada uno el tiempo o los errores que evita. <br> **1.2** Describe la arquitectura de n8n —workflow, nodo, trigger, credencial y ejecución— mediante un diagrama propio que usa la terminología de la documentación oficial. <br> **1.3** Compara n8n con otras dos plataformas de automatización en un cuadro de al menos cuatro criterios, concluyendo cuál conviene para el caso y por qué. |
| **AE2.** CREAR WORKFLOWS BÁSICOS UTILIZANDO LA INTERFAZ VISUAL DE N8N, PARA AUTOMATIZAR PROCESOS SIMPLES SEGÚN REQUERIMIENTOS DEFINIDOS. | **2.1** Construye en el editor visual de n8n un workflow que se ejecuta sin errores a partir de un requerimiento escrito. <br> **2.2** Configura un trigger, al menos un nodo de procesamiento y una acción de salida, verificando en el panel de salida los datos que entrega cada nodo. <br> **2.3** Implementa un workflow de al menos tres nodos conectados que resuelve el registro de pedidos definido en el caso. |
| **AE3.** MANIPULAR DATOS UTILIZANDO NODOS FUNDAMENTALES DE N8N, PARA TRANSFORMAR INFORMACIÓN SEGÚN REQUERIMIENTOS ESPECÍFICOS DEL WORKFLOW. | **3.1** Transforma los campos de un pedido con los nodos Edit Fields (Set), Filter y Summarize, obteniendo exactamente la estructura de datos que pide el requerimiento. <br> **3.2** Convierte datos entre JSON, CSV y XML con los nodos de n8n correspondientes, sin perder ni duplicar registros. <br> **3.3** Aplica expresiones de n8n para calcular, dar formato y filtrar valores, comprobando el resultado con datos de prueba. <br> **3.4** Registra y consulta pedidos en una tabla de Supabase mediante el nodo Supabase, respetando el tipo de dato de cada columna. |
| **AE4.** IMPLEMENTAR LÓGICA CONDICIONAL Y ESTRUCTURAS DE CONTROL EN WORKFLOWS, APLICANDO BUENAS PRÁCTICAS DE DEBUGGING Y TRAZABILIDAD. | **4.1** Configura un workflow con al menos tres rutas condicionales (If o Switch) y una ruta de respaldo para los casos no previstos. <br> **4.2** Utiliza operadores lógicos y de comparación en expresiones de n8n para decidir la ruta de cada pedido según monto, tipo de cliente y comuna. <br> **4.3** Diagnostica y corrige errores de un workflow usando el historial de ejecuciones, los datos fijados (pin data) y la ejecución por nodo, registrando cada hallazgo en una bitácora. |

## Trazabilidad con los criterios del plan

| Criterio del plan (SIPFOR) | Indicador |
| --- | --- |
| 1.1 identifica aplicaciones donde la automatización aporta valor | 1.1 |
| 1.2 describe la arquitectura y componentes de n8n | 1.2 |
| 1.3 distingue ventajas de n8n frente a otras herramientas | 1.3 |
| 2.1 utiliza la interfaz visual | 2.1 |
| 2.2 configura triggers, nodos de procesamiento y acciones de salida | 2.2 |
| 2.3 implementa workflows con al menos tres nodos | 2.3 |
| 3.1 (repite el AE3) | 3.1 |
| 3.2 transformaciones entre JSON, CSV y XML | 3.2 |
| 3.3 aplica expresiones n8n | 3.3 |
| 3.4 conecta bases de datos con Supabase | 3.4 |
| 4.1 múltiples rutas condicionales | 4.1 |
| 4.2 operadores lógicos y comparaciones | 4.2 |
| 4.3 herramientas de debugging | 4.3 |
