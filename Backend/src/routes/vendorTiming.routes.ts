import express, { Request, Response } from "express";
import {
  addVendorTiming,
  deleteVendorTiming,
  getVendorTimings,
  updateVendorTiming,
} from "../controllers";

export const vendorTimingRouter = express.Router();

const ApiService = {
  addOrderTime: async (req: Request, res: Response) => {
    const resp = await addVendorTiming(req);
    res.status(resp.statusCode).json(resp);
  },
  updateOrderTime: async (req: Request, res: Response) => {
    const resp = await updateVendorTiming(req);
    res.status(res.statusCode).json(resp);
  },
  deleteOrderTime: async (req: Request, res: Response) => {
    const resp = await deleteVendorTiming(req);
    res.status(res.statusCode).json(resp);
  },
  getTimings: async (req: Request, res: Response) => {
    const resp = await getVendorTimings(req);
    res.status(resp.statusCode).json(resp);
  },
};

vendorTimingRouter.get("/:vendorId", ApiService.getTimings);
vendorTimingRouter.post("/:vendorId", ApiService.addOrderTime);
vendorTimingRouter.patch("/:id", ApiService.updateOrderTime);
vendorTimingRouter.delete("/:id", ApiService.deleteOrderTime);
