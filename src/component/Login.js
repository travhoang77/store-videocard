import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../css/Login.css";
import Logo from "../assets/logo.png";
import ValidateMessage from "./ValidateMessage";
import {
  emailLoginValidation,
  passwordLoginValidation,
} from "./validators/userValidator";
import { useDispatch } from "react-redux";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailmessage, setEmailMessage] = useState("");
  const [passwordmessage, setPasswordMessage] = useState("");

  const dispatch = useDispatch();

  const login = async (event) => {
    event.preventDefault();

    alert("login function called");
    const emailerror = await emailLoginValidation(email);
    const passworderror = passwordLoginValidation(password);

    emailerror ? setEmailMessage(emailerror) : setEmailMessage("");
    passworderror ? setPasswordMessage(passworderror) : setPasswordMessage("");

    if (emailerror || password) {
      return;
    }

    alert("--no validation errors->");
  };
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
        <Form onSubmit={login}>
          <h6>E-mail</h6>
          <input
            className="mb-0"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <ValidateMessage message={emailmessage} />
          <h6 className="mt-2">Password</h6>
          <input
            className="mb-0"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
          <ValidateMessage message={passwordmessage} />
          <br />
          <button onClick={login} type="submit" className="login-signInButton">
            Submit
          </button>
          <p>By signing-in, you agree to the Terms and Conditions</p>
          <Link to="/register">
            <button type="button" className="login-signInButton">
              Create your account
            </button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
