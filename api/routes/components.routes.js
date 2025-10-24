import { Router } from "express";
import {
  countStatusComponents,
} from "../controllers/components.controller.js";

const router = Router();

router.get("/status_count", countStatusComponents);

export default router;
