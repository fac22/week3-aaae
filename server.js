'use strict';

const express = require('express');

const login = require('./routes/login');
const signUp = require('./routes/signUp.js');
const db = require('./database/connection.js');

const server = express();


const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();




server.use(express.urlencoded({ extended: false }));

server.use(cookieParser(process.env.COOKIE_SECRET));

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

server.get('/sign-up', signUp.get);
server.post('/sign-up', signUp.post);


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
