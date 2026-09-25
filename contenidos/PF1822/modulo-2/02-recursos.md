# PF1822 · Módulo 2: kit de recursos educativos

**Módulo:** `MA04576` INTRODUCCIÓN A MODELOS GENERATIVOS Y CONSUMO POR API · 21 h · e-learning
**Estado:** borrador · **Producido:** 2026-09-24 (sesión `2026-09-24-claude-code-05`)

> Qué recursos lleva el módulo 2 montado en el LMS, a qué exigencia responde cada uno y
> dónde está su contenido desarrollado. Las exigencias salen del Anexo N°7, numeral 7
> (págs. 109–111): dos actividades prácticas con respuesta modelada; dos herramientas
> didácticas efectivas (tutoriales, videos interactivos, audios, multimedia); medios como
> presentaciones, instructivos y cuadros comparativos; un ambiente con íconos, multimedia e
> imágenes que motive; y tres estrategias de habilidades del siglo XXI de la lista oficial.

## Hilo conductor del módulo

Todo el módulo trabaja sobre **un solo caso**: *Nube Sur*, una empresa de software
**ficticia** cuya mesa de ayuda recibe cientos de tickets al día, largos, desordenados, con
HTML de correo y firmas. El jefe de soporte necesita que cada ticket llegue con un resumen
de una línea para priorizarlo. En el módulo el participante construye ese **resumidor de
tickets**: diseña su arquitectura (AE1), programa el cliente que consume el modelo por API
(AE2), escribe y afina los prompts (AE3) y arma el pipeline que limpia los tickets y mide la
calidad de los resúmenes (AE4).

> Nube Sur es inventada. No corresponde a ninguna institución ni empresa real, y este
> contenido es común a todas las instituciones que presenten el curso.

## Ruta del módulo (propuesta de distribución de las 21 h)

| Tramo | Aprendizaje esperado | Horas | Sincrónico | Producto del tramo |
| --- | --- | --- | --- | --- |
| 1 | AE1 · modelos generativos y arquitectura | 4 h | 1,5 h | Diagrama de arquitectura del resumidor + cuadro de tipos de modelos |
| 2 | AE2 · consumo de API REST | 6 h | 1,5 h | Clase `ClienteIA` con docstrings y pruebas |
| 3 | AE3 · diseño de prompts | 5 h | 1,5 h | Prompts zero-shot y few-shot con registro de iteraciones |
| 4 | AE4 · preprocesamiento y evaluación | 6 h | 1,5 h | Pipeline de limpieza + tabla de métricas ROUGE y BLEU |
| | **Total** | **21 h** | **6 h** | |

`PENDIENTE:` la distribución de horas por aprendizaje la propone este kit; SIPFOR solo
fija las 21 h del módulo. La valida Natalia.

## Los recursos

| Id | Recurso | Formato en el LMS | Exigencia | Archivo |
| --- | --- | --- | --- | --- |
| R01 | Video de bienvenida | Video 1:40 con avatar o docente | C3 motivación | `R-bienvenida-e-infografia.md` |
| R02 | Infografía "Ruta del módulo" | Imagen descargable + versión accesible en texto | C3 · medio | `R-bienvenida-e-infografia.md` |
| R03 | Cuatro cápsulas de contenido, una por AE | Presentaciones narradas (11 o 12 láminas, con el aprendizaje esperado y los contenidos del plan textuales) | C4 d) presentaciones | `R-capsulas.md` |
| R04 | Cuadro comparativo de modelos generativos | Tabla interactiva o PDF | C4 d) cuadro comparativo · AE1 | `R-capsulas.md` |
| R05 | **Herramienta didáctica 1 (AE3):** notebook guiado "Laboratorio de prompts" | Notebook (Colab o JupyterLab) con celdas de autocomprobación | **C4** | `C4-herramientas-didacticas.md` |
| R06 | **Herramienta didáctica 2 (AE3):** video interactivo "Del prompt a la respuesta" | Video con preguntas incrustadas (H5P) | **C4** | `C4-herramientas-didacticas.md` |
| R07 | **Actividad práctica 1:** "Un cliente de API para el resumidor" | Entrega de código con pruebas | **C2** · resolución de problemas | `C2-actividades.md` |
| R08 | **Actividad práctica 2:** "Laboratorio de prompts y métricas" | Simulación con tablero de puntajes (gamificación) | **C2** · análisis de caso | `C2-actividades.md` |
| R09 | Indicadores de logro | Tabla en la guía del participante | B1 | `B1-indicadores.md` |
| R10 | Tres instrumentos de evaluación | Rúbrica, proyecto de desempeño, prueba objetiva | B2 | `B2-instrumentos.md` |
| R11 | Portafolio con sus 6 elementos + rúbrica | Sitio publicado + repositorio | B3 | `B3-portafolio.md` |
| R12 | Feedback, autoevaluación, coevaluación y bitácora | Formularios y plantilla en el LMS | B4 | `B4-retroalimentacion.md` |
| R13 | Estrategia metodológica, motivación y siglo XXI | Texto del Anexo 2, sección VI | C1 · C3 · C5 | `C-metodologia.md` |

## Qué recurso cubre qué aprendizaje

| Recurso | AE1 | AE2 | AE3 | AE4 |
| --- | :-: | :-: | :-: | :-: |
| R01 Bienvenida | ● | | | |
| R02 Infografía | ● | ● | ● | ● |
| R03 Cápsulas | ● | ● | ● | ● |
| R04 Cuadro comparativo | ● | | | |
| R05 Notebook guiado | | ● | ● | |
| R06 Video interactivo | | ● | ● | |
| R07 Actividad 1 | ● | ● | ● | |
| R08 Actividad 2 | | | ● | ● |
| R10 Instrumentos (los tres) | ● | ● | ● | ● |
| R11 Portafolio | ● | ● | ● | ● |

## Lo que necesita cada participante para usar el kit

Según los recursos del módulo en SIPFOR: equipo con al menos 8 GB de RAM y 500 GB de disco,
conexión a internet, **Python 3.10 o superior**, Visual Studio Code o JupyterLab, entornos
virtuales, Git y GitHub, un cliente HTTP (Postman o equivalente) y, como alternativa,
Google Colab, una máquina virtual o un contenedor.

Bibliotecas que usa el kit: `httpx` (o `requests`), `pytest`, `spacy` con el modelo
`es_core_news_sm`, `nltk`, `rouge-score` y `scikit-learn`.

`PENDIENTE:` **acceso a las API de OpenAI y Hugging Face** para cada participante (el AE2
las nombra): quién provee las claves de práctica y con qué presupuesto. Lo decide cada
institución; va en la sección VIII e) del Anexo 2. Las actividades se pueden ensayar sin
clave con la API simulada de las pruebas, pero la práctica real necesita acceso.
