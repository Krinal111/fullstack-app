import { PoolClient } from "pg";
import { VendorTimingProjection } from "../models/vendorModel";

// 🔹 Get all timings for a vendor
export const getVendorTimingsByVendorId = async (
  db: PoolClient,
  vendorId: string
) => {
  try {
    const query = `
      SELECT ${VendorTimingProjection.join(", ")}
      FROM vendor_timings
      WHERE vendor_id = $1
      ORDER BY created_at DESC
    `;
    const result = await db.query(query, [vendorId]);
    return result?.rows || [];
  } catch (err) {
    console.error("Error fetching vendor timings:", err);
    throw err;
  }
};

// 🔹 Update vendor timing
export const updateVendorTiming = async (
  db: PoolClient,
  timingId: string,
  updateData: {
    meal_type?: string;
    price?: number;
    start_time?: string;
    end_time?: string;
  }
) => {
  try {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        fields.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (fields.length === 0) {
      throw new Error("No fields provided to update");
    }

    values.push(timingId); // last param for WHERE condition

    const query = `
      UPDATE vendor_timings
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${index}
      RETURNING ${VendorTimingProjection.join(", ")}
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  } catch (err) {
    console.error("Error updating vendor timing:", err);
    throw err;
  }
};

// 🔹 Delete vendor timing
export const deleteVendorTiming = async (db: PoolClient, timingId: string) => {
  try {
    const query = `
      DELETE FROM vendor_timings
      WHERE id = $1
      RETURNING id
    `;
    const result = await db.query(query, [timingId]);
    return result.rows[0] || null;
  } catch (err) {
    console.error("Error deleting vendor timing:", err);
    throw err;
  }
};
