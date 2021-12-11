import { CarWashType, Car_Wash } from ".prisma/client";
import { getNearestCarWash } from "../middleware/nearestSearch";
import HttpException from "../exceptions/HttpExceptions";
import prisma from "../prisma";

class WashServise {
  async getAll(): Promise<Car_Wash[]> {
    const res = await prisma.car_Wash.findMany().catch((err) => {
      console.log(err);
      throw new HttpException(400, "Cannot find any wash");
    });

    return res;
  }
  async getNearest(user: number[]) {
    const allWash = await prisma.car_Wash.findMany();
    const res = getNearestCarWash(allWash, user);
    return res;
  }

  async getFilters(filters: string[], user: number[]) {
    if (filters.includes("NEAR")) {
      const filtersWithOutNear = filters.filter((i: string) => {
        return i !== "NEAR";
      });
      const groupedWash = await prisma.car_Wash.findMany({
        where: {
          type: {
            in: filtersWithOutNear as CarWashType[],
          },
        },
      });
      const res = getNearestCarWash(groupedWash, user);
      return res;
    } else {
      const groupedWash = await prisma.car_Wash.findMany({
        where: {
          type: {
            in: filters as CarWashType[],
          },
        },
      });
      return groupedWash;
    }
  }
}
export default new WashServise();
