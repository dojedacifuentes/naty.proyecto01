# Guía: las lecturas del módulo 2 en Rise 360

Rise reemplaza al flipbook del estándar de la contraparte (DECISIONS, 2026-09-27). La base son los PDF
de lectura que ya existen: uno por aprendizaje esperado (AE1 a AE4), y el cuadernillo de lecturas con
la marca de cada cliente.

**Qué armar:** un curso base de Rise por aprendizaje esperado (8: PF1821 y PF1822, AE1 a AE4), sin marca. Se corrige
una sola vez contra el plan y después se duplica por cliente: PF1821 para UNAB y Skillnest, PF1822 para UNAB, Skillnest y
U. Autónoma (20 copias), cada una con la marca de Articulate de su cliente. Los 8 base y las 20 copias están hechos (2026-09-30);
ids, carpetas y marcas en `REVISION-RISE.md`.

## Estructura del curso

| Parte de Rise | Contenido | De dónde sale |
| --- | --- | --- |
| Título del curso | `<NOMBRE DEL PLAN> · MÓDULO 2 · AE<n>` (Rise admite 100 caracteres) | `modulo-2/<curso>/rise/ficha-AE<n>.md` |
| Descripción de la portada | Módulo 2 con su nombre, competencia del módulo y aprendizaje esperado, textuales | Misma ficha |
| Primera lección | "Ficha del módulo": curso, competencias, módulo, aprendizaje, criterios y contenidos, textuales, en un bloque "Paragraph" sin encabezado | Misma ficha |
| Sección (encabezado) | Lectura AE1 · título de la lectura (una sección por aprendizaje) | Portada de cada lectura |
| Lección 1 de la sección | Aprendizaje esperado y criterios, **textuales del plan** | Página "Qué vas a lograr" |
| Lecciones siguientes | Una por cada tema numerado de la lectura, con el mismo rótulo del plan | Secciones 1, 2, 3… |
| Lección "Para practicar" | En síntesis y actividades para practicar | Cierre de la lectura |
| Lección "Autocomprobación" | Las 3 preguntas como bloques de Knowledge Check | Autocomprobación con sus respuestas |
| Sección final "Glosario" | Los 31 términos, en bloques Accordion o Flashcards | `M2-Glosario.csv` |
| Lección final "Descargas" | Bloque Attachment con el cuadernillo de lecturas en PDF | `PF18xx-M2-Lecturas.pdf` del zip del cliente |

Los rótulos con los contenidos del plan van tal cual, en mayúsculas: es lo que el evaluador compara con
la ficha.

**El curso se escribe para el estudiante** (usuario, 2026-09-30). No hay alusiones al plan formativo, a SIPFOR ni a lo "oficial":
nada de "criterios oficiales", "textos oficiales", "lectura oficial", "alineado con el plan formativo" ni "se conserva de manera
literal". El aprendizaje esperado, los criterios y los contenidos sí van exactos, sin decir que lo son. "Documentación oficial" de
OpenAI, Hugging Face o n8n sí se usa: es parte del aprendizaje esperado 2 de PF1822. Lo que se corrigió en las 20 copias está en
`REVISION-RISE.md`.

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

## Marca del cliente (Theme → Apply a brand)

Decisión del usuario (2026-09-30): cada copia lleva **solo la marca ya creada en Articulate** (Settings → Brands), sin logo y
sin cambiar sus fuentes. Los cursos base no llevan marca: son la matriz que se duplica.

0. Duplica el curso base desde la biblioteca (⋯ → Duplicate). Borra el "Copy of" del nombre y muévelo (⋯ → Move) a la carpeta
   del cliente: UNAB, Skillnest o U Autónoma.
1. En la copia: Theme → Apply a brand → Brand, y elige la del cliente. Después pulsa Save.
2. Revisa en Theme → Colors que el color del tema sea el principal de la marca:

   | Marca en Articulate | Color principal | Fuentes (se dejan como vienen) |
   | --- | --- | --- |
   | UNAB | `#A6192E` | Montserrat + Merriweather |
   | U Autónoma | `#DA291C` | Be Vietnam + Lora |
   | Skillnest | `#0C8DC9` | Lato + Merriweather |

   Los colores de Skillnest salen del CSS de skillnest.com, no de un manual del cliente (pregunta abierta #19).
3. En Settings (engranaje) → Labels, elige el juego integrado **Spanish**, para que los botones y mensajes de Rise salgan en
   español ("COMENZAR CURSO", "Inicio"). Se guarda solo. Revísalo en cada copia: los cursos que genera Rise pueden venir en
   "English".
4. No se crean ni editan marcas y no se suben logos. Una marca cruzada entre clientes que compiten es el error más caro:
   revisa cada copia.

**Antes de duplicar**, el curso base debe calzar con el plan: título, descripción de portada y lección "Ficha del módulo"
textuales (fichas en `modulo-2/<curso>/rise/`, revisión en `REVISION-RISE.md`).

## Publicar en Moodle

Los 20 SCORM ya están exportados (2026-09-30). Están en Drive, en la carpeta "3 Lecturas Rise (SCORM)" de cada cliente, y en la
planilla, en Resumen, columnas G a J. Detalle en `REVISION-RISE.md`. Si se corrige una copia, hay que volver a exportarla y
reemplazar su zip en Drive como nueva versión, para que el enlace no cambie.

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
