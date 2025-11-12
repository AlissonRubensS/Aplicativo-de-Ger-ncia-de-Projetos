import { Router } from "express";
import {
  getEquipmentRecipe,
  createEquipmentRecipe,
  deleteEquipmentRecipe,
  updateEquipmentRecipe,
} from "../controllers/equipmenetRecipe.controller.js";

const router = Router();

router.get("/", getEquipmentRecipe);
router.post("/", createEquipmentRecipe);
router.delete("/", deleteEquipmentRecipe);
router.put("/", updateEquipmentRecipe);

export default router;
