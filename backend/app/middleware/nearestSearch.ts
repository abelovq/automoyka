import { carWashToUser } from "../Classes/CarWashToUser";
import washService from "../services/wash.service";
const user = {
  lon: 38.92,
  lat: 47.21,
};
const carWash = washService.getAll();

export const getNearestCarWash = (user: any, carWashes: any) => {
  const userLat = user.lat;
  const userLon = user.lon;
  const allDistance = carWashes.map((wash: any) => {
    const distance = new carWashToUser(
      wash.id,
      getDistanceFromLatLonInKm(userLat, userLon, wash.lat, wash.lon),
      wash.lat,
      wash.lon
    );
    if (distance.distance <= 0) return null;
    return distance;
  });
  return allDistance;
};

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  if (distance <= 5) return distance;
  return 0;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
const test = getNearestCarWash(user, carWash);

console.log("distance", test);
