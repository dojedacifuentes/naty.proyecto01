# PF1487 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** un quiz por aprendizaje esperado del módulo 2 (Quiz n = AEn), con los criterios de evaluación del plan formativo 2026.
**Reparto:** Quiz 1: AE1 · Quiz 2: AE2 · Quiz 3: AE3 · Quiz 4: AE4 · Quiz 5: AE5 · Quiz 6: AE6 (uno por AE). Cinco preguntas cada uno, con una sola respuesta correcta y retroalimentación.
**Son formativos:** no llevan nota.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.
**Versión juego** (HTML y SCORM para el LMS, `npm run quiz-juego`): las mismas preguntas como una misión de 5 niveles con XP, combos, energía, comodín 50:50, estrellas, logros e insignia.
**Misión:** programar en Python las rutinas que reciben, validan y ordenan las entregas de leche que los productores hacen cada día a Lácteos Calafate.

---

## Quiz 1 · Python y su entorno de trabajo (AE1)

**Cuándo:** al cerrar el aprendizaje 1, después de la lectura y del recorrido guiado por Anaconda, Jupyter y Visual Studio Code.
**Insignia:** Explorador/a de Python · **Siguiente parada:** aprendizaje 2, variables, operadores y decisiones.

1. *(AE1)* Cada noche, Lácteos Calafate debe leer los archivos CSV que envían sus plantas, limpiar los datos y cargarlos en una base de datos. ¿Por qué Python se usa tanto para este tipo de trabajo?
   - a) Porque se compila a código de máquina y no necesita intérprete
   - **b) Porque tiene librerías para leer, transformar y cargar datos, como pandas**
   - c) Porque es el único lenguaje que puede conectarse a una base de datos
   - d) Porque solo sirve para datos y por eso no tiene otras aplicaciones
   *Retroalimentación:* "Python es de propósito general y tiene un gran ecosistema para datos: pandas, NumPy y conectores a bases de datos. Por eso se usa en ingeniería y ciencia de datos, pero también en automatización, desarrollo web e inteligencia artificial."
2. *(AE1)* Al revisar un script de la cooperativa, notas que los bloques del `if` se marcan solo con sangría y que la variable `litros` se creó sin declarar su tipo. ¿Qué características de Python muestra?
   - a) Es compilado y de tipado estático
   - b) Usa llaves para los bloques y exige declarar tipos
   - **c) Usa la sangría para los bloques y es de tipado dinámico**
   - d) Es de bajo nivel y obliga a manejar la memoria a mano
   *Retroalimentación:* "En Python la sangría es parte de la sintaxis: define qué líneas pertenecen a cada bloque. Además es interpretado y de tipado dinámico: el tipo de una variable lo da el valor que le asignas."
3. *(AE1)* Verdadero o falso: «Un script escrito para Python 2, como `print "Hola"`, funciona sin cambios en Python 3».
   - a) Verdadero
   - **b) Falso**
   *Retroalimentación:* "Python 3 no es compatible con Python 2: por ejemplo, `print` pasó a ser una función y se escribe `print("Hola")`. Python 2 dejó de recibir soporte en 2020; hoy se trabaja con Python 3, y tu versión se revisa con `python --version`."
4. *(AE1)* Quieres probar paso a paso la limpieza del archivo de entregas y ver el resultado de cada paso junto a notas que lo explican. ¿Qué herramienta se ajusta mejor?
   - a) Visual Studio Code, abriendo el script como texto plano
   - b) Anaconda Navigator, sin abrir ningún programa
   - c) La terminal del sistema, ejecutando el script completo
   - **d) Jupyter Notebook, con celdas de código, resultados y texto**
   *Retroalimentación:* "Un notebook de Jupyter reúne celdas de código, su resultado y texto explicativo en un mismo documento, ideal para explorar datos paso a paso. Anaconda es la distribución que lo instala, junto con el editor Spyder."
5. *(AE1)* En el computador de la planta no se puede instalar nada, pero hay navegador y una cuenta de Google. ¿Qué opción te deja ejecutar notebooks de Python?
   - **a) Google Colab**
   - b) Spyder
   - c) Anaconda
   - d) Visual Studio Code
   *Retroalimentación:* "Google Colab ejecuta notebooks en la nube, desde el navegador y sin instalar nada. Spyder, Anaconda y Visual Studio Code se instalan en el equipo: Anaconda es la distribución, Spyder un editor científico y VS Code un editor con extensiones para Python."

---

## Quiz 2 · Sentencias básicas (AE2)

**Cuándo:** al cerrar el aprendizaje 2, después de la lectura y del ejercicio guiado de recepción de entregas.
**Insignia:** Operador/a de la consola · **Siguiente parada:** aprendizaje 3, funciones y módulos.

1. *(AE2)* En la rutina de recepción tienes `litros = 1250.5`, `productor = "Los Ñirres"` y `aceptada = True`. ¿Qué tipos de dato son, en ese orden?
   - a) int, str y bool
   - **b) float, str y bool**
   - c) float, list e int
   - d) str, str y str
   *Retroalimentación:* "`1250.5` es un decimal (float), el texto entre comillas es una cadena (str) y `True` es un booleano (bool). Un número sin decimales, como `1250`, sería un entero (int)."
2. *(AE2)* Escribes `litros = input("Litros entregados: ")` y luego `litros + 100`, y Python muestra un error. ¿Por qué?
   - a) Porque `input()` solo acepta números enteros
   - b) Porque falta `print()` antes de sumar
   - **c) Porque `input()` devuelve texto y hay que convertirlo con `float()`**
   - d) Porque las variables no se pueden sumar con números
   *Retroalimentación:* "`input()` siempre entrega una cadena (str), aunque se escriba un número. Para calcular hay que convertirla: `litros = float(input("Litros entregados: "))`. Luego `print()` muestra el resultado en la consola."
3. *(AE2)* Lácteos Calafate acepta una entrega si la leche llega a 6 °C o menos y no tiene antibióticos. Con `temperatura` y `antibioticos` (un booleano), ¿qué expresión lo dice?
   - a) `temperatura < 6 or not antibioticos`
   - b) `temperatura >= 6 and antibioticos`
   - c) `temperatura <= 6 or antibioticos`
   - **d) `temperatura <= 6 and not antibioticos`**
   *Retroalimentación:* "Se deben cumplir las dos condiciones, por eso va `and`. «6 °C o menos» es `<= 6`, y «sin antibióticos» es `not antibioticos`. Con `or` bastaría que se cumpliera una sola."
4. *(AE2)* Con `litros = 800`, la rutina dice: `if litros >= 1000:` imprime «Ruta grande»; `elif litros >= 500:` imprime «Ruta media»; `else:` imprime «Ruta chica». ¿Qué se imprime?
   - **a) Ruta media**
   - b) Ruta grande
   - c) Ruta media y Ruta chica
   - d) Ruta chica
   *Retroalimentación:* "Python revisa las condiciones en orden y ejecuta solo el primer bloque cuya condición es verdadera. 800 no es mayor o igual a 1000, pero sí a 500: se imprime «Ruta media» y el `else` ya no se revisa."
5. *(AE2)* Tu script `recepcion.py` calcula `estanques = 1250 // 300` y `sobra = 1250 % 300`. Lo ejecutas con `python recepcion.py`. ¿Qué valores quedan?
   - a) `estanques` vale 4.16 y `sobra` vale 50
   - b) `estanques` vale 5 y `sobra` vale 50
   - **c) `estanques` vale 4 y `sobra` vale 50**
   - d) `estanques` vale 4 y `sobra` vale 0.16
   *Retroalimentación:* "`//` es la división entera: 1250 // 300 da 4, porque caben 4 estanques completos (1200 litros). `%` es el resto: sobran 50 litros. Un script se guarda con extensión .py y se ejecuta desde la terminal con `python nombre.py`."

---

## Quiz 3 · Funciones y módulos (AE3)

**Cuándo:** al cerrar el aprendizaje 3, después de la lectura y del ejercicio guiado de cálculo de pagos.
**Insignia:** Constructor/a de funciones · **Siguiente parada:** aprendizaje 4, estructuras de datos y ciclos.

1. *(AE3)* Tienes `entregas = [820, 1250, 640]`. ¿Qué funciones preconstruidas de Python te dan el total de litros y la cantidad de entregas?
   - a) `total(entregas)` y `count(entregas)`
   - b) `max(entregas)` y `range(entregas)`
   - c) `print(entregas)` y `input(entregas)`
   - **d) `sum(entregas)` y `len(entregas)`**
   *Retroalimentación:* "`sum()` suma los elementos y `len()` cuenta cuántos hay. Vienen con Python, sin importar nada, igual que `max()`, `min()`, `round()` o `sorted()`."
2. *(AE3)* Defines `def pago(litros, precio=420): return litros * precio`. ¿Qué devuelve `pago(1000)`?
   - **a) 420000**
   - b) Un error, porque falta el argumento `precio`
   - c) `None`, porque la función no imprime nada
   - d) 1420
   *Retroalimentación:* "`precio` tiene un valor predeterminado (420), que se usa cuando no se entrega ese argumento. La función devuelve 1000 × 420 = 420000 con `return`, y ese valor se puede guardar en una variable."
3. *(AE3)* Una compañera escribe `def promedio(lista): print(sum(lista) / len(lista))` y luego `p = promedio([800, 1200])`. ¿Qué queda guardado en `p`?
   - a) 1000.0
   - **b) None**
   - c) 1000
   - d) El texto «1000.0»
   *Retroalimentación:* "La función muestra 1000.0 en la consola, pero no lo devuelve: sin `return`, una función entrega `None`. Para usar el resultado después, cambia `print(...)` por `return sum(lista) / len(lista)`."
4. *(AE3)* Guardaste tus funciones de control de calidad en `calidad.py`, en la misma carpeta que `recepcion.py`. ¿Cómo usas su función `validar()` desde `recepcion.py`?
   - a) Copiando `calidad.py` dentro de la función `validar()`
   - b) Escribiendo `include calidad.py` en la primera línea
   - **c) Con `from calidad import validar` y luego `validar(...)`**
   - d) No se puede: las funciones solo sirven en el archivo donde se crean
   *Retroalimentación:* "Cada archivo .py es un módulo que otros archivos pueden importar. También sirve `import calidad` y luego `calidad.validar(...)`. Documenta cada función con un docstring y usa nombres en minúscula con guion bajo, como pide PEP 8."
5. *(AE3)* Los litros del día equivalen a 2,3 camiones y debes redondear hacia arriba: se necesitan 3 camiones. ¿Qué código usas?
   - a) `round(2.3)`
   - b) `math.ceil(2.3)`, sin importar nada antes
   - c) `import math.ceil(2.3)`
   - **d) `import math` y luego `math.ceil(2.3)`**
   *Retroalimentación:* "`math` es un módulo de la librería estándar de Python: viene instalado, pero hay que importarlo. `math.ceil()` redondea hacia arriba (3); `round(2.3)` daría 2."

---

## Quiz 4 · Estructuras de datos y ciclos (AE4)

**Cuándo:** al cerrar el aprendizaje 4, después de la lectura y del ejercicio guiado con el registro de productores.
**Insignia:** Organizador/a de datos · **Siguiente parada:** aprendizaje 5, orientación a objetos.

1. *(AE4)* Necesitas encontrar rápido los datos de cada productor a partir de su código, como `"P-017"`. ¿Qué estructura de datos conviene?
   - a) Una lista
   - b) Una tupla
   - **c) Un diccionario**
   - d) Un set
   *Retroalimentación:* "Un diccionario guarda pares clave-valor: con `productores["P-017"]` obtienes sus datos sin recorrer todo. Las listas y tuplas se consultan por posición, y un set no guarda valores asociados."
2. *(AE4)* Quieres saber cuántos productores distintos entregaron leche esta semana, aunque varios entregaron más de una vez. ¿Qué estructura te ayuda?
   - **a) Un set, porque no guarda elementos repetidos**
   - b) Una lista anidada, porque ordena los códigos
   - c) Una tupla, porque no se puede modificar
   - d) Un diccionario anidado, porque cuenta solo
   *Retroalimentación:* "Un set guarda cada elemento una sola vez: `len(set(codigos))` da los productores distintos. Además permite operaciones de conjunto, como la unión `|` o la intersección `&` entre dos semanas."
3. *(AE4)* Las coordenadas de cada planta, como `(-41.3, -72.9)`, no deben cambiar nunca. ¿Por qué conviene guardarlas en una tupla?
   - a) Porque es la única estructura que acepta decimales
   - b) Porque ordena sola sus elementos
   - c) Porque elimina los valores repetidos
   - **d) Porque es inmutable: no se puede modificar después de creada**
   *Retroalimentación:* "Una tupla no se puede modificar, lo que protege datos fijos. Además se desempaqueta fácil: `lat, lon = coordenadas`."
4. *(AE4)* Con `litros = [820, 1250, 640, 990, 1100]`, ¿qué entrega `litros[1:3]`?
   - a) `[820, 1250, 640]`
   - **b) `[1250, 640]`**
   - c) `[1250, 640, 990]`
   - d) `[820, 1250]`
   *Retroalimentación:* "Las posiciones parten en 0 y el rango `[1:3]` incluye la posición 1 y no la 3: entrega los elementos de las posiciones 1 y 2. Con `litros.append(700)` agregas un elemento al final."
5. *(AE4)* Tienes `entregas = {"P-017": 820, "P-021": 1250}`. ¿Qué ciclo imprime cada código con sus litros?
   - **a) `for codigo, litros in entregas.items(): print(codigo, litros)`**
   - b) `for codigo in entregas: print(codigo, litros)`
   - c) `while entregas: print(entregas)`
   - d) `for i in range(entregas): print(i)`
   *Retroalimentación:* "`.items()` entrega cada par clave-valor, que el `for` desempaqueta en dos variables. La opción b falla porque `litros` no existe, la c nunca termina (el diccionario no se vacía) y `range()` necesita un número, no un diccionario."

---

## Quiz 5 · Orientación a objetos (AE5)

**Cuándo:** al cerrar el aprendizaje 5, después de la lectura y del ejercicio guiado con las clases de entregas.
**Insignia:** Arquitecto/a de objetos · **Siguiente parada:** aprendizaje 6, manejo de excepciones.

1. *(AE5)* En la clase `Entrega`, el atributo `_litros` solo cambia a través de un método que valida que no sea negativo. ¿Qué principio de la orientación a objetos se aplica?
   - a) Herencia
   - b) Polimorfismo
   - **c) Encapsulamiento**
   - d) Herencia múltiple
   *Retroalimentación:* "El encapsulamiento protege el estado interno de un objeto: los datos se cambian por métodos que los validan, como un setter o una propiedad con el decorador `@property`. El guion bajo indica que el atributo es de uso interno."
2. *(AE5)* Al crear `p = Productor("P-017", "Los Ñirres")`, ¿qué método de la clase se ejecuta solo y asigna los atributos del nuevo objeto?
   - a) `__str__`
   - **b) `__init__`**
   - c) `main()`
   - d) `self()`
   *Retroalimentación:* "`__init__` es el inicializador: recibe los datos al instanciar el objeto y los guarda en atributos con `self`. Es un dunder method, como `__str__`, que define cómo se muestra el objeto como texto."
3. *(AE5)* Las clases `EntregaConvencional` y `EntregaOrganica` heredan de `Entrega` y cada una redefine `calcular_pago()`. Un ciclo llama `e.calcular_pago()` sobre una lista que tiene objetos de ambas. ¿Qué ocurre?
   - **a) Cada objeto ejecuta su propia versión del método: es polimorfismo**
   - b) Se produce un error, porque el método tiene el mismo nombre
   - c) Siempre se ejecuta la versión de la clase `Entrega`
   - d) Solo se ejecuta la versión de la última clase definida
   *Retroalimentación:* "Polimorfismo: un mismo mensaje, `calcular_pago()`, produce el comportamiento que corresponde a cada clase. Así el ciclo no necesita preguntar de qué tipo es cada entrega."
4. *(AE5)* Tres clases repiten el mismo código para validar la temperatura de la leche. ¿Qué principio de diseño sugiere dejarlo en un solo lugar, por ejemplo en un método de la clase base?
   - a) MRO
   - b) Sobrecarga
   - c) Getter
   - **d) DRY**
   *Retroalimentación:* "DRY (Don't Repeat Yourself, no te repitas) pide que cada lógica exista una sola vez: si cambia la regla, se corrige en un solo lugar. Los principios SOLID complementan el diseño; por ejemplo, que cada clase tenga una sola responsabilidad."
5. *(AE5)* Para leer el archivo de entregas usas `import pandas as pd` y `df = pd.read_csv("entregas.csv")`. ¿Qué es `df`?
   - a) Una lista de Python con las filas del archivo
   - **b) Un objeto de la clase DataFrame, con atributos y métodos propios**
   - c) Un diccionario estándar de Python
   - d) Una función que imprime el archivo
   *Retroalimentación:* "pandas es una librería de terceros: `read_csv()` crea un objeto de la clase DataFrame, que trae métodos como `df.head()` o `df.describe()` y atributos como `df.shape`. Usar clases de librerías es parte del día a día de la ingeniería de datos."

---

## Quiz 6 · Manejo de excepciones (AE6)

**Cuándo:** al cerrar el aprendizaje 6, después de la lectura y del ejercicio guiado de carga de archivos.
**Insignia:** Guardián/a de la carga · **Siguiente parada:** la evaluación del módulo 2.

1. *(AE6)* Un archivo trae «mil» en vez de un número, y `float("mil")` detiene la rutina. ¿Qué excepción lanza Python?
   - a) TypeError
   - **b) ValueError**
   - c) ZeroDivisionError
   - d) KeyError
   *Retroalimentación:* "ValueError aparece cuando el tipo es el correcto (un texto) pero su valor no sirve para la operación. En la jerarquía de excepciones, ValueError, KeyError y ZeroDivisionError descienden de la clase Exception."
2. *(AE6)* Un script envuelve toda la carga en `try:` … `except: pass`. ¿Qué problema tiene?
   - a) Ninguno: es la forma recomendada de evitar errores
   - b) Hace que el script se ejecute más lento
   - **c) Esconde cualquier error, incluso los inesperados, y nadie sabe qué falló**
   - d) Obliga a escribir un bloque `finally`
   *Retroalimentación:* "Un `except` vacío con `pass` silencia todo. Una buena práctica es capturar excepciones específicas, como `except ValueError`, e informar o registrar qué falló y en qué fila."
3. *(AE6)* En `try:` … `except ValueError:` … `finally: archivo.close()`, ¿cuándo se ejecuta el bloque `finally`?
   - **a) Siempre, haya o no un error**
   - b) Solo cuando no hay errores
   - c) Solo cuando ocurre un ValueError
   - d) Nunca, si antes se ejecutó el `except`
   *Retroalimentación:* "`finally` se ejecuta en todos los casos: por eso es el lugar para cerrar archivos o conexiones. `try` agrupa el código que puede fallar y `except` define qué hacer ante cada tipo de error."
4. *(AE6)* La rutina debe rechazar una entrega que llega sobre 6 °C con un error propio, fácil de reconocer. ¿Qué código corresponde?
   - a) `print("Error")` y seguir procesando la entrega
   - b) `return Error` dentro de la función
   - c) Un `except TemperaturaAltaError:` sin lanzar nada antes
   - **d) `class TemperaturaAltaError(Exception): pass` y `raise TemperaturaAltaError("...")`**
   *Retroalimentación:* "Una excepción personalizada es una clase que hereda de Exception; `raise` la lanza con un mensaje claro. Quien llame a la función decide cómo manejarla con su propio `except TemperaturaAltaError`."
5. *(AE6)* `leer_entrega()` lanza un ValueError y no lo captura. La función que la llamó, `procesar_archivo()`, sí tiene `try`/`except ValueError`. ¿Qué pasa?
   - a) El script se detiene de inmediato, aunque haya un `except` más arriba
   - **b) El error se propaga hasta `procesar_archivo()`, que lo captura**
   - c) El error se pierde sin que nadie lo vea
   - d) `leer_entrega()` se vuelve a ejecutar sola hasta que funcione
   *Retroalimentación:* "Cuando una función no captura una excepción, esta sube (se propaga) a quien la llamó, hasta encontrar un `except` que la maneje. Si nadie la captura, el programa se detiene y muestra el error."

---

## Cobertura de criterios

- Quiz 1 (AE1): criterio 1.1 → preguntas 1 y 2; criterio 1.2 → preguntas 3, 4 y 5.
- Quiz 2 (AE2): criterio 2.1 → pregunta 1 (y las conversiones de tipo en la 2); criterio 2.2 → preguntas 2 y 5; criterio 2.3 → pregunta 3; criterio 2.4 → pregunta 4.
- Quiz 3 (AE3): criterio 3.1 → pregunta 1; criterio 3.2 → preguntas 2 y 3; criterio 3.3 → preguntas 4 y 5.
- Quiz 4 (AE4): criterio 4.1 → preguntas 1, 2 y 3; criterio 4.2 → preguntas 4 y 5.
- Quiz 5 (AE5): criterio 5.1 → pregunta 1; criterio 5.2 → pregunta 4; criterio 5.3 → pregunta 5; criterio 5.4 → pregunta 2; criterio 5.5 → pregunta 3.
- Quiz 6 (AE6): criterio 6.1 → pregunta 1; criterio 6.2 → preguntas 3 y 5; criterio 6.3 → preguntas 2 y 4.
