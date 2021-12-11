import { NextFunction, Request, Response } from "express";
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
    res.send({ message: "Request error" });
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
