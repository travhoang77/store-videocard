import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../css/User.css";
import Logo from "../assets/logo.png";
import ValidateMessage from "./ValidateMessage";
import {
  nameValidation,
  emailValidation,
  passwordValidation,
  confirmationValidation,
  passwordlength,
} from "./validators/userValidator";
import { create } from "../fetches/userFetch";
import { authenticate } from "../fetches/authFetch";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/actions/loginActions";
import { useMediaQuery } from "../utils/useMediaQuery";

function Register() {
  const [width] = useMediaQuery();
  const componentheightInRem = (width) => {
    return ((width * 0.269) / 16).toString() + "rem";
  };
  const history = useHistory();
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [namemessage, setNameMessage] = useState("");
  const [emailmessage, setEmailMessage] = useState("");
  const [passwordmessage, setPasswordMessage] = useState("");
  const [confirmationmessage, setConfirmationMessage] = useState("");
  const complexitymessage =
    "Password must have a uppercase, a lowercase, a number and a symbol";
  const dispatch = useDispatch();
  const signup = async (event) => {
    event.preventDefault();
    const nameerror = nameValidation(firstname);
    const emailerror = await emailValidation(email);
    const passworderror = passwordValidation(password);
    const confirmationerror = confirmationValidation(password, confirmpassword);

    nameerror ? setNameMessage(nameerror) : setNameMessage("");
    emailerror ? setEmailMessage(emailerror) : setEmailMessage("");
    passworderror ? setPasswordMessage(passworderror) : setPasswordMessage("");

    confirmationerror
      ? setConfirmationMessage(confirmationerror)
      : setConfirmationMessage("");

    if (nameerror || emailerror || passworderror || confirmationerror) {
      return;
    }
    const user = {
      firstname: firstname,
      email: email,
      password: password,
    };

    const userresult = await create(user);

    if (userresult.success) {
      const authresult = await authenticate(email, password);
      if (authresult.success) {
        dispatch(setToken(authresult.token));
        history.push("/");
      }
    } else {
      alert("User could not be created");
    }
  };

  return (
    <div className="user" style={{ minHeight: componentheightInRem(width) }}>
      <Link to="/">
        <img className="user-logo" src={Logo} alt="" />
      </Link>
      <div className="user-container">
        <h3>Create account</h3>
        <Form onSubmit={(event) => signup(event)}>
          <h6>Your name</h6>
          <input
            className="mb-0"
            value={firstname}
            onChange={(event) => setFirstName(event.target.value)}
            type="text"
          />
          <ValidateMessage message={namemessage} />
          <h6 className="mt-2">Email</h6>
          <input
            className="mb-0"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <ValidateMessage message={emailmessage} />

          <h6
            className="mt-2"
            data-toggle="tooltip"
            data-placement="top"
            title={complexitymessage}
          >
            Password
          </h6>
          <input
            className="mb-0"
            value={password}
            n
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder={`At least ${passwordlength} characters`}
            data-toggle="tooltip"
            data-placement="top"
            title={complexitymessage}
          />
          <ValidateMessage message={passwordmessage} />
          <span className="d-none input-warning">
            <span className="font-italic">!</span> At least {passwordlength}{" "}
            characters
          </span>
          <h6 className="mt-2">Confirm Password</h6>
          <input
            className="mb-0"
            value={confirmpassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
          />
          <ValidateMessage message={confirmationmessage} />
          <span className="d-none input-warning">
            <span className="font-italic">!</span> Passwords must match
          </span>
          <p>By signing up, you agree to the Terms and Conditions</p>
          <button type="submit" className="user-button">
            Create your account
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
