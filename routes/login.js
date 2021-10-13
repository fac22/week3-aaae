'use strict';

const model = require('../database/model');
const auth = require('../auth.js');

function get(request, response) {
  const html = /*html*/ `
    <h1>Log in</h1>
    <form action="log-in" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Log in</button>
    </form>
    `;
  response.send(html);
}

function post(request, response) {}

module.exports = { get, post };
