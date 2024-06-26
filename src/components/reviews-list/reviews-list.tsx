import { FC } from 'react';
import { ReviewItem } from './reviews-item';
import { Review } from '../../types';

interface ReviewsListProps {
  reviews?: Review[];
}

export const ReviewsList: FC<ReviewsListProps> = ({reviews}) => {
  if (!reviews) {
    return null;
  } else {
    return (
      <>
        <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
        </h2>
        <ul className="reviews__list">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      </>
    );
  }
};
