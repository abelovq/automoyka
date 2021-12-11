import { Express } from "express";
<<<<<<< HEAD
// import userRouter from "./user.routes";
// import technologyRouter from "./technology.routes";

export default function connectRouter(app: Express) {
  // app.use("/api", userRouter);
  // app.use("/api", technologyRouter);
=======
import userRouter from "./user.routes";

export default function connectRouter(app: Express) {
  app.use("/api", userRouter);
>>>>>>> 3657793db66f619c60b96400910a24108a8716a1
}
