import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { getCartSubtotal } from "../utils/utils";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../css/Cart.css";

function CartSummary({ cart }) {
  const [subtotal, setSubtotal] = useState();
  const [tax, setTax] = useState();
  const [total, setTotal] = useState();

  const CartButton = useCallback(() => {
    return cart.length === 0 ? (
      <Link to="/">
        <Button variant="primary" size="lg">
          Continue Shopping
        </Button>
      </Link>
    ) : (
      <Link to="/checkout">
        <Button variant="primary" size="lg">
          Checkout
        </Button>
      </Link>
    );
  }, [cart]);

  useEffect(() => {
    const temp1 = getCartSubtotal(cart);
    const taxrate = 0.0825;
    const temp2 = (temp1 * taxrate).toFixed(2);
    const temp3 = (parseFloat(temp1) + parseFloat(temp2)).toFixed(2);
    if (!isNaN(temp1)) {
      setSubtotal(temp1);
      setTax(temp2);
      setTotal(temp3);
    }
  }, [cart]);
  return (
    <div
      className="ml-4 cart-summary"
      style={{ width: "35%", height: "30rem" }}
    >
      <div className="ml-3 mr-3">
        <div className="d-flex justify-content-center border-dark border-bottom">
          <h5 className="mt-2 font-weight-bold">Order Summary</h5>
        </div>
        <div>
          <span>
            <small>Original Price</small>
            <small className="float-right">${subtotal}</small>
          </span>
        </div>
        <div>
          <span>
            <small>Shipping</small>
            <small className="float-right">FREE</small>
          </span>
        </div>
        <div className="border-dark border-bottom">
          <span>
            <small>Sales Tax</small>
            <small className="float-right">${tax}</small>
          </span>
        </div>
        <div>
          <span>
            <span>Total</span>
            <span className="float-right">${total}</span>
          </span>
        </div>
        <div className="mt-4 d-flex justify-content-center">
          <CartButton />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(CartSummary);
