# PF1821 · Módulo 2 · B2 — Instrumentos de evaluación

**Estado:** borrador · **Va en:** Anexo N°2, sección V.2 · **Guía:** Anexo N°7, num. 3, 3.1–3.3
**Para el 7,0:** 3 instrumentos distintos, cada uno con todos los aprendizajes esperados.

<!-- verificable: ID=B2 tipo=lista min=3 -->
1. **Rúbrica de revisión de workflow** · familia observación (3.1) · evalúa las actividades 1 y 2
2. **Caso "Devoluciones de Mercado Austral"** · familia desempeño (3.2), resolución de problemas · evaluación sumativa del módulo
3. **Prueba de conceptos y lectura de workflows** · familia objetiva (3.3), selección múltiple y respuesta breve

## Tabla de especificaciones

| Instrumento | AE1 | AE2 | AE3 | AE4 | Momento | Ponderación sugerida |
| --- | :-: | :-: | :-: | :-: | --- | --: |
| 1 · Rúbrica de workflow | criterio 1 | criterio 2 | criterios 3 y 4 | criterios 5 y 6 | Actividades 1 y 2 | 35 % |
| 2 · Caso Devoluciones | req. 1 | req. 2 | req. 3 | req. 4 | Cierre del módulo | 45 % |
| 3 · Prueba objetiva | ítems 1–3 | ítems 4–6 | ítems 7–9 | ítems 10–12 | Cierre del tramo 4 | 20 % |

**Escala de notas** (exigencia 60 %, escala chilena de 1,0 a 7,0), para los tres:
si el puntaje *p* es mayor o igual a 0,6 × *P*, nota = 4,0 + 3 × (*p* − 0,6*P*) / (0,4*P*);
si es menor, nota = 1,0 + 3 × *p* / (0,6*P*). Se redondea a un decimal.

---

## Instrumento 1 · Rúbrica de revisión de workflow (observación)

Se aplica al workflow entregado en cada actividad. El tutor la completa con el workflow
abierto y con el historial de ejecuciones a la vista; el participante la conoce desde el
inicio del módulo.

| Criterio (AE · indicadores) | 4 · Logrado | 3 · Mayormente logrado | 2 · Parcialmente logrado | 1 · No logrado |
| --- | --- | --- | --- | --- |
| **1. Comprensión del caso y de n8n** (AE1 · 1.1, 1.2, 1.3) | Justifica cada automatización con el tiempo o los errores que evita y usa con precisión los términos trigger, nodo, credencial y ejecución | Justifica las automatizaciones pero una sin beneficio concreto, o confunde un término | Enumera tareas sin justificar o confunde varios términos | No relaciona el workflow con el problema del caso |
| **2. Estructura del workflow** (AE2 · 2.1, 2.2, 2.3) | Trigger, procesamiento y salida bien separados; 3 o más nodos conectados; se ejecuta sin errores con los datos de prueba | Estructura completa pero con un nodo innecesario o mal nombrado; se ejecuta sin errores | Falta una de las tres partes o se ejecuta con errores que el participante no identifica | No se ejecuta o tiene menos de tres nodos |
| **3. Transformación de datos** (AE3 · 3.1, 3.2, 3.3) | Los datos de salida tienen exactamente la estructura pedida; las expresiones calculan y dan formato correctamente; convierte entre formatos sin perder registros | Estructura correcta con un campo de tipo equivocado que no altera el resultado | Resultados con errores visibles (grupos duplicados, sumas como texto, registros perdidos) | No transforma o la salida no corresponde al requerimiento |
| **4. Persistencia en Supabase** (AE3 · 3.4) | Crea y consulta filas respetando el tipo de cada columna; sin rechazos | Crea filas correctamente pero no consulta, o hay un rechazo que corrige | Crea filas con datos incompletos o de tipo incorrecto | No conecta con Supabase |
| **5. Lógica condicional** (AE4 · 4.1, 4.2) | Tres o más rutas con reglas correctas y ruta de respaldo; operadores bien elegidos | Rutas correctas pero sin ruta de respaldo | Una regla mal construida envía ítems a la ruta equivocada | No usa condiciones o todas las rutas fallan |
| **6. Depuración y trazabilidad** (AE4 · 4.3) | Cada falla registrada con síntoma, detección, causa, corrección y prueba; los registros guardan ruta e id de ejecución | Bitácora completa en casi todas las fallas | Bitácora con correcciones pero sin causas | Sin bitácora o corrige al azar |

**Puntaje máximo:** 24. **Uso formativo:** en la actividad 1 se aplican los criterios 1 a 4
y en la actividad 2 los criterios 1, 3, 5 y 6; la devolución sigue el formato de
`B4-retroalimentacion.md`, producto a.

---

## Instrumento 2 · Caso "Devoluciones de Mercado Austral" (desempeño)

**Modalidad:** individual, asincrónica, 90 minutos de trabajo estimado, entrega en el LMS.

### Enunciado

Mercado Austral quiere dejar de procesar las devoluciones por correo. El cliente llenará
un formulario con: `pedido_id`, `email`, `motivo` (producto dañado, error de despacho,
arrepentimiento) y `comentario`. Construye un workflow que cumpla estos cuatro requisitos:

1. **Justificación (AE1).** En 5 líneas: qué problema resuelve, qué gana la empresa y por
   qué n8n es adecuado para este caso frente a hacerlo a mano.
2. **Flujo básico (AE2).** El formulario inicia el workflow; los datos se procesan y la
   devolución queda registrada en la tabla `devoluciones`. Mínimo tres nodos conectados.
3. **Datos (AE3).** Normaliza email y motivo; busca el pedido en la tabla `pedidos` por su
   `id` y agrega a la devolución el `total` y la `comuna` del pedido; guarda la fila en
   Supabase. Además, un segundo camino que exporte las devoluciones de la semana a CSV.
4. **Lógica y depuración (AE4).** Enruta según el motivo: "producto dañado" a calidad,
   "error de despacho" a bodega y "arrepentimiento" a atención al cliente; si el total del
   pedido supera $50.000, marca la devolución como `requiere_aprobacion`. Todo lo que no
   calce va a revisión manual. Entrega una captura del historial de ejecuciones con al menos
   una prueba de cada ruta y una nota de un error que encontraste y cómo lo corregiste.

### Pauta de corrección (30 puntos)

| Req. | AE | Qué se revisa | Puntos |
| --- | --- | --- | --: |
| 1 | AE1 | Problema, beneficio concreto y razón para usar n8n, los tres presentes | 4 |
| 2 | AE2 | Form Trigger configurado con los cuatro campos | 2 |
| 2 | AE2 | Workflow de 3 o más nodos que se ejecuta sin errores | 3 |
| 2 | AE2 | Fila creada en `devoluciones` (captura o historial) | 2 |
| 3 | AE3 | Email en minúsculas y sin espacios; motivo normalizado | 2 |
| 3 | AE3 | Búsqueda del pedido por `id` en Supabase (*Get a row* o *Get many rows* con filtro) | 3 |
| 3 | AE3 | La devolución guarda `total` y `comuna` del pedido, con tipos correctos | 3 |
| 3 | AE3 | Exportación CSV de la semana (*Get many rows* + *Convert to File* CSV) | 2 |
| 4 | AE4 | Switch con las tres rutas por motivo, correctas | 3 |
| 4 | AE4 | Regla de `requiere_aprobacion` para totales sobre $50.000 | 2 |
| 4 | AE4 | Ruta de respaldo a revisión manual | 2 |
| 4 | AE4 | Evidencia de prueba de cada ruta + nota de depuración con causa y corrección | 2 |
| | | **Total** | **30** |

**Respuesta modelada (resumen del workflow de referencia):** n8n Form Trigger → Edit Fields
(`email` = `{{ $json.email.trim().toLowerCase() }}`, `motivo` = `{{ $json.motivo.trim().toLowerCase() }}`,
`pedido_id` Number) → Supabase *Get a row* en `pedidos` con `id` = `{{ $json.pedido_id }}` →
Edit Fields (une los datos del formulario con `total` y `comuna` del pedido; `requiere_aprobacion`
Boolean = `{{ $json.total > 50000 }}`) → Switch por `motivo` con *Fallback Output: Extra Output* →
en cada rama Edit Fields con `area` → Supabase *Create a row* en `devoluciones`. Camino
semanal: Schedule Trigger → Supabase *Get many rows* (filtro por fecha) → *Convert to File* (CSV).

---

## Instrumento 3 · Prueba de conceptos y lectura de workflows (objetiva)

**Modalidad:** cuestionario del LMS, 25 minutos, corrección automática en los ítems de
selección y revisión del tutor en los de respuesta breve. 9 ítems de selección múltiple
(1 punto) y 3 de respuesta breve (2 puntos). **Puntaje máximo:** 15.

**AE1**

1. ¿Cuál de estos procesos de Mercado Austral es el mejor candidato para automatizar con un workflow?
   a) Negociar precios con un proveedor nuevo · **b) Registrar en la base cada pedido que llega por el formulario** · c) Elegir el diseño del nuevo logo · d) Entrevistar a un postulante
   *Respuesta: b. Es repetitivo, de alto volumen y sigue reglas claras.*
2. En n8n, un *trigger* es:
   **a) El nodo que inicia la ejecución del workflow ante un evento o un horario** · b) La credencial que conecta con un servicio externo · c) El registro histórico de ejecuciones · d) Una expresión que calcula un valor
   *Respuesta: a.*
3. *(Respuesta breve, 2 puntos)* Nombra dos diferencias entre n8n y una plataforma como Zapier que importen a una empresa que maneja datos de sus clientes.
   *Respuesta: se acepta cualquiera de estas, 1 punto cada una: n8n puede instalarse en infraestructura propia y así los datos no salen de la empresa; permite agregar lógica propia con el nodo Code; su modelo de cobro en la nube es por ejecución del workflow y no por cada tarea (verificar precios vigentes).*

**AE2**

4. *(Respuesta breve, 2 puntos)* Un workflow tiene tres nodos: *Form Trigger → Edit Fields → Supabase*. Explica qué rol cumple cada uno.
   *Respuesta: el Form Trigger es la entrada que inicia la ejecución; Edit Fields procesa y transforma los datos; Supabase es la acción de salida que los guarda. 2 puntos con los tres roles bien asignados, 1 con dos.*
5. Para probar un workflow sin llenar el formulario cada vez, lo recomendable es:
   a) Duplicar el workflow · **b) Fijar datos de prueba (pin data) en el nodo trigger** · c) Desactivar el workflow · d) Borrar el historial de ejecuciones
   *Respuesta: b.*
6. Después de ejecutar un nodo, ¿dónde verificas los datos que entregó?
   **a) En el panel de salida (Output) del nodo** · b) En la configuración de credenciales · c) En los *Settings* del workflow · d) En la lista de workflows
   *Respuesta: a.*

**AE3**

7. Si `$json.email` vale `" Ana@Correo.TEST "`, la expresión `{{ $json.email.trim().toLowerCase() }}` devuelve:
   a) `" ana@correo.test "` · **b) `"ana@correo.test"`** · c) `"ANA@CORREO.TEST"` · d) Un error
   *Respuesta: b. `trim()` quita los espacios de los extremos y `toLowerCase()` pasa a minúsculas.*
8. Tienes 8 pedidos y necesitas el total vendido por comuna. ¿Qué nodo usas?
   a) Merge · **b) Summarize, agrupando por comuna y sumando el total** · c) Switch · d) Split Out
   *Respuesta: b.*
9. *(Respuesta breve, 2 puntos)* Supabase rechaza una fila con el error `invalid input syntax for type integer: "3 "`. ¿Qué ocurrió y cómo lo corriges en n8n?
   *Respuesta: la cantidad llegó como texto con un espacio y la columna es entera (1 punto); se corrige convirtiéndola antes de guardar, por ejemplo en Edit Fields con tipo Number y `{{ Number(String($json.cantidad).trim()) }}` (1 punto).*

**AE4**

10. Necesitas enviar cada pedido a una de cuatro rutas según reglas distintas. El nodo más adecuado es:
    a) If · **b) Switch** · c) Merge · d) Filter
    *Respuesta: b. If solo tiene dos salidas (verdadero o falso).*
11. Con `tipo_cliente` = "minorista" y `total` = 219000, la expresión `{{ $json.tipo_cliente === 'mayorista' || $json.total >= 150000 }}` da:
    **a) true** · b) false · c) Un error · d) undefined
    *Respuesta: a. Con `||` basta que una condición se cumpla, y 219000 ≥ 150000.*
12. Un workflow termina en verde, pero faltan pedidos en la tabla. ¿Cuál es el primer paso de depuración?
    a) Volver a crear el workflow desde cero · **b) Abrir la ejecución en el historial y comparar los ítems de entrada y salida de cada nodo** · c) Cambiar las credenciales de Supabase · d) Desactivar el nodo Supabase
    *Respuesta: b.*
