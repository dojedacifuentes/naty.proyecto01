# Seguridad Cloud · Módulo 2 · Infografías en texto

Versión en texto de cada infografía, para lectores de pantalla y para el texto alternativo del LMS. Generado por `npm run infografias`.

## Aprendizaje esperado 1 · INTRODUCCIÓN A LA COMPUTACIÓN EN LA NUBE

Módulo 2 · FUNDAMENTOS DE SEGURIDAD EN LA NUBE. Qué es, cómo se paga y cómo se elige.

**Aprendizaje esperado 1:** EXPLICAR CARACTERÍSTICAS FUNDAMENTALES, BENEFICIOS, MODELOS DE COSTO Y PRINCIPALES PROVEEDORES DE TECNOLOGÍAS EN LA NUBE PARA DAR SOLUCIÓN A UNA NECESIDAD DE LA ORGANIZACIÓN.

1. **Qué es la nube.** Contenido: DEFINICIÓN DE COMPUTACIÓN EN LA NUBE. Acceso por internet, bajo demanda, a recursos compartidos de cómputo (servidores, almacenamiento y aplicaciones) que se activan en minutos y se pagan por uso.
2. **Características y beneficios.** Contenido: PRINCIPALES CARACTERÍSTICAS Y BENEFICIOS. Autoservicio bajo demanda, acceso amplio por red, recursos compartidos, elasticidad y servicio medido. Beneficios: escalar en la temporada alta, pagar por uso, alcance global y alta disponibilidad.
3. **On-premise y cloud.** Contenido: DIFERENCIAS ENTRE ON-PREMISE Y CLOUD. On-premise: compras, instalas y mantienes tus equipos, dimensionados para el peor día. En la nube los arriendas y el proveedor mantiene la infraestructura física.
4. **Servicios típicos.** Contenido: SERVICIOS TÍPICOS DISPONIBLES EN LA NUBE (ALMACENAMIENTO, PROCESAMIENTO, REDES, BASES DE DATOS). Almacenamiento de archivos y respaldos, máquinas virtuales para procesar, redes privadas virtuales y bases de datos administradas por el proveedor.
5. **Principales proveedores.** Contenido: PRINCIPALES PROVEEDORES DE SERVICIOS EN LA NUBE. Amazon Web Services (AWS), Microsoft Azure y Google Cloud concentran la mayor parte del mercado; también están Oracle Cloud, IBM Cloud y Alibaba Cloud.
6. **Modelo de costos.** Contenido: MODELO DE COSTOS DE LA COMPUTACIÓN EN LA NUBE. Pago por uso: la inversión en equipos (CAPEX) pasa a ser gasto operativo (OPEX). Se cobra por horas de cómputo, gigabytes guardados y datos transferidos, con descuentos por compromiso de uso.
7. **Modelos de servicio.** Contenido: MODELOS DE SERVICIO (IAAS, PAAS, SAAS, FAAS). IaaS: máquinas virtuales, red y almacenamiento · PaaS: una plataforma para desplegar tu código · SaaS: la aplicación lista para usar · FaaS: funciones que se ejecutan ante un evento.
8. **Modelos de implementación.** Contenido: MODELOS DE IMPLEMENTACIÓN EN LA NUBE (PÚBLICA, PRIVADA, HÍBRIDA) · VENTAJAS Y DESVENTAJAS DE CADA UNA DE ELLAS. Pública: compartida, escalable y sin inversión inicial, con menos control. Privada: exclusiva y con más control, pero más cara. Híbrida: combina ambas, flexible pero más compleja.
9. **Cómo elegir.** Contenido: CONSIDERACIONES CLAVES PARA UNA ELECCIÓN. Pesa la sensibilidad de los datos, las normas que aplican, el costo total, cuánto varía la demanda, las habilidades del equipo y la dependencia de un solo proveedor.
10. **Ejemplos y casos.** Contenido: EJEMPLOS Y CASOS DE IMPLEMENTACIÓN. Clínica Quintral deja las fichas clínicas en su centro de datos y lleva a la nube pública la agenda en línea y la telemedicina: un modelo híbrido.

**Lo que demostrarás:**
- 1.1 EXPLICA LAS PRINCIPALES CARACTERÍSTICAS Y BENEFICIOS DE LA COMPUTACIÓN EN LA NUBE PARA DAR SOLUCIÓN A UNA PROBLEMÁTICA DE LA ORGANIZACIÓN.
- 1.2 DESCRIBE LOS DISTINTOS MODELOS DE SERVICIO EN LA NUBE DE ACUERDO A LAS CONVENCIONES DE LA INDUSTRIA.
- 1.3 DESCRIBE LOS DISTINTOS MODELOS DE IMPLEMENTACIÓN EN LA NUBE ACORDE A LAS PRÁCTICAS DE LA INDUSTRIA

## Aprendizaje esperado 2 · LOS PRINCIPIOS CIA

Módulo 2 · FUNDAMENTOS DE SEGURIDAD EN LA NUBE. Confidencialidad, integridad y disponibilidad.

**Aprendizaje esperado 2:** EXPLICAR LOS PRINCIPIOS DE CONFIDENCIALIDAD, INTEGRIDAD Y DISPONIBILIDAD (CIA) EN UN ENTORNO CORPORATIVO ACORDE LAS BUENAS PRÁCTICAS DE LA INDUSTRIA.

1. **La tríada CIA.** Contenido: QUÉ SON LOS PRINCIPIOS CIA (CONFIDENCIALIDAD, INTEGRIDAD, DISPONIBILIDAD): DEFINICIÓN E IMPORTANCIA. Son la base de la seguridad de la información: toda medida de seguridad protege al menos uno de los tres. En una clínica, fallar en cualquiera afecta a los pacientes.
2. **Confidencialidad.** Contenido: CONFIDENCIALIDAD. Solo accede quien está autorizado. Se protege con control de accesos, autenticación con múltiples factores (MFA) y cifrado.
3. **Integridad.** Contenido: INTEGRIDAD. La información es exacta y no se altera sin autorización. Se protege con registros de auditoría, control de cambios y sumas de verificación (hash).
4. **Disponibilidad.** Contenido: DISPONIBILIDAD. Los datos y servicios funcionan cuando se necesitan. Se protege con redundancia, respaldos probados y protección contra la denegación de servicio.
5. **Desafíos en la nube.** Contenido: DESAFÍOS EN LA NUBE. Configuraciones erróneas que exponen datos, cuentas con más permisos de los necesarios, interfaces (API) abiertas, poca visibilidad de lo que pasa y dependencia de un proveedor.
6. **Ejemplos de brechas.** Contenido: EJEMPLOS DE BRECHAS. Capital One, 2019: una configuración débil en la nube permitió robar datos de más de 100 millones de personas (confidencialidad). Code Spaces, 2014: un atacante borró servidores y respaldos y la empresa cerró (integridad y disponibilidad).
7. **Análisis de incidentes.** Contenido: CASOS DE ESTUDIO: ANÁLISIS DE INCIDENTES DE SEGURIDAD RELACIONADOS CON CONFIDENCIALIDAD, INTEGRIDAD, Y DISPONIBILIDAD. Para cada caso: qué pasó, qué principio se afectó, cuál fue la causa de fondo, qué impacto tuvo y qué lo habría evitado.
8. **Soluciones prácticas.** Contenido: SOLUCIONES PRÁCTICAS BASADAS EN LOS PRINCIPIOS DE CIA PARA PREVENIR VULNERABILIDADES. Confidencialidad: mínimo privilegio, MFA y cifrado. Integridad: auditoría, hash y versiones. Disponibilidad: varias zonas, respaldos y recuperación ensayada.

**Lo que demostrarás:**
- 2.1 EXPLICA LOS PRINCIPIOS DE CIA (CONFIDENCIALIDAD, INTEGRIDAD Y DISPONIBILIDAD) EN EL CONTEXTO DE LA SEGURIDAD EN LA NUBE.
- 2.2 ANALIZA CASOS REALES O SIMULADOS DE FALLOS DE SEGURIDAD RELACIONADOS CON LOS PRINCIPIOS DE CIA EN UN ENTORNO CORPORATIVO.

## Aprendizaje esperado 3 · NORMATIVAS CLAVE PARA LA SEGURIDAD DE LA NUBE

Módulo 2 · FUNDAMENTOS DE SEGURIDAD EN LA NUBE. Las reglas que siguen a los datos, estén donde estén.

**Aprendizaje esperado 3:** DESCRIBIR LAS NORMATIVAS Y ESTÁNDARES DE SEGURIDAD APLICABLES A LOS ENTORNOS CLOUD, IDENTIFICANDO SU IMPORTANCIA PARA LA PROTECCIÓN DE DATOS Y EL CUMPLIMIENTO LEGAL.

1. **GDPR: propósito y alcance.** Contenido: GDPR (REGLAMENTO GENERAL DE PROTECCIÓN DE DATOS): INTRODUCCIÓN, PROPÓSITO Y ALCANCE. Reglamento de la Unión Europea vigente desde 2018. Protege los datos personales de quienes están en la UE y aplica también a empresas de fuera que les ofrecen servicios, como la telemedicina.
2. **GDPR: principios.** Contenido: PRINCIPIOS CLAVE. Licitud, lealtad y transparencia · limitación de la finalidad · minimización de datos · exactitud · limitación del plazo de conservación · integridad y confidencialidad · responsabilidad proactiva.
3. **GDPR: la nube y las multas.** Contenido: IMPACTO EN LA NUBE Y MULTAS. El proveedor trata los datos por encargo y debe firmar un contrato que lo obligue a protegerlos; sacarlos de la UE exige garantías. Multas de hasta 20 millones de euros o el 4 % de la facturación anual mundial.
4. **HIPAA.** Contenido: HIPAA (HEALTH INSURANCE PORTABILITY AND ACCOUNTABILITY ACT): PROPÓSITO · PRINCIPALES NORMATIVAS. Ley de Estados Unidos de 1996 que protege la información de salud identificable (PHI). Sus reglas principales: privacidad, seguridad (salvaguardas administrativas, físicas y técnicas) y aviso de brechas.
5. **HIPAA en la nube.** Contenido: APLICACIÓN EN LA NUBE. El proveedor que guarda PHI es un asociado comercial y firma un acuerdo (BAA). El cliente sigue a cargo de cifrar, controlar accesos y revisar los registros de auditoría.
6. **PCI-DSS.** Contenido: PCI-DSS (PAYMENT CARD INDUSTRY DATA SECURITY STANDARD): DESCRIPCIÓN GENERAL · REQUISITOS CLAVE DE LA NORMATIVA. El estándar de las marcas de tarjetas para quien guarda, procesa o transmite datos de tarjetas. 12 requisitos: redes seguras, proteger los datos, gestionar vulnerabilidades, controlar accesos, monitorear y probar, y tener una política.
7. **PCI-DSS en la nube.** Contenido: IMPACTO EN LA NUBE. El cumplimiento se comparte: el proveedor certifica su parte y la clínica la suya. Usar una pasarela de pago y tokenizar las tarjetas reduce lo que la clínica debe proteger.
8. **ISO/IEC 27001.** Contenido: ISO/IEC 27001 (SISTEMA DE GESTIÓN DE SEGURIDAD DE LA INFORMACIÓN): ALCANCE Y ESTRUCTURA · APLICACIÓN EN LA NUBE · CERTIFICACIÓN ISO27001. Norma para un sistema de gestión de seguridad (SGSI): cláusulas 4 a 10 y un anexo con 93 controles (versión 2022). En la nube se complementa con ISO/IEC 27017 y 27018. La certifica un auditor externo por 3 años, con revisiones anuales.
9. **Impacto del cumplimiento normativo.** Contenido: IMPACTO DEL CUMPLIMIENTO NORMATIVO. Evita multas y demandas, da confianza a pacientes y socios y ordena la seguridad. Pero cumplir no es lo mismo que estar seguro: hay que revisar los riesgos de forma continua.

**Lo que demostrarás:**
- 3.1 DESCRIBE LAS PRINCIPALES NORMATIVAS Y ESTÁNDARES DE SEGURIDAD APLICABLES EN ENTORNOS CLOUD, COMO GDPR, HIPAA, Y PCI-DSS.
- 3.2 EXPLICA LA RELEVANCIA DE LAS NORMATIVAS EN LA PROTECCIÓN DE DATOS Y EN EL CUMPLIMIENTO LEGAL.
- 3.3 IDENTIFICA LOS ASPECTOS CLAVE DE CADA NORMATIVA Y SU RELEVANCIA PARA LOS DATOS EN LA NUBE.

## Aprendizaje esperado 4 · ANÁLISIS DE CASOS DE FALLOS DE SEGURIDAD EN LA NUBE

Módulo 2 · FUNDAMENTOS DE SEGURIDAD EN LA NUBE. Qué principio falló, por qué y cómo evitar que se repita.

**Aprendizaje esperado 4:** ANALIZAR CASOS DE FALLOS DE SEGURIDAD EN LA NUBE ACORDE CON LOS PRINCIPIOS DE CONFIDENCIALIDAD, INTEGRIDAD Y DISPONIBILIDAD (CIA)

1. **Cómo analizar un caso.** Contenido: ANÁLISIS DE CASOS DE FALLOS DE SEGURIDAD EN LA NUBE. 1. Qué principio se comprometió. 2. Qué lo causó: una mala configuración, un error humano o una vulnerabilidad explotada. 3. Qué solución mitiga el daño y evita que vuelva a pasar.
2. **Confidencialidad: datos expuestos.** Contenido: CASOS DE EXPOSICIÓN DE DATOS CONFIDENCIALES EN LA NUBE DEBIDO A CONFIGURACIONES INCORRECTAS DE PERMISOS (CONFIDENCIALIDAD) · CAUSAS COMUNES DE FALLOS: ACCESOS NO AUTORIZADOS, CREDENCIALES EXPUESTAS O COMPROMETIDAS, CONFIGURACIONES INCORRECTAS DE CIFRADO (CONFIDENCIALIDAD). Un almacenamiento de exámenes queda público por error, o unas credenciales publicadas en un repositorio abren la cuenta a un extraño. Datos sin cifrar agravan el daño.
3. **Integridad: datos alterados.** Contenido: CASOS EN LOS QUE LA FALTA DE MEDIDAS DE INTEGRIDAD RESULTÓ EN LA CORRUPCIÓN O ALTERACIÓN DE DATOS CRÍTICOS (INTEGRIDAD) · FALTA DE AUDITORÍA O MONITOREO DE CAMBIOS, ACCESO NO AUTORIZADO, ERRORES DE TRANSMISIÓN DE DATOS (INTEGRIDAD). Un cambio sin revisar sobrescribe dosis en cientos de fichas y nadie lo nota por días, o un archivo llega dañado tras una transmisión. Sin auditoría, el error se propaga en silencio.
4. **Disponibilidad: servicios caídos.** Contenido: CAÍDAS DE SERVICIOS EN LA NUBE DEBIDO A ATAQUES DE DENEGACIÓN DE SERVICIO (DDOS) O FALLOS EN LA INFRAESTRUCTURA DE REPLICACIÓN (DISPONIBILIDAD) · FALTA DE REDUNDANCIA, ATAQUES DDOS, DEPENDENCIA DE UN SOLO PROVEEDOR O ZONA DE DISPONIBILIDAD (DISPONIBILIDAD). Un ataque DDoS satura la agenda en línea, o la única zona donde corre la aplicación falla y no hay réplica: la clínica no puede dar horas.
5. **Soluciones y medidas de mitigación.** Contenido: SOLUCIONES: EJEMPLOS DE SOLUCIONES Y MEDIDAS DE MITIGACIÓN PARA CASOS DE FALLO DE CONFIDENCIALIDAD, INTEGRIDAD Y DISPONIBILIDAD. Confidencialidad: bloquear el acceso público, mínimo privilegio, MFA, gestor de secretos y cifrado. Integridad: control de cambios, auditoría, hash y respaldos con versiones. Disponibilidad: varias zonas, balanceo de carga, protección DDoS y recuperación ensayada.

**Lo que demostrarás:**
- 4.1 IDENTIFICA EL PRINCIPIO DE SEGURIDAD (CONFIDENCIALIDAD, INTEGRIDAD O DISPONIBILIDAD) QUE HA SIDO COMPROMETIDO EN EL CASO ANALIZADO.
- 4.2 EXPONE LAS CAUSAS ESPECÍFICAS DEL FALLO EN EL CONTEXTO DE LA NUBE, RELACIONANDO ESTAS CON ERRORES DE CONFIGURACIÓN, FALLOS HUMANOS O VULNERABILIDADES EXPLOTADAS.
- 4.3 PROPONE SOLUCIONES ALINEADAS CON LAS MEJORES PRÁCTICAS DE SEGURIDAD EN LA NUBE PARA MITIGAR EL FALLO Y EVITAR SU RECURRENCIA

## Aprendizaje esperado 5 · LOS PRINCIPIOS CIA Y LOS MODELOS DE DESPLIEGUE

Módulo 2 · FUNDAMENTOS DE SEGURIDAD EN LA NUBE. Pública, privada o híbrida: cada una protege distinto.

**Aprendizaje esperado 5:** RELACIONAR LOS PRINCIPIOS DE CONFIDENCIALIDAD, INTEGRIDAD Y DISPONIBILIDAD (CIA) CON LOS MODELOS DE DESPLIEGUE EN LA NUBE (PÚBLICA, PRIVADA, HÍBRIDA)

1. **Tres modelos, tres balances.** Contenido: MODELOS DE DESPLIEGUE (NUBE PÚBLICA, PRIVADA, HÍBRIDA): CARACTERÍSTICAS, VENTAJAS Y DESVENTAJAS DESDE LA PERSPECTIVA DE LA SEGURIDAD DE DATOS Y LOS PRINCIPIOS CIA. Pública: gran capacidad y redundancia, en infraestructura compartida. Privada: más control sobre los datos, pero la disponibilidad depende de ti. Híbrida: reparte los datos según su sensibilidad, con más puntos que proteger.
2. **La CIA cambia según el modelo.** Contenido: RELACIÓN CON MODELOS DE DESPLIEGUE EN LA NUBE: DIFERENCIAS EN LA APLICACIÓN DE LOS PRINCIPIOS DE SEGURIDAD ENTRE NUBE PÚBLICA, PRIVADA Y HÍBRIDA. En la pública, la confidencialidad depende sobre todo de tu configuración de accesos y cifrado. En la privada controlas todo, también los errores. En la híbrida, el punto crítico es la integridad y la confidencialidad de lo que viaja entre ambas.
3. **Riesgos en cada modelo.** Contenido: RIESGOS EN CADA MODELO. Pública: configuraciones erróneas y cuentas comprometidas. Privada: caídas del propio centro de datos y parches atrasados. Híbrida: datos en tránsito expuestos y políticas distintas en cada lado.
4. **Estrategias de mitigación.** Contenido: ESTRATEGIAS DE MITIGACIÓN EN CADA MODELO. Pública: mínimo privilegio, cifrado y revisión continua de la configuración. Privada: sitio de respaldo, plan de recuperación y gestión de parches. Híbrida: enlace cifrado (VPN o TLS), identidad única y monitoreo central.
5. **Análisis de casos.** Contenido: ANÁLISIS DE CASOS DE CÓMO LOS PRINCIPIOS CIA VARÍAN SEGÚN EL MODELO DE DESPLIEGUE. Clínica Quintral: fichas en la nube privada para cuidar la confidencialidad, agenda en la pública en varias zonas para la disponibilidad y sincronización cifrada y verificada para la integridad.

**Lo que demostrarás:**
- 5.1 EXPLICA CÓMO LOS PRINCIPIOS DE CIA (CONFIDENCIALIDAD, INTEGRIDAD Y DISPONIBILIDAD) SE APLICAN DE MANERA DIFERENCIADA EN CADA MODELO DE DESPLIEGUE (NUBE PÚBLICA, PRIVADA, HÍBRIDA).
- 5.2 IDENTIFICA LOS RIESGOS PARTICULARES DE CADA MODELO EN TÉRMINOS DE SEGURIDAD Y CÓMO AFECTAN A LOS PRINCIPIOS DE CIA.
- 5.3 PROPONE ESTRATEGIAS DE MITIGACIÓN ESPECÍFICAS PARA PROTEGER LA CONFIDENCIALIDAD, INTEGRIDAD Y DISPONIBILIDAD EN CADA MODELO DE DESPLIEGUE

## Aprendizaje esperado 6 · EL MODELO DE RESPONSABILIDAD COMPARTIDA

Módulo 2 · FUNDAMENTOS DE SEGURIDAD EN LA NUBE. Quién protege qué en la nube.

**Aprendizaje esperado 6:** EVALUAR EL MODELO DE RESPONSABILIDAD COMPARTIDA EN SEGURIDAD CLOUD, CONSIDERANDO LAS RESPONSABILIDADES DEL CLIENTE Y DEL PROVEEDOR EN LA PROTECCIÓN DE DATOS Y SERVICIOS

1. **Qué es.** Contenido: QUÉ ES UN MODELO DE RESPONSABILIDAD COMPARTIDA. Un reparto de tareas de seguridad entre el proveedor y el cliente. El proveedor responde por la seguridad de la nube; el cliente, por la seguridad en la nube.
2. **Responsabilidades del proveedor.** Contenido: RESPONSABILIDADES DEL PROVEEDOR. Centros de datos y su seguridad física, hardware, red de la infraestructura y virtualización. En PaaS y SaaS suma el sistema operativo y la aplicación.
3. **Responsabilidades del cliente.** Contenido: RESPONSABILIDADES DEL CLIENTE. Siempre: sus datos, quién tiene cuenta y con qué permisos, y cómo configura cada servicio. Nunca se traspasa por completo al proveedor.
4. **IaaS, PaaS y SaaS.** Contenido: ESCENARIOS SEGÚN MODELO DE SERVICIO: DIFERENCIAS EN EL MODELO DE RESPONSABILIDAD COMPARTIDA EN IAAS, PAAS Y SAAS. IaaS: el cliente administra el sistema operativo, sus parches, las aplicaciones y los datos. PaaS: sus aplicaciones y datos. SaaS: sus datos, usuarios y configuración.
5. **Incidentes por falta de claridad.** Contenido: EJEMPLOS DE INCIDENTES POR FALTA DE CLARIDAD EN LA APLICACIÓN DEL MODELO. Almacenamientos abiertos porque se creía que el proveedor los protegía, bases de datos sin respaldo en IaaS y máquinas virtuales sin parches durante meses.
6. **Evaluación de riesgos.** Contenido: EVALUACIÓN DE RIESGOS: IMPACTO DE NO COMPRENDER O APLICAR CORRECTAMENTE EL MODELO DE RESPONSABILIDAD. Lo que nadie asume queda sin hacer: filtraciones, pérdida de datos, servicios caídos, multas y daño a la confianza de los pacientes.
7. **Medidas de mitigación.** Contenido: MEDIDAS DE MITIGACIÓN. Una matriz de responsabilidades por servicio, revisada en el contrato con el proveedor, auditorías periódicas de la configuración y capacitación al equipo.

**Lo que demostrarás:**
- 6.1 EVALÚA LA DISTRIBUCIÓN DE RESPONSABILIDADES ENTRE EL PROVEEDOR Y EL CLIENTE EN EL CONTEXTO DE LA SEGURIDAD EN LA NUBE.
- 6.2 ANALIZA ESCENARIOS ESPECÍFICOS DE SEGURIDAD CLOUD PARA IDENTIFICAR RIESGOS ASOCIADOS A UNA INCORRECTA APLICACIÓN DEL MODELO DE RESPONSABILIDAD COMPARTIDA.
- 6.3 PROPONE MEDIDAS PARA MEJORAR LA IMPLEMENTACIÓN DEL MODELO DE RESPONSABILIDAD COMPARTIDA EN ORGANIZACIONES.
