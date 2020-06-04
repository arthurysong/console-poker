import React from 'react';

class Room extends React.Component {
    // subscribeIfNotSubscribed(){
    //     if (this.props.wsConnected && !this.props.room){
    //         this.props.wsSubscribeRoom(this.props.match.params.id);
    //     }
    // }

    // componentWillUnmount(){
    //     this.props.wsUnsubscribeRoom();
    // }

    renderRoom(){
        if (this.props.room !== undefined) {
            return (
                <>
                {this.props.room.name}
                {this.props.room.messages.map((message, index) => <li key={index}>{message.payload}</li>)}
                </>
            )
        }
    }

    render(){
        return(
            <div>
                {/* {this.subscribeIfNotSubscribed()} */}
                {this.renderRoom()}
            </div>
        )
    }
}

export default Room;