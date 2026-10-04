# PF1477 · Módulo 2 · Actividad final integradora

**Estado:** borrador · **Va en:** LMS · **Pedido:** usuario, 2026-10-02 («haz los recursos que falten»)
El módulo 2 de Entry level (Fundamentos de desarrollo front-end) es el mismo en PF1474, PF1477, PF1478 y PF1479 y no tenía
actividad final. Esta fuente sirve a los cuatro: `npm run evaluacion -- PF1474 PF1477 PF1478 PF1479` la revisa y genera un PDF
por curso. Los ABP y ABPRO son los de 2024 (sin R-abp-abpro.md). Esta cabecera no sale en el PDF.

---

## 03 · Actividad final integradora: El sitio web de Café Ruka
- **Archivo:** M2-03-Actividad-final-integradora
- **Rótulo:** Evaluación y cierre del módulo · cierre
- **Momento:** Al cierre del módulo, después de las actividades de todos sus contenidos
- **Modalidad:** Individual, con entrega en el LMS
- **Calificación:** Pauta de 30 puntos por componentes de la competencia, exigencia 60 %
- **Competencia del módulo:** {{competencia}}

### Contexto

Café Ruka (empresa ficticia) es una cafetería y librería de barrio en Temuco. Hoy solo tiene una página en una red social: los clientes preguntan por mensaje la carta, los precios y si hay mesa, y la dueña responde uno por uno. Quiere un sitio web propio, simple y que se vea bien en el celular, donde los clientes revisen la carta, reserven una mesa y encuentren cómo llegar.

Te contrata como desarrollador/a front-end. Estos son sus requerimientos (ficticios):

| Página o sección | Qué necesita |
| --- | --- |
| Inicio | Un encabezado con el nombre y el logo, un menú de navegación, una portada destacada con un botón «Reserva tu mesa» y un pie con dirección y redes sociales |
| Carta | Una tabla con las tres categorías (cafés, pasteles y menú del día), con nombre, descripción y precio de cada producto |
| Reservas | Un formulario con nombre, correo, fecha, hora, cantidad de personas (de 1 a 8), tipo de mesa (interior o terraza) y un botón para enviar |
| Galería | Fotos del local que se pueden recorrer una a una |
| Contacto | Dirección, horario, un mapa o imagen de ubicación y un enlace para escribir por correo |

Reglas del negocio para las reservas: los grupos de más de 6 personas solo pueden reservar en terraza; las reservas para el mismo día deben hacerse antes de las 18:00; cada persona deja un abono de $2.000 que se descuenta de su consumo.

### El desafío

Construye el sitio de Café Ruka desde cero, con HTML, CSS y JavaScript, y deja su código en un repositorio de GitHub que otra persona del equipo pueda clonar, revisar y continuar. Puedes reutilizar lo que hiciste en las actividades del módulo, pero el sitio es tuyo: indica en el informe qué reutilizaste.

### Qué tienes que entregar

Sube a la Tarea del LMS dos cosas: el enlace a tu repositorio público de GitHub y un informe en PDF de 3 a 5 páginas, `informe-cafe-ruka.pdf`, con capturas de pantalla. El sitio y el informe deben cubrir estas cinco partes:

1. **El proyecto en el mundo del desarrollo web.** En el informe, explica qué parte del sitio de Café Ruka es front-end y qué necesitaría un back-end o un perfil fullstack para guardar de verdad las reservas, y qué hace el navegador con tus archivos. Incluye también estos temas del módulo, aplicados a tu proyecto:
   - {{c:¿QUÉ ES LA W3C?}}
   - {{c:EL ENTORNO DE DESARROLLO}}
   - {{c:UTILIZAR EL POTENCIAL}}
   - {{c:CONOCIENDO EL INSPECTOR}}

   Agrega capturas de tu editor con el proyecto abierto y del inspector de elementos mostrando una etiqueta de tu sitio.
2. **La estructura en HTML5.** Las cinco páginas o secciones con la estructura básica completa (doctype, `html`, `head` con `meta` y `title`, `body`) y las etiquetas semánticas `header`, `nav`, `section`, `aside` y `footer`. Usa encabezados en orden, enlaces entre páginas, imágenes con texto alternativo, listas, la tabla de la carta y el formulario de reservas con los campos pedidos. Todos los archivos se enlazan con rutas relativas desde carpetas ordenadas (`css/`, `js/`, `img/`).
3. **La presentación con CSS, responsividad y Bootstrap.** Una hoja de estilos externa propia con selectores por etiqueta, clase e id, el modelo de cajas bien usado y una paleta y tipografía coherentes. Incorpora Bootstrap y usa al menos un container con su grilla, la navbar, el jumbotron o portada destacada, botones, alertas, la tabla y el formulario con sus clases. El sitio se diseña pensando primero en el celular (mobile first) y tiene al menos una media query propia. En el informe, muestra el sitio en celular y en computador con el modo de dispositivos del navegador, y explica con el inspector por qué una regla tuya le gana a otra.
4. **El comportamiento con JavaScript y jQuery.** En la página de reservas, con JavaScript: lee los valores del formulario con `getElementById`, calcula el abono según la cantidad de personas cuando esta cambia (`onchange`) y, al presionar el botón (`onclick`), revisa las reglas del negocio con condiciones y muestra un mensaje claro en la página. Organiza el código en funciones. Con jQuery: muestra u oculta las categorías de la carta al hacer clic y agrega un plugin de Bootstrap con jQuery para la galería (por ejemplo, un carrusel o un modal). En el informe, incluye una captura de la consola donde encontraste y corregiste un error.
5. **El código en GitHub.** Un repositorio con un historial de commits pequeños y con mensajes claros, un `.gitignore` y un `README.md` en Markdown que explique el proyecto y cómo verlo. Trabaja la página de reservas en una rama propia, únela a la rama principal resolviendo al menos un conflicto, y deja una etiqueta (tag) `v1.0`. Sube todo al repositorio remoto y abre un pull request desde una rama de mejoras, con una descripción de los cambios. En el informe, muestra el historial de ramas y el pull request.

Trabaja solo con los datos ficticios del caso. Las fotos pueden ser propias o de bancos de imágenes libres, citando su origen en el README.

### Pauta de evaluación

Cada fila se asigna completa si se cumple, a la mitad si se cumple en parte y en cero si no está.

| Componente de la competencia | Qué se revisa | Puntos |
| --- | --- | :-: |
| **Desarrollo web y entorno de trabajo** | *Parte 1* | **4** |
| | Diferencia entre front-end, back-end y fullstack aplicada al caso, y rol del navegador | 2 |
| | W3C, evolución a HTML5, la triada, el editor y el inspector explicados con capturas propias | 2 |
| **Páginas web básicas en HTML** | *Parte 2* | **6** |
| | Estructura básica completa y etiquetas semánticas en todas las páginas | 2 |
| | Encabezados, enlaces, imágenes con texto alternativo, listas y tabla de la carta correctos | 2 |
| | Formulario de reservas completo y rutas relativas a carpetas ordenadas | 2 |
| **Páginas responsivas con CSS y Bootstrap** | *Parte 3* | **8** |
| | Hoja de estilos externa con selectores variados, modelo de cajas y estilo coherente | 3 |
| | Componentes de Bootstrap pedidos usados para organizar el sitio | 2 |
| | Diseño mobile first con media query propia, probado en celular y computador | 2 |
| | Explicación con el inspector de qué regla se aplica y por qué | 1 |
| **Interacción con JavaScript** | *Parte 4* | **7** |
| | Lectura de valores, cálculo del abono con `onchange` y validación de las reglas con `onclick` | 3 |
| | Código organizado en funciones y error depurado en la consola | 2 |
| | Categorías con jQuery y plugin de Bootstrap con jQuery funcionando | 2 |
| **Buenas prácticas de la industria** | *Parte 5* | **5** |
| | Commits claros, `.gitignore` y README en Markdown | 2 |
| | Rama, unión con conflicto resuelto y tag `v1.0` | 2 |
| | Repositorio remoto actualizado y pull request con descripción | 1 |
| | **Total** | **30** |

**Nota** (exigencia 60 %): si el puntaje *p* es mayor o igual que 18, nota = 4,0 + 3 × (*p* − 18) / 12; si es menor, nota = 1,0 + 3 × *p* / 18. Se redondea a un decimal. Por ejemplo: 12 puntos, 3,0; 18 puntos, 4,0; 24 puntos, 5,5; 30 puntos, 7,0.
