-- Enable RLS globally where applicable
alter table if exists public.profiles enable row level security;
alter table if exists public.books enable row level security;
alter table if exists public.shelf_items enable row level security;
alter table if exists public.reading_sessions enable row level security;
alter table if exists public.notes enable row level security;
alter table if exists public.emotions enable row level security;
alter table if exists public.playlist_suggestions enable row level security;
alter table if exists public.chat_threads enable row level security;
alter table if exists public.chat_messages enable row level security;

-- Profiles (linked to auth.users)
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text default 'pt-BR',
  created_at timestamptz default now()
);

-- Books
create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  cover_url text,
  isbn text,
  source text, -- google_books | open_library | manual
  created_at timestamptz default now()
);

-- Shelf items
create table if not exists public.shelf_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  status text not null check (status in ('reading','planned','abandoned','finished')),
  primary_format text check (primary_format in ('physical','kindle','audible')),
  created_at timestamptz default now()
);

-- Reading sessions
create table if not exists public.reading_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_ms bigint,
  progress_before numeric, -- % 0-100 ou páginas
  progress_after numeric,
  mood text,
  created_at timestamptz default now()
);

-- Notes
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  session_id uuid references public.reading_sessions(id) on delete set null,
  text text,
  image_url text,
  emotion text,
  created_at timestamptz default now()
);

-- Emotions (static, optional)
create table if not exists public.emotions (
  id uuid primary key default gen_random_uuid(),
  label text unique not null,
  color text,
  created_at timestamptz default now()
);

-- Playlist suggestions
create table if not exists public.playlist_suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  mood text,
  spotify_playlist_id text,
  result text, -- suggested | accepted | skipped
  created_at timestamptz default now()
);

-- Chat
create table if not exists public.chat_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.chat_threads(id) on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  mood_context text,
  created_at timestamptz default now()
);

-- RLS Policies

-- profiles: user can select/update own profile
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
using (user_id = auth.uid());

drop policy if exists "profiles_upsert_own" on public.profiles;
create policy "profiles_upsert_own"
on public.profiles for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- books: read all (public metadata), write restricted to service/admin
drop policy if exists "books_read_all" on public.books;
create policy "books_read_all"
on public.books for select
using (true);

-- shelf_items: owner-only
drop policy if exists "shelf_items_owner_all" on public.shelf_items;
create policy "shelf_items_owner_all"
on public.shelf_items for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- reading_sessions: owner-only
drop policy if exists "reading_sessions_owner_all" on public.reading_sessions;
create policy "reading_sessions_owner_all"
on public.reading_sessions for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- notes: owner-only
drop policy if exists "notes_owner_all" on public.notes;
create policy "notes_owner_all"
on public.notes for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- emotions: read all
drop policy if exists "emotions_read_all" on public.emotions;
create policy "emotions_read_all"
on public.emotions for select
using (true);

-- playlist_suggestions: owner-only
drop policy if exists "playlist_suggestions_owner_all" on public.playlist_suggestions;
create policy "playlist_suggestions_owner_all"
on public.playlist_suggestions for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- chat_threads: owner-only
drop policy if exists "chat_threads_owner_all" on public.chat_threads;
create policy "chat_threads_owner_all"
on public.chat_threads for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- chat_messages: select by membership of thread
-- insert restrito; client deve inserir mens. atreladas a thread do próprio user

drop policy if exists "chat_messages_select_by_thread" on public.chat_messages;
create policy "chat_messages_select_by_thread"
on public.chat_messages for select
using (exists (
  select 1 from public.chat_threads t
  where t.id = chat_messages.thread_id and t.user_id = auth.uid()
));
