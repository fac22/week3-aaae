'use strict';

const auth = require('../auth.js');
const model = require('../database/model.js');

function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    model.getSession(sid).then((session) => {
      response.send(/*html*/ `
      <h1>Penny for your thoughts, ${session.user.name}?</h1>
      <form action="write-post" method="POST">
        <label for="post">Your post</label>
        <input type="text" id="post" name="post">
        <button>Post post 😎</button>
      </form>
    `);
    });
  } else {
    response.redirect('/');
  }
}

function post(request, response) {
  const { post } = request.body;

  const sid = request.signedCookies.sid;
  if (sid) {
    model
      .getSession(sid)
      .then((session) => model.createPost(session.user.id, post))
      .then(response.redirect('/posts'))
      .catch(response.send('<h1>Error creating post</h1>'));
  } else {
    response.redirect('/');
  }

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
