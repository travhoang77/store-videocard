import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";
export default class CenteredLogo extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <Link to={"/"}>
          <img src={Logo} className="pt-1 pb-1 pl-2" alt="Logo" />
        </Link>
      </div>
    );
  }
}
