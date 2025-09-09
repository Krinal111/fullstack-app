import { Request, Response } from "express";
import express from "express";
import { addVendor } from "../controllers";
export const adminRouter = express.Router();
const ApiService = {
  AddVendor: async (req: Request, res: Response) => {
    const resp = await addVendor(req);
    res.status(resp.statusCode).json(resp);
  },
};
adminRouter.post("/add-vendor", ApiService.AddVendor); // Only admin can access due to AuthorizeRole config
