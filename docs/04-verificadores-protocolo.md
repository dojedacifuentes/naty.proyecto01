# 04 — Protocolo de verificadores

Los enlaces no son decoración: son la evidencia sobre la que se puntúa el 35% más pesado
de la propuesta técnica.

## Los tres enlaces obligatorios por propuesta

| Enlace | Dónde va | Qué sostiene |
| --- | --- | --- |
| LMS con usuario y contraseña | Anexo 2, VI y VIII | Todo el ítem C, 35% |
| Portafolio de proyectos | Anexo 2, V | Subcriterio 3 del ítem B, 7% de la técnica |
| Evidencia del LMS (imágenes o video) | Anexo 2, VIII | Admisibilidad |

## Las reglas que hacen caer una propuesta

**2026 (SENCE).** Si la evidencia adjunta no coincide con lo que muestra el LMS:
*"será rechazado por requisitos de curso"*. No ofrece rectificación.

**2024 (SOFOFA), como referencia histórica.** Si el equipo evaluador detectaba datos de
acceso incorrectos, podía pedir rectificación por correo; si el OTEC no respondía **en
24 horas hábiles, la oferta quedaba inadmisible**. Un link mal copiado costaba la
propuesta entera.

## Checklist por verificador

Se registra en `propuestas/<cliente>/<plan>/verificadores.md`.

- [ ] El link abre sin estar autenticado como administrador
- [ ] Las credenciales funcionan y son de **perfil participante**, no de docente
- [ ] El módulo visible es **el segundo** del plan formativo
- [ ] El contenido visible corresponde al plan formativo **de esta propuesta** y no a otro
- [ ] Las actividades descritas en el Anexo 2 están efectivamente en la plataforma
- [ ] Las imágenes o el video de evidencia muestran **esa misma** plataforma
- [ ] El enlace del portafolio abre y muestra un portafolio, no una carpeta vacía
- [ ] Existe el paso a paso de acceso y navegación, escrito para alguien que nunca entró

## El punto más peligroso

El cuarto. En un lote de 45 o 90 propuestas es exactamente el error que produce copiar
una propuesta para adaptarla a otro plan formativo y olvidar cambiar el enlace. Un
script detecta un 404; **no detecta que el LMS muestra el plan formativo equivocado**.
Esa revisión es humana y es la que más propuestas salva.

## Planilla de auditoría

`npm run verificadores` genera el esqueleto. Columnas:

| Columna | Contenido |
| --- | --- |
| Cliente / Plan | De qué propuesta viene |
| Sección Anexo 2 | V, VI o VIII |
| Afirmación respaldada | Qué dice la propuesta que este link prueba |
| URL | El enlace tal como aparece |
| Estado HTTP | abre / 404 / pide permiso / redirige / timeout |
| ¿Muestra lo que dice? | **Revisión humana de contenido** |
| Riesgo | Alto si sostiene un criterio puntuado |
| Acción y responsable | Qué hacer y quién |
