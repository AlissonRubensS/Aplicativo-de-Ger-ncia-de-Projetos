import { Router } from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  editEmployee,
  deleteEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/", editEmployee);
router.delete("/", deleteEmployee);

export default router;
