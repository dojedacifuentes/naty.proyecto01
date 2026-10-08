---
name: reglas-aula
description: Revisa un texto, un documento o un aula LMS completa contra las reglas del sistema de aulas de la licitación Talento Digital 2026 (sin modalidad, sin horas ni minutos, sin «tramo», «Duración», «Tiempo estimado», «[Fecha de entrega]», notas para el coach ni marcas de otro cliente; vocabulario de cada cliente; título sin «Especial»; estructura del módulo 2). Úsala siempre antes de publicar o dar por bueno cualquier texto que verá el estudiante (etiquetas, tareas, páginas de Canvas, Docs ABP/ABPRO, enunciados de evaluación, PDF), cuando el usuario pida «revisar», «auditar» o «chequear reglas» de un aula, y como paso final de las skills armar-aula-moodle, armar-aula-canvas y cruce-anexo.
---

# Revisar contra las reglas del aula

Las bases exigen aulas limpias y auditables. Un evaluador que lee «sesión en vivo» o «Duración: 4 horas»
puede marcar incumplimiento. Esta skill revisa y reporta. No corrige sola: los cambios en el LMS van con armar-aula-*.

## Catálogo de reglas

- Fuente única: `data/reglas/reglas.json` (IDs `R01` a `R41`). Lo está creando otra persona.
- Lee el catálogo antes de revisar y usa sus IDs, textos y ejemplos tal cual.
- Si el archivo aún no existe o falta un ID, reporta con la descripción de la regla y escribe `ID pendiente`.
  No inventes la numeración.

## Reglas que debes cubrir (resumen; el catálogo manda)

1. **Modalidad**: nada de «online», «en línea», «sincrónica», «asincrónica», «sesión en vivo», «micro salas»,
   «clases online/Zoom». El curso tiene una sola modalidad; nombrarla sugiere otra.
2. **Horas y minutos**: no aludir a horas del curso o del módulo ni a minutos estimados de actividades.
   Excepción: números del caso («3 minutos por pedido», «horas liberadas») son contenido, no duración.
3. **Palabras prohibidas**: «tramo» (se dice «Aprendizaje esperado n»), «Duración», «Tiempo estimado»,
   «[Fecha de entrega]», notas o instrucciones para el coach, marcadores de plantilla.
4. **Marcas de otro cliente**: logos, nombres o dominios ajenos (p. ej. «Skillnest» en un aula UNAB,
   «Moodle» en un texto de U. Autónoma, que usa Canvas; learning.skillnest.com en vez de learning-pro).
5. **Título**: «Programa “Talento Digital Para Chile”, Becas Laborales 2026, <curso> (<código>)», sin «Especial».
6. **Vocabulario del cliente** (copia en `privado/vocabulario-clientes.json`; «Quiz» queda «Quiz»):

| Clave | UNAB | Coding Dojo (cd) | U. Autónoma (ua) | Chile Conductores (chc) |
|---|---|---|---|---|
| lectura | Lectura | Material de estudio | Dossier de lectura | Material de lectura |
| abp | ABP Trabajo individual | Ejercicio ABP | Ensayo individual (ABP) | Práctica supervisada individual (ABP) |
| abpro | ABPRO Trabajo grupal | Desarrollo de Proyecto ABPRO | Laboratorio guiado (ABPRO) | Práctica supervisada en equipo (ABPRO) |
| final | Evaluación del módulo | Sprint de cierre (Evaluación del módulo) | Prueba de desempeño (Evaluación del módulo) | Evaluación de desempeño (Evaluación del módulo) |

   Rúbricas, listas de cotejo y escalas: ver el JSON. Quiz SCORM: «Quiz gamificado del aprendizaje esperado n».
7. **Estructura del aula y del módulo 2**:
   - Portada del curso sin lista de módulos ni «Se enuncia»/«Se desarrolla».
   - Todos los módulos del plan como secciones en orden («Módulo n: nombre»); solo el 2 se desarrolla.
   - Portada del módulo 2 con cada aprendizaje esperado **completo** (no solo el verbo).
   - Aprendizajes esperados abiertos, uno tras otro, sin clic (Moodle: `coursedisplay=0`).
   - Por AE: texto y criterios textuales de la ficha SIPFOR 2026 (más los criterios faltantes de
     `privado/vocabulario-clientes.json` → `criteriosFaltantes`), lectura, ABP, ABPRO, quiz, infografía.
   - Cierre con video resumen y evaluación del módulo; «Foro de consultas del módulo» y «Foro de consultas» del curso.
   - Sin infografía «Ruta del módulo», sin video cápsulas de AE, sin «video herramienta».
   - Sin tarea «Portafolio» aunque el anexo la nombre (decisión del usuario 04-10).
   - Sin botón «Iniciar Sesión SENCE» en Canvas U. Autónoma.
   - ABPRO redactado en equipo («En equipo, …», «el equipo entrega»).
8. **Colores del cliente**: CHC azul marino #0F3D5E / turquesa #0E7490; Skillnest celeste #01BFE8;
   UNAB azul #051C2C / rojo #AA182C; U. Autónoma rojo #D12E2E, gris #3A4B57, letra Lato.

## Pasos

1. Define el alcance: un texto suelto, un archivo local, un Doc o un aula (cliente + código PF + id del curso).
2. Obtén el texto sin reescribirlo. Archivos locales: léelos. Aula: texto de la página en la pestaña del usuario
   (la salida de javascript_tool se corta a ~1000 caracteres: pagina con `slice` o escribe el texto en
   `document.body` y léelo con get_page_text). Doc de Google: ver hacerlo-en-su-navegador (mobilebasic).
3. Barrido automático. Punto de partida (ajústalo al catálogo):
   ```
   online|en l[ií]nea|sincr[oó]nic|asincr[oó]nic|sesi[oó]n en vivo|micro ?salas?|zoom|tramo|Duraci[oó]n|
   Tiempo estimado|\[Fecha de entrega\]|coach|Especial|\b\d+\s*(horas?|hrs?|minutos?|min)\b
   ```
   Agrega los nombres y dominios de los otros tres clientes.
4. Revisa cada coincidencia en su contexto. Los términos técnicos no cuentan («asincronía» de httpx,
   «sincronizando» en Git). Si dudas, marca REQUIERE JUICIO; no la descartes.
5. Revisa a mano lo que el barrido no ve: vocabulario, título, estructura, AE completos, criterios textuales.
6. Reporta.

## Formato del reporte

Una fila por hallazgo. Sin evidencia citada no hay CUMPLE.

| Regla | Cita (literal, ≤ 15 palabras) | Ubicación | Veredicto | Nota |
|---|---|---|---|---|
| R07 | «Duración: 4 horas» | UNAB 705 · etiqueta «Aprendizaje esperado 2: presentación» | NO CUMPLE | quitar la línea |

- Ubicación: cliente, id del curso, nombre del elemento y cmid o id de Canvas; o archivo y línea.
- Veredicto: `CUMPLE`, `NO CUMPLE` o `REQUIERE JUICIO`.
- Al final: totales por veredicto y lista corta de lo que exige decisión del usuario.

## Límites

- Solo lees y reportas. No edites el aula ni los Docs desde esta skill.
- Nunca edites un Anexo 2: lo edita solo Natalia.
- Claude no escribe contraseñas. Publicar, borrar, matricular o cambiar permisos: solo con OK explícito del usuario en el chat.
- No toques cursos ajenos (p. ej. los otros 7 cursos de la subcuenta Canvas 1078, el curso 125 de CHC).
- Nunca guardes credenciales en el repo.

## Verificación

- Cada regla del catálogo aparece en el reporte con un veredicto, o como «no aplica» con el motivo.
- Cada NO CUMPLE y cada CUMPLE tiene cita y ubicación que el usuario puede abrir.
- El barrido se corrió sobre el texto completo (anota cuántos caracteres o elementos leíste).
