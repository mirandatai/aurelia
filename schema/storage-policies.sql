-- Buckets
insert into storage.buckets (id, name, public)
values
  ('covers', 'covers', true),
  ('notes', 'notes', false)
on conflict (id) do nothing;

-- Public read for covers
drop policy if exists "Public read covers" on storage.objects;
create policy "Public read covers"
on storage.objects for select
using (bucket_id = 'covers');

-- Authenticated write to covers
drop policy if exists "Authenticated write covers" on storage.objects;
create policy "Authenticated write covers"
on storage.objects for insert
with check (bucket_id = 'covers' and auth.role() = 'authenticated');

drop policy if exists "Authenticated update/delete covers" on storage.objects;
create policy "Authenticated update/delete covers"
on storage.objects for all
using (bucket_id = 'covers' and auth.role() = 'authenticated');

-- Notes: private per owner
-- Select only own
drop policy if exists "Notes select own" on storage.objects;
create policy "Notes select own"
on storage.objects for select
using (bucket_id = 'notes' and owner = auth.uid());

-- Insert/update/delete only own
drop policy if exists "Notes write own" on storage.objects;
create policy "Notes write own"
on storage.objects for all
using (bucket_id = 'notes' and owner = auth.uid())
with check (bucket_id = 'notes' and owner = auth.uid());
