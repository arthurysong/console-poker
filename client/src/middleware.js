import * as actions from './websocketActions';
import { updateRooms } from './dispatchActions';

const socketMiddleware = () => {
    let socket = null;

    const onOpen = store => event => {
        console.log('websocket open', event.target.url);
        store.dispatch(actions.wsConnected(event.target.url));
    };

    const onClose = store => () => {
        store.dispatch(actions.wsDisconnected());
    };

    const onMessage = store => (event) => {
        const payload = JSON.parse(event.data);
        console.log('receiving server message');

        switch (payload.type) {
            case 'update_rooms':
                store.dispatch(updateRooms(payload.rooms);
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

                // connect to the remote host
                socket = new WebSocket(action.host);

                //websocket handlers
                socket.onmessage = onMessage(store);
                socket.onclose = onClose(store);
                socket.onopen = onOpen(store);

                break;
            case 'WS_DISCONNECT':
                if (socket !== null){
                    socket.close();
                }
                socket = null;
                console.log('websocket closed');
                break;
            case 'NEW_MESSAGE':
                console.log('sending message');
                // console.log('sending a message', action.msg)
                // socket.send(JSON.stringify({command: 'NEW_MESSAGE', message: action.msg}));
                break;
            default:
                console.log('the next action: ', action);
                return next(action);
        }
    }

}