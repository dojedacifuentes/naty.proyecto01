# PF1822 · Módulo 2 · C1, C3 y C5 — Metodología, motivación y habilidades del siglo XXI

**Estado:** borrador · **Va en:** Anexo N°2, sección VI a), d) y e) · **Guía:** Anexo N°7, num. 7
**Para el 7,0:** C1 binario (la metodología está enfocada en la competencia de ESTE módulo);
C3 binario (el módulo aporta al aprendizaje a través de la interacción con la plataforma);
C5, tres estrategias para tres habilidades del siglo XXI.

> Este texto es la base común. Cada institución lo adapta a su LMS, su tutor y su
> calendario en `propuestas/<cliente>/PF1822/anexo2.md`, sin cambiar el anclaje a la competencia.

---

## a) ¿Qué hará? · Estrategia metodológica (C1)

**Competencia del módulo (textual):** IMPLEMENTAR LA ARQUITECTURA BÁSICA DE UNA APLICACIÓN QUE
INTEGRE MODELOS DE IA MEDIANTE APIS Y PREPROCESAMIENTO DE TEXTO PARA CONSUMO POR MODELOS DE
LENGUAJE, GARANTIZANDO EL CONSUMO EFICIENTE Y LA EVALUACIÓN DE RESULTADOS EN UN ENTORNO DE
DESARROLLO DE SOFTWARE

La estrategia es **aprendizaje basado en proyectos sobre una aplicación que se construye por
capas**. La competencia pide *implementar la arquitectura básica de una aplicación*, con
*preprocesamiento*, *consumo eficiente* y *evaluación de resultados*; por eso el módulo no
enseña APIs, prompts y NLP como temas separados, sino como las cuatro capas de un mismo
producto: el resumidor de tickets de Nube Sur, una empresa ficticia. Primero se diseña su
arquitectura (AE1), después se programa y prueba el cliente que consume el modelo (AE2),
luego se construyen y afinan los prompts (AE3) y al final se agrega el pipeline que limpia la
entrada y mide la calidad de la salida (AE4). El *consumo eficiente* se trabaja con datos:
tokens por solicitud, limpieza antes de enviar y derivación sin llamar al modelo cuando no
hace falta. Cada tramo combina una cápsula, práctica guiada en el notebook y práctica
autónoma en el repositorio del participante, revisada por el tutor antes del tramo siguiente.

| Tramo | Actividades del módulo | Horas | Sincrónica | Asincrónica |
| --- | --- | --: | --: | --: |
| 1 · AE1 | Video de bienvenida, autodiagnóstico, cápsula 1, cuadro de familias de modelos, diagrama del resumidor; sesión en vivo: diseño de arquitectura en grupo | 4 | 1,5 | 2,5 |
| 2 · AE2 | Cápsula 2, notebook guiado (secciones 0 a 6), actividad 1 parte B, pruebas unitarias; sesión en vivo: revisión de código | 6 | 1,5 | 4,5 |
| 3 · AE3 | Cápsula 3, video interactivo, actividad 2 pasos 2 y 3; sesión en vivo: taller de prompts | 5 | 1,5 | 3,5 |
| 4 · AE4 | Cápsula 4, notebook guiado (secciones 7 a 9), actividad 2 pasos 1, 4 y 5, tablero, coevaluación, prueba objetiva, proyecto final, portafolio; sesión en vivo: lectura de métricas | 6 | 1,5 | 4,5 |
| | **Total** | **21** | **6** | **15** |

**Rol del tutor académico.** En lo teórico, presenta cada tramo y conduce la sesión en vivo
sobre el caso. En lo práctico, revisa el código de cada participante con la rúbrica y
comentarios en línea, devuelve en máximo 2 días hábiles, mantiene el tablero del laboratorio,
responde el foro y da asistencia técnica con el entorno de Python y las claves de práctica.

**Atención a la diversidad.** Tres entornos posibles (local, Colab o contenedor) para que el
equipo del participante no sea una barrera; cada contenido en más de un formato (cápsula con
transcripción, notebook con celdas autocomprobables, video con preguntas); el autodiagnóstico
inicial permite al tutor reforzar Python antes del tramo 2 a quien lo necesite.

## b) ¿Cómo lo hará? · Actividades didácticas

Dos actividades prácticas distintas, desarrolladas en `C2-actividades.md`:
1. **Un cliente de API para el resumidor** — resolución de problemas, con el notebook guiado y
   las cápsulas como apoyo. Respuesta modelada: diagrama, `cliente_ia.py` y sus pruebas.
2. **Laboratorio de prompts y métricas** — análisis de caso en forma de simulación de una
   decisión real, con tablero de puntajes e insignias. Respuesta modelada: pipeline, prompts,
   registro de iteraciones, cálculo de comprobación y recomendación.

## c) ¿Con qué lo van a hacer? · Medios

Enlace al LMS: `PENDIENTE:` por institución (va aquí, dentro de esta respuesta).
Medios del módulo: video de bienvenida (R01), infografía de la ruta (R02), cuatro cápsulas
narradas (R03), cuadro comparativo de familias de modelos (R04), **notebook guiado** (R05) y
**video interactivo** (R06) —las dos herramientas didácticas de C4—, plantillas de bitácora y
portafolio, Python, Git y GitHub como entorno de práctica.

## d) Aspectos motivacionales (C3)

- **Un producto que crece.** El mismo resumidor gana una capa por tramo; el participante ve su
  aplicación funcionar desde la segunda semana.
- **Ruta visible y navegación consistente.** Infografía y barra de progreso con las cuatro
  estaciones; cada sección del LMS usa el ícono de su estación.
- **Retroalimentación inmediata.** Pruebas que se ponen en verde, celdas que se autocomprueban,
  preguntas del video con respuesta al instante.
- **Tablero e insignias.** El laboratorio publica el mejor ROUGE-L de cada participante; hay
  insignias por resultado y por proceso.
- **Un repositorio para mostrar.** El portafolio y el código quedan públicos para un empleador.

## e) Habilidades del siglo XXI (C5)

Tres habilidades de la lista del Anexo N°7 (pág. 111), cada una con su estrategia y evidencia.

<!-- verificable: ID=C5 tipo=tabla min=3 -->

| # | Habilidad transversal | Estrategia para desarrollarla | Cómo se evidencia |
| --- | --- | --- | --- |
| 1 | **Pensamiento crítico** (maneras de pensar) | En el laboratorio, la configuración del resumidor se decide con la tabla de métricas y no con la impresión; el participante debe explicar un caso en que la métrica y su propia lectura no coinciden. | Recomendación de la actividad 2 con números y el análisis del caso de desacuerdo, evaluados en el criterio 6 de la rúbrica. |
| 2 | **Colaboración** (maneras para trabajar) | Revisión de código entre pares: cada participante clona el repositorio del otro, ejecuta pruebas y notebook, y deja sugerencias que el autor responde. | Pauta de coevaluación en el foro y respuesta del autor con los cambios aplicados. |
| 3 | **Responsabilidad personal y social** (habilidades para vivir) | Cada decisión del módulo se revisa también desde la seguridad y la ética: no exponer claves, no enviar datos personales al modelo, no presentar como hecho lo que el modelo inventa. | La limpieza reemplaza correos y enlaces; ninguna clave en el repositorio; la restricción anti-invención en los prompts; criterio "Reflexión, comunicación y seguridad" de la rúbrica del portafolio. |

> **C1 · control antigenérico:** si este texto sirviera para otro plan formativo cambiando
> solo el nombre de la herramienta, está mal. Aquí se nombran la competencia textual, la
> arquitectura, los endpoints, los prompts, las métricas y el caso de ESTE módulo.
