import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";
import logging from "../../config/logging";
import User from "../../models/User";
import { SECRET_KEY } from "../../config/config";
import { IUser } from "../../interfaces/IUser";
import { responseObj } from "../../helper/utils";


export const login = async (req: Request, res: Response) => {
    try {
        const { email = "", password = "" }: IUser = req.body;
        console.log("auth login", req.body)
        if (email === "" || password === "")
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "Please provide email and password",
                resObj: res,
                data: null
            })

        const user = await User.findOne({ email });
        if (!user)
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "Email or password is invalid",
                resObj: res,
                data: null
            })
        const isMatch = await bcryptjs.compare(password, user.password)

        if (!isMatch)
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "Email or password is invalid",
                resObj: res,
                data: null
            })

        const paylode = {
            _id: user._id
        }

        const options = {
            expiresIn: '2 days',
        }
        const token = jwt.sign(paylode, SECRET_KEY, options)

        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "you are successfully logedin",
            error: "",
            resObj: res,
            data: { token }
        })
    } catch (error) {
        logging.error("Login", "unable to login", error);

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


export const register = async (req: Request, res: Response) => {
    try {
        const { name="",email = "", password = "", recoveryCode = "", isEmailVarified = false }: IUser = req.body;

        if (name===""||email === "" || password === "" || recoveryCode === "")
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "Please provide email password and recoveryCode",
                resObj: res,
                data: null
            })


        const user = await User.findOne({ email });
        if (user)
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "Email already registered",
                resObj: res,
                data: null
            });
        const newUser:IUser = new User({
            name, email, password, recoveryCode, isEmailVarified
        });
        await newUser.save();

        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, you are successfully registred with us",
            error: "",
            resObj: res,
            data: null
        })

    } catch (error) {
        logging.error("Login", "unable to login", error);
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
