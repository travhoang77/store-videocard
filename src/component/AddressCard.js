import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../css/AddressCard.css";
import _ from "lodash";

function AddressCard(props) {
  const change = () => {
    alert(`change ${props.object._id}`);
  };

  const remove = () => {
    alert("remove");
  };

  const setDefault = () => {
    alert("setDefault");
  };

  const bar =
    _.isEqual(props.type, "shipping") ||
    _.isEqual(props.type, "shippingdefault")
      ? "ml-2 mr-2"
      : "d-none";
  const removestyle =
    _.isEqual(props.type, "shipping") ||
    _.isEqual(props.type, "shippingdefault")
      ? "clickable"
      : "d-none";
  const shippingdefault = _.isEqual(props.type, "shippingdefault")
    ? "address-card__default-banner"
    : "d-none";

  const clickshippingdefault =
    _.isEqual(props.type, "primary") || _.isEqual(props.type, "shippingdefault")
      ? "d-none"
      : "clickable float-right mr-2";
  const unit = props.object.unit ? "text-uppercase lh" : "d-none";

  return (
    <Card
      className="address-card shadow p-2 mb-4 bg-white rounded"
      id={props.object._id}
    >
      <Card.Body className="p-0 mb-3">
        <Card.Title className="h6 mb-0 text-uppercase">
          {props.object.firstname}&nbsp;{props.object.lastname}
        </Card.Title>
        <div className="text-uppercase lh">
          <small>{props.object.address}</small>
        </div>
        <div className={unit}>
          <small>{props.object.unit}</small>
        </div>
        <div className="text-uppercase lh">
          <small>
            {props.object.city}, {props.object.state} {props.object.zipcode}
          </small>
        </div>
      </Card.Body>
      <div className={shippingdefault}>
        <span aria-hidden="true">default</span>
      </div>
      <div className="text-primary">
        <span className="clickable" onClick={() => change()}>
          <small>Change</small>
        </span>
        <span className={bar}>|</span>
        <span className={removestyle} onClick={() => remove()}>
          <small>Remove</small>
        </span>

        <span className={clickshippingdefault} onClick={() => setDefault()}>
          <small>Set Default</small>
        </span>
      </div>
    </Card>
  );
}

export default AddressCard;
