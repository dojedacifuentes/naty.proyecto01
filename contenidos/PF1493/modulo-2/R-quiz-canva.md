# PF1493 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** un quiz por aprendizaje esperado del módulo 2 (Quiz n = AEn), con los criterios de evaluación del plan formativo 2026.
**Reparto:** Quiz 1: AE1 · Quiz 2: AE2 · Quiz 3: AE3 · Quiz 4: AE4 · Quiz 5: AE5 · Quiz 6: AE6 (uno por AE). Cinco preguntas cada uno, con una sola respuesta correcta y retroalimentación.
**Son formativos:** no llevan nota.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.
**Versión juego** (HTML y SCORM para el LMS, `npm run quiz-juego`): las mismas preguntas como una misión de 5 niveles con XP, combos, energía, comodín 50:50, estrellas, logros e insignia.
**Misión:** proteger los datos y servicios de Clínica Quintral en su paso a la nube: fichas clínicas, agenda en línea, telemedicina y pagos con tarjeta.

---

## Quiz 1 · La computación en la nube (AE1)

**Cuándo:** al cerrar el aprendizaje 1, después de la lectura y de comparar on-premise y nube para Clínica Quintral.
**Insignia:** Navegante de la nube · **Siguiente parada:** aprendizaje 2, los principios CIA.

1. *(AE1)* Clínica Quintral compra servidores cada tres años. En invierno, con la alta demanda de horas médicas, la agenda en línea se satura. ¿Qué característica de la nube resuelve ese problema?
   - a) La instalación local de los servidores
   - **b) La elasticidad: sumar o quitar capacidad según la demanda**
   - c) El pago por adelantado de la capacidad máxima
   - d) La administración manual de cada equipo
   *Retroalimentación:* "La nube entrega recursos bajo demanda, accesibles por red y elásticos: crecen en la temporada alta y se reducen después. On-premise, en cambio, hay que comprar de antemano para el peor día del año."
2. *(AE1)* ¿Cómo se cobra, por lo general, la nube pública?
   - a) Con una sola compra de servidores cada tres años
   - b) Con una tarifa fija igual para todos los clientes
   - c) Es gratis para empresas de salud
   - **d) Pago por uso: se paga por lo que se consume, sin comprar equipos**
   *Retroalimentación:* "El modelo de pago por uso convierte la inversión en equipos (CAPEX) en gasto operativo (OPEX). Proveedores como AWS, Microsoft Azure y Google Cloud cobran por horas de cómputo, gigabytes guardados y datos transferidos, y ofrecen descuentos por compromiso."
3. *(AE1)* La clínica usa correo y una suite de oficina en la nube: solo los configura y los usa, sin administrar servidores ni actualizar el software. ¿Qué modelo de servicio es?
   - a) IaaS
   - b) PaaS
   - **c) SaaS**
   - d) FaaS
   *Retroalimentación:* "En SaaS (software como servicio) el proveedor administra todo y la clínica usa la aplicación. En PaaS administra la plataforma donde la clínica despliega su código, y en FaaS la clínica sube funciones que se ejecutan ante eventos."
4. *(AE1)* Para el sistema de fichas, el equipo arrienda máquinas virtuales, redes y almacenamiento, e instala y administra el sistema operativo y la base de datos. ¿Qué modelo de servicio es?
   - **a) IaaS**
   - b) SaaS
   - c) PaaS
   - d) FaaS
   *Retroalimentación:* "IaaS (infraestructura como servicio) entrega cómputo, red y almacenamiento; el cliente administra desde el sistema operativo hacia arriba. Da más control, pero también más trabajo y más responsabilidad de seguridad."
5. *(AE1)* La clínica deja las fichas clínicas en su propio centro de datos y usa un proveedor público para la agenda web, con ambos entornos conectados. ¿Qué modelo de implementación es?
   - a) Nube pública
   - b) Nube privada
   - c) On-premise sin nube
   - **d) Nube híbrida**
   *Retroalimentación:* "La nube híbrida combina un entorno privado con uno público conectados entre sí: los datos más sensibles quedan en lo privado y lo que necesita escalar va a lo público. La pública ahorra inversión y la privada da más control, a mayor costo."

---

## Quiz 2 · Los principios CIA (AE2)

**Cuándo:** al cerrar el aprendizaje 2, después de la lectura y del análisis guiado de brechas de seguridad.
**Insignia:** Guardián/a de la tríada · **Siguiente parada:** aprendizaje 3, normativas y estándares.

1. *(AE2)* En la tríada CIA, ¿qué protege la confidencialidad?
   - **a) Que solo las personas autorizadas accedan a la información**
   - b) Que la información no se altere sin autorización
   - c) Que los servicios estén disponibles cuando se necesitan
   - d) Que la información se respalde una vez al año
   *Retroalimentación:* "Confidencialidad: solo accede quien está autorizado. Integridad: la información es exacta y no se altera sin permiso. Disponibilidad: los datos y servicios funcionan cuando se necesitan."
2. *(AE2)* El resultado de un examen se modificó sin autorización mientras viajaba del laboratorio a la ficha del paciente. ¿Qué principio se comprometió?
   - a) Confidencialidad
   - **b) Integridad**
   - c) Disponibilidad
   - d) Escalabilidad
   *Retroalimentación:* "Si un dato cambia sin autorización, falla la integridad, aunque nadie más lo haya leído. En salud es grave: una decisión médica podría tomarse con información falsa."
3. *(AE2)* Un lunes a las 8:00, la agenda en línea de la clínica no respondió durante tres horas porque falló el único servidor que la sostenía. ¿Qué principio falló?
   - a) Confidencialidad
   - b) Integridad
   - c) Autenticación
   - **d) Disponibilidad**
   *Retroalimentación:* "La disponibilidad exige que el servicio funcione cuando se necesita. Un solo servidor es un punto único de falla: la redundancia y la replicación en la nube ayudan a evitarlo."
4. *(AE2)* ¿Qué desafío propio de la nube pone en riesgo la confidencialidad?
   - a) La nube no permite cifrar los datos
   - b) Los proveedores leen los datos de todos sus clientes
   - **c) Un almacenamiento configurado como público por error deja los archivos expuestos en internet**
   - d) En la nube no existen copias de respaldo
   *Retroalimentación:* "En la nube, un permiso mal puesto se aplica de inmediato y desde cualquier lugar: muchas brechas reales partieron de buckets o bases de datos abiertas por error. El cifrado, los respaldos y el control de accesos sí existen, pero hay que configurarlos."
5. *(AE2)* Para proteger la integridad de las fichas clínicas, ¿qué medida corresponde?
   - a) Agregar más servidores en otra zona
   - **b) Registrar y auditar cada cambio, y verificar los archivos con sumas de control (hash)**
   - c) Mostrar menos datos en la pantalla de recepción
   - d) Publicar las fichas en un sitio abierto para que se revisen
   *Retroalimentación:* "Los registros de auditoría, el control de versiones y los hash permiten detectar alteraciones y saber quién cambió qué. Más servidores ayudan a la disponibilidad y mostrar menos datos, a la confidencialidad."

---

## Quiz 3 · Normativas y estándares (AE3)

**Cuándo:** al cerrar el aprendizaje 3, después de la lectura y del mapa de normativas que aplican a Clínica Quintral.
**Insignia:** Brújula normativa · **Siguiente parada:** aprendizaje 4, análisis de fallos en la nube.

1. *(AE3)* Clínica Quintral atiende por telemedicina a pacientes que viven en España. ¿Qué normativa regula el tratamiento de sus datos personales?
   - **a) GDPR**
   - b) HIPAA
   - c) PCI-DSS
   - d) ISO/IEC 27001
   *Retroalimentación:* "El GDPR (Reglamento General de Protección de Datos) aplica a quien trata datos de personas que están en la Unión Europea, aunque la empresa esté fuera de Europa. Exige, entre otros, una base legal para tratar los datos y proteger los datos de salud con especial cuidado."
2. *(AE3)* El formulario de telemedicina pide estado civil, religión y sueldo, datos que no se necesitan para la consulta. ¿Qué principio del GDPR incumple?
   - a) Exactitud
   - **b) Minimización de datos**
   - c) Limitación del plazo de conservación
   - d) Disponibilidad
   *Retroalimentación:* "La minimización pide recoger solo los datos necesarios para el fin declarado. Las multas del GDPR pueden llegar a 20 millones de euros o al 4 % de la facturación anual mundial, lo que sea mayor, y también aplican si los datos están en la nube."
3. *(AE3)* ¿Qué protege HIPAA?
   - a) Los datos de tarjetas de pago en todo el mundo
   - b) Los datos personales de quienes están en la Unión Europea
   - c) La certificación de un sistema de gestión de seguridad
   - **d) La información de salud de pacientes en Estados Unidos**
   *Retroalimentación:* "HIPAA es una ley de Estados Unidos que protege la información de salud identificable (PHI), con reglas de privacidad, de seguridad y de aviso de brechas. Si un proveedor de nube guarda esos datos, debe firmar un acuerdo de asociado comercial (BAA)."
4. *(AE3)* La clínica cobra las consultas con tarjeta en su portal. ¿Qué exige PCI-DSS sobre esos datos?
   - a) Nada, si el portal está alojado en la nube
   - **b) Protegerlos con cifrado y acceso restringido, sin guardar el código de seguridad de la tarjeta**
   - c) Publicar cada pago en un registro abierto
   - d) Guardar todos los datos de la tarjeta para cobros futuros
   *Retroalimentación:* "PCI-DSS es el estándar de la industria de tarjetas: aplica a quien guarda, procesa o transmite datos de tarjetas, también en la nube. Sus requisitos incluyen redes seguras, cifrado, control de accesos, monitoreo y pruebas; el código de seguridad (CVV) no se guarda después de autorizar el pago."
5. *(AE3)* La clínica obtiene la certificación ISO/IEC 27001. ¿Qué acredita?
   - a) Que sus sistemas nunca tendrán incidentes
   - b) Que cumple automáticamente el GDPR, HIPAA y PCI-DSS
   - **c) Que tiene un sistema de gestión de seguridad de la información auditado por una entidad externa**
   - d) Que su proveedor de nube asumió toda la seguridad
   *Retroalimentación:* "ISO/IEC 27001 certifica un SGSI: la organización evalúa sus riesgos, aplica controles y mejora de forma continua. Cumplir normativas genera confianza y evita multas, pero ninguna certificación garantiza cero incidentes ni reemplaza a las demás leyes."

---

## Quiz 4 · Análisis de fallos en la nube (AE4)

**Cuándo:** al cerrar el aprendizaje 4, después de la lectura y del análisis guiado de casos de fallo.
**Insignia:** Detective de incidentes · **Siguiente parada:** aprendizaje 5, CIA y modelos de despliegue.

1. *(AE4)* Un contenedor de almacenamiento con exámenes de pacientes quedó con acceso público por error y un buscador indexó los archivos. ¿Qué principio se comprometió y cuál fue la causa?
   - a) Disponibilidad, por un ataque de denegación de servicio
   - **b) Confidencialidad, por una configuración incorrecta de permisos**
   - c) Integridad, por un error de transmisión de datos
   - d) Disponibilidad, por depender de una sola zona
   *Retroalimentación:* "Personas no autorizadas pudieron ver datos de salud: falló la confidencialidad. La causa no fue un ataque sofisticado, sino un permiso mal configurado, una de las causas más comunes de brechas en la nube."
2. *(AE4)* Un desarrollador subió a un repositorio público un archivo con las credenciales de acceso a la nube de la clínica. Horas después, alguien las usó para crear servidores. ¿Qué causa de fallo es?
   - a) Falta de redundancia
   - b) Un error de transmisión de datos
   - c) Una falla del proveedor de nube
   - **d) Credenciales expuestas por un error humano**
   *Retroalimentación:* "Las credenciales expuestas permiten accesos no autorizados con permisos legítimos. Es un fallo humano que los atacantes buscan de forma automática en los repositorios públicos."
3. *(AE4)* Un cambio sin revisar en una regla de sincronización sobrescribió las dosis de medicamentos en cientos de fichas, y nadie lo notó durante días. ¿Qué principio falló y por qué no se detectó?
   - **a) Integridad; faltaba auditoría y monitoreo de los cambios**
   - b) Confidencialidad; los datos no estaban cifrados
   - c) Disponibilidad; el sistema estaba en una sola zona
   - d) Confidencialidad; las credenciales estaban expuestas
   *Retroalimentación:* "Los datos se alteraron: falló la integridad. Sin registros de auditoría ni alertas sobre cambios masivos, el error se propagó en silencio. Con control de cambios y monitoreo se habría detectado en minutos."
4. *(AE4)* La agenda en línea cayó durante un ataque DDoS, y toda la aplicación estaba en una sola zona de disponibilidad. ¿Qué solución apunta a esas causas?
   - a) Cambiar las contraseñas de todo el personal
   - b) Cifrar la base de datos de la agenda
   - **c) Desplegar en varias zonas con balanceo de carga y un servicio de protección contra DDoS**
   - d) Revisar los permisos del almacenamiento
   *Retroalimentación:* "Para la disponibilidad se necesita redundancia (varias zonas o regiones, réplicas y balanceo) y protección contra la denegación de servicio. Cifrar y revisar permisos protege la confidencialidad, no la disponibilidad."
5. *(AE4)* ¿Qué medida evita que se repita el caso de las credenciales expuestas?
   - a) Cambiar el nombre del repositorio
   - b) Hacer un respaldo diario de los servidores
   - c) Aumentar la capacidad de los servidores
   - **d) Usar un gestor de secretos, rotar las credenciales, exigir MFA y revisar el código antes de publicarlo**
   *Retroalimentación:* "Los secretos no van en el código: se guardan en un gestor de secretos, se rotan y se limitan al mínimo privilegio. MFA y el escaneo automático de repositorios reducen el daño si algo se filtra."

---

## Quiz 5 · CIA y modelos de despliegue (AE5)

**Cuándo:** al cerrar el aprendizaje 5, después de la lectura y de comparar los modelos de despliegue para Clínica Quintral.
**Insignia:** Estratega de despliegue · **Siguiente parada:** aprendizaje 6, el modelo de responsabilidad compartida.

1. *(AE5)* En una nube pública, la infraestructura se comparte con otros clientes. ¿Cómo protege la clínica la confidencialidad de sus fichas?
   - **a) Con cifrado, gestión de identidades y accesos (IAM) y redes privadas virtuales**
   - b) Pidiéndole al proveedor que no reciba otros clientes
   - c) Guardando las fichas sin contraseña para que carguen más rápido
   - d) No se puede: en la nube pública no hay confidencialidad
   *Retroalimentación:* "En la nube pública, el proveedor aísla a los clientes, pero la clínica debe configurar el cifrado, los permisos (IAM) y redes privadas virtuales (VPC). La confidencialidad depende mucho de esa configuración."
2. *(AE5)* ¿Qué riesgo es más propio de una nube privada instalada en el centro de datos de la clínica?
   - a) Compartir hardware con empresas desconocidas
   - b) Que el proveedor público cambie sus precios
   - **c) Que la disponibilidad dependa del propio equipo e instalaciones de la clínica**
   - d) Que los datos deban cruzar entre dos entornos distintos
   *Retroalimentación:* "La nube privada da más control y confidencialidad, pero si falla la energía o el único centro de datos, cae el servicio, y escalar exige comprar equipos. Compartir hardware es propio de la pública; cruzar entornos, de la híbrida."
3. *(AE5)* En la nube híbrida de la clínica, las fichas viajan entre el centro de datos propio y la nube pública. ¿Qué riesgo aparece?
   - a) Ninguno, porque ambos entornos son de la clínica
   - **b) Que los datos en tránsito se expongan o alteren, y que cada entorno aplique políticas distintas**
   - c) Que la nube pública deje de existir
   - d) Que las fichas ya no puedan cifrarse
   *Retroalimentación:* "La conexión entre entornos es un punto delicado: sin cifrado, los datos pueden leerse o alterarse en el camino, y con políticas distintas aparecen brechas de control. La híbrida suma ventajas, pero también la complejidad de dos mundos."
4. *(AE5)* ¿Qué estrategia protege esos datos en tránsito en la nube híbrida?
   - a) Enviarlos por correo electrónico
   - b) Dejar abierta la conexión para que sea más rápida
   - c) Copiarlos a un pendrive una vez al día
   - **d) Una conexión cifrada (VPN o enlace dedicado con TLS) y las mismas políticas de identidad en ambos lados**
   *Retroalimentación:* "Cifrar el canal protege la confidencialidad y la integridad en tránsito; unificar la gestión de identidades y los registros evita que un entorno quede más expuesto que el otro."
5. *(AE5)* Frente a un único centro de datos propio, ¿qué ventaja ofrece la nube pública para la disponibilidad?
   - **a) Puede replicar el servicio en varias zonas y regiones del proveedor**
   - b) Garantiza que nunca habrá interrupciones
   - c) No requiere ninguna configuración de respaldo
   - d) Elimina la necesidad de proteger la confidencialidad
   *Retroalimentación:* "La nube pública facilita la redundancia geográfica, pero hay que diseñarla y pagarla: replicar en varias zonas, respaldar y probar la recuperación. Ningún modelo garantiza cero interrupciones."

---

## Quiz 6 · Responsabilidad compartida (AE6)

**Cuándo:** al cerrar el aprendizaje 6, después de la lectura y de la matriz de responsabilidades de Clínica Quintral.
**Insignia:** Árbitro de responsabilidades · **Siguiente parada:** la evaluación del módulo 2.

1. *(AE6)* En el modelo de responsabilidad compartida, ¿qué le corresponde siempre al proveedor de nube?
   - a) Decidir quién de la clínica accede a cada ficha
   - b) Clasificar los datos de los pacientes
   - **c) La seguridad de la nube: centros de datos, hardware y la red de su infraestructura**
   - d) Configurar las contraseñas de los usuarios de la clínica
   *Retroalimentación:* "El proveedor responde por la seguridad DE la nube (instalaciones, hardware, red y virtualización); el cliente, por la seguridad EN la nube: sus datos, sus identidades y accesos, y lo que configure."
2. *(AE6)* En IaaS, la clínica arrienda máquinas virtuales para el sistema de fichas. ¿Quién instala los parches de seguridad del sistema operativo?
   - **a) La clínica, como cliente**
   - b) El proveedor de nube, siempre
   - c) Nadie: en la nube no hacen falta parches
   - d) El fabricante del computador de cada médico
   *Retroalimentación:* "En IaaS el cliente administra desde el sistema operativo hacia arriba: parches, firewall de la máquina, aplicaciones y datos. En PaaS el proveedor se ocupa también del sistema operativo y de la plataforma."
3. *(AE6)* La clínica usa un SaaS de agenda médica. ¿Qué sigue siendo su responsabilidad?
   - a) Mantener los servidores del SaaS
   - b) Actualizar el código de la aplicación
   - c) Proteger el centro de datos del proveedor
   - **d) Quién tiene cuenta, con qué permisos, y los datos que se cargan**
   *Retroalimentación:* "Aun en SaaS, donde el proveedor administra casi todo, el cliente responde por sus datos y por la gestión de identidades y accesos: quitar cuentas de quienes se van, activar MFA y dar solo los permisos necesarios."
4. *(AE6)* La clínica supuso que el proveedor respaldaba solo su base de datos instalada en una máquina virtual (IaaS). Tras un borrado accidental, no había copia. ¿Qué falló?
   - a) El proveedor incumplió su parte del modelo
   - **b) La clínica no aplicó bien el modelo: en IaaS, respaldar sus datos le corresponde a ella**
   - c) Nadie: los datos borrados en la nube se recuperan solos
   - d) El modelo de responsabilidad compartida no aplica a los respaldos
   *Retroalimentación:* "Muchos incidentes nacen de suponer que el proveedor hace algo que le toca al cliente. No entender el modelo deja huecos: datos sin respaldo, sistemas sin parches o accesos que nadie revisa."
5. *(AE6)* ¿Qué medida mejora la aplicación del modelo en la clínica?
   - a) Esperar a que el proveedor avise qué falta
   - b) Asumir que el proveedor se ocupa de todo lo técnico
   - **c) Una matriz de responsabilidades por servicio, revisada con el proveedor, y capacitación al equipo**
   - d) Contratar más servicios para repartir la responsabilidad
   *Retroalimentación:* "Una matriz (quién hace qué en cada servicio IaaS, PaaS o SaaS), revisada en los contratos y con auditorías periódicas, deja claras las tareas. La capacitación ayuda a que el equipo sepa cuáles le tocan."

---

## Cobertura de criterios

- Quiz 1 (AE1): criterio 1.1 → preguntas 1 y 2; criterio 1.2 → preguntas 3 y 4; criterio 1.3 → pregunta 5.
- Quiz 2 (AE2): criterio 2.1 → preguntas 1, 2 y 4; criterio 2.2 → preguntas 2, 3 y 5.
- Quiz 3 (AE3): criterio 3.1 → preguntas 1, 3 y 4; criterio 3.2 → preguntas 1 y 5; criterio 3.3 → preguntas 2 y 4.
- Quiz 4 (AE4): criterio 4.1 → preguntas 1 y 3; criterio 4.2 → preguntas 1, 2 y 3; criterio 4.3 → preguntas 4 y 5.
- Quiz 5 (AE5): criterio 5.1 → preguntas 1 y 5; criterio 5.2 → preguntas 2 y 3; criterio 5.3 → preguntas 1 y 4.
- Quiz 6 (AE6): criterio 6.1 → preguntas 1, 2 y 3; criterio 6.2 → pregunta 4; criterio 6.3 → pregunta 5.
