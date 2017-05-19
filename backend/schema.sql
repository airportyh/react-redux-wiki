CREATE TABLE page (
  title varchar PRIMARY KEY,
  content varchar,
  time_modified timestamp,
  time_created timestamp default now()
);

CREATE TABLE author (
  id serial PRIMARY KEY,
  name varchar NOT NULL UNIQUE,
  password varchar NOT NULL
);

CREATE TABLE login_session (
  author_id integer references author (id),
  auth_token varchar,
  expires timestamp DEFAULT now() + interval '30 days'
);
