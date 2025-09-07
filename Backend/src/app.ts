import express from "express";
import { errorInterceptorMiddleware } from "./middlewares/response";
import cors from "cors";
const app = express();
app.use(cors());
app.use(errorInterceptorMiddleware);

export default app;
