import { Router } from "express";
import {
  createProject,
  listProjectById,
  deleteProject,
  editProject,
} from "../controllers/projects.controller.js";

const router = Router();

router.post("/", createProject);
router.get("/", listProjectById);
router.put("/", editProject);
router.delete("/", deleteProject);

export default router;
