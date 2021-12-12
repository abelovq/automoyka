import { NextFunction, Request, Response } from "express";
import boxService from "../services/box.service";

export const getBookedBoxes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, num_car } = req.query;

    const boxData = {
      num_car: !!num_car ? String(num_car).toLowerCase() : undefined,
      id: !!id ? Number(id) : undefined,
    };

    const bookedBoxes = await boxService.getBusyBoxes(boxData);

    res.json(bookedBoxes);
  } catch (error) {
    next(error);
  }
};

export const deleteBookedBox = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const bookedBoxes = await boxService.deleteBookedBox(Number(id));

    res.json({
      success: true,
      bookedBoxes,
    });
  } catch (error) {
    next(error);
  }
};
