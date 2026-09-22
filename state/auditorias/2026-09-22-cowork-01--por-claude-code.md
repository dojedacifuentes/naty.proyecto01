# Auditoría de la sesión 2026-09-22-cowork-01

<!-- Lo genera `npm run sesion -- auditar <sesion-id> --herramienta <tu herramienta>`.
     La evidencia de abajo viene de git y de la verificación automática: no la edites.
     Lo tuyo son las cinco preguntas y el veredicto. -->

**Sesión auditada:** 2026-09-22-cowork-01 · producida con **cowork**
**Auditor:** claude-code · **Fecha:** 2026-09-22
**Rango revisado:** `solo 151e5bf`

> Regla: audita una herramienta distinta de la que produjo el trabajo (AUDITORIA.md §1).
> Quien escribió algo es mal auditor de lo que escribió.

---

## Evidencia automática

<!-- evidencia:inicio -->
### Lo que dice el registro

| Campo | Valor |
| --- | --- |
| Herramienta | cowork · claude |
| Abierta | 2026-09-22T03:30:00Z |
| Cerrada | 2026-09-22T04:36:00Z |
| Checks al cerrar | anterior al sistema de verificacion |
| Archivos que declaró tocar | 29 |
| Diff declarado | 29 archivos creados (sesion inicial) |

### Lo que dice git (solo 151e5bf)

```
151e5bf init: esqueleto de trabajo licitación TD 2026
```

```
 state/CHECKPOINT.md                    |  55 +++++++
 state/DECISIONS.md                     |  37 +++++
 state/HANDOFF.md                       |  77 ++++++++++
 state/OPEN-QUESTIONS.md                |  61 ++++++++
 state/auditoria-verificadores.csv      |   1 +
 state/sessions/2026-09-22-cowork-01.md |  41 +++++
 templates/anexo2-esqueleto.md          | 164 ++++++++++++++++++++
 templates/ficha-cliente.md             |  83 ++++++++++
 templates/handoff.md                   |  31 ++++
 templates/qa.md                        |  37 +++++
 templates/verificadores.md             |  21 +++
 30 files changed, 1877 insertions(+)
```

Archivos tocados en el rango: **30**.
Archivos que el log de la sesión no menciona: `.gitattributes`, `.github/pull_request_template.md`, `.gitignore`, `AGENTS.md`, `CLAUDE.md`, `PROMPT-CLAUDE-CODE.md`, `README.md`, `data/clientes.csv`, `data/planes-formativos.csv`, `data/rubrica-subcriterios.csv`, `docs/00-brief-encargo.md`, `docs/01-guia-propuesta-tecnica.md`, `docs/02-diff-bases-2024-2026.md`, `docs/03-anexo2-estructura.md`, `docs/04-verificadores-protocolo.md` …

### Verificación automática ahora (2026-09-22T07:53:14Z)

Resultado: **8/8 ok** · 0 errores · 4 avisos.

_Sin errores automáticos: lo que quede por encontrar es de los que no detecta un script._

### Huella de estado

**state/ cambió desde el cierre de esta sesión** (`2cc759e84b881e84` → `83d683ab13771f9b`). Normal si hubo sesiones posteriores; si no las hubo, alguien editó el estado fuera del protocolo.
<!-- evidencia:fin -->

---

## Las cinco preguntas

Cada respuesta va con evidencia concreta: archivo y línea. "Parece correcto" no es una respuesta.

### 1. ¿Hay alguna afirmación sobre las bases que NO esté citada con numeral y página?

**Sí, tres.** El control 06 las marca y las confirmé leyendo el contexto:

- `docs/03-anexo2-estructura.md:41` — "La sección VIII tiene una causal de rechazo
  escrita". Afirma una causal de rechazo sin numeral.
- `docs/03-anexo2-estructura.md:43` — cita entre comillas "será rechazado por requisitos
  de curso" sin decir de dónde sale.
- `docs/04-verificadores-protocolo.md:17` — repite la misma cita entrecomillada, también
  sin referencia.

Son citas textuales de las bases, no invenciones: el problema es que quien las lea no
puede comprobarlas sin releer las 142 páginas. En una licitación pública eso importa,
porque una causal de rechazo mal atribuida cambia decisiones de diseño.

**Límite de esta auditoría:** el resto de las citas tiene la forma correcta
(`(bases 2026, 7.4, pág. 31)`), pero **no verifiqué que los números de página sean
correctos**. Los PDF no están en el repo, por decisión registrada en `DECISIONS.md`, así
que esa comprobación exige tener las bases a mano. Queda para quien las tenga.

### 2. ¿Hay algún dato de cliente que parezca inventado, es decir, que no salga de `ficha.md` ni de `data/clientes.csv`?

**Ninguno en propuestas**, porque todavía no hay propuestas escritas.

**Pero hay un riesgo en el origen.** `data/clientes.csv` declara `ficha_completa=no` para
los seis clientes y, al mismo tiempo, ya afirma un `eje_diferenciador` para cada uno
(Skillnest: "Empleabilidad, metodología intensiva, red de empresas"; UNAB: "Acreditación,
investigación, cobertura nacional"). Esa columna no tiene fuente declarada y es justamente
el material del que saldrá la narrativa diferenciadora del ítem D, que pesa 35%.

No afirmo que sea falso: afirmo que no es trazable, y `AGENTS.md` §2.2 exige que lo que no
venga de una fuente se marque `PENDIENTE:`. Recomendación concreta: agregar una columna
`fuente` a `data/clientes.csv` con quién entregó cada eje y cuándo.

### 3. ¿Alguna propuesta incumple un umbral de `data/rubrica-subcriterios.csv`?

**No aplica todavía:** `propuestas/` está vacío.

Lo que sí revisé es la especificación, porque un umbral mal escrito se propaga a las 45 o
90 propuestas. Los 13 subcriterios cuadran: los pesos de ítem suman 1,000, los internos
suman 1,000 dentro de cada ítem, y `peso_en_tecnica` y `peso_nota_final` son coherentes
con esos factores y con el 40% que pesa la técnica en la nota final (control 02, sin
errores).

Verifiqué además a mano el umbral que depende de las horas: PF1477 tiene 483 horas y el
CSV exige 10 actividades de extensión para nota 7, que es 483/50 redondeado hacia arriba.
Correcto.

### 4. ¿Alguna sesión decidió por su cuenta algo que está abierto en `state/OPEN-QUESTIONS.md`?

**No.** El caso que había que mirar es el del segundo módulo: `DECISIONS.md` registra "Se
trabaja asumiendo que solo se desarrolla el segundo módulo", que de lejos parece cerrar la
pregunta abierta #1.

No la cierra, y está bien hecho: la entrada dice explícitamente "Alternativa **no**
descartada", remite a `OPEN-QUESTIONS.md` #1 y pide consulta formal a SENCE. Es un
supuesto de trabajo declarado como tal, no una decisión tomada por cuenta propia. Es la
forma correcta de avanzar sin bloquearse.

### 5. ¿El cierre cumple `AGENTS.md` §5? ¿Podrías retomar el trabajo leyendo solo `state/`, sin ver el chat anterior?

**Sí, y lo probé sin querer:** esta sesión empezó sin acceso al chat de la anterior y el
handoff alcanzó para saber qué seguía — extracción de SIPFOR, empezando por PF1481, con el
formato JSON esperado y la advertencia sobre el ViewState del sitio ASP.NET. Los cinco
artefactos del §5 están y son utilizables.

Dos observaciones sobre la calidad del cierre, ninguna invalidante:

- `state/sessions/2026-09-22-cowork-01.md` declara haber corrido
  `python3 scripts/calcular_umbrales.py` con resultado correcto. **En la máquina donde se
  trabaja no hay Python** (ni `python`, ni `python3`, ni `py`), así que esa prueba no era
  reproducible aquí. Lo más probable es que se corriera en otro entorno, pero el log no
  dice cuál. Un "qué probé" debería decir dónde se probó. La salida sí era correcta: el
  port a Node la reproduce byte a byte.
- "Archivos creados: Todos. Es la sesión inicial." es cierto, pero no auditable a nivel de
  archivo. Por eso ahora el cierre genera esa lista solo.

---

## Hallazgos

| # | Gravedad | Archivo:línea | Qué encontré | Qué hay que hacer |
| --- | --- | --- | --- | --- |
| 1 | media | `data/clientes.csv` | `eje_diferenciador` afirmado para los 6 clientes sin fuente, con `ficha_completa=no` | Agregar columna `fuente` (quién lo dijo y cuándo) o marcar `PENDIENTE:` |
| 2 | media | `docs/03-anexo2-estructura.md:41`, `:43` | Causal de rechazo afirmada y citada sin numeral ni página | Abrir las bases 2026 y poner la referencia exacta |
| 3 | media | `docs/04-verificadores-protocolo.md:17` | Misma cita entrecomillada sin referencia | Igual que el anterior |
| 4 | baja | `state/sessions/2026-09-22-cowork-01.md` | "Qué probé" no dice en qué entorno se corrieron los scripts; no eran reproducibles en esta máquina | Declarar el entorno al registrar una prueba |
| 5 | baja | todo `docs/` | No se verificó que los números de página de las citas correctas sean exactos | Quien tenga los PDF: revisar una muestra |

## Veredicto

- [ ] **aprobada** — el trabajo se sostiene y el estado permite continuar
- [x] **observaciones** — se puede continuar, pero hay que corregir lo listado
- [ ] **rechazada** — no se puede continuar sobre esto sin corregir primero

El trabajo se sostiene: la rúbrica está bien convertida a dato, el handoff funcionó de
verdad y el supuesto del segundo módulo está correctamente declarado como supuesto. Las
observaciones son de trazabilidad, no de contenido, pero las dos primeras hay que
resolverlas antes de que esa narrativa entre en una propuesta: un `eje_diferenciador` sin
fuente y una causal de rechazo sin numeral son precisamente el tipo de dato que después
nadie puede defender.

Al marcarlo, regístralo en el ledger:

```
npm run sesion -- veredicto 2026-09-22-cowork-01 --veredicto <aprobada|observaciones|rechazada> --herramienta claude-code
```
