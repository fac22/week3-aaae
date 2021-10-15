'use strict';

const model = require('../database/model.js');
const layout = require('../layout');

function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    model.getSession(sid).then((session) => {
      response.send(
        layout(
          'Write-Post',
          /*html*/ `
      <h2>Penny for your thoughts, ${session.user.name}?</h2>
      <form action="write-post" method="POST">
        <label for="post">Your post</label>
        <input type="text" id="post" name="post">
        <button type='submit'>Post post 😎</button>
      </form>
    `
        )
      );
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
}

module.exports = { get, post };
