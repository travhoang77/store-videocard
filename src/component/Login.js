import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import "../css/Login.css";
import Logo from "../assets/logo.png";

function Login() {
  const history = useHistory();
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");

  //   const loginuser = (event) => {
  //     event.preventDefault();
  //     auth
  //       .signInWithEmailAndPassword(useremail, userpassword)
  //       .then((auth) => {
  //         history.push("/");
  //       })
  //       .catch((e) => alert(e.message));
  //   };

  //   const signupuser = (event) => {
  //     event.preventDefault();
  //     auth
  //       .createUserWithEmailAndPassword(useremail, userpassword)
  //       .then((auth) => {
  //         history.push("/");
  //       })
  //       .catch((e) => alert(e.message));
  //   };

  return (
    <div className="login">
      <Link to="/">
        <img className="login-logo" src={Logo} alt="" />
      </Link>
      <div className="login-container">
        <h3>Sign In</h3>
        <Form>
          <h6>E-mail</h6>
          <input
            value={useremail}
            onChange={(event) => setUserEmail(event.target.value)}
            type="email"
          />
          <h6>Password</h6>
          <input
            value={userpassword}
            n
            onChange={(event) => setUserPassword(event.target.value)}
            type="password"
          />
          <button
            // onClick={loginuser}
            type="submit"
            className="login-signInButton"
          >
            Submit
          </button>
          <p>By signing-in, you agree to the Terms and Conditions</p>
          <Link to="/register">
            <button type="submit" className="login-signInButton">
              Create your account
            </button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
