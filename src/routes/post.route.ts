import { Router } from "express";
import { validate } from "express-validation";

import { JWTMiddleware } from "../middlewares/passport.config";
import * as postController from "../controllers/post.controller";
import * as postValidation from "../validations/post.validation";
import { authRole } from "../middlewares/authRole.middleware";
import { USER_ROLES } from "../constants/enums.constant";

const postRouter = Router();

postRouter.get(
    '/',
    JWTMiddleware,
    postController.getAllPosts
);

postRouter.get(
    '/:postId',
    JWTMiddleware,
    validate(postValidation.getById),
    postController.getPostById
);

postRouter.post(
    '/',
    JWTMiddleware,
    validate(postValidation.create),
    postController.createPost
);

postRouter.put(
    '/:postId',
    JWTMiddleware,
    validate(postValidation.updateById),
    postController.updatePostById
);

postRouter.delete(
    '/:postId',
    JWTMiddleware,
    authRole([USER_ROLES.ADMIN, USER_ROLES.USER]),
    validate(postValidation.deleteById),
    postController.deletePostById
);

postRouter.post(
    '/:postId/comments',
    JWTMiddleware,
    validate(postValidation.createComment),
    postController.createComment
);

postRouter.get(
    '/:postId/comments',
    JWTMiddleware,
    validate(postValidation.getCommentsByPostId),
    postController.getCommentsByPostId
);

export default postRouter;
