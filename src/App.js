// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import Header from "./Header";
import Footer from "./Footer";
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
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";
import Landing from "./component/Landing";
import EmptyNav from "./component/EmptyNav";
import { ADDRESS_MAXIMUM } from "./utils/constants";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/cart">
              <Header />
              <ProductNav />
              <BreadCrumbs />
              <Cart />
            </Route>
            <Route path="/login">
              <Header />
              <ProductNav />
              <BreadCrumbs />
              <Login />
            </Route>
            <Route path="/register">
              <Header />
              <ProductNav />
              <BreadCrumbs />
              <Register />
            </Route>
            <Route path="/product/:id">
              <Header />
              <ProductNav />
              <BreadCrumbs />
              <ProductDescription />
            </Route>
            <Route path="/products/:type">
              <Header />
              <ProductNav />
              <BreadCrumbs />
              <Products />
            </Route>
            <Route exact path="/404">
              <Header />
              <ProductNav />
              <FourZeroFour />
            </Route>
            <Route exact path="/">
              <Header />
              <ProductNav />
              <BreadCrumbs />
              <Landing />
            </Route>
            <ProtectedRoute path="/account/addresses/create" redirectTo="/404">
              <Header />
              <AccountNav />
              <BreadCrumbs />
              <AddressCreate />
            </ProtectedRoute>
            <ProtectedRoute
              path="/account/addresses/update/:addressid"
              redirectTo="/404"
            >
              <Header />
              <AccountNav />
              <BreadCrumbs />
              <AddressEdit />
            </ProtectedRoute>
            <ProtectedRoute path="/account/addresses" redirectTo="/404">
              <Header />
              <AccountNav />
              <BreadCrumbs />
              <Addresses maximum={ADDRESS_MAXIMUM} />
            </ProtectedRoute>
            <ProtectedRoute path="/account/passwordchange" redirectTo="/404">
              <Header />
              <AccountNav />
              <BreadCrumbs />
              <PasswordChange />
            </ProtectedRoute>
            <ProtectedRoute path="/account" redirectTo="/404">
              <Header />
              <AccountNav />
              <BreadCrumbs />
              {/* <Profile/> */}
            </ProtectedRoute>
            <Route path="/checkout">
              <EmptyNav />
              <Checkout />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
