# Guía: las lecturas del módulo 2 en Rise 360

Rise reemplaza al flipbook del estándar de la contraparte (DECISIONS, 2026-09-27). La base son los PDF
de lectura que ya existen: uno por aprendizaje esperado (AE1 a AE4), y el cuadernillo de lecturas con
la marca de cada cliente.

**Qué armar:** un curso de Rise por cliente y curso (UNAB PF1821, Skillnest PF1821, UNAB PF1822,
Skillnest PF1822 y U. Autónoma PF1822). Se arma uno completo y los demás se duplican y se les cambia el
tema.

## Estructura del curso

| Parte de Rise | Contenido | De dónde sale |
| --- | --- | --- |
| Título del curso | "Módulo 2 · Material de lectura" | — |
| Sección (encabezado) | Lectura AE1 · título de la lectura (una sección por aprendizaje) | Portada de cada lectura |
| Lección 1 de la sección | Aprendizaje esperado y criterios, **textuales del plan** | Página "Qué vas a lograr" |
| Lecciones siguientes | Una por cada tema numerado de la lectura, con el mismo rótulo del plan | Secciones 1, 2, 3… |
| Lección "Para practicar" | En síntesis y actividades para practicar | Cierre de la lectura |
| Lección "Autocomprobación" | Las 3 preguntas como bloques de Knowledge Check | Autocomprobación con sus respuestas |
| Sección final "Glosario" | Los 31 términos, en bloques Accordion o Flashcards | `M2-Glosario.csv` |
| Lección final "Descargas" | Bloque Attachment con el cuadernillo de lecturas en PDF | `PF18xx-M2-Lecturas.pdf` del zip del cliente |

Los rótulos con los contenidos del plan van tal cual, en mayúsculas: es lo que el evaluador compara con
la ficha.

## Camino A · Con AI Assistant (si la licencia de Articulate 360 lo incluye)

1. En Rise 360, crea un curso nuevo y elige crearlo con AI Assistant.
2. Describe el curso ("material de lectura del módulo 2 de <curso>, para participantes de un bootcamp")
   y sube como fuente los 4 PDF de lectura (`M2-AE1-Lectura.pdf` a `M2-AE4-Lectura.pdf`).
3. Genera los datos del curso y revisa tema, tono, público y objetivos: pega como objetivos los 4
   aprendizajes esperados, textuales.
4. Genera el esquema y ajústalo a la tabla de arriba: una sección por lectura y una lección por tema.
5. Genera las lecciones con la opción de texto y contenido interactivo.
6. **Revisa cada lección contra el PDF.** El asistente resume y reescribe. Hay que devolver a su forma
   textual el aprendizaje esperado, los criterios y los rótulos del plan, y comprobar que no falte
   ningún contenido. El asistente solo lee el texto de los PDF: los diagramas y los recuadros llegan
   como texto plano. Para cotejar, usa
   [`entregables/2026-09-30-texto-canonico-modulo2/`](../entregables/2026-09-30-texto-canonico-modulo2/):
   una pestaña por aprendizaje donde pegas lo que dice Rise y te marca si coincide con el plan.

## Camino B · A mano (siempre funciona)

1. Crea un curso en blanco en Rise 360.
2. Agrega una sección por lectura y, dentro, las lecciones de la tabla.
3. En cada lección, copia el texto de la sección desde el PDF. Usa:
   - un bloque de texto por párrafo;
   - un bloque Quote o Note para los recuadros "Ejemplo", "Error frecuente" e "Idea clave";
   - un bloque de código para los fragmentos de código de PF1822 y las expresiones de n8n de PF1821;
   - un bloque de tabla para las tablas.
4. Autocomprobación: un bloque Knowledge Check por pregunta, con la respuesta de la lectura como
   retroalimentación.
5. Glosario: un bloque Accordion con los términos. Se copian desde `M2-Glosario.csv`.

## Marca del cliente (menú Theme)

1. **Logo:** súbelo en Theme → Logo. Usa el `logo.png` de `privado/marcas/<cliente>/`.
2. **Color:** Theme → Colors, con el color principal de la marca:

   | Cliente | Color principal | Color de acento |
   | --- | --- | --- |
   | UNAB | `#051C2C` | `#AA182C` |
   | Skillnest | `#1E1E2A` | `#00ADE5` |
   | U. Autónoma | `#3D3935` | `#DA291C` |

3. **Imagen de portada:** la portada del cuadernillo de lecturas del cliente sirve de referencia.
4. Para el siguiente cliente, duplica el curso y cambia solo el tema.

## Publicar en Moodle

1. En Rise: **Publish → LMS**, estándar **SCORM 1.2**. Descarga el zip.
2. En Moodle: **Agregar actividad → Paquete SCORM**, sube el zip y fija la finalización (vista o
   completado).
3. Si el LMS pide el archivo de inicio, es `indexapi.html`.
4. Para mostrarlo sin LMS, por ejemplo a la contraparte, usa **Publish → Web** o comparte la revisión
   en Review 360.

Fuentes (Articulate): [cursos con AI Assistant](https://community.articulate.com/kb/ai-assistant-tutorials/create-course-drafts-with-ai-assistant-in-rise-360/1239288),
[documentos fuente del AI Assistant](https://community.articulate.com/kb/ai-assistant-tutorials/manage-ai-assistant-course-settings-and-source-documents-in-rise-360/1210685),
[tema](https://community.articulate.com/kb/user-guides/rise-360-personalize-the-theme/1141061) y
[publicar en un LMS](https://community.articulate.com/articles/rise-360-share-content-with-learners).
