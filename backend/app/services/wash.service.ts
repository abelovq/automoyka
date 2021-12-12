import { CarWashType, Car_Wash, Busy_boxes } from ".prisma/client";
import { getNearestCarWash } from "../middleware/nearestSearch";
import HttpException from "../exceptions/HttpExceptions";
import { addMinutes, getTodayDateWithTime, getNow } from "../helpers/date";
import prisma from "../prisma";
import { CarWashToUser } from "../Classes/CarWashToUser";

type WashWithBoxes = Car_Wash & {
  busy_boxes: Busy_boxes[];
};

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
    return res.filter((i: CarWashToUser | null) => {
      return i != null;
    });
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
      return res.filter((i: any) => {
        return i != null;
      });
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

  async getWashById(id: number): Promise<Car_Wash | null> {
    return await prisma.car_Wash
      .findFirst({
        where: {
          id,
        },

        include: {
          busy_boxes: {
            where: {
              time_start: {
                gte: getNow(),
              },
            },
            select: {
              time_start: true,
              num_box: true,
            },
          },
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot find any wash");
      });
  }

  async getFreeTimesOfWashBayId(wash_Id: number) {
    const wash = (await this.getWashById(wash_Id)) as WashWithBoxes;
    if (!wash) throw new HttpException(404, "Cannot find any wash");

    const busyBoxes = wash.busy_boxes;
    const times = this.genereateTimes(wash.duration);

    const box_times = new Array(wash.boxs_count)
      .fill(1)
      .reduce((prev, cur, index) => {
        const numOfBox = index + 1;
        const busy_time = busyBoxes
          .filter((v) => v.num_box === numOfBox)
          .map((b) => b.time_start);

        if (!busy_time.length)
          return {
            ...prev,
            [String(numOfBox)]: times,
          };
        return {
          ...prev,
          [String(numOfBox)]: times.filter((time) => {
            return !busyBoxes.filter(
              (b) => b.time_start.valueOf() == time.valueOf()
            ).length;
          }),
        };
      }, {});

    return box_times;
  }

  private genereateTimes(duration: number) {
    const timesOfWash = [];
    let curTime = getTodayDateWithTime(8, 0);
    const endTime = getTodayDateWithTime(20, 0);

    while (curTime.valueOf() < endTime.valueOf()) {
      timesOfWash.push(curTime);
      curTime = addMinutes(curTime, duration);
    }

    return timesOfWash.filter((t) => t.valueOf() > getNow().valueOf());
  }
}

export default new WashServise();
