'use strict';

const model = require('../database/model');
const auth = require('../auth.js');
const layout = require('../layout');

function get(request, response) {
  const html = /*html*/ `
    <h2 class='center'>Log in</h2>
    <form action="log-in" method="POST" class='center width-sm stack-md'>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email">
      </div>
     
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
      </div>
      
      <button type='submit'>Log in</button>
    </form>
    <div class='center width-sm return'>
    <a href='/'>↩  Return Home</a>
    </div>
    `;
  response.send(layout('Log-in', html));
}

function post(request, response) {
  const { email, password } = request.body;

  auth
    .verifyUser(email, password)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS);
      response.redirect('/posts');
    })
    .catch(() => response.send(/*html*/ `<h1>User not found!</h1>`));
}

module.exports = { get, post };
