import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { Provider } from 'react-redux';
import { store } from './store';

export const App: FC = () => {
  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
};
