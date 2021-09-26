import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../css/User.css";
import Logo from "../assets/logo.png";
import { authenticate } from "../fetches/authFetch";
import ValidateMessage from "./ValidateMessage";
import {
  emailLoginValidation,
  passwordLoginValidation,
} from "./validators/userValidator";
import { setToken } from "../redux/actions/loginActions";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "../utils/useMediaQuery";

function Login() {
  const [width] = useMediaQuery();
  const componentheightInRem = (width) => {
    return ((width * 0.269) / 16).toString() + "rem";
  };
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailmessage, setEmailMessage] = useState("");
  const [passwordmessage, setPasswordMessage] = useState("");
  const [toggle, setToggle] = useState("d-none");
  const dispatch = useDispatch();

  const submit = async (event) => {
    event.preventDefault();
    setToggle("d-none");

    const emailerror = await emailLoginValidation(email);
    const passworderror = passwordLoginValidation(password);

    emailerror ? setEmailMessage(emailerror) : setEmailMessage("");
    passworderror ? setPasswordMessage(passworderror) : setPasswordMessage("");

    if (emailerror || passworderror) return;

    const result = await authenticate(email, password);

    if (!result.success) {
      setToggle("mb-2 error-container");
      return;
    } else {
      dispatch(setToken(result.token));
      history.push("/");
    }
  };

  return (
    <div className="user" style={{ minHeight: componentheightInRem(width) }}>
      <Link to="/">
        <img className="user-logo" src={Logo} alt="" />
      </Link>
      <div className={toggle}>
        <span>
          <span className="icon">&#9888;</span>Invalid email or password!
        </span>
      </div>
      <div className="user-container">
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
          <button onClick={submit} type="submit" className="user-button">
            Submit
          </button>
          <p>By signing-in, you agree to the Terms and Conditions</p>
          <Link to="/register">
            <button type="button" className="user-button">
              Create your account
            </button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
