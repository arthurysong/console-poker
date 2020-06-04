import React from 'react';
import Cable from 'actioncable';

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
            default:
                break;
        }
    }

    // joinAndLoadRoom(id) {
    //     const token = localStorage.getItem('token');
    //     const options = {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }
    //     fetch(`http://localhost:3001/join_room/${id}`, options)
    //         .then(resp => resp.json())
    //         .then(json => this.setState({room: json}));
    //         // .then(json => console.log(json));
    // }

    renderRoom(){
        if (this.state.room !== undefined) {
            return (
                <>
                {this.state.room.name}<br/>
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
                {this.renderRoom()}
                {/* {this.renderMessages()} */}
                {/* {this.state.messages.map()} */}
                <form onSubmit={this.submitHandler}>
                    <input type="textarea" onChange={this.changeHandler} value={this.state.newMessage}/>
                    <input type="submit" value="send"/>
                </form>
            </div>
        )
    }
}

export default Room;