import React from 'react';
import subscribeToRoomsListChannel from './manageSubscriptions';

class Rooms extends React.Component {
    state = {
        name: ""
    }

    componentDidMount(){
        this.props.loadRooms();
        // subscribe to roomslistchannel
        subscribeToRoomsListChannel();
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

    showNewRoomForm = () => (<NewRoomForm name={this.state.name} createRoom={this.createRoom} changeHandler={this.changeHandler}/>)

    render () {
        return (
            <div>
                Rooms
                <button onClick={this.showNewRoomForm}>Create Room</button>
                <ul>
                    {this.renderRooms()}
                </ul>
                <button onClick={this.clickHandler}>Log Out</button>
            </div>
        )
    }
}

export default Rooms