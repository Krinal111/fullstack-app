// src/middlewares/auth.ts
import {
  Secret,
  sign,
  verify,
  TokenExpiredError,
  SignOptions,
} from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { jwtCreds } from "../config/config";
import { User } from "../types";

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

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearer = req?.headers?.authorization?.split(" ");
    if (!bearer || bearer[0] !== "Bearer") {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    const token = bearer[1];
    const user = verify(token, secretKey) as User;
    (req as any).user = user; // attach user to req
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ status: false, message: "Token expired" });
    }
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};
