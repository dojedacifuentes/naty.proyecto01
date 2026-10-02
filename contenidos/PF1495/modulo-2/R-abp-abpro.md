# PF1495 · Módulo 2 · ABP y ABPRO por aprendizaje esperado

**Estado:** borrador · **Va en:** LMS, una Tarea por actividad · **Pedido:** usuario, 2026-10-02
Por cada aprendizaje esperado hay un **ABP** individual, con un problema breve de otra empresa ficticia, y un **ABPRO** grupal, con roles rotativos, que sigue un caso único que crece de un aprendizaje al siguiente: la prueba autorizada de la tienda web de Librería Fiordo (empresa ficticia), la misma de los quiz del módulo.
Toda práctica se hace solo en entornos propios o de laboratorio, deliberadamente vulnerables y legales (por ejemplo, OWASP Juice Shop o DVWA instalados en tu equipo), con un alcance definido. Nunca en sistemas de terceros.

---

## AE1 · ABP · Las señales de alerta de Ferretería Los Coihues

- **Modalidad:** Individual.
- **Criterios de evaluación:** 1.1, 1.2, 1.3, 1.4

### Contexto

Ferretería Los Coihues (empresa ficticia) vende herramientas en su sitio web y tiene un portal donde sus clientes empresa revisan sus facturas. El último mes ocurrió esto:

1. Un trabajador que dejó la empresa siguió entrando al portal con su usuario antiguo.
2. Varios clientes recibieron un correo que imitaba a la ferretería y les pedía «actualizar la clave» en un enlace.
3. El formulario de contacto acepta cualquier texto y lo muestra tal cual en el panel de administración.
4. El sitio dejó de responder por una avalancha de solicitudes enviadas desde miles de equipos.
5. Al cambiar el número de factura en la dirección web, un cliente vio las facturas de otra empresa.
6. Una persona desconocida publicó en redes sociales que encontró una falla en el portal, sin que nadie le pidiera probarlo.

### Qué tienes que hacer

1. **Conceptos clave (criterio 1.1).** Define con tus palabras ciberseguridad y sus tres objetivos (confidencialidad, integridad y disponibilidad), amenaza, vulnerabilidad, riesgo, incidente y hacking ético. Ilustra cada concepto con una situación de la lista.
2. **Amenazas y vulnerabilidades (criterio 1.2).** Arma una tabla con las seis situaciones: si es una amenaza o una vulnerabilidad, si su origen es interno o externo y su tipo (malware, phishing, ataque de red o vulnerabilidad web, como XSS o pérdida de control de acceso).
3. **Quién está detrás (criterio 1.3).** Para las situaciones 1, 2, 4 y 6, indica qué tipo de atacante podría ser (amenaza interna, ciberdelincuente, hacktivista, sombrero blanco, gris o negro). Cierra en 3 a 5 líneas: ¿qué diferencia a un hacker ético de uno que no lo es?
4. **Impacto en el negocio (criterio 1.4).** Elige las dos situaciones más graves. Para cada una, ejemplifica su impacto: qué objetivo de la ciberseguridad rompe, qué le puede costar a la ferretería (ventas, clientes, reputación o sanciones) y una medida inicial para reducirlo.

### Entrega

Sube a esta Tarea un documento PDF de 1 a 2 páginas con las definiciones, la tabla y tus respuestas a los puntos 3 y 4.

## AE1 · ABPRO · Mapa de amenazas de Librería Fiordo

- **Modalidad:** Grupal, de 4 a 5 personas.
- **Criterios de evaluación:** 1.1, 1.2, 1.3, 1.4

### Contexto

Librería Fiordo (empresa ficticia) vende libros en su tienda web: catálogo con buscador, reseñas de clientes, cuentas de usuario, carro de compras, pago con un proveedor externo y un panel de administración. La librería contrató a su equipo para probar la seguridad de la tienda, con autorización y un alcance acordado. En cada ABPRO del módulo, el equipo avanza en la preparación de esa prueba.

### Problema

La gerencia intuye que «algo podría pasar», pero no sabe qué ni cuánto le costaría. Ya hubo señales: un correo falso que imitó al proveedor de pagos, reseñas con texto extraño y un cliente que vio pedidos ajenos al cambiar un número en la dirección web. Nadie ha ordenado esas señales ni las ha conectado con el negocio.

### Solución

Un **mapa de amenazas** de la tienda para la gerencia: un glosario común, las amenazas y vulnerabilidades más probables, quiénes podrían atacar y qué impacto tendría cada caso. Será la base de la prueba en los próximos ABPRO.

### Desarrollo

1. **Glosario del equipo.** Acuerden una definición breve de ciberseguridad y sus objetivos, amenaza, vulnerabilidad, riesgo, ciberataque, ciberguerra y hacking ético, para hablar con la librería en un mismo idioma (criterio 1.1).
2. **Inventario de la tienda.** Listen las partes de la tienda y qué datos maneja cada una: nombres, direcciones, claves, pedidos o datos de pago.
3. **Amenazas y vulnerabilidades.** Para cada parte, identifiquen al menos una amenaza (malware, phishing o ataque de red) o una vulnerabilidad web común (por ejemplo, inyección, XSS o pérdida de control de acceso) e indiquen si su origen es interno o externo (criterio 1.2).
4. **Cadena de un ataque.** Elijan una amenaza y describan cómo avanzaría paso a paso según la cyber kill chain, desde el reconocimiento hasta el objetivo del atacante (criterio 1.2).
5. **Perfiles de atacante.** Describan tres atacantes posibles para la librería (por ejemplo, un ciberdelincuente que busca datos de pago, un hacktivista o un exempleado) y comparen su motivación con la del equipo, que actúa como hacker ético de sombrero blanco (criterio 1.3).
6. **Impacto para el negocio.** En una tabla, ejemplifiquen cinco casos de vulnerabilidad con el objetivo de seguridad que rompen, su consecuencia para la librería y una prioridad: alta, media o baja (criterio 1.4).
7. **Resumen para el foro.** El portavoz publica en el foro del módulo un resumen de una página o un video breve con las tres amenazas más críticas. Cada equipo comenta el resumen de otro.

### Roles del equipo

Cada integrante asume un rol, que rota en el ABPRO de cada aprendizaje esperado:

- **Coordinador/a:** organiza el trabajo y cuida que todos participen.
- **Analista de amenazas:** conduce el inventario, las amenazas y la cadena del ataque.
- **Analista de negocio:** conduce la tabla de impacto y las prioridades.
- **Documentador/a:** redacta la entrega.
- **Portavoz:** prepara el resumen para el foro. En equipos de 4, el documentador/a asume también este rol.

### Entrega

Una entrega por equipo en esta Tarea: un PDF con el glosario, el inventario, las amenazas y vulnerabilidades, la cadena del ataque, los perfiles de atacante, la tabla de impacto, el enlace al resumen del foro y los nombres de los integrantes con su rol.

## AE2 · ABP · La oferta del experto sin contrato

- **Modalidad:** Individual.
- **Criterios de evaluación:** 2.1, 2.2, 2.3

### Contexto

Agencia de Viajes Rumbo Sur (empresa ficticia) recibió este correo de un experto independiente:

> «Soy hacker ético certificado. Ya hice un escaneo rápido de su sitio y encontré fallas graves. Puedo empezar el lunes sin contrato: basta con que me den la clave del panel. Guardaré una copia de su base de clientes como respaldo. Si no aceptan, publicaré las fallas para alertar a sus clientes.»

La gerente quiere saber si es una buena oferta y qué debería exigir a quien pruebe su sitio.

### Qué tienes que hacer

1. **Qué es y qué no es hacking ético (criterio 2.1).** Identifica cuatro principios del hacking ético que el correo no respeta y explica cada uno en 1 a 2 líneas. Luego indica qué acredita una certificación de la industria (por ejemplo, CEH u OSCP) y qué no reemplaza, y nombra dos metodologías que la agencia podría pedir que se usen.
2. **Marco legal y ético (criterio 2.2).** En una tabla, relaciona el correo con las normas que podrían aplicar en Chile: la Ley 21.459 de delitos informáticos (acceso no autorizado), la ley de protección de datos personales (Ley 19.628, reformada por la Ley 21.719), la de propiedad intelectual (Ley 17.336) y el Convenio de Budapest como tratado de cooperación internacional. No cites artículos: explica qué protege cada una y qué conducta del correo toca. Agrega qué compromiso de los códigos de ética de EC-Council o del Instituto SANS rompe la amenaza de publicar las fallas.
3. **Normas y estándares (criterio 2.3).** Explica en una tabla para qué sirve ISO/IEC 27001, NIST SP 800-53 y la guía de pruebas de OWASP (OWASP TG), y cuál le recomiendas a la agencia para ordenar una prueba de su sitio web.
4. **Respuesta a la gerente.** Redacta en 5 a 8 líneas las condiciones mínimas que la agencia debería exigir antes de autorizar una prueba.

### Entrega

Sube a esta Tarea un documento PDF de 1 a 2 páginas con tus respuestas a los puntos 1 a 4, incluidas las dos tablas y las fuentes que consultaste.

## AE2 · ABPRO · Reglas de la prueba de Librería Fiordo

- **Modalidad:** Grupal, de 4 a 5 personas.
- **Criterios de evaluación:** 2.1, 2.2, 2.3

### Contexto

Con el mapa de amenazas del ABPRO anterior, la gerencia de Librería Fiordo (empresa ficticia) quiere seguir adelante con la prueba. Antes de firmar, su abogada pide entender en qué marco ético, legal y normativo trabajará el equipo.

### Problema

La librería guarda nombres, correos, direcciones y pedidos de sus clientes, y su tienda usa un proveedor de pagos externo. La abogada pregunta: ¿qué pasa si el equipo ve datos personales?, ¿quién responde si la tienda se cae durante la prueba?, ¿puede el equipo probar también el sistema del proveedor de pagos?

### Solución

Un documento de **reglas de la prueba** que la abogada pueda revisar: los principios del equipo, el marco legal y ético, las normas de la industria que se seguirán y un borrador de autorización con el alcance.

### Desarrollo

1. **Principios y metodología.** Expliquen los principios del hacking ético que guiarán al equipo, un hito de la historia del hacking ético que les parezca relevante y qué metodologías y certificaciones dan confianza a la librería (criterio 2.1).
2. **Marco legal.** Expliquen qué implican para la prueba las leyes contra el acceso no autorizado (Ley 21.459), de protección de datos (Ley 19.628 y su reforma), de propiedad intelectual y los tratados de cooperación internacional. Respondan las tres preguntas de la abogada (criterio 2.2).
3. **Códigos de ética.** Comparen los códigos de EC-Council y del Instituto SANS y elijan tres compromisos que el equipo adopta, con un ejemplo de cómo se aplican en la tienda (criterio 2.2).
4. **Normas de la industria.** Expliquen cómo se relacionan con la prueba ISO/IEC 27001, NIST SP 800-53 y OWASP TG, y cuál usarán para ordenar las pruebas web (criterio 2.3).
5. **Borrador de autorización.** Redacten el alcance: qué se prueba y qué no (el proveedor de pagos queda fuera), quién autoriza por escrito, cómo se tratan los datos personales, qué se hace con la evidencia y cuándo se detiene la prueba.
6. **Debate.** Tomen posición en 5 a 8 líneas: ¿debería tratarse distinto a quien encuentra una falla sin autorización y la informa sin pedir nada a cambio?
7. **Resumen para el foro.** El portavoz publica un resumen de una página o un video breve con las reglas clave de la prueba.

### Roles del equipo

Roten los roles respecto del ABPRO anterior:

- **Coordinador/a:** organiza el trabajo y cuida que todos participen.
- **Responsable legal:** conduce el marco legal y las respuestas a la abogada.
- **Responsable de ética y normas:** conduce los códigos de ética y las normas de la industria.
- **Documentador/a:** redacta el borrador de autorización y la entrega.
- **Portavoz:** prepara el resumen para el foro. En equipos de 4, el documentador/a asume también este rol.

### Entrega

Una entrega por equipo en esta Tarea: un PDF con los principios, el marco legal, los compromisos éticos, las normas, el borrador de autorización, la posición del debate, el enlace al resumen del foro y los nombres de los integrantes con su rol.

## AE3 · ABP · Tres avisos de empleo en Seguros Alerce

- **Modalidad:** Individual.
- **Criterios de evaluación:** 3.1, 3.2

### Contexto

Seguros Alerce (empresa ficticia) arma su primer equipo de seguridad y publicó tres avisos:

- **Aviso A:** «Simular ataques autorizados a nuestras aplicaciones web y redactar informes con los hallazgos.»
- **Aviso B:** «Vigilar a diario alertas y registros, investigar actividad sospechosa y proponer mejoras.»
- **Aviso C:** «Revisar si nuestros controles y procesos cumplen las normas y políticas de seguridad.»

Ya contratada, una persona del equipo enfrenta estas situaciones:

1. Su jefe le pide «aprovechar» y probar también el sitio de una aseguradora competidora.
2. Durante una prueba autorizada ve la ficha médica de un asegurado.
3. Una prueba provoca por error que el portal deje de responder.
4. Le piden auditar un sistema que ella misma configuró.
5. Un amigo le pregunta qué fallas tenía el portal de la aseguradora.

### Qué tienes que hacer

1. **Perfiles (criterio 3.1).** Indica qué perfil busca cada aviso (pentester, analista de seguridad o auditor/a de seguridad) y describe en una tabla sus responsabilidades principales y en qué se diferencian.
2. **Conducta y responsabilidades (criterio 3.2).** Para cada situación, indica qué principio está en juego (consentimiento y autorización, confidencialidad y privacidad, transparencia y comunicación, conflicto de interés o responsabilidad profesional) y qué debería hacer la persona.
3. **Tu código de conducta.** Escribe cinco compromisos que firmarías si postularas a uno de los avisos.

### Entrega

Sube a esta Tarea un documento PDF de 1 a 2 páginas con la tabla de perfiles, tus respuestas a las cinco situaciones y tu código de conducta.

## AE3 · ABPRO · Equipo y protocolo de conducta para Librería Fiordo

- **Modalidad:** Grupal, de 4 a 5 personas.
- **Criterios de evaluación:** 3.1, 3.2

### Contexto

Librería Fiordo (empresa ficticia) aprobó las reglas de la prueba del ABPRO anterior. Antes de firmar la autorización, la gerencia quiere saber quién hará qué y cómo se comportará el equipo durante y después de la prueba.

### Problema

Surgieron tres situaciones. El encargado de TI de la librería quiere probar por su cuenta el servidor de correo, que está fuera del alcance. Una integrante del equipo programó hace un año el carro de compras de la tienda. Y la gerencia pregunta a quién y cuándo se le avisará si aparece una falla grave.

### Solución

Una **carta del equipo** para la librería: los perfiles que participan, sus responsabilidades y un protocolo de conducta que responda a las tres situaciones.

### Desarrollo

1. **Perfiles del equipo.** Definan qué perfiles necesita la prueba (pentester, analista de seguridad, auditor/a de seguridad) y qué hará cada uno en la tienda de la librería (criterio 3.1).
2. **Matriz de responsabilidades.** En una tabla, asignen quién responde por cada tarea: la autorización firmada, las pruebas, el resguardo de la evidencia, la comunicación con la librería y el informe (criterio 3.1).
3. **Protocolo de conducta.** Escriban reglas concretas para el consentimiento y la autorización, la confidencialidad y la privacidad, la transparencia y la comunicación, el conflicto de interés y la responsabilidad profesional (criterio 3.2).
4. **Las tres situaciones.** Resuelvan cada situación del problema aplicando el protocolo y expliquen por qué (criterio 3.2).
5. **Caso de estudio.** Busquen un caso real y público de hacking ético o de divulgación responsable de una falla, resúmanlo en 5 a 8 líneas con su fuente y extraigan una lección para el equipo.
6. **Resumen para el foro.** El portavoz publica un resumen de una página o un video breve con el protocolo de conducta.

### Roles del equipo

Roten los roles respecto del ABPRO anterior:

- **Coordinador/a:** organiza el trabajo y cuida que todos participen.
- **Responsable de perfiles:** conduce los perfiles y la matriz de responsabilidades.
- **Responsable de conducta:** conduce el protocolo y la resolución de las situaciones.
- **Investigador/a:** busca y resume el caso de estudio.
- **Documentador/a y portavoz:** redacta la entrega y prepara el resumen para el foro.

### Entrega

Una entrega por equipo en esta Tarea: un PDF con los perfiles, la matriz de responsabilidades, el protocolo, la resolución de las tres situaciones, el caso de estudio, el enlace al resumen del foro y los nombres de los integrantes con su rol.

## AE4 · ABP · La bitácora desordenada de Viña Valle Escondido

- **Modalidad:** Individual.
- **Criterios de evaluación:** 4.1, 4.2, 4.3

### Contexto

Viña Valle Escondido (empresa ficticia) autorizó por escrito una prueba de su tienda web. La bitácora del equipo quedó desordenada:

- a) Se entrega el informe con los hallazgos priorizados y las recomendaciones.
- b) Con autorización, se usa Nmap para listar los servicios y versiones que responden en el servidor de la tienda.
- c) Se busca información pública: dominio, tecnologías mencionadas en avisos de empleo y correos publicados.
- d) Se demuestra que el formulario de cupones permite ver productos ocultos, con una evidencia mínima.
- e) Se evalúa qué datos alcanza ese acceso, sin salir del alcance, y se eliminan las cuentas de prueba creadas.
- f) Con un proxy como OWASP ZAP, se listan las rutas y los formularios del sitio.

### Qué tienes que hacer

1. **Fases (criterio 4.1).** Ordena la bitácora en las cinco fases del hacking ético (reconocimiento, enumeración, explotación, post-explotación e informe) y explica en una línea el objetivo de cada fase.
2. **Ciclo de vida de un ataque (criterio 4.2).** Para cada fase, da un ejemplo de lo que haría un atacante real y en qué se diferencia lo que hace el hacker ético con autorización.
3. **Practica el reconocimiento (criterio 4.2).** Instala OWASP Juice Shop en tu propio equipo y recórrelo como lo haría un cliente: anota cinco datos útiles para una prueba (páginas, formularios, tecnologías visibles). Solo en tu laboratorio, nunca en un sitio real.
4. **Metodologías (criterio 4.3).** Explica qué aporta la guía de pruebas de OWASP y qué aporta PTES (Penetration Testing Execution Standard), y propón cómo repartir un plazo de 10 días hábiles entre las fases, priorizando lo crítico.

### Entrega

Sube a esta Tarea un documento PDF de 1 a 2 páginas con la bitácora ordenada, los ejemplos por fase, tus cinco datos del laboratorio con una captura y la propuesta de metodología y plazos.

## AE4 · ABPRO · Plan de prueba de la tienda de Librería Fiordo

- **Modalidad:** Grupal, de 4 a 5 personas.
- **Criterios de evaluación:** 4.1, 4.2, 4.3

### Contexto

El equipo ya tiene el mapa de amenazas, las reglas de la prueba y su protocolo de conducta. Librería Fiordo (empresa ficticia) firmó la autorización: la prueba cubre solo la tienda web y tiene un plazo de 10 días hábiles.

### Problema

La gerencia necesita saber cómo se hará la prueba, qué herramientas se usarán y qué recibirá al final. Como la tienda es ficticia, el equipo ensaya en OWASP Juice Shop, una tienda deliberadamente vulnerable que cada integrante instala en su propio equipo como réplica de laboratorio.

### Solución

Un **plan de prueba por fases**, con su metodología, su calendario, un ensayo de laboratorio y la estructura del informe que recibirá la librería.

### Desarrollo

1. **Metodología.** Expliquen cómo combinarán la guía de pruebas de OWASP y PTES, desde el acuerdo previo con la librería hasta el informe (criterio 4.3).
2. **Plan por fases.** Para reconocimiento, enumeración, explotación, post-explotación e informe, definan el objetivo, las actividades, las herramientas o técnicas (por ejemplo, búsqueda de información pública, Nmap u OWASP ZAP), la evidencia esperada y los límites (criterio 4.1).
3. **Calendario.** Repartan los 10 días hábiles entre las fases, prioricen las funciones críticas (inicio de sesión, pago y panel de administración), reserven plazo para el informe y fijen cuándo se informa a la librería.
4. **Ensayo en el laboratorio.** En Juice Shop, hagan el reconocimiento y la enumeración: páginas, formularios y tecnologías visibles, con capturas. Para la explotación y la post-explotación, describan con un ejemplo qué se buscaría demostrar y cómo se documentaría la evidencia, sin desarrollar ataques (criterio 4.2).
5. **Estructura del informe.** Propongan el índice: resumen ejecutivo, alcance, metodología, hallazgos con su severidad, recomendaciones y anexos.
6. **Resumen para el foro.** El portavoz publica un resumen de una página o un video breve con el plan por fases.

### Roles del equipo

Roten los roles respecto del ABPRO anterior:

- **Coordinador/a:** organiza el trabajo y arma el calendario.
- **Líder metodológico/a:** conduce la metodología y el plan por fases.
- **Responsable de laboratorio:** guía el ensayo en Juice Shop y reúne las capturas.
- **Documentador/a:** redacta la estructura del informe y la entrega.
- **Portavoz:** prepara el resumen para el foro. En equipos de 4, el documentador/a asume también este rol.

### Entrega

Una entrega por equipo en esta Tarea: un PDF con la metodología, el plan por fases, el calendario, el ensayo con sus capturas, la estructura del informe, el enlace al resumen del foro y los nombres de los integrantes con su rol.
