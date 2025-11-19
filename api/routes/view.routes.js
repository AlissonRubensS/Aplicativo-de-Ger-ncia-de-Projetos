import { Router } from "express";
import {
    vwProjectConsumedMaterials,
    vwProjectDepartmentDelays,
    vwComponentRecipeMaterials,
    vwEquipmentRecipesMaterialSummary,
} from "../controllers/views.controller.js"

const router = Router()

router.get("/project-consumed-materials", vwProjectConsumedMaterials);
router.get("/project-department-delays", vwProjectDepartmentDelays);
router.get("/component-recipe-materials", vwComponentRecipeMaterials);
router.get("/equipment-recipes-materials-summary", vwEquipmentRecipesMaterialSummary);

export default router;