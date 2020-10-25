import React from 'react';
import {FaPlus, FaMinus} from 'react-icons/fa';
import { Row } from 'reactstrap';

class SuggestedReadingSection extends React.Component {
    render(){
        return(
                <Row>
                <div className="card mt-3 ">
                    <div key className="search-results">
                        
                        <h3 className='card-header pointer '
                            onClick={(e) => this.props.toggleSimilarHeader(e)}>
                            {this.props.displaySimilar ?
                            <FaMinus></FaMinus> : 
                            <FaPlus> </FaPlus>}  Suggested Readings
                        </h3>
                        
                        <div className={
                                    this.props.displaySimilar ? 
                                    "card-body" : 
                                    "card-body ".concat("hide")
                                }
                                >  
                            {this.props.similarityData.map((item,i) => 
                                <div className="card search-result-item" key={i}>
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
                                </div>
                                
                            )} 
                        </div>
                    </div>
                </div>
                <br></br>
                </Row>
        )
    }
}

export default SuggestedReadingSection;

