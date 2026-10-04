# PF1482 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** un quiz por aprendizaje esperado del módulo 2 (Quiz n = AEn), con los criterios de evaluación del plan formativo 2026.
**Reparto:** Quiz 1: AE1 · Quiz 2: AE2 · Quiz 3: AE3 · Quiz 4: AE4 (uno por AE). Cinco preguntas cada uno, con una sola respuesta correcta y retroalimentación.
**Son formativos:** no llevan nota.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.
**Versión juego** (HTML y SCORM para el LMS, `npm run quiz-juego`): las mismas preguntas como una misión de 5 niveles con XP, combos, energía, comodín 50:50, estrellas, logros e insignia.
**Misión:** sumarte como arquitecto/a de software a TuTurno, una empresa chilena ficticia que lleva su agenda de citas médicas desde el servidor de cada clínica a un servicio en la nube.

---

## Quiz 1 · Modelos de distribución y nube (AE1)

**Cuándo:** al cerrar el aprendizaje esperado 1, después de revisar la evolución del software on-premise al software como servicio y los servicios comunes de la nube.
**Insignia:** Navegante de la nube · **Siguiente parada:** aprendizaje esperado 2, el rol del arquitecto y sus diagramas.

1. *(AE1)* Hoy TuTurno se instala en el servidor de cada clínica: hay 40 clientes con versiones distintas y cada actualización tarda semanas en llegar a todos. ¿Qué característica del software como servicio resuelve este problema?
   - a) Cada clínica compra una licencia perpetua y la instala en su propio servidor
   - **b) Una sola versión en la nube, que TuTurno mantiene para todas las clínicas**
   - c) Cada clínica descarga las actualizaciones y las aplica cuando puede
   - d) TuTurno entrega el código fuente para que cada clínica lo adapte
   *Retroalimentación:* "En el software como servicio, el proveedor opera y actualiza una sola versión en la nube y los clientes la usan por suscripción desde el navegador o una app. Por eso un cambio llega a todas las clínicas a la vez, sin instalaciones locales."
2. *(AE1)* Una clínica pregunta qué pierde si deja el sistema instalado en su servidor y pasa al SaaS de TuTurno. ¿Qué desventaja del software como servicio debes explicarle?
   - a) Tendrá que comprar y mantener servidores propios para la agenda
   - b) Recibirá cada actualización semanas después que las demás clínicas
   - c) Deberá hacer una gran inversión inicial en licencias de software
   - **d) Dependerá de internet y confiará los datos de pacientes al proveedor**
   *Retroalimentación:* "El SaaS evita comprar servidores y licencias, pero exige conectividad y entrega al proveedor el control de la infraestructura y de los datos. Con datos de salud, eso obliga a revisar bien la seguridad y los contratos del servicio."
3. *(AE1)* Los lunes en la mañana las reservas de TuTurno se multiplican por cinco, y la gerencia quiere que el costo de la nube crezca con la demanda y no antes. ¿Qué capacidad de la nube conviene usar?
   - **a) Una arquitectura elástica que suma y quita máquinas según la demanda**
   - b) Comprar servidores para la demanda del lunes y dejarlos encendidos siempre
   - c) Un solo servidor muy grande que absorba todo el tráfico de la semana
   - d) Limitar las reservas de los lunes para no saturar el servidor actual
   *Retroalimentación:* "La elasticidad agrega máquinas de cómputo cuando sube la demanda y las retira cuando baja, con un balanceador que reparte la carga. Así el sistema aguanta el lunes y se paga solo por lo que se usa."
4. *(AE1)* Las clínicas adjuntan órdenes médicas en PDF a cada cita, y la agenda guarda pacientes, profesionales y citas relacionados entre sí. ¿Qué combinación de servicios cloud es la más adecuada?
   - a) Guardar los PDF y las citas en el disco de cada máquina virtual
   - b) Una base de datos para los PDF y un almacenamiento de objetos para las citas
   - **c) Almacenamiento de objetos para los PDF y una base de datos administrada para las citas**
   - d) Una red de distribución de contenido que guarde los PDF y las citas
   *Retroalimentación:* "El almacenamiento de objetos sirve para archivos como PDF e imágenes, y una base de datos administrada, para datos estructurados que se consultan y relacionan. El disco de una máquina se pierde o no se comparte cuando la arquitectura escala."
5. *(AE1)* Para comparar proveedores, el equipo de TuTurno anota tres servicios: Amazon S3, Azure Blob Storage y Google Cloud Storage. ¿Qué tienen en común?
   - **a) Son el servicio de almacenamiento de objetos de cada proveedor**
   - b) Son las bases de datos relacionales administradas de cada proveedor
   - c) Son las máquinas virtuales de cómputo general de cada proveedor
   - d) Son los servicios para balancear la carga de cada proveedor
   *Retroalimentación:* "AWS, Azure y Google Cloud ofrecen servicios comunes con nombres distintos: cómputo, almacenamiento, bases de datos, redes e integración. Armar una tabla de equivalencias ayuda a comparar proveedores con el mismo criterio."

---

## Quiz 2 · Rol del arquitecto y diagramas (AE2)

**Cuándo:** al cerrar el aprendizaje esperado 2, después de revisar el rol del arquitecto, las visiones de la arquitectura y los diagramas UML y C4.
**Insignia:** Cartógrafo/a de sistemas · **Siguiente parada:** aprendizaje esperado 3, el arquitecto en equipos ágiles.

1. *(AE2)* Te sumas al equipo de TuTurno como arquitecto/a. ¿Cuál de estas tareas es una responsabilidad propia de tu rol?
   - a) Programar por tu cuenta todas las historias de usuario del equipo
   - b) Fijar el orden del product backlog en lugar del Product Owner
   - **c) Definir la estructura del sistema y velar por sus atributos de calidad**
   - d) Aprobar el presupuesto anual de la nube en nombre de la gerencia
   *Retroalimentación:* "El arquitecto define los componentes del sistema, cómo se relacionan y qué decisiones técnicas los sostienen, cuidando atributos como la disponibilidad o la seguridad. Lo hace a lo largo de todo el ciclo de vida, en colaboración con el equipo y sin reemplazar a otros roles."
2. *(AE2)* El equipo discute si usar una base de datos por clínica o una compartida. Decides una compartida, con los datos de cada clínica separados. ¿Qué haces con esa decisión?
   - **a) La registras con su contexto, alternativas, decisión y consecuencias**
   - b) La comunicas de palabra y evitas documentarla para avanzar más rápido
   - c) La dejas abierta hasta el final del proyecto para no comprometerte
   - d) Dejas que cada desarrollador la resuelva según lo que prefiera
   *Retroalimentación:* "Un registro de decisión de arquitectura deja por escrito por qué se eligió una opción y qué implica. Así el equipo entiende la decisión, puede revisarla si cambia el contexto y no repite la misma discusión."
3. *(AE2)* Quieres mostrar el orden de los mensajes entre la app móvil, la API, la base de datos y el servicio de recordatorios cuando un paciente reserva una cita. ¿Qué diagrama UML usas?
   - a) Diagrama de clases
   - b) Diagrama de casos de uso
   - c) Diagrama de despliegue
   - **d) Diagrama de secuencia**
   *Retroalimentación:* "El diagrama de secuencia muestra la visión dinámica: quién envía qué mensaje y en qué orden durante un escenario. Los diagramas de componentes y de despliegue muestran la visión estática, y los casos de uso, la funcional."
4. *(AE2)* La gerencia pide un diagrama que muestre TuTurno como una sola caja, rodeada de pacientes, clínicas y los servicios externos de WhatsApp y correo. ¿Qué diagrama del modelo C4 corresponde?
   - a) Diagrama de contenedores
   - **b) Diagrama de contexto del sistema**
   - c) Diagrama de componentes
   - d) Diagrama de código
   *Retroalimentación:* "El modelo C4 tiene cuatro niveles de zoom: contexto, contenedores, componentes y código. El de contexto es el más general: muestra el sistema, sus usuarios y los sistemas con que se relaciona, sin detalle técnico, y por eso sirve para conversar con la gerencia."
5. *(AE2)* Luego, el equipo técnico necesita ver las piezas que se despliegan por separado: la app web, la app móvil, la API y la base de datos, y cómo se comunican. ¿Qué nivel del modelo C4 usa?
   - a) Contexto
   - b) Código
   - **c) Contenedores**
   - d) Componentes
   *Retroalimentación:* "En C4, un contenedor es una aplicación o un almacén de datos que se ejecuta por separado, como una app, una API o una base de datos. El diagrama de contenedores muestra esas piezas, sus tecnologías y cómo se comunican."

---

## Quiz 3 · El arquitecto en equipos ágiles (AE3)

**Cuándo:** al cerrar el aprendizaje esperado 3, después de revisar las metodologías tradicionales y ágiles, el Manifiesto Ágil y Scrum.
**Insignia:** Arquitecto/a ágil · **Siguiente parada:** aprendizaje esperado 4, los pilares de la buena arquitectura.

1. *(AE3)* Las clínicas todavía no saben bien qué necesitan del nuevo servicio y cambian sus pedidos en cada reunión. ¿Qué enfoque conviene para desarrollar TuTurno y por qué?
   - a) Cascada, porque fija todos los requisitos al inicio y evita los cambios
   - b) Cascada, porque entrega todo el sistema de una sola vez al final
   - c) Ágil, porque elimina la necesidad de planificar y de documentar
   - **d) Ágil, porque privilegia adaptarse al cambio por sobre predecir todo**
   *Retroalimentación:* "Las metodologías tradicionales buscan predictibilidad con un plan fijo; las ágiles buscan adaptabilidad con ciclos cortos. Si los requisitos son inciertos, conviene adaptarse, aunque igual se planifica y se documenta lo necesario."
2. *(AE3)* ¿Cuál de estos planes para TuTurno es iterativo e incremental?
   - a) Diseñar todo el sistema, construirlo completo y probarlo recién al final
   - **b) Entregar primero la reserva web básica y sumar la app y los recordatorios después**
   - c) Construir por separado cada capa técnica y unirlas en la última etapa
   - d) Repetir el análisis de requisitos hasta que no quede ninguna duda
   *Retroalimentación:* "Incremental significa entregar el producto por partes que ya sirven; iterativo, mejorarlo en ciclos con lo que se aprende de cada entrega. Así las clínicas usan algo de valor desde el primer incremento."
3. *(AE3)* El equipo de TuTurno suma a una coordinadora de una clínica que conversa con los desarrolladores todos los días del proyecto. ¿Qué valor del Manifiesto Ágil se pone en práctica y con qué principio se asocia?
   - a) Software funcionando; entregar software que funcione con frecuencia
   - b) Respuesta ante el cambio; aceptar requisitos cambiantes, incluso tarde
   - **c) Colaboración con el cliente; negocio y desarrolladores trabajan juntos a diario**
   - d) Individuos e interacciones; mantener un ritmo de trabajo sostenible
   *Retroalimentación:* "El valor «colaboración con el cliente sobre negociación contractual» se apoya en el principio de que los responsables de negocio y los desarrolladores trabajan juntos de forma cotidiana. Cada uno de los cuatro valores se sostiene en varios de los doce principios."
4. *(AE3)* TuTurno trabaja con Scrum. ¿Cómo participa el arquitecto en el equipo sin volverse un cuello de botella?
   - **a) Trabaja dentro del equipo, comparte las decisiones y las revisa cada sprint**
   - b) Aprueba en solitario cada cambio de código antes de integrarlo
   - c) Entrega al inicio un diseño completo que el equipo no puede modificar
   - d) Asume el rol de Scrum Master para asignar las tareas del equipo
   *Retroalimentación:* "En un equipo ágil, la arquitectura evoluciona con el producto: el arquitecto colabora en la planificación y la revisión, guía las decisiones y las ajusta con lo que se aprende. Si concentra todas las aprobaciones, frena el flujo del equipo."
5. *(AE3)* Antes de la temporada de mayor demanda, hay que preparar el escalado automático de TuTurno. ¿Dónde registra el arquitecto este trabajo técnico?
   - a) En un plan aparte que el equipo recién conoce al final del proyecto
   - **b) En el product backlog, priorizado junto con el Product Owner**
   - c) En el sprint backlog de otro equipo, para no distraer al propio
   - d) En ningún artefacto, porque Scrum no admite trabajo técnico
   *Retroalimentación:* "En Scrum, todo el trabajo del producto vive en el product backlog, incluido el técnico. El arquitecto explica su valor y su riesgo al Product Owner para que se priorice junto con las funciones."

---

## Quiz 4 · Pilares de la buena arquitectura (AE4)

**Cuándo:** al cerrar el aprendizaje esperado 4, después de revisar los atributos y escenarios de calidad, AWS Well-Architected y las prácticas SRE de Google, y antes de la actividad final integradora del módulo 2.
**Insignia:** Guardián/a de la calidad · **Siguiente parada:** la actividad final integradora del módulo 2.

1. *(AE4)* La gerencia pide que la agenda siga funcionando aunque falle una máquina y que solo el personal autorizado vea los datos de salud. ¿Qué atributos de calidad de la norma ISO/IEC 25010 están en juego?
   - **a) Fiabilidad y seguridad**
   - b) Usabilidad y portabilidad
   - c) Mantenibilidad y compatibilidad
   - d) Eficiencia de desempeño y usabilidad
   *Retroalimentación:* "La fiabilidad incluye la disponibilidad y la tolerancia a fallos, y la seguridad, la confidencialidad y el control de acceso. La norma ISO/IEC 25010 define estos atributos para que el equipo hable el mismo idioma al priorizar."
2. *(AE4)* ¿Cuál de estos enunciados es un escenario de calidad completo y medible para TuTurno?
   - a) El sistema debe responder rápido y estar siempre disponible para todos los pacientes
   - b) La agenda usará una base de datos administrada en la nube, con réplicas en dos zonas
   - **c) Si cae una máquina el lunes de mayor demanda, el 99 % de las reservas se confirma en menos de 3 segundos**
   - d) Los pacientes quedarán satisfechos con lo fácil que es reservar desde la app móvil
   *Retroalimentación:* "Un escenario de calidad describe una fuente, un estímulo, el artefacto afectado, el entorno, la respuesta esperada y una medida. Esa medida lo vuelve una meta arquitectónica que se puede verificar; la opción b es una decisión de diseño, no un escenario."
3. *(AE4)* La gerencia de TuTurno quiere pagar solo por la capacidad que usa y revisar cada mes en qué se gasta la nube. ¿Qué pilar de AWS Well-Architected aborda esta preocupación?
   - a) Excelencia operativa
   - **b) Optimización de costos**
   - c) Eficiencia del rendimiento
   - d) Sostenibilidad
   *Retroalimentación:* "Los seis pilares son excelencia operativa, seguridad, fiabilidad, eficiencia del rendimiento, optimización de costos y sostenibilidad. La optimización de costos busca entregar valor al menor costo: pagar por uso, medir el gasto y eliminar recursos ociosos."
4. *(AE4)* Al revisar TuTurno con AWS Well-Architected, notas que la base de datos está en una sola zona de disponibilidad y que nadie ha probado restaurar un respaldo. ¿Qué pilar está en riesgo y qué recomiendas?
   - a) Seguridad: cifrar la base de datos con una llave propia
   - b) Eficiencia del rendimiento: usar máquinas con más memoria
   - c) Excelencia operativa: documentar el procedimiento de despliegue
   - **d) Fiabilidad: replicar en varias zonas y probar la recuperación**
   *Retroalimentación:* "El pilar de fiabilidad pide que el sistema se recupere de fallas y siga funcionando. Replicar en varias zonas de disponibilidad y probar los respaldos evita que una sola falla deje sin agenda a todas las clínicas."
5. *(AE4)* TuTurno fijó un SLO de 99,9 % de reservas exitosas al mes, y a mitad de mes ya consumió casi todo su presupuesto de error. Según los principios SRE de Google, ¿qué conviene hacer?
   - a) Seguir lanzando funciones al mismo ritmo, porque el SLO es solo referencial
   - b) Subir el SLO a 100 % para que el equipo ponga más atención a las fallas
   - **c) Frenar los cambios riesgosos y priorizar la confiabilidad hasta recuperar margen**
   - d) Buscar a la persona responsable de las fallas para que no se repitan
   *Retroalimentación:* "El presupuesto de error es lo que el SLO permite fallar: si se agota, se prioriza la estabilidad sobre las novedades. Un SRE además reduce el trabajo repetitivo (toil) con automatización y analiza cada caída sin buscar culpables."

---

## Cobertura de criterios

- Quiz 1 (AE1): criterio 1.1 (características del software como servicio) → preguntas 1 y 2; criterio 1.2 (servicios comunes de una arquitectura cloud) → preguntas 3 y 4; criterio 1.3 (tipos de proveedores cloud y sus servicios comunes) → pregunta 5.
- Quiz 2 (AE2): criterio 2.1 (rol y responsabilidades del arquitecto en el ciclo de vida) → preguntas 1 y 2; criterio 2.2 (diagramas UML para representar la arquitectura) → pregunta 3; criterio 2.3 (diagramas del modelo C4) → preguntas 4 y 5.
- Quiz 3 (AE3): criterio 3.1 (metodologías tradicionales y ágiles, iterativo e incremental) → preguntas 1 y 2; criterio 3.2 (valores y principios del Manifiesto Ágil) → pregunta 3; criterio 3.3 (rol del arquitecto y sus dinámicas en equipos ágiles) → preguntas 4 y 5.
- Quiz 4 (AE4): criterio 4.1 (atributos de calidad según los estándares) → pregunta 1; criterio 4.2 (atributos y escenarios de calidad en el proceso arquitectónico) → pregunta 2; criterio 4.3 (pilares de AWS Well-Architected) → preguntas 3 y 4; criterio 4.4 (características de un Site Reliability Engineer según Google) → pregunta 5.
