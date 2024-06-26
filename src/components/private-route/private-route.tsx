import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, ROUTE_PATHS } from '../../const';
import { useAppSelector } from '../../store/helpers';
import { selectAuthorizationStatus } from '../../store/user/user.store';

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const authStatus = useAppSelector(selectAuthorizationStatus);

  if (authStatus === AuthorizationStatus.LOADING) {
    return null;
  }

  if (authStatus !== AuthorizationStatus.LOGGINED) {
    return <Navigate to={ROUTE_PATHS.LOGIN} />;
  }

  return children;
};
