import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { useMediaQuery } from "./utils/useMediaQuery";
import "./css/FourZeroFour.css";
import { Button } from "react-bootstrap";

function Error(props) {
  const { pathname } = useLocation();
  const history = useHistory();
  const [width] = useMediaQuery();
  const componentheightInRem = (width) => {
    return ((width * 0.269) / 16).toString() + "rem";
  };

  return (
    <div
      class="row justify-content-center"
      style={{ height: componentheightInRem(width) }}
    >
      <div class="col-md-12 col-sm-12">
        <div class="card shadow-lg border-0 rounded-lg mt-5 mx-auto">
          <h3 class="display-1 text-muted text-center">{props.status}</h3>

          <span class="card-subtitle mb-2 text-muted text-center">
            {props.text}
          </span>

          <div class="card-body mx-auto">
            <a type="button" href="/" class="btn btn-primary">
              {" "}
              Back To Home{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
