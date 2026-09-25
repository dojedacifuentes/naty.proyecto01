# Flujo de producción del módulo 2 · PF1821 y PF1822

**Alcance de esta etapa (25-sep):** producir los **recursos base, neutros y listos para subir**
del módulo 2 de los dos cursos, más los **insumos para rellenar el Anexo 2**.

**Queda fuera por ahora:** subir al LMS, redactar el Anexo 2 y el trabajo por institución
(logos, credenciales, video de evidencia). Se hace después, con estos mismos archivos.

**Meta:** que cada pieza cumpla lo que la pauta pide para el 7,0 (ver `REVISION-BASES.md`). El
aprendizaje esperado seleccionado es el **AE3** en los dos cursos: sus piezas (★) van primero.

## Dónde queda cada cosa

```text
modulo-2/<curso>/
  produccion/   BASES: lo que se carga en otra herramienta (no se sube al LMS)
  entrega/      RECURSOS FINALES: lo que se sube después
    00-bienvenida/   M2-Bienvenida.mp4 · M2-Ruta-Infografia.png
    AE1/ … AE4/      M2-AEn-Videocapsula.mp4 · M2-AEn-Infografia.png · M2-AEn-Lectura.pdf ✔ · M2-AEn-Quiz.gift ✔
    herramientas/    M2-Herramienta-1-… · M2-Herramienta-2-Video.mp4 · M2-Herramienta-2-Interactivo.h5p
    actividades/     enunciados y respuestas modeladas ✔ · insumos/ ✔ · código de respuesta ✔ · workflow roto (PF1821)
    evaluacion/      9 PDF ✔
    medios/          cuadro comparativo ✔
    insumos-anexo/   textos de las secciones V y VI en HTML, para copiar a Word ✔
  produccion/ESTADO.md   tablero: una fila por pieza
```

✔ = ya generado por el carril automático.

**Videos y `.h5p` no van al repo:** pesan demasiado. Van a una carpeta de Drive con la misma
estructura, y su enlace se pega en `ESTADO.md`. El `.gitignore` ya los excluye.

**Nombres:** siempre `M2-…` y sin nombre de institución. Así el mismo archivo sirve a todas.

## Los carriles: seis frentes en paralelo

La forma más rápida es **repartir por herramienta, no por curso**. Cada carril hace sus piezas
de los dos cursos de una vez y reutiliza la misma plantilla. Salvo el F, que espera un video
del B, ninguno depende de otro.

| Carril | Quién | Piezas (PF1821 + PF1822) | Entra | Sale a `entrega/` |
| --- | --- | --- | --- | --- |
| **A · Automático** | `npm run produccion` | Quizzes, 8 lecturas en PDF, 9 PDF de evaluación, actividades, insumos, código, cuadro comparativo, insumos para el Anexo | `contenidos/` | **Hecho** ✔ |
| **B · Video** | HeyGen | 12 videos: bienvenida + 4 cápsulas + video base de la herramienta 2, por curso | `produccion/videos/*.pptx` | MP4 a Drive |
| **C · Diseño** | Genially o Canva | 10 infografías: ruta + 4 aprendizajes, por curso | `produccion/infografias/prompts.md` | PNG |
| **D · Texto IA** | ChatGPT, Claude o Gemini | Notebook de PF1822 (las lecturas ya salen del carril A) | prompt de abajo | `.ipynb` |
| **E · Técnico** | Persona con n8n y Python | PF1821: tutorial con capturas y workflow roto. PF1822: correr `pytest` y probar el notebook | `contenidos/…/C4` y `C2`, `entrega/actividades/` | PDF + JSON; código probado |
| **F · Interactivo** | Lumi (H5P de escritorio) | 2 videos interactivos, uno por curso | MP4 del carril B + `H2-video-interactivo-guion.md` | `.h5p` a Drive |

**Orden dentro de cada carril:** primero AE3 (★), después AE1, AE2 y AE4, y al final la bienvenida o la ruta.

### Para ganar tiempo

1. **Arranca todos los carriles a la vez.** Diez minutos de reparto ahorran horas de espera.
2. **Una plantilla por carril, hecha una sola vez:**
   - B: avatar, voz y subtítulos en HeyGen;
   - C: la primera infografía (AE3) armada con las especificaciones visuales, como base para duplicar;
3. **B genera en paralelo:** HeyGen renderiza varios videos a la vez. Importa todos los PPTX
   y deja la narración como viene. Pulirla es opcional; el prompt está más abajo.
4. **Las lecturas ya están hechas:** salen del carril A. D solo arma el notebook de PF1822.
5. **"Listo" es cumplir, no pulir.** Revisa cada pieza con los 5 puntos de abajo y sigue.
6. **El carril A se repite solo:** si alguien corrige un contenido, `npm run produccion -- PF1821 PF1822`
   rehace los PDF, quizzes y bases en un minuto.

### Cuándo una pieza está lista para subir

- [ ] El nombre del archivo sigue la convención y está en su carpeta (o su enlace de Drive está en `ESTADO.md`).
- [ ] Sin logo ni nombre de institución.
- [ ] El aprendizaje esperado está textual del plan donde aparece.
- [ ] El contenido coincide con la fuente en `contenidos/`, sin datos inventados.
- [ ] Se lee o escucha bien: texto legible, audio claro y subtítulos en los videos.

## Cómo hacer cada pieza

### B · Videos en HeyGen

Bases: `produccion/videos/`. Son `00-bienvenida.pptx`, `AE1-capsula.pptx` a `AE4-capsula.pptx`
y `H2-video-interactivo.pptx`. **La narración está en las notas del orador**, y la misma
narración está en el `…-guion.md` de cada una.

1. Importa el PPTX en HeyGen (el menú de presentación a video puede cambiar de nombre).
   Revisa que cada escena tomó su nota como guion. Si no, cópiala del guion.
2. Pon el avatar en el tercio derecho, que queda libre en las láminas. Voz en español
   latinoamericano. **Subtítulos activados.**
3. Corrige la pronunciación de n8n, JSON, API, Supabase, ROUGE y BLEU.
4. En la bienvenida y en la herramienta 2, reemplaza el texto "Imagen sugerida" o "Pantalla
   sugerida" por la captura que indica, o bórralo y deja al avatar.
5. Exporta en MP4 1080p con el nombre de la convención, súbelo a Drive y pega el enlace en `ESTADO.md`.

Si quieres pulir la narración antes de generar:

```text
Reescribe esta narración como voz en off para un video con avatar. Mantén exactamente los
conceptos y ejemplos, sin agregar información. 50 a 80 palabras por lámina, frases cortas,
tono cercano, español de Chile. Devuélvela en la misma tabla.
<pega la tabla del guion>
```

### C · Infografías

Base: `produccion/infografias/prompts.md`, o el zip `infografias-modulo2.zip` que se descarga
de la portada del sitio. Cada prompt se pega completo en la herramienta y trae todo lo necesario:
- el encargo y el propósito, con la cita de las bases (Anexo N°7, num. 7 c y d);
- las medidas: ancho fijo de 1080 px y el alto calculado para ese contenido, sin achicar la letra;
- la tipografía con sus tamaños en px, el color y el contraste mínimo (WCAG 2.1 AA), los íconos y la diagramación;
- las reglas de texto, el CONTENIDO exacto y un control antes de entregar.

El aprendizaje esperado, la competencia y los contenidos del plan van textuales, en mayúsculas,
para el revisor. Las bases no fijan formato: las medidas y los estilos son el estándar de este
proyecto.

Exporta en PNG (y en PDF si la herramienta lo permite) con el nombre de la convención. Al subirla
al LMS, usa el texto de `textos-alternativos.txt`. Si la herramienta no acepta un prompt tan
largo, pega solo el bloque CONTENIDO y aplica `especificaciones-visuales.txt`. Si usas un
generador de imágenes, pídele el diseño con los espacios de texto vacíos y escribe el texto
encima, porque suele deformar las letras.

### Lecturas (carril A) y notebook (carril D)

- **Lecturas, hechas:** `entrega/AEn/M2-AEn-Lectura.pdf`, o las 8 juntas en el zip
  `lecturas-modulo2.zip` de la portada del sitio. La fuente es `contenidos/<PF>/modulo-2/lecturas/AEn.md`.
  Al generarlas, el script revisa que estén todos los contenidos del plan del aprendizaje, textuales,
  y que haya un ejemplo por sección, 3 preguntas con respuesta y 8 términos de glosario. Si alguna
  falla, no se imprime. Para corregir una lectura, edita su `.md` y corre
  `npm run produccion -- PF1821 PF1822 --solo-lecturas`. El flipbook se arma después, al subir.
- **Notebook de PF1822** (herramienta didáctica 1, ★), `M2-Herramienta-1-Notebook.ipynb`:

```text
Genera un notebook Jupyter (.ipynb) en español con estas secciones, en este orden, cada una
con una celda de explicación, una de código y una de autocomprobación con assert y un mensaje
que diga qué revisar si falla: <pega la tabla de la Herramienta 1 de
contenidos/PF1822/modulo-2/C4-herramientas-didacticas.md>. La clave se lee con
userdata.get("OPENAI_API_KEY") en Colab o desde una variable de entorno, nunca escrita en una
celda. Usa httpx. Las funciones limpiar() y tokenizar() son las de
entrega/actividades/respuesta-modelada/codigo/preprocesar.py.
```

### E · Técnico

- **PF1821 · tutorial "Tu primer workflow" (★):** sigue los pasos de la herramienta 1 en
  `C4-herramientas-didacticas.md` con n8n abierto. Captura cada paso y arma un PDF,
  `M2-Herramienta-1-Tutorial.pdf`.
- **PF1821 · actividad 2 (★):** en n8n, arma el workflow correcto de la respuesta modelada,
  introduce las 5 fallas de su tabla y expórtalo como `M2-Actividad-2-workflow-roto.json`.
  Guarda también los 6 pedidos de prueba y la tabla `comunas` que describe el enunciado, como
  JSON o CSV, en `entrega/actividades/insumos/`.
- **PF1822 · código (★):** en una máquina con Python 3.10 o superior, instala `httpx`, `pytest`,
  `spacy` (con `es_core_news_sm`), `nltk`, `rouge-score` y `scikit-learn`. Corre `pytest` en
  `entrega/actividades/respuesta-modelada/codigo/`. Si algo falla, **corrige en `contenidos/`** y
  regenera. Prueba también el notebook del carril D en Colab.

### F · Videos interactivos

En Lumi (o cualquier editor H5P), crea un *Interactive Video* con el MP4 de la herramienta 2
del carril B. Agrega las 5 preguntas de `H2-video-interactivo-guion.md` en sus pausas, con su
retroalimentación. Exporta como `M2-Herramienta-2-Interactivo.h5p` y súbelo a Drive.

## Insumos para el Anexo 2 (para cuando se redacte)

Ya están en `entrega/insumos-anexo/`, uno por sección:
- `Anexo2-V-Estrategia-evaluativa.html`: indicadores, instrumentos, portafolio y retroalimentación.
- `Anexo2-VI-Metodologia.html`: estrategia, tabla de actividades con horas sincrónicas y
  asincrónicas, las dos actividades del AE3 con su respuesta modelada, herramientas didácticas,
  motivación y habilidades del siglo XXI.

Se abren en el navegador o en Word y se copian con sus tablas. Lo único que les faltará son
los enlaces, que salen de `ESTADO.md` cuando las piezas estén subidas.

## Si trabajas desde otra IA

1. Lee este archivo y el `produccion/ESTADO.md` del curso.
2. Toma una fila `pendiente` de tu carril, márcala `en curso (tu nombre)` y hazla.
3. Al terminar, déjala `listo para revisión` con el archivo o el enlace, y agrega una línea al registro.
4. Si corriges contenido, hazlo en `contenidos/<PF>/modulo-2/` y regenera con `npm run produccion`.
   Si no tienes terminal, anótalo en el registro para que otra sesión lo regenere.
