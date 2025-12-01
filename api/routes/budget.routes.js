import { Router } from "express";
import { createBudget, listBudget } from "../controllers/budget.controller.js";

const router = Router();

router.post("/", createBudget);
router.get("/:user_id", listBudget)

export default router;