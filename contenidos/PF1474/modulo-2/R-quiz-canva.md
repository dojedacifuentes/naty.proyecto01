# PF1474 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** un quiz por aprendizaje esperado del módulo 2 (Quiz n = AEn), con los criterios de evaluación del plan formativo 2026. El módulo 2 (Fundamentos de desarrollo front-end) es el mismo en los cuatro planes Entry level (PF1474 Front-End, PF1477 Full Stack Java, PF1478 Full Stack JavaScript y PF1479 Fullstack Python Trainee): este archivo sirve a los cuatro y reemplaza los quiz de Genially de 2024.
**Reparto:** Quiz 1: AE1 · Quiz 2: AE2 · Quiz 3: AE3 · Quiz 4: AE4 · Quiz 5: AE5 · Quiz 6: AE6 · Quiz 7: AE7 (uno por AE). Cinco preguntas cada uno, con una sola respuesta correcta y retroalimentación.
**Son formativos:** no llevan nota.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.
**Versión juego** (HTML y SCORM para el LMS, `npm run quiz-juego`): las mismas preguntas como una misión de 5 niveles con XP, combos, energía, comodín 50:50, estrellas, logros e insignia.
**Misión:** ayudar como desarrollador/a front-end a Todo Ventas en Línea, un emprendimiento de jóvenes que hoy toma sus pedidos por teléfono y correo, a tener su propio sitio web.

---

## Quiz 1 · Desarrollo web y front-end (AE1)

**Cuándo:** al cerrar el aprendizaje 1, después de la lectura sobre desarrollo web y el ejercicio guiado con Visual Studio Code y el inspector del navegador.
**Insignia:** Explorador/a web · **Siguiente parada:** aprendizaje 2, la estructura de una página con HTML5.

1. *(AE1)* El equipo de Todo Ventas en Línea se reparte el trabajo: Ana construirá el catálogo y el formulario que el cliente ve en el navegador, y Diego programará en el servidor cómo se guardan los pedidos en la base de datos. ¿Qué rol cumple cada uno?
   - a) Ana es back-end y Diego es front-end
   - b) Ambos son fullstack, porque trabajan en el mismo sitio
   - **c) Ana es front-end y Diego es back-end**
   - d) Ana es diseñadora gráfica y Diego es front-end
   *Retroalimentación:* "El front-end construye lo que la persona ve y usa en el navegador; el back-end procesa y guarda los datos en el servidor. Quien domina ambas capas trabaja como fullstack."
2. *(AE1)* Al revisar la página de inicio, un compañero dice que el HTML «programa» el carrito de compras. ¿Qué afirmación lo corrige mejor?
   - a) HTML es un lenguaje de programación que calcula los totales
   - **b) HTML es un lenguaje de marcado que estructura el contenido**
   - c) HTML es un lenguaje de estilos que define colores y fuentes
   - d) HTML es un lenguaje de servidor que guarda los pedidos
   *Retroalimentación:* "HTML (lenguaje de marcado de hipertexto) usa etiquetas para indicar qué es cada contenido: un título, un párrafo, una imagen o un enlace. No calcula ni toma decisiones; eso le corresponde a JavaScript."
3. *(AE1)* En un ejemplo antiguo encuentras como primera línea `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">`. ¿Cómo debe empezar la página nueva de la tienda para usar HTML5?
   - a) `<html version="5">`
   - b) `<!DOCTYPE HTML5>`
   - c) `<!DOCTYPE html PUBLIC "HTML5">`
   - **d) `<!DOCTYPE html>`**
   *Retroalimentación:* "HTML5 simplificó la declaración del tipo de documento a `<!DOCTYPE html>`, que le indica al navegador que interprete la página con el estándar actual. Las declaraciones largas con DTD eran propias de HTML 4.01, una versión anterior publicada por el W3C."
4. *(AE1)* La tienda pide mostrar su catálogo, que los botones tengan los colores de su marca y que al apretar «Agregar» suba el contador del carrito. ¿Qué tecnología se encarga de cada parte, en ese orden?
   - **a) HTML, CSS y JavaScript**
   - b) CSS, HTML y JavaScript
   - c) JavaScript, CSS y HTML
   - d) HTML, JavaScript y CSS
   *Retroalimentación:* "HTML define el contenido, CSS la presentación y JavaScript el comportamiento. Mantener separadas estas tres capas hace que el sitio sea más fácil de entender y de mantener."
5. *(AE1)* El título de tu página aparece en rojo y no sabes de qué regla CSS viene ese color. ¿Qué herramienta usas para averiguarlo sin modificar el archivo?
   - a) El Bloc de notas, para leer el archivo línea por línea
   - b) El explorador de archivos, para revisar las carpetas y archivos del proyecto
   - c) Un editor de imágenes, para medir el color del título
   - **d) El inspector de elementos, para ver las reglas aplicadas**
   *Retroalimentación:* "El inspector del navegador muestra el HTML de la página y las reglas CSS que afectan a cada elemento, con el archivo de donde vienen. Junto con un editor como Visual Studio Code, es una herramienta básica del front-end."

---

## Quiz 2 · Estructura con HTML5 (AE2)

**Cuándo:** al cerrar el aprendizaje 2, después de la lectura sobre el lenguaje HTML y el ejercicio de la página para la señora Juanita.
**Insignia:** Arquitecto/a de etiquetas · **Siguiente parada:** aprendizaje 3, los estilos CSS y la responsividad.

1. *(AE2)* En la página de la tienda, los acentos y las eñes se ven como símbolos raros y la pestaña del navegador solo dice «index.html». ¿Qué falta y dónde va?
   - **a) `<meta charset="utf-8">` y `<title>`, dentro de `<head>`**
   - b) `<meta charset="utf-8">` y `<title>`, dentro de `<body>`
   - c) Un `<h1>` con el nombre de la tienda, dentro de `<head>`
   - d) Un `<p>` con el nombre de la tienda, antes de `<html>`
   *Retroalimentación:* "`<head>` reúne la información sobre el documento: la codificación de caracteres, el título de la pestaña, el viewport y los enlaces a hojas de estilo. `<body>` contiene lo que se muestra en la página."
2. *(AE2)* La página de inicio lleva arriba el logo y el menú, al centro los productos destacados, a un costado las ofertas y abajo los datos de contacto. ¿Qué estructura semántica corresponde?
   - a) Un `<div>` para cada parte, con un comentario que la identifique
   - b) `<head>` con `<nav>`, `<section>`, `<aside>` y `<footer>`
   - **c) `<header>` con `<nav>`, `<section>`, `<aside>` y `<footer>`**
   - d) `<header>`, `<table>`, `<aside>`, `<form>` y `<footer>`
   *Retroalimentación:* "Las etiquetas semánticas de HTML5 dicen qué papel cumple cada bloque: `<header>` la cabecera, `<nav>` el menú, `<section>` el contenido, `<aside>` lo complementario y `<footer>` el pie. `<head>` no es la cabecera visible: guarda los metadatos."
3. *(AE2)* El formulario de pedido debe pedir la comuna de despacho desde una lista fija y un solo medio de pago: transferencia o efectivo. ¿Qué combinación usas?
   - a) Un `<input type="text">` para la comuna y dos `checkbox` para el pago
   - b) Un `<select>` para la comuna y dos `checkbox` con el mismo `name`
   - c) Un `<textarea>` para la comuna y un `<select multiple>` para el pago
   - **d) Un `<select>` para la comuna y dos `radio` con el mismo `name`**
   *Retroalimentación:* "`<select>` ofrece una lista cerrada de opciones, y los botones `radio` que comparten `name` dejan elegir una sola alternativa del grupo. Las casillas `checkbox` sirven cuando se puede marcar más de una."
4. *(AE2)* El proyecto tiene `index.html` en la carpeta principal y las fotos en la subcarpeta `img`. Si llevas el proyecto a otro computador, ¿qué atributo sigue mostrando la foto `polera.jpg`?
   - a) `src="C:/tienda/img/polera.jpg"`
   - **b) `src="img/polera.jpg"`**
   - c) `src="/polera.jpg"`
   - d) `src="../img/polera.jpg"`
   *Retroalimentación:* "Una ruta relativa se calcula desde la ubicación del archivo HTML, así que funciona aunque el proyecto cambie de carpeta o de equipo. Con `../` subirías un nivel, fuera del proyecto, y una ruta del disco solo existe en tu computador."
5. *(AE2)* El prototipo tiene `index.html`, `productos.html` y `contacto.html` en la misma carpeta. ¿Cómo enlazas el menú de `index.html` con la página de productos?
   - a) `<link href="productos.html">Productos</link>`
   - b) `<a src="productos.html">Productos</a>`
   - **c) `<a href="productos.html">Productos</a>`**
   - d) `<nav href="productos.html">Productos</nav>`
   *Retroalimentación:* "La etiqueta `<a>` crea hipervínculos y su atributo `href` indica el destino; así se arma un prototipo navegable entre páginas. `<link>` va en `<head>` y sirve para vincular recursos como hojas de estilo."

---

## Quiz 3 · Estilos CSS y responsividad (AE3)

**Cuándo:** al cerrar el aprendizaje 3, después de la lectura sobre hojas de estilo y responsividad y el ejercicio de estilos sobre `estiloscss.html`.
**Insignia:** Estilista CSS · **Siguiente parada:** aprendizaje 4, el framework Bootstrap.

1. *(AE3)* El sitio tiene cinco páginas y en cada una repetiste un bloque `<style>` con los colores de la marca. Luego la tienda cambió su color principal. ¿Qué buena práctica te habría ahorrado trabajo?
   - a) Escribir los estilos con el atributo `style` en cada etiqueta
   - **b) Usar una hoja de estilos externa enlazada desde todas las páginas**
   - c) Poner el bloque `<style>` al final de cada `<body>`
   - d) Dar los colores con etiquetas antiguas como `<font>`
   *Retroalimentación:* "Una hoja externa (`.css`) enlazada con `<link>` separa la presentación del contenido y permite cambiar el diseño de todo el sitio editando un solo archivo. Los estilos repetidos en cada página o en cada etiqueta multiplican el trabajo."
2. *(AE3)* Tu hoja `css/estilos.css` debe usar de fondo la imagen `img/banner.jpg`; las carpetas `css` e `img` están en la raíz del proyecto. ¿Qué escribes en la hoja de estilos?
   - **a) `background-image: url("../img/banner.jpg");`**
   - b) `background-image: url("img/banner.jpg");`
   - c) `background-image: url("css/img/banner.jpg");`
   - d) `background-image: src("../img/banner.jpg");`
   *Retroalimentación:* "Dentro de un archivo CSS, las rutas relativas se calculan desde la ubicación de esa hoja, no desde el HTML. Por eso hay que subir un nivel con `../` para salir de `css` y entrar a `img`."
3. *(AE3)* Tu hoja tiene `#oferta { color: red; }` y, más abajo, `.precio { color: green; }`. El elemento es `<p id="oferta" class="precio">`. ¿De qué color se ve el texto?
   - a) Verde, porque la regla `.precio` está escrita más abajo
   - b) Verde, porque las clases pesan más que los identificadores
   - c) Negro, porque las dos reglas se anulan entre sí
   - **d) Rojo, porque el selector de id pesa más que el de clase**
   *Retroalimentación:* "Cuando dos reglas chocan, gana la de mayor especificidad, y un selector de id pesa más que uno de clase. El orden en la hoja solo decide cuando ambas reglas tienen el mismo peso."
4. *(AE3)* Diseñas con enfoque mobile first: por defecto, los productos se ven en una sola columna. ¿Qué media query usas para pasar a tres columnas en pantallas de escritorio?
   - a) `@media (max-width: 992px) { … }`
   - b) `@media print { … }`
   - **c) `@media (min-width: 992px) { … }`**
   - d) `@media (orientation: portrait) { … }`
   *Retroalimentación:* "Con mobile first, los estilos base son para el celular y las media queries con `min-width` agregan cambios a medida que la pantalla crece. Con `max-width` las tres columnas se aplicarían justo en las pantallas pequeñas."
5. *(AE3)* Un botón se ve más ancho de lo esperado. Abres las herramientas para desarrolladores del navegador y seleccionas el botón. ¿Qué te muestran que te ayuda a resolverlo?
   - **a) Las reglas aplicadas, las que quedaron anuladas y su modelo de caja**
   - b) El historial de cambios que hiciste en el archivo CSS
   - c) Solo el código HTML, sin las reglas de estilo que lo afectan
   - d) La lista de imágenes que descargó la página al cargar
   *Retroalimentación:* "El inspector muestra qué reglas afectan al elemento, en qué archivo están, cuáles quedaron tachadas por otras de más peso y cómo se reparten contenido, relleno, borde y margen. Además permite probar cambios en vivo antes de llevarlos al archivo."

---

## Quiz 4 · Sitio responsivo con Bootstrap (AE4)

**Cuándo:** al cerrar el aprendizaje 4, después de la lectura sobre Bootstrap y el ejercicio de adaptar la página con sus clases y el enfoque mobile first.
**Insignia:** Maestro/a de la grilla · **Siguiente parada:** aprendizaje 5, las bases de JavaScript.

1. *(AE4)* Todo Ventas en Línea quiere su sitio pronto, que se vea bien en celulares y con un estilo coherente, y en el equipo nadie es diseñador. ¿Por qué Bootstrap es una buena opción?
   - a) Porque reemplaza a HTML y evita escribir etiquetas
   - b) Porque programa en el servidor la lógica de los pedidos
   - c) Porque genera solo el contenido y las fotos de la tienda
   - **d) Porque trae una grilla responsiva y componentes ya diseñados**
   *Retroalimentación:* "Bootstrap es un framework de CSS y JavaScript con una grilla responsiva y componentes listos, como barras de navegación, botones, formularios y alertas. Se aplica con clases sobre tu HTML, que sigue siendo necesario."
2. *(AE4)* ¿Cómo incorporas Bootstrap 5 al proyecto de la tienda de forma rápida, sin descargar archivos?
   - a) Copiando sus clases a mano en tu archivo `estilos.css`
   - **b) Enlazando su CSS y su JavaScript desde un CDN en el HTML**
   - c) Instalando una extensión de Bootstrap en el navegador
   - d) Escribiendo `<bootstrap>` al comienzo de `<body>`
   *Retroalimentación:* "Un CDN sirve los archivos de Bootstrap desde internet: basta un `<link>` a su CSS en `<head>` y un `<script>` con su JavaScript antes de cerrar `<body>`. También se puede descargar o instalar con un gestor de paquetes."
3. *(AE4)* En el catálogo quieres un producto por fila en el celular, dos en tablet y cuatro en escritorio. ¿Qué clases das a cada tarjeta dentro de un `.row`?
   - **a) `col-12 col-md-6 col-lg-3`**
   - b) `col-1 col-md-2 col-lg-4`
   - c) `col-lg-12 col-md-6 col-3`
   - d) `row-12 row-md-6 row-lg-3`
   *Retroalimentación:* "La grilla de Bootstrap divide cada fila en 12 columnas: 12 ocupa todo el ancho, 6 la mitad y 3 un cuarto. Los prefijos `md` y `lg` aplican el cambio desde ese tamaño de pantalla hacia arriba."
4. *(AE4)* En el celular, las fotos de los productos se salen del ancho de la pantalla. ¿Qué clase de Bootstrap aplicas a cada `<img>` para que se ajusten solas?
   - a) `img-thumbnail-lg`
   - b) `w-auto`
   - **c) `img-fluid`**
   - d) `container-img`
   *Retroalimentación:* "`img-fluid` aplica `max-width: 100%` y `height: auto`: la imagen nunca supera el ancho de su contenedor y mantiene su proporción. Así reemplazas las reglas responsivas que antes escribías a mano."
5. *(AE4)* El menú de la tienda debe verse completo en escritorio y plegarse en un botón de tipo hamburguesa en el celular. ¿Qué usas?
   - a) Una lista `<ul>` con la clase `table-responsive` en el menú
   - **b) Una `navbar` con `navbar-expand-lg`, `navbar-toggler` y `collapse`**
   - c) Un `<nav>` con la clase `d-none` en todas las pantallas
   - d) Un `<select>` con las páginas de la tienda y un botón para ir
   *Retroalimentación:* "La barra de navegación de Bootstrap se despliega desde el punto de quiebre indicado (`navbar-expand-lg`); bajo ese ancho, el botón `navbar-toggler` muestra u oculta el menú con el componente `collapse`, que usa el JavaScript de Bootstrap."

---

## Quiz 5 · Bases de JavaScript (AE5)

**Cuándo:** al cerrar el aprendizaje 5, después de la lectura sobre JavaScript y el ejercicio guiado con `alert`, la fecha actual y la rutina de cálculo.
**Insignia:** Programador/a de eventos · **Siguiente parada:** aprendizaje 6, la biblioteca jQuery.

1. *(AE5)* Quieres que el archivo `js/app.js` se ejecute en todas las páginas de la tienda. ¿Cuál es la forma correcta de incorporarlo?
   - a) `<link rel="script" href="js/app.js">` dentro de `<head>`
   - b) `<script>js/app.js</script>` antes de cerrar `<body>`
   - **c) `<script src="js/app.js"></script>` antes de cerrar `<body>`**
   - d) `<style src="js/app.js"></style>` dentro de `<head>`
   *Retroalimentación:* "Un archivo JavaScript externo se enlaza con `<script src>`. Ubicarlo al final de `<body>` (o usar el atributo `defer`) asegura que los elementos ya existan cuando el código intente usarlos."
2. *(AE5)* En el formulario hay un `<input id="cantidad" type="number">`. ¿Qué línea guarda en una variable lo que escribió el cliente?
   - **a) `let cantidad = document.getElementById("cantidad").value;`**
   - b) `let cantidad = document.getElementById("#cantidad").value;`
   - c) `let cantidad = document.getElementById("cantidad").innerHTML;`
   - d) `let cantidad = document.getElementsById("cantidad").text;`
   *Retroalimentación:* "`getElementById` recibe el id sin el símbolo `#`, y la propiedad `value` entrega el contenido de un campo de formulario. `innerHTML` sirve para el contenido de elementos como `<p>` o `<div>`, no para un `<input>`."
3. *(AE5)* El total del pedido debe recalcularse apenas el cliente elige otra comuna en un `<select>`, sin apretar ningún botón. ¿Qué evento usas?
   - a) `onclick` en el botón Enviar del formulario
   - **b) `onchange` en el `<select>` de la comuna**
   - c) `onload` en la etiqueta `<body>`
   - d) `onclick` en el título de la página
   *Retroalimentación:* "`onchange` se dispara cuando cambia el valor de un campo, como al elegir otra opción en un `<select>`. `onclick` responde a un clic, por ejemplo en un botón Calcular."
4. *(AE5)* La tienda no cobra despacho en compras desde $30.000 y bajo ese monto cobra $3.500. Escribiste `function despacho(total) { if (total >= 30000) { return 0; } return 3500; }`. ¿Qué devuelven `despacho(30000)` y `despacho(25000)`?
   - a) 3500 y 0
   - b) 0 y 0
   - c) 3500 y 3500
   - **d) 0 y 3500**
   *Retroalimentación:* "Con `>=`, el monto exacto de 30000 cumple la condición y la función devuelve 0. Con 25000 la condición es falsa, el `if` no se ejecuta y la función sigue hasta `return 3500`."
5. *(AE5)* Al sumar dos campos numéricos, el botón Calcular muestra 23 en vez de 5. En la consola escribes `typeof valor1` y aparece `"string"`. ¿Qué corriges?
   - **a) Convertir los valores con `Number()` antes de sumarlos**
   - b) Cambiar `let` por `const` en las dos variables
   - c) Reemplazar el signo `+` por `&` en la suma
   - d) Mover el `<script>` al `<head>` del documento
   *Retroalimentación:* "La propiedad `value` siempre entrega texto, y `+` entre textos concatena: `'2' + '3'` da `'23'`. La consola permite revisar tipos y valores mientras depuras; con `Number()` o `parseInt()` obtienes números antes de operar."

---

## Quiz 6 · jQuery y plugins (AE6)

**Cuándo:** al cerrar el aprendizaje 6, después de la lectura sobre jQuery y el ejercicio de contacto con los eventos hover y clic y el plugin Fancybox.
**Insignia:** Animador/a del DOM · **Siguiente parada:** aprendizaje 7, Git y GitHub.

1. *(AE6)* Un compañero pregunta para qué sumar jQuery al sitio si el equipo ya sabe JavaScript. ¿Qué respuesta describe mejor el rol de esta biblioteca?
   - a) Reemplaza a JavaScript por otro lenguaje que entiende el navegador
   - **b) Simplifica con funciones listas el trabajo con el DOM y los eventos**
   - c) Se ejecuta en el servidor para guardar los pedidos de la tienda
   - d) Es obligatoria para que una página HTML pueda usar CSS
   *Retroalimentación:* "jQuery es una biblioteca escrita en JavaScript: no es otro lenguaje, sino un conjunto de funciones listas que acortan tareas comunes con el DOM, los eventos y los efectos. Para usarla se incluye en la página antes del código que la utiliza."
2. *(AE6)* ¿Qué instrucción de jQuery cambia a 3 el número que muestra el `<span id="contador">` del carrito?
   - a) `$(".contador").text(3);`
   - b) `$("contador").value = 3;`
   - c) `$("#contador").html = 3;`
   - **d) `$("#contador").text(3);`**
   *Retroalimentación:* "jQuery selecciona elementos con la misma sintaxis de CSS (`#` para id, `.` para clase) y los modifica con métodos como `.text()`, `.html()` o `.css()`, que reciben el nuevo valor entre paréntesis."
3. *(AE6)* Quieres destacar todas las tarjetas que tienen la clase `oferta` agregándoles la clase CSS `destacada`. ¿Qué escribes?
   - **a) `$(".oferta").addClass("destacada");`**
   - b) `$("#oferta").addClass(".destacada");`
   - c) `$(".oferta").class("destacada");`
   - d) `$("oferta").css("destacada");`
   *Retroalimentación:* "El selector `.oferta` toma todos los elementos con esa clase y `addClass()` les agrega otra, escrita sin el punto. Así los colores quedan en la hoja de estilos y jQuery solo cambia qué clase tiene cada elemento."
4. *(AE6)* En la página de contacto, al hacer clic en el botón `#ver` debe mostrarse el párrafo oculto `#info-despacho`. ¿Qué código lo logra con jQuery?
   - a) `$("#ver").hover(function () { $("#info-despacho").hide(); });`
   - b) `$("#ver").on("change", function () { $("#info-despacho").show(); });`
   - **c) `$("#ver").on("click", function () { $("#info-despacho").show(); });`**
   - d) `$("#info-despacho").on("click", function () { $("#ver").show(); });`
   *Retroalimentación:* "El evento se asocia al elemento que recibe el clic (`#ver`) con `.on("click", …)` o `.click(…)`, y dentro de la función se indica qué hacer con el otro elemento: `.show()` lo muestra y `.hide()` lo oculta."
5. *(AE6)* La tienda quiere que, al apretar «Ver detalle», se abra una ventana emergente con la foto ampliada del producto, sin programarla desde cero. ¿Qué opción es la adecuada?
   - a) Abrir una página nueva con `window.open` para cada producto
   - b) Cargar todas las fotos en un `<iframe>` oculto al final de la página
   - c) Escribir una función propia que dibuje la ventana desde cero
   - **d) Usar el componente modal de Bootstrap o un plugin como Fancybox**
   *Retroalimentación:* "Un plugin entrega un componente ya probado que se activa con pocas líneas o atributos, como `data-bs-toggle="modal"` en Bootstrap 5. Para usarlo se incluyen sus archivos CSS y JavaScript y se sigue su documentación."

---

## Quiz 7 · Git y GitHub (AE7)

**Cuándo:** al cerrar el aprendizaje 7, después de la lectura sobre Git y GitHub y el ejercicio con el repositorio «libro», antes de la actividad final integradora del módulo 2.
**Insignia:** Guardián/a de versiones · **Siguiente parada:** la actividad final integradora del módulo 2.

1. *(AE7)* Las etapas del sitio (HTML, CSS, Bootstrap, JavaScript y jQuery) se guardaron como copias llamadas `tienda-final`, `tienda-final2` y `tienda-final-v3`, y nadie sabe qué cambió ni quién lo hizo. ¿Qué resuelve un sistema de control de versiones como Git?
   - a) Comprime las carpetas para que ocupen menos espacio en el disco
   - b) Publica el sitio en internet cada vez que se guarda un archivo
   - **c) Registra cada cambio con su autor y su mensaje, y permite volver atrás**
   - d) Corrige los errores de sintaxis del código antes de guardarlo
   *Retroalimentación:* "Git guarda una historia de commits: qué cambió, quién lo hizo, cuándo y por qué. Con esa historia se pueden comparar versiones, recuperar una anterior y trabajar en equipo sin pisarse."
2. *(AE7)* En el repositorio `libro` ya hiciste commit de `indice.txt`. Después lo editaste por error y todavía no ejecutas `git add`. ¿Qué comando recupera la versión del último commit?
   - **a) `git restore indice.txt`**
   - b) `git rm indice.txt`
   - c) `git commit --amend`
   - d) `git diff indice.txt`
   *Retroalimentación:* "`git restore` descarta los cambios del directorio de trabajo y deja el archivo como en el último commit (en versiones antiguas de Git se usa `git checkout -- archivo`). `git diff` solo muestra las diferencias y `git rm` elimina el archivo del repositorio."
3. *(AE7)* Trabajaste el carrito en la rama `carrito` y, al unirla desde `main` con `git merge carrito`, Git avisa de un conflicto en `index.html`. ¿Qué haces?
   - a) Borras la rama `carrito` y rehaces el trabajo directamente en `main`
   - b) Ejecutas `git push --force` para que tu versión reemplace a la otra
   - c) Esperas a que Git elija por sí solo la versión más reciente del archivo
   - **d) Editas las zonas que marcó Git y luego haces `git add` y `git commit`**
   *Retroalimentación:* "Git marca el conflicto dentro del archivo con `<<<<<<<`, `=======` y `>>>>>>>`. Tú decides qué código queda, borras las marcas y confirmas la resolución con `git add` y `git commit`."
4. *(AE7)* Vas a subir tus cambios a GitHub, pero `git push` es rechazado porque una compañera subió commits antes que tú. ¿Qué haces primero?
   - a) `git push --force`, para reemplazar lo que hay en GitHub
   - **b) `git pull`, para traer e integrar sus cambios, y luego `git push`**
   - c) `git clone` del repositorio dentro de la carpeta del proyecto
   - d) `git fetch` y luego `git push`, sin integrar sus cambios
   *Retroalimentación:* "El rechazo indica que el remoto tiene commits que tú no tienes. `git pull` los trae y los integra (equivale a `fetch` más `merge`); si aparece un conflicto se resuelve, y después `git push` sube todo sin borrar el trabajo de nadie."
5. *(AE7)* En el equipo, cada integrante trabaja en su propia rama y nadie sube cambios directo a `main`. ¿Cómo propones integrar tu formulario de pedidos?
   - **a) Abriendo un pull request en GitHub para que el equipo lo revise**
   - b) Enviando los archivos por correo a quien administra el repositorio
   - c) Copiando tu carpeta del proyecto sobre la de una compañera
   - d) Haciendo `git commit` directamente en la rama `main` de GitHub
   *Retroalimentación:* "Un pull request propone unir una rama con otra: muestra las diferencias, permite comentar y revisar, y quien administra el repositorio lo aprueba y fusiona. Es la forma habitual de trabajar en equipo sobre un repositorio remoto."

---

## Cobertura de criterios

- Quiz 1 (AE1): criterio 1.1 (desarrollo web: front-end, back-end y fullstack) → pregunta 1; criterio 1.2 (características del lenguaje HTML) → preguntas 2 y 3; criterio 1.3 (rol de HTML, CSS y JavaScript) → pregunta 4; criterio 1.4 (herramientas del desarrollo front-end) → pregunta 5.
- Quiz 2 (AE2): criterio 2.1 (estructura básica del documento HTML) → pregunta 1; criterio 2.2 (etiquetas de estructura del cuerpo) → pregunta 2; criterio 2.3 (formulario de captura de datos) → pregunta 3; criterio 2.4 (assets y rutas relativas) → pregunta 4; criterio 2.5 (prototipo de contenido navegable) → pregunta 5.
- Quiz 3 (AE3): criterio 3.1 (principios y usos de las hojas de estilo) → pregunta 1; criterio 3.2 (rutas absolutas y relativas para assets e imágenes) → pregunta 2; criterio 3.3 (sintaxis y reglas CSS, buenas prácticas) → preguntas 1 y 3; criterio 3.4 (responsividad y media queries) → pregunta 4; criterio 3.5 (herramientas para desarrolladores del navegador) → pregunta 5.
- Quiz 4 (AE4): criterio 4.1 (características y beneficios de Bootstrap) → preguntas 1 y 2; criterio 4.2 (elementos y estilos principales de Bootstrap) → preguntas 3 y 4; criterio 4.3 (estilos de Bootstrap para organizar la página) → preguntas 3, 4 y 5.
- Quiz 5 (AE5): criterio 5.1 (rol de JavaScript e incorporación al HTML) → pregunta 1; criterio 5.2 (selectores y obtención de valores del DOM) → pregunta 2; criterio 5.3 (eventos onclick y onchange) → pregunta 3; criterio 5.4 (variables, expresiones aritméticas y condicionales) → preguntas 4 y 5; criterio 5.5 (funciones) → pregunta 4; criterio 5.6 (depuración con la consola) → pregunta 5.
- Quiz 6 (AE6): criterio 6.1 (rol de una biblioteca JavaScript) → pregunta 1; criterio 6.2 (selección y manipulación del DOM con jQuery) → preguntas 2 y 3; criterio 6.3 (manejo de eventos con jQuery) → pregunta 4; criterio 6.4 (plugins Bootstrap-jQuery) → pregunta 5.
- Quiz 7 (AE7): criterio 7.1 (rol del control de versiones) → pregunta 1; criterio 7.2 (repositorio local, commits y restauración) → pregunta 2; criterio 7.3 (ramas, uniones y conflictos) → pregunta 3; criterio 7.4 (repositorios locales y remotos, sincronización) → pregunta 4; criterio 7.5 (pull requests y trabajo colectivo) → pregunta 5.
