import { Document } from "mongoose";

export interface IRating extends Document {
    userId: string,
    name: string,
    toUserId:string,
    rating: number,
    createdAt?: string,
    updatedAt?: string,
}