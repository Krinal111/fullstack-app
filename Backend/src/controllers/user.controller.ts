import { Request } from "express";
import { getUserById, updateTableData } from "../sql";

const updateUser = async (req: Request) => {
  try {
    const db = req?.app?.locals?.db;
    const table = req?.baseUrl?.split("/")[2]; // "users"
    const id = { id: req?.params?.id };
    const { body } = req;

    // 1. Check if user exists
    const user = await getUserById(db, id.id);
    if (!user) {
      return {
        statusCode: 400,
        status: false,
        message: "No user found with user_id",
      };
    }

    // 2. Filter only allowed fields (no email/password updates here)
    const allowedFields = ["name", "phone_number"];
    const updateData: Record<string, any> = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return {
        statusCode: 400,
        status: false,
        message: "No valid fields provided for update",
      };
    }

    // 3. Update user in DB
    const response = await updateTableData(db, id, table, updateData);

    // 4. Return sanitized result (no password)
    return {
      statusCode: 200,
      status: true,
      message: "User updated successfully",
      data: {
        rows: [
          {
            ...response?.rows[0],
            password: null,
          },
        ],
      },
    };
  } catch (err) {
    console.error("Error in updateUser:", err);
    return {
      statusCode: 500,
      status: false,
      error: err,
    };
  }
};

export { updateUser };
