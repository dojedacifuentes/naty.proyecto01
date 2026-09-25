-- Actividad 2 · Rescate del workflow roto (PF1821, módulo 2). Datos ficticios.
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
  ('Santiago', 'RM'),
  ('Providencia', 'RM'),
  ('Las Condes', 'RM'),
  ('Ñuñoa', 'RM'),
  ('Maipú', 'RM'),
  ('La Florida', 'RM'),
  ('Puente Alto', 'RM'),
  ('Vitacura', 'RM'),
  ('Lo Barnechea', 'RM'),
  ('La Reina', 'RM'),
  ('Macul', 'RM'),
  ('Peñalolén', 'RM'),
  ('San Miguel', 'RM'),
  ('Estación Central', 'RM'),
  ('Recoleta', 'RM'),
  ('Independencia', 'RM'),
  ('Quilicura', 'RM'),
  ('Pudahuel', 'RM'),
  ('Cerrillos', 'RM'),
  ('La Cisterna', 'RM'),
  ('San Bernardo', 'RM'),
  ('Quinta Normal', 'RM'),
  ('Renca', 'RM'),
  ('Conchalí', 'RM'),
  ('Huechuraba', 'RM'),
  ('La Granja', 'RM'),
  ('San Joaquín', 'RM'),
  ('Lo Prado', 'RM'),
  ('El Bosque', 'RM'),
  ('Colina', 'RM'),
  ('Valparaíso', 'Regiones'),
  ('Viña del Mar', 'Regiones'),
  ('Concepción', 'Regiones'),
  ('Temuco', 'Regiones'),
  ('Rancagua', 'Regiones'),
  ('Talca', 'Regiones'),
  ('La Serena', 'Regiones'),
  ('Antofagasta', 'Regiones'),
  ('Puerto Montt', 'Regiones'),
  ('Punta Arenas', 'Regiones')
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
