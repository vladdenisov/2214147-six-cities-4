import { RouteObject } from 'react-router-dom';
import { MainPage } from './pages/main/main.page';
import { LoginPage } from './pages/auth/login.page';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { OfferPage } from './pages/offer/offer.page';
import { PrivateRoute } from './components/private-route/PrivateRoute';
import { NotFountPage } from './pages/not-found/not-found.page';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/favorites',
    element: (
      <PrivateRoute>
        <FavoritesPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/offer/:id',
    element: <OfferPage />,
  },
  {
    path: '*',
    element: <NotFountPage />,
  },
];
