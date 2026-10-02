# PF1482 · Módulo 2 · Actividad final integradora

Fuente de la actividad final integradora del módulo 2 para `npm run evaluacion -- PF1482`. Integra los cuatro contenidos del módulo en el análisis del rol del arquitecto sobre un caso de empresa ficticia.

## 03 · Actividad final integradora: TuTurno deja de instalarse en cada clínica
- **Archivo:** M2-03-Actividad-final-integradora
- **Rótulo:** Evaluación y cierre del módulo · cierre
- **Momento:** Al cierre del módulo, después de resolver las actividades de sus cuatro contenidos
- **Modalidad:** Individual, con entrega en el LMS
- **Calificación:** pauta en puntos, exigencia 60 %
- **Competencia del módulo:** {{competencia}}

### Contexto

TuTurno (empresa ficticia) vende un sistema de agenda de citas para centros médicos. Hoy se instala en un servidor de cada clínica: 40 clientes, cada uno con su propia versión, actualizaciones manuales que tardan semanas en llegar a todos y caídas cada vez que un servidor local falla. El equipo de producto quiere convertirlo en un servicio en la nube, con una sola versión para todos los clientes, reserva por web y por aplicación móvil y recordatorios por WhatsApp y correo.

Algunos datos del caso:

- Se agendan unas 120.000 citas al mes y los lunes en la mañana la demanda se multiplica por cinco.
- La agenda guarda datos personales y de salud de los pacientes.
- El desarrollo lo hace un equipo de siete personas que trabaja con Scrum; tú te sumas como arquitecto/a de la solución.
- La gerencia pide que el sistema no se caiga en los días de mayor demanda y que el costo de la nube crezca con los clientes, no antes.

### El desafío

Como arquitecto/a de TuTurno, prepara un documento que oriente al equipo durante el ciclo de vida del nuevo servicio: qué modelo de distribución adoptar, cómo se ve la arquitectura, cómo participas tú en un equipo ágil y qué atributos de calidad guían las decisiones. No se pide construir ni desplegar nada: se pide razonar, decidir y dejarlo documentado para que otros lo entiendan.

### Qué tienes que entregar

1. **Del software instalado al servicio en la nube.** Compara el modelo actual (on-premise) con el software como servicio para TuTurno y sus clientes, con ventajas y desventajas de cada uno, y explica si conviene un SaaS multicliente. Identifica los servicios cloud que necesita la solución (cómputo, arquitectura elástica, distribución de la carga, almacenamiento de archivos y de datos, integración con WhatsApp y correo) y arma una tabla con el servicio equivalente en tres proveedores principales.
2. **El rol del arquitecto en el ciclo de vida.** Define arquitectura de software con tus palabras y describe tus responsabilidades en cada etapa del ciclo (requisitos, diseño, construcción, pruebas, despliegue y operación): qué decides, con quién y qué dejas documentado. Registra una decisión de arquitectura en formato breve (contexto, alternativas, decisión y consecuencias), por ejemplo, una base de datos por clínica o una compartida.
3. **Diagramas de la arquitectura.** Dibuja con el modelo C4 el diagrama de contexto y el de contenedores. Con UML, un diagrama de secuencia de «reservar una cita» (visión dinámica) y uno de componentes o de despliegue (visión estática). Agrega una tabla de los casos de uso principales (visión funcional). Pueden ser simples, hechos en draw.io, PlantUML o a mano, siempre que se lean bien.
4. **El arquitecto en un equipo ágil.** Contrasta un desarrollo tradicional en cascada con Scrum para este caso, usando el equilibrio entre predictibilidad y adaptabilidad. Relaciona dos valores del Manifiesto Ágil con los principios que los sostienen y que más tocan tu trabajo. Explica cómo participas en los eventos y artefactos de Scrum sin ser un cuello de botella y propone un plan de tres incrementos que entreguen valor desde el primero. Cierra con dos desafíos del arquitecto en un proceso iterativo e incremental y cómo los enfrentarías.
5. **Atributos y escenarios de calidad.** Elige cuatro atributos de calidad de la norma ISO/IEC 25010 que sean prioritarios para TuTurno y justifica el orden. Escribe tres escenarios de calidad completos (fuente, estímulo, artefacto, entorno, respuesta y medida de la respuesta), al menos uno de disponibilidad en la demanda del lunes y uno de seguridad de los datos de salud.
6. **Revisión con buenas prácticas de la industria.** Revisa tu propuesta con los seis pilares de AWS Well-Architected: un riesgo y una recomendación por pilar. Luego, con los principios de Site Reliability Engineering de Google, define para TuTurno un indicador de nivel de servicio (SLI), su objetivo (SLO) y el presupuesto de error que deja, y explica qué haría un SRE frente al trabajo repetitivo (*toil*) y después de una caída.

**Entrega en la Tarea del LMS:** un documento `arquitectura-tuturno.pdf` de 6 a 10 páginas, con las partes en el orden pedido, los diagramas insertos y las fuentes que consultaste. Si hiciste los diagramas en una herramienta, súbelos también en un `.zip`.

### Pauta de evaluación

Cada fila se asigna completa si se cumple, a la mitad si se cumple en parte y en cero si no está.

| Componente de la competencia | Qué se revisa | Puntos |
| --- | --- | :-: |
| **Ámbito del arquitecto: modelos de distribución y nube** | Comparación on-premise y SaaS aplicada al caso, con una recomendación fundada | 4 |
| | Servicios cloud necesarios y su equivalente en tres proveedores | 4 |
| **Rol y herramientas del arquitecto** | Responsabilidades en cada etapa del ciclo de vida y una decisión de arquitectura bien registrada | 5 |
| | Diagramas C4 de contexto y contenedores, UML de secuencia y de componentes o despliegue, coherentes entre sí y con las tres visiones | 6 |
| **El arquitecto en procesos iterativos e incrementales** | Contraste cascada y Scrum en el caso; valores del Manifiesto Ágil ligados a sus principios | 4 |
| | Participación en eventos y artefactos de Scrum, plan de tres incrementos y dos desafíos con respuesta | 4 |
| **Pilares del proceso de arquitecturación** | Cuatro atributos ISO/IEC 25010 priorizados y tres escenarios de calidad completos y medibles | 5 |
| | Riesgo y recomendación en los seis pilares de AWS Well-Architected; SLI, SLO, presupuesto de error y prácticas SRE | 6 |
| **Buenas prácticas y convenciones** | Documento claro, ordenado, con diagramas legibles y fuentes citadas | 2 |
| | **Total** | **40** |

**Nota** (exigencia 60 %): si el puntaje *p* es mayor o igual que 24, nota = 4,0 + 3 × (*p* − 24) / 16; si es menor, nota = 1,0 + 3 × *p* / 24. Se redondea a un decimal.
