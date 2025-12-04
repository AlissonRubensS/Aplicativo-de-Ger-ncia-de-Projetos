import { Router } from "express";
import {
    vwProjectConsumedMaterials,
    vwEquipmentConsumedMaterials,
    vwComponentRecipeMaterials
} from "../controllers/viewsSummary.controller"

const router = Router()

router.get("/projects", vwProjectConsumedMaterials)
router.get("/equipments", vwEquipmentConsumedMaterials)
router.get("/components", vwComponentRecipeMaterials)

export default router;