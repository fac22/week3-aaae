'use strict';

const model = require('../database/model');

function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    model
      .getPosts()
      .then((posts) => {
        const postList = posts
          .map((post) => `<li>${post.text_content}</li>`)
          .join('');
        return postList;
      })
      .then((postList) => {
        const html = /*html*/ `<ul>${postList}</ul><form action="/log-out" method="post"><button>logout</button></form>`;
        return html;
      })
      .then((html) => response.send(html));
  } else {
    response.redirect('/');
  }
}

module.exports = { get };
