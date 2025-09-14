import { Request } from "express";
import {
  deleteTableData,
  getTableData,
  getUserById,
  getVendorById,
  getVendorByUserId,
  updateTableData,
} from "../sql";
import { VendorProjection } from "../models/vendorModel";
import { PoolClient } from "pg";

const getAllVendors = async (req: Request) => {
  try {
    const db = req?.app?.locals?.db;
    const table = req?.baseUrl?.split("/")[2];

    const pagination = {
      limit: req?.query?.limit ? +req?.query?.limit : 0,
      page: req?.query?.page ? +req?.query?.page : 1,
      sort: (req?.query?.sort as string) || "ASC",
      search: (req?.query?.search as string) || "",
      projection: VendorProjection,
    };

    // get raw vendors
    const response = await getTableData(db, table, pagination);

    if (!response || !response.rows?.length) {
      return {
        statusCode: 200,
        data: { rows: [], total_count: 0 },
        status: true,
      };
    }

    // normalize: attach user details for each vendor
    const rowsWithUsers = await Promise.all(
      response.rows.map(async (vendor) => {
        const user = await getUserById(db, vendor.user_id);
        if (!user) {
          return {
            statusCode: 404,
            status: false,
            error: "No User found with above ID",
          };
        }
        return {
          ...vendor,
          name: user.name,
          phone_number: user.phone_number,
        };
      })
    );

    return {
      statusCode: 200,
      data: {
        rows: rowsWithUsers,
        total_count: response.total_count,
      },
      status: true,
    };
  } catch (err) {
    console.error("Error in getAllVendors:", err);
    return {
      statusCode: 500,
      status: false,
      error: err,
    };
  }
};

const updateVendor = async (req: Request) => {
  try {
    const db = req.app.locals.db;
    const table = req.baseUrl.split("/")[2];
    const vendor_id = req.params.uuid;
    const { shop_name, name, phone_number, user_id } = req.body;

    // update vendor table
    await updateTableData(db, { id: vendor_id }, table, {
      shop_name,
    });

    await updateTableData(db, { id: user_id }, "users", { name, phone_number });

    return {
      statusCode: 200,
      status: true,
      message: "Vendor updated successfully",
    };
  } catch (err) {
    return {
      statusCode: 500,
      status: false,
      error: err,
    };
  }
};

const deleteVendor = async (req: Request) => {
  try {
    const db: PoolClient = req.app?.locals?.db;
    const user_id = req.params?.uuid;
    console.log("user_id", user_id);
    // 2. Delete user (cascades to vendor)
    await deleteTableData(db, { id: user_id }, "users");

    return {
      statusCode: 200,
      status: true,
      message: "Vendor and associated user deleted successfully",
    };
  } catch (err: any) {
    console.error("Error deleting vendor:", err);
    return {
      statusCode: 500,
      status: false,
      error: err,
      message: "Server error",
    };
  }
};

const getVendorDetails = async (req: Request) => {
  const db: PoolClient = req.app?.locals?.db;
  const user_id = req.params.id; // 👈 now taking user_id

  try {
    // 🔹 Fetch vendor by user_id
    const vendor = await getVendorByUserId(db, user_id);
    console.log("vendor", user_id);
    if (!vendor) {
      return {
        statusCode: 404,
        status: false,
        message: "Vendor not found for this user",
        data: null,
      };
    }

    // 🔹 Fetch user by id
    const user = await getUserById(db, user_id);

    const combinedData = {
      ...vendor,
      user: user || null,
    };

    return {
      statusCode: 200,
      status: true,
      message: "Vendor details fetched successfully",
      data: combinedData,
    };
  } catch (err: any) {
    console.error("Error fetching vendor with user:", err);
    return {
      statusCode: 500,
      status: false,
      message: "Failed to fetch vendor details",
      error: err,
    };
  }
};
export { getAllVendors, updateVendor, deleteVendor, getVendorDetails };
