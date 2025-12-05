import { Router } from "express";
import {
  vwProjectConsumedMaterials,
  vwProjectDepartmentDelays,
  vwComponentRecipeMaterials,
  vwEquipmentRecipesMaterialSummary,
  vwMaterialDetailsComponentsRecipes,
  vwMaterialDetailsEquipmentsRecipes,
  getTimesCascade,
} from "../controllers/views.controller.js";

const router = Router();

router.get("/project-consumed-materials/:user_id", vwProjectConsumedMaterials);
router.get("/project-department-delays", vwProjectDepartmentDelays);
router.get("/component-recipe-materials", vwComponentRecipeMaterials);
router.get(
  "/equipment-recipes-materials-summary",
  vwEquipmentRecipesMaterialSummary
);
router.get(
  "/material-details-componentes-recipes/:component_recipe_id",
  vwMaterialDetailsComponentsRecipes
);
router.get(
  "/material-details-equipment-recipes/:equipment_recipe_id",
  vwMaterialDetailsEquipmentsRecipes
);

router.get("/get-times", getTimesCascade)

export default router;
