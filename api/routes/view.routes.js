import { Router } from "express";
import {
    vwProjectConsumedMaterials,
} from "../controllers/views.controller.js"

const router = Router()

router.get("/project-consumed-materials", vwProjectConsumedMaterials)

export default router;