# PF1483 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** un quiz por aprendizaje esperado del módulo 2 (Quiz n = AEn), con los criterios de evaluación del plan formativo 2026.
**Reparto:** Quiz 1: AE1 · Quiz 2: AE2 · Quiz 3: AE3 · Quiz 4: AE4 · Quiz 5: AE5 · Quiz 6: AE6 · Quiz 7: AE7 (uno por AE). Cinco preguntas cada uno, con una sola respuesta correcta y retroalimentación.
**Son formativos:** no llevan nota.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.
**Versión juego** (HTML y SCORM para el LMS, `npm run quiz-juego`): las mismas preguntas como una misión de 5 niveles con XP, combos, energía, comodín 50:50, estrellas, logros e insignia.
**Misión:** programar en Python las rutinas que ordenan y resumen la temperatura, la lluvia y el viento de las estaciones de montaña del Observatorio Cordillera.

---

## Quiz 1 · Python y su entorno de trabajo (AE1)

**Cuándo:** al cerrar el aprendizaje 1, después de la lectura y del recorrido guiado por Anaconda y Visual Studio Code.
**Insignia:** Explorador/a de Python · **Siguiente parada:** aprendizaje 2, variables, tipos de dato y cálculos.

1. *(AE1)* El Observatorio Cordillera debe elegir un lenguaje para limpiar, resumir y graficar los registros de sus estaciones. ¿Por qué Python es una buena opción?
   - **a) Es legible y tiene librerías para datos, como pandas**
   - b) Es el único lenguaje capaz de leer archivos CSV
   - c) Se ejecuta sin necesidad de un intérprete
   - d) Exige declarar el tipo de cada variable antes de usarla
   *Retroalimentación:* "Python tiene una sintaxis clara y un gran ecosistema de librerías para datos, como pandas, NumPy y matplotlib. Además, lo ejecuta un intérprete y no exige declarar el tipo de las variables."
2. *(AE1)* Verdadero o falso: «Python sirve solo para analizar datos; para automatizar tareas o crear sitios web se necesita otro lenguaje».
   - a) Verdadero
   - **b) Falso**
   *Retroalimentación:* "Python es un lenguaje de propósito general: se usa en análisis de datos, automatización de tareas, desarrollo web, inteligencia artificial y mucho más."
3. *(AE1)* En el curso instalas Anaconda. ¿Qué es?
   - a) Un editor de código de Microsoft al que le agregas extensiones
   - b) Un servicio en la nube para ejecutar notebooks
   - **c) Una distribución de Python que incluye Jupyter y Spyder**
   - d) Un lenguaje distinto de Python, pensado para estadística
   *Retroalimentación:* "Anaconda es una distribución: instala Python junto con librerías para datos y herramientas como Jupyter Notebook y Spyder. Visual Studio Code es un editor y Google Colab, un servicio en la nube."
4. *(AE1)* El equipo del observatorio quiere probar un notebook en un computador prestado, sin instalar nada. ¿Qué herramienta le sirve?
   - a) Spyder
   - b) Anaconda Navigator
   - c) La extensión de Python para Visual Studio Code
   - **d) Google Colab**
   *Retroalimentación:* "Google Colab ejecuta notebooks en la nube, desde el navegador. Spyder, Anaconda y Visual Studio Code se instalan en el computador antes de usarlos."
5. *(AE1)* En Visual Studio Code tienes el Python de Anaconda y otro Python instalado aparte. ¿Cómo eliges con cuál se ejecuta tu script?
   - a) Escribiendo `python --version` en la terminal
   - **b) Con «Python: Select Interpreter», en la paleta de comandos**
   - c) Cambiando la extensión del archivo de .py a .ipynb
   - d) Abriendo el script en Spyder y volviendo a Visual Studio Code
   *Retroalimentación:* "La extensión de Python agrega a Visual Studio Code el comando «Python: Select Interpreter» (en la paleta, Ctrl+Shift+P). `python --version` solo muestra qué versión responde en la terminal; no la cambia."

---

## Quiz 2 · Variables, tipos y cálculos (AE2)

**Cuándo:** al cerrar el aprendizaje 2, después de la lectura y de ejecutar desde la consola el primer script del observatorio.
**Insignia:** Calculista de estaciones · **Siguiente parada:** aprendizaje 3, condiciones y decisiones.

1. *(AE2)* Una estación guarda su lectura así: `lectura = '12.5'`. ¿De qué tipo es la variable `lectura`?
   - a) float (número decimal)
   - b) int (número entero)
   - **c) str (cadena de caracteres)**
   - d) bool (valor verdadero o falso)
   *Retroalimentación:* "Las comillas hacen que el valor sea texto: es una cadena (str), aunque parezca un número. Para calcular con ella, conviértela con `float(lectura)`."
2. *(AE2)* La estación Cumbre registró 18 mm de lluvia el lunes y 7 mm el martes. ¿Qué imprime `print((18 + 7) / 2)`?
   - a) 12
   - b) 21.5
   - c) 12.0
   - **d) 12.5**
   *Retroalimentación:* "Los paréntesis hacen la suma primero (25), y / siempre entrega un decimal: 12.5. Sin paréntesis, `18 + 7 / 2` daría 21.5, y la división entera `25 // 2` daría 12."
3. *(AE2)* Una rutina convierte 135 minutos de lluvia continua en horas y minutos. ¿Qué imprime `print(135 // 60, 135 % 60)`?
   - a) 2.25 15
   - **b) 2 15**
   - c) 2 0.25
   - d) 2.25 0
   *Retroalimentación:* "// entrega la división entera (2 horas) y % entrega el resto (15 minutos). print muestra los dos valores separados por un espacio."
4. *(AE2)* Pides la temperatura con `t = input('Temperatura: ')`, el usuario escribe 15 y `print(t + 5)` da un error. ¿Qué línea de lectura lo corrige?
   - a) `t = input(float('Temperatura: '))`
   - **b) `t = float(input('Temperatura: '))`**
   - c) `t = str(input('Temperatura: '))`
   - d) `t = input('Temperatura: ', float)`
   *Retroalimentación:* "`input` siempre entrega texto (str), y sumar texto con un número da un error. `float(...)` convierte lo escrito en un número decimal, y así `t + 5` da 20.0."
5. *(AE2)* Guardaste la rutina como `resumen.py` y abriste la terminal en esa carpeta. ¿Qué escribes para ejecutarla?
   - **a) `python resumen.py`**
   - b) `run resumen.py`
   - c) `pip install resumen.py`
   - d) `python resumen`
   *Retroalimentación:* "En la terminal, `python` seguido del nombre del archivo, con su extensión .py, ejecuta el script. `pip` instala librerías; no ejecuta tus programas."

---

## Quiz 3 · Condiciones y decisiones (AE3)

**Cuándo:** al cerrar el aprendizaje 3, después de la lectura y del ejercicio guiado de alertas por estación.
**Insignia:** Vigía de alertas · **Siguiente parada:** aprendizaje 4, funciones y módulos.

1. *(AE3)* El observatorio clasifica el viento en tres niveles: calma, moderado y fuerte. ¿Qué estructura usas para elegir uno de los tres?
   - a) Un if solo
   - b) Un if-else
   - c) Un ciclo while
   - **d) Un if-elif-else**
   *Retroalimentación:* "if-elif-else elige un camino entre tres o más. Un if solo decide si ejecutar un bloque, if-else elige entre dos caminos y while repite, no elige."
2. *(AE3)* Con `lluvia = True` y `helada = False`, ¿qué entrega la expresión `lluvia and not helada`?
   - **a) True**
   - b) False
   - c) None
   - d) Un error de sintaxis
   *Retroalimentación:* "`not` invierte `helada` (False pasa a True), y `and` entrega True solo si los dos lados son verdaderos: True and True es True."
3. *(AE3)* La alerta debe activarse si la estación es 'Cumbre' o 'Paso Alto', siempre que el sensor esté activo. ¿Qué expresión es correcta?
   - a) `estacion == 'Cumbre' or estacion == 'Paso Alto' and activo`
   - b) `estacion == 'Cumbre' or 'Paso Alto' and activo`
   - **c) `(estacion == 'Cumbre' or estacion == 'Paso Alto') and activo`**
   - d) `(estacion = 'Cumbre' or estacion = 'Paso Alto') and activo`
   *Retroalimentación:* "`and` se evalúa antes que `or`: sin paréntesis, Cumbre activaría la alerta aunque el sensor esté apagado. Los paréntesis agrupan primero el `or`, y `=` asigna, no compara."
4. *(AE3)* Esta línea da SyntaxError: `if estacion = 'Cumbre':`. ¿Cómo la corriges?
   - a) `if (estacion = 'Cumbre'):`
   - **b) `if estacion == 'Cumbre':`**
   - c) `if estacion = 'Cumbre'`
   - d) `if estacion: 'Cumbre'`
   *Retroalimentación:* "Para comparar se usa `==`; el `=` solo asigna un valor. La línea del if termina con dos puntos y el bloque que sigue va con sangría."
5. *(AE3)* ¿Qué imprime este código? `viento = 50`; `if viento != 0: print('Hay viento')`; `elif viento == 50: print('Viento fuerte')`; `else: print('Calma')`
   - a) Viento fuerte
   - b) Hay viento y Viento fuerte
   - c) Calma
   - **d) Hay viento**
   *Retroalimentación:* "Python revisa las condiciones en orden y ejecuta solo el primer bloque verdadero. Como `viento != 0` ya se cumple, el elif no se revisa: pon primero la condición más específica."

---

## Quiz 4 · Funciones y módulos (AE4)

**Cuándo:** al cerrar el aprendizaje 4, después de la lectura y del ejercicio guiado con funciones propias.
**Insignia:** Artesano/a de funciones · **Siguiente parada:** aprendizaje 5, estructuras de datos.

1. *(AE4)* La lluvia de cuatro días en la estación Valle está en `lluvias = [4, 0, 12, 7]`. ¿Qué imprime `print(len(lluvias), sum(lluvias), max(lluvias))`?
   - **a) 4 23 12**
   - b) 3 23 12
   - c) 4 12 23
   - d) 4 23 7
   *Retroalimentación:* "`len` cuenta los elementos (4), `sum` los suma (4 + 0 + 12 + 7 = 23) y `max` entrega el mayor (12). Son funciones preconstruidas: las usas sin importar nada."
2. *(AE4)* ¿Qué imprime este código? `def promedio(a, b): return (a + b) / 2`; luego `print(promedio(10, 4))`
   - a) 7
   - **b) 7.0**
   - c) 12.0
   - d) None
   *Retroalimentación:* "La función recibe 10 y 4 en sus parámetros, suma 14 y lo divide por 2. Como / siempre entrega un decimal, `return` devuelve 7.0 y `print` lo muestra."
3. *(AE4)* Esta función debería convertir grados Celsius a Fahrenheit: `def a_fahrenheit(c):` y, dentro, `f = c * 9 / 5 + 32`. Pero `print(a_fahrenheit(10))` imprime None. ¿Qué le falta?
   - a) Llamarla con corchetes: `a_fahrenheit[10]`
   - b) Escribir `function` en lugar de `def`
   - c) Declarar el parámetro como `int c`
   - **d) Agregar `return f` al final de la función**
   *Retroalimentación:* "Sin `return`, la función calcula f pero no lo devuelve, y Python entrega None. Con `return f`, `a_fahrenheit(10)` devuelve 50.0."
4. *(AE4)* Necesitas la raíz cuadrada de 16 con el módulo math. ¿Qué código funciona?
   - **a) `import math; print(math.sqrt(16))`**
   - b) `import math; print(sqrt(16))`
   - c) `print(math.sqrt(16))`
   - d) `from math import sqrt; print(math.sqrt(16))`
   *Retroalimentación:* "Con `import math`, las funciones del módulo se llaman con el prefijo math. Si importas solo sqrt con `from`, se usa `sqrt(16)` sin prefijo. Sin importar, Python no reconoce math."
5. *(AE4)* Con `import statistics` y `temps = [8, 12, 10, 2]`, ¿qué imprime `print(statistics.median(temps))`?
   - a) 8
   - b) 10
   - **c) 9.0**
   - d) 12
   *Retroalimentación:* "`median` ordena los datos (2, 8, 10, 12) y, como son cuatro, promedia los dos del centro: (8 + 10) / 2 = 9.0. El promedio, `statistics.mean(temps)`, daría 8."

---

## Quiz 5 · Estructuras de datos (AE5)

**Cuándo:** al cerrar el aprendizaje 5, después de la lectura y del ejercicio guiado con los registros de las estaciones.
**Insignia:** Curador/a de datos · **Siguiente parada:** aprendizaje 6, sentencias iterativas.

1. *(AE5)* Guardas cada registro como `('Cumbre', -2, 15)` en vez de `['Cumbre', -2, 15]`. ¿Qué característica distingue a la tupla de la lista?
   - a) Solo puede guardar números
   - **b) No se puede modificar una vez creada**
   - c) No mantiene el orden de sus elementos
   - d) Sus elementos se rescatan por clave
   *Retroalimentación:* "La tupla es inmutable: no puedes agregarle ni cambiarle elementos. Las dos mantienen el orden y aceptan cualquier tipo; el set no tiene orden y el diccionario usa claves."
2. *(AE5)* Cada estación envía muchos registros al día, y necesitas saber qué estaciones distintas enviaron datos, sin nombres repetidos. ¿Qué estructura usas?
   - a) Una lista
   - b) Una tupla
   - c) Una cadena de caracteres
   - **d) Un set**
   *Retroalimentación:* "Un set guarda solo valores únicos: si agregas 'Cumbre' diez veces, queda una vez. La lista y la tupla aceptan elementos repetidos."
3. *(AE5)* Quieres consultar la temperatura de cada estación por su nombre, por ejemplo la de 'Cumbre'. ¿Qué estructura conviene?
   - **a) Un diccionario con el nombre como clave**
   - b) Una lista con las temperaturas, en orden de llegada
   - c) Un set con los nombres de las estaciones
   - d) Una tupla con las temperaturas de cada día
   *Retroalimentación:* "El diccionario asocia cada clave con su valor: `temps['Cumbre']` entrega esa temperatura directo. En una lista tendrías que saber en qué posición está."
4. *(AE5)* ¿Qué imprime este código? `temps = [8, 11, 5]`; `temps.append(9)`; `print(temps[1], temps[-1])`
   - a) 8 9
   - b) 11 5
   - **c) 11 9**
   - d) 8 5
   *Retroalimentación:* "`append` agrega el 9 al final: [8, 11, 5, 9]. Los índices parten en 0, así que `temps[1]` es 11, y `temps[-1]` es el último elemento, 9."
5. *(AE5)* ¿Qué imprime este código? `lluvia = {'Cumbre': 12, 'Valle': 3}`; `lluvia['Paso'] = 7`; `lluvia['Valle'] = 5`; `print(lluvia['Valle'], len(lluvia))`
   - a) 3 3
   - **b) 5 3**
   - c) 5 4
   - d) 3 4
   *Retroalimentación:* "Asignar un valor a una clave nueva ('Paso') la agrega; asignarlo a una clave que ya existe ('Valle') reemplaza su valor. Quedan 3 claves, y Valle vale 5."

---

## Quiz 6 · Ciclos while y for (AE6)

**Cuándo:** al cerrar el aprendizaje 6, después de la lectura y del ejercicio guiado de resúmenes semanales.
**Insignia:** Maestro/a de los ciclos · **Siguiente parada:** aprendizaje 7, programación orientada a objetos.

1. *(AE6)* Una rutina pide una lectura por teclado y la vuelve a pedir hasta que el valor sea válido. ¿Qué sentencia conviene y por qué?
   - a) for, porque recorre una colección elemento por elemento
   - **b) while, porque repite mientras se cumpla una condición**
   - c) for con range(10), porque fija el número de intentos
   - d) if-else, porque repite el bloque si la lectura no sirve
   *Retroalimentación:* "while repite mientras su condición sea verdadera, sin saber de antemano cuántas vueltas dará. for recorre una colección o un range, con un número de vueltas conocido."
2. *(AE6)* ¿Qué imprime este código? `temps = [6, 9, 3]`; `for t in temps: print(t * 2)`
   - a) 6, 9 y 3, uno por línea
   - b) 36, una sola vez
   - **c) 12, 18 y 6, uno por línea**
   - d) [12, 18, 6]
   *Retroalimentación:* "for toma cada elemento de la lista, en orden, y ejecuta el bloque con él: imprime el doble de 6, de 9 y de 3, cada uno en su propia línea."
3. *(AE6)* Con `lluvia = {'Cumbre': 12, 'Valle': 3}`, ¿qué toman `nombre` y `mm` en cada vuelta de `for nombre, mm in lluvia.items():`?
   - **a) Cada clave con su valor: 'Cumbre' y 12, luego 'Valle' y 3**
   - b) Solo las claves de cada estación, primero 'Cumbre' y después 'Valle'
   - c) Solo los valores, primero 12 y después 3
   - d) Cada letra de las claves, una en cada vuelta
   *Retroalimentación:* "`items()` entrega los pares clave-valor, y for los desempaqueta en nombre y mm. Si recorres el diccionario directo, con `for nombre in lluvia`, obtienes solo las claves."
4. *(AE6)* Para probar un acumulador, ejecutas `total = 0`; `for i in range(1, 4): total = total + i`; `print(total)`. ¿Qué imprime?
   - a) 10
   - **b) 6**
   - c) 3
   - d) 1, 3 y 6, uno por línea
   *Retroalimentación:* "`range(1, 4)` entrega 1, 2 y 3: el 4 no se incluye. El ciclo suma 1 + 2 + 3 = 6 y, como print está fuera del ciclo, imprime una sola vez."
5. *(AE6)* Este ciclo debe imprimir 3, 2 y 1, y terminar, pero nunca se detiene: `n = 3`; `while n != 0: print(n)`. ¿Qué le falta dentro del bloque?
   - a) Un `break` antes del print
   - b) Cambiar `while` por `if`
   - c) Escribir `print(n - 1)` en lugar de `print(n)`
   - **d) La línea `n = n - 1`, después del print**
   *Retroalimentación:* "Si n nunca cambia, la condición `n != 0` siempre es verdadera y el ciclo no termina. Restar 1 en cada vuelta hace que n pase por 3, 2 y 1 y llegue a 0."

---

## Quiz 7 · Programación orientada a objetos (AE7)

**Cuándo:** al cerrar el aprendizaje 7, después de la lectura y del ejercicio guiado con la clase de las estaciones.
**Insignia:** Arquitecto/a de objetos · **Siguiente parada:** la evaluación del módulo 2.

1. *(AE7)* En una clase `Estacion`, ¿qué son el nombre y la altitud de cada estación, y qué es `registrar_lectura()`?
   - a) Métodos y un atributo
   - **b) Atributos y un método**
   - c) Objetos y una clase
   - d) Módulos y una variable
   *Retroalimentación:* "Los atributos guardan el estado de cada objeto, como su nombre y su altitud; los métodos definen su comportamiento, lo que sabe hacer. Elegir solo los datos y acciones que importan es la abstracción."
2. *(AE7)* Escribes `cumbre = Estacion('Cumbre', 3200)`. ¿Qué relación hay entre `Estacion` y `cumbre`?
   - a) Son lo mismo; solo cambia la mayúscula
   - b) `cumbre` es la clase y `Estacion`, su instancia
   - c) `Estacion` guarda los datos y `cumbre`, solo los métodos
   - **d) `Estacion` es el molde y `cumbre`, un objeto creado con él**
   *Retroalimentación:* "La clase define qué atributos y métodos tendrán sus objetos. Al llamarla, como en `Estacion('Cumbre', 3200)`, creas una instancia con sus propios valores. De una clase puedes crear muchos objetos."
3. *(AE7)* En `class Estacion:` defines `def __init__(self, nombre, altitud):`. ¿Qué línea, dentro de `__init__`, guarda el nombre como atributo de cada objeto?
   - **a) `self.nombre = nombre`**
   - b) `nombre = self.nombre`
   - c) `Estacion = nombre`
   - d) `self = nombre`
   *Retroalimentación:* "`self` es el objeto que se está creando: `self.nombre = nombre` guarda en él el valor que llegó como parámetro. Así, cada estación conserva su propio nombre."
4. *(AE7)* ¿Qué imprime este código? `class Sensor:` con `def __init__(self, tipo): self.tipo = tipo` y `def describir(self): return 'Sensor de ' + self.tipo`; luego `s = Sensor('viento'); print(s.describir())`
   - a) Sensor de tipo
   - b) Un error, porque describir() se llama sin argumentos
   - **c) Sensor de viento**
   - d) None
   *Retroalimentación:* "Al crear s, `__init__` guarda 'viento' en `self.tipo`. Al llamar `s.describir()`, Python pasa s como self de forma automática, y el método devuelve 'Sensor de viento'."
5. *(AE7)* Un registro llega como `dato = ' cumbre,-2,15 '`. ¿Qué entrega `dato.strip().upper().split(',')`?
   - a) `['CUMBRE', -2, 15]`
   - b) `'CUMBRE,-2,15'`
   - c) `[' CUMBRE', '-2', '15 ']`
   - **d) `['CUMBRE', '-2', '15']`**
   *Retroalimentación:* "Los métodos de str se encadenan: `strip()` quita los espacios de los extremos, `upper()` pasa a mayúsculas y `split(',')` corta en cada coma y entrega una lista de textos, no de números."

---

## Cobertura de criterios

- Quiz 1 (AE1): criterio 1.1 → preguntas 1 y 2; criterio 1.2 → preguntas 3, 4 y 5.
- Quiz 2 (AE2): criterio 2.1 → preguntas 1 y 4 (tipos y conversión); criterio 2.2 → preguntas 2 y 3; criterio 2.3 → pregunta 4 (entrada con input; la salida con print aparece en 2 y 3); criterio 2.4 → pregunta 5.
- Quiz 3 (AE3): criterio 3.1 → pregunta 1; criterio 3.2 → preguntas 2 y 3; criterio 3.3 → preguntas 4 y 5.
- Quiz 4 (AE4): criterio 4.1 → pregunta 1; criterio 4.2 → preguntas 2 y 3; criterio 4.3 → preguntas 4 y 5.
- Quiz 5 (AE5): criterio 5.1 → pregunta 1; criterio 5.2 → preguntas 2 y 3; criterio 5.3 → preguntas 4 y 5.
- Quiz 6 (AE6): criterio 6.1 → pregunta 1; criterio 6.2 → preguntas 2 y 3; criterio 6.3 → preguntas 4 y 5.
- Quiz 7 (AE7): criterio 7.1 → pregunta 1; criterio 7.2 → pregunta 2; criterio 7.3 → preguntas 3 y 4; criterio 7.4 → pregunta 5.
