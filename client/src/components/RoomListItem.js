import React from 'react';
import { Link } from 'react-router-dom';
import lock from '../lock-icon.png';

const RoomListItem = ({ room }) => {
    function renderJoinButton() {
        if (room.no_users < 8){
            return (<Link to={`/rooms/${room.id}`}>join</Link>)
        }
    }

    function renderLock() {
        if (room.has_password) {
            return (<img id="lock_img" src={lock} alt="Lock" />)
        }
    }

    return (
        <li className="room_li">{room.name} {renderLock()}<br/><span className="room_li_desc">{room.no_users}/8 {renderJoinButton()}</span>
        
        </li>
    )
}

export default RoomListItem;