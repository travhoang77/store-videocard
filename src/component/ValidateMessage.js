import React from "react";
import "../css/ValidateMessage.css";

function ValidateMessage(props) {
  let classes = display(props);
  return (
    <span className={classes}>
      <span className="font-italic">&#10071;</span>
      {props.message}
    </span>
  );
}

function display(props) {
  return props.message ? "input-warning" : "d-none input-warning";
}

export default ValidateMessage;
