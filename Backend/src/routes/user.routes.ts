import express, { Request, Response } from "express";
import { updateUser } from "../controllers";

const ApiService = {
  UpdateUser: async (req: Request, res: Response) => {
    const resp = await updateUser(req);
    res.status(resp.statusCode).json(resp);
  },
};

export const userRouter = express.Router();
userRouter.patch("/:id", ApiService.UpdateUser);
