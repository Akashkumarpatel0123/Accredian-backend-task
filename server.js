// ✅ Import necessary modules
const express = require("express");
const pool = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.post("/add-referral", async (req, res) => {
  const { referrer, referee } = req.body;

  if (!referrer || !referee) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const query = "INSERT INTO referrals (referrer, referee) VALUES ($1, $2) RETURNING *";
    const values = [referrer, referee];

    const result = await pool.query(query, values);
    res.status(201).json({ message: "Referral added successfully", data: result.rows[0] });
  } catch (error) {
    console.error("Error inserting referral:", error);
    res.status(500).json({ error: "Database error" });
  }
});


// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
