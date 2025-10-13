import { Router } from "express";
import { Login, VerifyAuth } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", Login);
router.get("/verify", VerifyAuth);

export default router;