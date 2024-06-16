import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import createError from "http-errors";

import { UserModel, IUser } from "../models/user.model";

export type RequestUser = {
    _id: string;
} & Pick<IUser, 'email' | 'role'>;

passport.use(
    'local-sign-in',
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            const user = await UserModel.findOne({ email });

            if (!user) {
                return done(createError.Unauthorized('Invalid Credentials'));
            }

            const isValidPassword = await user.comparePassword(password);

            if (!isValidPassword) {
                return done(createError.Unauthorized('Invalid Credentials'));
            }

            const requestUser: RequestUser = {
                _id: user._id.toString(),
                email: user.email,
                role: user.role
            };

            return done(
                null,
                requestUser,
                { message: "User logged in successfully" }
            );
        }
    )
);
