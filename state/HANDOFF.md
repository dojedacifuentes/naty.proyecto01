# HANDOFF

**De:** sesión inicial (Claude / Cowork) — 2026-09-22
**Para:** la siguiente sesión, sea cual sea

## Contexto mínimo

Se leyeron las bases 2026 (SENCE, Res. Ex. N°2320) y las bases 2024 (OTIC SOFOFA) y se
volcó todo lo evaluable a `docs/` y `data/`. El repo ya tiene la rúbrica como dato
ejecutable. Todavía no se ha escrito ninguna propuesta ni se ha tocado SIPFOR.

## Lo que dejé listo

- `docs/01-guia-propuesta-tecnica.md` → la rúbrica completa del 7.4 con los umbrales
  exactos del 7.0, y el Anexo 7 resumido en lo que puntea.
- `data/rubrica-subcriterios.csv` → los 13 subcriterios con pesos y umbrales. Es la
  especificación ejecutable: si algo se contradice con la prosa, manda el CSV.
- `data/umbrales-por-plan.csv` → generado por `scripts/calcular_umbrales.py`.
- `scripts/auditar_verificadores.py` → listo, sin nada que auditar todavía.
- `AGENTS.md` → protocolo de trabajo. Léelo antes que esto.

## Lo que NO alcancé

- **Extracción de SIPFOR.** Nadie ha bajado los 15 planes formativos. Es el insumo
  principal del motor y no depende de nadie externo: es la tarea más productiva que se
  puede hacer ahora mismo.
- **Fichas de cliente.** `data/clientes.csv` tiene la columna `ficha_completa` en `no`
  para los seis. Sin esos datos las propuestas no se pueden diferenciar.

## Tu primera tarea

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
formativo SENCE (ver `docs/01-guia-propuesta-tecnica.md` §5).

Empieza por **PF1481** solo, valida la forma con Diego, y recién después automatiza los
otros 14. No bajes los 15 a ciegas.

## Trampas

- El sitio de SIPFOR es ASP.NET con postbacks: el scraping directo puede requerir
  mantener ViewState. Si se complica, descargar los PDF de cada plan y parsearlos es
  una ruta válida — anótala en `DECISIONS.md` si la tomas.
- Hay **15 planes pero solo 14 códigos distintos de línea**: PF1483 y PF1487 tienen las
  mismas horas (210) pero son planes distintos. No los deduplique nada.

## Lo que NO debes tocar

- **La contradicción "segundo módulo" vs. "todos los módulos"** (`OPEN-QUESTIONS.md` #1).
  Está abierta. Trabaja asumiendo el segundo módulo, pero no borres la alternativa ni
  reescribas `docs/` como si estuviera resuelta.
- **`data/rubrica-subcriterios.csv`**: solo se cambia con cita a numeral y página, y
  dejando registro en `DECISIONS.md`.
