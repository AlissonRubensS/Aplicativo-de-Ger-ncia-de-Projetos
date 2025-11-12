import { Router } from "express";
import {
  listMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../controllers/materials.controller.js";

const router = Router();

router.get("/", listMaterials);
router.post("/", createMaterial);
router.put("/", updateMaterial);
router.delete("/", deleteMaterial);

export default router;
