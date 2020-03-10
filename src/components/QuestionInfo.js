import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import HomeNabar from "./HomeNavbar";
import Answer from "./Answer";
import produce from 'immer'
export default class QuestionInfo extends Component {
    state = {
        answers: [],
        questionList: [],
        votes: 3,
        question:null,
        questionDetails : null
    }
    componentDidMount = async () => {
        console.log(this.props.location.questionDetails)
        const answers = []
        const question = this.props.location.questionDetails.specificQuestion;
        const questionTitle = await question.methods.questionTitle().call();
        const questionTag = await question.methods.questionTag().call();
        const questionDescription = await question.methods.questionDescription().call();
        const questionUpVote = await question.methods.questionUpVote().call();
        const downVote = await question.methods.questionDownVote().call();
        const answerCount = await question.methods.answersCount().call();
        const questioner = await question.methods.questioner().call();
        const questionReward = await question.methods.rewards().call();
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
        const answersLength = await question.methods.getAnswersLength().call();
        for (var answerIndex = 0; answerIndex < answersLength; answerIndex++)
        {
            const answer =await question.methods.answers(answerIndex).call();
            answers.push(answer)
        }
        this.setState({ answers })
        this.setState({question})
    }
    handleUpVote = async (index) => {
        console.log(index)
    }
    handleDownVote = async (index) => {
        console.log(index)
    }
    renderAnswers = () => {
        let count = -1;
        return this.state.answers.map((answer) => {
            count++;
            return (
                <div key={count}>
                    <Answer answerDetails={answer} question={this.state.question}/>
                </div>
            
           )
        })
        
    }
    render() {
        if (this.state.questionList.length > 0) {
            return (
                <div>
                    <HomeNabar />
                    <React.Fragment>
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-md-10 m-auto " >
                                    <div className="card mb-4 x white-wrapper">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="round">
                                                    <i className="fa fa-user logo" />
                                                </div>
                                            </div>
                                            <div className="col-md-10 m-auto">
                                                <div className="card-title">
                                                  <h2>  {this.state.questionList[0].questionTitle}</h2> 
                                                    <span style={{ float: "right" }} className="text-muted">
                                                        {" "}
                                                        11h ago
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="body ml-3">
                                                {this.state.questionList[0].questionDescription}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "#F0F0F0" }} className="card homeCard white-wrapper mt-4 w-container">
                                <div className="mb-4">
                                    <h4>Answers </h4>
                                </div>
                            </div>
                            {this.renderAnswers()}
                        </div>
                    </React.Fragment>
                </div>
            )
        }
        else {
            return(<div></div>)
        }
    
    }
   
}
