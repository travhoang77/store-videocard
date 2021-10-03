import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { getCartSubtotal } from "../utils/utils";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../css/Cart.css";
import PriceSummary from "./PriceSummary";
import { TAX_RATE } from "../utils/constants";
import _ from "lodash";

function CartSummary({ cart }) {
  const [subtotal, setSubtotal] = useState();
  const [tax, setTax] = useState();

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
    const taxrate = TAX_RATE;
    const temp2 = temp1 * taxrate;

    if (!isNaN(temp1)) {
      setSubtotal(temp1);
      setTax(temp2);
    }
  }, [cart]);
  return (
    <div
      className="ml-4 cart-summary"
      style={{ width: "35%", height: "35rem" }}
    >
      <div className="ml-3 mr-3">
        {!_.isEmpty(cart) && (
          <PriceSummary title="Cart Total" subtotal={subtotal} tax={tax} />
        )}

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
