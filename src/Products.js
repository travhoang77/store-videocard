import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/Products.css";

function Products(pros) {
  return (
    <Router>
      <div className="product">
        <Switch>
          <Route path="/">
            <p>Hello Products</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Products;
