import React from "react";
import { Card } from "react-bootstrap";
import "../css/AddressCard.css";

const add = () => {
  alert("add");
};

function AddAddressCard(props) {
  return (
    <Card className="add-address-card border border-primary d-flex">
      <div className="text-center my-auto" onClick={() => add()}>
        <span className="clickable-no-underline text-primary h3">+</span>
        <span className="clickable text-primary address-card-align">
          Add an Address
        </span>
      </div>
    </Card>
  );
}

export default AddAddressCard;
