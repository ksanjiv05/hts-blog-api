import { createBlog } from "../../controllers/blogController/blog";
import express from "express";
const router = express.Router();

router.post("/blog",createBlog)


export default router;