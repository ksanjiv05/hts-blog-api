import { createBlog, getBlog, getBlogs } from "../../controllers/blogController/blog";
import express from "express";
const router = express.Router();

router.post("/blog",createBlog)
router.get("/blog",getBlog)
router.get("/blogs",getBlogs)

export default router;