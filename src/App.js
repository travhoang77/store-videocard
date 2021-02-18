// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
            <Header />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
