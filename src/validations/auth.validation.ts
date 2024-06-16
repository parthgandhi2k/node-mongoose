import { Joi } from "express-validation";

import REGEX_PATTERNS from '../constants/regex-patterns.constant';

export const signUp = {
    body: Joi.object({
        firstName: Joi.string().max(30).required(),
        lastName: Joi.string().max(30).required(),
        email: Joi.string().regex(REGEX_PATTERNS.email).required(),
        password: Joi.string().min(8).max(15).required(),
        confirmPassword: Joi.valid(Joi.ref('password')),
    })
};

export const signIn = {
    body: Joi.object({
        email: Joi.string().regex(REGEX_PATTERNS.email).required(),
        password: Joi.string().min(8).max(15).required(),
    })
};
