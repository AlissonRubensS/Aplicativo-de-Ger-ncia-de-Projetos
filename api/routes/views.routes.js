import { Router } from "express";
import { VwEquipmentDetailsByUser } from "../controllers/views.controller.js";

const router = Router();

router.get("/VwEquipamentDetailByUser", VwEquipmentDetailsByUser)

export default router;