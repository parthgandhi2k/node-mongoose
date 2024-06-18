import { Router } from "express";
import { validate } from "express-validation";

import * as userController from "../controllers/user.controller";
import * as userValidations from "../validations/user.validation";
import { JWTMiddleware } from '../middlewares/passport.config';

const userRouter = Router();

userRouter.get(
    '/',
    JWTMiddleware,
    userController.getAllUsers
);

userRouter.get(
    '/:userId',
    validate(userValidations.getById),
    JWTMiddleware,
    userController.getUserById
);

userRouter.put(
    '/:userId',
    validate(userValidations.updateById),
    JWTMiddleware,
    userController.updateById
);

export default userRouter;
