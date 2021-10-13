'use strict';

const db = require('./connection.js');

function createUser(email, hash, name) {
  const INSERT_USER = /*sql*/ `
      INSERT INTO users (email, password, name) VALUES ($1, $2, $3)
      RETURNING id, email, name
    `;

  return db.query(INSERT_USER, [email, hash, name]).then((result) => {
    return result.rows[0];
  });
}

module.exports = { createUser };
