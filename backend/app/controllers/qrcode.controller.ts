import { NextFunction, Request, Response } from "express";
import QrcodeService from "../services/qrcode.service";
import path from "path";
export const createQr = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const qrCode = await QrcodeService.generateQR(req.body);
    res.sendFile("qrcodes.png", { root: "." });
  } catch (e) {
    console.log(e);
  }
};
