import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import ValidateMessage from "./ValidateMessage";
import {
  passwordValidation,
  confirmationValidation,
  currentPasswordValidation,
  passwordlength,
} from "./validators/userValidator";
import "../css/User.css";
const jwt = require("jsonwebtoken");

function PasswordReset() {
  const history = useHistory();
  const authtoken = localStorage.getItem("token");
  const [currentpassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [currentpasswordmessage, setCurrrentPasswordMessage] = useState("");
  const [passwordmessage, setPasswordMessage] = useState("");
  const [confirmationmessage, setConfirmationMessage] = useState("");
  const complexitymessage =
    "Password must have a uppercase, a lowercase, a number and a symbol";

  const reset = async (event) => {
    event.preventDefault();

    const currentpassworderror = await currentPasswordValidation(
      authtoken,
      jwt.decode(authtoken)["_id"],
      currentpassword
    );
    const passworderror = passwordValidation(password);
    const confirmationerror = confirmationValidation(password, confirmpassword);

    currentpassworderror
      ? setCurrrentPasswordMessage(currentpassworderror)
      : setCurrrentPasswordMessage("");

    passworderror ? setPasswordMessage(passworderror) : setPasswordMessage("");

    confirmationerror
      ? setConfirmationMessage(confirmationerror)
      : setConfirmationMessage("");

    if (currentpassworderror || passworderror || confirmationerror) {
      return;
    }
  };

  return (
    <div className="user">
      <div className="user-container">
        <h4>Password Reset</h4>
        <Form onSubmit={(event) => reset(event)}>
          <h6
            className="mt-2"
            data-toggle="tooltip"
            data-placement="top"
            title="Please enter current password"
          >
            Current Password
          </h6>
          <input
            className="mb-0"
            value={currentpassword}
            n
            onChange={(event) => setCurrentPassword(event.target.value)}
            type="password"
            data-toggle="tooltip"
            data-placement="top"
          />
          <ValidateMessage message={currentpasswordmessage} />
          <h6
            className="mt-2"
            data-toggle="tooltip"
            data-placement="top"
            title={complexitymessage}
          >
            New Password
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

          <button type="submit" className="user-button">
            Reset
          </button>
        </Form>
      </div>
    </div>
  );
}

export default PasswordReset;
