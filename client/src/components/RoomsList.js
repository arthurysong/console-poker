import React from 'react';
import NewRoomForm from './NewRoomForm';
import RoomListItem from './RoomListItem';
import Cable from 'actioncable';

class Rooms extends React.Component {
    state = {
        name: "",
        rooms: [],
        newForm: false
    }

    handleData(data){
        if (data.type === 'current_rooms'){
            this.setState({
                rooms: data.rooms
            })
        } else if (data.type === 'new_room'){
            this.setState(prevState => ({
                rooms: [...prevState.rooms, data.room]
            }))
        }
        
    }

    componentDidMount(){
        let cable = Cable.createConsumer(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`);

        this.subscription = cable.subscriptions.create({
            channel: 'RoomsListChannel'
          }, {
            connected: () => {},
            disconnected: () => {},
            received: (data) => {
                console.log(data);
                this.handleData(data);
            },
            createRoom: function(name){
              this.perform('create_room', {
                name: name
              });
            }
        });
    }

    componentWillUnmount(){
        this.subscription.disconnected();
    }
    
    clickHandler = () => {
        this.props.logOut(this.props.history)
    }

    changeHandler = event => {
        this.setState({
            name: event.target.value
        })
    }

    renderRooms = () => (this.state.rooms.map((room) => <RoomListItem key={room.id} room={room} wsSubscribeRoom={this.props.wsSubscribeRoom}/>))

    createRoom = event => {
        event.preventDefault();
        this.subscription.createRoom(this.state.name)
    }

    toggleNewForm = () => {
        this.setState(prevState => ({
            newForm: !prevState.newForm
        }));
    }

    render () {
        return (
            <div>
                Rooms<br/>
                <button onClick={this.toggleNewForm}>New Room</button><br/>
                {this.state.newForm && <NewRoomForm createRoom={this.createRoom} changeHandler={this.changeHandler} name={this.state.name}/>}
                <ul>
                    {this.renderRooms()}
                </ul>
                <button onClick={this.clickHandler}>Log Out</button>
            </div>
        )
    }
}

export default Rooms