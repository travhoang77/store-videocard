import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import gpuIcon from "../assets/video-card.svg";
import "../css/ProductNav.css";

function ProductNav(props) {
  return (
    //     <Navbar className="product__nav" variant="light">
    //     <Navbar.Brand href="#home">
    //       <img
    //         alt=""
    //         src="/logo.svg"
    //         width="30"
    //         height="30"
    //         className="d-inline-block align-top"
    //       />{' '}
    //       Products
    //     </Navbar.Brand>
    //   </Navbar>
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
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + height_fix); // + 10 is a hack to intialize correct menu height
  }, []);

  const speed = 500; //Please make sure this matches the CSS variable --speed

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height + height_fix);
  }

  function DropDownItem(props) {
    return (
      <Link
        to="#menu"
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
          <DropDownItem rightIcon={faChevronRight} goToMenu="RTX_20">
            Geforce RTX 20 Series
          </DropDownItem>
          <DropDownItem rightIcon={faChevronRight} goToMenu="RTX_10">
            Geforce GTX 10 Series
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
          <DropDownItem>Geforce RTX 3060</DropDownItem>
          <DropDownItem>Geforce RTX 3070</DropDownItem>
          <DropDownItem>Geforce RTX 3080</DropDownItem>
          <DropDownItem>Geforce RTX 3090</DropDownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="navBar__item">
      <Link to="#" className="icon__button" onClick={() => setOpen(!open)}>
        {props.icon.prefix === "fas" ? (
          <FontAwesomeIcon className=" fa__button" icon={props.icon} />
        ) : (
          <img src={gpuIcon} />
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
