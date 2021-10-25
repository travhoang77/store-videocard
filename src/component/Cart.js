import React, { useState } from "react";
import { connect } from "react-redux";
import { removeFromCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import store from "../redux/store";
import { CART_LIMIT } from "../utils/constants";
import { useMediaQuery } from "../utils/useMediaQuery";

import "../css/Cart.css";

function Cart({ cart }) {
  const [width] = useMediaQuery();
  const componentheightInRem = (width) => {
    return ((width * 0.269) / 16).toString() + "rem";
  };
  const empty = "Your cart is empty";
  const [carttext, setcarttext] = useState(cart.length > 0 ? "Cart" : empty);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
    const currentstate = store.getState();
    if (currentstate.cart.cart.length === 0) setcarttext(empty);
  };

  return (
    <div
      className="cart-main"
      style={{ minHeight: componentheightInRem(width) }}
    >
      <div style={{ width: "100%", height: "5rem" }}>
        <h4>{carttext}</h4>
        <div className="border-dark mb-10 border-bottom"></div>
      </div>
      <div className="d-flex flex-row" style={{ width: "100%" }}>
        <div style={{ width: "65%" }}>
          {cart.length === 0 && (
            <div class="container-fluid mt-100">
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-header">
                      <h5>Cart</h5>
                    </div>
                    <div class="card-body cart">
                      <div class="col-sm-12 empty-cart-cls text-center">
                        {" "}
                        <img
                          src="https://i.imgur.com/dCdflKN.png"
                          width="130"
                          height="130"
                          class="img-fluid mb-4 mr-3"
                          alt="CartIcon"
                        />
                        <h3>
                          <strong>Your Cart is Empty</strong>
                        </h3>
                        <h4>Add something to make me happy :)</h4>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {cart.map((item) => (
            <CartItem
              key={item.id}
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
