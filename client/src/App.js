import React from 'react';
import Home from './Home';
import Rooms from './Rooms';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { setLogin, logOut, addError } from './dispatchActions';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';

class App extends React.Component {
  // renderRedirectRoute = () =>  {
  //   if (!this.props.isLoggedIn) {
  //     return (<Route path="/" render={() => <Redirect to="/"/>}/>)
  //   }
  // }

  render() {
    return (
      <Router>
        <Route path="/" render={routerProps => <Home {...routerProps} setLogin={this.props.setLogin} isLoggedIn={this.props.isLoggedIn} processing_auth={this.props.processing_auth}/>}/>
        <Switch>
          <Route path="/login" render={routerProps => <LoginForm {...routerProps}/>}/>
          <Route path="/rooms" isLoggedIn={this.props.isLoggedIn} render={routerProps => <Rooms {...routerProps} logOut={this.props.logOut} addError={this.props.addError}/>}/>
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: history => dispatch(setLogin(history)),
    logOut: history => dispatch(logOut(history)),
    addError: error => dispatch(addError(error))
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    processing_auth: state.processing_auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
