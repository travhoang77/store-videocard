import React from "react";

import { useMediaQuery } from "./utils/useMediaQuery";
import "./css/FourZeroFour.css";

function Error(props) {
  const [width] = useMediaQuery();
  const componentheightInRem = (width) => {
    return ((width * 0.269) / 16).toString() + "rem";
  };

  const status = props.status ? props.status : "404";
  const text = props.text ? props.text : "Not Found";
  return (
    <div
      class="row justify-content-center"
      style={{ height: componentheightInRem(width) }}
    >
      <div class="col-md-12 col-sm-12">
        <div class="card shadow-lg border-0 rounded-lg mt-5 mx-auto">
          <h3 class="display-1 text-muted text-center">{status}</h3>

          <span class="card-subtitle mb-2 text-muted text-center">{text}</span>

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
