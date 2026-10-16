import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
console.log("DATABASE_URLS:", process.env.DATABASE_URL);
console.log("testing debugging");
export default pool;
