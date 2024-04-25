import { Offer, OfferDetails, Review } from '../types';
import useQuery from './useQuery';

interface useGetOfferDataParams {
  id: string;
}

interface useGetOfferDataResult {
  isLoading: boolean;
  offerData?: OfferDetails;
  reviewsData?: Review[];
  nearbyOffersData?: Offer[];
}

export const useGetOfferData = ({id}: useGetOfferDataParams): useGetOfferDataResult => {
  const {data: offerData, loading: isOfferLoading} = useQuery<OfferDetails>(`/offers/${id}`);
  const {data: reviewsData, loading: isReviewsLoading} = useQuery<Review[]>(`/comments/${id}`);
  const {data: nearbyOffersData, loading: isNearbyOffersLoading} = useQuery<Offer[]>(`/offers/${id}/nearby`);

  return {
    isLoading: isOfferLoading || isReviewsLoading || isNearbyOffersLoading,
    offerData,
    reviewsData,
    nearbyOffersData,
  };
};
