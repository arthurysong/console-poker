import React, { useEffect } from 'react';

class Room extends React.Component {
    // async componentDidMount(){ //case where ws is already connected when component mounts.
    //     // can i just wait here until wsConnected?
    //     // okay this is the problem I'm having,
    //     // I need componentDidMount() to await this.props.wsConnected
    //     if (this.props.wsConnected) {
    //         this.props.wsSubscribeRoom(this.props.match.params.id);
    //     }
    // }
    // can I use async to wait until wsConnected?

    // componentDidUpdate(){ //case where ws is not connected and the component updates once connection is successful.
    //     if (this.props.wsConnected) {
    //         this.props.wsSubscribeRoom(this.props.match.params.id);
    //     }
    // }
    useEffect(() => {
        console.log('fuck you ');
    })
    useEffect(() => {
        if (this.props.wsConnected){
            this.props.wsSubscribeRoom(this.props.match.params.id);
        }
    })

    renderMessages(){
        if (this.props.room.messages !== undefined) {
            return (this.props.room.messages.map((message, index) => <li key={index}>{message.payload}</li>))
        }
    }

    render(){
        return(
            <div>
                {/* i could then query the database with the id,
                i can just subscribe to room channel with the id */}
                {this.props.room.name}
                {this.renderMessages()}

            </div>
        )
    }
}

export default Room;