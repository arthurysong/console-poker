import React from 'react';
import consumer from './consumer';
import NewRoomForm from './NewRoomForm';
import { Route } from 'react-router-dom';

class Rooms extends React.Component {
    state = {
        name: ""
    }

    componentDidMount(){
        // this.props.loadRooms(); // instead I'm going to connect to websockets connection

        // subscribe to roomslistchannel
        // this.subscription = consumer.subscriptions.create({ channel: "RoomsListChannel" }, {
        //         received(data) {
        //             //update store with data...
        //             console.log(data);
        //             this.props.reloadRooms(data);
        //         }
        //     })
        if (this.props.isLoggedIn) {
            this.props.wsConnect(`http://localhost:3001/cable`)
        }
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
        // this.subscription.send(this.state)
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