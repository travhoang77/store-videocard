// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Header from "./Header";
import Products from "./Products";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./Home";
import ProductCard from "./component/ProductCard";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [{ logginuser }, dispatch] = useStateValue();

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
          <Route path="/products">
            <Header />
            <Home />
          </Route>
          <Route path="/">
            <Header />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
