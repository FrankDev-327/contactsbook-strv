'use strict';

const { body, validationResult } = require('express-validator');
module.exports = {
    contactsValidationRules: () => {
        return [
            body('address', 'addresss cant be empty').notEmpty(),
            body('firstName', 'firstName cant be empty').notEmpty().trim().escape(),
            body('lastName', 'lastName cant be empty').notEmpty().trim().escape(),
            body('phoneNumber', 'phoneNumber cant be empty').notEmpty(),
        ];
    },
    errorHandler: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const extractedErrors = [];
            errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

            return res.status(422).json({
                errors: extractedErrors,
            });
        }
        return next();
    },
    inputValidator: () => {
        return [
            body('email').notEmpty().isEmail(),
            body('password', 'no longer').notEmpty().isLength({min:4, max: 6 })
        ];
    }
}