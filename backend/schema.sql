CREATE TABLE page (
  title varchar PRIMARY KEY,
  content varchar,
  time_modified timestamp,
  time_created timestamp default now()
);
