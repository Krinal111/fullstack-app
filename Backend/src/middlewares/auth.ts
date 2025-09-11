// middlewares/auth.ts
import { Secret, sign, verify, TokenExpiredError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { jwtCreds } from "../config/config";
import { AuthRequest } from "../types";
import { getUserWithRole } from "../sql";
import { AuthorizeRole } from "../constants/AuthorizeRole";
import { normalizePath } from "../helpers/functions";

const secretKey = jwtCreds.secretKeyJwt as Secret;

const PUBLIC_ROUTES = [
  { path: "/api/auth/login", method: "POST" },
  { path: "/api/auth/register", method: "POST" },
  { path: "/api/auth/refresh", method: "GET" },
];

// Helper function to check if route is public
const isPublicRoute = (path: string, method: string): boolean => {
  return PUBLIC_ROUTES.some(
    (route) =>
      route.path === path && route.method.toLowerCase() === method.toLowerCase()
  );
};

export const generateToken = (
  validTime: string,
  user: { phone_number: string; role?: string }
) => {
  try {
    const accessToken = sign({ ...user }, secretKey, {
      expiresIn: validTime,
    });
    return accessToken;
  } catch (err) {
    return null;
  }
};

export const VerifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Skip token verification for public routes
    if (isPublicRoute(req.path, req.method)) {
      return next();
    }

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

    const decoded = verify(token, secretKey) as { phone_number: string };
    const user = await getUserWithRole(req.app.locals.db, decoded.phone_number);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    if (!user.is_active) {
      return res.status(401).json({
        status: false,
        message: "Account is deactivated",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        status: false,
        message: "Token expired. Please login again.",
      });
    }
    return res.status(401).json({
      status: false,
      message: "Invalid token",
    });
  }
};

export const authoriseRole = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Skip authorization for public routes
    if (isPublicRoute(req.path, req.method)) {
      return next();
    }

    // Extract the API path (remove /api prefix for AuthorizeRole lookup)
    let apiPath = req.path.replace("/api", "");
    apiPath = normalizePath(apiPath); // 👈 normalize before lookup
    const method = req.method.toLowerCase();

    if (!AuthorizeRole[apiPath] || !AuthorizeRole[apiPath][method]) {
      return next();
    }

    // Check if user is authenticated (should be set by VerifyToken)
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "Authentication required",
      });
    }

    const allowedRoles = AuthorizeRole[apiPath][method];
    const userRole = req.user.role;

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(userRole as string)) {
      return res.status(403).json({
        status: false,
        message: "Insufficient permissions",
        required_roles: allowedRoles,
        role: userRole,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Authorization error",
      error: (error as Error).message,
    });
  }
};

export const ConditionalVerifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Skip authentication for public routes
  if (isPublicRoute(req.path, req.method)) {
    return next();
  }

  // Apply normal token verification
  return VerifyToken(req, res, next);
};

export const ConditionalAuthoriseRole = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Skip authorization for public routes
  if (isPublicRoute(req.path, req.method)) {
    return next();
  }

  // Apply normal role authorization
  return authoriseRole(req, res, next);
};
