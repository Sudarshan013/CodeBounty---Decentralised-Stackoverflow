import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "../css/navbar.css";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar fixed="top" expand="md" className="navDiv">
          <NavbarBrand className="navbarBrand ml-4" href="/">

          Code Bounty
          </NavbarBrand>
          <NavbarToggler className="toggleButton" onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto mr-2 mt-2" navbar>
             <form>
              <div className="input-group">
                <input style={{width:"500px"}}type="text" className="form-control" placeholder="Search"/>
                <div className="input-group-btn">
                  <button className="btn btn-primary" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>     
            <NavItem>
                <NavLink href="/codebounty" className="nav-link">
                    <i class="fas fa-home"></i>
                </NavLink>
              </NavItem>            
            <NavItem>
                <NavLink href="/communities" className="nav-link">
                  <i className="fa fa-users" />
                </NavLink>
            </NavItem>
                        
              <NavItem>
            <NavLink href="/" className="nav-link">
                  <i className="fas fa-sign-out-alt" />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}