import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../css/Login.css";
import Logo from "../assets/logo.png";
import { authenticate } from "../fetches/authFetch";
import ValidateMessage from "./ValidateMessage";
import {
  emailLoginValidation,
  passwordLoginValidation,
} from "./validators/userValidator";
import { storeToken } from "../actions/loginActions";
import { useStateValue } from "../StateProvider";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailmessage, setEmailMessage] = useState("");
  const [passwordmessage, setPasswordMessage] = useState("");
  const [toggle, setToggle] = useState("d-none");
  const [{ token }, dispatch] = useStateValue();

  const submit = async (event) => {
    event.preventDefault();
    setToggle("d-none");

    const emailerror = await emailLoginValidation(email);
    const passworderror = passwordLoginValidation(password);

    emailerror ? setEmailMessage(emailerror) : setEmailMessage("");
    passworderror ? setPasswordMessage(passworderror) : setPasswordMessage("");

    if (emailerror || passworderror) {
      return;
    }

    const result = await authenticate(email, password);

    if (!result.success) {
      setToggle("mb-2 error-container");
      return;
    } else {
      const token = storeToken(result.token);
      dispatch(token);
      history.push("/");
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login-logo" src={Logo} alt="" />
      </Link>
      <div className={toggle}>
        <span>
          <span className="icon">&#9888;</span>Invalid email or password!
        </span>
      </div>
      <div className="login-container">
        <h3>Sign In</h3>
        <Form onSubmit={submit}>
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
          <button onClick={submit} type="submit" className="login-signInButton">
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
