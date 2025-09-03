// src/middlewares/auth.ts
import { Secret, sign, verify, TokenExpiredError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { jwtCreds } from "../config/config";
import { AuthRequest, RoleType, User } from "../types";
import { ROLES } from "../constants/Roles";
import { getUserWithRole } from "../sql";

const secretKey = jwtCreds.secretKeyJwt as Secret;

export const generateToken = (validTime: string, user: { email: string }) => {
  try {
    const accessToken = sign({ ...user }, secretKey, {
      expiresIn: validTime,
    });
    return accessToken;
  } catch (err) {
    return null;
  }
};

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearer = req?.headers?.authorization?.split(" ");
    if (!bearer || bearer[0] !== "Bearer") {
      return res.status(401).json({
        status: false,
        message: "Authorization token required",
      });
    }

    const token = bearer[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token not provided",
      });
    }

    const decoded = verify(token, secretKey) as { email: string };

    // Get user with role information
    const user = await getUserWithRole(req.app.locals.db, decoded.email);
    console.log("user", user);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        status: false,
        message: "Token expired. Please login again.",
      });
    }
    console.error("Token verification error:", err);
    return res.status(401).json({
      status: false,
      message: "Invalid token",
    });
  }
};

export const authorizeRoles = (...allowedRoles: RoleType[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "Authentication required",
      });
    }

    const userRole = req.user.role;
    if (!userRole || !allowedRoles.includes(userRole as RoleType)) {
      return res.status(403).json({
        status: false,
        message: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

// Specific role middlewares
export const requireAdmin = authorizeRoles(ROLES.ADMIN);
export const requireVendor = authorizeRoles(ROLES.VENDOR);
export const requireCustomer = authorizeRoles(ROLES.CUSTOMER);
export const requireVendorOrAdmin = authorizeRoles(ROLES.VENDOR, ROLES.ADMIN);
export const requireAnyRole = authorizeRoles(
  ROLES.ADMIN,
  ROLES.VENDOR,
  ROLES.CUSTOMER
);
