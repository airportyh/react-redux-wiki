const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bluebird = require('bluebird')
const pgp = require('pg-promise')({
  promiseLib: bluebird
});
const uuid = require('uuid');
const db = pgp(config);
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../frontend/build'));

app.get('/api/pages', (req, resp, next) => {
  db.any('select * from page')
    .then(pages => resp.json(pages))
    .catch(next);
});

app.get('/api/page/:title', (req, resp, next) => {
  let title = req.params.title;
  db.oneOrNone('select * from page where title = $1', title)
    .then(page => {
      if (page === null) {
        resp.status(404); // 404 not found
        resp.json({
          message: 'Page not found'
        });
      } else {
        resp.json(page);
      }
    })
    .catch(next);
});

app.post('/api/signup', (req, resp, next) => {
  let data = req.body;
  bcrypt.hash(data.password, 10)
    .then((encryptedPassword) =>
      db.one(`
        insert into author values (default, $1, $2)
        returning id, name
        `, [data.name, encryptedPassword])
    )
    .then(author => resp.json(author))
    .catch(next);
});

app.post('/api/login', (req, resp, next) => {
  let data = req.body;
  db.one(`select * from author where name = $1`, data.name)
    .then(author => [author, bcrypt.compare(data.password, author.password)])
    .spread((author, matches) => {
      if (matches) {
        let token = uuid.v4();
        return db.one(`insert into login_session values ($1, $2)
          returning *`,
          [author.id, token])
      } else {
        throw new Error('Passwords do not match.');
      }
    })
    .then(session => resp.json({
      name: data.name,
      auth_token: session.auth_token
    }))
    .catch(next);
});

app.use(function authorization(req, resp, next) {
  if (req.body && req.body.token) {
    db.one(`
      select * from login_session where auth_token = $1
      `, req.body.token)
      .then(() => next())
      .catch(() => {
        resp.status(403);
        resp.json({ error: 'Unauthorized' });
      });
  } else {
    resp.status(403);
    resp.json({ error: 'Unauthorized' });
  }
});

app.put('/api/page/:title', (req, resp, next) => {
  let title = req.params.title;
  let content = req.body.content;
  // this statement below either inserts or updates
  // the page - it is called "upsert"
  // See http://stackoverflow.com/questions/1109061/insert-on-duplicate-update-in-postgresql
  db.one(`
    insert into page values ($1, $2, now(), now())
    on conflict (title) do update
      set content = $2,
          time_modified = now()
    returning *
    `, [title, content])
    .then(page => resp.json(page))
    .catch(next);
});

app.use((err, req, resp, next) => {
  resp.status(500);
  resp.json({
    error: err.message,
    stack: err.stack.split('\n')
  });
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
