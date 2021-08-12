import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../css/Nav.css";

function AccountNav(props) {
  return (
    <nav className="navBar">
      <ul className="nav">
        <NavItem icon={faUser} text="Account">
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
    const { to } = props;
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
          <DropDownItem to="/account/profile">Account Profile</DropDownItem>
          <DropDownItem to="/account/passwordchange">
            Password Reset
          </DropDownItem>
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
    <li className="navBar__item" ref={ref}>
      <Link to="#" className="icon__button" onClick={() => setOpen(!open)}>
        {props.icon.prefix === "fas" ? (
          <FontAwesomeIcon className="fa fa-lg fa__button" icon={props.icon} />
        ) : (
          <img src={faUser} />
        )}
      </Link>
      <span className="pl-2" onClick={() => setOpen(!open)}>
        {props.text}
      </span>
      {open && props.children}
    </li>
  );
}

export default AccountNav;
