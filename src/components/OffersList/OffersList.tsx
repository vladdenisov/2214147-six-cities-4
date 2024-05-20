import { FC, useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { Point, Offer } from '../../types';
import classNames from 'classnames';
import { getCardClassName } from '../../utils/cardClassName';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { changeCity, selectCity, selectSortOption } from '../../store/offers/offers.store';
import { SortingForm } from '../Sorting/Sorting';
import { SortOptions } from '../../const';

interface OffersListProps {
  offers: Offer[];
  setActivePoint: (point?: Point) => void;
  points: Point[];
  prefix?: string;
}

export const OffersList: FC<OffersListProps> = ({ offers, setActivePoint, points, prefix = 'cities' }) => {

  const dispatch = useAppDispatch();

  const activeCity = useAppSelector(selectCity);

  const selectedSortOption = useAppSelector(selectSortOption);

  const [sortedOffers, setSortedOffers] = useState(offers);

  useEffect(() => {
    if (selectedSortOption) {
      setSortedOffers(offers.slice().sort((a, b) => {
        if (selectedSortOption === SortOptions.POPULAR) {
          return 0;
        }
        if (selectedSortOption === SortOptions.PRICE_LOW_TO_HIGH) {
          return a.price - b.price;
        }
        if (selectedSortOption === SortOptions.PRICE_HIGH_TO_LOW) {
          return b.price - a.price;
        }
        if (selectedSortOption === SortOptions.TOP_RATED) {
          return b.rating - a.rating;
        }
        return 0;
      }));
    }
  }, [offers, selectedSortOption]);


  const handleCardMouseEnter = (id: string) => {
    const point = points.find((p) => p.id === id);
    const city = offers.find((offer) => offer.id === id)?.city;
    if (city) {
      dispatch(changeCity(city));
    }
    if (point) {
      setActivePoint(point);
    }
  };

  const handleCardMouseLeave = () => {
    setActivePoint(undefined);
  };

  return (
    <section className={classNames(getCardClassName(prefix, 'places'), 'places')}>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offers?.length ?? 0} places to stay in {activeCity.name}
      </b>
      <SortingForm />
      <div
        className={classNames(getCardClassName(prefix, 'places-list'), 'places__list tabs__content')}
      >
        {sortedOffers.map((card) => (
          <Card
            prefix="cities"
            key={`card-${card.id}`}
            onMouseEnter={() => handleCardMouseEnter(card.id)}
            onMouseLeave={() => handleCardMouseLeave()}
            {...card}
          />
        ))}
      </div>
    </section>
  );
};
