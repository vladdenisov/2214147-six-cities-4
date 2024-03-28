import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { IS_AUTHENTICATED } from '../../mocks/user';

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  if (!IS_AUTHENTICATED) {
    return <Navigate to={'/login'} />;
  }

  return children;
};
