import { useState } from 'react';
import { SortOptions, SortOptionsTitles } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { changeSortOption, selectSortOption } from '../../store/offers/offers.store';
import { SortingItem } from './SortingItem';
import classNames from 'classnames';

export const SortingForm = () => {
  const sortOption = useAppSelector(selectSortOption);

  const dispatch = useAppDispatch();

  const [isOpened, setIsOpened] = useState(false);

  const handleSortOptionClick = () => {
    setIsOpened(!isOpened);
  };

  const selectOption = (option: SortOptions) => {
    setIsOpened(false);
    dispatch(changeSortOption(option));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortOptionClick}>
        {SortOptionsTitles[sortOption]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options places__options--custom', isOpened && 'places__options--opened')}>
        {
          Object.values(SortOptions).map((option) => (
            <SortingItem
              key={option}
              name={SortOptionsTitles[option]}
              isActive={sortOption === option}
              onClick={() => {
                selectOption(option);
              }}
            />
          ))
        }
      </ul>
    </form>
  );
};
