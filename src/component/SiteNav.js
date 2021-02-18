import React from "react";
import "../css/SiteNav.css";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function SiteNav(props) {
  const noMarginTop = {
    paddingTop: 0,
  };

  const items = ["Home", "Features", "Pricing"];

  return (
    // TODO avoid inline styles - use classes instead
    <Navbar className="pt-0" bg="none" variant="light">
      <Navbar.Brand href="/">
        <FontAwesomeIcon className="fa fa-2x" icon={faHome} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      <Nav>
        {items.map((item) => (
          <Nav.Link className="navlink__mr" href={`#${item}`}>
            {item}
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
}

export default SiteNav;
