import { Router } from "express";
import {
  getDepartmentByName,
  listDepartmentsByName,
  createDeparment,
  editDepartment,
} from "../controllers/departments.controller.js";

const router = Router();

router.get("/", listDepartmentsByName);
router.get("/$name", getDepartmentByName);
router.post("/", createDeparment);
router.put("/", editDepartment)

export default router;