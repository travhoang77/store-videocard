// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Products from "./Products";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./Home";
import ProductCard from "./component/ProductCard";

function App() {
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
