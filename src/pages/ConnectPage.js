import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {FaTools} from 'react-icons/fa';

class ConnectPage extends React.Component {
    render(){
        return(
            
            <Container>
                <br></br>
                <Row>
                    <Col>
                        <h1>Currently Under Construction <FaTools></FaTools></h1>
                    </Col>
                </Row>
            </Container>
        //     <Container>
        //     <br></br>
        //     <Row className="">
        //         <h1>Connect With Others</h1>
        //         <p>AquinasDaily is a platform dedicated to connecting likeminded thinkers and learners. We offer two ways of doing this:</p>
        //         <ul>
        //             <li>Subscribing to our communication services</li>
        //             <li>Connecting to others in our community</li>
        //         </ul>
        //     </Row>
        //     <br></br>
        //     <Row>
        //         <Col>
        //         <h1>How It Works</h1>
        //         <p>We facilitate discrete grouping of like individuals. We do this in several ways, but below is the essense:</p>
        //         </Col>

        //     </Row>
        //     <Row>
                
        //         <Col className="shadow-lg p-3 mb-5 bg-white rounded m-3">
        //             <h3>Grouping <FaLocationArrow></FaLocationArrow> </h3>  
        //             <p>Connect like-natured individuals together by demographics. </p>
        //         </Col>
        //         <Col className="shadow-lg p-3 mb-5 bg-white rounded m-3">
        //             <h3>Interest <FaBrain></FaBrain></h3>
        //             <p>Connect like-minded individuals together by interest. </p>
        //         </Col>
            
        //     </Row>
        //     <Row className="shadow-lg p-3 mb-5 bg-white rounded">
        //         {/* <form>
        //             <input type="button"> </input>
        //         </form> */}
        //     </Row>
        // </Container>
        )
    }
}

export default ConnectPage;