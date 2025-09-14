import express from "express";
import { authRouter } from "./auth.routes";
import { adminRouter } from "./admin.routes";
import { userRouter } from "./user.routes";
import { vendorRouter } from "./vendor.routes";
import { vendorTimingRouter } from "./vendorTiming.routes";
export const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/users", userRouter);
router.use("/vendors", vendorRouter);
router.use("/vendor-timings", vendorTimingRouter);
