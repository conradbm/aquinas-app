import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SearchSection from './page-components/search-page/SearchSection';
import ResultsSection from './page-components/search-page/ResultsSection';

class SearchPage extends React.Component {

    state = {
        searchText:"",
        searchResults:[],
        displayResults:[],
    }

    // Display content for search result item i
    toggleContent = (e, index) => {
        const tmp = this.state.displayResults[index];
        const newArray = [];
        var i;
        for (i = 0; i < this.state.searchResults.length; i++) {
            if(i === index){
                newArray.push(!this.state.displayResults[i])
            }
            else{
                newArray.push(this.state.displayResults[i])
            }
        }

        // Update state
        this.setState({displayResults:newArray});

    }
    // Execute a search request
    makeSearch = async (inputData) => {
        const result = await fetch(`/api/search`, {
            method:'post',
            body: JSON.stringify({query: inputData}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await result.json();
        this.setState({
            searchResults:body
        });
    };

  // Load data on mount
  componentDidMount = () => {
    console.log("Mounting");
    }

    // Handle search submit
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Search text is currently ${this.state.searchText}`);

        // Get results
        this.makeSearch(this.state.searchText);

        // Set empty display vector
        const newArray = [];
        var i;
        for (i = 0; i < this.state.displayResults.length; i++) {
            newArray.push(false);
        }

        // Update state
        this.setState({displayResults:newArray});

    }

    // Handle on change
    handleOnChange = (e) => {
        this.setState({searchText:e.target.value});
        //this.makeSearch(this.state.searchText);
    }

    render(){
        return(
            <div>
                <Container>
                    <br></br>
                    <Row>
                        <Col>
                             <h1>Search Content </h1>
                             <p>We created a custom search engine just for Aquinas. </p>
                             <p>Search here to find things a little easier.</p>
                             <p>Once you've found something promising, leverage the <em>Research</em> tab to drill in a little deeper.</p>
                        </Col>
                    </Row>
                    <br></br>
                    <SearchSection
                        handleSubmit={this.handleSubmit}
                        handleOnChange={this.handleOnChange}
                        searchText={this.state.searchText}
                    >
                    </SearchSection>
                    <hr></hr>
                    <ResultsSection
                        searchResults={this.state.searchResults}
                        toggleContent={this.toggleContent}
                        displayResults={this.state.displayResults}
                    >

                    </ResultsSection>

                </Container>
            </div>
        )
    }
}

export default SearchPage;