import { Model, Schema, model, Types } from "mongoose";

/* Define Model Interfaces */
export interface IPost {
    _id: Types.ObjectId;
    title: string;
    author: Types.ObjectId;
    publishDate: Date;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
};

type PostModelType = Model<IPost>;

/* Create Schema */
const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    publishDate: { type: Date },
    isDeleted: { type: Boolean, default: false },
}, {
    versionKey: false,
    timestamps: true,
    autoIndex: true
});

/* Create Model */
export const PostModel = model<IPost, PostModelType>("post", postSchema);
