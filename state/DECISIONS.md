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
