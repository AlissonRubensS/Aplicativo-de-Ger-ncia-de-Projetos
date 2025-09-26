import {Router} from "express";
import {Login, Me} from "../controllers/auth.controller.js"

const router = Router();

router.post("/", Login);
router.get("/", Me);

export default router;