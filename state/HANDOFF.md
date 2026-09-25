# HANDOFF

**De:** claude-code (opus-5.5) · sesiones `2026-09-24-claude-code-01` a `-06` y
`2026-09-25-claude-code-01` a `-10` — 2026-09-24/25
(sobre el handoff de las sesiones `2026-09-22-claude-code-01` y `-02`, que sigue vigente abajo)
**Para:** la siguiente sesión, sea cual sea, **incluida otra IA sin terminal**

## PRIMERO: recursos base del módulo 2 de PF1821 y PF1822 (meta del usuario: 25-sep temprano)

La prioridad del proyecto ahora es esta, por encima de "Tu primera tarea" más abajo.
**El alcance es solo de recursos base, neutros y listos para subir.** Nada de LMS, nada de
redactar el Anexo 2 y nada por institución: eso viene después (DECISIONS, 2026-09-25).

1. **Abre `modulo-2/FLUJO-PRODUCCION.md`.** Reparte el trabajo en seis carriles paralelos por
   herramienta: A automático, B video (HeyGen), C diseño, D texto IA, E técnico e F interactivo H5P.
2. **El carril A ya está hecho** y su resultado está en `modulo-2/<curso>/entrega/`: quizzes
   GIFT, **las 8 lecturas en PDF**, 9 PDF de evaluación, actividades, insumos, código `.py`,
   cuadro comparativo y textos para el Anexo. Se rehace con `npm run produccion -- PF1821 PF1822`.
3. **Toma una fila `pendiente` de tu carril** en `modulo-2/<curso>/produccion/ESTADO.md`.
   Primero las ★ (AE3, el aprendizaje seleccionado). Déjala `listo para revisión` con su
   archivo o enlace y agrega una línea al registro. Los videos y los `.h5p` van a Drive: git
   los ignora.
4. **Qué cumple cada curso y por qué el AE3:** `modulo-2/REVISION-BASES.md`.
5. **La carpeta local "Licitaciones TD 2026"**, junto al repo y no dentro, tiene el molde del
   Anexo 2: `Anexos 2 V0 y revisión/`. No la copies al repo: es público y trae propuestas de
   otras instituciones.

Trampas de estas sesiones:
- **Sitio en Vercel:** https://naty-proyecto01.vercel.app se reconstruye en cada push con `npm run sitio`
  (`vercel.json`). Si agregas páginas a `modulo-2/` o a los contenidos del módulo 2, salen solas;
  para publicar otra carpeta, agrégala a `RAICES` en `scripts/sitio.mjs`. Antes de subir, prueba con
  `npm run sitio` y revisa que no queden enlaces rotos.
- **Hay dos proyectos de Vercel conectados al mismo repo** (`naty-proyecto01` y `naty.proyecto01`):
  cada push despliega dos veces. El usuario debería borrar uno en el panel de Vercel; desde el repo no
  se puede.
- **Las URL de cada despliegue piden iniciar sesión en Vercel** (protección de despliegues). La URL
  pública es la de producción, la que termina en `.vercel.app` sin el hash.
- **Las videocápsulas se generan textuales y se validan solas.** Si editas `R-capsulas.md`, la columna
  "Contenido del plan (textual)" tiene que ser copia exacta de la ficha y cubrir todos los contenidos
  del AE, o `npm run produccion` se detiene y dice qué falta. El usuario ya tiene las cápsulas nuevas
  en zip (`videocapsulas-revisadas-modulo2.zip`).
- **Infografías:** el usuario tiene los prompts nuevos (zip `infografias-modulo2.zip`, el mismo del sitio).
  Traen el alto calculado para cada contenido. Si cambias el texto de una cápsula, regenera y reenvía:
  el alto y las secciones cambian. Ninguna infografía debe volver a 1080 × 1920 si no cabe.
- **Lecturas:** la fuente es `contenidos/<PF>/modulo-2/lecturas/AEn.md` (formato en la cabecera de
  `scripts/lib/lectura.mjs`). Para rehacer solo los PDF, sin tocar los PPTX:
  `npm run produccion -- PF1821 PF1822 --solo-lecturas`. Si falta un contenido del plan, un ejemplo
  por sección, las 3 preguntas o los 8 términos, o si una línea de código pasa de 78 caracteres, no se
  imprime y el mensaje dice qué corregir. Las 2 fuentes (IBM Plex Sans y Mono, OFL) están en
  `scripts/fuentes/` y van incrustadas: no uses caracteres fuera del latín básico (≥, ≈, ✔), porque
  obligarían a usar una tercera fuente; la revisión los rechaza. La flecha → sí se puede usar: se dibuja.
  El control 05 toma por credencial la palabra clave seguida de dos puntos o de un signo igual, incluso en un ejemplo: en el código usa `clave_api`.
  El usuario ya tiene el zip `lecturas-modulo2.zip`, el mismo del sitio.
- **Videos e infografías (sesión -09):** el usuario ya hizo los 12 videos base (bienvenida, 4 videocápsulas
  y video de la herramienta 2, por curso) y las 10 infografías: están `listo para revisión` en los ESTADO, a
  nombre del usuario. No los regeneres ni reenvíes prompts o PPT: el trabajo está hecho con los que tiene. Faltan
  los enlaces de Drive de los videos, los PNG en `entrega/AEn/` y `entrega/00-bienvenida/`, y editar el
  interactivo (F1). Lo que sigue del lado de la IA: notebook de PF1822 (D3★), workflow roto (E2★) y tutorial
  (E1★) de PF1821.
- **Herramientas didácticas (sesión -10):** las dos de cada curso son del AE3, y cada C4 trae la tabla de
  cobertura. No vuelvas a poner en la ruta una herramienta fuera del tramo 3: la pauta pide herramientas
  "para trabajar los diferentes contenidos del aprendizaje esperado seleccionado" (7.4, pág. 31).
  - El notebook de PF1822 sale de `contenidos/PF1822/modulo-2/notebook/M2-Herramienta-1-Notebook.md`
    (`scripts/lib/notebook.mjs`). No se ha ejecutado: falta probarlo en Colab (E1 del ESTADO).
  - Las escenas del guion de la herramienta 2 (tabla "Tiempo | Pantalla | Locución") son las del video que el
    usuario ya grabó: **no las cambies**. Solo cambiaron las preguntas, que se agregan en H5P.
  - El tutorial de PF1821 (E1) está diseñado en C4 (17 pasos); falta tomar las capturas en n8n.
- **Horas de las lecturas en la metodología:** el usuario pidió dejarlo pendiente (sesión -09). No lo cambies
  sin su decisión.
- **Pendientes que dejó la sesión -08 (sin pedido del usuario, no los hice):** 1) la tabla de actividades
  de `C-metodologia.md` no nombra las lecturas; si el Anexo 2 las declara como actividad asincrónica
  "Lectura", hay que darles horas dentro de las 18 y 21 h. 2) El cuadro R04 de PF1822 dice "búsqueda
  semántica del módulo 3 del plan", pero según la ficha, la recuperación con almacenamiento vectorial es
  `MA04578`, que la ficha lista 4.° (orden por confirmar). Las lecturas nombran los módulos, no su número.
- **`npm run produccion` reescribe los PPTX aunque no cambien:** la fecha va dentro del zip.
  Si solo cambiaste prompts o PDF, restaura los PPTX con `git checkout HEAD -- modulo-2/*/produccion/videos/`
  antes del commit, para no subir binarios idénticos.
- **El usuario ya tiene los 12 PPT (carril B) y los 10 prompts de infografía (carril C) en zip.**
  Si los regeneras con cambios, avísale: los que tiene quedan desactualizados.
- **El `hoy()` de `npm run sesion` es UTC.** A las 22:00 en Chile ya es el día siguiente, y
  el checkpoint tiene que decir esa fecha.
- **Rutas en `node -e` desde Git Bash:** pasa `cygpath -m <ruta>`. Node recibe la ruta estilo
  `/c/Users/...` tal cual y la resuelve mal, con una carpeta `c` de más.
- **Moodle lee el GIFT como HTML:** por eso `produccion.mjs` escapa `<` y `>`. Si editas un
  `.gift` a mano, `<clave>` desaparece.

## Lo nuevo del 25-sep (UTC), sesión -01

- **Sección `modulo-2/` en el repo**, pedida por el usuario: una portada y una carpeta por
  curso (`PF1821-agentes-low-code/`, `PF1822-desarrollo-con-ia/`). Cada una tiene un README
  con el checklist de lo que piden las bases para el módulo 2, citado a numeral y página
  (7.4 págs. 27–31, Anexo N°2 pág. 90, Anexo N°7 págs. 99–111), y el zip de sus recursos.
  **Las casillas se marcan solo cuando una persona revisó el recurso.** Hoy están todas vacías.
- **`npm run zip -- PF1821 --salida modulo-2/PF1821-agentes-low-code`** regenera el zip: un
  Markdown por recurso, R01 a R13. Regéneralo cada vez que cambie `contenidos/<PF>/modulo-2/`.
- **Si cambias un recurso, revisa también el README de su curso en `modulo-2/`.** Repite a
  mano datos de `01-entregables.md` y `02-recursos.md` (nombres, cantidades, pendientes).
- **Todo está en el remoto público** desde el commit `1eaf1b8`. Trabaja con `git pull`
  antes de abrir sesión y `git push` después de cerrarla.

## Lo nuevo del 24-sep

- **Hito del día: contenido del módulo 2 de PF1821 (Agentes low code) y PF1822 (Desarrollo
  con IA).** Extraídos de SIPFOR con `npm run sipfor`; ficha y entregables en
  `contenidos/<PF>/modulo-2/`. Módulo 2 = `MA04560` (18 h) y `MA04576` (21 h), con 4
  aprendizajes esperados cada uno. Ojo con `OPEN-QUESTIONS.md` #16: así se cuenta si el
  módulo transversal de orientación es el primero.
- **PDF único para Natalia:** `entregables/2026-09-24-modulo2/modulo2-PF1821-PF1822-completo.pdf`
  (ficha SIPFOR + entregables + kit, por curso). Se regenera con `npm run kit ... --unico`.
- **Kit de recursos educativos en borrador para PF1821 y PF1822** (`contenidos/<PF>/modulo-2/`,
  PDF en `entregables/2026-09-24-modulo2/kit-recursos-modulo2-PF18xx.pdf`). Casos ficticios:
  *Mercado Austral* (PF1821, n8n) y *Nube Sur* (PF1822, Python). Siguiente paso: revisión de
  Natalia (etapa 3 de `docs/05`); después `IV-actividades.md` y ejecutar el código de PF1822
  con `pytest` en una máquina con Python.
- **Manual PDF para Natalia** con todo lo que hay que entregar en el módulo 2 de los dos cursos:
  `entregables/2026-09-24-modulo2/manual-entregables-modulo2-PF1821-PF1822.pdf`. Sus
  "sugerencias para este módulo" son propuestas a validar, no contenido aprobado.
- ~~Todo queda en local por ahora.~~ Superado el 25-sep: el usuario pidió subir todo.

- **Todo el proyecto vive ahora en el repo.** Los entregables del 24-sep están en
  `entregables/2026-09-24-modulo2/` y los PDF de las bases en `bases/`. La carpeta de
  arriba del repo ya no tiene nada del proyecto, salvo `licitacion-td-2026.zip`, que es
  idéntico al commit `init` (se comprobó con diff) y por eso no se versionó.
- **El remoto es https://github.com/dojedacifuentes/naty.proyecto01 y es público** por
  decisión del usuario (`DECISIONS.md`, 2026-09-24). Todo lo que empujes lo ve cualquiera:
  antes de versionar algo de un cliente, pregúntate si aguanta ser público. Trabaja con
  `git pull` antes de abrir sesión y `git push` después de cerrarla.
- **El panel del módulo 2 de ML y Agentes** es un artifact con estado compartido
  (https://claude.ai/artifact/BpgYipB5aa4YY8c4LGiDuP). Su código está en el repo; su
  estado no, vive en la base del artifact.

## Contexto mínimo

El repositorio ya existe como repo git y el trabajo de la sesión inicial está intacto en
el commit `init`. Lo que agregué es la maquinaria: ocho controles automáticos
(`npm run verificar`), un sistema de handoff que registra y verifica cada sesión
(`npm run sesion`), y el protocolo para que una herramienta audite a otra (`AUDITORIA.md`).

Auditar la sesión inicial fue el estreno del sistema: veredicto **observaciones**, con
cinco hallazgos en `state/auditorias/2026-09-22-cowork-01--por-claude-code.md`. Tres de
ellos son trabajo concreto y corto que conviene hacer antes de escribir propuestas.

No escribí ninguna propuesta ni toqué SIPFOR. La tarea que dejó la sesión inicial sigue
pendiente y es la que más mueve el proyecto.

## Lo que dejé listo

- `npm run verificar` → ocho controles, sin dependencias. Corre también en cada commit
  (hook) y en cada push (GitHub Actions). Hoy: 0 errores, 4 avisos.
- `scripts/checks/` → un archivo por control. Agregar uno es agregar un archivo; el
  orquestador los descubre solo.
- `templates/anexo2-esqueleto.md` → ahora lleva marcadores `<!-- verificable: -->`. Por
  eso el control 03 puede decir "D3: 4 de 10 para 7.0" en vez de "revisa la sección VII.c".
  **No los borres al copiar la plantilla.**
- `npm run sesion -- abrir|cerrar|estado|auditar|veredicto` → el protocolo de `AGENTS.md` §5
  hecho comando. El cierre se niega si falta el checkpoint, el handoff o tu log.
- `state/LEDGER.csv` → quién trabajó, desde qué commit, con qué resultado, quién lo auditó
  y la huella `sha256` de `state/`. Ahí se ve si alguien editó el estado fuera del protocolo.
- `AUDITORIA.md` → cómo se audita entre herramientas y qué significa cada veredicto.
- Los scripts de Python están portados a Node y verificados contra la salida del original.

## Lo que NO alcancé y dónde quedó exactamente

- **Extracción de SIPFOR**: nadie ha bajado los 15 planes formativos. Es el insumo
  principal del motor y no depende de nadie externo. Sigue siendo la tarea más productiva.
- **Mis dos sesiones no están auditadas.** Escribí el sistema de verificación y lo probé
  yo mismo, que es exactamente lo que `AUDITORIA.md` §1 advierte que no sirve. Falta que
  lo revise Codex, Cursor o una persona.
- **Los tres hallazgos de la auditoría que son trabajo corto** (informe completo en
  `state/auditorias/`):
  1. `data/clientes.csv` afirma un `eje_diferenciador` para los seis clientes sin declarar
     fuente, teniendo `ficha_completa=no`. Falta una columna `fuente`, o marcarlo
     `PENDIENTE:`. Importa porque de ahí sale la narrativa del ítem D, que pesa 35%.
  2. y 3. Citas sin numeral ni página en `docs/03-anexo2-estructura.md:41` y `:43`, y en
     `docs/04-verificadores-protocolo.md:17` — las tres afirman una causal de rechazo.
     El texto citado es real; falta abrir el PDF de las bases y poner la referencia.
     Son diez minutos y dejan el repositorio en verde del todo.
- **Pasos 5 y 6 del prompt A sin hacer:** etiquetas, un issue por pregunta abierta e hito
  "Fase 0" en GitHub. Con el repo público, los issues también lo son: confírmalo con el
  usuario antes de crearlos.

## Tu primera tarea

Depende de qué herramienta seas. Una sola, no elijas ambas:

**Si eres Codex, Cursor o una persona** → audita las dos sesiones de Claude Code:

```bash
npm run sesion -- auditar 2026-09-22-claude-code-01 --herramienta codex
npm run sesion -- auditar 2026-09-22-claude-code-02 --herramienta codex
```

El informe sale con la evidencia ya recopilada; tú respondes las cinco preguntas con
archivo y línea. Mira con especial desconfianza `scripts/checks/03-rubrica.mjs` (¿cuenta
bien lo que dice contar?) y `scripts/lib/texto.mjs` (¿el umbral de similitud discrimina
de verdad, o pasa cualquier cosa?). Un buen ataque: escribe dos propuestas parecidas a
propósito y mira si el control las caza. Después registra el veredicto.

**Si eres Claude Code otra vez** → no puedes auditarte. El hito del 24-sep es el
contenido del módulo 2 de **PF1821** y **PF1822**. La extracción ya está hecha
(`data/planes/`) y cada curso tiene su ficha y su lista de entregables en
`contenidos/<PF>/modulo-2/`. Sigue el flujo de `docs/05-flujo-contenidos-modulo.md`,
etapa 2, un archivo por entregable y en el orden de esa tabla, empezando por
`B1-indicadores.md`. Encarga cada archivo con `templates/encargo-entregable.md`.

Para los otros 13 planes basta `npm run sipfor -- --todos` y `npm run ficha -- <PF>`:
el extractor ya no necesita scraping (ver `DECISIONS.md`, 2026-09-24).

Los tres hallazgos cortos de la auditoría (columna `fuente` en `clientes.csv` y las tres
citas) siguen pendientes y siguen siendo diez minutos.

## Trampas que me encontré

- **El Bash de esta máquina interpreta las barras invertidas de los comandos.** Un `"\|"` o
  `'\u0001'` dentro de `node -e` o de un heredoc puede llegar al archivo ya convertido (o no
  llegar). Para texto con barras invertidas usa la herramienta de edición, no `sed` ni `node -e`.
- **El control 05 lee "Clave:" y `api_key =` como credenciales.** En pautas de respuesta usa <!-- verificacion:ignorar-secretos -->
  "Respuesta:"; en código de ejemplo, nombres como `clave_api` y lecturas desde `os.environ`.

- **SIPFOR repite a veces el aprendizaje como criterio.** En PF1821, el criterio 3.1 es
  idéntico al AE3. Es así en la fuente: no lo "corrijas", pero no lo uses como indicador.
- **Los contenidos de PF1822 traen asteriscos a mitad de línea** ("… SIRVE. *DIFERENCIAS").
  El extractor solo separa ítems al inicio de línea; el texto queda completo y textual.

- **`gh` no está en el PATH.** Se instaló como release oficial en la carpeta de programas
  del usuario (`%LOCALAPPDATA%/Programs/gh/bin/gh.exe`) sin tocar variables de entorno.
  Llámalo por esa ruta o pide permiso para agregarlo al PATH.
- **`OPEN-QUESTIONS.md` solo acepta ABIERTA, RESUELTA, CERRADA o DESCARTADA** como estado
  (control 07). Una respuesta parcial se escribe "ABIERTA · respuesta parcial".

- **No hay Python en esta máquina** (ni `python`, ni `python3`, ni `py`). Por eso las
  herramientas son Node. Si escribes un script, que sea `.mjs` sin dependencias.
- **El sitio de SIPFOR es ASP.NET con postbacks**: el scraping directo puede requerir
  mantener ViewState. Si se complica, descargar los PDF de cada plan y parsearlos es una
  ruta válida — anótala en `DECISIONS.md` si la tomas.
- Hay **15 planes pero solo 14 códigos distintos de línea**: PF1483 y PF1487 tienen las
  mismas horas (210) pero son planes distintos. No los deduplique nada.
- **`git checkout -- <archivo>` restaura desde el índice, no desde HEAD.** Si algo ya
  está staged, te devuelve la versión mala. Usa `git checkout HEAD -- <archivo>`. Me costó
  un commit rechazado por el hook.
- **El hook de pre-commit no se instala solo** en un clon nuevo: `npm run hooks`.
- Los informes generados (`state/verificacion.json`, `state/diferenciacion.csv`) están en
  `.gitignore` a propósito: cambian en cada corrida y ensucian los diffs.

## Lo que NO debes tocar

- **La contradicción "segundo módulo" vs. "todos los módulos"** (`OPEN-QUESTIONS.md` #1).
  Sigue abierta. Trabaja asumiendo el segundo módulo, pero no borres la alternativa ni
  reescribas `docs/` como si estuviera resuelta.
- **`data/rubrica-subcriterios.csv`**: solo se cambia con cita a numeral y página, y
  dejando registro en `DECISIONS.md`. El control 02 verifica que los pesos sigan cuadrando.
- **Los marcadores `<!-- verificable: -->`** de la plantilla del Anexo 2. Si los borras, el
  control de cobertura deja de contar y nadie se entera hasta que sea tarde.
- **`state/LEDGER.csv` a mano.** Lo escriben los comandos de `npm run sesion`. Si lo editas
  a mano, la huella deja de cuadrar y la próxima sesión va a pensar que alguien manipuló el
  estado — que es exactamente para lo que sirve.
