import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { login } from '../../store/action';
import { selectAuthorizationStatus } from '../../store/user/user.store';
import { AuthorizationStatus, CITIES_DATA, ROUTE_PATHS } from '../../const';
import { Link, Navigate, useSearchParams } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectAuthorizationStatus);

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = useCallback((evt: FormEvent) => {
    if (formData.email === '' || formData.password === '') {
      return;
    }
    evt.preventDefault();
    dispatch(login(formData));
  }, [formData, dispatch]);

  const [params] = useSearchParams();

  if (authStatus === AuthorizationStatus.LOGGINED) {
    const from = params.get('redirect') || ROUTE_PATHS.MAIN;
    return (
      <Navigate to={from} />
    );
  }

  const randomCity = CITIES_DATA[Math.floor(Math.random() * CITIES_DATA.length)];

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleFormChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleFormChange}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
              Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/${randomCity.name}`}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
