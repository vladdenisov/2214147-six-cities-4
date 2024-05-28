import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from './components/private-route/private-route';
import { MainLayout } from './layouts/main-layout';
import { ROUTE_PATHS } from './const';
import { FavoritesPage, LoginPage, MainPage, OfferPage, NotFountPage } from './pages';

export const routes: RouteObject[] = [
  {
    path: `${ROUTE_PATHS.MAIN}/:city?`,
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
