---
name: cruce-anexo
description: Verifica los Anexos 2 VF de la licitación Talento Digital 2026 contra la tabla de verdad (SIPFOR, planilla 02 y aulas) con el verificador del repo, sin transcribir los anexos ni juzgarlos a ojo, y entrega el panel con el Índice de Alineación. Úsala cuando el usuario pida «cruzar», «cotejar», «verificar» o «comparar» anexos con el aula, el plan o las reglas; cuando Natalia avise que editó un anexo; cuando pidan el panel o el Índice de Alineación; o para probar el verificador con errores sembrados.
---

# Cruzar los Anexos 2 con la tabla de verdad

**Principio.** Claude no juzga anexo por anexo. Un script compara el texto exacto de cada anexo con la tabla de verdad
y deja evidencia (cita y sección) en cada casilla. Claude solo trae el texto fiel, corre el script y revisa a mano las
casillas «REQUIERE JUICIO». Sin evidencia no hay CUMPLE.

## Piezas

| Pieza | Dónde | Qué es |
|---|---|---|
| Reglas | `data/reglas/reglas.json` | R01-R41 con severidad, origen y qué chequeo las revisa |
| Tabla de verdad | `privado/verificador-anexos/tabla-de-verdad.json` | Lo que cada anexo DEBE decir. La arma `construir-tabla.mjs` desde `data/planes` (SIPFOR), `data/planes-formativos.csv`, `privado/vocabulario-clientes.json` (planilla 02) y `privado/docs-anexos/reemplazos-anexos/generar.mjs` (ids de anexos y de actividades del aula) |
| Textos de los anexos | `privado/verificador-anexos/anexos/<PF>-<cli>.json` | `{titulo, url, leido, fuente, texto}` tal como lo entrega Drive |
| Aula en vivo (opcional) | `privado/verificador-anexos/aula-en-vivo.json` | Actividades leídas en el LMS para resolver enlaces que no están en la tabla |
| Verificador | `scripts/anexos/verificar-anexos.mjs` | 21 chequeos (A01-A18 automáticos, J01-J03 de juicio) y la fórmula |
| Panel | `scripts/anexos/panel.html` → `privado/verificador-anexos/salida/panel.html` | Matriz anexos × chequeos con evidencia |

Clientes: `unab`, `cd` (Coding Dojo), `ua` (U. Autónoma), `chc` (Chile Conductores).

## Pasos

### 1. Traer el texto vigente sin transcribirlo

1. Lee cada anexo con la herramienta `read_file_content` del conector de Google Drive, con el id de la tabla de verdad
   (`anexo.driveId`). Pide **un anexo por llamada** si son .docx: dos lecturas paralelas de .docx pueden guardarse con
   el mismo nombre de archivo y pisarse.
2. El resultado es grande y Claude Code lo guarda solo en `tool-results/…read_file_content-<n>.txt` (JSON con
   `fileContent`, `title`, `viewUrl`). Cópialo con un script de Node a `anexos/<PF>-<cli>.json`, sin pasar el texto por el
   modelo. El PF y el cliente salen del título.
3. Nunca reescribas, resumas ni «limpies» el texto. Si un id da «not found», no lo busques a ojo: queda **SIN LEER** y
   el panel lo muestra como bloqueado (es un hallazgo, no un error del verificador).

### 2. (Opcional) Leer el aula en vivo

Para los enlaces que el chequeo A08 deja en juicio por no estar en la tabla:
- Canvas: con la sesión del Chrome, `GET /api/v1/courses/<id>/modules?include[]=items` y `/assignments/<id>` (solo lectura).
- Moodle: abrir `mod/<tipo>/view.php?id=<cmid>` con sesión y leer `course-<id>` del `body` y el nombre de la actividad.
  Si el sitio pide iniciar sesión, para: la contraseña la escribe el usuario.
- Guarda en `aula-en-vivo.json` solo id, curso, tipo, publicado y título, con la fecha de lectura.

### 3. Correr

```bash
node privado/verificador-anexos/construir-tabla.mjs
node scripts/anexos/verificar-anexos.mjs --sembrar
```

Sale en `privado/verificador-anexos/salida/`: `resultados.json`, `resultados.csv` y `panel.html`.
La consola muestra completitud, Índice de Alineación, estados y sensibilidad.

### 4. Leer el resultado con la fórmula

- **IA** = Σ peso·[cumple] ÷ Σ peso·[cumple o no cumple]; peso crítica 3, mayor 2, menor 1; los chequeos de juicio no pesan.
- **K** = casillas evaluadas ÷ (anexos esperados × chequeos). Si K < 100 %, hay anexos sin leer.
- **Estado**: BLOQUEADO si no se leyó o falla un crítico; OBSERVADO si IA < 100 % o hay juicio; LISTO si IA = 100 % sin juicio.
- **S** = errores sembrados detectados ÷ sembrados. Si S < 100 %, el verificador no es confiable: no entregues resultados.

### 5. Revisar solo «REQUIERE JUICIO»

- Decide con evidencia citada (frase del anexo + dato de la tabla). Si no alcanza, queda para el usuario.
- Decisiones vigentes: el portafolio no se crea como tarea (J01 se informa, no se corrige en el aula); las omisiones del
  anexo se listan para Natalia; si el anexo describe otra actividad, no se toca el aula.
- Si un CUMPLE o NO CUMPLE parece mal, es un posible error del verificador: calíbralo y vuelve a correr la prueba sembrada.

### 6. Nunca editar el anexo

El anexo lo edita solo Natalia. Lo que hay que cambiar va al reporte o a la tabla de reemplazos
(`privado/docs-anexos/reemplazos-anexos/generar.mjs`).

## Reporte al usuario

- Totales: IA global, completitud, LISTO / OBSERVADO / BLOQUEADO, sensibilidad.
- Lista «Para Natalia» con anexo, chequeo, regla y cita.
- El panel se puede publicar como página privada; compartirla la decide el usuario.

## Límites

- Solo lectura en Drive y en los LMS. Nunca editar ni comentar un anexo.
- Claude no escribe contraseñas; las claves de evaluador se tapan en toda evidencia.
- Publicar, borrar, matricular y cambiar permisos: solo con OK explícito del usuario en el chat.
- Nada de `privado/` va al repositorio ni a Drive compartido.

## Verificación

- Hay un `anexos/<PF>-<cli>.json` por anexo leído, con `leido` posterior a la última edición del Doc.
- `resultados.json` tiene la fecha de esta corrida y los conteos cuadran (el script falla si no).
- La prueba sembrada dio 100 % y se informó.
