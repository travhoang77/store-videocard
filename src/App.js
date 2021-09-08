// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import Header from "./Header";
import Login from "./component/Login";
import Register from "./component/Register";
import ProductDescription from "./component/ProductDescription";
import ProductNav from "./component/ProductNav";
import AccountNav from "./component/AccountNav";
import BreadCrumbs from "./component/Breadcrumbs";
import Products from "./Products";
import FourZeroFour from "./FourZeroFour";
import PasswordChange from "./component/PasswordChange";
import AddressCreate from "./component/AddressCreate";
import AddressEdit from "./component/AddressEdit";
import Addresses from "./component/Addresses";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Switch>
            <Route path="/test"></Route>

            <Route path="/test"></Route>
            <ProtectedRoute path="/account/addresses/create" redirectTo="/404">
              <AccountNav />
              <BreadCrumbs />
              <AddressCreate />
            </ProtectedRoute>
            <ProtectedRoute
              path="/account/addresses/update/:addressid"
              redirectTo="/404"
            >
              <AccountNav />
              <BreadCrumbs />
              <AddressEdit />
            </ProtectedRoute>
            <ProtectedRoute path="/account/addresses" redirectTo="/404">
              <AccountNav />
              <BreadCrumbs />
              <Addresses maximum={10} />
            </ProtectedRoute>
            <ProtectedRoute path="/account/passwordchange" redirectTo="/404">
              <AccountNav />
              <BreadCrumbs />
              <PasswordChange />
            </ProtectedRoute>
            <ProtectedRoute path="/account" redirectTo="/404">
              <AccountNav />
              <BreadCrumbs />
              {/* <Profile/> */}
            </ProtectedRoute>

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
            <Route path="/404">
              <ProductNav />
              <FourZeroFour />
            </Route>
            <Route exact path="/">
              <ProductNav />
              <BreadCrumbs />
              <p>Future Landing Page</p>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
