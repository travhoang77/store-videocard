import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import "./css/Header.css";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SiteNav from "./component/SiteNav";
import ProductNav from "./component/ProductNav";
import BreadCrumbs from "./component/Breadcrumbs";
import Logo from "./assets/logo.png";
import { signout } from "./fetches/authFetch";
import { removeToken } from "./actions/loginActions";
import { useStateValue } from "./StateProvider";
const _ = require("lodash");

function Header() {
  const history = useHistory();
  const firstname = localStorage.getItem("firstname");
  const [{ token }, dispatch] = useStateValue();

  const logout = async (event) => {
    const result = await signout(localStorage.getItem("token"));

    if (result.success) {
      const token = removeToken();
      dispatch(token);
      history.push("/");
    }
  };
  return (
    <div className="header">
      <div className="header__message">Video cards on sale</div>
      <div className="header__main">
        <div className="header__mainLogo">
          <Link to={"/"}>
            <img src={Logo} className="pt-1 pb-1 pl-2" alt="Logo" />
          </Link>
        </div>
        <div className="header__mainAdvertisement"></div>

        <div className="ml-auto mt-2 d-flex align-content-start flex-wrap">
          {/* TO-DO Search Component */}
          <div className="header__mainSearch">
            <InputGroup className="w-200">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
              <InputGroup.Append>
                <Button variant="primary" className="search-button">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div className="ml-2">
            {/* TO-DO Cart component    */}
            <Link
              to="/cart"
              className="inner"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <FontAwesomeIcon className=" fa fa-2x" icon={faShoppingCart} />
              <div className="ml-1">
                <div className="inner__smallText">$1999.99</div>
                <div className="inner__largeText">
                  <span>15</span> Item
                </div>
              </div>
            </Link>
          </div>
          {/* TODO : ACCOUNT Component */}
          <div className="ml-2 mr-2">
            {firstname === null ? (
              <Link
                to="/login"
                className="inner"
                title="Account"
                aria-label="Account"
              >
                <div className="ml-1">
                  <div className="inner__smallText">Welcome Guest</div>
                  <div className="inner__largeText">Sign in / Register</div>
                </div>
              </Link>
            ) : (
              <Link className="inner">
                <FontAwesomeIcon
                  className="fa fa-2x"
                  icon={faUser}
                  aria-label="Account"
                  title="Account Settings"
                />

                <div className="ml-1">
                  <div className="inner__smallText">Welcome {firstname}</div>
                  <div
                    className="inner__largeText"
                    title="Sign Out"
                    onClick={logout}
                  >
                    Sign Out
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div>
            {/* TO-DO create NAVLIST component */}
            {/* <SiteNav /> */}
          </div>
        </div>
      </div>
      <div>
        <ProductNav />
      </div>
      <div>
        <BreadCrumbs />
      </div>
    </div>
  );
}

export default Header;
