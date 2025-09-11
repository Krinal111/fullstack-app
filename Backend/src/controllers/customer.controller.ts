import { Request, Response } from "express";
import { getTableData, getUserById } from "../sql";
import { VendorProjection } from "../models/vendorModel";

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
        return {
          ...vendor,
          user: user
            ? {
                name: user.name,
                phone_number: user.phone_number,
              }
            : null,
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

export { getAllVendors };
