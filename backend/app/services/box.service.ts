import { Busy_boxes } from "@prisma/client";
import HttpException from "../exceptions/HttpExceptions";
import prisma from "../prisma";
import WashService from "./wash.service";

class BoxService {
  constructor(private washService = WashService) {}
  async createBusyBox(
    boxData: Pick<
      Busy_boxes,
      "client_id" | "time_start" | "wash_id" | "num_box" | "num_car"
    >
  ): Promise<Busy_boxes | null> {
    const busyBoxesCount = await prisma.busy_boxes.findMany({
      where: {
        wash_id: boxData.wash_id,
      },
    });

    if (busyBoxesCount.length === 4)
      throw new HttpException(400, "Limit of box has been reached"); // TODO: change 4 to wish boxs_count
    if (busyBoxesCount.findIndex((b) => b.num_box === boxData.num_box) !== -1)
      throw new HttpException(400, "This box is busy");

    return await prisma.busy_boxes
      .create({
        data: boxData,
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Can't create box");
      });
  }

  async getBusyBoxesByWashId(wash_id: number): Promise<Busy_boxes[]> {
    return await prisma.busy_boxes.findMany({
      where: {
        wash_id,
      },
    });
  }
}

export default new BoxService();
