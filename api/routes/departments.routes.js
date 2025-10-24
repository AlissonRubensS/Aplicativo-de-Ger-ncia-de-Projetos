import { Router } from "express";
import {
  listDepartmentsOrderName,
  createDeparment,
  editDepartment,
  deleteDepartment,
} from "../controllers/departments.controller.js";

const router = Router();

router.get("/", listDepartmentsOrderName);
router.post("/", createDeparment);
router.put("/", editDepartment);
router.delete("/", deleteDepartment);

export default router;
