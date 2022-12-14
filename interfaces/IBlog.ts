import { Document } from "mongoose"

export interface IBlog extends Document {
    userId:string,
    title: string,
    slug: string,
    coverImage: string,
    content: string,
    tags: [string],
    topicId: string,
    author: string,
    ratings?: [
        {
            ratingId: string
        }
    ],
    averageRating?: number,
    viewsCount?: number,
    comments?: [{
        commentId: string
    }
    ],
    createdAt?: string,
    updatedAt?: string,
}

