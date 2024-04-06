import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IS_AUTHENTICATED, TMP_USER } from '../../mocks/user';
import { ROUTE_PATHS } from '../../const';

export const Header: FC = () => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link" to={ROUTE_PATHS.MAIN}>
            <img
              className="header__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="81"
              height="41"
            />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {IS_AUTHENTICATED ? (
              <>
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={ROUTE_PATHS.FAVORITES}
                  >
                    <div
                      className="header__avatar-wrapper user__avatar-wrapper"
                      style={{
                        backgroundImage: `url(${TMP_USER.avatarUrl})`,
                        borderRadius: '50%',
                      }}
                    />
                    <span className="header__user-name user__name">
                      {TMP_USER.name}
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </>
            ) : (
              <Link
                className="header__nav-link header__nav-link--profile"
                to={ROUTE_PATHS.LOGIN}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__login">Sign in</span>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </div>
  </header>
);
