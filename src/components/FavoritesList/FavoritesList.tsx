import { FC, useCallback } from 'react';
import { Offer } from '../../types';
import { Card } from '../Card/Card';
import { useAppDispatch } from '../../store/helpers';
import { changeOfferFavoriteStatus } from '../../store/action';
import { changeSpecificOfferFavoriteStatus } from '../../store/offers/offers.store';

interface FavoritesListProps {
  offers: Offer[];
}

export const FavoritesList: FC<FavoritesListProps> = ({ offers }) => {
  const places = offers
    .map((offer) => offer.city.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const dispatch = useAppDispatch();

  const onFavoriteClick = useCallback((id: string) => {
    dispatch(changeOfferFavoriteStatus({id, status: false})).then(() => {
      dispatch(changeSpecificOfferFavoriteStatus({id, status: false}));
    });
  }, [dispatch]);

  return (
    <div className="favorites__list">
      {places.map((place) => {
        const filteredOffers = offers.filter(
          (offer) => offer.city.name === place
        );
        return (
          <li className="favorites__locations-items" key={place}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{place}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {filteredOffers.map((offer) => (
                <Card key={offer.id} {...offer} prefix={'favorites'} onFavoriteClick={onFavoriteClick} />
              ))}
            </div>
          </li>
        );
      })}
    </div>
  );
};
