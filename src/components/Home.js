import React, { Component } from "react";
import image from "../images/bg.svg";
import "../css/login.css";
import { NavLink } from 'react-router-dom';
import Navbar from "./NavbarTop"
class Home extends Component {
  state = {};
  render() {
    return (
        <React.Fragment>
            <Navbar/>
        <div className="loginDiv">
          <div className="row">
            <div className="col-md-6 limit">
              <img src={image} alt="" />
            </div>
            <div className="col-md-6">
              <div className="auth__auth">
                <h1 className="auth__title">Welcome to Code Bounty !!</h1>
                <p>A blockchain based questions & answer application</p>
                <form className="form">
                  <NavLink to = '/codebounty'>.
                  <button  className="button button__accent">
                     Decentralised Web awaits for you
                  </button>
                  </NavLink>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
