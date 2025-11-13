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
router.delete("/:id", deleteEquipmentRecipe);
router.put("/:id", updateEquipmentRecipe);

export default router;
