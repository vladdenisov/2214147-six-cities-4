export interface ILocation {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface City {
  name: string;
  location: ILocation;
}
