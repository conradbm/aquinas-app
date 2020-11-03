import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {FaCompass, FaPeopleCarry} from 'react-icons/fa';


class HomePage extends React.Component {
    render(){
        return(
            <div>
                <Container>
                    <br></br>
                    <Row className="">
                        <Col className="text-center">
                            <h1>Welcome to AquinasDaily</h1>
                            <p>AquinasDaily is a platform dedicated to research and learning of St. Thomas Aquinas' Summa Theologica.</p>
                        </Col>
                    </Row>
                    <br></br>
                    <Row className="">
                        <Col className="shadow-lg p-3 mb-5 bg-white rounded m-3">
                            <h3>Explore <FaCompass></FaCompass></h3>
                            <hr></hr>
                            <p>Travel to the <em>Explore</em> tab to search and engage the summa. </p>
                            <ul>
                                <li>The <em>Research</em> tab will satisfy your exact interests if you know what you want</li>
                                <li>The <em>Search</em> tab will help you find things you want to learn</li>
                                {/* <li>These pages also offer an <em>AskAquinas</em> feature, allowing you to engage in Q&amp;A with Aquinas.</li> */}
                            </ul>
                        </Col>
                        <Col className="shadow-lg p-3 mb-5 bg-white rounded m-3">
                            <h3>Community <FaPeopleCarry></FaPeopleCarry></h3>
                            <hr></hr>
                            <p>Travel to the <em>Community</em> tab to connect with us in our community.</p>
                            <ul>
                                <li><em>Subscribe</em> tab will place you in our AquinasDaily newsletter to engage the summa daily</li>
                                <li><em>Connect</em> tab will allow you to find other folks who are like you and begin connecting with them daily to learn and grow in the faith</li>
                            </ul>
                        </Col>
                   
                    </Row>
                </Container>
            </div>
        )
    }
}

export default HomePage;