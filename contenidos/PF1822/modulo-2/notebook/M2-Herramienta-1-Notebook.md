# Laboratorio de prompts: del prompt que no sirve al que funciona

**Módulo 2 · Especialización en Desarrollo con IA · Herramienta didáctica 1 del aprendizaje esperado 3**

**Aprendizaje esperado 3 (textual del plan formativo):** [[aprendizaje]]

**Criterios de evaluación (textuales):**

[[criterios]]

plan: 3. DISEÑO DE PROMPTS PARA APIS GENERATIVAS

**Qué vas a hacer.** La mesa de ayuda de Nube Sur (empresa ficticia) quiere resumir cada ticket en una oración. Vas a enviar prompts reales a un modelo, ver por qué el primero no sirve, reescribirlo con distintas estrategias, pedir la salida en el formato que necesita un programa, medir el efecto de los parámetros y registrar cada mejora con un puntaje.

**Cómo usarlo.** Ejecuta las celdas en orden (Mayús + Enter). Donde diga `COMPLETA`, escribe tu parte. Cada sección termina con una comprobación: ✅ significa que el paso quedó bien y ❌ te dice qué revisar. Las respuestas del modelo cambian entre corridas, así que las comprobaciones que dependen de ellas son avisos y no detienen el notebook.

**Tiempo:** 90 minutos, con unas 40 llamadas breves al modelo. **Resultado:** `prompts.md` y `registro_prompts.csv`, que usarás en la actividad 1 (parte C) y en la actividad 2.

## 0 · Preparar

Esta sección repasa lo que viste en el aprendizaje esperado 2: la clave se lee del entorno y **nunca** se escribe en una celda. En Colab, abre el ícono de la llave (*Secrets*), crea un secreto con el nombre `OPENAI_API_KEY`, pega ahí la clave que te entregó tu tutor y activa el acceso para este notebook. En tu computador, defínela como variable de entorno antes de abrir Jupyter.

```python
%pip install -q httpx pandas
```

```python
import os, re, json, csv, unicodedata
import httpx


def leer_clave_api():
    """Lee la clave desde los Secrets de Colab o, fuera de Colab, desde una variable de entorno."""
    try:
        from google.colab import userdata
        return userdata.get("OPENAI_API_KEY")
    except Exception:
        return os.environ.get("OPENAI_API_KEY")


CLAVE_API = leer_clave_api()
URL_BASE = "https://api.openai.com/v1"   # cámbiala solo si tu tutor indica otro proveedor compatible
MODELO_CHAT = "ESCRIBE-AQUI-EL-MODELO"   # COMPLETA: el nombre exacto del modelo que indica tu tutor
PARAMETRO_LARGO = "max_tokens"           # si el modelo lo rechaza, tu tutor te dirá si usar "max_completion_tokens"
```

```python
assert CLAVE_API, "No encuentro la clave. Créala en Secrets con el nombre OPENAI_API_KEY y activa el acceso."
assert MODELO_CHAT != "ESCRIBE-AQUI-EL-MODELO", "Escribe en MODELO_CHAT el modelo que indica tu tutor."
celdas_ejecutadas = globals().get("In", [])
assert not any(CLAVE_API in celda for celda in celdas_ejecutadas), \
    "Tu clave aparece escrita en una celda: bórrala, reinicia el entorno y pide a tu tutor que la revoque."
print("✅ Clave leída del entorno, sin escribirla en ninguna celda, y modelo definido.")
```

Estas funciones se usan en todo el notebook. `generar` envía una lista de mensajes al endpoint de chat y devuelve el texto, el motivo por el que el modelo terminó (`fin`) y los tokens usados.

```python
http = httpx.Client(base_url=URL_BASE, timeout=60.0,
                    headers={"Authorization": f"Bearer {CLAVE_API}"})


def generar(mensajes, temperature=0.2, max_tokens=200):
    """Envía mensajes al endpoint de chat y devuelve texto, motivo de término y tokens usados."""
    cuerpo = {"model": MODELO_CHAT, "messages": mensajes,
              "temperature": temperature, PARAMETRO_LARGO: max_tokens}
    respuesta = http.post("/chat/completions", json=cuerpo)
    if respuesta.status_code >= 400:
        raise RuntimeError(f"HTTP {respuesta.status_code}: {respuesta.text[:300]}")
    datos = respuesta.json()
    eleccion = datos["choices"][0]
    return {"texto": (eleccion["message"]["content"] or "").strip(),
            "fin": eleccion.get("finish_reason"),
            "tokens": datos.get("usage", {}).get("total_tokens")}


def palabras(texto):
    """Cuenta las palabras de un texto."""
    return len(re.findall(r"\w+", texto))


def comprobar(condicion, bien, pista):
    """Muestra ✅ si el paso quedó bien, o ❌ con lo que hay que revisar."""
    print(("✅ " + bien) if condicion else ("❌ Revisa: " + pista))
    return condicion
```

Los cuatro tickets de práctica ya vienen limpios, cada uno con el resumen que escribió el equipo de soporte. Son distintos de los tickets de las actividades.

```python
TICKETS = {
    "N1": "Desde la actualización de ayer, el panel de reportes no carga en Safari; en Chrome se ve bien. "
          "Lo necesito para la reunión de las 15:00.",
    "N2": "¿Se puede cambiar el correo de facturación de mi empresa? El que tienen registrado es de una "
          "persona que ya no trabaja aquí.",
    "N3": "El cobro de septiembre salió duplicado en la tarjeta de la empresa: aparecen dos cargos iguales "
          "el día 3.",
    "N4": "La app móvil me pide iniciar sesión cada vez que la abro, aunque marco 'Recordarme'. "
          "Pasa en Android desde la versión 5.2.",
}
REFERENCIAS = {
    "N1": "El panel de reportes no carga en Safari desde la actualización de ayer.",
    "N2": "El usuario pregunta cómo cambiar el correo de facturación de su empresa.",
    "N3": "El cobro de septiembre aparece duplicado en la tarjeta de la empresa.",
    "N4": "La app móvil pide iniciar sesión en cada apertura en Android desde la versión 5.2.",
}
prueba = generar([{"role": "user", "content": "Responde solo con la palabra: listo"}], max_tokens=20)
comprobar(bool(prueba["texto"]), f"El modelo respondió: {prueba['texto']!r}",
          "no hubo respuesta; revisa el nombre del modelo y tu conexión.")
```

## 1 · El prompt que no sirve

plan: QUÉ ES UN PROMPT. / ESTRUCTURA BÁSICA DE ENTRADA PARA MODELOS DE LENGUAJE.

Un **prompt** es la entrada que recibe el modelo: le dice qué tarea hacer y le entrega los datos. En las APIs de chat, la entrada es una **lista de mensajes** con roles: `system` fija las reglas (rol, formato, restricciones), `user` trae la tarea y los datos, y `assistant` contiene respuestas anteriores del modelo, que también sirven como ejemplos.

El primer intento del equipo fue un solo mensaje de usuario: `Resume esto:` más el ticket. Envíalo dos veces con `temperature` 1,0 y compara.

```python
mensajes_v1 = [{"role": "user", "content": "Resume esto: " + TICKETS["N1"]}]
salidas_v1 = [generar(mensajes_v1, temperature=1.0)["texto"] for _ in range(2)]
for i, salida in enumerate(salidas_v1, 1):
    print(f"Salida {i} ({palabras(salida)} palabras): {salida}\n")
print("Referencia:", REFERENCIAS["N1"])
```

Compara las salidas con la referencia. ¿Tienen el mismo largo? ¿Agregan algo que el ticket no dice? ¿Se entiende qué falla y dónde? Anota tres fallas: qué indicación le falta al prompt y qué efecto tuvo.

```python
# COMPLETA: tres fallas del prompt v1
diagnostico = [
    {"falta": "", "efecto": ""},
    {"falta": "", "efecto": ""},
    {"falta": "", "efecto": ""},
]
```

```python
assert len(salidas_v1) == 2, "Ejecuta la celda anterior para tener las dos salidas."
assert all(d["falta"].strip() and d["efecto"].strip() for d in diagnostico), \
    "Completa las tres fallas: qué indicación falta y qué efecto tuvo en las salidas."
print("✅ Diagnóstico listo. Por ejemplo: no dice el largo ni el foco del resumen, y por eso las salidas varían.")
```

## 2 · Zero-shot con buenas prácticas

plan: TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING. / PRÁCTICAS RECOMENDADAS: CLARIDAD, DELIMITACIÓN DEL ROL, CONTEXTO, RESTRICCIONES Y EVITAR AMBIGÜEDAD.

Un prompt **zero-shot** pide la tarea solo con instrucciones, sin ejemplos. Funciona bien cuando sigue cinco prácticas: **claridad** (una tarea con un verbo concreto), **rol** (desde qué papel responde), **contexto** (qué debe decir el resultado), **restricciones** (qué no puede hacer) y **evitar ambigüedad** (medidas en vez de palabras como "breve"). Completa el mensaje de sistema por partes: el rol ya está escrito.

```python
# COMPLETA las tres partes vacías. Usa medidas concretas: "una oración de máximo 25 palabras", no "breve".
partes = {
    "rol": "Eres analista de soporte de Nube Sur.",
    "tarea": "",          # qué hacer y con qué medida
    "contexto": "",       # qué debe decir el resumen: qué falla, en qué producto y en qué condición
    "restricciones": "",  # qué no puede hacer: por ejemplo, proponer soluciones o agregar datos
}
SISTEMA = " ".join(parte.strip() for parte in partes.values())


def zero_shot(ticket, temperature=0.2):
    """Resume un ticket con el prompt zero-shot de esta sección."""
    return generar([{"role": "system", "content": SISTEMA},
                    {"role": "user", "content": "Ticket: " + ticket}],
                   temperature=temperature, max_tokens=80)
```

```python
assert all(parte.strip() for parte in partes.values()), "Completa tarea, contexto y restricciones."
assert re.search(r"\d", partes["tarea"]), "La tarea necesita una medida con número, por ejemplo 'máximo 25 palabras'."
assert re.search(r"\bno\b", partes["restricciones"].lower()), \
    "Escribe al menos una restricción con 'no', por ejemplo 'no propongas soluciones'."
salida = zero_shot(TICKETS["N1"])["texto"]
print("Resumen de N1:", salida)
comprobar(palabras(salida) <= 25, "Tiene 25 palabras o menos.",
          f"tiene {palabras(salida)} palabras; ajusta la medida de la tarea.")
comprobar(not re.search(r"recomiend|reinstal|soluci|intent[ae]", salida.lower()), "No propone soluciones.",
          "el resumen propone una solución; refuerza la restricción.")
```

## 3 · Few-shot

plan: TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING.

El ticket N2 no reporta una falla: es una pregunta. Mira qué hace el zero-shot con él.

```python
print("Zero-shot con N2:", zero_shot(TICKETS["N2"])["texto"])
```

Un prompt **few-shot** agrega ejemplos resueltos antes del caso real, como turnos `user` y `assistant`. Los ejemplos muestran lo que cuesta describir: el estilo, la persona gramatical, cómo tratar una pregunta. Su costo son los tokens de cada ejemplo en cada llamada, y el riesgo es que el modelo copie de los ejemplos más de lo que querías.

```python
# COMPLETA: el resumen esperado de cada ejemplo, en el estilo que quieres obtener.
# Idea: "El usuario no recibe..." y "El usuario pregunta cómo...".
EJEMPLOS = [
    ("No me llegan los correos de recuperación de clave desde el viernes.", ""),
    ("¿Cómo agrego un segundo administrador a mi cuenta?", ""),
]


def few_shot(ticket, temperature=0.2):
    """Resume un ticket con el mensaje de sistema y los ejemplos como turnos previos."""
    mensajes = [{"role": "system", "content": SISTEMA}]
    for entrada, resumen in EJEMPLOS:
        mensajes += [{"role": "user", "content": "Ticket: " + entrada},
                     {"role": "assistant", "content": resumen}]
    mensajes.append({"role": "user", "content": "Ticket: " + ticket})
    return generar(mensajes, temperature=temperature, max_tokens=80)
```

```python
assert all(resumen.strip() for _, resumen in EJEMPLOS), "Escribe el resumen esperado de los dos ejemplos."
assert not any(entrada in TICKETS.values() for entrada, _ in EJEMPLOS), \
    "Los ejemplos no pueden ser tickets de práctica: contaminan la medición."
salida = few_shot(TICKETS["N2"])["texto"]
print("Few-shot con N2:", salida)
inicio = " ".join(EJEMPLOS[1][1].split()[:3])
comprobar(salida.lower().startswith(inicio.lower()), f"Sigue el formato de tu ejemplo ('{inicio}…').",
          "el resumen no imita tus ejemplos; revisa que los dos tengan el mismo estilo.")
```

## 4 · Prompting instruccional

plan: TIPOS DE PROMPTING: ZERO-SHOT, FEW-SHOT E INSTRUCTIONAL PROMPTING.

El **prompting instruccional** descompone la tarea en pasos explícitos que el modelo sigue en orden. Sirve cuando la tarea tiene varias partes. El último paso tiene que decir qué entregar, o el modelo mostrará todo su razonamiento.

```python
# COMPLETA los pasos 1 a 3: por ejemplo, identificar el producto, la falla y la condición en que ocurre.
PASOS = """
1. 
2. 
3. 
4. Escribe solo el resumen final: una oración de máximo 25 palabras, en tercera persona.
"""
salida = generar([{"role": "system", "content": partes["rol"] + " Sigue estos pasos en orden:" + PASOS},
                  {"role": "user", "content": "Ticket: " + TICKETS["N3"]}], max_tokens=120)["texto"]
print(salida)
```

```python
pasos_escritos = [l for l in PASOS.strip().splitlines() if re.match(r"\d+\.\s+\S", l.strip())]
assert len(pasos_escritos) >= 4, "Completa los pasos 1 a 3."
comprobar(len(re.findall(r"[.!?](\s|$)", salida)) <= 1 and palabras(salida) <= 30,
          "La salida es solo la oración final.",
          "el modelo mostró los pasos; refuerza el último: 'escribe solo el resumen final'.")
```

## 5 · Formato de salida: listas, JSON y tablas

plan: FORMATEO DE SALIDAS: LISTAS, JSON Y ESTRUCTURA TABULAR.

Si una persona lee la respuesta, sirve una **lista** o una **tabla**. Si la lee un programa, conviene **JSON**, con los campos, sus tipos y los valores permitidos escritos en el prompt. Primero, una lista.

```python
lista = generar([{"role": "system", "content": partes["rol"] + " Responde solo con 3 líneas que empiecen con '- '."},
                 {"role": "user", "content": "Palabras clave del ticket: " + TICKETS["N1"]}], max_tokens=60)["texto"]
print(lista)
comprobar(len([l for l in lista.splitlines() if l.strip().startswith("-")]) == 3,
          "Lista de 3 elementos.", "la lista no tiene 3 líneas con guion; revisa la instrucción de formato.")
```

Ahora JSON para el tablero de la mesa de ayuda, y con los cuatro JSON, una tabla.

```python
SISTEMA_JSON = (partes["rol"] + " Devuelve SOLO un objeto JSON válido, sin texto antes ni después, con estos "
                "campos: \"resumen\" (una oración de máximo 25 palabras), \"producto\" (el producto afectado, "
                "o null si no se menciona) y \"prioridad\" (\"alta\", \"media\" o \"baja\").")


def leer_json(texto):
    """Extrae y lee el primer objeto JSON de un texto; devuelve None si no se puede."""
    encontrado = re.search(r"\{.*\}", texto, re.DOTALL)
    try:
        return json.loads(encontrado.group(0)) if encontrado else None
    except json.JSONDecodeError:
        return None


filas = []
for id_ticket, ticket in TICKETS.items():
    datos = leer_json(generar([{"role": "system", "content": SISTEMA_JSON},
                               {"role": "user", "content": "Ticket: " + ticket}], max_tokens=150)["texto"])
    filas.append({"ticket": id_ticket, **(datos or {"resumen": "(no se pudo leer el JSON)"})})

import pandas as pd
tabla = pd.DataFrame(filas)
tabla
```

```python
leidos = [fila for fila in filas if "prioridad" in fila]
comprobar(len(leidos) == len(TICKETS), "Los cuatro JSON se leyeron.",
          "algún JSON no se pudo leer; refuerza 'SOLO un objeto JSON' o sube max_tokens.")
comprobar(all(fila.get("prioridad") in {"alta", "media", "baja"} for fila in leidos),
          "Todas las prioridades son válidas.", "hay prioridades fuera de alta, media o baja.")
assert len(tabla) == len(TICKETS), "La tabla debe tener una fila por ticket."
```

## 6 · Cuatro tareas prácticas

plan: EJEMPLOS PRÁCTICOS: PROMPT PARA GENERAR CÓDIGO, RESUMEN, VALIDACIÓN Y REFORMULACIÓN.

Las mismas prácticas sirven para otras tareas del equipo. Escribe tres mensajes de sistema más; el de resumen ya lo tienes. En cada uno: rol, tarea y formato de la respuesta.

```python
# COMPLETA los mensajes de sistema de código, validación y reformulación.
PROMPTS_TAREAS = {
    "codigo": "",        # pide una función Python con docstring; responde SOLO con el código
    "resumen": SISTEMA,  # el de la sección 2
    "validacion": "",    # recibe ticket y resumen; responde SI o NO: ¿el resumen trae datos que no están en el ticket?
    "reformulacion": "", # reescribe una respuesta al cliente en tono cordial y formal, sin cambiar datos ni plazos
}
```

```python
assert all(prompt.strip() for prompt in PROMPTS_TAREAS.values()), "Completa los cuatro prompts."

codigo = generar([{"role": "system", "content": PROMPTS_TAREAS["codigo"]},
                  {"role": "user", "content": "Escribe normalizar_espacios(texto: str) -> str: reemplaza los "
                                              "espacios repetidos por uno y quita los de los extremos."}],
                 max_tokens=300)["texto"]
print(codigo)
comprobar("def normalizar_espacios" in codigo, "El código define la función pedida.",
          "el código no define normalizar_espacios.")

inventado = "El cobro duplicado se debe a una falla del banco y se resolverá en 48 horas."
veredicto = generar([{"role": "system", "content": PROMPTS_TAREAS["validacion"]},
                     {"role": "user", "content": f"Ticket: {TICKETS['N3']}\nResumen: {inventado}"}],
                    max_tokens=40)["texto"]
print("Validación:", veredicto)
comprobar(veredicto.strip().upper().startswith(("SI", "SÍ")), "La validación detectó el dato inventado.",
          "no detectó que la causa y el plazo no están en el ticket; pide una respuesta cerrada SI o NO.")

borrador = "hola, ya lo vimos y el lunes 6 queda arreglado lo del cobro doble, sorry"
formal = generar([{"role": "system", "content": PROMPTS_TAREAS["reformulacion"]},
                  {"role": "user", "content": borrador}], max_tokens=120)["texto"]
print("Reformulación:", formal)
comprobar("6" in formal, "Conserva el plazo (lunes 6).", "cambió o quitó el plazo; restríngelo en el prompt.")
```

## 7 · Parámetros

plan: PROMPT Y PARÁMETROS: CÓMO INFLUYEN TEMPERATURE, MAX_TOKENS Y TOP_P.

El prompt dice qué hacer; los parámetros controlan cómo elige el modelo cada token. **temperature** controla la variedad: baja para extraer, más alta para crear. **max_tokens** es un tope de largo: si se alcanza, la respuesta se corta y `finish_reason` vale `length`. **top_p** limita la elección a las opciones más probables; la documentación recomienda ajustar temperature o top_p, no los dos. Corre el mismo prompt tres veces con cada temperature.

```python
bajas = [zero_shot(TICKETS["N4"], temperature=0.2)["texto"] for _ in range(3)]
altas = [zero_shot(TICKETS["N4"], temperature=0.9)["texto"] for _ in range(3)]
print("temperature 0,2:", *bajas, sep="\n  ")
print("temperature 0,9:", *altas, sep="\n  ")
print(f"\nSalidas distintas: {len(set(bajas))} con 0,2 y {len(set(altas))} con 0,9")
```

Ahora el mismo prompt con un `max_tokens` demasiado bajo.

```python
cortada = generar([{"role": "system", "content": SISTEMA},
                   {"role": "user", "content": "Ticket: " + TICKETS["N4"]}], max_tokens=5)
print(cortada)
```

```python
assert cortada["fin"] == "length", "Con max_tokens tan bajo, la respuesta debería cortarse (finish_reason = 'length')."
comprobar(len(set(bajas)) <= len(set(altas)), "Con temperature baja hubo igual o menos variación.",
          "esta vez varió más con 0,2; vuelve a correr: temperature cambia la probabilidad, no la garantiza.")

# COMPLETA: ¿qué temperature y qué max_tokens usarías en el resumidor, y por qué? Una línea cada uno.
eleccion = {"temperature": "", "max_tokens": ""}
```

```python
assert all(justificacion.strip() for justificacion in eleccion.values()), \
    "Justifica tu elección de temperature y de max_tokens."
print("✅ Parámetros elegidos y justificados.")
```

## 8 · Limitaciones

plan: LIMITACIONES: ALUCINACIONES, FALTA DE CONTROL Y SENSIBILIDAD AL WORDING.

Un buen prompt reduce los problemas, pero no los elimina. Una **alucinación** es una respuesta que suena segura pero trae datos que no existen. Aquí vas a provocar una: el ticket N3 no dice la causa del cobro duplicado.

```python
causa = generar([{"role": "user", "content": "¿Cuál es la causa del problema? Responde en una oración. "
                                            "Ticket: " + TICKETS["N3"]}], temperature=0.9, max_tokens=60)["texto"]
print("Respuesta:", causa)
revision = generar([{"role": "system", "content": PROMPTS_TAREAS["validacion"]},
                    {"role": "user", "content": f"Ticket: {TICKETS['N3']}\nResumen: {causa}"}],
                   max_tokens=40)["texto"]
print("Validación:", revision)
```

La **sensibilidad al wording** es que un cambio pequeño de palabras cambia el resultado. La **falta de control** es que nada garantiza que el modelo cumpla todas las instrucciones siempre: ya lo viste en las secciones 1 y 7.

```python
redaccion_a = generar([{"role": "user", "content": "Resume el ticket. " + TICKETS["N1"]}])["texto"]
redaccion_b = generar([{"role": "user", "content": "Haz un resumen breve del ticket. " + TICKETS["N1"]}])["texto"]
print(f"A ({palabras(redaccion_a)} palabras): {redaccion_a}\n\nB ({palabras(redaccion_b)} palabras): {redaccion_b}")
```

```python
# COMPLETA: una observación por limitación, con lo que viste en esta sección y en las anteriores.
observaciones = {"alucinaciones": "", "falta de control": "", "sensibilidad al wording": ""}
```

```python
assert all(texto.strip() for texto in observaciones.values()), "Escribe una observación para cada limitación."
comprobar(revision.strip().upper().startswith(("SI", "SÍ")) or not re.search(r"porque|debido|causa", causa.lower()),
          "La validación marcó la causa inventada (o el modelo no inventó una).",
          "el modelo inventó una causa y la validación no la detectó; revisa el prompt de validación.")
```

## 9 · Iterar y registrar

plan: ITERACIÓN Y AJUSTE DE PROMPTS SEGÚN RESULTADOS OBTENIDOS.

Iterar es mejorar el prompt con evidencia: cambiar **una cosa a la vez**, probar con los mismos casos y registrar qué cambió y qué efecto tuvo, en términos de **claridad**, **estructura** o **control**. Para decidir con números, esta función mide cuántas palabras comparte un resumen con la referencia. Es una versión simple de ROUGE-1, la métrica que usarás en el aprendizaje esperado 4.

```python
def normalizar(texto):
    """Minúsculas y sin tildes, solo para comparar."""
    texto = unicodedata.normalize("NFD", texto.lower())
    return re.findall(r"\w+", "".join(c for c in texto if unicodedata.category(c) != "Mn"))


def coincidencia(referencia, generado):
    """F1 de palabras compartidas con la referencia (versión simple de ROUGE-1)."""
    ref, gen = normalizar(referencia), normalizar(generado)
    comunes = sum(min(ref.count(p), gen.count(p)) for p in set(gen))
    if not comunes:
        return 0.0
    precision, cobertura = comunes / len(gen), comunes / len(ref)
    return round(2 * precision * cobertura / (precision + cobertura), 3)


assert coincidencia("El usuario no puede iniciar sesión en la app de facturación tras cambiar su contraseña.",
                    "Usuario no logra iniciar sesión en la app de facturación después de cambiar la contraseña.") \
    == 0.733, "La función de coincidencia no da 0,733 con el par de prueba: no la modifiques."
print("✅ Puntaje de prueba: 0,733")
```

Mide las tres versiones que construiste con los cuatro tickets de práctica.

```python
def puntaje(estrategia):
    """Promedio de coincidencia de una estrategia en los cuatro tickets de práctica."""
    total = sum(coincidencia(REFERENCIAS[k], estrategia(t)["texto"]) for k, t in TICKETS.items())
    return round(total / len(TICKETS), 3)


def version_1(ticket):
    return generar([{"role": "user", "content": "Resume esto: " + ticket}], temperature=1.0)


resultados = {"v1": puntaje(version_1), "v2": puntaje(zero_shot), "v3": puntaje(few_shot)}
resultados
```

```python
# COMPLETA el registro: qué cambió en cada versión respecto de la anterior, su categoría y el efecto observado.
# categoría: "claridad", "estructura" o "control"
registro = [
    {"version": "v1", "cambio": "Prompt original: 'Resume esto:'", "categoria": "",
     "puntaje": resultados["v1"], "efecto": "Punto de partida"},
    {"version": "v2", "cambio": "", "categoria": "", "puntaje": resultados["v2"], "efecto": ""},
    {"version": "v3", "cambio": "", "categoria": "", "puntaje": resultados["v3"], "efecto": ""},
]
```

```python
assert len(registro) >= 3, "Registra al menos tres versiones."
for fila in registro[1:]:
    assert fila["cambio"].strip() and fila["efecto"].strip(), f"Completa el cambio y el efecto de {fila['version']}."
    assert fila["categoria"] in {"claridad", "estructura", "control"}, \
        f"La categoría de {fila['version']} debe ser claridad, estructura o control."

with open("registro_prompts.csv", "w", newline="", encoding="utf-8") as archivo:
    escritor = csv.DictWriter(archivo, fieldnames=list(registro[0].keys()))
    escritor.writeheader()
    escritor.writerows(registro)

mejor = max(registro, key=lambda fila: fila["puntaje"])
with open("prompts.md", "w", encoding="utf-8") as archivo:
    archivo.write("# Prompt final del resumidor de Nube Sur\n\n")
    archivo.write(f"Mejor versión según el puntaje: {mejor['version']} ({mejor['puntaje']})\n\n")
    archivo.write("## Mensaje de sistema\n\n" + SISTEMA + "\n\n")
    archivo.write("## Ejemplos del few-shot\n\n" + "\n".join(f"- {e} -> {r}" for e, r in EJEMPLOS) + "\n\n")
    archivo.write("## Parámetros\n\n" + "\n".join(f"- {k}: {v}" for k, v in eleccion.items()) + "\n")
print("✅ Guardados registro_prompts.csv y prompts.md: descárgalos desde el panel de archivos.")
```

## Hacia las actividades

- **Actividad 1, parte C, "El prompt que no sirve".** Aplica el mismo diagnóstico de la sección 1 a otro prompt y a otros tickets, y reescríbelo como en la sección 2.
- **Actividad 2, pasos 2 y 3.** Diseña un zero-shot y un few-shot para los tickets T1 a T5, registra al menos tres versiones y prueba con temperature 0,2 y 0,9, como en las secciones 3, 7 y 9. La medición con ROUGE y BLEU es del aprendizaje esperado 4.
- Sube `prompts.md` y `registro_prompts.csv` a tu repositorio: son evidencia de tu portafolio.
