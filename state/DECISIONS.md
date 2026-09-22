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
