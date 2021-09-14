import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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
import Logo from "./assets/logo.png";
import { signout } from "./fetches/authFetch";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "./redux/actions/loginActions";
import { getToken, getCartCount, getCartSubtotal } from "./utils/utils";

const Header = ({ cart }) => {
  const history = useHistory();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState();
  const [subtotal, setSubtotal] = useState();
  const [itemtext, setItemText] = useState();

  const authenticated = state.login.authenticated;
  const firstname = state.login.firstname;
  const authtoken = getToken();

  useEffect(() => {
    setCartCount(getCartCount(cart));
    setSubtotal(getCartSubtotal(cart));
    getCartCount(cart) > 1 ? setItemText("Items") : setItemText("Item");
  }, [cart]);

  const logout = async (event) => {
    event.preventDefault();
    const result = await signout(authtoken);

    if (result.success) {
      dispatch(removeToken());
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
              <FontAwesomeIcon className="fa fa-2x" icon={faShoppingCart} />
              <div className="ml-1">
                <div className="inner__smallText">${subtotal}</div>
                <div className="inner__largeText">
                  <span className="mr-1">{cartCount}</span>
                  {itemtext}
                </div>
              </div>
            </Link>
          </div>
          {/* TODO : ACCOUNT Component */}
          <div className="ml-2 mr-2">
            {!authenticated ? (
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
                  onClick={() => {
                    history.push(`/account/profile`);
                  }}
                />

                <div className="ml-1">
                  <div className="inner__smallText">Welcome {firstname}</div>
                  <div
                    className="inner__largeText"
                    title="Sign Out"
                    onClick={(event) => logout(event)}
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(Header);
