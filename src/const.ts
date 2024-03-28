import { City } from './types';

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
