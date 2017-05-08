const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')();
const db = pgp({
  database: 'wiki_db'
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
