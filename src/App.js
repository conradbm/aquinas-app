import React, {Component} from 'react';
import './css/App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ResearchPage from './pages/ResearchPage';
import SubscribePage from './pages/SubscribePage';
import ConnectPage from './pages/ConnectPage';
// import AskAquinasBar from './components/AskAquinasBar'
import NotFoundPage from './pages/NotFoundPage';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

class App extends Component {

  // Setup constructor
  state = {
    data:{}
  };

  render(){
    return(
          <Router>
          <div className="App">
            <NavBar></NavBar>
            <div id='page-body'>
              <Switch>
                <Route path="/" component={HomePage} exact></Route>
                <Route path="/research" component={ResearchPage} ></Route>
                <Route path="/search" component={SearchPage}></Route>
                <Route path="/subscribe" component={SubscribePage}></Route>
                <Route path="/connect" component={ConnectPage}></Route>
                {/* <Route path="/article/:name" component={ArticlePage}  /> */}
                <Route component={NotFoundPage}></Route>
              </Switch>
            </div>
            {/* <AskAquinasBar></AskAquinasBar> */}
          </div>
        </Router>
    )
  }

};

export default App;
