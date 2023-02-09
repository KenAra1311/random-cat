-- Use Postgres to create a bucket.

insert into storage.buckets (id, name)
values ('avatars', 'avatars');
