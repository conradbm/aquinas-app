import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class SignupPage extends React.Component {

    state = {
        emailField:"",
        passwordField:"",
        passwordConfirmedField:"",
        success:false,
        failedAttempt:false,
    }

    // Handle search submit
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);

    }

    handleChange = (e) => {
        e.preventDefault();
        //console.log(e.target.value);
        if(e.target.name === "emailField"){
            this.setState({
                emailField:e.target.value,
            })
        }
        else if(e.target.name === "passwordField"){
            this.setState({
                passwordField:e.target.value,
            })
        }
        else if(e.target.name === "passwordConfirmedField"){
            this.setState({
                passwordConfirmedField: e.target.value,
            })
        }
        else{
            console.log("Something went wrong with the subscription fields updating state.")
        }
    }
    
    render(){
        return(
            <Container>
                <br></br>
                <Row className="">
                    <Col></Col>
                    <Col className="shadow-lg p-3 mb-5 bg-white rounded m-3 ">
                        <h3>Sign up</h3>
                        <hr></hr>
                        <form className="" 
                            onSubmit={(e) => this.handleSubmit(e)}>
                                        
                                        <div className="form-inline">
                                            <label>Email:</label>
                                            <input className="form-control mr-sm-2 m-3" 
                                                    type="text" 
                                                    placeholder="blake@aquinasdaily.com" 
                                                    aria-label="Email Address"
                                                    onChange={e=>this.handleChange(e)}
                                                name={"emailField"}></input>
                                        </div>
                                        <div className="form-inline">
                                            <label>Password:</label>
                                            <input className="form-control mr-sm-2 m-3" 
                                                    type="password" 
                                                    placeholder=""
                                                    onChange={e=>this.handleChange(e)}
                                                name={"passwordField"}></input>
                                        </div>
                                        <div className="form-inline">
                                            <label>Repeat Password:</label>
                                            <input className="form-control mr-sm-2 m-3" 
                                                    type="password" 
                                                    placeholder=""
                                                    onChange={e=>this.handleChange(e)}
                                                name={"passwordConfirmedField"}></input>
                                        </div>
                                        <div className="form-inline">
                                            <button className="btn btn-info my-2 my-sm-0" 
                                            type="submit">Sign up</button>
                                        </div>
                            </form>
                    </Col>
                    <Col></Col>

                </Row>
                   
            </Container>
        )
    }
}

export default SignupPage;