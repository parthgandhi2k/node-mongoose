import { ErrorRequestHandler, RequestHandler } from "express";
import createError from "http-errors";
import { ValidationError } from "express-validation";

import { getFailureResponse } from '../utils/response.util';

function getValidationErrorMessage(errObject: ValidationError): string {
    const { body, params, query } = errObject.details;
    return params?.[0].message || params?.[0].message || body?.[0].message || errObject.message;
}

export const notFoundHandler: RequestHandler = (req, res, next) => next(createError.NotFound("Resource not found!"));

export const mainErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let errStatus: number;
    let errMessage: string;

    if (err.status) {
        errStatus = err.status;
        errMessage = err.message;
    } else {
        errStatus = 500;
        errMessage = "Something went wrong!";
    }

    if (err instanceof ValidationError) {
        errStatus = 422;
        errMessage = getValidationErrorMessage(err);
    }

    return res.status(errStatus).json(getFailureResponse(errMessage));
};
