import React, { Component } from 'react'
import web3 from "../build/web3";
import HomeNavbar from "../components/HomeNavbar"
import Collapse from 'react-bootstrap/Collapse'
import "../css/home.css"
import produce from "immer";
import Question from "../build/Question";
import factoryQuestion from "../build/factory";
import { NavLink } from 'react-router-dom';
import { Button,Form,Alert} from 'react-bootstrap';

export default class CodeBounty extends Component {
    state = {
      questionList: [],
      showAnswerForm: false,
      answer: '',
      account: null,
      loading: false,
      notificationMessage: '',
      success:false
    }
  componentDidUpdate = async () => {
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    }
    componentDidMount =async () => {
        const deployedQuestionAdreesses = await factoryQuestion.methods.getAskedQuestions().call();
        deployedQuestionAdreesses.map(async (questionAddress) => {
            const question = Question(questionAddress);
            const questionTitle = await question.methods.questionTitle().call();
            const questionTag = await question.methods.questionTag().call();
            const questionDescription = await question.methods.questionDescription().call();
            const questionUpVote = await question.methods.questionUpVote().call();
            const downVote = await question.methods.questionDownVote().call();
            const answerCount = await question.methods.answersCount().call();
            const questioner = await question.methods.questioner().call();
          const questionReward = await question.methods.rewards().call();
          console.log(parseInt(questionReward))
            const quesReward = parseInt(questionReward)
            this.setState(produce(draft => {
              draft.questionList.push({
                    question,
                    questionTitle,
                    questionDescription,
                    questionTag,
                    questionUpVote,
                    downVote,
                    answerCount,
                    questioner,
                    questionReward
                })
            }))
        })
    }
  handleAddAnswer = () => {
    this.setState({
      showAnswerForm: !this.state.showAnswerForm
    })
  }
  handleAnswerSubmission =async (e,specificQuestion) => {
    e.preventDefault();
    this.setState({ loading: true })
    try {
      await specificQuestion.methods.postAnswer(this.state.answer).send({ from: this.state.account });
      this.setState({ notificationMessage: "Your answers saved!!!", success: !this.state.success })
      this.setState({loading:!this.state.loading,showAnswerForm:!this.state.showAnswerForm})
      
    }
    catch(err){
      this.setState({ notificationMessage: err.message, success: false })
      this.setState({loading:!this.state.loading,showAnswerForm:!this.state.showAnswerForm})  
    }

  }
  handleAnswerChanges = (event) => {
    this.setState({
      answer: event.target.value
    })
  }
  renderQuestions = () => {
    let count = 0;
    return this.state.questionList.map((question) => {
      count++;
     return (
            <React.Fragment key={count}>
              <div className="card mb-4 homeCard">
                <div className="row">
                  <div className="col-md-2">
                    <div className="round">
                      <i className="fa fa-user logo" />
                    </div>
                  </div>
                  <div className="col-md-10">
               <div className="card-title">
                 <div className="p-2">
                   <div style={{ fontSize: "29px" }}>{question.questionTitle}
                     <span style={{float:"right"}}>
                     <Button size="sm" variant="outline-warning">
                        <i className="fas fa-gift p-2"></i>
                        {parseInt(question.questionReward)} Wei</Button>
                    </span>
                   </div>
                 </div>
                 </div>
                  </div>
              <div className="body mb-2 ml-4">
               {question.questionDescription}  
              </div>
                </div>
                <div className="row mt-4 ">
                  <div className="col-md-12">
                      <button className="btn btn-success float-left" onClick={this.handleAddAnswer}>
                        Answer question
                       </button>
                       
                      <NavLink to={{
                                  pathname: "/questionInfo",
                                  questionDetails: {
                                    specificQuestion: question.question
                                  }
                                }}>
                            <Button className=" float-right" variant="link" onClick={this.handleAddAnswer}>
                              View submitted answers
                            </Button>
                        </NavLink>
                                
                </div>
                <div className="col-md-12 mt-3">
                     <Collapse in={this.state.showAnswerForm}>
                            <div id="example-collapse-text">
                               <Form onSubmit={(e) => { this.handleAnswerSubmission(e,question.question) }}>
                                  <Form.Group controlId="exampleForm.ControlTextarea1">
                                      <Form.Label>Add your answer here </Form.Label>
                                      <Form.Control onChange={(e) => { this.handleAnswerChanges(e) }} as="textarea" rows="4" />
                                  </Form.Group>
                                  <Form.Group>
                                      <Button variant="primary" type="submit">
                                        Submit
                                      </Button>
                                  </Form.Group>
                              </Form>
                          </div>
                    </Collapse>
                </div>
                </div>
            </div>
         </React.Fragment>
     )
    })
    
    }
    render() {  
        return (
          <div>
            <HomeNavbar/>
              <React.Fragment>
                <div className="content-wrapper">
                  <div className="w-container">
                    <div className="w-row">
                      <div className="w-col w-col-3">
                        <div className="sidebar-header">Feed</div>
                        <div className="white-wrapper">
                          <ul className="feed">
                            <li className="mb-2">
                              <a href="/">Web development</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Android </a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Computer Vision</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Javascript</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">C/C++</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Algorithm</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Blockchain</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Solidity</a>
                            </li>{" "}
                            <li className="mb-2">
                              <a href="/">Ruby </a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Java</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Elastic Search</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Kibana</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Logstash</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">Python</a>
                            </li>
                            <li className="mb-2">
                              <a href="/">GoLang</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="content-column w-col w-col-9">
                        <div className="card mb-4 homeCard">
                            <div className="card-title" style={{textAlign:"center",fontSize:"28px",fontWeight:"800"}}>
                              Welcome to CodeBounty        
                          </div>
                                <div style={{ textAlign: "center" }}>
                                  <NavLink to="/addQuestion">
                                    <Button className="btn btn-success" style={{borderRadius:"15px"}}>
                                      <i className="fas fa-plus"></i>    Ask a Question
                                    </Button>
                                  </NavLink>
                            </div>
                          <div>
                        </div>
                      </div>
                        {this.renderQuestions()}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </div>

            
        )
    }
}
