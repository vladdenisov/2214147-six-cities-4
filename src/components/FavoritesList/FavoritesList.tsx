import { FC } from 'react';
import { Offer } from '../../types/Offer';
import { Card } from '../Card/Card';

interface FavoritesListProps {
  offers: Offer[];
}

export const FavoritesList: FC<FavoritesListProps> = ({ offers }) => {
  const places = offers
    .map((offer) => offer.city.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="favorites__list">
      {places.map((place) => {
        const filteredOffers = offers.filter(
          (offer) => offer.city.name === place
        );
        return (
          <>
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{place}</span>
                  </a>
                </div>
              </div>
            </li>
            {filteredOffers.map((offer) => (
              <Card key={offer.id} {...offer} isFavoritesCard />
            ))}
          </>
        );
      })}
    </div>
  );
};
