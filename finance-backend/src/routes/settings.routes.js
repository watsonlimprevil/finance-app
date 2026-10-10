import {
  getGlobalSettings,
  updateGlobalSettings,
} from "../controllers/Settings.controller";
import express from "express";
import { requireAuth } from "../middleware/authe";

const router = express.Router();

router.get("/global", requireAuth, getGlobalSettings);
router.post("/global", requireAuth, updateGlobalSettings);

export default router;
