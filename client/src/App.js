import React from 'react';
import LoginForm from './LoginForm'
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
      <div className="App">
        <LoginForm/>      
      </div>
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
