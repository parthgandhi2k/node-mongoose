import { Joi } from "express-validation";

import REGEX_PATTERNS from '../constants/regex-patterns.constant';

export default {
    dbDocumentId: Joi.string().regex(REGEX_PATTERNS.dbDocumentId),
    email: Joi.string().regex(REGEX_PATTERNS.email),
    firstName: Joi.string().max(30),
    lastName: Joi.string().max(30),
    postTitle: Joi.string().max(100),
    isoDate: Joi.date().iso()
};
