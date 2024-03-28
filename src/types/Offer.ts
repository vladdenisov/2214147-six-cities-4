import { ILocation } from './Location';

export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: {
    name: string;
    location: ILocation;
  };
  location: ILocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export interface OfferDetails extends Omit<Offer, 'previewImage'> {
  images: string[];
  description: string;
  goods: string[];
  host: {
    avatarUrl: string;
    isPro: boolean;
    name: string;
  };
  bedrooms: number;
  maxAdults: number;
}
