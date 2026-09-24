# PF1822 · Módulo 2 · B2 — Instrumentos de evaluación

**Estado:** borrador · **Va en:** Anexo N°2, sección V.2 · **Guía:** Anexo N°7, num. 3, 3.1–3.3
**Para el 7,0:** 3 instrumentos distintos, cada uno con todos los aprendizajes esperados.

<!-- verificable: ID=B2 tipo=lista min=3 -->
1. **Rúbrica de revisión de la solución** · familia observación (3.1) · evalúa las actividades 1 y 2
2. **Proyecto "Asistente de preguntas frecuentes para Nube Sur"** · familia desempeño (3.2), proyecto individual · evaluación sumativa del módulo
3. **Prueba de conceptos y lectura de código** · familia objetiva (3.3), selección múltiple y respuesta breve

## Tabla de especificaciones

| Instrumento | AE1 | AE2 | AE3 | AE4 | Momento | Ponderación sugerida |
| --- | :-: | :-: | :-: | :-: | --- | --: |
| 1 · Rúbrica de solución | criterio 1 | criterios 2 y 3 | criterio 4 | criterios 5 y 6 | Actividades 1 y 2 | 35 % |
| 2 · Proyecto FAQ | req. 1 | req. 2 | req. 3 | req. 4 | Cierre del módulo | 45 % |
| 3 · Prueba objetiva | ítems 1–3 | ítems 4–6 | ítems 7–9 | ítems 10–12 | Cierre del tramo 4 | 20 % |

**Escala de notas** (exigencia 60 %, escala chilena de 1,0 a 7,0), para los tres:
si el puntaje *p* es mayor o igual a 0,6 × *P*, nota = 4,0 + 3 × (*p* − 0,6*P*) / (0,4*P*);
si es menor, nota = 1,0 + 3 × *p* / (0,6*P*). Se redondea a un decimal.

---

## Instrumento 1 · Rúbrica de revisión de la solución (observación)

El tutor la aplica con el repositorio del participante abierto y ejecutando sus pruebas.

| Criterio (AE · indicadores) | 4 · Logrado | 3 · Mayormente logrado | 2 · Parcialmente logrado | 1 · No logrado |
| --- | --- | --- | --- | --- |
| **1. Arquitectura** (AE1 · 1.1, 1.2, 1.3) | Diagrama con los cinco componentes, función de cada uno y justificación con dos criterios; la clave queda del lado del servidor | Diagrama completo con justificación de un solo criterio | Faltan componentes o no explica dónde va la clave | Sin diagrama o no corresponde a una app con IA |
| **2. Consumo de la API** (AE2 · 2.1, 2.2) | GET y POST autenticados con variables de entorno; maneja errores HTTP; explica los campos de solicitud y respuesta con la documentación oficial | Llamadas correctas sin manejo de errores o sin referencia a la documentación | Llamadas que funcionan solo con la clave escrita en el código | No logra una respuesta válida |
| **3. Modularidad y pruebas** (AE2 · 2.3) | Clase reutilizable con docstrings y 3 o más pruebas que pasan sin conexión | Clase documentada con pruebas que requieren conexión | Funciones sueltas o sin docstrings | Sin estructura reutilizable ni pruebas |
| **4. Prompts** (AE3 · 3.1, 3.2, 3.3) | Zero-shot y few-shot bien construidos (rol, contexto, restricciones, formato); 3 o más iteraciones registradas con su efecto; compara temperature | Ambas estrategias con menos de 3 iteraciones o sin comparar temperature | Una sola estrategia o prompts sin restricciones de formato | Prompts sin estructura ni registro |
| **5. Preprocesamiento** (AE4 · 4.1, 4.2) | Funciones reutilizables que limpian HTML, firmas y datos personales, normalizan y tokenizan el corpus sin errores; explica token, lema, stopword y n-grama | Pipeline correcto con una etapa faltante o sin explicar los conceptos | Limpieza parcial que deja ruido o datos personales | Sin preprocesamiento |
| **6. Evaluación y registro** (AE4 · 4.3) | ROUGE y BLEU bien calculados (tokenizador que respeta tildes), coherencia y relevancia valoradas, CSV completo y recomendación apoyada en números | Métricas correctas con registro incompleto | Métricas mal calculadas o sin registro | Sin evaluación |

**Puntaje máximo:** 24. En la actividad 1 se aplican los criterios 1 a 3; en la actividad 2,
los criterios 4 a 6. La devolución sigue el formato de `B4-retroalimentacion.md`, producto a.

---

## Instrumento 2 · Proyecto "Asistente de preguntas frecuentes para Nube Sur" (desempeño)

**Modalidad:** individual, asincrónica, 4 horas de trabajo estimado, entrega como
repositorio en GitHub (o equivalente) con `README.md`.

### Enunciado

La mesa de ayuda de Nube Sur recibe muchas preguntas que ya están respondidas en su lista
de preguntas frecuentes (se entregan 8 pares pregunta–respuesta ficticios). Construye un
asistente mínimo que, dada una pregunta de un cliente, encuentre la pregunta frecuente más
parecida y redacte una respuesta breve basada **solo** en esa respuesta oficial.

1. **Arquitectura (AE1).** En el README: diagrama de la solución (cliente, servidor,
   preprocesamiento, modelo, almacén de embeddings), función de cada componente y por qué
   elegiste esa arquitectura (dos criterios).
2. **API (AE2).** Reutiliza tu `ClienteIA`: embeddings de las 8 preguntas frecuentes y de
   la pregunta del cliente; generación de la respuesta. Clave por variable de entorno. Al
   menos tres pruebas unitarias sin conexión.
3. **Prompts (AE3).** Un prompt few-shot que obligue a responder solo con la información de
   la respuesta oficial y a decir "Te derivo con un ejecutivo" cuando no alcance. Compáralo
   con un zero-shot y registra dos iteraciones.
4. **Preprocesamiento y evaluación (AE4).** Limpia y normaliza las preguntas antes de
   calcular embeddings. Para 5 preguntas de prueba con respuesta de referencia, calcula
   ROUGE-L y BLEU, valora coherencia y relevancia, y registra todo en un CSV.

### Insumos: preguntas frecuentes de Nube Sur (ficticias)

| # | Pregunta frecuente | Respuesta oficial |
| --- | --- | --- |
| F1 | ¿Cómo recupero mi contraseña? | En la pantalla de ingreso, elige "Olvidé mi contraseña"; te llegará un enlace válido por 30 minutos. |
| F2 | ¿Cómo agrego un usuario a mi cuenta? | Un administrador entra a Configuración → Usuarios → Invitar y escribe el correo de la persona. |
| F3 | ¿Puedo exportar mis clientes a Excel? | Sí: en Clientes, usa el botón Exportar y elige formato XLSX. |
| F4 | ¿Qué navegadores son compatibles? | Las dos últimas versiones de Chrome, Firefox, Edge y Safari. |
| F5 | ¿Cómo cambio el plan contratado? | En Facturación → Plan puedes subir de plan en el momento; para bajar, el cambio aplica al mes siguiente. |
| F6 | ¿Dónde descargo mis facturas? | En Facturación → Documentos están todas las facturas en PDF. |
| F7 | ¿La plataforma tiene API? | Sí, con clave por cuenta; la documentación está en el menú Desarrolladores. |
| F8 | ¿Cómo elimino mi cuenta? | Escribe a soporte desde el correo del administrador; la eliminación se confirma en 5 días hábiles. |

**Preguntas de prueba con respuesta de referencia** (para la evaluación del requisito 4):

| # | Pregunta del cliente | FAQ esperada | Respuesta de referencia |
| --- | --- | --- | --- |
| Q1 | olvidé la clave y no puedo entrar!! | F1 | Elige "Olvidé mi contraseña" en la pantalla de ingreso y recibirás un enlace válido por 30 minutos. |
| Q2 | Necesito pasar la lista de clientes a una planilla | F3 | En Clientes, usa Exportar y elige el formato XLSX. |
| Q3 | ¿funciona en safari? | F4 | Sí, funciona en las dos últimas versiones de Safari, además de Chrome, Firefox y Edge. |
| Q4 | quiero sumar a mi colega como usuario | F2 | Un administrador puede invitarlo desde Configuración → Usuarios → Invitar con su correo. |
| Q5 | ¿cuánto cuesta el plan anual? | ninguna | Te derivo con un ejecutivo. |

La Q5 no tiene respuesta en las preguntas frecuentes: el asistente debe derivar y no
inventar un precio. Es la prueba del prompt del requisito 3.

### Pauta de corrección (30 puntos)

| Req. | AE | Qué se revisa | Puntos |
| --- | --- | --- | --: |
| 1 | AE1 | Diagrama con los cinco componentes y su función | 2 |
| 1 | AE1 | Justificación con dos criterios; la clave no está en el cliente | 2 |
| 2 | AE2 | Embeddings de preguntas frecuentes y consulta; selección por similitud de coseno | 3 |
| 2 | AE2 | Generación de respuesta con `ClienteIA`; clave por variable de entorno | 3 |
| 2 | AE2 | Tres o más pruebas unitarias que pasan sin conexión | 3 |
| 3 | AE3 | Prompt few-shot con restricción de fuente y frase de derivación | 3 |
| 3 | AE3 | Comparación con zero-shot y dos iteraciones registradas con su efecto | 3 |
| 4 | AE4 | Limpieza y normalización antes de los embeddings | 3 |
| 4 | AE4 | ROUGE-L y BLEU bien calculados para las 5 preguntas | 3 |
| 4 | AE4 | Coherencia y relevancia valoradas y CSV completo | 2 |
| — | — | README claro: cómo se instala, cómo se ejecuta, qué falta | 3 |
| | | **Total** | **30** |

**Respuesta modelada (núcleo del cálculo de similitud):**

```python
import math


def coseno(a: list[float], b: list[float]) -> float:
    """Similitud de coseno entre dos vectores: 1 = misma dirección, 0 = sin relación."""
    producto = sum(x * y for x, y in zip(a, b))
    return producto / (math.sqrt(sum(x * x for x in a)) * math.sqrt(sum(y * y for y in b)))


def pregunta_mas_parecida(consulta: str, preguntas: list[str], cliente) -> tuple[int, float]:
    """Devuelve el índice de la pregunta frecuente más parecida y su similitud."""
    vectores = cliente.embeddings([limpiar(consulta)] + [limpiar(p) for p in preguntas])
    similitudes = [coseno(vectores[0], v) for v in vectores[1:]]
    mejor = max(range(len(similitudes)), key=similitudes.__getitem__)
    return mejor, similitudes[mejor]
```

(Con `limpiar` de `preprocesar.py` de la actividad 2.) Si la similitud máxima es baja, el
asistente deriva sin llamar al modelo de generación: ahorra tokens y evita inventar.

---

## Instrumento 3 · Prueba de conceptos y lectura de código (objetiva)

**Modalidad:** cuestionario del LMS, 25 minutos. 9 ítems de selección múltiple (1 punto) y
3 de respuesta breve (2 puntos). **Puntaje máximo:** 15.

**AE1**

1. Un modelo que genera imágenes partiendo de ruido y refinándolo paso a paso es:
   a) Autorregresivo · **b) De difusión** · c) Basado en reglas · d) De agrupamiento
   *Respuesta: b.*
2. En una aplicación con IA generativa, ¿qué componente debe guardar la clave de la API?
   a) La aplicación en el navegador · **b) El servidor o backend** · c) El vector store · d) El prompt
   *Respuesta: b. Lo que llega al navegador lo puede leer cualquiera.*
3. *(Respuesta breve, 2 puntos)* Da dos razones para preprocesar un texto antes de enviarlo al modelo.
   *Respuesta, 1 punto cada una: menos tokens y por lo tanto menor costo; mejor calidad de respuesta al quitar ruido; protección de datos personales al no enviarlos a un tercero.*

**AE2**

4. Para autenticarse en la API de OpenAI se envía:
   a) La clave en la URL · **b) El encabezado `Authorization: Bearer <clave>`** · c) Usuario y contraseña en el cuerpo · d) Una cookie de sesión
   *Respuesta: b.*
5. Un endpoint de embeddings devuelve:
   a) Texto generado · **b) Un vector de números que representa el significado del texto** · c) Una imagen · d) Solo la cantidad de tokens
   *Respuesta: b.*
6. *(Respuesta breve, 2 puntos)* La respuesta del endpoint de chat se guardó en el diccionario `datos`. Escribe la expresión de Python que obtiene el texto generado y explica por qué conviene revisar antes el código de estado.
   *Respuesta: `datos["choices"][0]["message"]["content"]` (1 punto); si la API devolvió un error, la respuesta no trae `choices` y el programa falla con un KeyError en vez de informar el error real (1 punto).*

**AE3**

7. Un prompt *few-shot* es el que:
   a) Se envía varias veces · **b) Incluye ejemplos de entrada y salida esperada antes de la tarea** · c) Usa temperature alta · d) No tiene instrucciones
   *Respuesta: b.*
8. Para resúmenes técnicos consistentes entre una ejecución y otra conviene:
   a) Temperature alta (por ejemplo 1,5) · **b) Temperature baja (0 a 0,3)** · c) Quitar el mensaje de sistema · d) Subir mucho max_tokens
   *Respuesta: b.*
9. *(Respuesta breve, 2 puntos)* Mejora este prompt: *"Resume esto."* Escribe tu versión.
   *Respuesta: 2 puntos si incluye al menos tres de: rol, tarea precisa, restricción de largo, formato de salida, prohibición de agregar información; 1 punto si incluye dos.*

**AE4**

10. Las *stopwords* son:
    **a) Palabras muy frecuentes y con poco contenido propio, como "el", "de" o "y"** · b) Palabras mal escritas · c) Los signos de puntuación · d) Las palabras que el modelo no conoce
    *Respuesta: a.*
11. ¿Qué diferencia a la lematización del stemming?
    a) Son lo mismo · **b) La lematización lleva la palabra a su forma de diccionario ("corriendo" → "correr"); el stemming solo recorta la raíz** · c) El stemming usa un diccionario y la lematización no · d) La lematización quita tildes
    *Respuesta: b.*
12. Un resumen obtiene ROUGE-1 *recall* = 0,625 frente a su referencia. Significa que:
    a) El 62,5 % del resumen es incorrecto · **b) El 62,5 % de las palabras de la referencia aparecen en el resumen generado** · c) El resumen tiene 62,5 % de coherencia · d) El modelo acertó 62,5 de cada 100 tokens
    *Respuesta: b.*
