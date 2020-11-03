import React from 'react';
import { Row, Col } from 'reactstrap';

class SearchSection extends React.Component {
    render(){
        return(
            <Row>
                <Col className="d-flex justify-content-center">
                    <form className="form-inline my-2 my-lg-0" 
                        onSubmit={(e) => this.props.handleSubmit(e)}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search here..." aria-label="Search" style={{"width":"100%"}}
                                name={"searchField"}
                                onChange={(e) => this.props.handleOnChange(e)}></input>
                        <br></br>
                        <br></br>
                        <button className="btn btn-info my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    {/* <p style={{"color":"light-grey", "font-size":"12px"}}>{this.props.searchText}</p> */}
                </Col>
            </Row>     
        )
    }
}
export default SearchSection;