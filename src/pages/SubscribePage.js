import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class SubscribePage extends React.Component {

    state = {
        dailyArticles:false,
        updatesAndFixes:false,
        userEmail:"",
        response:"",
    }

    // Execute a search request
    makeSearch = async (userEmail, dailyArticles, updatesAndFixes) => {
        const result = await fetch(`/api/subscribe`, {
            method:'post',
            body: JSON.stringify({userEmail: userEmail, dailyArticles:dailyArticles, updatesAndFixes:updatesAndFixes}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await result.json();
        this.setState({
            response:body
        });
    };

    // Handle search submit
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.makeSearch(this.state.userEmail, this.state.dailyArticles, this.state.updatesAndFixes);
        document.getElementById("successPopup").style.display = "block";
    }

    handleChange = (e) => {
        e.preventDefault();
        //console.log(e.target.value);
        if(e.target.name === "dailyArticlesField"){
            this.setState({
                dailyArticles:!this.state.dailyArticles,
            })
        }
        else if(e.target.name === "updatesAndFixesField"){
            this.setState({
                updatesAndFixes:!this.state.updatesAndFixes,
            })
        }
        else if(e.target.name === "userEmailField"){
            this.setState({
                userEmail:e.target.value,
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
                {
                    <div id="successPopup" className="alert alert-success alert-dismissable" style={{"display": "none"}}>
                        <button type="button" class="close" data-dismiss="alert" >&times;</button>
                        Success! You are now subscribed to AquinasDaily!
                    </div>                  
                    
                }
                
                <Row>
                    <Col className="text-center">
                    <h1>Subscribe Here</h1>
                    <p>Stay connected with AquinasDaily updates, fixes, articles, and innovations to the platform.</p>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col></Col>
                    <Col className="shadow-lg p-3 mb-5 bg-white rounded m-3">
                    <h3>Subscription Selection</h3>
                    <hr></hr>
                    <form className="" 
                            onSubmit={(e) => this.handleSubmit(e)}>
                                        
                                        <div className="form-inline">
                                            <label>AquinasDaily Articles</label>
                                            <input className="form-control mr-sm-2 m-3" 
                                                    type="checkbox" 
                                                    name={"dailyArticlesField"}
                                                    checked={this.state.dailyArticles}
                                                    onChange={e => this.handleChange(e)}> 
                                                    </input>
                                        </div>
                                        <div className="form-inline">
                                            <label> New Features, Updates &amp; Fixes</label>
                                            <input className="form-control mr-sm-2 m-3" 
                                                type="checkbox" 
                                                name={"updatesAndFixesField"}
                                                checked={this.state.updatesAndFixes}
                                                onChange={e => this.handleChange(e)}>
                                            </input>
                                        </div>
                                        <div className="form-inline">
                                        <label>Email:</label>
                                            <input className="form-control mr-sm-2 m-3" 
                                            type="text" 
                                            placeholder="blake@aquinasdaily.com" 
                                            aria-label="Email Address"
                                            name={"userEmailField"}
                                            onChange={e => this.handleChange(e)}></input>
                                        </div>
                                        <div className="form-inline">
                                            <button className="btn btn-info my-2 my-sm-0" type="submit">Subscribe</button>
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

export default SubscribePage;