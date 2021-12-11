import { Router } from "express";
import { getAllWash, getFilters } from "../controllers/wash.controller";

const router = Router();

router.get("/wash/all", getAllWash);
router.post("/wash/filter", getFilters);
export default router;
