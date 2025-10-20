import { Router } from "express";
import {
  VwEquipmentDetailsByUser,
  VwComponentMaterialConsumption,
  VwTotalMaterialCostByEquipment,
  VwTotalMaterialCostByProject,
  VwProjectComponentStatus,
} from "../controllers/views.controller.js";

const router = Router();

router.get("/VwEquipamentDetailByUser", VwEquipmentDetailsByUser);
router.get("VwComponentMaterialConsumption", VwComponentMaterialConsumption);
router.get("/VwTotalMaterialCostByEquipment", VwTotalMaterialCostByEquipment);
router.get("/VwTotalMaterialCostByProject", VwTotalMaterialCostByProject);
router.get("/VwProjectComponentStatus", VwProjectComponentStatus);

export default router;
