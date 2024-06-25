import { Router } from "express";
import { validate } from "express-validation";

import * as userController from "../controllers/user.controller";
import * as userValidations from "../validations/user.validation";
import { JWTMiddleware } from '../middlewares/passport.config';
import { authRole } from "../middlewares/authRole.middleware";
import { USER_ROLES } from "../constants/enums.constant";

const userRouter = Router();

userRouter.get(
    '/',
    JWTMiddleware,
    userController.getAllUsers
);

userRouter.get(
    '/:userId',
    JWTMiddleware,
    validate(userValidations.getById),
    userController.getUserById
);

userRouter.put(
    '/:userId',
    JWTMiddleware,
    validate(userValidations.updateById),
    userController.updateUserById
);

userRouter.delete(
    '/:userId',
    JWTMiddleware,
    authRole(USER_ROLES.ADMIN),
    validate(userValidations.deleteById),
    userController.deleteUserById
);

export default userRouter;
