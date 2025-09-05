import { Request } from "express";
import { ROLES } from "../constants/Roles";
import { hashPassword } from "../helpers/functions";
import { createUser, createVendor, getUserByPhone } from "../sql";

const addVendor = async (req: Request) => {
  try {
    const db = req.app.locals.db;
    const { name, phone_number, shop_name, email } = req.body;

    // Check if user already exists
    const existing = await getUserByPhone(db, phone_number);
    if (existing) {
      return {
        status: false,
        statusCode: 400,
        message: "User with this phone number already exists",
      };
    }

    // Create vendor user first
    const defaultPassword = "1234";
    const hashedPassword = await hashPassword(defaultPassword);

    const newUser = await createUser(db, {
      name,
      phone_number,
      email: email || null,
      password: hashedPassword,
      role: ROLES.VENDOR,
    });

    // Now insert into vendors table
    const newVendor = await createVendor(db, {
      user_id: newUser.id,
      shop_name,
    });

    return {
      status: true,
      statusCode: 201,
      data: {
        ...newUser,
        vendor: newVendor,
      },
      message: "Vendor added successfully. Default password: 1234",
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: "Failed to add vendor",
      error: err,
    };
  }
};

export { addVendor };
