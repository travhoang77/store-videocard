import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Counter from "./Counter";
import "../css/Cart.css";
function CartItem(props) {
  const remove = (event) => {
    event.preventDefault();
    alert("Remove");
  };
  return (
    <div className="cartitem d-flex flex-row shadow p-2 mb-4 bg-white rounded">
      <div className="">
        <Image src={props.imgUrl} style={{ maxHeight: "9rem" }} />
      </div>
      <div
        className="ml-3 my-auto"
        style={{ maxWidth: "9rem", fontSize: "0.9rem" }}
      >
        <Link to="/" className="text-primary">
          {props.title}
        </Link>
      </div>
      <div style={{ minWidth: "1rem" }}></div>
      <div className="my-auto">
        <Counter limit={1} />
      </div>
      <div className="ml-4 my-auto">
        <span className="text-primary">
          <small className="remove" onClick={(event) => remove(event)}>
            Remove
          </small>
        </span>
      </div>
      <div style={{ minWidth: "5rem" }}></div>
      <div className="ml-1 my-auto">
        <h6>{props.price}</h6>
      </div>
    </div>
  );
}

export default CartItem;
