'use strict';

const moment = require('moment');
const jwt = require('jwt-simple');
const { hash, compare } = require('bcrypt');
const Users = require('../models/user.model');
const logger = require('../configurations/winston');
const { SECRET_KEY, EXPIRED, ROUND_TO_HASH } = require('../configurations/config');

module.exports = {
    registerNewUser: async (req, res) => {
        try {
            logger.info('register user')
            const params = req.body;
            const query = { email: params.email };
            const existEmail = await Users.findOne(query);

            if (existEmail) {
                return res.status(202).json({
                    message: 'This email already exist. Try to another one.'
                });
            }

            params.password = await hash(params.password, ROUND_TO_HASH);
            const user = new Users({ ...params });
            var userCreated = await user.save();

            if (!userCreated) {
                return res.status(422).json({
                    message: 'It was not possible to create user. Try again.'
                });
            }

            userCreated = { _id: userCreated._id, email: userCreated.email };
            return res.status(201).json({
                data: userCreated,
                message: 'User has been created correctly!'
            });

        } catch (error) {
            logger.error(error.message);
            return res.status(400).json({
                message: 'Something unexpected happened.'
            });
        }
    },
    userLogin: async (req, res) => {
        try {
            logger.info('login user');
            const { email, password } = req.body;
            var userInfo = await Users.findOne({ email: email });

            if (!userInfo) {
                return res.status(401).json({
                    message: 'The email or password are incorrect.'
                });
            }

            const checkPassword = await compare(password, userInfo.password);
            if (!checkPassword) {
                return res.status(401).json({
                    message: 'The email or password are incorrect.'
                });
            }

            const payload = {
                _id: userInfo._id,
                iat: moment().unix(),
                exp: moment().add(EXPIRED, 'min').unix
            };
            
            userInfo = { _id: userInfo._id, email: userInfo.email };
            const token = jwt.encode(payload, SECRET_KEY);

            return res.status(200).json({
                token: token,
                data: userInfo,
                message: 'User logged successfully'
            });

        } catch (error) {
            logger.error(error.message);
            return res.status(400).json({
                message: 'Something unexpected happened.'
            });
        }
    }
}