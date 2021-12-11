import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import connectRouter from "./app/routes";
import errorMiddleware from "./app/middleware/error.middleware";
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Welcome to leviossa_cv API" });
});

connectRouter(app);

app.use(errorMiddleware);

app.listen(3001, () => console.log("Server started on port", 3001));
