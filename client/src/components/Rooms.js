import React from 'react';
import NewRoomForm from './NewRoomForm';
import { Route } from 'react-router-dom';

class Rooms extends React.Component {
    state = {
        name: ""
    }

    componentDidUpdate() {
        // console.log(this.props.wsConnected)
        if (this.props.wsConnected === true) {
            this.props.wsSubscribeRoomsList(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`)
        }
    }

    componentWillUnmount(){
        this.props.wsUnsubscribeRoomsList(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`);
    }
    
    clickHandler = () => {
        this.props.logOut(this.props.history)
    }

    changeHandler = event => {
        this.setState({
            name: event.target.value
        })
    }

    renderRooms = () => (this.props.rooms.map((room, index) => <li key={index}>{room.name}<br/>{room.no_users}/8</li>))

    createRoom = event => {
        event.preventDefault();
        this.props.wsCreateRoom(this.state);
    }

    render () {
        return (
            <div>
                Rooms<br/>
                <button onClick={() => this.props.history.push(`/rooms/new`)}>New Room</button><br/>
                <Route path="/rooms/new" render={routerProps => <NewRoomForm name={this.state.name} createRoom={this.createRoom} changeHandler={this.changeHandler}/>}/>
                <ul>
                    {this.renderRooms()}
                </ul>
                <button onClick={this.clickHandler}>Log Out</button>
            </div>
        )
    }
}

export default Rooms