import { FC, useEffect, useMemo, useState } from 'react';
import { Point } from '../../types';
import { OffersList } from '../../components/offers-list/offers-list';
import { CITIES_DATA } from '../../const';
import {Map} from '../../components/map/map';
import { CitiesTabs } from '../../components/cities-tabs/cities-tabs';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { Spinner } from '../../components/spinner/spinner';
import { changeCity, selectCity, selectOffersList, selectOffersLoadingStatus } from '../../store/offers/offers.store';
import { EmptyOffers } from '../../components/empty-offers/empty-offers';
import { useParams } from 'react-router-dom';

export const MainPage: FC = () => {
  const [activePoint, setActivePoint] = useState<Point>();

  const activeCity = useAppSelector(selectCity);

  const offers = useAppSelector(selectOffersList).filter((offer) => offer.city.name === activeCity.name);

  const points = useMemo<Point[]>(
    () =>
      offers?.map((offer) => ({
        id: offer.id,
        latitude: offer.location.latitude,
        longitude: offer.location.longitude,
        zoom: offer.location.zoom,
      })) ?? [],
    [offers]
  );

  const dispatch = useAppDispatch();

  const { city } = useParams();

  useEffect(() => {
    if (city) {
      const cityData = CITIES_DATA.find((item) => item.name === city);
      if (cityData) {
        dispatch(changeCity(cityData));
      }
    }
  }, [city, dispatch]);

  const isLoading = useAppSelector(selectOffersLoadingStatus);

  if (isLoading) {
    return <Spinner withPageWrapper />;
  }

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs cities={CITIES_DATA} />
        <div className="cities">
          {
            offers.length > 0 ? (
              <div className="cities__places-container container">
                <OffersList offers={offers ?? []} setActivePoint={setActivePoint}
                  points={points}
                />
                <div className="cities__right-section">
                  <Map city={activeCity} points={points} selectedPoint={activePoint} className='cities__map' />
                </div>
              </div>
            ) : (
              <EmptyOffers activeCityName={activeCity.name} />
            )
          }
        </div>
      </main>
    </div>
  );
};
