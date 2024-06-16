import passport from "passport";
import { Router } from "express";
import { validate } from "express-validation";

import * as userController from "../controllers/user.controller";
import * as userValidations from "../validations/user.validation";

const userRouter = Router();

userRouter.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    userController.getAllUsers
);

userRouter.get(
    '/:userId',
    validate(userValidations.getById),
    passport.authenticate('jwt', { session: false }),
    userController.getUserById
);

userRouter.put(
    '/:userId',
    validate(userValidations.updateById),
    passport.authenticate('jwt', { session: false }),
    userController.updateById
);

export default userRouter;
