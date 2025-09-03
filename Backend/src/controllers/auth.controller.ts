import { Request, Response } from "express";
import { getUserByEmail, createUser, getRoleByName, getRoleById } from "../sql";
import { hashPassword, compareHashPassword } from "../helpers/functions";
import { generateToken } from "../middlewares/auth";
import { jwtCreds } from "../config/config";
import { verify } from "jsonwebtoken";
import { ROLES } from "../constants/Roles";

const registerCustomer = async (req: Request) => {
  try {
    const db = req.app.locals.db;
    const { name, email, password, phone_number } = req.body;

    const existing = await getUserByEmail(db, email);
    if (existing) {
      return { status: false, statusCode: 400, message: "User already exists" };
    }

    const hashedPassword = await hashPassword(password);
    const customerRole = await getRoleByName(db, ROLES.CUSTOMER);

    const newUser = await createUser(db, {
      name,
      email,
      password: hashedPassword,
      phone_number,
      role_id: customerRole.id,
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
    const { email, password } = req.body;

    const user = await getUserByEmail(db, email);
    if (!user) {
      return { status: false, statusCode: 400, message: "Invalid email" };
    }

    const match = await compareHashPassword(password, user.password);
    console.log(
      "match,email,password",
      match,
      email,
      password,
      user.password,
      "::"
    );
    if (!match) {
      return { status: false, statusCode: 401, message: "Incorrect password" };
    }

    const role = await getRoleById(db, user.role_id);
    if (!role) {
      return {
        status: false,
        statusCode: 404,
        message: "Role not found",
      };
    }

    const jwt = generateToken(jwtCreds.sessionTime, {
      email: user.email,
    });

    const refreshToken = generateToken(jwtCreds.refreshSessionTime, {
      email: user.email,
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
        email: user.email,
        phone_number: user.phone_number,
        role: {
          role_id: user.role_id,
          role_name: role.role,
        },
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

const refreshToken = async (req: Request) => {
  try {
    const refreshToken = req?.headers?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return {
        statusCode: 400,
        status: false,
        message: "Refresh token not provided",
      };
    }

    // Verify refresh token
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

    // Get user from DB
    const user = await getUserByEmail(req.app.locals.db, decoded.email);
    if (!user) {
      return {
        statusCode: 404,
        status: false,
        message: "User not found",
      };
    }

    // Generate new access token
    const newAccessToken = generateToken(jwtCreds.sessionTime, {
      email: user.email,
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
export { registerCustomer, login, refreshToken };
