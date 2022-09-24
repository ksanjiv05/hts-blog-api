import express from "express";
import { createComment, getComments, getReplies } from "controllers/blogController/comment";
const router = express.Router();

router.post("/comment",createComment)
router.get("/comments",getComments)
router.get("/replies",getReplies)

export default router;