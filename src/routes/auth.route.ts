import { Router } from "express";
import { validate } from "express-validation";

import { signInMiddleware } from "../middlewares/passport.config";
import * as authController from "../controllers/auth.controller";
import * as authValidations from "../validations/auth.validation";

const authRouter = Router();

authRouter.post(
    '/sign-up',
    validate(authValidations.signUp),
    authController.signUp
);

authRouter.post(
    '/sign-in',
    validate(authValidations.signIn),
    signInMiddleware,
    authController.signIn
);

export default authRouter;
