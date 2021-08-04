import React from "react";
import { useLocation } from "react-router-dom";

function FourZeroFour() {
  const { pathname } = useLocation();

  return (
    <h4>
      404 for <code>{pathname}</code>
    </h4>
  );
}

export default FourZeroFour;
