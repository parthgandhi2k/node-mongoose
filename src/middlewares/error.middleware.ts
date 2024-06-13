import { ErrorRequestHandler, RequestHandler } from "express";
import createError from "http-errors";

import { getFailureResponse } from '../utils/response.util'

export const notFoundHandler: RequestHandler = (req, res, next) => next(createError.NotFound("Resource not found!"));

export const mainErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong!";

    return res.status(errStatus).json(getFailureResponse(errMessage));
};
