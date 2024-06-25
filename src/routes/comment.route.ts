import { Router } from "express";
import { validate } from "express-validation";

import { JWTMiddleware } from "../middlewares/passport.config";
import * as commentController from "../controllers/comment.controller";
import * as commentValidation from "../validations/comment.validation";

const commentRouter = Router();

commentRouter.get(
    '/:commentId',
    JWTMiddleware,
    validate(commentValidation.getById),
    commentController.getCommentById
);

commentRouter.put(
    '/:commentId',
    JWTMiddleware,
    validate(commentValidation.updateById),
    commentController.updateCommentById
);

commentRouter.delete(
    '/:commentId',
    JWTMiddleware,
    validate(commentValidation.deleteById),
    commentController.deleteCommentById
);

export default commentRouter;
