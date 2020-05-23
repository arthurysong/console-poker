import React from 'react';
import Home from './Home';
import { connect } from 'react-redux';
import { setLogin } from './dispatchActions';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  componentDidMount() {
    this.props.setLogin();
    if (this.props.isLoggedIn) {
      // this.props.history.push(`/`)
    }
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={routerProps => <Home {...routerProps}/>}/>
      </Router>
      
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setLogin: () => dispatch(setLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
