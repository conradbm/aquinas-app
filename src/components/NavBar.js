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
                <Link className="navbar-brand mr-3" to={"/"}>AquinasDaily</Link>
                
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
                                    <Link className="dropdown-item" to={"/research"}>Research <span className="sr-only">(current)</span></Link>
                                    <Link className="dropdown-item " to={"/search"}>Search <span className="sr-only">(current)</span></Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Community</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                    <Link className="dropdown-item" to={"/subscribe"}>Subscribe <span className="sr-only">(current)</span></Link>
                                    <Link className="dropdown-item" to={"/connect"}>Connect <span className="sr-only">(current)</span></Link>
                            </div>
                        </li>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button class="btn" href="">Login</button>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-info" href="">Sign Up</button>
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}

export default NavBar;