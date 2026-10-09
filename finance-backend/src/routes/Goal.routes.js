import express from "express";
import { Router } from "express";
import {
  addGoals,
  deleteGoals,
  getGoals,
} from "../controllers/Goals.controller";
import { requireAuth } from "../middleware/authe";
const router = Router();

router.get("/getgoals", requireAuth, getGoals);
router.delete("/deletegoals/:id", requireAuth, deleteGoals);
router.post("/addgoals", requireAuth, addGoals);
export default router;
