import React from 'react';
import { Row } from 'reactstrap';
import {FaPlus, FaMinus} from 'react-icons/fa';


class ResultsSection extends React.Component {
    render(){
        return(
                <Row>
                <div className="card mt-3 ">                                    
                    <h3 className='card-header pointer '
                        onClick={(e) => this.props.toggleResultsHeader(e)}>
                        {this.props.displayResults ?
                        <FaMinus></FaMinus> : 
                        <FaPlus> </FaPlus>} Results
                    </h3>
                    
                    <div className={
                                this.props.displayResults ? 
                                "card-body" : 
                                "card-body ".concat("hide")
                            }
                            >
                        <h4>Objections ...</h4>
                            {this.props.displayData.articleObjections.map((obj,j) => (
                                <p key={j} className="objection-item">{obj}</p>
                            ))}
                        <h4>Body ...</h4>
                        <p className="body-item">
                            {this.props.displayData.articleBody}
                        </p>
                        <p></p>
                        <h4>Reply to Objections ...</h4>
                            {this.props.displayData.articleReplyToObjections.map((obj,j) => (
                                <p key={j} className="reply-to-objection-item">{obj}</p>
                            ))}    
                    </div>
                </div>
            </Row>
        )
    }
}

export default ResultsSection;
