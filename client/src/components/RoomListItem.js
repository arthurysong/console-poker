import React from 'react';

const RoomListItem = ({ room, joinRoom }) => {
    function renderJoinButton() {
        if (room.no_users < 8){
            return (<button onClick={joinRoom}>Join</button>)
        }
    }

    return (
        <li>{room.name}<br/>{room.no_users}/8{renderJoinButton()}
        </li>
    )
}

export default RoomListItem;