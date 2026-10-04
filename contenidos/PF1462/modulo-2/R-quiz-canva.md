# PF1462 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** un quiz por aprendizaje esperado del módulo 2 (Quiz n = AEn), con los criterios de evaluación del plan formativo 2026.
**Reparto:** Quiz 1: AE1 · Quiz 2: AE2 · Quiz 3: AE3 · Quiz 4: AE4 · Quiz 5: AE5 (uno por AE). Cinco preguntas cada uno, con una sola respuesta correcta y retroalimentación.
**Son formativos:** no llevan nota.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.
**Versión juego** (HTML y SCORM para el LMS, `npm run quiz-juego`): las mismas preguntas como una misión de 5 niveles con XP, combos, energía, comodín 50:50, estrellas, logros e insignia.
**Misión:** reescribir en Python el código que prepara los datos de RutaSur, una empresa de despacho con seis centros de distribución entre Santiago y Puerto Montt, para que su equipo pueda entrenar un modelo que anticipe los envíos atrasados.

---

## Quiz 1 · Estructuras de datos (AE1)

**Cuándo:** al cerrar el aprendizaje 1, después de la lectura sobre estructuras de datos avanzadas y el ejercicio guiado con la red de rutas.
**Insignia:** Arquitecto/a de datos · **Siguiente parada:** aprendizaje 2, el manejo de excepciones.

1. *(AE1)* RutaSur guarda la ubicación de cada centro como `(-39.81, -73.24)` y no quiere que ninguna parte del código la cambie por error. ¿Qué estructura conviene y por qué?
   - a) Una lista, porque permite corregir las coordenadas cuando haga falta
   - **b) Una tupla, porque es inmutable y puede servir como clave de un diccionario**
   - c) Un conjunto, porque mantiene las coordenadas en el orden en que se cargaron
   - d) Un diccionario, porque impide que se repitan los valores que guarda
   *Retroalimentación:* "La tupla no se puede modificar después de creada, lo que protege datos fijos como una coordenada. Por ser inmutable, además puede usarse como clave de un diccionario; una lista no."
2. *(AE1)* Al leer los 50.000 envíos, el script debe saber si un `id_envio` ya apareció antes. ¿Qué estructura conviene para guardar los ids vistos?
   - a) Una lista, consultada con `in` cada vez que llega una fila
   - b) Una tupla, que se vuelve a crear cada vez que llega un id
   - c) Una pila, revisando primero el último id que se agregó
   - **d) Un conjunto (`set`), que responde `in` en tiempo constante promedio**
   *Retroalimentación:* "El conjunto guarda elementos sin repetir y usa una tabla hash, así que preguntar si un id está es O(1) en promedio. En una lista, la misma consulta recorre los elementos uno a uno y es O(n)."
3. *(AE1)* En el centro de Temuco, los pedidos deben despacharse en el mismo orden en que llegaron. ¿Qué estructura y qué operaciones usas?
   - **a) Una cola (`deque`): `append()` para entrar y `popleft()` para salir**
   - b) Una pila (lista): `append()` para entrar y `pop()` para salir
   - c) Un diccionario: `update()` para entrar y `popitem()` para salir
   - d) Un conjunto: `add()` para entrar y `pop()` para salir
   *Retroalimentación:* "Despachar en orden de llegada es FIFO: el primero que entra es el primero que sale, y eso es una cola. `collections.deque` saca por la izquierda en O(1); la pila es LIFO y el conjunto no guarda orden."
4. *(AE1)* RutaSur representa su red vial como `rutas = {'Santiago': [('Rancagua', 87), ('Talca', 255)], ...}`, con la distancia en kilómetros de cada conexión. ¿Cómo encuentras el camino de menos kilómetros entre dos centros?
   - a) Con un recorrido en anchura (BFS), que minimiza la cantidad de conexiones
   - **b) Con Dijkstra y una cola de prioridad (`heapq`), porque las aristas tienen peso**
   - c) Con un recorrido en profundidad (DFS), que se queda con el primer camino hallado
   - d) Avanzando siempre por la conexión más corta de cada centro hasta llegar
   *Retroalimentación:* "Es un grafo con lista de adyacencia y aristas con peso: Dijkstra con `heapq` encuentra el camino de menor distancia total. BFS solo minimiza la cantidad de conexiones, y elegir siempre la más corta en cada paso no asegura el mejor camino."
5. *(AE1)* La red de RutaSur se organiza como un árbol zona → región → centro, y cada centro conoce sus envíos. ¿Cómo calculas el total de envíos de cada zona?
   - a) Con un bucle que suma solo los nodos del primer nivel bajo la raíz
   - b) Con una cola que procesa la raíz y únicamente sus hijos directos
   - **c) Con una función recursiva que suma el nodo y el total de cada hijo**
   - d) Con un conjunto que agrupa los centros que tienen el mismo total
   *Retroalimentación:* "Un árbol es una estructura recursiva: el total de un nodo es su propio valor más el total de cada uno de sus subárboles. Una función recursiva, con las hojas como caso base, recorre todos los niveles sin importar su profundidad."

---

## Quiz 2 · Excepciones y registro de errores (AE2)

**Cuándo:** al cerrar el aprendizaje 2, después de la lectura sobre manejo de excepciones y el ejercicio guiado con las filas defectuosas de los envíos.
**Insignia:** Guardián/a de errores · **Siguiente parada:** aprendizaje 3, la programación orientada a objetos.

1. *(AE2)* Al convertir `float('doce')` se lanza `ValueError`, y al consultar `centros['Osorno']` sin esa clave, `KeyError`. ¿Qué afirmación sobre la jerarquía de excepciones de Python es correcta?
   - a) `KeyError` hereda de `ValueError`, así que `except ValueError` captura ambas
   - **b) Ambas heredan de `Exception`, y `KeyError` es una subclase de `LookupError`**
   - c) Ambas heredan directamente de `BaseException`, igual que `KeyboardInterrupt`
   - d) Ambas son errores de sintaxis, así que ningún `try` puede capturarlas
   *Retroalimentación:* "En la jerarquía de Python, casi todas las excepciones de ejecución heredan de `Exception`, que a su vez hereda de `BaseException`. `KeyError` e `IndexError` comparten el padre `LookupError`, mientras que `ValueError` cuelga directo de `Exception`."
2. *(AE2)* Un practicante escribió `except BaseException:` para que el script de RutaSur «nunca se caiga». ¿Qué problema trae esa decisión?
   - a) Ninguno, porque es la forma recomendada de capturar errores de datos
   - b) Solo captura errores de sintaxis y deja pasar los de ejecución
   - c) Hace que Python se salte el bloque `finally` que viene después
   - **d) También atrapa `KeyboardInterrupt` y `SystemExit`, y esconde fallos reales**
   *Retroalimentación:* "`BaseException` está en la raíz de la jerarquía, así que atrapa incluso la orden de detener el programa. La buena práctica es capturar solo las excepciones que sabes manejar y dejar que las demás se propaguen."
3. *(AE2)* Al leer cada fila, el script hace `try: peso = float(fila['peso_kg'])`, `except ValueError: apartar(fila)`, `else: pesos.append(peso)` y `finally: leidas += 1`. ¿Qué ocurre con una fila cuyo peso viene como `'abc'`?
   - a) Se aparta la fila, su peso se agrega a `pesos` y se suma a `leidas`
   - **b) Se aparta la fila, no se ejecuta `else` y sí se suma a `leidas`**
   - c) Se aparta la fila y el programa termina sin pasar por `finally`
   - d) No se aparta, porque `float()` convierte ese texto en `nan`
   *Retroalimentación:* "Si el bloque `try` lanza una excepción que se captura, corre el `except` y se salta el `else`, que solo se ejecuta cuando no hubo error. El `finally` corre siempre, haya o no excepción."
4. *(AE2)* Una fila trae un centro de destino que no existe. RutaSur quiere que el proceso siga y que quede un rastro para revisar después. ¿Qué haces dentro del `except`?
   - **a) Registrar la fila y el motivo con `logging.warning()` y pasar a la siguiente**
   - b) Mostrar el error con `print()`, que deja el mismo registro que `logging`
   - c) Escribir `pass` para descartar la fila sin ensuciar la salida del script
   - d) Volver a lanzar la excepción con `raise` para detener todo el proceso
   *Retroalimentación:* "`logging` guarda en un archivo el nivel, el momento y el motivo de cada problema, y eso permite rastrear los errores después. Un `pass` los esconde y `print()` no deja una traza ordenada ni filtrable por nivel."
5. *(AE2)* RutaSur quiere distinguir un registro inválido de un centro inexistente y, cuando le convenga, capturar los dos con un solo `except`. ¿Qué diseño cumple ambas cosas?
   - a) Lanzar `Exception('registro inválido')` y revisar el texto del mensaje
   - b) Crear dos clases independientes que hereden de `BaseException`
   - **c) Crear `ErrorEnvio(Exception)` y dos subclases que hereden de ella**
   - d) Usar `ValueError` para los dos casos y agregar un código numérico
   *Retroalimentación:* "Una excepción propia como `ErrorEnvio`, con subclases como `RegistroInvalidoError` y `CentroInexistenteError`, permite capturar cada caso por separado o todos juntos con `except ErrorEnvio`. Heredar de `Exception`, y no de `BaseException`, es la buena práctica."

---

## Quiz 3 · Clases y objetos (AE3)

**Cuándo:** al cerrar el aprendizaje 3, después de la lectura sobre programación orientada a objetos y el ejercicio guiado con las tarifas de despacho.
**Insignia:** Diseñador/a de objetos · **Siguiente parada:** aprendizaje 4, el análisis de algoritmos.

1. *(AE3)* En el código de RutaSur, `Envio` define atributos y métodos, y `e1 = Envio('A-102', 12.5)` crea un envío concreto. ¿Qué afirmación es correcta?
   - a) `Envio` es un objeto y `e1` es la clase que lo describe
   - b) `e1` y `Envio` son lo mismo, porque comparten sus atributos
   - c) Cada vez que se crea `e1` se modifica la definición de `Envio`
   - **d) `Envio` es la clase (el molde) y `e1` es una instancia de ella**
   *Retroalimentación:* "La clase define qué datos y qué comportamiento tendrá cada objeto; el objeto es un caso concreto creado a partir de ella. Con una sola clase `Envio` puedes crear miles de envíos, cada uno con sus propios valores."
2. *(AE3)* Para sumar el servicio nocturno, un colega propone agregar otro `elif tipo == 'nocturno'` en `calcular_costo()`, que ya tiene tres. ¿Qué principio de diseño recomienda crear una subclase `TarifaNocturna` en su lugar?
   - **a) Abierto/cerrado: abierto a la extensión y cerrado a la modificación**
   - b) Segregación de interfaces: cada clase con un solo método público
   - c) DRY: no repetir el nombre de la clase dentro de sus métodos
   - d) KISS: preferir un solo método largo antes que varias clases
   *Retroalimentación:* "El principio abierto/cerrado pide extender el comportamiento agregando código nuevo, sin tocar el que ya funciona. Con una subclase de `Tarifa`, el servicio nocturno se suma sin arriesgar las tarifas existentes."
3. *(AE3)* El script recorre `[TarifaEstandar(), TarifaExpress(), TarifaRefrigerada()]` y llama `t.calcular_costo(envio)` en cada una, sin preguntar de qué tipo es. ¿Qué concepto aplica?
   - a) Encapsulamiento, porque cada tarifa oculta sus atributos privados
   - b) Herencia múltiple, porque cada tarifa hereda de las otras dos
   - **c) Polimorfismo: el mismo llamado ejecuta la versión de cada subclase**
   - d) Sobrecarga: Python elige el método según el tipo del argumento
   *Retroalimentación:* "Las tres subclases redefinen `calcular_costo()` de la clase base `Tarifa`, y cada objeto responde con su propia versión. Eso es polimorfismo: el código que las usa no necesita saber qué tarifa recibe."
4. *(AE3)* Para exportar las tarifas a diccionario, defines `class TarifaExpress(ExportableMixin, Tarifa):`. Si `ExportableMixin` y `Tarifa` tienen un método `describir()`, ¿cuál usa `TarifaExpress`?
   - a) El de la clase que aparece más abajo en el archivo
   - b) Ninguno: Python lanza un error porque los dos padres lo definen
   - c) Siempre el de `Tarifa`, porque es la clase base principal
   - **d) El de `ExportableMixin`, según el orden de resolución de métodos (MRO)**
   *Retroalimentación:* "En la herencia múltiple, Python busca los métodos según el MRO, que respeta el orden en que se nombran los padres: primero `ExportableMixin` y luego `Tarifa`. Puedes revisarlo con `TarifaExpress.__mro__`."
5. *(AE3)* El peso de un envío nunca puede ser negativo, y RutaSur quiere que esa regla se cumpla en un solo lugar. ¿Cómo diseñas ese atributo en la clase `Envio`?
   - a) Como un atributo público `peso_kg` que cada función revisa antes de usarlo
   - **b) Como `_peso_kg` con una `@property` y un setter que valida el valor**
   - c) Como una variable global `PESO_KG` que comparten todos los envíos
   - d) Como un atributo de clase `peso_kg = 0` que se cambia en cada envío
   *Retroalimentación:* "El encapsulamiento protege los datos dentro de la clase: el setter de la propiedad valida el peso cada vez que se asigna y lanza un error si no es válido. Así la regla vive en un solo lugar y no se repite en todo el código."

---

## Quiz 4 · Complejidad y eficiencia de algoritmos (AE4)

**Cuándo:** al cerrar el aprendizaje 4, después de la lectura sobre análisis de algoritmos y el ejercicio guiado de búsqueda y ordenamiento de envíos.
**Insignia:** Analista de algoritmos · **Siguiente parada:** aprendizaje 5, la optimización del código.

1. *(AE4)* El script original busca duplicados con dos `for` anidados que comparan cada envío con todos los demás. ¿Cuál es su complejidad temporal?
   - a) O(n), porque recorre la lista de envíos de principio a fin
   - b) O(log n), porque descarta envíos a medida que avanza
   - **c) O(n²), porque compara cada envío con todos los demás**
   - d) O(n log n), porque ordena los envíos antes de compararlos
   *Retroalimentación:* "Por cada uno de los n envíos, el bucle interno recorre otros n, así que hace del orden de n × n comparaciones. Con 50.000 envíos son unos 2.500 millones de comparaciones, y por eso el script se vuelve tan lento."
2. *(AE4)* La función `buscar(envios, id_envio)` recorre la lista hasta encontrar el id pedido. ¿Cuál es su complejidad temporal en el peor caso y cuánta memoria extra usa?
   - **a) Temporal O(n) en el peor caso y espacial O(1), porque no crea estructuras**
   - b) Temporal O(1) en el peor caso y espacial O(n), porque copia la lista
   - c) Temporal O(log n) en el peor caso y espacial O(1), porque divide la lista
   - d) Temporal O(n²) en el peor caso y espacial O(n), porque compara pares
   *Retroalimentación:* "En el peor caso el id está al final o no está, y la búsqueda lineal revisa los n elementos; en promedio revisa cerca de la mitad, que sigue siendo O(n). Solo usa unas pocas variables, así que su memoria extra es O(1)."
3. *(AE4)* Tienes que reescribir la detección de ids duplicados para que sea O(n) en promedio. ¿Qué versión lo logra?
   - a) Usar `ids.count(i) > 1` para cada id de la lista
   - **b) Recorrer `ids` una vez y guardar cada id en un `set` de vistos**
   - c) Ordenar `ids` con el método de burbuja y comparar vecinos
   - d) Comparar `ids.index(i)` con la posición actual de cada id
   *Retroalimentación:* "Con un conjunto, cada consulta y cada inserción cuestan O(1) en promedio, así que una pasada completa es O(n), a cambio de O(n) de memoria extra. `count()` e `index()` recorren la lista en cada llamada y el método de burbuja es O(n²)."
4. *(AE4)* Los 50.000 envíos ya están ordenados por `id_envio` y hay que ubicar miles de ids distintos. ¿Qué estrategia conviene?
   - a) Recorrer la lista desde el inicio para cada id que se busca
   - b) Ordenar otra vez la lista antes de cada una de las búsquedas
   - c) Convertir la lista en tupla para que cada búsqueda sea más rápida
   - **d) Usar búsqueda binaria con `bisect`, que es O(log n) por cada id**
   *Retroalimentación:* "Sobre una lista ordenada, la búsqueda binaria descarta la mitad de los elementos en cada paso: con 50.000 envíos bastan unas 16 comparaciones. El módulo `bisect` de Python ya la implementa."
5. *(AE4)* Implementaste un *merge sort* recursivo para ordenar los envíos por fecha. ¿Qué afirmación sobre él es correcta?
   - a) Su peor caso es O(n²), igual que el del método de burbuja
   - **b) Es O(n log n) incluso en el peor caso y usa O(n) de memoria extra**
   - c) Ordena en el lugar, sin memoria extra, y por eso supera a `sorted()`
   - d) Por ser recursivo, no necesita un caso base para detenerse
   *Retroalimentación:* "El *merge sort* divide la lista en mitades hasta llegar a listas de un elemento, su caso base, y luego las mezcla: O(n log n) en todos los casos, con O(n) de memoria para mezclar. `sorted()` también es O(n log n) y, al estar implementado en C, suele ser más rápido."

---

## Quiz 5 · Optimización del código (AE5)

**Cuándo:** al cerrar el aprendizaje 5, después de la lectura sobre optimización de código y el ejercicio guiado con NumPy, pandas, Dask y Numba, antes de la actividad final integradora del módulo 2.
**Insignia:** Optimizador/a de código · **Siguiente parada:** la actividad final integradora del módulo 2.

1. *(AE5)* En un DataFrame `df` con 50.000 envíos, hay que calcular el costo como peso por distancia por una tarifa fija de 12 pesos. ¿Qué forma es la más eficiente?
   - **a) `df['costo'] = df['peso_kg'] * df['distancia_km'] * 12`**
   - b) Un `for` con `df.iterrows()` que calcula el costo fila por fila
   - c) `df.apply()` con una función de Python que recibe cada fila
   - d) Pasar `df` a una lista de diccionarios y recorrerla con `for`
   *Retroalimentación:* "La operación vectorizada trabaja con columnas completas y la ejecuta NumPy por dentro, en código compilado. `iterrows()`, `apply()` por filas o un `for` en Python puro procesan fila por fila y son mucho más lentos."
2. *(AE5)* El equipo necesita el atraso promedio por centro de origen y tipo de servicio. ¿Qué instrucción de pandas lo entrega?
   - a) `df.groupby('tipo_servicio')['dias_atraso'].mean()`
   - b) `df.sort_values(['centro_origen', 'tipo_servicio']).mean()`
   - **c) `df.groupby(['centro_origen', 'tipo_servicio'])['dias_atraso'].mean()`**
   - d) `df.groupby(['centro_origen', 'tipo_servicio'])['dias_atraso'].sum()`
   *Retroalimentación:* "`groupby` con las dos columnas forma un grupo por cada combinación de centro y servicio, y `mean()` calcula el promedio de cada grupo. Agrupar solo por servicio pierde el centro, ordenar no agrupa y `sum()` entrega el total, no el promedio."
3. *(AE5)* Hay que leer `envios.csv` fila por fila, sin cargarlo entero en memoria, y asegurar que el archivo se cierre aunque ocurra un error. ¿Qué escribes?
   - a) Una función que abre el archivo y hace `return f.readlines()`
   - **b) `with open('envios.csv') as f:` y dentro un `yield` por cada línea**
   - c) Una comprensión de lista `[l for l in open('envios.csv')]`
   - d) `f = open('envios.csv')` y `f.close()` al final, sin `try`
   *Retroalimentación:* "Un generador con `yield` entrega una línea a la vez, así que la memoria no crece con el tamaño del archivo. El *context manager* `with` cierra el archivo al salir del bloque, incluso si se lanza una excepción."
4. *(AE5)* ¿Cuál es la forma más pythonic de armar un diccionario con el peso de cada envío válido?
   - a) Crear un diccionario vacío y llenarlo con un `for` y un `if` en varias líneas
   - b) Usar `dict(zip(ids, pesos))` sin filtrar los pesos negativos
   - c) Recorrer `for i in range(len(envios))` y leer `envios[i]`
   - **d) Una comprensión de diccionario que recorre `envios` y filtra con `if e.peso_kg > 0`**
   *Retroalimentación:* "La comprensión de diccionario construye y filtra en una sola expresión clara, y suele ser más rápida que un bucle con asignaciones. Recorrer con `range(len(...))` es un hábito poco pythonic: se recorren los elementos directamente."
5. *(AE5)* RutaSur replicó su histórico a 5 millones de filas y tiene una función numérica con bucles anidados sobre arreglos de NumPy. ¿Qué combinación conviene?
   - **a) Dask para procesar el archivo por particiones y `@numba.njit` para la función**
   - b) Numba para leer el CSV más rápido y Dask para compilar la función
   - c) Solo pandas, porque Dask y Numba funcionan únicamente con tarjeta gráfica
   - d) `iterrows()` para la función y `readlines()` para leer todo el archivo
   *Retroalimentación:* "Dask divide los datos en particiones y los procesa en paralelo, incluso si no caben en memoria. Numba compila a código máquina las funciones numéricas con bucles, y `@njit` las acelera sin cambiar su lógica."

---

## Cobertura de criterios

- Quiz 1 (AE1): criterio 1.1 (características y casos de uso de las estructuras de datos) → preguntas 1 y 2; criterio 1.2 (selección de la estructura apropiada para un problema) → preguntas 2 y 3; criterio 1.3 (árboles y grafos en Python) → preguntas 4 y 5.
- Quiz 2 (AE2): criterio 2.1 (jerarquía de excepciones de Python) → preguntas 1 y 2; criterio 2.2 (control de excepciones con try-except-finally, con logging) → preguntas 3 y 4; criterio 2.3 (excepciones personalizadas) → pregunta 5.
- Quiz 3 (AE3): criterio 3.1 (aspectos fundamentales del paradigma orientado a objetos) → pregunta 1; criterio 3.2 (principios del diseño orientado a objetos) → pregunta 2; criterio 3.3 (herencia y polimorfismo) → preguntas 3 y 4; criterio 3.4 (clases, objetos, métodos y atributos) → preguntas 1 y 5.
- Quiz 4 (AE4): criterio 4.1 (complejidad temporal y espacial) → preguntas 1 y 2; criterio 4.2 (implementación de algoritmos eficientes) → preguntas 3 y 4; criterio 4.3 (búsqueda, ordenamiento y recursión) → preguntas 4 y 5.
- Quiz 5 (AE5): criterio 5.1 (optimización con NumPy y pandas) → preguntas 1 y 2; criterio 5.2 (técnicas pythonic: generadores, context managers y comprensiones) → preguntas 3 y 4; criterio 5.3 (librerías de optimización de cómputo: Dask y Numba) → pregunta 5.
