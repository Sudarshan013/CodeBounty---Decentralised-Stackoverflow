import React, { Component } from "react";
import "../css/Communities.css";
import HomeNavbar from "../components/HomeNavbar"


const Suggestions = () => {
  return (
    <div className="row bottomMargin">
      <div className="col-md-1">
        <div className="roundLogo">
          <i className="fa fa-user cLogo" />
        </div>
      </div>
      <div className="col-md-10">
        <div className="row">
          <div className="col-md-9">
            <div className="card-title">Username</div>
            <div className="card-subtitle text-muted">
              The copy warned the Little Blind Text.
            </div>
          </div>
          <div className="col-md-3">
            <button className="btn btn-success btn-sm followPlus">
              Follow +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

class Communities extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <HomeNavbar />
        <div className="container fixing communitites">
          <div className="card mainDiv col-md-8 offset-md-2 mt-5">
            <div className="card-title d-flex justify-content-center mt-2 mb-0">
              <strong style={{fontSize:"32px"}}> Welcome To the  Decentralised World !!</strong>
            </div>
            <div className="card-body">
              <div className="paragraph communitites">
                <p className="card">
                  Code Bounty is one of the first Dapp to provide incentive based Question and Answer system for develpoers.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container posbtn">
          <div className="card col-md-8 offset-md-2 mt-5 communityCard">
            <ul className="unstyled-list">
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
                <div className="seperateLine" />
              </li>
              <li className="list">
                <Suggestions />
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Communities;