'use strict';

const mongoose = require('mongoose');
const DATABASE_URL_TEST = "mongodb://127.0.0.1:27017/users-test";

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise = global.Promise;

module.exports.connect = async () => {
    await mongoose.connect(DATABASE_URL_TEST);
}

module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}
