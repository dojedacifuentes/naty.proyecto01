# Texto canónico del módulo 2 · PF1821 y PF1822

El texto oficial del módulo 2 de los dos cursos, tal como aparece en el plan formativo de SIPFOR, para cotejar los cursos
de Rise 360 (uno por aprendizaje esperado) y devolver a su forma exacta lo que Rise reescribió. Pedido del usuario
(2026-09-30): "la info canónica sin interpretarla, sino como aparece en las bases y en el plan formativo… para copiar y pegar".

| Archivo | Qué es |
| --- | --- |
| `Texto-canonico-M2-PF1821-PF1822.xlsx` | Planilla de 13 pestañas (abajo), con una columna para pegar lo que dice Rise y otra que dice si coincide |
| `Texto-canonico-M2-PF1821-PF1822.html` | Lo mismo, para abrir en el navegador y copiar cada texto con un botón (copia exacto, sin las comillas que agrega Excel) |

**Pestañas:** Cómo usar · Resumen (una fila por aprendizaje esperado) · PF1821 AE1 a AE4 · PF1822 AE1 a AE4 (una por curso de
Rise: curso, competencia del plan, módulo, competencia del módulo, aprendizaje esperado, cada criterio y cada línea de
contenidos) · Ficha PF1821 y Ficha PF1822 (los demás campos del plan y del módulo 2) · Fuentes.

**Cómo se coteja:** en la pestaña del aprendizaje, pega en la columna D el texto que dice Rise. La columna E marca
IDÉNTICO (verde), SOLO CAMBIAN MAYÚSCULAS (amarillo) o DISTINTO (rojo). Compara contra el texto tal como aparece (B) y contra
la variante sin número o viñeta (C). Se probó en Excel: un texto igual da IDÉNTICO, en minúsculas da SOLO CAMBIAN
MAYÚSCULAS, y con una palabra cambiada o con guion corto en vez de largo da DISTINTO.

**Lo que hay que saber:**
- El aprendizaje esperado **no tiene nombre** en el plan: es un número y su enunciado. Lo más parecido a un nombre es el
  rótulo de su unidad de contenidos ("1. CONCEPTOS FUNDAMENTALES DE AUTOMATIZACIÓN DE WORKFLOWS Y LAS CARACTERÍSTICAS DE N8N:").
- Las bases 2026 no nombran los cursos: el nombre del curso es el del plan formativo en SIPFOR.
- La columna "Ojo con esto" marca lo que parece un error pero está así en el plan y no se "corrige". Por ejemplo, el guion
  largo de "REQUEST–RESPONSE" (PF1822 AE1) o la competencia del módulo de PF1822, que no termina en punto.

**Cómo se verificó:** el texto sale de los campos crudos de SIPFOR (`data/sipfor/<plan>/`). La única normalización es la
que hace el PDF al mostrarlo: saltos de línea, sin espacios al borde y sin espacios dobles. Cada uno de los 126 textos
(64 de PF1821 y 62 de PF1822) se buscó en el texto del PDF oficial que genera SIPFOR (`data/sipfor/<plan>/plan-oficial.txt`),
sin contar espacios. Un texto que cruza de página puede estar en trozos, pero solo separados por un salto de página. La
comprobación rechaza un texto al que le falta una palabra, un guion, una tilde, el punto final o el asterisco. Los PDF
oficiales están en `privado/sipfor/` (fuera de git).

**Bases citadas:** implementar los aprendizajes, criterios y contenidos del plan (bases 2026, 4, pág. 18); impartirlos
parcialmente o modificarlos sin autorización son infracciones menos graves (bases 2026, 13.3.2 f) y h), pág. 51).

**Hecho por:** claude-code, sesión `2026-09-30-claude-code-06`. **Regenerar:** `npm run canonico`
(`scripts/texto-canonico.mjs`).
