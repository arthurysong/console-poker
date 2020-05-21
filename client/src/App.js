import React from 'react';
import LoginForm from './LoginForm'

class App extends React.Component {
  componentDidMount() {
    this.props.setLoginStatus();
  }

  render() {
    return (
      <div className="App">
        <LoginForm/>      
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoginStatus: () => dispatch(setLoginStatus())
  }
}

export default connect(null, mapDispatchToProps)(App);
