import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import connectRouter from "./app/routes";
import errorMiddleware from "./app/middleware/error.middleware";
import { getNearestCarWash } from "./app/middleware/nearestSearch";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Welcome to leviossa_cv API" });
});

connectRouter(app);

app.use(errorMiddleware);
app.use(getNearestCarWash);

app.listen(3001, () => console.log("Server started on port", 3001));
