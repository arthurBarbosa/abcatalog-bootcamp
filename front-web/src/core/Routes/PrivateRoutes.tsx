import { isAuthentication } from 'core/utils/auth';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

type Props = {
  children:React.ReactNode;
  path: string;
}
const  PrivateRoute = ({ children, path }: Props) => {
    return (
    <Route
      path={path}
      render={({ location }) =>
        isAuthentication() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/admin/auth/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;