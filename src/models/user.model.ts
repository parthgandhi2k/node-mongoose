import { Model, Schema, Types, model } from "mongoose";
import bcrypt from 'bcrypt';

import { USER_ROLES } from "../constants/enums.constant";
import { APP_CONFIG } from "../config";

/* Define Model Interfaces */
export interface IUser {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: USER_ROLES;
    createdAt: Date;
    updatedAt: Date;
};

interface IUserInstanceMethods {
    comparePassword(password: string): Promise<boolean>;
};

type UserModelType = Model<IUser, {}, IUserInstanceMethods>;

/* Create Schema */
const userSchema = new Schema<IUser, UserModelType, IUserInstanceMethods>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, default: USER_ROLES.USER },
}, {
    versionKey: false,
    timestamps: true,
    autoIndex: true
});

/* Define Pre Hooks */
userSchema.pre(/save/, async function(next) {
    const newPassword = this.get("password");
    if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, APP_CONFIG.SALT_ROUNDS);
        this.set("password", hashedPassword);
    }
    next();
});

/* Define Instance Methods */
userSchema.methods.comparePassword = function(
    this: IUser,
    password: string
) {
    return bcrypt.compare(password, this.password);
};

/* Create Model */
export const UserModel = model<IUser, UserModelType>("user", userSchema);
