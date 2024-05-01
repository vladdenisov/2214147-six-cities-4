import { FC, useMemo, useState } from 'react';
import { Point } from '../../types';
import { OffersList } from '../../components/OffersList/OffersList';
import { CITIES_DATA } from '../../const';
import {Map} from '../../components/Map/Map';
import { CitiesTabs } from '../../components/CitiesTabs/CitiesTabs';
import { useAppSelector } from '../../store/helpers';
import { Spinner } from '../../components/Spinner/Spinner';
import { selectCity, selectOffersList, selectOffersLoadingStatus } from '../../store/offers/offers.store';

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
          <div className="cities__places-container container">
            <OffersList offers={offers ?? []} setActivePoint={setActivePoint}
              points={points}
            />
            {
              offers.length === 0 && (
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">
                      We could not find any property available at the moment in {activeCity.name}
                    </p>
                  </div>
                </section>
              )
            }
            <div className="cities__right-section">
              <Map city={activeCity} points={points} selectedPoint={activePoint} className='cities__map' />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
