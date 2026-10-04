#!/usr/bin/env node
/**
 * Los quiz formativos del módulo 2, uno por aprendizaje esperado (Quiz n = AEn), como juego: una misión
 * de 5 niveles con XP, combos, 3 de energía, un comodín 50:50, dos intentos por nivel (uno en verdadero o
 * falso), logros e insignia de oro, plata o bronce al final. Cada curso tiene su fondo animado y cada quiz,
 * su color e ilustración (ESTILOS).
 *
 *   npm run quiz-juego
 *
 * Lee, por curso y quiz:
 *   - las preguntas del GIFT que genera `npm run produccion` (entrega/quiz/M2-Quiz-n-Moodle.gift), que
 *     sale de contenidos/<PF>/modulo-2/R-quiz-canva.md: el texto es el mismo de Canva y de Moodle;
 *   - de ese mismo R-quiz-canva.md, la misión del curso y, de cada quiz, el "Cuándo", la insignia y la
 *     siguiente parada.
 * Escribe en modulo-2/<curso>/entrega/quiz/:
 *   M2-Quiz-n-Juego.html        un solo archivo que funciona sin internet (fuentes incrustadas): se sube
 *                               como Archivo o Página en el LMS, o se incrusta desde el sitio
 *   M2-Quiz-n-Juego-SCORM.zip   el mismo juego como paquete SCORM 1.2 (Moodle: Agregar actividad →
 *                               Paquete SCORM): registra el mejor puntaje (0-100) y la finalización
 *
 * Si cambian los quiz: `npm run produccion -- PF1821 PF1822` y después `npm run quiz-juego`.
 * Si falta la misión, la insignia o la siguiente parada, o si un quiz no trae 5 preguntas de
 * alternativas con una correcta, se detiene y dice dónde. Sin dependencias (AGENTS.md §8).
 *
 * Cursos con solo el quiz (kit: false): PF1481, PF1483, PF1486, PF1495, PF1487, PF1485 y PF1493 no tienen el kit de `npm run produccion`;
 * sus quiz reemplazan los de Genially de 2024 (pedido del usuario del 2026-09-30; PF1487, PF1485 y PF1493 no tenían quiz, 2026-10-01)
 * y salen de su R-quiz-canva.md,
 * con los criterios de evaluación del plan 2026. Para ellos este script también escribe el GIFT
 * (scripts/lib/quiz-canva.mjs) y un zip con todo: modulo-2/<curso>/quiz-juego-M2-<PF>.zip.
 *
 *   npm run quiz-juego                     todos los cursos
 *   npm run quiz-juego -- PF1481 PF1483    solo esos
 */
import fs from 'node:fs';
import { leer, escribir, ruta } from './lib/repo.mjs';
import { leerGift } from './lib/quiz-gift.mjs';
import { leerQuizCanva, giftQuiz } from './lib/quiz-canva.mjs';
import { crearZip } from './lib/zip.mjs';

const CURSOS = [
  { pf: 'PF1821', carpeta: 'PF1821-agentes-low-code', nombre: 'Construcción de Agentes y Automatización con Herramientas Low Code', kit: true },
  { pf: 'PF1822', carpeta: 'PF1822-desarrollo-con-ia', nombre: 'Especialización en Desarrollo con IA', kit: true },
  { pf: 'PF1481', carpeta: 'PF1481-analisis-de-datos', nombre: 'Fundamentos de Análisis de Datos', kit: false },
  { pf: 'PF1483', carpeta: 'PF1483-ciencia-de-datos', nombre: 'Fundamentos de Ciencia de Datos', kit: false },
  { pf: 'PF1486', carpeta: 'PF1486-product-owner', nombre: 'Fundamentos Product Owner', kit: false },
  { pf: 'PF1495', carpeta: 'PF1495-hacking-etico', nombre: 'Hacking Ético en Aplicativos Web', kit: false },
  { pf: 'PF1487', carpeta: 'PF1487-ingenieria-de-datos', nombre: 'Fundamentos de Ingeniería de Datos', kit: false },
  { pf: 'PF1485', carpeta: 'PF1485-devops', nombre: 'Fundamentos DevOps', kit: false },
  { pf: 'PF1493', carpeta: 'PF1493-seguridad-cloud', nombre: 'Seguridad Cloud', kit: false },
  // Reemplazan los Genially de 2024 (pedido del usuario del 2026-10-04: «todos los quizzes que están en Genially por SCORM»). Los 4 Entry
  // comparten el módulo 2 (Fundamentos de desarrollo front-end): un solo R-quiz-canva.md (fuente PF1474) y un juego por curso con su nombre.
  { pf: 'PF1474', carpeta: 'PF1474-entry-level-front-end/cursos/PF1474', nombre: 'Desarrollo de Aplicaciones Front-End Trainee', kit: false, fuente: 'PF1474' },
  { pf: 'PF1477', carpeta: 'PF1474-entry-level-front-end/cursos/PF1477', nombre: 'Desarrollo de Aplicaciones Full Stack Java Trainee', kit: false, fuente: 'PF1474' },
  { pf: 'PF1478', carpeta: 'PF1474-entry-level-front-end/cursos/PF1478', nombre: 'Desarrollo de Aplicaciones Fullstack Python Trainee', kit: false, fuente: 'PF1474' },
  { pf: 'PF1479', carpeta: 'PF1474-entry-level-front-end/cursos/PF1479', nombre: 'Desarrollo de Aplicaciones Full Stack JavaScript Trainee', kit: false, fuente: 'PF1474' },
  { pf: 'PF1462', carpeta: 'PF1462-machine-learning', nombre: 'Especialización en Machine Learning', kit: false },
  { pf: 'PF1482', carpeta: 'PF1482-arquitectura-cloud', nombre: 'Fundamentos de Arquitectura Cloud', kit: false },
];
// Cursos que no tenían ningún recurso del módulo 2 (2026-10-01): su README no dice que reemplazan un Genially.
const SIN_RECURSOS = ['PF1487', 'PF1485', 'PF1493'];
// Fecha fija dentro del zip: regenerar sin cambios no debe cambiar el archivo.
const FECHA_ZIP = new Date(2026, 8, 28, 12, 0, 0);
// IBM Plex (OFL, scripts/fuentes/): Sans para el texto y Mono para la interfaz del juego. Mono no trae 700: se usa la 600.
const FUENTES = [
  ['Plex Sans', 400, 'ibm-plex-sans-latin-400-normal.woff2'], ['Plex Sans', 600, 'ibm-plex-sans-latin-600-normal.woff2'],
  ['Plex Sans', 700, 'ibm-plex-sans-latin-700-normal.woff2'], ['Plex Mono', 400, 'ibm-plex-mono-latin-400-normal.woff2'],
  ['Plex Mono', 600, 'ibm-plex-mono-latin-600-normal.woff2'], ['Plex Mono', 700, 'ibm-plex-mono-latin-600-normal.woff2'],
];

// Diseño de cada curso y quiz: fondo animado (circuito para la automatización de PF1821, red neuronal para la IA de PF1822),
// colores y la ilustración de la portada. Las etiquetas de la ilustración no pueden adelantar una respuesta: se revisaron
// contra las alternativas correctas de cada quiz (p. ej., el Quiz 3 de PF1821 dice "Entrada, Transformación, Salida" y no
// nombra nodos como Filter o Split Out, que son respuestas).
const ESTILOS = {
  PF1821: {
    fondo: 'circuito',
    quiz: {
      1: { acento: '#f472b6', acento2: '#22d3ee', lema: 'Qué conviene automatizar, y con qué',
        heroe: { tipo: 'flujo', nodos: [['Proceso manual', 'doc'], ['Workflow', 'engranaje'], ['Horas liberadas', 'escalar']] } },
      2: { acento: '#22d3ee', acento2: '#ff7a59', lema: 'Workflow «Pedido a registro»',
        heroe: { tipo: 'flujo', nodos: [['Formulario', 'doc'], ['Datos', 'engranaje'], ['Base de datos', 'bd']] } },
      3: { acento: '#a3e635', acento2: '#22d3ee', lema: 'Datos que entran, se transforman y salen',
        heroe: { tipo: 'flujo', nodos: [['Entrada', 'entrada'], ['Transformación', 'transformar'], ['Salida', 'salida']] } },
      4: { acento: '#fbbf24', acento2: '#ff7a59', lema: 'Cada pedido toma su ruta',
        heroe: { tipo: 'decision', nodos: [['Pedido', 'paquete'], ['Condición', 'ruta'], ['Ruta A', 'ruta'], ['Ruta B', 'ruta']] } },
    },
  },
  PF1822: {
    fondo: 'neuronas',
    quiz: {
      1: { acento: '#fbbf24', acento2: '#a78bfa', lema: 'Dónde encaja un modelo en una aplicación',
        heroe: { tipo: 'flujo', nodos: [['Cliente', 'doc'], ['Servidor API', 'engranaje'], ['Modelo', 'chip']] } },
      2: { acento: '#a78bfa', acento2: '#22d3ee', lema: 'Un modelo generativo, consumido por API',
        heroe: { tipo: 'flujo', variante: 'terminal', nodos: [['Solicitud HTTP', 'enviar'], ['Modelo', 'chip'], ['Respuesta JSON', 'llaves']] } },
      3: { acento: '#f472b6', acento2: '#a78bfa', lema: 'Pedir bien para obtener lo que necesitas',
        heroe: { tipo: 'chat', nodos: [['Prompt', 'chat'], ['Modelo', 'chip'], ['Respuesta', 'chat']] } },
      4: { acento: '#38bdf8', acento2: '#a3e635', lema: 'Texto limpio, resultado medido',
        heroe: { tipo: 'flujo', variante: 'barras', nodos: [['Limpiar', 'chispa'], ['Tokenizar', 'numeral'], ['Medir', 'barras']], barras: ['ROUGE', 'BLEU'] } },
    },
  },
  // Cursos sin kit (2026-09-30). Etiquetas revisadas contra las alternativas correctas de cada quiz: p. ej., el Quiz 4 de PF1481
  // no dice «Resumen» ni usa el icono de tendencia, y el Quiz 5 no nombra «Relación», «Modelo» ni «Medida», que son respuestas.
  PF1481: {
    fondo: 'neuronas',
    quiz: {
      1: { acento: '#22d3ee', acento2: '#a3e635', lema: 'Del dato al hallazgo, paso a paso',
        heroe: { tipo: 'chat', nodos: [['Pregunta', 'chat'], ['Datos', 'bd'], ['Respuesta', 'chat']] } },
      2: { acento: '#a78bfa', acento2: '#34d399', lema: 'Un set de datos en el que puedes confiar',
        heroe: { tipo: 'flujo', nodos: [['Datos crudos', 'doc'], ['Preparación', 'transformar'], ['Set limpio', 'chispa']] } },
      3: { acento: '#fbbf24', acento2: '#f472b6', lema: 'Números y gráficos que cuentan algo',
        heroe: { tipo: 'flujo', nodos: [['Ventas', 'bd'], ['Fórmulas', 'numeral'], ['Insights', 'diana']] } },
      4: { acento: '#38bdf8', acento2: '#ff7a59', lema: 'Arrastra, suelta y responde',
        heroe: { tipo: 'flujo', nodos: [['Base de ventas', 'bd'], ['Tabla dinámica', 'niveles'], ['Gráfico dinámico', 'salida']] } },
      5: { acento: '#e879f9', acento2: '#fb923c', lema: 'Power Pivot y Power View en acción',
        heroe: { tipo: 'flujo', nodos: [['Datos de Pehuén', 'bd'], ['Power Pivot', 'chip'], ['Power View', 'barras']] } },
    },
  },
  PF1483: {
    fondo: 'circuito',
    quiz: {
      1: { acento: '#22d3ee', acento2: '#a3e635', lema: 'Python y las herramientas para usarlo',
        heroe: { tipo: 'flujo', nodos: [['Idea', 'chispa'], ['Código', 'doc'], ['Resultado', 'barras']] } },
      2: { acento: '#fbbf24', acento2: '#38bdf8', lema: 'Variables, tipos y cálculos en la consola',
        heroe: { tipo: 'flujo', nodos: [['Entrada', 'entrada'], ['Cálculo', 'numeral'], ['Salida', 'salida']] } },
      3: { acento: '#f472b6', acento2: '#a78bfa', lema: 'Cada lectura toma su camino',
        // 'flujo' y no 'decision': esa ilustración trae fija la etiqueta «DEPURAR» (de PF1821), que aquí insinuaría la pregunta 4.
        heroe: { tipo: 'flujo', nodos: [['Lectura', 'doc'], ['Condición', 'rombo'], ['Alerta', 'bandera']] } },
      4: { acento: '#34d399', acento2: '#fbbf24', lema: 'Funciones propias y módulos listos',
        heroe: { tipo: 'flujo', nodos: [['Lecturas', 'entrada'], ['Rutina propia', 'engranaje'], ['Resumen', 'barras']] } },
      5: { acento: '#fb923c', acento2: '#22d3ee', lema: 'Cada dato en la estructura que le acomoda',
        heroe: { tipo: 'flujo', nodos: [['Registros', 'doc'], ['Colección', 'paquete'], ['Consulta', 'diana']] } },
      6: { acento: '#a3e635', acento2: '#e879f9', lema: 'Recorrer datos, vuelta a vuelta',
        heroe: { tipo: 'flujo', nodos: [['Serie de datos', 'barras'], ['Vuelta', 'transformar'], ['Acumulado', 'escalar']] } },
      7: { acento: '#ff7a59', acento2: '#38bdf8', lema: 'Modelar estaciones en Python',
        heroe: { tipo: 'flujo', nodos: [['Lectura', 'entrada'], ['Estación', 'chip'], ['Reporte', 'doc']] } },
    },
  },
  PF1486: {
    fondo: 'neuronas',
    quiz: {
      1: { acento: '#fbbf24', acento2: '#a78bfa', lema: 'Cómo se organizan los grupos humanos',
        heroe: { tipo: 'flujo', nodos: [['Taller familiar', 'paquete'], ['Fábrica', 'engranaje'], ['Negocio digital', 'chip']] } },
      2: { acento: '#ff7a59', acento2: '#22d3ee', lema: 'El método industrial y su herencia',
        heroe: { tipo: 'flujo', nodos: [['Telar a vapor', 'engranaje'], ['Taylor', 'numeral'], ['Siglo XXI', 'bandera']] } },
      3: { acento: '#a3e635', acento2: '#38bdf8', lema: 'La segunda ola de la industria',
        heroe: { tipo: 'flujo', nodos: [['Fábrica', 'engranaje'], ['Producto', 'paquete'], ['Comprador', 'diana']] } },
      4: { acento: '#e879f9', acento2: '#34d399', lema: 'La tercera ola llega a la empresa',
        heroe: { tipo: 'flujo', nodos: [['Pedido', 'doc'], ['Registro', 'bd'], ['Despacho', 'paquete']] } },
      5: { acento: '#22d3ee', acento2: '#fb923c', lema: 'Nuevas reglas del juego para las empresas',
        heroe: { tipo: 'flujo', nodos: [['Telar', 'engranaje'], ['Mercado', 'barras'], ['Talento', 'chispa']] } },
      6: { acento: '#f472b6', acento2: '#a3e635', lema: 'La misión final de Textiles del Maule',
        heroe: { tipo: 'flujo', nodos: [['Idea', 'chispa'], ['Prototipo', 'transformar'], ['Lanzamiento', 'enviar']] } },
    },
  },
  PF1495: {
    fondo: 'circuito',
    quiz: {
      1: { acento: '#22d3ee', acento2: '#ff7a59', lema: 'Amenazas, atacantes e impacto',
        heroe: { tipo: 'flujo', nodos: [['Atacante', 'bicho'], ['Tienda web', 'paquete'], ['Negocio', 'barras']] } },
      2: { acento: '#a78bfa', acento2: '#fbbf24', lema: 'El marco del hacking ético',
        heroe: { tipo: 'flujo', nodos: [['Ética', 'escudo'], ['Leyes', 'doc'], ['Normas', 'niveles']] } },
      3: { acento: '#34d399', acento2: '#f472b6', lema: 'Quién hace qué, y con qué conducta',
        heroe: { tipo: 'chat', nodos: [['Encargo', 'chat'], ['Hacker ético', 'escudo'], ['Respuesta', 'chat']] } },
      4: { acento: '#fb923c', acento2: '#38bdf8', lema: 'Cada acción tiene su momento',
        heroe: { tipo: 'flujo', nodos: [['Objetivo', 'diana'], ['Método', 'engranaje'], ['Hallazgos', 'bandera']] } },
    },
  },
  // Cursos que no tenían ningún recurso (pedido del usuario del 2026-10-01). Etiquetas revisadas contra las respuestas: p. ej., el
  // Quiz 4 de PF1485 no dice «entregas pequeñas» y el Quiz 5 no nombra el piloto ni las tres maneras, que son respuestas.
  PF1487: {
    fondo: 'circuito',
    quiz: {
      1: { acento: '#22d3ee', acento2: '#a3e635', lema: 'Python y su caja de herramientas',
        heroe: { tipo: 'flujo', nodos: [['Archivos CSV', 'doc'], ['Python', 'chip'], ['Base de datos', 'bd']] } },
      2: { acento: '#fbbf24', acento2: '#38bdf8', lema: 'Variables, operadores y decisiones',
        heroe: { tipo: 'flujo', nodos: [['Litros', 'entrada'], ['Cálculo', 'numeral'], ['Decisión', 'rombo']] } },
      3: { acento: '#f472b6', acento2: '#a78bfa', lema: 'Funciones propias y módulos listos',
        heroe: { tipo: 'flujo', nodos: [['Datos', 'entrada'], ['Función', 'engranaje'], ['Resultado', 'salida']] } },
      4: { acento: '#34d399', acento2: '#fbbf24', lema: 'Ordenar los datos y recorrerlos',
        heroe: { tipo: 'flujo', nodos: [['Registros', 'doc'], ['Colección', 'paquete'], ['Ciclo', 'transformar']] } },
      5: { acento: '#fb923c', acento2: '#22d3ee', lema: 'Modelar las entregas con clases',
        heroe: { tipo: 'flujo', nodos: [['Clase', 'paquete'], ['Objeto', 'chip'], ['Método', 'engranaje']] } },
      6: { acento: '#ff7a59', acento2: '#38bdf8', lema: 'Errores que se capturan a tiempo',
        heroe: { tipo: 'flujo', nodos: [['Archivo', 'doc'], ['Validación', 'escudo'], ['Carga', 'bd']] } },
    },
  },
  PF1485: {
    fondo: 'neuronas',
    quiz: {
      1: { acento: '#22d3ee', acento2: '#ff7a59', lema: 'Dev y Ops, un mismo equipo',
        heroe: { tipo: 'flujo', nodos: [['Desarrollo', 'doc'], ['Colaboración', 'chat'], ['Operaciones', 'engranaje']] } },
      2: { acento: '#a78bfa', acento2: '#fbbf24', lema: 'La cultura que hace posible el cambio',
        heroe: { tipo: 'flujo', nodos: [['Valores', 'chispa'], ['Personas', 'chat'], ['Organización', 'niveles']] } },
      3: { acento: '#34d399', acento2: '#f472b6', lema: 'Del código a producción, sin pausas',
        heroe: { tipo: 'flujo', nodos: [['Código', 'doc'], ['Pipeline', 'transformar'], ['Producción', 'enviar']] } },
      4: { acento: '#fbbf24', acento2: '#38bdf8', lema: 'Cómo se planifica y se entrega software',
        heroe: { tipo: 'flujo', nodos: [['Backlog', 'niveles'], ['Sprint', 'transformar'], ['Versión', 'paquete']] } },
      5: { acento: '#e879f9', acento2: '#34d399', lema: 'Cambiar la forma de trabajar, paso a paso',
        heroe: { tipo: 'flujo', nodos: [['Hoy', 'doc'], ['Cambio', 'transformar'], ['Mañana', 'bandera']] } },
    },
  },
  PF1493: {
    fondo: 'circuito',
    quiz: {
      1: { acento: '#38bdf8', acento2: '#a3e635', lema: 'De los servidores propios a la nube',
        heroe: { tipo: 'flujo', nodos: [['Clínica', 'paquete'], ['Internet', 'enviar'], ['Proveedor', 'bd']] } },
      2: { acento: '#22d3ee', acento2: '#f472b6', lema: 'Tres principios para proteger la información',
        heroe: { tipo: 'flujo', nodos: [['Ficha', 'doc'], ['Protección', 'escudo'], ['Paciente', 'chat']] } },
      3: { acento: '#fbbf24', acento2: '#a78bfa', lema: 'Las reglas que protegen los datos',
        heroe: { tipo: 'flujo', nodos: [['Datos de salud', 'doc'], ['Normativa', 'niveles'], ['Cumplimiento', 'diana']] } },
      4: { acento: '#ff7a59', acento2: '#22d3ee', lema: 'Qué falló, por qué y cómo evitarlo',
        heroe: { tipo: 'flujo', nodos: [['Incidente', 'bicho'], ['Causa', 'diana'], ['Solución', 'escudo']] } },
      5: { acento: '#a3e635', acento2: '#38bdf8', lema: 'Pública, privada o híbrida',
        heroe: { tipo: 'flujo', nodos: [['Centro propio', 'bd'], ['Nube híbrida', 'transformar'], ['Nube pública', 'salida']] } },
      6: { acento: '#e879f9', acento2: '#fbbf24', lema: 'Quién protege qué en la nube',
        heroe: { tipo: 'flujo', nodos: [['Proveedor', 'bd'], ['Acuerdo', 'doc'], ['Clínica', 'escudo']] } },
    },
  },
  // Reemplazan los Genially de 2024 (2026-10-04). Etiquetas revisadas contra las respuestas: no nombran cola, grafo, O(n²), bisect,
  // SaaS, C4, Scrum ni ISO 25010, que son alternativas correctas.
  // Entry level (PF1474, y por fuente compartida PF1477/78/79). Etiquetas sin respuestas: no nombran DOCTYPE, semánticas, min-width,
  // img-fluid, onchange, addClass, restore ni pull request.
  PF1474: {
    fondo: 'circuito',
    quiz: {
      1: { acento: '#22d3ee', acento2: '#fbbf24', lema: 'Quién hace qué en un sitio web',
        heroe: { tipo: 'flujo', nodos: [['Navegador', 'doc'], ['Servidor', 'engranaje'], ['Datos', 'bd']] } },
      2: { acento: '#ff7a59', acento2: '#a78bfa', lema: 'Los cimientos del sitio de Todo Ventas',
        heroe: { tipo: 'flujo', variante: 'terminal', nodos: [['Inicio', 'doc'], ['Catálogo', 'paquete'], ['Contacto', 'chat']] } },
      3: { acento: '#f472b6', acento2: '#22d3ee', lema: 'Colores, letras y pantallas de todo tamaño',
        heroe: { tipo: 'flujo', nodos: [['Teléfono', 'chip'], ['Tableta', 'niveles'], ['Escritorio', 'salida']] } },
      4: { acento: '#a78bfa', acento2: '#34d399', lema: 'Una grilla que se acomoda sola',
        heroe: { tipo: 'flujo', nodos: [['Diseño', 'chispa'], ['Grilla', 'niveles'], ['Vista final', 'diana']] } },
      5: { acento: '#fbbf24', acento2: '#ff7a59', lema: 'Un sitio que responde a quien lo usa',
        heroe: { tipo: 'flujo', nodos: [['Usuario', 'entrada'], ['Programa', 'engranaje'], ['Respuesta', 'salida']] } },
      6: { acento: '#34d399', acento2: '#f472b6', lema: 'Menos código, más efectos',
        heroe: { tipo: 'flujo', nodos: [['Página', 'doc'], ['Biblioteca', 'paquete'], ['Efecto', 'chispa']] } },
      7: { acento: '#38bdf8', acento2: '#a3e635', lema: 'El historial del proyecto, en equipo',
        heroe: { tipo: 'flujo', nodos: [['Cambios', 'doc'], ['Repositorio', 'bd'], ['Equipo', 'chat']] } },
    },
  },
  PF1462: {
    fondo: 'neuronas',
    quiz: {
      1: { acento: '#22d3ee', acento2: '#a3e635', lema: 'Cada dato en la estructura que le acomoda',
        heroe: { tipo: 'flujo', nodos: [['Envíos', 'doc'], ['Estructura', 'paquete'], ['Ruta', 'ruta']] } },
      2: { acento: '#ff7a59', acento2: '#fbbf24', lema: 'Errores que se capturan y quedan registrados',
        heroe: { tipo: 'flujo', nodos: [['Archivo', 'doc'], ['Control', 'escudo'], ['Registro', 'niveles']] } },
      3: { acento: '#a78bfa', acento2: '#34d399', lema: 'Modelar los envíos con objetos',
        heroe: { tipo: 'flujo', nodos: [['Molde', 'paquete'], ['Envío', 'chip'], ['Tarifa', 'numeral']] } },
      4: { acento: '#fbbf24', acento2: '#38bdf8', lema: 'Cuánto cuesta cada algoritmo',
        heroe: { tipo: 'flujo', nodos: [['Datos', 'bd'], ['Algoritmo', 'engranaje'], ['Costo', 'barras']] } },
      5: { acento: '#f472b6', acento2: '#22d3ee', lema: 'El mismo resultado, más rápido',
        heroe: { tipo: 'flujo', nodos: [['Script lento', 'doc'], ['Mejora', 'chispa'], ['Resultado', 'escalar']] } },
    },
  },
  PF1482: {
    fondo: 'circuito',
    quiz: {
      1: { acento: '#38bdf8', acento2: '#a3e635', lema: 'Del servidor de la clínica a la nube',
        heroe: { tipo: 'flujo', nodos: [['Clínica', 'paquete'], ['Migración', 'enviar'], ['Nube', 'bd']] } },
      2: { acento: '#a78bfa', acento2: '#fbbf24', lema: 'Decidir y dibujar la arquitectura',
        heroe: { tipo: 'flujo', nodos: [['Requisitos', 'doc'], ['Decisión', 'rombo'], ['Plano', 'niveles']] } },
      3: { acento: '#34d399', acento2: '#f472b6', lema: 'Arquitectura que se adapta en cada iteración',
        heroe: { tipo: 'flujo', nodos: [['Pendientes', 'niveles'], ['Iteración', 'transformar'], ['Incremento', 'paquete']] } },
      4: { acento: '#fb923c', acento2: '#22d3ee', lema: 'Calidad que se puede medir',
        heroe: { tipo: 'flujo', nodos: [['Servicio', 'bd'], ['Atributos', 'diana'], ['Confianza', 'escudo']] } },
    },
  },
};

const plano = (t) => t.replace(/\*\*|\*|`/g, '').trim();
const sinPunto = (t) => plano(t).replace(/\.$/, '');

function metadatos(c) {
  const archivo = `contenidos/${c.fuente || c.pf}/modulo-2/R-quiz-canva.md`;
  const md = leer(archivo);
  const mision = /^\*\*Misión:\*\*\s*(.+)$/m.exec(md)?.[1];
  if (!mision) throw new Error(`${archivo}: falta la línea "**Misión:** …" (va antes del primer quiz)`);
  const cantidad = [...md.matchAll(/^## Quiz \d+\b/gm)].length;
  if (!cantidad) throw new Error(`${archivo}: no hay ningún "## Quiz n"`);
  const quizzes = Array.from({ length: cantidad }, (_, i) => i + 1).map((n) => {
    const inicio = md.search(new RegExp(`^## Quiz ${n}\\b`, 'm'));
    if (inicio < 0) throw new Error(`${archivo}: falta "## Quiz ${n}"`);
    const resto = md.slice(inicio + 3);
    const fin = resto.search(/^## /m);
    const sec = md.slice(inicio, fin < 0 ? undefined : inicio + 3 + fin);
    const cab = /^## Quiz \d+ · (.+?) \((.+?)\)\s*$/m.exec(sec);
    const cuando = /^\*\*Cuándo:\*\*\s*(.+)$/m.exec(sec)?.[1];
    const juego = /^\*\*Insignia:\*\*\s*(.+?)\s*·\s*\*\*Siguiente parada:\*\*\s*(.+)$/m.exec(sec);
    if (!cab) throw new Error(`${archivo}, Quiz ${n}: el título no dice "Quiz ${n} · tema (aprendizajes)"`);
    if (!cuando) throw new Error(`${archivo}, Quiz ${n}: falta "**Cuándo:** …"`);
    if (!juego) throw new Error(`${archivo}, Quiz ${n}: falta "**Insignia:** … · **Siguiente parada:** …"`);
    return { tema: plano(cab[1]), aes: plano(cab[2]), cuando: plano(cuando), insignia: sinPunto(juego[1]), siguiente: sinPunto(juego[2]) };
  });
  return { mision: sinPunto(mision), quizzes };
}

function preguntas(c, n) {
  const archivo = `modulo-2/${c.carpeta}/entrega/quiz/M2-Quiz-${n}-Moodle.gift`;
  const g = leerGift(archivo);
  if (g.preguntas.length !== 5) throw new Error(`${archivo}: trae ${g.preguntas.length} preguntas y deben ser 5`);
  return g.preguntas.map((p) => {
    if (p.tipo !== 'multiple') throw new Error(`${archivo}: ${p.id} no es de alternativas`);
    if (p.opciones.length > 4) throw new Error(`${archivo}: ${p.id} tiene más de 4 alternativas (el juego usa A a D)`);
    const ae = /\((AE\d)\)/.exec(p.id)?.[1];
    if (!ae) throw new Error(`${archivo}: ${p.id} no dice su aprendizaje esperado`);
    // El GIFT trae <, > y & como entidades HTML (así los muestra Moodle). La plantilla escapa al pintar: si las entidades
    // llegaran tal cual, el juego mostraría "&lt;" (pasaba en el Quiz 4 de PF1822, con re.sub(r"<[^>]+>", ...)).
    const texto = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    return { ae, enunciado: texto(p.enunciado), opciones: p.opciones.map(texto), correcta: p.correcta, retro: texto(p.retro) };
  });
}

const plantilla = leer('scripts/lib/quiz-juego.html');
const fuentes = FUENTES.map(([familia, peso, f]) => `@font-face{font-family:"${familia}";font-style:normal;font-weight:${peso};font-display:swap;src:url(data:font/woff2;base64,${fs.readFileSync(ruta('scripts/fuentes', f)).toString('base64')}) format("woff2")}`).join('\n');

function html(datos, titulo) {
  const json = JSON.stringify(datos).replace(/</g, '\\u003c');
  return plantilla
    .replace('__TITULO__', () => titulo.replace(/&/g, '&amp;').replace(/</g, '&lt;'))
    .replace('/*FUENTES*/', () => fuentes)
    .replace('/*DATA*/', () => json);
}

const xml = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function manifiesto(id, titulo) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${id}" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-${id}">
    <organization identifier="ORG-${id}">
      <title>${xml(titulo)}</title>
      <item identifier="ITEM-${id}" identifierref="RES-${id}" isvisible="true">
        <title>${xml(titulo)}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-${id}" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>
</manifest>
`;
}

// Cursos sin kit: el GIFT de cada quiz sale aquí de R-quiz-canva.md (validado), y no de `npm run produccion`.
function giftSinKit(c) {
  const nAes = JSON.parse(leer(`data/planes/${c.pf}.json`)).modulos.find((m) => m.n === 2).aprendizajes_esperados.length;
  const { quizzes } = leerQuizCanva(c.fuente || c.pf, leer(`contenidos/${c.fuente || c.pf}/modulo-2/R-quiz-canva.md`), nAes);
  for (const q of quizzes) escribir(`modulo-2/${c.carpeta}/entrega/quiz/M2-Quiz-${q.n}-Moodle.gift`, giftQuiz(c.pf, q));
}

// Portada de la carpeta de un curso sin kit: qué hay, de dónde sale y cómo se sube.
function readme(c, meta) {
  const m = JSON.parse(leer(`data/planes/${c.pf}.json`)).modulos.find((x) => x.n === 2);
  const q = (n, ext) => `entrega/quiz/M2-Quiz-${n}-${ext}`;
  return `# ${c.pf} · ${c.nombre} · Módulo 2 · Quiz gamificados

Generado por \`npm run quiz-juego -- ${c.pf}\` desde [\`contenidos/${c.pf}/modulo-2/R-quiz-canva.md\`](../../contenidos/${c.pf}/modulo-2/R-quiz-canva.md). No se edita a mano: se cambia ese archivo y se vuelve a generar.

${SIN_RECURSOS.includes(c.pf) ? 'El curso no tenía quiz ni otros recursos del módulo 2: se hicieron desde cero el 2026-10-01, junto con sus infografías (`npm run infografias`).' : 'Reemplazan los quiz de Genially de 2024.'} Hay uno por cada aprendizaje esperado del módulo 2 (\`${m.codigo}\` ${m.nombre}, ${m.horas} h). Sus preguntas se escribieron sobre los criterios de evaluación del plan formativo 2026, y la cobertura de cada criterio está al final del archivo fuente.

**Misión:** ${meta.mision}.

| Quiz | Aprendizaje esperado 2026 | Tema | Insignia | Juego (HTML) | LMS (SCORM 1.2) | Moodle (GIFT) |
| --- | --- | --- | --- | --- | --- | --- |
${meta.quizzes.map((x, i) => `| ${i + 1} | AE${i + 1} · ${m.aprendizajes_esperados[i].texto} | ${x.tema} | ${x.insignia} | [html](${q(i + 1, 'Juego.html')}) | [zip](${q(i + 1, 'Juego-SCORM.zip')}) | [gift](${q(i + 1, 'Moodle.gift')}) |`).join('\n')}

Todo junto: [\`quiz-juego-M2-${c.pf}.zip\`](quiz-juego-M2-${c.pf}.zip).

## Cómo se suben

- **LMS con SCORM (Moodle u otro):** Agregar actividad → Paquete SCORM → \`M2-Quiz-n-Juego-SCORM.zip\`. Registra el mejor puntaje (0-100) y la finalización.
- **Como página web:** \`M2-Quiz-n-Juego.html\` es un solo archivo que funciona sin internet. Se sube como Archivo o Página, o se incrusta.
- **Moodle sin juego:** Banco de preguntas → Importar → formato GIFT → \`M2-Quiz-n-Moodle.gift\`, y luego un Cuestionario con esas 5 preguntas.

## Gamificación

Cada quiz es una misión de 5 niveles, uno por pregunta. Trae XP, combos, 3 de energía, un comodín 50:50 y dos intentos por nivel (uno en las de verdadero o falso). Al final da logros e insignia de oro, plata o bronce. Es formativo: no lleva nota y muestra la retroalimentación al responder.
`;
}

const pedidos = process.argv.slice(2).map((x) => x.toUpperCase());
const desconocidos = pedidos.filter((pf) => !CURSOS.some((c) => c.pf === pf));
if (desconocidos.length) throw new Error(`Cursos que este script no conoce: ${desconocidos.join(', ')}. Conoce: ${CURSOS.map((c) => c.pf).join(', ')}`);
let hechos = 0;
for (const c of CURSOS.filter((x) => !pedidos.length || pedidos.includes(x.pf))) {
  if (c.fuente && !ESTILOS[c.pf]) ESTILOS[c.pf] = ESTILOS[c.fuente];
  if (!ESTILOS[c.pf]) throw new Error(`${c.pf}: falta su diseño en ESTILOS`);
  if (!c.kit) giftSinKit(c);
  const meta = metadatos(c);
  const paraZip = [];
  for (const [i, q] of meta.quizzes.entries()) {
    const n = i + 1;
    if (!ESTILOS[c.pf].quiz[n]) throw new Error(`${c.pf}: falta el estilo del Quiz ${n} en ESTILOS`);
    const estilo = { fondo: ESTILOS[c.pf].fondo, ...ESTILOS[c.pf].quiz[n] };
    const datos = { curso: c.pf, cursoNombre: c.nombre, quiz: n, ...q, mision: meta.mision, estilo, preguntas: preguntas(c, n) };
    const titulo = `${c.pf} · M2 · Quiz ${n} · ${q.tema} · Misión`;
    const pagina = html(datos, titulo);
    const base = `modulo-2/${c.carpeta}/entrega/quiz/M2-Quiz-${n}-Juego`;
    escribir(`${base}.html`, pagina);
    const zip = crearZip([
      { nombre: 'imsmanifest.xml', contenido: manifiesto(`${c.pf}-M2-QUIZ-${n}-JUEGO`, titulo) },
      { nombre: 'index.html', contenido: pagina },
    ], { fecha: FECHA_ZIP });
    fs.writeFileSync(ruta(`${base}-SCORM.zip`), zip);
    console.log(`${base}.html  (${Math.round(Buffer.byteLength(pagina) / 1024)} KB) · SCORM ${Math.round(zip.length / 1024)} KB · insignia «${q.insignia}»`);
    const nombre = `M2-Quiz-${n}`;
    paraZip.push({ nombre: `${nombre}-Juego.html`, contenido: pagina }, { nombre: `${nombre}-Juego-SCORM.zip`, contenido: zip },
      { nombre: `${nombre}-Moodle.gift`, contenido: leer(`modulo-2/${c.carpeta}/entrega/quiz/${nombre}-Moodle.gift`) });
    hechos++;
  }
  // Un zip por curso con los juegos (HTML y SCORM) y los GIFT, para subirlos de una vez. Los del kit van en `npm run zip`.
  if (!c.kit) {
    const todo = crearZip(paraZip, { fecha: FECHA_ZIP });
    fs.writeFileSync(ruta(`modulo-2/${c.carpeta}/quiz-juego-M2-${c.pf}.zip`), todo);
    console.log(`modulo-2/${c.carpeta}/quiz-juego-M2-${c.pf}.zip  (${Math.round(todo.length / 1024)} KB, ${paraZip.length} archivos)`);
    escribir(`modulo-2/${c.carpeta}/README.md`, readme(c, meta));
  }
}
console.log(`${hechos} quiz gamificados.`);
