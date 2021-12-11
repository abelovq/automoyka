import { Busy_boxes } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpExceptions";
import boxService from "../services/box.service";
import washService from "../services/wash.service";

export const bookWash = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { time, num_box, num_car } = req.body;
    const bookTime = new Date(time);

    const boxData = {
      client_id: 1,
      wash_id: Number(id),
      time_start: bookTime,
      num_box: Number(num_box),
      num_car,
    };

    const bookWosh = await boxService.createBusyBox(boxData);

    // await washService.getFreeTimesOfWashBayId(Number(id));
    res.json(bookWosh);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getAllWash = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allwash = await washService.getAll();
    res.json(allwash);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getFilters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { position, filters } = req.body;

  if (filters[0] === "NEAR" && filters.length === 1) {
    try {
      const nearestWash = await washService
        .getNearest(position)
        .catch((e) => next(e));
      res.json(nearestWash);
    } catch (e) {
      console.log(e);
      res.send({ message: "Request error" });
    }
  } else {
    try {
      const filtersWash = await washService.getFilters(filters, position);
      res.json(filtersWash);
    } catch (e) {
      console.log(e);
      res.send({ message: "Request error" });
    }
  }
};

export const getWashTimes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const result = await washService.getFreeTimesOfWashBayId(Number(id));

  res.send(result);
};
