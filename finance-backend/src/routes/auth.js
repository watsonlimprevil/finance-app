import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // 2. Hash password
    const hash = await bcrypt.hash(password, 10);

    // 3. Insert user
    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, hash],
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    // 4. Return user
    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

import jwt from "jsonwebtoken";
import { requireAuth } from "../middleware/authe.js";

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user
    const result = await pool.query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    // 2. Compare password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 3. Create JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // 4. Return token + user
    res.json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.patch("/changepassword", requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;
    const users = await pool.query(
      "SELECT email , password_hash FROM users where id =$1",
      [userId],
    );

    console.log(oldPassword, newPassword);
    const user = users.rows[0];
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const valid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!valid)
      return res.status(400).json({ message: "old password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users SSET password_hash = $1  
   WHERE id = $2`,
      [hashed, userId],
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update password" });
  }
});

export default router;
