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
router.delete("/:equipment_recipe_id", deleteEquipmentRecipe);
router.put("/:equipment_recipe_id", updateEquipmentRecipe);

export default router;
