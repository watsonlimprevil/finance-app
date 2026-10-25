import express from "express";
import { Router } from "express";
import {
  addGoals,
  deleteGoals,
  getGoals,
  editGoals,
} from "../controllers/Goals.controller.js";
import { requireAuth } from "../middleware/authe.js";
const router = Router();
router.patch("/editgoals/:id", requireAuth, editGoals);
router.get("/getgoals", requireAuth, getGoals);
router.delete("/deletegoals/:id", requireAuth, deleteGoals);
router.post("/addgoals", requireAuth, addGoals);
export default router;
