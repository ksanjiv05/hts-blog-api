import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

import logging from "../config/logging";
import { IComment } from "interfaces/IComment";


const CommentSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

    replies: [{
        commentId: {
            type: String,
            required: true,
        }
    }],
    comment: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const salt = 10;

CommentSchema.pre<IComment>("save", async function (next) {
    const comment = this;
    if (comment) {
        comment.like = comment.like + 1;
    }
    next();
});

CommentSchema.post<IComment>("save", function () {
    logging.info("Comment", "New comment just saved: ");
});

export default mongoose.model<IComment>("Comment", CommentSchema);
