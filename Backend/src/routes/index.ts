import express from "express";
import { authRouter } from "./auth.routes";
import { adminRouter } from "./admin.routes";
import { userRouter } from "./user.routes";
export const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/users", userRouter);
