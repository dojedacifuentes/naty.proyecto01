# PF1821 · Módulo 2 · Evaluación y cierre del módulo

**Estado:** borrador · **Va en:** LMS · **Pedido:** usuario, 2026-09-30
Fuente de los seis documentos de evaluación y cierre del módulo 2 (diagnóstica y su pauta, actividad final
integradora, autoevaluación, coevaluación por pares y evaluación final del portafolio). `npm run evaluacion`
los revisa y genera los PDF; las marcas entre llaves dobles traen el texto del plan desde la ficha. Esta
cabecera no sale en los PDF.

---

## Ítems de la evaluación diagnóstica

### D1
- **Contenido:** {{c:CONCEPTOS FUNDAMENTALES DE WORKFLOW AUTOMATION}}
- **Criterio:** 1.1
- **Pregunta:** Mercado Austral quiere automatizar una tarea este mes. ¿Cuál cumple mejor las condiciones para hacerlo?
- [ ] Decidir si acepta el reclamo de un almacén mayorista que pide un descuento especial
- [x] Avisar a bodega cada vez que entra un pedido por el formulario web
- [ ] Redactar la nueva política de devoluciones de la empresa
- [ ] Preparar los despachos, que hoy cada bodeguero hace a su manera
- **Por qué:** El aviso a bodega es repetitivo, ocurre con cada pedido, sigue una regla clara y usa datos que ya son digitales. El reclamo con descuento es una decisión de criterio; la política se redacta una sola vez; y un proceso que cada persona hace distinto primero se define y después se automatiza: quien elige esa opción tiende a "automatizar el caos".

### D2
- **Contenido:** {{c:ARQUITECTURA DE N8N}}
- **Criterio:** 1.2
- **Pregunta:** Un pedido de Mercado Austral no quedó guardado y quieres ver qué datos recibió y entregó cada paso del workflow cuando se procesó. En n8n, ¿qué revisas?
- [ ] La credencial de la base de datos
- [ ] Las conexiones entre los nodos
- [x] La ejecución de ese pedido, en el historial de ejecuciones
- [ ] El panel de nodos, donde se buscan los nodos para agregarlos
- **Por qué:** Cada vez que el workflow corre queda una ejecución con los datos que pasaron por cada nodo. La credencial solo guarda el acceso a otro servicio; las conexiones fijan el orden de los pasos, pero no guardan datos; y el panel de nodos sirve para agregar nodos. Confundir estos elementos anticipa dificultades para describir la arquitectura y los componentes de n8n.

### D3
- **Contenido:** {{c:DIFERENCIAS CON OTRAS PLATAFORMAS}}
- **Criterio:** 1.3
- **Pregunta:** Mercado Austral compara n8n con Zapier y Make antes de elegir una plataforma. ¿Cuál de estas afirmaciones es correcta?
- [ ] n8n tiene más integraciones listas para usar que Zapier y Make
- [x] n8n puede instalarse en un servidor propio; Zapier y Make funcionan en la nube
- [ ] n8n cobra por cada paso que ejecuta, como Zapier cobra por cada tarea
- [ ] n8n solo admite workflows lineales, sin ramas ni uniones
- **Por qué:** n8n puede autoalojarse, y así los datos de los clientes se quedan en la infraestructura de la empresa; Zapier y Make funcionan solo en la nube del proveedor. Zapier ofrece más integraciones listas que n8n, que lo compensa con el nodo HTTP Request y el nodo Code; en su nube, n8n cuenta ejecuciones completas del workflow, no pasos; y n8n admite ramas, uniones y bucles. Quien elige la cantidad de integraciones o el cobro por paso aún no distingue en qué se diferencian las plataformas.

### D4
- **Contenido:** {{c:EDITOR VISUAL}}
- **Criterio:** 2.1
- **Pregunta:** En el canvas de n8n hay un Form Trigger conectado a un Edit Fields y, más a la derecha, un nodo Supabase sin ninguna línea que lo una a los anteriores. Llega un pedido. ¿Qué pasa con el nodo Supabase?
- [ ] Se ejecuta igual, porque está en el mismo workflow
- [ ] n8n lo conecta solo, en el orden en que se crearon los nodos
- [x] No se ejecuta: los datos solo pasan por las conexiones
- [ ] El workflow completo se detiene con un error
- **Por qué:** Una conexión define por dónde pasan los ítems y en qué orden; un nodo suelto no recibe nada y simplemente no corre. Las dos primeras opciones revelan la idea de que "estar en el canvas" basta; la cuarta confunde un nodo desconectado con un error de ejecución, cuando en realidad n8n ejecuta el resto sin avisar.

### D5
- **Contenido:** {{c:CONFIGURACIÓN DE NODOS BÁSICOS}}
- **Criterio:** 2.2
- **Pregunta:** El sistema de compras de un almacén cliente avisará a Mercado Austral de cada pedido nuevo enviando una solicitud HTTP a una dirección que la empresa le entregue. ¿Con qué trigger debe empezar el workflow que recibe ese aviso?
- [ ] Schedule Trigger, programado cada cinco minutos
- [x] Webhook
- [ ] n8n Form Trigger
- [ ] Manual Trigger
- **Por qué:** El Webhook entrega una URL que otra aplicación llama cuando ocurre algo, y el workflow corre en ese momento. El Schedule Trigger corre a intervalos, pero no recibe la solicitud; el Form Trigger publica un formulario para que lo llenen personas; y el Manual Trigger solo sirve para probar desde el editor.

### D6
- **Contenido:** {{c:TESTING Y DEBUGGING INICIAL}}
- **Criterio:** 2.3
- **Pregunta:** Terminaste el workflow que registra los pedidos de Mercado Austral y lo probaste con un pedido bien escrito: terminó en verde. ¿Qué haces antes de publicar el formulario en el sitio de la empresa?
- [ ] Nada más: si terminó en verde, funcionará con cualquier pedido
- [ ] Lo activo y reviso la tabla en una semana para ver si hubo problemas
- [x] Lo pruebo con varios pedidos, también mal escritos, y miro la salida de cada nodo
- [ ] Lo ejecuto otra vez con el mismo pedido, para confirmar que sale en verde
- **Por qué:** Probar es usar varios casos, también los "sucios" (correo en mayúsculas, comuna con espacios, cantidad en cero), y mirar la salida de cada nodo. Una ejecución en verde solo dice que ningún nodo falló; probar en producción traslada los errores a los clientes; y repetir el mismo pedido solo confirma el caso que ya funcionaba.

### D7
- **Contenido:** {{c:MANIPULACIÓN DE DATOS}}
- **Criterio:** 3.1
- **Pregunta:** Un workflow suma los totales de dos pedidos de Mercado Austral, 25000 y 12500, y el resultado sale "2500012500". ¿Qué cambio lo corrige?
- [ ] Agrupar los pedidos con un Summarize por comuna antes de sumar
- [x] Declarar los totales como Number en el Edit Fields, apenas entran
- [ ] Unir los dos pedidos con un Merge antes de hacer la suma
- [ ] Cambiar a texto la columna `total` de la tabla en Supabase
- **Por qué:** Los totales llegaron como texto ("25000") y la suma unió los textos. Se corrige en el origen: declarar el tipo Number en el Edit Fields apenas entran al workflow, para que todos los nodos siguientes reciban números. Summarize y Merge agrupan o combinan ítems, pero no cambian el tipo de un campo; y guardar el total como texto lleva el mismo problema a la base de datos. Quien elige esas opciones aún no distingue un texto de un número.

### D8
- **Contenido:** {{c:TRANSFORMACIÓN DE FORMATOS}}
- **Criterio:** 3.2
- **Pregunta:** El mismo pedido de Mercado Austral llega en cuatro formatos. ¿Cuál está en JSON, el formato con el que n8n trabaja por dentro?
- [ ] `id,comuna,total` y, en la línea siguiente, `7,Temuco,95940`
- [ ] `<pedido><id>7</id><comuna>Temuco</comuna><total>95940</total></pedido>`
- [x] `{ "id": 7, "comuna": "Temuco", "total": 95940 }`
- [ ] `id=7&comuna=Temuco&total=95940`
- **Por qué:** JSON escribe pares de campo y valor entre llaves. La primera opción es CSV (una fila de encabezados y filas separadas por comas), la segunda es XML (etiquetas de apertura y cierre) y la cuarta son los parámetros de una URL. Quien confunde CSV o XML con JSON necesitará apoyo en la conversión entre formatos (Extract from File, Convert to File y el nodo XML).

### D9
- **Contenido:** {{c:MANEJO DE DATOS RELACIONALES}}
- **Criterio:** 3.4
- **Pregunta:** En Supabase, la tabla `devoluciones` guarda en la columna `pedido_id` el `id` del pedido al que pertenece cada devolución, declarada como clave foránea de la tabla `pedidos`. ¿Qué gana Mercado Austral con eso?
- [ ] Que cada pedido pueda tener una sola devolución
- [x] Que ninguna devolución pueda apuntar a un pedido que no existe
- [ ] Que las devoluciones se borren solas cuando el pedido se despacha
- [ ] Que la tabla `devoluciones` no necesite su propia clave primaria
- **Por qué:** La clave foránea relaciona las tablas: la base de datos rechaza una devolución con un `pedido_id` inexistente, y los datos del pedido no se copian en cada devolución, porque viven en `pedidos` y se obtienen por esa relación. Un pedido puede tener varias devoluciones; la clave foránea no borra filas porque cambie el estado del pedido; y cada tabla sigue necesitando su clave primaria. Quien elige la primera o la última opción confunde clave foránea con clave primaria.

### D10
- **Contenido:** {{c:OPERADORES Y EXPRESIONES COMPLEJAS}}
- **Criterio:** 4.2
- **Pregunta:** En Mercado Austral, una devolución requiere aprobación si el total del pedido es mayor que $50.000 **o** si el cliente es mayorista. ¿Cuál de estas devoluciones NO requiere aprobación?
- [ ] La de un pedido minorista de $63.960
- [ ] La de un pedido mayorista de $43.800
- [x] La de un pedido minorista de $25.000
- [ ] La de un pedido mayorista de $196.000
- **Por qué:** Con O (OR, `||` en una expresión) basta que se cumpla una de las condiciones, y solo el pedido minorista de $25.000 no cumple ninguna. Quien marca el mayorista de $43.800 está leyendo la regla como Y (AND), que exige las dos; quien marca $63.960 o $196.000 no está aplicando bien la comparación del monto.

### D11
- **Contenido:** {{c:ROUTING DE DATOS}}
- **Criterio:** 4.1
- **Pregunta:** Un Switch de Mercado Austral, en modo Rules y con las opciones por defecto, tiene en este orden la regla 0 "cliente mayorista → ventas" y la regla 1 "comuna de regiones → despacho regional". ¿A dónde va el pedido de un almacén mayorista de Temuco?
- [x] A ventas
- [ ] A despacho regional
- [ ] A las dos salidas a la vez
- [ ] A revisión manual, porque cumple dos reglas
- **Por qué:** En el modo Rules, el Switch envía el ítem a la primera regla que se cumple (salvo que se active la opción de enviarlo a todas las que se cumplan), así que el orden de las reglas es parte de la lógica del negocio. Las otras respuestas suponen que gana la última regla, que el ítem se duplica o que cumplir dos reglas es un error.

### D12
- **Contenido:** {{c:HERRAMIENTAS DE DEBUG EN N8N}}
- **Criterio:** 4.3
- **Pregunta:** Pruebas el workflow de devoluciones de Mercado Austral con 8 devoluciones fijadas. Al revisar la ejecución, que terminó en verde, ves que al Switch que las envía por motivo entran 8 ítems y que sus salidas suman 7. ¿Qué indica esa cuenta?
- [ ] Que el Switch tuvo un error interno que n8n no mostró en la ejecución
- [x] Que una devolución no calzó con ninguna regla y no hay salida de respaldo
- [ ] Que n8n eliminó por su cuenta una devolución que venía duplicada
- [ ] Que el historial no guardó los datos de una de las ocho devoluciones
- **Por qué:** Contar los ítems que entran y salen de cada nodo es la forma más rápida de ubicar una falla: la suma de las salidas de un Switch debe ser igual a su entrada. Si falta uno, ese ítem no cumplió ninguna regla y, sin salida de respaldo (*Fallback Output*), el Switch lo descarta sin error. Quien piensa en un error oculto confía en el verde, que solo dice que ningún nodo falló; n8n no elimina duplicados por su cuenta; y el historial guarda la ejecución completa, con los datos de cada nodo.

## 01 · Evaluación diagnóstica del módulo 2
- **Archivo:** M2-01-Evaluacion-diagnostica
- **Rótulo:** Evaluación del módulo · inicio
- **Momento:** Al comenzar el módulo, antes de la primera lectura
- **Modalidad:** Individual: cuestionario del LMS o este documento
- **Calificación:** No lleva nota: muestra tu punto de partida
- **Vínculo con el plan:** La competencia del módulo, sus cuatro aprendizajes esperados con sus criterios de evaluación y los cuatro contenidos del plan

### Para qué sirve

Esta evaluación muestra desde dónde partes en el módulo 2, «{{modulo}}»: qué sabes ya de automatización de workflows, de n8n y de datos, y cómo te ves frente a lo que el módulo te pide lograr. No lleva nota. Con tus respuestas, el tutor/a te recomienda por dónde empezar, y tú las vas a usar al cierre del módulo para ver cuánto avanzaste. La competencia que el módulo busca desarrollar es: *{{competencia}}*

Varias preguntas usan el caso que acompaña todo el módulo: **Mercado Austral**, una distribuidora ficticia de abarrotes que vende a clientes minoristas y a almacenes mayoristas, recibe los pedidos por un formulario web y los guarda en una base de datos en Supabase. No necesitas conocerlo de antes.

### Instrucciones

- Respóndela solo/a y sin buscar las respuestas: lo que importa es tu punto de partida real.
- **Parte A.** Marca una sola opción por pregunta. Si no sabes, déjala en blanco: también es información, y le dice más al tutor/a que una respuesta al azar.
- **Parte B.** Marca un número de 1 a 4 para cada criterio.
- **Parte C.** Responde con tus palabras, en pocas líneas.
- Si la respondes en el cuestionario del LMS, tus respuestas quedan guardadas. Si usas este documento, súbelo completo a la Tarea «Evaluación diagnóstica» del módulo y guarda una copia.

### Parte A · Lo que ya sabes

Doce preguntas, tres por cada contenido del plan del módulo. Cada una tiene una sola respuesta correcta.

{{items-diagnostica}}

### Parte B · Cómo te ves hoy frente a los aprendizajes del módulo

Para cada criterio de evaluación del plan, marca el número que mejor describe lo que puedes hacer **hoy**, antes de empezar:

| Nivel | Significa |
| :-: | --- |
| 1 | Aún no lo sé hacer |
| 2 | Lo hago con ayuda |
| 3 | Lo hago solo/a, con dudas |
| 4 | Lo hago solo/a y puedo explicarlo |

{{tabla-autopercepcion}}

> **Guarda tus respuestas de esta parte.** Al cierre del módulo las vas a copiar en la columna «Al inicio» de la autoevaluación y las vas a comparar con cómo te ves entonces, en el cierre de tu portafolio. Marcar 1 o 2 en casi todo es lo esperable al comenzar: lo que importa es que sea honesto.

### Parte C · Tu experiencia

1. ¿Has usado alguna herramienta para automatizar tareas, como n8n, Zapier, Make, Power Automate o las macros de una planilla? Cuenta para qué la usaste o, si no has usado ninguna, qué te gustaría automatizar.
2. Piensa en un proceso repetitivo de tu trabajo, tus estudios o tu entorno. ¿Qué lo inicia, qué pasos tiene, qué resultado produce y cuántas veces ocurre a la semana?
3. ¿Qué has hecho con datos: completar planillas compartidas, usar fórmulas, importar archivos CSV, consultar o crear tablas en una base de datos?
4. ¿Qué te gustaría poder construir al terminar el módulo y qué te preocupa del camino?

### Qué pasa después

- El tutor/a revisa tus respuestas antes de que comiences el aprendizaje esperado 1 y te deja un comentario breve: tus aciertos en cada contenido (de 0 a 3, sin la clave), por qué contenido te conviene empezar y con qué recurso (la lectura, la cápsula o el quiz de cada tramo). Guarda tus aciertos junto con tu Parte B: los usarás en la autoevaluación y en el portafolio.
- Al iniciar el aprendizaje esperado 1, el tutor/a comenta en el foro del módulo las preguntas de la Parte A que más le costaron al curso.
- Tus respuestas a la Parte C ayudan a armar equipos equilibrados para los ABPRO.
- Al cierre, tu Parte B vuelve en la autoevaluación del módulo y en la introducción y el cierre de tu portafolio.

## 01 · Pauta del tutor: evaluación diagnóstica
- **Archivo:** M2-01-Evaluacion-diagnostica-Pauta-tutor
- **Rótulo:** Evaluación del módulo · inicio · uso del tutor/a
- **Momento:** Al cerrar la diagnóstica, antes de comenzar el aprendizaje esperado 1
- **Uso:** Solo del tutor/a; no se publica a los participantes
- **Vínculo con el plan:** La competencia del módulo, sus cuatro aprendizajes esperados con sus 13 criterios de evaluación y los cuatro contenidos del plan

Esta pauta acompaña la evaluación diagnóstica del módulo 2. Trae la clave de la Parte A, la correspondencia de cada ítem con el plan formativo, la forma de leer los resultados y las acciones que siguen. No se publica en el curso: la clave se comenta en la primera sesión sincrónica, sin entregarla por escrito.

### Cómo está construida

| Parte | Qué mide | Relación con el plan |
| --- | --- | --- |
| A · Lo que ya sabes | Conocimientos previos, con 12 preguntas de selección múltiple (3 por contenido), situaciones de Mercado Austral y distractores que revelan errores típicos | Los cuatro contenidos del plan. Cada ítem se asocia a un contenido y a un criterio de evaluación del aprendizaje esperado dueño de ese contenido (ver la clave) |
| B · Cómo te ves hoy | Autopercepción de 1 a 4 en cada criterio | Los 13 criterios de evaluación de los cuatro aprendizajes esperados, tal como los formula el plan |
| C · Tu experiencia | Experiencia previa con automatización y con datos, y un proceso real del entorno del participante | La competencia del módulo: la pregunta 1 con «{{competencia: crear workflows básicos de automatización utilizando n8n}}», la 2 con «{{competencia: para resolver problemáticas empresariales}}» y la 3 con «{{competencia: manipulando datos mediante nodos fundamentales}}» e «{{competencia: integrando bases de datos básicas}}». Da el contexto para los ABPRO y para el portafolio |

**Contenidos del plan que evalúa la Parte A:** 1 · {{unidad 1}} (ítems 1 a 3); 2 · {{unidad 2}} (ítems 4 a 6); 3 · {{unidad 3}} (ítems 7 a 9); 4 · {{unidad 4}} (ítems 10 a 12).

### Clave y correspondencia con el plan

Para cada ítem: la respuesta correcta, el contenido del plan que evalúa, el criterio de evaluación con el que se relaciona y qué revela cada distractor.

{{clave-diagnostica}}

### Cómo leer los resultados

**Por contenido (Parte A).** Cuenta los aciertos de cada participante en los tres ítems de cada contenido:

| Aciertos en el contenido | Lectura | Qué hacer |
| :-: | --- | --- |
| 3 | Avanza | Sigue la ruta del módulo; ofrécele un desafío extra en el ABP y un rol de mayor responsabilidad en el ABPRO |
| 2 | Repasa | Recomiéndale la sección de la lectura del ítem que falló y el quiz de ese aprendizaje esperado |
| 0 o 1 | Refuerza | Además de la lectura, la cápsula de ese aprendizaje esperado y una revisión temprana de su ABP |

Distingue la respuesta en blanco del distractor: un blanco dice que el tema es nuevo; un distractor marcado revela una idea equivocada que conviene corregir de frente (ver el "por qué" de la clave).

**Contraste entre la Parte A y la Parte B.** Para cada contenido, compara los aciertos con el promedio que el participante se puso en los criterios del aprendizaje esperado dueño de ese contenido:

- **Sobreestimación:** promedio de 3 o más en la Parte B y 0 o 1 acierto. Confía en algo que aún no domina. Prioriza una retroalimentación temprana en su ABP, con el caso concreto que falló.
- **Subestimación:** promedio de 2 o menos y 3 aciertos. Sabe más de lo que cree. Díselo con la evidencia e invítalo/a a un rol de mayor responsabilidad en el ABPRO (especialista n8n, responsable de reglas o de trazabilidad).
- **Coherente:** el resto. Sigue la acción que corresponde a sus aciertos.

**Por curso.** Si más de un tercio del curso queda en "refuerza" en un contenido, repasa al inicio de ese aprendizaje esperado los ítems que más fallaron. La Parte C sirve para armar equipos de ABPRO con experiencias distintas y para anticipar quiénes nunca han trabajado con una base de datos antes del tramo 3.

### Acciones según el resultado

| Contenido del plan | Si repasa (2 aciertos) | Si refuerza (0 o 1 acierto) |
| --- | --- | --- |
| **1 · {{unidad 1}}** | Lectura «¿Qué conviene automatizar?», en la sección del ítem que falló; Quiz 1 «Entender qué automatizar» | Además, la cápsula 1 «¿Qué conviene automatizar?» y el cuadro comparativo n8n, Make y Zapier antes del ABP «{{abp AE1}}»; revisión temprana de su cálculo de horas liberadas |
| **2 · {{unidad 2}}** | Lectura «Tu primer workflow»; Quiz 2 «Construir tu primer workflow» | Además, la cápsula 2 «Tu primer workflow» y el tutorial guiado «Tu primer workflow con datos limpios» antes del ABP «{{abp AE2}}» |
| **3 · {{unidad 3}}** | Lectura «Datos en movimiento», secciones «Tipos de datos», «Formatos» y «CRUD con el nodo Supabase»; Quiz 3 «Transformar datos» | Además, la cápsula 3 «Datos en movimiento», los pasos de expresiones, Supabase y formatos del tutorial guiado y el video interactivo «Expresiones y depuración»; revisión intermedia de tipos en el ABP «{{abp AE3}}» |
| **4 · {{unidad 4}}** | Lectura «Decidir y depurar», secciones «Operadores» y «Enrutar datos»; Quiz 4 «Decidir y depurar» | Además, la cápsula 4 «Decidir y depurar» y las preguntas de AND, OR y salida de respaldo del video interactivo; en el ABP «{{abp AE4}}», pídele que entregue primero su tabla de rutas predichas |

**Si falla un ítem, remite a esta sección de la lectura:**

| Ítem | Lectura y sección |
| :-: | --- |
| 1 | «¿Qué conviene automatizar?» · Qué conviene automatizar |
| 2 | «¿Qué conviene automatizar?» · Arquitectura de n8n y Componentes de la interfaz |
| 3 | «¿Qué conviene automatizar?» · n8n frente a otras plataformas |
| 4 | «Tu primer workflow» · Editor visual y espacio de trabajo |
| 5 | «Tu primer workflow» · Tipos de trigger |
| 6 | «Tu primer workflow» · Probar sin repetir y Primeros errores |
| 7 | «Datos en movimiento» · Tipos de datos |
| 8 | «Datos en movimiento» · Formatos |
| 9 | «Datos en movimiento» · CRUD con el nodo Supabase |
| 10 | «Decidir y depurar» · Operadores |
| 11 | «Decidir y depurar» · Enrutar datos |
| 12 | «Decidir y depurar» · Herramientas de depuración y Contar ítems |

### Planilla de registro del curso

Una fila por participante, en una hoja de cálculo del curso guardada en el LMS (tiene datos personales: no se comparte fuera del equipo docente). Modelo, con una fila de ejemplo:

| Participante | C1 (0 a 3) | C2 (0 a 3) | C3 (0 a 3) | C4 (0 a 3) | Parte B, promedio por aprendizaje (1 · 2 · 3 · 4) | Contraste A y B | Acción y recurso | Seguimiento |
| --- | :-: | :-: | :-: | :-: | :-: | --- | --- | --- |
| *Participante 1* | *3* | *2* | *1* | *1* | *2,7 · 2,3 · 3,3 · 2,0* | *Sobreestima en el contenido 3* | *C3: lectura «Datos en movimiento» (Tipos de datos), cápsula 3, video interactivo y Quiz 3. C4: lectura «Decidir y depurar», cápsula 4 y Quiz 4. C2: lectura «Tu primer workflow» y Quiz 2* | *Revisar los tipos en su ABP «{{abp AE3}}» y pedirle primero la tabla de rutas predichas en «{{abp AE4}}»* |
| | | | | | | | | |

### Cómo se vuelve a usar al cierre

- **Aciertos por contenido.** En el comentario de la diagnóstica, devuelve a cada participante sus aciertos por contenido (C1 a C4, de 0 a 3), sin la clave, y pídele que los guarde junto con su Parte B: los usa en la autoevaluación y en el portafolio.
- **Autoevaluación del módulo 2.** El participante copia su Parte B en la columna «Al inicio» y la compara, criterio por criterio, con la columna «Hoy».
- **Portafolio.** La introducción usa la diagnóstica como punto de partida y el cierre compara ese punto con la autoevaluación. La rúbrica final lo exige en el criterio «Reflexión y uso de la retroalimentación».
- **Tutor/a.** Contrasta la planilla con el puntaje de la actividad final por componente de la competencia. Cada contenido corresponde a estos componentes de la pauta: contenido 1, «{{competencia: para resolver problemáticas empresariales}}»; contenido 2, «{{competencia: crear workflows básicos de automatización utilizando n8n}}»; contenido 3, «{{competencia: manipulando datos mediante nodos fundamentales}}» e «{{competencia: integrando bases de datos básicas}}»; contenido 4, «{{competencia: de acuerdo con buenas prácticas de automatización}}». Quien partió en "refuerza" en un contenido y logró el puntaje completo en su componente muestra un avance que vale la pena reconocer en la retroalimentación.
- **Opcional.** Al cierre puedes volver a aplicar la Parte A, sin nota, para medir el avance en conocimientos con los mismos ítems.

## 03 · Actividad final integradora: Devoluciones sin correo en Mercado Austral
- **Archivo:** M2-03-Actividad-final-integradora
- **Rótulo:** Evaluación y cierre del módulo · cierre
- **Momento:** Al cierre del módulo, después del último ABPRO
- **Modalidad:** Individual, con entrega en el LMS
- **Calificación:** Pauta de 40 puntos por componentes de la competencia, exigencia 60 %
- **Competencia del módulo:** {{competencia}}
- **Contenidos del plan:** Los cuatro contenidos del módulo, todos integrados: 1 · {{unidad 1}}; 2 · {{unidad 2}}; 3 · {{unidad 3}}; 4 · {{unidad 4}}

### Contexto

Mercado Austral (empresa ficticia) es la distribuidora de abarrotes que te acompañó todo el módulo: vende a clientes minoristas y a almacenes mayoristas por un formulario web y ya guarda sus pedidos en la tabla `pedidos` de Supabase. Con los pedidos en orden, el problema se movió al final del proceso: las devoluciones.

Hoy, el cliente que quiere devolver algo escribe un correo. Una asistente de atención al cliente lo lee, busca el pedido, revisa que el correo sea del mismo cliente, anota la devolución en una planilla y avisa por correo al área que corresponde: **calidad** si el producto llegó dañado, **bodega** si hubo un error de despacho y **atención al cliente** si la persona se arrepintió. Los pedidos grandes y los de clientes mayoristas los aprueba la jefatura antes de devolver el dinero. Cada viernes, la asistente arma a mano un resumen para finanzas y una lista de retiros para **Transportes Cordillera** (empresa ficticia), que pasa a buscar los productos al domicilio del cliente.

El proceso funciona, pero es lento y se equivoca. Llegan unas 60 devoluciones al mes, 1 de cada 10 queda mal registrada (con el pedido o el motivo equivocado) y los clientes esperan días una respuesta. Nadie sabe cuántas devoluciones hay por motivo hasta el viernes, ni cuáles siguen esperando retiro.

### El desafío

Mercado Austral quiere dejar el correo atrás. Te pide una propuesta con números y dos workflows en n8n conectados a su Supabase:

- **Registro de devoluciones.** El cliente llena un formulario; el workflow valida la solicitud contra el pedido, decide si requiere aprobación, la envía al área que corresponde, la registra y le responde al cliente con su número de devolución. Lo que no calce va a revisión manual: nada se pierde en silencio.
- **Cierre semanal de devoluciones.** Cada viernes, un resumen por motivo en CSV para finanzas y un archivo XML con los retiros para Transportes Cordillera; el lunes, la lectura de la confirmación del transportista para marcar los retiros programados.

Todo tiene que quedar probado y trazable: para cualquier devolución, alguien de la empresa debe poder saber por qué ruta pasó y en qué ejecución se procesó.

### Lo que vas a construir

#### Parte 1 · La propuesta

1. **El costo del proceso actual.** Con los datos del proceso (en Insumos), calcula las horas de la asistente y el costo mensual de gestionar las devoluciones a mano: la gestión de cada devolución, las correcciones y el cierre del viernes. Muestra cada cálculo.
2. **Retorno de la inversión.** Calcula el ahorro mensual neto (horas liberadas, descontando lo que seguirá atendiendo una persona, menos la herramienta y la mantención), el ROI a 12 meses con la fórmula ROI = (beneficio − costo) ÷ costo, con la construcción, la herramienta y la mantención dentro del costo, y el plazo en que se recupera la inversión.
3. **Por qué automatizarlo y tres beneficios.** Explica por qué este proceso conviene automatizarlo según las cuatro condiciones (repetitivo, frecuente, con reglas claras y con datos digitales) y qué parte seguirá en manos de una persona (la aprobación de la jefatura y la revisión manual). Descríbelo como workflow: qué lo inicia, qué pasos tiene y qué resultado produce. Nombra tres beneficios para la empresa o sus clientes, al menos uno que no se mida en dinero, e indica a qué caso de uso empresarial corresponde este proceso: el área de la empresa y el tipo de automatización.
4. **Por qué n8n.** Compara n8n con Zapier y Make en tres criterios que importan en este caso: dónde quedan los datos de los clientes (autoalojamiento), qué unidad cuenta el plan de pago de cada una y cuánta lógica propia admite (expresiones y nodo Code). Verifica los precios y planes vigentes en el sitio de cada proveedor y cita la fuente con la fecha de consulta. Cierra con una recomendación de 3 a 5 líneas.
5. **Diagrama de la solución.** Dibuja los dos workflows con sus nodos y conexiones, las credenciales que usan, las tres tablas de Supabase con su relación y dónde se revisan las ejecuciones. Puede ser digital o a mano, siempre que se lea bien.
6. **Lista de nodos.** Enumera los nodos que vas a usar, clasificados por tipo: triggers, nodos core (transformación y lógica) e integraciones con aplicaciones. Marca el que conecta con un servicio que no tiene nodo propio en n8n.

#### Parte 2 · Workflow "Registro de devoluciones"

1. **Tablas.** Ejecuta en el editor SQL de Supabase el script de Insumos: agrega la columna `estado` a `pedidos`, carga los seis pedidos de prueba y crea `devoluciones` y `log_devoluciones`. Crea o reutiliza en n8n la credencial de tu proyecto de Supabase.
2. **Formulario.** Crea el workflow con un *n8n Form Trigger* titulado "Solicitud de devolución" y cuatro campos con estas etiquetas exactas: `pedido_id` (Number, obligatorio), `email` (Email, obligatorio), `motivo` (lista desplegable con producto dañado, error de despacho y arrepentimiento; obligatorio) y `comentario` (texto largo, opcional).
3. **Configuración.** Los valores que pueden cambiar no se escriben dentro de los nodos: el umbral de aprobación (50000), el monto mínimo para retirar el producto (10000) y los nombres de las tablas `devoluciones` y `log_devoluciones`. Léelos como variables: `$env.UMBRAL_APROBACION` en una instancia propia que lo permita, o `$vars.UMBRAL_APROBACION` si tu plan de n8n tiene *Variables*. Si tu instancia no permite ninguna de las dos, crea al comienzo un *Edit Fields* llamado "Configuración" con esos cuatro valores, con *Include Other Input Fields* activado para que los campos del formulario sigan hasta "Normalizar devolución", y explica en el informe cómo pasarían a variables de entorno. Las variables llegan como texto: conviértelas con `Number()` antes de comparar.
4. **Normalización.** Un *Edit Fields (Set)* llamado "Normalizar devolución" declara el tipo de cada campo: `pedido_id` (Number), `email` sin espacios en los extremos y en minúsculas, `motivo` sin espacios en los extremos y en minúsculas (texto vacío si no llega), `comentario` sin espacios en los extremos y `recibido_en` (Date & Time) con la fecha y hora de la ejecución.
5. **Buscar el pedido.** Nodo Supabase "Buscar pedido", operación *Get a row*, en `pedidos`, con `id` igual a `{{ $json.pedido_id }}`. En los *Settings* del nodo activa *Always Output Data*: si el pedido no existe, el nodo entrega un ítem vacío en vez de ninguno y el paso siguiente lo puede detectar. Sin esa opción, la solicitud desaparece sin error.
6. **Casos borde.** Dos nodos *If* separan lo que no se puede registrar: "¿Existe el pedido?" (el `id` del pedido existe) y "¿Coincide el correo?" (el correo del pedido, normalizado, es igual al del formulario, que lees con `$('Normalizar devolución').item.json.email`). Cada salida falsa va a la rama de revisión manual con un `detalle` que diga por qué: "pedido inexistente" o "correo no coincide".
7. **Armar la devolución.** Un *Edit Fields* "Armar devolución" junta los datos del formulario con dos datos del pedido, `total_pedido` (Number) y `comuna` (String), y calcula dos campos Boolean con operadores: `requiere_aprobacion`, verdadero si el total es mayor que el umbral **o** el cliente es mayorista, y `requiere_retiro`, verdadero si el total es mayor o igual que el monto mínimo de retiro. Con el nodo "Configuración", la primera queda así: `{{ $json.total > $('Configuración').item.json.umbral_aprobacion || $json.tipo_cliente === 'mayorista' }}`.
8. **Enrutar por motivo.** Un *Switch* en modo *Rules* con tres salidas con nombre: "producto dañado" a calidad, "error de despacho" a bodega y "arrepentimiento" a atención al cliente. Activa *Fallback Output* con *Extra Output* y conéctala a la revisión manual con el detalle "motivo fuera de la lista". En cada una de las tres salidas, un *Edit Fields* con *Include Other Input Fields* activado escribe el `area`: `calidad`, `bodega` o `atencion_cliente`.
9. **Registrar.** Nodo Supabase "Crear devolución", *Create a row* en `devoluciones` (con `pedido_id` como clave foránea). En *Data to Send*, elige *Define Below for Each Column* y asigna `pedido_id`, `email`, `motivo`, `area`, `comentario`, `total_pedido`, `comuna`, `requiere_aprobacion`, `requiere_retiro` y `recibido_en`; `id`, `creado_en`, `estado` y `fecha_retiro` los pone la base de datos. A continuación, "Marcar pedido", *Update a row* en `pedidos`, que deja ese pedido con `estado` = `devolucion_en_curso`. En los *Settings* de "Crear devolución", usa *On Error* con *Continue (using error output)* y lleva esa salida al registro, con la ruta `error` y el mensaje del error.
10. **Dejar rastro.** Toda ejecución termina con una fila en `log_devoluciones`, también las que van a revisión manual: `id_ejecucion` = `{{ $execution.id }}`, `workflow` = `{{ $workflow.name }}`, `pedido_id`, `devolucion_id` (vacío si no se creó), `ruta` y `detalle`.
11. **Responder al cliente.** Un *Form Ending* muestra el número de devolución (`{{ $('Crear devolución').item.json.id }}`) y, si requiere aprobación, avisa que la jefatura la revisará antes de devolver el dinero. La rama de revisión manual termina en otro *Form Ending* que avisa que una persona revisará la solicitud y escribirá al correo indicado, sin mostrar ningún dato del pedido: quien escribe podría no ser quien hizo el pedido.

#### Parte 3 · Workflow "Cierre semanal de devoluciones"

1. **Trigger.** Un *Schedule Trigger* los viernes a las 17:00. Revisa en los ajustes del workflow que la zona horaria sea la de Chile (America/Santiago). Mientras construyes, ejecútalo desde el editor.
2. **Las devoluciones de la semana.** Nodo Supabase, *Get many rows* en `devoluciones`, con *Return All* activado y el filtro `creado_en` mayor o igual que `{{ $now.minus({ days: 7 }).toISO() }}`.
3. **Resumen para finanzas.** Un *Summarize* agrupa por `motivo` y calcula *Count* de `id` y *Sum* de `total_pedido`. Un *Edit Fields* deja los nombres que pide finanzas (`motivo`, `devoluciones` y `monto_total`) y *Convert to File*, con *Convert to CSV*, genera `devoluciones_semana.csv`. Antes de ejecutar, calcula a mano qué debería entregar el resumen con tus devoluciones de prueba y compáralo con el resultado.
4. **Lo que hay que retirar.** En una rama paralela, que sale del mismo *Schedule Trigger* del viernes, otro *Get many rows* en `devoluciones`, con *Return All* activado, sin filtro de fecha y con el filtro `estado` igual a `registrada`, trae todas las que siguen sin retiro programado: así se vuelven a pedir los retiros pendientes de semanas anteriores y no se piden de nuevo los ya programados. Después, un *Filter* deja las que tienen `requiere_retiro` verdadero.
5. **Completar con el pedido.** Un tercer *Get many rows*, con *Return All* activado, trae los pedidos. Conéctalo directamente al *Schedule Trigger* del viernes, que entrega un solo ítem, para que se ejecute una vez (si lo pones después de otro nodo, se ejecuta una vez por cada ítem que recibe: activa *Execute Once* en sus *Settings*). Un *Merge* en modo *Combine*, por *Matching Fields*, une cada devolución que sale del *Filter* (entrada 1, `pedido_id`) con su pedido (entrada 2, `id`) para agregar `nombre` y `producto`. Las dos tablas tienen campos con el mismo nombre (`id`, `creado_en`, `email`, `comuna` y `estado`): en las opciones del Merge, decide cómo resolver ese choque (*Clash Handling*) y comprueba en la salida que el `id` y el `estado` sean los de la devolución. Cuenta los ítems: deben salir tantos como devoluciones entraron.
6. **El archivo del transportista.** Un *Edit Fields* deja los campos que pide Transportes Cordillera (formato en Insumos). Como el nodo *XML* convierte cada ítem por separado, primero junta todos los retiros en un solo ítem con *Aggregate* (*All Item Data*, en el campo `retiro`). Luego, el nodo *XML* en modo *JSON to XML*, con `retiros` como nombre raíz (*Root Name*), y *Convert to File*, con *Convert to Text File*, para guardar `retiros_semana.xml`.
7. **La confirmación del transportista.** Transportes Cordillera responde con un archivo JSON (en Insumos, y publicado en el LMS como `confirmacion_retiros.json`). Agrega al mismo workflow un segundo *Schedule Trigger*, los lunes a las 9:00, y lee la confirmación con *HTTP Request* (GET al enlace publicado, respuesta en JSON). Si tu instancia no llega al enlace, fija el JSON como datos del nodo.
8. **Un ítem por retiro.** Un *Split Out* sobre el campo `retiros` convierte el array en un ítem por retiro. Un *If* separa los que tienen `estado` igual a `programado` de los que no.
9. **Actualizar.** Para los programados, nodo Supabase *Update a row* en `devoluciones`, con dos condiciones, `pedido_id` igual al del retiro y `estado` igual a `registrada`, que deja `estado` = `retiro_programado` y la `fecha_retiro`. Los que no se programaron siguen en `registrada` y vuelven a salir el viernes siguiente. Registra cada decisión en `log_devoluciones`, con la ruta `retiro_programado` o `sin_cobertura` y el `id_ejecucion`.

#### Parte 4 · Pruebas, depuración y trazabilidad

1. **Plan de pruebas.** Antes de ejecutar, completa una tabla con las ocho devoluciones de prueba de Insumos (puedes agregar casos propios) y el resultado que esperas de cada una. Así se ve la primera fila:

| Caso | Ruta esperada | `requiere_aprobacion` | `requiere_retiro` | Filas esperadas | Mensaje final | Resultado obtenido | `id_ejecucion` |
| --- | --- | :-: | :-: | --- | --- | --- | --- |
| *D1* | *calidad* | *false* | *true* | *1 en `devoluciones` y 1 en `log_devoluciones`* | *Número de devolución* | | |

2. **Ejecución.** Envía los casos D1 a D7 por la URL de prueba del formulario, uno por ejecución, como ocurrirá en producción. La D8 no se puede elegir en la lista del formulario: pruébala fijando los datos del trigger (*pin data*) y editando el `motivo`. Anota el resultado obtenido y el `id_ejecucion` de cada caso. Después de cada corrección, vuelve a correr todos los casos, no solo el que falló.
3. **Evidencia.** En el historial de ejecuciones, filtra por workflow y captura la lista con tus ejecuciones de prueba. Para al menos un caso de revisión manual, abre su ejecución y captura cuántos ítems entraron y salieron del nodo que lo desvió.
4. **Cierre semanal.** Ejecuta el cierre con las devoluciones que crearon tus pruebas y verifica el CSV, el XML (un `<retiro>` por cada devolución que requiere retiro) y el estado de las devoluciones después de leer la confirmación. Si tus devoluciones de prueba tienen más de 7 días, el resumen para finanzas sale vacío: borra las filas de prueba (primero las de `log_devoluciones`) y vuelve a enviar los casos antes de ejecutar el cierre.
5. **Nota de depuración.** Describe al menos una falla que encontraste mientras construías: el síntoma, cómo la detectaste (qué herramienta de n8n usaste), la causa, la corrección y la prueba que confirma que quedó resuelta.
6. **Orden del workspace.** Nombra los workflows "MA · Registro de devoluciones" y "MA · Cierre semanal de devoluciones", agrégales las etiquetas `mercado-austral` y `devoluciones`, renombra cada nodo por lo que hace ("Buscar pedido", no "Supabase1") y deja una nota en el canvas que explique qué motivo va a cada salida del Switch, por qué sus reglas no se pisan, a dónde va lo que no calza (salida de respaldo) y de dónde sale la configuración.

### Insumos

#### Datos del proceso actual

Son supuestos del caso ficticio, para calcular el costo y el retorno de la Parte 1.

| Dato | Valor |
| --- | --- |
| Devoluciones al mes | 60 |
| Gestión manual de cada devolución (leer el correo, buscar el pedido, registrar y avisar al área) | 15 minutos de la asistente |
| Devoluciones mal registradas | 1 de cada 10 |
| Corrección de cada devolución mal registrada | 20 minutos más de la asistente |
| Cierre del viernes (resumen para finanzas y lista de retiros) | 1,5 horas de la asistente por semana; el mes tiene 4 semanas |
| Costo de una hora de la asistente para la empresa | $7.000 |
| Devoluciones que seguirán necesitando a una persona después de automatizar (revisión manual o aprobación) | 12 al mes, con 10 minutos de la asistente cada una |
| Construcción, pruebas y puesta en producción de la solución por una persona técnica externa, una sola vez | $360.000 |
| Mantención de la solución | 2 horas-persona al mes de la misma persona técnica, a $12.000 la hora |
| Herramientas: la parte del plan de n8n y de Supabase que se asigna a este proceso | $35.000 al mes |

#### Script para Supabase

Ejecútalo en el editor SQL de tu proyecto. Si tu tabla `pedidos` ya tiene más columnas (por ejemplo, las que agregaste en los ABPRO), el script funciona igual mientras esas columnas acepten valores nulos o tengan un valor por defecto.

```sql
-- 1. La tabla pedidos del curso (solo se crea si tu proyecto aún no la tiene)
create table if not exists pedidos (
  id              bigint generated always as identity primary key,
  creado_en       timestamptz not null default now(),
  nombre          text not null,
  email           text not null,
  comuna          text not null,
  tipo_cliente    text not null check (tipo_cliente in ('minorista', 'mayorista')),
  producto        text not null,
  cantidad        integer not null check (cantidad > 0),
  precio_unitario integer not null,
  total           integer not null
);

-- 2. Estado del pedido, que el registro de devoluciones actualiza
alter table pedidos add column if not exists estado text not null default 'registrado';

-- 3. Seis pedidos de prueba con id fijo (901 a 906)
insert into pedidos (id, creado_en, nombre, email, comuna, tipo_cliente, producto, cantidad, precio_unitario, total)
overriding system value
values
  (901, '2026-10-05 10:12:00-03', 'Ana Rojas',            'ana.rojas@correo.test',    'Ñuñoa',      'minorista', 'Café en grano 1 kg', 2, 12500,  25000),
  (902, '2026-10-05 16:40:00-03', 'Minimarket Doña Rosa', 'rosa@donarosa.test',       'Maipú',      'mayorista', 'Arroz 25 kg',        8, 24500, 196000),
  (903, '2026-10-06 09:05:00-03', 'Pedro Soto',           'pedro.soto@correo.test',   'Maipú',      'minorista', 'Té verde 100 u',     2,  4200,   8400),
  (904, '2026-10-06 11:30:00-03', 'Almacén El Sol',       'compras@elsol.test',       'Temuco',     'mayorista', 'Azúcar 25 kg',       2, 21900,  43800),
  (905, '2026-10-07 13:15:00-03', 'Camila Pérez',         'camila.perez@correo.test', 'Valparaíso', 'minorista', 'Aceite 5 L',         4, 15990,  63960),
  (906, '2026-10-07 18:20:00-03', 'Jorge Muñoz',          'jorge.munoz@correo.test',  'Ñuñoa',      'minorista', 'Yerba mate 1 kg',    3,  6900,  20700)
on conflict (id) do nothing;

-- Para que los próximos pedidos sigan numerándose después del mayor id cargado
select setval(pg_get_serial_sequence('pedidos', 'id'), (select max(id) from pedidos));

-- 4. Devoluciones: cada una apunta a su pedido
create table devoluciones (
  id                  bigint generated always as identity primary key,
  creado_en           timestamptz not null default now(),
  pedido_id           bigint not null references pedidos (id),
  email               text not null,
  motivo              text not null check (motivo in ('producto dañado', 'error de despacho', 'arrepentimiento')),
  area                text not null check (area in ('calidad', 'bodega', 'atencion_cliente')),
  comentario          text,
  total_pedido        integer not null,  -- foto del pedido al momento de la devolución:
  comuna              text not null,     -- el monto que se evaluó y la comuna del retiro
  requiere_aprobacion boolean not null,
  requiere_retiro     boolean not null,
  recibido_en         timestamptz,       -- cuándo llegó la solicitud (lo calcula el workflow)
  estado              text not null default 'registrada'
                      check (estado in ('registrada', 'retiro_programado', 'cerrada')),
  fecha_retiro        date
);

-- 5. Registro de cada ejecución, con su ruta
create table log_devoluciones (
  id             bigint generated always as identity primary key,
  creado_en      timestamptz not null default now(),
  id_ejecucion   text not null,
  workflow       text not null,
  pedido_id      bigint,  -- sin clave foránea: también se registran pedidos que no existen
  devolucion_id  bigint references devoluciones (id),
  ruta           text not null,
  detalle        text
);
```

`total_pedido` y `comuna` se copian a propósito: son la foto del pedido que justificó la decisión (el monto que se comparó con el umbral y la comuna donde se retira). El resto de los datos del pedido se obtiene por la clave foránea. Para repetir las pruebas desde cero, borra primero las filas de `log_devoluciones` y después las de `devoluciones`: la clave foránea no deja borrar una devolución que el registro todavía apunta. Los pedidos no se borran.

#### Devoluciones de prueba

| Caso | `pedido_id` | `email` (como lo escribe el cliente) | `motivo` | `comentario` |
| --- | :-: | --- | --- | --- |
| D1 | 901 | ana.rojas@correo.test | producto dañado | El paquete de café llegó roto. |
| D2 | 906 | Jorge.Munoz@Correo.TEST | error de despacho | Pedí yerba mate y llegó té verde. |
| D3 | 903 | pedro.soto@correo.test | arrepentimiento | Compré de más. |
| D4 | 905 | camila.perez@correo.test | producto dañado | Dos bidones llegaron abollados y con filtración. |
| D5 | 904 | compras@elsol.test | arrepentimiento | Nos equivocamos de producto al hacer el pedido. |
| D6 | 902 | compras@elsol.test | error de despacho | Llegó arroz integral en vez de arroz blanco. |
| D7 | 915 | ana.rojas@correo.test | producto dañado | El pedido llegó incompleto. |
| D8 | 902 | rosa@donarosa.test | producto vencido (no está en la lista: se prueba con datos fijados) | Dos sacos venían con la fecha vencida. |

#### Formato del archivo de retiros

Así pide Transportes Cordillera el archivo XML: un elemento `<retiro>` por cada devolución que requiere retiro. El `devolucion_id` es el que asignó tu base de datos.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<retiros>
  <retiro>
    <devolucion_id>12</devolucion_id>
    <pedido_id>901</pedido_id>
    <nombre>Ana Rojas</nombre>
    <comuna>Ñuñoa</comuna>
    <producto>Café en grano 1 kg</producto>
    <motivo>producto dañado</motivo>
  </retiro>
</retiros>
```

#### Confirmación del transportista (`confirmacion_retiros.json`)

```json
{
  "transportista": "Transportes Cordillera",
  "archivo": "retiros_semana.xml",
  "respondido_en": "2026-10-19T08:30:00-03:00",
  "retiros": [
    { "pedido_id": 901, "comuna": "Ñuñoa",      "estado": "programado",    "fecha_retiro": "2026-10-20", "franja": "09:00-13:00" },
    { "pedido_id": 906, "comuna": "Ñuñoa",      "estado": "programado",    "fecha_retiro": "2026-10-20", "franja": "14:00-18:00" },
    { "pedido_id": 905, "comuna": "Valparaíso", "estado": "programado",    "fecha_retiro": "2026-10-21", "franja": "09:00-13:00" },
    { "pedido_id": 904, "comuna": "Temuco",     "estado": "sin_cobertura", "fecha_retiro": null,         "franja": null,
      "observacion": "Sin retiros en Temuco esta semana; volver a solicitar." }
  ]
}
```

### Condiciones

- **Es individual.** Puedes consultar las lecturas del módulo, la documentación oficial de n8n y de Supabase y preguntar en el foro, pero sin compartir tu solución.
- **Solo datos ficticios.** Trabaja con los datos de Insumos, con correos de dominio `.test`. No uses datos de personas ni de empresas reales.
- **Ninguna credencial ni clave en la entrega.** Ni la clave de servicio de Supabase ni otra clave o token pueden aparecer en un parámetro, en el nodo "Configuración", en los datos fijados, en el informe o en una captura. El workflow exportado guarda el nombre de la credencial, no la clave, pero los datos fijados sí se exportan: revisa el archivo antes de subirlo.
- **Puedes reutilizar lo que construiste en el módulo**, por ejemplo la credencial de Supabase, la normalización de «{{abpro AE2}}», el cruce con Merge de «{{abpro AE3}}» o los registros de «{{abpro AE4}}». Indica en el informe qué reutilizaste y qué cambiaste.
- **Versiones de n8n.** Algunos botones y opciones cambian de nombre entre versiones. Si en la tuya algo se llama distinto, usa el equivalente y anótalo en el informe.

### Entrega

Sube a la Tarea del LMS, en una sola entrega:

1. `informe-devoluciones.pdf`, con la propuesta (Parte 1), el plan de pruebas con resultados esperados y obtenidos, la nota de depuración, lo que reutilizaste y las capturas: las tablas `devoluciones` y `log_devoluciones` con las filas de prueba, el historial de ejecuciones, la ejecución de un caso de revisión manual y el canvas de los dos workflows.
2. Los dos workflows exportados en JSON (menú del workflow, *Download*): `registro-devoluciones.json` y `cierre-semanal-devoluciones.json`.
3. Los archivos que generó el cierre semanal: `devoluciones_semana.csv` y `retiros_semana.xml`.

### Cómo se evalúa

La pauta tiene una sección por cada componente de la competencia del módulo. Cada fila se asigna completa si se cumple, a la mitad si se cumple en parte y en cero si no está. El tutor/a importa tus workflows en su propia instancia, con sus tablas del insumo, y ejecuta algunos de tus casos de prueba.

| Componente de la competencia | Qué se revisa | Puntos |
| --- | --- | :-: |
| **{{competencia: para resolver problemáticas empresariales}}** | *Parte 1* | **6** |
| | Costo actual, ahorro neto, ROI a 12 meses y plazo de recuperación, calculados con los datos del caso y con el cálculo a la vista | 2 |
| | Por qué el proceso conviene automatizarlo y su descripción como workflow (inicio, pasos y resultado); tres beneficios concretos, uno que no se mide en dinero, y el caso de uso empresarial al que corresponde | 1 |
| | Comparación con Zapier y Make en los tres criterios pedidos, con fuentes y fecha de consulta, y una recomendación para el caso | 2 |
| | Diagrama con nodos, conexiones, credenciales, tablas y ejecuciones, y lista de nodos clasificada por tipo | 1 |
| **{{competencia: crear workflows básicos de automatización utilizando n8n}}** | *Partes 2, 3 y 4* | **8** |
| | Form Trigger con los cuatro campos, sus tipos y su obligatoriedad; dos Form Ending: número de devolución y aviso de revisión manual sin datos del pedido | 2 |
| | "Registro de devoluciones" con la estructura trigger, procesar y ejecutar, que se ejecuta sin errores desde la URL de prueba | 2 |
| | "Cierre semanal" con sus dos Schedule Trigger (viernes y lunes) y la zona horaria revisada | 2 |
| | Workspace ordenado: nombres y etiquetas de los workflows, nodos renombrados, nota en el canvas; los JSON se importan sin errores | 2 |
| **{{competencia: manipulando datos mediante nodos fundamentales}}** | *Partes 2 y 3* | **10** |
| | Normalización con Edit Fields: `pedido_id` Number, `email` y `motivo` sin espacios y en minúsculas, fecha de recepción | 2 |
| | Expresiones que leen datos de otros nodos (`$('…')`) y calculan `requiere_retiro` y el rango de fechas de la semana | 2 |
| | Summarize por motivo (cantidad y monto) y CSV para finanzas con los nombres de campo pedidos | 2 |
| | Filter de retiros; Merge por campo en común sin ítems duplicados ni choque de `id` o `estado`; un solo XML con un `<retiro>` por devolución (Aggregate y nodo XML) | 2 |
| | Confirmación del transportista leída como JSON y separada con Split Out; umbral, monto mínimo y tablas en variables o en el nodo "Configuración" | 2 |
| **{{competencia: integrando bases de datos básicas}}** | *Partes 2 y 3* | **8** |
| | Script ejecutado: `devoluciones` con clave foránea a `pedidos`, `log_devoluciones` y los seis pedidos de prueba | 2 |
| | *Get a row* del pedido por `id`, con *Always Output Data* para detectar el pedido inexistente | 2 |
| | *Create a row* en `devoluciones` y en `log_devoluciones` con los tipos correctos, incluidos `total_pedido` y `comuna` del pedido | 2 |
| | *Update a row* del pedido (`estado`) y de las devoluciones con retiro programado (`estado` y `fecha_retiro`) | 2 |
| **{{competencia: de acuerdo con buenas prácticas de automatización}}** | *Partes 2 y 4* | **8** |
| | Regla `requiere_aprobacion` con `||`, que marca D4 por monto y D5 por ser mayorista | 1 |
| | Switch con tres rutas y salida de respaldo; pedido inexistente y correo que no coincide a revisión manual, con su detalle | 2 |
| | Toda ejecución deja una fila en `log_devoluciones` con ruta e `id_ejecucion`; el error al registrar se maneja con la salida de error | 2 |
| | Plan de pruebas con 8 casos o más, resultado esperado y obtenido, ejecutados con la URL de prueba y con datos fijados, con evidencia en el historial | 2 |
| | Nota de depuración completa: síntoma, detección, causa, corrección y prueba | 1 |
| | **Total** | **40** |

**Nota** (exigencia 60 %): si el puntaje *p* es mayor o igual que 24, nota = 4,0 + 3 × (*p* − 24) / 16; si es menor, nota = 1,0 + 3 × *p* / 24. Se redondea a un decimal. Por ejemplo: 20 puntos, 3,5; 24 puntos, 4,0; 32 puntos, 5,5; 40 puntos, 7,0.

### Contenidos del plan que integra esta actividad

| Parte de la actividad | Contenidos del plan |
| --- | --- |
| Parte 1, pasos 1 a 3: costo, retorno, por qué automatizar y beneficios del cambio | {{c:CONCEPTOS FUNDAMENTALES DE WORKFLOW AUTOMATION}}<br>{{c:CASOS DE USO EMPRESARIALES}}<br>{{c:BENEFICIOS Y ROI}} |
| Parte 1, pasos 4 a 6: por qué n8n, diagrama de la solución y lista de nodos | {{c:ARQUITECTURA DE N8N}}<br>{{c:COMPONENTES PRINCIPALES}}<br>{{c:DIFERENCIAS CON OTRAS PLATAFORMAS}}<br>{{c:ECOSISTEMA DE NODOS}} |
| Parte 2, pasos 1 a 3: tablas, credencial, formulario y configuración | {{c:INTEGRACIÓN CON BASES DE DATOS}}<br>{{c:SUPABASE: CONFIGURACIÓN BÁSICA}}<br>{{c:EDITOR VISUAL}}<br>{{c:PRIMEROS WORKFLOWS}}<br>{{c:CONFIGURACIÓN DE NODOS BÁSICOS}}<br>{{c:VARIABLES DE ENTORNO}} |
| Parte 2, pasos 4 a 7: normalizar, buscar el pedido, casos borde y armar la devolución | {{c:SET: MODIFICACIÓN DE DATOS}}<br>{{c:MANIPULACIÓN DE DATOS}}<br>{{c:EXPRESIONES N8N}}<br>{{c:PANEL DE CONFIGURACIÓN}}<br>{{c:MANEJO DE CASOS EDGE}}<br>{{c:OPERADORES Y EXPRESIONES COMPLEJAS}} |
| Parte 2, pasos 8 a 11: enrutar, registrar, dejar rastro y responder | {{c:ESTRUCTURA TRIGGER, PROCESAR Y EJECUTAR}}<br>{{c:IF/SWITCH}}<br>{{c:ROUTING DE DATOS}}<br>{{c:OPERACIONES CRUD}}<br>{{c:MANEJO DE DATOS RELACIONALES}}<br>{{c:LOGS Y TRAZABILIDAD}} |
| Parte 3, pasos 1 a 6: resumen para finanzas y archivo de retiros | {{c:FILTER}}<br>{{c:SUMMARIZE}}<br>{{c:MERGE}}<br>{{c:TRANSFORMACIÓN DE FORMATOS}}<br>{{c:MANEJO DE ARRAYS Y OBJETOS}} |
| Parte 3, pasos 7 a 9: confirmación del transportista y actualización | {{c:SPLIT}}<br>{{c:OPERACIONES CRUD}}<br>{{c:LOGS Y TRAZABILIDAD}} |
| Parte 4: pruebas, depuración y orden del workspace | {{c:TESTING Y DEBUGGING INICIAL}}<br>{{c:HERRAMIENTAS DE DEBUG EN N8N}}<br>{{c:MEJORES PRÁCTICAS DE TESTING}}<br>{{c:WORKSPACE Y NAVEGACIÓN}} |

### Después de entregar

1. **Autoevaluación del módulo 2.** Al entregar, comparas cómo te veías al comenzar el módulo con cómo te ves hoy y revisas tu actividad final frente a la competencia del módulo.
2. **Retroalimentación del tutor/a.** Recibes tu puntaje por componente de la competencia, con una fortaleza, una mejora y un siguiente paso.
3. **Coevaluación por pares.** El tutor/a te asigna un compañero/a y te hace llegar por el LMS sus workflows y su informe: importas los workflows en tu instancia, los pruebas con tus propias tablas del insumo y le devuelves una retroalimentación con evidencia. Él o ella hace lo mismo con los tuyos.
4. **Portafolio.** Esta actividad es la evidencia de integración de tu portafolio «Automatizaciones para Mercado Austral». Ahí explicas cómo se conecta con lo que construiste durante el módulo.

## 04 · Autoevaluación del módulo 2
- **Archivo:** M2-04-Autoevaluacion
- **Rótulo:** Evaluación y cierre del módulo · cierre
- **Momento:** Al entregar la actividad final, antes de publicar el portafolio
- **Modalidad:** Individual
- **Calificación:** No lleva nota; va en tu portafolio
- **Vínculo con el plan:** Los cuatro aprendizajes esperados con sus criterios de evaluación, y la competencia del módulo

### Para qué sirve

Esta autoevaluación te ayuda a mirar tu avance con evidencia. Comparas cómo te veías al comenzar el módulo (la Parte B de la diagnóstica) con cómo te ves hoy, revisas tu actividad final frente a la competencia del módulo, valoras tu trabajo en los ABPRO y defines qué vas a mejorar. No lleva nota: sirve si es honesta. Va a tu portafolio, en el cierre.

### La escala

Es la misma de la diagnóstica, para que puedas comparar:

| Nivel | Significa | Ejemplo en este módulo |
| :-: | --- | --- |
| 1 | Aún no lo sé hacer | No sé por dónde empezar para dejar un correo en minúsculas dentro de un workflow |
| 2 | Lo hago con ayuda | Normalizo el correo si sigo la lectura o si me ayuda un compañero/a |
| 3 | Lo hago solo/a, con dudas | Escribo la expresión, pero no estoy seguro/a de que funcione con todos los casos |
| 4 | Lo hago solo/a y puedo explicarlo | Escribo `{{ $json.email.trim().toLowerCase() }}` y explico por qué va antes de comparar o de agrupar |

### Parte 1 · Tus aprendizajes, criterio por criterio

Para cada aprendizaje esperado, la tabla trae sus criterios de evaluación tal como están en el plan y los títulos de su ABP y su ABPRO.

- **Al inicio:** copia el número que marcaste en la Parte B de la evaluación diagnóstica.
- **Hoy:** marca de 1 a 4 cómo te ves ahora.
- **¿Qué trabajo tuyo lo demuestra?:** nombra una evidencia concreta, por ejemplo "ABP «{{abp AE4}}», punto 5: registro de depuración" o "Actividad final, parte 2, paso 8: Switch con salida de respaldo". Si no encuentras evidencia, tu nivel de hoy probablemente es más bajo del que pensabas.

{{tabla-autoevaluacion}}

### Parte 2 · Tu actividad final frente a la competencia del módulo

La competencia del módulo es: *{{competencia}}* La pauta de la actividad final «Devoluciones sin correo en Mercado Austral» la divide en cinco componentes. Marca cómo te fue en cada uno y di qué parte de tu entrega lo demuestra.

| Componente de la competencia | Lo logré | En parte | Aún no | Qué lo demuestra |
| --- | :-: | :-: | :-: | --- |
| **{{competencia: para resolver problemáticas empresariales}}**<br>Mi propuesta calcula el costo actual, el ROI y el plazo de recuperación con los datos del caso, y justifica n8n frente a Zapier y Make con fuentes | | | | |
| **{{competencia: crear workflows básicos de automatización utilizando n8n}}**<br>Mis dos workflows se importan y se ejecutan sin errores, cada uno con el trigger que corresponde a su proceso | | | | |
| **{{competencia: manipulando datos mediante nodos fundamentales}}**<br>Normalicé y declaré los tipos de los datos, resumí por motivo en CSV y armé un solo XML de retiros sin duplicar ítems | | | | |
| **{{competencia: integrando bases de datos básicas}}**<br>Leí, creé y actualicé filas en Supabase respetando la clave foránea entre `devoluciones` y `pedidos` | | | | |
| **{{competencia: de acuerdo con buenas prácticas de automatización}}**<br>Ninguna devolución se pierde en silencio, cada ejecución queda en el registro y probé todas las rutas con un plan de pruebas | | | | |

### Parte 3 · Tu trabajo en los ABPRO

Para cada ABPRO, anota el rol que asumiste y valora tu aporte al equipo: 1 = aporté poco; 2 = aporté cuando me lo pidieron; 3 = cumplí mi rol completo; 4 = cumplí mi rol y ayudé a que el equipo lo lograra.

| ABPRO | Rol que asumiste | Tu aporte (1 a 4) | Comentario: qué hiciste tú y qué harías distinto |
| --- | --- | :-: | --- |
| Aprendizaje esperado 1 · **{{abpro AE1}}**<br>*Roles:* coordinador/a, analista de procesos, especialista n8n, documentador/a, portavoz | | | |
| Aprendizaje esperado 2 · **{{abpro AE2}}**<br>*Roles:* coordinador/a, constructor/a del trigger y la confirmación, constructor/a del procesamiento, responsable de pruebas, documentador/a y portavoz | | | |
| Aprendizaje esperado 3 · **{{abpro AE3}}**<br>*Roles:* coordinador/a, responsable de datos, constructor/a de la transformación, constructor/a de las expresiones, documentador/a y portavoz | | | |
| Aprendizaje esperado 4 · **{{abpro AE4}}**<br>*Roles:* coordinador/a, responsable de reglas, responsable de trazabilidad, cazador/a de fallas, documentador/a y portavoz | | | |

### Parte 4 · Reflexión

Responde cada pregunta en 3 a 6 líneas.

1. En la diagnóstica, ¿en qué contenido te fue mejor y en cuál peor? ¿Coincide con el criterio en que más subiste entre «Al inicio» y «Hoy»?
2. ¿Qué error de datos te costó más encontrar en el módulo (un espacio de más, un número guardado como texto, un campo escrito con mayúscula, un Merge que multiplicaba ítems) y qué harías hoy para detectarlo antes?
3. En la actividad final, ¿qué decisión tomaste que no estaba escrita en el enunciado y por qué? Por ejemplo, el orden de los If, cómo resolviste el choque de campos en el Merge o qué ve el cliente cuando su solicitud va a revisión manual.
4. Si Mercado Austral te pidiera automatizar mañana otro proceso, como los reclamos o la reposición de stock, ¿qué harías igual que en las devoluciones y qué harías distinto?
5. ¿Qué retroalimentación recibida durante el módulo, del tutor/a o de un compañero/a en los ABP y ABPRO, cambió tu forma de trabajar, y en qué se nota en tus workflows?

### Parte 5 · Tu plan de mejora

Elige dos o tres criterios de evaluación: los de menor nivel en «Hoy» o aquellos en que tu autoevaluación y la retroalimentación del tutor/a en tus ABP y ABPRO no coinciden. Para cada uno, una acción concreta que puedas comprobar.

| Criterio por mejorar (número) | Acción concreta | Recurso del módulo | Cuándo |
| --- | --- | --- | --- |
| *3.3* | *Rehacer las expresiones de "Normalizar devolución" y probarlas con las ocho devoluciones de prueba, mirando la vista previa de cada una* | *Lectura «Datos en movimiento», sección Expresiones; video interactivo «Expresiones y depuración»* | *Antes de publicar el portafolio* |
| | | | |
| | | | |

## 05 · Coevaluación por pares
- **Archivo:** M2-05-Coevaluacion-por-pares
- **Rótulo:** Evaluación y cierre del módulo · cierre
- **Momento:** Parte A, después de entregar la actividad final; Parte B, al cerrar cada ABPRO
- **Modalidad:** Parte A en parejas que asigna el tutor/a; Parte B dentro de cada equipo de ABPRO
- **Calificación:** No pones nota a tu compañero/a: el tutor/a valora la calidad de tu retroalimentación
- **Vínculo con el plan:** La competencia del módulo y los ABPRO de los cuatro aprendizajes esperados

### Para qué sirve

Revisar el trabajo de otra persona es una de las mejores formas de aprender: ves otra solución al mismo problema, detectas errores que también podrías cometer y practicas lo que se hace en un equipo de automatización antes de pasar un workflow a producción. Esta coevaluación tiene dos partes: en la **Parte A** revisas la actividad final de un compañero/a, probándola de verdad; en la **Parte B** valoras el trabajo en equipo de tus compañeros/as en cada ABPRO.

### Normas

- **Respeto.** Comenta el trabajo, no a la persona. Escribe como te gustaría que te escribieran.
- **Evidencia concreta.** Cada "En parte" o "No" dice dónde lo viste: el caso de prueba, el nodo, la ejecución o la página del informe.
- **No copies soluciones.** No tomes partes del trabajo de tu compañero/a para tu entrega ni le entregues tu workflow completo como respuesta: sugiere qué revisar.
- **Credenciales y claves.** No pidas ni uses credenciales o claves ajenas. Pruebas siempre en tu instancia de n8n, con tu propia credencial y tu propio Supabase.
- **Datos ficticios.** Pruebas solo con los datos del insumo del curso.

### Parte A · Revisión cruzada de la actividad final

**Cómo revisar**

1. Descarga los dos workflows exportados de tu compañero/a y su informe, que el tutor/a te hace llegar por el LMS (en la Tarea de la actividad final, cada participante ve solo su propia entrega).
2. En tu n8n, importa cada workflow en un workflow nuevo (*Import from File*). Quedan inactivos: no los actives, porque el cierre semanal tiene triggers programados.
3. Si en tu Supabase tienes las tablas y los pedidos de prueba del insumo (los creaste para tu propia actividad final), abre cada nodo Supabase y elige **tu propia** credencial. Si no los tienes, no ejecutes: revisa el canvas, la configuración de los nodos y el informe, y anótalo.
4. Revisa la configuración: si tu compañero/a usó `$env` o `$vars` con valores que tu instancia no tiene, crea los mismos valores o ajusta el nodo "Configuración" de tu copia, y anótalo.
5. Ejecuta al menos D1, D2, D4, D5, D6 y D8 (D1 y D2, dos rutas normales, la segunda con el correo en mayúsculas; D4 y D5, las dos aprobaciones; D6 y D8, dos revisiones manuales), por la URL de prueba o con datos fijados, y compara con el resultado esperado de su plan de pruebas.
6. Ejecuta el cierre semanal y abre el CSV y el XML que genera.
7. Lee su informe: el cálculo del costo y del ROI, y la comparación de plataformas.
8. Busca claves en el JSON exportado: busca `eyJ` y `sb_secret_` (así empiezan las claves de Supabase), `token` y `apikey`, e ignora `keyName` y `keyValue`, que son los filtros del nodo Supabase. Revisa también el nodo de configuración, los datos fijados y las capturas. Si encuentras una clave, avísale solo a tu compañero/a y al tutor/a, por mensaje privado, nunca en el foro.
9. Al terminar, borra de tu instancia la copia de sus workflows y, si quieres, las filas que crearon sus pruebas en tus tablas (primero las de `log_devoluciones`, que apuntan a las devoluciones).

**Qué comprobar**

| Componente de la competencia y comprobación | Sí | En parte | No | Evidencia o comentario |
| --- | :-: | :-: | :-: | --- |
| **{{competencia: para resolver problemáticas empresariales}}** | | | | |
| El costo actual, el ROI y el plazo de recuperación usan los datos del caso y el cálculo se puede seguir paso a paso | | | | |
| La elección de n8n frente a Zapier y Make se apoya en criterios del caso y cita fuentes con fecha | | | | |
| **{{competencia: crear workflows básicos de automatización utilizando n8n}}** | | | | |
| Los dos workflows se importan sin errores y tienen el trigger que corresponde: formulario; programado los viernes y los lunes | | | | |
| Los nodos tienen nombres que dicen lo que hacen y una nota en el canvas explica las salidas del Switch y de dónde sale la configuración | | | | |
| El formulario responde con el número de devolución o con el aviso de revisión manual | | | | |
| **{{competencia: manipulando datos mediante nodos fundamentales}}** | | | | |
| El correo de D2 queda en minúsculas y `total_pedido` se guarda como número | | | | |
| El CSV agrupa por motivo y el XML trae un `<retiro>` por cada devolución que requiere retiro | | | | |
| El Merge no duplica ítems y el `id` que llega al XML es el de la devolución | | | | |
| **{{competencia: integrando bases de datos básicas}}** | | | | |
| Cada devolución válida crea una fila en `devoluciones` con su `pedido_id`, y el pedido queda con su `estado` actualizado | | | | |
| Después de leer la confirmación, las devoluciones programadas quedan en `retiro_programado` con fecha, y la de Temuco sigue en `registrada` | | | | |
| **{{competencia: de acuerdo con buenas prácticas de automatización}}** | | | | |
| D6 y D8 van a revisión manual con su detalle, y D5 requiere aprobación aunque su total sea menor que $50.000 | | | | |
| Cada ejecución deja una fila en `log_devoluciones` con ruta e `id_ejecucion`, y ese id se encuentra en el historial | | | | |
| No hay claves ni credenciales en el JSON exportado, en los datos fijados ni en las capturas | | | | |

**Cierre de tu revisión.** Escribe, con evidencia:

- **Una fortaleza:** con el nodo o la decisión concreta que la muestra.
- **Una mejora:** con la comprobación que no se cumplió y cómo la viste.
- **Un siguiente paso:** qué cambiar y con qué caso volver a probar.

> *Ejemplo.* *Fortaleza:* tu If "¿Coincide el correo?" compara los correos ya normalizados; por eso D2 llega a bodega aunque el cliente escribió con mayúsculas. *Mejora:* D8 terminó sin fila en `log_devoluciones`: la salida de respaldo del Switch no está conectada al registro. *Siguiente paso:* conéctala al mismo nodo de registro que usan los If y vuelve a probar D8 con datos fijados.

### Parte B · Trabajo en equipo en los ABPRO

La completas al cerrar cada ABPRO, una vez por ABPRO:

- Aprendizaje esperado 1: «{{abpro AE1}}»
- Aprendizaje esperado 2: «{{abpro AE2}}»
- Aprendizaje esperado 3: «{{abpro AE3}}»
- Aprendizaje esperado 4: «{{abpro AE4}}»

Valora a cada integrante de tu equipo, sin incluirte (tu propio aporte va en la autoevaluación), con esta escala: 1 = casi nunca; 2 = a veces; 3 = casi siempre; 4 = siempre, y además ayuda a que el equipo lo logre. El comentario es obligatorio si pones 1 o 2: di qué pasó y qué ayudaría.

| Criterio | Integrante 1 | Integrante 2 | Integrante 3 | Integrante 4 |
| --- | :-: | :-: | :-: | :-: |
| Nombre y rol en este ABPRO | | | | |
| Cumple su rol (por ejemplo, quien es responsable de pruebas deja el plan con resultado esperado y obtenido; quien es responsable de trazabilidad configura los registros) | | | | |
| Aporta ideas y soluciones | | | | |
| Respeta acuerdos y plazos | | | | |
| Se comunica con respeto | | | | |
| Ayuda a encontrar y corregir errores del workflow del equipo | | | | |
| Comentario (obligatorio si pusiste 1 o 2) | | | | |

Tus respuestas de la Parte B las ve solo el tutor/a.

### Entrega

- **Parte A.** Sube la tabla «Qué comprobar» completa y el cierre de tu revisión a la Tarea «Coevaluación de la actividad final». El tutor/a la revisa y se la hace llegar a tu compañero/a.
- **Parte B.** Al cerrar cada ABPRO, súbela a la Tarea «Coevaluación del ABPRO» que acompaña a ese ABPRO. Solo la ve el tutor/a.

### Qué hace el tutor/a con la coevaluación

- **Modera.** Revisa los comentarios de la Parte A antes de que lleguen a su destinatario/a. Si alguno no respeta las normas, lo conversa con quien lo escribió.
- **Valora tu retroalimentación**, no el trabajo de tu compañero/a:

| Aspecto | Lo que se espera |
| --- | --- |
| Evidencia | Cada "En parte" o "No" dice dónde lo viste: caso de prueba, nodo, ejecución o página del informe |
| Precisión técnica | Usa bien los términos (ítem, ejecución, salida de respaldo, clave foránea) y distingue el síntoma de la causa |
| Utilidad | La mejora y el siguiente paso se pueden hacer sin tener que preguntarte nada más |
| Respeto | Habla del trabajo, no de la persona |

- **Consolida la Parte B** por equipo y devuelve a cada participante un resumen sin nombres: en qué criterios lo ven fuerte y en cuál puede crecer.
- **Tú la usas en tu portafolio.** En el cierre cuentas qué te dijeron en la Parte A y en el resumen de la Parte B, y qué cambiaste a partir de eso.

## 06 · Evaluación final del portafolio
- **Archivo:** M2-06-Evaluacion-final-portafolio
- **Rótulo:** Evaluación y cierre del módulo · cierre
- **Momento:** Al cierre del módulo, después de la actividad final, la autoevaluación y la coevaluación
- **Modalidad:** Individual, publicado en la web con un enlace que se abre sin iniciar sesión, en la plataforma que indique el curso (por ejemplo, Google Sites o GitHub Pages)
- **Calificación:** Rúbrica de 32 puntos, exigencia 60 %
- **Vínculo con el plan:** Los cuatro aprendizajes esperados, con sus criterios de evaluación, y la competencia del módulo

### Qué es tu portafolio del módulo 2

Tu portafolio es un sitio web propio que reúne lo que construiste en el módulo, con tus explicaciones: qué problema resolviste, cómo lo hiciste y qué aprendiste. Su nombre sugerido es **«Automatizaciones para Mercado Austral»**. Lo lee el tutor/a para evaluar el módulo, pero piénsalo también para alguien que te podría contratar: tiene que entenderse sin haber hecho el curso. Lo retomarás en el módulo «Desarrollo de portafolio para especialidades» del plan.

El portafolio no repite las entregas: las ordena, las explica y muestra el recorrido desde tu punto de partida hasta la actividad final.

### Cómo se organiza

#### 1 · Índice o guía

La página de inicio. Enlaza cada sección e indica qué tipo de trabajo es, qué evidencia contiene y con qué estrategia didáctica lo trabajaste. Usa este modelo:

| Sección | Tipo de trabajo | Evidencia | Estrategia didáctica |
| --- | --- | --- | --- |
| Introducción | Reflexión inicial | Punto de partida desde la diagnóstica y un proceso de tu entorno | Metacognición |
| Aprendizaje esperado 1 | Análisis de casos | ABP «{{abp AE1}}» y ABPRO «{{abpro AE1}}» | Aprendizaje basado en problemas (individual) y en proyectos (en equipo, con roles) |
| Aprendizaje esperado 2 | Producto técnico | ABP «{{abp AE2}}» y ABPRO «{{abpro AE2}}» | Aprendizaje basado en problemas y en proyectos |
| Aprendizaje esperado 3 | Producto técnico | ABP «{{abp AE3}}» y ABPRO «{{abpro AE3}}» | Aprendizaje basado en problemas y en proyectos |
| Aprendizaje esperado 4 | Producto técnico y registro de depuración | ABP «{{abp AE4}}» y ABPRO «{{abpro AE4}}» | Aprendizaje basado en problemas y en proyectos |
| Integración | Caso integrador | Actividad final «Devoluciones sin correo en Mercado Austral» | Resolución de un caso de la empresa |
| Cierre | Síntesis | Autoevaluación comparada, coevaluación recibida y próximo paso | Metacognición y aprendizaje colaborativo |

#### 2 · Introducción

- **Intención:** qué querías lograr en este módulo y para qué te sirve en tu trabajo o en el que buscas.
- **Objetivos:** los cuatro aprendizajes esperados del módulo en tus palabras, y cuál te propusiste profundizar.
- **Punto de partida:** tus aciertos por contenido en la Parte A de la diagnóstica, cómo te veías en la Parte B y un proceso de tu entorno que te gustaría automatizar.

#### 3 · Evidencias por aprendizaje esperado

Una subsección por aprendizaje esperado. En cada una: el aprendizaje, los números de sus criterios, como evidencia mínima su ABP y su ABPRO, y una explicación tuya de 5 a 10 líneas que diga qué hiciste, por qué lo hiciste así y qué criterio muestra cada parte. En los ABPRO, sube la entrega del equipo e indica tu rol y qué parte hiciste tú.

##### Aprendizaje esperado 1

> {{AE1}}

- **Criterios de evaluación:**
  - 1.1 {{1.1}}
  - 1.2 {{1.2}}
  - 1.3 {{1.3}}
- **Evidencia mínima:** ABP «{{abp AE1}}»: tu análisis de Huellitas del Sur, con las tres tareas, el cálculo de horas y dinero, el workflow descrito y la tabla comparativa con fuentes. ABPRO «{{abpro AE1}}»: el mapa del proceso, la matriz de prioridad y el diseño del primer workflow de Mercado Austral.
- **Explicación:** qué tareas elegiste y con qué cálculo, cómo describiste el workflow con los componentes de n8n y qué concluiste de la comparación con Zapier y Make.

##### Aprendizaje esperado 2

> {{AE2}}

- **Criterios de evaluación:**
  - 2.1 {{2.1}}
  - 2.2 {{2.2}}
  - 2.3 {{2.3}}
- **Evidencia mínima:** ABP «{{abp AE2}}»: el workflow exportado, las capturas de *Executions* y tu explicación del error del campo escrito con mayúscula. ABPRO «{{abpro AE2}}»: el workflow del equipo, la captura de la hoja con los pedidos de prueba y el plan de pruebas con resultados esperados y obtenidos.
- **Explicación:** cómo separaste trigger, procesamiento y salida, cómo configuraste el formulario y qué te mostró cada prueba.

##### Aprendizaje esperado 3

> {{AE3}}

- **Criterios de evaluación:**
  - 3.1 {{3.1}}
  - 3.2 {{3.2}}
  - 3.3 {{3.3}}
  - 3.4 {{3.4}}
- **Evidencia mínima:** ABP «{{abp AE3}}»: el workflow que convierte el XML del proveedor, la captura de la tabla `stock_bajo` y el CSV generado. ABPRO «{{abpro AE3}}»: el workflow que cruza los pedidos con el catálogo, la captura de la tabla `reposicion`, el archivo `reposicion.json` y el control de calidad.
- **Explicación:** qué transformación hiciste entre formatos, qué expresiones usaste y por qué declaraste cada tipo, y cómo conectaste Supabase.

##### Aprendizaje esperado 4

> {{AE4}}

- **Criterios de evaluación:**
  - 4.1 {{4.1}}
  - 4.2 {{4.2}}
  - 4.3 {{4.3}}
- **Evidencia mínima:** ABP «{{abp AE4}}»: el workflow del clasificador, tu tabla de rutas predichas y obtenidas y el registro de depuración. ABPRO «{{abpro AE4}}»: los dos workflows (principal y de errores), la captura de `log_semaforo` y el registro de la caza de fallas.
- **Explicación:** cómo ordenaste las reglas y combinaste los operadores, qué casos límite controlaste y cómo encontraste la causa de una falla.

#### 4 · Integración: la actividad final

Publica la actividad final «Devoluciones sin correo en Mercado Austral»: el informe, los dos workflows exportados, el CSV y el XML generados. Explica cómo se conecta con el resto del módulo, con al menos tres ejemplos concretos de piezas de los ABP o ABPRO que reutilizaste o mejoraste (por ejemplo, la normalización del registro de pedidos, el cruce con Merge o los registros con `id_ejecucion`), y cómo la propuesta con ROI se relaciona con lo que construiste.

Explica también cómo tu actividad final demuestra la competencia del módulo: *{{competencia}}* Usa los cinco componentes de la pauta de la actividad final: «{{competencia: para resolver problemáticas empresariales}}», «{{competencia: crear workflows básicos de automatización utilizando n8n}}», «{{competencia: manipulando datos mediante nodos fundamentales}}», «{{competencia: integrando bases de datos básicas}}» y «{{competencia: de acuerdo con buenas prácticas de automatización}}». Para cada uno, señala qué parte de tu entrega lo muestra. Incluye la retroalimentación del tutor/a y lo que corregiste después.

#### 5 · Cierre

- **Tu avance:** una tabla o un gráfico con «Al inicio» y «Hoy» por criterio (de tu autoevaluación). Explica el cambio más grande y el criterio en que estás más bajo hoy, con tu plan de mejora.
- **La coevaluación:** qué te dijo tu compañero/a en la revisión de la actividad final, qué dice el resumen de tu trabajo en los ABPRO y qué cambiaste a partir de eso, con evidencia de antes y después.
- **Próximo paso:** un proceso de tu entorno que podrías automatizar con lo aprendido y el primer workflow que construirías.

#### 6 · Publicación y cuidado de datos

- **Plataforma:** la que indique el curso, por ejemplo Google Sites o GitHub Pages. El enlace debe abrirse sin iniciar sesión: pruébalo en una ventana privada del navegador.
- **Archivos:** los JSON de los workflows, el CSV y el XML van en una carpeta compartida en modo lectura para cualquier persona con el enlace o en el repositorio del sitio.
- **Cuidado de datos:** solo datos ficticios del curso. Ninguna captura, archivo ni texto muestra la clave de servicio de Supabase, otra clave o token, ni una credencial. Revisa también los datos fijados de los JSON exportados. Si una clave quedó expuesta, genera una nueva en Supabase antes de publicar.
- **Entrega:** pega el enlace del portafolio en la Tarea del LMS.

### Rúbrica de evaluación final

| Criterio | 4 · Logrado | 3 · Mayormente logrado | 2 · Parcialmente logrado | 1 · No logrado |
| --- | --- | --- | --- | --- |
| **1. Organización y completitud** | Están los seis elementos; el índice indica tipo de trabajo, evidencia y estrategia didáctica de cada sección, y todos los enlaces y archivos abren | Están los seis elementos, pero al índice le falta un dato o un enlace no abre | Falta un elemento o varios enlaces no abren | Faltan dos o más elementos, o no hay índice |
| **2. Evidencias del aprendizaje esperado 1** (1.1, 1.2, 1.3) | ABP y ABPRO completos: tareas con horas y dinero liberados (cálculo a la vista), workflow descrito con trigger, nodos, conexiones, credenciales y ejecuciones, y comparación con Zapier y Make con fuentes; la explicación los relaciona con los tres criterios | Las dos evidencias están, pero falta el cálculo, un componente de n8n o las fuentes de la comparación | Una sola evidencia, o la explicación describe sin justificar (sin números ni criterios de comparación) | Sin evidencia, o la evidencia no corresponde |
| **3. Evidencias del aprendizaje esperado 2** (2.1, 2.2, 2.3) | Los workflows del ABP y del ABPRO se importan y se ejecutan, con trigger, procesamiento y salida en tres o más nodos conectados; capturas de *Executions* y plan de pruebas con resultado esperado y obtenido; explica la depuración del campo con mayúscula | Workflows correctos, pero faltan capturas de ejecución o el plan de pruebas está incompleto | Un workflow no se ejecuta o tiene menos de tres nodos conectados | Sin workflows |
| **4. Evidencias del aprendizaje esperado 3** (3.1, 3.2, 3.3, 3.4) | El XML del proveedor se convierte, se filtra y se guarda en `stock_bajo`, con el CSV generado; la reposición cruza pedidos y catálogo con Merge y genera `reposicion.json`; tipos correctos y expresiones explicadas | Resultados correctos, pero falta una evidencia (captura de Supabase, CSV o JSON generado) o no explica una expresión | Resultados con errores visibles: grupos duplicados, números como texto, ítems multiplicados en el Merge o filas rechazadas | Sin evidencia o sin conexión con Supabase |
| **5. Evidencias del aprendizaje esperado 4** (4.1, 4.2, 4.3) | Clasificador con reglas ordenadas, expresión con `&&` y `||` y salida de respaldo; rutas predichas y obtenidas; semáforo con `log_semaforo`, workflow de errores y caza de fallas con síntoma, causa y corrección | Rutas correctas, pero falta la salida de respaldo o el registro de una falla está incompleto | Una regla envía ítems a la ruta equivocada, o la depuración corrige sin explicar causas | Sin rutas condicionales ni registro de depuración |
| **6. Integración** | Actividad final completa (propuesta, dos workflows, archivos y pruebas); explicación con al menos tres ejemplos concretos de piezas de los ABP o ABPRO que reutilizó o mejoró, y relación de la actividad final con los cinco componentes de la competencia del módulo | Actividad final completa, con una explicación general de la integración, sin ejemplos o sin relacionarla con la competencia | Actividad final incompleta (falta un workflow, las pruebas o la propuesta) o sin explicación de la integración | Sin actividad final |
| **7. Reflexión y uso de la retroalimentación** | Compara criterio por criterio la diagnóstica con la autoevaluación, explica el mayor cambio y un criterio pendiente con su plan de mejora, y muestra con evidencia qué cambió a partir de la coevaluación y de la retroalimentación del tutor/a | Compara y reflexiona, pero no muestra un cambio concreto hecho a partir de la retroalimentación | Reflexión general, sin comparar con la diagnóstica ni usar la retroalimentación | Sin reflexión |
| **8. Comunicación profesional y cuidado de datos** | Sitio claro y ordenado, textos breves, capturas legibles y nodos con nombres que dicen lo que hacen; se abre sin iniciar sesión; solo datos ficticios y ninguna clave ni credencial a la vista | Claro y seguro, con problemas menores de redacción o capturas poco legibles | Desordenado, un archivo no se puede abrir o aparece un dato real (un correo o un nombre) | Expone una clave o credencial, o el enlace pide iniciar sesión |

### Puntaje y nota

Cada criterio se puntúa con el nivel alcanzado, de 1 a 4: el puntaje máximo es **32**. Con exigencia de 60 %: si el puntaje *p* es mayor o igual que 19,2, nota = 4,0 + 3 × (*p* − 19,2) / 12,8; si es menor, nota = 1,0 + 3 × *p* / 19,2. Se redondea a un decimal. Por ejemplo: 16 puntos, 3,5; 20 puntos, 4,2; 24 puntos, 5,1; 28 puntos, 6,1; 32 puntos, 7,0.

### Antes de publicar

- [ ] El enlace se abre en una ventana privada, sin iniciar sesión.
- [ ] El índice lleva a las seis secciones y cada sección tiene su evidencia.
- [ ] Cada aprendizaje esperado tiene su ABP, su ABPRO y una explicación de 5 a 10 líneas con los números de sus criterios.
- [ ] Los workflows exportados se descargan y se importan en n8n sin errores.
- [ ] La actividad final está completa: informe, dos workflows, CSV y XML.
- [ ] Ninguna captura ni archivo muestra la clave de servicio de Supabase, otra clave o token, ni una credencial; revisaste también los datos fijados de los JSON.
- [ ] Solo hay datos ficticios del curso, con correos de dominio `.test`.
- [ ] El cierre compara la diagnóstica con la autoevaluación y cuenta qué cambiaste a partir de la coevaluación.
- [ ] Pegaste el enlace en la Tarea del LMS.
