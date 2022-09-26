import { createBlog, getBlog, getBlogs } from "../../controllers/blogController/blog";
import express from "express";
import { auth } from "../../middelware/auth";
const router = express.Router();

router.post("/blog",auth,createBlog)
router.get("/blog",getBlog)
router.get("/blogs",getBlogs)

export default router;