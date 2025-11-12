import { Router } from "express";
import {
  getComponentRecipe,
  createComponentRecipe,
  deleteComponentRecipe,
  updateComponentRecipe,
} from "../controllers/componentRecipes.controller.js";

const router = Router();

router.get("/", getComponentRecipe);
router.post("/", createComponentRecipe);
router.delete("/", deleteComponentRecipe);
router.put("/", updateComponentRecipe);

export default router;
