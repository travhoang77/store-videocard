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
import AddressEdit from "./component/AddressEdit";
import AddressCard from "./component/AddressCard";
import AddressAddressCard from "./component/AddAddressCard";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Switch>
            <Route path="/test">
              <AddressCard
                object={{
                  _id: "6124926d691b1912600ae80c",
                  firstname: "Bama",
                  lastname: "Hoang",
                  address: "2060 Nieman Road",
                  city: "San Jose",
                  zipcode: "95121",
                  state: "CA",
                  description: "Shipping",
                }}
              />

              <AddressAddressCard />
            </Route>

            <Route path="/test/address">
              <AddressEdit label="Primary" />
            </Route>

            <ProtectedRoute path="/account/passwordchange" redirectTo="/404">
              <AccountNav />
              <BreadCrumbs />
              <PasswordChange />
            </ProtectedRoute>
            <ProtectedRoute path="/account" redirectTo="404">
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
