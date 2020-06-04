import React from 'react';
import Home from './Home';
import RoomsList from './RoomsList';
import NewRoomForm from './NewRoomForm';
import Room from './Room';
import { connect } from 'react-redux';
import { setLogin, logOut, register, createRoom } from '../redux/dispatchActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" render={routerProps => <Home {...routerProps} setLogin={this.props.setLogin}/>}/>
        <Switch>
          <Route path="/login" render={routerProps => <LoginForm {...routerProps}/>}/>
          <Route path="/rooms/new" render={routerProps => 
            <NewRoomForm 
              createRoom={this.props.createRoom}/>}/>

          <Route path={`/rooms/:id`} render={routerProps => 
            <Room {...routerProps}/>}/>
          <Route path="/rooms" render={routerProps => 
            <RoomsList {...routerProps} 
              logOut={this.props.logOut} 
              isLoggedIn={this.props.isLoggedIn}
              />}/>

          <Route path="/register" render={routerProps => <Register {...routerProps} register={this.props.register}/>}/>
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (state,history) => dispatch(register(state,history)),
    setLogin: history => dispatch(setLogin(history)),
    logOut: history => dispatch(logOut(history)),
    createRoom: state => dispatch(createRoom(state))
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
