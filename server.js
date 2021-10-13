'use strict';

const express = require('express');
const login = require('./routes/login');

const server = express();

const bodyParser = express.urlencoded({ extended: false });

server.get('/', (request, response) => {
  response.send('<h1>Hello</h1>');
});
// setting the routes for login - get and set
// implementation of the functions is in the ./routes/login.js
server.get('/login', login.get);
server.post('/login', login.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
