import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../css/Login.css";
import Logo from "../assets/logo.png";
import ValidateMessage from "./ValidateMessage";
const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

function Register() {
  const passwordlength = 6;
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

  const nameValidation = (name) => {
    if (name.trim() === "") {
      return "Name is required";
    }
    if (/[^a-zA-Z -]/.test(name)) {
      return "Invalid characters";
    }
    if (name.trim().length < 3) {
      return "Name require at least 3 characters";
    }
    return null;
  };

  const emailValidation = async (email) => {
    let message = null;
    if (email.trim() === "") {
      return "Email is required";
    }

    if (
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return "Please enter a valid email";
    }

    const promise = await instance
      .get(`/auth/${email}`)
      .then((response) => {
        if (response.data.success) {
          message = response.data.message;
        }
      })
      .catch((error) => {
        console.log("error-->", error);
      });

    return message;
  };

  const passwordValidation = (password) => {
    if (password.trim() === "") {
      return "Password is required";
    }
    if (password.length < passwordlength) {
      return `At least ${passwordlength} characters`;
    }

    if (!/[A-Z]/.test(password)) {
      return "Must have a uppercase character";
    }

    if (!/[a-z]/.test(password)) {
      return "Must have a lowercase character";
    }

    if (!/\d/.test(password)) {
      return "Must have a number";
    }

    if (!/\W/.test(password)) {
      return "Must have a symbol";
    }
    return null;
  };

  const confirmationValidation = (password, confirmation) => {
    if (confirmation.trim() === "") {
      return "Password is required";
    }

    if (password !== confirmation) {
      return "Passwords much match";
    }

    return null;
  };

  const register = async (event) => {
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

    instance
      .post("/users", user)
      .then((response) => {
        history.push("/");
      })
      .catch((error) => console.log(`this error-> ${error}`));
  };

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
            placeholder={`At least ${passwordlength}  characters`}
            data-toggle="tooltip"
            data-placement="top"
            title={complexitymessage}
          />
          <ValidateMessage message={passwordmessage} />
          <span className="d-none input-warning">
            <span className="font-italic">!</span> At least 6 characters
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
          <button
            onClick={(event) => register(event)}
            type="button"
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
