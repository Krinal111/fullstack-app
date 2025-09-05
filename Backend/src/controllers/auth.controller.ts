import { Request } from "express";
import { getUserByPhone, createUser } from "../sql";
import { hashPassword, compareHashPassword } from "../helpers/functions";
import { generateToken } from "../middlewares/auth";
import { jwtCreds } from "../config/config";
import { verify } from "jsonwebtoken";
import { ROLES } from "../constants/Roles";

const registerCustomer = async (req: Request) => {
  try {
    const db = req.app.locals.db;
    const { name, phone_number, email } = req.body;

    if (!phone_number || phone_number.length < 10) {
      return {
        status: false,
        statusCode: 400,
        message: "Valid phone number is required",
      };
    }

    const existing = await getUserByPhone(db, phone_number);
    if (existing) {
      return {
        status: false,
        statusCode: 400,
        message: "User with this phone number already exists",
      };
    }

    const defaultPassword = "1234";
    const hashedPassword = await hashPassword(defaultPassword);

    const newUser = await createUser(db, {
      name,
      phone_number,
      email,
      password: hashedPassword,
      role: ROLES.CUSTOMER,
    });

    return { status: true, statusCode: 201, data: newUser };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: "Registration failed",
      error: err,
    };
  }
};

const login = async (req: Request) => {
  try {
    const db = req.app.locals.db;
    const { phone_number, password } = req.body;

    if (!phone_number) {
      return {
        status: false,
        statusCode: 400,
        message: "Phone number is required",
      };
    }

    const user = await getUserByPhone(db, phone_number);
    if (!user) {
      return {
        status: false,
        statusCode: 400,
        message: "User not found with this phone number",
      };
    }

    if (!user.is_active) {
      return {
        status: false,
        statusCode: 401,
        message: "Account is deactivated",
      };
    }

    const match = await compareHashPassword(password, user.password);
    if (!match) {
      return {
        status: false,
        statusCode: 401,
        message: "Incorrect password", 
      };
    }

    const jwt = generateToken(jwtCreds.sessionTime, {
      phone_number: user.phone_number,
      role: user.role,
    });

    const refreshToken = generateToken(jwtCreds.refreshSessionTime, {
      phone_number: user.phone_number,
      role: user.role,
    });

    if (!jwt) {
      return {
        status: false,
        statusCode: 500,
        message: "Token generation failed",
      };
    }

    return {
      status: true,
      statusCode: 200,
      data: {
        id: user.id,
        name: user.name,
        phone_number: user.phone_number,
        email: user.email,
        role: user.role,
        shop_name: user.shop_name,
        auth_token: jwt,
        refreshToken,
      },
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      message: "Login failed",
      error: err,
    };
  }
};

const refToken = async (req: Request) => {
  try {
    const refreshToken = req?.headers?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return {
        statusCode: 400,
        status: false,
        message: "Refresh token not provided",
      };
    }

    let decoded: any;
    try {
      decoded = verify(refreshToken, jwtCreds.secretKeyJwt as string);
    } catch (err) {
      return {
        statusCode: 401,
        status: false,
        message: "Invalid or expired refresh token",
      };
    }

    const user = await getUserByPhone(req.app.locals.db, decoded.phone_number);
    if (!user) {
      return {
        statusCode: 404,
        status: false,
        message: "User not found",
      };
    }

    const newAccessToken = generateToken(jwtCreds.sessionTime, {
      phone_number: user.phone_number,
      role: user.role,
    });

    return {
      statusCode: 200,
      status: true,
      auth_token: newAccessToken,
    };
  } catch (err) {
    return {
      statusCode: 500,
      status: false,
      message: "Failed to refresh token",
      error: (err as Error).message,
    };
  }
};

export { login, registerCustomer, refToken };
