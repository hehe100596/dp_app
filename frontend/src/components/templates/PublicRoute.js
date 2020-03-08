import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "../../utils/auth";

export function PublicRoute({ component: Component, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        auth.token ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
