import express from "express";
import { createRating, getRating, getRatingsByAuthor, getRatingsByUser } from "controllers/blogController/rating";
import { auth } from "../../middelware/auth";
const router = express.Router();

router.post("/rating",auth, createRating)
router.get("/author/ratings",getRatingsByAuthor)
router.get("/user/ratings",getRatingsByUser)
router.get("/rating",getRating)


export default router;