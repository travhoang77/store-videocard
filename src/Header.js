import React, { Component } from "react";
import "./css/Header.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
const _ = require("lodash");

class Header extends Component {
  render(props) {
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
              <InputGroup className=" w-200">
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
              {_.isEmpty(this.props.user) ? (
                <Link
                  to="/login"
                  className="inner"
                  title="Account"
                  aria-label="Account"
                >
                  <FontAwesomeIcon className="fa fa-2x" icon={faUser} />

                  <div className="ml-1">
                    <div className="inner__smallText">Welcome Guest</div>
                    <div className="inner__largeText">Sign in / Register</div>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/logout"
                  className="inner"
                  title="Account"
                  aria-label="Account"
                >
                  <FontAwesomeIcon className="fa fa-2x" icon={faUser} />

                  <div className="ml-1">
                    <div className="inner__smallText">
                      Welcome {this.props.user.firstname}
                    </div>
                    <div className="inner__largeText">Signout</div>
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
}

function mapStateToProps(state) {
  return {
    token: state.loginReducer.token,
    user: state.loginReducer.user,
  };
}

export default connect(mapStateToProps)(Header);
