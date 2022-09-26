import { SECRET_KEY } from "../config/config";
import logging from "../config/logging";
import { NextFunction, Request, Response } from "express";
import { responseObj } from "../helper/utils";
import jwt from "jsonwebtoken"

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('authorization');
        logging.info("INFO", "jwt token ", token)
        if (!token) {
            return responseObj({
                resObj: res,
                type: "error",
                msg: "",
                error: "JWT token provide in header",
                statusCode: 400,
                data: null
            })
        }

        const decoded = await varifyToken(token);

        if (decoded) {
            req.body.decoded = decoded;
            next();
        } else {
            return responseObj({
                resObj: res,
                type: "error",
                msg: "",
                error: "Unauthorized",
                statusCode: 401,
                data: null
            })

        }
    } catch (err: any) {
        // console.log(err.message, req.originalUrl);
        logging.error("TOKEN ERROR", "jwt token error ", err);
        logging.info("INFO", "Request url : ", req.originalUrl);
        if (err && err?.message == "invalid token") {
            return responseObj({
                resObj: res,
                type: "error",
                msg: "",
                error: "Invalid JWT token",
                statusCode: 400,
                data: null
            })
        }
        return responseObj({
            resObj: res,
            type: "error",
            msg: "",
            error: "Internal Server Error",
            statusCode: 500,
            data: null
        })


    }
};

export const varifyToken = async (token: string) => {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
};

