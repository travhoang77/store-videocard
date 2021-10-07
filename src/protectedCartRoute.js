import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isEmptyCart, isAuthenticated } from "./utils/utils";

export function ProtectedCartRoute({ children, redirectTo, ...rest }) {
  const authenticated = isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) => {
        return !isEmptyCart() && authenticated ? (
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
