import React, { Component } from 'react'
import { Form, Button, Alert ,InputGroup,Col} from "react-bootstrap";
import factoryQuestion from "../build/factory";
import HomeNavbar from "../components/HomeNavbar"
import web3 from "../build/web3"
import "../css/addQuestion.css";
export default class AddQuestion extends Component {
    state = {
        title: '',
        description: '',
        tag: '',
        loading: false,
        errorMessage: '',
        bountyVal: null,
        account:null
    }
    componentDidMount = async () => {
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    }

    handleFormSubmit = async (event) => {
        this.setState({ loading: true,errorMessage:'' })
        event.preventDefault();
        try {
            await factoryQuestion.methods.askQuestion(this.state.title,this.state.description,this.state.tag).send({from : this.state.account,value: this.state.bountyVal})   
            this.setState({ loading: false })
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
        }
        
    }
    handleTitleChange = (event) => {
        this.setState({title:event.target.value})
    }
    handleDescriptionChange = (event) => {
        this.setState({description:event.target.value})
    }
    handleTagChange = (event) => {
        this.setState({tag:event.target.value})
    }
    handleBountyChange = (event) => {
        this.setState({bountyVal : event.target.value})
    }
    render() {
        return (
            <div>
                <div className="">
                </div>
                <HomeNavbar/>   
                  <div className=" content-wrapper">
                
                    <div className="row" >
                        <div className="m-auto col-md-8" style={{ backgroundColor: "white" }} >
                        <h2 className="p-3" style={{textAlign:"center"}}>
                            Add your question
                        </h2>
                                <Form onSubmit = {(e)=>this.handleFormSubmit(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Question title</Form.Label>
                                <Form.Control type="text" onChange={this.handleTitleChange} placeholder="Enter Question title" />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control onChange={this.handleDescriptionChange} as="textarea" rows="3" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Question Tags</Form.Label>
                                <Form.Control onChange={this.handleTagChange} type="text" placeholder="Tags.." />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Bounty for this question</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                    type="number"
                                    placeholder="Enter bounty in wei"
                                    aria-describedby="inputGroupPrepend"
                                    onChange = {this.handleBountyChange}
                                    required
                                    />
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">wei</InputGroup.Text>
                                    </InputGroup.Prepend> 
                                </InputGroup>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {this.state.loading?"Saving":"Submit"}
                            </Button>
                        </Form>
                        {!!this.state.errorMessage ?
                                <Alert className="p-3 mt-3" variant="danger">
                                    {this.state.errorMessage}
                            </Alert> :
                            ""
                        }
                        </div>
                    </div>
               
            </div>
            </div>
          
        )
    }
}
