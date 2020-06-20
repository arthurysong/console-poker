import React from 'react';
import Chatbox from './Chatbox';
import Game from './Game';
import { connect } from 'react-redux';
import { subscribeRoom, unsubscribeRoom } from '../redux/roomActions';

class Room extends React.Component {
    state = {
        newMessage: ""
    }

    componentDidMount() {
        // this needs to rebroadcast to the list so that list updates.
        this.subscription = this.props.subscribeRoom(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.unsubscribeRoom(this.props.match.params.id);
    }

    leaveRoom = () => {
        this.props.history.push(`/rooms`);
    }

    renderRoom(){
        if (this.props.room !== undefined) {
            return (
                <>
                    {this.props.room.name}<br/>
                    <button onClick={this.leaveRoom}>Leave</button>
                    <ul>
                        {this.props.room.users.map((user, index) => <li key={index}>{user.username}</li>)}
                    </ul>
                </>
            )
        }
    }


    renderGameComp = () => {
        if (this.props.room) {
            return (<Game gameId={this.props.room.game.id}/>)
        }
    }

    render(){
        return(
            <div>
                {this.renderRoom()}
                <Chatbox messages={this.props.messages} subscription={this.subscription}/><br/>
                <br/>
                {this.renderGameComp()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        room: state.room,
        messages: state.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        subscribeRoom: roomId => dispatch(subscribeRoom(roomId)),
        unsubscribeRoom: roomId => dispatch(unsubscribeRoom(roomId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);