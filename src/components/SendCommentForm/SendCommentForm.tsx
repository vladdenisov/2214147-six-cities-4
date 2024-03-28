import { ChangeEvent, FC, useEffect, useState } from 'react';
import { RatingForm } from '../RatingForm/RatingForm';
import { Comment } from '../../types';
import {
  MAX_RATING,
  MIN_REVIEW_LENGTH,
  RATING_TITLES,
  MAX_REVIEW_LENGTH,
} from '../../const';

export const SendCommentForm: FC = () => {
  const [comment, setComment] = useState<Comment>({
    rating: 0,
    review: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name;
    const value = e.target.value;

    if (key === 'rating') {
      setComment({
        ...comment,
        [key]: Number(value),
      });
    } else {
      setComment({
        ...comment,
        [key]: String(value),
      });
    }
  };

  useEffect(() => {
    setIsButtonDisabled(
      comment.rating === 0 || comment.review.length < MIN_REVIEW_LENGTH
    );
  }, [comment.rating, comment.review]);

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <RatingForm
        maxRating={MAX_RATING}
        titles={RATING_TITLES}
        onRatingChange={onChange}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onChange}
        maxLength={MAX_REVIEW_LENGTH}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_REVIEW_LENGTH} characters{' '}
            {MIN_REVIEW_LENGTH - comment.review.length > 0 &&
              `(${MIN_REVIEW_LENGTH - comment.review.length} left)`}
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
          onClick={(e) => {
            e.preventDefault();
            // eslint-disable-next-line no-console
            console.info('sending', comment);
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
