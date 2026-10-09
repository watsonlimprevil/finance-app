import express from "express";
import pool from "../db";

export async function addGoals(req, res) {
  const userId = req.user.userId;
  const { deadline, target_amount, current_amount, name } = req.body;
  if ((!deadline || !target_amount, !name)) {
    res.status(400).json({
      message: "deadline target amount and name are mandatory to set a goal",
    });
  }
  try {
    const data = await pool.query(
      `INSERT into goals , deadline = $1 , target_amount = $2 , current_amount = $3 , name = $4
        WHERE user_id = $5`,
      [deadline, target_amount, current_amount, name, userId],
    );
    res.json({ message: "successfully inputed goal" });
  } catch (err) {
    console.error("Erorr inputing goal");
    res.status(500).json({ error: "error inputing budget" });
  }
}

export async function getGoals(req, res) {
  const userId = req.user.userId;

  try {
    const data = await pool.query(`SELECT * FROM goals WHERE user_id = $1`, [
      userId,
    ]);

    if (!data) {
      return res.status(401).json({ error: "not goals data were found" });
    }
    res.json(data.rows);
  } catch (err) {
    console.error("Error getting goal data", err);
    res.status(500).json({ error: " error getting goals data" });
  }
}

export async function deleteGoals(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const data = await pool.query(
      `DELETE * FROM goals WHERE user_id = $1 and id =$2`,
      [userId, id],
    );
    if (!data.rows) {
      return res.status(400).json({ error: "cannot find goal to delete" });
    }
    res.json({ message: "Goal was deleted" });
  } catch (error) {
    console.error("Error deleting goal");
    res.status(500).json({ error: "error deleting goal" });
  }
}
