# PF1822 · Módulo 2 · R01 y R02 — Video de bienvenida e infografía

**Estado:** borrador · **Exigencia:** C3 aspectos motivacionales (Anexo N°7, num. 7 c): un
ambiente intuitivo, con íconos, multimedia e imágenes, que invite a avanzar.

---

## R01 · Video de bienvenida (1 minuto 40 segundos)

**Formato:** presentador (docente o avatar) y pantalla con código. Primera pieza del módulo en
el LMS. Subtítulos obligatorios. **Tono:** de colega desarrollador; muestra antes de explicar.

| Tiempo | Imagen | Locución |
| --- | --- | --- |
| 0:00–0:10 | Presentador a cámara | "Hola. Bienvenida, bienvenido al módulo 2: Introducción a modelos generativos y consumo por API." |
| 0:10–0:30 | Una bandeja con cientos de tickets de soporte, largos y con firmas | "Imagina la mesa de ayuda de una empresa de software que recibe cientos de tickets al día. Nadie alcanza a leerlos todos antes de priorizar. La empresa se llama Nube Sur, es inventada, y va a ser tu cliente durante el módulo." |
| 0:30–0:55 | Terminal: se ejecuta un script, entra un ticket y sale un resumen de una línea | "En estas 21 horas vas a construir su resumidor de tickets: una aplicación que limpia cada ticket, le pide a un modelo de lenguaje un resumen por API y mide si el resumen es bueno." |
| 0:55–1:15 | Infografía de la ruta: cuatro estaciones | "Cuatro estaciones: entender los modelos y diseñar la arquitectura, programar el cliente de la API, escribir buenos prompts, y limpiar y medir texto. Cada estación deja código en tu portafolio." |
| 1:15–1:30 | Tablero del laboratorio con puntajes ROUGE e insignias | "Al final, el laboratorio: pruebas estrategias de prompt, las mides y compites en el tablero por el mejor resumen. Pero ojo: gana quien decide con evidencia." |
| 1:30–1:40 | Presentador; botón "Empezar estación 1" | "Primer paso: mira la ruta, completa el autodiagnóstico y abre el notebook guiado. Nos vemos en la primera sesión en vivo." |

**Notas de producción:** si se usa avatar, una pieza de 60 a 120 segundos por módulo; no
reemplaza al tutor. Placa final con nombre del tutor y horarios, que completa cada
institución. `PENDIENTE:` nombre del tutor y horarios, por institución.

---

## R02 · Infografía "Ruta del módulo 2"

**Formato:** imagen vertical (1080 × 1920 px), descargable en PDF, con esta versión en texto
para lectores de pantalla. Un ícono por estación, repetido en los títulos del LMS.

**Encabezado**
> MÓDULO 2 · INTRODUCCIÓN A MODELOS GENERATIVOS Y CONSUMO POR API · 21 h
> *Tu misión: construir el resumidor de tickets de Nube Sur.*

**Bloque "Al terminar serás capaz de"** (competencia del módulo, textual):
> IMPLEMENTAR LA ARQUITECTURA BÁSICA DE UNA APLICACIÓN QUE INTEGRE MODELOS DE IA MEDIANTE
> APIS Y PREPROCESAMIENTO DE TEXTO PARA CONSUMO POR MODELOS DE LENGUAJE, GARANTIZANDO EL
> CONSUMO EFICIENTE Y LA EVALUACIÓN DE RESULTADOS EN UN ENTORNO DE DESARROLLO DE SOFTWARE

**Bloque "Tu ruta"**

| Estación | Ícono | Título | Qué haces | Qué te llevas | Horas |
| --- | --- | --- | --- | --- | --- |
| 1 | Plano con cajas conectadas | Entender y diseñar | Conoces los tipos de modelos y dibujas la arquitectura del resumidor | Cuadro de modelos + diagrama | 4 h |
| 2 | Llave y flecha hacia una nube | Conectar | Programas `ClienteIA`: GET, POST, embeddings, pruebas | Módulo Python con pruebas en verde | 6 h |
| 3 | Globo de diálogo con ejemplos | Pedir bien | Prompts zero-shot y few-shot, y el efecto de temperature | Registro de iteraciones | 5 h |
| 4 | Embudo y gráfico de barras | Limpiar y medir | Pipeline de limpieza y métricas ROUGE y BLEU | Tabla de resultados + recomendación | 6 h |

**Bloque "Cómo te acompañamos"**
- 4 sesiones en vivo de 1,5 h, una por estación. `PENDIENTE:` días y horarios por institución.
- Revisión de tu código en máximo 2 días hábiles.
- Foro de dudas por estación, respondido por el tutor.

**Bloque "Cómo te evaluamos"**
- Rúbrica de tu solución en las actividades 1 y 2 (35 %).
- Proyecto "Asistente de preguntas frecuentes" al cierre (45 %).
- Prueba de conceptos y lectura de código (20 %).
- Tu portafolio y tu repositorio quedan publicados para mostrar a un empleador.

**Pie**
> Herramientas del módulo: Python · httpx · pytest · spaCy · NLTK · rouge-score · Git y GitHub · API de OpenAI y Hugging Face.
> Regla de oro: tu clave nunca va en el código.
> Empieza aquí → autodiagnóstico + notebook guiado.
