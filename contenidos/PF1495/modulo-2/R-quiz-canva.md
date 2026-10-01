# PF1495 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** un quiz por aprendizaje esperado del módulo 2 (Quiz n = AEn), con los criterios de evaluación del plan formativo 2026.
**Reparto:** Quiz 1: AE1 · Quiz 2: AE2 · Quiz 3: AE3 · Quiz 4: AE4. Cinco preguntas cada uno, con una sola respuesta correcta y retroalimentación.
**Son formativos:** no llevan nota.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.
**Versión juego** (HTML y SCORM para el LMS, `npm run quiz-juego`): las mismas preguntas como una misión de 5 niveles con XP, combos, energía, comodín 50:50, estrellas, logros e insignia.
**Misión:** integrar el equipo que prueba, con autorización y un alcance acordado, la seguridad de la tienda web de Librería Fiordo.

---

## Quiz 1 · Amenazas, atacantes e impacto (AE1)

**Cuándo:** al cerrar el aprendizaje 1, después de la lectura y el ejercicio guiado.
**Insignia:** Vigía de amenazas · **Siguiente parada:** aprendizaje 2, ética, leyes y normas del hacking ético.

1. *(AE1)* El buscador de la tienda de Librería Fiordo usa lo que escribe cada persona sin validarlo. En ciberseguridad, ¿cómo se clasifica esa situación?
   - a) Una amenaza
   - b) Un riesgo
   - c) Un incidente
   - **d) Una vulnerabilidad**
   *Retroalimentación:* "Una vulnerabilidad es una debilidad que alguien podría aprovechar. La amenaza es quien o lo que podría aprovecharla; el riesgo combina la probabilidad de que ocurra y su impacto, y el incidente es cuando de verdad ocurre."
2. *(AE1)* Una vendedora de Librería Fiordo recibe un correo que imita al proveedor de pagos de la tienda y le pide «confirmar» su clave en un enlace. ¿Qué tipo de amenaza es?
   - a) Malware, porque el correo instala un programa dañino
   - b) Amenaza interna, porque llega a una trabajadora
   - **c) Phishing, porque busca engañarla para robar su clave**
   - d) Ataque de red, porque satura la conexión de la tienda
   *Retroalimentación:* "El phishing es un engaño que suplanta a alguien de confianza para robar datos, como una clave. Es una amenaza externa: viene de fuera, aunque apunte a una persona de la librería."
3. *(AE1)* En la tienda de Librería Fiordo, una reseña de un libro guarda un script que se ejecuta en el navegador de cada persona que la abre. ¿Qué vulnerabilidad web es?
   - a) Inyección SQL
   - **b) Cross-Site Scripting (XSS)**
   - c) Denegación de servicio (DoS)
   - d) Pérdida de control de acceso
   *Retroalimentación:* "En un XSS, el sitio muestra sin tratar lo que escribió un usuario y el navegador de otras personas lo ejecuta como código, lo que puede servir para robar sesiones o engañar a clientes. La inyección SQL, en cambio, altera las consultas a la base de datos."
4. *(AE1)* Sin autorización de nadie, una persona prueba la tienda de Librería Fiordo, encuentra una falla y se la informa a la librería sin pedir nada a cambio. ¿Cómo se le suele clasificar?
   - a) Hacker de sombrero blanco
   - **b) Hacker de sombrero gris**
   - c) Hacker de sombrero negro
   - d) Hacktivista
   *Retroalimentación:* "No buscó dañar, pero actuó sin permiso: por eso se le llama sombrero gris. El sombrero blanco trabaja siempre con autorización, el negro busca dañar o lucrar y el hacktivista ataca para promover una causa política o social."
5. *(AE1)* Un cliente nota que, si cambia el número de pedido en la dirección web de la tienda, ve los pedidos de otras personas, con nombre y domicilio. ¿Qué impacto principal tiene esta falla para Librería Fiordo?
   - **a) Se exponen datos de clientes: riesgo legal y de reputación**
   - b) La tienda queda fuera de línea y deja de vender
   - c) Cambian los precios de los libros sin que nadie lo note
   - d) Se instala malware en los equipos de los clientes
   *Retroalimentación:* "La falla rompe la confidencialidad: personas sin permiso ven datos personales. Para el negocio, eso puede traer sanciones, reclamos y pérdida de confianza; la integridad y la disponibilidad son los otros dos objetivos de la ciberseguridad."

---

## Quiz 2 · Ética, leyes y normas (AE2)

**Cuándo:** al cerrar el aprendizaje 2, después de la lectura y el ejercicio guiado.
**Insignia:** Guardián/a del marco ético · **Siguiente parada:** aprendizaje 3, rol y responsabilidades del hacker ético.

1. *(AE2)* Verdadero o falso: «Si tienes una certificación de hacking ético, como CEH, puedes probar la seguridad de cualquier sitio web sin pedir permiso.»
   - a) Verdadero
   - **b) Falso**
   *Retroalimentación:* "Una certificación acredita conocimientos, pero no da permiso. Sin la autorización del dueño del sistema, la prueba es un acceso no autorizado, que las leyes pueden sancionar."
2. *(AE2)* Librería Fiordo también te pide revisar su red interna, pero tu experiencia es solo en aplicaciones web. Según los códigos de ética de EC-Council y del Instituto SANS, ¿qué corresponde?
   - a) Aceptar y aprender sobre la marcha, para no perder el trabajo
   - b) Aceptar y subcontratar a otra persona sin avisarle a la librería
   - **c) Decir con honestidad hasta dónde llega tu experiencia**
   - d) Aceptar y cobrar menos, para compensar tu falta de experiencia
   *Retroalimentación:* "Ambos códigos piden actuar con honestidad sobre tus capacidades y trabajar en tus áreas de competencia. Así la librería decide con información real; por ejemplo, sumar a alguien con experiencia en redes."
3. *(AE2)* En la prueba autorizada, una falla te deja ver nombres, correos y direcciones de clientes de Librería Fiordo. Según los principios de las leyes de protección de datos, ¿qué haces?
   - a) Copias la base completa al informe, como evidencia de la falla
   - b) Guardas los datos para compararlos en pruebas de otras empresas
   - c) Avisas directamente a cada cliente que sus datos quedaron expuestos
   - **d) Ves solo lo justo para probar la falla, sin copiar ni difundir datos**
   *Retroalimentación:* "Las leyes de protección de datos piden tratar los datos personales solo para un fin legítimo, en la medida necesaria y con resguardo. En el informe basta una evidencia mínima con los datos ocultos; avisar a los clientes le corresponde a la librería, responsable de esos datos."
4. *(AE2)* Librería Fiordo quiere que una entidad externa certifique que gestiona la seguridad de su información de forma ordenada en toda la empresa. ¿Qué norma corresponde?
   - **a) ISO/IEC 27001**
   - b) NIST SP 800-53
   - c) Guía de pruebas de OWASP
   - d) Código de ética de EC-Council
   *Retroalimentación:* "ISO/IEC 27001 fija los requisitos de un sistema de gestión de seguridad de la información, y una entidad externa puede certificar que la empresa los cumple. La guía de OWASP orienta pruebas web y el código de EC-Council, la conducta de las personas."
5. *(AE2)* ¿Qué ofrece NIST SP 800-53?
   - a) Una certificación personal para quienes hacen hacking ético
   - b) Una guía para probar la seguridad de aplicaciones web
   - **c) Un catálogo de controles de seguridad y privacidad**
   - d) Un código de ética para profesionales de la seguridad
   *Retroalimentación:* "NIST SP 800-53 reúne controles de seguridad y privacidad para elegir cuáles aplicar a cada sistema. No certifica personas, no es una guía de pruebas web ni un código de ética."

---

## Quiz 3 · Rol y responsabilidades (AE3)

**Cuándo:** al cerrar el aprendizaje 3, después de la lectura y el ejercicio guiado.
**Insignia:** Profesional de confianza · **Siguiente parada:** aprendizaje 4, fases y metodologías del hacking ético.

1. *(AE3)* En Librería Fiordo, una persona del área de TI revisa a diario las alertas y los registros de la tienda para detectar actividad sospechosa y proponer mejoras. ¿Qué perfil es?
   - a) Pentester
   - b) Auditor/a de seguridad
   - **c) Analista de seguridad**
   - d) Desarrollador/a web
   *Retroalimentación:* "El analista de seguridad vigila los sistemas en el día a día, investiga lo sospechoso y propone protecciones."
2. *(AE3)* ¿Qué diferencia el trabajo de un pentester del de un auditor o auditora de seguridad?
   - **a) El pentester simula ataques autorizados; el auditor revisa si se cumplen las normas**
   - b) El pentester trabaja sin autorización; el auditor trabaja siempre con autorización
   - c) El pentester solo revisa documentos; el auditor ataca los sistemas en producción
   - d) Son el mismo rol, solo que con distinto nombre según la empresa
   *Retroalimentación:* "Los dos trabajan con autorización. El pentester busca fallas explotables con un ataque controlado; el auditor verifica que los controles y procesos cumplan la norma y las políticas acordadas."
3. *(AE3)* La autorización cubre solo la tienda web de Librería Fiordo. En medio de la prueba notas que su servidor de correo parece tener una falla. ¿Qué haces?
   - a) Lo pruebas rápido, porque es de la misma empresa
   - b) Lo pruebas y lo sumas como hallazgo extra al informe
   - c) Lo ignoras y no lo mencionas, porque está fuera del alcance
   - **d) No lo pruebas, pero se lo informas a la librería para que decida**
   *Retroalimentación:* "Sin autorización no se prueba, aunque sea de la misma empresa. Callar tampoco corresponde: avisar lo que viste es parte de la transparencia, y la librería decide si amplía la autorización por escrito."
4. *(AE3)* Terminada la prueba, una persona que trabaja en otra librería te pregunta qué fallas tenía la tienda de Librería Fiordo. ¿Qué haces?
   - a) Le cuentas solo las fallas ya corregidas, porque ya no son riesgo
   - **b) No le cuentas: los hallazgos son confidenciales y pertenecen al cliente**
   - c) Le cuentas las fallas graves, para que proteja su propia tienda
   - d) Le envías el informe, porque el trabajo ya terminó
   *Retroalimentación:* "Lo que conoces en una prueba es confidencial, también después de terminarla. Solo se comparte con quien Librería Fiordo autorice."
5. *(AE3)* Librería Fiordo te pide evaluar la seguridad de su tienda web, que programaste tú hace un año. ¿Qué corresponde?
   - a) Aceptar sin comentarlo, porque conoces mejor que nadie el código
   - b) Aceptar y dejar fuera del informe las fallas de tu propio código
   - **c) Declarar el conflicto de interés antes de aceptar el trabajo**
   - d) Aceptar y pedir que un colega firme el informe en tu lugar
   *Retroalimentación:* "Evaluar tu propio trabajo es un conflicto de interés: podrías pasar por alto tus propios errores. Declararlo a tiempo es parte de la transparencia y la responsabilidad profesional; luego la librería decide."

---

## Quiz 4 · Fases y metodologías (AE4)

**Cuándo:** al cerrar el aprendizaje 4, después de la lectura y el ejercicio guiado.
**Insignia:** Estratega de pruebas · **Siguiente parada:** la evaluación del módulo 2.

1. *(AE4)* Según el proceso de hacking ético del curso, ¿en qué orden van las fases?
   - a) Enumeración, reconocimiento, explotación, informe, post-explotación
   - **b) Reconocimiento, enumeración, explotación, post-explotación, informe**
   - c) Reconocimiento, explotación, enumeración, informe, post-explotación
   - d) Explotación, reconocimiento, enumeración, post-explotación, informe
   *Retroalimentación:* "El proceso parte por reunir información y termina con el informe para el cliente. Cada fase usa lo que dejó la anterior."
2. *(AE4)* Ya reuniste la información pública de Librería Fiordo. Ahora, con autorización, usas un escáner como Nmap sobre el servidor de la tienda para listar qué servicios responden y qué versiones usan. ¿En qué fase estás?
   - a) Reconocimiento
   - b) Explotación
   - **c) Enumeración**
   - d) Post-explotación
   *Retroalimentación:* "En la enumeración interactúas con el objetivo para listar servicios, versiones y otros detalles. El reconocimiento reúne información pública, y la explotación recién intenta aprovechar una falla."
3. *(AE4)* Con autorización, ya demostraste que una falla del panel de la tienda permite entrar como administrador. Ahora evalúas qué datos y qué otros sistemas quedarían expuestos desde ese acceso, sin salir de lo acordado. ¿Qué fase es?
   - a) Explotación
   - b) Enumeración
   - c) Informe
   - **d) Post-explotación**
   *Retroalimentación:* "La explotación demuestra que la falla se puede aprovechar; la post-explotación mide su impacto real: qué información y qué sistemas alcanza ese acceso. Todo, dentro de lo autorizado."
4. *(AE4)* Tu equipo usa dos metodologías: la guía de pruebas de OWASP y PTES (Penetration Testing Execution Standard). ¿Qué aporta cada una?
   - **a) OWASP guía las pruebas web; PTES, la prueba completa, del acuerdo al informe**
   - b) OWASP fija las leyes que aplican; PTES, las certificaciones que exige el equipo
   - c) OWASP sirve solo para redes internas; PTES, solo para aplicaciones móviles
   - d) OWASP certifica a la empresa; PTES certifica a cada pentester del equipo
   *Retroalimentación:* "La guía de pruebas de OWASP se especializa en aplicaciones web y ordena las pruebas por áreas, como autenticación o validación de entradas. PTES describe el proceso completo, desde el acuerdo previo con el cliente, donde se fija el alcance, hasta el informe."
5. *(AE4)* La prueba de la tienda de Librería Fiordo tiene 10 días hábiles. ¿Qué plan de trabajo es más sensato?
   - a) Usar los 10 días en explotar fallas y entregar el informe después del plazo
   - **b) Repartir los días por fase, priorizar lo crítico y dejar tiempo al informe**
   - c) Probar funciones al azar, sin un orden definido, hasta que se acabe el tiempo
   - d) Dedicar 9 días al reconocimiento y solo 1 día a todas las demás fases
   *Retroalimentación:* "Planificar es parte de la metodología: repartes el tiempo entre las fases, partes por lo más crítico, como el pago o el inicio de sesión, y reservas tiempo para el informe, que es lo que recibe el cliente."

---

## Cobertura de criterios

- Quiz 1 (AE1): criterio 1.1 → preguntas 1 y 5; criterio 1.2 → preguntas 2 y 3; criterio 1.3 → pregunta 4; criterio 1.4 → pregunta 5 (y el impacto del XSS en la retroalimentación de la 3).
- Quiz 2 (AE2): criterio 2.1 → preguntas 1 y 2; criterio 2.2 → preguntas 1, 2 y 3; criterio 2.3 → preguntas 4 y 5.
- Quiz 3 (AE3): criterio 3.1 → preguntas 1 y 2; criterio 3.2 → preguntas 3, 4 y 5.
- Quiz 4 (AE4): criterio 4.1 → pregunta 1; criterio 4.2 → preguntas 2 y 3; criterio 4.3 → preguntas 4 y 5.
