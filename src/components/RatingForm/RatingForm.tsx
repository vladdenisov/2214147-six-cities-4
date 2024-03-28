import { ChangeEvent, FC } from 'react';

interface RatingItemProps {
  value: number;
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RatingItem: FC<RatingItemProps> = ({ value, title, onChange }) => (
  <>
    <input
      className="form__rating-input visually-hidden"
      name="rating"
      value={value}
      id={`${value}-star`}
      type="radio"
      onChange={onChange}
    />
    <label
      htmlFor={`${value}-star`}
      className="reviews__rating-label form__rating-label"
      title={title}
    >
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </>
);

interface RatingFormProps {
  maxRating: number;
  titles: string[];
  onRatingChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const RatingForm: FC<RatingFormProps> = ({
  maxRating,
  titles,
  onRatingChange,
}) => (
  <div className="reviews__rating-form form__rating">
    {new Array(maxRating).fill(0).map((_, i) => (
      <RatingItem
        key={titles[maxRating - i - 1]}
        value={maxRating - i}
        title={titles[maxRating - i - 1]}
        onChange={onRatingChange}
      />
    ))}
  </div>
);
