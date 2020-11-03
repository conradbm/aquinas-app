import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class LoginPage extends React.Component {

    state = {
        successfulLogin:false,
    }

    // Handle search submit
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        // console.log(`Search text is currently ${this.state.searchText}`);

        // // Get results
        // this.makeSearch(this.state.searchText);

        // // Set empty display vector
        // const newArray = [];
        // var i;
        // for (i = 0; i < this.state.displayResults.length; i++) {
        //     newArray.push(false);
        // }

        // // Update state
        // this.setState({displayResults:newArray});

    }

    // Handle on change
    handleOnChange = (e) => {
        e.preventDefault();
        console.log(e.target);
        // this.setState({searchText:e.target.value});
        //this.makeSearch(this.state.searchText);
    }
    render(){
        return(
            <Container>
                <br></br>
                <Row className={this.successfulLogin ? "" : "hide"}>
                    Hello world
                </Row>
                <br></br>
                <br></br>
                <Row>
                    <Col></Col>
                    <Col className="shadow-lg p-3 mb-5 bg-white rounded m-3">
                    <h3>Login</h3>
                    <hr></hr>
                    <form className="" 
                            onSubmit={(e) => this.props.handleSubmit(e)}>
                                        
                                        <div className="form-inline">
                                            <label>Email:</label>
                                            <input className="form-control mr-sm-2 m-3" type="text" placeholder="blake@aquinasdaily.com" aria-label="Email Address"
                                                name={"emailField"}></input>
                                        </div>
                                        <div className="form-inline">
                                            <label>Password:</label>
                                            <input className="form-control mr-sm-2 m-3" type="password" placeholder=""
                                                name={"passwordField"}></input>
                                        </div>
                                        <div className="form-inline">
                                            <button className="btn btn-info my-2 my-sm-0" type="submit">Login</button>
                                        </div>
                            </form>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                   
            </Container>
        )
    }
}

export default LoginPage;