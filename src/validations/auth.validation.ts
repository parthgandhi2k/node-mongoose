import { Joi } from "express-validation";

import commonValidation from "./common.validation";

const { email, firstName, lastName } = commonValidation;

export const signUp = {
    body: Joi.object({
        firstName: firstName.required(),
        lastName: lastName.required(),
        email: email.required(),
        password: Joi.string().min(8).max(15).required(),
        confirmPassword: Joi.valid(Joi.ref('password')),
    })
};

export const signIn = {
    body: Joi.object({
        email: email.required(),
        password: Joi.string().min(8).max(15).required(),
    })
};
