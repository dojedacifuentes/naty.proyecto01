# Fundamentos de Desarrollo Front-End · Módulo 2 · Infografías en texto

Versión en texto de cada infografía, para lectores de pantalla y para el texto alternativo del LMS. Generado por `npm run infografias`.

## Aprendizaje esperado 3 · APLICACIÓN DE ESTILOS Y RESPONSIVIDAD

Módulo 2 · FUNDAMENTOS DE DESARROLLO FRONT-END. Que tu página se vea bien en cualquier pantalla.

**Aprendizaje esperado 3:** APLICAR HOJAS DE ESTILO CSS BÁSICAS DISTINGUIENDO ELEMENTOS DE RESPONSIVIDAD PARA PERSONALIZAR LA PRESENTACIÓN DE UN DOCUMENTO HTML ACORDE A UN REQUERIMIENTO ENTREGADO.

1. **Qué es CSS.** Contenido: ¿QUÉ ES CSS, FUNDAMENTOS Y UTILIDAD? · CSS Y HTML. HTML define la estructura y el contenido; CSS, cómo se ve: colores, tipografías, tamaños y posición. Una regla tiene selector, propiedad y valor: h1 { color: #0F3D5E; }.
2. **Tres formas de aplicar estilos.** Contenido: ESTILOS EN LÍNEA, EMBEBIDOS, ARCHIVOS EXTERNOS. En línea: el atributo style en la etiqueta · Embebidos: <style> dentro de <head> · Archivo externo: <link rel="stylesheet" href="css/estilos.css">, la opción recomendada.
3. **Selectores.** Contenido: REFERENCIAS Y SELECTORES, POR CLASE, POR ID. Por etiqueta: p · por clase: .destacado (se repite en varios elementos) · por id: #portada (uno solo por página).
4. **El modelo de cajas.** Contenido: EL MODELO DE CAJAS. Cada elemento es una caja: contenido → padding (relleno) → border (borde) → margin (margen). Con box-sizing: border-box, el ancho incluye el relleno y el borde.
5. **Estilos más usados.** Contenido: ESTILOS MÁS UTILIZADOS (FUENTES, LÍNEAS, CAJAS, ETC…). font-family, font-size, color, line-height, text-align, background, border, width y display.
6. **Qué regla gana.** Contenido: ORDEN JERÁRQUICO DE APLICACIÓN DE REGLAS CSS Y EL PESO ASOCIADO A LAS REGLAS. Si dos reglas chocan, gana la de mayor peso: estilo en línea > id > clase > etiqueta. Con el mismo peso, gana la última escrita.
7. **Assets, imágenes y rutas.** Contenido: MANEJO DE ASSETS E IMÁGENES · CONOCIENDO RUTAS ABSOLUTAS Y RELATIVAS. Ruta absoluta: la dirección completa (https://sitio.cl/img/logo.png). Relativa: desde el archivo actual (img/logo.png o ../img/logo.png). Ordena el proyecto en carpetas css/ e img/.
8. **Buenas prácticas.** Contenido: BUENAS PRÁCTICAS AL CONSTRUIR UNA HOJA DE ESTILOS. Un archivo externo, nombres de clase descriptivos, reglas agrupadas por sección, comentarios breves y sin estilos en línea.
9. **Inspeccionar estilos.** Contenido: INSPECCIONANDO ESTILOS CON LAS HERRAMIENTAS PARA DESARROLLADORES EN EL NAVEGADOR. F12 o clic derecho → Inspeccionar: muestra qué reglas se aplican a cada elemento, cuáles quedan anuladas y permite probar cambios en vivo.
10. **Responsividad y mobile first.** Contenido: EL CONCEPTO DE RESPONSIVIDAD TIPOS DE DISPOSITIVOS Y ORIENTACIONES · EL CONCEPTO MOBILE FIRST. Un sitio responsivo se adapta a celulares, tablets y computadores, en vertical u horizontal. Mobile first: diseñar primero para la pantalla chica y ampliar después.
11. **Media queries y pruebas.** Contenido: UTILIZACIÓN DE MEDIA QUERY · ¿CÓMO PROBAR LOS DISTINTOS DISPOSITIVOS?. @media (min-width: 768px) { … } aplica reglas desde ese ancho, junto con <meta name="viewport" content="width=device-width, initial-scale=1">. Prueba con el modo de dispositivos del navegador (Ctrl + Shift + M) y en un celular real.

**Lo que demostrarás:**
- 3.1 RECONOCE LOS PRINCIPIOS Y USOS DE LAS HOJAS DE ESTILO CSS PARA EL MANEJO DE LOS ASPECTOS VISUALES BÁSICOS DE UN DOCUMENTO HTML.
- 3.2 UTILIZA RUTAS ABSOLUTAS Y RELATIVAS PARA EL MANEJO DE ASSETS E IMÁGENES EN LA INCORPORACIÓN DE HOJAS DE ESTILO AL DOCUMENTO HTML.
- 3.3 CODIFICA UN DOCUMENTO HTML UTILIZANDO LA SINTAXIS Y REGLAS DE ESTILOS CSS PARA MODIFICAR ASPECTOS VISUALES Y RESOLVER UN PROBLEMA PLANTEADO ACORDE A LAS BUENAS PRÁCTICAS DE LA INDUSTRIA.
- 3.4 IDENTIFICA LOS CONCEPTOS CLAVES DE LA RESPONSIVIDAD DE UN RECONOCIENDO LOS MECANISMOS PARA IMPLEMENTARLA EN UN DOCUMENTO HTML.
- 3.5 UTILIZA LAS HERRAMIENTAS PARA DESARROLLADORES PROVISTA POR EL NAVEGADOR PARA LA INSPECCIÓN DE LOS ESTILOS APLICADOS EN EL DOCUMENTO.

## Aprendizaje esperado 4 · EL FRAMEWORK BOOTSTRAP

Módulo 2 · FUNDAMENTOS DE DESARROLLO FRONT-END. Sitios responsivos con piezas listas.

**Aprendizaje esperado 4:** IMPLEMENTAR UN SITIO WEB BÁSICO RESPONSIVO UTILIZANDO FRAMEWORK BOOTSTRAP PARA ORGANIZAR LA PRESENTACIÓN DE UN DOCUMENTO HTML.

1. **Qué es Bootstrap.** Contenido: ¿QUÉ ES BOOTSTRAP?. Un framework de código abierto con clases de CSS y componentes de JavaScript listos para construir sitios responsivos sin escribir todo el CSS desde cero.
2. **Beneficios.** Contenido: BENEFICIOS DE SU UTILIZACIÓN. Ahorra tiempo, es responsivo por defecto (mobile first), da un aspecto coherente, funciona en los navegadores modernos y tiene amplia documentación y comunidad.
3. **Cómo incorporarlo.** Contenido: ¿DÓNDE OBTENERLO Y CÓMO INCORPORARLO A UN PROYECTO HTML?. Desde getbootstrap.com: descarga los archivos o usa el CDN, con un <link> al CSS dentro de <head> y un <script> al JavaScript antes de </body>.
4. **Containers y grilla.** Contenido: CONTAINERS · GRILLAS. .container centra el contenido y limita su ancho. La grilla usa .row y columnas de 12 partes: .col-12 .col-md-6 ocupa todo el ancho en el celular y la mitad desde una tablet.
5. **Tablas e imágenes.** Contenido: TABLAS · IMÁGENES. .table, .table-striped y .table-responsive dan formato a las tablas; .img-fluid ajusta la imagen al ancho de su contenedor.
6. **Jumbotron, alertas y botones.** Contenido: JUMBOTRON · ALERTAS · BOTONES. Jumbotron: un bloque destacado de portada (en Bootstrap 5 se arma con utilidades como .p-5 .bg-light .rounded). Alertas: .alert .alert-success. Botones: .btn .btn-primary.
7. **Navbars.** Contenido: NAVBARS. .navbar .navbar-expand-lg: un menú de navegación que en pantallas chicas se contrae en un botón con tres líneas.
8. **Forms.** Contenido: FORMS. .form-label para las etiquetas, .form-control para los campos y .form-check para las casillas: formularios ordenados y adaptables.

**Lo que demostrarás:**
- 4.1 DESCRIBE LAS CARACTERÍSTICAS Y BENEFICIOS DE UTILIZACIÓN DEL FRAMEWORK BOOTSTRAP PARA EL MANEJO DE ESTILOS EN UNA PÁGINA WEB.
- 4.2 RECONOCE LOS ELEMENTOS Y ESTILOS PRINCIPALES DE BOOTSTRAP PARA EL MANEJO DE ESTILOS EN UNA PÁGINA WEB.
- 4.3 UTILIZA ESTILOS DISPONIBLES EN EL FRAMEWORK BOOTSTRAP PARA ORGANIZAR LOS ELEMENTOS VISUALES EN UN DOCUMENTO HTML Y RESOLVER EL PROBLEMA PLANTEADO.
