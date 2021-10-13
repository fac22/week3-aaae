'use strict';

const express = require('express');
const login = require('./routes/login');
const db = require('./database/connection.js');

const server = express();

const bodyParser = express.urlencoded({ extended: false });

//
//    rows: [
//   {
//     id: 1,
//     email: 'test@gmail.com',
//     password: '$2a$10$vzgLAxSa1k293giKSbVWi.GgSGmb1JB/kD1qWIg.mrUlt7UwVDCWG',
//     name: 'Test Testington'
//   }
// ]
server.get('/', (request, response) => {
  db.query('SELECT * FROM users').then((result) => {
    console.log(result);
  });
  response.send('<h1>Hello</h1>');
});

// setting the routes for login - get and set
// implementation of the functions is in the ./routes/login.js
server.get('/login', login.get);
server.post('/login', login.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
