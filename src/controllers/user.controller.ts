import { RequestHandler } from "express";
import createError from "http-errors";

import { IUser, UserModel } from "../models/user.model";
import { getSuccessResponse } from "../utils/response.util";

export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find()
            .select('-password -createdAt -updatedAt')
            .lean();
        return res.json(getSuccessResponse("Users fetched successfully", { users }));
    } catch (error) {
        next(error);
    }
};

export const getUserById: RequestHandler<{ userId: string }> = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId)
            .select("-password -createdAt -updatedAt")
            .lean();

        return res.json(
            getSuccessResponse('User fetched successfully', { user })
        );
    } catch (error) {
        next(error);
    }
};

export const updateById: RequestHandler<{ userId: string }, {}, Partial<Pick<IUser, "email" | "firstName" | "lastName">>> = async (
    req,
    res,
    next
) => {
    try {
        const { userId } = req.params;
        const payload = req.body;

        const user = await UserModel.findById(userId).select("-password -createdAt -updatedAt").lean();

        if (!user) throw createError.NotFound("User not found");

        if (payload.email && user.email !== payload.email) {
            const isEmailExists = await UserModel.findOne({
                email: payload.email,
                _id: { $ne: user._id },
            });

            if (isEmailExists) throw createError.Conflict("Email already exists!");
        }

        const updatedUser = await UserModel.findOneAndUpdate({ _id: user._id }, payload, { new: true })
            .select("-password -createdAt -updatedAt")
            .lean();

        return res.json(getSuccessResponse("User updated successfully", { user: updatedUser }));
    } catch (error) {
        next(error);
    }
};
