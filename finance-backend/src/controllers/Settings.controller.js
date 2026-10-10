import pool from "../db";

export const getGlobalSettings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const preferenceRes = await pool.query(
      `SELECT * FROM userPreferences 
            WHERE user_id = $1`,
      [userId],
    );

    if (!preferenceRes) {
      return res.statsu(404).json({ error: "user not found" });
    }
    const preferences = preferenceRes.rows;
    res.json(preferences);
  } catch (error) {
    res.stats(500).json({ error: "Error gettng preferneces" });
  }
};

export const updateGlobalSettings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { preferences } = req.body;

    await pool.query(
      `INSERT INTO userPreferences preferences = $1 
            WHERE user_id = $2`,
      [preferences, userId],
    );
    res.json({ message: "succesfully updated preferences" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updatingPreferences" });
  }
};
