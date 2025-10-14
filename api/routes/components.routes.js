import { Router } from "express";
import {
  createComponent,
  listComponents,
  componentById,
  editComponent,
  deleteComponent,
} from "../controllers/components.controller.js";

const router = Router();

router.post("/", createComponent);
router.get("/", listComponents);
router.get("/:id", componentById);
router.put("/", editComponent);
router.delete("/", deleteComponent);

export default router;
