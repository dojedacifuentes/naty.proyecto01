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

1. Lee **`AGENTS.md`** — es el contrato operativo. No lo saltes.
2. Lee **`state/CHECKPOINT.md`** — dónde quedó todo.
3. Lee **`state/HANDOFF.md`** — qué dejó pendiente la última sesión, específicamente para ti.
4. Revisa **`state/OPEN-QUESTIONS.md`** — no tomes decisiones sobre cosas que ahí están abiertas.
5. Trabaja. Al terminar, cierra según el protocolo de `AGENTS.md` §5.

## Mapa del repositorio

| Ruta | Qué contiene |
| --- | --- |
| `AGENTS.md` | Contrato operativo para cualquier agente o persona. Fuente única. |
| `CLAUDE.md` | Puntero a `AGENTS.md` (para Claude Code). |
| `docs/` | Conocimiento estable: bases, rúbrica, estructura del Anexo 2, protocolos. |
| `data/` | Datos estructurados: planes formativos, clientes, rúbrica, umbrales. |
| `state/` | Estado vivo: checkpoint, handoff, decisiones, preguntas abiertas, log de sesiones. |
| `templates/` | Plantillas de trabajo: Anexo 2, ficha de cliente, handoff. |
| `scripts/` | Utilidades: cálculo de umbrales, auditoría de verificadores. |
| `PROMPT-CLAUDE-CODE.md` | Prompts para crear el repo, abrir una sesión y auditar desde otra herramienta. |
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
