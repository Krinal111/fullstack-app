import { Request, Response } from "express";
import { login, refreshToken, register } from "../controllers";
import express from "express";
const ApiService = {
  loginUser: async (req: Request, res: Response) => {
    const resp = await login(req);
    res.status(resp.statusCode).json(resp);
  },
  registerCustomer: async (req: Request, res: Response) => {
    const resp = await register(req);
    res.status(resp.statusCode).json(resp);
  },
  RefreshToken: async (req: Request, res: Response) => {
    const resp = await refreshToken(req);
    res.status(resp.statusCode).json(resp);
  },
};

export const authRouter = express.Router();

authRouter
  .get("/", ApiService.RefreshToken)
  .post("/login", ApiService.loginUser)
  .post("/register", ApiService.registerCustomer);
