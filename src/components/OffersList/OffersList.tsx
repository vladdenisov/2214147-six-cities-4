import { FC, useMemo, useState } from 'react';
import { Card } from '../Card/Card';
import { City, Point, Offer } from '../../types';
import { DEFAULT_CITY } from '../../const';
import { Map } from '../Map/Map';

interface OffersListProps {
  offers: Offer[];
}

export const OffersList: FC<OffersListProps> = ({ offers }) => {
  const [activePoint, setActivePoint] = useState<Point>();
  const [activeCity, setActiveCity] = useState<City>(DEFAULT_CITY);

  const points = useMemo<Point[]>(
    () =>
      offers.map((offer) => ({
        id: offer.id,
        latitude: offer.location.latitude,
        longitude: offer.location.longitude,
        zoom: offer.location.zoom,
      })),
    [offers]
  );

  const handleCardMouseEnter = (id: string) => {
    const point = points.find((p) => p.id === id);
    const city = offers.find((offer) => offer.id === id)?.city;
    if (city) {
      setActiveCity(city);
    }
    if (point) {
      setActivePoint(point);
    }
  };

  const handleCardMouseLeave = () => {
    setActivePoint(undefined);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers?.length ?? 0} places to stay in Amsterdam
        </b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>
              Popular
            </li>
            <li className="places__option" tabIndex={0}>
              Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
              Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
              Top rated first
            </li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offers.map((card) => (
            <Card
              key={`card-${card.id}`}
              {...card}
              onMouseEnter={() => handleCardMouseEnter(card.id)}
              onMouseLeave={() => handleCardMouseLeave()}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map city={activeCity} points={points} selectedPoint={activePoint} />
      </div>
    </div>
  );
};
