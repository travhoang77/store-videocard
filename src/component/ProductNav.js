import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import gpuIcon from "../assets/video-card.svg";
import "../css/Nav.css";

function ProductNav() {
  return (
    <nav className="navBar">
      <ul className="nav">
        <NavItem icon={gpuIcon} text="Video Cards">
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </ul>
    </nav>
  );
}
function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const height_fix = 13;

  useEffect(() => {
    setMenuHeight(dropdownRef.current.firstChild.offsetHeight + height_fix); // + 10 is a hack to intialize
  }, []);

  const speed = 500; //Please make sure this matches the CSS variable --speed

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height + height_fix);
  }

  function DropDownItem(props) {
    const location = useLocation();
    let { to } = props;
    to = to ? to : location.pathname;
    return (
      <Link
        to={to}
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <FontAwesomeIcon className="fa icon" icon={props.leftIcon} />
        {props.children}
        <FontAwesomeIcon
          className="fa icon icon-right"
          icon={props.rightIcon}
        />
      </Link>
    );
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={speed}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem rightIcon={faChevronRight} goToMenu="RTX_30">
            Geforce RTX 30 Series
          </DropDownItem>
          <DropDownItem rightIcon={faChevronRight} goToMenu="RADEON_6000">
            Radeon 6000 Series
          </DropDownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "RTX_30"}
        unmountOnExit
        timeout={speed}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem leftIcon={faChevronLeft} goToMenu="main" />
          <DropDownItem to="/products/3060">Geforce RTX 3060</DropDownItem>
          <DropDownItem to="/products/3070">Geforce RTX 3070</DropDownItem>
          <DropDownItem to="/products/3080">Geforce RTX 3080</DropDownItem>
          <DropDownItem to="/products/3090">Geforce RTX 3090</DropDownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "RADEON_6000"}
        unmountOnExit
        timeout={speed}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem leftIcon={faChevronLeft} goToMenu="main" />
          <DropDownItem to="/products/6900">RADEON RX 6900</DropDownItem>
          <DropDownItem to="/products/6800">RADEON RX 6800</DropDownItem>
          <DropDownItem to="/products/6700">RADEON RX 6700</DropDownItem>
          <DropDownItem to="/products/6600">RADEON RX 6600</DropDownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  //Close Dropdown if clicked outside;
  const handleClick = (event) => {
    if (ref.current.contains(event.target)) {
      // inside click
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  return (
    <li className="navBar__item navBar__account_item" ref={ref}>
      <Link to="#" className="icon__button" onClick={() => setOpen(!open)}>
        {props.icon.prefix === "fas" ? (
          <FontAwesomeIcon className=" fa__button" icon={props.icon} />
        ) : (
          <img src={gpuIcon} alt=">" />
        )}
      </Link>
      <span className="pl-2" onClick={() => setOpen(!open)}>
        {props.text}
      </span>
      {open && props.children}
    </li>
  );
}

export default ProductNav;
