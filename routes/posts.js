'use strict';

const model = require('../database/model');

function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    model
      .getPosts()
      .then((posts) => {
        const postList = posts
          .map((post, index, posts) => {
            return /*html*/ `<li>${post.text_content}</li>
        <form action="/posts" method="POST"><button name="id" value="${
          post.id
        }" aria-label="Delete post ${index + 1} of ${posts.length}">
          Delete
        </button></form>
     `;
          })
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

function post(request, response) {
  const postId = request.body.id;
  console.log(request.body);
  const sid = request.signedCookies.sid;

  if (sid) {
    model
      .getSession(sid)
      .then((session) => model.deletePost(postId, session.user.id))
      .then(() => response.redirect('/posts'));
  } else {
    response.redirect('/');
  }
}

module.exports = { get, post };
