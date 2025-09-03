import { Request } from "express";
import { getUserByEmail, createUser, getRoleByName } from "../sql";
import { hashPassword } from "../helpers/functions";
import { ROLES } from "../constants/Roles";

const registerVendor = async (req: Request) => {
  try {
    const db = req.app.locals.db;
    const { name, email, password, phone_number } = req.body;

    // Check if user already exists
    const existing = await getUserByEmail(db, email);
    if (existing) {
      return { status: false, statusCode: 400, message: "User already exists" };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Get vendor role
    const vendorRole = await getRoleByName(db, ROLES.VENDOR);
    if (!vendorRole) {
      return {
        status: false,
        statusCode: 500,
        message: "Vendor role not found in system",
      };
    }

    // Create user with vendor role
    const newVendor = await createUser(db, {
      name,
      email,
      password: hashedPassword,
      phone_number,
      role_id: vendorRole.id,
    });

    return { status: true, statusCode: 201, data: newVendor };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: "Vendor registration failed",
      error: err,
    };
  }
};

export { registerVendor };
