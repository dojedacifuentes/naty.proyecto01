---
bajada: Qué es un workflow, qué procesos de una empresa conviene automatizar, cuánto se gana al hacerlo y cómo está construido n8n frente a otras plataformas.
---

# Lectura AE1 · ¿Qué conviene automatizar?

## Antes de empezar
plan: 1. CONCEPTOS FUNDAMENTALES DE AUTOMATIZACIÓN DE WORKFLOWS Y LAS CARACTERÍSTICAS DE N8N

Antes de abrir n8n y arrastrar el primer nodo, conviene responder una pregunta que ahorra mucho trabajo: **¿vale la pena automatizar este proceso?** No todo lo que se puede automatizar se debe automatizar, y lo que se automatiza mal sigue funcionando mal, solo que más rápido. Este aprendizaje trata del criterio: reconocer dónde la automatización aporta valor, estimar cuánto y elegir la herramienta adecuada.

El caso del módulo es **Mercado Austral**, una distribuidora ficticia de abarrotes que vende a clientes minoristas y a almacenes mayoristas en varias comunas. Recibe unos 40 pedidos al día por un formulario web. Hoy una persona los copia a una planilla, revisa que los datos estén completos y cada viernes suma a mano lo vendido por comuna para enviarlo a facturación. Es un proceso que funciona, pero que consume horas y se equivoca.

:::flujo El proceso actual de Mercado Austral
Llega el pedido | Formulario web
Se copia a mano | Planilla compartida
Se revisa | Datos incompletos o mal escritos
Se resume | Suma por comuna cada viernes
:::

Al terminar esta lectura podrás mirar ese proceso, decidir qué partes automatizar, justificarlo con números y explicar por qué n8n es una buena opción para hacerlo.

## Qué es un workflow
plan: CONCEPTOS FUNDAMENTALES DE WORKFLOW AUTOMATION.

Un **workflow**, o flujo de trabajo, es una secuencia de pasos que transforma una entrada en un resultado. Cuando esa secuencia se ejecuta sola, sin que una persona intervenga en cada paso, hablamos de **automatización de workflows** (*workflow automation*). Todo workflow automatizado tiene la misma estructura básica: algo lo inicia, se ejecutan pasos y se produce un resultado.

Lo que inicia el workflow es el **disparador** o *trigger*: la llegada de un formulario, un correo, una hora del día o un aviso de otra aplicación. Los **pasos** reciben datos, los validan, los transforman o toman decisiones con ellos. El **resultado** es una acción concreta: guardar un registro, enviar un aviso, generar un archivo. Cada vez que el workflow corre de principio a fin se produce una **ejecución**, que queda registrada con sus datos.

:::flujo Un workflow de pedidos
Disparador | Llega un pedido
Validar | Datos completos y correctos
Guardar | Registro en la base de datos
Avisar | Mensaje a bodega
:::

La automatización de workflows se diferencia de otras formas de automatizar en que conecta aplicaciones a través de sus **interfaces de programación** (APIs) y no imitando lo que haría una persona en la pantalla. Por eso es más estable: si una aplicación cambia el color de un botón, el workflow no se entera.

:::ejemplo El mismo pedido, a mano y automatizado
A mano, el pedido de Ana Rojas (2 kg de café para Ñuñoa) espera en el correo hasta que alguien lo copia, a veces con un error de tipeo en el correo o la comuna. Automatizado, el formulario dispara el workflow, los datos se normalizan, el pedido queda guardado en segundos y bodega recibe el aviso. Nadie copia nada y nada queda esperando.
:::

## Qué conviene automatizar
plan: CONCEPTOS FUNDAMENTALES DE WORKFLOW AUTOMATION.

Una tarea es buena candidata a la automatización cuando cumple, en lo posible, cuatro condiciones. Es **repetitiva**: se hace igual muchas veces. Tiene **alto volumen** o alta frecuencia: ocurre todos los días o varias veces al día. Sigue **reglas claras**: se puede escribir como "si pasa esto, hacer aquello". Y trabaja con **datos digitales**: la información ya está en un formulario, un correo o una base de datos.

Hay tareas que no conviene automatizar, o al menos no todavía. Las **decisiones de criterio**, que dependen del juicio de una persona o de una negociación. Las tareas que ocurren **pocas veces**, como un cierre anual, donde el esfuerzo de construir el workflow no se recupera. Y los procesos que **no están definidos**, porque cada persona los hace distinto: automatizarlos es fijar el desorden.

| Tarea de Mercado Austral | ¿Automatizar? | Por qué |
| --- | --- | --- |
| Registrar cada pedido del formulario | Sí | 40 veces al día, siempre igual, datos digitales |
| Revisar que el pedido tenga correo y cantidad válida | Sí | Reglas claras que se pueden escribir |
| Sumar las ventas por comuna cada viernes | Sí | Cálculo repetitivo, propenso a error manual |
| Negociar un descuento con un almacén mayorista | No | Depende del criterio y de la relación comercial |
| Responder un reclamo complejo de un cliente | En parte | Se puede clasificar y avisar; la respuesta la redacta una persona |

:::ejemplo Automatizar una parte
El reclamo complejo no se responde solo, pero parte del proceso sí se automatiza: el workflow recibe el reclamo, lo registra, lo clasifica por tipo y avisa a la persona encargada. Automatizar no es todo o nada; muchas veces lo mejor es automatizar lo repetitivo y dejar la decisión a una persona.
:::

:::error Automatizar el caos
Si nadie puede explicar paso a paso cómo se hace hoy un proceso, no está listo para automatizarse. Primero se define y se ordena; después se automatiza. Si no, el workflow reproduce los errores del proceso a mayor velocidad.
:::

## Casos de uso empresariales
plan: CASOS DE USO EMPRESARIALES.

La automatización de workflows aparece en casi todas las áreas de una empresa. Los casos de uso más frecuentes comparten el patrón de la sección anterior: tareas repetitivas que mueven datos entre aplicaciones.

| Área | Caso de uso | Qué hace el workflow |
| --- | --- | --- |
| Ventas | Registro de pedidos y formularios | Recibe el formulario, valida los datos y crea el registro |
| Operaciones | Avisos y notificaciones | Avisa a bodega o a despacho cuando entra un pedido de su zona |
| Administración | Sincronizar planillas, CRM y bases de datos | Mantiene los mismos datos en todas las aplicaciones |
| Finanzas | Reportes periódicos | Cada viernes calcula las ventas y envía el archivo a facturación |
| Atención al cliente | Clasificación de solicitudes | Separa consultas, reclamos y devoluciones y las asigna |
| Personas | Incorporación de clientes o de personal | Crea cuentas, envía la bienvenida y agenda tareas |

Estos casos no son exclusivos de las grandes empresas. Una pyme como Mercado Austral tiene los mismos procesos a menor escala, y proporcionalmente gana más, porque cada hora liberada es una parte mayor de su equipo.

:::ejemplo Tres procesos para Mercado Austral
El equipo identificó tres procesos candidatos: **registrar cada pedido** (ventas), **avisar a despacho regional** cuando el pedido es de fuera de la Región Metropolitana (operaciones) y **enviar el resumen semanal por comuna** a facturación (finanzas). Los tres son repetitivos, tienen reglas claras y trabajan con datos que ya son digitales.
:::

## Beneficios y retorno
plan: BENEFICIOS Y ROI DE LA AUTOMATIZACIÓN.

Los beneficios de automatizar se agrupan en cuatro. **Menos digitación y menos errores**: los datos no se copian a mano. **Respuesta inmediata**: el pedido queda registrado en segundos, no al final del día. **Datos disponibles para decidir**: las ventas están al día, no una vez por semana. Y **escalabilidad**: si los pedidos se duplican, el workflow no necesita otra persona.

Para justificar una automatización con números se usa el **retorno de la inversión** (ROI, por sus siglas en inglés). En su forma simple, compara lo que se gana con lo que cuesta: **ROI = (beneficio − costo) ÷ costo**, expresado en porcentaje. El beneficio principal suele ser el valor de las horas que se liberan; el costo incluye la herramienta, la construcción del workflow y su mantención.

:::ejemplo El cálculo para Mercado Austral
Copiar un pedido toma unos 3 minutos. Con 40 pedidos al día son 120 minutos, **2 horas diarias**; en 20 días hábiles, **40 horas al mes**. Si la hora de trabajo cuesta $6.000 a la empresa, se liberan $240.000 al mes. Si la herramienta y la mantención cuestan $90.000 mensuales, el beneficio neto es $150.000 y el ROI mensual es 150.000 ÷ 90.000, cerca de **167 %**. Las cifras de valor hora y costos son supuestos del caso ficticio.
:::

El número no lo es todo. Algunos beneficios cuestan de medir en dinero pero pesan en la decisión: los pedidos que ya no se pierden, el cliente que recibe confirmación al instante o la persona que deja de copiar datos y puede atender clientes.

:::error Calcular solo con el precio de la herramienta
Un ROI que solo considera la suscripción está inflado. Construir el workflow toma horas, y mantenerlo también: las aplicaciones cambian y los datos traen casos nuevos. Incluye esas horas en el costo, o el cálculo no resiste la primera pregunta de quien aprueba el proyecto.
:::

## Arquitectura de n8n
plan: ARQUITECTURA DE N8N.

**n8n** es una plataforma de automatización de workflows. Su arquitectura se entiende con cinco conceptos. El **workflow** es el flujo completo. Los **nodos** son sus pasos, y hay de cuatro tipos según lo que hacen: disparadores (inician), acciones (hacen algo en otra aplicación), lógica (deciden el camino) y transformación (cambian los datos). Las **conexiones** unen los nodos y definen el orden. Las **credenciales** guardan de forma segura el acceso a otros servicios. Y las **ejecuciones** registran cada vez que el workflow corre, con los datos que pasaron por cada nodo.

Entre nodo y nodo los datos viajan como **ítems** en formato **JSON**: cada ítem es un objeto con campos y valores. Un nodo recibe una lista de ítems, hace su trabajo con cada uno y entrega la lista resultante al siguiente.

En lo técnico, n8n es una aplicación que corre sobre Node.js. Se usa desde el navegador, donde está el editor, y guarda los workflows, las credenciales (cifradas) y el historial de ejecuciones en una base de datos: SQLite por defecto, PostgreSQL en instalaciones de producción. Puede usarse como servicio en la nube del proveedor (n8n Cloud) o instalarse en infraestructura propia; la instalación y la configuración son el tema del módulo «Instalación y configuración de n8n» del plan.

:::ejemplo La arquitectura en el workflow de pedidos
El **workflow** "Pedido a registro" tiene tres **nodos** unidos por dos **conexiones**: un disparador de formulario, un nodo de transformación que normaliza los datos y un nodo de acción que guarda el pedido en la base de datos. Ese último usa una **credencial** con la clave de la base de datos. Cada pedido que llega genera una **ejecución** que puedes abrir y revisar paso a paso.
:::

## Componentes de la interfaz
plan: COMPONENTES PRINCIPALES.

La interfaz de n8n tiene pocos componentes principales, y conviene ubicarlos antes de construir:

- **Vista general.** Lista los workflows, las credenciales y las ejecuciones de tu cuenta o proyecto. Desde ahí se crea un workflow nuevo o se abre uno existente.
- **Canvas.** El lienzo donde se ve y se arma el workflow: los nodos como bloques y las conexiones como líneas. Admite notas adhesivas (*sticky notes*) para documentar qué hace cada parte.
- **Panel de nodos.** Se abre con el botón de agregar y permite buscar cualquier nodo por nombre o por aplicación.
- **Parámetros del nodo.** Al abrir un nodo aparece su configuración al centro, con el panel de **entrada** a un lado y el de **salida** al otro: ves lo que recibe y lo que entrega.
- **Historial de ejecuciones.** Cada ejecución con su estado (exitosa o con error), su hora y los datos de cada nodo.

:::ejemplo Dónde mirar cuando algo no calza
Un pedido de Mercado Austral quedó sin guardar. En el **historial de ejecuciones** encuentras la ejecución de ese pedido; al abrirla, el **canvas** muestra en rojo el nodo que falló, y en sus **parámetros** ves el panel de entrada con el dato que causó el problema. Tres componentes, un diagnóstico.
:::

## Ecosistema de nodos
plan: ECOSISTEMA DE NODOS.

La fuerza de una plataforma de automatización está en con qué puede conectarse. n8n ofrece un ecosistema de nodos que se agrupa así:

- **Nodos nativos de aplicaciones.** Cientos de servicios con nodo propio: bases de datos como PostgreSQL o Supabase, correo, planillas de cálculo, mensajería, CRM, almacenamiento en la nube.
- **Nodos core.** Los que no dependen de una aplicación: disparadores (manual, formulario, webhook, programado), lógica (If, Switch, Merge), transformación (Edit Fields, Filter, Summarize) y utilidades.
- **HTTP Request.** Conecta con cualquier servicio que tenga una API, aunque no exista un nodo para él.
- **Code.** Permite escribir lógica propia en JavaScript o Python cuando los nodos no alcanzan; se ve en el módulo «Nodo Code y JavaScript en n8n» del plan.
- **Nodos de IA.** Agentes y modelos de lenguaje integrados en el workflow, que son el tema del módulo «IA generativa y agentes en n8n» del plan.
- **Nodos de la comunidad.** Nodos creados por otras personas que se instalan en la instancia; conviene revisar su origen antes de usarlos.

Además, n8n publica una biblioteca de **plantillas**: workflows armados que se importan y adaptan. Son un buen punto de partida, pero cada plantilla se revisa antes de usarla con datos reales.

:::ejemplo Conectar el sistema de facturación
El sistema de facturación de Mercado Austral no tiene nodo propio en n8n, pero expone una API. Con **HTTP Request** el workflow le envía el resumen semanal igual que lo haría un nodo nativo. Si no hubiera API, el resumen se generaría como archivo XML y se enviaría por correo con un nodo nativo.
:::

## n8n frente a otras plataformas
plan: DIFERENCIAS CON OTRAS PLATAFORMAS DE AUTOMATIZACIÓN.

n8n no es la única plataforma de automatización. Make y Zapier son dos alternativas muy usadas, y elegir bien depende del caso. El cuadro resume las diferencias principales.

| Criterio | n8n | Make | Zapier |
| --- | --- | --- | --- |
| Dónde corre | En la nube del proveedor o en infraestructura propia | Solo en la nube del proveedor | Solo en la nube del proveedor |
| Licencia | Código disponible bajo licencia *fair-code*; uso interno gratuito si se autoaloja | Servicio comercial | Servicio comercial |
| Control de los datos | Total si se autoaloja | Pasan por los servidores del proveedor | Pasan por los servidores del proveedor |
| Forma de construir | Canvas de nodos con ramas, uniones y bucles | Escenarios visuales con módulos y enrutadores | Flujos mayormente lineales, con rutas y filtros |
| Lógica propia | Nodo Code y expresiones en cualquier campo | Funciones y fórmulas integradas | Pasos de código |
| Unidad de cobro en la nube | Por ejecución del workflow | Por consumo de cada acción | Por tarea ejecutada |
| Curva de aprendizaje | Media: pide entender datos y expresiones | Media | Baja para flujos simples |

Los precios, los planes y la cantidad de integraciones cambian con frecuencia; antes de decidir, revísalos en el sitio de cada proveedor. Lo que no cambia es el criterio: dónde quedan los datos, cómo se cobra y cuánta lógica necesita el proceso.

:::ejemplo La conclusión para Mercado Austral
Conviene n8n por tres razones. La empresa maneja datos de clientes que puede mantener en su propia infraestructura. Un workflow con varias ramas se cobra por ejecución y no por cada paso, lo que es más predecible. Y la lógica de enrutamiento que necesita, por tipo de cliente, monto y comuna, se resuelve con expresiones sin salir de la herramienta.
:::

:::error Elegir por la cantidad de integraciones
Una plataforma con más integraciones no es mejor si las que necesitas están en todas. Compara con los criterios del caso: los datos, el costo con el volumen real y la lógica que requiere el proceso.
:::

## En síntesis

- Un workflow es una secuencia de pasos que se inicia con un disparador y termina en una acción; cada vez que corre es una ejecución.
- Conviene automatizar lo repetitivo, frecuente, con reglas claras y datos digitales; no las decisiones de criterio ni los procesos sin definir.
- Los casos de uso se repiten en todas las áreas: registrar, avisar, sincronizar, reportar, clasificar e incorporar.
- El ROI compara el valor de las horas liberadas con el costo total: herramienta, construcción y mantención.
- n8n se organiza en workflows, nodos, conexiones, credenciales y ejecuciones, y los datos viajan como ítems JSON.
- Su ecosistema combina nodos nativos, nodos core, HTTP Request, Code, nodos de IA y nodos de la comunidad.
- Frente a Make y Zapier, su diferencia principal es que puede autoalojarse, lo que da control sobre los datos.

## Para practicar

- **Actividad 1, "Del formulario a la base de datos", parte A.** Identificas tres tareas del proceso de Mercado Austral que conviene automatizar y qué gana la empresa con cada una.
- **Cuadro comparativo de plataformas.** Agrega una fila con un criterio propio y escribe tu conclusión para el caso.
- **Portafolio, sección 1.** El mapa de procesos de Mercado Austral es la primera evidencia de tu portafolio.
- **Documentación oficial.** La de n8n (docs.n8n.io) explica los conceptos de workflow, nodos y ejecuciones.

## Autocomprobación

1. De estas tareas de Mercado Austral, ¿cuáles conviene automatizar y por qué? a) copiar cada pedido del formulario a la planilla; b) negociar un descuento con un almacén mayorista; c) sumar las ventas por comuna cada viernes.
   Respuesta: Conviene automatizar a) y c): son repetitivas, frecuentes, siguen reglas claras y trabajan con datos digitales. La b) depende del criterio de una persona y de la relación comercial, así que no conviene automatizarla (sección 2).
2. Nombra los cinco conceptos de la arquitectura de n8n y explica en una línea qué es cada uno.
   Respuesta: Workflow, el flujo completo; nodos, cada paso (disparador, acción, lógica o transformación); conexiones, que unen los nodos y fijan el orden; credenciales, que guardan el acceso seguro a otros servicios; y ejecuciones, cada vez que el workflow corre, con sus datos (sección 5).
3. ¿Qué diferencia de n8n frente a Make y Zapier es decisiva para Mercado Austral, y por qué?
   Respuesta: Que puede instalarse en infraestructura propia. Así los datos de clientes no salen de la empresa. A eso se suma que se cobra por ejecución y no por cada paso, y que su lógica de enrutamiento se resuelve con expresiones (sección 8).

## Glosario

- **Workflow**: secuencia de pasos que transforma una entrada en un resultado; automatizado, se ejecuta solo al ocurrir un disparador.
- **Trigger**: nodo disparador que inicia un workflow, como la llegada de un formulario o una hora programada.
- **Nodo**: cada paso de un workflow en n8n; puede ser disparador, acción, lógica o transformación.
- **Conexión**: línea que une dos nodos y define por dónde pasan los datos.
- **Ejecución**: cada vez que un workflow corre de principio a fin, registrada con los datos de cada nodo.
- **Credencial**: dato de acceso a otro servicio que n8n guarda cifrado y fuera del workflow.
- **ROI**: retorno de la inversión; compara el beneficio obtenido con el costo de lograrlo.
- **Autoalojamiento**: instalar una aplicación en infraestructura propia en vez de usarla como servicio del proveedor.
