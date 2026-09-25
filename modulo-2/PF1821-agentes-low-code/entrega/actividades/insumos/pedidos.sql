create table pedidos (
  id              bigint generated always as identity primary key,
  creado_en       timestamptz not null default now(),
  nombre          text not null,
  email           text not null,
  comuna          text not null,
  tipo_cliente    text not null check (tipo_cliente in ('minorista', 'mayorista')),
  producto        text not null,
  cantidad        integer not null check (cantidad > 0),
  precio_unitario integer not null,
  total           integer not null
);
