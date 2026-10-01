# PF1481 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** un quiz por aprendizaje esperado del módulo 2 (Quiz n = AEn), con los criterios de evaluación del plan formativo 2026.
**Reparto:** Quiz 1: AE1 · Quiz 2: AE2 · Quiz 3: AE3 · Quiz 4: AE4 · Quiz 5: AE5 (uno por AE). Cinco preguntas cada uno, con una sola respuesta correcta y retroalimentación.
**Son formativos:** no llevan nota.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.
**Versión juego** (HTML y SCORM para el LMS, `npm run quiz-juego`): las mismas preguntas como una misión de 5 niveles con XP, combos, energía, comodín 50:50, estrellas, logros e insignia.
**Misión:** analizar las planillas de ventas de Distribuidora Pehuén para decidir mejor qué vender y dónde.

---

## Quiz 1 · El análisis de datos y sus etapas (AE1)

**Cuándo:** al cerrar el aprendizaje 1, después de la lectura y el ejercicio guiado con las ventas de Distribuidora Pehuén.
**Insignia:** Buscador/a de insights · **Siguiente parada:** aprendizaje 2, preparar los datos.

1. *(AE1)* La dueña de Distribuidora Pehuén te pregunta para qué le serviría el análisis de datos en su negocio. ¿Qué le respondes?
   - a) Para que el computador tome por ella todas las decisiones del negocio
   - **b) Para examinar sus ventas y obtener información que la ayude a decidir**
   - c) Para guardar todas las ventas en una planilla ordenada por fecha
   - d) Para tener gráficos llamativos en sus presentaciones a clientes
   *Retroalimentación:* "Analizar datos es examinarlos, limpiarlos y transformarlos para obtener información útil. En el trabajo de hoy sirve para decidir con evidencia, no para reemplazar a las personas ni para decorar informes."
2. *(AE1)* Pehuén ya definió su pregunta: qué productos dejar de vender. Reunió las planillas de ventas de 12 meses, pero hay clientes repetidos y fechas escritas de distintas formas. ¿Qué etapa del proceso sigue?
   - a) Comunicar los resultados a la dueña de la empresa
   - b) Volver a plantear la pregunta desde el principio
   - **c) Limpiar y preparar los datos reunidos**
   - d) Elegir el gráfico que irá en el informe final
   *Retroalimentación:* "El proceso avanza así: definir la pregunta, reunir los datos, limpiarlos y prepararlos, analizarlos y comunicar los hallazgos. Si analizas datos con clientes repetidos y fechas mezcladas, las conclusiones saldrán mal."
3. *(AE1)* Terminaste de analizar las ventas del año. ¿Cuál de estos resultados es un insight para Pehuén?
   - **a) En verano el norte compra el doble de bebidas: conviene reforzar ese stock**
   - b) La planilla de ventas del año tiene 8.400 filas y 12 columnas
   - c) Las ventas de cada día se guardan en una planilla compartida por todo el equipo
   - d) En marzo se registraron ventas a 140 almacenes distintos
   *Retroalimentación:* "Un insight es un hallazgo que explica algo del negocio y sugiere una acción. Contar filas o almacenes, o decir dónde se guardan los datos, describe la planilla, pero no ayuda a decidir."
4. *(AE1)* Pehuén quiere estimar cuántas cajas de aceite venderá en diciembre a partir de las ventas de los años anteriores. ¿Qué tipo de análisis corresponde?
   - a) Descriptivo
   - b) Diagnóstico
   - c) Prescriptivo
   - **d) Predictivo**
   *Retroalimentación:* "El análisis predictivo usa datos históricos para estimar lo que viene. El descriptivo resume qué pasó, el diagnóstico busca por qué pasó y el prescriptivo recomienda qué hacer."
5. *(AE1)* Pehuén registra unas 6.000 ventas al mes. Un colega dice que Excel «no sirve para analizar datos». ¿Cómo evalúas esa opinión?
   - a) Es cierto: Excel sirve para hacer listas, pero no para analizar
   - b) Es cierto: Excel no permite graficar más de mil filas a la vez
   - **c) No es así: Excel maneja ese volumen con fórmulas, gráficos y tablas dinámicas**
   - d) No es así, pero solo si antes se copian todas las ventas a un documento de texto
   *Retroalimentación:* "Una hoja de Excel admite más de un millón de filas: 72.000 ventas al año caben de sobra. Para volúmenes mucho mayores o varias tablas relacionadas, el módulo usa Power Pivot."

---

## Quiz 2 · Preparar y limpiar los datos (AE2)

**Cuándo:** al cerrar el aprendizaje 2, después de la lectura y el ejercicio guiado de limpieza con la planilla de Distribuidora Pehuén.
**Insignia:** Experto/a en limpieza de datos · **Siguiente parada:** aprendizaje 3, explorar los datos.

1. *(AE2)* Pehuén calcula el monto promedio por venta con una planilla que tiene ventas repetidas y algunos montos guardados como texto. ¿Qué es lo más probable?
   - a) Que Excel detecte los errores y los corrija antes de calcular
   - b) Que el promedio salga bien, porque los errores se compensan
   - **c) Que el promedio salga distorsionado sin que Excel dé aviso**
   - d) Que la fórmula muestre un mensaje de error en la celda
   *Retroalimentación:* "PROMEDIO ignora los montos guardados como texto y cuenta dos veces las ventas repetidas, sin avisar. Por eso los datos se preparan antes de analizarlos: con datos sucios, las conclusiones salen mal."
2. *(AE2)* La lista de clientes de Pehuén tiene almacenes repetidos en filas idénticas. ¿Qué herramienta de Excel usas para dejar uno de cada uno?
   - a) Datos > Texto en columnas
   - **b) Datos > Quitar duplicados**
   - c) Datos > Validación de datos
   - d) Datos > Ordenar de A a Z
   *Retroalimentación:* "Quitar duplicados elimina las filas repetidas según las columnas que elijas y te dice cuántas quitó. Conviene aplicarlo sobre una copia, para conservar los datos originales."
3. *(AE2)* En la columna Comuna, Temuco aparece escrita como «Temuco», «TCO» y «Tmuco». ¿Qué técnica aplicas para dejar un solo nombre?
   - a) Quitar duplicados en la columna Comuna de la planilla
   - b) Ordenar la columna Comuna de la A a la Z
   - c) Ocultar las filas que no dicen «Temuco»
   - **d) Buscar y reemplazar cada variante por «Temuco»**
   *Retroalimentación:* "Estandarizar es dejar un mismo valor escrito de una sola forma. Con Buscar y reemplazar cambias cada variante; si no lo haces, un resumen por comuna mostraría tres Temucos distintos."
4. *(AE2)* A 12 ventas les falta el monto. Una compañera propone escribir 0 en esas celdas para que no queden vacías. ¿Qué le respondes?
   - **a) Que no: un 0 baja el promedio; mejor buscar el dato o marcarlo como faltante**
   - b) Que sí: así ninguna celda queda vacía y todas las fórmulas cuadran
   - c) Que conviene borrar la columna Monto completa y analizar sin ella
   - d) Que da igual, porque la función PROMEDIO no toma en cuenta las celdas con cero
   *Retroalimentación:* "Un 0 es un valor real: PROMEDIO lo cuenta y el resultado baja. La buena práctica es recuperar el dato desde la fuente o dejarlo marcado como faltante, y anotar qué decidiste."
5. *(AE2)* Desde ahora, en la columna Zona solo se debe poder elegir Norte, Sur, Oriente o Poniente. ¿Qué aplicas en Excel?
   - a) Un filtro en la columna Zona
   - b) Texto en columnas sobre la columna Zona
   - **c) Validación de datos con una lista**
   - d) Ordenar la columna Zona de la A a la Z
   *Retroalimentación:* "La validación de datos con una lista muestra un menú desplegable y, por defecto, no acepta valores que no estén en ella. Así previenes los errores en vez de limpiarlos después."

---

## Quiz 3 · Explorar los datos (AE3)

**Cuándo:** al cerrar el aprendizaje 3, después de la lectura y el ejercicio guiado de exploración de las ventas de Distribuidora Pehuén.
**Insignia:** Explorador/a de datos · **Siguiente parada:** aprendizaje 4, tablas dinámicas.

1. *(AE3)* Recibes la planilla de ventas del año de Pehuén y aún no sabes bien qué contiene. ¿Cuál es el propósito del análisis exploratorio en ese momento?
   - a) Presentar a la dueña las conclusiones finales del año
   - **b) Conocer los datos: rangos, patrones y valores fuera de lo común**
   - c) Confirmar la conclusión que ya tenías antes de mirar los datos de ventas
   - d) Borrar las ventas que parezcan demasiado altas o bajas
   *Retroalimentación:* "El análisis exploratorio sirve para conocer los datos antes de concluir. Con estadísticas como MIN, MAX y PROMEDIO, y con gráficos, detectas patrones, errores y valores atípicos: de ahí salen las primeras preguntas e insights."
2. *(AE3)* Pehuén quiere saber cuánto suben las ventas de un almacén por cada visita extra del vendedor en el mes. ¿Qué análisis corresponde?
   - a) Series de tiempo, porque las visitas se hacen cada mes
   - b) Series de tiempo, porque las ventas se registran con fecha
   - c) Regresión, porque ordena las ventas desde la más antigua
   - **d) Regresión, porque relaciona las visitas con las ventas**
   *Retroalimentación:* "El análisis de regresión estudia cómo cambia una variable, las ventas, cuando cambia otra, las visitas. El de series de tiempo sigue una variable a lo largo del tiempo para ver su tendencia y sus ciclos."
3. *(AE3)* Las ventas semanales de cinco almacenes, en miles de pesos, son 20, 22, 23, 25 y 300, en las celdas B2:B6. ¿Qué dan `=PROMEDIO(B2:B6)` y `=MEDIANA(B2:B6)`?
   - **a) PROMEDIO 78 y MEDIANA 23**
   - b) PROMEDIO 23 y MEDIANA 78
   - c) PROMEDIO 78 y MEDIANA 78
   - d) PROMEDIO 78 y MEDIANA 25
   *Retroalimentación:* "La suma es 390 y 390 / 5 = 78. Ordenados, el valor del medio es 23. El almacén de 300 tira el promedio hacia arriba; la mediana representa mejor la venta típica."
4. *(AE3)* Quieres mostrar cómo se reparten los montos de las ventas: cuántas caen entre $0 y $50.000, cuántas entre $50.000 y $100.000, y así. ¿Qué gráfico creas en Excel?
   - a) Circular (torta)
   - b) Línea
   - **c) Histograma**
   - d) Dispersión
   *Retroalimentación:* "El histograma agrupa una variable numérica en rangos y muestra cuántos datos caen en cada uno. La línea muestra la evolución en el tiempo, la torta las partes de un total y la dispersión la relación entre dos variables."
5. *(AE3)* Graficaste las ventas mensuales de Pehuén con un gráfico de líneas. Suben y bajan de un mes a otro, y quieres ver la tendencia de fondo y proyectarla dos meses. ¿Qué haces?
   - a) Ordenar los meses de mayor a menor venta antes de graficar
   - b) Cambiar el gráfico de líneas por uno circular, con un mes en cada porción
   - **c) Agregar una línea de tendencia y extenderla dos períodos hacia adelante**
   - d) Agregar etiquetas de datos con el monto exacto de cada mes
   *Retroalimentación:* "La línea de tendencia muestra hacia dónde van las ventas, más allá de los altibajos, y en sus opciones la puedes prolongar hacia adelante. En una serie de tiempo los meses van siempre en orden: si los reordenas, pierdes la tendencia."

---

## Quiz 4 · Resumir con tablas dinámicas (AE4)

**Cuándo:** al cerrar el aprendizaje 4, después de la lectura y el ejercicio guiado con tablas dinámicas de las ventas de Distribuidora Pehuén.
**Insignia:** Maestro/a de tablas dinámicas · **Siguiente parada:** aprendizaje 5, Power Pivot y Power View.

1. *(AE4)* La dueña de Pehuén pregunta: «¿Cuánto vendió cada zona en cada mes?». Armas una tabla dinámica con la base de ventas. ¿Cómo ubicas los campos?
   - a) Zona en Filas, Monto en Columnas y Mes en Valores
   - **b) Zona en Filas, Mes en Columnas y Monto en Valores**
   - c) Monto en Filas, Zona en Columnas y Mes en Filtros
   - d) Mes en Filtros, Zona en Valores y Monto en Columnas
   *Retroalimentación:* "Lo que quieres comparar va en Filas y Columnas, y el número que quieres resumir va en Valores. Así cada celda muestra el total de Monto para una zona y un mes."
2. *(AE4)* La tabla dinámica muestra «Suma de Monto» por zona, pero la dueña quiere saber el monto promedio de cada venta por zona. ¿Qué haces?
   - a) Mover el campo Monto desde Valores hacia el área Filtros
   - b) Arrastrar también el campo Zona al área Valores, junto a Monto
   - **c) En Configuración de campo de valor, resumir Monto por Promedio**
   - d) Agregar una segmentación de datos con el campo Zona
   *Retroalimentación:* "Por defecto, un campo numérico se resume con Suma. En Configuración de campo de valor eliges otra operación, como Promedio, Cuenta, Máx o Mín, y la tabla se recalcula sola."
3. *(AE4)* La base tiene las columnas Venta y Costo. Quieres ver el margen (Venta menos Costo) de cada zona dentro de la tabla dinámica, sin agregar columnas a la base. ¿Qué usas?
   - **a) Un campo calculado con la fórmula `=Venta-Costo`**
   - b) Una segmentación de datos con los campos Venta y Costo
   - c) Un filtro de informe con el campo Costo
   - d) Un gráfico dinámico de columnas apiladas
   *Retroalimentación:* "Un campo calculado crea un campo nuevo con una fórmula sobre otros campos de la tabla dinámica, sin tocar la base. Se agrega desde Campos, elementos y conjuntos."
4. *(AE4)* A partir de tu tabla dinámica de ventas por zona y mes, quieres mostrar a la dueña cómo evolucionan las ventas de cada zona durante el año. ¿Qué gráfico dinámico creas?
   - a) Circular, con una porción para cada mes
   - b) Circular, con una porción para cada zona
   - c) De barras, con una sola barra por zona con el total del año
   - **d) De líneas, con los meses en el eje y una línea por zona**
   *Retroalimentación:* "Para ver la evolución en el tiempo se usa un gráfico de líneas: los meses van en el eje horizontal y cada zona es una serie. La torta y el total anual muestran un solo momento, no el recorrido."
5. *(AE4)* Tu gráfico dinámico está vinculado a la tabla dinámica de ventas. Filtras la tabla para ver solo marzo. ¿Qué pasa con el gráfico?
   - **a) Se actualiza solo y muestra marzo, igual que la tabla**
   - b) Sigue igual hasta que lo borres y lo vuelvas a crear
   - c) Se desvincula de la tabla y queda como una imagen fija
   - d) Muestra marzo resaltado y los demás meses en gris
   *Retroalimentación:* "El gráfico dinámico y su tabla dinámica están vinculados: lo que filtras o reorganizas en uno cambia el otro. Por eso sirven para presentar un análisis que puedes ajustar en vivo."

---

## Quiz 5 · Power Pivot y Power View (AE5)

**Cuándo:** al cerrar el aprendizaje 5, después de la lectura y el ejercicio guiado con el modelo de datos de Distribuidora Pehuén.
**Insignia:** Modelador/a de datos · **Siguiente parada:** la evaluación del módulo 2.

1. *(AE5)* ¿Qué te permite Power Pivot que no logras con una tabla dinámica tradicional creada desde un solo rango?
   - a) Ordenar y filtrar las filas de una sola tabla por cualquiera de sus columnas
   - **b) Relacionar varias tablas en un modelo y trabajar con millones de filas**
   - c) Cambiar el diseño y los colores de la tabla dinámica con estilos
   - d) Escribir fórmulas como SUMA o PROMEDIO en las celdas de la hoja
   *Retroalimentación:* "Power Pivot carga datos de varias fuentes en un modelo de datos, relaciona tablas y supera el límite de filas de una hoja. Una tabla dinámica tradicional resume una sola tabla."
2. *(AE5)* Las ventas de Pehuén están en una hoja con formato de tabla y quieres trabajarlas en Power Pivot. ¿Qué haces?
   - a) Crear una tabla dinámica común desde el rango, sin el modelo de datos
   - b) Aplicar Texto en columnas a toda la tabla de ventas antes de abrir Power Pivot
   - c) Copiar la tabla y pegarla como valores en una hoja nueva del libro
   - **d) Seleccionar la tabla y usar Agregar al modelo de datos (pestaña Power Pivot)**
   *Retroalimentación:* "Agregar al modelo de datos carga la tabla en Power Pivot como una tabla vinculada. Para traer datos de otros archivos o de una base de datos, en la ventana de Power Pivot usas Obtener datos externos."
3. *(AE5)* En Power Pivot tienes la tabla Ventas (una fila por venta, con la columna CodProducto) y la tabla Productos (una fila por producto, con CodProducto y Categoría). Quieres analizar las ventas por categoría. ¿Qué paso de modelado haces?
   - **a) Relacionar Ventas y Productos por CodProducto, en la vista de diagrama**
   - b) Relacionar Ventas y Productos por Categoría, en la vista de diagrama
   - c) Quitar duplicados de CodProducto en la tabla Ventas antes de cargarla al modelo
   - d) Ordenar ambas tablas por CodProducto para que las filas calcen
   *Retroalimentación:* "Las tablas se relacionan por la columna que comparten. Productos tiene cada código una sola vez y Ventas lo repite en muchas filas: es una relación de uno a varios. Categoría no sirve, porque no está en Ventas."
4. *(AE5)* Quieres el margen porcentual de cada zona: la ganancia total dividida por la venta total. ¿Qué creas en Power Pivot?
   - a) Una columna calculada con el porcentaje de cada venta, para después sumarla
   - b) Una relación entre la tabla Ventas y una tabla de zonas
   - **c) Una medida que divida la suma de la ganancia por la suma de la venta**
   - d) Un filtro por zona en la vista de diagrama de Power Pivot
   *Retroalimentación:* "Una medida se calcula sobre los datos que quedan en cada celda de la tabla dinámica, según la zona o el mes que filtres. Sumar porcentajes fila por fila da un resultado sin sentido."
5. *(AE5)* Estás armando en Power View un panel de ventas de Pehuén con un gráfico de barras por zona, una tabla por producto y una tarjeta con el total. Para probarlo, haces clic en la barra de la zona Sur. ¿Qué debería pasar?
   - a) Se abre la hoja de origen en la primera venta de la zona Sur
   - **b) Las demás visualizaciones se filtran o resaltan para la zona Sur**
   - c) Solo cambia el color de esa barra y el resto del panel queda igual
   - d) Power View crea una hoja nueva solo con los datos de la zona Sur
   *Retroalimentación:* "En Power View las visualizaciones de una misma hoja están conectadas: al hacer clic en un valor, las demás se filtran o lo destacan. Eso hace que el panel sea interactivo sin escribir fórmulas."

---

## Cobertura de criterios

Quiz 1 (AE1): criterio 1.1 → pregunta 1; criterio 1.2 → preguntas 2 y 3; criterio 1.3 → preguntas 4 y 5.
Quiz 2 (AE2): criterio 2.1 → preguntas 1 y 2; criterio 2.2 → preguntas 3 y 4; criterio 2.3 → preguntas 2, 3 y 5.
Quiz 3 (AE3): criterio 3.1 → pregunta 1; criterio 3.2 → pregunta 2; criterio 3.3 → pregunta 3; criterio 3.4 → pregunta 4; criterio 3.5 → pregunta 5.
Quiz 4 (AE4): criterio 4.1 → preguntas 1, 2 y 3; criterio 4.2 → preguntas 4 y 5.
Quiz 5 (AE5): criterio 5.1 → pregunta 1; criterio 5.2 → pregunta 2; criterio 5.3 → preguntas 3 y 4; criterio 5.4 → pregunta 5.
