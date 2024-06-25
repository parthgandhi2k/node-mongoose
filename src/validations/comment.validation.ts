import { Joi } from "express-validation";

import commonValidation from "./common.validation";

const { dbDocumentId, comment, isoDate } = commonValidation;

export const getById = {
    params: Joi.object({
        commentId: dbDocumentId.required(),
    }),
};

export const updateById = {
    params: Joi.object({
        commentId: dbDocumentId.required(),
    }),
    body: Joi.object({
        comment: comment.required(),
    }),
};

export const deleteById = {
    params: Joi.object({
        commentId: dbDocumentId.required(),
    }),
};
