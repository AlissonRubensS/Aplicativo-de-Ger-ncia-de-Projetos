import { Router } from "express";
import { getComponentRecipe } from "../controllers/componentRecipes.controller.js";

const router = Router();

router.get("/", getComponentRecipe);

export default router;
