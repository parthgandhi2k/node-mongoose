import { RequestHandler } from "express";
import createError from "http-errors";

import { IPost } from "../models/post.model";
import { CommentModel } from "../models/comment.model";
import { getSuccessResponse } from "../utils/response.util";
import { JWTPayload } from "../utils/jwt.util";
import { IUser } from "../models/user.model";
import REGEX_PATTERNS from '../constants/regex-patterns.constant';
import { USER_ROLES } from "../constants/enums.constant";

export async function deleteCommentsByPostIds(postIds: string[] = []) {
    postIds = postIds.filter(id => REGEX_PATTERNS.dbDocumentId.test(id));
    return await CommentModel.updateMany(
        { post: { $in: postIds }, isDeleted: false },
        { isDeleted: true }
    ).lean();
}

export const getCommentById: RequestHandler<{ commentId: string }> = async (req, res, next) => {
    try {
        const { commentId } = req.params;
    
        const comment = await CommentModel.findOne({ _id: commentId, isDeleted: false })
            .select("-createdAt -updatedAt -isDeleted")
            .lean();
        
        return res.json(getSuccessResponse("Comment fetched successfully", { comment }));
    } catch (error) {
        next(error);
    }
};

export const updateCommentById: RequestHandler<
    { commentId: string },
    {},
    { comment: string }
> = async (req, res, next) => {
    try {
        const { _id: userId } = req.user as JWTPayload;
        const { commentId } = req.params;
        const payload = req.body;

        const comment = await CommentModel.findOne({ _id: commentId, isDeleted: false })
            .select("-createdAt -updatedAt -isDeleted")
            .lean();

        if (!comment) throw createError.NotFound("Comment not found");

        if (comment.createdBy.toString() != userId) throw createError.Forbidden("Access Denied!");

        const updatedComment = await CommentModel.findOneAndUpdate(
            { _id: commentId, isDeleted: false },
            payload,
            { new: true }
        ).select("-createdAt -updatedAt -isDeleted");

        return res.json(getSuccessResponse('Comment updated successfully', { comment: updatedComment }));
    } catch (error) {
        next(error);
    }
};

export const deleteCommentById: RequestHandler<{ commentId: string }> = async (req, res, next) => {
    try {
        const { _id: userId, role: userRole } = req.user as JWTPayload;
        const { commentId } = req.params;

        const comment = await CommentModel.findOne({ _id: commentId, isDeleted: false })
            .select("-createdAt -updatedAt -isDeleted")
            .populate<
                { post: Pick<IPost, 'author'> & { author: Pick<IUser, '_id'> } }
            >({
                path: 'post',
                select: 'author',
                populate: {
                    path: 'author',
                    select: '_id'
                }
            })
            .lean();

        if (!comment) throw createError.NotFound("Comment not found");

        // Throw error if user role is not 'admin' and comment and post not created by user
        if (
            userRole != USER_ROLES.ADMIN
            && comment.createdBy.toString() != userId
            && comment.post.author._id.toString() != userId
        ) {
            throw createError.Forbidden("Access Denied!");
        }

        const deletedComment = await CommentModel.findOneAndUpdate(
            { _id: commentId, isDeleted: false },
            { isDeleted: true },
            { new: true }
        ).select("-createdAt -updatedAt -isDeleted");

        return res.json(getSuccessResponse('Comment deleted successfully', { comment: deletedComment }));
    } catch (error) {
        next(error);
    }
};
