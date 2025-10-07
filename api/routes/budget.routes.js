import { Router } from "express";
import { createBudget } from "../controllers/budget.controller.js";

const router = Router();

router.post("/", createBudget);

export default router;