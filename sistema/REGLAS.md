# Reglas del sistema Aulas y Anexos

Versión 1.0 · 2026-10-08 · responsable: dojedacifuentes · generado desde [`data/reglas/reglas.json`](../data/reglas/reglas.json) con `npm run reglas`.

**41 reglas.** Por verificación: Manual 16 · Automática 11 · Parcial 13 · Proceso 1. Por severidad: Crítica 14 · Mayor 16 · Menor 11.

- **Severidad**: critica = puede invalidar el anexo o es causal de rechazo (peso 3) · mayor = afecta la evaluación técnica (peso 2) · menor = forma o limpieza (peso 1).
- **Verificación**: auto = la revisa un script · parcial = un script revisa una parte · manual = la revisa una persona · proceso = regla de trabajo, no se verifica en un documento.
- **Chequeos**: IDs de [`scripts/anexos/verificar-anexos.mjs`](../scripts/anexos/verificar-anexos.mjs) que revisan la regla en los anexos.

## Fuentes

| ID | Regla | Severidad | Ámbito | Verificación | Chequeos | Origen |
|---|---|---|---|---|---|---|
| R01 | Jerarquía de fuentes: decisión del equipo, después Anexos 2 VF, después Word «Textos que se usaron en los anexos», después documentos 2024. | Crítica | Anexo y aula | Manual | — | Decisión de coordinación 03-10 |
| R02 | En la evaluación del módulo manda el Anexo 2. Solo cambia la evaluación, no el ABP ni el ABPRO. | Mayor | Aula | Manual | — | Decisión de coordinación 03-10 |
| R03 | Aprendizajes esperados, criterios y contenidos según SIPFOR, cotejados con el PDF oficial del plan. | Crítica | Anexo y aula | Automática | A03 | Bases 2026, 13.3.2 h |
| R04 | Nombres de recursos en el LMS según el vocabulario de cada cliente (planilla 02 Recursos M2). | Menor | Aula | Parcial | — | Planilla 02, pestaña vocabulario |
| R05 | Los Anexos 2 VF los edita solo Natalia. El sistema solo los lee. | Crítica | Anexo | Proceso | — | Decisión de coordinación |

## Identidad

| ID | Regla | Severidad | Ámbito | Verificación | Chequeos | Origen |
|---|---|---|---|---|---|---|
| R06 | Título del aula «Programa “Talento Digital Para Chile”, Becas Laborales 2026, &lt;curso> (&lt;código>)», sin «Especial», también en el banner. | Mayor | Aula | Parcial | — | Decisión de coordinación 03-10 |
| R07 | Módulo 2 es el que el PDF oficial numera N°2, contando el transversal. | Crítica | Anexo y aula | Manual | — | OPEN-QUESTIONS #16 |
| R08 | 26 aulas válidas. PF1485, PF1487 y PF1493 no se postulan. | Crítica | Anexo y aula | Manual | — | Decisión de coordinación |
| R09 | La plataforma nombrada es la real: U. Autónoma usa Canvas; UNAB, Coding Dojo y Chile Conductores usan Moodle. | Crítica | Anexo | Automática | A06 | Aulas 2026 |

## Estructura

| ID | Regla | Severidad | Ámbito | Verificación | Chequeos | Origen |
|---|---|---|---|---|---|---|
| R10 | Se enuncian todos los módulos y solo se desarrolla el 2. Portada sin lista de módulos. | Mayor | Aula | Manual | — | Bases 2026 y decisión 02-10 |
| R11 | Aprendizajes esperados abiertos uno tras otro, sin clic. | Menor | Aula | Manual | — | Decisión de coordinación 02-10 |
| R12 | Módulo 2: bienvenida, cada aprendizaje esperado y cierre. | Mayor | Aula | Manual | — | Modelo de estructura LMS 02-10 |
| R13 | Foro de consultas del curso, además del foro del módulo. | Menor | Aula | Manual | — | Decisión de coordinación 04-10 |
| R14 | Sin infografía «Ruta del módulo», cápsulas de video por AE ni «video herramienta». | Menor | Anexo y aula | Parcial | J02 | Decisión de coordinación 02-10 |
| R15 | Sin restos de plantillas: botón SENCE en U. Autónoma, Zoom o Clase On-Line, PDF 2024 de Skillnest. | Menor | Aula | Manual | — | Decisiones 02-10 y 05-10 |
| R16 | En Canvas, todos los archivos publicados (si no, el participante ve un candado). | Mayor | Aula | Manual | — | Revisión del 04-10 |

## Contenido AE

| ID | Regla | Severidad | Ámbito | Verificación | Chequeos | Origen |
|---|---|---|---|---|---|---|
| R17 | AE y criterios con las mismas palabras de SIPFOR. | Crítica | Anexo y aula | Parcial | A03, A04 | Bases 2026, 13.3.2 h |
| R18 | Al menos 3 criterios por AE. Los faltantes salen de la planilla y deben ser idénticos en el anexo y el aula. | Mayor | Anexo y aula | Parcial | A04 | Guía de propuesta técnica y planilla 02 |
| R19 | Por AE: lectura, ABP individual, ABPRO grupal, quiz e infografía. | Mayor | Aula | Manual | — | Decisiones 27-09 y 04-10 |
| R20 | Quiz SCORM «Quiz gamificado del aprendizaje esperado n», visible completo. Sin Genially. | Menor | Anexo y aula | Parcial | A13 | Decisión de coordinación 04-10 |
| R21 | «Aprendizaje esperado n», nunca «tramo». Fichas con el AE completo. | Menor | Anexo y aula | Automática | A14 | Decisión de coordinación 02-10 |

## Actividades

| ID | Regla | Severidad | Ámbito | Verificación | Chequeos | Origen |
|---|---|---|---|---|---|---|
| R22 | El ABPRO dice que se trabaja en equipo. Un Doc por AE y cliente, con su marca. | Mayor | Aula | Automática | — | Decisión de coordinación 04-10 |
| R23 | Entry: ABPRO AE2-AE7 y evaluación con «Todo Ventas en Línea». PF1486: ABP y ABPRO intercambiados en AE4 y AE5. | Mayor | Aula | Manual | — | Decisión de coordinación 04-10 |
| R24 | Evaluación del módulo: enunciado casi literal del anexo, rúbrica que enlaza el anexo y caso ficticio. | Mayor | Anexo y aula | Manual | — | Decisión de coordinación 03-10 |
| R25 | El portafolio no se crea como tarea del aula. | Menor | Anexo y aula | Parcial | J01 | Decisión de coordinación 04-10 |
| R26 | No se enlaza la respuesta modelo al participante. | Mayor | Aula | Manual | — | DECISIONS |

## Lenguaje

| ID | Regla | Severidad | Ámbito | Verificación | Chequeos | Origen |
|---|---|---|---|---|---|---|
| R27 | En lo que ve el participante: sin modalidad, horas ni minutos; sin «Duración», «Tiempo estimado», «[Fecha de entrega]», notas para el coach ni marcas de otro cliente. | Mayor | Aula | Parcial | — | Decisión de coordinación 02-10 |
| R28 | Sin «plan formativo», «oficial», «textual» ni «literal» en los recursos. | Menor | Aula | Parcial | — | DECISIONS |

## Marca

| ID | Regla | Severidad | Ámbito | Verificación | Chequeos | Origen |
|---|---|---|---|---|---|---|
| R29 | El anexo y el aula nombran los recursos igual (vocabulario del cliente). | Menor | Anexo y aula | Parcial | J03 | Planilla 02, pestaña vocabulario |
| R30 | Colores y logo del cliente. | Menor | Aula | Manual | — | Decisión de coordinación 02-10 |

## Evaluador

| ID | Regla | Severidad | Ámbito | Verificación | Chequeos | Origen |
|---|---|---|---|---|---|---|
| R31 | Acceso del evaluador con perfil de participante; el enlace abre sin ser administrador. | Crítica | Anexo y aula | Parcial | A17 | Bases 2026, 7.4 |
| R32 | Evaluador matriculado en las 26 aulas. Credenciales solo en la planilla 02 y en el anexo, nunca en el repositorio. | Crítica | Aula | Automática | — | AGENTS §2.4 |
| R33 | La evidencia (imágenes o video) coincide con el aula actual; si no, es causal de rechazo. | Crítica | Anexo y aula | Parcial | A18 | Anexo 2, sección VIII |
| R34 | Correo y al menos 12 GB de nube por participante. | Mayor | Anexo | Automática | A16 | Anexo 2, VIII f |

## Anexo 2

| ID | Regla | Severidad | Ámbito | Verificación | Chequeos | Origen |
|---|---|---|---|---|---|---|
| R35 | II: nombre y código del curso iguales al plan y al aula. | Crítica | Anexo | Automática | A01, A02 | Bases 2026 y parrilla 2026 |
| R36 | IV: todos los módulos con horas y modalidad, sumando el total del plan. | Mayor | Anexo | Parcial | A05 | Anexo 2, sección IV |
| R37 | V: enlace al portafolio y rúbrica; los instrumentos son los mismos que enlaza el aula. | Mayor | Anexo | Manual | — | Anexo 2, sección V |
| R38 | V.1: AE y criterios iguales al plan y al aula, con 3 indicadores por AE. | Crítica | Anexo | Automática | A03, A04 | Anexo 2, sección V.1 |
| R39 | VI b/c: AE seleccionado con ABP, ABPRO y 2 herramientas; enlaces directos a actividades del aula correcta. | Mayor | Anexo | Automática | A08, A09 | Bases 2026, 7.4 y Anexo 2 VI c |
| R40 | VIII: enlace directo al curso, credenciales, paso a paso de la plataforma real y evidencia. | Crítica | Anexo | Automática | A07, A15 | Anexo 2, sección VIII |
| R41 | Limpieza: sin corchetes, notas de borrador, «Eliminar leyenda» ni «V0»; sin «Genially» si el aula ya no lo usa. | Crítica | Anexo | Automática | A10, A11, A12, A13 | Tabla de reemplazos 04-10 |
