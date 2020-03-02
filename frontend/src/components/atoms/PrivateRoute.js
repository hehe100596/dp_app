import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../utils/auth";

export function PrivateRoute({ component: Component, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        auth.token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/sign-in" }} />
        )
      }
    />
  );
}
