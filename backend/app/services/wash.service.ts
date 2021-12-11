import { CarWashType, Car_Wash } from ".prisma/client";
import { getDistanceFromLatLonInKm } from "../middleware/nearestSearch";
import HttpException from "../exceptions/HttpExceptions";
import prisma from "../prisma";
import { CarWashToUser } from "../Classes/CarWashToUser";
import { type } from "os";
class WashServise {
  async getAll(): Promise<Car_Wash[]> {
    const res = await prisma.car_Wash.findMany().catch((err) => {
      console.log(err);
      throw new HttpException(400, "Cannot find any wash");
    });

    return res;
  }
  async getNearest(user: number[]) {
    const [lat, lon] = user;
    const allWash = await prisma.car_Wash.findMany();
    const getNearestCarWash = () => {
      const nearestWash = allWash.map((wash: Car_Wash) => {
        const [washLat, washLon] = wash.coordinates;
        const nearestWash = new CarWashToUser(
          wash.id,
          getDistanceFromLatLonInKm(lat, lon, washLat, washLon),
          wash.adress,
          wash.name,
          wash.review_score,
          wash.image_url,
          wash.coordinates
        );
        if (nearestWash.distance <= 0) return null;
        return nearestWash;
      });
      return nearestWash;
    };
    return getNearestCarWash();
  }

  async getFilters(filters: CarWashType[], user: number[]) {
    const [lat, lon] = user;
    console.log(filters);
    const groupedWash = await prisma.car_Wash.findMany({
      where: {
        type: {
          in: filters,
        },
      },
    });
    const getNearestCarWash = () => {
      const nearestWash = groupedWash.map((wash: Car_Wash) => {
        const [washLat, washLon] = wash.coordinates;
        const nearestWash = new CarWashToUser(
          wash.id,
          getDistanceFromLatLonInKm(lat, lon, washLat, washLon),
          wash.adress,
          wash.name,
          wash.review_score,
          wash.image_url,
          wash.coordinates
        );
        if (nearestWash.distance <= 0) return null;
        return nearestWash;
      });
      return nearestWash;
    };
    return getNearestCarWash();
  }
}
export default new WashServise();
