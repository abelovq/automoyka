export class CarWashToUser {
  id: number;
  distance: number;
  adress: string;
  name: string;
  review_score?: number | null;
  image_url?: string | null;
  coordinates: number[];

  constructor(
    id: number,
    distance: number,
    adress: string,
    name: string,
    review_score: number | null,
    image_url: string | null,
    coordinates: number[]
  ) {
    this.id = id;
    this.distance = distance;
    this.adress = adress;
    this.coordinates = coordinates;
    this.name = name;
    this.review_score = review_score;
    this.image_url = image_url;
  }
}
