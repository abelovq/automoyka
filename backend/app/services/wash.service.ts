import { CarWashType, Car_Wash, Busy_boxes } from ".prisma/client";
import { getNearestCarWash } from "../middleware/nearestSearch";
import HttpException from "../exceptions/HttpExceptions";
import { addMinutes, getTodayDateWithTime } from "../helpers/date";
import prisma from "../prisma";

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
    return res.filter((i: any) => {
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
                gte: getTodayDateWithTime(8, 0),
                lt: getTodayDateWithTime(20, 0),
              },
            },
            select: {
              time_start: true,
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

    const busyBoxes = wash.busy_boxes.map((b) => ({
      num_box: b.num_box,
      time_start: b.time_start,
    }));
    const times = this.genereateTimes(wash.duration);

    const box_times = new Array(wash.boxs_count)
      .fill(1)
      .reduce((prev, cur, index) => {
        const numOfBox = index + 1;
        console.log("numOfBox");
        return {
          ...cur,
          [numOfBox]: busyBoxes.find((v) => v.num_box === numOfBox),
        };
      }, {});

    console.log(box_times);
  }

  private genereateTimes(duration: number) {
    const timesOfWash = [];
    let curTime = getTodayDateWithTime(8, 0);
    const endTime = getTodayDateWithTime(20, 0);

    while (curTime.valueOf() < endTime.valueOf()) {
      timesOfWash.push(curTime);
      curTime = addMinutes(curTime, duration);
    }

    const nowTime = new Date();
    const nowUTC = getTodayDateWithTime(
      nowTime.getHours(),
      nowTime.getMinutes()
    );
    return timesOfWash.filter((t) => t.valueOf() > nowUTC.valueOf());
  }
}

export default new WashServise();
