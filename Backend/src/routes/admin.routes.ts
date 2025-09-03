import { Request, Response } from "express";
import express from "express";
import { registerVendor } from "../controllers/admin.controller";
import { requireAdmin, verifyToken } from "../middlewares/auth";

const ApiService = {
  registerVendor: async (req: Request, res: Response) => {
    const resp = await registerVendor(req);
    res.status(resp.statusCode).json(resp);
  },
};

export const adminRouter = express.Router();
adminRouter.use(verifyToken);
adminRouter.post("/register-vendor", requireAdmin, ApiService.registerVendor);
