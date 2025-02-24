const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Use .env file
  ssl: {
    rejectUnauthorized: false, // Required for NeonDB SSL
  },
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL Connected!");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected Database Error:", err);
  process.exit(-1);
});

module.exports = pool;
