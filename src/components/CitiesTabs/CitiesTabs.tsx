import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { selectCurrentCity } from '../../store/selectors';
import classNames from 'classnames';
import { changeCity } from '../../store/action';
import { Link } from 'react-router-dom';
import { City } from '../../types';

interface CitiesTabsProps {
  cities: City[];
}

export const CitiesTabs: FC<CitiesTabsProps> = ({cities}) => {
  const activeCity = useAppSelector(selectCurrentCity);
  const dispatch = useAppDispatch();

  const handleCityClick = useCallback((city: City) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) => (
              <li key={city.name} className="locations__item" onClick={() => handleCityClick(city)}>
                <Link className={classNames('locations__item-link tabs__item', city.name === activeCity.name && 'tabs__item--active')} to="#">
                  <span>{city.name}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
};
