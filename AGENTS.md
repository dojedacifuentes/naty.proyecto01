# AGENTS.md — Contrato operativo

Este archivo gobierna el trabajo de **cualquier** agente o persona en este repositorio:
Claude Code, Codex, Cursor, un chat sin herramientas, o Diego a mano. Si una herramienta
busca otro nombre de archivo (`CLAUDE.md`, `.cursorrules`), ese archivo debe limitarse a
apuntar aquí. **Fuente única de verdad: este documento.**

---

## 1. Qué estamos haciendo

Producir entre **45 y 90 propuestas técnicas (Anexo N°2)** distintas entre sí, para
6 clientes × 15 planes formativos, ajustadas a la rúbrica del punto 7.4 de las bases
SENCE Becas Laborales Talento Digital 2026, con verificadores (enlaces a LMS y
portafolio) funcionando.

El objetivo no es escribir 90 documentos a mano. Es construir un **motor** que los
genere y un **control de calidad** que los valide. El repo es la memoria de ese motor.

Contexto completo: `docs/00-brief-encargo.md`.

---

## 2. Reglas duras (no negociables)

1. **No inventes hechos sobre las bases.** Toda afirmación sobre la licitación se cita
   con numeral y página: `(bases 2026, 7.4, pág. 31)`. Si no puedes citar, no lo afirmes:
   anótalo en `state/OPEN-QUESTIONS.md`.
2. **No inventes datos de clientes.** Infraestructura, LMS, docentes, trayectoria y
   equipamiento salen de `data/clientes.csv` y de las fichas en `propuestas/`. Si falta
   un dato, se marca `PENDIENTE:` en el texto, nunca se rellena con algo plausible.
   Un dato inventado en una propuesta de licitación pública es un riesgo real.
3. **No cierres una pregunta abierta por tu cuenta.** Lo que está en
   `state/OPEN-QUESTIONS.md` se resuelve preguntando a Diego o a Natalia, no decidiendo.
4. **No escribas credenciales en el repo.** Ni de LMS, ni de evaluadores, ni de nadie.
   Ver `.gitignore`.
5. **Una propuesta nunca se copia de otra.** Ver §6 (diferenciación). Reusar bloques
   contables está bien; reusar narrativa de cliente no.
6. **Toda sesión termina con checkpoint y handoff.** Ver §5. Una sesión sin cierre es
   trabajo perdido para la siguiente.

---

## 3. Orden de lectura al empezar

```
AGENTS.md  (este archivo)
  └─ state/CHECKPOINT.md      ¿dónde quedó todo?
      └─ state/HANDOFF.md     ¿qué tengo que hacer yo?
          └─ state/OPEN-QUESTIONS.md   ¿sobre qué NO puedo decidir?
```

Solo después: `docs/` según lo que toque, y `data/` para los números.

No leas los cuatro documentos de `docs/` completos "por contexto". Léelos cuando la
tarea los pida. `docs/01-guia-propuesta-tecnica.md` es la referencia de rúbrica y se
consulta siempre que se escriba contenido evaluable.

---

## 4. Cómo se trabaja

### Ramas y commits

- Rama por unidad de trabajo: `fase0/auditoria-verificadores`, `motor/extractor-sipfor`,
  `propuesta/skillnest-pf1481`.
- Commits pequeños y en español, en imperativo:
  `add: extractor de planes SIPFOR`, `fix: umbral extensión PF1477`, `docs: diff bases`.
- Nunca fuerces push sobre `main`.

### Convención de nombres en `propuestas/`

```
propuestas/<cliente-slug>/<codigo-plan>/
  ├── anexo2.md            # el documento en construcción
  ├── ficha.md             # datos reales del cliente para este curso
  ├── verificadores.md     # enlaces y su estado
  └── qa.md                # resultado de los tres controles
```

Slugs de cliente fijos: `skillnest`, `u-autonoma`, `unab`, `chile-conductores`,
`cft-cenco`, `cft-pucv`.

### Cuando toques la rúbrica

`data/rubrica-subcriterios.csv` es la especificación ejecutable. Si al leer las bases
descubres que un umbral está mal, corrígelo ahí **y** anótalo en `state/DECISIONS.md`
con la cita. No cambies solo la prosa de `docs/`.

---

## 5. Protocolo de cierre de sesión (obligatorio)

Este es el mecanismo que permite que varias sesiones, chats y herramientas distintas
trabajen sobre lo mismo sin pisarse. **No lo omitas aunque la sesión haya sido corta.**

Al terminar, en un solo commit llamado `checkpoint: <fecha> <tema>`:

1. **Actualiza `state/CHECKPOINT.md`**: fase actual, qué está hecho, qué está a medias
   y dónde exactamente quedó (archivo y línea si aplica), qué está bloqueado y por quién.
2. **Reescribe `state/HANDOFF.md`** desde `templates/handoff.md`. Va dirigido a quien
   venga después, que no tiene tu contexto. Debe poder ejecutarse sin leer tu chat.
3. **Agrega las decisiones nuevas a `state/DECISIONS.md`**, una línea por decisión:
   fecha, qué se decidió, por qué, qué alternativa se descartó.
4. **Actualiza `state/OPEN-QUESTIONS.md`**: agrega lo que apareció, marca lo resuelto
   con la respuesta y quién la dio.
5. **Deja un log en `state/sessions/AAAA-MM-DD-<herramienta>-NN.md`**: qué hiciste,
   qué archivos tocaste, qué probaste, qué falló.

### Regla de auditoría

Cualquier sesión posterior debe poder responder, leyendo solo `state/`, estas preguntas:

- ¿Por qué este archivo dice lo que dice?
- ¿Quién decidió esto y cuándo?
- ¿Qué se probó y qué no?

Si no puede, el cierre estuvo mal hecho.

---

## 6. La regla de diferenciación

Las bases exigen propuestas distintas y, además, **los seis clientes compiten entre sí
en la misma mesa de evaluación**. Dos propuestas gemelas dañan a los dos clientes y la
reputación de quien las preparó.

La diferenciación **no** se produce cambiando sinónimos. Se produce porque cada cliente
es realmente distinto. Reglas prácticas:

- **Bloques contables** (indicadores de logro, estructura del portafolio, instrumentos,
  conteo de actividades de extensión): pueden compartir método entre clientes, porque
  los determina el plan formativo, no el oferente.
- **Bloques narrativos** (metodología, herramientas de la industria, vinculación
  temprana, actividades de extensión, infraestructura): se derivan de `ficha.md` del
  cliente y **nunca** se copian entre clientes.
- **Control medible:** antes de entregar un lote, similitud textual de todos contra
  todos. Umbral operativo sugerido: **0,75 de similitud de coseno sobre TF-IDF**
  entre dos propuestas de clientes distintos obliga a regenerar la narrativa.
  Entre propuestas del mismo cliente para planes distintos el umbral es más laxo.

---

## 7. Los tres controles de calidad

Ninguna propuesta se marca lista sin pasar los tres. Se registran en `qa.md`.

| Control | Qué verifica | Cómo |
| --- | --- | --- |
| **Cobertura de rúbrica** | Los 13 subcriterios tienen contenido que alcanza el umbral del 7.0 | `data/rubrica-subcriterios.csv` como checklist |
| **Diferenciación** | No se parece a otra propuesta del lote | Similitud textual, §6 |
| **Verificadores vivos** | Enlaces abren, credenciales sirven, el contenido corresponde | `scripts/auditar_verificadores.py` + revisión manual del contenido |

El tercero **no se puede automatizar del todo**: un script detecta un 404, pero no
detecta que el LMS muestra el plan formativo equivocado. Esa revisión es humana y es
la que más propuestas salva.

---

## 8. Interoperabilidad entre herramientas

- **Todo en Markdown y CSV plano.** Nada de formatos que solo abra una herramienta.
- **Rutas relativas siempre.** Nunca la ruta del disco de quien trabaja: el mismo archivo
  se abre desde Windows, desde Linux y desde un contenedor. El control 01 lo verifica.
- **Los scripts son Python 3 sin dependencias exóticas**; si necesitas una, decláralo
  en `scripts/requirements.txt` y anótalo en `DECISIONS.md`.
- **Identifícate en el log de sesión**: `claude-code`, `codex`, `cursor`, `chat`, `humano`.
  Sirve para auditar de dónde salió cada cosa.
- **Si dos sesiones trabajaron en paralelo**, la que llega segunda al merge lee el
  `CHECKPOINT.md` del otro antes de resolver conflictos. No se resuelve un conflicto
  en `state/` con "acepto lo mío": se fusionan ambos relatos.

---

## 9. Vocabulario

| Término | Significa |
| --- | --- |
| **Anexo 2** | Formulario donde se presenta cada propuesta. Uno por curso ofertado. |
| **Anexo 3** | Estructura de costos. Uno por curso ofertado. |
| **Anexo 7** | Guía de elaboración de la propuesta técnica (era el Anexo 5 en 2024). |
| **Plan formativo** | Programa del catálogo SIPFOR. Código `PFxxxx`. Fuente del contenido. |
| **Segundo módulo** | El módulo que se desarrolla en profundidad y sobre el que se aplica la rúbrica. |
| **Verificador** | Enlace que respalda una afirmación de la propuesta (LMS, portafolio). |
| **VHAC** | Valor Hora Alumno Capacitación. Base de la evaluación económica. |
| **OTEC** | Organismo técnico de capacitación. Nuestros clientes. |
