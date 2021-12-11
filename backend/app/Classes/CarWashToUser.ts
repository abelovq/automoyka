export class carWashToUser {
  id: number;
  distance: number;
  lat: number;
  lon: number;
  constructor(id: number, distance: number, lat: number, lon: number) {
    this.id = id;
    this.distance = distance;
    this.lat = lat;
    this.lon = lon;
  }
}
