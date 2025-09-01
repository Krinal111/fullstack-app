import { PoolClient } from "pg";

const getRoleByName = async (db: PoolClient, role: string) => {
  const { rows } = await db.query("SELECT * FROM roles WHERE role=$1", [role]);
  return rows[0];
};

const getRoleById = async (db: PoolClient, value: string) => {
  try {
    const query = `SELECT id, role FROM roles WHERE id = $1`;
    const resp = await db.query(query, [value]);
    return resp.rows.length ? resp.rows[0] : null;
  } catch (err) {
    console.error(`Error getting Role by id: ${err}`);
    throw err;
  }
};

export { getRoleById, getRoleByName };
