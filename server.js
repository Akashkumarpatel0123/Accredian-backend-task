const express = require("express");
const pool = require("./config/db"); // ✅ PostgreSQL connection
const cors = require("cors");

const app = express();

// ✅ Allow CORS for Frontend on Vercel
app.use(cors({ origin: "https://accredian-frontend-task-ecru-kappa.vercel.app" }));
app.use(express.json()); // ✅ Important for parsing JSON data

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ GET all referrals
app.get("/get-referrals", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM referrals");
    res.json(result.rows); // ✅ PostgreSQL returns data inside `rows`
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Database Error" });
  }
});

// ✅ POST - Add a new referral
app.post("/add-referral", async (req, res) => {
  const { referrer, referee } = req.body;

  if (!referrer || !referee) {
    return res.status(400).json({ error: "Missing referrer or referee" });
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
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
