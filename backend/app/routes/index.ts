import { Express } from "express";
import userRouter from "./user.routes";
import washRouter from "./wash.router";


export default function connectRouter(app: Express) {
  app.use("/api", userRouter);
  app.use("/api", washRouter);

}
