import { Router } from "express";
import {
    vwProjectConsumedMaterials,
    vwProjectDepartmentDelays,
} from "../controllers/views.controller.js"

const router = Router()

router.get("/project-consumed-materials", vwProjectConsumedMaterials);
router.get("/project-department-delays", vwProjectDepartmentDelays);

export default router;