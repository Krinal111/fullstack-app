import { PoolClient } from "pg";

export const getUserByEmail = async (db: PoolClient, email: string) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return rows[0];
};

export const createUser = async (db: PoolClient, user: any) => {
  const { name, email, password, phone_number, role_id } = user;
  const { rows } = await db.query(
    "INSERT INTO users (name, email, password, phone_number, role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [name, email, phone_number, role_id]
  );
  return rows[0];
};
