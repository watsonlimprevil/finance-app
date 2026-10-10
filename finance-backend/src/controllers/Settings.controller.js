import pool from "../db.js";

export const getGlobalSettings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const preferenceRes = await pool.query(
      `SELECT * FROM userPreferences WHERE user_id = $1`,
      [userId],
    );

    const preferences = preferenceRes.rows;

    if (preferences.length === 0) {
      return res.json({ message: "no user preferences yet" });
    }

    return res.json(preferences[0]); // return the actual preference object
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting preferences" });
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
