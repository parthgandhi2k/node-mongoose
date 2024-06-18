import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import createError from "http-errors";

import { UserModel, IUser } from "../models/user.model";
import { APP_CONFIG } from "../config";
import { JWTPayload } from "../utils/jwt.util";

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

passport.use(
    'jwt',
    new JWTStrategy(
        {
            secretOrKey: APP_CONFIG.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false
        },
        async (payload: JWTPayload, done) => {
            const user = await UserModel.findOne({ _id: payload._id }).select("email role").lean();

            if (!user) return done(createError.Unauthorized("Invalid access token"));

            const requestUser: RequestUser = {
                _id: user._id.toString(),
                email: user.email,
                role: user.role
            };

            done(null, requestUser);
        }
    )
);

export const JWTMiddleware = passport.authenticate('jwt', { session: false });
export const signInMiddleware = passport.authenticate('local-sign-in', { session: false });
