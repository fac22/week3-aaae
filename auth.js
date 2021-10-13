'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model');

function createUser(email, password, name) {
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(email, hash, name));
}

module.exports = { createUser };
