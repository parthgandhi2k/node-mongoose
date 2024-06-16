import passport from "passport";
import { Router } from "express";
import { validate } from "express-validation";

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
    passport.authenticate('local-sign-in', { session: false }),
    authController.signIn
);

export default authRouter;
