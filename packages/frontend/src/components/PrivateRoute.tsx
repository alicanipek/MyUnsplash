import * as React from 'react';
import { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  redirectTo?: string;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) => (!isLoading ? (
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={rest.redirectTo ? rest.redirectTo : '/'}
          />
        )
      ) : (
        <>
          <div>Loading</div>
        </>
      ))}
    />
  );
}
