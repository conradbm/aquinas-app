import React from 'react';
import { Link } from 'react-router-dom'
import {FaGlobe, FaQuestion, FaBookOpen} from 'react-icons/fa';
import {FaCompass, FaPeopleCarry} from 'react-icons/fa';

class NavBar extends React.Component {

    state = {
        activeTab:'home',
        username:'Guest'
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
                <Link className="navbar-brand mr-3" to={"/"} >AquinasDaily</Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}>Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Explore</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <div className="form-inline"></div>
                                    <Link className="dropdown-item" to={"/research"}><FaBookOpen className="mr-3"></FaBookOpen> Research <span className="sr-only">(current)</span></Link>
                                    <Link className="dropdown-item " to={"/search"}><FaCompass className="mr-3"></FaCompass> Search <span className="sr-only">(current)</span></Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item disabled" to={"/askaquinas"}><FaQuestion className="mr-3"></FaQuestion> AskAquinas <span className="sr-only">(current)</span></Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Community</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                    <Link className="dropdown-item" to={"/subscribe"}><FaGlobe className="mr-3"></FaGlobe> Subscribe <span className="sr-only">(current)</span></Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item disabled" to={"/connect"}><FaPeopleCarry className="mr-3"></FaPeopleCarry> Connect <span className="sr-only">(current)</span></Link>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {/* <li>
                            <a href="#">
                                <span className="navbar-text label mr-3" style={{"color": "black"}}>
                                    Hello, {this.state.username}!
                                </span>
                            </a>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link mr-3" to={"/login"}>Login <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-info" to={"/signup"}>Sign up <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}

export default NavBar;