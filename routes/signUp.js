'use strict';

const auth = require('../auth.js');
const layout = require('../layout');

function get(request, response) {
  const html = /*html*/ `
  <h2 class='center'>Create an account</h2>
  <form action="sign-up" method="POST" class='center width-sm stack-md'>
    <div>
    <label for="name">Name</label>
    <input type="name" id="name" name="name">
    </div>
    
    <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email">
    </div>
    
    <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password">
    </div>
    
    <button type='submit'>Sign up</button>
  </form>

  <div class='center width-sm return'>
    <a href='/'>↩  Return Home</a>
  </div>
`;
  response.send(layout('Sign-up', html));
}

function post(request, response) {
  const { email, password, name } = request.body;
  auth
    .createUser(email, password, name)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS);
      console.log('created and logged in!');
      response.redirect('/write-post');
    })
    .catch(() => {
      response.send('<h1>Something went wrong creating a user</h1>');
    });
}

module.exports = { get, post };
