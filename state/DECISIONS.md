# DECISIONS — bitácora de decisiones

> Una entrada por decisión. Formato: fecha · decisión · por qué · alternativa descartada · quién.
> Sirve para que cualquier sesión posterior pueda responder "¿por qué esto dice lo que dice?".

---

**2026-09-22 · El repositorio usa `AGENTS.md` como contrato único.**
Por qué: el trabajo debe poder continuarse desde Codex, Cursor o un chat sin herramientas.
Alternativa descartada: instrucciones solo en `CLAUDE.md`, que ata el proyecto a una herramienta.
Quién: Diego.

**2026-09-22 · Todo el conocimiento va en Markdown y CSV plano, sin binarios.**
Por qué: auditabilidad en `git diff` y portabilidad entre herramientas.
Alternativa descartada: documentos ofimáticos o base de datos.
Quién: Diego.

**2026-09-22 · Los PDF de las bases no se versionan.**
Por qué: pesan, son públicos, y el repo debe citarlos por numeral y página.
Alternativa descartada: incluirlos en `bases/`.
Quién: Diego.

**2026-09-22 · La rúbrica vive como dato ejecutable en `data/rubrica-subcriterios.csv`.**
Por qué: permite usarla como checklist automático de cobertura, no solo como prosa.
Alternativa descartada: solo la versión narrativa en `docs/`.
Quién: Diego.

**2026-09-22 · Se trabaja asumiendo que solo se desarrolla el segundo módulo.**
Por qué: es lo que dice el punto 7.4 y las pautas hablan siempre del "módulo solicitado".
Alternativa no descartada: el numeral 4.3.1.1 dice "todos los módulos". Está abierta
como `OPEN-QUESTIONS.md` #1 y debe consultarse formalmente.
Quién: Diego.

**2026-09-22 · Umbral operativo de diferenciación: 0,75 de similitud coseno TF-IDF.**
Por qué: hace falta un número para que el control sea ejecutable, no una intención.
Alternativa descartada: revisión cualitativa únicamente.
Quién: Diego. **Sujeto a calibración** cuando exista el primer lote real.

**2026-09-22 · Los scripts pasan de Python 3 a Node ≥ 18, sin dependencias.**
Por qué: en la máquina donde se trabaja no hay intérprete de Python (ni `python`, ni
`python3`, ni el lanzador `py`) y sí hay Node 24. Una herramienta de verificación que no
se puede correr no verifica nada. Node además viene con `fetch` y `crypto` en el núcleo,
así que no hace falta instalar nada en un clon nuevo.
Alternativa descartada: pedir que se instale Python en cada máquina y en el CI.
El port se verificó contra la salida del original: mismos 15 planes, mismas 89
actividades de extensión, mismo `data/umbrales-por-plan.csv` byte a byte.
Quién: Diego.

**2026-09-22 · Los bloques evaluables del Anexo 2 llevan marcadores legibles por máquina.**
Por qué: la rúbrica del 7.4 es casi toda conteo, así que el control de cobertura puede
contar en vez de suponer. `<!-- verificable: ID=D3 tipo=tabla min=@umbral:extension_nota7 -->`
le dice al verificador qué subcriterio alimenta el bloque y cuántos elementos exige el 7.0
para ese plan formativo en particular.
Alternativa descartada: inferir las secciones por el título. Se rompe al primer cambio de
redacción, y en 45 o 90 documentos eso pasa seguro.
Quién: Diego.

**2026-09-22 · Marcar una propuesta como "listo" cambia el nivel de exigencia.**
Por qué: mientras se escribe, un umbral incumplido es información; al declararla lista, es
un defecto que llega a la mesa de evaluación. En borrador los incumplimientos salen como
avisos; con `**Estado:** listo` son errores y el repositorio no pasa la verificación.
Alternativa descartada: un único nivel de exigencia, que obliga a convivir con errores
rojos durante toda la redacción y termina enseñando a ignorarlos.
Quién: Diego.

**2026-09-22 · Cada sesión queda registrada en `state/LEDGER.csv` con huella de estado.**
Por qué: el handoff en prosa depende de que quien escribe sea honesto y completo. La huella
`sha256` de los cuatro archivos de `state/` permite a cualquier sesión posterior detectar
que alguien editó el estado fuera del protocolo, sin leer ningún chat y sin creerle a nadie.
Alternativa descartada: confiar en los logs de sesión, que es lo que había.
Quién: Diego.

**2026-09-22 · Una sesión no puede auditarse con la misma herramienta que la produjo.**
Por qué: quien escribió algo repite sus propios supuestos al revisarlo. Alternar Claude
Code y Codex detecta errores que una sola herramienta comete sistemáticamente. El comando
`npm run sesion -- auditar` rechaza la auditoría si el auditor declara la misma
herramienta; se puede forzar con `--igual-herramienta` y queda escrito que se forzó.
Alternativa descartada: auditoría "por otra sesión" sin exigir otra herramienta.
Quién: Diego. Protocolo completo en `AUDITORIA.md`.

**2026-09-22 · Umbral de similitud entre propuestas del mismo cliente: 0,90.**
Por qué: el 0,75 entre clientes distintos ya estaba decidido, pero faltaba el caso de un
mismo cliente con dos planes formativos: ahí compartir método es legítimo y el umbral debe
ser más laxo. Supera el umbral → aviso, no error.
Detalle técnico asociado: el idf lleva piso en 1 (la forma de scikit-learn). Sin ese piso,
con pocas propuestas el idf de los términos compartidos cae a cero y dos documentos casi
gemelos dan similitud cercana a 0, que es justo lo contrario de lo que el control busca.
Se detectó probando el control con dos propuestas de prueba deliberadamente parecidas.
Alternativa descartada: usar el mismo umbral para todos los pares.
Quién: Diego. **Sujeto a calibración** cuando exista el primer lote real.

**2026-09-24 · Todo lo del proyecto vive en el repo, incluidos los PDF de las bases y los entregables.**
Por qué: trazabilidad hito por hito en un solo lugar. Hasta hoy los entregables del
24-sep (análisis del módulo 2, brainstorm, panel) y los PDF de las bases estaban sueltos
en la carpeta de arriba del repo, sin historia y sin forma de saber qué se entregó cuándo.
Qué cambia: `bases/` guarda los dos PDF de las bases; `entregables/<fecha>-<tema>/`
guarda cada entrega con su `README.md`. El `.gitignore` sigue ignorando cualquier otro
PDF y el control 05 sigue tratando como error un PDF fuera de esas dos rutas.
Reemplaza a: "Los PDF de las bases no se versionan" y, para esas dos rutas, a "Todo el
conocimiento va en Markdown y CSV plano, sin binarios" (2026-09-22). El conocimiento que
se edita sigue en Markdown y CSV; los binarios entran solo como fuente o como entrega.
Alternativa descartada: dejar los binarios fuera y enlazarlos, que es justo la dispersión
que se quiere evitar.
Quién: pedido explícito del usuario en la sesión `2026-09-24-claude-code-01`.

**2026-09-24 · El repo remoto es github.com/dojedacifuentes/naty.proyecto01.**
Por qué: lo definió el usuario en la sesión `2026-09-24-claude-code-01`. Resuelve la parte
"dónde vive" de `OPEN-QUESTIONS.md` #14; la parte "privado y quién entra" sigue abierta.
Detalle: `gh` (GitHub CLI 2.101.0, release oficial con checksum verificado) quedó instalado
en la carpeta de programas del usuario, fuera del PATH; se llama por su ruta completa.
Quién: usuario (remoto) · claude-code (instalación).

**2026-09-24 · El repo remoto queda público.**
Por qué: decisión del usuario, tomada después de que se le advirtiera que `OPEN-QUESTIONS.md`
#14 pedía privado y que desde hoy el repo incluye el brainstorm, el análisis del módulo 2
y las preguntas abiertas sobre clientes que compiten entre sí.
Consecuencia práctica: todo lo que entre al repo es público desde el push. Las reglas de
`AGENTS.md` §2 (nada de credenciales, nada de datos personales) pesan más que antes, y
la información comercial de cada cliente conviene pensarla dos veces antes de versionarla.
Alternativa descartada: pasarlo a privado antes del primer push (era la recomendada).
Quién: usuario, sesión `2026-09-24-claude-code-02`.

**2026-09-24 · La extracción de SIPFOR usa la API pública del catálogo, no scraping de HTML.**
Por qué: el catálogo (`Planes/Catalogo.aspx`) se alimenta de `ProxySS.asmx` con JSON:
`PlanSearch` resuelve el código al id interno, `PlanGetById` trae los módulos y
`ModuloGetById` trae competencia, aprendizajes, criterios, contenidos y recursos. Evita el
ViewState que el handoff anterior temía. Solo lectura, con pausa entre llamadas.
Se guarda la respuesta tal cual en `data/sipfor/` (fuente) y la forma normalizada en
`data/planes/`. Los textos quedan textuales: solo se quitan etiquetas HTML.
Alternativa descartada: descargar y parsear el PDF de cada plan (queda como verificación).
Quién: claude-code, sesión `2026-09-24-claude-code-03`.

**2026-09-24 · PF1821 y PF1822 van antes que el piloto PF1481.**
Por qué: pedido explícito del usuario como hito del día. El handoff pedía empezar por
PF1481 y validar la forma con Diego antes de automatizar; la forma de `data/planes/` es la
que el handoff proponía, más campos de fuente y recursos, y el extractor sirve igual para
los 15 (`npm run sipfor -- --todos`).
Quién: usuario.

**2026-09-24 · El contenido canónico de cada curso vive en `contenidos/<PF>/modulo-<n>/`.**
Por qué: los entregables B y C del módulo los fija el plan formativo y son iguales para
todas las instituciones; `propuestas/<cliente>/<PF>/` queda para lo que cambia por cliente.
Separarlos evita producir 3 o 6 veces lo mismo y evita que narrativa de un cliente se
filtre al texto común. Flujo completo en `docs/05-flujo-contenidos-modulo.md`.
Alternativa descartada: un directorio `propuestas/_canon/`, que el control 01 leería como
un cliente inexistente.
Quién: claude-code, sesión `2026-09-24-claude-code-03`.

**2026-09-25 · Sección `modulo-2/` en la raíz, con una carpeta por curso y su checklist.**
Por qué: el usuario pidió una sección propia para los entregables del módulo 2 de cada
curso, con el checklist de lo que piden las bases. En GitHub, el README de cada carpeta se
ve al abrirla. La sección enlaza a `contenidos/` y a los PDF de `entregables/` en vez de
copiarlos, para que el contenido siga teniendo una sola fuente. Solo el zip de cada curso
vive en su carpeta, porque se genera.
Alternativa descartada: README dentro de `contenidos/<PF>/modulo-2/`, que queda tres
niveles abajo y no se encuentra desde la portada; y mover los PDF del hito del 24-sep, que
rompería las rutas que ya citan el handoff y el README de ese hito.
Quién: usuario (la sección) y claude-code (la forma), sesión `2026-09-25-claude-code-01`.

**2026-09-25 · Se sube todo al remoto público.**
Por qué: el usuario lo pidió explícitamente en la sesión `2026-09-25-claude-code-01`,
dejando sin efecto el "todo en local por ahora" del 24-sep. Antes del push se revisó que
no hubiera credenciales (control 05) ni datos personales: solo aparecen correos de ejemplo
con dominio `.test`, la casilla pública de SENCE y el correo de trabajo de Natalia en
`state/`.
Alternativa descartada: seguir en local.
Quién: usuario.

**2026-09-25 · AE3 es el "aprendizaje esperado seleccionado" en PF1821 y PF1822.**
Por qué: la pauta de metodología mira 2 actividades y 2 herramientas didácticas "para el
aprendizaje esperado seleccionado" (bases 2026, 7.4, pág. 31). En PF1821 el AE3 ya estaba
en las dos actividades y en las dos herramientas. En PF1822 ningún aprendizaje estaba en las
dos actividades, así que se agregó a la actividad 1 una parte C del AE3 con respuesta
modelada. Es el cambio más chico que lo resuelve y no necesita ejecutar código.
Alternativa descartada: un ABP y un ABPRO por cada aprendizaje, como el V0 de PF1474. Es
más robusto si el evaluador elige el aprendizaje, pero son ocho actividades por curso y no
caben en el plazo. Queda como resguardo parcial: cada aprendizaje tiene dos herramientas
didácticas en el LMS (#17).
Quién: claude-code, sesión `2026-09-25-claude-code-02`, a pedido del usuario de apuntar a 7,0.

**2026-09-25 · Se adopta el estándar de recursos del equipo por aprendizaje esperado.**
Por qué: la propuesta de Hackea (lámina 13) y las planillas de recursos de 2023 y 2025 usan,
por aprendizaje, videocápsula, lectura en flipbook, quiz e infografía. El kit tenía cápsulas
por aprendizaje, pero una sola infografía y ningún quiz por aprendizaje. Con el estándar, cada
aprendizaje queda con al menos dos herramientas didácticas, y el curso se parece a lo que el
equipo ya sabe montar. El glosario va dentro de cada lectura.
Alternativa descartada: mantener el kit como estaba.
Quién: claude-code, sesión `2026-09-25-claude-code-02`.

**2026-09-25 · La carpeta local "Licitaciones TD 2026" no se versiona.**
Por qué: trae Anexos 2 de otras instituciones (Skillnest, UNAB, Mindhub, CHC), un convenio y
la propuesta comercial de Hackea, y el repo es público. Se cita por nombre de archivo y se
resume lo que se usó en `modulo-2/REVISION-BASES.md`, sin copiar texto.
Alternativa descartada: agregarla a `bases/` o a `entregables/`.
Quién: claude-code, sesión `2026-09-25-claude-code-02`.

**2026-09-25 · Las bases de producción las genera `npm run produccion` desde `contenidos/`.**
Por qué: el usuario va a producir los recursos finales con otras IA (HeyGen para los videos,
Genially o Canva para las infografías). Generar sus insumos (PPTX con la narración en las
notas, prompts, quizzes GIFT) desde la misma fuente evita que el video diga una cosa y el
kit otra. El PPTX se arma en Node sin dependencias (`scripts/lib/pptx.mjs`) y se validó
abriéndolo en PowerPoint 2007.
Alternativa descartada: automatizar PowerPoint por COM, que solo funciona en Windows con
Office; e instalar `pptxgenjs`, que rompe la regla de cero dependencias (AGENTS.md §8).
Quién: claude-code, sesión `2026-09-25-claude-code-02`.

**2026-09-25 · Alcance de la etapa: recursos base neutros, listos para subir.**
Por qué: el usuario lo acotó así: por ahora nada de LMS, nada de redactar el Anexo 2 y nada
por institución. Sí hacen falta los recursos base de PF1821 y PF1822 y los insumos para
rellenar el Anexo después. `modulo-2/FLUJO-PRODUCCION.md` y los `ESTADO.md` se reescribieron
con ese alcance, en seis carriles paralelos por herramienta (A automático, B video, C diseño,
D texto IA, E técnico, F interactivo).
Alternativa descartada: el flujo anterior, que incluía montar Moodle y redactar el Anexo.
Quién: usuario (alcance) y claude-code (carriles), sesión `2026-09-25-claude-code-03`.

**2026-09-25 · Los recursos finales viven en `modulo-2/<curso>/entrega/`, y ahí se versionan los PDF.**
Por qué: separar las bases (`produccion/`, lo que se carga en otra herramienta) de lo que se
sube (`entrega/`). `.gitignore` y el control 05 aceptan PDF en `modulo-2/*/entrega/`, además de
`bases/` y `entregables/`. Los videos y los `.h5p` quedan fuera de git (`*.mp4`, `*.mov`,
`*.webm`, `*.h5p`): pesan decenas de MB. Van a Drive con la misma estructura y su enlace va
en `ESTADO.md`.
Alternativa descartada: dejar los recursos en `entregables/`, que es por hito con fecha y no
por curso; y versionar los videos, que infla el repo y roza el límite de 100 MB de GitHub.
Quién: claude-code, sesión `2026-09-25-claude-code-03`.

**2026-09-25 · Carril automático en `npm run produccion` y Markdown→HTML compartido en `scripts/lib/html.mjs`.**
Por qué: todo lo que ya está escrito en `contenidos/` se convierte en archivo final sin
pasar por otra herramienta: 9 PDF de evaluación, enunciados y respuestas modeladas, insumos
SQL y CSV, código `.py`, cuadro comparativo, quizzes GIFT e insumos del Anexo en HTML. El
conversor y los estilos del kit pasaron a `lib/html.mjs` para reutilizarlos; el HTML del kit
sale idéntico (comprobado con `cmp`).
Alternativa descartada: pedir esos documentos a otra IA, que es más lento y abre la puerta a
que diverjan de la fuente.
Quién: claude-code, sesión `2026-09-25-claude-code-03`.

**2026-09-25 · Las videocápsulas usan el texto del plan tal cual, para el revisor.**
Por qué: el usuario pidió "usar textual para facilitar el trabajo del revisor". Cada
videocápsula lleva:
- una lámina 2 con el aprendizaje esperado y sus criterios de evaluación, textuales de
  SIPFOR y también narrados;
- en cada lámina, el contenido del plan que cubre, copiado de la ficha sin cambiar una palabra.

La fuente es la columna nueva "Contenido del plan (textual)" de las tablas de
`R-capsulas.md`, y `npm run produccion` no genera si un rótulo no es textual del plan o si
un contenido del plan queda sin lámina. En pantalla va en mayúsculas, como en el plan; en la
narración va en minúsculas con las mismas palabras, porque algunas voces deletrean lo que
está en mayúsculas.
Alternativa descartada: resumir el plan con otras palabras, que obliga al revisor a
interpretar la equivalencia.
Quién: usuario (criterio) y claude-code (forma), sesión `2026-09-25-claude-code-05`.

**2026-09-25 · El repo se publica en Vercel como sitio estático generado (`npm run sitio`).**
Por qué: el usuario pidió que el proyecto quedara visible en Vercel. Los dos proyectos de
Vercel conectados al repo (`naty-proyecto01` y `naty.proyecto01`) compilaban "con éxito" y
servían 404 NOT_FOUND. El repo no tenía `index.html`, ni comando de build, ni carpeta de
salida. Ahora `vercel.json` le indica a Vercel `buildCommand: npm run sitio` y
`outputDirectory: public`. El script, sin dependencias, publica:
- `modulo-2/` y los contenidos del módulo 2 de PF1821 y PF1822, con cada `.md` convertido a HTML;
- los PDF del kit;
- los zips de producción, armados en cada despliegue.

Los enlaces a lo que no se publica apuntan a GitHub. `public/` no se versiona.
Alternativa descartada: publicar el repo completo tal cual. Vercel no muestra Markdown, y el
repo trae `state/`, bases y material interno que no aporta a quien revisa el módulo.
Quién: usuario (publicar) y claude-code (forma), sesión `2026-09-25-claude-code-06`.

**2026-09-25 · Prompts de infografía textuales, con especificaciones visuales y alto calculado.**
Por qué: el usuario pidió prompts ceñidos a las bases, sin ambigüedad, con parámetros visuales
profesionales y de claridad, y que cumplan con las medidas. Cada prompt es autosuficiente:
- encargo y propósito, con la cita de las bases (Anexo N°7, num. 7 c y d, pág. 110);
- tipografía con tamaños en px, color con contraste WCAG 2.1 AA, íconos, diagramación y reglas de texto;
- el CONTENIDO exacto, con el aprendizaje, la competencia y los contenidos del plan textuales;
- un control antes de entregar.

El ancho es fijo, de 1080 px, y el alto se calcula con la cantidad de texto y los tamaños de
letra (entre 2160 y 3480 px). Con 8 o 9 secciones, el contenido no cabe en 1080 × 1920 sin
achicar la letra por debajo de lo legible. Las bases no fijan formato; estas medidas son el
estándar del proyecto, y el LEEME lo dice.
Alternativa descartada: mantener 1080 × 1920, que obliga a cortar texto o a usar letra ilegible.
Quién: usuario (criterios) y claude-code (parámetros), sesión `2026-09-25-claude-code-07`.

**2026-09-25 · Las lecturas se escriben en el repo y se generan en PDF con diseño propio (carril A).**
Por qué: el usuario pidió los 8 PDF con diseño profesional, máximo dos fuentes, todos los parámetros
de diseño gráfico y los contenidos verificados. Escribirlas en el repo, en vez de repartir 8 prompts
entre otras IA, da el mismo formato en las 8 y permite revisarlas solas. El plan formativo exige un
"MANUAL DIDÁCTICO CON TODOS LOS CONTENIDOS DEL MÓDULO" (ficha, materiales e insumos), y
`scripts/lib/lectura.mjs` no imprime una lectura que no cubra, textuales, todos los contenidos de su
aprendizaje. El diseño es A4, con IBM Plex Sans para el texto e IBM Plex Mono para el código: dos
familias con licencia OFL, versionadas en `scripts/fuentes/` e incrustadas en el PDF. La paleta es la
de las infografías, con contraste WCAG 2.1 AA, y los diagramas se dibujan sin imágenes externas. Los
módulos del plan se nombran, no se numeran, porque el orden de la ficha está por confirmar.
Alternativa descartada: los prompts por aprendizaje (`produccion/lecturas/prompts.md`), que se
eliminaron. Dejaban el formato y la cobertura a criterio de cada IA.
Quién: usuario (encargo y criterios) y claude-code (contenido y diseño), sesión `2026-09-25-claude-code-08`.

**2026-09-25 · Las dos herramientas didácticas de cada curso trabajan el AE3, el aprendizaje seleccionado.**
Por qué: la pauta de "Uso de los medios" (7.4, pág. 31) da el 7,0 si "se observan 2 herramientas didácticas
distintas que serán utilizadas para trabajar los diferentes contenidos del aprendizaje esperado
seleccionado" y las dos permiten adquirir su habilidad; si solo una lo hace, es 5,0. En PF1822 el notebook
trabajaba el AE2 y el AE4, y en PF1821 el tutorial era sobre todo del AE2 y el video preguntaba por el AE4.
Ahora:
- PF1822: el notebook es un laboratorio de prompts del AE3 (secciones 1 a 9; la 0 repasa el AE2).
- PF1821: el tutorial tiene 17 pasos, y del 5 al 17 son del AE3 (expresiones, tipos, Supabase, Filter,
  Summarize, CSV, XML y Split Out).
- En los dos cursos, las 5 preguntas del video interactivo evalúan criterios del AE3.
- Las dos herramientas de cada curso cubren juntas todos los contenidos del AE3 (tabla en C4) y están en
  el tramo 3 de la ruta, sin cambiar las horas.

El tutorial y el notebook usan otros datos que las actividades, para que las actividades sigan siendo un
problema por resolver.
Alternativa descartada: rehacer los videos de la herramienta 2. No hacía falta: las preguntas se agregan en
H5P y el video base del usuario sirve tal cual.
Quién: usuario (pedido de apuntar al 7) y claude-code (diseño), sesión `2026-09-25-claude-code-10`.

## 2026-09-25 · Actividades del módulo 2: diseño, Moodle, zip por curso (sesión claude-code-13)

- Los PDF de actividades, evaluación y medios usan el mismo diseño que las lecturas, con una ficha por documento
  armada desde la tabla resumen de C2, con los códigos internos (R0n, B2-n, B4-x) traducidos a nombres.
  Por qué: pedido del usuario (sesión -11); quien lee el PDF no tiene el repo. Descartado: dejar los códigos.
- El zip de actividades separa `participante/` de `tutor/` (respuesta modelada, código y workflow corregido).
  Por qué: la respuesta modelada no debe quedar al alcance del participante al montar la Tarea. Cuándo compartirla
  queda como sugerencia, porque lo decide cada institución.
- La tabla `comunas` no incluye Isla de Pascua, a propósito: es el caso borde de la misión 3 (el pedido queda sin
  zona y, sin salida de respaldo en el Switch, desaparece). El HANDOFF anterior decía lo contrario por error.
- `markdown()` (scripts/lib/html.mjs): la continuación de un ítem de lista se une con espacio, no con salto, y solo
  abre renglón una línea que empieza con un rótulo en negrita ("**Entrega:**"). Por qué: cortaba oraciones a la
  mitad en los PDF y en Moodle. Las lecturas no cambian (su HTML se comparó antes y después).
Quién: usuario (pedido) y claude-code (diseño), sesión `2026-09-25-claude-code-13`.

## 2026-09-27 · Estándar de recursos de la contraparte (sesión claude-code, 2026-09-27-claude-code-01)

- Se adopta el estándar de la contraparte (planilla "Recursos a desarrollar", con cursos que sacaron 7):
  por curso, **video de bienvenida al curso** (no al módulo), **video resumen del módulo**, **3 quiz**
  (en Canva), **infografía** y **lectura** (en Rise, en lugar de flipbook, hecha desde los PDF de lectura),
  más un **glosario** del módulo. Por qué: la contraparte dice que así se aterriza lo amplio de las bases
  y que con eso han obtenido 7. Lo ya hecho (cápsulas por AE, 5 infografías, quiz GIFT) se mantiene.
  Nota: las bases no exigen cápsulas ni este formato; se justifican en el Anexo N°7, num. 7 c) y d), pág. 110.
- Los 3 quiz se reparten por tramo (Quiz 1: AE1 y AE2 · Quiz 2: AE3 · Quiz 3: AE4), 5 preguntas cada uno,
  con preguntas **nuevas**: no repiten la prueba objetiva ni el video interactivo, para no adelantar la
  evaluación. Quién: usuario (reparto). Alternativas descartadas: diagnóstico-avance-cierre, y uno por AE sin el AE1.
- El glosario del módulo junta los 32 términos de las 4 lecturas; un término repetido (Credencial en
  PF1821, Token en PF1822) queda una vez, con la definición de la primera lectura y los dos aprendizajes.
- **Marca por cliente fuera del repo:** `npm run marca -- <cliente>` reimprime los PDF con los colores, el
  logo y el nombre del cliente desde `privado/marcas/<cliente>/`, que git ignora. Por qué: el repo es
  público y los clientes compiten entre sí (#11). Los colores deben cumplir 4,5:1 con el blanco, como el
  diseño neutro; el comando se niega si no. No se inventaron colores ni logos: faltan los manuales de marca.
- `npm run produccion` deja en `.scratch/produccion/<PF>/manifiesto.json` qué HTML da cada PDF (lo usa
  `npm run marca`), y escribe los HTML también con `--sin-pdf`.
Quién: usuario y contraparte (estándar), claude-code (implementación), sesión `2026-09-27-claude-code-01`.

## 2026-09-27 · Quiz de Canva como presentación editable (sesión 2026-09-27-claude-code-02)

- Los seis quiz G3 se construyen como presentaciones editables de 11 páginas: portada, una página por pregunta y una página de retroalimentación por pregunta. Por qué: el conector de Canva disponible permite crear, copiar y editar diseños, pero no expone el elemento Quiz ni formularios con respuestas.
- La interactividad queda como paso manual en Canva. Alternativa descartada: simular respuestas mediante enlaces entre páginas, porque no equivale a un quiz con registro de respuesta y podría confundir la revisión.
- Se adopta la línea visual neutra aprobada por el usuario en PF1821 Quiz 2 para los otros cinco diseños: sin logos ni instituciones, contraste alto y opciones legibles. El contenido se conserva literal desde los `.txt`; cuando la generación inicial reescribió opciones, se corrigió elemento por elemento antes de guardar.
Quién: usuario (aprobación del prototipo) y claude-code (construcción y verificación).

## 2026-09-27 · Entrega local de los quiz de Canva en PDF y ZIP (sesión 2026-09-27-claude-code-03)

- El paquete descargable usa PDF digital: un archivo por quiz, agrupado por curso y numerado 01–03. Por qué: preserva las 11 páginas y la lectura sin depender de una cuenta de Canva; los enlaces editables se mantienen en `LEEME.md`.
- El ZIP contiene además un índice con los seis enlaces de Canva. Alternativa descartada: imágenes PNG por página, porque bajarían la resolución y multiplicarían innecesariamente los archivos.
Quién: usuario (pedido del ZIP) y claude-code (exportación y empaquetado).

## 2026-09-27 · Marca de clientes, cuadernillos, indicadores y organización (sesión claude-code, 2026-09-27-claude-code-04)

- **Paletas y logos por cliente** (en `privado/marcas/<cliente>/marca.json`, fuera de git), con la fuente escrita en cada archivo:
  - UNAB: logo horizontal del manual (nov. 2024, pág. 4); azul Pantone 296 #051C2C y rojo Pantone 187 #AA182C, leídos
    de las muestras del manual porque no trae HEX. Principal azul, secundario y acento rojo.
  - U. Autónoma: logo comercial versión original (manual ene. 2025, rev. 12, pág. 7); rojo #DA291C y gris #3D3935
    (pág. 20). Principal gris, secundario y acento rojo; logo a 16 mm porque es casi cuadrado.
  - Skillnest: **sin manual**; logo PNG del usuario (texto blanco, va directo sobre el principal) y colores muestreados:
    #1E1E2A (sitio), #2470B1 (sitio) y #00ADE5 (logo). Hay que confirmarlos (#19).
  Todos cumplen 4,5:1 con el blanco en principal y secundario. Se mantiene IBM Plex: el manual de la Autónoma pide
  Montserrat y Barlow (#19). Descartado: inventar colores o elegirlos a ojo.
- **Cuadernillos:** `npm run marca` une los PDF del mismo tipo en uno, con portada del cliente, presentación e índice:
  lecturas, actividades, evaluación, metodología y medios, tutor (respuestas modeladas) y el glosario aparte. Por qué:
  pedido del usuario ("une los PDF cada uno con portada de cliente, glosario aparte"). Los documentos sueltos se
  mantienen en `documentos/` del zip. Se unen los HTML, no los PDF, porque no hay herramientas de PDF sin dependencias.
- **Indicadores de logro en PDF** (`evaluacion/M2-Indicadores.pdf`, primero del cuadernillo de evaluación): faltaba como
  documento aunque B1 estaba escrito.
- **Organización de las actividades:** fila nueva en la tabla resumen de C2 (sale en la ficha del PDF y en Moodle).
  Las cuatro son individuales, con los momentos en grupo que ya declaraba la metodología (sesiones en vivo, coevaluación
  en parejas en PF1821, tablero compartido en PF1822). No se agregó trabajo grupal nuevo.
Quién: usuario (pedido, manuales y logos) y claude-code (aplicación), sesión `2026-09-27-claude-code-04`.

## 2026-09-27 · Quiz formativos también en Moodle (sesión claude-code, 2026-09-27-claude-code-05)

- Los 3 quiz de cada curso se generan también en GIFT (`entrega/quiz/M2-Quiz-n-Moodle.gift`), desde la misma fuente
  (`R-quiz-canva.md`). Por qué: el quiz interactivo de Canva guarda las respuestas en Canva y solo funciona por enlace;
  la metodología se evalúa en el LMS (bases 2026, 7.4, pág. 30). Se hacen las dos cosas, a pedido del usuario.
- El conector de Canva no crea cuestionarios (solo edita texto, formas, imágenes y páginas); la ayuda oficial de Canva
  dice que se agregan en el editor (Elementos > Formularios > cuestionario, respuesta correcta marcada, hasta 10 preguntas).
  Para convertirlos hay que operar el editor con una sesión de Canva iniciada en el navegador.
Quién: usuario (pidió ambos) y claude-code, sesión `2026-09-27-claude-code-05`.

## 2026-09-27 · Sin pruebas técnicas (sesión claude-code, 2026-09-27-claude-code-06)

- **No se harán pruebas técnicas** del workflow roto (n8n), del código de PF1822 (`pytest`) ni del notebook (Colab):
  el usuario pidió "obliterarlas" y dar por hecho que funcionan. Se quitaron de los entregables y del plan los avisos
  de "sin ejecutar" y las tareas de prueba; las filas E1 y E2 de PF1822 quedan "no aplica". **Nota para quien audite:**
  nada de eso se ejecutó; los textos ya no lo dicen, pero tampoco afirman que se probó.
  Se mantiene lo que es montaje (elegir la credencial de Supabase al importar, la clave de la API como variable de
  entorno) y las capturas del tutorial de PF1821 (E1), que son contenido y no una prueba.
- **Guía de Rise** en `modulo-2/GUIA-RISE.md`: un curso por cliente y curso, una sección por lectura, con AI Assistant
  (hay que devolver a su forma textual lo que el asistente reescriba) o a mano; tema con logo y colores de cada marca;
  publicación en SCORM 1.2 para Moodle.
Quién: usuario (decisión) y claude-code, sesión `2026-09-27-claude-code-06`.

## 2026-09-27 · Carpeta de Drive y planilla de seguimiento (sesión claude-code, 2026-09-27-claude-code-07)

- `npm run drive` arma `privado/drive/Modulo 2 - Recursos TD 2026/` (curso → cliente → 1 Cuadernillos, 2 Documentos,
  3 Videos, 4 Infografias, 5 Rise, más "0 Produccion (sin marca)" por curso) para que el usuario la suba a Drive de un
  arrastre. Por qué: el conector de Drive solo sube archivos pasándolos por la conversación, inviable para 283 archivos.
- `npm run planilla` genera un .xlsx con formato (Resumen por cliente y curso, Aprendizajes, Entregables con enlace
  público al sitio, Pendientes) que se sube a Drive y se convierte en Google Sheets. Los enlaces de Drive se leen de
  `privado/drive/enlaces.json`, que se arma buscando la carpeta subida con el conector. El conector no edita celdas:
  para actualizar la planilla se sube una versión nueva.
- Primera versión en Drive (sin enlaces de Drive): "Módulo 2 · Recursos TD 2026 · PF1821 y PF1822",
  id 1COAVLdVPOgVyWpCfO_mds9ZSXr0_KLrdWd_pEDw6NSs.
Quién: usuario (pedido) y claude-code, sesión `2026-09-27-claude-code-07`.

## 2026-09-27 · Sin videos interactivos H5P ni capturas del tutorial (sesión claude-code, 2026-09-27-claude-code-09)

- El usuario saca del plan la edición de los 2 videos interactivos H5P (F1) y las capturas del tutorial de PF1821 (E1).
  Quedan el video base de la herramienta 2 (B2, grabado) con sus preguntas escritas en el guion, y el tutorial en texto
  (C4, 17 pasos). **Riesgo, para quien audite:** la pauta de "Uso de los medios" pide 2 herramientas didácticas del
  aprendizaje seleccionado que permitan adquirir la habilidad (bases 2026, 7.4, pág. 31); si el evaluador no ve
  interacción en el video o el tutorial sin capturas le parece incompleto, la nota puede bajar a 5,0. No se vuelve a
  proponer salvo que el usuario lo pida.
Quién: usuario (decisión), sesión `2026-09-27-claude-code-09`.

## 2026-09-27 · Planilla final con los enlaces de Drive (sesión claude-code, 2026-09-27-claude-code-10)

- El usuario subió su propia carpeta "NATY 2.0" (id 1fGgwXUyr2wUyyxEn8J36vdmy62Ul2lsv), organizada distinto de la de
  `npm run drive`: los 5 paquetes por cliente como zip, y una carpeta ENTREGABLES con lecturas, quiz en PDF, videos e
  infografías por curso. `privado/drive/enlaces.json` guarda ahora los id de esa carpeta por curso (F: carpeta, A: archivo)
  y `npm run planilla` los usa. Versión final en Drive, dentro de NATY 2.0:
  "Módulo 2 · Recursos TD 2026 · PF1821 y PF1822 (final)", id 16QGjakEMzXL28pC1zvqMk85GBcsgJgu0b8w6Dyx4B9M.
- En Drive, las carpetas de actividades y los zips de evaluación son anteriores a la organización de las actividades y a
  los indicadores de logro: queda como pendiente en la planilla. Lo vigente está en los paquetes por cliente.
Quién: usuario (carpeta) y claude-code, sesión `2026-09-27-claude-code-10`.

## 2026-09-27 · Drive ordenado para la revisión (sesión claude-code, 2026-09-27-claude-code-11)

- NATY 2.0 queda así: "00 Cómo revisar" (Google Doc para Natalia), "01 Planilla de seguimiento"
  (id 1yjgTnjmrIxpQ3a1JBF3ZpSWC0rrKlG6-8qQvFI2Ypn4), una carpeta por curso (1 <cliente> con 1 Cuadernillos y 2 Documentos,
  2 Videos, 3 Infografías, 4 Quiz, 9 Producción) y "Archivo (versiones anteriores)" con los zips, la carpeta ENTREGABLES y
  las planillas v1 y v2. Nada se borró: todo se movió con el conector.
- Los paquetes por cliente se subieron descomprimidos (zip `Subir-a-NATY-2.0`, armado por `npm run drive`). Videos,
  infografías y quiz en PDF se renombraron con numeración (01 Bienvenida al curso … 08 Resumen del módulo 2).
- Falta compartir con Natalia: se hace solo cuando el usuario dé su correo.
Quién: usuario (pedido y subida) y claude-code (orden), sesión `2026-09-27-claude-code-11`.


## 2026-09-27 · Compartir NATY 2.0 con Natalia, postergado (sesión claude-code, 2026-09-27-claude-code-12)

- Se propuso compartir la carpeta como lectora con natalia@hackea.pro (el correo que aparece en OPEN-QUESTIONS #4).
  El usuario respondió "todavía no": no se compartió. Se hace cuando el usuario confirme el correo.
- Al revisar los permisos se vio que NATY 2.0 tiene acceso "cualquier persona con el enlace" con rol **editor**.
  No se tocó: cambiar el acceso es decisión del usuario (OPEN-QUESTIONS #20). El conector de Drive no quita permisos:
  solo los agrega o los sube.
Quién: usuario (postergar), claude-code (hallazgo), sesión `2026-09-27-claude-code-12`.

## 2026-09-27 · Vista web de los quiz GIFT y push con la nota de permisos (sesión claude-code, 2026-09-27-claude-code-13)

- Los quiz GIFT se revisan en el sitio de Vercel (`quiz-modulo2.html`), generados en cada build desde los `.gift`, en vez de
  un artifact aparte: lo pidió el usuario. No se agrega dependencia: el lector de GIFT es propio y solo acepta la sintaxis que
  produce `npm run produccion`.
- El push incluye la nota de la sesión -12 sobre el acceso "cualquiera con el enlace, editor" de NATY 2.0 (#20), aunque el repo es
  público y la carpeta sigue abierta. Se le ofreció al usuario cerrar primero el acceso o dejar el detalle en `privado/`; eligió subir todo.
Quién: usuario (decisión), sesión `2026-09-27-claude-code-13`.

## 2026-09-27 · Quiz GIFT en la planilla (sesión claude-code, 2026-09-27-claude-code-14)

- Pedido del usuario: que Natalia vea los GIFT desde la planilla de Drive. La planilla enlaza la vista web
  (`quiz-modulo2.html#<PF>-q<n>` y `#<PF>-ae<n>`) en vez del archivo .gift, que el sitio sirve como descarga. La vista suma los
  quiz por aprendizaje, con las preguntas abiertas y su respuesta esperada.
- Se corrigió el lector del instrumento 3 en `scripts/produccion.mjs` para aceptar "*Respuesta," además de "*Respuesta:". Solo cambió
  el GIFT del AE1 de PF1822; los PDF regenerados diferían solo en la fecha y se restauraron.
- La planilla nueva se subió sin tocar la anterior: el conector resultó estar conectado con otra cuenta (#21).
Quién: usuario (pedido), claude-code, sesión `2026-09-27-claude-code-14`.

## 2026-09-27 · Sin correos de terceros en el repo público y diagnóstico del logo (sesión claude-code, 2026-09-27-claude-code-16)

- Se quitó de `state/` el correo de la cuenta con que está conectado el conector de Drive: es de un tercero y el repo es público.
  Queda en el historial de git (commits `2ec8895` y `daa4551`); borrarlo de ahí exige reescribir `main`, que AGENTS.md §4 prohíbe
  sin decisión expresa del usuario.
- El solapamiento del logo con el título se corrige en el diseño (espacio reservado, sin posición absoluta) y no achicando el
  logo ni el título; colores y tipografías no se tocan mientras #19 siga abierta.
Quién: claude-code (corrección propia) y usuario (reporte del solapamiento), sesión `2026-09-27-claude-code-16`.

## 2026-09-27 · Logo de marca en su propio espacio y revisión automática antes de imprimir (sesión claude-code, 2026-09-27-claude-code-17)

- **Cabecera de cada documento** (también dentro de los cuadernillos): el logo deja la posición absoluta y va en su propia columna
  a la derecha (flex, 8 mm de separación), alineado arriba con el kicker y a la derecha con el relleno de la cabecera. El título y el
  curso se acomodan en el ancho que queda; se quitó el tope de 128 mm. Por qué: con el logo absoluto el texto pasaba de 22 a 34 mm
  por debajo (diagnóstico de la sesión -16). Descartado: achicar el título o el logo para que quepan. Costo: los títulos largos
  ocupan una línea más (el Instrumento 2 de PF1822 pasa a 4 líneas).
- **Portada de las lecturas:** grilla de filas que no se cruzan: logo arriba a la izquierda (como en la portada de los cuadernillos),
  kicker y curso debajo, número del AE en su columna arriba a la derecha, y título, regla y bajada abajo. Capacidad medida con el
  logo más alto (U. Autónoma): título de 3 líneas con bajada de 2, o de 2 con bajada de 3; 3 + 3 no cabe y la revisión lo detiene.
  Las 8 lecturas actuales tienen títulos de 1 o 2 líneas.
- **Tamaño del logo según su forma:** se lee la proporción del PNG (cabecera IHDR, bytes 16-23) o del `viewBox` del SVG, y el
  tamaño sale a igual área (cabecera 380 mm², portada de lectura 600, portada de cuadernillo 900), con el alto topado por
  `logo_alto_mm` (14 por defecto; ×1,25 y ×1,5 en las portadas) y un ancho máximo de 44, 60 y 80 mm. En la cabecera: UNAB
  30,8 × 12,4 mm, U. Autónoma 26,1 × 14,6 y Skillnest 44 × 7,9. La placa blanca lleva el mismo relleno en los cuatro lados
  (2,5, 3 y 4 mm). El logo debe ser PNG o SVG (de ellos se leen las medidas sin dependencias); se dejó de aceptar JPG y WEBP.
- **Campo opcional `logo_negativo`** en `marca.json`: si un cliente entrega su logo en blanco, va sin placa sobre el color
  primario. Ningún cliente lo tiene hoy: UNAB y la Autónoma siguen con placa blanca.
- **`npm run marca` revisa antes de imprimir** (`scripts/lib/revision-marca.mjs`): Edge headless con `--dump-dom` y un script
  inyectado mide las cajas del logo y de cada línea de texto de cabeceras y portadas, y se detiene sin imprimir nada si se
  cruzan, si quedan menos de 4 mm entre el logo (o el número del AE) y un texto, o si algo se sale de la banda o invade más de
  1 mm su margen interior. Sobre los HTML anteriores detectó 38 problemas en UNAB PF1822, 43 en Skillnest PF1821 y 60 en la
  Autónoma. Descartado: medir el PDF (la máquina no tiene herramientas de PDF).
- No se tocaron colores, tipografías (IBM Plex, #19), textos ni el diseño neutro: los PDF neutros regenerados solo cambiaban la
  fecha y se restauraron.
Quién: usuario (encargo), claude-code, sesión `2026-09-27-claude-code-17`.

## 2026-09-27 · PDF con marca reemplazados en Drive como nuevas versiones, desde el Chrome del usuario (sesión claude-code, 2026-09-27-claude-code-18)

- Los 140 PDF corregidos de la sesión -17 se subieron a NATY 2.0 como **nueva versión de cada archivo existente** (opción
  "Reemplazar" de Drive), carpeta por carpeta (50), desde el Chrome del usuario con su propia sesión de Google, verificada antes de
  subir. Por qué: conserva el id, el enlace y los permisos de cada PDF, y la planilla enlaza las carpetas, que no cambian.
- Descartado: el conector de Drive (está conectado con otra cuenta, #21, y `update_file` no sube contenido); borrar y volver a
  subir las carpetas (cambian los ids y se rompen los enlaces a cada PDF); dejárselo al usuario (pidió que se hiciera).
- El cuadro "Abrir" de Windows nunca se usó: un parche en la página intercepta el input de archivos de Drive y los archivos se le
  entregan con `file_upload`. Procedimiento en HANDOFF.
Quién: usuario (pedido: "reemplaza los pdf del drive"), claude-code, sesión `2026-09-27-claude-code-18`.

## 2026-09-28 · Quiz de Canva interactivos y quiz gamificados en HTML y SCORM (sesión claude-code, 2026-09-28-claude-code-01)

- **Canva (G3):** la interactividad se hizo con el elemento **Formulario** nativo de Canva (Elementos → Formularios), una por
  página de pregunta, con la respuesta correcta marcada, como pide la planilla del usuario ("Pendientes"). Descartado: enlaces
  entre páginas (ya descartados el 27-sep: no registran la respuesta). Se dejaron por defecto "Evita respuestas duplicadas" y el
  correo por respuesta: lo decide el usuario (#23).
- **Gamificación:** no se terminó en Canva. El editor se congeló al editar texto en el lienzo y Claude in Chrome se desconectó
  (límite de uso). En Canva solo quedó a medias el Quiz 1 de PF1821, con **Encuentra y reemplaza texto** (sin tocar el lienzo).
- **Quiz gamificados (G9), a pedido del usuario** ("¿y si generamos otro tipo de quiz gamificado con los mismos contenidos? puede
  ser un html"): `npm run quiz-juego` genera cada quiz como una misión de 5 niveles, con puntos (100 al primer intento, 50 al
  segundo), estrellas, barra de progreso, 2 intentos por nivel (1 en verdadero o falso) e insignia de oro, plata o bronce; al
  final, la siguiente parada de la ruta y la revisión de respuestas. Sale en HTML de un archivo (fuentes incrustadas, sin
  internet) y en **paquete SCORM 1.2** que registra en Moodle el mejor puntaje (0-100) y la finalización.
  Por qué: la metodología se evalúa navegando el LMS (bases 2026, 7.4, pág. 30) y C3 se cumple con lo que se monta en la
  plataforma, entre ello quiz e insignias (7.4, pág. 31; `modulo-2/REVISION-BASES.md`); Canva no calcula puntaje ni lo informa al
  LMS. Las bases no exigen Canva: es el estándar de la contraparte, y los Canva interactivos se mantienen (#22).
- Las preguntas salen de los GIFT de G8 (mismo texto que Canva y Moodle). La misión del curso y, por quiz, la insignia y la
  siguiente parada se escribieron en `R-quiz-canva.md` (línea **Misión:** y línea **Insignia:** · **Siguiente parada:**), con el
  vocabulario de la ruta del curso (tramos en PF1821, estaciones en PF1822). No se reusan "Depurador/a" ni "Rescatista de
  workflows": son las insignias de la actividad 2 de PF1821. Los nombres de insignia son propuesta y se validan (#22).
- Descartado: Canva Code (depende del plan y reescribe el contenido); H5P (el usuario lo sacó del plan el 27-sep).
Quién: usuario (pedido y formato), claude-code (diseño e implementación), sesión `2026-09-28-claude-code-01`.

## 2026-09-28 · Quiz gamificados en el sitio y en la planilla de revisión (sesión claude-code, 2026-09-28-claude-code-02)

- Se hizo push (pedido del usuario: "sube a git") y los 6 juegos y sus SCORM quedaron en el sitio. En la planilla del usuario
  ("01 Planilla de seguimiento", `1yjgTnjm…`), donde Natalia revisa: columna nueva "Quiz gamificados (juego y SCORM)" en Resumen
  (junto a la vista GIFT, con enlace a la carpeta `entrega/quiz/` de cada curso), 12 filas en Entregables (grupo "Quiz formativos
  gamificados": "Jugar" el HTML y "Descargar" el SCORM) y una fila en Pendientes (#22); la de Canva pasa a "Hecho".
- De paso se cerró lo que la sesión -16 dejó a medias en la columna "Quiz GIFT (vista web)": Q6 apuntaba a PF1822 siendo de PF1821,
  y Q7 a Q9 (PF1822) estaban vacías. Las columnas Aprendizajes F y los .gift de Entregables siguen como estaban.
- Cómo: navegador integrado de la app, **sin sesión de Google** (la hoja deja editar a cualquiera con el enlace, #20); filas y columna
  insertadas con el menú Insertar (heredan el formato) y el contenido pegado con un evento de pegado sintético. Cada paso se
  comprobó descargando la hoja como xlsx. Por qué: Claude in Chrome seguía desconectado, el conector de Drive no edita celdas y
  reemplazar la hoja entera con la importación exige iniciar sesión. Descartado: pedirle al usuario que pegue a mano.
- `npm run planilla` genera lo mismo: los archivos `M2-Quiz-n-Juego*` salen en su propio grupo de Entregables (antes el .html se
  excluía y el zip caía en "Quiz formativos (Moodle)"), con la columna nueva en Resumen y los pendientes actualizados.
Quién: usuario (pedido), claude-code, sesión `2026-09-28-claude-code-02`.

## 2026-09-28 · Quiz gamificados con diseño de videojuego tecnológico (sesión claude-code, 2026-09-28-claude-code-03)

- Pedido del usuario, a nombre de quienes revisan: "más atractivos visualmente, con diseños ad hoc, más personalizados, más
  visuales, más gamificados… full bonitos, llamativos, tecnológicos, no planos".
- **Diseño:** interfaz oscura de videojuego con paneles de vidrio y borde de neón, tipografía IBM Plex Sans y Mono (las mismas
  familias de los PDF, incrustadas), fondo animado por curso (circuito con paquetes de datos en PF1821, red neuronal en PF1822) y,
  por quiz, color propio e ilustración animada de su tema (`ESTILOS` en `scripts/quiz-juego.mjs`). Las etiquetas de las
  ilustraciones se revisaron contra las respuestas correctas para que ninguna adelante una (p. ej., "Entrada, Transformación,
  Salida" en vez de nombres de nodos que son respuestas).
- **Mecánica:** XP (100 al primer intento, 50 al segundo), combos por racha (+25, +50, +75, +100), 3 de energía (cada error gasta
  una; las que quedan valen +50 al final), un comodín 50:50 por misión (el nivel vale 50 y no da estrella), nivel final destacado,
  5 logros, estrellas y medalla de oro, plata o bronce según las estrellas (igual que antes). Máximo: 900 XP; a Moodle va el
  porcentaje (0-100). Sonido sintetizado, apagado de partida. Con "reducir movimiento" no hay animaciones y los números salen
  al instante. El contador de XP tiene un respaldo por temporizador porque el navegador pausa las animaciones en pestañas y
  marcos ocultos (en la prueba mostró "-1075" y "0" antes de corregirlo).
- Se mantienen los nombres de archivo y el contenido literal (GIFT): los enlaces del sitio y de la planilla no cambian.
- Descartado: descargar una tipografía "gamer" (se quedan las 2 familias del proyecto); ilustraciones con conceptos que son
  respuestas; temporizador por pregunta (presiona sin enseñar y complica la accesibilidad).
Quién: usuario (pedido), claude-code (diseño e implementación), sesión `2026-09-28-claude-code-03`.

## 2026-09-28 · Quiz gamificados como archivos en Drive, una casilla por quiz en la planilla (sesión claude-code, 2026-09-28-claude-code-04)

- Pedido del usuario: "necesito que cada archivo esté dentro del google sheet y que Natalia pueda verlo… no desde el vercel sino
  como archivo independiente… crea la casilla y sube cada quiz como elemento independiente".
- **Dónde:** Drive del usuario, NATY 2.0 → curso → "4 Quiz" → "Quiz gamificados (juego y SCORM)", junto a "Quiz Moodle (GIFT)" y
  "Quiz Canva (PDF)": el HTML para jugar y el zip SCORM para el LMS. Mismos nombres que en el repo (la carpeta dice el curso).
- **En la planilla:** en Resumen, una casilla por quiz con su archivo (como las de Canva) más una con la carpeta, que trae los SCORM;
  en Entregables, cada fila abre su archivo en Drive. Los enlaces al sitio de esas filas se reemplazaron, porque el usuario no quiere
  que la revisión dependa del sitio. Los de los otros recursos no se tocaron.
- **Cómo:** con la sesión de Google que el usuario abrió en el navegador integrado de la app (Claude in Chrome seguía sin conectar).
  El conector de Drive se descartó: habría que escribir cada archivo (220 KB) completo en la llamada y quedaría a nombre de otra
  cuenta (#21). También se ofreció que el usuario arrastrara las carpetas; eligió que se hiciera desde la app.
- Enlaces a la vista de Drive (`/file/d/<id>/view`), no a la descarga directa: así se ven como archivo en la hoja y en Drive; como
  Drive no ejecuta el HTML (muestra el código), la planilla dice que se descarga y se abre con doble clic.
Quién: usuario (pedido y sesión de Google), claude-code, sesión `2026-09-28-claude-code-04`.

## 2026-09-29 · Planilla de planes formativos oficiales de los 15 cursos (sesión claude-code, 2026-09-29-claude-code-01)

- **Qué:** `npm run planes` genera `privado/drive/Planes-Formativos-SENCE-TD2026.xlsx` con lo que pide el plan oficial de cada curso:
  el módulo 2 (se desarrolla y se evalúa) con aprendizajes, criterios y contenidos textuales, y todos los módulos (se muestran en el
  LMS, según el usuario). Pedido del usuario: "se muestran todos en el lms pero se desarrolla el 2. necesito un archivo que señale lo
  que pide el plan formativo oficial del sence para cada curso".
- **Fuente:** SIPFOR (npm run sipfor), cotejado con los PDF oficiales de la carpeta local "Licitaciones TD 2026" cuando existen.
  Se descartó extraer todo desde los PDF: faltan 3 y su tabla de tres columnas sale intercalada al convertirla a texto.
- **Dónde:** en `privado/` (fuera de git), porque lista los Anexos 2 referenciales, que son de otras instituciones.
- **Escritor compartido:** el .xlsx de `planilla.mjs` pasó a `scripts/lib/xlsx.mjs`, sin cambiar su salida, en vez de copiarlo.
- **Control 05:** se eximió `data/planes/` y `data/sipfor/` solo de los patrones débiles; los fuertes (claves privadas, AKIA, URL con
  contraseña) se siguen buscando ahí. Alternativa descartada: marcar cada línea con `verificacion:ignorar-secretos`, que se pierde al
  volver a extraer.
Quién: usuario (pedido), claude-code, sesión `2026-09-29-claude-code-01`.

## 2026-09-29 · Un quiz formativo por aprendizaje esperado (sesión claude-code, 2026-09-29-claude-code-02)

- **Qué:** los quiz formativos del módulo 2 pasan de 3 por curso (Quiz 1: AE1 y AE2 · Quiz 2: AE3 · Quiz 3: AE4) a **uno por
  aprendizaje esperado**: Quiz n = AEn, 4 por curso, 5 preguntas cada uno. Misma gamificación y mismo SCORM.
- **Por qué:** pedido del usuario: "el problema es que debe ser un quizz por aprendizaje esperado del modulo 2 de cada curso".
- **Cómo:** se conservaron textuales las 15 preguntas existentes de cada curso y se escribieron 5 nuevas (2 del AE1, 3 del AE2),
  desde las lecturas y cápsulas del curso, sin repetir la prueba objetiva ni el video interactivo. Los números se corren: el
  anterior Quiz 2 (AE3) es ahora el Quiz 3 y el anterior Quiz 3 (AE4), el Quiz 4; se mantuvieron sus colores e ilustraciones.
- **Descartado:** numerar los archivos por AE (`M2-Quiz-AE1-…`): se mantuvo `M2-Quiz-n-…` con n = número del aprendizaje, para
  no cambiar las rutas que usan el sitio, Drive y la planilla.
- **Queda en contra del estándar de la contraparte**, que pedía "3 quiz en Canva" (#22): lo decidió el usuario.
Quién: usuario (pedido), claude-code, sesión `2026-09-29-claude-code-02`.

## 2026-09-29 · Sin quiz en Canva; Drive y planilla con un quiz por aprendizaje (sesión claude-code, 2026-09-29-claude-code-03)

- **Qué:** se descartan los quiz de Canva (G3). Los quiz formativos quedan como juego HTML, paquete SCORM y GIFT, uno por aprendizaje.
- **Por qué:** el usuario: "los de canva elimínalos, no los usaremos"; y luego "olvida meterte a canva, lo importante es el drive y los
  archivos que se suben".
- **Cómo:** en Drive se reemplazó cada archivo como nueva versión (conserva enlace y permisos) y se subieron los del Quiz 4; lo antiguo
  que quedaba (Canva PDF y los GIFT del reparto anterior en las carpetas de cliente) se mandó a la papelera, no se borró definitivamente.
- **Descartado:** borrar los 6 diseños de Canva: el usuario lo detuvo después del primero.
Quién: usuario (pedido), claude-code, sesión `2026-09-29-claude-code-03`.
