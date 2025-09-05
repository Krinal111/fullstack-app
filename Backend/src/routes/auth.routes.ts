import express, { Request, Response } from "express";
import { login, refToken, registerCustomer } from "../controllers";

export const authRouter = express.Router();

const ApiService = {
  RegisterCustomer: async (req: Request, res: Response) => {
    const resp = await registerCustomer(req);
    res.status(resp.statusCode).json(resp);
  },
  LoginUser: async (req: Request, res: Response) => {
    const resp = await login(req);
    res.status(resp.statusCode).json(resp);
  },
  RefreshToken: async (req: Request, res: Response) => {
    const resp = await refToken(req);
    res.status(resp.statusCode).json(resp);
  },
};

// Routes will automatically be protected based on AuthorizeRole configuration
authRouter
  .post("/register", ApiService.RegisterCustomer)
  .post("/login", ApiService.LoginUser)
  .get("/refresh", ApiService.RefreshToken);
