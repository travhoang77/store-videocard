import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isEmptytCart } from "./utils/utils";

export function ProtectedCartRoute({ children, redirectTo, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !isEmptytCart() ? (
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
