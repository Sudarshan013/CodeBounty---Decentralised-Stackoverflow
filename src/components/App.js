import React, { Component } from 'react';
import Home from "./Home";
import Communities from "../components/Communities"
import CodeBounty from "./CodeBounty"; 
import './App.css';
import AddQuestion from "./AddQuestion"
import QuestionInfo from "./QuestionInfo"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
class App extends Component {
 
  render() {
    return (  
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/codebounty" exact component={CodeBounty} />
            <Route path="/addQuestion" exact component={AddQuestion} />
            <Route path="/questionInfo" exact component={QuestionInfo} />
            <Route path="/communities" exact component={Communities}/>
           </Switch>  
        </Router>
      </div>
    );
  }
}

export default App;
