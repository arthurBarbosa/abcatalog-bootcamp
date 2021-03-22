import { isAllowedByRole, isAuthentication, Role } from 'core/utils/auth';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  path: string;
  allowedRoutes?: Role[];
}
const PrivateRoute = ({ children, path, allowedRoutes }: Props) => {
  return (
    <Route
      path={path}
      render={({ location }) => {
        if (!isAuthentication()) {
          (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: location }
              }}
            />
          )
        } else if (isAuthentication() && !isAllowedByRole(allowedRoutes)) {
          return (
            <Redirect to={{ pathname: "/admin" }} />
          )
        }

        return children;
      }}
    />
  );
}

export default PrivateRoute;

