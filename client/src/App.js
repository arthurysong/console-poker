import React from 'react';
import Home from './Home';
import Rooms from './Rooms';
import { connect } from 'react-redux';
import { setLogin, logOut } from './dispatchActions';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" render={routerProps => <Home {...routerProps} setLogin={this.props.setLogin}/>}/>
        <Route exact path="/rooms" render={routerProps => <Rooms {...routerProps} logOut={this.props.logOut}/>}/>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: history => dispatch(setLogin(history)),
    logOut: history => dispatch(logOut(history))
  }
}

export default connect(null, mapDispatchToProps)(App);
