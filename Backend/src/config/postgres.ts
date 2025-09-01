import { Pool, PoolClient } from "pg";

const pool: Pool = new Pool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.DB_PORT || "5432"),
});

/** 
 * Connect to PostgreSQL Database
 *
 * Establishes a connection to the PostgreSQL database using the created pool.
 * Handles any potential connection errors.
 */
const connectToDB = async () => {
  try {
    const db: PoolClient = await pool.connect();
    return db;
  } catch (err) {
    console.log("Error in DB connection: ", err);
    return undefined;
  }
};

export { pool, connectToDB };
