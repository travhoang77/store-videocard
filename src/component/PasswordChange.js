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

import { updatePassword } from "../fetches/userFetch";
import "../css/User.css";
const jwt = require("jsonwebtoken");

function PasswordReset() {
  const authtoken = localStorage.getItem("token");
  const id = jwt.decode(authtoken)["_id"];
  const [currentpassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [currentpasswordmessage, setCurrrentPasswordMessage] = useState("");
  const [passwordmessage, setPasswordMessage] = useState("");
  const [confirmationmessage, setConfirmationMessage] = useState("");
  const [toggle, setToggle] = useState("d-none");
  const complexitymessage =
    "Password must have a uppercase, a lowercase, a number and a symbol";

  const reset = async (event) => {
    event.preventDefault();

    const currentpassworderror = await currentPasswordValidation(
      authtoken,
      id,
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

    const result = await updatePassword(authtoken, id, password);

    if (result.success) {
      setToggle("");
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="user">
      <div className={toggle}>
        <h5 className="text-success">Password change successful!</h5>
      </div>
      <div className="user-container">
        <h4>Change Password</h4>
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
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder={`At least ${passwordlength} characters`}
            data-toggle="tooltip"
            data-placement="top"
            title={complexitymessage}
          />
          <ValidateMessage message={passwordmessage} />
          <h6 className="mt-2">Confirm Password</h6>
          <input
            className="pb-0 mb-0"
            value={confirmpassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
          />
          <ValidateMessage message={confirmationmessage} />
          <div>
            <button type="submit" className="user-button">
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PasswordReset;
