import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../css/AddressCard.css";

const change = () => {
  alert("change");
};

const remove = () => {
  alert("remove");
};

const setDefault = () => {
  alert("setDefault");
};

function AddressCard(props) {
  const unit = props.object.unit ? "text-uppercase lh" : "d-none";
  return (
    <Card
      className="address-card ml-2 shadow p-2 mb-4 bg-white rounded"
      id={props.object._Id}
    >
      <Card.Body className="p-0 mb-3">
        <Card.Title className="h6 mb-0 text-uppercase">
          {props.object.firstname}&nbsp;{props.object.lastname}
        </Card.Title>
        <div className="text-uppercase lh">
          <small>{props.object.address}</small>
        </div>
        <div className={unit}>
          <small>{props.object.address}</small>
        </div>
        <div className="text-uppercase lh">
          <small>
            {props.object.city}, {props.object.state} {props.object.zipcode}
          </small>
        </div>
      </Card.Body>
      <div className="address-card__default-banner">
        <span aria-hidden="true">default</span>
      </div>
      <div className="text-primary ">
        <span className="clickable" onClick={() => change()}>
          <small>Change</small>
        </span>
        <span className="ml-2 mr-2">|</span>
        <span className="clickable" onClick={() => remove()}>
          <small>Remove</small>
        </span>
        <span
          className="clickable float-right mr-2"
          onClick={() => setDefault()}
        >
          <small>Set Default</small>
        </span>
      </div>
    </Card>
  );
}

export default AddressCard;
