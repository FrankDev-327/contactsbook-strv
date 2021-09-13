'use strict';

const moment = require('moment');
const jwt = require('jwt-simple');
const logger = require('../configurations/winston');
const { SECRET_KEY, EXPIRED } = require('../configurations/config');

module.exports = {
    authentication: (req, res, next) => {
        try {
            const header = req.headers.authorization;
            if (!header) {
                return res.status(401).json({
                    message: 'The request does not have the authentication header.'
                });
            }

            const token = header.replace(/['"]+/g, '');
            var payload = jwt.decode(token, SECRET_KEY);
            if (payload.exp <= moment().add(EXPIRED, 'min').unix()) {
                return res.status(401).json({
                    message: 'The token has expired.'
                });
            }

        } catch (error) {
            logger.error(error);
            return res.status(400).json({
                message: 'Something unexpected happened.'
            });
        }

        req.user = payload;
        next();
    }
}
