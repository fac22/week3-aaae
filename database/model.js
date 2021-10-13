'use strict';

const db = require('./connection.js');

function createUser(email, password, name) {
  console.log('creating user');
  const INSERT_USER = /*sql*/ `
      INSERT INTO users (email, password, name) VALUES ($1, $2, $3)
      RETURNING id, email, name
    `;
  console.log('user to create', { email, password, name });
  return db.query(INSERT_USER, [email, password, name]).then((result) => {
    console.log('result from insert: ', result.rows[0]);
    return result.rows[0];
  });
}

module.exports = { createUser };
