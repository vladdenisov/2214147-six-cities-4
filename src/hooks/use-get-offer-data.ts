import { useEffect, useState } from 'react';
import { Offer, OfferDetails, Review } from '../types';
import useQuery from './use-query';

interface useGetOfferDataParams {
  id: string;
}

interface useGetOfferDataResult {
  isLoading: boolean;
  offerData?: OfferDetails;
  reviewsData?: Review[];
  nearbyOffersData?: Offer[];
  addReview: (data: Review) => void;
  changeOfferIsFavorite?: (nearbyOfferId: string, status: boolean) => void;
}

export const useGetOfferData = ({id}: useGetOfferDataParams): useGetOfferDataResult => {
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [nearbyOffersData, setNearbyOffersData] = useState<Offer[]>([]);

  const {data: offerData, loading: isOfferLoading} = useQuery<OfferDetails>(`/offers/${id}`);
  const {data: reviewsRawData, loading: isReviewsLoading} = useQuery<Review[]>(`/comments/${id}`);
  const {data: nearbyOffersRawData, loading: isNearbyOffersLoading} = useQuery<Offer[]>(`/offers/${id}/nearby`);

  useEffect(() => {
    if (reviewsRawData) {
      setReviewsData(reviewsRawData.splice(0, 10).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  }, [reviewsRawData]);

  useEffect(() => {
    if (nearbyOffersRawData) {
      setNearbyOffersData(nearbyOffersRawData);
    }
  }, [nearbyOffersRawData]);

  const addReview = (data: Review) => {
    setReviewsData((prev) => [...prev, data]);
  };

  const changeOfferIsFavorite = (nearbyOfferId: string, status: boolean) => {
    const offer = nearbyOffersData.find((item) => item.id === nearbyOfferId);
    if (offer) {
      offer.isFavorite = status;
    }
    setNearbyOffersData([...nearbyOffersData]);
  };
  return {
    isLoading: isOfferLoading || isReviewsLoading || isNearbyOffersLoading,
    offerData,
    reviewsData,
    nearbyOffersData,
    addReview,
    changeOfferIsFavorite,
  };
};
