import React from 'react';
import Cable from 'actioncable';
import Chatbox from './Chatbox';
import Game from './Game';

class Room extends React.Component {
    state = {
        room: undefined,
        messages: [],
        newMessage: ""
    }

    componentDidMount(){
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

    componentWillUnmount(){
        this.cable.subscriptions.remove(this.subscription)
        
    }

    handleData(data){
        console.log(data);
        switch (data.type) {
            case 'current_room':
                this.setState({ room: data.room })
                break;
            case 'new_message':
                this.setState(prevState => ({ messages: [ ...prevState.messages, data.message ]}))
                break;
            default:
                break;
        }
    }

    leaveRoom = () => {
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

    renderGameComp = () => {
        if (this.state.room) {
            return (<Game room={this.state.room}/>)
        }
    }

    render(){
        return(
            <div>
                {this.renderRoom()}
                <Chatbox messages={this.state.messages} newMessage={this.state.newMessage} changeHandler={this.changeHandler}
                    submitHandler={this.submitHandler}/>
                {this.renderGameComp()}
            </div>
        )
    }
}

export default Room;