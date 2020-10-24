import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

    state = {
        activeTab:'home'
    }
    handleClick = (e, tab) => {
        e.preventDefault();
        // console.log(tab);
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
                <Link to={"/"} onClick={(e) => {this.handleClick(e,'home')}}>
                    <img src={require('../logo.png')} 
                        width="30" 
                        height="30" 
                        alt="" 
                        className="mr-3"
                        ></img>
                    </Link>
                <Link className="navbar-brand mr-3" to={"/"}>Aquinas App</Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                         <Link className="nav-link" to={"/research"}>Research <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                         <Link className="nav-link" to={"/explore"}>Explore <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                         <Link className="nav-link" to={"/subscribe"}>Subscribe <span className="sr-only">(current)</span></Link>
                    </li>
                    </ul>

                </div>
            </nav>
        )
    }
}

export default NavBar;