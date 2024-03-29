import { OfferDetails } from '../types';
import { TMP_OFFERS_WITH_DETAILS } from './offers';

export const getOfferDetails = (id: string): OfferDetails | undefined =>
  TMP_OFFERS_WITH_DETAILS.find((offer) => offer.id === id);
