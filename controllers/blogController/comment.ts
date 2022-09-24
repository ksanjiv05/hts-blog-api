import logging from "../../config/logging";
import { Request, Response } from "express";
import { responseObj } from "../../helper/utils";

import Comment from "../../models/Comment";
import { IComment } from "interfaces/IComment";


export const createComment = async (req: Request, res: Response) => {
    try {
        const {
            userId = "",
            name = "",
            comment = "",
            like = 0,
            bid="",
            _id = ""
        }: IComment = req.body;

        if (comment.length < 5||bid==="")
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "Please add comment and blog id is required!",
                resObj: res,
                data: null
            })



        const newComment: IComment = new Comment({
            userId, name, comment,bid
        });
        await newComment.save();
        if (_id) {
            const isCommented: IComment | null = await Comment.findOne({ _id });
            if (isCommented) {
                isCommented.replies?.push({ commentId: newComment._id })
                await isCommented.save();
            }
        }
        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, you are successfully posted comment",
            error: "",
            resObj: res,
            data: null
        })

    } catch (error) {
        logging.error("Comment", "unable to add comment", error);
        return responseObj({
            statusCode: 500,
            type: "error",
            msg: "",
            error: "Internal server error",
            resObj: res,
            data: null
        })
    }
}

interface IPaging {
    skip: number,
    limit: number,
    bid: string,
    

}
export const getComments = async (req: Request<{}, {}, {}, IPaging>, res: Response) => {
    try {
        const { skip = 0, limit = 10, bid }: IPaging = req.query;

        let comments: IComment[] | null;
       
        if(!bid)
        return responseObj({
            statusCode: 202,
            type: "error",
            msg: "",
            error: "Blog id is required!",
            resObj: res,
            data: null
        })

        comments = await Comment.find({ bid }).skip(skip).limit(limit)

        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, you are successfully posted article",
            error: "",
            resObj: res,
            data: comments
        })

    } catch (error) {
        logging.error("Comment", "unable to get comment", error);
        return responseObj({
            statusCode: 500,
            type: "error",
            msg: "",
            error: "Internal server error",
            resObj: res,
            data: null
        })
    }
}

export const getReplies = async (req: Request, res: Response) => {
    try {
        const { _id = "" } = req.query;
        if(!_id)
        return responseObj({
            statusCode: 202,
            type: "error",
            msg: "",
            error: "Comment id is required!",
            resObj: res,
            data: null
        })
        const comment = await Comment.findOne({ _id })

        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, here is your reples",
            error: "",
            resObj: res,
            data: comment
        })

    } catch (error) {
        logging.error("Comment", "unable to get replay", error);
        return responseObj({
            statusCode: 500,
            type: "error",
            msg: "",
            error: "Internal server error",
            resObj: res,
            data: null
        })
    }
}