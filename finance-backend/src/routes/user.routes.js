import express from "express";
import { requireAuth } from "../middleware/authe.js";
import pool from "../db.js";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { sendVerificationEmail } from "../utils/email.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/avatar",
  requireAuth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const userId = req.user.userId;

      const result = await cloudinary.v2.uploader.upload(req.file.path);
      await pool.query(
        `UPDATE  users SET avatarurl = $1
            WHERE id = $2 `,
        [result.secure_url, userId],
      );
      res.json({ avatarurl: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload failed" });
    }
  },
);

router.get("/uploaded", requireAuth, async (req, res) => {
  const userId = req.user.userId;

  try {
    const users = await pool.query(
      `SELECT avatarurl from users WHERE id = $1`,
      [userId],
    );
    if (users.rows.length === 0) {
      return res.json({ avatarurl: null });
    }

    res.json({ avatarurl: result.rows[0].avatarurl });
  } catch (err) {
    res.status(500).json({ error: "Failed to load avatar" });
  }
});

router.delete("/delete-account", requireAuth, async (req, res) => {
  const userId = req.user.userId;
  try {
    await pool.query(
      `DELETE FROM (users , goals , transactions , userPreferences , budgets)
            WHERE id = $1`,
      [userId],
    );

    res.json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "unable to delete user account" });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Unable to find user" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error getting user details" });
  }
});

router.put("/name", requireAuth, async (req, res) => {
  const userId = req.user.userId;
  const { name } = req.body;
  try {
    const data = await pool.query(`UPDATE users SET name = $1 WHERE id = $2`, [
      name,
      userId,
    ]);
    const users = data.rows;
    if (!users) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json({ message: "Name successfully updated in the database" });
  } catch (error) {
    console.error("unable to add name to the database");
    res.status(500).json({ error: "server error" });
  }
});

router.post("/sendCode", requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const users = await pool.query(`SELECT * FROM users WHERE id = $1 `, [
      userId,
    ]);

    const user = users.rows[0];

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const date = new Date(Date.now() + 1000 * 60 * 10);

    const result = await pool.query(
      `INSERT into verificationcode (email , code , expiresat) 
    VALUES($1, $2 , $3) RETURNING *`,
      [user.email, code, date],
    );
    const verified = await sendVerificationEmail(user.email, code);
    if (verified) {
      res.json({ message: "email sent" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error sending verification code" });
  }
});

router.post("/getcode", requireAuth, async (req, res) => {
  const userId = req.user.userId;
  const { email, newPassword, code } = req.body;

  try {
    const data = await pool.query(`SELECT * FROM users where id = $1`, [
      userId,
    ]);
    const user = data.rows;
    if (data.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    const verified = await pool.query(
      `SELECT * FROM verificationcode where email = $1 and code = $2`,
      [email, code],
    );

    if (!verified) {
      return res.status(404).json({ message: "invalid code" });
    }

    const codeBase = verified.rows[0];
    const TEN_MINUTES_MS = 10 * 60 * 1000;
    if (codeBase.expiresat > TEN_MINUTES_MS) {
      return res.status(400).json({ message: "code is already expired" });
    }

    const insertNewPassword = await pool.query(
      `UPDATE users set password = $1 where id = $2`,
      [newPassword, userId],
    );

    res.json({ message: "password successfully updated" });
  } catch (err) {
    console.error("error updating password", err);
    res.status(500).json({ error: "server error" });
  }
});

export default router;
