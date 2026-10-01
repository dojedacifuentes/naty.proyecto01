# Revisión y corrección de los 8 cursos base de Rise 360 · módulo 2

Sesión `2026-09-30-claude-code-09`. Pedido del usuario, transmitido por la sesión "Branding de Skillnest para Rise" y
confirmado por el usuario en esta sesión: corregir los cursos base de Rise para que calcen exacto con el nombre del curso,
el módulo, la competencia del módulo y el aprendizaje esperado, antes de duplicarlos por cliente.

**Referencia:** el texto de SIPFOR, verificado contra el PDF oficial (`npm run canonico`). Las fichas de cada curso, con el
título, la descripción y la lección "Ficha del módulo" textuales, están en `modulo-2/PF1821-agentes-low-code/rise/` y
`modulo-2/PF1822-desarrollo-con-ia/rise/`. Por qué importa: el oferente debe "dar cumplimiento e implementar los aprendizajes
esperados, criterios de evaluación, contenidos" del plan (bases 2026, 4, pág. 18), y modificarlos sin autorización es
infracción (bases 2026, 13.3.2 h), pág. 51).

## Qué se encontró (antes de corregir)

Se leyó cada lección de los 8 cursos (bloque por bloque, en el editor de Rise) y se buscó el texto del plan, letra por letra.

| Curso de Rise | Aprendizaje esperado | Criterios | Rótulos de contenidos del plan |
| --- | --- | --- | --- |
| PF1821 AE1 | **Mal:** "Qué vas a lograr" ponía como aprendizaje el título de la unidad ("CONCEPTOS FUNDAMENTALES…") | Exactos | 4 de 8 faltan o en minúsculas |
| PF1821 AE2 | En minúsculas | En minúsculas; además un acordeón los parafraseaba ("2.1: Uso de la interfaz visual de n8n") | Casi todos faltan |
| PF1821 AE3 | Exacto | Exactos | Varios en minúsculas |
| PF1821 AE4 | Exacto | Exactos | Falta "LOGS Y TRAZABILIDAD." |
| PF1822 AE1 | Exacto | Exactos | Faltan todos |
| PF1822 AE2 | **Falta** (no tiene lección "Qué vas a lograr") | Falta el 2.1; el 2.3 en minúsculas | Casi todos faltan |
| PF1822 AE3 | **Parafraseado** ("Formular prompts efectivos para interactuar con modelos generativos.") | **Parafraseados** en infinitivo, con palabras cambiadas ("diferenciando", "en función de") | Faltan todos |
| PF1822 AE4 | En minúsculas (tarjetas) | En minúsculas (tarjetas) | Faltan todos |

Los títulos de los cursos eran de Rise ("PF1821 · Módulo 2 · AE1 · ¿Qué conviene automatizar?") y la descripción de la portada,
un texto promocional sin el módulo, la competencia ni el aprendizaje.

## Qué se corrigió (verificado recargando la página)

En los 8 cursos:

1. **Título:** `<nombre del plan> · MÓDULO 2 · AE<n>`, formato confirmado por el usuario. Rise admite 100 caracteres en el
   título; el formato "curso · módulo: nombre del módulo · aprendizaje esperado" medía 146 y no cabía.
2. **Descripción de la portada:** módulo 2 con su nombre, competencia del módulo y aprendizaje esperado, textuales.
3. **Lección "Ficha del módulo", la primera del curso:** curso, competencia del plan, módulo (número, código, nombre y
   horas), competencia del módulo, aprendizaje esperado, criterios y contenidos, textuales. Se comparó párrafo por
   párrafo contra la ficha: todos iguales.

Y en las lecciones de introducción:

- PF1821 AE1: el aprendizaje esperado de "Qué vas a lograr" ahora es el del plan.
- PF1821 AE2: aprendizaje y criterios de "Qué vas a lograr" en su forma textual; los títulos del acordeón que los
  parafraseaban ahora son los criterios textuales ("2.1 UTILIZA LA INTERFAZ VISUAL DE N8N PARA CREAR WORKFLOWS BÁSICOS.").
- PF1822 AE3: la lista de "Introducción y Criterios de Evaluación" ahora dice "Aprendizaje esperado 3: …" y "Criterio 3.n: …",
  textuales.
- PF1822 AE4: el reverso de las tarjetas de aprendizaje y criterios, textual.

**No se tocó:** el tema ni la marca (los cursos base quedan como matriz), las lecciones de contenido, los quiz, ni los rótulos
de contenidos dentro de cada lección (todos están textuales en la "Ficha del módulo"). No se publicó, compartió ni exportó nada.

## Cuidado al editar Rise

- **El editor convierte `*texto*` en cursiva y borra los asteriscos** cuando se pega texto. En PF1822 AE1 dos contenidos del plan
  traen dos viñetas en la misma línea ("*CONCEPTOS GENERALES… SIRVE. *DIFERENCIAS…"), y al pegarlos se perdieron los asteriscos.
  Se corrigió escribiendo el contenido con el comando `setContent` del editor (el elemento editable expone `.editor`, que es
  Tiptap), que no aplica esa regla. Quien pegue a mano debe revisar esas dos líneas.
- Las lecciones se dibujan solo con la ventana de Chrome visible y cargan los bloques al hacer scroll.
- Las tarjetas (Flashcards) y los títulos de acordeón no se editan en línea: tarjetas desde el botón "Content" del bloque;
  acordeón, en el campo del título.

## Los 8 cursos base

| Curso | id de Rise | Título |
| --- | --- | --- |
| PF1821 AE1 | aXnNsTrih8PEDoYIBjuGS0LchBT427d6 | CONSTRUCCIÓN DE AGENTES Y AUTOMATIZACIÓN CON HERRAMIENTAS LOW CODE · MÓDULO 2 · AE1 |
| PF1821 AE2 | Cpbf0Nxz2kR30uIso-XaQ4r-nImpUcZ9 | … · MÓDULO 2 · AE2 |
| PF1821 AE3 | VwNZDzR8cPMRtcmnpdM-s66xd3jEdhAD | … · MÓDULO 2 · AE3 |
| PF1821 AE4 | sM0NdAP9Nge1ye-VbUgEJwcXdeQZSvcX | … · MÓDULO 2 · AE4 |
| PF1822 AE1 | urRcA2KJv_bRphkfnpz8cagNqa3LdcSf | ESPECIALIZACIÓN EN DESARROLLO CON IA · MÓDULO 2 · AE1 |
| PF1822 AE2 | w4ZAbP4IItruDA6gx2o8A3rgSewPgyfw | … · MÓDULO 2 · AE2 |
| PF1822 AE3 | sGXUEcqF2ItJ8gi-JZ5woiyu2Pu2SFpe | … · MÓDULO 2 · AE3 |
| PF1822 AE4 | lWj4Oj2zKpaZwEMtEWl08NxvQgKdf175 | … · MÓDULO 2 · AE4 |

## Ajuste del usuario a los 8 base (sesión `2026-09-30-claude-code-10`)

El usuario revisó los 8 cursos. Pidió quitar el encabezado "Texto oficial del plan formativo" del inicio de la "Ficha del módulo":
"eso no debe decirlo". El bloque de texto pasó de "Paragraph with heading" a "Paragraph", y la ficha ahora empieza en "Curso (plan
formativo)". Se recargaron los 8 cursos y se comparó la ficha párrafo por párrafo con la del repo: igual en los 8, de 22 a 34 párrafos.

## Las 20 copias por cliente (sesión `2026-09-30-claude-code-10`)

Cada copia se duplicó desde la biblioteca (⋯ → Duplicate). Lleva el mismo título que su curso base, sin "Copy of". Está en la
carpeta privada de su cliente y tiene aplicada la marca de Articulate del cliente (Theme → Apply a brand), sin logo y sin cambiar
fuentes. Se verificó recargando cada copia: la marca guardada, el color del tema y el AE del título son correctos en 20 de 20.
Los 8 cursos base siguen sin marca.

| Curso | Cliente (carpeta y marca) | id de Rise | Color del tema |
| --- | --- | --- | --- |
| PF1821 AE1 | UNAB | WKIFc4M4jL7ig-6KsndMcd6YTy8Zgn24 | #A6192E |
| PF1821 AE1 | Skillnest | SNq2k8PgAHaIwkzjCGtiSeox1MUkyc5v | #0C8DC9 |
| PF1821 AE2 | UNAB | flonjuKbD-voAWeTtUD_Xu1icrwu-E57 | #A6192E |
| PF1821 AE2 | Skillnest | 45s3ZaNCZcHYX0yRXMwNCLvrveR7ZvNA | #0C8DC9 |
| PF1821 AE3 | UNAB | LSMIMKBl_oUJMU4zf-PUEonMao1Ki7DY | #A6192E |
| PF1821 AE3 | Skillnest | fdKfuo-ooltSXGL0TACN9ak6WxhJGy9j | #0C8DC9 |
| PF1821 AE4 | UNAB | T8vA7BPGmtqHTtE5BUfOETZmb0a88by9 | #A6192E |
| PF1821 AE4 | Skillnest | 43w6exPGvYOfH7C4EltSndNSWBKhBcl_ | #0C8DC9 |
| PF1822 AE1 | UNAB | gXpvcRIruEl1bCjpVFneT4BoGnjMLYIl | #A6192E |
| PF1822 AE1 | Skillnest | ffhWhExRpUBYJsz39Dh_6M010Yfrd2Sa | #0C8DC9 |
| PF1822 AE1 | U Autónoma | 9CDMwuIh3p5E2-8PlymrL_vUzB1r82fg | #DA291C |
| PF1822 AE2 | UNAB | h4cellTaN0SazqoyYlYg5blqDJl6RxJj | #A6192E |
| PF1822 AE2 | Skillnest | VaXeyAIvIgrx2B6-lKMM60oJx3sZNGcH | #0C8DC9 |
| PF1822 AE2 | U Autónoma | T1Ob2L3g6nX2jMcJGOVNTsDDCEkZpy11 | #DA291C |
| PF1822 AE3 | UNAB | vF8NeYmd8unHbYGLRRF-MNzytsFe6CbE | #A6192E |
| PF1822 AE3 | Skillnest | KtHXOcKnIwUREajsaBfTjczbNEoScqg- | #0C8DC9 |
| PF1822 AE3 | U Autónoma | Qg9iR209JaUg536ZrKl85G4p88rRlDDS | #DA291C |
| PF1822 AE4 | UNAB | 0EnN0PJ4kghUcyn88Wm2h1yrO9BVeJhC | #A6192E |
| PF1822 AE4 | Skillnest | jZ4oMUwSYI_oUvQUXBob349vvgL13H79 | #0C8DC9 |
| PF1822 AE4 | U Autónoma | eGeUiiAy9zUCW7YkxiTgt703uAt3rio0 | #DA291C |

Enlace de edición: `https://rise.eu.articulate.com/authoring/<id>`. No se publicó, compartió, exportó ni envió a Review 360.

**Etiquetas en español (sesión `2026-09-30-claude-code-11`).** Las etiquetas son los botones y mensajes que Rise pone solo:
"COMENZAR CURSO", "Inicio", "Lección sin título", etc. Se configuran en Settings → Labels. Al revisarlas, había de tres tipos:
- 14 copias en "Spanish";
- 4 en "English": PF1821 AE1 UNAB y las 3 de PF1822 AE1;
- 2 en "Copy of Spanish", un juego de la cuenta con los mismos 224 textos: las de PF1821 AE3.

A pedido del usuario, las 20 quedaron en el juego integrado "Spanish". Se revisó recargando cada copia: las 20 dicen "Spanish" y sus
224 textos son idénticos a los de ese juego. Rise guarda el cambio al elegir la opción; no hay botón Save.

## Sin alusiones al plan formativo ni a lo "oficial" (sesión `2026-09-30-claude-code-12`)

**Pedido del usuario:** el curso debe leerse como lo lee un estudiante, aunque el lector sea el revisor de SENCE. No puede haber
alusiones al plan formativo, a "criterios oficiales", "textos oficiales", "lectura oficial" ni afirmaciones de que un texto es
literal o textual. Lo que sí se mantiene tal cual es el aprendizaje esperado, los criterios y los contenidos.

**Qué se cambió en las 20 copias** (se leyó el contenido completo de cada curso y se revisó frase por frase):

- **Ficha del módulo:**
  - se quitó la línea "Texto del plan formativo PF18xx en SIPFOR (Res. 1868, versión 1).";
  - los rótulos "Curso (plan formativo)" y "Competencia del plan formativo" pasaron a "Curso" y "Competencia del curso". El PDF
    oficial llama a este campo "COMPETENCIA DEL PLAN FORMATIVO";
  - lo demás quedó igual: comparado con la ficha del repo, 20 de 20 idénticas.
- **"Oficial" como calificativo del plan:**
  - "criterios (de evaluación) oficiales" → "criterios de evaluación";
  - "aprendizaje esperado oficial" → "aprendizaje esperado";
  - "contenidos oficiales" → "contenidos";
  - "lectura oficial" y "PDF oficial" → "lectura" y "PDF";
  - "textos oficiales" → "el aprendizaje esperado y los criterios";
  - "preguntas oficiales" y "autocomprobación oficial" → sin "oficial".
- **Frases eliminadas o reescritas:**
  - "Estos textos se conservarán de manera literal, tal como aparecen en el plan formativo.";
  - "…alineado con el plan formativo oficial";
  - "tal como exige/establece el plan formativo";
  - "de manera textual";
  - "fuente original" o "documento fuente" (pasa a "la lectura");
  - los prefijos "Alineación con el plan formativo:".
- **Encabezados "Alineación con el plan formativo":** pasaron a "Contenidos de esta sección". En las lecciones de introducción
  dicen "Aprendizaje esperado y criterios de evaluación", en las de síntesis "Síntesis y práctica" y en las de descarga
  "Material de consulta".
- **Títulos de lección:** "Qué vas a lograr: … criterios oficiales" y "Qué vas a lograr: Alineación y criterios oficiales" pasaron
  a "… criterios de evaluación".
- **Bloques borrados enteros (2):** "Este recurso se basa exclusivamente en los contenidos y criterios oficiales del plan
  formativo…" (PF1821 AE3) y "Este recurso se centra exclusivamente en … los criterios oficiales definidos en el plan formativo…"
  (PF1821 AE2), en todas sus copias.

**Lo que no se tocó a propósito:**
- "documentación oficial" y "referencia oficial" de OpenAI, Hugging Face, n8n y Supabase. Es parte del aprendizaje esperado 2 y
  de los contenidos de PF1822 ("BASÁNDOSE EN LA DOCUMENTACIÓN OFICIAL DE OPENAI Y HUGGING FACE").
- "bases de datos", "soporte oficial" y "respuestas textuales".

**Verificación:**
- Después de guardar, se releyó cada curso: a ninguno le quedan cambios por aplicar, y al buscar de nuevo esas expresiones solo
  aparecen los usos legítimos de arriba.
- Los 8 cursos base no se tocaron en esta pasada: siguen con esos textos. Si se vuelve a duplicar, hay que corregir antes el base.

**Cómo se hizo (para repetirlo):**
- Se usan las mismas llamadas que hace el editor de Rise:
  - `rise/courses/GET_COURSE` para leer;
  - `rise/lessons/UPDATE_BLOCK_DEBOUNCE` para guardar un bloque completo con el texto cambiado;
  - `rise/lessons/DELETE_BLOCKS` para borrar un bloque;
  - `rise/lessons/UPDATE_LESSON_DEBOUNCE` para el título.
- Esas llamadas dejan un bloqueo de edición de 24 horas sin sesión en la lección. Se liberaron con `rise/locks/DEL_LOCK`, y
  ninguna copia quedó bloqueada.

**Si se corrige un curso base, sus copias no se actualizan solas:** hay que repetir la corrección en cada copia (2 en PF1821 y 3 en
PF1822), o volver a duplicar y marcar.

## SCORM de las 20 copias (sesión `2026-09-30-claude-code-13`)

Cada copia se exportó con Publish → LMS → Download y los ajustes por defecto de Rise:
- formato SCORM 1.2;
- se completa al ver el 100 % del curso;
- informa "Passed/Incomplete".

Cómo quedaron:
- **En el equipo:** `privado/rise-scorm/<cliente>/<PF>-M2-AE<n>-<cliente>-SCORM12.zip`. Git no los sube.
- **En Drive:** en NATY 2.0 → curso → cliente, en la carpeta "3 Lecturas Rise (SCORM)", junto a "1 Cuadernillos" y "2 Documentos".
- **En la planilla:** hoja Resumen, columnas G a J ("Lectura AE1 a AE4 Rise (SCORM)"), una fila por cliente y curso.

Revisión de los 20 zip:
- El id del manifiesto corresponde a su copia.
- El color es el de su marca: UNAB `#A6192E`, Skillnest `#0C8DC9` y U Autónoma `#DA291C`. Las fuentes también corresponden a cada marca.
- Los botones salen en español ("COMENZAR CURSO").
- No hay ninguna alusión al plan formativo ni a lo "oficial".
- Los enlaces de Drive descargan sin iniciar sesión el mismo archivo, byte a byte.

**Si se corrige una copia, hay que volver a exportarla** y subirla a Drive como nueva versión del mismo archivo, para que el enlace de
la planilla no cambie. Para subir a Moodle: Agregar actividad → Paquete SCORM (`GUIA-RISE.md`).
