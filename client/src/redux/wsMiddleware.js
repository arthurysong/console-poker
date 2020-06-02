import * as actions from './wsActions';
import { updateRooms } from './dispatchActions';

const socketMiddleware = () => {
    let socket = null;

    const onOpen = store => event => {
        console.log('websocket open', event.target.url);
        store.dispatch(actions.wsConnected(event.target.url));
    };

    const onClose = store => () => {
        console.log('websocket disconnected')
        store.dispatch(actions.wsDisconnected());
    };

    const onMessage = store => (event) => {
        let payload = JSON.parse(event.data);
        console.log('receiving server message');
        console.log(payload.message)
        
        payload = payload.message || payload
        switch (payload.type) {
            case 'update_rooms':
                console.log('update_rooms switch case');
                store.dispatch(updateRooms(payload.rooms));
                break;
            default:
                break;
        }
    }


    //middleware part of function
    return store => next => action => {
        switch (action.type) {
            case 'WS_CONNECT':
                if (socket !== null) {
                    socket.close();
                }

                //what if I return promise??

                //connect to websocket
                socket = new WebSocket(action.host);

                //handlers
                socket.onmessage = onMessage(store);
                socket.onclose = onClose(store);
                socket.onopen = onOpen(store);
                // connect to the remote host
                console.log('ws connecting');
                break;
            case 'WS_DISCONNECT':
                if (socket !== null){
                    socket.close();
                }
                socket = null;
                console.log('websocket closed');
                break;
            case 'SUBSCRIBE_ROOMS_LIST':
                socket.send(JSON.stringify({"command": "subscribe","identifier":"{\"channel\":\"RoomsListChannel\"}"})) 
                break;
            case 'UNSUBSCRIBE_ROOMS_LIST':
                socket.send(JSON.stringify({"command": "unsubscribe","identifier":"{\"channel\":\"RoomsListChannel\"}"}));
                break;
            case 'SUBSCRIBE_ROOM':
                const subscribe_room_info = {
                    command: 'subscribe',
                    identifier: JSON.stringify({channel: "RoomChannel", room: action.roomId })
                }
                socket.send(JSON.stringify(subscribe_room_info)); 
                console.log('subscribing to room', action.roomId)
                break;

            case 'UNSUBSCRIBE_ROOM':
                socket.send(JSON.stringify({"command": "unsubscribe","identifier":"{\"channel\":\"RoomsChannel\"}"}));
                break;
            case 'CREATE_ROOM':
                const create_room_info = {
                    command: 'message',
                    identifier: JSON.stringify({channel: "RoomsListChannel"}),
                    data: JSON.stringify({action: "create_room", content: action.state})
                }
                socket.send(JSON.stringify(create_room_info));
                break;
            case 'NEW_MESSAGE':
                console.log('sending message', action.msg);
                break;
            default:
                console.log('the next action: ', action);
                return next(action);
        }
    }

}

export default socketMiddleware();