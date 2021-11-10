export interface Seed {
  _id: string;
  name: string;
  time: number;
  min_pH: number;
  max_pH: number;
  min_red_light: number;
  max_red_light: number;
  min_blue_light: number;
  max_blue_light: number;
  min_humidity: number;
  max_humidity: number;
  min_temperature: number;
  max_temperature: number;
  image: string;
}
