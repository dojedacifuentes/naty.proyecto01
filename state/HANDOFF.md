# HANDOFF

**De:** claude-code (opus-5) · sesiones `2026-09-22-claude-code-01` y `-02` — 2026-09-22
**Para:** la siguiente sesión, sea cual sea

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
- **El repo no está en GitHub**: `gh` no está instalado en esta máquina y, además, hay que
  decidir en qué cuenta vive y quién tiene acceso (`OPEN-QUESTIONS.md` #14). El prompt A de
  `PROMPT-CLAUDE-CODE.md` deja los pasos listos.

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

**Si eres Claude Code otra vez** → no puedes auditarte. Haz los tres hallazgos cortos de
la auditoría (columna `fuente` en `clientes.csv` y las tres citas) y sigue con SIPFOR:

Extraer el **segundo módulo** de los 15 planes formativos desde
https://sipfor.sence.cl/Planes/Catalogo.aspx y dejarlos en `data/planes/<codigo>.json`
con esta forma:

```json
{
  "codigo_plan": "PF1481",
  "nombre": "Fundamentos de Análisis de Datos",
  "horas_totales": 198,
  "modulos": [
    {
      "n": 2,
      "nombre": "...",
      "competencia": "...",
      "horas": 0,
      "aprendizajes_esperados": [
        {"n": 1, "texto": "... (TEXTUAL del plan, sin reformular)",
         "criterios_evaluacion": ["..."]}
      ],
      "recursos_materiales": ["..."]
    }
  ]
}
```

Los aprendizajes esperados van **textuales**: la rúbrica exige que sean los del plan
formativo SENCE (ver `docs/01-guia-propuesta-tecnica.md` §5, bases 2026 punto 7.4).

Empieza por **PF1481** solo, valida la forma con Diego, y recién después automatiza los
otros 14. No bajes los 15 a ciegas.

## Trampas que me encontré

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
