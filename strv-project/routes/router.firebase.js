'use strict';

const express = require('express');
const router = express.Router();
const { firebaseController } = require('../controllers/index');
const { authentication } = require('../middleware/autentication');
const { contactsValidationRules, errorHandler } = require('../middleware/validator');

router.post('/address/', contactsValidationRules(), authentication, errorHandler, firebaseController.storeIntoFirebase);

module.exports = router;