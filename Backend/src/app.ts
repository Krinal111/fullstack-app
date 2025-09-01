import express from "express";
import { errorInterceptorMiddleware } from "./middlewares/response";

const app = express();
app.use(errorInterceptorMiddleware);

export default app;
