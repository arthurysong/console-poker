import React from 'react';
import Home from './Home';
import Rooms from './Rooms';
import { connect } from 'react-redux';
import { setLogin, logOut, register, loadRooms } from '../redux/dispatchActions';
import { wsSend, wsSubscribeRoomsList, wsConnect, wsCreateRoom } from '../redux/wsActions';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';

class App extends React.Component {
  componentDidMount() {
        this.props.wsConnect(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`);
  } 
  // I'm going to do this if user successfully logs in actually.

  render() {
    return (
      <>
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
              wsConnected={this.props.wsConnected}
              wsCreateRoom={this.props.wsCreateRoom}
              wsSubscribeRoomsList={this.props.wsSubscribeRoomsList}
              wsSend={this.props.wsSend}/>}/>

          <Route path="/register" render={routerProps => <Register {...routerProps} register={this.props.register}/>}/>
        </Switch>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (state,history) => dispatch(register(state,history)),
    setLogin: history => dispatch(setLogin(history)),
    logOut: history => dispatch(logOut(history)),
    loadRooms: () => dispatch(loadRooms()),
    wsConnect: host => dispatch(wsConnect(host)),
    wsSubscribeRoomsList: host => dispatch(wsSubscribeRoomsList(host)),
    wsSend: msg => dispatch(wsSend(msg)),
    wsCreateRoom: state => dispatch(wsCreateRoom(state))
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    wsConnected: state.wsConnected,
    processingAuth: state.processingAuth,
    rooms: state.rooms
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
