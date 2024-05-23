import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { RatingForm } from '../RatingForm/RatingForm';
import { Comment } from '../../types';
import {
  MAX_RATING,
  MIN_REVIEW_LENGTH,
  RATING_TITLES,
  MAX_REVIEW_LENGTH,
} from '../../const';

interface SendCommentFormProps {
  onSend: (comment: Comment) => void;
}

export const SendCommentForm: FC<SendCommentFormProps> = ({onSend}) => {
  const [comment, setComment] = useState<Comment>({
    rating: 0,
    comment: '',
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
      comment.rating === 0 || comment.comment.length < MIN_REVIEW_LENGTH
    );
  }, [comment.rating, comment.comment]);

  const handleFormSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSend(comment);
    setComment((prev) => ({...prev, comment: ''}));
  }, [comment, onSend]);

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
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onChange}
        maxLength={MAX_REVIEW_LENGTH}
        value={comment.comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_REVIEW_LENGTH} characters{' '}
            {MIN_REVIEW_LENGTH - comment.comment.length > 0 &&
              `(${MIN_REVIEW_LENGTH - comment.comment.length} left)`}
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
