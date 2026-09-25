# PF1821 · Módulo 2 · C1, C3 y C5 — Metodología, motivación y habilidades del siglo XXI

**Estado:** borrador · **Va en:** Anexo N°2, sección VI a), d) y e) · **Guía:** Anexo N°7, num. 7
**Para el 7,0:** C1 binario (la metodología está enfocada en la competencia de ESTE módulo);
C3 binario (el módulo aporta al aprendizaje a través de la interacción con la plataforma);
C5, tres estrategias para tres habilidades del siglo XXI.

> Este texto es la base común. Cada institución lo adapta a su LMS, su tutor y su
> calendario en `propuestas/<cliente>/PF1821/anexo2.md`, sin cambiar el anclaje a la competencia.

---

## a) ¿Qué hará? · Estrategia metodológica (C1)

**Competencia del módulo (textual):** CREAR WORKFLOWS BÁSICOS DE AUTOMATIZACIÓN UTILIZANDO
N8N, MANIPULANDO DATOS MEDIANTE NODOS FUNDAMENTALES E INTEGRANDO BASES DE DATOS BÁSICAS,
PARA RESOLVER PROBLEMÁTICAS EMPRESARIALES DE ACUERDO CON BUENAS PRÁCTICAS DE AUTOMATIZACIÓN.

La estrategia es **aprendizaje basado en problemas sobre un caso empresarial continuo**. La
competencia pide crear workflows *para resolver problemáticas empresariales*; por eso el
módulo no enseña n8n nodo por nodo en abstracto, sino que parte de un problema real de una
empresa ficticia —Mercado Austral y sus pedidos copiados a mano— y cada aprendizaje
esperado agrega una capa al mismo automatismo: primero se decide qué automatizar (AE1),
luego se construye el flujo base en la interfaz visual (AE2), después se limpian, convierten
y guardan los datos en Supabase (AE3) y al final el workflow aprende a decidir y a ser
depurado (AE4). Cada tramo combina una cápsula breve, una práctica guiada y una práctica
autónoma que el tutor retroalimenta antes del tramo siguiente.

| Tramo | Actividades del módulo | Horas | Sincrónica | Asincrónica |
| --- | --- | --: | --: | --: |
| 1 · AE1 | Video de bienvenida, autodiagnóstico, cápsula 1, cuadro comparativo, mapa de procesos del caso; sesión en vivo: análisis del caso | 3 | 1,5 | 1,5 |
| 2 · AE2 | Cápsula 2, tutorial "Tu primer workflow con datos limpios" parte 1 (crear y probar el workflow), actividad 1 parte B (inicio); sesión en vivo: construcción guiada y dudas | 4 | 1,5 | 2,5 |
| 3 · AE3 | Cápsula 3, tutorial partes 2 a 4 (transformar, Supabase, filtrar, resumir y cambiar de formato), video interactivo "Expresiones y depuración", actividad 1 partes B y C, prueba de Supabase; sesión en vivo: expresiones y tipos de datos | 6 | 1,5 | 4,5 |
| 4 · AE4 | Cápsula 4, actividad 2 "Rescate" (apoyada en el video interactivo del tramo 3), coevaluación, prueba objetiva, caso "Devoluciones", portafolio; sesión en vivo: depuración en grupo | 5 | 1,5 | 3,5 |
| | **Total** | **18** | **6** | **12** |

**Rol del tutor académico.** En lo teórico, presenta cada tramo y conduce la sesión en vivo
sobre el caso. En lo práctico, prepara los datos de prueba y el workflow con fallas, revisa
cada entrega con la rúbrica, devuelve en máximo 2 días hábiles con el formato fortaleza,
mejora y siguiente paso, responde el foro de cada tramo y da asistencia técnica con las
cuentas de n8n y Supabase.

**Atención a la diversidad.** Cada contenido está en más de un formato (cápsula narrada con
transcripción, tutorial escrito con capturas, video con preguntas); los datos de prueba
incluyen casos simples y "sucios" para distintos niveles; el autodiagnóstico inicial
permite al tutor identificar a quien necesita apoyo con la herramienta antes del tramo 2.

## b) ¿Cómo lo hará? · Actividades didácticas

Dos actividades prácticas distintas, desarrolladas en `C2-actividades.md`:
1. **Del formulario a la base de datos** — resolución de problemas, con el tutorial y las
   cápsulas como apoyo. Respuesta modelada: los dos workflows de referencia y el resumen
   correcto por comuna.
2. **Rescate del workflow roto** — análisis de caso con misiones y puntaje (gamificación)
   sobre un workflow con cinco fallas. Respuesta modelada: síntoma, detección, causa y
   corrección de cada falla.

## c) ¿Con qué lo van a hacer? · Medios

Enlace al LMS: `PENDIENTE:` por institución (va aquí, dentro de esta respuesta).
Medios del módulo: video de bienvenida (R01), infografía de la ruta (R02), cuatro cápsulas
narradas (R03), cuadro comparativo (R04), **tutorial guiado "Tu primer workflow con datos limpios"** (R05)
y **video interactivo "Expresiones y depuración"** (R06) —las dos herramientas didácticas de C4, ambas
del AE3, el aprendizaje seleccionado—, plantillas de bitácora y portafolio, n8n y
Supabase como entorno de práctica.

## d) Aspectos motivacionales (C3)

El módulo motiva **a través de la interacción con la plataforma**, no con un párrafo:
- **Un solo caso que avanza.** Cada entrega hace crecer el mismo workflow; el participante
  ve su progreso en algo que funciona.
- **Ruta visible.** La infografía y la barra de progreso del LMS muestran las cuatro
  estaciones; cada sección usa el mismo ícono de la infografía para que la navegación sea
  lineal e intuitiva.
- **Misiones e insignias.** La actividad 2 se juega por puntos; las insignias
  *Depurador/a* y *Rescatista de workflows* quedan en el perfil del participante.
- **Retroalimentación inmediata.** El video interactivo y la prueba objetiva responden al
  instante; el tutor devuelve en 2 días hábiles.
- **Un producto para mostrar.** El portafolio queda publicado en una URL que el
  participante puede enviar a un empleador.

## e) Habilidades del siglo XXI (C5)

Tres habilidades de la lista del Anexo N°7 (pág. 111), cada una con su estrategia y su
evidencia en el módulo.

<!-- verificable: ID=C5 tipo=tabla min=3 -->

| # | Habilidad transversal | Estrategia para desarrollarla | Cómo se evidencia |
| --- | --- | --- | --- |
| 1 | **Pensamiento crítico** (maneras de pensar) | En la actividad 2, antes de corregir cada falla el participante debe formular una hipótesis de causa y probarla con la evidencia del historial de ejecuciones, no por ensayo y error. | Bitácora de depuración con síntoma, hipótesis, evidencia y corrección para las cinco misiones. |
| 2 | **Colaboración** (maneras para trabajar) | Coevaluación en parejas: cada uno importa y prueba el workflow del otro con los mismos datos, y ambos acuerdan una mejora que aplican. | Pauta de coevaluación completa en el foro y la mejora aplicada visible en la segunda versión del workflow. |
| 3 | **Comunicación** (maneras para trabajar) | Cada workflow se documenta para una persona de negocio de Mercado Austral: qué hace, cuándo corre y qué hacer si falla, en lenguaje no técnico. | Nota de documentación en el portafolio (secciones 2 a 4), evaluada en el criterio "Reflexión y comunicación" de la rúbrica del portafolio. |

> **C1 · control antigenérico:** si este texto sirviera para otro plan formativo cambiando
> solo el nombre de la herramienta, está mal. Aquí se nombran la competencia textual, los
> nodos, Supabase, el caso y los productos de ESTE módulo.
