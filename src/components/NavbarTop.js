import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "../css/navbar.css";

const NavbarTop = () => {
  return (
    <div>
      <Navbar expand="md" className="navDiv">
        <NavbarBrand className="navbarBrand ml-5" href="/">
          CodeBounty
        </NavbarBrand>
      </Navbar>
    </div>
  );
};

export default NavbarTop;
