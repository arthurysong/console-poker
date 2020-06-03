import React, { useEffect } from 'react';

const Room = props => {
    useEffect(() => {
        console.log('useeffect');
        console.log('wsConnected', props.wsConnected);
        console.log('wsSubscribedRoom', props.wsSubscribedRoom);
        if (props.wsConnected && !props.wsSubscribedRoom){

            props.wsSubscribeRoom(props.match.params.id);
        }
        return function cleanup() {
            props.wsUnsubscribeRoom()
        }
    })

    function renderRoom(){
        if (props.room !== undefined) {
            return (
                <>
                {props.room.name}
                {props.room.messages.map((message, index) => <li key={index}>{message.payload}</li>)}
                </>
            )
        }
    }

    // render(){
        return(
            <div>
                {renderRoom()}
            </div>
        )
    // }
}

export default Room;