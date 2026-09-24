# PF1822 · Módulo 2 · B3 — Portafolio de proyectos

**Estado:** borrador · **Va en:** Anexo N°2, sección V (con **enlace** y rúbrica adjunta)
**Guía:** Anexo N°7, num. 4.3, pág. 103 · **Para el 7,0:** 6 de 6 elementos, desarrollados.

> La sección V pide el enlace al portafolio, no su descripción. Este archivo es la base
> común: cada institución lo publica con su identidad (ver parte B del manual).

**Nombre del portafolio del participante:** *Resumidor de tickets para Nube Sur*.

<!-- verificable: ID=B3 tipo=checklist min=6 -->
- [x] 1. Guía o índice de elementos, con tipo de trabajo y estrategia didáctica
- [x] 2. Introducción: intenciones, objetivos, punto de partida
- [x] 3. Temas centrales con evidencias por aprendizaje esperado
- [x] 4. Apartado de cierre como síntesis
- [x] 5. Plataforma digital de publicación definida
- [x] 6. Instrumento evaluativo asociado, desarrollado

*(Las marcas indican que el elemento está desarrollado en este archivo; la revisión humana
se marca en `01-entregables.md`.)*

---

## Elemento 1 · Guía o índice

| Sección | Tipo de trabajo | Evidencia | Estrategia didáctica | AE |
| --- | --- | --- | --- | --- |
| Introducción | Reflexión inicial | Punto de partida + autodiagnóstico | Metacognición | — |
| 1. La arquitectura | Análisis y diseño | Cuadro de tipos de modelos + diagrama del resumidor con su justificación | Análisis de caso | AE1 |
| 2. El cliente de API | Producto técnico | `cliente_ia.py`, pruebas y salida de `pytest` | Resolución de problemas | AE2 |
| 3. Los prompts | Experimentación | Prompts zero-shot y few-shot + registro de iteraciones | Laboratorio | AE3 |
| 4. Limpiar y medir | Producto técnico + análisis | Notebook del pipeline + `resultados.csv` + recomendación | Simulación con tablero | AE4 |
| Cierre | Síntesis | Reflexión final + plan de mejora | Metacognición | — |

## Elemento 2 · Introducción (plantilla que el participante completa)

> **Intención.** Qué quiero lograr en este módulo y cómo lo voy a usar en mi trabajo como
> desarrollador o desarrolladora.
> **Objetivos.** Los cuatro aprendizajes del módulo en mis palabras, y uno que me propongo profundizar.
> **Punto de partida.** Mi resultado en el autodiagnóstico y una aplicación de mi entorno
> donde un modelo generativo podría ayudar.

**Autodiagnóstico inicial** (escala 1 a 4, de "no lo sé hacer" a "lo hago solo"):
1. Distingo tipos de modelos generativos y sus usos. 2. Hago una solicitud HTTP con
autenticación desde Python. 3. Escribo pruebas unitarias para mi código. 4. Diseño un
prompt con ejemplos. 5. Limpio y tokenizo texto en Python. 6. Interpreto una métrica de
calidad de texto. Se repite en el cierre para comparar.

## Elemento 3 · Temas centrales con evidencias por aprendizaje esperado

Cada sección lleva la evidencia, una explicación de 5 a 10 líneas de qué hizo y por qué, y el
indicador que demuestra.

| AE (textual) | Evidencia mínima | Indicadores |
| --- | --- | --- |
| **AE1.** ANALIZAR EL ROL DE LOS MODELOS GENERATIVOS EN EL DESARROLLO DE APLICACIONES, DESCRIBIENDO SUS TIPOS, CASOS DE USO, TECNOLOGÍAS ASOCIADAS Y REPRESENTANDO ARQUITECTURAS FUNCIONALES QUE INTEGREN ESTOS MODELOS MEDIANTE APIS. | Cuadro de tipos de modelos con un caso de uso por tipo; diagrama de la arquitectura del resumidor; justificación con dos criterios | 1.1 · 1.2 · 1.3 |
| **AE2.** UTILIZAR UN MODELO DE IA A TRAVÉS DE API REST UTILIZANDO SOLICITUDES HTTP Y AUTENTICACIÓN, BASÁNDOSE EN LA DOCUMENTACIÓN OFICIAL DE OPENAI Y HUGGING FACE. | Enlace a `cliente_ia.py` y a sus pruebas; captura de `pytest` en verde; explicación de los campos de solicitud y respuesta con enlace a la documentación oficial | 2.1 · 2.2 · 2.3 |
| **AE3.** FORMULAR PROMPTS EFECTIVOS PARA MODELOS GENERATIVOS EN ESCENARIOS ZERO-SHOT O FEW-SHOT, CONSIDERANDO LA TAREA SOLICITADA Y LOS PARÁMETROS DE GENERACIÓN DISPONIBLES. | Prompts zero-shot y few-shot finales; tabla de iteraciones con cambio y efecto; comparación de temperature | 3.1 · 3.2 · 3.3 |
| **AE4.** IMPLEMENTAR UN PIPELINE DE PREPROCESAMIENTO Y EVALUACIÓN BÁSICA DE TEXTO EN PYTHON, APLICANDO TÉCNICAS DE LIMPIEZA, NORMALIZACIÓN Y MÉTRICAS INICIALES DE CALIDAD, DE ACUERDO CON LOS REQUISITOS DE ENTRADA Y SALIDA DEL MODELO. | Notebook con `limpiar`, `tokenizar` y `ngramas` aplicados a los 5 tickets; `resultados.csv`; recomendación con números | 4.1 · 4.2 · 4.3 |

**Cuidado con las claves:** el repositorio tiene un `.gitignore` con `.env`; ninguna clave de
API aparece en código, notebooks, capturas ni historial de commits. Una clave publicada se
revoca de inmediato y se registra en la bitácora.

## Elemento 4 · Cierre como síntesis (plantilla)

> 1. ¿Qué configuración recomendé para el resumidor y con qué evidencia?
> 2. ¿Qué error me costó más (en el código, el prompt o la métrica) y cómo lo resolví?
> 3. Autodiagnóstico final comparado con el inicial: el cambio más grande.
> 4. Próximo paso: qué agregaría al resumidor en el módulo siguiente del plan
>    (orquestación y agentes) y por qué.

## Elemento 5 · Plataforma de publicación

**Propuesta:** repositorio en **GitHub** con el código y un sitio en **GitHub Pages** que
funciona como portada del portafolio, generado desde una plantilla del curso. El plan ya
incluye Git y GitHub entre los recursos del módulo, así que el portafolio usa la misma
herramienta con la que se trabaja. El evaluador abre la URL sin iniciar sesión.

`PENDIENTE:` la plataforma la confirma cada institución. Lo que no cambia: un enlace que se
abre sin credenciales.

## Elemento 6 · Instrumento evaluativo asociado: rúbrica del portafolio

Se adjunta en la sección V del Anexo 2. Escala por criterio de 1 a 4. **Puntaje máximo:** 24.

| Criterio | 4 · Logrado | 3 · Mayormente logrado | 2 · Parcialmente logrado | 1 · No logrado |
| --- | --- | --- | --- | --- |
| **Completitud** | Los 6 elementos presentes y con contenido propio | Falta desarrollar uno | Faltan dos o tres | Faltan más de tres |
| **Evidencias AE1** | Cuadro, diagrama y justificación con dos criterios | Dos de las tres | Una o sin justificación | Sin evidencia |
| **Evidencias AE2** | Código que se ejecuta, pruebas en verde y campos explicados con la documentación | Código correcto con explicación incompleta | Código que requiere la clave en el archivo o sin pruebas | Sin código |
| **Evidencias AE3** | Dos estrategias, tres o más iteraciones y comparación de temperature | Iteraciones incompletas | Una estrategia sin registro | Sin evidencia |
| **Evidencias AE4** | Pipeline aplicado, métricas bien calculadas y recomendación con números | Métricas correctas sin recomendación | Métricas mal calculadas | Sin evidencia |
| **Reflexión, comunicación y seguridad** | Introducción y cierre conectados, autodiagnóstico comparado; ninguna clave expuesta | Reflexión clara sin comparación | Reflexión genérica | Sin reflexión o con una clave expuesta |

La nota se calcula con la escala de `B2-instrumentos.md` (exigencia 60 %).
