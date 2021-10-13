'use strict';

const auth = require('../auth.js');
// temp import of model, remove when using auth.js
const model = require('../database/model');

function get(request, response) {
  response.send(/*html*/ `
    <h1>Create an account</h1>
    <form action="sign-up" method="POST">
      <label for="name">Name</label>
      <input type="name" id="name" name="name">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Sign up</button>
    </form>
  `);
}

function post(request, response) {
  const { email, password, name } = request.body;
  model
    .createUser(email, password, name)
    .then((user) =>
      response.send(
        `<h1>email: ${user.email}, id: ${user.id}, name: ${user.name}</h1>`
      )
    )
    .catch(() => {
      response.send('<h1>Something went wrong creating a user</h1>');
    });
}

module.exports = { get, post };
