'use strict';

const auth = require('../auth.js');
const model = require('../database/model.js');

function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    model.getSession(sid).then((session) => {
      response.send(/*html*/ `
      <h1>Penny for your thoughts, ${session.user.name}?</h1>
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
    });
  } else {
    response.redirect('/');
  }
}

function post(request, response) {
  const { email, password, name } = request.body;
  auth
    .createUser(email, password, name)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS);
      console.log('created and logged in!');
      response.redirect('/');
    })
    .catch(() => {
      response.send('<h1>Something went wrong creating a user</h1>');
    });
}

module.exports = { get, post };
