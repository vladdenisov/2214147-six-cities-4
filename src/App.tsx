import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { useAppDispatch } from './store/helpers';
import { fetchOffers } from './store/action';


export const App: FC = () => {
  const router = createBrowserRouter(routes);

  const dispatch = useAppDispatch();

  dispatch(fetchOffers());

  return (
    <RouterProvider router={router} />
  );
};
