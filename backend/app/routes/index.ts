import { Express } from "express";
import userRouter from "./user.routes";
import washRouter from "./wash.router";
import boxRouter from "./box.routes";

export default function connectRouter(app: Express) {
  app.use("/api", userRouter);
  app.use("/api", boxRouter);
  app.use("/api", washRouter);
}
