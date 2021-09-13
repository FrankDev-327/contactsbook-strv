'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = Schema({
    email: { type: String, unique: true },
    password: { type: String }
});

const Users = mongoose.model('Users', UserModel);
module.exports = Users;