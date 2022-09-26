import express from "express";
import { createComment, getComments, getReplies } from "controllers/blogController/comment";
import { auth } from "../../middelware/auth";
const router = express.Router();

router.post("/comment",auth,createComment)
router.get("/comments",getComments)
router.get("/replies",getReplies)

export default router;