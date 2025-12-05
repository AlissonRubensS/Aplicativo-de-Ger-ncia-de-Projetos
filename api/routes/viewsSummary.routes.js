import { Router } from "express";
import {
    vwProjectMaterialsSummary,
    vwEquipmentMaterialsSummary,
    vwComponentMaterialsSummary
} from "../controllers/viewsSummary.controller.js"

const router = Router()

router.get("/projects", vwProjectMaterialsSummary)
router.get("/equipments", vwEquipmentMaterialsSummary)
router.get("/components", vwComponentMaterialsSummary)

export default router;