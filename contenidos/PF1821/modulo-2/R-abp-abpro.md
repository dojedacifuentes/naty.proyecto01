# PF1821 · Módulo 2 · ABP y ABPRO por aprendizaje esperado

**Estado:** borrador · **Va en:** LMS, una Tarea por actividad · **Pedido:** usuario, 2026-09-29
Por cada aprendizaje esperado del módulo 2 hay dos actividades, según el molde del V0 de PF1474:
un **ABP** (aprendizaje basado en problemas), individual y asincrónico, y un **ABPRO**
(aprendizaje basado en proyectos), grupal, en micro salas de la sesión sincrónica, con roles
rotativos. Los ABPRO siguen un caso único que crece de un aprendizaje al siguiente: Mercado
Austral, el mismo del resto del módulo. Los ABP usan problemas breves de otras empresas
ficticias para que el participante transfiera lo aprendido a un contexto nuevo.

Solo va el enunciado para el participante (decisión del usuario). No repite el caso
"Devoluciones" (instrumento 2) ni las actividades 1 y 2 del Anexo (C2).

`npm run abp` genera un HTML por actividad en `modulo-2/PF1821-agentes-low-code/entrega/abp-abpro/`,
listo para convertir en Google Docs o pegar en la descripción de una Tarea de Moodle.

---

## AE1 · ABP · ¿Qué conviene automatizar?

- **Modalidad:** Individual, asincrónica.
- **Criterios de evaluación:** 1.1, 1.2, 1.3

### Contexto

La clínica veterinaria Huellitas del Sur (empresa ficticia) tiene dos recepcionistas y quiere
saber si le conviene automatizar parte de su trabajo. Esta es su semana típica:

| Tarea | Cómo se hace hoy | Frecuencia | Tiempo por vez |
| --- | --- | --: | --: |
| Recordar la hora al día siguiente | Llamar por teléfono a cada cliente | 60 por semana | 3 min |
| Registrar las reservas | Copiar a una planilla las reservas que llegan por el formulario web | 45 por semana | 2 min |
| Avisar al laboratorio | Reenviar por correo cada orden de examen | 20 por semana | 4 min |
| Atender una urgencia | Evaluar al animal y decidir si pasa de inmediato | 8 por semana | 10 min |
| Informe mensual para la dueña | Contar reservas y exámenes en la planilla y armar un resumen | 1 al mes | 3 h |

Considera que una hora de trabajo de recepción le cuesta a la clínica $6.000 y que un mes tiene
4 semanas.

### Qué tienes que hacer

1. **Dónde aporta valor (criterio 1.1).** Elige las **tres** tareas en que la automatización
   aporta más valor. Para cada una indica qué la inicia (su disparador), qué pasos se
   automatizan, cuántas horas al mes se liberan y cuánto dinero representan, y qué error humano
   se evita. Muestra el cálculo.
2. **Lo que no se automatiza.** Indica cuál de las cinco tareas **no** conviene automatizar y
   por qué. Responde en 2 a 3 líneas.
3. **Cómo se vería en n8n (criterio 1.2).** Toma una de tus tres tareas y describe el workflow
   que la resolvería con los componentes de n8n: el **trigger**, los **nodos** y lo que hace cada
   uno, las **conexiones**, las **credenciales** que necesitaría y dónde revisarías sus
   **ejecuciones**. Puedes hacer un dibujo simple (a mano o digital) o una lista numerada.
4. **¿Por qué n8n? (criterio 1.3).** Completa esta tabla consultando la página oficial de cada
   herramienta y cita la fuente de cada dato:

| Criterio | n8n | Zapier | Make |
| --- | --- | --- | --- |
| ¿Se puede instalar en un servidor propio? | | | |
| ¿Qué cuenta el plan de pago (ejecuciones, tareas u operaciones)? | | | |
| ¿Permite escribir código dentro del flujo? | | | |
| Tipo de licencia | | | |

   Cierra con una recomendación para Huellitas del Sur en 3 a 5 líneas: ¿cuál elegirías y por
   qué?

### Entrega

Sube a esta Tarea un documento PDF de 1 a 2 páginas con tus respuestas a los puntos 1 a 4,
incluida la tabla y las fuentes consultadas.

## AE1 · ABPRO · Mapa de automatización de Mercado Austral

- **Modalidad:** Grupal, de 4 a 5 personas, en micro salas durante la sesión sincrónica.
- **Criterios de evaluación:** 1.1, 1.2, 1.3

### Contexto

Mercado Austral (empresa ficticia) es un almacén mayorista y minorista que vende en línea a
distintas comunas del país. Creció rápido y sus procesos siguen siendo manuales.

### Problema

Los pedidos llegan por un formulario web y una persona los copia a una planilla. Los viernes
alguien suma a mano cuánto se vendió por comuna y arma un archivo XML para facturación. Bodega
se entera de los pedidos por WhatsApp, los clientes no reciben confirmación y nadie sabe qué
productos están por agotarse hasta que faltan. Cada semana se pierden o duplican pedidos.

### Solución

Mercado Austral decidió automatizar con n8n, pero no puede hacerlo todo de una vez. Necesita que
su equipo proponga **qué automatizar primero** y **cómo se vería ese primer workflow**. Durante
el módulo, el equipo construirá ese workflow y lo irá mejorando en cada aprendizaje esperado.

### Desarrollo

1. **Mapa del proceso actual.** Dibujen el recorrido de un pedido desde que el cliente llena el
   formulario hasta que se factura, marcando cada paso manual y quién lo hace. Usen una pizarra
   compartida (por ejemplo, Miro, FigJam o Canva).
2. **Lista de automatizaciones.** Propongan al menos **cinco** tareas automatizables y, para
   cada una, el beneficio esperado: tiempo, errores evitados o información nueva (criterio 1.1).
3. **Matriz de prioridad.** Ubiquen cada tarea en una matriz de impacto (alto o bajo) y
   esfuerzo (alto o bajo). Elijan la que irá primero y expliquen por qué.
4. **Diseño del primer workflow.** Describan ese workflow con los componentes de n8n: trigger,
   nodos, conexiones, credenciales y dónde se revisan sus ejecuciones (criterio 1.2).
5. **Defensa de la herramienta.** Escriban tres razones por las que n8n es adecuado para
   Mercado Austral frente a otras plataformas de automatización, y una limitación que deberán
   tener en cuenta (criterio 1.3).
6. **Presentación.** Al volver a la sala principal, el portavoz presenta el mapa y el primer
   workflow. Otro equipo hace una pregunta.

### Roles del equipo

Cada integrante asume un rol, que rota en el ABPRO de cada aprendizaje esperado:

- **Coordinador/a:** cuida el tiempo y que todos participen.
- **Analista de procesos:** conduce el mapa del proceso actual.
- **Especialista n8n:** conduce el diseño del workflow.
- **Documentador/a:** redacta la entrega.
- **Portavoz:** presenta al curso. En equipos de 4, el documentador/a asume también este rol.

### Entrega

Una entrega por equipo en esta Tarea: un PDF con el mapa del proceso, la lista y la matriz de
prioridad, el diseño del primer workflow, las razones para usar n8n y los nombres de los
integrantes con su rol.

## AE2 · ABP · El formulario de consultas

- **Modalidad:** Individual, asincrónica.
- **Criterios de evaluación:** 2.1, 2.2, 2.3

### Contexto

El centro de idiomas Palabra Viva (empresa ficticia) recibe consultas de personas interesadas
en sus cursos. Hoy las responde una por una por correo, a veces días después, y muchas personas
se inscriben en otro lado. Quiere que cada consulta quede ordenada y que la persona reciba de
inmediato un mensaje de confirmación.

### Qué tienes que hacer

1. **Construye el workflow (criterios 2.1 y 2.2).** En la interfaz visual de n8n, crea un
   workflow llamado `Consultas Palabra Viva` con al menos **tres nodos conectados**:
   - **Trigger:** un *n8n Form Trigger* con los campos `nombre`, `email`, `idioma`
     (lista desplegable: inglés, portugués, francés) y `mensaje`.
   - **Procesamiento:** un nodo *Edit Fields (Set)* que deje el `nombre` sin espacios al inicio
     ni al final, el `email` en minúsculas y agregue el campo `recibido_en` con la fecha y hora
     de la ejecución.
   - **Salida:** un nodo *Form Ending* que muestre el mensaje: "Gracias, *nombre*. Te
     escribiremos a *email* con la información del curso de *idioma*.", usando los datos ya
     procesados.
2. **Pruébalo (criterio 2.3).** Envía el formulario tres veces, una de ellas con el email en
   mayúsculas y el nombre con espacios al inicio. Revisa en *Executions* que las tres
   ejecuciones terminaron bien y que el nodo de procesamiento normalizó los datos.
3. **Depura un error típico.** Un compañero hizo el mismo ejercicio y su mensaje final dice
   "Gracias, . Te escribiremos a ..." (sin el nombre). En su *Edit Fields* el campo quedó
   escrito `Nombre`, con mayúscula. Explica en 3 a 5 líneas por qué falla, cómo lo habrías
   detectado en la vista del nodo y cómo se corrige.

### Entrega

Sube a esta Tarea:
- el workflow exportado en JSON (menú del workflow → *Download*);
- una captura de *Executions* con las tres ejecuciones y otra de la salida del *Edit Fields* de
  la prueba con mayúsculas;
- tu respuesta al punto 3.

## AE2 · ABPRO · Registro de pedidos, versión 1

- **Modalidad:** Grupal, de 4 a 5 personas, en micro salas durante la sesión sincrónica.
- **Criterios de evaluación:** 2.1, 2.2, 2.3

### Contexto

En el ABPRO anterior, el equipo eligió qué automatizar primero en Mercado Austral. Ahora toca
construirlo: la empresa quiere dejar de copiar los pedidos a mano.

### Problema

Cada pedido del formulario web se copia a una planilla. Al copiar se cometen errores: correos
en mayúsculas, cantidades escritas como texto y totales mal calculados. El cliente no recibe
ninguna confirmación.

### Solución

Un workflow en n8n que reciba el pedido, lo procese y lo registre automáticamente en una hoja de
cálculo compartida, con una confirmación para el cliente. Es la versión 1: en el próximo
aprendizaje esperado se migrará a una base de datos.

### Desarrollo

1. **Preparen el entorno.** Un integrante crea una hoja de Google Sheets llamada
   `Pedidos Mercado Austral` con las columnas `fecha`, `nombre`, `email`, `comuna`, `producto`,
   `cantidad`, `precio_unitario` y `total`, y la comparte con el equipo.
2. **Construyan el workflow** en la interfaz visual de n8n (criterios 2.1 y 2.2):
   - **Trigger:** *n8n Form Trigger* "Nuevo pedido" con los campos `nombre`, `email`,
     `comuna`, `producto`, `cantidad` y `precio_unitario`.
   - **Procesamiento:** *Edit Fields (Set)* que normalice el email (minúsculas, sin espacios),
     convierta `cantidad` y `precio_unitario` a número, calcule `total` y agregue `fecha`.
   - **Salida:** *Google Sheets*, operación *Append Row*, en la hoja del equipo.
   - **Confirmación:** *Form Ending* con el total del pedido.
3. **Plan de pruebas (criterio 2.3).** Antes de probar, escriban una tabla con cuatro pedidos de
   prueba y el resultado esperado de cada uno. Incluyan al menos un email en mayúsculas y una
   comuna con espacios al final. Ejecuten los cuatro y completen la columna "resultado
   obtenido".
4. **Depuración inicial.** Si una prueba no da el resultado esperado, abran la ejecución en
   *Executions*, identifiquen en qué nodo cambió el dato y corrijan. Anoten qué pasó.
5. **Revisión cruzada.** Al cierre, el especialista n8n de otro equipo envía un
   pedido a su formulario y les dice si quedó bien registrado.

### Roles del equipo

Roten los roles respecto del ABPRO anterior:

- **Coordinador/a:** cuida el tiempo y comparte la pantalla del editor.
- **Constructor/a del trigger y la confirmación:** configura el formulario y el *Form Ending*.
- **Constructor/a del procesamiento:** configura el *Edit Fields* y las expresiones.
- **Responsable de pruebas:** redacta el plan de pruebas y registra los resultados.
- **Documentador/a y portavoz:** prepara la entrega y responde en la revisión cruzada.

### Entrega

Una entrega por equipo en esta Tarea:
- el workflow exportado en JSON;
- una captura de la hoja con los cuatro pedidos de prueba registrados;
- la tabla del plan de pruebas con resultados esperados y obtenidos, y lo que corrigieron;
- los nombres de los integrantes con su rol.

## AE3 · ABP · El inventario del proveedor

- **Modalidad:** Individual, asincrónica.
- **Criterios de evaluación:** 3.1, 3.2, 3.3, 3.4

### Contexto

La tienda de bicicletas Ruta Sur (empresa ficticia) recibe cada lunes el inventario de su
proveedor en formato XML. Una persona lo revisa a mano para ver qué productos quedan con poco
stock y los anota en una planilla para comprar. Ruta Sur quiere automatizarlo con n8n y
Supabase.

### Insumos

El archivo `inventario_proveedor.xml` está publicado en el LMS. Este es su contenido:

```xml
<inventario proveedor="Distribuidora Andes" fecha="2026-09-28">
  <producto><sku> rs-cam-29 </sku><nombre>Cámara 29 pulgadas</nombre><stock>3</stock><precio>6990</precio></producto>
  <producto><sku>RS-CAD-11V</sku><nombre>Cadena 11 velocidades</nombre><stock>12</stock><precio>24990</precio></producto>
  <producto><sku>rs-fre-hid</sku><nombre>Freno hidráulico</nombre><stock>2</stock><precio>59990</precio></producto>
  <producto><sku>RS-CAS-M</sku><nombre>Casco talla M</nombre><stock>0</stock><precio>34990</precio></producto>
  <producto><sku>RS-LUZ-USB</sku><nombre>Luz trasera USB</nombre><stock>25</stock><precio>9990</precio></producto>
  <producto><sku>rs-bom-pie</sku><nombre>Bombín de pie</nombre><stock>4</stock><precio>19990</precio></producto>
</inventario>
```

En Supabase, crea esta tabla:

```sql
create table stock_bajo (
  id           bigint generated always as identity primary key,
  revisado_en  timestamptz not null default now(),
  sku          text not null,
  nombre       text not null,
  stock        integer not null,
  precio       integer not null,
  prioridad    text not null
);
```

### Qué tienes que hacer

1. **Transforma el XML (criterios 3.1 y 3.2).** Construye un workflow que lea el archivo con
   *HTTP Request* (formato de respuesta: texto), lo convierta de XML a JSON con el nodo *XML* y separe cada producto en un ítem con *Split Out*.
2. **Limpia y calcula con expresiones (criterio 3.3).** Con *Edit Fields (Set)*: deja el `sku`
   sin espacios y en mayúsculas, convierte `stock` y `precio` a número y agrega `prioridad`:
   "urgente" si el stock es 0 y "normal" en otro caso.
3. **Filtra.** Con *Filter*, deja solo los productos con stock **menor que 5**.
4. **Guarda en Supabase (criterio 3.4).** Inserta cada producto filtrado como una fila de
   `stock_bajo`.
5. **Resume para compras.** En una rama paralela, después del *Filter*, usa *Summarize* para
   contar los productos por `prioridad`, y *Convert to File* para entregar
   la lista filtrada en CSV.
6. **Explica.** En 5 a 8 líneas: ¿qué habría pasado en el filtro si `stock` quedaba como texto?
   ¿Qué expresión usaste para la prioridad y por qué?

### Entrega

Sube a esta Tarea el workflow exportado en JSON, una captura de la tabla `stock_bajo` con las
filas creadas, el archivo CSV generado y tu respuesta al punto 6.

## AE3 · ABPRO · Mercado Austral pasa a una base de datos

- **Modalidad:** Grupal, de 4 a 5 personas, en micro salas durante la sesión sincrónica.
- **Criterios de evaluación:** 3.1, 3.2, 3.3, 3.4

### Contexto

El registro de pedidos del ABPRO anterior funciona, pero la hoja de cálculo ya no alcanza:
Mercado Austral quiere cruzar los pedidos con su catálogo para saber qué productos reponer.

### Problema

Los pedidos están en un CSV y el catálogo, con el stock de cada producto, llega en JSON desde
otro sistema. Nadie los cruza, así que los productos se agotan sin aviso y el proveedor recibe
los pedidos de reposición tarde.

### Solución

Un workflow que combine los pedidos con el catálogo, calcule el stock que queda, marque lo que
hay que reponer y lo guarde en Supabase, con un archivo JSON para el proveedor.

### Desarrollo

**Insumos:** el archivo `pedidos_historicos.csv` publicado en el LMS (el mismo de la actividad 1)
y este catálogo, que se entrega como `catalogo.json`:

```json
[
  { "sku": "MA-CAF-1",   "producto": "Café en grano 1 kg", "stock_actual": 6,  "stock_minimo": 5, "proveedor": "Tostaduría Sur" },
  { "sku": "MA-TEV-100", "producto": "Té verde 100 u",     "stock_actual": 10, "stock_minimo": 4, "proveedor": "Hierbas del Valle" },
  { "sku": "MA-AZU-25",  "producto": "Azúcar 25 kg",       "stock_actual": 14, "stock_minimo": 8, "proveedor": "Distribuidora Andes" },
  { "sku": "MA-ARR-25",  "producto": "Arroz 25 kg",        "stock_actual": 20, "stock_minimo": 6, "proveedor": "Distribuidora Andes" },
  { "sku": "MA-YER-1",   "producto": "Yerba mate 1 kg",    "stock_actual": 3,  "stock_minimo": 4, "proveedor": "Hierbas del Valle" },
  { "sku": "MA-ACE-5",   "producto": "Aceite 5 L",         "stock_actual": 15, "stock_minimo": 5, "proveedor": "Distribuidora Andes" }
]
```

1. **Tabla en Supabase (criterio 3.4).** Creen la tabla `reposicion` con las columnas `sku`,
   `producto`, `vendidas`, `stock_restante`, `stock_minimo`, `reponer` (booleano) y
   `proveedor`.
2. **Unidades vendidas (criterios 3.1 y 3.2).** Lean el CSV con *Extract from File*, conviertan
   `cantidad` a número con *Edit Fields (Set)* y usen *Summarize* para sumar la `cantidad`
   vendida por `producto`.
3. **Cruce con el catálogo.** Lean el catálogo JSON y únanlo con las ventas usando *Merge* en
   modo *Combine* por el campo `producto`. Comprueben que cada producto aparece una sola vez.
4. **Cálculos con expresiones (criterio 3.3).** Con *Edit Fields (Set)*, calculen
   `stock_restante` (stock actual menos vendidas) y `reponer` (verdadero si el stock restante
   es menor que el mínimo).
5. **Guardar y exportar.** Inserten todas las filas en `reposicion`. Con *Filter* dejen solo
   las que hay que reponer y, con *Convert to File*, generen `reposicion.json` para el
   proveedor.
6. **Control de calidad.** Antes de guardar, comparen a mano el resultado de un producto con lo
   que calculó el workflow. Anoten si coincidió.

### Roles del equipo

Roten los roles respecto del ABPRO anterior:

- **Coordinador/a:** cuida el tiempo y comparte la pantalla del editor.
- **Responsable de datos:** crea la tabla en Supabase y configura la credencial.
- **Constructor/a de la transformación:** configura *Extract from File*, *Summarize* y *Merge*.
- **Constructor/a de las expresiones:** configura los cálculos, el *Filter* y la exportación.
- **Documentador/a y portavoz:** registra el control de calidad y prepara la entrega.

### Entrega

Una entrega por equipo en esta Tarea:
- el workflow exportado en JSON;
- una captura de la tabla `reposicion` en Supabase;
- el archivo `reposicion.json` generado;
- el control de calidad del punto 6;
- los nombres de los integrantes con su rol.

## AE4 · ABP · El clasificador de solicitudes

- **Modalidad:** Individual, asincrónica.
- **Criterios de evaluación:** 4.1, 4.2, 4.3

### Contexto

El servicio técnico Tecnofix (empresa ficticia) repara computadores y recibe solicitudes por un
formulario. Hoy una persona lee cada solicitud y la reenvía al área que corresponde. Tecnofix
quiere que un workflow de n8n las clasifique solo.

### Reglas de clasificación

| Ruta | Condición |
| --- | --- |
| Urgente | `tipo` es "falla" **y** (el `plan` es "empresa" **o** `dias_sin_servicio` es 2 o más) |
| Garantía | `tipo` es "falla" **y** `en_garantia` es verdadero, y no es urgente |
| Ventas | `tipo` es "cotización" |
| Revisión manual | Cualquier otro caso |

### Insumos

Estas son las seis solicitudes de prueba. Fíjalas como datos del trigger con *Pin data* para
probar sin volver a enviar el formulario:

```json
[
  { "id": 1, "tipo": "falla",      "plan": "empresa", "dias_sin_servicio": 0,   "en_garantia": false },
  { "id": 2, "tipo": "falla",      "plan": "hogar",   "dias_sin_servicio": 1,   "en_garantia": true },
  { "id": 3, "tipo": "FALLA",      "plan": "hogar",   "dias_sin_servicio": "3", "en_garantia": false },
  { "id": 4, "tipo": "cotización", "plan": "hogar",   "dias_sin_servicio": 0,   "en_garantia": false },
  { "id": 5, "tipo": "",           "plan": "empresa", "dias_sin_servicio": 5,   "en_garantia": false },
  { "id": 6, "tipo": "falla",      "plan": "hogar",   "dias_sin_servicio": 0,   "en_garantia": false }
]
```

### Qué tienes que hacer

1. **Predice.** Antes de construir, escribe en una tabla a qué ruta debería ir cada solicitud
   según las reglas.
2. **Normaliza.** Con *Edit Fields (Set)*, deja `tipo` en minúsculas y sin espacios y convierte
   `dias_sin_servicio` a número.
3. **Enruta (criterios 4.1 y 4.2).** Configura un *Switch* con una salida por ruta. Ordena las reglas: el
   Switch envía cada ítem a la primera que se cumple. La regla de "Urgente" combina **Y** y **O**;
   como cada regla del Switch usa un solo combinador, escríbela como una expresión con `&&` y `||`
   que dé verdadero o falso (condición de tipo *Boolean*, *is true*). Activa la salida de
   respaldo (*Fallback Output*) para "Revisión manual".
4. **Marca la ruta.** Al final de cada salida, agrega un *Edit Fields (Set)* que escriba el
   campo `ruta` con el nombre de la ruta.
5. **Depura (criterio 4.3).** Ejecuta con las seis solicitudes y completa tu tabla con la ruta
   obtenida. Si alguna no coincide con tu predicción, usa la vista de entrada y salida de cada
   nodo y el historial de *Executions* para encontrar la causa. Anota el síntoma, la causa y
   la corrección.
6. **Casos límite.** Explica en 3 a 5 líneas qué pasaría con las solicitudes 3 y 5 si no
   hubieras normalizado los datos ni activado la salida de respaldo.

### Entrega

Sube a esta Tarea el workflow exportado en JSON, tu tabla con la ruta predicha y la obtenida
para cada solicitud, el registro de depuración del punto 5 y tu respuesta al punto 6.

## AE4 · ABPRO · El semáforo de despachos

- **Modalidad:** Grupal, de 4 a 5 personas, en micro salas durante la sesión sincrónica.
- **Criterios de evaluación:** 4.1, 4.2, 4.3

### Contexto

Con los pedidos en Supabase, Mercado Austral detectó un nuevo problema: algunos despachos se
atrasan y el cliente reclama antes de que la empresa se entere.

### Problema

Nadie revisa a diario cuánto tiempo lleva cada pedido sin despachar. Además, cuando un workflow
falla de noche, nadie se entera hasta que un cliente llama.

### Solución

Un workflow que cada mañana clasifique los pedidos pendientes con un semáforo según los días
de espera y la zona, avise de los atrasados y deje registro de cada ejecución y de cada error.

### Desarrollo

1. **Datos de prueba.** Agreguen a la tabla `pedidos` de Supabase la columna `despachado`
   (booleano) y carguen al menos seis pedidos pendientes con distintas fechas de creación y
   comunas de la Región Metropolitana y de regiones. Incluyan un pedido sin comuna.
2. **Reglas del semáforo (criterios 4.1 y 4.2).** Con un *Schedule Trigger* diario, lean los
   pedidos no despachados. Con una expresión de fechas (`$now` y `DateTime.fromISO`), calculen
   los días de espera y enruten con un *Switch*:
   - **Verde:** Región Metropolitana con 2 días o menos, o regiones con 4 días o menos.
   - **Amarillo:** Región Metropolitana con 3 días, o regiones con 5 o 6 días.
   - **Rojo:** más días que los anteriores.
   - **Revisión:** pedidos sin comuna o con una comuna que no está en la tabla `comunas` de
     la actividad 2 (salida de respaldo).
3. **Aviso.** Los pedidos en rojo se juntan en un solo mensaje para el jefe de despacho: un
   correo o un registro en la tabla `alertas`.
4. **Trazabilidad (criterio 4.3).** Cada pedido clasificado se guarda en la tabla
   `log_semaforo` con su color y `id_ejecucion` = `{{ $execution.id }}`. Creen además un
   workflow de errores con *Error Trigger* que guarde en la tabla `errores` el nombre del
   workflow, el nodo que falló y el mensaje, y asígnenlo en la configuración del workflow
   principal. Ojo: el workflow de errores solo se dispara en ejecuciones automáticas, no en las
   manuales; para probarlo, activen el workflow principal y provoquen un error.
5. **Caza de fallas.** Al cierre, intercambien su workflow con otro equipo.
   Cada equipo intenta hacer fallar el del otro con casos límite (fecha vacía, comuna mal
   escrita, días negativos). Cada falla encontrada que el otro equipo no controlaba vale un
   punto. Anoten las fallas que les encontraron y cómo las corregirían.

### Roles del equipo

Roten los roles respecto del ABPRO anterior:

- **Coordinador/a:** cuida el tiempo y comparte la pantalla del editor.
- **Responsable de reglas:** traduce el semáforo a condiciones del *Switch*.
- **Responsable de trazabilidad:** configura los registros y el workflow de errores.
- **Cazador/a de fallas:** prepara los casos límite para el otro equipo.
- **Documentador/a y portavoz:** registra las fallas y prepara la entrega.

### Entrega

Una entrega por equipo en esta Tarea:
- los dos workflows exportados en JSON (principal y de errores);
- una captura de `log_semaforo` con los pedidos clasificados;
- la tabla de reglas del semáforo con un ejemplo de pedido por color;
- el registro de la caza de fallas: las que encontraron y las que les encontraron, con su
  corrección;
- los nombres de los integrantes con su rol.
