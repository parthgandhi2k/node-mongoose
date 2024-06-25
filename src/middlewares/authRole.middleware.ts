import { RequestHandler } from "express";
import createError from "http-errors";

import { JWTPayload } from "../utils/jwt.util";

export const authRole = (roles: string | string[]): RequestHandler => (req, res, next) => {
    const { role: userRole } = req.user as JWTPayload;
    if (typeof roles === 'string' && roles === userRole) return next();
    else if (roles.includes(userRole)) return next();
    else next(createError.Forbidden('Unauthorized'));
};
