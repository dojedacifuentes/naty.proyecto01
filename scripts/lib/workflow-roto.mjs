/**
 * Actividad 2 de PF1821, "Rescate del workflow roto": el workflow de n8n que enruta los pedidos de
 * Mercado Austral, en dos versiones que salen de la misma definición:
 *   - roto: con las 5 fallas de las misiones de C2-actividades.md (insumo del participante);
 *   - corregido: la respuesta modelada del tutor.
 * Además: los 6 pedidos de prueba (fijados como datos del Webhook), la tabla de comunas y el SQL.
 *
 * Nodos: Webhook v2, Edit Fields (Set) v3.4, If v2.2, Supabase v1, Merge v3, Switch v3.2.
 * No se ha importado en n8n desde esta máquina: el tutor lo importa y lo prueba antes de publicarlo.
 */
import crypto from 'node:crypto';

const id = (texto) => {
  const h = crypto.createHash('md5').update(texto).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
};

// 40 comunas (30 de la RM y 10 de regiones). Isla de Pascua no está a propósito: es el caso borde
// de la misión 3.
const RM = ['Santiago', 'Providencia', 'Las Condes', 'Ñuñoa', 'Maipú', 'La Florida', 'Puente Alto', 'Vitacura',
  'Lo Barnechea', 'La Reina', 'Macul', 'Peñalolén', 'San Miguel', 'Estación Central', 'Recoleta', 'Independencia',
  'Quilicura', 'Pudahuel', 'Cerrillos', 'La Cisterna', 'San Bernardo', 'Quinta Normal', 'Renca', 'Conchalí',
  'Huechuraba', 'La Granja', 'San Joaquín', 'Lo Prado', 'El Bosque', 'Colina'];
const REGIONES = ['Valparaíso', 'Viña del Mar', 'Concepción', 'Temuco', 'Rancagua', 'Talca', 'La Serena',
  'Antofagasta', 'Puerto Montt', 'Punta Arenas'];
export const COMUNAS = [...RM.map((c) => [c, 'RM']), ...REGIONES.map((c) => [c, 'Regiones'])];

// Seis pedidos de prueba (datos ficticios, dominio reservado .test). Cada uno prueba una ruta o una misión.
export const PEDIDOS_PRUEBA = [
  { nombre: 'Ana Rojas', email: ' Ana.Rojas@Correo.test ', comuna: 'Ñuñoa', tipo_cliente: 'minorista', producto: 'Café en grano 1 kg', cantidad: 2, precio_unitario: 12500 },
  { nombre: 'Minimarket Doña Rosa', email: 'rosa@donarosa.test', comuna: 'Maipú', tipo_cliente: 'mayorista', producto: 'Arroz 25 kg', cantidad: 8, precio_unitario: 24500 },
  { nombre: 'Pedro Soto', email: 'pedro.soto@correo.test', comuna: 'Providencia', tipo_cliente: 'minorista', producto: 'Azúcar 25 kg', cantidad: 10, precio_unitario: 21900 },
  { nombre: 'Luis Pérez', email: 'luis.perez@correo.test', comuna: 'Temuco', tipo_cliente: 'minorista', producto: 'Aceite 5 L', cantidad: 6, precio_unitario: 15990 },
  { nombre: 'Comercial Rapa Nui', email: 'ventas@rapanui.test', comuna: 'Isla de Pascua', tipo_cliente: 'distribuidor', producto: 'Yerba mate 1 kg', cantidad: 12, precio_unitario: 6900 },
  { nombre: 'Camila Pérez', email: 'camila.perez@correo.test', comuna: 'Valparaíso', tipo_cliente: 'minorista', producto: 'Té verde 100 u', cantidad: '3 unidades', precio_unitario: 4200 },
];

const asignacion = (nombre, valor, tipo) => ({ id: id(`asig-${nombre}-${valor}`), name: nombre, value: valor, type: tipo });
const condicion = (izq, der, tipo, operacion, extra = {}) => ({
  id: id(`cond-${izq}-${operacion}-${der}`), leftValue: izq, rightValue: der, operator: { type: tipo, operation: operacion, ...extra },
});
const condiciones = (lista, combinador, suelta) => ({
  options: { caseSensitive: true, leftValue: '', typeValidation: suelta ? 'loose' : 'strict', version: 2 },
  conditions: lista, combinator: combinador,
});
const columnas = (nombres) => ({ fieldValues: nombres.map((n) => ({ fieldId: n, fieldValue: `={{ $json.${n} }}` })) });

export function workflowActividad2({ roto }) {
  const nodos = [];
  const nodo = (nombre, tipo, version, x, y, parametros, extra = {}) => {
    nodos.push({ parameters: parametros, id: id(`nodo-${nombre}`), name: nombre, type: tipo, typeVersion: version, position: [x, y], ...extra });
  };

  nodo('Webhook', 'n8n-nodes-base.webhook', 2, 0, 300,
    { httpMethod: 'POST', path: 'pedidos-mercado-austral', options: {} }, { webhookId: id('webhook-pedidos') });

  // Falla de la misión 5: cantidad queda como texto; falla de la misión 1: total_texto es el que se compara.
  nodo('Normalizar pedido', 'n8n-nodes-base.set', 3.4, 220, 300, {
    mode: 'manual',
    assignments: { assignments: [
      asignacion('nombre', '={{ $json.body.nombre }}', 'string'),
      asignacion('email', '={{ $json.body.email.trim().toLowerCase() }}', 'string'),
      asignacion('comuna', '={{ $json.body.comuna.trim() }}', 'string'),
      asignacion('tipo_cliente', '={{ $json.body.tipo_cliente }}', 'string'),
      asignacion('producto', '={{ $json.body.producto }}', 'string'),
      roto ? asignacion('cantidad', '={{ $json.body.cantidad }}', 'string')
        : asignacion('cantidad', '={{ parseInt($json.body.cantidad, 10) }}', 'number'),
      asignacion('precio_unitario', '={{ Number($json.body.precio_unitario) }}', 'number'),
      asignacion('total', roto ? '={{ parseFloat($json.body.cantidad) * Number($json.body.precio_unitario) }}'
        : '={{ parseInt($json.body.cantidad, 10) * Number($json.body.precio_unitario) }}', 'number'),
      asignacion('total_texto', roto ? "={{ (parseFloat($json.body.cantidad) * Number($json.body.precio_unitario)).toLocaleString('es-CL') }}"
        : "={{ (parseInt($json.body.cantidad, 10) * Number($json.body.precio_unitario)).toLocaleString('es-CL') }}", 'string'),
    ] },
    includeOtherFields: false,
    options: {},
  });

  // Falla de la misión 2: $json.Email con mayúscula.
  nodo('Validar pedido', 'n8n-nodes-base.if', 2.2, 440, 300, {
    conditions: condiciones([
      condicion(roto ? '={{ $json.Email }}' : '={{ $json.email }}', '@', 'string', 'contains'),
      roto ? condicion('={{ parseFloat($json.cantidad) > 0 }}', '', 'boolean', 'true', { singleValue: true })
        : condicion('={{ $json.cantidad }}', 0, 'number', 'gt'),
    ], 'and', true),
    looseTypeValidation: true,
    options: {},
  });

  nodo('Leer comunas', 'n8n-nodes-base.supabase', 1, 660, 460,
    { operation: 'getAll', tableId: 'comunas', returnAll: true }, { executeOnce: true });

  // Falla de la misión 4: todas las combinaciones posibles.
  nodo('Unir zona', 'n8n-nodes-base.merge', 3, 880, 300, roto
    ? { mode: 'combine', combineBy: 'combineAll', options: {} }
    : { mode: 'combine', combineBy: 'combineByFields', fieldsToMatchString: 'comuna', joinMode: 'enrichInput1', options: {} });

  const regla = (clave, lista) => ({ conditions: condiciones(lista, 'or', true), renameOutput: true, outputKey: clave });
  // Fallas de las misiones 1 (compara total_texto) y 3 (sin salida de respaldo).
  nodo('Enrutar pedido', 'n8n-nodes-base.switch', 3.2, 1100, 300, {
    rules: { values: [
      regla('mayorista', [
        condicion('={{ $json.tipo_cliente }}', 'mayorista', 'string', 'equals'),
        condicion(roto ? '={{ $json.total_texto }}' : '={{ $json.total }}', 150000, 'number', 'gte'),
      ]),
      regla('regiones', [condicion('={{ $json.zona }}', 'Regiones', 'string', 'equals')]),
      regla('bodega RM', [condicion('={{ $json.tipo_cliente }}', 'minorista', 'string', 'equals')]),
    ] },
    looseTypeValidation: true,
    options: roto ? {} : { fallbackOutput: 'extra', renameFallbackOutput: 'revisión manual' },
  });

  const base = ['nombre', 'email', 'comuna', 'tipo_cliente', 'producto', 'cantidad', 'precio_unitario', 'total', 'zona'];
  const RUTAS = [['mayorista', 'Ruta mayorista'], ['regiones', 'Ruta regiones'], ['bodega RM', 'Ruta bodega RM'], ['revisión', 'Ruta revisión']];
  // Falla del bonus: sin ruta ni id de ejecución.
  if (!roto) {
    RUTAS.forEach(([ruta, nombre], i) => nodo(nombre, 'n8n-nodes-base.set', 3.4, 1320, 120 + i * 160, {
      mode: 'manual',
      assignments: { assignments: [
        asignacion('ruta', ruta, 'string'),
        asignacion('id_ejecucion', '={{ $execution.id }}', 'string'),
      ] },
      includeOtherFields: true,
      options: {},
    }));
  }

  // Falla de la misión 5: sin manejo de errores en el nodo que guarda.
  nodo('Guardar pedido', 'n8n-nodes-base.supabase', 1, 1540, 260,
    { operation: 'create', tableId: 'pedidos', fieldsUi: columnas(roto ? base : [...base, 'ruta', 'id_ejecucion']) },
    roto ? {} : { onError: 'continueErrorOutput' });

  nodo('Registrar rechazado', 'n8n-nodes-base.supabase', 1, 660, 140, {
    operation: 'create', tableId: 'pedidos_rechazados',
    fieldsUi: { fieldValues: [
      ...['nombre', 'email', 'comuna'].map((n) => ({ fieldId: n, fieldValue: `={{ $json.${n} }}` })),
      { fieldId: 'cantidad', fieldValue: '={{ String($json.cantidad) }}' },
      { fieldId: 'motivo', fieldValue: 'Datos inválidos: correo sin @ o cantidad no válida' },
    ] },
  });

  if (!roto) {
    nodo('Registrar error', 'n8n-nodes-base.supabase', 1, 1760, 360, {
      operation: 'create', tableId: 'pedidos_rechazados',
      fieldsUi: { fieldValues: [
        ...['nombre', 'email', 'comuna'].map((n) => ({ fieldId: n, fieldValue: `={{ $json.${n} }}` })),
        { fieldId: 'cantidad', fieldValue: '={{ String($json.cantidad) }}' },
        { fieldId: 'motivo', fieldValue: "={{ 'Error al guardar: ' + ($json.error && $json.error.message ? $json.error.message : JSON.stringify($json.error)) }}" },
      ] },
    });
    nodo('Registrar en revisión', 'n8n-nodes-base.supabase', 1, 1540, 620, {
      operation: 'create', tableId: 'revision_manual',
      fieldsUi: { fieldValues: [
        ...['nombre', 'email', 'comuna', 'tipo_cliente', 'producto'].map((n) => ({ fieldId: n, fieldValue: `={{ $json.${n} }}` })),
        { fieldId: 'cantidad', fieldValue: '={{ String($json.cantidad) }}' },
        { fieldId: 'total', fieldValue: '={{ $json.total }}' },
        { fieldId: 'id_ejecucion', fieldValue: '={{ $json.id_ejecucion }}' },
      ] },
    });
  }

  const a = (nombre, entrada = 0) => ({ node: nombre, type: 'main', index: entrada });
  const conexiones = {
    Webhook: { main: [[a('Normalizar pedido')]] },
    'Normalizar pedido': { main: [[a('Validar pedido')]] },
    'Validar pedido': { main: [[a('Unir zona', 0), a('Leer comunas')], [a('Registrar rechazado')]] },
    'Leer comunas': { main: [[a('Unir zona', 1)]] },
    'Unir zona': { main: [[a('Enrutar pedido')]] },
  };
  if (roto) {
    conexiones['Enrutar pedido'] = { main: [[a('Guardar pedido')], [a('Guardar pedido')], [a('Guardar pedido')]] };
  } else {
    conexiones['Enrutar pedido'] = { main: RUTAS.map(([, nombre]) => [a(nombre)]) };
    for (const [, nombre] of RUTAS.slice(0, 3)) conexiones[nombre] = { main: [[a('Guardar pedido')]] };
    conexiones['Ruta revisión'] = { main: [[a('Registrar en revisión')]] };
    conexiones['Guardar pedido'] = { main: [[], [a('Registrar error')]] };
  }

  return JSON.stringify({
    name: roto ? 'Pedidos enrutados v0 (practicante)' : 'Pedidos enrutados (corregido, tutor)',
    nodes: nodos,
    connections: conexiones,
    pinData: { Webhook: PEDIDOS_PRUEBA.map((p) => ({ json: { headers: {}, params: {}, query: {}, body: p } })) },
    settings: { executionOrder: 'v1' },
    active: false,
    meta: {},
    tags: [],
  }, null, 2) + '\n';
}

export const pedidosPruebaJson = () => JSON.stringify(PEDIDOS_PRUEBA, null, 2) + '\n';
export const comunasCsv = () => 'comuna,zona\n' + COMUNAS.map(([c, z]) => `${c},${z}`).join('\n') + '\n';

export function sqlActividad2() {
  const valores = COMUNAS.map(([c, z]) => `  ('${c}', '${z}')`).join(',\n');
  return `-- Actividad 2 · Rescate del workflow roto (PF1821, módulo 2). Datos ficticios.
-- Requiere la tabla pedidos de la actividad 1 (pedidos.sql).

alter table pedidos
  add column if not exists zona text,
  add column if not exists ruta text,
  add column if not exists id_ejecucion text;

create table if not exists comunas (
  comuna text primary key,
  zona   text not null check (zona in ('RM', 'Regiones'))
);

insert into comunas (comuna, zona) values
${valores}
on conflict (comuna) do nothing;

create table if not exists pedidos_rechazados (
  id        bigint generated always as identity primary key,
  creado_en timestamptz not null default now(),
  nombre    text,
  email     text,
  comuna    text,
  cantidad  text,
  motivo    text not null
);

create table if not exists revision_manual (
  id           bigint generated always as identity primary key,
  creado_en    timestamptz not null default now(),
  nombre       text,
  email        text,
  comuna       text,
  tipo_cliente text,
  producto     text,
  cantidad     text,
  total        integer,
  id_ejecucion text
);
`;
}
