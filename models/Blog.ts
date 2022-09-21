import mongoose, { Schema } from "mongoose";
import logging from "../config/logging";
import { IBlog } from "../interfaces/IBlog";

const BlogSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    // name: {//author
    //     type: String,
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,

    },
    coverImage: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: [String],
    topicId: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    ratings: [
        {
            ratingId: String
        }
    ],
    averageRating: Number,
    viewsCount: Number,
    comments: [{
        commentId: String
    }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});





BlogSchema.post<IBlog>("save", function () {
    logging.info("Blog", "New blog just saved: ");
});

export default mongoose.model<IBlog>("Blog", BlogSchema);
