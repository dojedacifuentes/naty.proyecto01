# OPEN QUESTIONS

> Sobre esto **ninguna sesión decide por su cuenta** (`AGENTS.md` §2.3).
> Al resolverse: marcar, anotar la respuesta y quién la dio, y no borrar la entrada.

---

## Para SENCE (vía consulta formal, 5 días hábiles tras la publicación)

**1. ¿Se desarrolla solo el segundo módulo o todos los módulos?** — RESUELTA (2026-09-30)
El punto 7.4 dice *"se solicitará desarrollar el segundo módulo del plan formativo"*.
El numeral 4.3.1.1 letras a) y c) dicen *"desarrollar todos los módulos en el Anexo N°2"*
y *"se revisarán y evaluarán todos los módulos"*.
Impacto: multiplica el trabajo por el número de módulos, sobre 45 o 90 propuestas.
Responsable de preguntar: Natalia (o el OTEC que postula).
**Respondió el usuario (2026-09-30, sesión `2026-09-30-claude-code-07`):** "se desarrolla solo el modulo 2 para todos los
cursos. los demas modulos de cada curso deben aparecer nombrados en el lms de cada cliente pero no se desarrollan."
Es decir: en los 15 cursos se desarrolla solo el módulo 2; los demás módulos se muestran con su nombre en el LMS de cada
cliente, sin contenido. La lista de todos los módulos por curso está en la pestaña "Todos los módulos" de
`privado/drive/Planes-Formativos-SENCE-TD2026.xlsx` (`npm run planes`). No resuelve #2 ni #16.

**2. ¿La estrategia evaluativa y la metodología aplican al segundo módulo, y las
herramientas y extensión al plan completo?** — ABIERTA
Las bases dicen que el ítem D se desarrolla *"a lo largo de todo el plan formativo"*,
pero B y C hablan del módulo. Conviene confirmarlo junto con la pregunta 1.

**16. ¿Cómo se cuenta el "segundo módulo" cuando el plan empieza con un módulo transversal?** — RESUELTA (2026-09-30)
En SIPFOR, PF1821 y PF1822 (y probablemente los 15) empiezan con `MB00171` "Orientación al
perfil de especialidades y metodología del curso" (12 h, transversal). Contado sobre todos
los módulos, el segundo es el primer técnico: `MA04560` en PF1821 y `MA04576` en PF1822.
Contado solo sobre los técnicos, sería `MA04561` y `MA04577`.
Supuesto de trabajo (2026-09-24): se cuenta sobre todos, en el orden en que SIPFOR lista el
plan. Conviene confirmarlo contra el PDF oficial de cada plan y sumarlo a la consulta #1.
**Evidencia del 2026-09-25:** los PDF oficiales de los planes (versión 14-09-2026, pág. 3,
carpeta local "PF SENCE a licitar") numeran el transversal como "Módulo N°1" y a `MA04560` y
`MA04576` como "Módulo N°2". Apoya el supuesto; falta que Natalia lo dé por cerrado o que entre
en la consulta #1.
**Respondió el usuario (2026-09-30, sesión `2026-09-30-claude-code-08`):** "si" a la pregunta "¿el módulo 2 es el que el PDF
oficial de cada plan numera como Módulo N°2?". Se cuenta sobre todos los módulos, incluido el transversal: el módulo 2 es el
"Módulo N°2" del PDF oficial (`MA04560` en PF1821, `MA04576` en PF1822; en los demás, el que su PDF numere así).

**17. ¿Quién elige el "aprendizaje esperado seleccionado" de la metodología?** — ABIERTA
La pauta de metodología pide 2 actividades prácticas y 2 herramientas didácticas "para el
aprendizaje esperado seleccionado" (bases 2026, 7.4, pág. 31), pero no dice si lo elige el
oferente o el evaluador. Supuesto de trabajo (2026-09-25): lo declara el oferente en el
Anexo 2, como hace el V0 de PF1474 del equipo. Se declaró el AE3 en PF1821 y PF1822, y como
resguardo cada aprendizaje tiene al menos dos herramientas didácticas en el LMS. Conviene
sumarla a la consulta #1.

## Para Natalia

**3. ¿Cuál es la matriz real cliente × plan?** — ABIERTA · CRÍTICA · respuesta parcial
El cuadro entregado trae 15 planes y 2.670 cupos totales, pero no dice qué cliente
postula a qué plan. La diferencia entre 45 y 90 documentos define todo el proyecto.
**Respuesta parcial del usuario, 2026-09-27** (sesión `2026-09-27-claude-code-01`, al pedir la marca de
los PDF): PF1821 → `unab` y `skillnest`; PF1822 → `unab`, `skillnest` y `u-autonoma`. Falta el resto
de los planes y confirmar si esa lista es la definitiva para estos dos.
**Nota (2026-09-30, sesión `2026-09-30-claude-code-07`):** el usuario dijo que adjuntaba una tabla de Excel y una captura
con la matriz para confirmarla, pero no llegaron al chat ni aparecen en Descargas ni en el Escritorio. Se le pidió
reenviarlas. Recomendación dada: guardar la matriz en `privado/` (fuera de git), porque el repo es público (#11, #14).

**4. ¿Acceso a la carpeta Drive "Metodologías" con los Anexos 2 de referencia?** — ABIERTA · respuesta parcial
Propietaria: natalia@hackea.pro. Sin esto no hay ingeniería inversa ni auditoría de
verificadores.
**2026-09-25:** el usuario dejó en local una descarga de Drive, "Licitaciones TD 2026", con 13
Anexos 2 de 2024, el V0 de PF1474 con su revisión, los formatos oficiales 2026, los PDF de los
planes y las planillas de recursos. No se versiona porque trae propuestas de otras
instituciones (`DECISIONS.md`, 2026-09-25). Falta confirmar si es la carpeta "Metodologías"
completa y revisar los verificadores de los Anexos 2 de 2024.

**5. ¿Quién arma los LMS y cuántos hay que armar?** — RESUELTA (2026-09-30) en cuanto a quién
El 35% de la propuesta técnica se evalúa navegando el LMS, no leyendo el documento.
Puede ser el cuello de botella real del proyecto, por encima de la redacción.
**Respondió el usuario (2026-09-30, sesión `2026-09-30-claude-code-07`):** "yo armo los lms". Los arma el usuario.
Cuántos: uno por cliente y curso, según la matriz de #3 (pendiente del adjunto).

**6. ¿Se usa LMS propio de cada cliente o la plataforma LMS de SENCE?** — RESUELTA (2026-09-30): LMS propio
Si es la de SENCE, hay que escribir a `adminelearning@sence.cl` apenas se publique el
llamado, con nombre del concurso, nombre y RUT del OTEC y RUT del usuario de prueba.
**Nota (2026-09-30, sesión `2026-09-30-claude-code-07`):** al responder #1 el usuario escribió "en el lms de cada
cliente", lo que apunta al LMS propio. Se le pidió confirmarlo.
**Respondió el usuario (2026-09-30, sesión `2026-09-30-claude-code-08`):** "lms cada institucion". Se usa el LMS propio de
cada institución, no la plataforma de SENCE; no hace falta escribir a `adminelearning@sence.cl`. Los arma el usuario (#5).

**7. ¿Quién levanta las fichas de cliente?** — ABIERTA
Infraestructura, equipos, LMS, docentes, trayectoria, alianzas. Sin esos datos las
propuestas no se pueden diferenciar, y llegan tarde si nadie los pide ahora.

**8. ¿Mi entregable son los documentos finales o el sistema que los produce?** — ABIERTA
Son dos trabajos con dos precios. Recomendación: el sistema, y los documentos como
consecuencia.

**9. ¿Quién revisa y firma la versión final de cada propuesta?** — ABIERTA
Define si Diego es autor o proveedor de borradores, y su responsabilidad si algo falla.

**10. ¿De quién es el sistema que se construye?** — ABIERTA
Si el motor sirve para futuras licitaciones es un activo y debe estar en el acuerdo.

**11. ¿Hay confidencialidad entre clientes?** — ABIERTA
Seis instituciones que compiten entre sí. Conviene dejarlo escrito.

**12. ¿Hay restricción sobre el uso de IA en la redacción de las propuestas?** — ABIERTA
Mejor saberlo hoy que en una impugnación.

**13. ¿Cuáles son las fechas formales de inicio y cierre de la licitación?** — RESUELTA (2026-09-30) en cuanto al cierre
Todo el plan cuelga de esas dos fechas.
**Respondió el usuario (2026-09-30, sesión `2026-09-30-claude-code-07`):** "la fecha termina el 5 de octubre, ya es 30".
Cierre: **lunes 5 de octubre de 2026**. Desde el miércoles 30 de septiembre quedan 3 días hábiles (1, 2 y 5 de octubre).
Hora: el usuario no la indicó; el calendario de las bases fija el cierre a las 18:00 del décimo día hábil
(`docs/01-guia-propuesta-tecnica.md`), a confirmar en el llamado. Fecha de publicación del llamado: no informada.

## Para Diego

**14. ¿Dónde vive el repositorio y quién tiene acceso de escritura?** — ABIERTA · respuesta parcial
El repo va a contener información de seis instituciones que compiten entre sí en la misma
mesa de evaluación. Hay que decidir cuenta de GitHub, si es privado (sí), y quién entra.
Se cruza con la pregunta 11 (confidencialidad entre clientes) y con la 10 (de quién es el
sistema). Mientras no se decida, el repositorio vive solo en local: el prompt A de
`PROMPT-CLAUDE-CODE.md` deja listos los pasos para publicarlo.
**Respuesta parcial (2026-09-24, el usuario en la sesión `2026-09-24-claude-code-01`):**
vive en https://github.com/dojedacifuentes/naty.proyecto01. **Sigue abierto:** ese repo
se creó **público**, y esta pregunta dice que debe ser privado. Falta decidir si se
cambia a privado antes del primer push, y quién tiene acceso de escritura.
**Visibilidad, respondida por el usuario el 2026-09-24** (sesión `2026-09-24-claude-code-02`),
con la advertencia a la vista: **queda público** y se empuja así. Sigue abierto: quién
tiene acceso de escritura además del dueño de la cuenta, y cómo se cruza esto con #11.

**15. ¿Los umbrales de conteo y el 0,75 de similitud aguantan un lote real?** — ABIERTA
Los controles automáticos se probaron con propuestas de prueba, no con propuestas de
verdad. El umbral de diferenciación en particular es un número elegido para que el control
fuera ejecutable, no medido. Al cerrar el primer lote real hay que mirar la distribución
de similitudes y recalibrar, dejando el cambio en `DECISIONS.md`.
Responsable: quien produzca el primer lote.

**18. ¿Pueden dos clientes que compiten en el mismo plan presentar los mismos recursos con distinta marca?** — RESUELTA (2026-09-30): sí, respondió el usuario
El 27-sep la contraparte pidió aplicar la marca de cada cliente a los PDF del módulo 2. Con eso,
UNAB y Skillnest mostrarían en PF1821 las mismas lecturas, actividades e instrumentos, cambiando solo
colores y logo, y en PF1822 también la Autónoma. `AGENTS.md` §6 advierte que dos propuestas gemelas
en la misma mesa de evaluación dañan a los dos clientes, y que la diferenciación no se logra
cambiando la superficie. El control 04 compara el texto del Anexo 2, no los recursos del LMS, así que
no lo detectaría. Opciones: aceptar el riesgo; variar por cliente el caso de estudio, las actividades o
el tono; o reservar los recursos neutros para un solo cliente por plan. Lo decide Natalia o la contraparte.
**Respondió el usuario (2026-09-30):** en la sesión "Branding de Skillnest para Rise" dijo que no importa que clientes que compiten
tengan el mismo contenido: solo cambia la marca. Lo confirmó en esta sesión (`2026-09-30-claude-code-09`, "Mismo contenido, otra marca").
Se acepta el riesgo que describe AGENTS.md §6 para los recursos del LMS; la diferenciación del Anexo 2 sigue igual.

**19. ¿Colores y tipografía de marca definitivos de Skillnest y de la Autónoma?** — ABIERTA
Skillnest no entregó manual: sus colores (#1E1E2A, #2470B1, #00ADE5) salen del logo y de una captura del sitio.
La Autónoma pide Montserrat y Barlow Condensed en su manual; los PDF usan IBM Plex (2 familias, igual para todos).
Si el cliente lo exige, se agrega la tipografía por marca. Lo confirma el usuario con cada cliente.
**Nota (2026-09-27, sesión `2026-09-27-claude-code-17`):** UNAB y la Autónoma van con su logo en una placa blanca sobre el color
primario. Si entregan la versión en blanco (negativo) de su logo, va sin placa: basta dejarla junto a `logo.png` y declararla en el
campo `logo_negativo` de su `marca.json`. Pedirla también es parte de esta pregunta.
**Nota (2026-09-30, sesión `2026-09-30-claude-code-09`, con lo hecho en la sesión "Branding de Skillnest para Rise"):** para Rise se creó en
Articulate la marca "Skillnest" con los colores del CSS de skillnest.com (principal #0C8DC9; además #00ADE5, #0E1012, #1E1F29, #236BAF y
#F9F9F9), sin logo y con Lato + Merriweather. El usuario confirmó usar esos colores. En Rise la marca "U Autónoma" trae Be Vietnam + Lora
(no Montserrat y Barlow Condensed, que pide su manual) y el usuario decidió no cambiarlas. Sigue abierta: falta el manual de Skillnest.


**20. ¿La carpeta NATY 2.0 debe seguir abierta a cualquiera con el enlace, como editor?** — RESUELTA (2026-09-30): se mantiene
Respondió el usuario en la sesión `2026-09-30-claude-code-08`: se queda como editor (detalle al final de esta entrada).
Detectado el 2026-09-27 (sesión `2026-09-27-claude-code-12`) con `get_file_permissions`: la carpeta
(id 1fGgwXUyr2wUyyxEn8J36vdmy62Ul2lsv) tiene `anyone` con rol `writer`. Cualquiera que reciba el enlace
puede editar, mover o borrar, y la carpeta trae recursos con la marca de UNAB, Skillnest y la Autónoma, que
compiten entre sí (#11, #18); por eso las marcas viven fuera de git. Opciones: restringir a personas invitadas;
dejar el enlace como lector; o mantenerlo. Se cambia en Drive → Compartir → Acceso general (el conector no quita
permisos). Lo decide el usuario.
**Nota (2026-09-30, sesión `2026-09-30-claude-code-07`):** comprobado de nuevo con `get_file_permissions`: sigue `anyone`
con rol `writer`. Además, el id de la carpeta está en archivos ya publicados de este repo, que es público (#14), así que
cualquiera que lea GitHub puede llegar a ella y editar o borrar. El usuario respondió "no sé a qué te refieres"; se le
explicó con las tres opciones (lector, restringido o dejarla así).
**Respondió el usuario (2026-09-30, sesión `2026-09-30-claude-code-08`), con el riesgo explicado:** "dejala como editora,
trabajamos juntos, no hay problema". NATY 2.0 sigue abierta a cualquiera con el enlace como editor. No se toca el permiso ni
hay que volver a plantearlo; si cambia la situación (por ejemplo, se comparte fuera del equipo), lo decide el usuario.

**21. ¿Con qué cuenta debe trabajar el conector de Drive, y qué planilla queda vigente?** — ABIERTA
Detectado el 2026-09-27 (sesión `2026-09-27-claude-code-14`): el conector de Drive está conectado como otra cuenta de Google (no la del usuario)
(los archivos que crea quedan a su nombre), no como dojedacifuentes@gmail.com, dueño de NATY 2.0. La planilla nueva, con los enlaces
a la vista de los quiz GIFT, es de esa cuenta; la anterior, del usuario, sigue en la carpeta con el mismo nombre. Opciones: reconectar el
conector con la cuenta del usuario y volver a subir la planilla; o dejar la nueva y mover la anterior a "Archivo (versiones anteriores)".
Se cruza con #20. Lo decide el usuario.
**Respuesta parcial (2026-09-27, sesión `2026-09-27-claude-code-15`):** el usuario pidió dejar la nueva y ordenar la carpeta. Falta
mover la anterior a Archivo (a mano) y decidir si el conector se reconecta con la cuenta del usuario.
**Nota (2026-09-28, sesión `2026-09-28-claude-code-04`):** hay otra vía que no usa el conector: el usuario inició sesión de Google en
el navegador integrado de la app y desde ahí se subieron archivos a su nombre (HANDOFF, "Quiz gamificados en Drive"). Todos los
cambios del 28-sep a la planilla se hicieron en la del usuario (`1yjgTnjm…`), que es la que revisa Natalia. La pregunta sigue abierta.

**22. ¿La contraparte acepta el quiz gamificado en HTML y SCORM, y con qué nombres de insignia?** — ABIERTA
El 28-sep se generaron los 3 quiz de cada curso como juego (G9: misión, puntos, estrellas e insignia), en HTML y en paquete SCORM
para Moodle, porque Canva no calcula puntaje ni lo informa al LMS. El estándar de la contraparte dice "3 quiz en Canva": los Canva
interactivos (G3) se mantienen. Falta saber si el juego va además de Canva o en su lugar, y validar las 6 insignias propuestas
(`R-quiz-canva.md`). Lo decide la contraparte, vía el usuario o Natalia.
**Respuesta parcial (usuario, 2026-09-28, sesión `2026-09-28-claude-code-02`):** "lo de la contraparte está por confirmar pero mejor
llegar con algo": se presenta igual. Quedó en la planilla de revisión (Resumen, Entregables y Pendientes) para que Natalia lo revise.
**Nota (sesión `2026-09-28-claude-code-04`):** a pedido del usuario, los 12 archivos están también en Drive (NATY 2.0 → curso →
"4 Quiz" → "Quiz gamificados (juego y SCORM)") y la planilla los enlaza como archivo, ya no al sitio.

**23. ¿Cómo quedan configurados los formularios de Canva?** — ABIERTA
Los 30 formularios de los quiz de Canva tienen activado por defecto "Evita respuestas duplicadas" (cada persona responde una sola
vez) y el aviso por correo de cada respuesta. Con muchos participantes, el correo satura; y con una sola respuesta no se puede
reintentar. Se cambia en la Configuración de cada formulario, en Canva. Lo decide el usuario.

**24. ¿Qué total de horas vale cuando SIPFOR no cuadra?** — ABIERTA
En SIPFOR, el total del plan no es la suma de sus módulos en PF1462 (198 contra 201), PF1487 (207 contra 210), PF1485 (177 contra 180),
PF1493 (201 contra 204) y PF1495 (207 contra 210); y la planilla de oferta (`data/planes-formativos.csv`) dice otra cosa en PF1482 (204
contra 210) y PF1493 (201). Importa para las horas del Anexo 2 y para la regla de 1 actividad de extensión cada 50 horas. Se puede
mirar el PDF oficial de cada plan o consultarlo a SENCE. Lo decide el usuario o Natalia. Detectado en la sesión `2026-09-29-claude-code-01`.

**25. ¿Hay recursos 2024 del módulo 2 de DevOps (PF1485) y de Seguridad Cloud (PF1493)?** — ABIERTA
Detectado el 2026-09-30 (sesión `2026-09-30-claude-code-04`): en el Drive "Talento Digital 2024 Licitación" no hay carpeta "Contenido M2"
de esos dos cursos, ni en "Contenidos Finales" ni en "Contenidos Antiguos". El plan 2024 de Seguridad Cloud está dentro de
"Contenido M2 Arquitectura Cloud", así que puede que se haya trabajado ahí. Si no existen, esos dos módulos se desarrollan desde cero.
Lo sabe Natalia (o quien armó el Drive 2024).

**Nota a #24 (2026-09-30, sesión `2026-09-30-claude-code-06`):** el PDF oficial de cada plan se descarga sin sesión desde
`https://sipfor.sence.cl/Planes/PDFPlan.aspx?id=<PK_RUP_PLA_ID>` (el id está en `data/sipfor/<plan>/plan.json`) y trae la tabla de módulos con
sus horas y el total. Sirve para mirar qué dice el PDF; la pregunta sigue abierta.

**Nota a #22 (2026-09-29, sesión `2026-09-29-claude-code-02`):** el usuario pidió un quiz por aprendizaje esperado (4 por curso) con la misma
gamificación y SCORM. Ya no son "3 quiz en Canva": falta confirmar con la contraparte si acepta los 4 y rehacer los de Canva.
**Nota a #22 y #23 (2026-09-29, sesión `2026-09-29-claude-code-03`):** el usuario descartó los quiz de Canva; #23 (configuración de sus formularios)
deja de aplicar. Queda de #22 solo si la contraparte acepta los 4 juegos en lugar de "3 quiz en Canva".
**Nota a #22 (2026-09-29, sesión `2026-09-29-claude-code-04`):** la planilla ya no ofrece los quiz formativos en GIFT; solo los juegos.
**Nota a #22 (2026-09-30, sesión `2026-10-01-claude-code-01`):** el usuario pidió quiz gamificados (juego HTML y SCORM) también para
PF1481, PF1483, PF1486 y PF1495, en reemplazo de los de Genially: 22 más, uno por aprendizaje. La pregunta a la contraparte vale para todos.
**Nota a #17 (2026-09-30, sesión `2026-09-30-claude-code-01`):** ya hay ABP y ABPRO para los 4 aprendizajes de cada curso, así que cualquier
aprendizaje que se elija tiene sus dos actividades. Falta decidir si el Anexo 2 (VI b) presenta estas actividades en lugar de las 1 y 2 de C2.
