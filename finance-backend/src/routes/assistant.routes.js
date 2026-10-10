import express from "express";
import { requireAuth } from "../middleware/authe.js";
import OpenAI from "openai";
import pool from "../db.js";
import { APP_KNOWLEDGE } from "../utils/appKnowledge.js";
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

router.post("/ask", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.userId;

    const transactions = await pool.query(
      `SELECT * FROM Transactions WHERE user_id = $1`,
      [userId],
    );

    const budgets = await pool.query(
      `SELECT * FROM budgets WHERE user_id = $1`,
      [userId],
    );

    const userPreferences = await pool.query(
      `SELECT * FROM userPreferences where user_id = $1`,
      [userId],
    );

    const context = `
User message: ${message}
User transactions: ${JSON.stringify(transactions)}
User budget: ${JSON.stringify(budgets)}
User userPreferences: ${JSON.stringify(userPreferences)}
App information: ${JSON.stringify(APP_KNOWLEDGE)}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant inside a project management app.",
        },
        { role: "user", content: context },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI failed" });
  }
});

export default router;
