import React from 'react';
import { Link } from 'react-router-dom';
import lock from '../lock-icon.png';
import { fetchWithToken } from '../utilities/fetchWithToken';

const RoomListItem = ({ room, history }) => {
    function clickHandler() {
        const password = prompt("Please Enter Password!")
        const body = JSON.stringify({ password });
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        }

        fetchWithToken(`http://localhost:3001/rooms/${room.id}/authenticate`, options)
            .then(resp => resp.json())
            .then(json => {
                if (json.error) {
                    alert("Unauthorized")
                } else {
                    history.push(`/rooms/${room.id}`)
                }
            })
    }

    function redirect() {
        history.push(`/rooms/${room.id}`)
    }

    function renderJoinButton() {
        if (room.has_password) {
            return (<button onClick={clickHandler}>join</button>)
        }
        if (room.no_users < 8){
            return (<button onClick={redirect}>join</button>)
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