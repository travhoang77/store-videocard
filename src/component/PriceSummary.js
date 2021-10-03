import React, { Component } from "react";

export default class PriceSummary extends Component {
  render() {
    const subtotal = parseFloat(this.props.subtotal);
    const tax = parseFloat(this.props.tax);
    const shipping = this.props.shipping ? parseFloat(this.props.shipping) : 0;

    const total = subtotal + tax + shipping;
    return (
      <>
        <div className="d-flex justify-content-center border-dark border-bottom">
          <h5 className="mt-2 font-weight-bold">{this.props.title}</h5>
        </div>
        <div>
          <span>
            <small>Original Price</small>
            <small className="float-right">${subtotal.toFixed(2)}</small>
          </span>
        </div>
        <div>
          <span>
            <small>Shipping</small>
            <small className="float-right">
              {this.props.shipping === undefined && "TBD"}
              {parseInt(this.props.shipping) === 0 && "FREE"}
              {shipping > 0 && `$` + shipping.toFixed(2)}
            </small>
          </span>
        </div>
        <div className="border-dark border-bottom">
          <span>
            <small>Sales Tax</small>
            <small className="float-right">${tax.toFixed(2)}</small>
          </span>
        </div>
        <div>
          <span>
            <span>Total</span>
            <span className="float-right">${total.toFixed(2)}</span>
          </span>
        </div>
      </>
    );
  }
}
