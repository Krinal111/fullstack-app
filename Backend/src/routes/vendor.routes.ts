import express, { Request, Response } from "express";
import { getAllVendors } from "../controllers";

export const vendorRouter = express.Router();

const ApiService = {
  getVendors: async (req: Request, res: Response) => {
    const resp = await getAllVendors(req);
    res.status(resp.statusCode).json(resp);
  },
};

vendorRouter.get("/all-vendors", ApiService.getVendors);
