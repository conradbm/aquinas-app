import React from 'react';
import { Row} from 'reactstrap';
import {FaPlus, FaMinus} from 'react-icons/fa';

class SelectArticleSection extends React.Component {
    render(){
        return(
                <Row className="card mt-3"> 
                <h3 className="card-header pointer"
                    onClick={(e) => this.props.toggleResearchHeader(e)}>
                    {this.props.displayResearch ? 
                    <FaMinus></FaMinus> :
                    <FaPlus></FaPlus>} Research
                </h3>
                <div className={
                        this.props.displayResearch ? 
                        "card-body" : 
                        "card-body ".concat("hide")
                    }
                    >
                    <div id="volume-select-div">
                        <h4>Volume</h4>
                        <select className="form-control selectpicker"
                                defaultValue={this.props.selectedVolume}
                                onChange={(e) => this.props.handleInputChange(e, 'volume')}
                                >
                                {
                                Array.from(new Set(this.props.shell_data
                                    .map(item => item.volume)))
                                    .sort()
                                .map((uniqueVolumes,i) => 
                                    <option key={i} value={uniqueVolumes}>{uniqueVolumes}</option>
                                )
                                }
                    </select>
                    </div>

                    <div id="question-select-div">
                        <h4>Question</h4>
                        <select className="form-control selectpicker"
                                data-live-search={true}
                                defaultValue={this.props.selectedQuestion}
                                onChange={(e) => this.props.handleInputChange(e, 'question')}>
                            {
                                Array.from(new Set(this.props.shell_data
                                    .filter(item => item.volume === this.props.selectedVolume)
                                    .map(item => item.questionTitle)))
                                    .sort((a,b) => this.props.naturalCompare(a,b))
                                .map((uniqueQuestion,i) => 
                                    <option key={i} value={uniqueQuestion}>{uniqueQuestion}</option>
                                )
                            }
                    </select>
                </div>

                <div id="article-select-div">
                        <h4>Article</h4>
                        <select className="form-control selectpicker"
                                defaultValue={this.props.selectedArticle}
                                onChange={(e) => this.props.handleInputChange(e, 'article')}>
                                {
                                Array.from(new Set(this.props.shell_data
                                    .filter(item => item.questionTitle === this.props.selectedQuestion)
                                    .map(item => item.articleTitle)))
                                    .sort((a,b) => this.props.naturalCompare(a,b))
                                .map((uniqueArticle,i) => 
                                    <option key={i} value={uniqueArticle}>{uniqueArticle}</option>
                                )
                            }
                    </select>
                    </div> 
                </div>
            
        </Row>
        )
    }
}

export default SelectArticleSection;