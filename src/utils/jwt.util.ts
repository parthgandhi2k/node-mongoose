import { sign, verify } from "jsonwebtoken";
import { APP_CONFIG } from "../config";

export type JWTPayload = {
    _id: string;
    role: string;
};

export const signAccessToken = (payload: JWTPayload) => {
    return "Bearer " + sign(payload, APP_CONFIG.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (accessToken: string) => {
    return verify(accessToken, APP_CONFIG.JWT_SECRET, { ignoreExpiration: false }) as JWTPayload;
};
