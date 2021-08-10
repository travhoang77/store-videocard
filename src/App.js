// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./component/Login";
import Register from "./component/Register";
import ProductDescription from "./component/ProductDescription";
import ProductNav from "./component/ProductNav";
import AccountNav from "./component/AccountNav";
import BreadCrumbs from "./component/Breadcrumbs";
import Products from "./Products";
import FourZeroFour from "./FourZeroFour";
import PasswordReset from "./component/PasswordReset";

class App extends Component {
  render(props) {
    return (
      <Router>
        <div className="App">
          <Header />

          <Switch>
            <Route path="/test"></Route>
            <Route path="/account/resetpw">
              <AccountNav />
              <BreadCrumbs />
              <PasswordReset />
            </Route>
            <Route path="/account">
              <AccountNav />
              <BreadCrumbs />
              {/* <Profile/> */}
            </Route>

            <Route path="/login">
              <ProductNav />
              <BreadCrumbs />
              <Login />
            </Route>
            <Route path="/register">
              <ProductNav />
              <BreadCrumbs />
              <Register />
            </Route>
            <Route path="/product/:id">
              <ProductNav />
              <BreadCrumbs />
              <ProductDescription />
            </Route>
            <Route path="/products/:type">
              <ProductNav />
              <BreadCrumbs />
              <Products />
            </Route>
            <Route path="/">
              <ProductNav />
              <BreadCrumbs />
              <p>Future Landing Page</p>
            </Route>
            <Route path="*">
              <FourZeroFour />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
