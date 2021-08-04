// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./component/Login";
import Register from "./component/Register";
import Counter from "./component/Counter";
import ProductDescription from "./component/ProductDescription";
import Products from "./Products";
import FourZeroFour from "./FourZeroFour";

class App extends Component {
  render(props) {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/test">
              <Counter />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/product/:id">
              <ProductDescription />
            </Route>
            <Route path="/products/:type">
              <Products />
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
