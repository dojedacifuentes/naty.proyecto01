# 01 — Guía de la propuesta técnica (punto 7.4 y Anexo N°7)

Lectura de las bases SENCE Becas Laborales Talento Digital 2026 (Res. Ex. N°2320).
Esta es la **referencia de rúbrica**: se consulta cada vez que se escribe contenido
evaluable. La versión ejecutable está en `data/rubrica-subcriterios.csv`.

---

## 1. Dónde se juega el puntaje

| Criterio | Peso | ¿Se influye escribiendo? |
| --- | --- | --- |
| Experiencia del oferente | 40% | No. Automático por registros SENCE |
| Comportamiento | 10% | No. Multas ponderadas históricas |
| **Propuesta técnica** | **40%** | **Sí. Es todo el trabajo** |
| Económica | 10% | Solo fijando el VHAC |

Dentro de la propuesta técnica:

```
Nota Técnica = 0,10·Equipamiento + 0,20·Estrategia Evaluativa
             + 0,35·Metodología + 0,35·Herramientas y Valor Agregado
```

**El 70% de la propuesta técnica está en Metodología y Herramientas.** La estrategia
evaluativa, que es lo que más tiempo toma redactar, pesa 20%.

Calendario en las bases: periodo de consultas y aclaraciones = **5 días hábiles** desde
el día siguiente a la publicación del llamado. Cierre de recepción de ofertas = 18:00
del **décimo día hábil**.

---

## 2. La regla del segundo módulo

Punto 7.4, textual:

> Para la evaluación del presente criterio (propuesta técnica) se solicitará desarrollar
> el segundo módulo del plan formativo.

La rúbrica completa se aplica **sobre el segundo módulo y nada más**. Indicadores,
instrumentos, portafolio, actividades prácticas y herramientas didácticas se refieren a
los aprendizajes esperados de ese módulo.

### Contradicción pendiente de aclarar

El numeral 4.3.1.1 dice lo contrario:

> a) El oferente deberá desarrollar todos los módulos en el Anexo N°2.
> c) Para el proceso de evaluación se revisarán y evaluarán todos los módulos.

Lectura razonable: el Anexo 2 lista **todos** los módulos en sus secciones descriptivas
(III tutores, IV actividades), pero el desarrollo evaluado en profundidad es solo el del
segundo. Coincide con que las pautas del 7.4 hablan siempre en singular del "módulo
solicitado".

**Acción:** es la consulta N°1 en `state/OPEN-QUESTIONS.md`. La diferencia entre
desarrollar un módulo y doce, multiplicada por 45 o 90 propuestas, decide la viabilidad
del proyecto. La respuesta de SENCE se publica y aplica a todos los oferentes, así que
preguntar no revela estrategia.

---

## 3. Hallazgo central: la rúbrica es un ejercicio de conteo

Casi ningún criterio evalúa calidad de redacción. Evalúa **cantidad de elementos
presentes**. Los descriptores del 7.0 están escritos como números:

- 3 indicadores de evaluación por cada aprendizaje esperado
- 3 instrumentos de evaluación distintos
- 100% de los 6 elementos del portafolio
- 1 mecanismo de retroalimentación + 1 pauta de autoevaluación + 1 de coevaluación
- 2 actividades prácticas distintas
- 2 herramientas didácticas distintas
- 3 estrategias para 3 habilidades del siglo XXI
- 5 o más herramientas de la industria digital
- 4 estrategias de vinculación temprana
- 1 actividad de extensión por cada 50 horas del plan

Consecuencia: **una propuesta que cumple los conteos saca 7.0 aunque esté escrita sin
brillo; una brillante con 2 instrumentos en vez de 3 saca 5.0.**

Nota explícita de las bases: *"La cantidad mínima de criterios de evaluación a
desarrollar en el módulo para alcanzar la nota máxima es de 3 criterios,
independientemente de los que considere el plan formativo del catálogo SENCE"*.

**Única excepción al conteo:** el criterio de coherencia. La metodología baja a 1.0 si
es *"de carácter genérico de manera tal que puede aplicarse a un módulo de cualquier
Plan Formativo"*. Vale 30% de la metodología y es exactamente el que castiga el texto
generado en serie.

---

## 4. Ítem A — Equipamiento e infraestructura (10%)

Sin subcriterios. Una pregunta, tres notas.

| Qué ofrece la propuesta | Nota |
| --- | --- |
| Infraestructura **con** equipos computacionales, para quien no tenga equipo | 7.0 |
| Solo equipos computacionales para quienes no tengan equipamiento | 5.0 |
| Ni infraestructura ni equipos | 1.0 |

Condiciones operativas que hay que escribir, no solo declarar:

- Si incluye infraestructura, esa infraestructura **debe incluir equipos computacionales**.
  Una sala sin equipos no da 7.0.
- Si considera solo equipos: van en **comodato gratuito** durante el curso, y el alumno
  se compromete por carta firmada o correo a devolverlos al terminar o desertar.
- Las características mínimas son las que el plan formativo lista en *"recursos
  materiales para la implementación del módulo formativo"*. Sale de SIPFOR y varía por
  plan: no se puede escribir un párrafo genérico para los 15.

---

## 5. Ítem B — Estrategia evaluativa (20%)

| Subcriterio | Peso interno | Umbral del 7.0 | Guía |
| --- | --- | --- | --- |
| 1. Criterios de evaluación | 10% | 3 indicadores por aprendizaje esperado | Anexo 7, num. 2 |
| 2. Instrumentos de evaluación | 35% | 3 instrumentos distintos, todos los aprendizajes | Anexo 7, num. 3, 3.1-3.3 |
| 3. Portafolio de proyectos | 35% | 100% de los elementos del num. 4.3 | Anexo 7, num. 4, 4.1-4.3 |
| 4. Retroalimentación y colaborativo | 20% | Feedback + autoevaluación + coevaluación | Anexo 7, num. 5, 5.1-5.4 |

### Indicadores de logro (num. 2)

Fórmula exacta de redacción: **Acción (verbo en presente) + Contenido (qué hace en
concreto) + Condición (cómo lo hace)**.

Los aprendizajes esperados **deben ser los del plan formativo SENCE, textuales**, no
reformulados. Los indicadores sí son propios.

### Instrumentos (num. 3)

Tres familias; elegir de familias distintas para que cuenten como "distintos":

| Familia | Instrumentos |
| --- | --- |
| Observación (3.1) | Lista de cotejo, escala de apreciación, rúbrica |
| Desempeño (3.2) | Resolución de problemas, análisis de casos, portafolio, proyecto individual, proyecto grupal |
| Objetiva (3.3) | Selección múltiple, ejercicios interpretativos, respuesta breve, comprensión lectora |

Cada instrumento debe contener **todos** los aprendizajes esperados del módulo.

### Portafolio (num. 4.3) — lista cerrada de 6 elementos

Deben estar *"desarrollados no solo descritos"*:

1. Guía o índice de elementos, con tipo de trabajo o evidencias y estrategia didáctica
2. Introducción con intenciones, objetivos y punto de partida
3. Temas centrales con documentación y evidencias por aprendizaje esperado
4. Apartado de cierre como síntesis del aprendizaje
5. Definición de la plataforma digital o herramienta de publicación
6. Instrumento evaluativo asociado, desarrollado y no solo enunciado

6/6 → 7.0 · 4/6 (70%) → 5.0 · 3/6 (50%) → 3.0 · menos → 1.0

Es aritmética pura, y es donde más fácil se pierde puntaje por omitir un elemento
aburrido como el índice.

### Retroalimentación (num. 5.4) — 3 productos desarrollados

a. Selección de instrumento evaluativo coherente
b. Diseño de instrumento de autoevaluación y coevaluación
c. Diseño de **bitácora de registro de resultados y plan de trabajo** ← la más olvidada

---

## 6. Ítem C — Metodología (35%)

El único ítem que **no se evalúa leyendo el documento**: *"Esta metodología será evaluada
de acuerdo a la experiencia que obtendrá el usuario en el LMS"*.

| Subcriterio | Peso interno | Umbral del 7.0 |
| --- | --- | --- |
| Relación metodología-competencia | 30% | Enfocada a la competencia del módulo. **Binario: 7.0 o 1.0** |
| Proceso de aprendizaje | 30% | 2 actividades prácticas distintas que den la habilidad |
| Aspectos motivacionales | 10% | Contribuye vía interacción con la plataforma. **Binario** |
| Uso de los medios | 20% | 2 herramientas didácticas distintas, **ambas** efectivas |
| Habilidades del siglo XXI | 10% | 3 estrategias para 3 habilidades transversales |

Las tres preguntas (Anexo 7, num. 7): ¿qué va a hacer? (estrategia de aprendizaje),
¿cómo lo van a hacer? (actividades didácticas), ¿con qué lo van a hacer? (medios
soportes multimedia).

**Acceso al LMS.** Dos caminos: (a) link con usuario y contraseña que muestre el módulo
desde la perspectiva de un participante; (b) pedir acceso a la plataforma LMS de SENCE
escribiendo a `adminelearning@sence.cl` con nombre del concurso, nombre y RUT del OTEC y
RUT del usuario de prueba. Si se elige (b), el trámite se inicia apenas se publique el
llamado.

**Dos de cinco subcriterios son binarios** (40% de la metodología): se gana entero o se
pierde entero.

**Trampa en "uso de los medios":** el 7.0 exige que **las dos** herramientas didácticas
permitan adquirir la habilidad. Si solo una lo logra, baja a 5.0 aunque haya dos. Es el
único subcriterio donde el conteo no basta.

---

## 7. Ítem D — Herramientas educativas y valor agregado (35%)

El ítem más rentable: pesa lo mismo que la metodología pero se responde con listas bien
construidas en vez de un LMS armado.

**Alcance distinto:** mientras B y C se desarrollan solo sobre el segundo módulo, este
ítem se desarrolla *"a lo largo de todo el plan formativo"*.

| Subcriterio | Peso interno | 7.0 | 5.0 | 3.0 |
| --- | --- | --- | --- | --- |
| 1. Herramientas educativas | 40% | 5 o más | 3 o 4 | 2 |
| 2. Vinculación temprana | 30% | 4 estrategias | 3 | 2 |
| 3. Actividades de extensión | 30% | 1 cada 50 h | 1 cada 80 h | 1 cada 100 h |

### Herramientas educativas

Deben ser **adicionales a las descritas en el plan formativo** —ese filtro descarta el
relleno— y cada una necesita **tres explicaciones**: por qué fue seleccionada, cómo se
usa en la industria, cómo se usará en la sala de clases.

Categorías del num. 8.1: almacenamiento y datos (AWS, Google Cloud, Azure), gestión de
proyectos (Jira, Asana, Trello, Basecamp), gestión de clientes (CRM), comunicación
(Slack, Zoom, Loom).

### Vinculación temprana

Cada estrategia necesita **cuatro explicaciones**: por qué, en qué consiste, cuándo se
desarrollará, cómo permite el aprendizaje.

Ejemplos del num. 9.1: análisis de casos reales, prototipos evaluados por gente activa
en la industria, conversatorios con expertos, visitas guiadas, simulaciones de entrevista
laboral, proyectos freelance, coach o mentor laboral.

Exigencia que casi nadie escribe: estas acciones **deben ser mediadas por la
institución**. Si se usa mentor, hay que entrenarlo y hacerle seguimiento.

### Actividades de extensión

El umbral es una división. Números calculados por plan en `data/umbrales-por-plan.csv`.

Cada actividad necesita **tema, tipo, objetivo, cantidad y momento de ejecución**, y
siempre tienen carácter opcional.

Tipos que enumera la guía: charla o webinar, exposición técnica demostrativa,
laboratorio, hackatón, visita guiada, taller con especialistas, muestra de proyectos.

---

## 8. Tabla maestra: los 13 subcriterios por peso real

| # | Subcriterio | Ítem | % de la técnica | % nota final | Umbral del 7.0 |
| --- | --- | --- | --- | --- | --- |
| 1 | Herramientas de la industria | D | 14,0% | 5,6% | 5 o más, con 3 explicaciones cada una |
| 2 | Vinculación temprana | D | 10,5% | 4,2% | 4 estrategias, con 4 explicaciones cada una |
| 3 | Actividades de extensión | D | 10,5% | 4,2% | 1 cada 50 horas |
| 4 | Relación metodología-competencia | C | 10,5% | 4,2% | No genérica. Binario |
| 5 | Proceso de aprendizaje | C | 10,5% | 4,2% | 2 actividades prácticas distintas |
| 6 | Equipamiento e infraestructura | A | 10,0% | 4,0% | Infraestructura **con** equipos |
| 7 | Uso de los medios | C | 7,0% | 2,8% | 2 herramientas didácticas, ambas efectivas |
| 8 | Instrumentos de evaluación | B | 7,0% | 2,8% | 3 instrumentos distintos |
| 9 | Portafolio de proyectos | B | 7,0% | 2,8% | 6 de 6 elementos |
| 10 | Retroalimentación y colaborativo | B | 4,0% | 1,6% | Feedback + auto + coevaluación + bitácora |
| 11 | Aspectos motivacionales | C | 3,5% | 1,4% | Interacción con la plataforma. Binario |
| 12 | Habilidades del siglo XXI | C | 3,5% | 1,4% | 3 estrategias para 3 habilidades |
| 13 | Criterios de evaluación | B | 2,0% | 0,8% | 3 indicadores por aprendizaje esperado |

**El ítem D solo vale más que B y A juntos** (35% contra 30%) y se responde con listas
enumeradas. Bajo presión de tiempo, se prioriza D.

**Los tres subcriterios de abajo suman 9,5%** y son los que más párrafos consumen por
punto obtenido. Se cumplen al mínimo y se sigue.
