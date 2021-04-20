// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./component/Login";
import Register from "./component/Register";
import ProductCard from "./component/ProductCard";

class App extends Component {
  render(props) {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/test">
              <ProductCard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Header />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
