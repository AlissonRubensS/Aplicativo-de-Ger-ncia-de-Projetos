import { Router } from "express";
import {
    createEquipRecipeCompRecipe,
    readEquipRecipeCompRecipe,
    updateEquipRecipeCompRecipe,
    deleteEquipRecipeCompRecipe,
} from "../controllers/equipRecipeCompRecipe.controller.js"

const router = Router();

router.post("/", createEquipRecipeCompRecipe)
router.get("/", readEquipRecipeCompRecipe);
router.put("/", updateEquipRecipeCompRecipe);
router.delete("/", deleteEquipRecipeCompRecipe);

export default router;