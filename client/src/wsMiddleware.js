import * as actions from './wsActions';
import { updateRooms } from './dispatchActions';
import WebSocketConnection from './WebSocketConnection';

const socketMiddleware = () => {
    let socket = null;

    const onOpen = store => event => {
        console.log('websocket open', event.target.url);
        // socket.send(JSON.stringify({"command": "subscribe","identifier":"{\"channel\":\"RoomsListChannel\"}"})) this, is to subscribe to a specific channel
        // which we will get to in a bit
        store.dispatch(actions.wsConnected(event.target.url));
    };

    const onClose = store => () => {
        store.dispatch(actions.wsDisconnected());
    };

    const onMessage = store => (event) => {
        let payload = JSON.parse(event.data);
        console.log('receiving server message');
        // console.log(JSON.parse(event.data));
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

    // connection and handlers
    // const createWebSocket = (host, store) => {
    //     const socket = new WebSocket(host);

    //     socket.onmessage = onMessage(store);
    //     socket.onclose = onClose(store);
    //     socket.onopen = onOpen(store);

    //     return socket
    // }

    //middleware part of function
    return store => next => action => {
        switch (action.type) {
            case 'WS_CONNECT':
                if (socket !== null) {
                    socket.close();
                }
                socket = new WebSocket(action.host);

                socket.onmessage = onMessage(store);
                socket.onclose = onClose(store);
                socket.onopen = onOpen(store);
                // connect to the remote host
                console.log('ws connecting');
                // socket = createWebSocket(action.host, store)
                break;
            case 'WS_DISCONNECT':
                if (socket !== null){
                    socket.close();
                }
                socket = null;
                console.log('websocket closed');
                break;
            case 'SUBSCRIBE_ROOMS_LIST':
                // if (socket == null) {
                //     socket = createWebSocket(action.host)
                // }
                socket.send(JSON.stringify({"command": "subscribe","identifier":"{\"channel\":\"RoomsListChannel\"}"})) 
                // console.log('hello');
                break;
            case 'NEW_MESSAGE':
                console.log('sending message', action.msg);

                // console.log('sending a message', action.msg)
                socket.send(JSON.stringify({command: "message", data: { action: "update", message: action.msg }}));
                break;
            default:
                console.log('the next action: ', action);
                return next(action);
        }
    }

}

export default socketMiddleware();