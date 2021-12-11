import { Car_Wash } from ".prisma/client";
import HttpException from "../exceptions/HttpExceptions";
import prisma from "../prisma";
class WashServise {
  async getAll(): Promise<Car_Wash[]> {
    return await prisma.car_Wash.findMany().catch((err) => {
      console.log(err);
      throw new HttpException(400, "Cannot find any wash");
    });
  }
}
export default new WashServise();
