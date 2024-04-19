import { RouteObject } from 'react-router-dom';
import { MainPage } from './pages/main/main.page';
import { LoginPage } from './pages/auth/login.page';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { OfferPage } from './pages/offer/offer.page';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { NotFountPage } from './pages/not-found/not-found.page';
import { MainLayout } from './layouts/MainLayout';
import { ROUTE_PATHS } from './const';

export const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.MAIN,
    element: (
      <MainLayout color="gray">
        <MainPage />,
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE_PATHS.FAVORITES,
    element: (
      <PrivateRoute>
        <MainLayout>
          <FavoritesPage />
        </MainLayout>
      </PrivateRoute>
    ),
  },
  {
    path: `${ROUTE_PATHS.OFFER}/:id`,
    element: (
      <MainLayout>
        <OfferPage />
      </MainLayout>
    ),
  },
  {
    path: '*',
    element: <NotFountPage />,
  },
];
