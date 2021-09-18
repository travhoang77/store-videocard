import React, { useState } from "react";
import { connect } from "react-redux";
import { removeFromCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import store from "../redux/store";
import { CART_LIMIT } from "../utils/constants";

import "../css/Cart.css";

function Cart({ cart }) {
  const empty = "Your cart is empty";
  const [carttext, setcarttext] = useState(cart.length > 0 ? "Cart" : empty);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
    const currentstate = store.getState();
    if (currentstate.cart.cart.length === 0) setcarttext(empty);
  };

  return (
    <div className="cart-main">
      <div style={{ width: "100%", height: "5rem" }}>
        <h4>{carttext}</h4>
        <div className="border-dark mb-10 border-bottom"></div>
      </div>
      <div className="d-flex flex-row" style={{ width: "100%" }}>
        <div style={{ width: "65%" }}>
          {cart.map((item) => (
            <CartItem
              object={item}
              maximum={CART_LIMIT}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(Cart);
