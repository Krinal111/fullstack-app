import { PoolClient } from "pg";
import { VendorProjection } from "../models/vendorModel";

export const createVendor = async (db: PoolClient, vendor: any) => {
  const { user_id, shop_name } = vendor;
  const { rows } = await db.query(
    `INSERT INTO vendors (user_id, shop_name)
     VALUES ($1, $2)
     RETURNING id, user_id, shop_name, created_at`,
    [user_id, shop_name]
  );
  return rows[0];
};

export const getVendorById = async (db: PoolClient, vendorIds: string[]) => {
  try {
    const query = `
      SELECT ${VendorProjection.join(", ")}
      FROM vendors
      WHERE id = ANY($1)
    `;
    const result = await db.query(query, [vendorIds]);
    return result?.rows || [];
  } catch (err) {
    console.error("Error fetching vendor by id:", err);
    throw err;
  }
};

export const getVendorByUserId = async (db: PoolClient, userId: string) => {
  try {
    const query = `
      SELECT ${VendorProjection.join(", ")}
      FROM vendors
      WHERE user_id = $1
      LIMIT 1
    `;
    const result = await db.query(query, [userId]);
    return result?.rows[0] || null;
  } catch (err) {
    console.error("Error fetching vendor by user_id:", err);
    throw err;
  }
};
