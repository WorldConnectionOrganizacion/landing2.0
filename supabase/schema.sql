-- Ejecutar en Supabase > SQL Editor.

create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  category    text not null default 'Noticias',
  excerpt     text not null default '',
  cover_url   text,
  -- Lista ordenada de bloques: {type:'text',text} | {type:'image',url,caption} | {type:'video',url}
  blocks      jsonb not null default '[]'::jsonb,
  published   boolean not null default false,
  published_at timestamptz not null default now(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists posts_published_idx
  on public.posts (published, published_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- RLS: el público (anon) solo LEE noticias publicadas.
-- Sin políticas de escritura: crear/editar/borrar solo desde /api con la secret key.
alter table public.posts enable row level security;

drop policy if exists "public read published" on public.posts;
create policy "public read published"
  on public.posts for select
  to anon, authenticated
  using (published = true);

-- Storage: bucket público para imágenes de noticias (lectura pública, escritura solo con secret key).
insert into storage.buckets (id, name, public)
values ('news-media', 'news-media', true)
on conflict (id) do nothing;

-- Límites del bucket: máx. 5 MB y solo imágenes (la subida es directa desde el navegador).
update storage.buckets
set file_size_limit = 5242880,
    allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif']
where id = 'news-media';

-- Partes de la noticia que NO se muestran en la web (ej. {cover,excerpt}). Valores: cover | excerpt | category | date.
alter table public.posts
  add column if not exists hidden_fields text[] not null default '{}';
