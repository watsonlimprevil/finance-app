import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";
import { sendVerificationEmail } from "../utils/email.js";
const router = express.Router();

// REGISTER
router.post("/sendVerificationCode", async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Check if user exists
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (existing.rows.length > 0) {
      return res.status(404).json({ message: "invalid email" });
    }

    // 3. Insert user
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const date = new Date(Date.now() + 1000 * 60 * 10);
    const insertIntoVerification = await pool.query(
      `INSERT INTO verificationcode (email , code , expiresat) 
      VALUES($1 , $2 , $3) RETURNING *`,
      [email, code, date],
    );
    const users = insertIntoVerification.rows[0];

    const verified = await sendVerificationEmail(users.email, code);
    if (verified.success) {
      return res
        .status(200)
        .json({ message: "verfication code successfully sent" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/checkVerificationCode", async (req, res) => {
  const { code, email } = req.body;
  const DBcode = Number(code);

  try {
    const verifyRes = await pool.query(
      `SELECT * FROM verificationcode WHERE email = $1 
      AND code = $2`,
      [email, DBcode],
    );
    console.log("adding log statement to restart the container");

    const userVerify = verifyRes.rows[0];
    if (!userVerify) {
      return res.status(400).json({ error: "invalid code" });
    }

    const TEN_MINUTE_MS = new Date(Date.now() + 10 * 60 * 1000);
    const expired = new Date(userVerify.expiresat).getTime();
    if (expired > TEN_MINUTE_MS) {
      return res.status(400).json({ message: "code is already expired" });
    }

    await pool.query(`DELETE FROM verificationcode where email = $1 `, [email]);
    return res.json({ message: "code successfully verified" });
  } catch (err) {
    console.error("unable to verify code", err);
    res.status(500).json({ error: "server error" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const exists = await pool.query(`SELECT * FROM users where email = $1 `, [
      email,
    ]);

    if (exists.rows.length > 0) {
      return res.status(400).json({ error: "email is already in use" });
    }

    const hash = await bcrypt.hash(password, 10);

    const insertIntoDB = await pool.query(
      `INSERT into users (email , password_hash) VALUES($1, $2)
    RETURNING *`,
      [email, hash],
    );

    const user = insertIntoDB.rows[0];
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return res.status(201).json({ token, user });
  } catch (err) {
    console.error("testin debugging", err);
    res.status(500).json({ error: "server error" });
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
      return res.status(400).json({ message: "Invalid credentials" });
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

    const user = users.rows[0];
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const valid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!valid)
      return res.status(400).json({ message: "old password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users SET password_hash = $1  
   WHERE id = $2`,
      [hashed, userId],
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update password" });
  }
});

export default router;
