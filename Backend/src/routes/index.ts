import express from "express";
import { authRouter } from "./auth.routes";
import { adminRouter } from "./admin.routes";
export const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
