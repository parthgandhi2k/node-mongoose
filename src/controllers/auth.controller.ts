import createError from "http-errors";
import { RequestHandler } from "express";

import { IUser, UserModel } from "../models/user.model";
import { getSuccessResponse } from "../utils/response.util";

export const signUp: RequestHandler<{}, {}, Pick<IUser, "firstName" | "lastName" | "email" | "password"> & { confirmPassword: string }> = async (
    req,
    res,
    next
) => {
    try {        
        const { body } = req;
    
        const isExistingEmail = await UserModel.findOne({
            email: body.email
        }).select("_id").lean();

        if (isExistingEmail) throw createError.Conflict("Email already exists!");

        await UserModel.create(body);

        return res.json(getSuccessResponse('Signup successful', { user: body }));
    } catch (error) {
        next(error);
    }
};
