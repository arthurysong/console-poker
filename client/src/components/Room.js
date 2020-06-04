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
        this.loadRoom(this.props.match.params.id);

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
            createMessage: function(data){
                this.perform("create_message", { content: data });
            }
        });
    }

    //how should i set room? from the join room action?
    // i think that's better.
    componentWillUnmount(){
        //unsubscribe to room
        
    }

    handleData(data){
        // switch (data.type) {
        //     case: 
    }

    loadRoom(id) {
        const token = localStorage.getItem('token');
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(`http://localhost:3001/rooms/${id}`, options)
            .then(resp => resp.json())
            .then(json => this.setState({room: json}));
    }

    renderRoom(){
        if (this.state.room !== undefined) {
            return (this.state.room.name)
        }
    }

    render(){
        return(
            <div>
                {this.renderRoom()}
            </div>
        )
    }
}

export default Room;