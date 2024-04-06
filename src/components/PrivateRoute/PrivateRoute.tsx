import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { IS_AUTHENTICATED } from '../../mocks/user';
import { ROUTE_PATHS } from '../../const';

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  if (!IS_AUTHENTICATED) {
    return <Navigate to={ROUTE_PATHS.LOGIN} />;
  }

  return children;
};
