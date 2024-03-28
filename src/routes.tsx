import { RouteObject } from 'react-router-dom';
import { MainPage } from './pages/main/main.page';
import { LoginPage } from './pages/auth/login.page';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { OfferPage } from './pages/offer/offer.page';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { NotFountPage } from './pages/not-found/not-found.page';
import { TMP_OFFERS } from './mocks/offers';
import { MainLayout } from './layouts/MainLayout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <MainLayout color="gray">
        <MainPage offers={TMP_OFFERS} />,
      </MainLayout>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/favorites',
    element: (
      <PrivateRoute>
        <MainLayout>
          <FavoritesPage />
        </MainLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/offer/:id',
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
