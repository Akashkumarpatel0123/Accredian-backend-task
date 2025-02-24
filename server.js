// ✅ Import necessary modules
const express = require("express");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());



// ✅ API Route: Fetch All Referrals
app.get("/get-referrals", (req, res) => {
  const sql = "SELECT * FROM referrals";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching referrals:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});
// ✅ API to Add a New Referral
app.post("/add-referral", (req, res) => {
  const { referrer, referee } = req.body;

  if (!referrer || !referee) {
    return res.status(400).json({ error: "Both referrer and referee are required" });
  }

  const sql = "INSERT INTO referrals (referrer, referee) VALUES (?, ?)";
  db.query(sql, [referrer, referee], (err, result) => {
    if (err) {
      console.error("❌ Error inserting referral:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Referral added successfully", id: result.insertId });
  });
});


// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
