import { Router } from "express";
import {
  getDepartmentById,
  listDepartmentsByName,
} from "../controllers/departments.controller.js";

const router = Router();

router.get("/", listDepartmentsByName);
router.get("/:id", getDepartmentById);

export default router;