import { Router } from "express";
import {
  createProject,
  listProject,
  deleteProject,
  editProject,
} from "../controllers/projects.controller.js";

const router = Router();

router.post("/", createProject);
router.get("/:user_id", listProject);
router.put("/", editProject);
router.delete("/", deleteProject);

export default router;
