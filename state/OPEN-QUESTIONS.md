# OPEN QUESTIONS

> Sobre esto **ninguna sesión decide por su cuenta** (`AGENTS.md` §2.3).
> Al resolverse: marcar, anotar la respuesta y quién la dio, y no borrar la entrada.

---

## Para SENCE (vía consulta formal, 5 días hábiles tras la publicación)

**1. ¿Se desarrolla solo el segundo módulo o todos los módulos?** — ABIERTA · CRÍTICA
El punto 7.4 dice *"se solicitará desarrollar el segundo módulo del plan formativo"*.
El numeral 4.3.1.1 letras a) y c) dicen *"desarrollar todos los módulos en el Anexo N°2"*
y *"se revisarán y evaluarán todos los módulos"*.
Impacto: multiplica el trabajo por el número de módulos, sobre 45 o 90 propuestas.
Responsable de preguntar: Natalia (o el OTEC que postula).

**2. ¿La estrategia evaluativa y la metodología aplican al segundo módulo, y las
herramientas y extensión al plan completo?** — ABIERTA
Las bases dicen que el ítem D se desarrolla *"a lo largo de todo el plan formativo"*,
pero B y C hablan del módulo. Conviene confirmarlo junto con la pregunta 1.

**16. ¿Cómo se cuenta el "segundo módulo" cuando el plan empieza con un módulo transversal?** — ABIERTA
En SIPFOR, PF1821 y PF1822 (y probablemente los 15) empiezan con `MB00171` "Orientación al
perfil de especialidades y metodología del curso" (12 h, transversal). Contado sobre todos
los módulos, el segundo es el primer técnico: `MA04560` en PF1821 y `MA04576` en PF1822.
Contado solo sobre los técnicos, sería `MA04561` y `MA04577`.
Supuesto de trabajo (2026-09-24): se cuenta sobre todos, en el orden en que SIPFOR lista el
plan. Conviene confirmarlo contra el PDF oficial de cada plan y sumarlo a la consulta #1.

## Para Natalia

**3. ¿Cuál es la matriz real cliente × plan?** — ABIERTA · CRÍTICA
El cuadro entregado trae 15 planes y 2.670 cupos totales, pero no dice qué cliente
postula a qué plan. La diferencia entre 45 y 90 documentos define todo el proyecto.

**4. ¿Acceso a la carpeta Drive "Metodologías" con los Anexos 2 de referencia?** — ABIERTA
Propietaria: natalia@hackea.pro. Sin esto no hay ingeniería inversa ni auditoría de
verificadores.

**5. ¿Quién arma los LMS y cuántos hay que armar?** — ABIERTA · CRÍTICA
El 35% de la propuesta técnica se evalúa navegando el LMS, no leyendo el documento.
Puede ser el cuello de botella real del proyecto, por encima de la redacción.

**6. ¿Se usa LMS propio de cada cliente o la plataforma LMS de SENCE?** — ABIERTA
Si es la de SENCE, hay que escribir a `adminelearning@sence.cl` apenas se publique el
llamado, con nombre del concurso, nombre y RUT del OTEC y RUT del usuario de prueba.

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

**13. ¿Cuáles son las fechas formales de inicio y cierre de la licitación?** — ABIERTA
Todo el plan cuelga de esas dos fechas.

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
