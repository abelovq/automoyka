import { Router } from "express";
import {
  getAllWash,
  getWashTimes,
  bookWash,
  getFilters,
} from "../controllers/wash.controller";

const router = Router();

router.get("/wash/all", getAllWash);
router.post("/wash/filter", getFilters);
router.get("/wash/:id/times", getWashTimes);
router.post("/wash/:id/book", bookWash);

export default router;
