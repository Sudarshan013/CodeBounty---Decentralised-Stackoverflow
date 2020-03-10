import React, { Component } from 'react'
import web3 from "../build/web3";
export default class Answer extends Component {
    state = {
        account: null,
        votes: 0,
        loading: false,
        acceptedAnswer : false
    }
    componentDidMount = async () => {
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        console.log(this.props.answerDetails.accepted)
    }
    componentDidUpdate = async () => {
        // console.log(parseInt(this.props.answerDetails.answerUpVoteCount))
    }
    handleUpVote = async () => {
        const answerIndex = this.props.answerDetails.answerIndex;
        this.setState({loading:!this.state.loading})
        await this.props.question.methods.upVoteAnswer(parseInt(answerIndex)).send({ from: this.state.account })
        this.setState({loading:!this.state.loading})
    }
    handleDownVote = async () => {
        console.log("down")
        this.setState({loading:!this.state.loading})
        const answerIndex = this.props.answerDetails.answerIndex;
        await this.props.question.methods.downVoteAnswer(parseInt(answerIndex)).send({ from: this.state.account })
        this.setState({loading:!this.state.loading})
    }
    finalAnswer = async () => {
        console.log("Clicked finale")
        const answerIndex = this.props.answerDetails.answerIndex;
        this.setState({ loading: !this.state.loading })
        await this.props.question.methods.acceptAnswer(parseInt(answerIndex)).send({ from: this.state.account })
        console.log(parseInt(answerIndex))
        // await this.props.question.methods.upVoteAnswer(parseInt(answerIndex)).send({ from: this.state.account })
        // this.setState({loading:!this.state.loading})
    }
    render() {
        return (
            <div  className="w-container">
                    <div style={{ backgroundColor: "#F0F0F0" }} className="card homeCard white-wrapper mt-4">
                        <div className="row mb-4">
                            <div className="col-md-2">
                                <div className="round">
                                    <i className="fa fa-user logo" />
                                </div>
                            </div>
                            <div className="col-md-6 author ">
                                {this.props.answerDetails.answerer}
                            </div>
                            <div className="col-md-4">
                                <div className="card-title">
                                    <span style={{ float: "right" }} className="text-muted">
                                    {" "}
                                    11h ago
                                </span>
                                </div>
                            </div>
                    </div>
                    <div className="row answer">
                        <div className="col-3">
                            <div className="ml-2">
                                <div className=" p-2">
                                    <i className="vote far fa-thumbs-up fa-2x" onClick={(e)=>{this.handleUpVote()}} ></i>
                                    <strong>{parseInt(this.props.answerDetails.answerUpVoteCount)}</strong>
                                </div>
                                <div className=" p-2">
                                    <i className="vote far fa-thumbs-down fa-2x"onClick={(e)=>{this.handleDownVote()}}></i>
                                    <strong>{parseInt(this.props.answerDetails.answerDownVoteCount)}</strong>
                                </div>
                                <div className="p-2">
                                    {this.props.answerDetails.accepted?<i  className="fas fa-check-circle fa-2x finaliseAnswer" style={{color:"green"}} onClick={(e) => { this.finalAnswer() }}></i>
                                    :
                                    <i  className="fas fa-check-circle fa-2x finaliseAnswer" onClick={(e) => { this.finalAnswer() }}></i>
                                    }
                                    <div>
                                        {this.props.answerDetails.accepted?<strong>Answer accepted!!</strong>:""}
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div className="col-7">
                            {this.props.answerDetails.answer}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
