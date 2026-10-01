# Fundamentos de Ingeniería de Datos · Módulo 2 · Infografías en texto

Versión en texto de cada infografía, para lectores de pantalla y para el texto alternativo del LMS. Generado por `npm run infografias`.

## Aprendizaje esperado 1 · EL LENGUAJE PYTHON

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA INGENIEROS DE DATOS. La herramienta de cada día en ingeniería de datos.

**Aprendizaje esperado 1:** APLICAR LAS CARACTERÍSTICAS PRINCIPALES DEL LENGUAJE PYTHON Y SU ENTORNO PARA RESOLVER DISTINTAS PROBLEMÁTICAS.

1. **Reseña.** Contenido: RESEÑA DEL LENGUAJE PYTHON. Lo creó Guido van Rossum y se publicó en 1991; el nombre viene del grupo humorístico Monty Python. Es de código abierto y lo mantiene la Python Software Foundation.
2. **Propósito y aplicaciones.** Contenido: PROPÓSITO DEL LENGUAJE PYTHON. Es de propósito general. En ingeniería de datos se usa para leer archivos, limpiar y transformar datos, cargarlos en bases de datos y automatizar procesos; también en desarrollo web, inteligencia artificial y scripts.
3. **Características.** Contenido: PRINCIPALES CARACTERÍSTICAS DEL LENGUAJE. Sintaxis legible, con la sangría como parte del código; interpretado, de tipado dinámico, multiplataforma y multiparadigma, con miles de librerías como pandas.
4. **Versiones.** Contenido: VERSIONES DE PYTHON. Python 2 dejó de recibir soporte en 2020 y no es compatible con Python 3 (por ejemplo, print pasó a ser print()). Se trabaja con Python 3; revisa tu versión con python --version.
5. **Anaconda.** Contenido: ENTORNO DE TRABAJO Y HERRAMIENTAS · ANACONDA. Una distribución que instala Python con las librerías de datos, Spyder y Jupyter, y administra entornos separados por proyecto con conda.
6. **Spyder.** Contenido: SPYDER. Un editor pensado para el trabajo científico: editor de código, consola interactiva y explorador de variables en una misma ventana.
7. **Jupyter Notebooks y Google Colab.** Contenido: JUPYTER NOTEBOOKS · GOOGLE COLAB. Cuadernos que reúnen celdas de código, resultados y texto, ideales para probar una limpieza paso a paso. Google Colab los ejecuta en la nube, desde el navegador y sin instalar nada.
8. **Visual Studio Code.** Contenido: VISUAL STUDIO CODE. Editor gratuito de Microsoft. Con la extensión de Python suma autocompletado, depurador, terminal integrada y Git: el lugar para escribir los scripts que correrán cada noche.

**Lo que demostrarás:**
- 1.1 DESCRIBE LAS APLICACIONES EN DONDE PUEDE SER UTILIZADO EL LENGUAJE PYTHON.
- 1.2 APLICA LAS CARACTERÍSTICAS DE LOS ENTORNOS DE TRABAJO PARA UTILIZAR EL PYTHON.

## Aprendizaje esperado 2 · SENTENCIAS BÁSICAS DEL LENGUAJE PYTHON

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA INGENIEROS DE DATOS. Datos, cálculos y decisiones en un script.

**Aprendizaje esperado 2:** CODIFICAR UNA RUTINA UTILIZANDO SENTENCIAS BÁSICAS PARA RESOLVER UN PROBLEMA DE MEDIANA COMPLEJIDAD ACORDE AL LENGUAJE PYTHON.

1. **Variables.** Contenido: VARIABLES. Un nombre que guarda un valor: litros = 1250.5. Se crea al asignarle algo y su nombre va en minúsculas con guion bajo, como litros_dia.
2. **Tipos de dato fundamentales.** Contenido: TIPOS DE DATO FUNDAMENTALES (ENTERO, DECIMAL, CADENA DE CARACTERES, BOOLEANO, COMPLEX). Entero int (1250) · decimal float (1250.5) · cadena str ("Los Ñirres") · booleano bool (True o False) · complejo complex (3+2j). type(x) te dice cuál es.
3. **Conversiones de tipo.** Contenido: CONVERSIONES DE TIPO. int("12") → 12 · float("1250.5") → 1250.5 · str(820) → "820". Si el texto no es un número, como "mil", Python lanza un error.
4. **Operadores aritméticos.** Contenido: OPERADORES Y EXPRESIONES · OPERADORES Y EXPRESIONES ARITMÉTICAS. + - * / · // división entera (1250 // 300 → 4) · % resto (1250 % 300 → 50) · ** potencia. Los paréntesis definen qué se calcula primero.
5. **Comparación y lógica.** Contenido: OPERADORES Y EXPRESIONES LÓGICAS. == != < > <= >= devuelven True o False. Se combinan con and, or y not: temperatura <= 6 and not antibioticos.
6. **Decisiones.** Contenido: SENTENCIAS CONDICIONALES (IF, ELIF, ELSE). if · elif · else: Python revisa las condiciones en orden y ejecuta solo el primer bloque verdadero. La sangría marca qué líneas pertenecen a cada bloque.
7. **Consola: salida y entrada.** Contenido: IMPRESIÓN EN CONSOLA · ENTRADA DE DATOS EN CONSOLA. print(f"Total: {litros} L") muestra datos. input() siempre devuelve texto: litros = float(input("Litros: ")).
8. **Scripts.** Contenido: EJECUCIÓN DE SCRIPTS · CREACIÓN Y EJECUCIÓN DE SCRIPTS DE PYTHON. Guarda el código como recepcion.py y ejecútalo con python recepcion.py en la terminal o con el botón Run de VS Code. Se ejecuta de arriba hacia abajo.

**Lo que demostrarás:**
- 2.1 EXPLICA EL CONCEPTO DE VARIABLE IDENTIFICANDO LOS TIPOS DE DATO FUNDAMENTALES DE ACUERDO AL LENGUAJE PYTHON.
- 2.2 UTILIZA LA ENTRADA Y SALIDA ESTÁNDAR DE PYTHON PARA EL INTERCAMBIO DE DATOS CON LA RUTINA.
- 2.3 ELABORA EXPRESIONES BOOLEANAS UTILIZANDO OPERADORES BOOLEANOS Y DE COMPARACIÓN PARA RESOLVER UN PROBLEMA DE BAJA COMPLEJIDAD.
- 2.4 APLICA ESTRUCTURAS DE CONTROL DE FLUJO DE ACUERDO A LA SINTAXIS DEL LENGUAJE PYTHON PARA RESOLVER EL PROBLEMA PLANTEADO.

## Aprendizaje esperado 3 · FUNCIONES Y MÓDULOS

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA INGENIEROS DE DATOS. Código que se escribe una vez y se usa muchas.

**Aprendizaje esperado 3:** CODIFICAR UNA RUTINA UTILIZANDO FUNCIONES Y MÓDULOS PARA RESOLVER UN PROBLEMA DE MEDIANA COMPLEJIDAD ACORDE AL LENGUAJE PYTHON.

1. **Qué es una función.** Contenido: INTRODUCCIÓN A LAS FUNCIONES EN PYTHON · QUÉ ES UNA FUNCIÓN. Un bloque de código con nombre que hace una tarea. Se define una vez y se llama cuantas veces haga falta: menos repetición y menos errores.
2. **Sintaxis, parámetros y retorno.** Contenido: SINTAXIS BÁSICA · PARÁMETROS Y ARGUMENTOS · RETORNO DE VALORES. def pago(litros, precio): return litros * precio. Los parámetros van en la definición; los argumentos, al llamarla: pago(1000, 420). Sin return, la función devuelve None.
3. **Funciones preconstruidas.** Contenido: FUNCIONES PRECONSTRUIDAS. Vienen con Python, sin importar nada: print(), len(), sum(), max(), min(), round(), sorted() y type().
4. **Argumentos predeterminados y variables.** Contenido: FUNCIONES CON ARGUMENTOS PREDETERMINADOS · FUNCIONES CON ARGUMENTOS VARIABLES (*ARGS Y **KWARGS). def pago(litros, precio=420) usa 420 si no se entrega el precio. *args recibe varios valores en una tupla (def total(*litros)); **kwargs, argumentos con nombre en un diccionario.
5. **Lambda y recursión.** Contenido: FUNCIONES ANÓNIMAS (LAMBDA FUNCTIONS) · FUNCIONES RECURSIVAS. Una lambda es una función breve sin nombre: sorted(entregas, key=lambda e: e["litros"]). Una función recursiva se llama a sí misma y necesita un caso base que la detenga.
6. **Módulos e importación.** Contenido: MÓDULOS EN PYTHON · QUÉ ES UN MÓDULO Y PARA QUÉ SIRVEN · IMPORTACIÓN. Un módulo es un archivo .py con funciones y variables listas para reutilizar. Se importan con import math, from calidad import validar o import pandas as pd.
7. **Módulos propios y paquetes.** Contenido: CREACIÓN Y USO DE MÓDULOS PROPIOS · PAQUETES: ORGANIZACIÓN DE MÓDULOS EN DIRECTORIOS. Guarda tus funciones en calidad.py e impórtalas desde otro script. Un paquete es una carpeta de módulos: from lacteos.calidad import validar.
8. **Librería estándar y math.** Contenido: LA LIBRERÍA STANDARD DE PYTHON · MÓDULO MATH. Python trae módulos listos: math, datetime, csv, os y random, entre otros. math.ceil(2.3) → 3 y math.sqrt(16) → 4.0.
9. **Documentación y buenas prácticas.** Contenido: DOCUMENTACIÓN Y BUENAS PRÁCTICAS · DOCSTRING: DOCUMENTACIÓN DE FUNCIONES Y MÓDULOS · CONVENCIONES DE NOMBRADO (PEP8) · USO DE COMENTARIOS. Un docstring ("""Calcula el pago de una entrega.""") explica la función y lo muestra help(). PEP 8: snake_case para funciones y variables, PascalCase para clases. Los comentarios # explican el porqué.

**Lo que demostrarás:**
- 3.1 RECONOCE LAS PRINCIPALES FUNCIONES PRECONSTRUIDAS DISPONIBLES EN EL LENGUAJE PYTHON.
- 3.2 DESARROLLA FUNCIONES PERSONALIZADAS CON PARÁMETROS Y RETORNO DE ACUERDO A LA SINTAXIS DEL LENGUAJE PYTHON PARA RESOLVER EL PROBLEMA PLANTEADO.
- 3.3 CODIFICA UTILIZANDO FUNCIONES PERTENECIENTES A UN MÓDULO PARA RESOLVER UN PROBLEMA DE MEDIANA COMPLEJIDAD.

## Aprendizaje esperado 4 · ESTRUCTURAS DE DATO Y SENTENCIAS ITERATIVAS

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA INGENIEROS DE DATOS. Guardar muchos datos y recorrerlos.

**Aprendizaje esperado 4:** CODIFICAR UNA RUTINA UTILIZANDO ESTRUCTURAS DE DATO Y SENTENCIAS ITERATIVAS ACORDE AL LENGUAJE PYTHON PARA RESOLVER UN PROBLEMA DE MEDIANA COMPLEJIDAD.

1. **Listas.** Contenido: LISTAS · CARACTERÍSTICAS DE UNA LISTA. Ordenadas, modificables y con repetidos permitidos: litros = [820, 1250, 640]. Las posiciones parten en 0.
2. **Crear, agregar y rescatar.** Contenido: CREAR UNA LISTA, AGREGAR, RESCATAR UN ELEMENTO · RESCATAR UN RANGO DE ELEMENTOS. litros.append(990) agrega al final · litros[0] → 820 · litros[-1] → el último · litros[1:3] → posiciones 1 y 2.
3. **Listas y cadenas.** Contenido: LISTAS Y CADENAS DE CARACTERES. Una cadena se recorre como una secuencia: "P-017"[0] → "P". "820;1250".split(";") crea una lista y ";".join(lista) la vuelve texto.
4. **Listas anidadas y matrices.** Contenido: LISTAS ANIDADAS Y MATRICES. Una lista de listas forma una tabla: semana = [[820, 900], [1250, 1100]]. semana[1][0] → 1250: fila 1, columna 0.
5. **Diccionarios.** Contenido: DICCIONARIOS · CARACTERÍSTICAS DE UN DICCIONARIO · CREAR UN DICCIONARIO, AGREGAR, RESCATAR ELEMENTOS · DICCIONARIOS ANIDADOS. Pares clave-valor: p = {"codigo": "P-017", "litros": 820}. p["litros"] lee y p["comuna"] = "Purranque" agrega. Anidados: productores["P-017"]["litros"].
6. **Tuplas.** Contenido: TUPLAS · CARACTERÍSTICAS DE UNA TUPLA · CREACIÓN DE UNA TUPLA, RESCATAR ELEMENTOS · EMPAQUETADO Y DESEMPAQUETADO DE TUPLAS. Ordenadas e inmutables: planta = (-41.3, -72.9); planta[0] → -41.3. Empaquetar: t = 1, 2. Desempaquetar: lat, lon = planta.
7. **Sets.** Contenido: SETS · CARACTERÍSTICAS DE UN SET · CREACIÓN DE UN SET · OPERACIONES DE CONJUNTO CON SETS. Sin orden y sin repetidos: set(["P-017", "P-021", "P-017"]) guarda 2. Unión a | b, intersección a & b y diferencia a - b.
8. **Iterar y el ciclo while.** Contenido: QUÉ ES UNA SENTENCIA ITERATIVA Y POR QUÉ SE NECESITAN · LA SENTENCIA WHILE. Un ciclo repite instrucciones sin copiar código. while pendientes > 0: repite mientras la condición sea verdadera; si nunca cambia, el ciclo no termina.
9. **El ciclo for.** Contenido: LA SENTENCIA FOR · ITERANDO LISTAS DE ELEMENTOS · ITERANDO DICCIONARIOS DE ELEMENTOS. for l in litros: total += l recorre una lista. for codigo, datos in productores.items(): recorre un diccionario par por par.
10. **La función range.** Contenido: LA FUNCIÓN RANGE · ITERANDO CON LA FUNCIÓN RANGE. range(5) → 0 a 4 · range(1, 8) → 1 a 7, los días de la semana · for i in range(len(litros)): recorre las posiciones.

**Lo que demostrarás:**
- 4.1 APLICA LAS CARACTERÍSTICAS Y CASOS DE USO DE LAS DIFERENTES ESTRUCTURAS DE DATO FUNDAMENTALES PROVISTAS POR PYTHON PARA LA RESOLUCIÓN DE UN PROBLEMA.
- 4.2 CODIFICA UTILIZANDO ESTRUCTURAS DE DATO ADECUADAS EN PYTHON PARA RESOLVER UN PROBLEMA DE MEDIANA COMPLEJIDAD.

## Aprendizaje esperado 5 · ORIENTACIÓN A OBJETOS EN PYTHON

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA INGENIEROS DE DATOS. Modelar el problema con clases y objetos.

**Aprendizaje esperado 5:** DESARROLLAR UNA APLICACIÓN ORIENTADA A OBJETOS EN LENGUAJE PYTHON PARA RESOLVER UN PROBLEMA.

1. **Qué es la POO.** Contenido: INTRODUCCIÓN A LA POO · QUÉ ES LA POO · VENTAJAS DE LA POO. Organiza el programa en objetos que juntan datos y comportamiento, como una entrega o un productor. Ventajas: código reutilizable, ordenado y más fácil de mantener.
2. **Cuatro principios.** Contenido: PRINCIPIOS BÁSICOS DE LA POO (ABSTRACCIÓN, ENCAPSULAMIENTO, HERENCIA, POLIMORFISMO). Abstracción: modelar lo esencial · Encapsulamiento: proteger el estado · Herencia: reutilizar y especializar · Polimorfismo: un mismo mensaje, distintas respuestas.
3. **Clases y objetos.** Contenido: CLASES Y OBJETOS · DEFINICIÓN DE UNA CLASE · ATRIBUTOS Y MÉTODOS. La clase es el molde y el objeto, una instancia: class Entrega: con atributos (litros) y métodos (calcular_pago()). Las librerías también traen clases: pd.read_csv() crea un DataFrame.
4. **Constructor e instanciación.** Contenido: CONSTRUCTORES E INICIALIZADORES · INSTANCIACIÓN DE OBJETOS. def __init__(self, codigo, litros): guarda los datos con self.codigo = codigo. Se instancia así: e = Entrega("P-017", 820).
5. **Encapsulamiento.** Contenido: ENCAPSULAMIENTO Y VISIBILIDAD · ATRIBUTOS Y MÉTODOS PRIVADOS · GETTERS Y SETTERS · DECORADORES. _litros indica uso interno y __litros lo oculta más. Getters y setters con los decoradores @property y @litros.setter validan antes de cambiar el valor.
6. **Herencia.** Contenido: HERENCIA EN PYTHON. CONCEPTO DE HERENCIA Y JERARQUÍA DE CLASES · INSTANCIACIÓN DE SUBCLASES · HERENCIA MÚLTIPLE Y MRO (MÉTODO DE RESOLUCIÓN DE MÉTODOS). class EntregaOrganica(Entrega): hereda atributos y métodos, y llama al padre con super().__init__(...). Con herencia múltiple, Python busca los métodos según el MRO: EntregaOrganica.mro().
7. **Polimorfismo.** Contenido: POLIMORFISMO · QUÉ ES POLIMORFISMO · SOBRECARGA · DUNDER METHODS. Cada subclase redefine calcular_pago() y el ciclo llama a todas igual. Python no sobrecarga métodos por tipo: usa argumentos predeterminados y sobrecarga operadores con dunder methods como __add__ o __str__.
8. **Principios de diseño.** Contenido: PRINCIPIOS DE DISEÑO ORIENTADO A OBJETOS · PRINCIPIO DRY · PRINCIPIO SOLID. DRY: no repitas la misma lógica. SOLID: responsabilidad única, abierto/cerrado, sustitución de Liskov, segregación de interfaces e inversión de dependencias.

**Lo que demostrarás:**
- 5.1 EXPLICA LOS CONCEPTOS FUNDAMENTALES DEL PARADIGMA DE ORIENTACIÓN A OBJETOS Y SUS VENTAJAS EN LA PROGRAMACIÓN.
- 5.2 DESCRIBE LOS PRINCIPIOS FUNDAMENTALES DEL DISEÑO CON ORIENTACIÓN A OBJETOS DISTINGUIENDO SUS BENEFICIOS.
- 5.3 CODIFICA RUTINAS QUE UTILIZAN CLASES PROVISTAS EN LIBRERÍAS DE TERCEROS PARA LA RESOLUCIÓN DE UN PROBLEMA DADO ACORDE AL LENGUAJE PYTHON.
- 5.4 IMPLEMENTA CLASES PARA LA RESOLUCIÓN DE UN PROBLEMA DE BAJA COMPLEJIDAD ACORDE A LA SINTAXIS DEL LENGUAJE PYTHON.
- 5.5 DESARROLLA UNA APLICACIÓN QUE RESUELVE UN PROBLEMA DE BAJA COMPLEJIDAD UTILIZANDO TÉCNICAS DE POLIMORFISMO ACORDE A LA SINTAXIS DEL LENGUAJE PYTHON.

## Aprendizaje esperado 6 · EXCEPCIONES EN PYTHON

Módulo 2 · FUNDAMENTOS DE PROGRAMACIÓN PYTHON PARA INGENIEROS DE DATOS. Que un dato malo no detenga toda la carga.

**Aprendizaje esperado 6:** CODIFICAR UN ALGORITMO MANEJANDO LAS EXCEPCIONES PARA TOMAR ACCIONES SOBRE LOS ERRORES ACORDE AL LENGUAJE PYTHON Y A LAS BUENAS PRÁCTICAS DE LA DISCIPLINA.

1. **Qué es una excepción.** Contenido: QUÉ ES UNA EXCEPCIÓN Y POR QUÉ SON IMPORTANTES. Un error durante la ejecución, como convertir «mil» en número. Si nadie la maneja, el programa se detiene; manejarla permite registrar la fila mala y seguir con las demás.
2. **Jerarquía.** Contenido: JERARQUÍA DE EXCEPCIONES EN PYTHON. Son clases: ValueError, TypeError, KeyError, ZeroDivisionError y FileNotFoundError descienden de Exception. Capturar una clase captura también a sus subclases.
3. **try, except y finally.** Contenido: MANEJO Y CAPTURA DE LAS EXCEPCIONES (TRY-EXCEPT-FINALLY) · LAS SENTENCIAS TRY, EXCEPT Y FINALLY. try: el código que puede fallar · except ValueError: qué hacer ante ese error · finally: lo que se ejecuta siempre, como cerrar el archivo.
4. **Excepciones personalizadas.** Contenido: CONSTRUCCIÓN DE EXCEPCIONES PERSONALIZADAS. class TemperaturaAltaError(Exception): pass crea una propia. Se lanza con raise TemperaturaAltaError("Llegó a 8 °C").
5. **Propagación.** Contenido: PROPAGACIÓN DE EXCEPCIONES. Si una función no captura la excepción, esta sube a quien la llamó, hasta encontrar un except. Dentro de un except, raise sin argumentos la vuelve a lanzar.
6. **Usarlas en el código.** Contenido: UTILIZACIÓN DE EXCEPCIONES EN EL CÓDIGO. try: litros = float(fila[2]) · except ValueError: rechazadas.append(fila). La carga sigue con la fila siguiente y al final informa cuántas rechazó.
7. **Buenas prácticas.** Contenido: BUENAS PRÁCTICAS PARA EL MANEJO DE EXCEPCIONES. Captura excepciones específicas, nunca except: pass. Usa mensajes claros, registra el error con logging y libera recursos con finally o with.

**Lo que demostrarás:**
- 6.1 RECONOCE LAS CARACTERÍSTICAS DEL MODELO DE EXCEPCIONES DEL LENGUAJE PYTHON.
- 6.2 UTILIZA LA SINTAXIS DE EXCEPCIONES ACORDE AL LENGUAJE PYTHON PARA LA CAPTURA Y PROPAGACIÓN DE ÉSTAS.
- 6.3 CODIFICA ALGORITMOS QUE LANZAN, PROPAGAN Y CONTROLAN EXCEPCIONES DE ACUERDO A LAS BUENAS PRÁCTICAS DE LA DISCIPLINA.
