import React from 'react';
import Home from './Home';
import Rooms from './Rooms';
import { connect } from 'react-redux';
import { setLogin, logOut, register} from '../redux/dispatchActions';
import { wsSubscribeRoomsList, wsUnsubscribeRoomsList, wsConnect, wsCreateRoom } from '../redux/wsActions';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';

class App extends React.Component {
  render() {
    return (
      <>
        <Route path="/" render={routerProps => <Home {...routerProps} setLogin={this.props.setLogin}/>}/>
        <Switch>
          <Route path="/login" render={routerProps => <LoginForm {...routerProps}/>}/>
          <Route path="/rooms" render={routerProps => 
            <Rooms {...routerProps} 
              logOut={this.props.logOut} 
              rooms={this.props.rooms}
              wsConnected={this.props.wsConnected}
              wsCreateRoom={this.props.wsCreateRoom}
              wsSubscribeRoomsList={this.props.wsSubscribeRoomsList}
              wsUnsubscribeRoomsList={this.props.wsUnsubscribeRoomsList}
              isLoggedIn={this.props.isLoggedIn}
              />}/>

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
    // loadRooms: () => dispatch(loadRooms()),
    wsConnect: host => dispatch(wsConnect(host)),
    wsSubscribeRoomsList: host => dispatch(wsSubscribeRoomsList(host)),
    wsUnsubscribeRoomsList: host => dispatch(wsUnsubscribeRoomsList(host)),
    // wsSend: msg => dispatch(wsSend(msg)),
    wsCreateRoom: state => dispatch(wsCreateRoom(state))
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    wsConnected: state.wsConnected,
    // processingAuth: state.processingAuth,
    rooms: state.rooms
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
