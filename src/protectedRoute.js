import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./utils/utils";

export function ProtectedRoute({ children, redirectTo, ...rest }) {
  const authenticated = isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) => {
        return authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: {
                referrer: props.location,
              },
            }}
          />
        );
      }}
    />
  );
}
