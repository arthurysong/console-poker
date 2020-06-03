import React from 'react';
import Home from './Home';
import RoomsList from './RoomsList';
import Room from './Room';
import { connect } from 'react-redux';
import { setLogin, logOut, register} from '../redux/dispatchActions';
import { wsSubscribeRoomsList, wsUnsubscribeRoomsList, wsConnect, wsCreateRoom, wsSubscribeRoom } from '../redux/wsActions';
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
          <Route path={`/rooms/:id`} render={routerProps => 
            <Room {...routerProps} 
              wsSubscribeRoom={this.props.wsSubscribeRoom} 
              wsConnected={this.props.wsConnected}
              room={this.props.room}/>}/>
          <Route path="/rooms" render={routerProps => 
            <RoomsList {...routerProps} 
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
    wsCreateRoom: state => dispatch(wsCreateRoom(state)),
    wsSubscribeRoom: room => dispatch(wsSubscribeRoom(room))
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    wsConnected: state.wsConnected,
    // processingAuth: state.processingAuth,
    rooms: state.rooms,
    room: state.room
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
