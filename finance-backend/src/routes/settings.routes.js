import {
  getGlobalSettings,
  updateGlobalSettings,
} from "../controllers/Settings.controller.js";
import express from "express";
import { requireAuth } from "../middleware/authe.js";

const router = express.Router();

router.get("/global", requireAuth, getGlobalSettings);
router.post("/global", requireAuth, updateGlobalSettings);

export default router;
