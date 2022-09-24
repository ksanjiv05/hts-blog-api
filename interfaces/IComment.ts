import { Document } from "mongoose";

export  interface IComment extends Document {
    userId:string,
    bid:string,
    name:string,
    comment:string,
    replies?:[{
        commentId:string
    }],
    like:number,
    createdAt?: string,
    updatedAt?: string,
  }