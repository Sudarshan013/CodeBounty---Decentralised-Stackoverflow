import React, { Component } from 'react'
import web3 from "../build/web3"
import FactoryQuestion from "../abis/factoryQuestion.json"
import Question from "../abis/Question.json"
import { Button } from 'react-bootstrap';
export default class CodeBounty extends Component {
    state = {
        factoryQuestion: [],
        account: '',
        ques:[],
        deployedQuestions : []
    }
    componentDidMount = async () => {
      
        await this.loadBlockChainData();
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    }
    loadBlockChainData = async () => {
        const networkId = await web3.eth.net.getId();
        const networkData = FactoryQuestion.networks[networkId];
        const questionData = Question.networks[networkId];
        if (networkData) 
        {
            const factoryQuestion = web3.eth.Contract(FactoryQuestion.abi, networkData.address);   
            const ques = web3.eth.Contract(Question.abi, questionData.address)
            console.log(ques)
            this.setState({ factoryQuestion,ques })
        }
    }
    submitQuestion = async () => {
        await this.state.factoryQuestion.methods.askQuestion("Solsc error","Version issue","Soldity").send({from : this.state.account,value: 100})
    }
    getDeployedAddresses = async () => {
        let deployedQuestionAddress = await this.state.factoryQuestion.methods.getAskedQuestions().call()
        let title = await this.state.ques.methods.questionDescription().call()
        console.log(title)
        // console.log(deployedQuestionAddress)
        this.setState({ deployedQuestions: [...deployedQuestionAddress] })
    }
    renderQuestionAddresses = (addresses) => {
        return addresses.map((question) => {
          return(  <div key={question}>
                {question}
            </div>)
        })
    }
    render() {  
        return (
            <div>
                <Button onClick={this.submitQuestion}>hey</Button>
                <Button onClick={this.getDeployedAddresses}>bam</Button>
                {this.renderQuestionAddresses(this.state.deployedQuestions)}
            </div>
        )
    }
}
