import express from "express";
import authRoute from "./auth";
import blogRoute from "./blog";

const router = express.Router();

router.use("/auth",authRoute)
router.use("/blog",blogRoute)

export default router;
