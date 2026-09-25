# PF1821 · Infografías del módulo 2 — prompts

> Herramientas sugeridas: Genially o Canva (el equipo ya usa Genially), Napkin o Gamma. Si usas un
> generador de imágenes (ChatGPT, Gemini, Ideogram), pídele solo el diseño con espacios para
> el texto y escribe el texto encima: estos generadores suelen deformar las letras.
> Formato: vertical 1080 × 1920 px, exportada en PNG y, si la herramienta lo permite, interactiva.

## Infografía de la ruta del módulo (C3 · motivación)

```text
Diseña una infografía vertical titulada "Ruta del módulo 2: FUNDAMENTOS DE N8N Y MANIPULACIÓN DE DATOS". Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.
Contenido (textual, en este orden):
**Formato:** imagen vertical (1080 × 1920 px) en la portada del módulo, descargable en PDF, con
una versión en texto para lectores de pantalla (la de abajo). Un ícono por tramo, los mismos
que se usan en los títulos de cada sección del LMS para que la navegación sea consistente.

### Contenido por bloques

**Encabezado**
> MÓDULO 2 · FUNDAMENTOS DE N8N Y MANIPULACIÓN DE DATOS · 18 h
> *Tu misión: automatizar los pedidos de Mercado Austral.*

**Bloque "Al terminar serás capaz de"** (competencia del módulo, textual):
> CREAR WORKFLOWS BÁSICOS DE AUTOMATIZACIÓN UTILIZANDO N8N, MANIPULANDO DATOS MEDIANTE
> NODOS FUNDAMENTALES E INTEGRANDO BASES DE DATOS BÁSICAS, PARA RESOLVER PROBLEMÁTICAS
> EMPRESARIALES DE ACUERDO CON BUENAS PRÁCTICAS DE AUTOMATIZACIÓN.

**Bloque "Tu ruta"** (cuatro estaciones unidas por una línea, una por aprendizaje):

| Estación | Ícono | Título | Qué haces | Qué te llevas | Horas |
| --- | --- | --- | --- | --- | --- |
| 1 | Lupa sobre un engranaje | Entender | Descubres qué conviene automatizar y comparas n8n con otras herramientas | Mapa de procesos + cuadro comparativo | 3 h |
| 2 | Tres nodos conectados | Construir | Armas tu primer workflow: formulario → datos → base | Workflow "Pedido a registro" | 4 h |
| 3 | Flechas entre JSON, CSV y XML | Transformar | Limpias, conviertes y resumes datos; guardas en Supabase | Resumen por comuna en XML | 6 h |
| 4 | Bifurcación con una lupa | Decidir y depurar | Rutas condicionales y rescate del workflow roto | Workflow reparado + bitácora + insignias | 5 h |

**Bloque "Cómo te acompañamos"**
- 4 sesiones en vivo de 1,5 h, una por estación. `PENDIENTE:` días y horarios por institución.
- Devolución de cada actividad en máximo 2 días hábiles.
- Foro de dudas por estación, respondido por el tutor.

**Bloque "Cómo te evaluamos"**
- Rúbrica de tu workflow en las actividades 1 y 2 (35 %).
- Caso "Devoluciones" al cierre (45 %).
- Prueba de conceptos (20 %).
- Tu portafolio reúne todo: se publica en una URL que puedes mostrar a un empleador.

**Pie**
> Herramientas del módulo: n8n · Supabase · tu navegador.
> Empieza aquí → autodiagnóstico + tutorial "Tu primer workflow".
```

## Infografía AE1 · ¿Qué conviene automatizar? (herramienta didáctica · C4)

```text
Diseña una infografía vertical titulada "¿Qué conviene automatizar?". Subtítulo: "Aprendizaje esperado 1 del módulo 2". Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.
Caso que ilustra los ejemplos: Mercado Austral, una empresa ficticia.
Secciones (un ícono por sección, texto breve):
1. Qué es un workflow: Una secuencia de pasos que se ejecuta sola cuando ocurre algo: disparador, luego pasos, luego resultado.
2. Qué conviene automatizar: Tareas repetitivas, de alto volumen, con reglas claras y datos digitales.
3. Casos de uso empresariales: Registro de pedidos y formularios; avisos y notificaciones; sincronizar planillas, CRM y bases de datos; reportes periódicos; clasificación de solicitudes; incorporación de clientes.
4. Beneficios y retorno: Menos digitación y errores, respuesta inmediata, datos disponibles para decidir.
5. Arquitectura de n8n: Workflow (el flujo completo), nodos (cada paso: trigger, acción, lógica, transformación), conexiones, credenciales (acceso seguro a otros servicios), ejecuciones (cada vez que corre, con sus datos).
6. Componentes de la interfaz: Canvas, panel de nodos, parámetros del nodo, paneles de entrada y salida, historial de ejecuciones.
7. Ecosistema de nodos: Nodos nativos para cientos de servicios (bases de datos, correo, planillas, mensajería), HTTP Request para cualquier API, Code para lógica propia, nodos de IA (se ven en el módulo 5 del plan) y nodos de la comunidad.
8. n8n frente a otras plataformas: Ver el cuadro comparativo. Idea central: n8n puede instalarse en infraestructura propia, lo que da control sobre los datos.
```

Aprendizaje esperado (textual del plan, para la ficha del recurso en el LMS): DISTINGUIR LOS CONCEPTOS FUNDAMENTALES DE AUTOMATIZACIÓN DE WORKFLOWS Y LAS CARACTERÍSTICAS DE N8N, DE ACUERDO CON CASOS DE USO EMPRESARIALES REALES.

## Infografía AE2 · Tu primer workflow (herramienta didáctica · C4)

```text
Diseña una infografía vertical titulada "Tu primer workflow". Subtítulo: "Aprendizaje esperado 2 del módulo 2". Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.
Caso que ilustra los ejemplos: Mercado Austral, una empresa ficticia.
Secciones (un ícono por sección, texto breve):
1. El editor visual: Nodos que se arrastran y se conectan; cada nodo recibe ítems, hace algo y entrega ítems.
2. La estructura base: Trigger, luego procesar, luego ejecutar: algo inicia el flujo, los datos se preparan, y se hace la acción final. Con tres nodos ya hay un workflow útil.
3. Tipos de trigger: Manual (para probar), formulario de n8n, webhook (otra aplicación avisa), programado (cada viernes 18:00), eventos de aplicaciones.
4. Configurar un nodo: Parámetros, credencial si la necesita, y Execute step para probarlo solo.
5. Mirar los datos: Panel de entrada y de salida en vista tabla, JSON o esquema. Si no lo viste en la salida, no pasó.
6. Probar sin repetir: Pin data: fijar los datos de una ejecución para seguir construyendo sin volver a disparar el trigger.
7. Prueba y producción: URL de prueba (con Test workflow) y URL de producción (con el workflow activo). Activar es lo que lo deja corriendo solo.
8. Primeros errores: Nodo en rojo es leer el mensaje; nodo sin salida es revisar la entrada.
```

Aprendizaje esperado (textual del plan, para la ficha del recurso en el LMS): CREAR WORKFLOWS BÁSICOS UTILIZANDO LA INTERFAZ VISUAL DE N8N, PARA AUTOMATIZAR PROCESOS SIMPLES SEGÚN REQUERIMIENTOS DEFINIDOS.

## Infografía AE3 · Datos en movimiento (herramienta didáctica · C4)

```text
Diseña una infografía vertical titulada "Datos en movimiento". Subtítulo: "Aprendizaje esperado 3 del módulo 2". Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.
Caso que ilustra los ejemplos: Mercado Austral, una empresa ficticia.
Secciones (un ícono por sección, texto breve):
1. Cómo viajan los datos: Cada ítem es un objeto JSON con campos; un nodo puede recibir muchos ítems y procesa cada uno. Arrays y objetos anidados.
2. Nodos core de transformación: Edit Fields (Set): crear, cambiar o quitar campos, Filter: dejar pasar solo lo que cumple, Summarize: agrupar y sumar, contar, promediar, Split Out: separar una lista en ítems, Merge: unir dos flujos (por campo o por posición), If / Switch: se ven en el tramo 4.
3. Expresiones: Entre {{ }}.
4. Tipos de datos: Texto, número, booleano, fecha. Un número guardado como texto suma mal y la base de datos lo rechaza. Declarar el tipo en Edit Fields.
5. Formatos: JSON (nativo de n8n), CSV (Extract from File para leerlo, Convert to File para generarlo), XML (nodo XML, de JSON a XML y de vuelta).
6. Variables y configuración: Valores que no se escriben a mano en cada nodo: credenciales guardadas y variables del entorno de la instancia, cuando el administrador lo habilita.
7. Supabase en 5 minutos: Base de datos PostgreSQL en la nube: proyecto, luego tabla con columnas y tipos, luego credencial en n8n (URL del proyecto y clave de servicio, que nunca se pega en un nodo ni en una captura).
8. CRUD con el nodo Supabase: Create a row, Get a row / Get many rows, Update a row, Delete a row. Datos relacionales: una devolución guarda el id de su pedido.
```

Aprendizaje esperado (textual del plan, para la ficha del recurso en el LMS): MANIPULAR DATOS UTILIZANDO NODOS FUNDAMENTALES DE N8N, PARA TRANSFORMAR INFORMACIÓN SEGÚN REQUERIMIENTOS ESPECÍFICOS DEL WORKFLOW.

## Infografía AE4 · Decidir y depurar (herramienta didáctica · C4)

```text
Diseña una infografía vertical titulada "Decidir y depurar". Subtítulo: "Aprendizaje esperado 4 del módulo 2". Estilo: plano y limpio, fondo claro, íconos lineales simples, paleta azul petróleo #0E7490, azul oscuro #0F3D5E y un acento naranjo #F59E0B. En español de Chile. Sin logos ni nombres de instituciones: el recurso es común a todos los oferentes. Usa exactamente el texto indicado, sin agregar datos.
Caso que ilustra los ejemplos: Mercado Austral, una empresa ficticia.
Secciones (un ícono por sección, texto breve):
1. If o Switch: If: dos caminos (verdadero y falso). Switch: varias rutas por reglas o por una expresión.
2. Operadores: Es igual, contiene, mayor o igual, está vacío, existe; se combinan con AND (todas) y OR (al menos una). En expresiones: ===, >=, &&, \|\| (o), !.
3. Enrutar datos: Ejemplo de Mercado Austral: mayorista (por tipo o por monto), luego ventas; regiones, luego despacho regional; resto, luego bodega RM.
4. Casos borde: Campos vacíos, tipos equivocados, valores que nadie previó ("distribuidor"), duplicados. La salida de respaldo evita que se pierdan en silencio.
5. Herramientas de depuración: Historial de ejecuciones (cada corrida con sus datos), ejecutar un solo nodo, datos fijados, mensajes de error completos.
6. Contar ítems: La prueba más útil: ¿cuántos ítems entran y cuántos salen de cada nodo? Si no cuadra, ahí está el problema.
7. Trazabilidad: Guardar en cada registro la ruta tomada y el id de la ejecución ({{ $execution.id }}); manejo de errores del nodo (On Error, luego Continue (using error output)) y un workflow de errores con Error Trigger.
8. Buenas prácticas de prueba: Datos de prueba que incluyan casos sucios, probar cada ruta, nombrar los nodos por lo que hacen, anotar cada falla en la bitácora.
```

Aprendizaje esperado (textual del plan, para la ficha del recurso en el LMS): IMPLEMENTAR LÓGICA CONDICIONAL Y ESTRUCTURAS DE CONTROL EN WORKFLOWS, APLICANDO BUENAS PRÁCTICAS DE DEBUGGING Y TRAZABILIDAD.
