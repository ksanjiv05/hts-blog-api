import express from "express";
import { createRating, getRating, getRatingsByAuthor, getRatingsByUser } from "controllers/blogController/rating";
const router = express.Router();

router.post("/rating",createRating)
router.get("/author/ratings",getRatingsByAuthor)
router.get("/user/ratings",getRatingsByUser)
router.get("/rating",getRating)


export default router;