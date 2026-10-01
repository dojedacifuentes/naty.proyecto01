# PF1485 · Quiz del módulo 2 para Canva

**Estado:** borrador · **Estándar:** un quiz por aprendizaje esperado del módulo 2 (Quiz n = AEn), con los criterios de evaluación del plan formativo 2026.
**Reparto:** Quiz 1: AE1 · Quiz 2: AE2 · Quiz 3: AE3 · Quiz 4: AE4 · Quiz 5: AE5 (uno por AE). Cinco preguntas cada uno, con una sola respuesta correcta y retroalimentación.
**Son formativos:** no llevan nota.
**Formato:** la respuesta correcta va en negrita. Cada pregunta dice su aprendizaje esperado.
**Versión juego** (HTML y SCORM para el LMS, `npm run quiz-juego`): las mismas preguntas como una misión de 5 niveles con XP, combos, energía, comodín 50:50, estrellas, logros e insignia.
**Misión:** acompañar a Buses Quillay, que vende pasajes de bus por internet, en su paso a una forma de trabajo DevOps.

---

## Quiz 1 · Qué es DevOps (AE1)

**Cuándo:** al cerrar el aprendizaje 1, después de la lectura y del análisis guiado del caso de Buses Quillay.
**Insignia:** Puente entre Dev y Ops · **Siguiente parada:** aprendizaje 2, organización, personas y cultura.

1. *(AE1)* En Buses Quillay, desarrollo quiere publicar cambios seguido y operaciones frena cada cambio para que el sitio de venta no se caiga. Cuando algo falla, cada área culpa a la otra. ¿Qué problema de la industria dio origen a DevOps?
   - a) La falta de lenguajes de programación modernos
   - b) El alto precio de los servidores en los años noventa
   - **c) La separación entre desarrollo y operaciones, con metas opuestas**
   - d) La ausencia de metodologías para documentar el software
   *Retroalimentación:* "Desarrollo (Dev) busca cambiar rápido y operaciones (Ops) busca estabilidad. Separados, se culpan y el negocio espera meses por cada mejora. DevOps nace para unirlos con metas compartidas, en plena transformación digital."
2. *(AE1)* DevOps se resume en los valores CALMS. ¿Qué significan sus letras?
   - **a) Cultura, Automatización, Lean, Medición y Compartir**
   - b) Código, Agilidad, Licencias, Monitoreo y Seguridad
   - c) Calidad, Arquitectura, Lanzamiento, Mantenimiento y Soporte
   - d) Cultura, Agilidad, Liderazgo, Métricas y Scrum
   *Retroalimentación:* "CALMS: Culture (cultura de colaboración), Automation (automatizar lo repetitivo), Lean (flujo sin desperdicio), Measurement (medir para decidir) y Sharing (compartir conocimiento y responsabilidad)."
3. *(AE1)* Para la gerencia de Buses Quillay, ¿qué beneficio para la organización trae adoptar DevOps?
   - a) Garantiza que el sitio no volverá a tener fallas
   - **b) Lanzar mejoras más rápido y con menos fallas, respondiendo antes al mercado**
   - c) Reduce a cero el gasto en tecnología
   - d) Evita tener que medir los resultados de cada cambio
   *Retroalimentación:* "Con entregas pequeñas y frecuentes, la empresa responde antes a sus clientes y se recupera más rápido de los errores. DevOps no elimina las fallas ni los costos: los reduce y los hace visibles con métricas."
4. *(AE1)* ¿Cuál es un beneficio de DevOps para el equipo de trabajo?
   - a) Cada área trabaja aislada con sus propias metas
   - b) Ya no es necesario probar el software
   - c) Desaparecen los roles de operaciones
   - **d) Menos trabajo manual repetitivo y menos conflictos, con metas compartidas**
   *Retroalimentación:* "Al automatizar lo repetitivo y compartir la responsabilidad del servicio, el equipo tiene menos urgencias nocturnas, más tiempo para mejorar y una colaboración más sana. La cultura DevOps pone a las personas en el centro."
5. *(AE1)* Buses Quillay guarda datos de pago y quiere revisar la seguridad desde el inicio de cada cambio, no al final. ¿Qué variación de DevOps aplica?
   - a) DASA
   - b) Scrum
   - **c) DevSecOps**
   - d) Cascada
   *Retroalimentación:* "DevSecOps integra la seguridad en todo el ciclo, con revisiones automáticas en cada cambio. DASA (DevOps Agile Skills Association) es una asociación que define competencias y certificaciones DevOps, una de las vías de certificación de la industria."

---

## Quiz 2 · Organización, personas y cultura (AE2)

**Cuándo:** al cerrar el aprendizaje 2, después de la lectura y del análisis de la cultura de Buses Quillay.
**Insignia:** Lector/a de culturas · **Siguiente parada:** aprendizaje 3, prácticas esenciales y roles DevOps.

1. *(AE2)* ¿Qué es la cultura organizacional?
   - a) El organigrama con los cargos de la empresa
   - b) El reglamento interno firmado por cada trabajador
   - **c) Los valores, creencias y formas de actuar compartidas que guían el trabajo**
   - d) Las actividades recreativas que organiza la empresa
   *Retroalimentación:* "La cultura es lo que la gente de la organización comparte y hace sin que esté escrito: valores, creencias, ritos, lenguaje y normas no escritas. Da identidad, orienta las decisiones y se nota en cómo se trabaja cada día."
2. *(AE2)* En Buses Quillay, cada error termina con la búsqueda de un culpable. ¿Qué efecto tiene esa cultura en sus procesos?
   - **a) Las personas ocultan errores y evitan proponer cambios, y los problemas se repiten**
   - b) Los errores desaparecen porque todos trabajan con más cuidado
   - c) Los equipos colaboran más para defenderse juntos
   - d) No tiene efecto: la cultura no influye en los procesos
   *Retroalimentación:* "Cuando equivocarse se castiga, la información se esconde y nadie aprende. Por eso DevOps propone revisiones sin culpables: se busca qué falló en el proceso, no a quién culpar."
3. *(AE2)* Según el modelo de Ron Westrum, muy usado en DevOps, ¿cómo es una cultura generativa?
   - a) El poder se concentra y la información se usa para protegerse
   - **b) La información fluye, las áreas cooperan y las fallas llevan a aprender**
   - c) Todo se rige por reglas y cada departamento defiende lo suyo
   - d) Se premia a quien resuelve solo, sin compartir lo que sabe
   *Retroalimentación:* "Westrum distingue tres tipos: patológica (orientada al poder), burocrática (orientada a las reglas) y generativa (orientada al desempeño). La generativa es la que mejor acompaña a DevOps."
4. *(AE2)* En otra empresa, todo se rige por normas, jerarquías y procedimientos formales, y lo que más se valora es la estabilidad y el control. Según el modelo de Cameron y Quinn, ¿qué tipo de cultura es?
   - a) De clan
   - b) Adhocrática
   - c) De mercado
   - **d) Jerárquica**
   *Retroalimentación:* "Cameron y Quinn describen cuatro tipos: clan (colaboración, como una familia), adhocrática (innovación y riesgo), de mercado (resultados y competencia) y jerárquica (control y estabilidad). Una cultura jerárquica muy rígida puede frenar la adopción de DevOps."
5. *(AE2)* El jefe de operaciones de Buses Quillay dice: «Mi trabajo es que nada cambie; si desarrollo quiere publicar, que espere al comité mensual». ¿Qué amenaza cultural para DevOps muestra?
   - a) Exceso de automatización
   - b) Falta de herramientas de monitoreo
   - **c) Silos y resistencia al cambio**
   - d) Demasiada colaboración entre áreas
   *Retroalimentación:* "Los silos aparecen cuando cada área defiende sus metas sin compartirlas; la resistencia al cambio, cuando lo nuevo se ve como amenaza. Se mitigan con metas comunes, liderazgo que patrocine el cambio, comunicación y pequeños éxitos visibles."

---

## Quiz 3 · Prácticas esenciales y roles (AE3)

**Cuándo:** al cerrar el aprendizaje 3, después de la lectura y del recorrido guiado por el ciclo de vida DevOps.
**Insignia:** Maquinista del pipeline · **Siguiente parada:** aprendizaje 4, release management y metodologías.

1. *(AE3)* Según el ciclo de vida DevOps del curso, ¿qué orden siguen las etapas?
   - a) Despliegue, desarrollo, monitoreo, prueba e integración
   - **b) Desarrollo, prueba, integración, despliegue y monitoreo**
   - c) Monitoreo, despliegue, integración, prueba y desarrollo
   - d) Prueba, desarrollo, despliegue, integración y monitoreo
   *Retroalimentación:* "El ciclo parte con el desarrollo y termina con el monitoreo, que entrega información para el siguiente ciclo: por eso se dibuja como un ciclo sin fin y no como una línea."
2. *(AE3)* Cada vez que alguien sube código al repositorio de Buses Quillay, un servidor lo compila, ejecuta las pruebas automáticas y avisa si algo falla. ¿Qué práctica es?
   - **a) Integración continua**
   - b) Entrega continua
   - c) Infraestructura como código
   - d) Monitorización y registro
   *Retroalimentación:* "En la integración continua, cada cambio se integra y se prueba de forma automática y seguida, para detectar errores pronto. La entrega continua da el paso siguiente: deja cada versión lista para pasar a producción."
3. *(AE3)* Los servidores del sitio de venta se crean desde archivos de configuración guardados en Git, en vez de configurarlos a mano. ¿Qué práctica es?
   - a) Automatización de pruebas
   - b) Integración continua
   - **c) Infraestructura como código**
   - d) Control de versiones del contenido web
   *Retroalimentación:* "Con infraestructura como código, los servidores, redes y permisos se describen en archivos versionados: se pueden revisar, repetir y recrear igual cada vez, sin pasos manuales olvidados."
4. *(AE3)* Para que la aplicación funcione igual en el computador del desarrollador y en producción, el equipo la empaqueta con todo lo que necesita y usa una herramienta que administra muchos de esos paquetes a la vez. ¿Qué herramientas son?
   - a) Control de versiones y ramas
   - b) Pruebas unitarias y de integración
   - c) Alertas y paneles de monitoreo
   - **d) Contenedores y orquestación**
   *Retroalimentación:* "Un contenedor, por ejemplo con Docker, empaqueta la aplicación con sus dependencias; un orquestador, como Kubernetes, los despliega, escala y reinicia. Junto al control de versiones (Git) y la monitorización, son herramientas clave de DevOps."
5. *(AE3)* En el equipo de Buses Quillay, ¿qué responsabilidad corresponde a un especialista DevOps?
   - a) Fijar el precio de los pasajes según la temporada
   - **b) Construir y mantener los pipelines y la automatización, y acercar desarrollo y operaciones**
   - c) Escribir las historias de usuario y priorizar el backlog
   - d) Aprobar a mano cada cambio antes de publicarlo
   *Retroalimentación:* "El especialista DevOps automatiza la integración, el despliegue y la infraestructura, y promueve la colaboración. Necesita habilidades técnicas (scripting, nube, contenedores) y blandas (comunicación, trabajo en equipo). Priorizar el backlog le toca al Product Owner."

---

## Quiz 4 · Release management y metodologías (AE4)

**Cuándo:** al cerrar el aprendizaje 4, después de la lectura y de comparar cascada con Scrum en el caso de Buses Quillay.
**Insignia:** Estratega de entregas · **Siguiente parada:** aprendizaje 5, adopción de DevOps en la organización.

1. *(AE4)* Antes, Buses Quillay hacía dos grandes lanzamientos al año, a mano y un fin de semana completo. ¿Qué cambia en el release management con DevOps?
   - a) Se elimina: ya no hace falta planificar las versiones
   - b) Se hacen aún menos lanzamientos, pero más grandes
   - **c) Se pasa a entregas pequeñas, frecuentes y automatizadas**
   - d) Cada desarrollador publica en producción sin pruebas
   *Retroalimentación:* "El release management planifica, controla y coordina la salida de versiones. Con DevOps no desaparece: se apoya en la automatización para publicar cambios pequeños y frecuentes, con menos riesgo en cada uno."
2. *(AE4)* Buses Quillay hizo su primer sistema en cascada: meses de requisitos, luego diseño, programación y pruebas, y recién al final lo vieron los clientes. ¿Qué característica de cascada explica que hubo que rehacer partes?
   - **a) Las etapas son secuenciales y el cliente ve el producto al final, cuando cambiar cuesta caro**
   - b) Las etapas se repiten cada dos semanas con el cliente
   - c) No tiene documentación ni planificación
   - d) Permite cambiar los requisitos en cualquier momento sin costo
   *Retroalimentación:* "En cascada, cada etapa empieza cuando termina la anterior. Sirve cuando los requisitos son estables, pero los errores de entendimiento se descubren tarde. Las metodologías ágiles, en cambio, entregan y validan en ciclos cortos."
3. *(AE4)* Ahora, cada dos semanas el equipo entrega una parte que funciona —primero la búsqueda de pasajes, luego el pago— y la mejora según lo que dicen los clientes. ¿Qué concepto aplica?
   - a) Desarrollo en cascada
   - b) Release management tradicional
   - c) Infraestructura como código
   - **d) Desarrollo iterativo e incremental**
   *Retroalimentación:* "Iterativo: se trabaja en ciclos que se repiten y mejoran. Incremental: cada ciclo suma una parte que funciona. Es la base de las metodologías ágiles y encaja con la entrega continua de DevOps."
4. *(AE4)* ¿Cuál de estos es un valor del Manifiesto Ágil (2001)?
   - a) Documentación extensiva por sobre software funcionando
   - **b) Individuos e interacciones por sobre procesos y herramientas**
   - c) Seguir un plan por sobre responder al cambio
   - d) Negociación contractual por sobre colaboración con el cliente
   *Retroalimentación:* "Los cuatro valores son: individuos e interacciones sobre procesos y herramientas, software funcionando sobre documentación extensiva, colaboración con el cliente sobre negociación contractual y respuesta ante el cambio sobre seguir un plan. Los distractores invierten ese orden."
5. *(AE4)* En Scrum, ¿quién ordena el Product Backlog según el valor para el negocio?
   - a) El Scrum Master
   - b) Los Developers
   - **c) El Product Owner**
   - d) El jefe de operaciones
   *Retroalimentación:* "El Product Owner maximiza el valor del producto y ordena el Product Backlog. El Scrum Master facilita y remueve impedimentos, y los Developers construyen el incremento en cada Sprint. Los artefactos son el Product Backlog, el Sprint Backlog y el Incremento."

---

## Quiz 5 · Adopción de DevOps en la organización (AE5)

**Cuándo:** al cerrar el aprendizaje 5, después de la lectura y del plan de adopción para Buses Quillay.
**Insignia:** Agente del cambio · **Siguiente parada:** la evaluación del módulo 2.

1. *(AE5)* La primera de las tres maneras (o tres vías) de DevOps busca…
   - **a) que el trabajo fluya rápido de desarrollo a operaciones y al cliente**
   - b) que cada falla tenga un responsable identificado
   - c) que los equipos trabajen separados para no interferir
   - d) que las versiones se publiquen solo una vez al año
   *Retroalimentación:* "La primera manera es el flujo: ver el sistema completo y acelerar el paso del trabajo de izquierda a derecha, con lotes pequeños y sin cuellos de botella."
2. *(AE5)* Buses Quillay agrega monitoreo y alertas para saber en minutos si una versión nueva aumenta los errores de pago. ¿Qué manera aplica?
   - a) La primera: el flujo
   - b) Ninguna: el monitoreo es solo tarea de operaciones
   - **c) La segunda: la retroalimentación**
   - d) La tercera: la experimentación
   *Retroalimentación:* "La segunda manera amplifica la retroalimentación de derecha a izquierda: detectar problemas pronto, donde se originan, para corregirlos antes de que lleguen a más clientes."
3. *(AE5)* Tras cada incidente, el equipo hace una revisión sin culpables y reserva tiempo cada mes para probar mejoras. ¿Qué manera es?
   - a) La primera: el flujo
   - b) La segunda: la retroalimentación
   - c) Ninguna: es una práctica de cascada
   - **d) La tercera: el aprendizaje y la experimentación continuos**
   *Retroalimentación:* "La tercera manera crea una cultura que aprende de los errores, experimenta y comparte lo aprendido. Las tres maneras se describen en libros como The Phoenix Project y The DevOps Handbook."
4. *(AE5)* Buses Quillay quiere empezar su adopción de DevOps. ¿Qué primer paso es más sensato?
   - a) Comprar una herramienta y exigir que todos la usen desde mañana
   - **b) Evaluar cómo trabaja hoy, fijar metas medibles y partir con un piloto**
   - c) Cambiar a todos los equipos a la vez, sin medir la situación actual
   - d) Crear un área DevOps aparte que reciba los encargos de las demás
   *Retroalimentación:* "La adopción es un proceso: diagnóstico, objetivos medibles (por ejemplo, frecuencia de despliegue o tiempo de recuperación), un piloto acotado, medición y luego ampliación. Un área DevOps aislada solo crea un silo nuevo."
5. *(AE5)* En el piloto, los líderes de área temen perder control y algunos equipos no quieren cambiar su forma de trabajar. ¿Qué recomendación ayuda a superar ese desafío?
   - a) Imponer el cambio y sancionar a quien se resista
   - b) Postergar la adopción hasta que todos estén de acuerdo
   - c) Dejar que cada equipo decida sin metas comunes
   - **d) Patrocinio de la gerencia, metas compartidas, capacitación y mostrar los logros del piloto**
   *Retroalimentación:* "Las estrategias que funcionan combinan liderazgo visible, metas compartidas entre áreas, formación y comunicación de resultados. Los casos de éxito muestran que la cultura cambia con pequeños logros que se ven."

---

## Cobertura de criterios

- Quiz 1 (AE1): criterio 1.1 → preguntas 1 y 5; criterio 1.2 → pregunta 2; criterio 1.3 → preguntas 3 y 4.
- Quiz 2 (AE2): criterio 2.1 → preguntas 1 y 2; criterio 2.2 → preguntas 3 y 4; criterio 2.3 → preguntas 2 y 5.
- Quiz 3 (AE3): criterio 3.1 → preguntas 2, 3 y 4; criterio 3.2 → pregunta 5; criterio 3.3 → pregunta 1.
- Quiz 4 (AE4): criterio 4.1 → pregunta 2; criterio 4.2 → preguntas 1, 3 y 4; criterio 4.3 → pregunta 5.
- Quiz 5 (AE5): criterio 5.1 → pregunta 4; criterio 5.2 → preguntas 1, 2 y 3; criterio 5.3 → pregunta 5.
