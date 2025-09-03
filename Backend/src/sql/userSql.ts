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
    [name, email, password, phone_number, role_id]
  );
  return rows[0];
};

export const getUserWithRole = async (db: PoolClient, email: string) => {
  const query = `
    SELECT u.id, u.name, u.email, u.phone_number, u.password, u.role_id, u.created_at, u.updated_at, r.role
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.email = $1
  `;
  const { rows } = await db.query(query, [email]);
  return rows[0];
};
