# Licitación Becas Laborales — Talento Digital 2026

Repositorio de trabajo para la producción sistematizada de propuestas técnicas
(Anexo N°2) del **Programa Especial "Talento Digital para Chile", Becas Laborales 2026**
(SENCE, Res. Ex. N°2320).

**Cliente del encargo:** Natalia (hackea.pro).
**Rol de este repo:** memoria compartida entre sesiones, chats y herramientas distintas
(Claude Code, Codex, Cursor, o una persona sin ninguna de ellas).

---

## Módulo 2 de los cursos desarrollados

Los recursos educativos del módulo 2 y el checklist de lo que piden las bases están en
**[`modulo-2/`](modulo-2/)**, con una carpeta por curso:

- [PF1821 · Construcción de Agentes y Automatización con Herramientas Low Code](modulo-2/PF1821-agentes-low-code/)
- [PF1822 · Especialización en Desarrollo con IA](modulo-2/PF1822-desarrollo-con-ia/)

Estado: borrador, sin revisión humana. Para terminarlo: [`modulo-2/FLUJO-PRODUCCION.md`](modulo-2/FLUJO-PRODUCCION.md)
y el `produccion/ESTADO.md` de cada curso.

**Sitio publicado:** https://naty-proyecto01.vercel.app. Vercel lo reconstruye en cada push a
`main` con `npm run sitio` (`vercel.json`). Muestra la sección `modulo-2/`, los contenidos del
módulo 2 de los dos cursos y los PDF del kit, y en la portada ofrece los zips de producción
(PPT para HeyGen y prompts de infografía). Lo que no se publica enlaza a este repositorio.

---

## Arranque en 60 segundos

Si eres un agente (Claude Code, Codex, otro) o una persona retomando el trabajo:

```bash
npm run hooks                      # una sola vez por clon
npm run sesion -- estado           # dónde está todo y qué falta auditar
npm run sesion -- abrir --herramienta claude-code --tema "qué vas a hacer"
```

Ese último comando te imprime la tarea que te dejó la sesión anterior. Antes de tocar nada:

1. Lee **`AGENTS.md`** — es el contrato operativo. No lo saltes.
2. Lee **`state/CHECKPOINT.md`** — dónde quedó todo.
3. Lee **`state/HANDOFF.md`** — qué dejó pendiente la última sesión, específicamente para ti.
4. Revisa **`state/OPEN-QUESTIONS.md`** — no tomes decisiones sobre cosas que ahí están abiertas.

Trabaja. Al terminar:

```bash
npm run verificar                  # ocho controles automáticos
npm run sesion -- cerrar --tema "<tema>"
git add -A && git commit -m "checkpoint: <fecha> <tema>"
```

El cierre se niega a cerrar si no actualizaste el estado o si quedan errores. Eso es
deliberado: una sesión sin cierre es trabajo perdido para la siguiente.

## Cómo se verifica que esto no esté mal

Requisito: **Node ≥ 18**. No hay dependencias que instalar.

| Comando | Para qué |
| --- | --- |
| `npm run verificar` | los ocho controles: estructura, datos, cobertura de rúbrica, diferenciación, secretos, citas, estado y verificadores |
| `npm run verificar:red` | además comprueba que los enlaces a LMS y portafolios sigan abriendo |
| `npm run umbrales` | recalcula cuántas actividades de extensión exige cada plan |
| `npm run sipfor -- PF1821` | extrae uno o más planes desde SIPFOR (`--todos` para los 15) |
| `npm run ficha -- PF1821` | genera la ficha y la lista de entregables del módulo 2 del plan |
| `npm run manual -- PF1821 PF1822 --pdf` | manual de entregables del módulo 2 en HTML y PDF (usa Edge o Chrome) |
| `npm run kit -- PF1821 --pdf` | kit de recursos educativos del módulo 2 de un curso, en HTML y PDF (`--unico` junta todos los cursos, con ficha y entregables) |
| `npm run zip -- PF1821 --salida <dir>` | zip de los recursos del módulo 2 de un curso, un archivo por recurso (R01 a R13) |
| `npm run sitio` | sitio estático del módulo 2 en `public/`; es lo que Vercel publica en cada push (`vercel.json`) |
| `npm run produccion -- PF1821 PF1822` | bases de producción del módulo 2: PPTX para HeyGen, prompts de infografía y lectura, quizzes GIFT (ver `modulo-2/FLUJO-PRODUCCION.md`) |

Corre solo, además, en cada commit (hook) y en cada push (GitHub Actions).

## Cómo una sesión audita a otra

El trabajo lo hacen sesiones que no comparten memoria. Para que eso no signifique confiar
a ciegas, cada sesión queda registrada en `state/LEDGER.csv` con el commit desde el que
partió, los archivos que dice haber tocado y una huella `sha256` del estado. Otra sesión,
**con otra herramienta**, contrasta ese relato con lo que dice git:

```bash
npm run sesion -- auditar 2026-09-22-cowork-01 --herramienta codex
```

Eso genera un informe con la evidencia ya recopilada y cinco preguntas que el auditor
responde con archivo y línea. Protocolo completo: **`AUDITORIA.md`**.

## Mapa del repositorio

| Ruta | Qué contiene |
| --- | --- |
| `AGENTS.md` | Contrato operativo para cualquier agente o persona. Fuente única. |
| `AUDITORIA.md` | Cómo una sesión verifica el trabajo de otra, y con qué evidencia. |
| `CLAUDE.md` | Puntero a `AGENTS.md` (para Claude Code). |
| `docs/` | Conocimiento estable: bases, rúbrica, estructura del Anexo 2, protocolos. |
| `data/` | Datos estructurados: planes formativos, clientes, rúbrica, umbrales. |
| `state/` | Estado vivo: checkpoint, handoff, decisiones, preguntas abiertas, registro y logs de sesiones, auditorías. |
| `state/LEDGER.csv` | Quién trabajó, desde qué commit, con qué resultado y quién lo auditó. |
| `templates/` | Plantillas: Anexo 2, ficha de cliente, handoff, QA, sesión, auditoría. |
| `scripts/` | Herramientas: `verificar.mjs`, `sesion.mjs`, umbrales, auditoría de enlaces. |
| `scripts/checks/` | Un archivo por control. Agregar uno nuevo es agregar un archivo. |
| `.githooks/` | Hook de pre-commit versionado (se activa con `npm run hooks`). |
| `PROMPT-CLAUDE-CODE.md` | Prompts para abrir una sesión y para auditar desde otra herramienta. |
| `propuestas/` | (se crea al empezar producción) Un directorio por cliente × plan. |
| `data/sipfor/` | Respuestas de SIPFOR tal cual, por plan (`npm run sipfor`). Fuente citable. |
| `data/planes/` | Planes formativos normalizados: módulos, aprendizajes, criterios, contenidos, recursos. |
| `contenidos/` | Contenido canónico del módulo evaluado de cada curso, común a todas las instituciones (`docs/05`). |
| `vercel.json` | Cómo construye Vercel el sitio: `npm run sitio` → `public/` (carpeta generada, fuera de git). |
| `modulo-2/` | Portada del módulo 2 por curso: checklist de las bases, estado de cada recurso y zip descargable. |
| `bases/` | PDF de las bases 2026 (SENCE, Res. Ex. N°2320) y 2024 (OTIC SOFOFA). Fuente citable por numeral y página. |
| `entregables/` | Lo entregado a Natalia, un directorio por hito con fecha y su `README.md`. |

## Dónde vive

Repositorio remoto: https://github.com/dojedacifuentes/naty.proyecto01. Todo lo del
proyecto va acá —código, estado, bases y entregables— para que cada hito quede trazable
en un solo lugar (`state/DECISIONS.md`, 2026-09-24).

## Estado actual

Ver `state/CHECKPOINT.md`. Resumen a la fecha de creación: **Fase 0 — Reconocimiento.**
Bases 2026 y 2024 leídas y sintetizadas. Pendiente: acceso a la carpeta de Anexos 2
de referencia, matriz cliente × plan, y fechas formales de la licitación.

## Qué NO va en este repo

- Credenciales de LMS, contraseñas, tokens de acceso de evaluadores.
- Datos personales de tutores, participantes o postulantes.
- Información comercial cruzada entre clientes que compiten entre sí.
