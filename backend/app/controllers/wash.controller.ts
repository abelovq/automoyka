import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpExceptions";
import washService from "../services/wash.service";
export const getAllWash = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allwash = await washService.getAll().catch((e) => next(e));
    res.json(allwash);
  } catch (e) {
    console.log(e);
    res.send({ message: "Error fuck you" });
  }
};
