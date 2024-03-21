import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const isAuth = true;

  if (!isAuth) {
    return <Navigate to={'/login'} />;
  }

  return children;
};
