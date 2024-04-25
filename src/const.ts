import { City } from './types';

export const ROUTE_PATHS = {
  MAIN: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer',
};

export const MAX_RATING = 5;
export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 300;
export const RATING_TITLES = [
  'terribly',
  'badly',
  'not bad',
  'good',
  'perfect',
];

export const DEFAULT_CITY: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.38333,
    longitude: 4.9,
    zoom: 12,
  },
};

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';


export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const CITIES_DATA: City[] = [
  {
    'name': 'Paris',
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13
    }
  },
  {
    'name': 'Cologne',
    'location': {
      'latitude': 50.938361,
      'longitude': 6.959974,
      'zoom': 13
    }
  },
  {
    'name': 'Brussels',
    'location': {
      'latitude': 50.846557,
      'longitude': 4.351697,
      'zoom': 13
    }
  },
  {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.37454,
      'longitude': 4.897976,
      'zoom': 13
    }
  },
  {
    'name': 'Hamburg',
    'location': {
      'latitude': 53.550341,
      'longitude': 10.000654,
      'zoom': 13
    }
  },
  {
    'name': 'Dusseldorf',
    'location': {
      'latitude': 51.225402,
      'longitude': 6.776314,
      'zoom': 13
    }
  },
];

export enum APIRoute {

}
