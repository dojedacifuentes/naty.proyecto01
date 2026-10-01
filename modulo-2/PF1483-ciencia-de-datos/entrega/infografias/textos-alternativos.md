# Fundamentos de Ciencia de Datos · Módulo 2 · Infografías en texto

Versión en texto de cada infografía, para lectores de pantalla y para el texto alternativo del LMS. Generado por `npm run infografias`.

## Aprendizaje esperado 1 · EL LENGUAJE PYTHON

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA EL ANÁLISIS DE DATOS. Tu primera caja de herramientas.

**Aprendizaje esperado 1:** EXPLICAR LAS PRINCIPALES HERRAMIENTAS DEL LENGUAJE PYTHON PARA RESOLVER DISTINTAS PROBLEMÁTICAS EN EL ENTORNO DE TRABAJO.

1. **Reseña.** Contenido: RESEÑA DEL LENGUAJE PYTHON. Lo creó Guido van Rossum y se publicó en 1991; el nombre viene del grupo humorístico Monty Python. Es de código abierto y lo mantiene la Python Software Foundation.
2. **Propósito y aplicaciones.** Contenido: PROPÓSITO DEL LENGUAJE PYTHON. Es un lenguaje de propósito general: análisis y ciencia de datos, inteligencia artificial, automatización de tareas, desarrollo web y scripts para el trabajo diario.
3. **Características.** Contenido: PRINCIPALES CARACTERÍSTICAS DEL LENGUAJE. Sintaxis simple y legible, interpretado, de tipado dinámico, multiplataforma y multiparadigma, con miles de librerías como pandas y NumPy.
4. **Versiones.** Contenido: VERSIONES DE PYTHON. Python 2 dejó de recibir soporte en 2020. Se trabaja con Python 3, en su versión estable más reciente; revisa la tuya con python --version.
5. **Anaconda.** Contenido: ENTORNO DE TRABAJO Y HERRAMIENTAS: EL ENTORNO ANACONDA. Una distribución que instala Python con las librerías de datos y las herramientas Spyder y Jupyter, y administra entornos con conda.
6. **Spyder.** Contenido: EL EDITOR SPYDER. Un editor pensado para el trabajo científico: editor de código, consola interactiva y explorador de variables en una misma ventana.
7. **Jupyter Notebooks y Google Colab.** Contenido: JUPYTER NOTEBOOKS · GOOGLE COLAB. Cuadernos que reúnen celdas de código, resultados y texto en un mismo documento. Google Colab los ejecuta en la nube, sin instalar nada, con una cuenta de Google.
8. **Visual Studio Code.** Contenido: VISUAL STUDIO CODE. Editor gratuito de Microsoft. Con la extensión de Python suma resaltado de sintaxis, autocompletado, depurador, terminal integrada y soporte para notebooks.

**Lo que demostrarás:**
- 1.1 COMPRENDE LAS APLICACIONES EN DONDE PUEDE SER UTILIZADO EL LENGUAJE PYTHON.
- 1.2 DISTINGUE LAS PRINCIPALES HERRAMIENTAS DE PYTHON CARACTERÍSTICAS EN EL ENTORNO DE TRABAJO DE VISUAL STUDIO CODE.

## Aprendizaje esperado 2 · SENTENCIAS BÁSICAS DEL LENGUAJE PYTHON

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA EL ANÁLISIS DE DATOS. Datos, cálculos y una conversación con la consola.

**Aprendizaje esperado 2:** APLICAR EL CONCEPTO DE VARIABLE, TIPOS DE DATO FUNDAMENTALES Y EXPRESIONES ARITMÉTICAS UTILIZANDO EL LENGUAJE PYTHON PARA LA CREACIÓN DE UNA RUTINA DE BAJA COMPLEJIDAD.

1. **Variables.** Contenido: VARIABLES. Un nombre que guarda un valor: temperatura = 12.5. Se crea al asignarle algo; el nombre va en minúsculas y con guion bajo, como temp_maxima.
2. **Tipos de dato fundamentales.** Contenido: TIPOS DE DATO FUNDAMENTALES: ENTERO · DECIMAL · CADENA DE CARACTERES · BOOLEANO. int entero (3) · float decimal (12.5) · str texto ("Estación Norte") · bool verdadero o falso (True, False). type(x) dice de qué tipo es un valor.
3. **Expresiones aritméticas.** Contenido: EXPRESIONES ARITMÉTICAS. + - * / · // división entera · % resto · ** potencia. Se respetan los paréntesis y la precedencia: (12 + 8) / 2 da 10.0.
4. **Conversiones de tipo.** Contenido: CONVERSIONES DE TIPO. int("7") → 7 · float("12.5") → 12.5 · str(30) → "30". input() siempre entrega texto: conviértelo antes de calcular.
5. **Imprimir en consola.** Contenido: IMPRESIÓN EN CONSOLA. print("Máxima:", temp_max) o, con un f-string, print(f"Máxima: {temp_max} °C").
6. **Leer datos del usuario.** Contenido: ENTRADA DE DATOS EN CONSOLA. lluvia = float(input("Milímetros de lluvia: ")) muestra el mensaje, espera lo que se escribe y lo guarda como número.
7. **Crear y ejecutar un script.** Contenido: CREACIÓN Y EJECUCIÓN DE UN SCRIPT PYTHON. Guarda el código en un archivo .py, por ejemplo clima.py, y ejecútalo desde la consola con python clima.py.

**Lo que demostrarás:**
- 2.1 RECONOCE EL CONCEPTO DE VARIABLE IDENTIFICANDO LOS TIPOS DE DATO FUNDAMENTALES DE ACUERDO AL LENGUAJE PYTHON.
- 2.2 ELABORA EXPRESIONES ARITMÉTICAS PARA REALIZAR CÁLCULOS DE ACUERDO AL LENGUAJE PYTHON.
- 2.3 UTILIZA LA ENTRADA Y SALIDA ESTÁNDAR DE PYTHON PARA EL INTERCAMBIO DE DATOS CON LA RUTINA.
- 2.4 EJECUTA UN SCRIPT CON INSTRUCCIONES PYTHON DESDE LA CONSOLA.

## Aprendizaje esperado 3 · SENTENCIAS CONDICIONALES

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA EL ANÁLISIS DE DATOS. Programas que toman decisiones.

**Aprendizaje esperado 3:** CODIFICAR UNA RUTINA UTILIZANDO ESTRUCTURAS CONDICIONALES Y EXPRESIONES BOOLEANAS PARA RESOLVER UN PROBLEMA DE BAJA COMPLEJIDAD DE ACUERDO AL LENGUAJE PYTHON.

1. **Qué es una sentencia condicional.** Contenido: ¿QUÉ ES UNA SENTENCIA CONDICIONAL Y POR QUÉ SE NECESITAN?. Permite que el programa decida: ejecuta un bloque solo si se cumple una condición. Sin ellas, el código haría siempre lo mismo.
2. **Operadores booleanos.** Contenido: OPERADORES BOOLEANOS: AND · OR · NEGACIÓN. and: verdadero si ambas condiciones lo son · or: si al menos una lo es · not: invierte el valor.
3. **Operadores de comparación.** Contenido: OPERADORES DE COMPARACIÓN: MAYOR QUE, MAYOR O IGUAL QUE · MENOR QUE, MENOR O IGUAL QUE · IGUAL QUE · DISTINTO QUE. > >= < <= == !=. Ojo: = asigna un valor y == compara dos valores.
4. **Paréntesis y expresiones.** Contenido: PARÉNTESIS Y EXPRESIONES BOOLEANAS. Los paréntesis fijan qué se evalúa primero: (temp < 0) and (humedad > 80) detecta riesgo de escarcha en una estación.
5. **if e if-else.** Contenido: LA SENTENCIA IF · LA SENTENCIA IF-ELSE. if lluvia > 50: emite la alerta; else: informa normalidad. La indentación de 4 espacios marca qué instrucciones están dentro de cada bloque.
6. **if-elif-else.** Contenido: LA SENTENCIA IF-ELIF-ELSE. Para más de dos caminos: if t >= 30: calor · elif t >= 10: templado · else: frío. Se evalúa en orden y entra solo en el primero que se cumple.
7. **Expresión ternaria.** Contenido: EXPRESIONES TERNARIAS (CONTENIDO OPCIONAL). Un if-else en una sola línea: estado = "alerta" if lluvia > 50 else "normal".

**Lo que demostrarás:**
- 3.1 IDENTIFICA LOS TIPOS DE ESTRUCTURA CONDICIONAL, ASÍ COMO SU UTILIDAD EN LA CONFECCIÓN DE UNA RUTINA DE CÓDIGO.
- 3.2 ELABORA EXPRESIONES BOOLEANAS UTILIZANDO OPERADORES BOOLEANOS Y DE COMPARACIÓN PARA RESOLVER UN PROBLEMA DE BAJA COMPLEJIDAD.
- 3.3 UTILIZA ESTRUCTURAS DE CONTROL DE FLUJO DE ACUERDO A LA SINTAXIS DEL LENGUAJE PYTHON PARA RESOLVER EL PROBLEMA PLANTEADO.

## Aprendizaje esperado 4 · FUNCIONES Y MÓDULOS

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA EL ANÁLISIS DE DATOS. Escribe una vez, úsalo muchas veces.

**Aprendizaje esperado 4:** CODIFICAR UNA RUTINA UTILIZANDO FUNCIONES PRECONSTRUIDAS, FUNCIONES PERSONALIZADAS O DE UN MÓDULO PARA RESOLVER UN PROBLEMA DE BAJA COMPLEJIDAD DE ACUERDO AL LENGUAJE PYTHON.

1. **Qué es una función.** Contenido: ¿QUÉ ES UNA FUNCIÓN Y PARA QUÉ SIRVEN?. Un bloque de código con nombre que hace una tarea y se puede reutilizar. Evita repetir código y lo hace más fácil de leer y de probar.
2. **Funciones preconstruidas.** Contenido: FUNCIONES PRECONSTRUIDAS DE PYTHON. Vienen listas para usar: print(), input(), len(), round(), sum(), max(), min(), type() y sorted().
3. **Definir una función propia.** Contenido: FUNCIONES PERSONALIZADAS · DEFINICIÓN DE UNA FUNCIÓN PERSONALIZADA. def a_fahrenheit(celsius): y, indentado, el cuerpo. El nombre describe lo que hace la función.
4. **Parámetros y retorno.** Contenido: PARÁMETROS DE UNA FUNCIÓN Y RETORNO. Los parámetros reciben los datos y return devuelve el resultado: return celsius * 9 / 5 + 32. Sin return, la función devuelve None.
5. **Usar la función.** Contenido: UTILIZACIÓN DE UNA FUNCIÓN PERSONALIZADA. a_fahrenheit(20) devuelve 68.0. Se llama tantas veces como haga falta, con distintos valores.
6. **Módulos y librería estándar.** Contenido: ¿QUÉ ES UN MÓDULO Y PARA QUÉ SIRVEN? · LA LIBRERÍA STANDARD DE PYTHON. Un módulo es un archivo .py con funciones listas para usar. Python trae una librería estándar con muchos de ellos: math, statistics, random, datetime y csv.
7. **Importar módulos: math y estadística.** Contenido: IMPORTACIÓN DE MÓDULOS · EL MÓDULO MATH · EL MÓDULO STAT. import math → math.sqrt(16), math.pi. from statistics import mean, median → mean([12, 15, 9]) da 12.
8. **Funciones de orden superior.** Contenido: FUNCIONES DE ORDEN SUPERIOR (CONTENIDO OPCIONAL). Reciben o devuelven otras funciones: map(a_fahrenheit, temps), filter() o sorted(datos, key=len).

**Lo que demostrarás:**
- 4.1 RECONOCE LAS PRINCIPALES FUNCIONES PRECONSTRUIDAS DISPONIBLES EN EL LENGUAJE PYTHON.
- 4.2 ELABORA FUNCIONES PERSONALIZADAS CON PARÁMETROS Y RETORNO DE ACUERDO A LA SINTAXIS DEL LENGUAJE PYTHON PARA RESOLVER EL PROBLEMA PLANTEADO.
- 4.3 UTILIZA FUNCIONES PERTENECIENTES A UN MÓDULO PARA RESOLVER UN PROBLEMA DE BAJA COMPLEJIDAD.

## Aprendizaje esperado 5 · ESTRUCTURAS DE DATO EN PYTHON

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA EL ANÁLISIS DE DATOS. Guardar y organizar muchos datos a la vez.

**Aprendizaje esperado 5:** APLICAR LAS ESTRUCTURAS DE DATO DE TIPO COLECCIÓN DEL LENGUAJE PYTHON JUNTO A SUS CARACTERÍSTICAS Y UTILIDAD PARA RESOLVER UN PROBLEMA.

1. **Qué es una estructura de datos.** Contenido: ¿QUÉ ES UNA ESTRUCTURA DE DATOS Y POR QUÉ SE NECESITAN?. Una forma de guardar y organizar varios datos juntos. Python trae cuatro colecciones: listas, diccionarios, tuplas y sets.
2. **Listas.** Contenido: LISTAS: CARACTERÍSTICAS DE UNA LISTA · CREAR UNA LISTA · AGREGAR ELEMENTOS. Ordenadas, modificables y con repetidos permitidos: temps = [12, 15, 9]. temps.append(11) agrega un elemento al final.
3. **Rescatar elementos de una lista.** Contenido: RESCATAR UN ELEMENTO · RESCATAR UN RANGO DE ELEMENTOS · LISTAS Y CADENAS DE CARACTERES. temps[0] → el primero · temps[-1] → el último · temps[1:3] → los de índice 1 y 2. Los textos se recorren igual ("Norte"[0] → "N") y "a,b".split(",") los convierte en lista.
4. **Listas anidadas y matrices.** Contenido: LISTAS ANIDADAS Y MATRICES. Listas dentro de listas: m = [[1, 2], [3, 4]]; m[1][0] → 3 (fila 1, columna 0).
5. **Diccionarios.** Contenido: DICCIONARIOS: CARACTERÍSTICAS DE UN DICCIONARIO · CREAR UN DICCIONARIO · AGREGAR ELEMENTOS · RESCATAR ELEMENTOS · DICCIONARIOS ANIDADOS. Pares clave-valor, con claves únicas: est = {"nombre": "Norte", "alt": 520}. est["lluvia"] = 3.2 agrega; est["nombre"] o est.get("alt") rescata. Un valor puede ser otro diccionario.
6. **Tuplas.** Contenido: TUPLAS: CARACTERÍSTICAS DE UNA TUPLA · CREACIÓN DE UNA TUPLA · RESCATAR ELEMENTOS · EMPAQUETADO Y DESEMPAQUETADO DE TUPLAS. Ordenadas e inmutables: coord = (-33.4, -70.6) empaqueta; coord[0] rescata; lat, lon = coord desempaqueta.
7. **Sets.** Contenido: SETS: CARACTERÍSTICAS DE UN SET · CREACIÓN DE UN SET · OPERACIONES DE CONJUNTO CON SETS. Sin orden y sin repetidos: s = {"Norte", "Sur"}. Operaciones: a | b unión · a & b intersección · a - b diferencia.
8. **Comprensiones.** Contenido: COMPRESIÓN DE LISTAS, DICCIONARIOS Y SETS (CONTENIDO OPCIONAL). Crean colecciones en una línea: [t * 2 for t in temps] · {k: v for k, v in pares} · {t for t in temps if t > 10}.
9. **Cuál elegir.** Contenido: ¿QUÉ ES UNA ESTRUCTURA DE DATOS Y POR QUÉ SE NECESITAN?. Lista: una secuencia que cambia · Diccionario: buscar por clave · Tupla: datos fijos · Set: valores únicos y comparar grupos.

**Lo que demostrarás:**
- 5.1 DISTINGUE LAS CARACTERÍSTICAS DE LAS ESTRUCTURAS DE DATO DE TIPO COLECCIÓN QUE PROVEE EL LENGUAJE PYTHON PARA RESOLVER UN PROBLEMA.
- 5.2 SELECCIONA LAS ESTRUCTURAS DE DATO ADECUADAS EN PYTHON PARA RESOLVER UN PROBLEMA DE BAJA COMPLEJIDAD.
- 5.3 UTILIZA OPERACIONES BÁSICAS DE LISTAS Y DICCIONARIOS EN UNA RUTINA DE CÓDIGO PARA RESOLVER UN PROBLEMA DE BAJA COMPLEJIDAD.

## Aprendizaje esperado 6 · SENTENCIAS ITERATIVAS

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA EL ANÁLISIS DE DATOS. Repetir sin copiar y pegar.

**Aprendizaje esperado 6:** CODIFICAR UNA RUTINA UTILIZANDO SENTENCIAS ITERATIVAS PARA RESOLVER UN PROBLEMA DE BAJA COMPLEJIDAD EN PYTHON.

1. **Qué es una sentencia iterativa.** Contenido: ¿QUÉ ES UNA SENTENCIA ITERATIVA Y POR QUÉ SE NECESITAN?. Repite un bloque de código varias veces. Evita copiar y pegar instrucciones y permite procesar todos los datos de una colección.
2. **while.** Contenido: LA SENTENCIA WHILE. Repite mientras la condición sea verdadera: while intentos < 3:. Algo dentro del ciclo debe cambiar la condición; si no, nunca termina.
3. **for.** Contenido: LA SENTENCIA FOR. Recorre los elementos de una secuencia uno por uno: for t in temps:. Usa for cuando sabes qué recorrer y while cuando depende de una condición.
4. **Iterar listas.** Contenido: ITERANDO LISTAS DE ELEMENTOS. for t in temps: total += t suma todas las temperaturas; enumerate(temps) entrega además la posición de cada una.
5. **Iterar diccionarios.** Contenido: ITERANDO DICCIONARIOS DE ELEMENTOS. for clave in est: recorre las claves · est.values() los valores · for k, v in est.items(): ambos a la vez.
6. **La función range.** Contenido: LA FUNCIÓN RANGE. Genera una secuencia de enteros: range(5) → 0 a 4 · range(1, 6) → 1 a 5 · range(0, 10, 2) → 0, 2, 4, 6, 8.
7. **Iterar con range.** Contenido: ITERANDO CON LA FUNCIÓN RANGE. for dia in range(1, 8): print(f"Día {dia}") repite un número fijo de veces; range(len(temps)) recorre una lista por índice.

**Lo que demostrarás:**
- 6.1 DISTINGUE LAS CARACTERÍSTICAS DE LAS SENTENCIAS ITERATIVAS WHILE Y FOR EN LA RESOLUCIÓN DE UN PROBLEMA.
- 6.2 UTILIZA LA SENTENCIA FOR PARA ITERAR ESTRUCTURAS DE DATOS DE TIPO COLECCIÓN DE ACUERDO AL LENGUAJE PYTHON.
- 6.3 CODIFICA UNA RUTINA QUE RESUELVE UN PROBLEMA DE BAJA COMPLEJIDAD UTILIZANDO SENTENCIAS ITERATIVAS DE ACUERDO AL LENGUAJE PYTHON.

## Aprendizaje esperado 7 · PROGRAMACIÓN ORIENTADA A OBJETOS EN PYTHON

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA EL ANÁLISIS DE DATOS. Datos y acciones en un mismo molde.

**Aprendizaje esperado 7:** CODIFICAR UNA RUTINA UTILIZANDO CLASES PROVISTAS PARA LA RESOLUCIÓN DE UN PROBLEMA SIMPLE DE ACUERDO AL PARADIGMA DE ORIENTACIÓN A OBJETOS EN EL ENTORNO PYTHON.

1. **El paradigma de objetos.** Contenido: ¿EN QUÉ CONSISTE EL PARADIGMA DE ORIENTACIÓN A OBJETOS EN LA PROGRAMACIÓN?. Organiza el programa en objetos que juntan datos y acciones, como las cosas del mundo real: una estación tiene datos (nombre, altitud) y hace cosas (registrar una medición).
2. **Principios básicos.** Contenido: PRINCIPIOS BÁSICOS DE LA PROGRAMACIÓN A OBJETOS. Abstracción, encapsulamiento, herencia y polimorfismo.
3. **Abstracción y ocultamiento.** Contenido: ABSTRACCIÓN Y OCULTAMIENTO. Abstraer es quedarse solo con lo importante para el problema. Ocultar es proteger los datos internos y ofrecer métodos para usarlos; en Python, un _ al inicio del nombre indica uso interno.
4. **Clases y objetos.** Contenido: CLASES Y OBJETOS. La clase es el molde (class Estacion:); el objeto, cada ejemplar creado con ese molde (norte = Estacion("Norte", 520)).
5. **Estado y atributos.** Contenido: ESTADO Y ATRIBUTOS. Los atributos guardan los datos de cada objeto (self.nombre, self.altitud); sus valores en un momento dado forman su estado.
6. **Comportamiento y métodos.** Contenido: COMPORTAMIENTO Y MÉTODOS. Los métodos son las funciones de la clase: def registrar(self, temp):. Se llaman con un punto: norte.registrar(12.5).
7. **Constructor e instanciación.** Contenido: CONSTRUCTORES E INSTANCIACIÓN. __init__(self, nombre, altitud) da valor a los atributos al crear el objeto. Instanciar es crear el objeto: sur = Estacion("Sur", 80).
8. **El objeto string.** Contenido: EL OBJETO STRING Y SUS MÉTODOS PRINCIPALES. Los textos también son objetos: .upper(), .lower(), .strip(), .replace(), .split(), .startswith() y .find(). Las librerías traen más clases listas, como date de datetime.

**Lo que demostrarás:**
- 7.1 EXPLICA LOS ELEMENTOS FUNDAMENTALES DEL PARADIGMA DE ORIENTACIÓN A OBJETOS EN LA PROGRAMACIÓN.
- 7.2 DISTINGUE LA DIFERENCIA ENTRE UNA CLASE Y UN OBJETO, EN EL CONTEXTO DE LA PROGRAMACIÓN ORIENTADA A OBJETOS.
- 7.3 IMPLEMENTA UNA CLASE UTILIZANDO UN MÉTODO INICIALIZADOR CON PARÁMETROS Y MÉTODOS PERSONALIZADOS PARA RESOLVER UN PROBLEMA DE BAJÍSIMA COMPLEJIDAD.
- 7.4 UTILIZA CLASES Y MÉTODOS EXISTENTES EN LIBRERÍAS PARA LA RESOLUCIÓN DE UN PROBLEMA DE BAJA COMPLEJIDAD.
