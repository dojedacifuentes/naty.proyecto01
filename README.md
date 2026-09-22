# Licitación Becas Laborales — Talento Digital 2026

Repositorio de trabajo para la producción sistematizada de propuestas técnicas
(Anexo N°2) del **Programa Especial "Talento Digital para Chile", Becas Laborales 2026**
(SENCE, Res. Ex. N°2320).

**Cliente del encargo:** Natalia (hackea.pro).
**Rol de este repo:** memoria compartida entre sesiones, chats y herramientas distintas
(Claude Code, Codex, Cursor, o una persona sin ninguna de ellas).

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

## Estado actual

Ver `state/CHECKPOINT.md`. Resumen a la fecha de creación: **Fase 0 — Reconocimiento.**
Bases 2026 y 2024 leídas y sintetizadas. Pendiente: acceso a la carpeta de Anexos 2
de referencia, matriz cliente × plan, y fechas formales de la licitación.

## Qué NO va en este repo

- Credenciales de LMS, contraseñas, tokens de acceso de evaluadores.
- Datos personales de tutores, participantes o postulantes.
- PDF de las bases (pesan y son públicos): se citan por numeral y página.
- Información comercial cruzada entre clientes que compiten entre sí.
