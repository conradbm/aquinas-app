import React from 'react';
import {FaPlus, FaMinus} from 'react-icons/fa';
import { Row, Col } from 'reactstrap';

class ResultsSection extends React.Component {
    render(){
        return(
                <Row>
                    <Col className="">
                    <div className="explore-results-div">
                        <h2 className="text-center">Results</h2>
                        
                        {this.props.searchResults.map((item, i) => 
                                <div className="search-result-item" key={i}>


                                    <div className="card mt-3 ml-3 mr-3 mb-3">                                    
                                        <h3 className='card-header pointer '
                                            onClick={(e) => this.props.toggleContent(e, i)}>
                                            {this.props.displayResults[i] ?
                                            <FaMinus></FaMinus> : 
                                            <FaPlus> </FaPlus>} Content
                                        </h3>

                                        <a 
                                            href="" 
                                            className="mt-3 ml-3 mr-3"
                                            value={`${item.volumeKey}/${item.questionKey}/${item.articleKey}`}
                                            onClick={(e) => {e.preventDefault()}}>
                                                    {`${item.volumeKey}/${item.questionKey}/   ${item.articleKey}`}
                                        </a>
                                        <div className="mt-3 ml-3 mr-3 mb-3">
                                            <p>{`${item.volume}`} &nbsp; {`${item.questionTitle}`}</p>
                                            <strong>{`${item.articleTitle}`}</strong>
                                        </div>

                                        <div className={
                                                    this.props.displayResults[i] ? 
                                                    "card-body" : 
                                                    "card-body ".concat("hide")
                                                }
                                                >
                                            <h4>Objections ...</h4>
                                                {item.articleObjections.map((obj,j) => (
                                                    <p key={j} className="objection-item">{obj}</p>
                                                ))}
                                            <h4>Body ...</h4>
                                            <p className="body-item">
                                                {item.articleBody}
                                            </p>
                                            <p></p>
                                            <h4>Reply to Objections ...</h4>
                                                {item.articleReplyToObjections.map((obj,j) => (
                                                    <p key={j} className="reply-to-objection-item">{obj}</p>
                                                ))}    
                                        </div>
                                    </div>
                                </div>
                        )}
                    </div>
                    </Col>
                </Row>
        )
    }
}
export default ResultsSection;