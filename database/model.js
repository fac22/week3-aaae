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

function getUser(email) {
  const SELECT_USER = /*sql*/ `
    SELECT id, email, password, name FROM users WHERE email=$1
    `;
  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

function createSession(sid, data) {
  const INSERT_SESSION = /*sql*/ `
  INSERT INTO sessions (sid, data) VALUES ($1, $2)
  RETURNING sid`;
  return db
    .query(INSERT_SESSION, [sid, data])
    .then((result) => result.rows[0].sid);
}

function getSession(sid) {
  const SELECT_SESSION = /*sql*/ `SELECT data FROM sessions WHERE sid=$1`;
  return db.query(SELECT_SESSION, [sid]).then((result) => {
    const singleResult = result.rows[0];
    return singleResult && singleResult.data;
  });
}

function createPost(id, textContent) {
  const INSERT_POST = /*sql*/ `INSERT INTO posts (user_id, text_content, created_at) VALUES ($1, $2, (SELECT CURRENT_TIMESTAMP))`;
  return db.query(INSERT_POST, [id, textContent]);
}

function getPosts() {
  const SELECT_POST = /*sql*/ `
    SELECT id, text_content, user_id FROM posts
    `;
  return db.query(SELECT_POST).then((result) => result.rows);
}

function deletePost(postId, user_id) {
  const DELETE_POST = /*sql*/ `DELETE FROM posts WHERE id=$1 AND user_id=$2`;
  return db.query(DELETE_POST, [parseInt(postId, 10), user_id]);
}

function deleteSession(sid) {
  const DELETE_SESSION = /*sql*/ `DELETE FROM sessions WHERE sid=$1`;
  return db.query(DELETE_SESSION, [sid]);
}

module.exports = {
  createUser,
  getUser,
  createSession,
  getSession,
  createPost,
  getPosts,
  deletePost,
  deleteSession,
};
