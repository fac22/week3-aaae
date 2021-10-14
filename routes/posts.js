'use strict';

const model = require('../database/model');

function get(request, response) {
  model
    .getPosts()
    .then((posts) => {
      const postList = posts.map((post) => `<li>${post.text_content}</li>`);
      return postList;
    })
    .then((postList) => {
      const html = `<ul>${postList}</ul>`;
      return html;
    })
    .then((html) => response.send(html));
}

module.exports = { get };
