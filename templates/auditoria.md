# Auditoría de la sesión {{sesion_id}}

<!-- Lo genera `npm run sesion -- auditar <sesion-id> --herramienta <tu herramienta>`.
     La evidencia de abajo viene de git y de la verificación automática: no la edites.
     Lo tuyo son las cinco preguntas y el veredicto. -->

**Sesión auditada:** {{sesion_id}} · producida con **{{herramienta_auditada}}**
**Auditor:** {{herramienta_auditor}} · **Fecha:** {{fecha}}
**Rango revisado:** `{{rango}}`

> Regla: audita una herramienta distinta de la que produjo el trabajo (AUDITORIA.md §1).
> Quien escribió algo es mal auditor de lo que escribió.

---

## Evidencia automática

<!-- evidencia:inicio -->
{{evidencia}}
<!-- evidencia:fin -->

---

## Las cinco preguntas

Cada respuesta va con evidencia concreta: archivo y línea. "Parece correcto" no es una respuesta.

### 1. ¿Hay alguna afirmación sobre las bases que NO esté citada con numeral y página?

<respuesta>

### 2. ¿Hay algún dato de cliente que parezca inventado, es decir, que no salga de `ficha.md` ni de `data/clientes.csv`?

<respuesta>

### 3. ¿Alguna propuesta incumple un umbral de `data/rubrica-subcriterios.csv`?

<respuesta>

### 4. ¿Alguna sesión decidió por su cuenta algo que está abierto en `state/OPEN-QUESTIONS.md`?

<respuesta>

### 5. ¿El cierre cumple `AGENTS.md` §5? ¿Podrías retomar el trabajo leyendo solo `state/`, sin ver el chat anterior?

<respuesta>

---

## Hallazgos

| # | Gravedad | Archivo:línea | Qué encontré | Qué hay que hacer |
| --- | --- | --- | --- | --- |
| 1 | alta / media / baja | | | |

## Veredicto

- [ ] **aprobada** — el trabajo se sostiene y el estado permite continuar
- [ ] **observaciones** — se puede continuar, pero hay que corregir lo listado
- [ ] **rechazada** — no se puede continuar sobre esto sin corregir primero

Al marcarlo, regístralo en el ledger:

```
npm run sesion -- veredicto {{sesion_id}} --veredicto <aprobada|observaciones|rechazada> --herramienta {{herramienta_auditor}}
```
