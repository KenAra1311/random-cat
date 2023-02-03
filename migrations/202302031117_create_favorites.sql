-- Create a table for public favorites
create table favorites (
  id bigint not null primary key,
  url text not null,
  profile_id uuid not null,

  foreign key (profile_id) references profiles(id)
);
