import { Router } from "express";
import {
    vwProjectConsumedMaterials,
    vwProjectDepartmentDelays,
    vwComponentRecipeMaterials,
} from "../controllers/views.controller.js"

const router = Router()

router.get("/project-consumed-materials", vwProjectConsumedMaterials);
router.get("/project-department-delays", vwProjectDepartmentDelays);
router.get("/component-recipe-materials", vwComponentRecipeMaterials);

export default router;