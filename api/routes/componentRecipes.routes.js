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
router.delete("/:id", deleteComponentRecipe);
router.put("/:id", updateComponentRecipe);

export default router;
