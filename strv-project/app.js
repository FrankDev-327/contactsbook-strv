'use strict';

const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const { NODE_ENV } = require('./configurations/config');
const { userRoute, firebaseRoute } = require('./routes/index');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

if (NODE_ENV === 'development') {
    const morgan = require('morgan'); 
    const winston = require('./configurations/winston');
    server.use(morgan('combined', { stream: winston.stream }));
}

server.use(userRoute);
server.use(firebaseRoute);

module.exports = server;
