# PF1821 · Módulo 2 · B3 — Portafolio de proyectos

**Estado:** borrador · **Va en:** Anexo N°2, sección V (con **enlace** y rúbrica adjunta)
**Guía:** Anexo N°7, num. 4.3, pág. 103 · **Para el 7,0:** 6 de 6 elementos, desarrollados.

> La sección V pide el enlace al portafolio, no su descripción. Este archivo es la base
> común: cada institución lo publica con su identidad (ver parte B del manual).

**Nombre del portafolio del participante:** *Automatizaciones para Mercado Austral*.

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

Página de inicio del portafolio. Cada participante la completa con sus enlaces.

| Sección | Tipo de trabajo | Evidencia | Estrategia didáctica | AE |
| --- | --- | --- | --- | --- |
| Introducción | Reflexión inicial | Texto de punto de partida + autodiagnóstico | Metacognición | — |
| 1. El caso y la herramienta | Análisis | Mapa de procesos automatizables + cuadro comparativo | Análisis de caso | AE1 |
| 2. Mi primer workflow | Producto técnico | Workflow "Pedido a registro" exportado + capturas de ejecución | Resolución de problemas | AE2 |
| 3. Datos en movimiento | Producto técnico | Workflow "Resumen semanal" + tabla en Supabase + XML generado | Resolución de problemas | AE3 |
| 4. Rutas y rescate | Producto técnico + bitácora | Workflow reparado + bitácora de depuración | Análisis de caso con gamificación | AE4 |
| Cierre | Síntesis | Reflexión final + plan de mejora | Metacognición | — |

## Elemento 2 · Introducción (plantilla que el participante completa)

> **Intención.** Qué quiero lograr en este módulo y para qué me sirve en mi trabajo.
> **Objetivos.** Los cuatro aprendizajes del módulo, en mis palabras, con uno que me
> propongo profundizar.
> **Punto de partida.** Mi resultado en el autodiagnóstico inicial (ver abajo) y un
> proceso de mi entorno que me gustaría automatizar.

**Autodiagnóstico inicial** (5 afirmaciones, escala 1 a 4: "no lo sé hacer" a "lo hago solo"):
1. Explico qué es un workflow y un trigger. 2. Construyo un flujo en una herramienta
visual. 3. Transformo datos entre JSON y CSV. 4. Escribo una condición lógica con "y" y "o".
5. Encuentro la causa de un error mirando los datos de cada paso.
El mismo autodiagnóstico se repite en el cierre para comparar.

## Elemento 3 · Temas centrales con evidencias por aprendizaje esperado

Cada sección lleva: la evidencia, una explicación de 5 a 10 líneas de qué hizo y por qué, y
el indicador que demuestra.

| AE (textual) | Evidencia mínima | Indicadores |
| --- | --- | --- |
| **AE1.** DISTINGUIR LOS CONCEPTOS FUNDAMENTALES DE AUTOMATIZACIÓN DE WORKFLOWS Y LAS CARACTERÍSTICAS DE N8N, DE ACUERDO CON CASOS DE USO EMPRESARIALES REALES. | Mapa con tres procesos automatizables del caso y su beneficio; diagrama propio de la arquitectura de n8n; cuadro comparativo n8n · Make · Zapier con su conclusión | 1.1 · 1.2 · 1.3 |
| **AE2.** CREAR WORKFLOWS BÁSICOS UTILIZANDO LA INTERFAZ VISUAL DE N8N, PARA AUTOMATIZAR PROCESOS SIMPLES SEGÚN REQUERIMIENTOS DEFINIDOS. | Export JSON del workflow "Pedido a registro"; captura del canvas y de una ejecución exitosa con su panel de salida | 2.1 · 2.2 · 2.3 |
| **AE3.** MANIPULAR DATOS UTILIZANDO NODOS FUNDAMENTALES DE N8N, PARA TRANSFORMAR INFORMACIÓN SEGÚN REQUERIMIENTOS ESPECÍFICOS DEL WORKFLOW. | Export del workflow "Resumen semanal"; la tabla resumen por comuna; el XML generado; captura de la tabla `pedidos` en Supabase | 3.1 · 3.2 · 3.3 · 3.4 |
| **AE4.** IMPLEMENTAR LÓGICA CONDICIONAL Y ESTRUCTURAS DE CONTROL EN WORKFLOWS, APLICANDO BUENAS PRÁCTICAS DE DEBUGGING Y TRAZABILIDAD. | Workflow reparado de la actividad 2; bitácora con las cinco misiones; captura del historial de ejecuciones probando cada ruta | 4.1 · 4.2 · 4.3 |

**Cuidado con los datos:** las capturas no deben mostrar claves, credenciales ni correos
reales. En el módulo se trabaja solo con los datos ficticios del caso.

## Elemento 4 · Cierre como síntesis (plantilla)

> 1. ¿Qué proceso de Mercado Austral automaticé y qué cambió para la empresa? (con números:
>    tiempo, pedidos, errores evitados)
> 2. ¿Cuál fue el error más difícil de encontrar y qué aprendí de cómo lo encontré?
> 3. Autodiagnóstico final: comparo con el inicial y explico el cambio más grande.
> 4. Próximo paso: un proceso de mi entorno que podría automatizar con lo aprendido y el
>    primer workflow que construiría.

## Elemento 5 · Plataforma de publicación

**Propuesta:** un sitio por participante en **GitHub Pages**, generado desde una plantilla
del curso: es gratuito, queda en una URL visitable sin iniciar sesión, conserva el
historial de cambios y permite adjuntar los archivos JSON de los workflows.
**Alternativa sin cuenta de GitHub:** Google Sites con los archivos en una carpeta de
Drive compartida en modo lectura.

`PENDIENTE:` la plataforma la confirma cada institución. Lo que no cambia: el evaluador
debe poder abrir el portafolio con un enlace, sin credenciales.

## Elemento 6 · Instrumento evaluativo asociado: rúbrica del portafolio

Se adjunta en la sección V del Anexo 2. Escala por criterio de 1 a 4. **Puntaje máximo:** 24.

| Criterio | 4 · Logrado | 3 · Mayormente logrado | 2 · Parcialmente logrado | 1 · No logrado |
| --- | --- | --- | --- | --- |
| **Completitud** | Los 6 elementos presentes y con contenido propio | Falta desarrollar uno | Faltan dos o tres | Faltan más de tres |
| **Evidencias AE1** | Mapa, diagrama y cuadro comparativo con conclusión propia | Dos de las tres evidencias | Una evidencia o sin conclusión | Sin evidencia |
| **Evidencias AE2** | Workflow exportado que se importa y ejecuta; capturas claras | Workflow correcto con capturas incompletas | Workflow con errores | Sin workflow |
| **Evidencias AE3** | Resumen correcto, XML generado y tabla en Supabase | Resultados correctos con una evidencia faltante | Resultados con errores de agrupación o tipo | Sin evidencia |
| **Evidencias AE4** | Workflow reparado y bitácora con causa y prueba en cada misión | Bitácora completa salvo una misión | Correcciones sin causas | Sin bitácora |
| **Reflexión y comunicación** | Introducción y cierre conectados, con autodiagnóstico comparado y un próximo paso concreto | Reflexión clara sin comparación del autodiagnóstico | Reflexión genérica | Sin reflexión |

La nota se calcula con la escala de `B2-instrumentos.md` (exigencia 60 %).
