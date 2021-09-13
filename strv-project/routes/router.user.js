'use strict';

const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/index');
const { inputValidator, errorHandler } = require('../middleware/validator');

router.post('/login', inputValidator(), errorHandler, userController.userLogin);
router.post('/register', inputValidator(), errorHandler, userController.registerNewUser);

module.exports = router;