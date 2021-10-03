import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "../css/CheckoutItem.css";

export default class CheckoutItem extends Component {
  remove = () => {
    this.props.handleDelete(this.props.object.id);
  };
  render() {
    const imgurl =
      this.props.object.image === undefined
        ? "nvidiageneric.jpg"
        : this.props.object.image;
    return (
      <>
        <div className="d-flex flex-row justify-content-center">
          <Image
            src={`/img/${imgurl}`}
            className="border-0"
            thumbnail
            style={{ height: "3.5rem" }}
          />
          <div style={{ width: "5.5rem", fontSize: "0.6rem" }}>
            {this.props.object.name}
          </div>
          <div className="d-flex flex-column ml-2">
            <div style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
              ${this.props.object.price}
            </div>
            <div style={{ fontSize: "0.7rem" }}>
              Qty: {this.props.object.qty}
            </div>
            <div
              className="clickable text-primary"
              style={{ fontSize: "0.7rem" }}
            >
              <span onClick={() => this.props.onAction(this.props.object.id)}>
                Remove
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
