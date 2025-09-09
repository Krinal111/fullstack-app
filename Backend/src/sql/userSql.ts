import { PoolClient } from "pg";

export const getUserByPhone = async (db: PoolClient, phone_number: string) => {
  const { rows } = await db.query("SELECT * FROM users WHERE phone_number=$1", [
    phone_number,
  ]);
  return rows[0];
};

export const getUserWithRole = async (db: PoolClient, phone_number: string) => {
  const { rows } = await db.query(
    `SELECT id, name, email, phone_number, role,is_active, created_at, updated_at 
     FROM users 
     WHERE phone_number=$1`,
    [phone_number]
  );
  return rows[0];
};

export const createUser = async (db: PoolClient, user: any) => {
  const { name, phone_number, email, password, role } = user;
  const { rows } = await db.query(
    `INSERT INTO users (name, phone_number, email, password, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, phone_number, email, role, created_at`,
    [name, phone_number, email, password, role ?? "Customer"]
  );
  return rows[0];
};

export const getUserById = async (db: PoolClient, id: string) => {
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const resp = await db.query(query, [id]);
    return !resp ? null : resp.rows[0];
  } catch (err) {
    console.error(`Error in getting User by id : ${err}`);
    throw err;
  }
};
