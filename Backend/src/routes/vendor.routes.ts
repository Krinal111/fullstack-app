import express, { Request, Response } from "express";
import {
  deleteVendor,
  getAllVendors,
  getVendorDetails,
  updateVendor,
} from "../controllers";

export const vendorRouter = express.Router();

const ApiService = {
  getVendors: async (req: Request, res: Response) => {
    const resp = await getAllVendors(req);
    res.status(resp.statusCode).json(resp);
  },
  getVendorDetail: async (req: Request, res: Response) => {
    const resp = await getVendorDetails(req);
    res.status(res.statusCode).json(resp);
  },
  updateVendorDetails: async (req: Request, res: Response) => {
    const resp = await updateVendor(req);
    res.status(res.statusCode).json(resp);
  },
  deleteVendorDetails: async (req: Request, res: Response) => {
    const resp = await deleteVendor(req);
    res.status(res.statusCode).json(resp);
  },
};

vendorRouter.get("/all-vendors", ApiService.getVendors);
vendorRouter.get("/:id", ApiService.getVendorDetail);
vendorRouter.patch("/:uuid", ApiService.updateVendorDetails);
vendorRouter.delete("/:uuid", ApiService.deleteVendorDetails);
