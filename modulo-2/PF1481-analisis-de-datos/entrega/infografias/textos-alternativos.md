# Fundamentos de Análisis de Datos · Módulo 2 · Infografías en texto

Versión en texto de cada infografía, para lectores de pantalla y para el texto alternativo del LMS. Generado por `npm run infografias`.

## Aprendizaje esperado 1 · CARACTERÍSTICAS PRINCIPALES DEL ANÁLISIS DE DATOS

Módulo 2 · INTRODUCCIÓN AL ANÁLISIS DE DATOS. De los datos a las decisiones.

**Aprendizaje esperado 1:** APLICAR LAS CARACTERÍSTICAS PRINCIPALES DEL ANÁLISIS DE DATOS Y SUS ETAPAS PARA LA OBTENCIÓN DE INSIGHTS A TRAVÉS DE DATOS EN PLANILLAS DE CÁLCULO.

1. **Qué es el análisis de datos.** Contenido: QUÉ ES EL ANÁLISIS DE DATOS. Examinar, limpiar, transformar y modelar datos para descubrir información útil, sacar conclusiones y apoyar decisiones.
2. **Para qué sirve en el trabajo.** Contenido: QUÉ ES EL ANÁLISIS DE DATOS. Casi toda área registra datos: ventas, inventario, clientes, atención. Saber leerlos permite decidir con evidencia y no por intuición; es una competencia clave en el trabajo del siglo XXI.
3. **Las etapas del análisis.** Contenido: ETAPAS DEL ANÁLISIS DE DATOS. 1 Definir la pregunta · 2 Recolectar los datos · 3 Preparar y limpiar · 4 Explorar y analizar · 5 Visualizar y comunicar los hallazgos.
4. **Del dato al insight.** Contenido: ETAPAS DEL ANÁLISIS DE DATOS. Un insight es un hallazgo que explica lo que pasa y lleva a actuar. Ejemplo: en Distribuidora Pehuén, las ventas de la zona sur bajan en invierno, así que conviene reforzar el stock en otoño.
5. **Técnicas para analizar.** Contenido: TÉCNICAS Y HERRAMIENTAS PARA ANALIZAR DATOS. Descriptiva (qué pasó), diagnóstica (por qué pasó), predictiva (qué podría pasar) y prescriptiva (qué conviene hacer). Se apoyan en estadística básica, filtros, agrupaciones y gráficos.
6. **Herramientas.** Contenido: TÉCNICAS Y HERRAMIENTAS PARA ANALIZAR DATOS. Planillas de cálculo (Excel, Google Sheets), herramientas de visualización (Power BI, Tableau, Looker Studio) y lenguajes como Python o R. En este módulo trabajas con Excel.
7. **Cómo elegir la herramienta.** Contenido: TÉCNICAS Y HERRAMIENTAS PARA ANALIZAR DATOS. Considera el volumen de datos, la pregunta que respondes, quién verá el resultado y cuántas veces se repetirá el análisis. Para volúmenes moderados y respuestas rápidas, una planilla basta.

**Lo que demostrarás:**
- 1.1 RECONOCE LA DEFINICIÓN DEL ANÁLISIS DE DATOS Y SU UTILIDAD EN LA VIDA LABORAL DEL SIGLO XXI.
- 1.2 APLICA LAS ETAPAS DEL PROCESO DE ANÁLISIS DE DATOS PARA LA OBTENCIÓN DE INSIGHTS.
- 1.3 EVALÚA LAS TÉCNICAS Y HERRAMIENTAS UTILIZADAS PARA EL ANÁLISIS DE DATOS.

## Aprendizaje esperado 2 · PREPARACIÓN DE LOS DATOS

Módulo 2 · INTRODUCCIÓN AL ANÁLISIS DE DATOS. Un set de datos limpio, listo para analizar.

**Aprendizaje esperado 2:** APLICAR TÉCNICAS Y HERRAMIENTAS DE PREPARACIÓN DE DATOS PARA LA OBTENCIÓN DE UN SET DE DATOS LIMPIO UTILIZANDO PLANILLAS DE CÁLCULO.

1. **Qué es preparar los datos.** Contenido: QUÉ ES LA PREPARACIÓN DE DATOS · IMPORTANCIA DE LA PREPARACIÓN DE DATOS DURANTE EL ANÁLISIS. Dejar los datos completos, coherentes y en el formato correcto antes de analizarlos. Si los datos de entrada tienen errores, las conclusiones también los tendrán.
2. **Técnicas de limpieza.** Contenido: TÉCNICAS DE PREPARACIÓN Y LIMPIEZA DE DATOS. Revisar la estructura, quitar duplicados y vacíos, unificar formatos, tratar los datos faltantes y validar lo que se ingresa. Trabaja siempre sobre una copia de los datos originales.
3. **Estructura y tipos de dato.** Contenido: ESTRUCTURA Y TIPOS DE DATO EN EXCEL. Una tabla ordenada: una fila por registro, una columna por variable y los encabezados en la primera fila. Cada columna con su tipo: número, texto, fecha o moneda.
4. **Duplicados y vacíos.** Contenido: ELIMINACIÓN DE DUPLICADOS EN EXCEL · ELIMINACIÓN DE FILAS O COLUMNAS VACÍAS EN EXCEL. Datos → Quitar duplicados, marcando las columnas que identifican un registro. Para los vacíos: Inicio → Buscar y seleccionar → Ir a Especial → Celdas en blanco, y eliminar la fila o la columna.
5. **Estandarizar.** Contenido: ESTANDARIZACIÓN DE DATOS EN EXCEL CON BUSCAR Y REEMPLAZAR. Buscar y reemplazar (Ctrl + L) unifica escrituras: «Stgo.», «Santiago» y «SANTIAGO» quedan como un solo valor. Ayudan las funciones ESPACIOS, MAYUSC y NOMPROPIO.
6. **Filtrar y ordenar.** Contenido: FILTRADO DE DATOS EN EXCEL · ORDENAMIENTO DE DATOS EN EXCEL. Datos → Filtro muestra solo las filas que cumplen una condición, por ejemplo una región. Datos → Ordenar organiza por una o varias columnas, de menor a mayor o de la A a la Z.
7. **Dividir y combinar.** Contenido: DIVISIÓN DE DATOS EN EXCEL · COMBINACIÓN DE DATOS EN EXCEL. Datos → Texto en columnas separa «Nombre Apellido» en dos columnas. Para unir columnas: CONCAT o el operador &; para traer datos de otra tabla: BUSCARX o BUSCARV.
8. **Datos faltantes.** Contenido: RELLENO DE DATOS FALTANTES EN EXCEL. Decide caso a caso: completar con un valor conocido, rellenar hacia abajo cuando el dato se repite, usar el promedio o la mediana, o marcarlo como «sin dato». Nunca inventes datos.
9. **Validación de datos.** Contenido: VALIDACIÓN DE DATOS EN EXCEL. Datos → Validación de datos limita lo que se puede escribir en una celda: una lista de opciones, números dentro de un rango o fechas válidas. Evita errores desde el ingreso.

**Lo que demostrarás:**
- 2.1 RECONOCE LA IMPORTANCIA, TÉCNICAS Y HERRAMIENTAS PARA LA PREPARACIÓN DE LOS DATOS.
- 2.2 COMPRENDE LAS TÉCNICAS DE PREPARACIÓN Y LIMPIEZA DE DATOS DE ACUERDO CON LAS BUENAS PRÁCTICAS DE LA DISCIPLINA.
- 2.3 APLICA TÉCNICAS DE PREPARACIÓN Y LIMPIEZA DE DATOS UTILIZANDO PLANILLAS DE CÁLCULO EXCEL PARA RESOLVER UN PROBLEMA.

## Aprendizaje esperado 3 · EXPLORACIÓN DE DATOS

Módulo 2 · INTRODUCCIÓN AL ANÁLISIS DE DATOS. Mirar los datos antes de concluir.

**Aprendizaje esperado 3:** APLICAR TÉCNICAS DE EXPLORACIÓN DE DATOS UTILIZANDO PLANILLAS DE CÁLCULO PARA LA OBTENCIÓN DE INSIGHTS.

1. **Análisis exploratorio.** Contenido: QUÉ ES EL ANÁLISIS EXPLORATORIO DE DATOS. Un primer recorrido para conocer los datos: cómo se distribuyen, qué valores son extremos y qué variables se relacionan. Responde preguntas y abre otras nuevas.
2. **Análisis regresivo.** Contenido: QUÉ ES UN ANÁLISIS REGRESIVO. Estudia cómo cambia una variable según otra. Ejemplo: cuánto suben las ventas cuando aumenta la inversión en publicidad. Se ve con un gráfico de dispersión y su línea de tendencia.
3. **Series de tiempo.** Contenido: QUÉ ES EL ANÁLISIS DE SERIES DE TIEMPO. Datos ordenados en el tiempo (días, meses, años) para ver la tendencia, la estacionalidad y los cambios. A diferencia de la regresión, el eje que explica es el tiempo.
4. **Estadísticas de resumen.** Contenido: CÁLCULO DE ESTADÍSTICAS DE SUMARIZACIÓN EN EXCEL: PROMEDIO, MEDIANA, COUNT, MIN, MAX, DESVEST. =PROMEDIO(B2:B100) · =MEDIANA() · =CONTAR() (COUNT) · =MIN() · =MAX() · =DESVEST(): el centro, la cantidad, el rango y la dispersión de los datos.
5. **Análisis visual.** Contenido: QUÉ ES EL ANÁLISIS VISUAL. Usar gráficos para ver patrones que en una tabla pasan inadvertidos. Un buen gráfico tiene título, ejes rotulados y una sola idea principal.
6. **Qué gráfico usar.** Contenido: GRÁFICOS EN EXCEL PARA EL ANÁLISIS VISUAL: HISTOGRAMA, LÍNEA, BARRAS, CAJA Y BIGOTE, TORTA, DISPERSIÓN. Histograma: distribución · Línea: evolución · Barras: comparar categorías · Caja y bigote: dispersión y valores atípicos · Torta: partes de un total · Dispersión: relación entre dos variables.
7. **Calcular tendencias.** Contenido: CÁLCULO DE TENDENCIAS EN EXCEL. =TENDENCIA() y =PRONOSTICO.LINEAL() proyectan valores a partir de los datos; un promedio móvil suaviza las variaciones de un mes a otro.
8. **Gráficos de tendencia.** Contenido: GRÁFICOS EN EXCEL PARA EL ANÁLISIS DE TENDENCIAS. En un gráfico de línea o de dispersión: clic derecho en la serie → Agregar línea de tendencia (lineal o media móvil), con la opción de mostrar la ecuación y el R².

**Lo que demostrarás:**
- 3.1 DESCRIBE EL PROPÓSITO, TÉCNICAS Y HERRAMIENTAS DEL ANÁLISIS EXPLORATORIO DE DATOS PARA LA OBTENCIÓN DE INSIGHTS EN LA INFORMACIÓN.
- 3.2 COMPRENDE LA DIFERENCIA ENTRE UN ANÁLISIS DE SERIES DE TIEMPO Y UN ANÁLISIS REGRESIVO.
- 3.3 APLICA CÁLCULOS DE SUMARIZACIÓN EN LA INFORMACIÓN UTILIZANDO FÓRMULAS EN EXCEL PARA LA CARACTERIZACIÓN DE LOS DATOS.
- 3.4 CREA GRÁFICOS PARA LA CARACTERIZACIÓN DE LA INFORMACIÓN UTILIZANDO EXCEL QUE RESUELVEN UN PROBLEMA.
- 3.5 APLICA TÉCNICAS PARA EL ANÁLISIS DE SERIES DE TIEMPO QUE RESUELVEN UN PROBLEMA UTILIZANDO EXCEL.

## Aprendizaje esperado 4 · TABLAS DINÁMICAS

Módulo 2 · INTRODUCCIÓN AL ANÁLISIS DE DATOS. Resumir miles de filas con un par de clics.

**Aprendizaje esperado 4:** ANALIZAR UN CONJUNTO DE DATOS PARA RESUMIR LA INFORMACIÓN DE FORMA INTERACTIVA Y DAR SOLUCIÓN A UN PROBLEMA UTILIZANDO TABLAS DINÁMICAS.

1. **Qué es una tabla dinámica.** Contenido: QUÉ ES UNA TABLA DINÁMICA. Una tabla que resume miles de filas en segundos: agrupa, suma, cuenta o promedia según los campos que arrastras. No modifica los datos de origen.
2. **Ventajas.** Contenido: VENTAJAS DE SU UTILIZACIÓN. Es rápida, interactiva y no requiere fórmulas: cambias la vista arrastrando campos, filtras al instante y la actualizas cuando llegan datos nuevos.
3. **Dónde se usan.** Contenido: ESCENARIOS COMUNES DONDE SE UTILIZAN. Ventas por producto, región o mes; inventario por bodega; atenciones por canal; gastos por centro de costo.
4. **Las cuatro áreas.** Contenido: FUNCIONALIDADES BÁSICAS DE UNA TABLA DINÁMICA EN EXCEL. Insertar → Tabla dinámica. Arrastra los campos a Filas, Columnas, Valores y Filtros. En Valores eliges suma, cuenta, promedio, máximo o mínimo.
5. **Analizar con la tabla.** Contenido: ANÁLISIS DE DATOS CON TABLAS DINÁMICAS EN EXCEL. Ordena para ver los mayores, agrupa las fechas por mes o trimestre, muestra los valores como % del total y usa segmentaciones para filtrar con un clic.
6. **Gráficos dinámicos.** Contenido: GRÁFICOS DINÁMICOS EN EXCEL. Insertar → Gráfico dinámico: el gráfico sigue a la tabla. Si filtras o cambias un campo, el gráfico se actualiza solo.
7. **Campos calculados.** Contenido: FUNCIONALIDADES AVANZADAS: CAMPOS CALCULADOS. Analizar de tabla dinámica → Campos, elementos y conjuntos → Campo calculado. Crea un campo nuevo con una fórmula sobre otros, por ejemplo Margen = Ventas − Costo.

**Lo que demostrarás:**
- 4.1 APLICA TABLAS PIVOTEADAS PARA EL ANÁLISIS Y PRESENTACIÓN DE LA INFORMACIÓN QUE RESUELVE UN PROBLEMA UTILIZANDO EXCEL.
- 4.2 APLICA GRÁFICOS DINÁMICOS PARA EL ANÁLISIS Y PRESENTACIÓN DE LA INFORMACIÓN QUE RESUELVE UN PROBLEMA UTILIZANDO EXCEL.

## Aprendizaje esperado 5 · COMPLEMENTOS Y HERRAMIENTAS AVANZADAS EN EXCEL

Módulo 2 · INTRODUCCIÓN AL ANÁLISIS DE DATOS. Modelos de datos y tableros interactivos.

**Aprendizaje esperado 5:** ANALIZAR UN CONJUNTO DE DATOS UTILIZANDO COMPLEMENTOS Y HERRAMIENTAS AVANZADAS PARA DAR SOLUCIÓN A UN PROBLEMA EN EXCEL.

1. **Qué es Power Pivot.** Contenido: QUÉ ES POWER PIVOT Y POR QUÉ ES ÚTIL EN EL ANÁLISIS DE DATOS. Un complemento de Excel para trabajar con millones de filas y varias tablas relacionadas en un modelo de datos. Se activa en Archivo → Opciones → Complementos → Complementos COM.
2. **Frente a la tabla dinámica tradicional.** Contenido: DIFERENCIA CON LAS TABLAS DINÁMICAS TRADICIONALES. La tradicional resume una sola tabla de la hoja. Con Power Pivot, la tabla dinámica combina varias tablas relacionadas y admite medidas escritas en DAX.
3. **Cargar los datos.** Contenido: IMPORTACIÓN Y CARGA DE DATOS EN POWER PIVOT. Power Pivot → Administrar → Obtener datos externos: desde Excel, CSV, Access o bases de datos. También con «Agregar al modelo de datos» desde una tabla de la hoja.
4. **Modelar.** Contenido: MODELADO DE DATOS EN POWER PIVOT (CASOS SIMPLES). En la Vista de diagrama, relaciona las tablas por una columna común: Ventas[IdProducto] con Productos[IdProducto]. Una tabla de hechos al centro y sus tablas de dimensión alrededor.
5. **Medidas calculadas.** Contenido: DEFINICIÓN Y CREACIÓN DE MEDIDAS CALCULADAS. Una medida es un cálculo que se adapta a los filtros de la tabla dinámica. Se escribe en DAX: Total ventas := SUM(Ventas[Monto]).
6. **Dashboards con Power View.** Contenido: CREACIÓN DE DASHBOARDS INTERACTIVOS MEDIANTE POWER VIEW. Power View arma un tablero interactivo sobre el modelo: tarjetas, gráficos y mapas que se filtran entre sí con un clic. Viene en Excel 2013 y 2016; en Microsoft 365 el mismo tablero se arma con gráficos dinámicos y segmentaciones.

**Lo que demostrarás:**
- 5.1 COMPRENDE LAS CARACTERÍSTICAS Y POTENCIALIDADES DE POWER PIVOT PARA IMPULSAR EL ANÁLISIS DE DATOS EN EXCEL.
- 5.2 APLICA PROCEDIMIENTOS DE CARGA DE DATOS UTILIZANDO POWER PIVOT PARA DAR SOLUCIÓN A UN PROBLEMA PLANTEADO.
- 5.3 REALIZA MODELAMIENTOS BÁSICOS EN POWER PIVOT PARA DAR SOLUCIÓN A UN PROBLEMA PLANTEADO.
- 5.4 CREA DASHBOARDS INTERACTIVOS SIMPLES UTILIZANDO POWER VIEW PARA DAR SOLUCIÓN A UN PROBLEMA PLANTEADO.
