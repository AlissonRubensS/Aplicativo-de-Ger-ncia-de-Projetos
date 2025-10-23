import { Router } from "express";
import {
    getEquipment
} from "../controllers/equipments.controller.js";

const router = Router();

router.get("/", getEquipment);

export default router;
