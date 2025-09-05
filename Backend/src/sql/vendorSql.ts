import { PoolClient } from "pg";

export const createVendor = async (db: PoolClient, vendor: any) => {
  const { user_id, shop_name } = vendor;
  const { rows } = await db.query(
    `INSERT INTO vendors (user_id, shop_name)
     VALUES ($1, $2)
     RETURNING id, user_id, shop_name, open_time, close_time, created_at`,
    [user_id, shop_name]
  );
  return rows[0];
};
