import React, { Component } from 'react';
import Home from "./Home";
import CodeBounty from "./CodeBounty"; 
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import web3 from "../build/web3"
class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData()
  }

 loadBlockchainData= async ()=> {
   const accounts = await web3.eth.getAccounts()
   this.setState({ account: accounts[0] })
   console.log(accounts)
 }
 
  render() {
    return (  
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/codebounty" exact component= {CodeBounty} />
          </Switch>  
        </Router>
      </div>
    );
  }
}

export default App;
