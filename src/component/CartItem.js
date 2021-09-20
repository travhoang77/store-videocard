import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { adjustQty } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import "../css/Cart.css";
function CartItem(props) {
  const { id } = props.object;
  const [qty, setQty] = useState(props.object.qty);
  const [total, settotal] = useState(
    (props.object.qty * props.object.price).toFixed(2)
  );
  const imgurl =
    props.object.image === undefined ? "nvidiageneric.jpg" : props.object.image;

  const itemurl = `/product/${id}`;
  const dispatch = useDispatch();

  const updateQty = (value) => {
    dispatch(adjustQty(id, parseInt(value)));
    settotal((parseInt(value) * props.object.price).toFixed(2));
  };

  const validateqty = (event) => {
    event.preventDefault();
    const value = event.target.value;
    if (isNaN(value)) return;
    if (value === "0") return;
    if (value.length > 2) return;
    if (parseInt(value) > props.maximum) return;
    setQty(value);
  };

  const leavefocus = (event) => {
    event.preventDefault();
    const value = event.target.value;
    if (value === "") {
      setQty(props.object.qty);
      return;
    }
    updateQty(value);
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") updateQty(e.target.value);
  }

  return (
    <div className="cartitem d-flex flex-row shadow p-2 mb-4 bg-white rounded">
      <div>
        <Link to={itemurl}>
          <Image src={`/img/${imgurl}`} style={{ maxHeight: "9rem" }} />
        </Link>
      </div>
      <div
        className="ml-3 my-auto"
        style={{ maxWidth: "9rem", fontSize: "0.9rem" }}
      >
        <Link to={itemurl} className="text-primary">
          {props.object.name}
        </Link>
      </div>
      <div style={{ minWidth: "1rem" }}></div>

      <div className="ml-4 my-auto d-flex flex-column">
        <div className="d-flex justify-content-center">
          <input
            className="text-center"
            type="text"
            value={qty}
            style={{ maxWidth: "2rem" }}
            onChange={validateqty}
            onBlur={leavefocus}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="d-flex justify-content-center">
          <small>Max:{props.maximum}</small>
        </div>
      </div>
      <div className="ml-4 my-auto">
        <small
          className="ml-1 text-primary textlink"
          onClick={() => props.onDelete(props.object.id)}
        >
          Remove
        </small>
      </div>
      <div style={{ minWidth: "2rem" }}></div>
      <div className="ml-1 my-auto flex flex-column">
        <div>
          <h5 className="font-weight-bold d-flex justify-content-center">
            ${total}
          </h5>
        </div>
        {props.object.qty > 1 && (
          <div>
            <small className="d-flex justify-content-center">
              ${props.object.price} ea.
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
