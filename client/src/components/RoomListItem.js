import React from 'react';
import { Link } from 'react-router-dom';

const RoomListItem = ({ room }) => {
    function renderJoinButton() {
        if (room.no_users < 8){
            return (<Link to={`/rooms/${room.id}`}>join</Link>)
        }
    }

    return (
        <li className="room_li">{room.name}<br/>{room.no_users}/8 {renderJoinButton()}
        </li>
    )
}

export default RoomListItem;