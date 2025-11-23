import handleValidationErrors from './handleValidationErrors.js';
import { body } from 'express-validator';

export const validateUser = [
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
]