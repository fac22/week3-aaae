'use strict';

const model = require('../database/model');
const layout = require('../layout');

function post(request, response) {
  const sid = request.signedCookies.sid;

  if (sid) {
    model.deleteSession(sid).then(() => {
      response.clearCookie('sid');
      response.send(
        layout(
          'log',
          '<h1>You are now logged out! <a href="/">Log back in</a></h1>'
        )
      );
    });
  } else {
    response.redirect('/');
  }
}

module.exports = { post };
