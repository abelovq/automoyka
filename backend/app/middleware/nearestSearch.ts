import { Car_Wash } from ".prisma/client";
import { CarWashToUser } from "../Classes/CarWashToUser";
export const getNearestCarWash = (carWashes: Car_Wash[], user: number[]) => {
  const [lat, lon] = user;
  const nearestWash = carWashes.map((wash: Car_Wash) => {
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
function getDistanceFromLatLonInKm(
  userLat: number,
  userLon: number,
  washLat: number,
  washLon: number
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(washLat - userLat); // deg2rad below
  const dLon = deg2rad(washLon - userLon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(userLat)) *
      Math.cos(deg2rad(washLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  if (distance <= 2) return distance;
  return 0;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
