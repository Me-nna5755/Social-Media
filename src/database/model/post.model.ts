

import { Schema, model } from "mongoose";
import { IPost } from "../../common/interfaces/post.interface";

const postSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        comments: [{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }],

        likes: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],

        tags: [{
            type: String,
            trim: true
        }],

        deletedAt: {
            type: Date,
            default: null
        },

        restoredAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        strict: true
    }
);

const postModel = model<IPost>("Post", postSchema);

export default postModel;