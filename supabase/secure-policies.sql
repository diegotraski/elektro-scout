-- Run once in Supabase → SQL Editor on an existing database.
-- Removes public write access: the anon key can only read; uploads go through /api/upload
-- with the service_role key, which bypasses RLS.

drop policy if exists "Public insert" on attacks;
drop policy if exists "Public update" on attacks;
drop policy if exists "Public delete" on attacks;
