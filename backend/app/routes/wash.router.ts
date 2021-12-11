import { Router } from "express";
import { getAllWash } from "../controllers/wash.controller";

const router = Router();

router.get("/wash/all", getAllWash);

export default router;
