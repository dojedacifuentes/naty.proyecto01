# Flujo de producción del módulo 2 · PF1821 y PF1822

**Meta:** dejar el módulo 2 de los dos cursos listo para evaluar, apuntando a 7,0 en los ítems
B (estrategia evaluativa) y C (metodología). El evaluador mira dos cosas: **el LMS**, donde se
evalúa la metodología (bases 2026, 7.4, pág. 30), y **el Anexo 2**. Todo lo de este flujo
termina en uno de esos dos lugares.

**Tablero de avance:** `PF1821-agentes-low-code/produccion/ESTADO.md` y
`PF1822-desarrollo-con-ia/produccion/ESTADO.md`. Lo que no está marcado ahí no está hecho.

## Reglas para cualquier persona o IA

1. **Fuente única: `contenidos/<PF>/modulo-2/`.** Si cambias un contenido, hazlo ahí. Después
   regenera las bases con `npm run produccion -- PF1821 PF1822` (y `npm run zip` o `npm run kit`
   si corresponde). No edites a mano lo que está en `produccion/`, salvo `ESTADO.md`.
2. **Sin marca de institución** en los recursos del curso base. Se usan nombres genéricos:
   "Videocápsula AE1", "Infografía AE1", "Quiz AE1", "Lectura AE1". Los logos van solo en los
   PDF de cada institución (paso 5).
3. **Aprendizajes y competencia textuales del plan**, copiados de `00-ficha-sipfor.md`.
4. **No inventes datos** de las bases, de una institución ni de una herramienta. Si falta
   algo, escribe `PENDIENTE:` (AGENTS.md §2).
5. **Al terminar una pieza**, actualiza su fila en `ESTADO.md` con el estado, el enlace y quién
   la hizo, y agrega una línea al registro al final de ese archivo. Así la próxima IA sabe dónde
   seguir sin leer tu chat.

**Aprendizaje esperado seleccionado:** AE3 en los dos cursos (ver `REVISION-BASES.md`). Sus
dos actividades y sus dos herramientas didácticas son las piezas que no pueden faltar.

## Etapas

| # | Etapa | Resultado | Con qué | Quién |
| --- | --- | --- | --- | --- |
| 0 | Bases de producción | PPTX, guiones, prompts y quizzes en `produccion/` | `npm run produccion` | Hecho el 25-sep |
| 1 | Medios | Videos, infografías, lecturas, herramientas didácticas | HeyGen, Genially/Canva, IA de texto | Cualquier IA o persona, en paralelo |
| 2 | Curso base en Moodle | Módulo 2 navegable, organizado por aprendizaje | Moodle (o learn.hackea.cl) | Equipo |
| 3 | Anexo 2 | Secciones IV (módulo 2), V y VI con enlaces | Formato oficial 2026 + molde del V0 | Equipo o IA de texto |
| 4 | Revisión | Casillas marcadas en `<curso>/README.md` | Checklist de las bases | Natalia |
| 5 | Por institución | Curso importado, credenciales, 9 PDF con logo y video de evidencia | Moodle de cada institución | Equipo |

## Etapa 1 · Cómo producir cada pieza

### Videocápsulas y video de bienvenida → HeyGen

Base: `produccion/videos/AE1-capsula.pptx` … `AE4-capsula.pptx` y `00-bienvenida.pptx`. Cada
lámina es una escena y **la narración está en las notas del orador**. La misma narración está en
`AEn-guion.md`, por si la herramienta no lee las notas.

1. En HeyGen, crea el video importando el PPTX (opción de presentación a video; el nombre del menú
   puede variar). Revisa que cada escena tomó su nota como guion. Si no, cópiala del `guion.md`.
2. Avatar en el tercio derecho: las láminas dejan ese espacio libre. Voz en español
   latinoamericano. **Subtítulos activados.**
3. Revisa cómo pronuncia n8n, JSON, API, Supabase, ROUGE y BLEU; corrígelo con el diccionario
   de pronunciación.
4. En la bienvenida, reemplaza el texto "Imagen sugerida" de cada lámina por la imagen o captura
   que indica (o bórralo y deja solo al avatar) antes de generar.
5. Exporta en MP4 1080p, súbelo al LMS y pega el enlace en `ESTADO.md`.

La narración generada es fiel al contenido, pero suena a lámina leída. Si hay tiempo, púlela
antes de generar el video:

```text
Reescribe esta narración como voz en off para un video con avatar. Mantén exactamente los
conceptos y ejemplos, sin agregar información. 50 a 80 palabras por lámina, frases cortas,
tono cercano, español de Chile, sin leer siglas letra por letra salvo API y JSON.
Devuélvela en la misma tabla (Lámina | En pantalla | Narración).
<pega aquí la tabla de AEn-guion.md>
```

### Infografías → Genially o Canva

Base: `produccion/infografias/prompts.md`. Trae un prompt para la ruta del módulo y uno por
aprendizaje, con el texto exacto, la paleta y el formato (vertical, 1080 × 1920).
Exporta en PNG y, si la herramienta lo permite, publícala interactiva. Súbela al LMS como
"Infografía AEn".

### Quiz por aprendizaje → Moodle

Base: `produccion/quiz/AE1.gift` … `AE4.gift`, con 3 preguntas cada uno y su respuesta o
retroalimentación. En Moodle: **Banco de preguntas → Importar → formato GIFT**. Después crea un
cuestionario "Quiz AEn" en la sección de cada aprendizaje, con intentos ilimitados y
retroalimentación inmediata: es una herramienta de práctica, no la nota del módulo.

### Lecturas (flipbook) → IA de texto + maquetación

Base: `produccion/lecturas/prompts.md`, con un prompt por aprendizaje. Cada uno trae los
contenidos textuales del plan y la secuencia de la cápsula, y pide cerrar con autocomprobación
y un glosario. Revisa el resultado contra la ficha, exporta en PDF y conviértelo en flipbook
(Heyzine o FlipHTML5) o súbelo como PDF al LMS.

### Herramientas didácticas del aprendizaje seleccionado (AE3)

| Curso | Herramienta 1 | Herramienta 2 |
| --- | --- | --- |
| PF1821 | **Tutorial "Tu primer workflow"**. Capturar las pantallas de n8n siguiendo los pasos de `C4-herramientas-didacticas.md` y publicarlo como página del LMS | **Video interactivo "Expresiones y depuración"**. Grabar el guion en HeyGen y cargarlo en una actividad H5P *Interactive Video* con las 5 preguntas y su retroalimentación |
| PF1822 | **Notebook "Tu primera llamada a un modelo"**. Generarlo con el prompt de abajo y probarlo en Colab | **Video interactivo "Del prompt a la respuesta"**. Igual que en PF1821 |

Notebook de PF1822:

```text
Genera un notebook Jupyter (.ipynb) en español con estas secciones, en este orden, cada una
con una celda de explicación, una de código y una celda de autocomprobación con assert y un
mensaje que diga qué revisar si falla: <pega la tabla de la Herramienta 1 de
contenidos/PF1822/modulo-2/C4-herramientas-didacticas.md>. La clave se lee con
userdata.get("OPENAI_API_KEY") en Colab o desde una variable de entorno, nunca escrita en una
celda. Usa httpx. Las funciones limpiar() y tokenizar() son las de la actividad 2.
```

### Actividades prácticas (ABP y ABPRO)

Cada actividad es una página del LMS con su enunciado, sus insumos y la entrega. La respuesta
modelada queda visible solo para el tutor, o se publica después de la entrega.

- **PF1821:** falta el archivo del workflow "roto" de la actividad 2. Se arma en n8n a partir
  de la respuesta modelada, introduciendo las 5 fallas descritas, y se exporta en JSON.
- **PF1822:** el código de las respuestas modeladas se ejecuta una vez con `pytest` en una
  máquina con Python antes de publicarlo. Los tickets T1 a T5 se suben como CSV.

### Documentos evaluativos (PDF)

Salen de `B2-instrumentos.md`, `B3-portafolio.md` y `B4-retroalimentacion.md`. Siguiendo la
práctica del equipo, son nueve PDF por institución, con su logo:
- los tres instrumentos;
- la guía y el instrumento del portafolio;
- la bitácora;
- las pautas de autoevaluación y de coevaluación;
- la rúbrica de retroalimentación.

Se enlazan desde la sección V del Anexo 2. La versión sin logo sirve para el curso base.

## Etapa 2 · Estructura del curso base en Moodle

| Sección | Qué lleva |
| --- | --- |
| Bienvenida | Video de bienvenida, infografía de la ruta, competencia y aprendizajes textuales, foro de presentación |
| AE1 a AE4, una por aprendizaje | Videocápsula, lectura, infografía y quiz del aprendizaje, más las actividades y herramientas que le tocan según `02-recursos.md` |
| AE3 (el seleccionado) | Además de lo anterior, una etiqueta visible: "Actividades prácticas de este aprendizaje: Actividad 1 y Actividad 2", con enlace a cada una |
| Evaluación del módulo | Los tres instrumentos, el portafolio, la autoevaluación, la coevaluación y la bitácora |

Insignias o tablero para la gamificación de la actividad 2 (aspectos motivacionales, C3).

## Etapa 3 · Anexo 2 del módulo 2

Formato: el Anexo 2 oficial de 2026. Molde: el V0 de PF1474 del equipo, que está en la carpeta
local y no en el repo.

| Sección | Sale de |
| --- | --- |
| IV · actividades del módulo 2 | Ruta de `02-recursos.md`, escrita con los tipos del V0: Masterclass, ABPRO, Repaso y Evaluación de módulo como sincrónicas; Lectura, Quiz, Video tutorial y ABP como asincrónicas. Las horas suman 18 h (PF1821) o 21 h (PF1822) |
| V · estrategia evaluativa | `B1` a `B4`, con el enlace a cada PDF y al portafolio |
| VI a) ¿Qué hará? | `C-metodologia.md` a) |
| VI b) ¿Cómo lo hará? | ABP y ABPRO del AE3: actividades 1 y 2 de `C2-actividades.md` |
| VI c) ¿Con qué? | Las 2 herramientas del AE3 y los medios (cápsulas, infografías, cuadro comparativo), con enlaces al LMS |
| VI d) y e) | `C-metodologia.md` d) y e) |

## Si trabajas desde otra IA

1. Lee este archivo, `REVISION-BASES.md` y el `ESTADO.md` del curso.
2. Toma una fila en estado `pendiente`, márcala `en curso` con tu nombre y haz solo esa pieza.
3. Al terminar, deja la fila en `listo para revisión`, con el enlace, y agrega una línea al registro.
4. Si tienes terminal, cierra con el protocolo de `AGENTS.md` §5 (`npm run sesion`). Si no, basta
   con el registro de `ESTADO.md`: quien siga lo pasa a `state/` en su cierre.
