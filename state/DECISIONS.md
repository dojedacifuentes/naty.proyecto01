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
