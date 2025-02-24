const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // ✅ Important for external PostgreSQL like Neon
  },
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected!"))
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err));

module.exports = pool;

