import { login, register } from "../../controllers/authController/auth";
import express from "express";
const router = express.Router();

router.post("/login",login)
router.post("/register",register)


export default router;
