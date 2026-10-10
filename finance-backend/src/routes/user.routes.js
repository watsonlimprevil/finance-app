import express from "express";
import { requireAuth } from "../middleware/authe.js";
import pool from "../db.js";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";

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
        `INSERT into users avatarUrl = $1,
            WHERE user_id = $2 `,
        [result.secure_url, userId],
      );
      res.json({ url: result.secure_url });
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
      `SELECT avatarUrl from users WHERE user_id = $1`,
      [userId],
    );
    const avatar = users[0].rows;
    res.json({ avatarUrl: avatar.avatarUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to load avatar" });
  }
});

export default router;
