import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpExceptions";
import userService from "../services/user.service";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(Number(id)).catch((err) => {
      next(err);
    });

    if (!user) {
      next(new HttpException(404, "User is not found"));
    } else {
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};


export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userBody = req.body;

    const createdUser = await userService.createUser(userBody).catch((err) => {
      next(err);
    });

    res.status(200).json(createdUser);
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userBody = {
      id: Number(id),
      ...req.body,
    };

    const updatedUser = await userService.updateUser(userBody).catch((err) => {
      next(err);
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedUser = await userService
      .deleteUser(Number(id))
      .catch((err) => {
        next(err);
      });

    if (deletedUser) {
      res.json({ success: true, deletedUser });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(500, "Something went wrong"));
  }
};
