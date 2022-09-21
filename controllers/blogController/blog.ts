import logging from "../../config/logging";
import { Request, Response } from "express";
import { responseObj } from "../../helper/utils";
import { IBlog } from "../../interfaces/IBlog"
import Blog from "../../models/Blog";


export const createBlog = async (req: Request, res: Response) => {
    try {
        const {userId="", title = "", slug = "", coverImage = "", content = "", topicId = "", author = "sanjiv", tags = ["no tag"] }: IBlog = req.body;

        if (tags.length < 5)
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "Please provide at least 5 tags",
                resObj: res,
                data: null
            })

        if (title === "" || slug === "" || coverImage === "" || content === "" || topicId === "" || author === "")
            return responseObj({
                statusCode: 202,
                type: "error",
                msg: "",
                error: "Please provide title, slug,coverImage,content and topicId",
                resObj: res,
                data: null
            })

        const newBlog: IBlog = new Blog({
            userId, title, slug, coverImage, content, topicId, author,tags
        });
        await newBlog.save();

        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, you are successfully posted article",
            error: "",
            resObj: res,
            data: null
        })

    } catch (error) {
        logging.error("Blog", "unable to add blog", error);
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
    tags: [],
    author: string

}
export const getBlogs = async (req: Request<{}, {}, {}, IPaging>, res: Response) => {
    try {
        const { skip = 0, limit = 10, tags, author }: IPaging = req.query;

        let blogs: IBlog[] | null;
        if (author) {
            blogs = await Blog.find({ author }).skip(skip).limit(limit)
        }
        blogs = await Blog.find({ tags: { $in: tags } }).skip(skip).limit(limit)

        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, you are successfully posted article",
            error: "",
            resObj: res,
            data: blogs
        })

    } catch (error) {
        logging.error("Blog", "unable to add blog", error);
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

export const getBlog = async (req: Request, res: Response) => {
    try {
        const { blogId = "" } = req.query;

        const blog = await Blog.findOne({ _id: blogId })

        return responseObj({
            statusCode: 200,
            type: "success",
            msg: "hey, here is your blog",
            error: "",
            resObj: res,
            data: blog
        })

    } catch (error) {
        logging.error("Blog", "unable to add blog", error);
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