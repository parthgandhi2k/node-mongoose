import { Joi } from "express-validation";

import commonValidation from "./common.validation";

const { dbDocumentId, postTitle, isoDate, comment } = commonValidation;

export const create = {
    body: Joi.object({
        title: postTitle.required(),
        publishDate: isoDate
    }),
};

export const getById = {
    params: Joi.object({
        postId: dbDocumentId.required(),
    }),
};

export const updateById = {
    params: Joi.object({
        postId: dbDocumentId.required(),
    }),
    body: Joi.object({
        title: postTitle.required(),
        publishDate: isoDate
    }),
};

export const deleteById = {
    params: Joi.object({
        postId: dbDocumentId.required(),
    }),
};

export const createComment = {
    body: Joi.object({
        comment: comment.required(),
    }),
};

export const getCommentsByPostId = {
    params: Joi.object({
        postId: dbDocumentId.required(),
    }),
};
