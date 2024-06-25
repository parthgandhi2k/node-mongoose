import { Model, Schema, model, Types } from "mongoose";

/* Define Model Interfaces */
export interface IComment {
    _id: Types.ObjectId;
    comment: string;
    createdBy: Types.ObjectId;
    post: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
};

type CommentModelType = Model<IComment>;

/* Create Schema */
const commentSchema = new Schema<IComment>({
    comment: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    versionKey: false,
    timestamps: true,
    autoIndex: true
});

/* Create Model */
export const CommentModel = model<IComment, CommentModelType>("comment", commentSchema);
