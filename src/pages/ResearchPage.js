import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {FaPlus, FaMinus} from 'react-icons/fa';

/**
 * Front-end Requirements ...
 * 1. Search for drop down boxes on Questions and Articles
 * 2. CSS formatting for all search results
 * 3. Accessing data from a MongoDB
 * 4. Hyperlink clicking on sections of the result to enable more indepth discovery
 * 
 * Back-end Requirements ...
 * 1. Create a similarity matrix blobing all content from questionTitle, articleTitle, and content to map each article to each
 * 2. Create the MongoDB
 * 3. Create Express API to access data from the MongoDB
 * 
 */
class ResearchPage extends React.Component {

    state = {
        selectedVolume: undefined,
        selectedQuestion: undefined,
        selectedArticle: undefined,
        shell_data:[],
        display_data:{articleObjections:[], articleBody:"", articleReplyToObjections:[]},
        filteredData:undefined,
        displayResearch:true,
        displayResults:true,
        displaySimilar:false,
        selectedVolumeKey:"",
        selectedQuestionKey:"",
        selectedArticleKey:"",
        similarityData:[],
    }

    // Fetch data helper
    fetchData = async (v,q,a) => {
        // let v = this.state.selectedVolumeKey;
        // let q = this.state.selectedQuestionKey;
        // let a = this.state.selectedArticleKey;
        let url = `/api/articles/${v}/${q}/${a}`;
        //console.log(url);
        const result = await fetch(url, {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        const body = await result.json();
        this.setState({display_data:body});        
    }


    // Fetch data helper
    fetchSimilarityData = async (v,q,a) => {
        let url = `/api/similarity/${v}/${q}/${a}`;
        //console.log(url);
        const rankResults = await fetch(url, {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        const bodyRanks = await rankResults.json();

        const recommendedList = [];
        bodyRanks.ranks.map(async (rank, i) => {
            let url = `/api/articles/${rank.volumeKey}/${rank.questionKey}/${rank.articleKey}`;
            //console.log(`Result ${i}`);
            //console.log(url);
            const contentResult = await fetch(url, {
                method: "GET",
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const resultData = await contentResult.json();
            recommendedList.push(resultData);
        });
        //console.log(recommendedList);
        this.setState({similarityData:recommendedList});  
      
    }
    

  // Load data on mount
  componentDidMount = () => {
    fetch(`aquinas_shell.json`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((shell_data) => {

        // Fetch initial content
        const v = shell_data[0].volumeKey;
        const q = shell_data[0].questionKey;
        const a = shell_data[0].articleKey;

        this.fetchData(v,q,a);
        this.fetchSimilarityData(v,q,a);

        this.setState({
            shell_data:shell_data,
            selectedVolume:shell_data[0].volume, 
            selectedVolumeKey:shell_data[0].volumeKey,
            selectedQuestion:shell_data[0].questionTitle,
            selectedQuestionKey:shell_data[0].questionKey, 
            selectedArticle:shell_data[0].articleTitle,
            selectedArticleKey:shell_data[0].articleKey,
        });
      });
    }

    // Handle Select
    handleInputChange(e, cat) {
        //console.log(event.target.value);
        if (cat === "volume"){

            // Get things we know
            let volume = e.target.value;

            // Update the selected question
            const filteredData = this.state.shell_data.filter(item => item.volume === volume);
            const selectedQuestion = filteredData[0].questionTitle;
            const volumeKey = filteredData[0].volumeKey;
            const filteredTwice = filteredData.filter(item => item.questionTitle.includes("Question 1."));
            const selectedArticle = filteredTwice[0].articleTitle;
            const questionKey = filteredTwice[0].questionKey;
            const articleKey = filteredTwice[0].articleKey;

            // Update content data from db
            this.fetchData(volumeKey, questionKey, articleKey);
            this.fetchSimilarityData(volumeKey, questionKey, articleKey);

            // Set state
            this.setState({
                selectedVolume:volume,
                selectedVolumeKey:volumeKey,
                selectedQuestion:selectedQuestion,
                selectedQuestionKey:questionKey,
                selectedArticle:selectedArticle,
                selectedArticleKey:articleKey,
            });
        }
        else if (cat === "question"){

            // Get things we know
            let volume = this.state.selectedVolume;
            let question = e.target.value;

            // Update the selected question
            const filteredData = this.state.shell_data.filter(item => item.volume === volume);
            const volumeKey = filteredData[0].volumeKey;
            const filteredTwice = filteredData.filter(item => item.questionTitle === question);
            const questionKey = filteredTwice[0].questionKey;
            const selectedArticle = filteredTwice[0].articleTitle;
            const articleKey = filteredTwice[0].articleKey;

            // Update content data from db
            this.fetchData(volumeKey, questionKey, articleKey);
            this.fetchSimilarityData(volumeKey, questionKey, articleKey);

            // Set state
            this.setState({
                selectedVolume:volume,
                selectedVolumeKey:volumeKey,
                selectedQuestion:question,
                selectedQuestionKey:questionKey,
                selectedArticle:selectedArticle,
                selectedArticleKey:articleKey,
            });
        }
        else if (cat === "article"){

            const article = e.target.value;
            const selectedArticle = this.state.shell_data.filter(item => item.articleTitle === article);
            const volumeKey = selectedArticle[0].volumeKey;
            const questionKey = selectedArticle[0].questionKey;
            const articleKey = selectedArticle[0].articleKey;

            // Update content data from db
            this.fetchData(volumeKey, questionKey, articleKey);
            this.fetchSimilarityData(volumeKey, questionKey, articleKey);

            // Set state
            this.setState({
                selectedArticle:article,
                selectedVolumeKey:volumeKey,
                selectedQuestionKey:questionKey,
                selectedArticleKey:articleKey,
            });
        }
        else{
            console.log(`Something went wrong on select on ${cat} change.`);
        }

        // Update live data for display
        // this.fetchData();
        // console.log(this.state.display_data);

        //console.log(this.state.shell_data.filter(item => item.articleTitle === this.state.selectedArticle));
    }
    naturalCompare = (a, b) => {
        var ax = [], bx = [];
    
        a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
        b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
        
        while(ax.length && bx.length) {
            var an = ax.shift();
            var bn = bx.shift();
            var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
            if(nn) return nn;
        }
    
        return ax.length - bx.length;
    }

    // Toggle research header
    toggleResearchHeader = (e) => {
        //console.log("working header");
        this.setState({
            displayResearch:!this.state.displayResearch
        });
    }

    // Toggle research header
    toggleResultsHeader = (e) => {
        //console.log("working results");
        this.setState({
            displayResults:!this.state.displayResults
        });
    }

    // Toggle similar header
    toggleSimilarHeader = (e) => {
        this.setState({
            displaySimilar:!this.state.displaySimilar,
        })
    }

    // // Handle Similar Select
    // handleSimilarSelect = (e, volumeKey, questionKey, articleKey) => {
    //     e.preventDefault();

    //     const selection = this.state.shell_data.filter(item => item.volumeKey === volumeKey).filter(item => item.questionKey === questionKey).filter(item => item.articleKey === articleKey);
    //     const volume = selection.volume;
    //     const selectedQuestion = selection.questionTitle;
    //     const selectedArticle = selection.articleTitle;
        

    //     // Update content data from db
    //     this.fetchData(volumeKey, questionKey, articleKey);
    //     this.fetchSimilarityData(volumeKey, questionKey, articleKey);

    //     // Set state
    //     this.setState({
    //         selectedVolume:volume,
    //         selectedVolumeKey:volumeKey,
    //         selectedQuestion:selectedQuestion,
    //         selectedQuestionKey:questionKey,
    //         selectedArticle:selectedArticle,
    //         selectedArticleKey:articleKey,
    //     });

    //     //Set the pickers to the right location.
    //     const volumePicker = document.getElementById("volumePicker");
    //     volumePicker.value = volume;

    //     const questionPicker = document.getElementById("questionPicker");
    //     questionPicker.value = selectedQuestion;

    //     const articlePicker = document.getElementById("articlePicker");
    //     articlePicker.value = selectedArticle;
        

    // }

    render(){
        return(
            <div>
                <Container>
                <br></br>
                    <Col className="">
                        <h1>Research Content</h1>
                        <p>This is the place where you can research specific sections of Aquinas. </p>
                        <p>We also provide some suggested readings as cross references to the any selected article for further research.</p>

                    </Col>
                    <br></br>
                    <Col>
                        <Row className="card mt-3"> 
                                <h3 className="card-header pointer"
                                     onClick={(e) => this.toggleResearchHeader(e)}>
                                    {this.state.displayResearch ? 
                                     <FaMinus></FaMinus> :
                                     <FaPlus></FaPlus>} Research
                                </h3>
                                <div className={
                                        this.state.displayResearch ? 
                                        "card-body" : 
                                        "card-body ".concat("hide")
                                    }
                                    >
                                    <div id="volume-select-div">
                                        <h4>Volume</h4>
                                        <select className="form-control selectpicker" id="volumePicker"
                                                defaultValue={this.state.selectedVolume}
                                                onChange={(e) => this.handleInputChange(e, 'volume')}
                                                >
                                                {
                                                Array.from(new Set(this.state.shell_data
                                                    .map(item => item.volume)))
                                                    .sort()
                                                .map((uniqueVolume,i) => 
                                                    <option key={i} value={uniqueVolume}>{uniqueVolume}</option>
                                                )
                                                }
                                    </select>
                                    </div>

                                    <div id="question-select-div">
                                        <h4>Question</h4>
                                        <select className="form-control selectpicker" id="questionPicker"
                                                data-live-search={true}
                                                defaultValue={this.state.selectedQuestion}
                                                onChange={(e) => this.handleInputChange(e, 'question')}>
                                            {
                                                Array.from(new Set(this.state.shell_data
                                                    .filter(item => item.volume === this.state.selectedVolume)
                                                    .map(item => item.questionTitle)))
                                                    .sort((a,b) => this.naturalCompare(a,b))
                                                .map((uniqueQuestion,i) => 
                                                    <option key={i} value={uniqueQuestion}>{uniqueQuestion}</option>
                                                )
                                            }
                                    </select>
                                </div>

                                <div id="article-select-div">
                                        <h4>Article</h4>
                                        <select className="form-control selectpicker" id="articlePicker"
                                                defaultValue={this.state.selectedArticle}
                                                onChange={(e) => this.handleInputChange(e, 'article')}>
                                                {
                                                Array.from(new Set(this.state.shell_data
                                                    .filter(item => item.questionTitle === this.state.selectedQuestion)
                                                    .map(item => item.articleTitle)))
                                                    .sort((a,b) => this.naturalCompare(a,b))
                                                .map((uniqueArticle,i) => 
                                                    <option key={i} value={uniqueArticle}>{uniqueArticle}</option>
                                                )
                                            }
                                    </select>
                                    </div> 
                                </div>
                               
                        </Row>
                        <br></br>
                        <hr></hr>
                        <Row>
                            <div className="card mt-3 ">                                    
                                <h3 className='card-header pointer '
                                    onClick={(e) => this.toggleResultsHeader(e)}>
                                    {this.state.displayResults ?
                                    <FaMinus></FaMinus> : 
                                    <FaPlus> </FaPlus>} Results
                                </h3>
                                
                                <div className={
                                            this.state.displayResults ? 
                                            "card-body" : 
                                            "card-body ".concat("hide")
                                        }
                                        >
                                    <h4>Objections ...</h4>
                                        {this.state.display_data.articleObjections.map((obj,j) => (
                                            <p key={j} className="objection-item">{obj}</p>
                                        ))}
                                    <h4>Body ...</h4>
                                    <p className="body-item">
                                        {this.state.display_data.articleBody}
                                    </p>
                                    <p></p>
                                    <h4>Reply to Objections ...</h4>
                                        {this.state.display_data.articleReplyToObjections.map((obj,j) => (
                                            <p key={j} className="reply-to-objection-item">{obj}</p>
                                        ))}    
                                </div>
                            </div>
                        </Row>

                        <br></br>
                        <hr></hr>
                        <Row>
                            <div className="card mt-3 ">
                                <div key className="search-results">
                                    
                                    <h3 className='card-header pointer '
                                        onClick={(e) => this.toggleSimilarHeader(e)}>
                                        {this.state.displaySimilar ?
                                        <FaMinus></FaMinus> : 
                                        <FaPlus> </FaPlus>}  Suggested Readings
                                    </h3>
                                    
                                    <div className={
                                                this.state.displaySimilar ? 
                                                "card-body" : 
                                                "card-body ".concat("hide")
                                            }
                                            >  
                                        {this.state.similarityData.map((item,i) => 
                                        <>
                                            <div className="result-item p-3 mb-5 bg-white rounded m-1" key={i}>
                                                <a 
                                                    href="" 
                                                    className=""
                                                    value={`${item.volumeKey}/${item.questionKey}/${item.articleKey}`}
                                                    // onClick={(e) => {this.handleSimilarSelect(e, item.volumeKey, item.questionKey, item.articleKey)}}>
                                                    onClick={(e) => {e.preventDefault()}}>
                                                            {`${item.volumeKey}/${item.questionKey}/${item.articleKey}`}
                                                </a>
                                                <div className="">
                                                    <p>{`${item.volume}`} &nbsp; {`${item.questionTitle}`}</p>
                                                    <strong>{`${item.articleTitle}`}</strong>
                                                </div>
                                            </div>
                                            <hr></hr>
                                        </>
                                        )} 
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Col>
                    <br></br>
                    <br></br>
                </Container>
            </div>
        )
    }
}

export default ResearchPage;