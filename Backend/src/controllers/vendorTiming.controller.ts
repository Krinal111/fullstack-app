import { Request } from "express";
import { PoolClient } from "pg";
import {
  getVendorTimingsByVendorId,
  updateVendorTiming as updateVendorTimingQuery,
  deleteVendorTiming as deleteVendorTimingQuery,
} from "../sql";

// ✅ Get all timings for a vendor
export const getVendorTimings = async (req: Request) => {
  try {
    const db: PoolClient = req.app?.locals?.db;
    const { vendorId } = req.params;

    const resp = await getVendorTimingsByVendorId(db, vendorId);

    return {
      statusCode: 200,
      status: true,
      message: "Vendor timings fetched successfully",
      data: resp,
    };
  } catch (err: any) {
    console.error("Error fetching vendor timings:", err);
    return {
      statusCode: 500,
      status: false,
      message: "Failed to fetch vendor timings",
      error: err,
    };
  }
};

// ✅ Add timing
export const addVendorTiming = async (req: Request) => {
  try {
    const db: PoolClient = req.app?.locals?.db;
    const { vendorId } = req.params;
    const { meal_type, price, start_time, end_time } = req.body;
    console.log("vendorId", vendorId);
    const query = `
      INSERT INTO vendor_timings (vendor_id, meal_type, price, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [vendorId, meal_type, price, start_time, end_time];
    console.log("db.query(query,values)", db.query(query, values));
    const result = await db.query(query, values);

    return {
      statusCode: 201,
      status: true,
      message: "Vendor timing added successfully",
      data: result?.rows[0],
    };
  } catch (err: any) {
    console.error("Error adding vendor timing:", err);
    return {
      statusCode: 500,
      status: false,
      message: "Failed to add vendor timing",
      error: err,
    };
  }
};

// ✅ Update timing
export const updateVendorTiming = async (req: Request) => {
  try {
    const db: PoolClient = req.app?.locals?.db;
    const { id } = req.params; // timing id
    const { meal_type, price, start_time, end_time } = req.body;

    const resp = await updateVendorTimingQuery(db, id, {
      meal_type,
      price,
      start_time,
      end_time,
    });

    return {
      statusCode: 200,
      status: true,
      message: "Vendor timing updated successfully",
      data: resp,
    };
  } catch (err: any) {
    console.error("Error updating vendor timing:", err);
    return {
      statusCode: 500,
      status: false,
      message: "Failed to update vendor timing",
      error: err,
    };
  }
};

// ✅ Delete timing
export const deleteVendorTiming = async (req: Request) => {
  try {
    const db: PoolClient = req.app?.locals?.db;
    const { id } = req.params;

    const deleted = await deleteVendorTimingQuery(db, id);

    if (!deleted) {
      return {
        statusCode: 404,
        status: false,
        message: "Vendor timing not found",
      };
    }

    return {
      statusCode: 200,
      status: true,
      message: "Vendor timing deleted successfully",
    };
  } catch (err: any) {
    console.error("Error deleting vendor timing:", err);
    return {
      statusCode: 500,
      status: false,
      message: "Failed to delete vendor timing",
      error: err,
    };
  }
};
