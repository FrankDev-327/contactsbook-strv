'use strict';
//
var setDebug;
var connect_to_database;
const server = require('./app');
const mongoose = require('mongoose');
const logger = require('./configurations/winston');
const {
    PORT,
    NODE_ENV,
    DATABASE_URL_DEV,
    DATABASE_URL_PROD
} = require('./configurations/config');

mongoose.Promise = global.Promise;

if (NODE_ENV === 'development') {
    setDebug = true;
    connect_to_database = DATABASE_URL_DEV;
} else {
    setDebug = false
    connect_to_database = DATABASE_URL_PROD;
}

mongoose.set('debug', setDebug);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(connect_to_database, (err) => {
    if (err) {
        logger.error(err.message)
        return;
    } else {
        try {
            server.listen(PORT, () => {
                logger.info(`server is running on port: ${process.env.PORT}`);
            });
        } catch (error) {
            logger.error(error.message);
        }
    }
});

