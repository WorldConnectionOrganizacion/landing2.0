-- Migración: ocultar partes de una noticia (ejecutar una vez en Supabase > SQL Editor).
alter table public.posts
  add column if not exists hidden_fields text[] not null default '{}';
