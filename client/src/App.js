import React from 'react';
import Home from './Home';
import Rooms from './Rooms';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { setLogin, logOut, addError } from './dispatchActions';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  // renderRedirectRoute = () =>  {
  //   if (!this.props.isLoggedIn) {
  //     return (<Route path="/" render={() => <Redirect to="/"/>}/>)
  //   }
  // }

  componentDidMount(){
    this.props.setLogin(); // can i pass in the history here? and have the action redirect?
  }

  render() {
    return (
      <Router>
        {/* {this.renderRedirectRoute()} */}
        <Route exact path="/" render={routerProps => <Home {...routerProps}/>}/>
          {/* this.props.isLoggedIn
          ? <Redirect to="/rooms" /> 
          : <Home {...routerProps} setLogin={this.props.setLogin}/>)}/> */}
        <PrivateRoute path="/rooms" isLoggedIn={this.props.isLoggedIn} component={<Rooms logOut={this.props.logOut} addError={this.props.addError}/>}/>
        {/* // <Route exact path="/rooms" render={routerProps => <Rooms {...routerProps} logOut={this.props.logOut} addError={this.props.addError}/>}/> */}
          {/* // this.props.isLoggedIn
          // ? <Rooms {...routerProps} logOut={this.props.logOut} addError={this.props.addError}/>
          // : <Home {...routerProps} setLogin={this.props.setLogin}/>)}/> */}
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: () => dispatch(setLogin()),
    logOut: () => dispatch(logOut()),
    addError: error => dispatch(addError(error))
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
