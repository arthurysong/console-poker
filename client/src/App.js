import React from 'react';
import Home from './Home';
import Rooms from './Rooms';
import { connect } from 'react-redux';
import { setLogin } from './dispatchActions';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" render={routerProps => <Home {...routerProps} setLogin={this.props.setLogin}/>}/>
        <Route exact path="/rooms" render={routerProps => <Rooms {...routerProps} />}/>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: history => dispatch(setLogin(history)),
    // logOut: () => dispatch(logOut())
  }
}

export default connect(null, mapDispatchToProps)(App);
