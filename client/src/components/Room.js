import React from 'react';

class Room extends React.Component {
    componentDidUpdate(){
        console.log("room id " + this.props.match.id)
        if (this.props.wsConnected) {
            this.props.wsSubscribeRoom(this.props.match.params.id);
        }
    }

    render(){
        return(
            <div>
                {/* i could then query the database with the id,
                i can just subscribe to room channel with the id */}

            </div>
        )
    }
}

export default Room;