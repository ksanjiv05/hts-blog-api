import logging from "../../config/logging";
import { Request, Response } from "express";
import { responseObj } from "../../helper/utils";

import Rating from "../../models/Rating";
import { IRating } from "interfaces/IRating";


export const createRating = async (req: Request, res: Response) => {
    try {
        const {
            userId = "",
            name = "",
            toUserId = "",
            rating = 0
        }: IRating = req.body;

        if (toUserId.length < 5)
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "Author user id is required!",
                resObj: res,
                data: null
            })



        await Rating.updateOne({
            userId, toUserId
        }, {
            rating,
            name,
        }, {
            upsert: true
        })


        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, you are successfully posted Rating",
            error: "",
            resObj: res,
            data: null
        })

    } catch (error) {
        logging.error("Rating", "unable to add Rating", error);
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
    toUserId: string,


}
export const getRatingsByAuthor = async (req: Request<{}, {}, {}, IPaging>, res: Response) => {
    try {
        const { skip = 0, limit = 10, toUserId }: IPaging = req.query;

        let ratings: IRating[] | null;

        if (!toUserId)
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "Author user id is required!",
                resObj: res,
                data: null
            })

        ratings = await Rating.find({ toUserId })


        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, you are fetched ratings",
            error: "",
            resObj: res,
            data: ratings
        })

    } catch (error) {
        logging.error("Rating", "unable to get Rating", error);
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

export const getRatingsByUser = async (req: Request, res: Response) => {
    try {
        const { userId = "" } = req.query;
        if (!userId)
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "User id is required!",
                resObj: res,
                data: null
            })
        const ratings = await Rating.find({ userId })

        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, here is your ratings",
            error: "",
            resObj: res,
            data: ratings
        })

    } catch (error) {
        logging.error("Rating", "unable to get rating", error);
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

export const getRating = async (req: Request, res: Response) => {
    try {
        const { userId = "",toUserId="" } = req.query;
        if (!userId)
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "User id  and Author id is required!",
                resObj: res,
                data: null
            })
        const rating = await Rating.findOne({ userId,toUserId })

        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, here is your ratings",
            error: "",
            resObj: res,
            data: rating
        })

    } catch (error) {
        logging.error("Rating", "unable to get rating", error);
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