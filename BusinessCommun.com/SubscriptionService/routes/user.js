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

    await pool.execute(
      "INSERT IGNORE INTO users (userId, username, email) VALUES (?, ?, ?)",
      [data.id, data.name, data.email]
    );
    console.log("Data added");

    return res.status(200).json({
      status: "success",
      message: "User details synced successfully"
    });

  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Call backend service
    const data = await getIdAndEmail(token);

    console.log("Backend Response:", data);

    if (!data || !data.email) {
      return res.status(400).json({ error: "Invalid user data from auth service" });
    }

    const userEmail = data.email;

    const [rows] = await pool.execute(
      "SELECT userId FROM users WHERE LOWER(email) = LOWER(?)",
      [userEmail]
    );

    console.log("DB Result:", rows);

    if (rows.length > 0) {
      return res.status(200).json({ userId: rows[0].userId });
    }

    return res.status(404).json({ error: "User not found in DB" });

  } catch (error) {
    console.error("ME ENDPOINT ERROR:", error.message);
    return res.status(500).json({
      error: "Database retrieval failed",
      debug: error.message
    });
  }
});


module.exports = router;
