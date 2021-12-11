import { Express } from "express";
import userRouter from "./user.routes";

export default function connectRouter(app: Express) {
  app.use("/api", userRouter);
}
