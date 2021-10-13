'use strict';

const db = require('./connection.js');

function getUser(email) {
  const SELECT_USER = /*sql*/ `
    SELECT id, email, password, name, FROM users WHERE email=$1
    `;
  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

module.exports = { getUser };
