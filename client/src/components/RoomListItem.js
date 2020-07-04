import React from 'react';
import { Link } from 'react-router-dom';
import lock from '../lock-icon.png';
import lock2 from '../lock-icon-dark.png';
import { fetchWithToken } from '../utilities/fetchWithToken';

const RoomListItem = ({ room, history, index }) => {
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
            if (index % 2 == 0) {
                return (<img className="lock_img" src={lock} alt="Lock" />)
            }
            return (<img className="lock_img" src={lock2} alt="Lock2" />)
        }
    }

    return (
        <div className={`nes-container room_container is-rounded ${index % 2 == 0 ? 'is-dark' : ''}`}>
            {console.log(index)}
            <li className="room_li">{room.name} {renderLock()}<br/><span className="room_li_desc">{room.no_users}/8 {renderJoinButton()}</span>
            </li>
        </div>
    )
}

export default RoomListItem;