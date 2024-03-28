import { FC } from 'react';
import { FavoritesList } from '../../components/FavoritesList/FavoritesList';
import { TMP_OFFERS } from '../../mocks/offers';

export const FavoritesPage: FC = () => (
  <div className="page">
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoritesList offers={TMP_OFFERS} />
        </section>
      </div>
    </main>
    <footer className="footer container">
      <a className="footer__logo-link" href="main.html">
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </a>
    </footer>
  </div>
);
