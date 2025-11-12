import { Router } from "express";
import {
    createCompRecipeMat,
    readCompRecipeMat,
    updateCompRecipeMat,
    deleteCompRecipeMat,
} from "../controllers/componentRecipeMaterials.controller.js"

const router = Router();

router.post("/", createCompRecipeMat)
router.get("/", readCompRecipeMat);
router.put("/", updateCompRecipeMat);
router.delete("/", deleteCompRecipeMat);

export default router;