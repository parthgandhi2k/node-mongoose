import { RequestHandler } from "express";
import createError from "http-errors";

import { PostModel } from "../models/post.model";
import { CommentModel } from "../models/comment.model";
import { IUser } from "../models/user.model";
import { getSuccessResponse } from "../utils/response.util";
import { JWTPayload } from "../utils/jwt.util";
import { excludeFields } from "../utils/helper.util";

export const getAllPosts: RequestHandler = async (req, res, next) => {
    const posts = await PostModel.find({ isDeleted: false }).select("-createdAt -updatedAt -isDeleted").lean();
    return res.json(getSuccessResponse("Posts fetched successfully", { posts }));
};

export const getPostById: RequestHandler<{ postId: string }> = async (req, res, next) => {
    try {
        const { postId } = req.params;
    
        const post = await PostModel.findOne({ _id: postId, isDeleted: false })
            .select("-createdAt -updatedAt -isDeleted")
            .lean();
        
        return res.json(getSuccessResponse("Post fetched successfully", { post }));
    } catch (error) {
        next(error);
    }
};

export const createPost: RequestHandler<
    {},
    {},
    { title: string; publishDate: string }
> = async (req, res, next) => {
    try {
        const user = req.user as JWTPayload;
        const payload = req.body;

        const createPostPayload: typeof req.body & { author: string } = {
            ...payload,
            author: user._id
        };

        const post = (await PostModel.create(createPostPayload)).toObject();

        const resData = excludeFields(post);

        return res.status(201).json(getSuccessResponse("Post created successfully", { post: resData }));
    } catch (error) {
        next(error);
    }
};

export const updatePostById: RequestHandler<
    { postId: string },
    {},
    { title: string; publishDate: string }
> = async (req, res, next) => {
    try {
        const { _id: userId } = req.user as JWTPayload;
        const { postId } = req.params;
        const payload = req.body;

        const post = await PostModel.findOne({ _id: postId, isDeleted: false })
            .select("-createdAt -updatedAt -isDeleted")
            .lean();

        if (!post) throw createError.NotFound("Post not found");

        if (post.author.toString() != userId) throw createError.Forbidden("Access Denied!");

        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId, isDeleted: false },
            payload,
            { new: true }
        ).select("-createdAt -updatedAt -isDeleted");

        return res.json(getSuccessResponse('Post updated successfully', { post: updatedPost }));
    } catch (error) {
        next(error);
    }
};

export const deletePostById: RequestHandler<{ postId: string }> = async (req, res, next) => {
    try {
        const { _id: userId } = req.user as JWTPayload;
        const { postId } = req.params;

        const post = await PostModel.findOne({ _id: postId, isDeleted: false })
            .select("-createdAt -updatedAt -isDeleted")
            .lean();
        
        if (!post) throw createError.NotFound("Post not found");

        if (post.author.toString() != userId) throw createError.Forbidden("Access Denied!");

        // Delete comments
        await CommentModel.updateMany(
            { post: postId, isDeleted: false },
            { isDeleted: true }
        );

        // Delete post
        const deletedPost = await PostModel.findOneAndUpdate(
            { _id: postId, isDeleted: false },
            { isDeleted: true },
            { new: true }
        ).select("-createdAt -updatedAt -isDeleted");

        return res.json(getSuccessResponse('Post deleted successfully', { post: deletedPost }));
    } catch (error) {
        next(error);   
    }
};

export const createComment: RequestHandler<
    { postId: string },
    {},
    { comment: string }
> = async (req, res, next) => {
    try {
        const user = req.user as JWTPayload;
        const { postId } = req.params;
        const { comment } = req.body;

        const post = await PostModel.findOne({ _id: postId, isDeleted: false })
            .select("_id")
            .lean();

        if (!post) throw createError.NotFound("Post not found");

        const createCommentPayload = {
            comment,
            post: postId,
            createdBy: user._id,
        };

        const createdComment = (await CommentModel.create(createCommentPayload)).toObject();

        const resData = excludeFields(createdComment);

        return res.status(201).json(getSuccessResponse("Comment created successfully", { comment: resData }));
    } catch (error) {
        next(error);
    }
};

export const getCommentsByPostId: RequestHandler<{ postId: string }> = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const comments = await CommentModel.find({ post: postId, isDeleted: false })
            .select("-createdAt -updatedAt -isDeleted")
            .populate<{ createdBy: IUser }>('createdBy', 'firstName lastName email')
            .lean();

        return res.json(getSuccessResponse("Comments fetched successfully", { comments }));
    } catch (error) {
        next(error);
    }
};
