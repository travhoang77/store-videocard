import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import "../css/Login.css";
import Logo from "../assets/logo.png";

function Register() {
  const history = useHistory();
  const [useremail, setUserName] = useState("");
  const [username, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [confirmpassword, confirmUserPassword] = useState("");
  return (
    <div className="login">
      <Link to="/">
        <img className="login-logo" src={Logo} alt="" />
      </Link>
      <div className="login-container">
        <h3>Create account</h3>
        <Form>
          <h6>Your name</h6>
          <input
            value={username}
            // onChange={(event) => setUserEmail(event.target.value)}
            type="text"
          />
          <h6>Email</h6>
          <input
            value={useremail}
            // onChange={(event) => setUserPassword(event.target.value)}
            type="email"
          />
          <h6>Password</h6>
          <input
            value={userpassword}
            n
            // onChange={(event) => setUserPassword(event.target.value)}
            type="password"
          />
          <h6>Confirm Password</h6>
          <input
            value={confirmpassword}
            // onChange={(event) => setUserPassword(event.target.value)}
            type="password"
          />
          <p>By signing up, you agree to the Terms and Conditions</p>
          <button
            // onClick={loginuser}
            type="submit"
            className="login-signInButton"
          >
            Create your account
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
