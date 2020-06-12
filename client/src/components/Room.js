import React from 'react';
import Cable from 'actioncable';
import Chatbox from './Chatbox';

class Room extends React.Component {
    state = {
        room: undefined,
        messages: [],
        newMessage: ""
    }

    componentDidMount(){
        //retrieve room? and set the room?
        //also I need to set user.room = current room****
        // this.joinAndLoadRoom(this.props.match.params.id);

        //subscribe to room
        //start streaming messages, you don't have access to messages from before, or should you?
        this.cable = Cable.createConsumer(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`);
        this.subscription = this.cable.subscriptions.create({
            channel: 'RoomChannel', room: `${this.props.match.params.id}`
          }, {
            connected: () => {},
            disconnected: () => {},
            received: (data) => {
                console.log(data);
                this.handleData(data);
            },
            sendMessage: function(data){
                this.perform("create_message", { content: data });
            }
        });
    }

    //how should i set room? from the join room action?
    // i think that's better.
    componentWillUnmount(){
        //unsubscribe to room
        //set user.room = nil in db
        this.cable.subscriptions.remove(this.subscription)
        
    }

    handleData(data){
        console.log(data);
        switch (data.type) {
            case 'current_room':
                // console.log 
                this.setState({ room: data.room })
                break;
            case 'new_message':
                console.log(data)
                this.setState(prevState => ({ messages: [ ...prevState.messages, data.message ]}))
            default:
                break;
        }
    }

    leaveRoom = () => {
        // redirect to /rooms
        this.props.history.push(`/rooms`);
    }

    renderRoom(){
        if (this.state.room !== undefined) {
            return (
                <>
                {this.state.room.name}<br/>
                <button onClick={this.leaveRoom}>Leave</button>
                <ul>
                    {this.state.room.users.map((user, index) => <li key={index}>{user.username}</li>)}
                </ul>
                </>
            )
        }
    }

    submitHandler = event => {
        event.preventDefault();
        this.subscription.sendMessage(this.state.newMessage);
        this.setState({ newMessage: "" })
    }

    changeHandler = event => {
        this.setState({
            newMessage: event.target.value
        })
    }

    render(){
        return(
            <div>
                {console.log(this.state.messages)}
                {this.renderRoom()}
                <Chatbox messages={this.state.messages} newMessage={this.state.newMessage} changeHandler={this.changeHandler}
                    submitHandler={this.submitHandler}/>
                
            </div>
        )
    }
}

export default Room;