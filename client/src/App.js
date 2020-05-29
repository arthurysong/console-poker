import React from 'react';
import Home from './Home';
import Rooms from './Rooms';
import { connect } from 'react-redux';
import { setLogin, logOut, register, loadRooms } from './dispatchActions';
import { wsConnect, wsSend } from './wsActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';

class App extends React.Component {
  componentDidMount() {
        this.props.wsConnect(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`);
  }

  render() {
    return (
      <Router>
        <Route path="/" render={routerProps => <Home {...routerProps} setLogin={this.props.setLogin}/>}/>
        <Switch>
          <Route path="/login" render={routerProps => <LoginForm {...routerProps}/>}/>
          <Route path="/rooms" render={routerProps => 
            <Rooms {...routerProps} 
              logOut={this.props.logOut} 
              isLoggedIn={this.props.isLoggedIn}
              loadRooms={this.props.loadRooms} 
              reloadRooms={this.props.reloadRooms} 
              rooms={this.props.rooms}
              wsConnect={this.props.wsConnect}
              wsSend={this.props.wsSend}/>}/>
          <Route path="/register" render={routerProps => <Register {...routerProps} register={this.props.register}/>}/>
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (state,history) => dispatch(register(state,history)),
    setLogin: history => dispatch(setLogin(history)),
    logOut: history => dispatch(logOut(history)),
    loadRooms: () => dispatch(loadRooms()),
    // reloadRooms: data => dispatch(reloadRooms(data)),
    wsConnect: host => dispatch(wsConnect(host)),
    wsSend: msg => dispatch(wsSend(msg))
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    processing_auth: state.processing_auth,
    rooms: state.rooms
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
