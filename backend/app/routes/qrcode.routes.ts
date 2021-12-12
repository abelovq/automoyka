import { Router } from "express";
import { createQr } from "../controllers/qrcode.controller";
const router = Router();
router.post("/qr", createQr);
export default router;
