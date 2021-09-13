'use strict';

const logDir = 'logs';
const fs = require('fs');
const winston = require('winston');
const { formatTimesTamp } = require('../formats_dates/formats');
const { combine, timestamp, metadata, colorize, printf, errors, json } = winston.format;
const myFormat = printf(({ timestamp, level, message }) => {
    timestamp = formatTimesTamp(timestamp);
    return `[${timestamp}]-[${level}]: ${message}.`;
});

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const levels = {
    error: 0,
    info: 2
};

const options = {
    file: {
        level: levels,
        filename: `${logDir}/api.log`,
        handleExceptions: true,
        defaultMeta: { service: 'contacts-book' },
        json: true,
        maxFiles: 5,
        colorize: false,
        format: combine(
            errors({ stack: true }),
            metadata(),
            json()
        )
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        format: combine(
            timestamp(),
            metadata({
                fillExcept: ["timestamp", "service", "level", "message"]
            }),
            colorize(),
            myFormat
        )
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;