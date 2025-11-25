const handleValidationErrors = require('./handleValidationErrors.js');
const { body } = require('express-validator');

const validateUser = [
    body('email')
    .exists()
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('email must be valid')
    .normalizeEmail(),

    body('password')
    .exists()
    .withMessage('password is required')
    .bail()
    .isLength({min: 6})
    .withMessage('password must be at least 6 characters long'),

    handleValidationErrors,
];

module.exports = {
    validateUser
};