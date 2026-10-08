---
name: armar-aula-moodle
description: Arma o corrige un aula 2026 de la licitación Talento Digital en uno de los tres Moodle (Skillnest/Coding Dojo 4.5 learning-pro.skillnest.com, UNAB 4.x otec-unab.cl, Chile Capacitación 3.8 aulavirtual.chilecapacitacion.cl) con los armadores del repo cargados en la pestaña del usuario. Úsala cuando el usuario pida armar, rehacer, corregir, renombrar, reenlazar tareas, cambiar portada o banner, o igualar al anexo un curso Moodle de UNAB, Coding Dojo, Skillnest o Chile Conductores, aunque no diga «armador» ni «Moodle».
---

# Armar o corregir un aula Moodle

Las aulas se editan desde el Chrome del usuario (Claude in Chrome), con su sesión iniciada.
Los armadores son JS que se cargan en la pestaña del Moodle y llaman a la API AJAX y a los formularios de Moodle.
Viven en `privado/` (fuera de git): solo existen en el PC 1, que es el único que edita aulas.

## Las tres instancias

| | Skillnest (cd) | UNAB | Chile Capacitación (chc) |
|---|---|---|---|
| URL | learning-pro.skillnest.com | otec-unab.cl | aulavirtual.chilecapacitacion.cl |
| Versión | 4.5 | 4.x | 3.8 (sin `core_courseformat_*`) |
| Cursos 2026 | 100 PF1821 · 101 PF1481 · 102 PF1483 · 103 PF1822 · 104 PF1477 · 105 PF1479 · 106 PF1478 · 107 PF1474 | 705 PF1481 · 706 PF1483 · 707 PF1822 · 708 PF1821 · 709 PF1477 · 710 PF1479 · 711 PF1478 · 712 PF1474 | 126 PF1486 · 127 PF1495 · 128 PF1462 · 129 PF1482 |
| Armador | `privado/skillnest-moodle/builder2.js` | `privado/unab-moodle/builder-unab.js` | `privado/chc-moodle/builder-chc.js` |
| Datos | `privado/skillnest-moodle/cursos-cd.json` (objeto por PF) | `privado/unab-moodle/cursos-unab.json` (objeto por PF) | `privado/chc-moodle/cursos-chc.json` (arreglo) |
| Banners | — | `privado/unab-moodle/img/PF*.png` | `privado/chc-moodle/img/PF*.png` |
| Crear curso | No. Copiar desde 2024 (ids 2, 6, 7); las copias no se pueden volver a copiar | No. Copiar 703 «CURSO NUEVO 1» (`/backup/copy.php?id=703`) | Sí, categoría 10 Bootcamps |
| Matricular | Sí (sin crear usuarios) | No: lo hace el admin de UNAB | Sí |

El curso 125 de Chile Capacitación (PF1821) no se toca.

## Funciones de los armadores

- **builder2.js**: `construir2(cid, curso, archivos)` arma un aula vacía; `reestilizar2(cid, curso, portadaCmid)`;
  `reorganizar3(cid, curso)`; `corregirCd(cid, curso)` (título sin «Especial», vocabulario, cabeceras);
  `enlazarTareasCd(cid, curso, tipos)` (ABP/ABPRO/final con enlace a Drive, sin PDF adjunto).
- **builder-unab.js**: `construirUnab(cid, curso, archivos)`; `ajustesUnab(cid, curso, banner)` (título,
  `coursedisplay=0`, imagen); `enlazarTareasUnab(cid, curso, tipos)`; `finalUnab(cid, curso)` (crea «Evaluación del módulo»
  si falta); `adjuntarFinalUnab(cid, archivos)`; `retocarUnab(cid, curso)`.
- **builder-chc.js**: `crearCursoChc(curso, banner)` devuelve el id; `construirChc(cid, curso, archivos)`;
  `tareasChc(cid, curso, archivos)`; `retocarChc(cid, curso)`; `corregirChc(cid, curso)`; `enlazarTareasChc(cid, curso)`.
- `archivos` = `{banner, rise1.., quiz1..}` (en CHC también `abp1`, `abpro1`, …, `final`). Los SCORM: skill subir-scorm.
- Foro de consultas del curso: `privado/foro-consultas-moodle.js` (no duplica si se vuelve a correr).

**Cuidado:** `ajustesUnab` y `retocarUnab` ponen `visible=0` y ocultan el curso. Hoy los 20 cursos Moodle de la tabla están visibles:
cambiar la visibilidad exige OK del usuario. Si no hay OK, no los corras o corrígelo antes de correrlos.

## Pasos

1. Lee la skill reglas-aula y la memoria del cliente. Revisa `state/LEDGER.csv`: puede haber otro chat en la misma aula.
2. Abre una pestaña propia del Moodle en el Chrome del usuario, en `course/view.php?id=<cid>`. Comprueba que la sesión
   no esté en «Cambiar rol a…» (da «sin permiso (Gestionar actividades)»). Si lo está, vuelve al rol normal y anota el estado previo.
3. Carga el armador: crea un `<input type="file">` en la página, entrégale el `.js` con file_upload y evalúa su texto
   (`eval(await input.files[0].text())`). Debe registrar «… cargado» en `window.__log`.
4. Carga los datos igual: el `.json` con `JSON.parse`, y toma `curso = datos['PF1481']` (en CHC, busca por `codigo`).
   Los archivos (banner, zips) también entran por input file (máx. 10 MB por llamada).
5. Corre la función en segundo plano y consulta después:
   `window.__fin = null; construir2(cid, curso, archivos).then(r => window.__fin = r).catch(e => window.__fin = 'ERROR ' + e.message)`.
   Lee `window.__fin` y `window.__log` por trozos: la salida de javascript_tool se corta a ~1000 caracteres.
6. Si Chrome cambió el id de la pestaña o cortó el proceso, verifica en el aula qué quedó y rehaz solo lo que falta.
7. Verifica (abajo) y corre reglas-aula sobre el texto del aula.

## Trampas

- **coursedisplay=0** («todas las secciones en una página»): sin eso los aprendizajes esperados exigen clic.
- **Completitud por calificación** viene activa en Moodle 4.5: en lo que no se califica hay que quitar
  `completionusegrade`/`completionpassgrade` (los armadores lo hacen con `sinCompletarPorNota`). Etiquetas con `completion=0`.
- **«Cambiar rol»**: con la sesión en rol de estudiante, toda edición falla. Volver al rol normal y, al terminar, dejarlo como estaba.
- **Borrar en UNAB**: no existe la acción `cm_delete`; se borra con `/course/mod.php?delete=<cm>&confirm=1&sesskey=…`. Solo con OK.
  En Skillnest y CHC el clasificador puede bloquear borrados: los hace el usuario («Acciones masivas»; ojo con la casilla de la sección 0).
- **Copia asíncrona** (Skillnest, UNAB): tarda minutos. Espera y busca el id nuevo por el nombre corto antes de armar.
- **CHC 3.8**: no guarda emojis (van como entidades `&#128269;`); para mover se usa `course/rest.php` con `sectionId` = número de sección;
  al crear un curso Moodle va a matrícula: `crearCursoChc` busca el id por «(PFxxxx)» en `management.php`.
- Moodle 4.5 redirige a `course/section.php` al guardar: no es error.
- No llames `window.M` ni lo pises: es el global de Moodle (`M.cfg.sesskey`).

## Límites

- Claude no escribe contraseñas: si la sesión se cerró, pide al usuario que inicie sesión.
- Publicar o cambiar visibilidad, borrar, matricular y cambiar permisos: solo con OK explícito del usuario en el chat, por acción.
- No tocar cursos ajenos: solo los ids de la tabla. Nada en cursos 2024 salvo «Copiar curso» con OK.
- Nunca credenciales en el repo ni en Drive (`privado/credenciales.md` es local y lo escribe el usuario).
- Solo el PC 1 edita aulas; el PC 2 audita.

## Verificación

- Título «Programa “Talento Digital Para Chile”, Becas Laborales 2026, <curso> (<código>)», sin «Especial».
- Visibilidad igual a la de antes (o la que aprobó el usuario). `coursedisplay=0`.
- Secciones «Módulo n: nombre» en orden; solo el 2 desarrollado; portada del módulo 2 con los AE completos.
- Por AE: presentación con criterios, lectura, ABP, ABPRO, quiz «Quiz gamificado del aprendizaje esperado n», infografía.
  ABP enlaza el Doc individual y ABPRO el de equipo (ya se cruzaron una vez).
- Evaluación del módulo enlazada al Doc del anexo; foros de consultas del módulo y del curso; banner.
- Etiquetas sin casilla de completado. `window.__log` sin «sin archivo» ni ERROR.
- Mira el aula como estudiante («Cambiar rol a… Estudiante») y vuelve al rol normal.
- reglas-aula sin NO CUMPLE.
