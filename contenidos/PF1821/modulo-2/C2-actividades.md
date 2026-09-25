# PF1821 · Módulo 2 · C2 — Actividades prácticas con respuesta modelada

**Estado:** borrador · **Va en:** Anexo N°2, sección VI b) · **Guía:** Anexo N°7, num. 7, pág. 109
**Para el 7,0:** 2 actividades prácticas distintas que permitan adquirir la habilidad.
Siguen el ejemplo de la guía (pág. 110): una de **resolución de problemas** apoyada en
tutoriales y videos, y otra de **análisis de caso** con **gamificación y simulación**,
ambas con respuesta modelada.

| | Actividad 1 | Actividad 2 |
| --- | --- | --- |
| Nombre | Del formulario a la base de datos | Rescate del workflow roto |
| Técnica | Resolución de problemas | Análisis de caso + gamificación |
| AE que cubre | AE1, AE2, AE3 | AE1, AE3, AE4 |
| Indicadores | 1.1, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4 | 1.1, 3.3, 4.1, 4.2, 4.3 |
| Tramo del módulo | 2 y 3 (semanas 1–2) | 4 (semana 2–3) |
| Tiempo estimado | 5 h (2 h guiadas + 3 h autónomas) | 4 h (1,5 h sincrónica + 2,5 h autónomas) |
| Apoyos | Tutorial R05, cápsulas R03 | Video interactivo R06 |
| Producto | 2 workflows exportados + captura de Supabase + nota breve | Workflow reparado + bitácora de depuración |
| Se evalúa con | Rúbrica de workflow (B2-1) | Rúbrica de workflow (B2-1) + bitácora (B4-d) |

---

## Actividad 1 · Del formulario a la base de datos

### Enunciado para el participante

Mercado Austral (empresa ficticia) recibe pedidos por un formulario web. Hoy una persona
los copia a una planilla y todos los viernes suma a mano cuánto se vendió por comuna para
avisarle al sistema de facturación, que solo acepta archivos XML. Tu trabajo es reemplazar
ese proceso manual por dos workflows en n8n.

**Parte A — Antes de construir (AE1).** Lee el caso y responde en 5 a 8 líneas: ¿qué tres
tareas de este proceso conviene automatizar y qué gana la empresa con cada una (tiempo,
errores evitados, información nueva)?

**Parte B — Workflow "Pedido a registro" (AE2 y AE3).** Construye un workflow que:
1. reciba un pedido desde un formulario de n8n con estos campos: `nombre`, `email`,
   `comuna`, `tipo_cliente` (minorista o mayorista), `producto`, `cantidad`, `precio_unitario`;
2. normalice los datos: email en minúsculas y sin espacios, comuna sin espacios al inicio
   ni al final, cantidad y precio como números, y un campo nuevo `total`;
3. guarde el pedido como una fila nueva en la tabla `pedidos` de Supabase.

**Parte C — Workflow "Resumen semanal" (AE3).** Construye un segundo workflow que:
1. descargue el archivo `pedidos_historicos.csv` desde el enlace publicado en el LMS;
2. descarte los pedidos sin email;
3. calcule, por comuna, la cantidad de pedidos y el total vendido;
4. entregue ese resumen en formato XML para facturación.

**Entrega:** los dos workflows exportados (menú del workflow → *Download*), una captura de
la tabla `pedidos` en Supabase con al menos tres filas creadas por tu workflow, y tu
respuesta a la parte A.

### Insumos que entrega el LMS

**Tabla `pedidos` en Supabase** (el tutor la crea en el proyecto del curso o la entrega
como script SQL):

```sql
create table pedidos (
  id              bigint generated always as identity primary key,
  creado_en       timestamptz not null default now(),
  nombre          text not null,
  email           text not null,
  comuna          text not null,
  tipo_cliente    text not null check (tipo_cliente in ('minorista', 'mayorista')),
  producto        text not null,
  cantidad        integer not null check (cantidad > 0),
  precio_unitario integer not null,
  total           integer not null
);
```

**Archivo `pedidos_historicos.csv`** (datos ficticios; los correos usan el dominio
reservado `.test`):

```csv
id,fecha,nombre,email,comuna,tipo_cliente,producto,cantidad,precio_unitario
1,2026-09-01,Ana Rojas,ana.rojas@correo.test,Ñuñoa,minorista,Café en grano 1 kg,2,12500
2,2026-09-01,Pedro Soto,PEDRO.SOTO@correo.test,Maipú,minorista,Té verde 100 u,3,4200
3,2026-09-02,Almacén El Sol,compras@elsol.test,Temuco,mayorista,Azúcar 25 kg,10,21900
4,2026-09-02,Lucía Díaz,,Ñuñoa,minorista,Café en grano 1 kg,1,12500
5,2026-09-03,Minimarket Doña Rosa,rosa@donarosa.test,Maipú,mayorista,Arroz 25 kg,8,24500
6,2026-09-03,Jorge Muñoz,jorge.munoz@correo.test,Ñuñoa ,minorista,Yerba mate 1 kg,2,6900
7,2026-09-04,Almacén El Sol,compras@elsol.test,Temuco,mayorista,Aceite 5 L,6,15990
8,2026-09-04,Camila Pérez,camila.perez@correo.test,Valparaíso,minorista,Té verde 100 u,1,4200
```

El archivo trae dos trampas a propósito: la fila 4 no tiene email y la fila 6 tiene
"Ñuñoa " con un espacio al final.

### Respuesta modelada

**Parte A (ejemplo de respuesta de nivel logrado).**
1. *Registrar cada pedido*: hoy se copia a mano; automatizarlo elimina la digitación y los
   pedidos perdidos o duplicados, y deja el registro disponible al instante.
2. *Validar y normalizar los datos*: correos con mayúsculas o comunas con espacios rompen
   los reportes; normalizar en la entrada evita corregir después.
3. *Consolidar las ventas por comuna para facturación*: hoy toma horas cada viernes y se
   equivoca; automatizado es un resumen exacto y en el formato que facturación exige.

**Parte B — workflow de referencia "Pedido a registro"** (4 nodos):

| # | Nodo | Configuración clave |
| --- | --- | --- |
| 1 | **n8n Form Trigger** | Título "Nuevo pedido". Campos con esas etiquetas exactas: `nombre`, `email` (tipo Email), `comuna`, `tipo_cliente` (Dropdown: minorista, mayorista), `producto`, `cantidad` (Number), `precio_unitario` (Number). |
| 2 | **Edit Fields (Set)** | Modo *Manual Mapping*. `email` (String) = `{{ $json.email.trim().toLowerCase() }}` · `comuna` (String) = `{{ $json.comuna.trim() }}` · `cantidad` (Number) = `{{ Number($json.cantidad) }}` · `precio_unitario` (Number) = `{{ Number($json.precio_unitario) }}` · `total` (Number) = `{{ Number($json.cantidad) * Number($json.precio_unitario) }}` · conservar `nombre`, `tipo_cliente` y `producto`. |
| 3 | **Supabase** | Credencial del proyecto del curso. Operación *Create a row*, tabla `pedidos`, *Auto-map input data to columns*. |
| 4 | **Form Ending** (opcional) | Mensaje "Pedido recibido. Te contactaremos a {{ $('Edit Fields').item.json.email }}". |

Salida esperada del nodo 2 para un pedido de prueba (2 × Café en grano 1 kg a $12.500,
comuna escrita "  Ñuñoa "):

```json
{ "nombre": "Ana Rojas", "email": "ana.rojas@correo.test", "comuna": "Ñuñoa",
  "tipo_cliente": "minorista", "producto": "Café en grano 1 kg",
  "cantidad": 2, "precio_unitario": 12500, "total": 25000 }
```

**Parte C — workflow de referencia "Resumen semanal"** (6 nodos):

| # | Nodo | Configuración clave |
| --- | --- | --- |
| 1 | **Manual Trigger** | Para ejecutarlo a pedido (en producción se cambia por *Schedule Trigger*, viernes 18:00). |
| 2 | **HTTP Request** | GET al enlace del CSV. *Response Format*: File. |
| 3 | **Extract from File** | Operación *Extract From CSV*, primera fila como encabezados. |
| 4 | **Filter** | Condición: `{{ $json.email }}` *is not empty*. Descarta la fila 4. |
| 5 | **Edit Fields (Set)** | `comuna` = `{{ $json.comuna.trim() }}` · `total` (Number) = `{{ Number($json.cantidad) * Number($json.precio_unitario) }}`. |
| 6 | **Summarize** | *Fields to Split By*: `comuna`. Agregaciones: *Sum* de `total` y *Count* de `id`. |
| 7 | **XML** | Modo *JSON to XML*. Entrega el resumen como texto XML listo para facturación. |

Resultado correcto del nodo 6 (7 pedidos válidos, $566.540 en total):

| comuna | pedidos | total |
| --- | --: | --: |
| Ñuñoa | 2 | 38.800 |
| Maipú | 2 | 208.600 |
| Temuco | 2 | 314.940 |
| Valparaíso | 1 | 4.200 |

**Errores típicos y cómo se reconocen en la entrega:**
- Sin el `trim()` del nodo 5 aparecen dos grupos: "Ñuñoa" con $25.000 y "Ñuñoa " con
  $13.800. Es la señal de que no se normalizó antes de agrupar (indicador 3.1).
- Sin el Filter aparecen 8 pedidos y Ñuñoa suma $51.300 (indicador 3.3).
- Si `total` quedó como texto, la suma del Summarize sale mal o se detiene con un error de
  tipo: hay que declararlo Number en el Edit Fields (indicador 3.3).
- Si Supabase rechaza la fila con `invalid input syntax for type integer`, a una columna entera
  llegó un valor que no es un número entero, como "2 kg" o un campo vacío (indicador 3.4). Un
  número escrito como texto, como "2", la base de datos sí lo acepta.

---

## Actividad 2 · Rescate del workflow roto

### Enunciado para el participante

El practicante anterior de Mercado Austral dejó un workflow que enruta los pedidos: los
mayoristas van a ventas, los de regiones a despacho regional y el resto a bodega de
Santiago. Funcionó una semana y después empezó a fallar: hay pedidos que se pierden,
mayoristas clasificados como minoristas y ejecuciones en rojo. Ventas está molesta.

Recibes el workflow exportado (`pedidos_enrutados_v0.json`) y **cinco misiones**. Cada
misión es una falla real escondida en el workflow. Para cada una tienes que:
**detectarla** (qué síntoma ves y con qué herramienta de n8n lo viste), **explicar la causa**
y **corregirla**. Todo va a tu bitácora de depuración.

| Misión | Pista | Puntos |
| --- | --- | --: |
| 1 · Los mayoristas invisibles | Un pedido de $219.000 terminó en bodega de Santiago. | 20 |
| 2 · Nadie tiene correo | Todos los pedidos salen por la rama "datos inválidos". | 20 |
| 3 · El pedido de Isla de Pascua | Un pedido con `tipo_cliente` "distribuidor" desapareció sin error. | 20 |
| 4 · Los pedidos clonados | Al enriquecer con la zona de despacho, cada pedido aparece varias veces. | 20 |
| 5 · La ejecución en rojo | Supabase rechaza algunos pedidos y el workflow se detiene entero. | 20 |
| Bonus · Trazabilidad | Que cada fila guardada diga por qué ruta pasó y en qué ejecución. | +10 |

Algunas fallas esconden a otras: cuando corrijas una, vuelve a ejecutar con los pedidos de prueba
y mira qué aparece. Cada misión vale 20 puntos: 5 por detectar, 5 por explicar y 10 por corregir. Con 60
puntos obtienes la insignia **Depurador/a**; con 100 o más, **Rescatista de workflows**.

**Cómo debería funcionar el workflow (requerimiento):**
1. Recibir el pedido (Webhook) y normalizarlo (Edit Fields).
2. Validar: el email contiene "@" y la cantidad es mayor que 0. Si no, va a `pedidos_rechazados`.
3. Enriquecer con la zona de despacho de la comuna (tabla `comunas` en Supabase) y unir por el campo `comuna`.
4. Enrutar con Switch: **mayorista** si `tipo_cliente` es "mayorista" **o** el total es
   de $150.000 o más; **regiones** si la comuna no es de la Región Metropolitana;
   **bodega RM** para el resto; y todo lo que no calce, a **revisión manual**.
5. Guardar en `pedidos` con el campo `ruta`.

### Insumos que entrega el LMS

- `pedidos_enrutados_v0.json`: el workflow con las cinco fallas, para importar en n8n (menú del
  workflow → *Import from File*). Trae fijados como datos del Webhook los seis pedidos de prueba.
- `pedidos_prueba.json`: los seis pedidos de prueba, por si hay que volver a fijarlos: uno
  minorista de Santiago, uno mayorista por tipo, uno mayorista por monto ($219.000), uno de Temuco,
  uno con `tipo_cliente` "distribuidor" de Isla de Pascua y uno con `cantidad` escrita "3 unidades".
- `actividad-2-tablas.sql`: agrega a `pedidos` las columnas `zona`, `ruta` e `id_ejecucion`, y crea
  las tablas `comunas` (40 comunas con su zona, RM o Regiones), `pedidos_rechazados` y
  `revision_manual`. La misma tabla de comunas va en `comunas.csv`.
- Plantilla de bitácora (ver `B4-retroalimentacion.md`, producto d).

### Respuesta modelada

**El insumo `pedidos_enrutados_v0.json`** lo genera el carril automático junto con
`pedidos_enrutados_corregido.json`, la versión correcta para el tutor. Los dos salen de la misma
definición y difieren solo en las cinco fallas de la tabla siguiente. Antes de publicarlo, el tutor
lo importa una vez en la instancia del curso, elige las credenciales de Supabase y lo prueba.

| Misión | Síntoma | Cómo se detecta | Causa | Corrección | Ind. |
| --- | --- | --- | --- | --- | --- |
| 1 | El pedido de $219.000 cae en "bodega RM" | Abrir la ejecución y mirar la regla de mayorista del Switch: compara `total_texto`, que vale `"219.000"` | La regla usa `total_texto`, un texto con punto de miles armado para mostrar. Como el Switch convierte tipos, lo lee como el número 219, que no llega a 150000 | Comparar `total` (Number) en la regla; el texto con formato queda solo para mostrar | 4.2 |
| 2 | Todo sale por "datos inválidos" | En el nodo If, la vista previa de la expresión muestra `undefined` | La condición usa `{{ $json.Email }}` con mayúscula; el campo se llama `email` | Cambiar a `{{ $json.email }}` y comprobarlo con el pedido fijado | 3.3 |
| 3 | El pedido "distribuidor" no aparece en ninguna tabla ni da error | Historial de ejecuciones: la ejecución termina en verde pero el Switch no entrega ningún ítem | El Switch no tiene salida de respaldo: lo que no calza con ninguna regla se descarta en silencio | En *Options* del Switch, *Fallback Output* = *Extra Output* y conectarla a "revisión manual" | 4.1 |
| 4 | Cada pedido aparece repetido tantas veces como comunas hay | Contar los ítems de salida del Merge: 6 pedidos × N comunas | El Merge está en modo *Append* (o *All Possible Combinations*) en vez de unir por campo | Modo *Combine* → *Matching Fields*, campo `comuna` en ambas entradas | 3.1 |
| 5 | Supabase rechaza el pedido con `cantidad` "3 unidades" y todo se detiene | Ejecución en rojo; el error del nodo dice `invalid input syntax for type integer` | `cantidad` llega como texto que no es un número y el nodo no tiene manejo de errores | En Edit Fields, `cantidad` (Number) = `{{ parseInt($json.cantidad, 10) }}`; en *Settings* del nodo Supabase, *On Error* = *Continue (using error output)*, y esa salida a `pedidos_rechazados` con el mensaje de error | 4.3 |
| Bonus | No se sabe por qué ruta pasó cada pedido | Mirar la tabla `pedidos` | Falta registrar la decisión | En cada rama, Edit Fields agrega `ruta` ("mayorista", "regiones", "bodega RM", "revisión") y `id_ejecucion` = `{{ $execution.id }}` | 4.3 |

**Reglas del Switch en la versión corregida** (modo *Rules*, se envía a la primera regla que
se cumple):

| Salida | Regla |
| --- | --- |
| 0 · mayorista | `tipo_cliente` (String) *is equal to* "mayorista" **OR** `total` (Number) *is greater than or equal to* 150000 |
| 1 · regiones | `zona` (String) *is equal to* "Regiones" |
| 2 · bodega RM | `tipo_cliente` (String) *is equal to* "minorista" |
| respaldo · revisión manual | *Fallback Output: Extra Output* |

**Ejemplo de una entrada de bitácora de nivel logrado (misión 3):**

> *Síntoma:* el pedido de prueba con `tipo_cliente` "distribuidor" no quedó en ninguna
> tabla y la ejecución salió en verde. *Detección:* en *Executions* abrí la ejecución y vi
> que el Switch recibió 6 ítems y entregó 5. *Causa:* ninguna regla acepta "distribuidor"
> y el Switch no tenía salida de respaldo, así que lo descartó sin avisar. *Corrección:*
> activé *Fallback Output → Extra Output* y la conecté a una rama que registra el pedido en
> `revision_manual`. *Prueba:* volví a ejecutar con los 6 pedidos fijados: 6 entran y 6
> salen. *Aprendizaje:* un workflow en verde no significa que no perdió datos; hay que
> contar ítems de entrada y salida.

**Qué distingue una respuesta débil:** corrige sin explicar la causa, o "arregla" la
misión 3 agregando "distribuidor" a la regla de minoristas: resuelve el caso de prueba pero
el próximo valor inesperado se vuelve a perder. El indicador 4.1 pide la ruta de respaldo.
