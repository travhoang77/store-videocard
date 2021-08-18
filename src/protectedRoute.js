import React from "react";
import _ from "lodash";
import { Redirect, Route } from "react-router-dom";

export function ProtectedRoute({ children, redirectTo, ...rest }) {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        return !_.isNull(token) ? (
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
