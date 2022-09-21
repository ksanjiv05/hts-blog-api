import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

import logging from "../config/logging";
import { IRating } from "../interfaces/IRating";

const RatingSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

    rating: {
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





RatingSchema.post<IRating>("save", function () {
    logging.info("Rating", "New user rated just saved: ");
});

export default mongoose.model<IRating>("Rating", RatingSchema);
