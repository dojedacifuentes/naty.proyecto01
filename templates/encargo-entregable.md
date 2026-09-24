# Encargo: un entregable del módulo evaluado

> Se pega al empezar a producir UN archivo de `contenidos/<PF>/modulo-2/`. Sirve igual
> en Claude Code, Codex, Cursor o un chat. Reemplaza lo que está entre `< >`.
> Flujo completo: `docs/05-flujo-contenidos-modulo.md`.

```
Vas a producir <ID Y NOMBRE, p. ej. "B2 — instrumentos de evaluación"> para el módulo 2
del plan <PF>, en el archivo contenidos/<PF>/modulo-2/<ARCHIVO>.

Lee primero, en este orden:
  1. contenidos/<PF>/modulo-2/00-ficha-sipfor.md   — lo que dice el plan, textual
  2. contenidos/<PF>/modulo-2/01-entregables.md    — cuánto exige el 7,0 en este módulo
  3. los entregables anteriores de esa carpeta que ya existan
  4. docs/01-guia-propuesta-tecnica.md, la sección del ítem que vas a producir

Reglas:
  - Los aprendizajes esperados se copian TEXTUALES de la ficha, con su id (AE1…AEn).
    No los resumas, no los reformules, no cambies mayúsculas.
  - Todo instrumento, actividad o evidencia declara qué AE cubre. Al final del archivo,
    una tabla de cobertura: filas = lo que produjiste, columnas = AE1…AEn.
  - Ancla todo a la competencia del módulo y a sus contenidos: nombra las herramientas,
    los datos y los productos de ESTE módulo. Si el texto sirviera para otro plan
    cambiando solo el nombre de la herramienta, rehazlo.
  - "Desarrollado, no solo descrito": un instrumento trae sus ítems y su pauta; una
    actividad trae su enunciado, sus datos de entrada y su respuesta modelada; una rúbrica
    trae niveles y descriptores.
  - Nada de ninguna institución: este archivo es común a todas y el repo es público.
  - Lo que el plan no define y hace falta decidir: PENDIENTE: <qué falta y quién decide>.
    No lo rellenes con algo plausible.

Al terminar:
  - Deja el archivo con "**Estado:** borrador" en la cabecera.
  - No marques [x] en 01-entregables.md: eso lo hace quien revisa.
  - Corre npm run verificar y dime qué quedó PENDIENTE.
```
