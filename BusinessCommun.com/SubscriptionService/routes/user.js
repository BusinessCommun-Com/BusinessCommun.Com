const express = require("express");
const router = express.Router();
const { getIdAndEmail } = require("../services/backendClient");
const pool = require("../db");

router.post("/get-user-details", async (req, res) => {
  console.log("Received request for user details");
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authHeader.replace("Bearer ", "");
    let data;
    try {
      data = await getIdAndEmail(token);
    } catch (err) {
      console.error("Backend call failed:", err.message);
      return res.status(502).json({ error: "Backend service failed" });
    }
    pool.execute(
      "INSERT INTO users (userId, username, email) VALUES (?, ?, ?)",
      [data.data.id, data.data.name, data.data.email],
      );
      return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
