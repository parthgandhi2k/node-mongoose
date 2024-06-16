import { Joi } from "express-validation";

import commonValidation from "./common.validation";

const { email, firstName, lastName, dbDocumentId } = commonValidation;

export const getById = {
    params: Joi.object({
        userId: dbDocumentId.required(),
    }),
};

export const updateById = {
    params: Joi.object({
        userId: dbDocumentId.required(),
    }),
    body: Joi.object({
        email,
        firstName,
        lastName
    }),
};
