'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const signUp = require('./routes/signUp.js');

const server = express();

server.use(express.urlencoded({ extended: false }));

server.use(cookieParser(process.env.COOKIE_SECRET));

server.get('/', (request, response) => {
  response.send('<h1>Hello</h1>');
});

server.get('/sign-up', signUp.get);
server.post('/sign-up', signUp.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
