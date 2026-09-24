# PF1821 · Módulo 2 · R03 y R04 — Cápsulas de contenido y cuadro comparativo

**Estado:** borrador · **Exigencia:** C4 d) uso de los medios (Anexo N°7, num. 7):
presentaciones y cuadro comparativo como medios para transferir el aprendizaje.
**Formato de cada cápsula:** presentación narrada de 8 a 12 minutos (8–10 láminas), con
transcripción. Una por aprendizaje esperado, en el orden de la ruta. Contenidos tomados de
la ficha SIPFOR del módulo (`00-ficha-sipfor.md`).

---

## Cápsula 1 · ¿Qué conviene automatizar? (AE1 · 1.1, 1.2, 1.3)

| # | Lámina | Contenido |
| --- | --- | --- |
| 1 | Portada | "Automatizar con sentido". El caso: Mercado Austral y sus pedidos copiados a mano. |
| 2 | Qué es un workflow | Una secuencia de pasos que se ejecuta sola cuando ocurre algo: **disparador → pasos → resultado**. Ejemplo: llega un pedido → se valida → se guarda → se avisa. |
| 3 | Qué conviene automatizar | Tareas **repetitivas**, de **alto volumen**, con **reglas claras** y datos digitales. Lo que no conviene: decisiones de criterio, tareas que ocurren una vez al año, procesos que todavía no están definidos. |
| 4 | Casos de uso empresariales | Registro de pedidos y formularios; avisos y notificaciones; sincronizar planillas, CRM y bases de datos; reportes periódicos; clasificación de solicitudes; incorporación de clientes. |
| 5 | Beneficios y retorno | Menos digitación y errores, respuesta inmediata, datos disponibles para decidir. Cálculo simple: 40 pedidos al día × 3 minutos = 2 h diarias ≈ 40 h al mes que se liberan. Retorno = valor de las horas liberadas − costo de la herramienta. |
| 6 | Arquitectura de n8n | **Workflow** (el flujo completo) · **nodos** (cada paso: trigger, acción, lógica, transformación) · **conexiones** · **credenciales** (acceso seguro a otros servicios) · **ejecuciones** (cada vez que corre, con sus datos). Los datos viajan como **ítems** en formato JSON. |
| 7 | Componentes de la interfaz | Canvas · panel de nodos · parámetros del nodo · paneles de entrada y salida · historial de ejecuciones. |
| 8 | Ecosistema de nodos | Nodos nativos para cientos de servicios (bases de datos, correo, planillas, mensajería), **HTTP Request** para cualquier API, **Code** para lógica propia, nodos de IA (se ven en el módulo 5 del plan) y nodos de la comunidad. |
| 9 | n8n frente a otras plataformas | Ver el cuadro comparativo R04. Idea central: n8n puede instalarse en infraestructura propia, lo que da control sobre los datos. |
| 10 | Tu tarea | Mapa de Mercado Austral: tres procesos que conviene automatizar y qué gana la empresa con cada uno. Va a tu portafolio (sección 1). |

---

## Cápsula 2 · Tu primer workflow (AE2 · 2.1, 2.2, 2.3)

| # | Lámina | Contenido |
| --- | --- | --- |
| 1 | Portada | "De la idea al primer workflow que corre solo". |
| 2 | El editor visual | Nodos que se arrastran y se conectan; cada nodo recibe ítems, hace algo y entrega ítems. |
| 3 | La estructura base | **Trigger → procesar → ejecutar**: algo inicia el flujo, los datos se preparan, y se hace la acción final. Con tres nodos ya hay un workflow útil. |
| 4 | Tipos de trigger | Manual (para probar), formulario de n8n, webhook (otra aplicación avisa), programado (cada viernes 18:00), eventos de aplicaciones. |
| 5 | Configurar un nodo | Parámetros, credencial si la necesita, y *Execute step* para probarlo solo. |
| 6 | Mirar los datos | Panel de entrada y de salida en vista tabla, JSON o esquema. Si no lo viste en la salida, no pasó. |
| 7 | Probar sin repetir | *Pin data*: fijar los datos de una ejecución para seguir construyendo sin volver a disparar el trigger. |
| 8 | Prueba y producción | URL de prueba (con *Test workflow*) y URL de producción (con el workflow activo). Activar es lo que lo deja corriendo solo. |
| 9 | Primeros errores | Nodo en rojo = leer el mensaje; nodo sin salida = revisar la entrada. |
| 10 | Tu tarea | Tutorial R05 y actividad 1, parte B: "Pedido a registro". |

---

## Cápsula 3 · Datos en movimiento (AE3 · 3.1, 3.2, 3.3, 3.4)

| # | Lámina | Contenido |
| --- | --- | --- |
| 1 | Portada | "Datos limpios, workflows confiables". |
| 2 | Cómo viajan los datos | Cada ítem es un objeto JSON con campos; un nodo puede recibir muchos ítems y procesa cada uno. Arrays y objetos anidados. |
| 3 | Nodos core de transformación | **Edit Fields (Set)**: crear, cambiar o quitar campos · **Filter**: dejar pasar solo lo que cumple · **Summarize**: agrupar y sumar, contar, promediar · **Split Out**: separar una lista en ítems · **Merge**: unir dos flujos (por campo o por posición) · **If / Switch**: se ven en el tramo 4. |
| 4 | Expresiones | Entre `{{ }}`. `$json.campo` (datos del nodo) · `$('Nombre del nodo').item.json.campo` (datos de otro nodo) · `$now` (fecha y hora) · métodos de texto y número: `trim()`, `toLowerCase()`, `Number()`, `toFixed()`. La vista previa muestra el resultado antes de ejecutar. |
| 5 | Tipos de datos | Texto, número, booleano, fecha. Un número guardado como texto suma mal y la base de datos lo rechaza. Declarar el tipo en Edit Fields. |
| 6 | Formatos | **JSON** (nativo de n8n) · **CSV** (*Extract from File* para leerlo, *Convert to File* para generarlo) · **XML** (nodo XML, de JSON a XML y de vuelta). |
| 7 | Variables y configuración | Valores que no se escriben a mano en cada nodo: credenciales guardadas y variables del entorno de la instancia, cuando el administrador lo habilita. |
| 8 | Supabase en 5 minutos | Base de datos PostgreSQL en la nube: proyecto → tabla con columnas y tipos → credencial en n8n (URL del proyecto y clave de servicio, que **nunca** se pega en un nodo ni en una captura). |
| 9 | CRUD con el nodo Supabase | *Create a row* · *Get a row* / *Get many rows* · *Update a row* · *Delete a row*. Datos relacionales: una devolución guarda el `id` de su pedido. |
| 10 | Tu tarea | Actividad 1, parte C: resumen por comuna en XML, y la tabla `pedidos` con tus filas. |

---

## Cápsula 4 · Decidir y depurar (AE4 · 4.1, 4.2, 4.3)

| # | Lámina | Contenido |
| --- | --- | --- |
| 1 | Portada | "Que el workflow decida, y que se deje revisar". |
| 2 | If o Switch | **If**: dos caminos (verdadero y falso). **Switch**: varias rutas por reglas o por una expresión. |
| 3 | Operadores | Es igual, contiene, mayor o igual, está vacío, existe; se combinan con **AND** (todas) y **OR** (al menos una). En expresiones: `===`, `>=`, `&&`, `\|\|` (o), `!`. |
| 4 | Enrutar datos | Ejemplo de Mercado Austral: mayorista (por tipo o por monto) → ventas; regiones → despacho regional; resto → bodega RM. El orden de las reglas importa: gana la primera que se cumple. |
| 5 | Casos borde | Campos vacíos, tipos equivocados, valores que nadie previó ("distribuidor"), duplicados. La **salida de respaldo** evita que se pierdan en silencio. |
| 6 | Herramientas de depuración | Historial de ejecuciones (cada corrida con sus datos) · ejecutar un solo nodo · datos fijados · mensajes de error completos. |
| 7 | Contar ítems | La prueba más útil: ¿cuántos ítems entran y cuántos salen de cada nodo? Si no cuadra, ahí está el problema. |
| 8 | Trazabilidad | Guardar en cada registro la ruta tomada y el id de la ejecución (`{{ $execution.id }}`); manejo de errores del nodo (*On Error → Continue (using error output)*) y un workflow de errores con *Error Trigger*. |
| 9 | Buenas prácticas de prueba | Datos de prueba que incluyan casos sucios · probar cada ruta · nombrar los nodos por lo que hacen · anotar cada falla en la bitácora. |
| 10 | Tu tarea | Video interactivo R06 y actividad 2: "Rescate del workflow roto". |

---

## R04 · Cuadro comparativo: n8n, Make y Zapier

**AE1 · indicador 1.3.** Se entrega como tabla en el LMS; en la actividad 1 el
participante agrega una fila propia y escribe su conclusión para Mercado Austral.

| Criterio | n8n | Make | Zapier |
| --- | --- | --- | --- |
| Dónde corre | En la nube del proveedor **o** en infraestructura propia (autoalojado) | Solo en la nube del proveedor | Solo en la nube del proveedor |
| Licencia | Código disponible bajo licencia *fair-code*; uso interno gratuito si se autoaloja | Servicio comercial | Servicio comercial |
| Control de los datos | Total si se autoaloja: los datos no salen de la empresa | Pasan por los servidores del proveedor | Pasan por los servidores del proveedor |
| Forma de construir | Canvas de nodos con ramas, uniones y bucles | Escenarios visuales con módulos y enrutadores | Flujos ("Zaps") mayormente lineales, con rutas y filtros |
| Lógica propia | Nodo Code (JavaScript o Python) y expresiones en cualquier campo | Funciones y fórmulas integradas | Pasos de código (JavaScript o Python) |
| Integraciones | Cientos de nodos nativos + HTTP Request para cualquier API | Miles de aplicaciones | La mayor cantidad de aplicaciones listas |
| Unidad de cobro en la nube | Por ejecución del workflow | Por consumo de cada acción | Por tarea ejecutada |
| Curva de aprendizaje | Media: pide entender datos y expresiones | Media | Baja para flujos simples |

**Conclusión modelo para el caso:** para Mercado Austral conviene n8n, porque maneja datos
de clientes que puede mantener en su propia infraestructura, porque un workflow con muchas
ramas se cobra por ejecución y no por cada paso, y porque la lógica de enrutamiento que
necesita (tipos, montos, comunas) se resuelve con expresiones y el nodo Code sin salir de
la herramienta.

`PENDIENTE:` las cifras de integraciones y los precios cambian seguido; el tutor verifica
las unidades de cobro vigentes en el sitio de cada proveedor antes de publicar el cuadro.
